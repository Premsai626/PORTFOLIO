import React, { useState, useEffect } from 'react';

interface FadeNameProps {
  firstName?: string;
  lastName?: string;
  className?: string;
  staggerDelayMs?: number;
}

/**
 * FadeName
 * Luxury Apple HIG-inspired typography component with multi-layered fade aesthetics:
 * - Dynamic continuous gradient shimmer & ambient luminance breathing
 * - Letter-by-letter staggered entrance fade with fluid spring easing
 * - Interactive hover-wave luminance ripple across individual characters
 * - Ambient backdrop specular light blur that gently breathes with the text
 */
export const FadeName: React.FC<FadeNameProps> = ({
  firstName = 'PREM',
  lastName = 'SAI',
  className = '',
  staggerDelayMs = 45,
}) => {
  const [mounted, setMounted] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(timer);
  }, []);

  const firstLetters = firstName.split('');
  const lastLetters = lastName.split('');

  return (
    <div className={`relative inline-block select-none group ${className}`}>
      {/* Ambient Radial Bloom Underlay that softly breathes */}
      <div className="absolute -inset-x-6 -inset-y-4 bg-gradient-to-r from-sky-500/20 via-cyan-400/25 to-indigo-500/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-95 transition-opacity duration-700 pointer-events-none animate-pulse-slow" />

      {/* Main Name Heading with Continuous Fade Gradient Flow */}
      <h1 className="relative flex flex-wrap items-baseline gap-x-3 sm:gap-x-4 tracking-tight leading-none font-black font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl">
        {/* First Name (PREM) */}
        <span className="inline-flex items-baseline">
          {firstLetters.map((char, i) => {
            const isHovered = hoveredIdx === i;
            const distFromHover = hoveredIdx !== null ? Math.abs(hoveredIdx - i) : null;

            return (
              <span
                key={`first-${i}`}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="inline-block transition-all duration-700 ease-out cursor-default"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted
                    ? isHovered
                      ? 'translateY(-4px) scale(1.04)'
                      : distFromHover === 1
                      ? 'translateY(-2px) scale(1.02)'
                      : 'translateY(0px) scale(1)'
                    : 'translateY(16px) scale(0.96)',
                  filter: mounted ? 'blur(0px)' : 'blur(4px)',
                  transitionDelay: mounted ? '0ms' : `${i * staggerDelayMs}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <span className="bg-gradient-to-br from-white via-slate-100 to-slate-300 bg-clip-text text-transparent group-hover:from-white group-hover:via-sky-100 group-hover:to-slate-200 transition-colors">
                  {char}
                </span>
              </span>
            );
          })}
        </span>

        {/* Last Name (SAI) with Radiant Aqua-Indigo Gradient Fade */}
        <span className="inline-flex items-baseline">
          {lastLetters.map((char, j) => {
            const globalIdx = firstLetters.length + j;
            const isHovered = hoveredIdx === globalIdx;
            const distFromHover = hoveredIdx !== null ? Math.abs(hoveredIdx - globalIdx) : null;

            return (
              <span
                key={`last-${j}`}
                onMouseEnter={() => setHoveredIdx(globalIdx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="inline-block transition-all duration-700 ease-out cursor-default"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted
                    ? isHovered
                      ? 'translateY(-4px) scale(1.05)'
                      : distFromHover === 1
                      ? 'translateY(-2px) scale(1.02)'
                      : 'translateY(0px) scale(1)'
                    : 'translateY(16px) scale(0.96)',
                  filter: mounted ? 'blur(0px)' : 'blur(4px)',
                  transitionDelay: mounted ? '0ms' : `${(firstLetters.length + j) * staggerDelayMs}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <span
                  className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer"
                  style={{
                    textShadow: '0 0 30px rgba(56, 189, 248, 0.35)',
                  }}
                >
                  {char}
                </span>
              </span>
            );
          })}
        </span>
      </h1>
    </div>
  );
};
