import { useState } from 'react';
import { GUTTER, btnRadius } from '../config.js';
import { workshop } from '../data/content.js';

const NICK_EMAIL = 'nickkclark@gmail.com';

// Where the Life-to-Table Workshop's "Check availability" button goes. api/workshop-inquiry.js emails Nick.
export default function WorkshopInquiry() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: workshop.inquiryMessage, company: '', days: workshop.days.map((d) => d.label) });
  const [status, setStatus] = useState('idle'); // idle → sending → sent | error
  const [error, setError] = useState('');
  const field = (key) => ({ value: form[key], onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })) });

  const toggleDay = (label) => setForm((f) => ({ ...f, days: f.days.includes(label) ? f.days.filter((d) => d !== label) : [...f.days, label] }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.days.length) {
      setError('Please choose at least one day.');
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/workshop-inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Your message could not be sent.');
      setStatus('sent');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <section style={{ maxWidth: 1440, margin: '0 auto', padding: `clamp(28px,4vw,56px) ${GUTTER} clamp(56px,8vw,112px)` }}>
      {status === 'sent' ? (
        <p className="lede" role="status">Thanks, {form.name}. Your message is on its way to Nick, and he’ll email you about availability.</p>
      ) : (
        <>
          <p className="lede">Add your contact details and Nick will email you about availability.</p>
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 640 }}>
            <div className="field"><label htmlFor="inquiry-name">Name</label><input id="inquiry-name" className="input" type="text" required autoComplete="name" placeholder="Your name" {...field('name')} /></div>
            <div className="field"><label htmlFor="inquiry-email">Email</label><input id="inquiry-email" className="input" type="email" required autoComplete="email" placeholder="you@example.com" {...field('email')} /></div>
            <div className="field"><label htmlFor="inquiry-phone">Phone (optional)</label><input id="inquiry-phone" className="input" type="tel" autoComplete="tel" placeholder="Your phone number" {...field('phone')} /></div>
            <fieldset style={{ border: 0, padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <legend className="kicker accent" style={{ marginBottom: 12 }}>Which days?</legend>
              {workshop.days.map((d) => (
                <label key={d.label} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.days.includes(d.label)} onChange={() => toggleDay(d.label)} style={{ marginTop: 4 }} />
                  <span>{d.label}: {d.title}</span>
                </label>
              ))}
              <span style={{ fontSize: 14 }}>{workshop.prices.map((p) => `${p.amount} ${p.unit}`).join(' · ')}</span>
            </fieldset>
            <div className="field"><label htmlFor="inquiry-message">Message</label><textarea id="inquiry-message" className="input" rows={5} required {...field('message')} /></div>
            {/* Spam trap: hidden from people, filled in by bots. */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: -9999 }} {...field('company')} />
            <button className="btn btn-primary btn-arrow" type="submit" disabled={status === 'sending'} style={{ borderRadius: btnRadius, minWidth: 220, alignSelf: 'flex-start' }}>
              {status === 'sending' ? 'Sending…' : 'Send message'} <span>→</span>
            </button>
            {status === 'error' && (
              <p role="alert" style={{ margin: 0, fontSize: 14, color: 'var(--color-accent-700)' }}>
                {error}{form.days.length > 0 && <> Please email Nick at <a href={`mailto:${NICK_EMAIL}`}>{NICK_EMAIL}</a>.</>}
              </p>
            )}
          </form>
        </>
      )}
    </section>
  );
}
