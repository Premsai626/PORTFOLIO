import React, { useState, useEffect } from 'react';
import { profile } from '@/data/profile';
import { ExternalLinkButton } from '@/components/ui/ExternalLinkButton';
import {
  Terminal,
  ArrowUp,
  Heart,
  Github,
  Linkedin,
  Instagram,
  Clock,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-800/90 bg-slate-950/90 pt-16 pb-12 overflow-hidden text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          {/* Brand & Mission */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 p-[1px] shadow-sm">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center text-sky-400">
                  <Terminal className="w-4 h-4 text-sky-400" />
                </div>
              </div>
              <span className="text-lg font-bold font-display tracking-wide text-white">
                PREM <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">SAI</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md font-normal leading-relaxed">
              Software Engineer & Computer Science Student. Building web applications, experimenting with machine learning systems, and creating practical software tools.
            </p>

            {/* Time Widget */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 shadow-xs">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>Hyderabad, IN:</span>
              <span className="text-sky-400 font-bold">{time || '10:00:00 PM'} IST</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Navigation
            </h5>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="hover:text-sky-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social Profiles */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Digital Presence
            </h5>
            <div className="flex flex-col gap-2">
              <ExternalLinkButton
                href={profile.links.github}
                variant="text"
                icon={<Github className="w-3.5 h-3.5 text-slate-400" />}
                disabledLabel="GitHub Coming Soon"
                className="text-xs text-slate-400 hover:text-sky-400 font-medium"
              >
                GitHub Profile
              </ExternalLinkButton>

              <ExternalLinkButton
                href={profile.links.linkedin}
                variant="text"
                icon={<Linkedin className="w-3.5 h-3.5 text-sky-400" />}
                disabledLabel="LinkedIn Coming Soon"
                className="text-xs text-slate-400 hover:text-sky-400 font-medium"
              >
                LinkedIn Network
              </ExternalLinkButton>

              <ExternalLinkButton
                href={profile.links.instagram}
                variant="text"
                icon={<Instagram className="w-3.5 h-3.5 text-pink-400" />}
                disabledLabel="Instagram Coming Soon"
                className="text-xs text-slate-400 hover:text-sky-400 font-medium"
              >
                Instagram
              </ExternalLinkButton>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-1.5 font-medium">
            <span>© {new Date().getFullYear()} Prem Sai. Built with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>& React + TypeScript.</span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-sky-400 hover:border-sky-500/50 shadow-xs transition-colors font-medium"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-sky-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
