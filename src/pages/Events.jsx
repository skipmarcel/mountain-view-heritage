import { Link } from 'react-router-dom';
import { GUTTER, photoFilter } from '../config.js';
import { events, workshop } from '../data/content.js';
import { EVENT, money } from '../data/shop.js';
import WorkshopSection from '../components/WorkshopSection.jsx';

export default function Events() {
  return (
    <section style={{ maxWidth: 1440, margin: '0 auto', padding: `clamp(56px,8vw,112px) ${GUTTER}` }}>
      <h2 style={{ margin: '0 0 12px', fontSize: 'clamp(32px,3.8vw,56px)', lineHeight: 1.02, letterSpacing: '-.02em' }}>Upcoming Events</h2>
      <p style={{ margin: '0 0 24px', fontSize: 'clamp(18px,1.6vw,22px)' }}>{workshop.title} {workshop.dates}</p>
      <WorkshopSection />
      <p className="lede" style={{ marginTop: 'clamp(56px,8vw,96px)', marginBottom: 16 }}>Beyond classes, the farm hosts long-table charcuterie tastings, private group sessions and parties of your own design.</p>
      <p style={{ margin: '0 0 48px', fontSize: 16, lineHeight: 1.6, maxWidth: '60ch' }}>
        Private events are <strong>{money(EVENT.pricePerPerson)} per person</strong>, for groups of {EVENT.minGuests} to {EVENT.maxGuests} guests. <Link to="/contact">Get in touch</Link> to plan a date. Once it’s set, you can <Link to="/events/pay">pay online</Link>.
      </p>
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
      <Link to="/events/pay" className="arrow-link" style={{ marginTop: 32 }}>Already booked an event? Pay here <span>→</span></Link>
    </section>
  );
}
