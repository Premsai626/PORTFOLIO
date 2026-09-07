import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Briefcase } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  onOpenExecutiveBrief?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenExecutiveBrief }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'py-3.5 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-black/60'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="group flex items-center gap-3 text-lg font-bold font-display tracking-tight text-white focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 p-[1.5px] shadow-md shadow-sky-500/30 group-hover:shadow-sky-500/50 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-base group-hover:scale-110 transition-transform">
              👨‍💻
            </div>
          </div>
          <div className="flex flex-col">
            <span className="leading-tight tracking-wider font-bold text-white flex items-center gap-1">
              PREM <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">SAI</span>
              <span className="text-xs">⚡</span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
              Portfolio
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl shadow-inner">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-sky-300 bg-sky-500/20 shadow-sm border border-sky-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action: Executive Brief & Connect Button */}
        <div className="hidden lg:flex items-center gap-3">
          {onOpenExecutiveBrief && (
            <button
              onClick={onOpenExecutiveBrief}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-sky-500/50 text-[11px] font-mono text-sky-400 shadow-sm transition-all"
            >
              <Briefcase className="w-3.5 h-3.5 text-sky-400" />
              <span>Executive Brief</span>
            </button>
          )}

          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 shadow-md shadow-sky-600/30 hover:shadow-sky-600/50 transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors shadow-sm"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-4 pt-2 pb-6 bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 shadow-2xl">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-sky-400 hover:bg-slate-900 transition-colors"
              >
                {item.label}
              </a>
            ))}

            <div className="pt-4 mt-2 border-t border-slate-800 flex flex-col gap-3">
              {onOpenExecutiveBrief && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenExecutiveBrief();
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono text-sky-400 bg-sky-950/50 border border-sky-800/60"
                >
                  <Briefcase className="w-4 h-4 text-sky-400" />
                  <span>View Executive Brief</span>
                </button>
              )}

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="text-center py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-600 to-indigo-600 shadow-md shadow-sky-600/30"
              >
                Let&apos;s Build Together
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
