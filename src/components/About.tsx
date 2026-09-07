import React from 'react';
import { profile } from '@/data/profile';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { TiltCard } from '@/components/ui/TiltCard';
import { TypingAboutText } from '@/components/ui/TypingAboutText';
import {
  Code,
  Sparkles,
  Layers,
  GraduationCap,
  Cpu,
  Boxes,
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="01"
          badge="BIOGRAPHY & BACKGROUND"
          title="Building software with"
          highlight="clarity, purpose & curiosity."
          subtitle="A look into my background, technical focus, and how I approach engineering problems."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Narrative Card */}
          <div className="lg:col-span-7">
            <RevealOnScroll direction="left" duration={850} distance={30}>
              <TiltCard className="h-full">
                <div className="h-full flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-2xl shadow-2xl shadow-black/60 hover:border-sky-500/40 transition-all duration-300">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-[1.5px] bg-gradient-to-tr from-sky-400 via-cyan-400 to-indigo-500 shadow-lg shadow-sky-500/20 shrink-0">
                        <div className="w-full h-full bg-slate-950 rounded-[14px] overflow-hidden flex items-center justify-center">
                          <img
                            src={profile.avatarUrl || '/images/prem-sai-avatar.jpg'}
                            alt={profile.name}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                          About Me
                        </h3>
                        <p className="text-xs font-mono text-sky-400 font-semibold mt-0.5">
                          {profile.name} • B.Tech in CSE (AIML) @ MLRIT
                        </p>
                      </div>
                    </div>

                    <TypingAboutText />

                    {/* Core Pillars */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {[
                        {
                          icon: <Cpu className="w-4 h-4 text-sky-400" />,
                          title: 'AI & Machine Learning',
                          desc: 'LLMs, Computer Vision & RAG',
                        },
                        {
                          icon: <Code className="w-4 h-4 text-indigo-400" />,
                          title: 'Modern Full-Stack',
                          desc: 'React, TypeScript, Supabase',
                        },
                        {
                          icon: <Boxes className="w-4 h-4 text-emerald-400" />,
                          title: 'IoT & Microcontrollers',
                          desc: 'ESP8266, C++, sensor automation',
                        },
                        {
                          icon: <Layers className="w-4 h-4 text-cyan-400" />,
                          title: 'Clean Architecture',
                          desc: 'Maintainable, typed codebases',
                        },
                      ].map((pillar, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3 hover:border-sky-500/40 hover:bg-slate-900 transition-all shadow-sm"
                        >
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 shadow-xs shrink-0">
                            {pillar.icon}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white">
                              {pillar.title}
                            </h4>
                            <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                              {pillar.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Academic Tagline Banner */}
                  <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-sky-400" />
                      <span className="font-semibold text-slate-300">{profile.education.institution}</span>
                    </span>
                    <span className="text-sky-400 font-bold">{profile.education.period}</span>
                  </div>
                </div>
              </TiltCard>
            </RevealOnScroll>
          </div>

          {/* Right Column: Key Stats & Live Code Screen */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Live Interactive Code Preview Terminal */}
            <RevealOnScroll direction="right" duration={850} distance={30}>
              <div className="p-6 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl shadow-black/80 relative overflow-hidden font-mono text-xs text-slate-100">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-2 text-slate-400 text-[10px]">
                      developer.config.ts
                    </span>
                  </div>
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                </div>

                <div className="space-y-1 text-slate-300 text-[11px] leading-relaxed overflow-x-auto">
                  <p>
                    <span className="text-indigo-400">const</span>{' '}
                    <span className="text-sky-300">developer</span>:{' '}
                    <span className="text-amber-300">DeveloperProfile</span> = &#123;
                  </p>
                  <p className="pl-4">
                    name:{' '}
                    <span className="text-emerald-300">&quot;{profile.name}&quot;</span>,
                  </p>
                  <p className="pl-4">
                    education:{' '}
                    <span className="text-emerald-300">&quot;B.Tech CSE (AIML)&quot;</span>,
                  </p>
                  <p className="pl-4">
                    college:{' '}
                    <span className="text-emerald-300">&quot;MLRIT&quot;</span>,
                  </p>
                  <p className="pl-4">
                    interests: [
                    <span className="text-sky-300">&quot;Full Stack&quot;</span>,{' '}
                    <span className="text-sky-300">&quot;AI & ML&quot;</span>,{' '}
                    <span className="text-sky-300">&quot;Robotics&quot;</span>],
                  </p>
                  <p className="pl-4">
                    goal:{' '}
                    <span className="text-emerald-300">&quot;Build helpful software&quot;</span>,
                  </p>
                  <p className="pl-4">
                    status:{' '}
                    <span className="text-sky-400 font-semibold">&quot;Open to Internships&quot;</span>,
                  </p>
                  <p>&#125;;</p>
                  <p className="text-sky-400 pt-1 font-semibold">
                    &gt; developer.buildProjects(); // Active ⚡
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            {/* Metrics & Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 flex-1">
              {profile.stats.map((stat, idx) => (
                <RevealOnScroll
                  key={idx}
                  direction="up"
                  delay={idx * 120}
                  duration={750}
                  distance={25}
                >
                  <TiltCard className="h-full">
                    <div className="h-full p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl hover:border-sky-500/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-center group shadow-md">
                      <div className="text-2xl sm:text-3xl font-black font-display bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform origin-left">
                        {stat.value}
                      </div>
                      <div className="text-xs font-bold text-slate-200 mt-1">
                        {stat.label}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 font-medium leading-snug">
                        {stat.description}
                      </div>
                    </div>
                  </TiltCard>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
