import { NAV_HEIGHT } from '../config.js';

const P = '/assets/photos/';

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/education', label: 'Education' },
  { to: '/events', label: 'Events' },
  { to: '/calendar', label: 'Class Calendar' },
  { to: '/contact', label: 'Contact' },
];

// Inner-page photo banners. height also sets where the page content starts.
export const banners = {
  // fit: 'contain' shows the whole photo below the nav; 62.4vw is the photo's height/width ratio.
  education: { img: P + 'nick-01.jpg', pos: 'center 50%', kicker: 'Hands-on classes', title: 'Education', fit: 'contain', height: `calc(${NAV_HEIGHT}px + min(62.4vw, 100vh - ${NAV_HEIGHT}px))` },
  events: { img: P + 'kitchen-11.jpg', pos: 'center 60%', kicker: 'Dinners, roasts & private groups', title: 'Events' },
  calendar: { img: P + 'kitchen-12.jpg', pos: 'center 45%', kicker: 'Upcoming sessions', title: 'Calendar' },
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

