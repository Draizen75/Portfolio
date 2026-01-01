import { useState, useEffect, useRef } from 'react';

/**
 * Hero Component
 * 
 * Displays the main hero section with introduction, name, title, and call-to-action buttons.
 * 
 * @param onSectionClick - Callback function to handle navigation to other sections
 */

interface HeroProps {
  onSectionClick: (sectionId: string) => void;
}

const Hero = ({ onSectionClick }: HeroProps): React.JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const hasScrolledPastRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Once user scrolls past hero section, hide indicator permanently
          if (!entry.isIntersecting && !hasScrolledPastRef.current) {
            hasScrolledPastRef.current = true;
            setShowScrollIndicator(false);
          }
        });
      },
      { threshold: 0.3 } // Hide when less than 30% of hero is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  /**
   * Handles "View My Work" button click
   */
  const handleViewWorkClick = (): void => {
    onSectionClick('projects');
  };

  /**
   * Handles "Get In Touch" button click
   */
  const handleContactClick = (): void => {
    onSectionClick('contact');
  };

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-0 relative overflow-hidden bg-background-primary dark:bg-gray-900"
    >
      {/* Very subtle background pattern - minimal and professional */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-accent-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-accent-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[1200px] w-full flex flex-col items-center justify-center text-center relative z-10 my-auto">
        <div className="animate-fade-in-up space-y-4 sm:space-y-5 md:space-y-6 w-full max-w-[800px]">
          <p className="text-text-secondary dark:text-gray-300 text-base sm:text-base md:text-lg font-mono tracking-wider mb-2 sm:mb-3 md:mb-4">
            Hi, I'm
          </p>
          
          <h1 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] sm:leading-tight break-words">
            <span className="block text-text-primary dark:text-gray-100 mb-1 sm:mb-2">Lloyd Draizen</span>
            <span className="block gradient-text">Martirez</span>
          </h1>
          
          <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-text-secondary dark:text-gray-300 leading-tight break-words mt-2 sm:mt-3">
            Web Developer & Data Analyst
          </h2>
          
          <p className="text-base sm:text-base md:text-lg lg:text-xl leading-relaxed text-text-muted dark:text-gray-400 max-w-[600px] mx-auto break-words px-2 sm:px-4 md:px-0 mt-4 sm:mt-5 md:mt-6">
            I'm a passionate web developer with expertise in creating modern and responsive websites. 
            I love turning complex problems into simple, beautiful, and intuitive solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto justify-center pt-16 sm:pt-6 md:pt-8">
            <button 
              className="w-full sm:w-auto px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 bg-accent-primary text-white text-base sm:text-base md:text-lg font-semibold rounded-lg transition-all duration-300 active:bg-accent-hover hover:bg-accent-hover hover-lift shadow-lg shadow-accent-primary/20 touch-manipulation min-h-[48px] sm:min-h-[52px] flex items-center justify-center"
              onClick={handleContactClick}
            >
              <span className="flex items-center justify-center gap-2">
                Get in Touch
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            
            <button 
              className="w-full sm:w-auto px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 border-2 border-border-default dark:border-gray-600 bg-transparent text-text-primary dark:text-gray-100 text-base sm:text-base md:text-lg font-semibold rounded-lg transition-all duration-300 active:border-accent-primary active:text-accent-primary hover:border-accent-primary hover:text-accent-primary hover-lift touch-manipulation min-h-[48px] sm:min-h-[52px] flex items-center justify-center"
              onClick={handleViewWorkClick}
            >
              View My Work
            </button>
          </div>
        </div>
        
      </div>
      
      {/* Scroll indicator - Only show on initial mount, hide once user scrolls past */}
      {showScrollIndicator && (
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce-scroll z-10 hidden sm:block">
          <div className="w-[24px] h-[40px] sm:w-[30px] sm:h-[50px] border-2 border-accent-primary rounded-[12px] sm:rounded-[15px] relative bg-background-secondary/80 backdrop-blur-sm">
            <div className="w-0.5 sm:w-1 h-[8px] sm:h-[10px] bg-accent-primary rounded-sm absolute top-[8px] sm:top-[10px] left-1/2 -translate-x-1/2 animate-scroll-wheel"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
