import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GUTTER, btnRadius } from '../config.js';
import { workshop } from '../data/content.js';
import { WORKSHOP, money, workshopPrice, workshopCashDue } from '../data/shop.js';
import CheckoutPanel from '../components/CheckoutPanel.jsx';
import { paymentsReady } from '../components/StripeCheckout.jsx';

const NICK_EMAIL = 'nickkclark@gmail.com';
const TOTAL_DAYS = workshop.days.length;
const row = { display: 'flex', justifyContent: 'space-between', gap: 16 };
const option = { display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer' };

// Not linked anywhere on the site, and hidden from search engines (vercel.json).
// Nick emails this link to people once he's confirmed they have a spot.
export default function WorkshopPay() {
  const [days, setDays] = useState(workshop.days.map((d) => d.label));
  const [payment, setPayment] = useState('card'); // card | cash
  const [agreed, setAgreed] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const handleError = useCallback((msg) => { setError(msg); setOrder(null); }, []);

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  const toggle = (label) => setDays((d) => (d.includes(label) ? d.filter((x) => x !== label) : [...d, label]));
  const count = days.length;
  const cash = payment === 'cash';
  const cardTotal = workshopPrice(count, TOTAL_DAYS);
  const cashTotal = workshopPrice(count, TOTAL_DAYS, true);
  const cashDue = workshopCashDue(count, TOTAL_DAYS);
  const ready = count > 0 && (!cash || agreed) && paymentsReady;

  if (order) {
    return <CheckoutPanel order={order} backLabel="Back" onBack={() => setOrder(null)} onError={handleError} />;
  }

  return (
    <section style={{ maxWidth: 1440, margin: '0 auto', padding: `clamp(28px,4vw,56px) ${GUTTER} clamp(56px,8vw,112px)` }}>
      <p className="lede">
        Your spot at the {workshop.title}, {workshop.dates}, is confirmed. Choose your days and how you’d like to pay. Haven’t heard from Nick yet? <Link to="/events/workshop">Check availability</Link> first.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 560 }}>
        <fieldset style={{ border: 0, padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <legend className="kicker accent" style={{ marginBottom: 12 }}>Which days?</legend>
          {workshop.days.map((d) => (
            <label key={d.label} style={option}>
              <input type="checkbox" checked={days.includes(d.label)} onChange={() => toggle(d.label)} style={{ marginTop: 4 }} />
              <span>{d.label} ({d.date}): {d.title}</span>
            </label>
          ))}
        </fieldset>

        <fieldset style={{ border: 0, padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <legend className="kicker accent" style={{ marginBottom: 12 }}>How would you like to pay?</legend>
          <label style={option}>
            <input type="radio" name="payment" checked={!cash} onChange={() => setPayment('card')} style={{ marginTop: 4 }} />
            <span><strong>Card, in full now{count ? `: ${money(cardTotal)}` : ''}</strong><br /><span style={{ fontSize: 14 }}>{money(WORKSHOP.perDay)} per day · {money(WORKSHOP.allDays)} for all three days</span></span>
          </label>
          <label style={option}>
            <input type="radio" name="payment" checked={cash} onChange={() => setPayment('cash')} style={{ marginTop: 4 }} />
            <span><strong>Cash on the day{count ? `: ${money(cashTotal)}` : ''}</strong><br /><span style={{ fontSize: 14 }}>{money(WORKSHOP.cashPerDay)} per day · {money(WORKSHOP.cashAllDays)} for all three days. Hold your spot with a {money(WORKSHOP.deposit)} non-refundable card deposit now; {money(WORKSHOP.depositCredit)} of it comes off your cash balance.</span></span>
          </label>
        </fieldset>

        <div style={{ borderTop: '2px solid var(--color-text)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 16 }}>
          {!count ? <span>No days chosen</span> : cash ? (
            <>
              <div style={{ ...row, fontWeight: 800, fontSize: 20 }}><span>Deposit due now</span><span>{money(WORKSHOP.deposit)}</span></div>
              <div style={row}><span>Cash due on your first day</span><span>{money(cashDue)}</span></div>
            </>
          ) : (
            <div style={{ ...row, fontWeight: 800, fontSize: 20 }}><span>Total due now</span><span>{money(cardTotal)}</span></div>
          )}
          <span style={{ fontSize: 14 }}>{workshop.priceNote}</span>
        </div>

        {cash && count > 0 && (
          <label style={option}>
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} style={{ marginTop: 4 }} />
            <span>I understand the {money(WORKSHOP.deposit)} deposit is non-refundable, and I’ll bring {money(cashDue)} in cash on my first day.</span>
          </label>
        )}

        <button className="btn btn-primary btn-arrow" disabled={!ready} onClick={() => { setError(''); setOrder({ type: 'workshop', days, payment }); }} style={{ borderRadius: btnRadius, minWidth: 220, alignSelf: 'flex-start' }}>
          {cash ? 'Pay deposit' : 'Continue to payment'} <span>→</span>
        </button>
        {error && <p role="alert" style={{ margin: 0, fontSize: 14, color: 'var(--color-accent-700)' }}>{error}</p>}
        {!paymentsReady && (
          <p style={{ margin: 0, fontSize: 14 }}>Online payment isn’t available right now. Email <a href={`mailto:${NICK_EMAIL}`}>{NICK_EMAIL}</a> to arrange payment.</p>
        )}
      </div>
    </section>
  );
}
