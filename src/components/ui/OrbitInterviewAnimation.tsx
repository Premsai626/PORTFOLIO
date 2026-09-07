import React, { useState, useEffect } from 'react';
import {
  Bot,
  User,
  Mic,
  Eye,
  CheckCircle2,
  Sparkles,
  Volume2,
} from 'lucide-react';

interface OrbitInterviewAnimationProps {
  height?: number;
  className?: string;
}

interface DialogueStep {
  aiQuestion: string;
  candidateAnswer: string;
  aiScore: string;
  metricLabel: string;
}

const DIALOGUE_STEPS: DialogueStep[] = [
  {
    aiQuestion: 'Can you explain how you handle state management and real-time data in React?',
    candidateAnswer: 'I structure state with custom hooks, using Supabase subscriptions for live events and memoized selectors to prevent extra renders.',
    aiScore: '98% Score • Strong Architecture',
    metricLabel: 'Technical Depth',
  },
  {
    aiQuestion: 'How did you implement obstacle avoidance on the ESP8266 IoT robot?',
    candidateAnswer: 'I used ultrasonic echo timing in C++ with non-blocking loops, triggering dynamic motor redirection when distances drop below 20cm.',
    aiScore: '99% Score • Embedded Systems',
    metricLabel: 'Hardware Logic',
  },
  {
    aiQuestion: 'What strategies ensure responsive client-side AI and vision tracking?',
    candidateAnswer: 'I offload OpenCV frame processing to Web Workers, keeping the main UI thread at 60 FPS while analyzing eye-gaze landmarks.',
    aiScore: '97% Score • Performance Mastery',
    metricLabel: 'Vision Optimization',
  },
];

export const OrbitInterviewAnimation: React.FC<OrbitInterviewAnimationProps> = ({
  height = 200,
  className = '',
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [phase, setPhase] = useState<'ai_asking' | 'candidate_answering' | 'evaluating'>('ai_asking');
  const [audioLevel, setAudioLevel] = useState(0.5);

  // Audio waveform pulse simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setAudioLevel(0.2 + Math.random() * 0.8);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Conversation phase state machine
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (phase === 'ai_asking') {
      // AI speaks for 3.2s
      timer = setTimeout(() => {
        setPhase('candidate_answering');
      }, 3400);
    } else if (phase === 'candidate_answering') {
      // Candidate answers for 4.2s
      timer = setTimeout(() => {
        setPhase('evaluating');
      }, 4000);
    } else {
      // AI evaluates for 2.2s then cycles to next question
      timer = setTimeout(() => {
        setCurrentStepIdx((prev) => (prev + 1) % DIALOGUE_STEPS.length);
        setPhase('ai_asking');
      }, 2400);
    }

    return () => clearTimeout(timer);
  }, [phase]);

  const step = DIALOGUE_STEPS[currentStepIdx];

  return (
    <div
      className={`relative w-full rounded-2xl bg-slate-950/90 border border-slate-800 overflow-hidden shadow-md shadow-black/80 flex flex-col justify-between select-none ${className}`}
      style={{ height }}
    >
      {/* Top Video Session Header Bar */}
      <div className="relative z-20 px-3 py-1.5 flex items-center justify-between border-b border-slate-800/90 bg-slate-900/95 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/30 text-[10px] font-mono text-rose-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span>LIVE INTERVIEW</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
            SESSION #ORB-8942
          </span>
        </div>

        {/* Real-time Proctoring Beacon */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-md">
            <Eye className="w-3 h-3 text-emerald-400" />
            <span className="hidden xs:inline">Gaze:</span>
            <span className="font-semibold">Focused 100%</span>
          </div>
          <span className="text-[10px] font-mono text-sky-400 bg-sky-950/60 border border-sky-800/40 px-2 py-0.5 rounded-md font-semibold">
            AI Proctor: ON
          </span>
        </div>
      </div>

      {/* Main Split Video Screen Stage */}
      <div className="relative flex-1 grid grid-cols-2 gap-2 p-2 sm:p-2.5 overflow-hidden bg-slate-950">
        {/* Left Video Stream: AI Interviewer */}
        <div
          className={`relative rounded-xl overflow-hidden border transition-all duration-500 flex flex-col justify-between p-2.5 ${
            phase === 'ai_asking'
              ? 'bg-gradient-to-b from-sky-950/50 via-slate-900 to-slate-950 border-sky-500/60 shadow-[0_0_15px_rgba(56,189,248,0.2)] ring-1 ring-sky-400/40'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          {/* Stream Label Header */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-sky-300 font-semibold">
              <Bot className="w-3 h-3 text-sky-400" />
              <span>ORBIT AI</span>
            </div>
            {phase === 'ai_asking' ? (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[9px] font-mono animate-pulse">
                <Volume2 className="w-2.5 h-2.5" />
                <span>SPEAKING</span>
              </span>
            ) : (
              <span className="text-[9px] font-mono text-slate-500">LISTENING</span>
            )}
          </div>

          {/* AI Avatar Central Waveform Visualizer */}
          <div className="flex flex-col items-center justify-center my-auto relative z-10 py-1">
            <div className="relative flex items-center justify-center">
              {/* Outer pulsing acoustic ring */}
              <div
                className={`absolute rounded-full transition-all duration-300 pointer-events-none ${
                  phase === 'ai_asking'
                    ? 'w-14 h-14 bg-sky-500/20 border border-sky-400/40 animate-ping'
                    : 'w-10 h-10 bg-transparent'
                }`}
              />

              {/* Central Glowing AI Orb */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-sky-500 via-cyan-400 to-indigo-600 p-[2px] shadow-lg shadow-sky-500/30 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-sky-400">
                  <Bot className={`w-5 h-5 transition-transform duration-300 ${phase === 'ai_asking' ? 'scale-110 text-cyan-300' : 'text-sky-400'}`} />
                </div>
              </div>
            </div>

            {/* AI Speech Wave Bars */}
            <div className="flex items-center gap-1 mt-2 h-4">
              {[4, 8, 14, 10, 6, 12, 5].map((baseH, idx) => {
                const isSpeaking = phase === 'ai_asking';
                const dynamicH = isSpeaking
                  ? Math.max(3, Math.min(16, baseH * audioLevel * 1.3))
                  : 3;
                return (
                  <span
                    key={idx}
                    className="w-1 rounded-full bg-gradient-to-t from-sky-500 to-cyan-300 transition-all duration-100"
                    style={{ height: `${dynamicH}px` }}
                  />
                );
              })}
            </div>
          </div>

          {/* AI Subtitle Prompt Box */}
          <div className="z-10 bg-slate-950/85 border border-slate-800/90 rounded-lg p-1.5 text-[10px] text-slate-300 leading-snug font-sans">
            <span className="text-sky-400 font-bold font-mono text-[9px] block mb-0.5">
              QUESTION PROMPT:
            </span>
            <p className="line-clamp-2 text-slate-200 font-medium">
              &ldquo;{step.aiQuestion}&rdquo;
            </p>
          </div>
        </div>

        {/* Right Video Stream: Candidate (Live Webcam Feed Simulation) */}
        <div
          className={`relative rounded-xl overflow-hidden border transition-all duration-500 flex flex-col justify-between p-2.5 ${
            phase === 'candidate_answering'
              ? 'bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-950 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.2)] ring-1 ring-emerald-400/40'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          {/* Stream Label Header */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-emerald-300 font-semibold">
              <User className="w-3 h-3 text-emerald-400" />
              <span>CANDIDATE</span>
            </div>
            {phase === 'candidate_answering' ? (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-mono animate-pulse">
                <Mic className="w-2.5 h-2.5" />
                <span>ANSWERING</span>
              </span>
            ) : (
              <span className="text-[9px] font-mono text-slate-500">STANDBY</span>
            )}
          </div>

          {/* Candidate Webcam Simulation with Biometric Face Box */}
          <div className="flex flex-col items-center justify-center my-auto relative z-10 py-1">
            <div className="relative">
              {/* Target Face Mesh Reticle Frame */}
              <div className="absolute -inset-1.5 border border-dashed border-emerald-400/60 rounded-xl animate-pulse pointer-events-none" />

              {/* Candidate Avatar */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-slate-950 border border-emerald-500/40 shadow-md flex items-center justify-center relative">
                <img
                  src="/images/prem-sai-avatar.jpg"
                  alt="Candidate"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder icon if image fails
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <User className="w-5 h-5 text-emerald-400 absolute" />
              </div>

              {/* Face Tracking Coordinate Tag */}
              <div className="absolute -bottom-2 -right-2 px-1 py-0.2 rounded bg-slate-950 text-[8px] font-mono text-emerald-400 border border-emerald-800">
                100% Gaze
              </div>
            </div>

            {/* Candidate Voice Spectrum */}
            <div className="flex items-center gap-1 mt-2 h-4">
              {[5, 10, 6, 14, 8, 12, 7].map((baseH, idx) => {
                const isAnswering = phase === 'candidate_answering';
                const dynamicH = isAnswering
                  ? Math.max(3, Math.min(16, baseH * audioLevel * 1.4))
                  : 3;
                return (
                  <span
                    key={idx}
                    className="w-1 rounded-full bg-gradient-to-t from-emerald-500 to-teal-300 transition-all duration-100"
                    style={{ height: `${dynamicH}px` }}
                  />
                );
              })}
            </div>
          </div>

          {/* Candidate Response Transcript */}
          <div className="z-10 bg-slate-950/85 border border-slate-800/90 rounded-lg p-1.5 text-[10px] text-slate-300 leading-snug font-sans">
            <span className="text-emerald-400 font-bold font-mono text-[9px] block mb-0.5">
              LIVE TRANSCRIPT:
            </span>
            <p className="line-clamp-2 text-slate-200 font-medium">
              &ldquo;{step.candidateAnswer}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Live Evaluation & Integrity Analysis Scorecard Strip */}
      <div className="relative z-20 px-3 py-1.5 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono">
        <div className="flex items-center gap-1.5 text-slate-300">
          <Sparkles className="w-3 h-3 text-sky-400" />
          <span className="text-slate-400 font-medium">AI Feedback:</span>
          <span className="text-sky-300 font-bold">{step.aiScore}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Anti-Cheat Verified</span>
          </span>
          <span className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[9px] text-indigo-300 font-semibold">
            Latency &lt;150ms
          </span>
        </div>
      </div>
    </div>
  );
};
