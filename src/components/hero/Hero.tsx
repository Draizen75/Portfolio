import { useEffect, useState } from 'react';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import PortraitImage from '../common/PortraitImage';
import MagneticButton from '../ui/MagneticButton';
import { Button } from '../ui/button';

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
                <Button type="button" variant="default" onClick={handleContactClick} className="h-auto w-full sm:w-auto rounded-full px-4 py-3.5 type-button text-white shadow-[0_10px_20px_-5px_rgba(15,23,42,0.3)] transition-all duration-300 hover:bg-blue-600 active:scale-95 dark:bg-white dark:text-slate-900 dark:shadow-none dark:hover:bg-blue-500 dark:hover:text-white sm:px-10 sm:py-4">Get in Touch</Button>
              </MagneticButton>
              <MagneticButton>
                <Button type="button" variant="outline" onClick={handleViewWorkClick} className="h-auto w-full sm:w-auto rounded-full border-slate-200 bg-white/95 px-4 py-3.5 type-button text-slate-900 shadow-sm transition-[transform,border-color,background-color] duration-300 hover:border-slate-900 hover:bg-white active:scale-95 dark:border-slate-700 dark:bg-slate-950/80 dark:text-white dark:hover:border-blue-400 dark:hover:bg-slate-900 sm:px-10 sm:py-4">View My Work</Button>
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
