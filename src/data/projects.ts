import { Project } from '../types';

/**
 * Projects Data
 * Detailed real-world project configurations written from a genuine developer perspective.
 *
 * Sequence:
 * 1. Obstacle-Avoiding Wi-Fi Robot (IoT / Embedded C++)
 * 2. ORBIT (AI Technical Interview & In-Browser Proctoring)
 * 3. VibeTune (1st Place Hackathon Winner — AI Mood Music Experience)
 * 4. Intelligent FAQ Assistant (Documentation Vector Search & Q&A)
 */
export const projects: Project[] = [
  {
    id: "obstacle-avoiding-robot",
    name: "Obstacle-Avoiding Wi-Fi Robot",
    tagline: "Autonomous ultrasonic navigation & real-time Wi-Fi teleoperation car",
    description: "A two-wheel robotics build powered by an ESP8266 microcontroller and written in C++. It can either navigate around obstacles autonomously or be steered in real time from any phone or laptop browser via a local WebSocket connection.",
    category: "IoT / Hardware",
    featured: true,
    technologies: ["C++", "ESP8266", "Embedded Systems", "HC-SR04 Ultrasonic", "L298N Motor Driver", "WebSockets"],
    gradient: "from-emerald-500/20 via-teal-600/20 to-blue-600/20",
    accentColor: "#10b981",
    stats: [
      { label: "Hardware", value: "ESP8266" },
      { label: "Range", value: "2cm – 400cm" },
      { label: "Interface", value: "Browser JoyPad" },
    ],
    overview: "Built as a hands-on exploration of microcontroller programming and real-time networking. The robot reads an HC-SR04 ultrasonic distance sensor to steer clear of walls, and hosts an onboard web server serving a touch-friendly virtual joystick for direct manual control.",
    problem: "Most starter robotics cars either only run a rigid autonomous loop without feedback, or require bulky dedicated RF remotes that don't allow live diagnostics.",
    solution: "Wrote non-blocking asynchronous C++ routines on the ESP8266. Motor PWM pulse trains run concurrently with a lightweight WebSocket server, enabling instant switching between autonomous pathfinding and browser-based remote drive.",
    features: [
      "Dual Control Modes: One-tap toggle between auto-navigation and live browser steering.",
      "Ultrasonic Proximity Sensing: Real-time distance measurement with emergency brake threshold at 20 cm.",
      "Zero-Install Web Remote: Connects directly to the robot's local Wi-Fi hotspot to open the control pad in any browser.",
      "Analog-Style Touch Joystick: Custom HTML5 canvas joystick sending directional vectors with variable motor speed.",
      "Power & Motor Isolation: Separate power regulation rails to avoid microcontroller resets during high motor draw."
    ],
    challenges: [
      "Filtering noisy ultrasonic sensor echoes caused by angled walls using a rolling median window.",
      "Preventing motor jitter while the ESP8266 handles incoming Wi-Fi packets through non-blocking async timers."
    ],
    results: [
      "Reliable obstacle avoidance indoors with smooth turns and zero collisions.",
      "Responsive manual steering with near-instant feel over local Wi-Fi."
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
    tagline: "AI technical interview platform with in-browser code evaluation and proctoring",
    description: "A web platform designed to conduct interactive coding and technical interviews. It asks dynamic questions, evaluates live code submissions, and uses client-side computer vision to check interview integrity without sending candidate video to external servers.",
    category: "AI / ML",
    featured: true,
    technologies: ["React", "TypeScript", "Python", "Supabase", "OpenCV", "WebAssembly", "Tailwind CSS"],
    gradient: "from-cyan-500/20 via-blue-600/20 to-purple-600/20",
    accentColor: "#06b6d4",
    stats: [
      { label: "Vision", value: "Client-Side" },
      { label: "Backend", value: "Supabase" },
      { label: "Status", value: "Live on Vercel" },
    ],
    overview: "Created to help students practice realistic technical interviews. Instead of static multiple-choice questions, ORBIT listens to answers, asks relevant technical follow-ups, provides a syntax-highlighted code editor, and generates structured feedback reports.",
    problem: "Scheduling mock technical interviews with senior engineers is hard to organize, while generic quiz platforms don't evaluate how a candidate thinks through a problem.",
    solution: "Built a full-stack web application combining adaptive AI questioning, an embedded code runner, and lightweight in-browser OpenCV vision models to track gaze and tab focus directly on device.",
    features: [
      "Conversational Technical Q&A: Generates dynamic follow-up questions tailored to the candidate's specific answers.",
      "In-Browser Code Workspace: Code editor with syntax highlighting, language selection, and execution test cases.",
      "Privacy-First Proctoring: Runs OpenCV face and gaze tracking locally via WebAssembly without storing raw webcam video.",
      "Structured Performance Dossier: Summarizes problem-solving clarity, technical correctness, and pacing.",
      "User Accounts & History: Supabase auth and database for saving interview records, scores, and practice progress."
    ],
    challenges: [
      "Compiling and running OpenCV in WebAssembly smoothly alongside the React component render loop.",
      "Structuring prompt chains to deliver consistent, constructive code evaluation rather than generic praise."
    ],
    results: [
      "Selected as an innovation project in the CIE MLRIT / IIC Innovation Challenge 2026.",
      "Deployed and accessible live on Vercel."
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
    tagline: "AI mood-based music streamer with real-time facial emotion recognition",
    description: "An interactive music and wellness web application that uses in-browser neural networks to recognize facial expressions, streaming matching Spotify playlists across 8 languages alongside weather themes and guided breathing.",
    category: "AI / ML",
    featured: true,
    technologies: ["JavaScript", "face-api.js", "Spotify Web API", "Supabase", "Chart.js", "Tailwind CSS"],
    gradient: "from-emerald-500/20 via-teal-600/20 to-indigo-600/20",
    accentColor: "#10b981",
    stats: [
      { label: "Award", value: "1st Place Winner" },
      { label: "Emotions", value: "8 Classifiers" },
      { label: "Languages", value: "8 Languages" },
    ],
    overview: "Built during Workshop Carnival 2.0 to explore combining computer vision with everyday digital music. VibeTune reads your camera locally to detect how you feel, finds matching music tracks on Spotify, and offers breathing exercises when you're stressed.",
    problem: "People often don't know what music matches their current mood, and standard streaming playlists don't adapt to how you're actually feeling in the moment.",
    solution: "Integrated client-side face landmark models (face-api.js) to classify 8 emotional states in real time, mapped to curated Spotify playlists in 8 different Indian and international languages.",
    features: [
      "8 Emotion Classifiers: Accurately detects Happy, Sad, Anxious, Energetic, Calm, Romantic, Focused, and Frustrated.",
      "Local Neural Inference: Video frames are processed entirely inside the browser canvas, keeping camera data 100% private.",
      "Multilingual Music Catalog: Playlists categorized across English, Hindi, Telugu, Tamil, and more.",
      "Interactive Weather & Ambient Themes: Background particle effects (rain, night sky, embers) matching the music vibe.",
      "4-7-8 Breathing Guide: Built-in guided breathing animation to help reduce stress and refocus.",
      "Mood Calendar: Logs daily emotions and listening history to Supabase with visual Chart.js trends."
    ],
    challenges: [
      "Handling fluctuating room lighting conditions by normalizing facial brightness before feeding frames to face-api.js.",
      "Managing responsive Spotify player embeds and seamless background canvas particle rendering on mobile screens."
    ],
    results: [
      "Won 1st Place in the Web Development Domain at Workshop Carnival 2.0 (CIE MLRIT / IIC).",
      "Live deployment actively used for demos and music listening on Vercel."
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
    tagline: "Semantic documentation search and Q&A engine with verified citations",
    description: "A developer tool that ingests technical documentation, creates vector embeddings, and answers complex questions in natural language with precise paragraph citations.",
    category: "Full Stack",
    featured: false,
    technologies: ["TypeScript", "React", "Python", "FastAPI", "Vector Embeddings", "RAG Pipeline"],
    gradient: "from-blue-500/20 via-cyan-600/20 to-emerald-600/20",
    accentColor: "#38bdf8",
    stats: [
      { label: "Search", value: "Vector RAG" },
      { label: "Backend", value: "FastAPI" },
      { label: "Citations", value: "Direct Link" },
    ],
    overview: "Built to make navigating dense developer docs easier. Instead of relying on exact keyword matches, this tool understands synonyms and developer context to pinpoint the right section and explain the answer clearly.",
    problem: "Standard documentation search fails when you don't know the exact keyword or when the answer spans across multiple guides.",
    solution: "Created a Retrieval-Augmented Generation (RAG) backend using FastAPI and Python to chunk documentation, compute vector embeddings, and return grounded answers with exact source links.",
    features: [
      "Semantic Search: Understands the meaning of questions instead of just matching literal strings.",
      "Verifiable Citations: Every answer includes source badges linking directly to the corresponding documentation page.",
      "Markdown & Code Support: Formats responses with copyable code snippets, tables, and step-by-step guides.",
      "Conversational Follow-ups: Remembers previous questions in the session for clarifying multi-part queries."
    ],
    challenges: [
      "Fine-tuning document chunk sizes so code blocks and explanations aren't split mid-sentence.",
      "Adding strict context validation to ensure the bot only answers from provided documentation."
    ],
    results: [
      "Fast and accurate technical search returning answers with clear source attribution."
    ],
    links: {
      github: "",
      liveDemo: "",
      documentation: "",
    },
  },
];
