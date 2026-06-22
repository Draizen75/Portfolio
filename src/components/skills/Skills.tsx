/**
 * Skills Component
 * * Displays technologies in a 3-row infinite marquee layout.
 */

import { useRef } from 'react';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import { getSkillIcon } from '../../utils/skillIconUtils';
import { motion } from 'framer-motion';

const SkillCard = ({ skill }: { skill: string }) => {
  const iconData = getSkillIcon(skill);
  const hasIcon = iconData !== null;
  return (
    <div className="group relative w-24 sm:w-32 md:w-36 p-3 sm:p-4 rounded-xl sm:rounded-2xl glass-surface glass-surface-hover transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-1 sm:hover:-translate-y-1.5 cursor-pointer shadow-sm hover:shadow-md flex-shrink-0 mx-1.5 sm:mx-3">
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="mb-2 sm:mb-3 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
          {hasIcon && iconData ? (
            <div className="relative">
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-all duration-300 relative z-10" style={{ fill: `#${iconData.hex}` }}>
                <title>{iconData.title}</title>
                <path d={iconData.path} />
              </svg>
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 absolute inset-0 opacity-0 group-hover:opacity-30 blur-md sm:blur-lg transition-opacity duration-300" style={{ fill: `#${iconData.hex}` }}>
                <path d={iconData.path} />
              </svg>
            </div>
          ) : (
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300 border border-blue-100 dark:border-slate-700">
              <span className="text-[9px] sm:text-[10px] font-black text-slate-400 dark:text-slate-500">{skill.substring(0, 2).toUpperCase()}</span>
            </div>
          )}
        </div>
        <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-900 dark:text-slate-100 text-center break-words group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{skill}</span>
      </div>
    </div>
  );
};

const MarqueeRow = ({ skillsList, duration = 40, reverse = false }: { skillsList: string[], duration?: number, reverse?: boolean }) => {
  return (
    <div className="flex w-full relative py-3 overflow-hidden">
      <motion.div
        initial={{ x: reverse ? "-50%" : "0%" }}
        animate={{ x: reverse ? "0%" : "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="flex flex-nowrap w-max hover:[animation-play-state:paused]"
      >
        <div className="flex flex-nowrap">
          {skillsList.map((skill, idx) => <SkillCard key={`s1-${idx}`} skill={skill} />)}
        </div>
        <div className="flex flex-nowrap" aria-hidden="true">
          {skillsList.map((skill, idx) => <SkillCard key={`s2-${idx}`} skill={skill} />)}
        </div>
      </motion.div>
    </div>
  );
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const skillCategories = ['Frontend Developer', 'Backend Developer', 'Web Developer', 'Data Analyst'];
  const typedCategory = useTypingEffect(skillCategories, 100, 50, 2000);

  const skills: string[] = [
    'React', 'HTML', 'CSS', 'Tailwind', 'JavaScript', 'TypeScript', 'Node.js', 
    'Next.js', 'Python', 'Prisma', 'PostgreSQL', 'MySQL', 'Git', 'GitHub', 
    'npm', 'Vercel', 'Flask', 'Godot', 'Material UI', 'Docker', 'ESLint', 
    'Figma', 'Vite'
  ];

  // Split into 3 arrays
  const chunk1 = skills.slice(0, 8);
  const chunk2 = skills.slice(8, 16);
  const chunk3 = skills.slice(16, skills.length);

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="relative pb-24 overflow-hidden bg-transparent"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-20"
        >
          <h2 id="skills-heading" className="type-section-title">
            My Technical Skills
          </h2>
          <p className="type-section-lead px-4">
             Building with modern tools as a <span className="font-semibold text-blue-600 dark:text-blue-400">{typedCategory}</span>
          </p>
        </motion.div>
        
        <div 
          className="relative w-full max-w-[100vw] overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0 mt-6 sm:mt-8 flex flex-col gap-1.5 sm:gap-2"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' 
          }}
        >
          <MarqueeRow skillsList={chunk1} duration={45} />
          <MarqueeRow skillsList={chunk2} duration={55} reverse={true} />
          <MarqueeRow skillsList={chunk3} duration={50} />
        </div>
      </div>
    </section>
  );
};