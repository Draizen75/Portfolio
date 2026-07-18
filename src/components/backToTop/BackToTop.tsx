interface BackToTopProps {
  isVisible: boolean;
}

/**
 * Back to Top Component
 *
 * Displays a floating button when visible. Clicking smoothly scrolls to the top.
 *
 * @param isVisible - Whether the button should be shown
 */
export default function BackToTop({ isVisible }: BackToTopProps) {
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed left-auto right-4 bottom-4 sm:right-8 sm:bottom-8 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-lg flex items-center justify-center group border border-slate-200 dark:border-slate-800/80 transition-[opacity,transform,background-color,border-color] duration-300 ease-out ${
        isVisible ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-0 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-slate-800 dark:text-slate-200 transition-transform group-hover:-translate-y-1"
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
