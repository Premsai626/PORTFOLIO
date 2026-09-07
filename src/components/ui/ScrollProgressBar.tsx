import React from 'react';
import { useScrollSpy } from '@/hooks/useScrollSpy';

interface ScrollProgressBarProps {
  sectionIds?: string[];
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({
  sectionIds = [
    'home',
    'about',
    'skills',
    'projects',
    'experience',
    'education',
    'achievements',
    'contact',
  ],
}) => {
  const { scrollProgress, activeSection } = useScrollSpy(sectionIds);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Background Track */}
      <div className="w-full h-[3px] bg-slate-900/60 backdrop-blur-xs">
        {/* Animated Gradient Fill Bar */}
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(56,189,248,0.7)] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Micro Scroll Status HUD (Visible once scrolled) */}
      <div
        className={`absolute top-3 right-6 transition-all duration-300 transform ${
          scrollProgress > 2
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800/90 shadow-md shadow-black/50 backdrop-blur-xl text-[10px] font-mono font-semibold text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-slate-400 uppercase tracking-wider">
            {activeSection}
          </span>
          <span className="text-sky-400 font-bold">
            {Math.round(scrollProgress)}%
          </span>
        </div>
      </div>
    </div>
  );
};
