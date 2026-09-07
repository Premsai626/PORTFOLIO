import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { TiltCard } from '@/components/ui/TiltCard';
import { profile } from '@/data/profile';
import {
  GraduationCap,
  BookOpen,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

const courses = [
  { name: 'Data Structures & Algorithms', tag: 'Core CS' },
  { name: 'Artificial Intelligence', tag: 'Specialization' },
  { name: 'Machine Learning & Deep Learning', tag: 'Specialization' },
  { name: 'Database Management Systems (DBMS)', tag: 'Core CS' },
  { name: 'Computer Networks & Security', tag: 'Systems' },
  { name: 'Software Engineering & Agile', tag: 'Methodology' },
  { name: 'Object-Oriented Programming (Java/C++)', tag: 'Core CS' },
  { name: 'Operating Systems & Architecture', tag: 'Systems' },
];

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="06"
          badge="ACADEMIC BACKGROUND"
          title="Academic foundation in"
          highlight="computer science & AI."
          subtitle="Combining university coursework in core computer science with hands-on software development and project building."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Institution Card */}
          <div className="lg:col-span-6">
            <RevealOnScroll direction="left" duration={850} distance={30}>
              <TiltCard className="h-full" maxTilt={5} scale={1.015}>
                <div className="h-full p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl flex flex-col justify-between hover:border-sky-500/50 transition-all duration-300 shadow-2xl shadow-black/70 group">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="p-3 rounded-2xl bg-sky-950/80 border border-sky-800/60 text-sky-400 group-hover:scale-105 transition-transform shadow-xs">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-sky-950/80 text-sky-400 border border-sky-800/60 font-semibold">
                        {profile.education.period}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
                        Undergraduate Degree
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
                        {profile.education.degree}
                      </h3>
                      <p className="text-sm font-mono text-sky-400 mt-1 font-semibold">
                        {profile.education.specialization}
                      </p>
                      <p className="text-base text-slate-300 mt-3 font-medium flex items-center gap-2">
                        <span>🏛️</span>
                        <span>{profile.education.institution}</span>
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                      Four-year undergraduate program focusing on data structures, algorithms, machine learning, systems architecture, and database engineering.
                    </p>
                  </div>

                  {/* Academic Highlights Pill List */}
                  <div className="mt-8 pt-6 border-t border-slate-800 space-y-2.5">
                    {[
                      'Specialization in Artificial Intelligence & Machine Learning (CSM)',
                      'Hands-on laboratory coursework across software, web & IoT systems',
                      'Active participant in collegiate hackathons & technical projects',
                    ].map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 text-xs text-slate-300 font-medium"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </RevealOnScroll>
          </div>

          {/* Coursework & Competency Grid */}
          <div className="lg:col-span-6">
            <RevealOnScroll direction="right" duration={850} distance={30}>
              <TiltCard className="h-full" maxTilt={5} scale={1.015}>
                <div className="h-full p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl flex flex-col justify-between shadow-2xl shadow-black/70">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-800/60 text-indigo-400 shadow-xs">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold font-display text-white">
                          Key Academic Coursework
                        </h4>
                        <p className="text-xs font-mono text-slate-400 font-medium">
                          Core computer science & specialized tracks
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {courses.map((course, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-sky-500/40 hover:bg-slate-900 transition-all flex flex-col justify-between group shadow-xs"
                        >
                          <span className="text-xs font-bold text-slate-200 group-hover:text-sky-400 transition-colors">
                            {course.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 mt-2 font-medium">
                            [{course.tag}]
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-sky-950/70 via-indigo-950/50 to-slate-950/70 border border-sky-800/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                    <span className="flex items-center gap-2 font-semibold text-sky-300">
                      <Sparkles className="w-4 h-4 text-sky-400" />
                      <span>6 Verified Credentials & Honors</span>
                    </span>
                    <a
                      href="#achievements"
                      className="px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 hover:text-white border border-sky-400/40 transition-all font-semibold flex items-center gap-1.5"
                    >
                      <span>View Accreditations</span>
                      <span>↓</span>
                    </a>
                  </div>
                </div>
              </TiltCard>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};
