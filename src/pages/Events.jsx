import { Link } from 'react-router-dom';
import { GUTTER, photoFilter } from '../config.js';
import { events } from '../data/content.js';

export default function Events() {
  return (
    <section style={{ maxWidth: 1440, margin: '0 auto', padding: `clamp(56px,8vw,112px) ${GUTTER}` }}>
      <p className="lede">Beyond classes, the farm hosts dinners, whole-animal roasts and private sessions for groups.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', borderTop: '2px solid var(--color-text)', borderLeft: '2px solid var(--color-text)' }}>
        {events.map((e) => (
          <article key={e.title} style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24, borderRight: '2px solid var(--color-text)', borderBottom: '2px solid var(--color-text)' }}>
            <img src={e.img} alt={e.title} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', filter: photoFilter }} />
            <h3 style={{ margin: 0, fontSize: 26, letterSpacing: '-.015em' }}>{e.title}</h3>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, textWrap: 'pretty' }}>{e.body}</p>
            <Link to="/contact" className="arrow-link" style={{ marginTop: 'auto' }}>Enquire <span>→</span></Link>
          </article>
        ))}
      </div>
    </section>
  );
}
