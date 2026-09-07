import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Terminal, RotateCcw, FastForward, Check } from 'lucide-react';

interface TextSegment {
  text: string;
  highlight?: boolean;
  className?: string;
}

interface ParagraphData {
  segments: TextSegment[];
  className?: string;
}

const PARAGRAPHS: ParagraphData[] = [
  {
    className: 'text-slate-300 leading-relaxed font-normal text-base sm:text-lg',
    segments: [
      { text: 'I am a computer science student specializing in ' },
      {
        text: 'AI & Machine Learning (CSM)',
        highlight: true,
        className: 'text-sky-300 font-semibold bg-sky-500/10 px-1 py-0.5 rounded border border-sky-500/20',
      },
      { text: ' at ' },
      {
        text: 'MLRIT',
        highlight: true,
        className: 'text-indigo-300 font-semibold bg-indigo-500/10 px-1 py-0.5 rounded border border-indigo-500/20',
      },
      {
        text: ', building ',
      },
      {
        text: 'full-stack web apps',
        highlight: true,
        className: 'text-cyan-300 font-medium',
      },
      { text: ', ' },
      {
        text: 'AI systems',
        highlight: true,
        className: 'text-sky-300 font-medium',
      },
      { text: ', and ' },
      {
        text: 'IoT robotics',
        highlight: true,
        className: 'text-emerald-300 font-medium',
      },
      { text: '.' },
    ],
  },
  {
    className: 'text-slate-400 leading-relaxed font-normal text-sm sm:text-base',
    segments: [
      { text: 'Key projects: ' },
      {
        text: 'Obstacle-Avoiding Wi-Fi Robot',
        highlight: true,
        className: 'text-cyan-300 font-semibold',
      },
      { text: ', ' },
      {
        text: 'ORBIT',
        highlight: true,
        className: 'text-indigo-300 font-semibold underline decoration-indigo-400/50 underline-offset-2',
      },
      { text: ' (AI interview platform), and ' },
      {
        text: 'VibeTune',
        highlight: true,
        className: 'text-emerald-300 font-semibold underline decoration-emerald-400/50 underline-offset-2',
      },
      { text: ' (AI mood music app).' },
    ],
  },
];

export const TypingAboutText: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Progress index for each paragraph (count of characters typed)
  const [charCounts, setCharCounts] = useState<number[]>([0, 0]);

  // Compute total characters per paragraph
  const paragraphLengths = useMemo(() => {
    return PARAGRAPHS.map((p) =>
      p.segments.reduce((acc, seg) => acc + seg.text.length, 0)
    );
  }, []);

  // IntersectionObserver to auto-trigger when in view
  useEffect(() => {
    // Check if user prefers reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCharCounts(paragraphLengths);
      setIsCompleted(true);
      setHasTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          setIsTyping(true);
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasTriggered, paragraphLengths]);

  // Typewriter ticker effect
  useEffect(() => {
    if (!isTyping || isCompleted) return;

    const interval = setInterval(() => {
      setCharCounts((prev) => {
        const [p1Count, p2Count] = prev;
        const [p1Max, p2Max] = paragraphLengths;

        // Still typing paragraph 1
        if (p1Count < p1Max) {
          // Type 1-2 characters per tick for fluid natural cadence
          const next = Math.min(p1Max, p1Count + 1);
          return [next, 0];
        }

        // Paragraph 1 done, typing paragraph 2
        if (p2Count < p2Max) {
          const next = Math.min(p2Max, p2Count + 1);
          if (next >= p2Max) {
            setIsTyping(false);
            setIsCompleted(true);
          }
          return [p1Max, next];
        }

        setIsTyping(false);
        setIsCompleted(true);
        return [p1Max, p2Max];
      });
    }, 14); // 14ms per character = crisp, fast, energetic

    return () => clearInterval(interval);
  }, [isTyping, isCompleted, paragraphLengths]);

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCharCounts(paragraphLengths);
    setIsTyping(false);
    setIsCompleted(true);
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCharCounts([0, 0]);
    setIsCompleted(false);
    setIsTyping(true);
  };

  // Helper to render segments according to current typed char count
  const renderParagraphContent = (pIndex: number) => {
    const currentProgress = charCounts[pIndex];
    let cumulative = 0;
    const isCurrentActiveParagraph =
      isTyping &&
      ((pIndex === 0 && currentProgress < paragraphLengths[0]) ||
        (pIndex === 1 && charCounts[0] >= paragraphLengths[0] && currentProgress < paragraphLengths[1]));

    const elements: React.ReactNode[] = [];

    PARAGRAPHS[pIndex].segments.forEach((seg, sIdx) => {
      const segStart = cumulative;
      const segEnd = cumulative + seg.text.length;
      cumulative = segEnd;

      if (currentProgress <= segStart) {
        // Not reached yet
        return;
      }

      if (currentProgress >= segEnd) {
        // Fully typed
        elements.push(
          <span
            key={`seg-${pIndex}-${sIdx}`}
            className={seg.highlight ? seg.className : undefined}
          >
            {seg.text}
          </span>
        );
      } else {
        // Partially typed
        const visibleSlice = seg.text.slice(0, currentProgress - segStart);
        elements.push(
          <span
            key={`seg-${pIndex}-${sIdx}`}
            className={seg.highlight ? seg.className : undefined}
          >
            {visibleSlice}
          </span>
        );
      }
    });

    return (
      <>
        {elements}
        {/* Blinking Typewriter Caret */}
        {isCurrentActiveParagraph && (
          <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 ml-1 bg-sky-400 align-middle shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse rounded-xs" />
        )}
      </>
    );
  };

  return (
    <div
      ref={containerRef}
      className="space-y-4 select-text group/typewriter cursor-pointer"
      onClick={!isCompleted ? handleSkip : undefined}
      title={!isCompleted ? "Click to complete typing" : ""}
    >
      {/* Micro Status Bar */}
      <div className="flex items-center justify-between py-1 px-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-slate-400">biography.md</span>
          <span className="text-slate-600">•</span>
          {isTyping ? (
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>typing...</span>
            </span>
          ) : isCompleted ? (
            <span className="inline-flex items-center gap-1 text-slate-400">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>ready</span>
            </span>
          ) : (
            <span className="text-slate-500">idle</span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {isTyping && (
            <button
              onClick={handleSkip}
              className="px-2 py-0.5 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sky-400 hover:text-white transition-colors flex items-center gap-1 text-[10px]"
            >
              <FastForward className="w-3 h-3" />
              <span>Skip</span>
            </button>
          )}

          {isCompleted && (
            <button
              onClick={handleReplay}
              className="px-2 py-0.5 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-sky-300 transition-colors flex items-center gap-1 text-[10px]"
              title="Replay typing animation"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Replay</span>
            </button>
          )}
        </div>
      </div>

      {/* Paragraph 1 */}
      <p className={PARAGRAPHS[0].className}>
        {renderParagraphContent(0)}
      </p>

      {/* Paragraph 2 */}
      <p className={PARAGRAPHS[1].className}>
        {renderParagraphContent(1)}
      </p>
    </div>
  );
};
