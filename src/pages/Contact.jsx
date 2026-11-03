import { useState } from 'react';
import { GUTTER, photoFilter, btnRadius } from '../config.js';
import SocialLinks from '../components/SocialLinks.jsx';

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section style={{ maxWidth: 1440, margin: '0 auto', padding: `clamp(56px,8vw,112px) ${GUTTER}`, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 'clamp(40px,6vw,96px)' }}>
      <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="field"><label>Name</label><input className="input" type="text" placeholder="Your name" /></div>
        <div className="field"><label>Email</label><input className="input" type="email" placeholder="you@example.com" /></div>
        <div className="field">
          <label>Interested in</label>
          <select className="input">
            <option>A class</option>
            <option>A farm dinner or event</option>
            <option>A private group session</option>
            <option>Something else</option>
          </select>
        </div>
        <div className="field"><label>Message</label><textarea className="input" rows={5} placeholder="Tell us a little about what you're after" /></div>
        <button className="btn btn-primary btn-arrow" type="submit" style={{ borderRadius: btnRadius, minWidth: 220, alignSelf: 'flex-start' }}>
          {sent ? 'Sent — thank you' : 'Send message'} <span>→</span>
        </button>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, borderTop: '2px solid var(--color-text)', paddingTop: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <h6 style={{ margin: 0 }}>Visit</h6>
          <p style={{ margin: 0, fontSize: 18 }}>15353 S Loder Rd.<br />Oregon City, OR<br />97045</p>
          <a href="https://www.google.com/maps/search/?api=1&query=15353+S+Loder+Rd%2C+Oregon+City%2C+OR+97045" target="_blank" rel="noopener noreferrer" style={{ fontSize: 15 }}>Open in Google Maps →</a>
          <iframe title="Map to Mountain View Heritage" src="https://maps.google.com/maps?q=15353+S+Loder+Rd%2C+Oregon+City%2C+OR+97045&z=14&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ width: '100%', aspectRatio: '16/10', border: '2px solid var(--color-text)', marginTop: 12 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <h6 style={{ margin: 0 }}>Write</h6>
          <p style={{ margin: 0, fontSize: 18 }}><a href="mailto:nickkclark@gmail.com">nickkclark@gmail.com</a></p>
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
