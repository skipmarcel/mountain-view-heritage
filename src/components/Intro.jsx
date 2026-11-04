import { useEffect, useState } from 'react';
import { config } from '../config.js';
import { LOGO_ASPECT } from './Hero.jsx';

// First-visit loading screen for the home page: the logo comes into focus in the
// middle of the screen while the first hero clip loads, then glides down into its
// place in the hero (#hero-logo) as the overlay fades away.
const FOCUS_MS = 1200; // logo coming into focus
const MIN_MS = 1600;   // always let the focus animation finish before moving
const MAX_MS = 8000;   // stop waiting for a slow video
const MOVE_MS = 1000;  // logo gliding into place

const EASE = 'cubic-bezier(.65,0,.35,1)';

function centeredBox() {
  const vw = window.innerWidth, vh = window.innerHeight;
  const height = Math.min(vh * 0.5, (vw * 0.6) / LOGO_ASPECT);
  const width = height * LOGO_ASPECT;
  return { left: (vw - width) / 2, top: (vh - height) / 2, width, height };
}

// The hero logo's box can be wider than the drawn logo (object-fit: contain, left top).
function heroLogoBox() {
  const el = document.getElementById('hero-logo');
  if (!el) return null;
  const r = el.getBoundingClientRect();
  const width = Math.min(r.width, r.height * LOGO_ASPECT);
  return { left: r.left, top: r.top, width, height: width / LOGO_ASPECT };
}

export default function Intro({ ready, onDone }) {
  const [phase, setPhase] = useState('in'); // in → focused → move
  const [box, setBox] = useState(centeredBox);
  const [minPassed, setMinPassed] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setPhase('focused')));
    const min = setTimeout(() => setMinPassed(true), MIN_MS);
    const max = setTimeout(() => setTimedOut(true), MAX_MS);
    return () => {
      cancelAnimationFrame(raf); clearTimeout(min); clearTimeout(max);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (phase !== 'focused' || !minPassed || !(ready || timedOut)) return;
    const target = heroLogoBox();
    if (target) setBox(target);
    setPhase('move');
  }, [phase, minPassed, ready, timedOut]);

  useEffect(() => {
    if (phase !== 'move') return;
    const t = setTimeout(onDone, MOVE_MS);
    return () => clearTimeout(t);
  }, [phase]);

  const moving = phase === 'move';
  const blurred = phase === 'in' && !reduceMotion;
  const transition = moving
    ? ['left', 'top', 'width', 'height'].map((p) => `${p} ${MOVE_MS}ms ${EASE}`).concat(`opacity ${MOVE_MS}ms ease`).join(', ')
    : `opacity ${FOCUS_MS}ms ease, filter ${FOCUS_MS}ms ease, transform ${FOCUS_MS}ms ease-out`;

  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 40, background: moving ? 'rgba(17,17,17,0)' : '#111', transition: `background ${MOVE_MS}ms ease`, pointerEvents: moving ? 'none' : 'auto' }}>
      <img
        src="/assets/logo-mvh-white.svg"
        alt=""
        style={{
          position: 'absolute', ...box,
          opacity: phase === 'in' ? 0 : moving ? config.logoOpacity : 1,
          filter: blurred ? 'blur(24px)' : 'blur(0px)',
          transform: blurred ? 'scale(1.08)' : 'none',
          transition,
        }}
      />
    </div>
  );
}
