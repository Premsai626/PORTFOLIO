export interface Profile {
  name: string;
  role: string;
  titles: string[];
  headline: string;
  bio: string;
  tagline: string;
  status: string;
  avatarUrl?: string;
  education: {
    degree: string;
    specialization: string;
    institution: string;
    period: string;
    status: string;
  };
  stats: {
    label: string;
    value: string;
    suffix?: string;
    description: string;
  }[];
  links: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    email?: string;
    resume?: string;
  };
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'AI / ML' | 'Full Stack' | 'IoT / Hardware' | 'Web App';
  featured: boolean;
  technologies: string[];
  gradient: string;
  accentColor: string;
  stats: { label: string; value: string }[];
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  challenges: string[];
  results: string[];
  links: {
    github?: string;
    liveDemo?: string;
    documentation?: string;
  };
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: {
    name: string;
    level: string;
    highlight: string;
    category: string;
    iconKey: string;
    technologies: string[];
  }[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  role: string;
  period: string;
  date: string;
  type: 'milestone' | 'education' | 'project' | 'hackathon';
  summary: string;
  points: string[];
  technologies: string[];
  accent: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'Hackathon' | 'Certification' | 'Project' | 'Academic' | 'Competitions & Hackathons' | 'Programming & AI' | 'Cloud & Databases' | 'CAD & Engineering Design';
  description: string;
  badge: string;
  project?: string;
  projectUrl?: string;
  link?: string;
  pdfUrl?: string;
  imageUrl?: string;
  credentialId?: string;
  skills?: string[];
  instructor?: string;
  verificationUrl?: string;
}
