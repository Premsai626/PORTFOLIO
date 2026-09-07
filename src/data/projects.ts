import { Project } from '../types';

/**
 * Centralized Projects Data
 * Detailed, comprehensive project configurations for interactive project cards,
 * real-time simulations, and deep-dive technical modals.
 *
 * Ordered as requested:
 * 1. Obstacle-Avoiding Wi-Fi Robot (IoT / Hardware)
 * 2. ORBIT (AI Technical Interview & Automated Proctoring Platform)
 * 3. VibeTune (AI Mood-Based Music & Wellness Experience)
 * 4. Intelligent FAQ Assistant (Smart Documentation Search & Question-Answering Bot)
 */
export const projects: Project[] = [
  {
    id: "obstacle-avoiding-robot",
    name: "Obstacle-Avoiding Wi-Fi Robot",
    tagline: "Autonomous Obstacle Avoidance & Wi-Fi Teleoperation Smart Car",
    description: "Dual-mode robotic car built with asynchronous C++ on the ESP8266. Features autonomous ultrasonic navigation and a real-time browser WebSocket dashboard for remote steering.",
    category: "IoT / Hardware",
    featured: true,
    technologies: ["C++", "ESP8266", "Embedded IoT", "Ultrasonic Sensors", "Motor Drivers", "WebSockets"],
    gradient: "from-emerald-500/20 via-teal-600/20 to-blue-600/20",
    accentColor: "#10b981",
    stats: [
      { label: "Detection Range", value: "2cm — 400cm" },
      { label: "Latency", value: "<25ms" },
      { label: "Control", value: "Local Wi-Fi" },
    ],
    overview: "Combines embedded systems with web protocols. Runs on an ESP8266 microcontroller processing ultrasonic distance telemetry while hosting an onboard async WebSocket server for zero-install browser steering.",
    problem: "Traditional hobby robots rely on non-interactive navigation loops or bulky RF controllers lacking telemetry feedback.",
    solution: "Asynchronous C++ architecture separating motor timing and ultrasonic polling from network communication for seamless autonomous and manual control.",
    features: [
      "Dual-Mode Operation: Switch between autonomous avoidance and real-time remote teleoperation.",
      "Ultrasonic Proximity: Continuous distance scanning from 2cm to 400cm with emergency braking.",
      "Embedded Web Controller: Self-hosted WebSocket server running on ESP8266 for zero-install browser access.",
      "Touch Virtual Joystick: Responsive touch interface with PWM speed control.",
      "Hardware Safeguards: Motor stall protection and brownout mitigation across H-bridge drivers."
    ],
    challenges: [
      "Filtering sensor noise and false reflections via moving-average algorithms.",
      "Handling WebSocket streaming concurrently with non-blocking PWM loops."
    ],
    results: [
      "100% collision avoidance in autonomous mode across indoor obstacle courses.",
      "Sub-25ms manual teleoperation latency over local Wi-Fi."
    ],
    links: {
      github: "https://github.com/Premsai626/obstacle-avoiding-car.git",
      liveDemo: "#simulator",
      documentation: "https://github.com/Premsai626/obstacle-avoiding-car#readme",
    },
  },
  {
    id: "orbit-ai-interview",
    name: "ORBIT",
    tagline: "AI-Powered Technical Interview & Automated Proctoring Platform",
    description: "Technical screening platform that conducts conversational AI interviews, checks test integrity with in-browser OpenCV gaze tracking, and produces structured candidate scorecards.",
    category: "AI / ML",
    featured: true,
    technologies: ["React", "TypeScript", "Python", "Supabase", "AI APIs", "WebRTC", "OpenCV"],
    gradient: "from-cyan-500/20 via-blue-600/20 to-purple-600/20",
    accentColor: "#06b6d4",
    stats: [
      { label: "Accuracy", value: "98%" },
      { label: "Response", value: "<150ms" },
      { label: "Proctoring", value: "6 Signals" },
    ],
    overview: "Replaces static coding quizzes with an interactive conversational AI interviewer that asks dynamic follow-ups, evaluates code in real-time, and monitors browser integrity.",
    problem: "Manual screening takes hundreds of engineering hours, introduces subjective bias, and struggles to scale while maintaining integrity.",
    solution: "Full-stack platform pairing adaptive LLM dialog with real-time OpenCV gaze tracking, focus detection, and persistent Supabase scorecards.",
    features: [
      "Adaptive AI Interviewer: Adjusts question difficulty and asks intelligent follow-ups based on candidate answers.",
      "Computer Vision Proctoring: In-browser OpenCV landmark analysis detecting gaze shifts, missing faces, and tab switches.",
      "In-Browser Code Editor: Syntax highlighting, real-time code execution, and algorithmic scoring.",
      "Recruiter Scorecards: Automated evaluation dossiers on technical depth, clarity, and integrity.",
      "Supabase Persistence: Secure authentication, candidate history, and cloud transcript storage."
    ],
    challenges: [
      "Running client-side OpenCV in WebAssembly without video stream lag.",
      "Conditioning prompt pipelines for objective, consistent technical grading."
    ],
    results: [
      "Recognized in the CIE MLRIT / IIC Innovation Challenge 2026.",
      "Live production deployment on Vercel."
    ],
    links: {
      github: "https://github.com/Premsai626/ORBIT",
      liveDemo: "https://orbit-project-lake.vercel.app",
      documentation: "https://github.com/Premsai626/ORBIT#readme",
    },
  },
  {
    id: "vibetune-ai",
    name: "VibeTune",
    tagline: "AI Mood-Based Music Recommendation & Mindfulness Sanctuary",
    description: "AI mood-music web app combining in-browser facial emotion recognition (face-api.js) with Spotify playlists across 8 languages, weather atmospheres, and 4-7-8 breathwork.",
    category: "AI / ML",
    featured: true,
    technologies: ["JavaScript", "face-api.js", "Spotify Web API", "Supabase", "Chart.js", "Tailwind CSS"],
    gradient: "from-emerald-500/20 via-teal-600/20 to-indigo-600/20",
    accentColor: "#10b981",
    stats: [
      { label: "Moods", value: "8 States" },
      { label: "Languages", value: "8 Languages" },
      { label: "Emotion AI", value: "Real-time" },
    ],
    overview: "Leverages client-side neural networks via face-api.js to classify emotional expressions and stream matched Spotify playlists. Pairs music with weather visualizers, breathwork, and mood tracking.",
    problem: "Finding music matching one's exact mood is tedious, and mainstream apps lack integrated mindfulness pacing and mood journaling.",
    solution: "Responsive web app harmonizing computer vision emotion AI with Spotify playback, Chart.js streak analytics, and Supabase cloud sync.",
    features: [
      "8 Emotion Classifiers: Happy, Sad, Anxious, Energetic, Calm, Romantic, Focused, and Frustrated.",
      "Real-Time Face AI: In-browser classification with face-api.js running locally for privacy.",
      "Multilingual Spotify Player: Curated playlists across 8 languages.",
      "Particle Atmospheres: Ambient visualizers with rain, stars, fire embers, and floating particles.",
      "4-7-8 Breathwork: Interactive breathing pacer for stress relief.",
      "Mood Journal: 30-day streak tracker with Chart.js analytics backed by Supabase."
    ],
    challenges: [
      "Tuning neural network thresholds for varying lighting without false triggers.",
      "Managing Spotify iframe embeds with fluid animations and responsive playback."
    ],
    results: [
      "1st Place Winner in Web Development at Workshop Carnival 2.0 (CIE MLRIT / IIC).",
      "Fast, privacy-first web application deployed on Vercel."
    ],
    links: {
      github: "https://github.com/Premsai626/VIBE_TUNE",
      liveDemo: "https://vibe-tune-lilac.vercel.app/",
      documentation: "https://github.com/Premsai626/VIBE_TUNE#readme",
    },
  },
  {
    id: "intelligent-faq-bot",
    name: "Intelligent FAQ Assistant",
    tagline: "Semantic Documentation Search & RAG Knowledge Engine",
    description: "Conversational tool that parses technical documentation, performs vector semantic search, and synthesizes accurate answers with source citations.",
    category: "Full Stack",
    featured: false,
    technologies: ["TypeScript", "React", "Python", "FastAPI", "Vector Search", "RAG Pipelines"],
    gradient: "from-blue-500/20 via-cyan-600/20 to-emerald-600/20",
    accentColor: "#38bdf8",
    stats: [
      { label: "Accuracy", value: "95%" },
      { label: "Latency", value: "<300ms" },
      { label: "Index", value: "Instant" },
    ],
    overview: "Natural-language documentation assistant replacing keyword search with semantic vector embeddings and verified citations.",
    problem: "Keyword search in dense technical documentation often fails to capture context or multi-step queries.",
    solution: "RAG pipeline connecting a React/TypeScript interface to a FastAPI backend with vector embeddings and similarity ranking.",
    features: [
      "Semantic Retrieval: Vector search understanding technical terminology and context.",
      "Passage Citations: Direct reference badges citing the source documentation.",
      "Developer UI: Markdown rendering, syntax-highlighted code blocks, and copy buttons.",
      "Multi-Turn Memory: Context awareness for conversational follow-up questions.",
      "Automated Ingestion: Chunking pipeline for Markdown, PDF, and HTML docs."
    ],
    challenges: [
      "Optimizing document chunking boundaries to preserve code context.",
      "Preventing hallucinations through strict context guardrails."
    ],
    results: [
      "Fast documentation search delivering citation-backed answers in under 300ms."
    ],
    links: {
      github: "",
      liveDemo: "",
      documentation: "",
    },
  },
];
