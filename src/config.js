// Brand + layout settings (the values chosen in the design tool's Tweaks panel).
export const config = {
  accentColor: '#5a3a2a',            // options used: #2f5d3a, #2b4a6b, #a87a2a, #5a3a2a
  fontPairing: 'Oswald + Source Serif', // see FONT_PAIRINGS below
  buttonRadius: 11,                  // px
  clipSeconds: 5,                    // how long each hero clip plays
  fadeSeconds: 1.2,                  // crossfade length
  logoOpacity: 0.65,                 // hero logo opacity
  logoMargin: 48,                    // px, hero logo margin from the left edge
  photoTreatment: 'Color',           // 'Color' | 'Black & white'
};

export const FONT_PAIRINGS = {
  'Archivo': ['"Archivo", system-ui, sans-serif', '"Archivo", system-ui, sans-serif'],
  'Oswald + Source Serif': ['"Oswald", "Archivo", sans-serif', '"Source Serif 4", Georgia, serif'],
  'Barlow Condensed + Barlow': ['"Barlow Condensed", "Archivo", sans-serif', '"Barlow", system-ui, sans-serif'],
  'Zilla Slab + Work Sans': ['"Zilla Slab", Georgia, serif', '"Work Sans", system-ui, sans-serif'],
};

export const HERO_CLIPS = [
  '/videos/20260308_151655.mp4',
  '/videos/Snapchat-1179621992.mp4',
  '/videos/Snapchat-1511062850.mp4',
  '/videos/Snapchat-1657299005.mp4',
];

export const NAV_HEIGHT = 112;
export const GUTTER = 'clamp(20px,4vw,56px)';
export const photoFilter = config.photoTreatment === 'Black & white' ? 'grayscale(1) contrast(1.08)' : 'none';
export const btnRadius = config.buttonRadius + 'px';
