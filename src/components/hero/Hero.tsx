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
    <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 md:pt-20 pb-16 sm:pb-20 md:pb-0 relative overflow-hidden bg-background-primary">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-1/4 right-1/4 w-48 h-48 xs:w-64 xs:h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-accent-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 xs:w-64 xs:h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-accent-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[1200px] w-full flex flex-col md:grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center text-center md:text-left relative z-10">
        <div className="animate-fade-in-up space-y-3 sm:space-y-4 md:space-y-6 w-full">
          <p className="text-text-secondary text-xs sm:text-sm md:text-base font-mono tracking-wider mb-1 sm:mb-2 md:mb-4">
            Hi, I'm
          </p>
          
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight break-words">
            <span className="block text-text-primary mb-1 sm:mb-2">Lloyd Draizen</span>
            <span className="block gradient-text">Martirez</span>
          </h1>
          
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-text-secondary leading-tight break-words">
            Software Engineer & Data Analyst
          </h2>
          
          <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-text-muted max-w-[600px] mx-auto md:mx-0 break-words px-2 sm:px-0">
            I'm a passionate web developer with expertise in creating modern and responsive websites. 
            I love turning complex problems into simple, beautiful, and intuitive solutions.
          </p>
          
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 md:gap-6 w-full xs:w-auto justify-center md:justify-start pt-2 sm:pt-4">
            <button 
              className="w-full xs:w-auto px-5 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 lg:py-5 bg-accent-primary text-white text-xs xs:text-sm sm:text-base md:text-lg font-semibold rounded-lg transition-all duration-300 active:bg-accent-hover hover:bg-accent-hover hover-lift shadow-lg shadow-accent-primary/20 touch-manipulation min-h-[44px] flex items-center justify-center"
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
              className="w-full xs:w-auto px-5 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 lg:py-5 border-2 border-border-default bg-transparent text-text-primary text-xs xs:text-sm sm:text-base md:text-lg font-semibold rounded-lg transition-all duration-300 active:border-accent-primary active:text-accent-primary hover:border-accent-primary hover:text-accent-primary hover-lift touch-manipulation min-h-[44px] flex items-center justify-center"
              onClick={handleViewWorkClick}
            >
              View My Work
            </button>
          </div>
        </div>
        
        <div className="flex justify-center items-center animate-fade-in relative w-full md:w-auto mt-6 sm:mt-8 md:mt-0">
          <div className="relative">
            {/* Professional avatar frame */}
            <div className="relative w-[200px] h-[200px] xs:w-[240px] xs:h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[360px] lg:h-[360px] rounded-lg bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 border-2 border-border-default flex items-center justify-center shadow-xl hover-lift overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10">
                <defs>
                  <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
                <rect x="20" y="20" width="160" height="160" rx="20" fill="url(#avatarGradient)" />
                <text 
                  x="100" 
                  y="120" 
                  fontSize="70" 
                  fill="white" 
                  textAnchor="middle" 
                  fontWeight="bold"
                  className="drop-shadow-lg"
                >
                  LDM
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-4 xs:bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce-scroll z-10 hidden sm:block">
        <div className="w-[24px] h-[40px] sm:w-[30px] sm:h-[50px] border-2 border-accent-primary rounded-[12px] sm:rounded-[15px] relative bg-background-secondary/80 backdrop-blur-sm">
          <div className="w-0.5 sm:w-1 h-[8px] sm:h-[10px] bg-accent-primary rounded-sm absolute top-[8px] sm:top-[10px] left-1/2 -translate-x-1/2 animate-scroll-wheel"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
