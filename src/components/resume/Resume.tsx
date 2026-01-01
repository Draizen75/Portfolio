/**
 * Resume Component
 * 
 * Displays education, work experience, and certifications with a modern timeline design.
 */

import { useState, useEffect, useRef } from 'react';

interface EducationItem {
  degree: string;
  period: string;
  institution: string;
}

interface WorkItem {
  position: string;
  period: string;
  company: string;
  responsibilities: string[];
}

interface CertificationItem {
  title: string;
  period: string;
  level?: string;
  description: string;
}

const Resume = (): React.JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const education: EducationItem[] = [
    {
      degree: 'Bachelor of Science in Computer Science',
      period: '2021 - 2025',
      institution: 'Camarines Sur Polytechnic Colleges',
    },
  ];

  const workExperience: WorkItem[] = [
    {
      position: 'Web Developer',
      period: '2024 - Present',
      company: 'Syd Solution Tech',
      responsibilities: [
        'Developed responsive and interactive web applications using modern frontend technologies',
        'Collaborated with cross-functional teams to deliver innovative IT solutions for businesses',
        'Built scalable web applications focusing on user experience and performance optimization',
        'Implemented responsive designs using modern CSS frameworks and best practices',
        'Contributed to software development projects including e-commerce platforms and digital solutions',
      ],
    },
    {
      position: 'Programmer Intern',
      period: 'March 2025 - May 2025',
      company: 'AI Research Center for Community Development',
      responsibilities: [
        'Provided technical support and troubleshooting for network issues',
        'Assisted in software installation and maintenance',
        'Managed user accounts and permissions',
      ],
    },
  ];

  const certifications: CertificationItem[] = [
    {
      title: 'Computer Systems Servicing National Certificate Level II (TESDA)',
      period: '2021-2026',
      level: 'NC II',
      description: 'Successfully completed the Computer Systems Servicing NC II program, demonstrating proficiency in installing and configuring computer systems, setting up computer networks, and maintaining computer systems and networks. Acquired hands-on experience in troubleshooting hardware and software issues, network configuration, and system maintenance.',
    },
    {
      title: 'Career Service Examination - Professional Level Passer (CSE-PPT)',
      period: 'March 2025',
      level: 'Career Service Professional Eligibility',
      description: 'I achieved Career Service Professional Eligibility by passing the CSE-PPT, demonstrating my competence in various professional skills and knowledge areas. This certification, recognized by the Civil Service Commission (CSC), qualifies me for government positions that require professional eligibility.',
    },
  ];

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

  /**
   * Renders education section
   */
  const renderEducation = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-text-primary">Education</h3>
      </div>
      
      <div className="relative pl-8 sm:pl-12 border-l-2 border-border-default">
        {education.map((edu, index) => (
          <div 
            key={index}
            className={`mb-8 last:mb-0 relative transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {/* Timeline dot */}
            <div className="absolute -left-[29px] sm:-left-[37px] top-1 w-6 h-6 rounded-full bg-accent-primary border-4 border-background-primary flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-accent-primary"></div>
            </div>
            
            {/* Card */}
            <div className="group professional-card p-5 sm:p-6 md:p-7 rounded-xl hover-lift relative">
              {/* Date badge - absolute on desktop, relative on mobile */}
              <div className="absolute top-4 right-4 z-10 hidden sm:block">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-xs sm:text-sm font-semibold whitespace-nowrap">
                  {edu.period}
                </span>
              </div>
              
              <div className="sm:pr-24 md:pr-32 lg:pr-36">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-4 mb-2">
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary group-hover:text-accent-primary transition-colors duration-300 break-words flex-1">
                    {edu.degree}
                  </h4>
                  {/* Date badge - visible on mobile */}
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-xs font-semibold whitespace-nowrap w-fit sm:hidden mb-2">
                    {edu.period}
                  </span>
                </div>
                <p className="text-accent-primary font-semibold text-base sm:text-lg break-words">
                  {edu.institution}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /**
   * Renders work experience section
   */
  const renderExperience = () => (
    <div className="space-y-6 mt-12 sm:mt-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-text-primary">Experience</h3>
      </div>
      
      <div className="relative pl-8 sm:pl-12 border-l-2 border-border-default">
        {workExperience.map((work, index) => (
          <div 
            key={index}
            className={`mb-8 last:mb-0 relative transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}
            style={{ transitionDelay: `${(education.length + index) * 100}ms` }}
          >
            {/* Timeline dot */}
            <div className="absolute -left-[29px] sm:-left-[37px] top-1 w-6 h-6 rounded-full bg-accent-primary border-4 border-background-primary flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-accent-primary"></div>
            </div>
            
            {/* Card */}
            <div className="group professional-card p-5 sm:p-6 md:p-7 rounded-xl hover-lift relative">
              {/* Date badge - absolute on desktop, relative on mobile */}
              <div className="absolute top-4 right-4 z-10 hidden sm:block">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-xs sm:text-sm font-semibold whitespace-nowrap">
                  {work.period}
                </span>
              </div>
              
              <div className="sm:pr-24 md:pr-32 lg:pr-36">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-4 mb-2">
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary group-hover:text-accent-primary transition-colors duration-300 break-words flex-1">
                    {work.position}
                  </h4>
                  {/* Date badge - visible on mobile */}
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-xs font-semibold whitespace-nowrap w-fit sm:hidden mb-2">
                    {work.period}
                  </span>
                </div>
                <p className="text-accent-primary font-semibold text-base sm:text-lg mb-4 break-words">
                  {work.company}
                </p>
                
                {work.responsibilities && (
                  <ul className="space-y-2">
                    {work.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex} className="flex items-start gap-3">
                        <span className="text-accent-primary mt-1.5 flex-shrink-0">▸</span>
                        <span className="text-text-secondary leading-relaxed text-sm sm:text-base break-words">
                          {resp}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /**
   * Renders certifications section
   */
  const renderCertifications = () => (
    <div className="space-y-6 mt-12 sm:mt-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-text-primary">Certifications</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className={`group professional-card p-5 sm:p-6 rounded-xl hover-lift transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${(education.length + workExperience.length + index) * 100}ms` }}
          >
            {/* Badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-background-secondary text-text-muted text-xs font-mono">
                {cert.period}
              </span>
            </div>
            
            <h4 className="text-lg sm:text-xl font-bold text-text-primary mb-2 group-hover:text-accent-primary transition-colors duration-300 break-words">
              {cert.title}
            </h4>
            
            {cert.level && (
              <p className="text-accent-primary font-semibold text-sm sm:text-base mb-3 break-words">
                {cert.level}
              </p>
            )}
            
            <p className="text-text-secondary leading-relaxed text-sm sm:text-base break-words">
              {cert.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section 
      ref={sectionRef}
      id="resume" 
      className="bg-background-primary py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary break-words">
            Resume
          </h2>
          <div className="flex-1 h-px bg-border-default"></div>
        </div>
        
        <div className="space-y-12 sm:space-y-16">
          {renderEducation()}
          {renderExperience()}
          {renderCertifications()}
        </div>
      </div>
    </section>
  );
};

export default Resume;
