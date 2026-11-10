// Shop and event prices, in cents. The checkout function (api/checkout.js) charges from
// this file too, so the prices on the page and in Stripe always match.
// Prices include Stripe's fee (2.9% + 30¢ on US cards), so there's no separate fee at checkout.
// TODO: confirm merch and shipping prices with the client.

export const MERCH = [
  { id: 'hat', name: 'Trucker Hat', img: '/assets/merch/hat.jpg', price: 3200, body: 'Black, white and red Richardson 112 trucker with our leather pig patch. Adjustable snapback.' },
  { id: 'sticker', name: 'Logo Sticker', img: '/assets/merch/sticker.jpg', price: 600, body: 'Our woodcut pig logo in black and white.' },
];
export const MAX_PER_ITEM = 10;

export const SHIPPING = { price: 600, label: 'Shipping (US)' };
export const PICKUP_ADDRESS = '15353 S Loder Rd., Oregon City, OR 97045';

export const EVENT = { pricePerPerson: 20700, minGuests: 6, maxGuests: 20 };

// Life-to-Table Workshop, per person. Days are listed in content.js.
// Card prices are $400 a day and $1,000 for all three, plus Stripe's fee; the flyer and inquiry form show these.
// Paying cash on the day costs the plain $400 / $1,000, after a non-refundable card deposit:
// the customer pays `deposit` ($100 plus Stripe's fee) now, and `depositCredit` comes off the cash balance.
export const WORKSHOP = { perDay: 41300, allDays: 103100, cashPerDay: 40000, cashAllDays: 100000, deposit: 10400, depositCredit: 10000 };
export const workshopPrice = (count, totalDays, cash = false) =>
  count === totalDays ? (cash ? WORKSHOP.cashAllDays : WORKSHOP.allDays) : count * (cash ? WORKSHOP.cashPerDay : WORKSHOP.perDay);
// Farm Club membership, per household per year. Charged as a yearly Stripe subscription that renews
// automatically. $200 plus Stripe's fee, like the site's other prices.
export const MEMBERSHIP = { annualFee: 20700 };

export const workshopCashDue = (count, totalDays) => workshopPrice(count, totalDays, true) - WORKSHOP.depositCredit;

export const money = (cents) => (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: cents % 100 ? 2 : 0 });
