import React, { useState } from 'react';
import { projects } from '@/data/projects';
import { Project } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ProjectRenderMockup } from '@/components/ui/ProjectRenderMockup';
import { Modal } from '@/components/ui/Modal';
import { ExternalLinkButton } from '@/components/ui/ExternalLinkButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { TiltCard } from '@/components/ui/TiltCard';
import { RobotSimulatorModal } from '@/components/ui/RobotSimulatorModal';
import {
  Sparkles,
  Github,
  Globe,
  CheckCircle2,
  AlertCircle,
  Activity,
  Radio,
} from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);
  const [isRobotSimulatorOpen, setIsRobotSimulatorOpen] = useState<boolean>(false);

  const categories = ['All', 'AI / ML', 'Full Stack', 'IoT / Hardware', 'Web App'];

  const filteredProjects =
    selectedFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedFilter);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="03"
          badge="PORTFOLIO HIGHLIGHTS"
          title="Featured projects &"
          highlight="hands-on builds."
          subtitle="A selection of full-stack platforms, machine learning applications, and embedded hardware projects I've built."
        />

        {/* Category Filters */}
        <RevealOnScroll direction="up" duration={700} distance={20}>
          <div className="flex flex-wrap items-center gap-2 mb-10 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl w-fit shadow-md">
            {categories.map((cat) => {
              const isActive = selectedFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white shadow-md shadow-sky-600/30 border border-sky-400/40'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <RevealOnScroll
              key={project.id}
              direction={idx % 2 === 0 ? 'left' : 'right'}
              delay={(idx % 2) * 120}
              duration={800}
              distance={30}
            >
              <TiltCard className="h-full" maxTilt={5} scale={1.015}>
                <ProjectCard
                  project={project}
                  onOpenDetails={(p) => setActiveProjectModal(p)}
                  onOpenSimulator={() => setIsRobotSimulatorOpen(true)}
                />
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>

        {/* Deep Dive Project Modal */}
        <Modal
          isOpen={Boolean(activeProjectModal)}
          onClose={() => setActiveProjectModal(null)}
          title={activeProjectModal ? activeProjectModal.name : undefined}
          maxWidth="4xl"
        >
          {activeProjectModal && (
            <div className="space-y-8 text-slate-200">
              {/* Top 3D Simulation Render Mockup */}
              <ProjectRenderMockup
                projectId={activeProjectModal.id}
                category={activeProjectModal.category}
                height={260}
              />

              {/* Header Banner info inside modal */}
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-sky-950/80 text-sky-400 border border-sky-800/60 font-semibold">
                      {activeProjectModal.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Flagship Initiative
                    </span>
                  </div>
                  <h4 className="text-xl font-bold font-display text-white mt-1">
                    {activeProjectModal.tagline}
                  </h4>
                </div>

                <div className="flex items-center gap-3">
                  <ExternalLinkButton
                    href={activeProjectModal.links.github}
                    variant="secondary"
                    icon={<Github className="w-4 h-4 text-slate-300" />}
                    disabledLabel="Source Coming Soon"
                  >
                    GitHub
                  </ExternalLinkButton>

                  {activeProjectModal.id === 'obstacle-avoiding-robot' || activeProjectModal.links.liveDemo === '#simulator' ? (
                    <button
                      onClick={() => {
                        setActiveProjectModal(null);
                        setIsRobotSimulatorOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/30 transition-all cursor-pointer"
                    >
                      <Radio className="w-4 h-4" />
                      <span>Launch Interactive Simulator</span>
                    </button>
                  ) : (
                    <ExternalLinkButton
                      href={activeProjectModal.links.liveDemo}
                      variant="primary"
                      icon={<Globe className="w-4 h-4" />}
                      disabledLabel="Demo Coming Soon"
                    >
                      Live Demo
                    </ExternalLinkButton>
                  )}
                </div>
              </div>

              {/* Overview & Problem / Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
                  <div className="flex items-center gap-2 text-rose-400 text-sm font-bold font-display mb-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>The Problem</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {activeProjectModal.problem}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold font-display mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>The Solution</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {activeProjectModal.solution}
                  </p>
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <h5 className="text-sm font-bold font-display uppercase tracking-wider text-sky-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span>Key Features</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeProjectModal.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300 font-medium"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenges & Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="text-sm font-bold font-display uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-amber-400" />
                    <span>Technical Challenges</span>
                  </h5>
                  <div className="space-y-2">
                    {activeProjectModal.challenges.map((c, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed"
                      >
                        • {c}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="text-sm font-bold font-display uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Results & Outcomes</span>
                  </h5>
                  <div className="space-y-2">
                    {activeProjectModal.results.map((r, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed"
                      >
                        ✓ {r}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technologies Involved */}
              <div className="pt-4 border-t border-slate-800">
                <span className="text-xs font-mono text-slate-400 block mb-3 font-semibold">
                  TECHNOLOGIES USED:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeProjectModal.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-900 text-slate-200 border border-slate-800 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* Dedicated Interactive In-Browser Hardware Simulator */}
        <RobotSimulatorModal
          isOpen={isRobotSimulatorOpen}
          onClose={() => setIsRobotSimulatorOpen(false)}
        />
      </div>
    </section>
  );
};
