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
    description: "A high-precision dual-mode robotic vehicle engineered with asynchronous C++ firmware on the ESP8266 microcontroller. Features autonomous navigation using ultrasonic distance scanning alongside a low-latency browser-based WebSocket dashboard for remote manual steering.",
    category: "IoT / Hardware",
    featured: true,
    technologies: ["C++", "ESP8266", "Embedded IoT", "Ultrasonic Sensors", "Motor Drivers", "WebSockets", "HTML5/CSS3", "Hardware Circuits"],
    gradient: "from-emerald-500/20 via-teal-600/20 to-blue-600/20",
    accentColor: "#10b981",
    stats: [
      { label: "Detection Range", value: "2cm — 400cm" },
      { label: "Response Latency", value: "<25ms" },
      { label: "Control Network", value: "Local Wi-Fi" },
    ],
    overview: "This robotics project fuses embedded systems engineering with modern web protocols. Powered by the ESP8266 Wi-Fi microcontroller, the smart robot processes real-time ultrasonic distance telemetry while hosting an onboard asynchronous web server. Users can instantly connect from any smartphone or laptop browser over local Wi-Fi to switch between autonomous collision-avoidance mode and manual virtual-joystick steering without installing any native apps.",
    problem: "Traditional hobby robotics either rely on rigid, non-interactive hardcoded navigation loops or require bulky dedicated radio-frequency (RF) remote controllers that lack telemetry visibility and cannot seamlessly toggle between autonomous and manual control.",
    solution: "Engineered an asynchronous embedded C++ architecture that separates high-frequency motor timing and ultrasonic sensor polling from network communication, delivering uninterrupted collision avoidance alongside instant browser-based WebSocket control.",
    features: [
      "Dual-Mode Autonomous & Manual Operation: Seamlessly toggle between autonomous spatial exploration and real-time remote teleoperation with zero reboot latency.",
      "Ultrasonic Proximity Sweeping: Continuous microsecond echo pulse measurement capable of detecting obstacles from 2cm to 400cm with dynamic emergency braking.",
      "Embedded Web Server & Controller: Self-hosted lightweight HTTP/WebSocket server running directly inside the ESP8266 flash memory for instant zero-install browser access.",
      "Touch-Optimized Virtual Joystick: Smooth responsive multi-touch control interface with directional vectors and granular PWM motor speed throttling.",
      "Hardware Protection Routines: Integrated motor stall prevention, current overload safeguards, and brownout mitigation across dual H-bridge motor drivers."
    ],
    challenges: [
      "Eliminating sensor jitter and false distance readings caused by irregular surface angles and acoustic reflections through moving-average signal filtering.",
      "Handling asynchronous WebSocket packet streaming concurrently with non-blocking microcontroller PWM pulse loops to avoid motor stuttering."
    ],
    results: [
      "Demonstrated flawless navigation through complex indoor obstacle courses with 100% collision avoidance in autonomous mode.",
      "Achieved ultra-responsive real-time manual control with under 25ms latency over local wireless networks."
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
    description: "An intelligent end-to-end technical assessment platform that conducts dynamic, conversational AI interviews, enforces test integrity via client-side computer vision gaze tracking and tab-switch detection, and generates comprehensive candidate scorecards.",
    category: "AI / ML",
    featured: true,
    technologies: ["React", "TypeScript", "Python", "Supabase", "AI APIs", "WebRTC", "Tailwind CSS", "OpenCV"],
    gradient: "from-cyan-500/20 via-blue-600/20 to-purple-600/20",
    accentColor: "#06b6d4",
    stats: [
      { label: "Evaluation Accuracy", value: "98%" },
      { label: "Response Latency", value: "<150ms" },
      { label: "Integrity Signals", value: "6 Checks" },
    ],
    overview: "ORBIT transforms traditional software engineering screening by replacing static multiple-choice tests with an interactive, conversational AI technical interviewer. It evaluates candidate technical depth in real-time, generates follow-up questions tailored to their answers, and continuously analyzes video and browser integrity metrics—providing hiring teams with actionable, objective diagnostic reports.",
    problem: "Manual first-round technical screening drains hundreds of engineering hours per hiring cycle, introduces subjective evaluation biases, and struggles to scale across large applicant pools while preventing unauthorized assistance and tab-switching.",
    solution: "Architected a full-stack platform pairing adaptive LLM dialog generation with real-time browser integrity checks (eye-gaze vector tracking, window focus loss, webcam face presence) and persistent Supabase database scorecards.",
    features: [
      "Adaptive Conversational AI Interviewer: Dynamically adjusts interview difficulty and asks intelligent follow-up questions based on the candidate's live explanations.",
      "Computer Vision Integrity Proctoring: In-browser OpenCV facial landmark analysis detecting eye-gaze deviation, face absence, multiple faces, and browser tab switches.",
      "Integrated Live Code Workspace: In-browser code editor with multi-language syntax highlighting, real-time output compilation, and algorithmic correctness scoring.",
      "Structured Recruiter Scorecards: Automated evaluation dossiers detailing candidate technical depth, communication clarity, problem-solving methodology, and integrity flags.",
      "Cloud Authentication & Persistence: Secure Supabase user authentication, candidate session history, and encrypted cloud storage for interview transcripts."
    ],
    challenges: [
      "Balancing client-side OpenCV tensor execution in WebAssembly to prevent frame drops and high CPU utilization during concurrent video streaming.",
      "Designing structured prompt conditioning pipelines that ensure the AI interviewer remains strictly objective, grounded, and technically precise."
    ],
    results: [
      "Pitched and recognized in the institutional Innovation Challenge 2026 organized by the Centre for Innovation & Entrepreneurship (CIE MLRIT / IIC).",
      "Accelerated initial engineering screening velocity while maintaining standardized, merit-based candidate evaluation.",
      "Deployed and accessible live on Vercel with high-reliability real-time interview workflows."
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
    description: "An AI-powered mood music and mindfulness web application combining real-time webcam facial emotion recognition via face-api.js with curated Spotify playlists across 8 languages, immersive dynamic weather atmospheres, 4-7-8 breathwork, and Supabase cloud journal sync.",
    category: "AI / ML",
    featured: true,
    technologies: ["JavaScript", "face-api.js", "Spotify Web API", "Supabase", "Chart.js", "HTML5/CSS3", "Tailwind CSS"],
    gradient: "from-emerald-500/20 via-teal-600/20 to-indigo-600/20",
    accentColor: "#10b981",
    stats: [
      { label: "Mood Profiles", value: "8 States" },
      { label: "Global Languages", value: "8 Languages" },
      { label: "Face Emotion AI", value: "Real-time" },
    ],
    overview: "VibeTune is a full-featured wellness and music discovery ecosystem. By leveraging client-side neural networks via face-api.js, the application classifies emotional expressions through the user's camera to instantly stream matched Spotify playlists across 8 languages. It pairs musical therapy with interactive weather visualizers, a guided 4-7-8 breathing pacer, and a 30-day mood analytics tracker backed by Supabase.",
    problem: "Finding music that genuinely resonates with one's current emotional state is often tedious, and mainstream music streaming applications lack built-in mindfulness pacing, emotional reflection tools, and mood tracking analytics.",
    solution: "Created an accessible, responsive web application that harmonizes computer vision facial emotion AI with Spotify playback, Chart.js streak analytics, audio-visual breathwork meditation, and cloud mood journaling.",
    features: [
      "8 Granular Emotion Classifiers: Happy, Sad, Anxious, Energetic, Calm, Romantic, Focused, and Frustrated emotional mapping.",
      "Real-Time Facial Emotion AI: In-browser classification utilizing face-api.js TinyFaceDetector and FaceExpression models running entirely client-side for total privacy.",
      "Multilingual Spotify Player: Embedded Spotify track player with curated playlists and deep catalog search across 8 languages (English, Hindi, Telugu, Tamil, K-Pop, Spanish, French, Japanese).",
      "Dynamic Particle Atmospheres: Ambient interactive particle visualizers featuring soothing rain, twinkling celestial stars, warm fire embers, and floating hearts.",
      "Mindfulness & Guided Breathwork: Interactive 4-7-8 breathing pacer with rhythmic visual expansion and contraction animations for stress relief.",
      "Mood Journal & Streak Analytics: 30-day interactive calendar, historical mood distribution charts powered by Chart.js, and persistent cloud sync via Supabase."
    ],
    challenges: [
      "Fine-tuning neural network inference thresholds to accurately recognize nuanced facial expressions across varying lighting conditions without false triggers.",
      "Implementing responsive, cross-origin Spotify iframe embed controls while maintaining fluid animations and zero audio latency."
    ],
    results: [
      "Awarded 1st Place Winner in the Web Development Domain at Workshop Carnival 2.0 (CIE MLRIT & Institution's Innovation Council).",
      "Delivered a zero-install, privacy-first web application running entirely in the browser and hosted on Vercel.",
      "Provides an all-in-one digital sanctuary blending artificial intelligence, music therapy, and mental wellness."
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
    tagline: "Semantic Documentation Search & RAG-Powered Knowledge Engine",
    description: "A full-stack conversational intelligence tool that parses complex technical documentation, executes dense vector semantic retrieval, and synthesizes accurate, concise answers with pinpoint passage citations.",
    category: "Full Stack",
    featured: false,
    technologies: ["TypeScript", "React", "Python", "FastAPI", "Vector Search", "RAG Pipelines", "Tailwind CSS"],
    gradient: "from-blue-500/20 via-cyan-600/20 to-emerald-600/20",
    accentColor: "#38bdf8",
    stats: [
      { label: "Answer Accuracy", value: "95%" },
      { label: "Search Latency", value: "<300ms" },
      { label: "Index Speed", value: "Instant" },
    ],
    overview: "The Intelligent FAQ Assistant redefines technical documentation discovery. Rather than manually sifting through multi-page manuals or dealing with fragile keyword search, developers can ask questions in natural language and receive contextually verified answers complete with highlighted source citations and code snippets.",
    problem: "Navigating dense software documentation and API reference guides is time-consuming, and traditional keyword search fails to understand technical context, synonyms, or multi-step troubleshooting queries.",
    solution: "Engineered a retrieval-augmented generation (RAG) pipeline connecting a modern React/TypeScript chat interface to a high-throughput FastAPI backend with vector embeddings and semantic similarity ranking.",
    features: [
      "Semantic Context Retrieval: Vector embeddings that understand technical terminology, acronyms, and conceptual developer intent.",
      "Verified Passage Citations: Inline interactive reference badges that cite and highlight the exact documentation paragraphs used to synthesize answers.",
      "Developer-Centric Chat Interface: Clean UI with full Markdown rendering, syntax-highlighted code blocks, and one-click code clipboard copying.",
      "Session Context Awareness: Multi-turn conversational memory allowing users to ask follow-up questions, debug steps, and refine code solutions in context.",
      "Automated Document Chunking: Intelligent ingestion pipeline that splits large Markdown, PDF, and HTML documentation into coherent semantic chunks."
    ],
    challenges: [
      "Optimizing document chunking boundaries and overlap windows to preserve technical code context during vectorization.",
      "Minimizing model hallucination by enforcing strict prompt context guardrails that direct the assistant to cite only verified source chunks."
    ],
    results: [
      "Dramatically accelerates developer onboarding and documentation exploration velocity.",
      "Returns verified, citation-backed technical responses in under 300 milliseconds."
    ],
    links: {
      github: "",
      liveDemo: "",
      documentation: "",
    },
  },
];
