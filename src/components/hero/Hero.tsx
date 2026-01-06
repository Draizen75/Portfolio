import { useState, useEffect, useRef } from 'react';
import { useTypingEffect } from '../../hooks/useTypingEffect';

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

export default function Hero ({ onSectionClick }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const hasScrolledPastRef = useRef(false);
  
  // Typing effect for the subtitle
  const roles = ['Web Developer', 'Data Analyst', 'Software Engineer'];
  const typedText = useTypingEffect(roles, 100, 50, 2000);

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
        <div className="animate-fade-in-up space-y-5 sm:space-y-6 md:space-y-8 w-full max-w-[800px]">
          <p className="text-text-secondary dark:text-gray-300 text-lg md:text-base font-medium tracking-wide mb-3 sm:mb-4 md:mb-6 opacity-90">
            Hi, I'm
          </p>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] sm:leading-tight break-words tracking-tight">
            <span className="block text-text-primary dark:text-gray-50 mb-2 sm:mb-3">Lloyd Draizen</span>
            <span className="block gradient-text">Martirez</span>
          </h1>
          
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-text-secondary dark:text-gray-200 leading-tight break-words mt-3 sm:mt-4 tracking-tight min-h-[1.5em] flex items-center justify-center">
            <span>{typedText}</span>
            <span className="inline-block w-[2px] h-[1em] bg-accent-primary ml-1.5 animate-[blink_0.3s_infinite]"></span>
          </h2>
          
          <p className="text-md sm:text-sm md:text-base lg:text-lg leading-relaxed text-text-muted dark:text-gray-300 max-w-[650px] mx-auto break-words px-2 sm:px-4 md:px-0 mt-6 sm:mt-8 md:mt-10 font-light">
            I'm a passionate web developer with expertise in creating modern and responsive websites. 
            I love turning complex problems into simple, beautiful, and intuitive solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 w-full sm:w-auto justify-center">
            <button 
              className="group w-full sm:w-auto px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 bg-accent-primary text-white text-xs sm:text-sm md:text-base font-semibold rounded-xl transition-all duration-300 active:bg-accent-hover hover:bg-accent-hover hover-lift shadow-accent-lg touch-manipulation min-h-[48px] sm:min-h-[52px] flex items-center justify-center relative overflow-hidden"
              onClick={handleContactClick}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              <span className="relative flex items-center justify-center gap-2">
                Get in Touch
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            
            <button 
              className="group w-full sm:w-auto px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 border-2 border-border-default dark:border-gray-600 bg-transparent text-text-primary dark:text-gray-50 text-xs sm:text-sm md:text-base font-semibold rounded-xl transition-all duration-300 active:border-accent-primary active:text-accent-primary hover:border-accent-primary hover:text-accent-primary hover:bg-accent-primary/5 hover-lift touch-manipulation min-h-[48px] sm:min-h-[52px] flex items-center justify-center backdrop-blur-sm"
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