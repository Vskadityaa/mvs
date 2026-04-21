import { useState } from 'react';
import { BRANDING } from '../config/branding.js';

export function BrandMark({ variant = 'default', className = '' }) {
  const [ok, setOk] = useState(true);
  const src =
    variant === 'hero' && BRANDING.logoWhite ? BRANDING.logoWhite : BRANDING.logo;

  const heroFilter =
    variant === 'hero' && BRANDING.invertHeroLogo
      ? 'brightness-0 invert drop-shadow-lg'
      : variant === 'hero'
        ? 'drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]'
        : '';

  if (!ok) {
    return (
      <span
        className={`font-display font-bold tracking-tight text-brand-700 dark:text-brand-300 ${className}`}
      >
        {BRANDING.schoolNameMicro}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={BRANDING.schoolName}
      className={`w-auto object-contain ${heroFilter} ${className || 'h-9 md:h-10'}`}
      onError={() => setOk(false)}
    />
  );
}
