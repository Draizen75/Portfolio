/**
 * About Component
 * * Background: Matches Hero section (GridPattern).
 * * Layout: Timeline for experience, Sticky grid for education.
 * * Icons: Inline SVGs (No external dependencies).
 * * Removed TruncatedText dependency.
 */

import { useState, useEffect, useRef } from 'react';
import PortraitImage from '../common/PortraitImage';

// --- Interfaces ---
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

// --- Icons (Inline SVGs) ---
const Icons = {
  User: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  GraduationCap: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  Briefcase: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Award: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),
  Calendar: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  ),
};

// --- Data ---
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
    period: 'October 2025 - Present',
    company: 'Syd Solution Tech',
    responsibilities: [
      'Developed responsive and interactive web applications using modern frontend technologies',
      'Collaborated with cross-functional teams to deliver innovative IT solutions for businesses',
      'Built scalable web applications focusing on user experience and performance optimization',
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
    title: 'Computer Systems Servicing National Certificate Level II',
    period: '2021-2026',
    level: 'NC II (TESDA)',
    description: 'Successfully completed the Computer Systems Servicing NC II program, demonstrating proficiency in installing and configuring computer systems, setting up computer networks, and maintaining computer systems and networks.',
  },
  {
    title: 'Career Service Examination - Professional Level Passer',
    period: 'March 2025',
    level: 'CSE-PPT',
    description: 'Achieved Career Service Professional Eligibility by passing the CSE-PPT, demonstrating competence in various professional skills and knowledge areas.',
  },
];

// --- Sub-Components ---

const SectionHeader = ({ title, icon: Icon }: { title: string; icon: React.FC<React.SVGProps<SVGSVGElement>> }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="p-2 rounded-lg bg-accent-primary/10 text-accent-primary">
      <Icon className="w-6 h-6" />
    </div>
    <h2 className="type-subsection-title">
      {title}
    </h2>
  </div>
);

const GlassCard = ({ children, className = "", delay = 0, isVisible }: { children: React.ReactNode; className?: string; delay?: number; isVisible: boolean }) => (
  <div
    className={`
      relative overflow-hidden rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]
      entrance-motion group hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)]
      glass-surface glass-surface-hover
      ${isVisible ? 'entrance-visible' : 'entrance-hidden'}
      ${className}
    `}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {/* Hover Gradient Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/[0.01] to-blue-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    
    <div className="relative z-10 p-5 sm:p-8">
      {children}
    </div>
  </div>
);

const DateBadge = ({ date }: { date: string }) => (
  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-800 type-label border border-slate-200 dark:border-slate-700/50 shadow-sm">
    <Icons.Calendar className="w-3 h-3" />
    {date}
  </div>
);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const aboutIntro =
    "I’m a detail-oriented developer who enjoys turning complex problems into simple, intuitive digital experiences. I care about clean code, great UX, and building products that feel fast and reliable on every device.";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative pb-24 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Header & Bio --- */}
        <div className={`text-center mb-16 md:mb-24 entrance-motion ${isVisible ? 'entrance-visible' : 'entrance-hidden'}`}>
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 backdrop-blur-sm">
            <Icons.User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="type-eyebrow">About Me</span>
          </div>
          
          <h1 className="type-section-title mb-8">
            Designing logic, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">crafting code.</span>
          </h1>
          
          <div className="max-w-2xl mx-auto">
            {/* Direct text rendering instead of TruncatedText */}
            <p className="type-muted max-w-2xl mx-auto">
              {aboutIntro}
            </p>
          </div>

          <PortraitImage
            size="about"
            className={`mt-10 sm:mt-12 lg:hidden entrance-motion ${isVisible ? 'entrance-visible' : 'entrance-hidden'}`}
            loading="lazy"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-start">
          
          {/* --- Left Column: Education & Certs (Sticky) --- */}
          <div className="space-y-10 lg:space-y-12 h-fit lg:sticky lg:top-24">
            
            {/* Education */}
            <div>
              <SectionHeader title="Education" icon={Icons.GraduationCap} />
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <GlassCard key={index} isVisible={isVisible} delay={100 + (index * 100)}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="type-card-title">
                        {edu.degree}
                      </h3>
                    </div>
                    <p className="type-card-subtitle mb-3">{edu.institution}</p>
                    <DateBadge date={edu.period} />
                  </GlassCard>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <SectionHeader title="Certifications" icon={Icons.Award} />
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <GlassCard key={index} isVisible={isVisible} delay={300 + (index * 100)}>
                    <div className="flex flex-col gap-2">
                      <h3 className="type-card-title">
                        {cert.title}
                      </h3>
                      {cert.level && (
                        <span className="self-start px-2 py-0.5 rounded type-label bg-blue-600/10 text-blue-600 dark:text-blue-400">
                          {cert.level}
                        </span>
                      )}
                    </div>
                    
                    {/* Direct text rendering instead of TruncatedText */}
                    <div className="mt-4 type-caption leading-relaxed">
                      <p>{cert.description}</p>
                    </div>
                    
                    <div className="mt-4">
                       <DateBadge date={cert.period} />
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>

          {/* --- Right Column: Experience (Timeline) --- */}
          <div>
            <SectionHeader title="Experience" icon={Icons.Briefcase} />

            <div className="relative">
              {/* Timeline rail */}
              <div
                className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-800"
                aria-hidden="true"
              />

              <div className="space-y-8 sm:space-y-10 lg:space-y-12">
                {workExperience.map((work, index) => (
                  <div key={index} className="relative">
                    <span
                      className={`
                        absolute left-[11px] top-6 z-10 h-5 w-5 -translate-x-1/2 rounded-full
                        border-4 border-white dark:border-slate-950 bg-blue-600
                        entrance-motion delay-300
                        ${isVisible ? 'entrance-visible' : 'entrance-hidden'}
                      `}
                      aria-hidden="true"
                    />

                    <div className="pl-10">
                      <GlassCard isVisible={isVisible} delay={500 + (index * 150)}>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                          <div>
                            <h3 className="type-card-title">
                              {work.position}
                            </h3>
                            <p className="type-card-subtitle">
                              {work.company}
                            </p>
                          </div>
                          <div className="self-start">
                            <DateBadge date={work.period} />
                          </div>
                        </div>

                        <div className="type-muted">
                          <ul className="mt-4 list-disc list-inside space-y-2 type-body-sm">
                            {work.responsibilities.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </GlassCard>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}