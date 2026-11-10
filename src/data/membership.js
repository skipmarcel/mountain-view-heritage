// Farm Club Membership Agreement, copied word for word from
// "Membership Agreement (as of September 2026).pdf", with the November 2026 change to
// Article 3 ($200 → $207, to match the fee-inclusive price in shop.js). If the agreement
// changes, update the text here, change VERSION, and regenerate the PDF in public/assets/membership/.
// Every signed agreement records VERSION, so Nick can tell which text a member agreed to.

export const VERSION = 'November 2026';
export const PDF = '/assets/membership/membership-agreement-2026-11.pdf';
export const TITLE = 'Mountain View Heritage Farm Club Membership Agreement';

// Each article is a list of blocks: a string is a paragraph, an array is a bulleted list.
export const ARTICLES = [
  { title: 'Welcome', blocks: [
    'Welcome to the Mountain View Heritage Farm Club.',
    'The Farm Club is a private membership organization dedicated to preserving heritage pig genetics, promoting traditional farming practices, educating members about artisan butchery and charcuterie, and fostering a community that values exceptional food, craftsmanship, and responsible animal husbandry.',
    'Membership is voluntary and subject to the terms of this Agreement.',
  ] },
  { title: 'Article 1 – Mission', blocks: [
    'The mission of Mountain View Heritage Farm Club is to:',
    ['Preserve heritage pig breeds and genetics.', 'Promote humane, pasture-based livestock management.', 'Educate members through workshops, demonstrations, and tastings.', 'Preserve traditional methods of butchery and charcuterie.', 'Build a community centered around exceptional food and agriculture.', 'Produce pork of the highest possible quality through patience rather than speed.'],
  ] },
  { title: 'Article 2 – Our Philosophy', blocks: [
    'At Mountain View Heritage, we believe remarkable pork begins with remarkable animal care.',
    'Our pigs are raised with respect, room to roam, and time to mature naturally. Rather than pursuing rapid production, we focus on developing exceptional flavor, rich marbling, and traditional qualities that make heritage pork unique.',
    'Our guiding principle is simple:',
    'Under Promise. Over Deliver.',
    'Everything we do—from caring for our animals to educating our members—is intended to exceed expectations.',
  ] },
  { title: 'Article 3 – Membership', blocks: [
    'Annual membership is $207 per household, unless otherwise approved by Mountain View Heritage.',
    'Membership becomes active upon acceptance by Mountain View Heritage and payment of annual dues.',
    'Membership renews annually unless cancelled or terminated.',
    'Membership is non-transferable.',
  ] },
  { title: 'Article 4 – Member Benefits', blocks: [
    'Each active member receives:',
    ['Priority notification of workshops.', 'Priority notification of tastings.', 'Priority notification of farm events.', 'Early reservation opportunities for whole, half, and quarter heritage hog shares.', 'Member pricing on eligible workshops and events.', 'Seasonal farm newsletters and educational updates.', 'Access to members-only educational materials.', 'Invitations to special farm experiences.'],
    'In addition, each membership includes one annual $200 Member Credit, which may be applied to one of the following:',
    ['An eligible Mountain View Heritage workshop;', 'A guided charcuterie tasting experience;', 'A whole, half, or quarter hog purchase, subject to availability.'],
    'The Member Credit has no cash value, is non-transferable, and expires if unused at the end of the membership year unless otherwise determined by Mountain View Heritage.',
  ] },
  { title: 'Article 5 – Educational Purpose', blocks: [
    'The Farm Club exists primarily to educate members through activities that may include:',
    ['Heritage pig husbandry', 'Animal welfare', 'Heritage breed preservation', 'Traditional butchery', 'Sausage making', 'Dry-cured salami', 'Whole-muscle curing', 'Smoking techniques', 'Cooking demonstrations', 'Farm tours', 'Sustainable agriculture'],
    'Participation in all activities is voluntary.',
  ] },
  { title: 'Article 6 – Farm Visits', blocks: [
    'Members visiting the farm agree to:',
    ['Respect livestock and property.', 'Follow all instructions provided by farm staff.', 'Supervise children at all times.', 'Wear appropriate footwear and clothing.', 'Observe posted safety rules.', 'Treat fellow members respectfully.'],
    'Mountain View Heritage may postpone or cancel events because of weather, animal health, safety concerns, or other unforeseen circumstances.',
  ] },
  { title: 'Article 7 – Workshops', blocks: [
    'Workshops are educational experiences designed to teach traditional agricultural and culinary skills.',
    'Members understand that some workshops may involve:',
    ['Knives', 'Meat processing equipment', 'Grinders', 'Smokers', 'Curing chambers', 'Cooking equipment'],
    'Participants agree to follow all safety instructions and may be required to sign additional activity waivers before participating.',
  ] },
  { title: 'Article 8 – Heritage Pork Reservations', blocks: [
    'Members may reserve whole, half, or quarter heritage hog shares when available.',
    'Reservations are accepted on a first-come, first-served basis unless otherwise announced.',
    'Availability depends on livestock production, seasonal conditions, and other farm operations.',
    'Mountain View Heritage cannot guarantee availability of specific animals, breeds, or processing dates.',
  ] },
  { title: 'Article 9 – Tastings', blocks: [
    'Members may be invited to educational tastings featuring heritage pork and traditional charcuterie.',
    'Products served may vary depending on seasonal production and availability.',
    'Members are responsible for informing Mountain View Heritage of any food allergies before participating.',
  ] },
  { title: 'Article 10 – Code of Conduct', blocks: [
    'Members agree to:',
    ['Support the mission of the Farm Club.', 'Respect fellow members.', 'Respect livestock and property.', 'Follow safety instructions.', 'Conduct themselves professionally during events.', 'Refrain from disruptive or abusive behavior.'],
    'Failure to follow these standards may result in suspension or termination of membership.',
  ] },
  { title: 'Article 11 – Member Information', blocks: [
    'Mountain View Heritage respects the privacy of its members.',
    'Personal information will be used only for Farm Club communications and business operations unless otherwise required by law or authorized by the member.',
  ] },
  { title: 'Article 12 – Membership Suspension or Termination', blocks: [
    'Mountain View Heritage reserves the right to suspend or terminate membership for:',
    ['Non-payment of dues.', 'Unsafe conduct.', 'Harassment.', 'Property damage.', 'Repeated violation of Farm Club policies.', 'Conduct materially inconsistent with the mission of the Farm Club.'],
    'Membership fees are generally non-refundable unless otherwise determined by Mountain View Heritage.',
  ] },
  { title: 'Article 13 – Changes to Membership', blocks: [
    'Mountain View Heritage may update membership benefits, educational offerings, pricing, policies, or procedures as the Farm Club grows.',
    'Members will be notified of significant changes.',
  ] },
  { title: 'Article 14 – Assumption of Risk', blocks: [
    'Members understand that farms are working agricultural environments that may include uneven terrain, livestock, tools, machinery, and other hazards.',
    'Members voluntarily assume the ordinary risks associated with participating in farm visits and educational activities.',
    'Nothing in this Agreement waives rights or responsibilities that cannot legally be waived under applicable law.',
  ] },
  { title: 'Article 15 – Governing Law', blocks: [
    'This Agreement shall be interpreted in accordance with the laws of the State of Oregon unless otherwise required by applicable law.',
  ] },
  { title: 'Article 16 – Acknowledgment', blocks: [
    'By signing below, I acknowledge that:',
    ['I voluntarily wish to become a member of the Mountain View Heritage Farm Club.', 'I have read and understand this Agreement.', 'I agree to follow Farm Club policies.', 'I understand that workshops, events, and pork availability may change.', 'I understand that additional waivers may be required for certain activities.', 'I understand that this membership does not guarantee the availability of any specific product or event.'],
  ] },
  { title: 'Our Promise', blocks: [
    'Mountain View Heritage is committed to preserving heritage livestock, practicing responsible animal husbandry, and sharing traditional food knowledge with our members.',
    'We strive to produce exceptional pork, exceptional charcuterie, and exceptional educational experiences.',
    'Our promise is simple:',
    'Under Promise. Over Deliver.',
  ] },
];

// The "Member Information" section of the agreement. Shared by the page and api/checkout.js.
export const FIELDS = [
  { key: 'name', label: 'Member name', autoComplete: 'name', required: true, max: 100 },
  { key: 'household', label: 'Household members (if applicable)', required: false, max: 300 },
  { key: 'address', label: 'Address', autoComplete: 'street-address', required: true, max: 200 },
  { key: 'city', label: 'City', autoComplete: 'address-level2', required: true, max: 80 },
  { key: 'state', label: 'State', autoComplete: 'address-level1', required: true, max: 30 },
  { key: 'zip', label: 'ZIP', autoComplete: 'postal-code', required: true, max: 10 },
  { key: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel', required: true, max: 40 },
  { key: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true, max: 200 },
];

// Membership term: one year from the day they sign, as dates like "November 10, 2026".
export function membershipTerm(from = new Date()) {
  const to = new Date(from);
  to.setFullYear(to.getFullYear() + 1);
  const fmt = (d) => d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Los_Angeles' });
  return { from: fmt(from), to: fmt(to) };
}

// A typed signature counts only if it matches the member's name (ignoring case and extra spaces).
export const signatureMatches = (signature, name) => {
  const norm = (s) => String(s || '').trim().replace(/\s+/g, ' ').toLowerCase();
  return norm(signature) !== '' && norm(signature) === norm(name);
};
