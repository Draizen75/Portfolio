/**
 * Skills Component
 * 
 * Displays technologies in a grid layout with logos and labels.
 */

import { useState, useEffect, useRef } from 'react';
import * as Icons from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';

/**
 * Maps skill names to Simple Icons
 */
const getSkillIcon = (skillName: string): SimpleIcon | null => {
  const skillMap: Record<string, SimpleIcon | null> = {
    // Programming Languages
    'Python': Icons.siPython,
    'JavaScript': Icons.siJavascript,
    'TypeScript': Icons.siTypescript,
    'Java': null, // Java icon not available
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
    
    // Deployment & Hosting
    'Vercel': Icons.siVercel,
    
    // Design
    'Figma': Icons.siFigma,
    
    // Other
    'Visual Studio Code': null, // Icon not available
    'Microsoft Office': null, // Icon not available
  };

  return skillMap[skillName] || skillMap[skillName.toLowerCase()] || null;
};

const Skills = (): React.JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="bg-background-primary dark:bg-gray-900 py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary dark:text-white break-words">
            Skills
          </h2>
          <div className="flex-1 h-px bg-border-default dark:bg-gray-700"></div>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-6 sm:gap-8 md:gap-10">
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
                <div className="group relative w-full p-4 sm:p-5 md:p-6 rounded-xl bg-background-secondary/50 dark:bg-gray-800/50 border border-border-default/50 dark:border-gray-700/50 hover:border-accent-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-primary/20 dark:hover:shadow-gray-900/50 hover:-translate-y-1 cursor-pointer">
                  {/* Light/Glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent-primary/0 via-accent-primary/0 to-accent-primary/0 group-hover:from-accent-primary/5 group-hover:via-accent-primary/10 group-hover:to-accent-primary/5 transition-all duration-300 pointer-events-none"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    {/* Icon */}
                    <div className="mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      {hasIcon && iconData ? (
                        <div className="relative">
                          <svg
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 transition-all duration-300 relative z-10"
                            fill={`#${iconData.hex}`}
                          >
                            <title>{iconData.title}</title>
                            <path d={iconData.path} />
                          </svg>
                          {/* Glow effect on hover */}
                          <svg
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 absolute inset-0 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"
                            fill="#3b82f6"
                          >
                            <path d={iconData.path} />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-background-tertiary rounded flex items-center justify-center group-hover:bg-accent-primary/10 transition-colors duration-300">
                          <span className="text-xs sm:text-sm text-text-secondary dark:text-gray-200 font-medium group-hover:text-accent-primary transition-colors duration-300">{skill}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Label */}
                    <span className="text-text-primary dark:text-white text-xs sm:text-sm text-center font-normal break-words group-hover:text-accent-primary transition-colors duration-300">
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

export default Skills;


