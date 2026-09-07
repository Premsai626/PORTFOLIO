import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroScreenProps {
  onComplete: () => void;
}

/**
 * IntroScreen Component
 * Minimal, cinematic handwriting intro screen for Prem Sai's portfolio:
 * - Ultra-clean dark canvas (#030712) with subtle floating stardust particles
 * - Elegant cursive handwriting animation of the word "Portfolio" in Great Vibes
 * - Luminous ink-nib tracking point with delicate glow
 * - Automatic smooth cinematic dissolve into the main portfolio homepage
 */
export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'writing' | 'hold' | 'fadeout' | 'done'>('writing');
  const [writeProgress, setWriteProgress] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Handwriting Animation Loop
  useEffect(() => {
    if (prefersReducedMotion) {
      setWriteProgress(100);
      setPhase('hold');
      const holdTimer = setTimeout(() => {
        setPhase('fadeout');
        setTimeout(onComplete, 500);
      }, 600);
      return () => clearTimeout(holdTimer);
    }

    const startTime = performance.now() + 250; // slight 250ms quiet pause
    const writeDuration = 2200; // 2.2 seconds writing
    let animationFrameId: number;

    const animateWriting = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed <= 0) {
        animationFrameId = requestAnimationFrame(animateWriting);
        return;
      }

      // Smooth custom easing for natural calligraphic handwriting speed
      const rawT = Math.min(1.0, elapsed / writeDuration);
      // Cubic bezier-like easeInOut with gentle acceleration and flow
      const easedT =
        rawT < 0.5
          ? 4 * rawT * rawT * rawT
          : 1 - Math.pow(-2 * rawT + 2, 3) / 2;

      setWriteProgress(easedT * 100);

      if (rawT < 1.0) {
        animationFrameId = requestAnimationFrame(animateWriting);
      } else {
        setWriteProgress(100);
        setPhase('hold');

        // Hold for ~800ms before dissolving
        setTimeout(() => {
          setPhase('fadeout');

          // Trigger completion after fade transition completes
          setTimeout(() => {
            setPhase('done');
            onComplete();
          }, 850);
        }, 800);
      }
    };

    animationFrameId = requestAnimationFrame(animateWriting);
    return () => cancelAnimationFrame(animationFrameId);
  }, [onComplete, prefersReducedMotion]);

  // Floating ambient stardust background particles
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

    const count = 28; // Subtle particle density
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.6,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2 - 0.1, // gently float upward
      alpha: Math.random() * 0.35 + 0.15,
      fadeSpeed: (Math.random() * 0.004 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
    }));

    let animId: number;
    const render = () => {
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

      animId = requestAnimationFrame(render);
    };

    render();

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
          filter: phase === 'fadeout' ? 'blur(8px)' : 'blur(0px)',
        }}
        transition={{
          duration: 0.85,
          ease: [0.25, 1, 0.5, 1],
        }}
        className="fixed inset-0 z-[99999] w-screen h-screen min-h-[100dvh] bg-[#030712] flex items-center justify-center overflow-hidden select-none"
        style={{ pointerEvents: phase === 'fadeout' ? 'none' : 'auto' }}
      >
        {/* Subtle Atmospheric Background Glow Blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[650px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-sky-500/10 via-cyan-400/8 to-indigo-600/10 rounded-full blur-[130px] pointer-events-none animate-pulse-slow" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Minimal Canvas Stardust Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* Center Container: "Portfolio" Calligraphy in Great Vibes */}
        <div className="relative z-20 flex flex-col items-center justify-center px-4">
          <div className="relative inline-block">
            {/* Ambient Radial Bloom Underlay */}
            <div
              className="absolute -inset-x-12 -inset-y-8 bg-gradient-to-r from-sky-500/15 via-cyan-400/20 to-indigo-500/15 rounded-full blur-3xl transition-opacity duration-1000 pointer-events-none"
              style={{
                opacity: writeProgress > 15 ? 0.75 : 0,
              }}
            />

            {/* Handwriting Text Wrapper with Progressive Reveal Mask */}
            <div className="relative py-3 px-4 flex items-center justify-center">
              <h1
                className="font-vibes text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-center leading-[1.25] tracking-normal cursor-default select-none"
                style={{
                  clipPath: `inset(0 ${100 - writeProgress}% 0 0)`,
                  WebkitClipPath: `inset(0 ${100 - writeProgress}% 0 0)`,
                  transition: 'clip-path 0.04s linear, -webkit-clip-path 0.04s linear',
                }}
              >
                {/* Word: Portfolio with Soft Platinum & Cyan Specular Sheen */}
                <span
                  className="bg-gradient-to-r from-white via-sky-100 to-cyan-200 bg-clip-text text-transparent"
                  style={{
                    filter: 'drop-shadow(0 0 28px rgba(56, 189, 248, 0.45)) drop-shadow(0 2px 8px rgba(255, 255, 255, 0.2))',
                  }}
                >
                  Portfolio
                </span>
              </h1>

              {/* Luminous Ink Pen-Nib Light Point (Active only during the writing phase) */}
              {phase === 'writing' && writeProgress > 0 && writeProgress < 99.5 && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-30 transition-all duration-75"
                  style={{
                    left: `${writeProgress}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {/* Glowing Ink Pen Head Spark */}
                  <div className="relative flex items-center justify-center">
                    {/* Outer radiant bloom */}
                    <div className="w-8 h-8 rounded-full bg-cyan-400/30 blur-md animate-ping" />
                    {/* Inner intense light spark */}
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-cyan-200 shadow-[0_0_14px_#38bdf8,0_0_24px_#0ea5e9]" />
                    <div className="absolute w-1 h-1 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
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
