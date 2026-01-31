import { useTypingEffect } from '../../hooks/useTypingEffect';
import GridPattern from '../common/GridPattern';

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
    <section id="home" className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black">
      <GridPattern />
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tighter">
          Lloyd Draizen Martirez
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8 font-light">
          I'm a <span className="font-medium text-gray-900 dark:text-gray-100">{typedText}</span>
        </h2>
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
          I create beautiful, functional, and user-centric web experiences. 
          Let's build something amazing together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleContactClick}
            className="px-6 py-3 sm:px-8 sm:py-4 bg-gray-900 text-white dark:bg-white dark:text-black rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors duration-200"
          >
            Get in Touch
          </button>
          <button
            onClick={handleViewWorkClick}
            className="px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
          >
            View My Work
          </button>
        </div>
      </div>
    </section>
  );
};