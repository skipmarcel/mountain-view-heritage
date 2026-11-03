// Scrapes the "Butchering for the Home Chef" classes from PCC's Food and Drink
// schedule and writes them to src/data/pcc-classes.json for the Calendar page.
//
//   npm run scrape                  — fail loudly if PCC can't be read
//   node scripts/scrape-pcc.mjs --keep-on-error
//                                   — used by prebuild: warn and keep the last good file
//
// No dependencies; needs Node 18+ (built-in fetch).

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const TERMS = ['fall', 'winter', 'spring', 'summer'];
const SECTION_ID = 'HOMCHF'; // "Butchering for the Home Chef"
const listUrl = (term) => `https://www.pcc.edu/schedule/${term}/coo/`;
const OUT = fileURLToPath(new URL('../src/data/pcc-classes.json', import.meta.url));
const keepOnError = process.argv.includes('--keep-on-error');

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const decode = (s) => s
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n));
const text = (html) => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

async function get(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'MountainViewHeritage-site/1.0 (class calendar sync)' } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.text();
}

// "November 7, 2026" -> "2026-11-07"
function isoDate(str) {
  const m = str.match(/([A-Z][a-z]+) (\d{1,2}), (\d{4})/);
  const month = m && MONTHS.indexOf(m[1]);
  if (!m || month < 0) return null;
  return `${m[3]}-${String(month + 1).padStart(2, '0')}-${m[2].padStart(2, '0')}`;
}

// Course links listed under the section heading on a term's list page.
function parseCourseList(html) {
  const start = html.indexOf(`id="${SECTION_ID}"`);
  if (start < 0) return [];
  const list = html.slice(start).match(/<ul class="course-list">([\s\S]*?)<\/ul>/);
  if (!list) return [];
  return [...list[1].matchAll(/<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => ({ url: m[1], title: text(m[2]) }));
}

// One entry per row of the class page's sessions table.
function parseSessions(html) {
  const title = text(html.match(/<h3>([\s\S]*?)<\/h3>/)?.[1] ?? '');
  const description = text(html.match(/<div class="cell small-12 medium-7">\s*<p>([\s\S]*?)<\/p>/)?.[1] ?? '');
  const tbody = html.match(/<table class="classes-table[\s\S]*?<tbody>([\s\S]*?)<\/tbody>/)?.[1] ?? '';

  return tbody.split('<tr class="data-row').slice(1).map((row) => {
    const attr = (name) => row.match(new RegExp(`data-${name}="([^"]*)"`))?.[1] ?? '';
    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) => m[1]);
    const [, location = '', when = '', dates = '', , info = ''] = cells;

    const fullDates = [...dates.matchAll(/<span class="visually-hide">([^<]+)<\/span>/g)].map((m) => m[1]);
    const day = when.match(/title="Class on ([^"]+)"/)?.[1] ?? '';
    const time = text(when.replace(/<div class="weekly"[\s\S]*?<\/div>/, '').replace(/<span class="visually-hide">[\s\S]*?<\/span>/g, ''));
    const infoLines = info.split(/<br\s*\/?>/).map(text);
    const field = (label) => infoLines.find((l) => l.startsWith(label + ':'))?.slice(label.length + 1).trim() ?? '';

    return {
      crn: attr('crn'),
      title,
      description,
      date: isoDate(fullDates[0] ?? ''),
      endDate: isoDate(fullDates.at(-1) ?? ''),
      day,
      time: time.replace(/\s*-\s*/, '–'),
      location: text(location),
      instructor: field('Instructor'),
      tuition: Number(attr('tuition')) || null,
      notes: field('Notes'),
      status: attr('status'),
    };
  });
}

async function scrape() {
  const sessions = new Map();
  for (const term of TERMS) {
    const html = await get(listUrl(term));
    if (!html) { console.log(`${term}: no schedule posted`); continue; }
    const courses = parseCourseList(html);
    console.log(`${term}: ${courses.length} classes`);
    for (const course of courses) {
      const page = await get(course.url);
      if (!page) { console.warn(`  missing page: ${course.url}`); continue; }
      for (const s of parseSessions(page)) {
        if (!s.crn || !s.date) continue;
        sessions.set(s.crn, { ...s, title: s.title || course.title, term, url: course.url });
      }
    }
  }
  return [...sessions.values()].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
}

try {
  const sessions = await scrape();
  if (!sessions.length) throw new Error(`No sessions found under #${SECTION_ID}; the PCC page layout may have changed.`);
  const data = { scrapedAt: new Date().toISOString(), source: listUrl(TERMS[0]), sessions };
  await writeFile(OUT, JSON.stringify(data, null, 2) + '\n');
  console.log(`Wrote ${sessions.length} sessions to src/data/pcc-classes.json`);
} catch (err) {
  console.error(`PCC scrape failed: ${err.message}`);
  if (keepOnError) console.warn('Keeping the existing src/data/pcc-classes.json.');
  else process.exitCode = 1;
}
