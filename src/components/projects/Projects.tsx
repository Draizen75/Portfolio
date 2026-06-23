import { useState, useCallback, useTransition, memo, useRef } from 'react';
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
  const cardRef = useRef<HTMLButtonElement>(null);
  const [transformStyle, setTransformStyle] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');

  const handleClick = (): void => {
    onSelect(project);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(project);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Disable 3D tilt effect on touch devices to avoid scroll glitching
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(pointer: fine)').matches) {
      return;
    }
    
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width; // 0 to 1
    const y = (e.clientY - top) / height; // 0 to 1

    const rotateX = (y - 0.5) * -10; // max 5 deg
    const rotateY = (x - 0.5) * 10; // max 5 deg

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div className="w-full h-full" style={{ perspective: '1000px' }}>
      <button
        ref={cardRef}
        type="button"
        className="group relative flex flex-col w-full h-full bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.4)] text-left overflow-hidden border border-slate-100 dark:border-slate-800/80 transition-shadow duration-300 will-change-transform ease-out"
        style={{ transform: transformStyle, transition: transformStyle.includes('scale3d(1, 1, 1)') ? 'transform 0.5s ease-out' : 'none' }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Top: Image Container */}
        <div className="relative w-full aspect-[16/10] bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transform-gpu group-hover:scale-105 transition-transform duration-700 ease-out motion-reduce:transform-none"
            />
          ) : (
            <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
              <ProjectCoverArt title={project.title} />
            </div>
          )}
          
          {/* Subtle overlay to enhance hover effect without obscuring */}
          <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300" />
        </div>

        {/* Bottom: Content Footer */}
        <div className="flex flex-col flex-grow p-5 sm:p-6 bg-white dark:bg-slate-900">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-5 line-clamp-2 flex-grow">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.technologies.slice(0, 3).map((tech) => (
              <span 
                key={tech} 
                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-md border border-slate-200/60 dark:border-slate-700/50"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-md border border-blue-100 dark:border-blue-800/30">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </button>
    </div>
  );
});

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [, startTransition] = useTransition();

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

        {/* Responsive Layout: Horizontal Swipe on Mobile, Grid on Desktop */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto snap-x snap-mandatory pb-8 md:pb-0 md:overflow-visible [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-auto md:px-0 scroll-pl-4 sm:scroll-pl-6 md:scroll-pl-0">
          {projects.map((project, index) => (
            <div key={project.title} className={`snap-start shrink-0 w-[80vw] max-w-[320px] md:w-auto md:max-w-none ${index === projects.length - 1 ? 'pr-4 sm:pr-6 md:pr-0' : ''}`}>
              <ProjectCard project={project} onSelect={handleProjectSelect} />
            </div>
          ))}
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