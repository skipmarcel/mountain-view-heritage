import { NAV_HEIGHT } from '../config.js';
import { WORKSHOP, money } from './shop.js';

const P = '/assets/photos/';

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/education', label: 'Education' },
  { to: '/events', label: 'Events' },
  { to: '/calendar', label: 'Class Calendar' },
  { to: '/shop', label: 'Shop' },
  { to: '/contact', label: 'Contact' },
];

export const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/mtviewheritage/' },
  { label: 'Facebook', href: 'https://www.facebook.com/share/19he1KDkHv/?mibextid=wwXIfr' },
];

// Inner-page photo banners. height also sets where the page content starts.
export const banners = {
  // fit: 'contain' shows the whole photo below the nav; 62.4vw is the photo's height/width ratio.
  education: { img: P + 'nick-01.jpg', pos: 'center 50%', kicker: 'Hands-on classes', title: 'Education', fit: 'contain', height: `calc(${NAV_HEIGHT}px + min(62.4vw, 100vh - ${NAV_HEIGHT}px))` },
  events: { img: P + 'kitchen-11.jpg', pos: 'center 60%', kicker: 'Tastings, parties & private groups', title: 'Events' },
  calendar: { img: P + 'kitchen-12.jpg', pos: 'center 45%', kicker: 'Upcoming sessions', title: 'Calendar' },
  'events/workshop': { img: P + 'kitchen-09.jpg', pos: 'center 50%', kicker: 'Check availability', title: 'Life-to-Table Workshop' },
  shop: { img: P + 'food-05.jpg', pos: 'center 50%', kicker: 'Hats & stickers', title: 'Shop' },
  'events/workshop/pay': { img: P + 'kitchen-09.jpg', pos: 'center 50%', kicker: 'Life-to-Table Workshop', title: 'Workshop payment' },
  'events/pay': { img: P + 'food-03.jpg', pos: 'center 50%', kicker: 'Private events', title: 'Pay for an event' },
  thanks: { img: P + 'mt-hood-trees.jpg', pos: 'center 40%', kicker: 'Payment received', title: 'Thank you' },
  contact: { img: P + 'mt-hood.jpg', pos: 'center 15%', kicker: 'Questions, groups, visits', title: 'Contact', height: '88vh' },
};

export const offerings = [
  { num: '01', title: 'Classes', img: P + 'kitchen-01.jpg', body: 'Hands-on hog processing, curing, sausage and organ meat classes at the farm, booked through Portland Community College.', cta: 'Education', to: '/education' },
  { num: '02', title: 'Private Events', img: P + 'farm-pig-03.jpg', body: 'Open-fire roasts, long-table charcuterie tasting and parties of your design.', cta: 'Events', to: '/events' },
];

export const mosaic = [
  { src: P + 'food-05.jpg', alt: 'Charcuterie on a pig-shaped board' },
  { src: P + 'kitchen-03.jpg', alt: 'Salami with a forged knife' },
  { src: P + 'food-04.jpg', alt: 'Sliced cured ham' },
  { src: P + 'kitchen-10.jpg', alt: 'Stuffing sausage in the kitchen' },
];

// The farm classes listed on PCC's schedule (see the Calendar page).
export const courses = [
  { num: '01', title: 'Hog Processing Basics', img: P + 'kitchen-01.jpg', body: 'The fundamentals of processing heritage breed pigs: humane slaughter techniques, scalding, scraping, evisceration and breaking down the carcass for further processing. No slaughter happens during class. Adults 21+.' },
  { num: '02', title: 'Curing Heritage Pork', img: P + 'kitchen-06.jpg', body: 'Turn primal cuts into classic cured products like prosciutto, bacon, lonza and coppa. Covers dry curing, salting, seasoning and hanging.' },
  { num: '03', title: 'Making Sausage', img: P + 'kitchen-10.jpg', body: 'Break down fresh pork, blend your own seasonings, then grind, stuff and link. You leave with the know-how to make sausage at home, and the links.' },
  { num: '04', title: 'Art of Organ Meats', img: P + 'food-06.jpg', body: 'A hands-on workshop on the parts most often left behind in butchering, and the flavors and know-how of whole-animal cooking. Come curious, leave well fed.' },
  { num: '05', title: 'Private Group Sessions', img: P + 'kitchen-14.jpg', body: 'Bring a team, a club or a celebration to the farm for a class of your own. Get in touch to plan a date.', dates: false },
];

export const events = [
  { title: 'Long-table charcuterie tasting', img: P + 'food-03.jpg', body: 'A shared tasting of the farm’s own charcuterie and seasonal sides.' },
  { title: 'Party or event of your design', img: P + 'farm-pig-03.jpg', body: 'A birthday, reunion or celebration on the farm, planned around what you have in mind.' },
  { title: 'Private group sessions', img: P + 'kitchen-09.jpg', body: 'Book the kitchen classroom for a team, a club or a celebration.' },
];

// Home page review carousel. Live Google reviews (api/reviews.js) replace these once set up;
// these only show if Google isn't available. The section stays hidden if there are none.
// Copy real reviews word for word; rating (1–5), source and date are optional. Example:
//   { name: 'Jane D.', rating: 5, source: 'Google', date: 'October 2026', text: 'The review, word for word.' },
export const reviews = [];

// "Upcoming Events" section at the top of the Events page.
export const workshop = {
  // Where the "Check availability" button goes. Use a full https:// link for another
  // site (opens in a new tab) or a path like /contact for a page on this site.
  availabilityUrl: '/events/workshop',
  inquiryMessage: 'I’m interested in the Life-to-Table workshop!', // pre-filled on that form
  photo: '/assets/workshop/flyer-kitchen.jpg',
  photoAlt: 'Workshop participants butchering at a long wooden kitchen table',
  logo: '/assets/workshop/pig-logo-trans.png',
  brand: 'Mountain View Heritage',
  kicker: 'Three-Day',
  title: 'Life-to-Table Workshop',
  topics: ['Whole-Hog Butchery', 'Charcuterie', 'Traditional Preservation'],
  tagline: 'The whole journey. The whole animal.',
  body: 'Join us at the farm for three days of hands-on learning, traditional craft, and shared meals. Put your hands in the craft of a life-to-table experience, honoring the animal from thoughtful harvest to the table.',
  days: [
    { label: 'Day One', date: 'Friday, March 12', title: 'The Harvest' },
    { label: 'Day Two', date: 'Saturday, March 13', title: 'Curing & Preservation' },
    { label: 'Day Three', date: 'Sunday, March 14', title: 'The Whole Animal: Offal & Sausage' },
  ],
  prices: [ // set in shop.js
    { amount: money(WORKSHOP.perDay), unit: 'per day' },
    { amount: money(WORKSHOP.allDays), unit: 'for all three days' },
  ],
  priceNote: 'Rustic meals with beverages are included each day.',
  dates: 'March 12–14, 2027',
  address: ['15353 S Loder Rd.', 'Oregon City, OR 97045'],
};
