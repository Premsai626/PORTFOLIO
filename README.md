# Prem Sai — Creative Developer Portfolio (React + Vite + TypeScript)

A personal portfolio web application built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**. Designed with a futuristic creative-tech aesthetic, interactive developer console, particle physics canvas, and centralized data architecture.

---

## 🚀 Quick Start Guide

To run this portfolio locally on your machine:

1. **Open a terminal** inside this portfolio directory:
   ```bash
   cd "C:\Users\prem sai\OneDrive\Desktop\portfolio"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   *The application will launch on `http://localhost:3000` (or `http://localhost:5173`).*

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🛠️ Easy Content & Link Customization

All portfolio data and links are **centralized** so you can update them in one place without touching UI components:

| File | What you can configure |
|---|---|
| `src/data/profile.ts` | Your name, roles, bio, academic details, and **social/email links** (`github`, `linkedin`, `instagram`, `email`, `resume`) |
| `src/data/projects.ts` | Add new projects, descriptions, features, challenges, results, and project GitHub/Demo links |
| `src/data/skills.ts` | Add or modify technical skills, proficiency levels, and tech tags |
| `src/data/experience.ts` | Update your journey timeline and honors/achievements |

> **Note on Links:**
> If any link (GitHub, LinkedIn, Email, Demo, etc.) is left empty (`""`), the portfolio will automatically show a disabled badge (`Coming Soon` or `Add Profile`) rather than broken `#` links or fake URLs.
