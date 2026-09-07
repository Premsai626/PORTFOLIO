import React from 'react';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { ExternalLinkButton } from '@/components/ui/ExternalLinkButton';
import {
  Mail,
  Linkedin,
  GraduationCap,
  X,
  Briefcase,
} from 'lucide-react';

interface ExecutiveBriefProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExecutiveBrief: React.FC<ExecutiveBriefProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-slate-900/95 border border-slate-800/90 rounded-3xl shadow-2xl shadow-black/90 p-6 sm:p-8 text-slate-200 z-10 backdrop-blur-2xl my-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Top ambient line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-sky-400 to-transparent" />

        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl p-[1.5px] bg-gradient-to-tr from-sky-400 to-indigo-500 shadow-md shadow-sky-500/20 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] overflow-hidden flex items-center justify-center">
                <img
                  src={profile.avatarUrl || '/images/prem-sai-avatar.jpg'}
                  alt={profile.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/60 text-sky-400 text-xs font-mono mb-1 font-semibold">
                <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                <span>CANDIDATE SUMMARY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                {profile.name} — Executive Summary
              </h2>
              <p className="text-xs sm:text-sm text-sky-400 font-mono mt-0.5 font-semibold">
                {profile.role} • {profile.education.institution}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fast Value Proposition */}
        <div className="mt-6 p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="text-xs font-mono text-sky-400 font-bold uppercase">
            Candidate Profile & Value
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            Undergraduate Computer Science (AIML) student at MLRIT with practical experience across full-stack web development, machine learning tools, and embedded hardware. Strong foundation in Python, TypeScript, React, algorithms, and databases with a proven track record of shipping working, end-to-end projects.
          </p>
        </div>

        {/* Key Core Competencies */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 shadow-xs">
            <h4 className="text-xs font-bold text-white font-mono uppercase mb-2">
              1. Full-Stack Web
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              React, TypeScript, Tailwind CSS, Node.js, REST APIs, and Supabase / SQL database integrations.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 shadow-xs">
            <h4 className="text-xs font-bold text-white font-mono uppercase mb-2">
              2. AI & Machine Learning
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Python, OpenCV computer vision, LLM APIs, vector embeddings, and retrieval-augmented generation (RAG).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 shadow-xs">
            <h4 className="text-xs font-bold text-white font-mono uppercase mb-2">
              3. Embedded IoT
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              C++, ESP8266 microcontrollers, ultrasonic distance sensors, and Wi-Fi communication protocols.
            </p>
          </div>
        </div>

        {/* Flagship Projects Quick List */}
        <div className="mt-6 space-y-3">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
            Featured Projects:
          </h4>
          <div className="space-y-2.5">
            {projects.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <span className="font-bold text-white text-sm">{p.name}</span>
                  <span className="text-sky-400 font-mono ml-2 font-semibold">[{p.category}]</span>
                  <p className="text-slate-400 mt-1">{p.tagline}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <ExternalLinkButton
                    href={p.links.github}
                    variant="ghost"
                    size="sm"
                    disabledLabel="Code Soon"
                  >
                    Code
                  </ExternalLinkButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Overview */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-5 h-5 text-sky-400" />
            <div>
              <span className="font-bold text-white">
                {profile.education.degree} — {profile.education.specialization}
              </span>
              <span className="text-slate-400 block">
                {profile.education.institution} ({profile.education.period})
              </span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-mono font-semibold">
            {profile.status}
          </span>
        </div>

        {/* Direct Action Footer */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ExternalLinkButton
              href={profile.links.email ? `mailto:${profile.links.email}` : undefined}
              variant="primary"
              icon={<Mail className="w-4 h-4" />}
              disabledLabel="Email Soon"
            >
              Contact Directly
            </ExternalLinkButton>

            <ExternalLinkButton
              href={profile.links.linkedin}
              variant="secondary"
              icon={<Linkedin className="w-4 h-4 text-sky-400" />}
              disabledLabel="LinkedIn Soon"
            >
              LinkedIn
            </ExternalLinkButton>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
          >
            Close Executive Brief
          </button>
        </div>
      </div>
    </div>
  );
};
