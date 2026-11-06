// Both the Contact form and the workshop form send through this Formspree form.
// Change who receives the emails in the Formspree dashboard, not here.
const FORM_URL = 'https://formspree.io/f/mkjjaowb';

// Formspree treats these field names specially: "email" becomes the reply-to address,
// "_subject" the email subject, and "_gotcha" is a spam trap that only bots fill in.
export async function sendForm(fields) {
  const res = await fetch(FORM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(fields),
  });
  if (!res.ok) throw new Error('Your message could not be sent.');
}
