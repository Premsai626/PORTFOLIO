import { ExperienceItem, AchievementItem } from '../types';

/**
 * Centralized Journey and Milestones Data
 * Narrative-driven evolution representing the engineering progression:
 * 1. Foundations: Core Web Designing & UI Crafting
 * 2. Data & Cloud: Supabase Integration & Backend Architecture
 * 3. Full Stack: End-to-End Applications & AI Systems (ORBIT, VibeTune)
 * 4. Continuous Growth: Exploring New Frameworks, Systems & Next-Gen Languages
 */
export const experienceTimeline: ExperienceItem[] = [
  {
    id: "web-foundations",
    title: "Basic Website Designing & UI Foundations",
    role: "Frontend Design & Interface Crafting",
    period: "Phase 01 // Genesis & Foundations",
    date: "Milestone 1",
    type: "milestone",
    summary: "Started the software journey with the core building blocks of the web—mastering semantic HTML5 structure, modern CSS3 styling, responsive Grid/Flexbox layouts, and vanilla JavaScript DOM manipulation to transform ideas into clean, functional visual interfaces.",
    points: [
      "Crafted responsive, accessible web pages from scratch with custom CSS animations, structured visual hierarchies, and modern typography.",
      "Mastered the browser DOM lifecycle, event bubbling, asynchronous JavaScript promises, and zero-framework UI scripting.",
      "Adopted mobile-first principles, ensuring smooth layout reflow and touch-friendly experiences across mobile, tablet, and desktop devices."
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "UI/UX Layouts", "DOM APIs"],
    accent: "from-blue-500 to-cyan-500"
  },
  {
    id: "supabase-backend-integration",
    title: "Supabase Integration & Cloud Architecture",
    role: "Database Systems & Cloud Backend Developer",
    period: "Phase 02 // Data, Auth & Cloud",
    date: "Milestone 2",
    type: "milestone",
    summary: "Evolved beyond static frontends into dynamic, data-driven systems by adopting Supabase as a comprehensive serverless backend—architecting relational PostgreSQL databases, managing authentication lifecycles, and implementing real-time websocket synchronization.",
    points: [
      "Designed normalized PostgreSQL database schemas and implemented Row-Level Security (RLS) policies for granular user data protection.",
      "Configured robust authentication pipelines supporting email/password sessions, third-party OAuth, and secure token storage.",
      "Integrated Supabase Realtime pub/sub channels and cloud storage buckets to power live data feeds and persistent file management."
    ],
    technologies: ["Supabase", "PostgreSQL", "Row-Level Security (RLS)", "SQL", "RESTful APIs", "Cloud Storage"],
    accent: "from-emerald-500 to-teal-500"
  },
  {
    id: "full-stack-ai-systems",
    title: "Full-Stack Development & AI Integration",
    role: "Full-Stack Software & Intelligent Systems Engineer",
    period: "Phase 03 // Full-Stack & AI Systems",
    date: "Milestone 3",
    type: "project",
    summary: "Stepped into complete end-to-end full-stack engineering—connecting modern React and TypeScript frontend architectures with custom backend logic, real-time media streams, computer vision pipelines, and production AI API integrations.",
    points: [
      "Engineered ORBIT, an AI-driven technical screening platform featuring adaptive question generation, code execution, and real-time OpenCV proctoring.",
      "Developed VibeTune, an AI mood-music companion using in-browser face-api.js facial emotion classification, Spotify embeds across 8 languages, and breathing pacers.",
      "Implemented type-safe architectures with TypeScript, scalable state management, modular component design, and automated Vercel CI/CD deployments."
    ],
    technologies: ["React", "TypeScript", "Python", "Tailwind CSS", "OpenCV", "face-api.js", "WebSockets", "Vercel"],
    accent: "from-cyan-500 to-blue-500"
  },
  {
    id: "continuous-learning-evolution",
    title: "Still Learning & Exploring New Frameworks & Languages",
    role: "Continuous Learner & Next-Gen Systems Explorer",
    period: "Phase 04 // Continuous Evolution",
    date: "Ongoing",
    type: "milestone",
    summary: "Actively expanding engineering breadth and depth—diving into emerging web frameworks, high-performance programming languages, embedded IoT microcontroller systems (C++ / ESP8266), vector database retrieval (RAG), and autonomous agentic workflows.",
    points: [
      "Deepening expertise across Next.js, FastAPI, vector search engines, and agentic LLM orchestration to build resilient software products.",
      "Building IoT robotics hardware including autonomous obstacle-avoiding Wi-Fi smart cars using asynchronous C++ on the ESP8266.",
      "Pursuing specialized academic coursework in Computer Science (AIML) at MLRIT while relentlessly learning, prototyping, and shipping code every day."
    ],
    technologies: ["Next.js", "FastAPI", "Vector Search", "C++", "ESP8266", "Embedded IoT", "AI Agents", "Python"],
    accent: "from-purple-500 to-indigo-500"
  }
];

/**
 * Centralized Achievements and Recognitions
 * Categorized verified certificates, hackathons, and technical distinctions.
 */
export const achievements: AchievementItem[] = [
  {
    id: "web-dev-winner-carnival",
    title: "Winner — Web Development Domain (VibeTune)",
    issuer: "Centre for Innovation and Entrepreneurship (CIE), MLRIT & IIC (Ministry of HRD)",
    date: "April 10–11, 2026",
    category: "Competitions & Hackathons",
    project: "VibeTune",
    projectUrl: "https://vibe-tune-lilac.vercel.app/",
    description: "Awarded 1st Place Winner in the Web Development Domain at Workshop Carnival 2.0 for engineering VibeTune—an innovative AI mood-based music recommendation and mindfulness platform featuring real-time in-browser facial emotion recognition (face-api.js), multilingual Spotify integration across 8 languages, and Supabase cloud journal sync.",
    badge: "🏆 1st Place Winner — VibeTune",
    pdfUrl: "/certificates/web-dev-winner-workshop-carnival.pdf",
    imageUrl: "/certificates/web-dev-winner-workshop-carnival.png",
    skills: ["VibeTune Project", "Web Development", "face-api.js", "Spotify Web API", "Supabase", "UI/UX Architecture"]
  },
  {
    id: "cisco-python-essentials",
    title: "Python Essentials 1 — Certified Entry Programmer",
    issuer: "Cisco Networking Academy & OpenEDG Python Institute",
    date: "April 26, 2026",
    category: "Programming & AI",
    description: "Successfully achieved student credential covering Python 3 algorithmic problem solving, software debugging, and Python Standard Library mastery; preparatory track for the PCEP (Certified Entry-Level Python Programmer) qualification.",
    badge: "🐍 Python Institute Certified",
    pdfUrl: "/certificates/cisco-python-essentials-1.pdf",
    imageUrl: "/certificates/cisco-python-essentials-1.png",
    skills: ["Python 3", "Algorithms", "Data Structures", "Standard Library", "Debugging", "PCEP Track"]
  },
  {
    id: "mongodb-basics-students",
    title: "MongoDB Basics for Students",
    issuer: "MongoDB, Inc. & Credly",
    date: "August 10, 2026",
    category: "Cloud & Databases",
    description: "Completed comprehensive student accreditation covering NoSQL document data modeling, MongoDB Atlas cloud clusters, aggregation pipelines, CRUD indexing, and modern application backend integration.",
    badge: "🍃 MongoDB Credly Badge",
    pdfUrl: "/certificates/mongodb-basics-students.pdf",
    imageUrl: "/certificates/mongodb-basics-students.png",
    verificationUrl: "https://www.credly.com/badges/83ea1088-ca55-45c4-983a-d5f87998e97c",
    skills: ["MongoDB", "NoSQL", "Document Modeling", "Atlas Cloud", "Aggregation Pipelines", "CRUD"]
  },
  {
    id: "cisco-c-essentials",
    title: "C Essentials 2 — Systems & Memory Programming",
    issuer: "Cisco Networking Academy & MLRIT",
    date: "November 22, 2025",
    category: "Programming & AI",
    description: "Certified in advanced C language paradigms, dynamic memory allocation, pointer manipulation, bitwise logic, structures, and low-level algorithmic design under Cisco Academy guidelines.",
    badge: "⚡ Cisco C Academy",
    pdfUrl: "/certificates/cisco-c-essentials-2.pdf",
    imageUrl: "/certificates/cisco-c-essentials-2.png",
    instructor: "Dr. Raja Sekhar Reddy N V",
    skills: ["C Programming", "Memory Management", "Pointers", "Data Structures", "Systems Engineering"]
  },
  {
    id: "autodesk-fusion-cloud",
    title: "Innovation Practices Using Autodesk Fusion Cloud",
    issuer: "Autodesk Authorized Academic Partner",
    date: "May 09, 2026",
    category: "CAD & Engineering Design",
    description: "Completed an intensive 43–100 hour professional course in 3D CAD modeling, generative design methodologies, cloud-based mechanical simulation, and parametric prototyping using Autodesk Fusion Cloud.",
    badge: "📐 Autodesk Certified Partner",
    pdfUrl: "/certificates/autodesk-fusion-cloud.pdf",
    imageUrl: "/certificates/autodesk-fusion-cloud.png",
    credentialId: "AP701986098757345814045",
    instructor: "Bhaskara Rao Vadali",
    skills: ["Autodesk Fusion 360", "Cloud CAD", "Parametric 3D Design", "Generative Modeling", "Hardware Prototyping"]
  },
  {
    id: "cie-innovation-challenge",
    title: "Innovation Challenge 2026 — ORBIT AI System",
    issuer: "Centre for Innovation & Entrepreneurship (CIE), MLRIT & Institution's Innovation Council",
    date: "August 01, 2026",
    category: "Competitions & Hackathons",
    project: "ORBIT",
    projectUrl: "https://orbit-project-lake.vercel.app",
    description: "Selected competitor in the institutional Innovation Challenge organized by the Centre for Innovation & Entrepreneurship (CIE), pitching and demonstrating ORBIT—an intelligent end-to-end technical screening platform pairing adaptive conversational AI question generation with real-time OpenCV gaze tracking and browser integrity proctoring.",
    badge: "🚀 Innovation Competitor — ORBIT",
    pdfUrl: "/certificates/innovation-challenge-cie-mlrit.pdf",
    imageUrl: "/certificates/innovation-challenge-cie-mlrit.png",
    skills: ["ORBIT Platform", "AI Proctoring", "OpenCV", "React & TypeScript", "LLM APIs", "Rapid Prototyping"]
  }
];
