import { Profile } from '../types';

/**
 * Centralized Profile Information
 * Change links and profile info here without touching UI components.
 * Empty strings are safely treated as placeholders and handled gracefully.
 */
export const profile: Profile = {
  name: "PREM SAI",
  role: "Software Engineer • Full Stack & AI Developer",
  titles: [
    "Software Engineer",
    "Full Stack Developer",
    "AI & ML Builder",
    "IoT & Robotics Developer"
  ],
  headline: "Building web apps, AI systems, and IoT hardware with clean architecture.",
  bio: "Computer Science (AIML) student at MLRIT building full-stack platforms, machine learning pipelines, and robotics hardware.",
  tagline: "Clean code, practical AI systems, and responsive web platforms.",
  status: "Open to internships & software developer roles",
  avatarUrl: "/images/prem-sai-avatar.jpg",
  education: {
    degree: "B.Tech in Computer Science & Engineering",
    specialization: "Artificial Intelligence & Machine Learning (CSM)",
    institution: "MLR Institute of Technology",
    period: "2025 — PRESENT",
    status: "Undergraduate Student",
  },
  stats: [
    { label: "Technologies", value: "15+", description: "Languages, tools & frameworks" },
    { label: "Hours Coded", value: "1,200+", description: "Building & shipping projects" },
    { label: "Commitment", value: "100%", description: "Continuous learning" },
  ],
  links: {
    github: "https://github.com/Premsai626",
    linkedin: "https://www.linkedin.com/in/premsai02",
    instagram: "https://www.instagram.com/__premsai05_",
    email: "ippilipremsai12356@gmail.com",
    resume: "",
  },
};
