import { SkillCategory } from '../types';

/**
 * Centralized Skills Ecosystem
 * Grouped logically with detailed hover meta, related techs, and icons.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    name: "Programming",
    description: "Languages I use for writing core logic, algorithms, and backend services.",
    skills: [
      {
        name: "Python",
        level: "Strong",
        highlight: "Backend services, FastAPI endpoints, data processing, automation scripting",
        category: "Programming",
        iconKey: "python",
        technologies: ["FastAPI", "NumPy", "Pandas", "Automation", "REST APIs"]
      },
      {
        name: "Java",
        level: "Proficient",
        highlight: "Object-oriented programming, data structures, multithreading, modular design",
        category: "Programming",
        iconKey: "java",
        technologies: ["OOP", "Collections", "Concurrency", "JVM"]
      },
      {
        name: "C / C++",
        level: "Solid Foundation",
        highlight: "Memory management, pointers, embedded microcontroller programming",
        category: "Programming",
        iconKey: "cpp",
        technologies: ["Pointers", "ESP8266", "Embedded C", "Algorithms", "GPIO Control"]
      },
      {
        name: "TypeScript",
        level: "Strong",
        highlight: "Type safety, interfaces, reusable types, frontend state modeling",
        category: "Programming",
        iconKey: "typescript",
        technologies: ["Generics", "Type Inference", "Interfaces", "Strict Mode", "TSX"]
      },
    ]
  },
  {
    id: "web-development",
    name: "Web Development",
    description: "Building responsive, modern, and intuitive web interfaces.",
    skills: [
      {
        name: "React",
        level: "Strong",
        highlight: "Custom hooks, component state, reusable layouts, performance optimization",
        category: "Web Development",
        iconKey: "react",
        technologies: ["Hooks", "Context API", "Vite", "Component Architecture"]
      },
      {
        name: "HTML5 & Web Standards",
        level: "Proficient",
        highlight: "Semantic page structure, accessibility, canvas drawing, clean markup",
        category: "Web Development",
        iconKey: "html",
        technologies: ["Semantic HTML", "ARIA", "Canvas 2D", "Responsive Design"]
      },
      {
        name: "CSS3 & Modern Styling",
        level: "Proficient",
        highlight: "CSS Grid, Flexbox, smooth transitions, custom styling, responsive layouts",
        category: "Web Development",
        iconKey: "css",
        technologies: ["Flexbox", "CSS Grid", "Keyframes", "Variables", "Glassmorphism"]
      },
    ]
  },
  {
    id: "backend-database",
    name: "Backend & Database",
    description: "Connecting databases, building APIs, and handling application data.",
    skills: [
      {
        name: "MongoDB",
        level: "Proficient",
        highlight: "Document modeling, aggregation queries, schema structure, indexing",
        category: "Backend & Database",
        iconKey: "mongodb",
        technologies: ["Aggregation", "BSON", "Atlas", "Indexes", "Mongoose"]
      },
      {
        name: "Supabase",
        level: "Proficient",
        highlight: "PostgreSQL tables, Row Level Security, user authentication, live data",
        category: "Backend & Database",
        iconKey: "supabase",
        technologies: ["PostgreSQL", "RLS Policies", "Auth", "Storage"]
      },
    ]
  },
  {
    id: "iot-hardware",
    name: "IoT & Hardware",
    description: "Microcontroller programming, sensor telemetry, and embedded hardware.",
    skills: [
      {
        name: "IoT & Embedded Systems",
        level: "Proficient",
        highlight: "Microcontroller coding, ultrasonic distance sensors, Wi-Fi teleoperation, motor drivers",
        category: "IoT & Hardware",
        iconKey: "iot",
        technologies: ["ESP8266", "Ultrasonic Sensors", "PWM Drivers", "Serial Monitor", "C++"]
      },
    ]
  },
  {
    id: "tools",
    name: "Tools & Workflow",
    description: "Developer tools, version control, and design software I rely on daily.",
    skills: [
      {
        name: "Git & Version Control",
        level: "Strong",
        highlight: "Branch management, clean commits, rebasing, merge resolution",
        category: "Tools & Workflow",
        iconKey: "git",
        technologies: ["Branching", "Commits", "Rebase", "Git CLI"]
      },
      {
        name: "GitHub",
        level: "Strong",
        highlight: "Repository management, pull requests, issue tracking, project collaboration",
        category: "Tools & Workflow",
        iconKey: "github",
        technologies: ["Pull Requests", "Code Reviews", "Issues", "Pages"]
      },
      {
        name: "VS Code",
        level: "Proficient",
        highlight: "Debugging, TypeScript integration, code formatting, daily engineering workflows",
        category: "Tools & Workflow",
        iconKey: "vscode",
        technologies: ["Debugging", "Linting", "Prettier", "Extensions"]
      },
      {
        name: "Figma",
        level: "Proficient",
        highlight: "Wireframing, UI mockups, component layouts, design exploration",
        category: "Tools & Workflow",
        iconKey: "figma",
        technologies: ["Wireframing", "UI Layouts", "Prototyping", "Components"]
      },
    ]
  },
  {
    id: "learning",
    name: "Learning Skills",
    description: "Technologies, frameworks, and APIs I am actively learning, practicing, and expanding.",
    skills: [
      {
        name: "JavaScript",
        level: "Learning",
        highlight: "Modern ES6+, async/await, DOM interaction, event-driven web patterns",
        category: "Learning Skills",
        iconKey: "javascript",
        technologies: ["ES6+", "Async/Await", "DOM", "Fetch API", "Event Loop"]
      },
      {
        name: "Tailwind CSS",
        level: "Learning",
        highlight: "Utility-first design, responsive layouts, theme customization, modern UI styling",
        category: "Learning Skills",
        iconKey: "tailwind",
        technologies: ["Utility Classes", "Flex/Grid", "Dark Mode", "Custom Themes"]
      },
      {
        name: "Node.js",
        level: "Learning",
        highlight: "Server-side runtime, Express routing, backend services, npm module ecosystem",
        category: "Learning Skills",
        iconKey: "nodejs",
        technologies: ["Express", "NPM Scripts", "File System", "Backend Scripts"]
      },
      {
        name: "REST APIs",
        level: "Learning",
        highlight: "HTTP endpoints, JSON request/response handling, client-server communication, API testing",
        category: "Learning Skills",
        iconKey: "api",
        technologies: ["HTTP Methods", "JSON Payloads", "CORS", "Postman", "Endpoints"]
      },
      {
        name: "Still Learning New Skills",
        level: "Always Active",
        highlight: "Constantly exploring Next.js, Docker, modern cloud tools, system design, and emerging frameworks.",
        category: "Learning Skills",
        iconKey: "learning",
        technologies: ["Next.js", "Docker", "DevOps", "System Design", "Cloud"]
      }
    ]
  }
];
