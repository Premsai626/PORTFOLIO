import React, { useState } from 'react';
import { skillCategories } from '@/data/skills';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SkillCard } from '@/components/ui/SkillCard';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { TiltCard } from '@/components/ui/TiltCard';
import { Sparkles, Code2, Layers, Database, Wrench } from 'lucide-react';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Skills', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'programming', name: 'Programming', icon: <Code2 className="w-3.5 h-3.5" /> },
    { id: 'web-development', name: 'Web Dev', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'backend-cloud', name: 'Backend & Cloud', icon: <Database className="w-3.5 h-3.5" /> },
    { id: 'tools', name: 'Tools & Workflow', icon: <Wrench className="w-3.5 h-3.5" /> },
  ];

  // Flatten or filter skills
  const allSkills = skillCategories.flatMap((cat) => cat.skills);
  const displayedSkills =
    selectedCategory === 'all'
      ? allSkills
      : skillCategories.find((cat) => cat.id === selectedCategory)?.skills || [];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="02"
          badge="TECHNICAL SKILLS"
          title="Languages, frameworks &"
          highlight="tools I use."
          subtitle="A comprehensive overview of the technologies, frameworks, and developer tools I work with across web and embedded systems."
        />

        {/* Filter Navigation Tabs */}
        <RevealOnScroll direction="up" duration={700} distance={20}>
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl mb-10 w-fit shadow-md">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white shadow-md shadow-sky-600/30 border border-sky-400/40'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayedSkills.map((skill, index) => (
            <RevealOnScroll
              key={`${skill.name}-${index}`}
              direction="up"
              delay={(index % 4) * 80}
              duration={700}
              distance={24}
            >
              <TiltCard className="h-full" maxTilt={6} scale={1.02}>
                <SkillCard {...skill} />
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};
