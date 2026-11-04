import { Link, useSearchParams } from 'react-router-dom';
import { GUTTER } from '../config.js';

// Stripe sends customers here after a successful payment (return_url in api/checkout.js).
export default function Thanks() {
  const [params] = useSearchParams();
  const event = params.get('type') === 'event';
  return (
    <section style={{ maxWidth: 1440, margin: '0 auto', padding: `clamp(28px,4vw,56px) ${GUTTER} clamp(56px,8vw,112px)` }}>
      <p className="lede">
        {event
          ? 'Your event is paid for. A receipt is on its way to your email, and Nick will be in touch with the details.'
          : 'Your order is in. A receipt is on its way to your email.'}
      </p>
      <Link to={event ? '/events' : '/shop'} className="arrow-link">{event ? 'Back to events' : 'Back to the shop'} <span>→</span></Link>
    </section>
  );
}
