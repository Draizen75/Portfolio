import { useTypingEffect } from '../../hooks/useTypingEffect';
import PortraitImage from '../common/PortraitImage';
import { motion } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';

interface HeroProps {
  onSectionClick: (sectionId: string) => void;
}

const ROLES = ['Web Developer', 'Data Analyst', 'Software Engineer'];

export default function Hero({ onSectionClick }: HeroProps) {
  const typedText = useTypingEffect(ROLES, 80, 40, 1500);

  const handleViewWorkClick = (): void => {
    onSectionClick('projects');
  };

  const handleContactClick = (): void => {
    onSectionClick('contact');
  };

  const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20"
      aria-labelledby="hero-heading"
    >
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-10 sm:gap-12 lg:gap-16 xl:gap-20">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 min-w-0 order-1">
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeCurve }}
              id="hero-heading" 
              className="type-display mb-5 sm:mb-6 break-words max-w-full"
            >
              Lloyd Draizen Martirez
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: easeCurve }}
              className="type-hero-role mb-6 sm:mb-8 min-h-[2.5em] sm:min-h-[1.5em]"
            >
              I'm a <span className="font-medium text-blue-600 dark:text-blue-400">{typedText}</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: easeCurve }}
              className="type-hero-lead mb-10 sm:mb-12 lg:max-w-lg lg:mx-0"
            >
              I create beautiful, functional, and user-centric web experiences.
              Let's build something amazing together.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: easeCurve }}
              className="flex flex-col xs:flex-row gap-4 w-full xs:w-auto lg:justify-start"
            >
              <MagneticButton>
                <button
                  onClick={handleContactClick}
                  className="w-full xs:w-auto px-10 py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full type-button hover:bg-blue-600 dark:hover:bg-blue-500 transition-all duration-300 active:scale-95 shadow-[0_10px_20px_-5px_rgba(15,23,42,0.3)] dark:shadow-none pointer-events-auto"
                >
                  Get in Touch
                </button>
              </MagneticButton>
              <MagneticButton>
                <button
                  onClick={handleViewWorkClick}
                  className="w-full xs:w-auto px-10 py-4 bg-white/95 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-full type-button hover:border-slate-900 dark:hover:border-blue-400 transition-[transform,border-color,background-color] duration-300 active:scale-95 shadow-sm pointer-events-auto"
                >
                  View My Work
                </button>
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: easeCurve }}
            className="hidden lg:block order-2 lg:mx-0"
          >
            <PortraitImage
              size="hero"
              loading="eager"
              fetchPriority="high"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
