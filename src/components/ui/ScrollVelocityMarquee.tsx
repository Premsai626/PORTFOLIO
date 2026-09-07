import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Code2, Cpu, Zap, Layers, Terminal, Box } from 'lucide-react';

interface ScrollVelocityMarqueeProps {
  baseSpeed?: number;
  className?: string;
  row1Text?: string;
  row2Text?: string;
}

export const ScrollVelocityMarquee: React.FC<ScrollVelocityMarqueeProps> = ({
  baseSpeed = 1.2,
  className = '',
  row1Text,
  row2Text,
}) => {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollYRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const velocityTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const now = performance.now();
      const deltaT = Math.max(1, now - lastTimeRef.current);
      const deltaY = currentScrollY - lastScrollYRef.current;
      const currentVel = (deltaY / deltaT) * 15;

      setScrollVelocity(Math.max(-15, Math.min(15, currentVel)));

      lastScrollYRef.current = currentScrollY;
      lastTimeRef.current = now;

      if (velocityTimerRef.current) clearTimeout(velocityTimerRef.current);
      velocityTimerRef.current = window.setTimeout(() => {
        setScrollVelocity(0);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (velocityTimerRef.current) clearTimeout(velocityTimerRef.current);
    };
  }, []);

  const defaultItems1 = [
    { text: 'FRONT-END ARCHITECT', icon: <Code2 className="w-3.5 h-3.5 text-sky-400" /> },
    { text: '60FPS 3D RENDERS', icon: <Box className="w-3.5 h-3.5 text-indigo-400" /> },
    { text: 'REACT & TYPESCRIPT', icon: <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> },
    { text: 'AI / ML PROCTORING', icon: <Cpu className="w-3.5 h-3.5 text-purple-400" /> },
    { text: 'CREATIVE UI/UX', icon: <Zap className="w-3.5 h-3.5 text-amber-400" /> },
    { text: 'IOT & ROBOTICS', icon: <Layers className="w-3.5 h-3.5 text-emerald-400" /> },
    { text: 'SYSTEMS PERFORMANCE', icon: <Terminal className="w-3.5 h-3.5 text-cyan-400" /> },
  ];

  const defaultItems2 = [
    { text: 'CLEAN ARCHITECTURE', icon: <Zap className="w-3.5 h-3.5 text-indigo-400" /> },
    { text: 'DISTRIBUTED MICROSERVICES', icon: <Layers className="w-3.5 h-3.5 text-sky-400" /> },
    { text: 'PROMPT ENGINEERING', icon: <Cpu className="w-3.5 h-3.5 text-purple-400" /> },
    { text: 'ACCESSIBLE DESIGN', icon: <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> },
    { text: 'HIGH PERFORMANCE CODE', icon: <Terminal className="w-3.5 h-3.5 text-sky-400" /> },
    { text: 'MOTION & INTERACTION', icon: <Box className="w-3.5 h-3.5 text-rose-400" /> },
  ];

  const parsedItems1 = row1Text
    ? row1Text.split('•').map((s) => s.trim()).filter(Boolean).map((t) => ({ text: t, icon: <Sparkles className="w-3.5 h-3.5 text-sky-400" /> }))
    : defaultItems1;

  const parsedItems2 = row2Text
    ? row2Text.split('•').map((s) => s.trim()).filter(Boolean).map((t) => ({ text: t, icon: <Zap className="w-3.5 h-3.5 text-indigo-400" /> }))
    : defaultItems2;

  return (
    <div className={`py-10 relative overflow-hidden select-none ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-950/20 via-indigo-950/20 to-sky-950/20 -skew-y-1 transform scale-105" />

      {/* Ribbon 1: Left to Right */}
      <div className="relative flex overflow-x-hidden border-y border-slate-800/90 py-3 bg-slate-950/80 backdrop-blur-md shadow-xs -rotate-1 transform">
        <div
          className="flex whitespace-nowrap animate-marquee gap-8 items-center"
          style={{
            animationDuration: `${Math.max(8, (28 / baseSpeed) - Math.abs(scrollVelocity) * 1.2)}s`,
            animationDirection: scrollVelocity < 0 ? 'reverse' : 'normal',
          }}
        >
          {[...parsedItems1, ...parsedItems1, ...parsedItems1, ...parsedItems1].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800/80 shadow-xs"
            >
              {item.icon}
              <span className="text-xs font-mono font-bold tracking-wider text-slate-200">
                {item.text}
              </span>
              <span className="text-sky-400 font-bold ml-1">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ribbon 2: Right to Left (Reverse phase) */}
      <div className="relative flex overflow-x-hidden border-b border-slate-800/90 py-3 bg-slate-950/90 backdrop-blur-md shadow-xs rotate-1 transform mt-3">
        <div
          className="flex whitespace-nowrap animate-marquee-reverse gap-8 items-center"
          style={{
            animationDuration: `${Math.max(9, (32 / baseSpeed) - Math.abs(scrollVelocity) * 1.2)}s`,
            animationDirection: scrollVelocity > 0 ? 'normal' : 'reverse',
          }}
        >
          {[...parsedItems2, ...parsedItems2, ...parsedItems2, ...parsedItems2].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800/80 shadow-xs"
            >
              {item.icon}
              <span className="text-xs font-mono font-bold tracking-wider text-sky-400">
                {item.text}
              </span>
              <span className="text-indigo-400 font-bold ml-1">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
