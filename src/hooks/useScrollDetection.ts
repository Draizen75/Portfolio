import { useState, useEffect } from 'react';
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

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    /**
     * Handles scroll events to update active section and scroll state
     */
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
      
      // Don't update active section during programmatic scrolling
      if (isProgrammaticScroll()) {
        return;
      }
      
      // Debounce the active section update
      clearTimeout(scrollTimeout);
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
      clearTimeout(scrollTimeout);
    };
  }, [sections]);

  return { activeSection, isScrolled, setActiveSection };
};

