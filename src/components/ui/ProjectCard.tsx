import React from 'react';
import { Project } from '@/types';
import { ExternalLinkButton } from '@/components/ui/ExternalLinkButton';
import { ProjectRenderMockup } from '@/components/ui/ProjectRenderMockup';
import {
  Sparkles,
  Info,
  Cpu,
  Layers,
  Boxes,
  Github,
  Globe,
  Radio,
} from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
  onOpenSimulator?: (project: Project) => void;
}

const getCategoryIcon = (category: Project['category']) => {
  switch (category) {
    case 'AI / ML':
      return <Cpu className="w-3.5 h-3.5 text-sky-600" />;
    case 'IoT / Hardware':
      return <Boxes className="w-3.5 h-3.5 text-emerald-600" />;
    case 'Web App':
      return <Sparkles className="w-3.5 h-3.5 text-purple-600" />;
    default:
      return <Layers className="w-3.5 h-3.5 text-blue-600" />;
  }
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenDetails,
  onOpenSimulator,
}) => {
  return (
    <div className="group relative flex flex-col justify-between rounded-3xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl overflow-hidden hover:border-sky-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-black/80 hover:-translate-y-1.5 shadow-md">
      {/* Top Banner with Real-Time 3D Simulation Render Mockup */}
      <div className="relative p-3 pb-0 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950/30">
        <ProjectRenderMockup
          projectId={project.id}
          category={project.category}
          height={190}
        />

        {/* Floating Category Pill */}
        <div className="absolute top-5 left-5 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 border border-slate-800 text-[11px] font-mono text-slate-300 shadow-md backdrop-blur-md">
          {getCategoryIcon(project.category)}
          <span>{project.category}</span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-5 right-5 z-20 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-950/90 border border-sky-800/80 text-[10px] font-mono text-sky-400 font-semibold shadow-xs">
            <Sparkles className="w-3 h-3 text-sky-400" />
            <span>Featured</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Tagline & Title */}
          <h3 className="text-xl font-bold font-heading text-white group-hover:text-sky-400 transition-colors">
            {project.name}
          </h3>
          <p className="text-xs font-mono text-sky-400 mt-1 font-semibold">
            {project.tagline}
          </p>

          <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed font-sans font-normal line-clamp-3">
            {project.description}
          </p>

          {/* Quick Metrics */}
          {project.stats && (
            <div className="grid grid-cols-3 gap-2 my-4 pt-3 border-t border-slate-800">
              {project.stats.map((st, i) => (
                <div key={i} className="text-center p-2 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-bold font-mono text-sky-400">
                    {st.value}
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase tracking-tight mt-0.5 font-medium">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.technologies.slice(0, 5).map((tech, i) => (
              <span
                key={i}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/80 text-slate-300 border border-slate-800 font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950/80 text-slate-400 font-medium">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={() => onOpenDetails(project)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 hover:text-white border border-slate-700/80 hover:border-sky-500/40 transition-all shadow-xs"
          >
            <Info className="w-3.5 h-3.5 text-sky-400" />
            <span>Deep Dive</span>
          </button>

          <div className="flex items-center gap-2">
            <ExternalLinkButton
              href={project.links.github}
              variant="secondary"
              size="sm"
              showIcon={false}
              icon={<Github className="w-3.5 h-3.5 text-slate-300" />}
              disabledLabel="Source Soon"
            >
              Code
            </ExternalLinkButton>

            {project.id === 'obstacle-avoiding-robot' || project.links.liveDemo === '#simulator' ? (
              <button
                onClick={() => onOpenSimulator?.(project)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-md shadow-emerald-500/25 transition-all cursor-pointer"
                title="Launch Interactive Simulator"
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Play Simulator</span>
              </button>
            ) : (
              <ExternalLinkButton
                href={project.links.liveDemo}
                variant="primary"
                size="sm"
                icon={<Globe className="w-3.5 h-3.5" />}
                disabledLabel="Demo Soon"
              >
                Demo
              </ExternalLinkButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
