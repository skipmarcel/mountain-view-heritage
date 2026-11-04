import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { config, HERO_CLIPS, NAV_HEIGHT, PEEK, btnRadius } from '../config.js';

// Hero logo SVG aspect ratio (width / height), used to place the headline beside it.
export const LOGO_ASPECT = 0.594;

const TAGS = ['Heritage hogs', 'Butchery', 'Charcuterie'];
// On phones the tags stack beside the logo, shortest to longest.
const STACKED_TAGS = [...TAGS].sort((a, b) => a.length - b.length);

// onReady fires once the first clip can show a frame; logoHidden keeps the logo hidden while the Intro covers it.
export default function Hero({ narrow, visible, onReady, logoHidden }) {
  const navigate = useNavigate();
  const refs = useRef([]);
  const [active, setActive] = useState(0);
  // The other clips only start downloading once the first one is ready, so it gets all the bandwidth.
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const first = refs.current[0];
    if (first) { first.muted = true; first.play().catch(() => {}); }
  }, []);

  const handleFirstReady = () => {
    if (started) return;
    setStarted(true);
    onReady?.();
  };

  useEffect(() => {
    if (!started) return;
    const t = setInterval(() => {
      setActive((a) => {
        const next = (a + 1) % HERO_CLIPS.length;
        const v = refs.current[next];
        if (v) { v.muted = true; v.currentTime = 0; v.play().catch(() => {}); }
        return next;
      });
    }, config.clipSeconds * 1000);
    return () => clearInterval(t);
  }, [started]);

  const m = narrow ? Math.min(config.logoMargin, 20) : config.logoMargin;
  // Everything sits above the strip of page that peeks up from the bottom (see PEEK).
  const bottom = `calc(clamp(32px, 7vh, 72px) + ${PEEK}px)`;
  // Desktop: the logo fills the height to the left of the headline.
  const avail = `(100% - ${NAV_HEIGHT}px - ${2 * m}px - ${PEEK}px)`;
  const logoTop = `calc(100% - ${bottom} - ${avail} * 0.85)`;
  const textLeft = narrow
    ? m + 'px'
    : `calc(${m}px + (100vh - ${NAV_HEIGHT}px - ${2 * m}px - ${PEEK}px) * 0.85 * ${LOGO_ASPECT} + 40px)`;

  // Phones: the logo sits in the text block, right above the headline.
  const logoStyle = narrow
    ? { display: 'block', height: 'clamp(96px, 17vh, 150px)', width: 'auto', flexShrink: 0 }
    : { position: 'absolute', left: m, top: logoTop, height: `calc(${avail} * 0.85)`, width: 'auto', maxWidth: `calc(100% - ${2 * m}px)`, objectFit: 'contain', objectPosition: 'left top' };
  const logo = (
    <img id="hero-logo" src="/assets/logo-mvh-white.svg" alt="" style={{ ...logoStyle, opacity: logoHidden ? 0 : config.logoOpacity, pointerEvents: 'none' }} />
  );

  return (
    <div style={{ position: 'absolute', inset: 0, visibility: visible ? 'visible' : 'hidden' }}>
      {HERO_CLIPS.map((clip, i) => (
        <video
          key={clip.src}
          ref={(el) => (refs.current[i] = el)}
          src={i === 0 || started ? clip.src : undefined}
          onCanPlay={i === 0 ? handleFirstReady : undefined}
          muted
          playsInline
          loop
          preload="auto"
          // cropBottom: the video is made taller than the hero so its bottom slice falls off-screen.
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: `${100 / (1 - (clip.cropBottom || 0))}%`, objectFit: 'cover', opacity: i === active ? 1 : 0, transition: `opacity ${config.fadeSeconds}s ease-in-out` }}
        />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.25) 0%,rgba(0,0,0,0) 30%,rgba(0,0,0,0) 55%,rgba(0,0,0,.6) 100%)' }} />
      {!narrow && logo}
      <div style={{ position: 'absolute', left: textLeft, right: 'clamp(20px,4vw,56px)', bottom, color: '#fff', display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        {narrow ? (
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
            {logo}
            <div className="kicker" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {STACKED_TAGS.map((t) => <span key={t}>{t}</span>)}
            </div>
          </div>
        ) : (
          <div className="kicker">{TAGS.join(' · ')}</div>
        )}
        <h1 style={{ margin: 0, fontSize: 'clamp(40px,5.6vw,88px)', lineHeight: 0.98, letterSpacing: '-.025em', fontWeight: 800, textWrap: 'balance' }}>
          Learn the whole process, life to table
        </h1>
        <button className="btn btn-primary btn-arrow" onClick={() => navigate('/calendar')} style={{ borderRadius: btnRadius, minWidth: 260 }}>
          See upcoming classes <span>→</span>
        </button>
      </div>
    </div>
  );
}
