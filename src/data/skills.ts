import { SkillCategory } from '../types';

/**
 * Centralized Skills Ecosystem
 * Grouped logically with detailed hover meta, related techs, and icons.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    name: "Programming",
    description: "Languages for core logic, algorithms, and backend services.",
    skills: [
      {
        name: "Python",
        level: "Strong",
        highlight: "FastAPI, automation scripting, algorithms",
        category: "Programming",
        iconKey: "python",
        technologies: ["FastAPI", "NumPy", "Pandas", "Automation", "REST APIs"]
      },
      {
        name: "Java",
        level: "Proficient",
        highlight: "OOP, data structures, modular systems",
        category: "Programming",
        iconKey: "java",
        technologies: ["OOP", "Collections", "JVM"]
      },
      {
        name: "C / C++",
        level: "Solid Foundation",
        highlight: "Pointers, memory management, embedded C",
        category: "Programming",
        iconKey: "cpp",
        technologies: ["Pointers", "ESP8266", "Embedded C", "Algorithms"]
      },
      {
        name: "TypeScript",
        level: "Strong",
        highlight: "Type safety, interfaces, scalable state models",
        category: "Programming",
        iconKey: "typescript",
        technologies: ["Generics", "Type Inference", "Interfaces", "Strict Mode"]
      },
    ]
  },
  {
    id: "web-development",
    name: "Web Development",
    description: "Modern, responsive, and accessible user interfaces.",
    skills: [
      {
        name: "React",
        level: "Strong",
        highlight: "Custom hooks, component design, performance",
        category: "Web Development",
        iconKey: "react",
        technologies: ["Hooks", "Context API", "Vite", "Components"]
      },
      {
        name: "HTML5 & Web Standards",
        level: "Proficient",
        highlight: "Semantic markup, accessibility, clean structure",
        category: "Web Development",
        iconKey: "html",
        technologies: ["Semantic HTML", "ARIA", "Canvas 2D"]
      },
      {
        name: "CSS3 & Modern Styling",
        level: "Proficient",
        highlight: "Flexbox, Grid, keyframe animations, glassmorphism",
        category: "Web Development",
        iconKey: "css",
        technologies: ["Flexbox", "CSS Grid", "Keyframes", "Variables"]
      },
    ]
  },
  {
    id: "backend-database",
    name: "Backend & Database",
    description: "Databases, cloud services, and RESTful APIs.",
    skills: [
      {
        name: "MongoDB",
        level: "Proficient",
        highlight: "NoSQL document modeling, aggregation queries",
        category: "Backend & Database",
        iconKey: "mongodb",
        technologies: ["Aggregation", "BSON", "Atlas", "Indexes"]
      },
      {
        name: "Supabase",
        level: "Proficient",
        highlight: "PostgreSQL, Row Level Security, Auth, Realtime",
        category: "Backend & Database",
        iconKey: "supabase",
        technologies: ["PostgreSQL", "RLS Policies", "Auth", "Storage"]
      },
    ]
  },
  {
    id: "iot-hardware",
    name: "IoT & Hardware",
    description: "Microcontroller systems, telemetry, and smart robotics.",
    skills: [
      {
        name: "IoT & Embedded Systems",
        level: "Proficient",
        highlight: "ESP8266, ultrasonic telemetry, Wi-Fi teleoperation",
        category: "IoT & Hardware",
        iconKey: "iot",
        technologies: ["ESP8266", "Ultrasonic Sensors", "PWM Drivers", "C++"]
      },
    ]
  },
  {
    id: "tools",
    name: "Tools & Workflow",
    description: "Developer tooling, version control, and design platforms.",
    skills: [
      {
        name: "Git & Version Control",
        level: "Strong",
        highlight: "Branching, clean commit history, rebasing",
        category: "Tools & Workflow",
        iconKey: "git",
        technologies: ["Branching", "Commits", "Rebase", "Git CLI"]
      },
      {
        name: "GitHub",
        level: "Strong",
        highlight: "Repo management, CI/CD workflows, collaboration",
        category: "Tools & Workflow",
        iconKey: "github",
        technologies: ["Pull Requests", "Code Reviews", "Issues", "Pages"]
      },
      {
        name: "VS Code",
        level: "Proficient",
        highlight: "Debugging, extensions, TypeScript workflows",
        category: "Tools & Workflow",
        iconKey: "vscode",
        technologies: ["Debugging", "Linting", "Prettier"]
      },
      {
        name: "Figma",
        level: "Proficient",
        highlight: "Wireframing, prototyping, UI mockups",
        category: "Tools & Workflow",
        iconKey: "figma",
        technologies: ["Wireframing", "UI Layouts", "Prototyping"]
      },
    ]
  },
  {
    id: "learning",
    name: "Learning Skills",
    description: "Frameworks, tools, and technologies currently being explored.",
    skills: [
      {
        name: "JavaScript",
        level: "Learning",
        highlight: "ES6+, async/await, DOM APIs, event loop",
        category: "Learning Skills",
        iconKey: "javascript",
        technologies: ["ES6+", "Async/Await", "DOM", "Fetch API"]
      },
      {
        name: "Tailwind CSS",
        level: "Learning",
        highlight: "Utility classes, responsive design, custom themes",
        category: "Learning Skills",
        iconKey: "tailwind",
        technologies: ["Utility Classes", "Flex/Grid", "Dark Mode"]
      },
      {
        name: "Node.js",
        level: "Learning",
        highlight: "Runtime environment, Express routing, npm ecosystem",
        category: "Learning Skills",
        iconKey: "nodejs",
        technologies: ["Express", "NPM Scripts", "Backend Scripts"]
      },
      {
        name: "REST APIs",
        level: "Learning",
        highlight: "HTTP endpoints, JSON communication, API testing",
        category: "Learning Skills",
        iconKey: "api",
        technologies: ["HTTP Methods", "JSON", "CORS", "Postman"]
      },
      {
        name: "Still Learning New Skills",
        level: "Always Active",
        highlight: "Exploring Next.js, Docker, cloud tools, and system architecture",
        category: "Learning Skills",
        iconKey: "learning",
        technologies: ["Next.js", "Docker", "DevOps", "System Design"]
      }
    ]
  }
];
