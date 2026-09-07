import React, { useState, useEffect } from 'react';

interface FadeNameProps {
  firstName?: string;
  lastName?: string;
  className?: string;
}

/**
 * FadeName
 * Signature script typography component powered by Dancing Script / Alex Brush:
 * - Bold, flowing cursive script that matches authentic handwritten signature calligraphy
 * - Fluid unbroken cursive ligatures across whole words
 * - Radiant ambient breathing glow backdrop
 * - Shimmer gradient & smooth entrance transitions
 */
export const FadeName: React.FC<FadeNameProps> = ({
  firstName = 'Prem',
  lastName = 'Sai',
  className = '',
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative inline-block select-none group ${className}`}>
      {/* Ambient Radial Bloom Underlay that softly breathes */}
      <div className="absolute -inset-x-8 -inset-y-6 bg-gradient-to-r from-sky-500/25 via-cyan-400/25 to-indigo-500/25 rounded-3xl blur-2xl opacity-60 group-hover:opacity-95 transition-opacity duration-700 pointer-events-none animate-pulse-slow" />

      {/* Main Name Heading with Fluid Cursive Continuity & Gradient Shimmer */}
      <h1
        className={`relative flex flex-wrap items-baseline gap-x-3 sm:gap-x-5 font-script font-bold tracking-wide leading-[1.15] text-6xl sm:text-7xl md:text-8xl lg:text-9xl py-1.5 transition-all duration-700 ease-out ${
          mounted
            ? 'opacity-100 translate-y-0 filter-none'
            : 'opacity-0 translate-y-4 blur-xs'
        }`}
      >
        {/* First Name (Prem) - Crisp Platinum-Silver with soft highlight */}
        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
          <span className="bg-gradient-to-br from-white via-slate-100 to-slate-200 bg-clip-text text-transparent drop-shadow-[0_2px_18px_rgba(255,255,255,0.25)]">
            {firstName}
          </span>
        </span>

        {/* Last Name (Sai) - Electric Cyan-Sky-Indigo Shimmer */}
        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
          <span
            className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer"
            style={{
              textShadow: '0 0 35px rgba(56, 189, 248, 0.45)',
            }}
          >
            {lastName}
          </span>
        </span>
      </h1>
    </div>
  );
};


