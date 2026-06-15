import { useState, useEffect, useRef } from 'react';
import { isProgrammaticScroll } from '../utils/scrollUtils';

/**
 * Custom hook for scroll position, active section, and back-to-top visibility.
 * Uses rAF-throttled scroll updates and IntersectionObserver for section detection.
 *
 * @param sections - Array of section IDs to monitor
 * @returns Scroll-related state and setters
 */
export const useScrollDetection = (sections: string[]) => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const isScrolledRef = useRef<boolean>(false);
  const showBackToTopRef = useRef<boolean>(false);
  const activeSectionRef = useRef<string>('home');

  useEffect(() => {
    let frameId = 0;

    /**
     * Updates header and back-to-top state once per animation frame.
     */
    const updateScrollUi = (): void => {
      frameId = 0;
      const currentScrollY = window.scrollY;
      const shouldBeScrolled = currentScrollY > 50;

      if (isScrolledRef.current !== shouldBeScrolled) {
        isScrolledRef.current = shouldBeScrolled;
        setIsScrolled(shouldBeScrolled);
      }

      // Only show after meaningful scroll; avoid false positives when lazy
      // sections have not yet expanded document height on first paint.
      const shouldShowBackToTop = currentScrollY > 300;

      if (showBackToTopRef.current !== shouldShowBackToTop) {
        showBackToTopRef.current = shouldShowBackToTop;
        setShowBackToTop(shouldShowBackToTop);
      }
    };

    /**
     * Schedules a single scroll UI update on the next animation frame.
     */
    const scheduleScrollUiUpdate = (): void => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updateScrollUi);
      }
    };

    const handleScroll = (): void => {
      scheduleScrollUiUpdate();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    scheduleScrollUiUpdate();

    // Re-check when lazy-loaded sections change page height.
    const resizeObserver = new ResizeObserver(() => {
      scheduleScrollUiUpdate();
    });
    resizeObserver.observe(document.documentElement);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  useEffect(() => {
    const sectionElements = sections
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (sectionElements.length === 0) {
      return;
    }

    /**
     * Picks the section with the largest visible area in the viewport.
     *
     * @param entries - Intersection observer entries
     */
    const handleIntersection = (entries: IntersectionObserverEntry[]): void => {
      if (isProgrammaticScroll()) {
        return;
      }

      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length === 0) {
        return;
      }

      const mostVisible = visibleEntries.reduce((best, entry) => {
        return entry.intersectionRatio > best.intersectionRatio ? entry : best;
      });

      const nextSection = mostVisible.target.id;
      if (nextSection && activeSectionRef.current !== nextSection) {
        activeSectionRef.current = nextSection;
        setActiveSection(nextSection);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-20% 0px -55% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    });

    sectionElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sections]);

  /**
   * Sets active section immediately (e.g. nav click) and syncs observer ref.
   *
   * @param sectionId - Section id to mark active
   */
  const setActiveSectionImmediate = (sectionId: string): void => {
    activeSectionRef.current = sectionId;
    setActiveSection(sectionId);
  };

  return {
    activeSection,
    isScrolled,
    showBackToTop,
    setActiveSection: setActiveSectionImmediate,
  };
};
