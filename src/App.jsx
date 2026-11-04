import { useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { config, FONT_PAIRINGS, NAV_HEIGHT, PEEK } from './config.js';
import { useViewport } from './hooks.js';
import { banners } from './data/content.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Intro from './components/Intro.jsx';
import PageBanner from './components/PageBanner.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Education from './pages/Education.jsx';
import Events from './pages/Events.jsx';
import Calendar from './pages/Calendar.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  const { pathname } = useLocation();
  const vp = useViewport();
  const [menuOpen, setMenuOpen] = useState(false);
  // Loading screen only when the visit starts on the home page.
  const [intro, setIntro] = useState(() => pathname === '/');
  const [heroReady, setHeroReady] = useState(false);
  const mainRef = useRef(null);
  const page = pathname.replace(/^\//, '') || 'home';
  const home = page === 'home';
  const banner = banners[page];

  useEffect(() => { window.scrollTo(0, 0); setMenuOpen(false); }, [pathname]);

  const accent = config.accentColor;
  const [fontHeading, fontBody] = FONT_PAIRINGS[config.fontPairing] || FONT_PAIRINGS.Archivo;
  const solid = !home || vp.scrollY > vp.h - PEEK - 130 || menuOpen;

  const scrollToContent = () => {
    const top = mainRef.current.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        '--color-accent': accent,
        '--color-accent-600': `color-mix(in oklab, ${accent} 85%, black)`,
        '--color-accent-700': `color-mix(in oklab, ${accent} 72%, black)`,
        '--font-heading': fontHeading,
        '--font-body': fontBody,
        '--peek': PEEK + 'px',
        fontFamily: 'var(--font-body)',
        color: 'var(--color-text)',
      }}
    >
      {intro && <Intro ready={heroReady} onDone={() => setIntro(false)} />}
      <Header solid={solid} narrow={vp.narrow} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#000', overflow: 'hidden' }}>
        <Hero narrow={vp.narrow} visible={home} onReady={() => setHeroReady(true)} logoHidden={intro} />
        {banner && <PageBanner {...banner} />}
      </div>
      <main
        ref={mainRef}
        className={home ? 'home-main' : undefined}
        style={{
          position: 'relative', zIndex: 1,
          marginTop: home ? undefined : banner?.height || '64vh',
          background: 'var(--color-bg)', borderTop: '2px solid var(--color-text)',
        }}
      >
        {home && (
          <button className="scroll-cue" onClick={scrollToContent} aria-label="Scroll down for more" style={{ height: PEEK, opacity: vp.scrollY > 40 ? 0 : 1 }}>
            <span className="kicker">Scroll</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
          </button>
        )}
        <Routes>
          <Route path="/" element={<Home narrow={vp.narrow} />} />
          <Route path="/education" element={<Education />} />
          <Route path="/events" element={<Events />} />
          <Route path="/calendar" element={<Calendar narrow={vp.narrow} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home narrow={vp.narrow} />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}
