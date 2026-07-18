import { useEffect, useRef, useState } from 'react';

export function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.18,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible]);

  return { ref, isVisible };
}
