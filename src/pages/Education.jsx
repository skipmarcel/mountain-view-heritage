import { useNavigate } from 'react-router-dom';
import { GUTTER, photoFilter, btnRadius } from '../config.js';
import { courses } from '../data/content.js';

export default function Education() {
  const navigate = useNavigate();
  return (
    <section style={{ maxWidth: 1440, margin: '0 auto', padding: `clamp(56px,8vw,112px) ${GUTTER}` }}>
      <p className="lede">Every class is hands-on. You hold the knife, break down the animal, season, stuff and hang the work yourself, with an instructor at your elbow.</p>
      <div style={{ borderTop: '2px solid var(--color-text)' }}>
        {courses.map((c) => (
          <article key={c.num} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 'clamp(20px,3vw,48px)', padding: '32px 0', borderBottom: '2px solid var(--color-text)', alignItems: 'start' }}>
            <img src={c.img} alt={c.title} style={{ width: '100%', aspectRatio: '3/2', objectFit: 'cover', filter: photoFilter }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="kicker accent">{c.num}</div>
              <h3 style={{ margin: 0, fontSize: 'clamp(26px,2.4vw,34px)', letterSpacing: '-.015em' }}>{c.title}</h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, maxWidth: '52ch', textWrap: 'pretty' }}>{c.body}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
              {c.dates !== false && <button className="btn btn-secondary btn-arrow" onClick={() => navigate('/calendar')} style={{ borderRadius: btnRadius, minWidth: 200 }}>See dates <span>→</span></button>}
              <button className="btn btn-ghost btn-arrow" onClick={() => navigate('/contact')} style={{ borderRadius: btnRadius, minWidth: 200 }}>Ask a question</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
