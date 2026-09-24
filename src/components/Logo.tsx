import React from 'react';
import officialLogo from '../assets/logo.jpg';

interface LogoProps {
  mode?: 'full' | 'icon-only' | 'horizontal';
  className?: string;
  size?: number;
}

export default function Logo({ mode = 'horizontal', className = '', size = 46 }: LogoProps) {
  // Use the exact official photo provided by the client
  const logoSrc = officialLogo || '/images/logo.jpg';
  const pixelHeight = mode === 'full' ? Math.max(size * 1.6, 76) : size;

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="SkillSet Go EduTech"
        className="object-contain rounded-lg transition-transform duration-200"
        style={{
          height: `${pixelHeight}px`,
          width: 'auto',
          maxHeight: `${pixelHeight}px`,
        }}
        loading="eager"
      />
    </div>
  );
}
