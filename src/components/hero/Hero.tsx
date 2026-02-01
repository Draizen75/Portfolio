import { useTypingEffect } from '../../hooks/useTypingEffect';

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
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent pt-20">
      <div className="relative z-10 flex flex-col items-center text-center px-6 sm:px-8 lg:px-12">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.1]">
          Lloyd Draizen Martirez
        </h1>
        <h2 className="text-lg sm:text-2xl md:text-3xl text-slate-600 dark:text-slate-400 mb-8 font-light min-h-[1.5em]">
          I'm a <span className="font-semibold text-blue-600 dark:text-blue-400">{typedText}</span>
        </h2>
        <p className="max-w-xl text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed font-normal">
          I create beautiful, functional, and user-centric web experiences. 
          Let's build something amazing together.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <button
            onClick={handleContactClick}
            className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white dark:bg-white dark:text-black rounded-full text-base font-bold hover:bg-blue-600 dark:hover:bg-blue-500 transition-all duration-300 active:scale-95 shadow-[0_10px_20px_-5px_rgba(15,23,42,0.3)] dark:shadow-none"
          >
            Get in Touch
          </button>
          <button
            onClick={handleViewWorkClick}
            className="w-full sm:w-auto px-10 py-4 bg-white dark:bg-transparent border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-full text-base font-bold hover:border-slate-900 dark:hover:border-white transition-all duration-300 active:scale-95 shadow-sm"
          >
            View My Work
          </button>
        </div>
      </div>
    </section>
  );
};