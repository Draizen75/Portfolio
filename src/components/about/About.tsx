/**
 * About Component
 * 
 * Displays personal information and technologies used.
 * Shows a brief introduction and list of technologies.
 */

import { useState, useEffect, useRef } from 'react';

const About = (): React.JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
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

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="bg-background-secondary py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary break-words">
            About Me
          </h2>
          <div className="flex-1 h-px bg-border-default"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Introduction Section */}
          <div 
            className={`space-y-8 sm:space-y-10 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Main Introduction Card */}
            <div className="professional-card p-6 sm:p-8 md:p-10 rounded-2xl hover-lift">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary mb-3">
                    Hello, I'm Lloyd Draizen
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl leading-relaxed text-text-secondary">
                    I'm a passionate web developer with expertise in creating modern and responsive websites. 
                    I love turning complex problems into simple, beautiful, and intuitive solutions.
                  </p>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Experience Card */}
              <div 
                className={`professional-card p-6 sm:p-7 md:p-8 rounded-xl hover-lift transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-text-primary">Professional Experience</h4>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
                  Currently working as a <span className="text-accent-primary font-semibold">Web Developer</span> at{' '}
                  <span className="text-accent-primary font-semibold">Syd Solution Tech</span>, I'm dedicated to building innovative technology solutions that empower businesses in the digital age.
                </p>
              </div>

              {/* Education Card */}
              <div 
                className={`professional-card p-6 sm:p-7 md:p-8 rounded-xl hover-lift transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-text-primary">Education</h4>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
                  I graduated from <span className="text-accent-primary font-semibold">Camarines Sur Polytechnic Colleges</span> with a{' '}
                  <span className="text-accent-primary font-semibold">Bachelor of Science in Computer Science</span>, where I developed a strong foundation in software engineering and programming principles.
                </p>
              </div>
            </div>

            {/* Philosophy/Approach Card */}
            <div 
              className={`professional-card p-6 sm:p-8 md:p-10 rounded-xl hover-lift transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-text-primary">My Approach</h4>
              </div>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-text-secondary">
                With a strong foundation in software engineering and data analysis, I bring a unique perspective to web development, combining technical expertise with creative problem-solving to deliver exceptional user experiences. I'm always eager to learn new technologies and take on challenging projects that push the boundaries of what's possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;



