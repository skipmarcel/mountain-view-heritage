// Shop and event prices, in cents. The checkout function (api/checkout.js) charges from
// this file too, so the prices on the page and in Stripe always match.
// TODO: confirm merch and shipping prices with the client.

export const MERCH = [
  { id: 'hat', name: 'Trucker Hat', img: '/assets/merch/hat.jpg', price: 3000, body: 'Black, white and red Richardson 112 trucker with our leather pig patch. Adjustable snapback.' },
  { id: 'sticker', name: 'Logo Sticker', img: '/assets/merch/sticker.jpg', price: 500, body: 'Our woodcut pig logo in black and white.' },
];
export const MAX_PER_ITEM = 10;

export const SHIPPING = { price: 600, label: 'Shipping (US)' };
export const PICKUP_ADDRESS = '15353 S Loder Rd., Oregon City, OR 97045';

export const EVENT = { pricePerPerson: 20000, minGuests: 6, maxGuests: 20 };

export const money = (cents) => (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: cents % 100 ? 2 : 0 });
