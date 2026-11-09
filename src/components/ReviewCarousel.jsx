import { useEffect, useRef, useState } from 'react';
import { GUTTER } from '../config.js';

const AUTOPLAY_MS = 8000;

function Stars({ rating }) {
  if (!rating) return null;
  return (
    <div className="reviews-stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(rating)}<span aria-hidden="true">{'★'.repeat(5 - rating)}</span>
    </div>
  );
}

// Live Google reviews from api/reviews.js. Falls back to the hand-picked reviews in content.js
// if Google isn't set up or doesn't answer (including on `npm run dev`, which has no /api).
export function useReviews(fallback) {
  const [data, setData] = useState({ reviews: fallback });
  useEffect(() => {
    let live = true;
    fetch('/api/reviews')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (live && d?.reviews?.length) setData(d); })
      .catch(() => {});
    return () => { live = false; };
  }, []);
  return data;
}

// Home page review carousel. Hidden when there are no reviews.
// summary: { rating, count, url } from Google, shown as a link under the reviews.
export default function ReviewCarousel({ reviews, summary, kicker, title }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false); // stays stopped once someone uses the controls
  const touchX = useRef(null);
  const count = reviews.length;

  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const autoplay = count > 1 && !paused && !stopped && !reducedMotion;

  useEffect(() => {
    if (!autoplay) return undefined;
    const t = setTimeout(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [autoplay, index, count]);

  if (!count) return null;

  const go = (i) => { setStopped(true); setIndex((i + count) % count); };
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section className="reviews" aria-roledescription="carousel" aria-label="Reviews"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}>
      <div className="reviews-inner" style={{ padding: `clamp(56px,8vw,112px) ${GUTTER}` }}>
        <div className="reviews-head">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="kicker accent">{kicker}</div>
            <h2 className="reviews-title">{title}</h2>
          </div>
          {count > 1 && (
            <div className="reviews-controls">
              <span className="reviews-count" aria-hidden="true">{pad(index + 1)} / {pad(count)}</span>
              <button type="button" className="reviews-btn" onClick={() => go(index - 1)} aria-label="Previous review">←</button>
              <button type="button" className="reviews-btn" onClick={() => go(index + 1)} aria-label="Next review">→</button>
            </div>
          )}
        </div>

        <div className="reviews-track" aria-live={autoplay ? 'off' : 'polite'}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current == null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
          }}>
          {reviews.map((r, i) => (
            <figure key={i} className={`reviews-slide${i === index ? ' is-active' : ''}`} role="group" aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`} aria-hidden={i !== index} inert={i !== index ? '' : undefined}>
              <Stars rating={r.rating} />
              <blockquote className="reviews-quote">“{r.text}”</blockquote>
              {r.url && <a className="reviews-more" href={r.url} target="_blank" rel="noopener noreferrer">Read on Google →</a>}
              <figcaption className="reviews-who">
                <strong>{r.authorUrl ? <a href={r.authorUrl} target="_blank" rel="noopener noreferrer">{r.name}</a> : r.name}</strong>
                {(r.source || r.date) && <span>{[r.source, r.date].filter(Boolean).join(' · ')}</span>}
              </figcaption>
            </figure>
          ))}
        </div>

        {(count > 1 || summary?.url) && (
          <div className="reviews-foot">
          {count > 1 && <div className="reviews-dots">
            {reviews.map((r, i) => (
              <button key={i} type="button" className={`reviews-dot${i === index ? ' is-active' : ''}`} onClick={() => go(i)}
                aria-label={`Show review ${i + 1}`} aria-current={i === index ? 'true' : undefined} />
            ))}
          </div>}
          {summary?.url && (
            <a className="reviews-google" href={summary.url} target="_blank" rel="noopener noreferrer">
              {summary.rating ? `${summary.rating.toFixed(1)} ★ from ${summary.count} reviews on Google` : 'See all reviews on Google'} →
            </a>
          )}
          </div>
        )}
      </div>
    </section>
  );
}
