import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { GUTTER, btnRadius } from '../config.js';
import { EVENT, money } from '../data/shop.js';
import CheckoutPanel from '../components/CheckoutPanel.jsx';
import { paymentsReady } from '../components/StripeCheckout.jsx';

// Not in the nav: linked from the Events page, the footer and Nick's booking emails.
export default function EventPay() {
  const [guests, setGuests] = useState(String(EVENT.minGuests));
  const [eventDate, setEventDate] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const handleError = useCallback((msg) => { setError(msg); setOrder(null); }, []);

  const count = parseInt(guests, 10) || 0;
  const valid = count >= EVENT.minGuests && count <= EVENT.maxGuests;

  if (order) {
    return <CheckoutPanel order={order} backLabel="Back" onBack={() => setOrder(null)} onError={handleError} />;
  }

  return (
    <section style={{ maxWidth: 1440, margin: '0 auto', padding: `clamp(28px,4vw,56px) ${GUTTER} clamp(56px,8vw,112px)` }}>
      <p className="lede">
        Private events are {money(EVENT.pricePerPerson)} per person, for groups of {EVENT.minGuests} to {EVENT.maxGuests} guests. Once you’ve set a date with Nick, pay for your event here. Haven’t booked yet? <Link to="/contact">Get in touch</Link> first.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 520 }}>
        <div className="field">
          <label htmlFor="guests">Number of guests</label>
          <input id="guests" className="input" type="number" inputMode="numeric" min={EVENT.minGuests} max={EVENT.maxGuests} value={guests} onChange={(e) => setGuests(e.target.value)} />
          {!valid && <span style={{ fontSize: 14, color: 'var(--color-accent-700)' }}>Enter {EVENT.minGuests} to {EVENT.maxGuests} guests.</span>}
        </div>
        <div className="field">
          <label htmlFor="event-date">Event date</label>
          <input id="event-date" className="input" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        </div>

        <div style={{ borderTop: '2px solid var(--color-text)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>{valid ? count : '–'} guests × {money(EVENT.pricePerPerson)}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 20 }}><span>Total</span><span>{valid ? money(count * EVENT.pricePerPerson) : '–'}</span></div>
        </div>

        <button className="btn btn-primary btn-arrow" disabled={!valid || !eventDate || !paymentsReady} onClick={() => { setError(''); setOrder({ type: 'event', guests: count, eventDate }); }} style={{ borderRadius: btnRadius, minWidth: 220, alignSelf: 'flex-start' }}>
          Continue to payment <span>→</span>
        </button>
        {error && <p role="alert" style={{ margin: 0, fontSize: 14, color: 'var(--color-accent-700)' }}>{error}</p>}
        {!paymentsReady && (
          <p style={{ margin: 0, fontSize: 14 }}>Online payment is coming soon. For now, email <a href="mailto:nickkclark@gmail.com">nickkclark@gmail.com</a> to arrange payment.</p>
        )}
      </div>
    </section>
  );
}
