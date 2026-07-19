import { useEffect, useState } from 'react';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import PortraitImage from '../common/PortraitImage';
import MagneticButton from '../ui/MagneticButton';

interface HeroProps {
  onSectionClick: (sectionId: string) => void;
}

const ROLES = ['Full-Stack Web Developer', 'React Developer', 'Business App Developer'];

export default function Hero({ onSectionClick }: HeroProps) {
  const typedText = useTypingEffect(ROLES, 80, 40, 1500, false);
  const [showDesktopPortrait, setShowDesktopPortrait] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia('(min-width: 1024px)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const updateDesktopPortrait = () => setShowDesktopPortrait(mediaQuery.matches);

    mediaQuery.addEventListener('change', updateDesktopPortrait);

    return () => mediaQuery.removeEventListener('change', updateDesktopPortrait);
  }, []);

  const handleViewWorkClick = (): void => {
    onSectionClick('projects');
  };

  const handleContactClick = (): void => {
    onSectionClick('contact');
  };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] sm:min-h-screen flex items-center overflow-hidden pt-20 pb-10 sm:pt-28 sm:pb-20"
      aria-labelledby="hero-heading"
    >
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 min-w-0 order-1">
            <h1
              id="hero-heading" 
              className="type-display mb-4 sm:mb-6 break-words max-w-full animate-hero-enter"
            >
              Lloyd Draizen Martirez
            </h1>
            
            <h2
              className="type-hero-role mb-5 sm:mb-8 min-h-[1.75em] sm:min-h-[1.5em] animate-hero-enter animation-delay-75"
            >
              I'm a <span className="font-medium text-blue-600 dark:text-blue-400 sm:inline-block sm:min-w-[13.75rem] sm:text-left">{typedText}</span>
            </h2>
            
            <p
              className="type-hero-lead mb-8 sm:mb-12 max-w-[22rem] lg:max-w-lg lg:mx-0 animate-hero-enter animation-delay-150"
            >
              I build responsive business applications, SaaS platforms, and internal tools that simplify complex workflows and work reliably across devices.
            </p>
            
            <div
              className="grid grid-cols-2 gap-3 w-full max-w-[22rem] sm:flex sm:flex-row sm:flex-wrap sm:gap-4 sm:w-auto sm:max-w-none lg:justify-start animate-hero-enter animation-delay-225"
            >
              <MagneticButton>
                <button
                  onClick={handleContactClick}
                  className="w-full sm:w-auto px-4 sm:px-10 py-3.5 sm:py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full type-button hover:bg-blue-600 dark:hover:bg-blue-500 transition-all duration-300 active:scale-95 shadow-[0_10px_20px_-5px_rgba(15,23,42,0.3)] dark:shadow-none pointer-events-auto"
                >
                  Get in Touch
                </button>
              </MagneticButton>
              <MagneticButton>
                <button
                  onClick={handleViewWorkClick}
                  className="w-full sm:w-auto px-4 sm:px-10 py-3.5 sm:py-4 bg-white/95 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-full type-button hover:border-slate-900 dark:hover:border-blue-400 transition-[transform,border-color,background-color] duration-300 active:scale-95 shadow-sm pointer-events-auto"
                >
                  View My Work
                </button>
              </MagneticButton>
            </div>
          </div>

          {showDesktopPortrait && (
            <div
              className="hidden lg:block order-2 lg:mx-0 animate-hero-scale animation-delay-225"
            >
              <PortraitImage
                size="hero"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
