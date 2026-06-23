/**
 * Back to Top Component
 *
 * Displays a floating button when visible. Clicking smoothly scrolls to the top.
 *
 * @param isVisible - Whether the button should be shown
 */
import { motion, useScroll, useSpring } from 'framer-motion';

interface BackToTopProps {
  isVisible: boolean;
}

export default function BackToTop({ isVisible }: BackToTopProps) {
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed left-auto right-4 bottom-4 sm:right-8 sm:bottom-8 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-slate-900 shadow-lg flex items-center justify-center group pointer-events-auto border-2 border-transparent"
      aria-label="Back to top"
    >
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          className="text-slate-200 dark:text-slate-800"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="46"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          className="text-blue-600 dark:text-blue-500"
          style={{ pathLength: scaleProgress }}
        />
      </svg>
      
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-slate-800 dark:text-slate-200 transition-transform group-hover:-translate-y-1 relative z-10"
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
    </motion.button>
  );
}
