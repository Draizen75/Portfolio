/**
 * Skills Component
 * * Displays technologies in a grid layout with logos and labels.
 * Updated to use GridPattern background and consistent spacing.
 */

import { useState, useEffect, useRef } from 'react';
import * as Icons from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';
import { useTypingEffect } from '../../hooks/useTypingEffect';

/**
 * Maps skill names to Simple Icons
 */
const getSkillIcon = (skillName: string): SimpleIcon | null => {
  const skillMap: Record<string, SimpleIcon | null> = {
    // Programming Languages
    'Python': Icons.siPython,
    'JavaScript': Icons.siJavascript,
    'TypeScript': Icons.siTypescript,
    'Java': null, // Java icon not available in this specific import set
    'Godot Script': Icons.siGodotengine,
    'Godot': Icons.siGodotengine,
    'HTML': Icons.siHtml5,
    'CSS': Icons.siCss,
    
    // Frameworks & Libraries
    'React': Icons.siReact,
    'Next.js': Icons.siNextdotjs,
    'Tailwind': Icons.siTailwindcss,
    'TailwindCSS': Icons.siTailwindcss,
    'Flask': Icons.siFlask,
    'Material UI': Icons.siMui,
    'MUI': Icons.siMui,
    
    // Backend & Runtime
    'Node.js': Icons.siNodedotjs,
    'NodeJS': Icons.siNodedotjs,
    
    // Databases
    'PostgreSQL': Icons.siPostgresql,
    'MySQL': Icons.siMysql,
    'Prisma': Icons.siPrisma,
    
    // Tools & Version Control
    'Git': Icons.siGit,
    'GitHub': Icons.siGithub,
    'Git & GitHub': Icons.siGithub,
    'npm': Icons.siNpm,
    'NPM': Icons.siNpm,
    'ESLint': Icons.siEslint,
    'Docker': Icons.siDocker,
    'Vite': Icons.siVite,
    
    // Deployment & Hosting
    'Vercel': Icons.siVercel,
    
    // Design
    'Figma': Icons.siFigma,
    
    // Other
    'Visual Studio Code': null,
    'Microsoft Office': null,
  };

  return skillMap[skillName] || skillMap[skillName.toLowerCase()] || null;
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Typing effect for skill categories
  const skillCategories = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Analyst'];
  const typedCategory = useTypingEffect(skillCategories, 100, 50, 2000);

  // All skills in a single flat list
  const skills: string[] = [
    'React',
    'HTML',
    'CSS',
    'Tailwind',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Next.js',
    'Python',
    'Prisma',
    'PostgreSQL',
    'MySQL',
    'Git',
    'GitHub',
    'npm',
    'Vercel',
    'Flask',
    'Godot',
    'Material UI',
    'Docker',
    'ESLint',
    'Figma',
    'Vite',
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Only trigger once
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
      id="skills" 
      className="relative pb-24 overflow-hidden bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className={`text-center mb-20 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            My Technical Skills
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-slate-500 dark:text-slate-400 px-4">
             Building with modern tools as a <span className="font-semibold text-blue-600 dark:text-blue-400">{typedCategory}</span>
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
          {skills.map((skill, index) => {
            const iconData = getSkillIcon(skill);
            const hasIcon = iconData !== null;
            
            return (
              <div
                key={index}
                className={`flex flex-col items-center justify-center transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ 
                  transitionDelay: `${index * 50}ms`
                }}
              >
                {/* Card Container with Hover Effects */}
                <div className="group relative w-full p-6 sm:p-8 rounded-[2rem] border border-blue-100/50 dark:border-slate-800/60 bg-blue-50/40 dark:bg-slate-900/80 hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer shadow-[0_4px_12px_-2px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)]">
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    {/* Icon */}
                    <div className="mb-4 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                      {hasIcon && iconData ? (
                        <div className="relative">
                          {/* Main Icon */}
                          <svg
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 relative z-10"
                            style={{ fill: `#${iconData.hex}` }}
                          >
                            <title>{iconData.title}</title>
                            <path d={iconData.path} />
                          </svg>
                          
                          {/* Glow effect on hover */}
                          <svg
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 sm:w-12 sm:h-12 absolute inset-0 opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300"
                            style={{ fill: `#${iconData.hex}` }}
                          >
                            <path d={iconData.path} />
                          </svg>
                        </div>
                      ) : (
                        // Fallback for missing icons
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300 border border-blue-100 dark:border-slate-700">
                          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500">
                             {skill.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Label */}
                    <span className="text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-bold tracking-tight text-center break-words group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {skill}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};