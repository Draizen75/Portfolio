import { useTypingEffect } from '../../hooks/useTypingEffect';
import PortraitImage from '../common/PortraitImage';

interface HeroProps {
  onSectionClick: (sectionId: string) => void;
}

export default function Hero ({ onSectionClick }: HeroProps) {
  const roles = ['Web Developer', 'Data Analyst', 'Software Engineer'];
  const typedText = useTypingEffect(roles, 80, 40, 1500);

  const handleViewWorkClick = (): void => {
    onSectionClick('projects');
  };

  const handleContactClick = (): void => {
    onSectionClick('contact');
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-transparent pt-24 pb-16 sm:pt-28 sm:pb-20"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-10 sm:gap-12 lg:gap-16 xl:gap-20">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 min-w-0 order-1">
            <h1 className="type-display mb-5 sm:mb-6 break-words max-w-full">
              Lloyd Draizen Martirez
            </h1>
            <h2 className="type-hero-role mb-6 sm:mb-8 min-h-[1.5em]">
              I'm a <span className="font-medium text-blue-600 dark:text-blue-400">{typedText}</span>
            </h2>
            <p className="type-hero-lead mb-10 sm:mb-12 lg:max-w-lg lg:mx-0">
              I create beautiful, functional, and user-centric web experiences.
              Let's build something amazing together.
            </p>
            <div className="flex flex-col xs:flex-row gap-4 w-full xs:w-auto lg:justify-start">
              <button
                onClick={handleContactClick}
                className="w-full xs:w-auto px-10 py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full type-button hover:bg-blue-600 dark:hover:bg-blue-500 transition-all duration-300 active:scale-95 shadow-[0_10px_20px_-5px_rgba(15,23,42,0.3)] dark:shadow-none"
              >
                Get in Touch
              </button>
              <button
                onClick={handleViewWorkClick}
                className="w-full xs:w-auto px-10 py-4 bg-white/95 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-full type-button hover:border-slate-900 dark:hover:border-blue-400 transition-[transform,border-color,background-color] duration-300 active:scale-95 shadow-sm"
              >
                View My Work
              </button>
            </div>
          </div>

          <PortraitImage
            size="hero"
            className="hidden lg:block order-2 lg:mx-0"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
};
