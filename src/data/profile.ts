import { Profile } from '../types';

/**
 * Centralized Profile Information
 * Change links and profile info here without touching UI components.
 * Empty strings are safely treated as placeholders and handled gracefully.
 */
export const profile: Profile = {
  name: "PREM SAI",
  role: "Software Engineer • Full Stack Developer • AI Explorer",
  titles: [
    "Software Engineer",
    "Full Stack Developer",
    "AI & ML Builder",
    "IoT & Robotics Explorer",
    "Computer Science Student"
  ],
  headline: "Building reliable web applications, exploring machine learning systems, and creating practical software solutions.",
  bio: "I am a Computer Science student specializing in Artificial Intelligence and Machine Learning (CSM) at MLR Institute of Technology. I enjoy building clean, responsive web platforms, training machine learning models, and programming microcontrollers for robotics. I focus on writing maintainable code and crafting intuitive user experiences.",
  tagline: "Writing clean code, exploring AI systems, and building responsive web applications.",
  status: "Open to internships & software development roles",
  avatarUrl: "/images/prem-sai-avatar.jpg",
  education: {
    degree: "B.Tech in Computer Science & Engineering",
    specialization: "Artificial Intelligence & Machine Learning (CSM)",
    institution: "MLR Institute of Technology",
    period: "2025 — PRESENT",
    status: "Undergraduate Student",
  },
  stats: [
    { label: "Technologies", value: "15+", description: "Languages, frameworks & databases" },
    { label: "Hands-on Hours", value: "1,200+", description: "Building, debugging & shipping code" },
    { label: "Dedication", value: "100%", description: "Always learning and improving" },
  ],
  links: {
    github: "https://github.com/Premsai626",
    linkedin: "https://www.linkedin.com/in/premsai02",
    instagram: "https://www.instagram.com/__premsai05_",
    email: "ippilipremsai12356@gmail.com",
    resume: "",
  },
};
