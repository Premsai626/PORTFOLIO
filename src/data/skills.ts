import { SkillCategory } from '../types';

/**
 * Technical Skills Ecosystem
 * Focus skills: Python, Java, C, HTML, CSS, VS Code, Git, Supabase, Vercel
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    name: "Programming",
    description: "Core languages for logic, data structures, and algorithm engineering.",
    skills: [
      {
        name: "Python",
        level: "Strong",
        highlight: "Scripting, algorithmic problem solving, automation, and backend logic",
        category: "Programming",
        iconKey: "python",
        technologies: ["Automation", "Data Structures", "Algorithms", "APIs"]
      },
      {
        name: "Java",
        level: "Proficient",
        highlight: "Object-oriented software development, core data structures, and algorithms",
        category: "Programming",
        iconKey: "java",
        technologies: ["OOP", "Collections", "Multithreading", "Algorithms"]
      },
      {
        name: "C Language",
        level: "Proficient",
        highlight: "Procedural programming, memory management, pointers, and systems fundamentals",
        category: "Programming",
        iconKey: "c",
        technologies: ["Pointers", "Memory Management", "Data Structures", "Algorithms"]
      }
    ]
  },
  {
    id: "web-development",
    name: "Web Development",
    description: "Modern, responsive, and semantic web interfaces.",
    skills: [
      {
        name: "HTML",
        level: "Strong",
        highlight: "Semantic markup, accessible structure, SEO standards, and modern DOM APIs",
        category: "Web Development",
        iconKey: "html",
        technologies: ["Semantic HTML5", "Accessibility", "Forms", "DOM"]
      },
      {
        name: "CSS",
        level: "Strong",
        highlight: "Responsive layouts, Flexbox, Grid, animations, and custom styling",
        category: "Web Development",
        iconKey: "css",
        technologies: ["CSS3", "Flexbox", "Grid", "Keyframe Animations", "Media Queries"]
      }
    ]
  },
  {
    id: "backend-cloud",
    name: "Backend & Cloud",
    description: "Database storage, authentication, and continuous deployment workflows.",
    skills: [
      {
        name: "Supabase",
        level: "Proficient",
        highlight: "PostgreSQL relational databases, Row Level Security policies, and authentication",
        category: "Backend & Cloud",
        iconKey: "supabase",
        technologies: ["PostgreSQL", "RLS Policies", "Auth", "Realtime DB"]
      },
      {
        name: "Vercel",
        level: "Proficient",
        highlight: "Automated Git deployments, edge hosting, domain management, and production builds",
        category: "Backend & Cloud",
        iconKey: "vercel",
        technologies: ["Edge Hosting", "CI/CD Deployment", "SSL", "Production Builds"]
      }
    ]
  },
  {
    id: "tools",
    name: "Tools & Workflow",
    description: "Developer tooling, version control, and IDE workflows.",
    skills: [
      {
        name: "Git",
        level: "Strong",
        highlight: "Version control, commit hygiene, branch management, and remote repository syncing",
        category: "Tools & Workflow",
        iconKey: "git",
        technologies: ["Version Control", "Branching", "Pull Requests", "GitHub"]
      },
      {
        name: "VS Code",
        level: "Strong",
        highlight: "IDE customization, debugger integration, extensions, and automated formatting",
        category: "Tools & Workflow",
        iconKey: "vscode",
        technologies: ["Debugging", "Extensions", "Linters", "Terminal Integration"]
      }
    ]
  }
];
