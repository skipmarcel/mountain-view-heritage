// Vercel function: emails Nick when someone submits the workshop form at /events/workshop.
// Replying to the email goes straight to the customer.
// Needs the RESEND_API_KEY environment variable, and mountainviewheritage.com verified in Resend.

import { workshop } from '../src/data/content.js';

const TO = 'nickkclark@gmail.com';
const FROM = 'Mountain View Heritage <website@mountainviewheritage.com>';

const clean = (value, max) => String(value ?? '').trim().slice(0, max);
const oneLine = (value) => value.replace(/\s+/g, ' ');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  const body = req.body || {};
  // Hidden field that people never see, so only spam bots fill it in. Pretend it worked.
  if (body.company) return res.status(200).json({ ok: true });

  const name = oneLine(clean(body.name, 100));
  const email = clean(body.email, 200);
  const phone = oneLine(clean(body.phone, 40));
  const message = clean(body.message, 5000);
  if (!name) return res.status(400).json({ error: 'Please enter your name.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });

  const chosen = Array.isArray(body.days) ? body.days : [];
  const days = workshop.days.filter((d) => chosen.includes(d.label));
  if (!days.length) return res.status(400).json({ error: 'Please choose at least one day.' });
  const daysText = days.length === workshop.days.length ? 'All three days' : days.map((d) => `${d.label}: ${d.title}`).join(', ');

  if (!process.env.RESEND_API_KEY) return res.status(503).json({ error: 'The form is not set up yet.' });

  const text = [
    message,
    '',
    `Days: ${daysText}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not provided'}`,
    '',
    'Reply to this email to answer them directly.',
  ].join('\n');

  try {
    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to: [TO], reply_to: email, subject: `Life-to-Table Workshop inquiry from ${name}`, text }),
    });
    if (!sent.ok) throw new Error(`Resend responded ${sent.status}: ${await sent.text()}`);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Workshop inquiry failed:', err.message);
    res.status(502).json({ error: 'Your message could not be sent.' });
  }
}
