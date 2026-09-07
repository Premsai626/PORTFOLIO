import React, { useState, useEffect } from 'react';

interface FadeTextRotatorProps {
  texts: string[];
  intervalMs?: number;
  fadeDurationMs?: number;
  className?: string;
  gradientClassName?: string;
}

export const FadeTextRotator: React.FC<FadeTextRotatorProps> = ({
  texts,
  intervalMs = 4200,
  fadeDurationMs = 600,
  className = '',
  gradientClassName = 'bg-gradient-to-r from-sky-300 via-blue-200 to-indigo-300 bg-clip-text text-transparent',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'visible' | 'fading-out' | 'fading-in'>('visible');

  useEffect(() => {
    if (!texts || texts.length <= 1) return;

    const timer = setInterval(() => {
      // Step 1: Start smooth fade out
      setFadeState('fading-out');

      // Step 2: Switch text index during zero opacity, then fade in
      const switchTimeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setFadeState('fading-in');

        // Step 3: Return to fully visible
        const visibleTimeout = setTimeout(() => {
          setFadeState('visible');
        }, fadeDurationMs / 2);

        return () => clearTimeout(visibleTimeout);
      }, fadeDurationMs / 2);

      return () => clearTimeout(switchTimeout);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [texts, intervalMs, fadeDurationMs]);

  const getTransitionStyle = () => {
    switch (fadeState) {
      case 'fading-out':
        return 'opacity-0 translate-y-2 scale-[0.98] blur-[2px]';
      case 'fading-in':
        return 'opacity-0 -translate-y-2 scale-[0.98] blur-[2px]';
      case 'visible':
      default:
        return 'opacity-100 translate-y-0 scale-100 blur-0';
    }
  };

  return (
    <span
      className={`inline-block transition-all ease-out ${getTransitionStyle()} ${className}`}
      style={{
        transitionDuration: `${fadeDurationMs}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', // Apple fluid spring curve
      }}
    >
      <span className={gradientClassName}>{texts[currentIndex]}</span>
    </span>
  );
};
