import React, { useState } from 'react';
import { profile } from '@/data/profile';
import { ExternalLinkButton } from '@/components/ui/ExternalLinkButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { FadeTextRotator } from '@/components/ui/FadeTextRotator';
import { FadeName } from '@/components/ui/FadeName';
import {
  ArrowRight,
  Sparkles,
  FileText,
  Terminal,
  Code2,
  ChevronDown,
  MapPin,
  GraduationCap,
  Layers,
  Cpu,
} from 'lucide-react';

interface HeroProps {
  onOpenExecutiveBrief?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenExecutiveBrief }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[96vh] pt-28 sm:pt-36 pb-20 flex items-center justify-center overflow-hidden"
    >
      {/* Background Ambient Aura Fields */}
      <div className="absolute top-1/4 left-1/6 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-sky-500/15 via-blue-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/6 translate-x-1/2 translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-bl from-indigo-500/15 via-purple-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Seamlessly Blended Portrait Image with Ambient Glow & Badges (No Boxy Panel) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <RevealOnScroll direction="left" duration={850} distance={32}>
              <div className="relative w-full max-w-[380px] sm:max-w-[420px] flex flex-col items-center">
                {/* Backlight Ambient Glow Halo */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-sky-500/30 via-cyan-400/20 to-indigo-600/30 rounded-3xl blur-3xl opacity-75 animate-pulse pointer-events-none" />

                {/* Seamless Edge-Blended Portrait (Removed rigid box border/panel) */}
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-slate-950/60 shadow-2xl shadow-black/90 flex items-center justify-center group">
                  {/* Subtle Top Specular Ray */}
                  <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-sky-400/80 to-transparent pointer-events-none z-20" />

                  <img
                    src="/images/prem-sai-hero-blend.png"
                    onError={(e) => {
                      e.currentTarget.src = profile.avatarUrl || '/images/prem-sai-avatar.jpg';
                    }}
                    alt={profile.name}
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 ${
                      imageLoaded ? 'opacity-100' : 'opacity-80'
                    }`}
                    style={{
                      maskImage:
                        'radial-gradient(ellipse at 50% 50%, black 70%, rgba(0,0,0,0.6) 88%, transparent 100%)',
                      WebkitMaskImage:
                        'radial-gradient(ellipse at 50% 50%, black 70%, rgba(0,0,0,0.6) 88%, transparent 100%)',
                    }}
                  />

                  {/* Seamless Dark Edge Fade & Vignette Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-sky-950/20 via-transparent to-indigo-950/20 pointer-events-none mix-blend-overlay" />

                  {/* Floating Top Status Badge */}
                  <div className="absolute top-3.5 left-3.5 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/85 border border-emerald-500/40 backdrop-blur-md text-[11px] font-mono text-emerald-400 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-semibold">Open to Opportunities</span>
                  </div>

                  {/* Floating Location Badge */}
                  <div className="absolute top-3.5 right-3.5 z-20 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/85 border border-slate-800 backdrop-blur-md text-[10px] font-mono text-slate-300 shadow-lg">
                    <MapPin className="w-3 h-3 text-sky-400" />
                    <span>Hyderabad, IN</span>
                  </div>

                  {/* Bottom Info Bar Overlay inside Image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold font-display text-white tracking-wide flex items-center gap-1.5">
                          <span>{profile.name}</span>
                          <span className="px-1.5 py-0.5 rounded bg-sky-950/90 text-[9px] font-mono text-sky-400 border border-sky-800/60 font-semibold">
                            AIML
                          </span>
                        </div>
                        <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                          <span>MLR Institute of Technology</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-mono px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">
                          {profile.education.period}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Micro Skill Tags (Clean floating style) */}
                <div className="mt-3 w-full px-2 py-1.5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Code2 className="w-3.5 h-3.5 text-sky-400" />
                    <span>Full-Stack & AI</span>
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                    <span>IoT Robotics</span>
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Clean Code</span>
                  </span>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: PREM SAI Typography with Smooth Transitions & Hero Pitch */}
          <div className="lg:col-span-7">
            <RevealOnScroll direction="right" duration={850} distance={32}>
              <div className="flex flex-col items-start space-y-6">
                {/* Status Indicator Pill */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-sky-500/30 backdrop-blur-2xl text-xs font-mono text-sky-400 shadow-[0_2px_15px_rgba(14,165,233,0.15)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-400">OPEN TO ROLES //</span>
                  <span className="text-sky-300 font-semibold tracking-wide">
                    CSE (AIML) @ MLRIT
                  </span>
                </div>

                {/* Main Headline with Luxury Fade Dynamic Transition */}
                <div className="space-y-2">
                  <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-mono text-slate-400 font-semibold block">
                    Software Engineer & Student
                  </span>
                  <FadeName firstName="PREM" lastName="SAI" />
                </div>

                {/* Subtitle with Fade Display Transition (type=fade) */}
                <div className="h-12 sm:h-14 flex items-center">
                  <div className="flex items-center gap-2.5 text-xl sm:text-2xl md:text-3xl font-bold font-display text-slate-100">
                    <span className="text-sky-400 text-lg">◈</span>
                    <FadeTextRotator
                      texts={[
                        'Full Stack Web Developer',
                        'AI & Machine Learning Builder',
                        'IoT & Smart Robotics Explorer',
                        'Software Systems Engineer',
                      ]}
                      intervalMs={3800}
                      fadeDurationMs={550}
                      gradientClassName="bg-gradient-to-r from-white via-sky-200 to-cyan-300 bg-clip-text text-transparent font-bold"
                    />
                  </div>
                </div>

                {/* Hero Bio Pitch */}
                <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
                  {profile.headline}
                </p>

                {/* Architecture Feature Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { label: 'React & TypeScript', color: 'bg-sky-400' },
                    { label: 'Python & OpenCV', color: 'bg-indigo-400' },
                    { label: 'FastAPI & Supabase', color: 'bg-emerald-400' },
                    { label: 'ESP8266 IoT Hardware', color: 'bg-cyan-400' },
                  ].map((pill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 hover:border-sky-500/40 hover:text-white transition-all shadow-xs"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${pill.color}`} />
                      <span>{pill.label}</span>
                    </span>
                  ))}
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-3.5 pt-3 w-full sm:w-auto">
                  <a
                    href="#projects"
                    onClick={scrollToProjects}
                    className="group flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-sky-600/30 hover:shadow-sky-600/50 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span>View Projects</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href="#contact"
                    onClick={scrollToContact}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-sky-500/40 font-semibold text-sm shadow-sm backdrop-blur-xl transition-all duration-300"
                  >
                    <Sparkles className="w-4 h-4 text-sky-400" />
                    <span>Get in Touch</span>
                  </a>

                  <ExternalLinkButton
                    href={profile.links.resume}
                    variant="glass"
                    disabledLabel="Add Resume"
                    icon={<FileText className="w-4 h-4 text-slate-400" />}
                    className="text-xs"
                  >
                    Resume
                  </ExternalLinkButton>

                  {onOpenExecutiveBrief && (
                    <button
                      onClick={onOpenExecutiveBrief}
                      className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-sky-400 border border-sky-500/30 hover:border-sky-500/60 text-xs font-mono shadow-sm transition-all duration-300"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Executive Summary</span>
                    </button>
                  )}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-14 flex justify-center">
          <a
            href="#about"
            aria-label="Scroll to About section"
            className="p-2 rounded-full text-slate-400 hover:text-sky-400 transition-colors animate-bounce"
          >
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
