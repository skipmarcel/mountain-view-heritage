import { photoFilter, GUTTER, NAV_HEIGHT } from '../config.js';

export default function PageBanner({ img, pos, kicker, title, height = '64vh', fit = 'cover' }) {
  // 'contain' starts the photo below the nav so none of it is hidden.
  const top = fit === 'contain' ? NAV_HEIGHT : 0;
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#000' }}>
      <img src={img} alt="" style={{ position: 'absolute', top, left: 0, width: '100%', height: `calc(${height} - ${top}px)`, objectFit: fit, objectPosition: pos, filter: photoFilter }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height, background: 'linear-gradient(180deg,rgba(0,0,0,.35) 0%,rgba(0,0,0,0) 35%,rgba(0,0,0,.55) 100%)' }} />
      <div style={{ position: 'absolute', left: GUTTER, right: GUTTER, top: `calc(${height} - 48px)`, transform: 'translateY(-100%)', color: '#fff' }}>
        <div className="kicker" style={{ marginBottom: 12 }}>{kicker}</div>
        <h1 style={{ margin: 0, fontSize: 'clamp(44px,7vw,112px)', lineHeight: 0.95, letterSpacing: '-.03em', fontWeight: 800 }}>{title}</h1>
      </div>
    </div>
  );
}
