import { useCallback, useState } from 'react';
import { GUTTER, photoFilter, btnRadius } from '../config.js';
import { MERCH, MAX_PER_ITEM, SHIPPING, PICKUP_ADDRESS, money } from '../data/shop.js';
import Stepper from '../components/Stepper.jsx';
import CheckoutPanel from '../components/CheckoutPanel.jsx';
import { paymentsReady } from '../components/StripeCheckout.jsx';

export default function Shop() {
  const [qty, setQty] = useState({});
  const [delivery, setDelivery] = useState('ship');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const handleError = useCallback((msg) => { setError(msg); setOrder(null); }, []);

  const subtotal = MERCH.reduce((sum, p) => sum + p.price * (qty[p.id] || 0), 0);
  const shipping = delivery === 'ship' && subtotal ? SHIPPING.price : 0;

  if (order) {
    return <CheckoutPanel order={order} backLabel="Back to shop" onBack={() => setOrder(null)} onError={handleError} />;
  }

  return (
    <section style={{ maxWidth: 1440, margin: '0 auto', padding: `clamp(28px,4vw,56px) ${GUTTER} clamp(56px,8vw,112px)` }}>
      <p className="lede">Take a piece of the farm home. Ships anywhere in the US, or pick up at the farm.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', borderTop: '2px solid var(--color-text)', borderLeft: '2px solid var(--color-text)' }}>
        {MERCH.map((p) => (
          <article key={p.id} style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24, borderRight: '2px solid var(--color-text)', borderBottom: '2px solid var(--color-text)' }}>
            <img src={p.img} alt={p.name} style={{ width: '100%', aspectRatio: '4/5', objectFit: 'contain', filter: photoFilter }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
              <h3 style={{ margin: 0, fontSize: 26, letterSpacing: '-.015em' }}>{p.name}</h3>
              <span style={{ fontSize: 20, fontWeight: 700 }}>{money(p.price)}</span>
            </div>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, textWrap: 'pretty' }}>{p.body}</p>
            <div style={{ marginTop: 'auto' }}>
              <Stepper value={qty[p.id] || 0} max={MAX_PER_ITEM} label={p.name} onChange={(v) => setQty((q) => ({ ...q, [p.id]: v }))} />
            </div>
          </article>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 520, marginTop: 40 }}>
        <fieldset style={{ border: 0, padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <legend className="kicker accent" style={{ marginBottom: 12 }}>Delivery</legend>
          <label style={{ display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer' }}>
            <input type="radio" name="delivery" checked={delivery === 'ship'} onChange={() => setDelivery('ship')} />
            Ship to me ({money(SHIPPING.price)})
          </label>
          <label style={{ display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer' }}>
            <input type="radio" name="delivery" checked={delivery === 'pickup'} onChange={() => setDelivery('pickup')} />
            Pick up at the farm (free)
          </label>
          {delivery === 'pickup' && <span style={{ fontSize: 14, paddingLeft: 26 }}>{PICKUP_ADDRESS}</span>}
        </fieldset>

        <div style={{ borderTop: '2px solid var(--color-text)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal</span><span>{money(subtotal)}</span></div>
          {delivery === 'ship' && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Shipping</span><span>{money(shipping)}</span></div>}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 20 }}><span>Total</span><span>{money(subtotal + shipping)}</span></div>
        </div>

        <button className="btn btn-primary btn-arrow" disabled={!subtotal || !paymentsReady} onClick={() => { setError(''); setOrder({ type: 'merch', items: qty, delivery }); }} style={{ borderRadius: btnRadius, minWidth: 220, alignSelf: 'flex-start' }}>
          Checkout <span>→</span>
        </button>
        {error && <p role="alert" style={{ margin: 0, fontSize: 14, color: 'var(--color-accent-700)' }}>{error}</p>}
        {!paymentsReady && (
          <p style={{ margin: 0, fontSize: 14 }}>Online checkout is coming soon. To order now, email <a href="mailto:nickkclark@gmail.com">nickkclark@gmail.com</a>.</p>
        )}
      </div>
    </section>
  );
}
