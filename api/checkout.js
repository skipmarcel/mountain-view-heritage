// Vercel function: creates a Stripe Checkout Session for the embedded checkout on
// /shop and /events/pay, and returns its client secret.
// Needs the STRIPE_SECRET_KEY environment variable (Vercel → Settings → Environment Variables).
// Prices always come from src/data/shop.js, never from the browser.

import Stripe from 'stripe';
import { MERCH, MAX_PER_ITEM, SHIPPING, PICKUP_ADDRESS, EVENT, WORKSHOP, MEMBERSHIP, money, workshopPrice, workshopCashDue } from '../src/data/shop.js';
import { VERSION, FIELDS, membershipTerm, signatureMatches } from '../src/data/membership.js';
import { workshop } from '../src/data/content.js';

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

// payment: 'card' pays in full now; 'cash' pays a non-refundable deposit now and the rest in cash on the day.
function workshopSession({ days, payment }) {
  const chosen = Array.isArray(days) ? days : [];
  const picked = workshop.days.filter((d) => chosen.includes(d.label));
  if (!picked.length) throw new Error('Please choose at least one day.');
  const total = workshop.days.length;
  const cash = payment === 'cash';
  const howMany = picked.length === total ? 'all three days' : picked.length === 1 ? '1 day' : `${picked.length} days`;
  const dayList = `${workshop.dates}. ${picked.map((d) => `${d.label}: ${d.title}`).join(', ')}`;
  const due = workshopCashDue(picked.length, total);

  return {
    line_items: [{
      quantity: 1,
      price_data: {
        currency: 'usd',
        unit_amount: cash ? WORKSHOP.deposit : workshopPrice(picked.length, total),
        product_data: cash
          ? { name: `${workshop.title}: non-refundable deposit (${howMany})`, description: `${dayList}. Balance of ${money(due)} due in cash on your first day.` }
          : { name: `${workshop.title}: ${howMany}`, description: dayList },
      },
    }],
    phone_number_collection: { enabled: true },
    ...(cash && { custom_text: { submit: { message: `This deposit is non-refundable. Bring the balance of ${money(due)} in cash on your first day.` } } }),
    metadata: { order_type: 'workshop', payment: cash ? 'cash deposit' : 'card', days: picked.map((d) => d.label).join(', '), ...(cash && { cash_due: money(due) }) },
  };
}

// Farm Club membership: a yearly subscription. The signed agreement details go into Stripe's
// metadata, so each member's payment record also shows what they signed and when.
function membershipSession({ member = {}, signature, agreed }) {
  const m = {};
  for (const f of FIELDS) {
    m[f.key] = String(member[f.key] ?? '').trim().replace(/\s+/g, ' ').slice(0, f.max);
    if (f.required && !m[f.key]) throw new Error(`Please fill in ${f.label.toLowerCase()}.`);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email)) throw new Error('Please enter a valid email address.');
  if (agreed !== true) throw new Error('Please confirm that you agree to the Membership Agreement.');
  if (!signatureMatches(signature, m.name)) throw new Error('Please type your full name exactly as entered above to sign.');

  const term = membershipTerm();
  const record = {
    order_type: 'membership',
    agreement_version: VERSION,
    signed_name: String(signature).trim().replace(/\s+/g, ' ').slice(0, 100),
    signed_at: new Date().toISOString(),
    term: `${term.from} to ${term.to}`,
    ...m,
  };
  return {
    mode: 'subscription',
    customer_email: m.email,
    line_items: [{
      quantity: 1,
      price_data: {
        currency: 'usd',
        unit_amount: MEMBERSHIP.annualFee,
        recurring: { interval: 'year' },
        product_data: { name: 'Mountain View Heritage Farm Club membership (yearly)' },
      },
    }],
    custom_text: { submit: { message: `Your membership renews every year at ${money(MEMBERSHIP.annualFee)} until you cancel. To cancel, email Nick before your renewal date.` } },
    metadata: record,
    subscription_data: { metadata: record },
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
  if (!process.env.STRIPE_SECRET_KEY) return res.status(503).json({ error: 'Online payments are not set up yet.' });

  const origin = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`;
  const body = req.body || {};
  let params;
  try {
    params = body.type === 'event' ? eventSession(body)
      : body.type === 'workshop' ? workshopSession(body)
      : body.type === 'membership' ? membershipSession(body)
      : merchSession(body, origin);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded_page',
      mode: 'payment', // membershipSession overrides this with 'subscription'
      return_url: `${origin}/thanks?type=${['event', 'workshop', 'membership'].includes(body.type) ? body.type : 'merch'}${params.metadata.cash_due ? `&due=${encodeURIComponent(params.metadata.cash_due)}` : ''}`,
      ...params,
    });
    res.status(200).json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error('Stripe checkout failed:', err.message);
    res.status(500).json({ error: 'Could not start checkout. Please try again.' });
  }
}
