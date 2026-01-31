import { useState, useEffect, useRef } from 'react';
import { getActiveSection, isProgrammaticScroll } from '../utils/scrollUtils';

/**
 * Custom hook for detecting scroll position and active section
 * 
 * @param sections - Array of section IDs to monitor
 * @returns Object containing activeSection and isScrolled state
 */
export const useScrollDetection = (sections: string[]) => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const isScrolledRef = useRef<boolean>(false);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout> | undefined;
    
    /**
     * Handles scroll events to update active section and scroll state
     */
    const handleScroll = (): void => {
      const currentScrollY = window.scrollY;
      const shouldBeScrolled = currentScrollY > 50;
      
      // Only update state if the value has changed
      if (isScrolledRef.current !== shouldBeScrolled) {
        isScrolledRef.current = shouldBeScrolled;
        setIsScrolled(shouldBeScrolled);
      }
      
      // Don't update active section during programmatic scrolling
      if (isProgrammaticScroll()) {
        return;
      }
      
      // Debounce the active section update
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        const active: string = getActiveSection(sections);
        if (active) {
          setActiveSection(active);
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Set initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [sections]);

  return { activeSection, isScrolled, setActiveSection };
};
