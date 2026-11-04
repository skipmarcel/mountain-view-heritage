import { btnRadius } from '../config.js';

const btn = { width: 40, height: 40, border: 0, background: 'none', font: '700 20px var(--font-body)', color: 'var(--color-text)', cursor: 'pointer' };

// − value + quantity picker.
export default function Stepper({ value, min = 0, max, label, onChange }) {
  const set = (v) => onChange(Math.min(max, Math.max(min, v)));
  return (
    <div role="group" aria-label={label} style={{ display: 'inline-flex', alignItems: 'center', border: '2px solid var(--color-text)', borderRadius: btnRadius }}>
      <button type="button" style={{ ...btn, opacity: value <= min ? 0.3 : 1 }} disabled={value <= min} onClick={() => set(value - 1)} aria-label={`Remove one ${label}`}>−</button>
      <span aria-live="polite" style={{ minWidth: 32, textAlign: 'center', fontWeight: 700 }}>{value}</span>
      <button type="button" style={{ ...btn, opacity: value >= max ? 0.3 : 1 }} disabled={value >= max} onClick={() => set(value + 1)} aria-label={`Add one ${label}`}>+</button>
    </div>
  );
}
