import React from 'react';
import {
  Code,
  Terminal,
  Cpu,
  Layers,
  Boxes,
  Database,
  Globe,
  Sparkles,
  GitBranch,
  FolderGit2,
  Sliders,
  FileCode,
} from 'lucide-react';

export interface SkillCardProps {
  name: string;
  level: string;
  highlight: string;
  category: string;
  iconKey: string;
  technologies: string[];
}

const getSkillIcon = (key: string) => {
  switch (key) {
    case 'python':
      return <Code className="w-5 h-5 text-amber-500" />;
    case 'java':
      return <Terminal className="w-5 h-5 text-red-500" />;
    case 'cpp':
      return <FileCode className="w-5 h-5 text-blue-500" />;
    case 'javascript':
      return <Code className="w-5 h-5 text-amber-400" />;
    case 'typescript':
      return <Code className="w-5 h-5 text-sky-500" />;
    case 'react':
      return <Globe className="w-5 h-5 text-sky-400" />;
    case 'html':
      return <Layers className="w-5 h-5 text-orange-500" />;
    case 'css':
      return <Sliders className="w-5 h-5 text-blue-400" />;
    case 'tailwind':
      return <Sliders className="w-5 h-5 text-cyan-400" />;
    case 'nodejs':
      return <Boxes className="w-5 h-5 text-emerald-400" />;
    case 'mongodb':
      return <Database className="w-5 h-5 text-emerald-500" />;
    case 'supabase':
      return <Database className="w-5 h-5 text-emerald-400" />;
    case 'api':
      return <Layers className="w-5 h-5 text-indigo-400" />;
    case 'iot':
      return <Boxes className="w-5 h-5 text-teal-400" />;
    case 'git':
      return <GitBranch className="w-5 h-5 text-orange-500" />;
    case 'github':
      return <FolderGit2 className="w-5 h-5 text-slate-300" />;
    case 'vscode':
      return <Terminal className="w-5 h-5 text-blue-400" />;
    case 'figma':
      return <Sliders className="w-5 h-5 text-pink-400" />;
    case 'learning':
    case 'growth':
      return <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />;
    default:
      return <Cpu className="w-5 h-5 text-sky-400" />;
  }
};

export const SkillCard: React.FC<SkillCardProps> = ({
  name,
  level,
  highlight,
  category,
  iconKey,
  technologies,
}) => {
  const isContinuousLearningCard =
    iconKey === 'learning' || name.toLowerCase().includes('still learning');
  const isLearningLevel = level.toLowerCase() === 'learning';

  return (
    <div
      className={`group relative p-5 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-black/70 hover:-translate-y-1 flex flex-col justify-between shadow-md ${
        isContinuousLearningCard
          ? 'bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-amber-950/25 border border-amber-500/40 hover:border-amber-400/80'
          : isLearningLevel
          ? 'bg-slate-900/85 border border-amber-500/20 hover:border-amber-400/50'
          : 'bg-slate-900/80 border border-slate-800/90 hover:border-sky-500/50'
      }`}
    >
      {/* Subtle Glow on Hover */}
      <div
        className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none ${
          isContinuousLearningCard
            ? 'bg-gradient-to-br from-amber-500/0 via-amber-500/5 to-yellow-500/10 group-hover:from-amber-500/15 group-hover:to-yellow-500/15'
            : isLearningLevel
            ? 'bg-gradient-to-br from-amber-500/0 via-amber-500/5 to-sky-500/5 group-hover:from-amber-500/10 group-hover:to-sky-500/10'
            : 'bg-gradient-to-br from-sky-500/0 via-blue-500/0 to-indigo-500/0 group-hover:from-sky-500/10 group-hover:to-indigo-500/10'
        }`}
      />

      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div
            className={`p-2.5 rounded-xl border group-hover:scale-110 transition-all duration-300 shadow-sm ${
              isContinuousLearningCard
                ? 'bg-amber-950/40 border-amber-500/30 group-hover:border-amber-400/60'
                : 'bg-slate-950/80 border-slate-800 group-hover:border-sky-500/40'
            }`}
          >
            {getSkillIcon(iconKey)}
          </div>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold border ${
              isContinuousLearningCard
                ? 'bg-amber-950/60 text-amber-300 border-amber-700/60'
                : isLearningLevel
                ? 'bg-amber-950/50 text-amber-400 border-amber-800/50'
                : 'bg-sky-950/60 text-sky-400 border-sky-800/60'
            }`}
          >
            {level}
          </span>
        </div>

        {/* Skill Title & Category */}
        <h4
          className={`text-base font-bold font-display transition-colors ${
            isContinuousLearningCard
              ? 'text-amber-100 group-hover:text-amber-300'
              : isLearningLevel
              ? 'text-white group-hover:text-amber-300'
              : 'text-white group-hover:text-sky-400'
          }`}
        >
          {name}
        </h4>
        <p className="text-[11px] font-mono text-slate-400 mt-0.5 font-medium">
          {category}
        </p>

        {/* Summary Description */}
        <p className="text-xs text-slate-400 mt-2.5 leading-relaxed font-normal line-clamp-2 group-hover:line-clamp-none transition-all">
          {highlight}
        </p>
      </div>

      {/* Associated Tech Tags */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
        {technologies.map((tech, i) => (
          <span
            key={i}
            className={`text-[10px] px-2 py-0.5 rounded font-mono font-medium transition-colors ${
              isContinuousLearningCard
                ? 'bg-amber-950/40 text-amber-300/80 border border-amber-800/40 group-hover:text-amber-200 group-hover:border-amber-600/60'
                : isLearningLevel
                ? 'bg-slate-950/80 text-slate-300 border border-slate-800 group-hover:text-amber-200 group-hover:border-amber-700/50'
                : 'bg-slate-950/70 text-slate-400 border border-slate-800 group-hover:text-slate-200 group-hover:border-slate-700'
            }`}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};
