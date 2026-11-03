import { Link, NavLink } from 'react-router-dom';
import { NAV_HEIGHT, GUTTER, btnRadius } from '../config.js';
import { navLinks } from '../data/content.js';

export default function Header({ solid, narrow, menuOpen, setMenuOpen }) {
  const ink = solid ? 'var(--color-text)' : '#ffffff';
  return (
    <>
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 20, height: NAV_HEIGHT,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14,
          padding: `0 ${GUTTER}`,
          background: solid ? 'var(--color-bg)' : 'transparent',
          borderBottom: `2px solid ${solid ? 'var(--color-text)' : 'transparent'}`,
          transition: 'background .3s, border-color .3s',
        }}
      >
        <Link to="/" aria-label="Mountain View Heritage — Home" style={{ position: 'relative', display: 'block', width: 'clamp(220px,27vw,370px)', aspectRatio: '1615.7/78' }}>
          <img src="/assets/mvh-mono-white.svg" alt="Mountain View Heritage" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: solid ? 0 : 1, transition: 'opacity .3s' }} />
          <img src="/assets/mvh-mono-ink.svg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: solid ? 1 : 0, transition: 'opacity .3s' }} />
        </Link>
        {narrow ? (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ borderRadius: btnRadius, background: 'none', border: `2px solid ${ink}`, color: ink, font: '600 13px var(--font-body)', letterSpacing: '.1em', textTransform: 'uppercase', padding: '8px 14px', cursor: 'pointer' }}
          >
            Menu
          </button>
        ) : (
          <nav style={{ display: 'flex', gap: 'clamp(16px,2.6vw,40px)', alignItems: 'center', justifyContent: 'center' }}>
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end
                className="nav-link"
                style={({ isActive }) => ({
                  color: ink, textDecoration: 'none', fontSize: 13, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', padding: '6px 0',
                  borderBottom: `2px solid ${isActive ? 'var(--color-accent)' : 'transparent'}`,
                })}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>
      {narrow && menuOpen && (
        <div style={{ position: 'fixed', top: NAV_HEIGHT, left: 0, right: 0, zIndex: 19, background: 'var(--color-bg)', borderBottom: '2px solid var(--color-text)', display: 'flex', flexDirection: 'column' }}>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} style={{ color: 'var(--color-text)', textDecoration: 'none', fontSize: 22, fontWeight: 800, padding: `16px ${GUTTER}`, borderTop: '2px solid var(--color-divider)' }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
