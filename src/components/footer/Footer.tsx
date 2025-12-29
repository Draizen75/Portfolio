/**
 * Footer Component
 * 
 * Displays footer information with copyright notice.
 */
const Footer = (): React.JSX.Element => {
  /**
   * Gets the current year dynamically
   */
  const getCurrentYear = (): number => {
    return new Date().getFullYear();
  };

  return (
    <footer className="bg-background-secondary py-6 sm:py-8 text-center border-t border-border-default">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-text-muted text-xs sm:text-sm md:text-base">
            Designed & Built by <span className="text-accent-primary font-semibold">Lloyd Draizen L. Martirez</span>
          </p>
          <p className="text-accent-primary text-xs sm:text-sm md:text-base font-mono">
            © {getCurrentYear()} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
