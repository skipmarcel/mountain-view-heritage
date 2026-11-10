import { useCallback, useMemo, useState } from 'react';
import { GUTTER, btnRadius } from '../config.js';
import { MEMBERSHIP, money } from '../data/shop.js';
import { TITLE, VERSION, PDF, ARTICLES, FIELDS, membershipTerm, signatureMatches } from '../data/membership.js';
import { sendForm } from '../formspree.js';
import CheckoutPanel from '../components/CheckoutPanel.jsx';
import { paymentsReady } from '../components/StripeCheckout.jsx';

const NICK_EMAIL = 'nickkclark@gmail.com';
const empty = Object.fromEntries(FIELDS.map((f) => [f.key, '']));

function Field({ f, value, onChange }) {
  const id = `member-${f.key}`;
  return (
    <div className="field" style={{ gridColumn: ['city', 'state', 'zip'].includes(f.key) ? 'auto' : '1 / -1' }}>
      <label htmlFor={id}>{f.label}</label>
      <input id={id} className="input" type={f.type || 'text'} required={f.required} maxLength={f.max} autoComplete={f.autoComplete || 'off'} value={value} onChange={onChange} />
    </div>
  );
}

// Farm Club sign-up: read the agreement, fill in member information, sign by typing your name,
// then pay the yearly fee by card. Nick gets the signed details by email (Formspree), and the same
// details are saved on the Stripe payment (api/checkout.js).
export default function Membership() {
  const [member, setMember] = useState(empty);
  const [agreed, setAgreed] = useState(false);
  const [signature, setSignature] = useState('');
  const [order, setOrder] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const handleError = useCallback((msg) => { setError(msg); setOrder(null); }, []);
  const term = useMemo(() => membershipTerm(), []);

  const signed = signatureMatches(signature, member.name);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!agreed) return setError('Please confirm that you agree to the Membership Agreement.');
    if (!signed) return setError('Please type your full name exactly as entered above to sign.');
    setBusy(true);
    // Email Nick the signed agreement details. The Stripe payment keeps a copy too, so a
    // Formspree hiccup shouldn't stop someone joining.
    try {
      await sendForm({
        _subject: `Farm Club membership agreement signed: ${member.name}`,
        form: 'Farm Club membership',
        note: 'They signed and are now paying by card. Check Stripe to confirm the payment went through.',
        agreement: `${TITLE} (as of ${VERSION})`,
        signature: signature.trim(),
        signed_on: term.from,
        membership_term: `${term.from} to ${term.to}`,
        annual_fee: `${money(MEMBERSHIP.annualFee)} by credit card, renews yearly`,
        ...member,
      });
    } catch { /* noted above */ }
    setBusy(false);
    setOrder({ type: 'membership', member, signature, agreed });
  };

  if (order) {
    return <CheckoutPanel order={order} backLabel="Back to the agreement" onBack={() => setOrder(null)} onError={handleError} />;
  }

  return (
    <section style={{ maxWidth: 1440, margin: '0 auto', padding: `clamp(28px,4vw,56px) ${GUTTER} clamp(56px,8vw,112px)` }}>
      <p className="lede">
        Join the Mountain View Heritage Farm Club for {money(MEMBERSHIP.annualFee)} a year per household. Members get priority notice of workshops, tastings and hog shares, member pricing, and a {money(20000)} Member Credit each year. Read the agreement, add your details, sign, and pay below.
      </p>

      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 760 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
            <div className="kicker accent">Membership Agreement</div>
            <a href={PDF} target="_blank" rel="noopener noreferrer" style={{ fontSize: 15, fontWeight: 600 }}>Download the PDF</a>
          </div>
          <div className="agreement" tabIndex={0} role="region" aria-label="Membership Agreement">
            <h2>{TITLE}</h2>
            {ARTICLES.map((a) => (
              <section key={a.title}>
                <h3>{a.title}</h3>
                {a.blocks.map((b, i) => (Array.isArray(b)
                  ? <ul key={i}>{b.map((li) => <li key={li}>{li}</li>)}</ul>
                  : <p key={i}>{b}</p>))}
              </section>
            ))}
          </div>
          <span style={{ fontSize: 14 }}>Agreement as of {VERSION}. Scroll to read the whole agreement.</span>
        </div>

        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="kicker accent" style={{ marginBottom: 16 }}>Member information</legend>
          <div className="member-grid">
            {FIELDS.map((f) => (
              <Field key={f.key} f={f} value={member[f.key]} onChange={(e) => setMember((m) => ({ ...m, [f.key]: e.target.value }))} />
            ))}
          </div>
        </fieldset>

        <div style={{ borderTop: '2px solid var(--color-text)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px 16px', flexWrap: 'wrap' }}><span style={{ whiteSpace: 'nowrap' }}>Membership term</span><span>{term.from} to {term.to}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, fontWeight: 800, fontSize: 20 }}><span>Annual membership fee</span><span>{money(MEMBERSHIP.annualFee)}</span></div>
          <span style={{ fontSize: 14 }}>Paid by card today, then renewed automatically each year until you cancel. To cancel, email <a href={`mailto:${NICK_EMAIL}`}>{NICK_EMAIL}</a> before your renewal date. Membership becomes active once Mountain View Heritage accepts it.</span>
        </div>

        <fieldset style={{ border: 0, padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <legend className="kicker accent" style={{ marginBottom: 16 }}>Sign</legend>
          <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer' }}>
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} style={{ marginTop: 4 }} />
            <span>I have read and agree to the Mountain View Heritage Farm Club Membership Agreement, including the acknowledgments in Article 16.</span>
          </label>
          <div className="field">
            <label htmlFor="member-signature">Signature: type your full name</label>
            <input id="member-signature" className="input signature-input" type="text" autoComplete="off" required placeholder={member.name || 'Your full name'} value={signature} onChange={(e) => setSignature(e.target.value)} />
            {signature && !signed && <span style={{ fontSize: 14, color: 'var(--color-accent-700)' }}>Type your name exactly as you entered it under Member name.</span>}
          </div>
          <span style={{ fontSize: 14 }}>Date: {term.from}. Typing your name above is your electronic signature.</span>
        </fieldset>

        <button className="btn btn-primary btn-arrow" type="submit" disabled={busy || !paymentsReady} style={{ borderRadius: btnRadius, minWidth: 260, alignSelf: 'flex-start' }}>
          {busy ? 'Saving…' : 'Sign and continue to payment'} <span>→</span>
        </button>
        {error && <p role="alert" style={{ margin: 0, fontSize: 14, color: 'var(--color-accent-700)' }}>{error}</p>}
        {!paymentsReady && (
          <p style={{ margin: 0, fontSize: 14 }}>Online sign-up isn’t available right now. Email <a href={`mailto:${NICK_EMAIL}`}>{NICK_EMAIL}</a> to join.</p>
        )}
      </form>
    </section>
  );
}
