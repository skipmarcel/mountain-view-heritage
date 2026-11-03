import { socialLinks } from '../data/content.js';

// Outline icons drawn in currentColor, so they take the color of the surrounding links.
const ICONS = {
  Instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  Facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
};

export default function SocialLinks({ className, size = 24 }) {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {socialLinks.map((s) => (
        <a key={s.label} className={className} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Mountain View Heritage on ${s.label}`} title={s.label} style={{ display: 'inline-flex' }}>
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {ICONS[s.label]}
          </svg>
        </a>
      ))}
    </div>
  );
}
