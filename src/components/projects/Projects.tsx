import { useState, useCallback, useTransition, memo, useRef, useEffect } from 'react';
import { getProjectImages } from '../../utils/imageUtils';
import { portfolioProjects, type PortfolioProject } from '../../data/projectsData';
import ProjectCoverArt from './ProjectCoverArt';
import ProjectDetail from './ProjectDetail';
import AnimatedModal from '../ui/AnimatedModal';

const projects = portfolioProjects;

type Project = PortfolioProject;

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

const ProjectCard = memo(function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const imageUrl = getProjectImages(project.imageFolder)[0] || '';

  const handleClick = (): void => {
    onSelect(project);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(project);
    }
  };

  return (
    <button
      type="button"
      className="group relative overflow-hidden rounded-[2.5rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] cursor-pointer transform-gpu transition-[transform,box-shadow] duration-300 motion-reduce:transition-none md:hover:-translate-y-1 md:hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] text-left w-full aspect-[4/5]"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {/* Background Image */}
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transform-gpu group-hover:scale-[1.03] transition-transform duration-300 motion-reduce:transform-none"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full">
          <ProjectCoverArt title={project.title} />
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 group-hover:from-black/90 group-hover:via-black/50" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-5 sm:p-6 md:p-8 text-white">
        <h3 className="type-card-title">{project.title}</h3>

        <div className="mt-2 transition-all duration-300 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transform group-hover:translate-y-0">
          <p className="mt-1 type-muted text-slate-300 line-clamp-2">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="px-3 py-1 bg-white/10 backdrop-blur-sm text-slate-200 type-label rounded-full border border-white/20">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-blue-300 type-label rounded-full border border-white/20">
                +{project.technologies.length - 3} More
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
});

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [, startTransition] = useTransition();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleProjectSelect = useCallback((project: Project) => {
    startTransition(() => {
      setSelectedProject(project);
    });
  }, []);

  const handleModalClose = useCallback(() => {
    startTransition(() => {
      setSelectedProject(null);
    });
  }, []);

  const checkScrollability = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const isScrollable = el.scrollWidth > el.clientWidth;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(isScrollable && el.scrollLeft < el.scrollWidth - el.clientWidth - 1); // -1 for precision
    }
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      checkScrollability();
      const debouncedCheck = () => setTimeout(checkScrollability, 200);
      window.addEventListener('resize', debouncedCheck);
      return () => window.removeEventListener('resize', debouncedCheck);
    }
  }, [checkScrollability]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (el) {
      // Scroll by 80% of the container width for a nice page-like feel
      const scrollAmount = el.clientWidth * 0.8;
      el.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <section id="projects" className="relative pb-24 overflow-hidden bg-transparent" aria-labelledby="projects-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 id="projects-heading" className="type-section-title">
            My Projects
          </h2>
          <p className="type-section-lead px-4 lg:px-0">
            Selected works and experiments that showcase my skills in development and problem-solving.
          </p>
        </div>

        <div className="relative">
          <div 
            ref={scrollContainerRef}
            onScroll={checkScrollability}
            className="overflow-x-auto pb-4 -mx-4 px-4 hide-scrollbar"
          >
            <div className="flex gap-4 sm:gap-8">
              {projects.map((project) => (
                <div key={project.title} className="w-[75vw] sm:w-[320px] shrink-0">
                  <ProjectCard project={project} onSelect={handleProjectSelect} />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-between items-center absolute top-1/2 -translate-y-1/2 w-full left-0 pointer-events-none">
             <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="pointer-events-auto p-2 sm:p-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 disabled:opacity-0 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-all -ml-2 sm:-ml-4"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="pointer-events-auto p-2 sm:p-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 disabled:opacity-0 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-all -mr-2 sm:-mr-4"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6"/></svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatedModal 
        isOpen={!!selectedProject} 
        onClose={handleModalClose}
        maxWidth="max-w-6xl"
      >
        {selectedProject && (
          <ProjectDetail key={selectedProject.title} project={selectedProject} />
        )}
      </AnimatedModal>
    </section>
  );
}