import React, { useState } from 'react';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import {
  Home,
  User,
  Cpu,
  Boxes,
  Briefcase,
  GraduationCap,
  Trophy,
  Mail,
} from 'lucide-react';

const sections = [
  { id: 'home', label: 'Home', icon: <Home className="w-3.5 h-3.5" /> },
  { id: 'about', label: 'About', icon: <User className="w-3.5 h-3.5" /> },
  { id: 'skills', label: 'Skills', icon: <Cpu className="w-3.5 h-3.5" /> },
  { id: 'projects', label: 'Projects', icon: <Boxes className="w-3.5 h-3.5" /> },
  { id: 'experience', label: 'Journey', icon: <Briefcase className="w-3.5 h-3.5" /> },
  { id: 'education', label: 'Education', icon: <GraduationCap className="w-3.5 h-3.5" /> },
  { id: 'achievements', label: 'Honors', icon: <Trophy className="w-3.5 h-3.5" /> },
  { id: 'contact', label: 'Contact', icon: <Mail className="w-3.5 h-3.5" /> },
];

export const FloatingScrollIndicator: React.FC = () => {
  const { activeSection, scrollProgress } = useScrollSpy(
    sections.map((s) => s.id)
  );
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -75;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Section navigation indicator"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-2 p-2 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-2xl shadow-xl shadow-black/70 transition-all"
    >
      {/* Scroll indicator bar on side */}
      <div className="w-1 h-12 bg-slate-950 rounded-full overflow-hidden mb-1 relative border border-slate-800">
        <div
          className="w-full bg-gradient-to-b from-sky-400 to-indigo-500 rounded-full transition-all duration-150 shadow-[0_0_8px_rgba(56,189,248,0.6)]"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {sections.map((sec) => {
        const isActive = activeSection === sec.id;
        const isHovered = hoveredSection === sec.id;

        return (
          <div key={sec.id} className="relative flex items-center">
            <button
              onClick={() => scrollTo(sec.id)}
              onMouseEnter={() => setHoveredSection(sec.id)}
              onMouseLeave={() => setHoveredSection(null)}
              aria-label={`Scroll to ${sec.label}`}
              className={`relative p-2 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md shadow-sky-600/40 scale-110'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              {sec.icon}

              {/* Active Pulse Ring */}
              {isActive && (
                <span className="absolute inset-0 rounded-xl border border-sky-400 animate-ping opacity-30" />
              )}
            </button>

            {/* Hover Tooltip Pill */}
            {isHovered && (
              <div className="absolute right-full mr-3 px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-[11px] font-mono whitespace-nowrap shadow-lg shadow-black/80 animate-in fade-in slide-in-from-right-2 duration-150">
                <span>{sec.label}</span>
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-950" />
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
};
