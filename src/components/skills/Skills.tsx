/**
 * Skills Component
 *
 * Displays animated skill cards with category filters.
 */

import { useMemo, useRef, useState, type CSSProperties } from 'react';
import { getSkillIcon } from '../../utils/skillIconUtils';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

type SkillFilter = 'all' | 'frontend' | 'backend' | 'database' | 'mobileTools';

interface SkillGroup {
  id: Exclude<SkillFilter, 'all'>;
  label: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: ['React', 'Next.js', 'Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind', 'Material UI'],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: ['Node.js', 'Python', 'Flask', 'Prisma', 'Spring Boot'],
  },
  {
    id: 'database',
    label: 'Database',
    skills: ['PostgreSQL', 'MySQL', 'SQLite', 'Supabase'],
  },
  {
    id: 'mobileTools',
    label: 'Mobile/Tools',
    skills: ['React Native', 'Expo', 'Git', 'GitHub', 'Docker', 'Vercel', 'Vite', 'Figma', 'ESLint', 'npm'],
  },
];

const filters: Array<{ id: SkillFilter; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'mobileTools', label: 'Mobile/Tools' },
];

const allSkills = Array.from(new Set(skillGroups.flatMap((group) => group.skills)));
const MARQUEE_SECONDS_PER_CARD = 6.5;

const chunkSkills = (skills: string[], chunkCount: number): string[][] => {
  const chunkSize = Math.ceil(skills.length / chunkCount);
  return Array.from({ length: chunkCount }, (_, index) =>
    skills.slice(index * chunkSize, (index + 1) * chunkSize)
  ).filter((chunk) => chunk.length > 0);
};

const SkillCard = ({ skill }: { skill: string }) => {
  const iconData = getSkillIcon(skill);
  const hasIcon = iconData !== null;
  const isDarkIcon = iconData ? ['000000', '181717'].includes(iconData.hex.toUpperCase()) : false;

  return (
    <div className="group relative w-20 sm:w-32 md:w-36 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-700/80 shadow-[0_8px_24px_rgba(15,23,42,0.06)] dark:shadow-[0_8px_28px_rgba(0,0,0,0.24)] transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-1 sm:hover:-translate-y-1.5 hover:border-blue-300/80 dark:hover:border-blue-500/60 hover:bg-white dark:hover:bg-slate-850 flex-shrink-0 mx-1 sm:mx-3">
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="mb-2 sm:mb-3 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
          {hasIcon && iconData ? (
            <div className="relative">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className={`w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-all duration-300 relative z-10 ${isDarkIcon ? 'text-slate-900 dark:text-white' : ''}`}
                style={{ fill: isDarkIcon ? 'currentColor' : `#${iconData.hex}` }}
              >
                <title>{iconData.title}</title>
                <path d={iconData.path} />
              </svg>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className={`w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 absolute inset-0 opacity-0 group-hover:opacity-30 blur-md sm:blur-lg transition-opacity duration-300 ${isDarkIcon ? 'text-slate-900 dark:text-white' : ''}`}
                style={{ fill: isDarkIcon ? 'currentColor' : `#${iconData.hex}` }}
              >
                <path d={iconData.path} />
              </svg>
            </div>
          ) : (
            <div className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300 border border-blue-100 dark:border-slate-700">
              <span className="text-[9px] sm:text-[10px] font-black text-slate-400 dark:text-slate-500">
                {skill.substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-900 dark:text-slate-100 text-center break-words leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {skill}
        </span>
      </div>
    </div>
  );
};

const MarqueeRow = ({
  skillsList,
  reverse = false,
  repeatWithinSet = 1,
}: {
  skillsList: string[];
  reverse?: boolean;
  repeatWithinSet?: number;
}) => {
  const repeatedSkills = Array.from({ length: repeatWithinSet }, () => skillsList).flat();
  const duration = Math.max(42, repeatedSkills.length * MARQUEE_SECONDS_PER_CARD);

  return (
  <div className="flex w-full relative py-1.5 sm:py-3 overflow-hidden">
      <div
        className={`skills-marquee-track flex flex-nowrap w-max hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] ${reverse ? 'skills-marquee-track-reverse' : ''}`}
        style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
      >
        <div className="flex flex-nowrap">
          {repeatedSkills.map((skill, index) => (
            <SkillCard key={`primary-${skill}-${index}`} skill={skill} />
          ))}
        </div>
        <div className="flex flex-nowrap" aria-hidden="true">
          {repeatedSkills.map((skill, index) => (
            <SkillCard key={`duplicate-${skill}-${index}`} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: headerRef, isVisible: isHeaderVisible } = useRevealOnScroll<HTMLDivElement>();
  const [activeFilter, setActiveFilter] = useState<SkillFilter>('all');
  const activeGroup = activeFilter === 'all'
    ? null
    : skillGroups.find((group) => group.id === activeFilter);

  const visibleSkills = useMemo(() => {
    if (activeFilter === 'all') {
      return allSkills;
    }

    return activeGroup?.skills ?? [];
  }, [activeFilter, activeGroup]);

  const marqueeRows = useMemo(() => {
    const rowCount = activeFilter === 'all' ? 3 : 1;
    return chunkSkills(visibleSkills, rowCount);
  }, [activeFilter, visibleSkills]);
  const filteredRepeatCount = visibleSkills.length <= 5 ? 2 : 1;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative pb-8 sm:pb-20 overflow-hidden bg-transparent"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={headerRef}
          className={`reveal-on-scroll ${isHeaderVisible ? 'is-visible' : ''} text-center mb-7 sm:mb-9`}
        >
          <h2 id="skills-heading" className="type-section-title">
            Technical Skills
          </h2>
          <p className="type-section-lead px-4">
            Filter the stack by the kind of work you want to inspect.
          </p>
        </div>

        <div className="mb-4 flex justify-end sm:hidden">
          <div className="relative min-w-0">
            <select
              id="skill-filter"
              aria-label="Filter skills by category"
              value={activeFilter}
              onChange={(event) => setActiveFilter(event.target.value as SkillFilter)}
              className="min-h-10 max-w-[12rem] appearance-none rounded-full border border-slate-200 bg-white/90 px-4 py-2 pr-10 text-center text-sm font-semibold text-slate-800 shadow-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-100"
            >
              {filters.map((filter) => (
                <option key={filter.id} value={filter.id}>
                  {filter.label}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="mb-5 hidden flex-wrap items-center justify-center gap-2.5 sm:flex" aria-label="Filter skills">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'border-blue-600 bg-blue-600 text-white shadow-[0_10px_20px_-10px_rgba(37,99,235,0.8)]'
                    : 'border-slate-200 bg-white/80 text-slate-700 hover:border-blue-300 hover:text-blue-700 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-blue-500/50 dark:hover:text-blue-300'
                }`}
                aria-pressed={isActive}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <p className="mb-0 text-center text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
          {activeFilter === 'all'
            ? `${visibleSkills.length} skills across the full stack`
            : `${activeGroup?.label ?? 'Selected'} stack - ${visibleSkills.length} skills`}
        </p>

        {activeFilter === 'all' ? (
          <div
            key={activeFilter}
            className="relative w-[calc(100%+2rem)] sm:w-full max-w-[100vw] overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0 mt-4 sm:mt-6 flex flex-col gap-1 sm:gap-2"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            }}
          >
            {marqueeRows.map((row, index) => (
              <MarqueeRow
                key={`${activeFilter}-${index}`}
                skillsList={row}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        ) : (
          <div
            key={activeFilter}
            className="relative mx-auto mt-3 sm:mt-6 w-[calc(100%+2rem)] max-w-[100vw] overflow-hidden -mx-4 px-0 sm:w-full sm:max-w-6xl sm:mx-auto sm:px-4 animate-detail-enter"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            }}
          >
            {marqueeRows.map((row, index) => (
              <MarqueeRow
                key={`${activeFilter}-${index}`}
                skillsList={row}
                reverse={index % 2 === 1}
                repeatWithinSet={filteredRepeatCount}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
