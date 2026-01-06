/**
 * Footer Component
 * 
 * Displays footer information with copyright notice.
 */
export default function Footer() {
  /**
   * Gets the current year dynamically
   */
  const getCurrentYear = (): number => {
    return new Date().getFullYear();
  };

  return (
    <footer className="bg-accent-primary dark:bg-accent-primary py-6 sm:py-8 text-center border-t-2 border-accent-secondary dark:border-accent-secondary shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-1px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3),0_-2px_4px_-1px_rgba(0,0,0,0.2)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
          <p className="text-white/95 text-sm sm:text-base md:text-lg font-medium">
            Designed & Built by <span className="text-white font-bold">Lloyd Draizen L. Martirez</span>
          </p>
          <p className="text-white/90 text-xs sm:text-sm md:text-base font-mono tracking-wide">
            © {getCurrentYear()} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};