import React, { ReactNode } from 'react';
import { RevealOnScroll } from './RevealOnScroll';

interface SectionHeadingProps {
  number?: string;
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  titleFont?: string;
  children?: ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  badge,
  title,
  highlight,
  subtitle,
  align = 'left',
  className = '',
  titleFont = 'font-display',
  children,
}) => {
  const isCenter = align === 'center';

  return (
    <RevealOnScroll direction="up" distance={28} duration={800} threshold={0.1}>
      <div
        className={`mb-12 md:mb-16 ${
          isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'
        } ${className}`}
      >
        {/* Badge / Index Tag */}
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-4 border bg-slate-900/80 backdrop-blur-md ${
            isCenter ? 'justify-center' : ''
          } text-sky-400 border-sky-500/30 shadow-[0_2px_15px_rgba(14,165,233,0.2)]`}
        >
          {number && <span className="text-slate-500">[{number}]</span>}
          <span>{badge || 'SYSTEM OVERVIEW'}</span>
        </div>

        {/* Main Title */}
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${titleFont} tracking-tight text-white leading-[1.15]`}>
          {title}{' '}
          {highlight && (
            <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              {highlight}
            </span>
          )}
        </h2>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            {subtitle}
          </p>
        )}

        {children && <div className="mt-6">{children}</div>}
      </div>
    </RevealOnScroll>
  );
};
