/**
 * Contact Component
 * 
 * Displays contact information and social media links.
 * Provides a call-to-action button for email contact.
 */

import { useState, useEffect, useRef } from 'react';

export default function Contact(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const emailAddress: string = 'draizenllaban@gmail.com';
  const phone: string = '09923630328';
  const address: string = 'San Miguel, Bato, Camarines Sur, 4435';

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
      id="contact" 
      className="bg-background-primary py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
          <div className="hidden sm:block flex-1 h-px bg-border-default"></div>
        </div>
        
        {/* Footer-style Contact Layout */}
        <div 
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12">
            {/* Contact Section */}
            <div className="space-y-4">
              <h3 className="text-accent-primary font-bold text-lg sm:text-xl md:text-2xl">Contact</h3>
              <div className="space-y-3 sm:space-y-4">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a 
                    href={`mailto:${emailAddress}`}
                    className="text-text-secondary hover:text-accent-primary transition-colors duration-300 break-all text-sm sm:text-base"
                  >
                    {emailAddress}
                  </a>
                </div>
                
                {/* Phone */}
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a 
                    href={`tel:${phone}`}
                    className="text-text-secondary hover:text-accent-primary transition-colors duration-300 text-sm sm:text-base"
                  >
                    {phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <h3 className="text-accent-primary font-bold text-lg sm:text-xl md:text-2xl">Location</h3>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-text-secondary text-sm sm:text-base break-words">{address}</p>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-4">
              <h3 className="text-accent-primary font-bold text-lg sm:text-xl md:text-2xl">Quick Links</h3>
              <div className="space-y-2 sm:space-y-3">
                <a href="#about" className="block text-text-secondary hover:text-accent-primary transition-colors duration-300 text-sm sm:text-base">About</a>
                <a href="#resume" className="block text-text-secondary hover:text-accent-primary transition-colors duration-300 text-sm sm:text-base">Resume</a>
                <a href="#skills" className="block text-text-secondary hover:text-accent-primary transition-colors duration-300 text-sm sm:text-base">Skills</a>
                <a href="#projects" className="block text-text-secondary hover:text-accent-primary transition-colors duration-300 text-sm sm:text-base">Projects</a>
                <a href="#contact" className="block text-text-secondary hover:text-accent-primary transition-colors duration-300 text-sm sm:text-base">Contact</a>
              </div>
            </div>

            {/* Say Hello Button Section */}
            <div className="space-y-4">
              <h3 className="text-accent-primary font-bold text-lg sm:text-xl md:text-2xl">Let's Connect</h3>
              <div>
                <a 
                  href={`mailto:${emailAddress}`} 
                  className="group inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-accent-primary text-white text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 active:bg-accent-hover hover:bg-accent-hover hover-lift shadow-lg touch-manipulation min-h-[44px]"
                >
                  <span>Say Hello</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};