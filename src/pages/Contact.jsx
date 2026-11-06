import { useState } from 'react';
import { GUTTER, photoFilter, btnRadius } from '../config.js';
import SocialLinks from '../components/SocialLinks.jsx';
import { sendForm } from '../formspree.js';

const NICK_EMAIL = 'nickkclark@gmail.com';
const INTERESTS = ['A class', 'A farm dinner or event', 'A private group session', 'Something else'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', interest: INTERESTS[0], message: '', _gotcha: '' });
  const [status, setStatus] = useState('idle'); // idle → sending → sent | error
  const field = (key) => ({ value: form[key], onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })) });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendForm({ _subject: `Website message from ${form.name}`, form: 'Contact page', ...form });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section style={{ maxWidth: 1440, margin: '0 auto', padding: `clamp(56px,8vw,112px) ${GUTTER}`, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 'clamp(40px,6vw,96px)' }}>
      {status === 'sent' ? (
        <p className="lede" role="status" style={{ margin: 0 }}>Thanks, {form.name}. Your message is on its way to Nick, and he’ll reply by email.</p>
      ) : (
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="field"><label htmlFor="contact-name">Name</label><input id="contact-name" className="input" type="text" required autoComplete="name" placeholder="Your name" {...field('name')} /></div>
          <div className="field"><label htmlFor="contact-email">Email</label><input id="contact-email" className="input" type="email" required autoComplete="email" placeholder="you@example.com" {...field('email')} /></div>
          <div className="field">
            <label htmlFor="contact-interest">Interested in</label>
            <select id="contact-interest" className="input" {...field('interest')}>
              {INTERESTS.map((i) => <option key={i}>{i}</option>)}
            </select>
          </div>
          <div className="field"><label htmlFor="contact-message">Message</label><textarea id="contact-message" className="input" rows={5} required placeholder="Tell us a little about what you're after" {...field('message')} /></div>
          {/* Spam trap: hidden from people, filled in by bots. */}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: -9999 }} {...field('_gotcha')} />
          <button className="btn btn-primary btn-arrow" type="submit" disabled={status === 'sending'} style={{ borderRadius: btnRadius, minWidth: 220, alignSelf: 'flex-start' }}>
            {status === 'sending' ? 'Sending…' : 'Send message'} <span>→</span>
          </button>
          {status === 'error' && (
            <p role="alert" style={{ margin: 0, fontSize: 14, color: 'var(--color-accent-700)' }}>
              Your message could not be sent. Please email Nick at <a href={`mailto:${NICK_EMAIL}`}>{NICK_EMAIL}</a>.
            </p>
          )}
        </form>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, borderTop: '2px solid var(--color-text)', paddingTop: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <h6 style={{ margin: 0 }}>Visit</h6>
          <p style={{ margin: 0, fontSize: 18 }}>15353 S Loder Rd.<br />Oregon City, OR<br />97045</p>
          <a href="https://www.google.com/maps/search/?api=1&query=15353+S+Loder+Rd%2C+Oregon+City%2C+OR+97045" target="_blank" rel="noopener noreferrer" style={{ fontSize: 15 }}>Open in Google Maps →</a>
          <iframe title="Map to Mountain View Heritage" src="https://maps.google.com/maps?q=15353+S+Loder+Rd%2C+Oregon+City%2C+OR+97045&z=14&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ width: '100%', aspectRatio: '16/10', border: '2px solid var(--color-text)', marginTop: 12 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <h6 style={{ margin: 0 }}>Write</h6>
          <p style={{ margin: 0, fontSize: 18 }}><a href={`mailto:${NICK_EMAIL}`}>{NICK_EMAIL}</a></p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h6 style={{ margin: 0 }}>Follow</h6>
          <SocialLinks size={28} />
        </div>
        <img src="/assets/photos/kitchen-14.jpg" alt="Hand-forged knives on a magnetic strip" style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', filter: photoFilter }} />
      </div>
    </section>
  );
}
