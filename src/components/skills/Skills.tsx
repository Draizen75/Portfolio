/**
 * Skills Component
 * * Displays technologies in a grid layout with logos and labels.
 * Updated to use GridPattern background and consistent spacing.
 */

import { useState, useEffect, useRef } from 'react';
import * as Icons from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import GridPattern from '../common/GridPattern';

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
      className="relative py-16 md:py-32 overflow-hidden bg-white dark:bg-black"
    >
      {/* --- BACKGROUND START --- */}
      <GridPattern />
      {/* --- BACKGROUND END --- */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            My Technical Skills
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400">
             Building with modern tools as a <span className="font-semibold text-gray-900 dark:text-white">{typedCategory}</span>
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
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
                {/* Card Container with Hover Effects - Updated to match Glass theme */}
                <div className="group relative w-full p-6 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-700 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:-translate-y-1 cursor-pointer shadow-sm hover:shadow-md">
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    {/* Icon */}
                    <div className="mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      {hasIcon && iconData ? (
                        <div className="relative">
                          {/* Main Icon */}
                          <svg
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 sm:w-12 sm:h-12 md:w-12 md:h-12 transition-all duration-300 relative z-10"
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
                            className="w-10 h-10 sm:w-12 sm:h-12 md:w-12 md:h-12 absolute inset-0 opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300"
                            style={{ fill: `#${iconData.hex}` }}
                          >
                            <path d={iconData.path} />
                          </svg>
                        </div>
                      ) : (
                        // Fallback for missing icons
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors duration-300">
                          <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                             {skill.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Label */}
                    <span className="text-gray-900 dark:text-gray-100 text-sm font-semibold text-center break-words group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
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