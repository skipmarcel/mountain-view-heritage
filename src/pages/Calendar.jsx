import { GUTTER, btnRadius } from '../config.js';
import pcc from '../data/pcc-classes.json';

// Sessions come from PCC's schedule via scripts/scrape-pcc.mjs (runs before each build).
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const localIso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export default function Calendar({ narrow }) {
  // Hide sessions that have passed since the last scrape.
  const today = localIso(new Date());
  const upcoming = pcc.sessions.filter((s) => s.date >= today);

  return (
    <section style={{ maxWidth: 1440, margin: '0 auto', padding: `clamp(28px,4vw,56px) ${GUTTER} clamp(56px,8vw,112px)` }}>
      <p style={{ fontSize: 14, margin: '0 0 32px' }}>
        Classes are held at the farm and booked through Portland Community College, with dates updated daily from PCC’s schedule. If a class shows as full, <a href="mailto:nickkclark@gmail.com" style={{ fontWeight: 700 }}>EMAIL NICK DIRECTLY</a>. We often have extra room or cancelations.
      </p>
      <div style={{ borderTop: '2px solid var(--color-text)' }}>
        {upcoming.map((s) => {
          const [, month, day] = s.date.split('-').map(Number);
          return (
            <div key={s.crn} style={{ display: 'grid', gridTemplateColumns: narrow ? '64px minmax(0,1fr)' : '96px minmax(0,1fr) auto', gap: 'clamp(16px,3vw,40px)', rowGap: 16, alignItems: 'center', padding: '24px 0', borderBottom: '2px solid var(--color-text)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span className="kicker accent">{MONTHS[month - 1]}</span>
                <span style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-.03em' }}>{day}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
                <h3 style={{ margin: 0, fontSize: 'clamp(20px,2vw,26px)', letterSpacing: '-.01em' }}>{s.title}</h3>
                <span style={{ fontSize: 14 }}>{[s.day, s.time, s.tuition && `$${s.tuition}`, s.notes].filter(Boolean).join(' · ')}</span>
              </div>
              <a className="btn btn-primary btn-arrow" href={s.url} target="_blank" rel="noopener noreferrer" style={{ borderRadius: btnRadius, gridColumn: narrow ? '2' : 'auto', justifySelf: 'start', minWidth: 150, textDecoration: 'none', color: 'var(--color-bg)' }}>Register <span>→</span></a>
            </div>
          );
        })}
        {!upcoming.length && (
          <p style={{ padding: '24px 0', margin: 0, borderBottom: '2px solid var(--color-text)' }}>
            No upcoming classes are posted yet. Check the <a href={pcc.source} target="_blank" rel="noopener noreferrer">PCC Food and Drink schedule</a> for new dates.
          </p>
        )}
      </div>
    </section>
  );
}
