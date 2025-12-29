import { useState, useEffect } from 'react';
import { getActiveSection } from '../utils/scrollUtils';

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
    /**
     * Handles scroll events to update active section and scroll state
     */
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
      const active: string = getActiveSection(sections);
      if (active) {
        setActiveSection(active);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Set initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  return { activeSection, isScrolled };
};

