/**
 * Back to Top Component
 *
 * Displays a floating button when visible. Clicking smoothly scrolls to the top.
 *
 * @param isVisible - Whether the button should be shown
 */
interface BackToTopProps {
  isVisible: boolean;
}

export default function BackToTop({ isVisible }: BackToTopProps) {
  /**
   * Smoothly scrolls the viewport back to the top of the page.
   */
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed left-auto right-4 bottom-4 sm:right-8 sm:bottom-8 z-[1050] w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-accent-primary dark:bg-accent-primary text-white shadow-lg hover:bg-accent-hover transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
      aria-label="Back to top"
    >
      <svg
        className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:-translate-y-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
