// Vercel function: creates a Stripe Checkout Session for the embedded checkout on
// /shop and /events/pay, and returns its client secret.
// Needs the STRIPE_SECRET_KEY environment variable (Vercel → Settings → Environment Variables).
// Prices always come from src/data/shop.js, never from the browser.

import Stripe from 'stripe';
import { MERCH, MAX_PER_ITEM, SHIPPING, PICKUP_ADDRESS, EVENT } from '../src/data/shop.js';

function merchSession({ items = {}, delivery }, origin) {
  const line_items = MERCH.map((p) => ({ p, qty: Math.min(MAX_PER_ITEM, Math.max(0, parseInt(items[p.id], 10) || 0)) }))
    .filter(({ qty }) => qty > 0)
    .map(({ p, qty }) => ({
      quantity: qty,
      price_data: { currency: 'usd', unit_amount: p.price, product_data: { name: p.name, images: [origin + p.img] } },
    }));
  if (!line_items.length) throw new Error('Your order is empty.');

  const shipping = delivery === 'ship'
    ? {
        shipping_address_collection: { allowed_countries: ['US'] },
        shipping_options: [{ shipping_rate_data: { type: 'fixed_amount', display_name: SHIPPING.label, fixed_amount: { amount: SHIPPING.price, currency: 'usd' } } }],
      }
    : { custom_text: { submit: { message: `Pick up at the farm: ${PICKUP_ADDRESS}` } } };

  return { line_items, ...shipping, metadata: { order_type: 'merch', delivery: delivery === 'ship' ? 'ship' : 'pickup' } };
}

function eventSession({ guests, eventDate }) {
  const count = parseInt(guests, 10);
  if (!(count >= EVENT.minGuests && count <= EVENT.maxGuests)) throw new Error(`Events are for ${EVENT.minGuests}–${EVENT.maxGuests} guests.`);
  const date = /^\d{4}-\d{2}-\d{2}$/.test(eventDate || '') ? eventDate : '';

  return {
    line_items: [{
      quantity: count,
      price_data: { currency: 'usd', unit_amount: EVENT.pricePerPerson, product_data: { name: 'Private event (per person)', ...(date && { description: `Event date: ${date}` }) } },
    }],
    phone_number_collection: { enabled: true },
    metadata: { order_type: 'event', guests: String(count), event_date: date },
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
  if (!process.env.STRIPE_SECRET_KEY) return res.status(503).json({ error: 'Online payments are not set up yet.' });

  const origin = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`;
  const body = req.body || {};
  let params;
  try {
    params = body.type === 'event' ? eventSession(body) : merchSession(body, origin);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      mode: 'payment',
      return_url: `${origin}/thanks?type=${body.type === 'event' ? 'event' : 'merch'}`,
      ...params,
    });
    res.status(200).json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error('Stripe checkout failed:', err.message);
    res.status(500).json({ error: 'Could not start checkout. Please try again.' });
  }
}
