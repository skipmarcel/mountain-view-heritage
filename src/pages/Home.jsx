import { Link, useNavigate } from 'react-router-dom';
import { GUTTER, photoFilter, btnRadius } from '../config.js';
import { offerings, mosaic } from '../data/content.js';

const h2 = { margin: 0, fontSize: 'clamp(32px,3.8vw,56px)', lineHeight: 1.02, letterSpacing: '-.02em' };
const p = { margin: 0, fontSize: 18, lineHeight: 1.6, maxWidth: '56ch', textWrap: 'pretty' };

export default function Home({ narrow }) {
  const navigate = useNavigate();
  return (
    <>
      <section style={{ maxWidth: 1440, margin: '0 auto', padding: `clamp(56px,8vw,112px) ${GUTTER}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 'clamp(32px,5vw,72px)', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="kicker accent">01 — The farm</div>
            <h2 style={{ ...h2, textWrap: 'balance' }}>Old-world butchery, taught at the table where it happens.</h2>
            <p style={p}>Mountain View Heritage is a small family farm in the Oregon foothills, in sight of Mt. Hood. We raise heritage hogs on open ground and teach whole-animal butchery, curing and charcuterie in our farm kitchen.</p>
            <p style={p}>Classes are small and hands-on. Home cooks, hunters, homesteaders and chefs work side by side, then sit down to eat what they made.</p>
            <Link to="/education" className="arrow-link">About our classes <span>→</span></Link>
          </div>
          <figure style={{ margin: 0 }}>
            <img src="/assets/photos/food-family-01.jpg" alt="Three butchers in leather aprons behind a charcuterie board" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', filter: photoFilter }} />
          </figure>
        </div>
      </section>

      <figure style={{ margin: 0, position: 'relative', height: 'min(86vh,900px)', borderTop: '2px solid var(--color-text)', borderBottom: '2px solid var(--color-text)', overflow: 'hidden' }}>
        <img src="/assets/photos/kitchen-13.jpg" alt="The farm kitchen with hams curing from the rafters" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', filter: photoFilter }} />
        <figcaption style={{ position: 'absolute', left: GUTTER, bottom: 20, margin: 0, color: '#fff', fontSize: 12, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', background: 'var(--color-text)', padding: '6px 10px' }}>The farm kitchen classroom</figcaption>
      </figure>

      <section style={{ maxWidth: 1440, margin: '0 auto', padding: `clamp(56px,8vw,112px) ${GUTTER} 0` }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 24, borderBottom: '2px solid var(--color-text)' }}>
          <div className="kicker accent">02 — What we do</div>
          <h2 style={h2}>Two ways in.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))' }}>
          {offerings.map((o, i) => (
            <article key={o.num} style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '28px 0 40px', paddingLeft: i === 0 || narrow ? 0 : 28, paddingRight: i === offerings.length - 1 || narrow ? 0 : 28, borderLeft: i === 0 || narrow ? 'none' : '2px solid var(--color-text)' }}>
              <img src={o.img} alt={o.title} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', filter: photoFilter }} />
              <div className="kicker accent" style={{ textTransform: 'none' }}>{o.num}</div>
              <h3 style={{ margin: 0, fontSize: 28, letterSpacing: '-.015em' }}>{o.title}</h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, textWrap: 'pretty' }}>{o.body}</p>
              <Link to={o.to} className="arrow-link">{o.cta} <span>→</span></Link>
            </article>
          ))}
        </div>
      </section>

      <figure style={{ margin: 0, position: 'relative', height: 'min(92vh,960px)', borderTop: '2px solid var(--color-text)', overflow: 'hidden' }}>
        <img src="/assets/photos/mt-hood-trees.jpg" alt="Mt. Hood seen from the farm" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', filter: photoFilter }} />
        <div style={{ position: 'absolute', left: GUTTER, top: 'clamp(32px,6vw,72px)', color: 'var(--color-text)', maxWidth: 640 }}>
          <div className="kicker" style={{ marginBottom: 12 }}>03 — Our farm</div>
          <h2 style={{ margin: 0, fontSize: 'clamp(40px,6vw,96px)', lineHeight: 0.95, letterSpacing: '-.03em' }}>The mountain in the name.</h2>
        </div>
        <figcaption style={{ position: 'absolute', right: GUTTER, bottom: 'clamp(24px,4vw,48px)', color: '#fff', fontSize: 'clamp(18px,2vw,28px)', fontWeight: 700, letterSpacing: '-.01em', textShadow: '0 1px 12px rgba(0,0,0,.45)' }}>Mt. Hood</figcaption>
      </figure>

      <section style={{ borderTop: '2px solid var(--color-text)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: `clamp(56px,8vw,112px) ${GUTTER}`, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 'clamp(32px,5vw,72px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h3 style={{ margin: 0, fontSize: 'clamp(26px,2.6vw,36px)', lineHeight: 1.1, letterSpacing: '-.015em', textWrap: 'balance' }}>Pigs raised on pasture, used nose to tail.</h3>
            <p style={p}>Our hogs grow slowly, rooting and grazing in the open. When it is time, every part of the animal is put to use: fresh cuts, sausage, cured hams and salumi that hang for months in the curing room.</p>
            <p style={p}>Visitors are welcome at classes, dinners and open farm days.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 2, background: 'var(--color-text)', border: '2px solid var(--color-text)' }}>
            <img src="/assets/photos/farm-pig-05.jpg" alt="Two heritage pigs at a feeder" style={{ width: '100%', height: '100%', aspectRatio: '3/4', objectFit: 'cover', gridRow: 'span 2', filter: photoFilter }} />
            <img src="/assets/photos/farm-pig-04.jpg" alt="Striped piglets" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', filter: photoFilter }} />
            <img src="/assets/photos/farm-pig-01.jpg" alt="Close-up of a woolly pig" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', filter: photoFilter }} />
          </div>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 2, background: 'var(--color-text)', borderTop: '2px solid var(--color-text)', borderBottom: '2px solid var(--color-text)' }}>
        {mosaic.map((m) => (
          <img key={m.src} src={m.src} alt={m.alt} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', filter: photoFilter }} />
        ))}
      </section>

      <section style={{ background: 'var(--color-accent)', color: '#fff' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: `clamp(64px,9vw,128px) ${GUTTER}`, display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'flex-start' }}>
          <h2 style={{ margin: 0, fontSize: 'clamp(44px,7vw,112px)', lineHeight: 0.95, letterSpacing: '-.03em', maxWidth: '14ch' }}>Bring your hands. We supply the rest.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button className="btn btn-ink btn-arrow" onClick={() => navigate('/calendar')} style={{ borderRadius: btnRadius, minWidth: 260 }}>View the class calendar <span>→</span></button>
            <button className="btn btn-ink btn-arrow" onClick={() => navigate('/contact')} style={{ borderRadius: btnRadius, minWidth: 260 }}>Schedule a private event <span>→</span></button>
          </div>
        </div>
      </section>
    </>
  );
}
