/**
 * Branding assets live in frontend/public/branding/
 * Current files: logo.jpg, hero-bg.jpg, section-1.jpg (building photo)
 */
export const BRANDING = {
  /** Full official name — hero, footer, metadata */
  schoolName: "Nutan Vidya Mandir's Maharashtra English School, Goregaon, Mumbai",
  /** Shorter line for navbar / tight layouts */
  schoolNameShort: "NVM's Maharashtra English School, Goregaon",
  /** One word or acronym for micro-labels */
  schoolNameMicro: 'NVM English School',
  tagline: 'Excellence in English-medium education — in the heart of Goregaon, Mumbai.',
  locationLine: 'Goregaon, Mumbai, Maharashtra',

  logo: '/branding/logo.jpg',
  /** Optional separate white logo for dark hero; omit to use main logo as-is */
  logoWhite: null,
  /** If true, hero logo is forced white (for dark PNG logos). False = show your real logo colours */
  invertHeroLogo: false,

  heroBackground: '/branding/hero-bg.jpg',
  sectionCampus: '/branding/section-1.jpg',
  sectionLife: '/branding/section-2.jpg',
};
