import React, { useState, useCallback, useRef } from 'react';
import {
  ArrowRight,
  Volume2,
  VolumeX,
  Compass,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { profile } from '@/data/profile';
import { EarthGlobeAnimation } from '@/components/ui/EarthGlobeAnimation';
import { FadeTextRotator } from '@/components/ui/FadeTextRotator';

interface IntroScreenProps {
  onEnter: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onEnter }) => {
  const [isEntering, setIsEntering] = useState<boolean>(false);
  const [flashSurge, setFlashSurge] = useState<boolean>(false);
  const [altitudeKm, setAltitudeKm] = useState<number>(1420);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext | null>(null);

  // Atmospheric warp sound on portfolio entry
  const playWarpSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioContextClass();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 2.4);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 2.8);
    } catch {
      // Audio not supported or blocked, fail silently
    }
  }, [soundEnabled]);

  // Handle entry click
  const handleEnter = () => {
    if (isEntering) return;
    setIsEntering(true);
    playWarpSound();

    // Altitude countdown loop
    const startAlt = 1420;
    const startTime = performance.now();
    const duration = 2900;

    const updateAltitude = () => {
      const elapsed = performance.now() - startTime;
      const fraction = Math.min(1.0, elapsed / duration);
      const currentAlt = Math.max(0, Math.round(startAlt * (1 - Math.pow(fraction, 2))));
      setAltitudeKm(currentAlt);

      if (fraction < 1.0) {
        requestAnimationFrame(updateAltitude);
      }
    };
    requestAnimationFrame(updateAltitude);

    // Light flare near the end
    setTimeout(() => {
      setFlashSurge(true);
    }, 2500);

    // Enter portfolio
    setTimeout(() => {
      onEnter();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 h-screen h-[100dvh] max-h-screen w-screen z-[100] bg-[#020617] text-slate-100 overflow-hidden select-none">
      {/* Background Volumetric Light Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-sky-500/10 via-cyan-500/8 to-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-24 left-1/4 w-[400px] h-[400px] bg-sky-500/6 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-[400px] h-[400px] bg-indigo-600/6 rounded-full blur-[110px] pointer-events-none" />

      {/* Layer 1: Full-Window 3D Revolving Earth Globe Engine */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto">
        <EarthGlobeAnimation
          fullWindow={true}
          interactive={!isEntering}
          showOrbitalRings={false}
          showLocationBeacon={true}
          isZooming={isEntering}
          onZoomComplete={onEnter}
        />
      </div>

      {/* Layer 2: UI Foreground Layers (Fades away completely on click) */}
      <div
        className={`relative z-20 h-full w-full flex flex-col justify-between items-center pointer-events-none px-4 py-3 sm:py-5 transition-all duration-500 ease-out ${
          isEntering ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Top Floating Glass Capsule Bar */}
        <header className="w-full max-w-4xl mx-auto shrink-0 pointer-events-auto">
          <div className="px-3.5 py-2 rounded-2xl bg-slate-950/60 border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex items-center justify-between">
            {/* Identity & Status */}
            <div className="flex items-center gap-2.5">
              <div className="relative group shrink-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-500 shadow-md">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-base sm:text-lg group-hover:scale-110 transition-transform">
                    👨‍💻
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-xs" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-bold font-display tracking-tight text-white flex items-center gap-1">
                    {profile.name} <span className="text-xs">⚡</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[9px] font-mono text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE
                  </span>
                </div>
                <p className="text-[10px] font-mono text-slate-400 leading-tight">
                  {profile.education.specialization} • MLRIT
                </p>
              </div>
            </div>

            {/* Audio & Quick Enter Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSoundEnabled((prev) => !prev)}
                aria-label={soundEnabled ? 'Mute audio' : 'Enable audio'}
                className="px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-sky-300 text-[11px] font-mono flex items-center gap-1.5 transition-all"
              >
                {soundEnabled ? (
                  <Volume2 className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span className="hidden sm:inline font-medium">
                  {soundEnabled ? 'Sound ON' : 'Sound OFF'}
                </span>
              </button>

              <button
                onClick={handleEnter}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/40 text-sky-300 text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Enter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Top Hero Heading Block */}
        <div className="w-full max-w-2xl mx-auto text-center space-y-1 mt-2 sm:mt-4 pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-slate-900/80 border border-white/[0.08] shadow-xs text-[10px] sm:text-[11px] font-mono text-sky-400 backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-sky-400" />
            <span className="font-semibold tracking-wider">PORTFOLIO 2026</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" /> Hyderabad, IN
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight drop-shadow-md">
            WELCOME TO{' '}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              PREM SAI&apos;S PORTFOLIO
            </span>
          </h1>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-slate-400 pt-0.5">
            <FadeTextRotator
              texts={[
                'Software Engineer & Full Stack Developer',
                'Exploring AI & Machine Learning Systems',
                'Embedded IoT & Smart Robotics (ESP8266 C++)',
                'Building Responsive & High-Performance Web Apps',
              ]}
              intervalMs={3200}
              fadeDurationMs={450}
              gradientClassName="font-medium text-sky-300 font-display"
            />
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div className="flex flex-col items-center gap-1.5 mb-2 pointer-events-auto">
          <button
            onClick={handleEnter}
            className="group relative flex items-center gap-2.5 px-7 py-3 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-[0_0_24px_rgba(56,189,248,0.4)] hover:shadow-[0_0_36px_rgba(56,189,248,0.65)] transition-all duration-300 hover:scale-[1.04] active:scale-95 border border-sky-400/40"
          >
            <span>Enter Portfolio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-[10px] sm:text-[11px] font-mono text-slate-400">
            Drag globe to rotate • Click button to enter
          </p>
        </div>

        {/* Subtle Bottom Footer */}
        <footer className="w-full max-w-4xl mx-auto text-center shrink-0 pb-1">
          <p className="text-[10px] sm:text-xs font-mono text-slate-500">
            Crafted by <span className="text-slate-400 font-medium">Prem Sai</span> • Computer Science (AIML)
          </p>
        </footer>
      </div>

      {/* Layer 3: Atmospheric Zoom Reticle & Altitude Telemetry HUD (Active ONLY during entry zoom) */}
      {isEntering && (
        <div className="fixed inset-0 pointer-events-none z-40 flex flex-col justify-between items-center py-10 px-6 animate-fadeIn">
          {/* Top Telemetry Beacon Bar */}
          <div className="px-4 py-1.5 rounded-full bg-slate-950/85 border border-sky-400/40 backdrop-blur-2xl flex items-center gap-2.5 text-xs font-mono text-sky-300 shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold text-white tracking-wider">NAV_TRACKING // INDIA ORBITAL VECTOR</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
              ALT: {altitudeKm} KM
            </span>
          </div>

          {/* Centered Globe Target Beacon during Zoom */}
          <div className="relative flex flex-col items-center justify-center my-auto">
            <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full border border-sky-400/40 border-dashed animate-spin flex items-center justify-center shadow-[0_0_35px_rgba(56,189,248,0.25)]">
              <div className="w-16 sm:w-22 h-16 sm:h-22 rounded-full border border-emerald-400/50 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-emerald-400 animate-bounce" />
              </div>
            </div>

            <div className="mt-3 px-3.5 py-1.5 rounded-full bg-slate-950/85 border border-emerald-400/50 backdrop-blur-xl flex items-center gap-2 text-xs font-mono text-emerald-400 shadow-2xl">
              <span className="font-bold tracking-wider">TARGET: HYDERABAD, INDIA</span>
              <span className="text-slate-400 font-mono">17.3850° N, 78.4867° E</span>
            </div>
          </div>

          {/* Bottom Landing Status */}
          <div className="px-3.5 py-1.5 rounded-full bg-slate-950/75 border border-white/[0.08] backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-slate-300">
            <span>ENTERING ATMOSPHERE • OPENING DEVELOPER WORKSPACE</span>
          </div>
        </div>
      )}

      {/* Layer 4: Atmospheric Entry Light Flash Overlay */}
      <div
        className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-500 ease-in-out ${
          flashSurge
            ? 'opacity-100 bg-gradient-to-t from-sky-400/40 via-cyan-200/50 to-white/95'
            : 'opacity-0'
        }`}
      />
    </div>
  );
};
