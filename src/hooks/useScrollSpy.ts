import { useState, useEffect, useRef } from 'react';

export interface ScrollData {
  scrollY: number;
  scrollProgress: number; // 0 to 100
  scrollDirection: 'up' | 'down' | 'idle';
  scrollVelocity: number;
  activeSection: string;
}

export const useScrollSpy = (sectionIds: string[] = []): ScrollData => {
  const [scrollData, setScrollData] = useState<ScrollData>({
    scrollY: 0,
    scrollProgress: 0,
    scrollDirection: 'idle',
    scrollVelocity: 0,
    activeSection: sectionIds[0] || 'home',
  });

  const lastScrollYRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const now = performance.now();
      const timeDelta = Math.max(1, now - lastTimeRef.current);
      const distDelta = currentScrollY - lastScrollYRef.current;
      const velocity = Math.abs(distDelta / timeDelta);

      const direction =
        distDelta > 1 ? 'down' : distDelta < -1 ? 'up' : 'idle';

      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;

      // Detect active section
      let currentSection = sectionIds[0] || 'home';
      const offsetMargin = 220;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop - offsetMargin <= currentScrollY) {
          currentSection = sectionIds[i];
          break;
        }
      }

      setScrollData({
        scrollY: currentScrollY,
        scrollProgress: Math.min(100, Math.max(0, progress)),
        scrollDirection: direction,
        scrollVelocity: Math.min(velocity * 10, 10),
        activeSection: currentSection,
      });

      lastScrollYRef.current = currentScrollY;
      lastTimeRef.current = now;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds.join(',')]);

  return scrollData;
};
