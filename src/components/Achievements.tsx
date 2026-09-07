import React, { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { achievements } from '@/data/experience';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { TiltCard } from '@/components/ui/TiltCard';
import { Modal } from '@/components/ui/Modal';
import { AchievementItem } from '@/types';
import {
  Trophy,
  CheckCircle2,
  FileText,
  ExternalLink,
  Eye,
  Sparkles,
  Download,
  Award,
  Layers,
  Code,
  Database,
  Box,
} from 'lucide-react';

const CATEGORIES = [
  { id: 'All', label: 'All Credentials', icon: <Layers className="w-3.5 h-3.5" /> },
  { id: 'Competitions & Hackathons', label: 'Competitions & Awards', icon: <Trophy className="w-3.5 h-3.5" /> },
  { id: 'Programming & AI', label: 'Programming & AI', icon: <Code className="w-3.5 h-3.5" /> },
  { id: 'Cloud & Databases', label: 'Cloud & Databases', icon: <Database className="w-3.5 h-3.5" /> },
  { id: 'CAD & Engineering Design', label: 'CAD & 3D Engineering', icon: <Box className="w-3.5 h-3.5" /> },
];

export const Achievements: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedCert, setSelectedCert] = useState<AchievementItem | null>(null);

  const filteredAchievements = achievements.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      {/* Ambient background glow fields */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-sky-500/10 via-cyan-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="05"
          badge="ACCREDITATIONS & RECOGNITION"
          title="Verified certificates, hackathons &"
          highlight="technical honors."
          subtitle="Official credentials, academic competition awards, and specialized technical certifications across software, AI, databases, and engineering design."
          titleFont="font-heading"
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10">
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === 'All'
                ? achievements.length
                : achievements.filter((a) => a.category === cat.id).length;

            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-medium font-heading transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/25 border border-sky-400/40 scale-105'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800/90 backdrop-blur-xl'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((item, idx) => (
            <RevealOnScroll
              key={item.id}
              direction="up"
              delay={(idx % 3) * 100}
              duration={700}
              distance={24}
            >
              <TiltCard className="h-full" maxTilt={6} scale={1.015}>
                <div className="h-full p-5 sm:p-6 rounded-3xl bg-slate-900/85 border border-slate-800/90 backdrop-blur-xl hover:border-sky-500/50 transition-all duration-300 shadow-2xl shadow-black/70 group hover:-translate-y-1 flex flex-col justify-between">
                  <div>
                    {/* Certificate Thumbnail Preview Container */}
                    {item.imageUrl && (
                      <div
                        onClick={() => setSelectedCert(item)}
                        className="relative w-full aspect-[16/10] mb-4 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group-hover:border-sky-500/40 transition-all cursor-pointer shadow-inner"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <span className="px-3 py-1.5 rounded-xl bg-sky-500/90 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview</span>
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Header Badge & Date */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-sky-950/90 text-sky-400 border border-sky-800/60 shadow-xs">
                        <Award className="w-3.5 h-3.5 text-sky-400" />
                        <span>{item.badge}</span>
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 font-medium">
                        {item.date}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold font-heading text-white group-hover:text-sky-300 transition-colors leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs font-mono text-slate-400 mt-1 font-medium">
                      Issued by: <span className="text-slate-300">{item.issuer}</span>
                    </p>

                    {item.credentialId && (
                      <p className="text-[11px] font-mono text-sky-400/90 mt-1">
                        ID: <span className="text-slate-300">{item.credentialId}</span>
                      </p>
                    )}

                    {item.project && (
                      <div className="mt-2.5 flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                          Associated Project:
                        </span>
                        {item.projectUrl ? (
                          <a
                            href={item.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-sky-950/90 hover:bg-sky-900 border border-sky-500/40 text-sky-300 hover:text-white text-xs font-mono font-bold transition-all shadow-xs"
                          >
                            <Sparkles className="w-3 h-3 text-sky-400" />
                            <span>{item.project}</span>
                            <ExternalLink className="w-2.5 h-2.5 text-sky-400" />
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-sky-950/80 border border-sky-500/30 text-sky-300 text-xs font-mono font-bold">
                            <Sparkles className="w-3 h-3 text-sky-400" />
                            <span>{item.project}</span>
                          </span>
                        )}
                      </div>
                    )}

                    <p className="text-xs text-slate-300 mt-3 leading-relaxed font-sans font-normal line-clamp-3">
                      {item.description}
                    </p>

                    {/* Skills Tag Cloud */}
                    {item.skills && item.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3.5 pt-3 border-t border-slate-800/80">
                        {item.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions & Verification Footer */}
                  <div className="mt-5 pt-3.5 border-t border-slate-800 flex items-center justify-between gap-2 text-xs font-mono">
                    <div className="flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.verificationUrl && (
                        <a
                          href={item.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-sky-400 hover:text-white border border-slate-700 transition-colors"
                          title="Verify Credly Badge"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {item.pdfUrl && (
                        <button
                          onClick={() => setSelectedCert(item)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-sky-600 text-slate-200 hover:text-white border border-slate-700 hover:border-sky-500 font-semibold text-[11px] transition-all flex items-center gap-1.5 shadow-xs"
                        >
                          <FileText className="w-3 h-3 text-sky-400 group-hover:text-white" />
                          <span>View Doc</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {/* Lightbox / Certificate Document Modal */}
      {selectedCert && (
        <Modal
          isOpen={Boolean(selectedCert)}
          onClose={() => setSelectedCert(null)}
          title={selectedCert.title}
          maxWidth="4xl"
        >
          <div className="space-y-5">
            {/* Header info bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-mono">
              <div>
                <span className="text-slate-400">Issuer: </span>
                <span className="text-white font-semibold">{selectedCert.issuer}</span>
                {selectedCert.instructor && (
                  <span className="text-slate-400 ml-2">
                    (Instructor: <span className="text-sky-300">{selectedCert.instructor}</span>)
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {selectedCert.project && (
                  <span className="px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700/60 font-semibold">
                    Project: {selectedCert.project}
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-full bg-sky-950 text-sky-400 border border-sky-800/60 font-semibold">
                  {selectedCert.badge}
                </span>
                <span className="text-slate-400">{selectedCert.date}</span>
              </div>
            </div>

            {/* Certificate Preview Image Display */}
            {selectedCert.imageUrl && (
              <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex items-center justify-center p-2 sm:p-4">
                <img
                  src={selectedCert.imageUrl}
                  alt={selectedCert.title}
                  className="w-full h-auto max-h-[60vh] object-contain rounded-xl"
                />
              </div>
            )}

            {/* Description & Competencies */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
              <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Competency & Syllabus Overview</span>
              </h5>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {selectedCert.description}
              </p>

              {selectedCert.skills && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedCert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-sky-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Official Verified Achievement</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {selectedCert.projectUrl && (
                  <a
                    href={selectedCert.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-indigo-300 hover:text-white border border-indigo-500/40 text-xs font-semibold transition-all shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Launch {selectedCert.project}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {selectedCert.verificationUrl && (
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-400 border border-sky-500/30 text-xs font-semibold transition-all"
                  >
                    <span>Credly Badge</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {selectedCert.pdfUrl && (
                  <a
                    href={selectedCert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-sky-500/30 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Open / Download PDF</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
