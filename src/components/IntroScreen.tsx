import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroScreenProps {
  onComplete: () => void;
}

/**
 * IntroScreen Component
 * Minimal, cinematic handwriting intro screen:
 * - Line 1: "Initializing ....." with ambient pulse
 * - Line 2: "Premsai's Portfolio" in Great Vibes cursive with glowing ink reveal
 * - 30 FPS capped canvas stardust & animation loop
 * - Automatic smooth dissolve transition into the main homepage
 */
export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'writing' | 'hold' | 'fadeout' | 'done'>('writing');
  const [writeProgress, setWriteProgress] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Handwriting Animation Loop capped at 30 FPS
  useEffect(() => {
    if (prefersReducedMotion) {
      setWriteProgress(100);
      setPhase('hold');
      const holdTimer = setTimeout(() => {
        setPhase('fadeout');
        setTimeout(onComplete, 600);
      }, 800);
      return () => clearTimeout(holdTimer);
    }

    const startTime = performance.now() + 300; // 300ms ambient pause
    const writeDuration = 3800; // ~3.8 seconds writing for deliberate handwriting pace
    const targetFps = 30; // 30 FPS animation rate
    const fpsInterval = 1000 / targetFps;
    let lastFrameTime = performance.now();
    let animationFrameId: number;

    const animateWriting = (now: number) => {
      animationFrameId = requestAnimationFrame(animateWriting);

      const elapsedSinceLastFrame = now - lastFrameTime;
      if (elapsedSinceLastFrame < fpsInterval) {
        return;
      }
      lastFrameTime = now - (elapsedSinceLastFrame % fpsInterval);

      const elapsed = now - startTime;
      if (elapsed <= 0) {
        return;
      }

      // Smooth custom easing for natural calligraphic handwriting speed
      const rawT = Math.min(1.0, elapsed / writeDuration);
      const easedT =
        rawT < 0.5
          ? 4 * rawT * rawT * rawT
          : 1 - Math.pow(-2 * rawT + 2, 3) / 2;

      setWriteProgress(easedT * 100);

      if (rawT >= 1.0) {
        cancelAnimationFrame(animationFrameId);
        setWriteProgress(100);
        setPhase('hold');

        // Hold for 1.5s so user comfortably sees the completed text
        setTimeout(() => {
          setPhase('fadeout');

          // Smooth dissolve into the homepage
          setTimeout(() => {
            setPhase('done');
            onComplete();
          }, 1000);
        }, 1500);
      }
    };

    animationFrameId = requestAnimationFrame(animateWriting);
    return () => cancelAnimationFrame(animationFrameId);
  }, [onComplete, prefersReducedMotion]);

  // Floating ambient stardust background particles running at steady 30 FPS
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const count = 28;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25 - 0.12,
      alpha: Math.random() * 0.35 + 0.15,
      fadeSpeed: (Math.random() * 0.006 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
    }));

    const targetFps = 30;
    const fpsInterval = 1000 / targetFps;
    let lastRenderTime = performance.now();
    let animId: number;

    const render = (now: number) => {
      animId = requestAnimationFrame(render);

      const elapsed = now - lastRenderTime;
      if (elapsed < fpsInterval) {
        return;
      }
      lastRenderTime = now - (elapsed % fpsInterval);

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.fadeSpeed;

        if (p.alpha <= 0.1 || p.alpha >= 0.5) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(186, 230, 253, ${p.alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.4)';
        ctx.fill();
      });
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro-screen-overlay"
        initial={{ opacity: 1 }}
        animate={{
          opacity: phase === 'fadeout' ? 0 : 1,
          scale: phase === 'fadeout' ? 0.98 : 1,
          filter: phase === 'fadeout' ? 'blur(10px)' : 'blur(0px)',
        }}
        transition={{
          duration: 1.0,
          ease: [0.25, 1, 0.5, 1],
        }}
        className="fixed inset-0 z-[99999] w-screen h-screen min-h-[100dvh] bg-[#030712] flex items-center justify-center overflow-hidden select-none"
        style={{ pointerEvents: phase === 'fadeout' ? 'none' : 'auto' }}
      >
        {/* Atmospheric Ambient Light Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-sky-500/12 via-cyan-400/10 to-indigo-600/12 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-sky-500/6 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-indigo-500/6 rounded-full blur-[110px] pointer-events-none" />

        {/* 30 FPS Ambient Canvas Stardust */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* Center Container */}
        <div className="relative z-20 flex flex-col items-center justify-center px-6 max-w-5xl mx-auto space-y-4 sm:space-y-6">
          {/* Line 1: Initializing ..... */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center space-x-2"
          >
            <span className="font-mono text-xs sm:text-sm md:text-base tracking-[0.25em] sm:tracking-[0.3em] uppercase text-cyan-300/80 drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">
              Initializing .....
            </span>
          </motion.div>

          {/* Line 2: Premsai's Portfolio */}
          <div className="relative inline-block text-center">
            {/* Ambient Radial Bloom Underlay */}
            <div
              className="absolute -inset-x-14 -inset-y-8 bg-gradient-to-r from-sky-500/15 via-cyan-400/20 to-indigo-500/15 rounded-full blur-3xl transition-opacity duration-1000 pointer-events-none"
              style={{
                opacity: writeProgress > 15 ? 0.8 : 0,
              }}
            />

            {/* Handwriting Reveal with Expanded Spacing */}
            <div className="relative py-2 px-6 flex items-center justify-center">
              <h1
                className="font-vibes text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-center leading-[1.25] tracking-[0.08em] sm:tracking-[0.1em] cursor-default select-none whitespace-normal sm:whitespace-nowrap"
                style={{
                  clipPath: `inset(0 ${100 - writeProgress}% 0 0)`,
                  WebkitClipPath: `inset(0 ${100 - writeProgress}% 0 0)`,
                  transition: 'clip-path 0.04s linear, -webkit-clip-path 0.04s linear',
                }}
              >
                <span
                  className="bg-gradient-to-r from-white via-sky-100 to-cyan-200 bg-clip-text text-transparent"
                  style={{
                    filter: 'drop-shadow(0 0 32px rgba(56, 189, 248, 0.45)) drop-shadow(0 2px 10px rgba(255, 255, 255, 0.2))',
                  }}
                >
                  Premsai's Portfolio
                </span>
              </h1>

              {/* Luminous Ink Pen-Nib Light Point */}
              {phase === 'writing' && writeProgress > 0 && writeProgress < 99.5 && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-30 transition-all duration-75"
                  style={{
                    left: `${writeProgress}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="relative flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-cyan-400/30 blur-md animate-ping" />
                    <div className="absolute w-3 h-3 rounded-full bg-cyan-200 shadow-[0_0_16px_#38bdf8,0_0_26px_#0ea5e9]" />
                    <div className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
