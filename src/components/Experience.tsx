import React from 'react';
import { experienceTimeline } from '@/data/experience';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { TiltCard } from '@/components/ui/TiltCard';
import {
  Sparkles,
  Award,
  Terminal,
  Cpu,
  GraduationCap,
  Compass,
} from 'lucide-react';

export const Experience: React.FC = () => {
  const getItemIcon = (type: string) => {
    switch (type) {
      case 'project':
        return <Cpu className="w-4 h-4 text-sky-400" />;
      case 'milestone':
        return <Sparkles className="w-4 h-4 text-indigo-400" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-amber-400" />;
      case 'hackathon':
        return <Award className="w-4 h-4 text-emerald-400" />;
      default:
        return <Terminal className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="05"
          badge="GROWTH & JOURNEY"
          title="Evolution of my"
          highlight="learning & craft."
          subtitle="From basic website designing and Supabase cloud integrations to building full-stack platforms and continuously exploring new frameworks."
        />

        {/* Timeline Container */}
        <div className="relative mt-12 max-w-4xl mx-auto">
          {/* Vertical Central Line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-sky-500 via-indigo-500 to-transparent opacity-40" />

          <div className="space-y-12">
            {experienceTimeline.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } gap-6 group`}
                >
                  {/* Timeline Center Node Icon */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.5)] flex items-center justify-center z-20 group-hover:scale-125 group-hover:border-sky-300 transition-all duration-300">
                    {getItemIcon(item.type)}
                  </div>

                  {/* Spacer for desktop two-column balance */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Milestone Card */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-6">
                    <RevealOnScroll
                      direction={isEven ? 'right' : 'left'}
                      duration={750}
                      distance={28}
                    >
                      <TiltCard maxTilt={5} scale={1.015}>
                        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl hover:border-sky-500/50 transition-all duration-300 shadow-2xl shadow-black/70 group-hover:-translate-y-1">
                          {/* Header Badge */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-sky-400">
                              <Compass className="w-3.5 h-3.5 text-sky-400" />
                              <span>{item.period}</span>
                            </span>
                            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 font-semibold">
                              {item.type}
                            </span>
                          </div>

                          <h4 className="text-lg font-bold font-display text-white group-hover:text-sky-400 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs font-mono text-slate-400 mt-0.5 font-medium">
                            {item.role}
                          </p>

                          <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed font-normal">
                            {item.summary}
                          </p>

                          {/* Points list */}
                          <ul className="mt-3 space-y-1.5">
                            {item.points.map((pt, i) => (
                              <li
                                key={i}
                                className="text-xs text-slate-400 flex items-start gap-2"
                              >
                                <span className="text-sky-400 mt-0.5">◈</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Tech Tags */}
                          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-1.5">
                            {item.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </TiltCard>
                    </RevealOnScroll>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
