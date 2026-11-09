import { Link, useSearchParams } from 'react-router-dom';
import { GUTTER } from '../config.js';

// Stripe sends customers here after a successful payment (return_url in api/checkout.js).
export default function Thanks() {
  const [params] = useSearchParams();
  const type = params.get('type');
  const event = type === 'event' || type === 'workshop';
  const due = /^\$[\d,]+(\.\d\d)?$/.test(params.get('due') || '') ? params.get('due') : '';
  return (
    <section style={{ maxWidth: 1440, margin: '0 auto', padding: `clamp(28px,4vw,56px) ${GUTTER} clamp(56px,8vw,112px)` }}>
      <p className="lede">
        {type === 'workshop'
          ? `You’re signed up for the Life-to-Table Workshop. ${due ? `Please bring the balance of ${due} in cash on your first day. ` : ''}A receipt is on its way to your email, and Nick will be in touch with the details.`
          : event
          ? 'Your event is paid for. A receipt is on its way to your email, and Nick will be in touch with the details.'
          : 'Your order is in. A receipt is on its way to your email.'}
      </p>
      <Link to={event ? '/events' : '/shop'} className="arrow-link">{event ? 'Back to events' : 'Back to the shop'} <span>→</span></Link>
    </section>
  );
}
