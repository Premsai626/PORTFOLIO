import { SkillCategory } from '../types';

/**
 * Centralized Skills Ecosystem
 * Curated to exactly 2 prominent skills per section.
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
        name: "TypeScript",
        level: "Strong",
        highlight: "Type safety, interfaces, scalable state models",
        category: "Programming",
        iconKey: "typescript",
        technologies: ["Generics", "Type Inference", "Interfaces", "Strict Mode"]
      }
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
        name: "HTML5 & Modern CSS",
        level: "Proficient",
        highlight: "Semantic markup, Flexbox, Grid, keyframe animations",
        category: "Web Development",
        iconKey: "html",
        technologies: ["Semantic HTML", "CSS Grid", "Flexbox", "Responsive"]
      }
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
      }
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
        highlight: "ESP8266, microcontroller circuits, Wi-Fi teleoperation",
        category: "IoT & Hardware",
        iconKey: "iot",
        technologies: ["ESP8266", "Embedded C++", "PWM Drivers", "Microcontrollers"]
      },
      {
        name: "Sensors & Robotics Hardware",
        level: "Proficient",
        highlight: "Ultrasonic telemetry, motor drivers, sensor circuits",
        category: "IoT & Hardware",
        iconKey: "iot",
        technologies: ["HC-SR04", "L298N Driver", "Telemetry", "Actuators"]
      }
    ]
  },
  {
    id: "tools",
    name: "Tools & Workflow",
    description: "Developer tooling, version control, and design platforms.",
    skills: [
      {
        name: "Git & GitHub",
        level: "Strong",
        highlight: "Branching workflows, version control, CI/CD, pull requests",
        category: "Tools & Workflow",
        iconKey: "git",
        technologies: ["Branching", "Commits", "Pull Requests", "Code Reviews"]
      },
      {
        name: "VS Code & Tooling",
        level: "Proficient",
        highlight: "Debugging, extensions, TypeScript dev workflows",
        category: "Tools & Workflow",
        iconKey: "vscode",
        technologies: ["Debugging", "Linting", "Prettier", "Git Integration"]
      }
    ]
  },
  {
    id: "learning",
    name: "Learning Skills",
    description: "Frameworks, tools, and technologies currently being explored.",
    skills: [
      {
        name: "Node.js & REST APIs",
        level: "Learning",
        highlight: "Runtime backend scripts, Express routing, HTTP endpoints",
        category: "Learning Skills",
        iconKey: "nodejs",
        technologies: ["Node.js", "Express", "REST APIs", "Postman"]
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
