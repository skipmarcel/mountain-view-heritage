import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { config, HERO_CLIPS, NAV_HEIGHT, btnRadius } from '../config.js';

// Hero logo SVG aspect ratio (width / height), used to place the headline beside it.
const LOGO_ASPECT = 0.594;

export default function Hero({ narrow, visible }) {
  const navigate = useNavigate();
  const refs = useRef([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const first = refs.current[0];
    if (first) { first.muted = true; first.play().catch(() => {}); }
    const t = setInterval(() => {
      setActive((a) => {
        const next = (a + 1) % HERO_CLIPS.length;
        const v = refs.current[next];
        if (v) { v.muted = true; v.currentTime = 0; v.play().catch(() => {}); }
        return next;
      });
    }, config.clipSeconds * 1000);
    return () => clearInterval(t);
  }, []);

  const m = narrow ? Math.min(config.logoMargin, 20) : config.logoMargin;
  const avail = `(100% - ${NAV_HEIGHT}px - ${2 * m}px${narrow ? ' - 290px' : ''})`;
  const logoHeight = `calc(${avail} * 0.85)`;
  const logoTop = narrow
    ? `calc(${NAV_HEIGHT}px + ${m}px)`
    : `calc(100% - clamp(32px, 7vh, 72px) - ${avail} * 0.85)`;
  const textLeft = narrow
    ? m + 'px'
    : `calc(${m}px + (100vh - ${NAV_HEIGHT}px - ${2 * m}px) * 0.85 * ${LOGO_ASPECT} + 40px)`;

  return (
    <div style={{ position: 'absolute', inset: 0, visibility: visible ? 'visible' : 'hidden' }}>
      {HERO_CLIPS.map((src, i) => (
        <video
          key={src}
          ref={(el) => (refs.current[i] = el)}
          src={src}
          muted
          playsInline
          loop
          preload="auto"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: i === active ? 1 : 0, transition: `opacity ${config.fadeSeconds}s ease-in-out` }}
        />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.25) 0%,rgba(0,0,0,0) 30%,rgba(0,0,0,0) 55%,rgba(0,0,0,.6) 100%)' }} />
      <img
        src="/assets/logo-mvh-white.svg"
        alt=""
        style={{ position: 'absolute', left: m, top: logoTop, height: logoHeight, width: 'auto', maxWidth: `calc(100% - ${2 * m}px)`, objectFit: 'contain', objectPosition: 'left top', opacity: config.logoOpacity, pointerEvents: 'none' }}
      />
      <div style={{ position: 'absolute', left: textLeft, right: 'clamp(20px,4vw,56px)', bottom: 'clamp(32px,7vh,72px)', color: '#fff', display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        <div className="kicker">Heritage hogs · Butchery · Charcuterie</div>
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
