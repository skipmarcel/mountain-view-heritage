import { GUTTER } from '../config.js';
import StripeCheckout from './StripeCheckout.jsx';

// Replaces a page's order form with Stripe's embedded checkout.
export default function CheckoutPanel({ order, backLabel, onBack, onError }) {
  return (
    <section style={{ maxWidth: 960, margin: '0 auto', padding: `clamp(28px,4vw,56px) ${GUTTER} clamp(56px,8vw,112px)` }}>
      <button type="button" className="arrow-link" onClick={onBack} style={{ background: 'none', border: 0, padding: 0, marginBottom: 24, color: 'var(--color-accent)', font: 'inherit', fontWeight: 600, cursor: 'pointer' }}>
        <span>←</span> {backLabel}
      </button>
      <StripeCheckout order={order} onError={onError} />
    </section>
  );
}
