/**
 * Back to Top Component
 * 
 * Displays a floating button that appears when user scrolls down.
 * Clicking it smoothly scrolls back to the top of the page.
 */

import { useState, useEffect } from 'react';

const BackToTop = (): React.JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user scrolls down more than 300px
      // or when near the bottom of the page
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isNearBottom = scrollPosition + windowHeight >= documentHeight - 200;

      if (scrollPosition > 300 || isNearBottom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[999] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent-primary dark:bg-accent-primary text-white shadow-lg dark:shadow-gray-900/50 hover:bg-accent-hover transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
          aria-label="Back to top"
        >
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:-translate-y-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default BackToTop;

