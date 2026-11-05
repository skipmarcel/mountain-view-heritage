import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { workshop as w } from '../data/content.js';

// Paths stay on this site; full URLs open in a new tab. Set the link in content.js.
function AvailabilityLink() {
  const label = <><span>Check availability</span><span>→</span></>;
  return w.availabilityUrl.startsWith('/')
    ? <Link className="workshop-btn" to={w.availabilityUrl}>{label}</Link>
    : <a className="workshop-btn" href={w.availabilityUrl} target="_blank" rel="noopener noreferrer">{label}</a>;
}

export default function WorkshopSection() {
  return (
    <article className="workshop">
      <img className="workshop-photo" src={w.photo} alt={w.photoAlt} />

      <div className="workshop-title">
        <img className="workshop-logo" src={w.logo} alt="" />
        <div className="workshop-title-text">
          <div className="workshop-brand">{w.brand}</div>
          <div className="workshop-kicker">{w.kicker}</div>
          <h3>{w.title}</h3>
          <div className="workshop-topics">
            {w.topics.map((t, i) => (
              <Fragment key={t}>
                {i > 0 && <i aria-hidden="true">■</i>}
                <span>{t}</span>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="workshop-intro">
        <div className="workshop-tagline">{w.tagline}</div>
        <p>{w.body}</p>
      </div>

      <div className="workshop-cells workshop-schedule">
        {w.days.map((d) => (
          <div className="workshop-cell" key={d.label}>
            <div className="workshop-label">{d.label}</div>
            <div className="workshop-day">{d.title}</div>
          </div>
        ))}
      </div>

      <div className="workshop-cells workshop-details">
        <div className="workshop-cell">
          {w.prices.map((p) => (
            <div className="workshop-price" key={p.unit}>{p.amount} <span>{p.unit}</span></div>
          ))}
          <div className="workshop-note">{w.priceNote}</div>
        </div>
        <div className="workshop-cell">
          <div className="workshop-label">When &amp; where</div>
          <div className="workshop-where">{w.dates}</div>
          <div className="workshop-where">{w.address[0]}<br />{w.address[1]}</div>
        </div>
        <div className="workshop-cell">
          <AvailabilityLink />
        </div>
      </div>
    </article>
  );
}
