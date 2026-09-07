import React, { useState, useEffect } from 'react';
import {
  Music,
  Smile,
  Sparkles,
  Camera,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Wind,
  Check,
  Cloud,
} from 'lucide-react';

interface VibeTuneAnimationProps {
  height?: number;
  className?: string;
}

interface MoodState {
  mood: string;
  emoji: string;
  confidence: string;
  color: string;
  accentHex: string;
  atmosphere: string;
  trackName: string;
  artist: string;
  language: string;
  breathPhase: string;
  breathTiming: string;
  journalPrompt: string;
}

const MOOD_STATES: MoodState[] = [
  {
    mood: 'Calm & Peaceful',
    emoji: '😌',
    confidence: '96% Detection',
    color: 'from-teal-500/20 via-emerald-500/10 to-slate-900',
    accentHex: '#10b981',
    atmosphere: 'Starry Sky ✨',
    trackName: 'Weightless (Ambient Rest)',
    artist: 'Marconi Union',
    language: 'English',
    breathPhase: 'Inhale (4s)',
    breathTiming: '4-7-8 Breathwork',
    journalPrompt: 'What brought you tranquility today?',
  },
  {
    mood: 'Happy & Joyful',
    emoji: '😊',
    confidence: '98% Detection',
    color: 'from-amber-500/20 via-yellow-500/10 to-slate-900',
    accentHex: '#f59e0b',
    atmosphere: 'Sunlight Sparkles ☀️',
    trackName: 'Happy (Feel Good Beats)',
    artist: 'Pharrell Williams',
    language: 'Telugu & English',
    breathPhase: 'Hold (7s)',
    breathTiming: '4-7-8 Breathwork',
    journalPrompt: 'What are 3 things that made you smile?',
  },
  {
    mood: 'Deep Focus',
    emoji: '🧠',
    confidence: '94% Detection',
    color: 'from-indigo-500/20 via-sky-500/10 to-slate-900',
    accentHex: '#38bdf8',
    atmosphere: 'Neon Mist 🌌',
    trackName: 'Lofi Study Session #42',
    artist: 'ChillHop Music',
    language: 'Instrumental',
    breathPhase: 'Exhale (8s)',
    breathTiming: 'Deep Concentration',
    journalPrompt: 'What priority goal are you working on?',
  },
  {
    mood: 'Energetic Vibes',
    emoji: '⚡',
    confidence: '99% Detection',
    color: 'from-rose-500/20 via-purple-500/10 to-slate-900',
    accentHex: '#ec4899',
    atmosphere: 'Fire Embers 🔥',
    trackName: 'Blinding Lights (Remix)',
    artist: 'The Weeknd',
    language: 'K-Pop & Global',
    breathPhase: 'Active Flow',
    breathTiming: 'High Energy Mode',
    journalPrompt: 'Where will you channel your energy?',
  },
];

export const VibeTuneAnimation: React.FC<VibeTuneAnimationProps> = ({
  height = 240,
  className = '',
}) => {
  const [moodIdx, setMoodIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [eqLevel, setEqLevel] = useState(0.6);
  const [progress, setProgress] = useState(38);

  // Dynamic Audio Spectrum simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setEqLevel(0.25 + Math.random() * 0.75);
    }, 110);
    return () => clearInterval(interval);
  }, []);

  // Track progress timer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 98 ? 12 : prev + 1));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // Cycle moods every 4.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setMoodIdx((prev) => (prev + 1) % MOOD_STATES.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const current = MOOD_STATES[moodIdx];

  return (
    <div
      className={`relative w-full rounded-2xl bg-slate-950/90 border border-slate-800 overflow-hidden shadow-md shadow-black/80 flex flex-col justify-between select-none ${className}`}
      style={{ height }}
    >
      {/* Top Header Bar */}
      <div className="relative z-20 px-3 py-1.5 flex items-center justify-between border-b border-slate-800/90 bg-slate-900/95 backdrop-blur-md">
        <div className="flex items-center gap-2">
          {/* Spotify Pill */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SPOTIFY EMBED</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
            face-api.js • 8 Moods
          </span>
        </div>

        {/* Cloud Sync & Atmosphere Tag */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[10px] font-mono text-sky-400 bg-sky-950/60 border border-sky-800/40 px-2 py-0.5 rounded-md">
            <Cloud className="w-3 h-3 text-sky-400" />
            <span className="font-semibold">Supabase: Synced</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-md font-semibold">
            {current.language}
          </span>
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="relative flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 p-2 sm:p-2.5 overflow-hidden bg-slate-950">
        {/* Left Side: AI Face Detection & Atmosphere Simulation */}
        <div
          className={`relative rounded-xl overflow-hidden border border-slate-800/90 bg-gradient-to-b ${current.color} flex flex-col justify-between p-2.5 transition-all duration-700`}
        >
          {/* Top Detection Badge */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-200">
              <Camera className="w-3 h-3 text-sky-400" />
              <span>FACE AI SCAN</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700/80 text-emerald-400">
              {current.confidence}
            </span>
          </div>

          {/* Central Face Reticle & Emotion Indicator */}
          <div className="flex items-center justify-center my-auto gap-3.5 z-10 py-1">
            {/* Target Reticle */}
            <div className="relative flex items-center justify-center">
              <div className="w-12 h-12 rounded-xl border border-dashed border-sky-400/60 animate-spin" style={{ animationDuration: '10s' }} />
              <div className="absolute w-10 h-10 rounded-lg bg-slate-900/90 border border-slate-700 flex items-center justify-center text-xl shadow-inner shadow-black">
                {current.emoji}
              </div>
              {/* Corner brackets */}
              <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-sky-400" />
              <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-sky-400" />
            </div>

            {/* Detected Details */}
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                Current Mood
              </span>
              <span className="text-sm sm:text-base font-bold text-white font-display flex items-center gap-1.5">
                {current.mood}
              </span>
              <span className="text-[10px] font-mono text-slate-300 flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Atmosphere: {current.atmosphere}</span>
              </span>
            </div>
          </div>

          {/* 4-7-8 Breathwork Indicator Strip */}
          <div className="z-10 bg-slate-950/80 border border-slate-800/90 rounded-lg px-2 py-1 flex items-center justify-between text-[10px] font-mono">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Wind className="w-3 h-3 text-cyan-400" />
              <span>{current.breathTiming}:</span>
            </span>
            <span className="text-cyan-300 font-bold">{current.breathPhase}</span>
          </div>
        </div>

        {/* Right Side: Spotify Player & Track Synchronizer */}
        <div className="relative rounded-xl overflow-hidden border border-slate-800/90 bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col justify-between p-2.5">
          {/* Player Header */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-800/60 text-[10px] font-mono text-emerald-400 font-semibold">
              <Music className="w-3 h-3" />
              <span>MOOD TRACK SYNC</span>
            </div>
            <div className="flex items-center gap-1 text-[9px] font-mono text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>320 kbps</span>
            </div>
          </div>

          {/* Current Song Display & Equalizer */}
          <div className="flex items-center justify-between my-auto gap-2.5 z-10 py-1">
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-bold text-white truncate font-display">
                {current.trackName}
              </div>
              <div className="text-[11px] text-slate-400 truncate mt-0.5 font-sans">
                {current.artist}
              </div>
            </div>

            {/* Spotify-style Equalizer Bars */}
            <div className="flex items-end gap-1 h-6 px-2 py-1 bg-slate-950/80 rounded-lg border border-slate-800 shrink-0">
              {[4, 12, 18, 10, 16, 7, 14, 9].map((baseH, idx) => {
                const dynamicH = isPlaying
                  ? Math.max(3, Math.min(20, baseH * eqLevel * 1.3))
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

          {/* Player Controls & Progress Bar */}
          <div className="z-10 bg-slate-950/80 border border-slate-800/90 rounded-lg p-1.5 space-y-1.5">
            {/* Progress Bar */}
            <div className="w-full bg-slate-800/80 h-1 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Button Controls */}
            <div className="flex items-center justify-between text-slate-400">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous track"
                  onClick={() => setMoodIdx((prev) => (prev - 1 + MOOD_STATES.length) % MOOD_STATES.length)}
                  className="hover:text-white transition-colors"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  aria-label={isPlaying ? 'Pause music' : 'Play music'}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-5 h-5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center transition-all shadow-xs"
                >
                  {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
                </button>
                <button
                  type="button"
                  aria-label="Next track"
                  onClick={() => setMoodIdx((prev) => (prev + 1) % MOOD_STATES.length)}
                  className="hover:text-white transition-colors"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400">
                <Volume2 className="w-3 h-3 text-slate-400" />
                <span>80%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="relative z-20 px-3 py-1.5 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono">
        <div className="flex items-center gap-1.5 text-slate-300">
          <Smile className="w-3 h-3 text-emerald-400" />
          <span className="text-slate-400 font-medium">Daily Prompt:</span>
          <span className="text-emerald-300 font-semibold truncate max-w-[200px] sm:max-w-xs">
            {current.journalPrompt}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 text-emerald-400 font-semibold">
            <Check className="w-3 h-3" />
            <span>Journal Saved</span>
          </span>
          <span className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[9px] text-teal-300 font-semibold">
            8 Languages
          </span>
        </div>
      </div>
    </div>
  );
};
