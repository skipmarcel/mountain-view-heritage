import { useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';

// Set VITE_STRIPE_PUBLISHABLE_KEY in Vercel (and .env.local) to turn payments on.
const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;
export const paymentsReady = Boolean(publishableKey);

// Stripe's embedded checkout for an order; api/checkout.js prices it and creates the session.
export default function StripeCheckout({ order, onError }) {
  const fetchClientSecret = useCallback(async () => {
    try {
      const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not start checkout. Please try again.');
      return data.clientSecret;
    } catch (err) {
      onError(err.message);
      throw err;
    }
  }, [order, onError]);

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}
