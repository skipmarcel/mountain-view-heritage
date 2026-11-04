import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GUTTER, btnRadius } from '../config.js';
import { navLinks } from '../data/content.js';
import SocialLinks from './SocialLinks.jsx';

export default function Footer() {
  const [listed, setListed] = useState(false);
  return (
    <footer style={{ background: 'var(--color-text)', color: 'var(--color-neutral-200)', borderTop: '2px solid var(--color-text)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: `64px ${GUTTER} 40px`, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: 40 }}>
        <img src="/assets/logo-mvh-white.svg" alt="Mountain View Heritage" style={{ width: 96, height: 'auto' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h6 style={{ margin: 0, color: '#fff' }}>Explore</h6>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="footer-link">{l.label}</Link>
          ))}
          <Link to="/events/pay" className="footer-link">Pay for an event</Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h6 style={{ margin: 0, color: '#fff' }}>Find us</h6>
          <a className="footer-link" href="https://www.google.com/maps/search/?api=1&query=15353+S+Loder+Rd%2C+Oregon+City%2C+OR+97045" target="_blank" rel="noopener noreferrer">15353 S Loder Rd.<br />Oregon City, OR 97045</a>
          <a className="footer-link" href="mailto:nickkclark@gmail.com">nickkclark@gmail.com</a>
          <div style={{ marginTop: 6 }}><SocialLinks className="footer-link" /></div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setListed(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h6 style={{ margin: 0, color: '#fff' }}>Mailing list</h6>
          <span style={{ fontSize: 15 }}>New class dates, first.</span>
          <div style={{ display: 'flex' }}>
            <input type="email" placeholder="Email" style={{ flex: 1, minWidth: 0, font: '15px var(--font-body)', padding: '10px 12px', border: '2px solid var(--color-neutral-200)', background: 'transparent', color: '#fff', borderRadius: `${btnRadius} 0 0 ${btnRadius}` }} />
            <button className="btn btn-primary" type="submit" style={{ borderRadius: `0 ${btnRadius} ${btnRadius} 0` }}>{listed ? 'Added' : 'Join'}</button>
          </div>
        </form>
      </div>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: `20px ${GUTTER}`, borderTop: '2px solid var(--color-neutral-700)', fontSize: 13 }}>
        © 2026 Mountain View Heritage
      </div>
    </footer>
  );
}
