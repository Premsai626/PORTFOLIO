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
    summary: "Started with core web building blocks: semantic HTML5, CSS3 styling, responsive layouts, and vanilla JavaScript DOM manipulation.",
    points: [
      "Built responsive, accessible web pages with custom CSS animations and modern layouts.",
      "Mastered DOM manipulation, event loops, and asynchronous JavaScript without frameworks."
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "DOM APIs"],
    accent: "from-blue-500 to-cyan-500"
  },
  {
    id: "supabase-backend-integration",
    title: "Supabase Integration & Cloud Architecture",
    role: "Database Systems & Cloud Backend Developer",
    period: "Phase 02 // Data, Auth & Cloud",
    date: "Milestone 2",
    type: "milestone",
    summary: "Integrated Supabase for backend infrastructure: PostgreSQL schemas, authentication workflows, and real-time data synchronization.",
    points: [
      "Designed PostgreSQL tables with Row-Level Security (RLS) for access control.",
      "Implemented auth pipelines, real-time channels, and cloud storage buckets."
    ],
    technologies: ["Supabase", "PostgreSQL", "RLS Policies", "SQL", "REST APIs", "Cloud Storage"],
    accent: "from-emerald-500 to-teal-500"
  },
  {
    id: "full-stack-ai-systems",
    title: "Full-Stack Development & AI Integration",
    role: "Full-Stack Software & AI Systems Engineer",
    period: "Phase 03 // Full-Stack & AI Systems",
    date: "Milestone 3",
    type: "project",
    summary: "Engineered full-stack applications combining React/TypeScript frontends with AI models, computer vision, and real-time APIs.",
    points: [
      "Built ORBIT (AI technical interview platform with OpenCV proctoring) and VibeTune (AI mood-music companion).",
      "Created typed architectures with TypeScript, scalable state management, and automated Vercel CI/CD."
    ],
    technologies: ["React", "TypeScript", "Python", "Tailwind CSS", "OpenCV", "face-api.js", "Vercel"],
    accent: "from-cyan-500 to-blue-500"
  },
  {
    id: "continuous-learning-evolution",
    title: "Still Learning & Exploring New Frameworks",
    role: "Continuous Learner & Systems Explorer",
    period: "Phase 04 // Continuous Evolution",
    date: "Ongoing",
    type: "milestone",
    summary: "Expanding depth in modern frameworks, high-performance languages, embedded IoT (C++/ESP8266), and AI systems.",
    points: [
      "Exploring Next.js, FastAPI, vector retrieval (RAG), and agentic workflows.",
      "Built IoT obstacle-avoiding smart cars with async C++ on the ESP8266."
    ],
    technologies: ["Next.js", "FastAPI", "Vector Search", "C++", "ESP8266", "Embedded IoT", "Python"],
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
    issuer: "Centre for Innovation & Entrepreneurship (CIE), MLRIT & IIC",
    date: "April 10–11, 2026",
    category: "Competitions & Hackathons",
    project: "VibeTune",
    projectUrl: "https://vibe-tune-lilac.vercel.app/",
    description: "1st Place Winner in Web Development at Workshop Carnival 2.0 for building VibeTune—an AI mood music platform with real-time facial emotion detection (face-api.js) and Spotify playback in 8 languages.",
    badge: "🏆 1st Place Winner — VibeTune",
    pdfUrl: "/certificates/web-dev-winner-workshop-carnival.pdf",
    imageUrl: "/certificates/web-dev-winner-workshop-carnival.png",
    skills: ["VibeTune", "face-api.js", "Spotify API", "Supabase", "UI/UX"]
  },
  {
    id: "cisco-python-essentials",
    title: "Python Essentials 1 — Certified Entry Programmer",
    issuer: "Cisco Networking Academy & OpenEDG Python Institute",
    date: "April 26, 2026",
    category: "Programming & AI",
    description: "Credential covering Python 3 algorithmic problem solving, debugging, and standard library for the PCEP certification track.",
    badge: "🐍 Python Institute Certified",
    pdfUrl: "/certificates/cisco-python-essentials-1.pdf",
    imageUrl: "/certificates/cisco-python-essentials-1.png",
    skills: ["Python 3", "Algorithms", "Data Structures", "PCEP Track"]
  },
  {
    id: "mongodb-basics-students",
    title: "MongoDB Basics for Students",
    issuer: "MongoDB, Inc. & Credly",
    date: "August 10, 2026",
    category: "Cloud & Databases",
    description: "Accreditation covering NoSQL document data modeling, MongoDB Atlas cloud clusters, aggregation pipelines, and CRUD operations.",
    badge: "🍃 MongoDB Credly Badge",
    pdfUrl: "/certificates/mongodb-basics-students.pdf",
    imageUrl: "/certificates/mongodb-basics-students.png",
    verificationUrl: "https://www.credly.com/badges/83ea1088-ca55-45c4-983a-d5f87998e97c",
    skills: ["MongoDB", "NoSQL", "Atlas Cloud", "Aggregation Pipelines", "CRUD"]
  },
  {
    id: "cisco-c-essentials",
    title: "C Essentials 2 — Systems & Memory Programming",
    issuer: "Cisco Networking Academy & MLRIT",
    date: "November 22, 2025",
    category: "Programming & AI",
    description: "Certified in C programming, dynamic memory management, pointers, bitwise logic, and low-level algorithms.",
    badge: "⚡ Cisco C Academy",
    pdfUrl: "/certificates/cisco-c-essentials-2.pdf",
    imageUrl: "/certificates/cisco-c-essentials-2.png",
    instructor: "Dr. Raja Sekhar Reddy N V",
    skills: ["C Programming", "Memory Management", "Pointers", "Data Structures"]
  },
  {
    id: "autodesk-fusion-cloud",
    title: "Innovation Practices Using Autodesk Fusion Cloud",
    issuer: "Autodesk Authorized Academic Partner",
    date: "May 09, 2026",
    category: "CAD & Engineering Design",
    description: "Completed professional course in 3D CAD modeling, generative design, and mechanical simulation in Autodesk Fusion Cloud.",
    badge: "📐 Autodesk Certified Partner",
    pdfUrl: "/certificates/autodesk-fusion-cloud.pdf",
    imageUrl: "/certificates/autodesk-fusion-cloud.png",
    credentialId: "AP701986098757345814045",
    instructor: "Bhaskara Rao Vadali",
    skills: ["Autodesk Fusion 360", "Cloud CAD", "Parametric 3D Design", "Generative Modeling"]
  },
  {
    id: "cie-innovation-challenge",
    title: "Innovation Challenge 2026 — ORBIT AI System",
    issuer: "Centre for Innovation & Entrepreneurship (CIE), MLRIT & IIC",
    date: "August 01, 2026",
    category: "Competitions & Hackathons",
    project: "ORBIT",
    projectUrl: "https://orbit-project-lake.vercel.app",
    description: "Selected competitor pitching ORBIT—an AI technical screening platform with dynamic conversational questions and real-time OpenCV proctoring.",
    badge: "🚀 Innovation Competitor — ORBIT",
    pdfUrl: "/certificates/innovation-challenge-cie-mlrit.pdf",
    imageUrl: "/certificates/innovation-challenge-cie-mlrit.png",
    skills: ["ORBIT", "AI Proctoring", "OpenCV", "React & TypeScript", "LLM APIs"]
  }
];
