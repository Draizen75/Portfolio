import { useState } from 'react';
import { getProjectImages } from '../../utils/imageUtils';
import AnimatedModal from '../ui/AnimatedModal';
import ProjectGalleryModal from '../ProjectGalleryModal';

const projects = [
  {
    title: 'SYD Commerce',
    description: 'A modern e-commerce platform with a focus on user experience and performance.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    liveUrl: 'https://sydcommerce.com',
    githubUrl: '#',
    imageFolder: 'sydcommerce',
  },
  {
    title: 'SYD POS',
    description: 'A comprehensive Point of Sale system for managing sales, inventory, and transactions.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    liveUrl: 'https://sydpos.biz',
    githubUrl: '#',
    imageFolder: 'sydpos',
  },
  {
    title: 'Duola',
    description:
      'A multi-tenant birth support SaaS for doula agencies — automated prenatal-to-postpartum care journeys, white-label branding, secure messaging, birth plan PDFs, and HIPAA-ready tenant isolation.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'Tailwind CSS'],
    liveUrl: 'https://www.birthflowapp.com/',
    githubUrl: '#',
    imageFolder: 'birthflow',
  },
  {
    title: 'QR Code Generator',
    description: 'A simple web app to convert URLs into QR codes instantly.',
    technologies: ['Python', 'Flask'],
    liveUrl: '#',
    githubUrl: '#',
    imageFolder: 'qr-generator',
  },
  {
    title: 'Movie Recommendation System',
    description: 'A personalized movie recommendation system using collaborative filtering.',
    technologies: ['Python', 'Flask', 'TMDB API'],
    liveUrl: '#',
    githubUrl: '#',
    imageFolder: 'Movie Recommendations System',
  },
];

type Project = (typeof projects)[number];

/**
 * Renders a gradient placeholder when a project has no cover image.
 *
 * @param title - Project title shown on the placeholder
 */
const ProjectCoverPlaceholder = ({ title }: { title: string }) => (
  <div className="w-full h-full bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 flex flex-col items-center justify-center px-6 text-center">
    <span className="font-serif text-2xl sm:text-3xl font-medium text-white">{title}</span>
    <span className="mt-2 type-caption text-slate-300 uppercase tracking-widest">Live Project</span>
  </div>
);

// --- Sub-Component: Project Card ---
const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  const imageUrl = getProjectImages(project.imageFolder)[0] || '';
  
  return (
    <div 
      className="group relative overflow-hidden rounded-[2.5rem] glass-surface glass-surface-hover shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-[transform,box-shadow,border-color,background-color] duration-500 hover:-translate-y-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-52 xs:h-56 sm:h-64 md:h-72 overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
        ) : (
          <ProjectCoverPlaceholder title={project.title} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-5 sm:p-8 md:p-10">
        <h2 className="type-card-title">{project.title}</h2>
        <p className="mt-3 type-muted line-clamp-2">{project.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="px-3 py-1 bg-white dark:bg-slate-800 type-label rounded-full border border-blue-100 dark:border-slate-700 shadow-sm">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 type-label text-blue-600 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-800/30 shadow-sm">
              +{project.technologies.length - 3} More
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  
  // Gallery State
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  // Helper to open the gallery from the details modal
  const openGallery = (folderName: string) => {
    const images = getProjectImages(folderName);
    if (images.length > 0) {
      setGalleryImages(images);
      setIsGalleryOpen(true);
    }
  };

  // Get current project's images for the preview in the modal
  const currentProjectImages = selectedProject ? getProjectImages(selectedProject.imageFolder) : [];
  const hasGallery = currentProjectImages.length > 0;

  return (
    <section id="projects" className="relative pb-24 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-24">
          <h1 className="type-section-title">
            My Projects
          </h1>
          <p className="type-section-lead px-4">
            Selected works and experiments that showcase my skills in development and problem-solving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>

      {/* --- MODAL 1: Project Details (Not Fullscreen) --- */}
      <AnimatedModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)}
        maxWidth="max-w-5xl"
      >
        {selectedProject && (
          <div className="flex flex-col md:flex-row md:min-h-[400px] md:h-[500px]">
            {/* Left: Image Preview (Clickable) */}
            <div 
              className={`relative w-full md:w-1/2 h-48 sm:h-56 md:h-auto bg-gray-100 dark:bg-gray-800 group overflow-hidden flex items-center justify-center shrink-0 ${hasGallery ? 'cursor-zoom-in' : ''}`}
              onClick={() => hasGallery && openGallery(selectedProject.imageFolder)}
            >
              {hasGallery ? (
                <img 
                  src={currentProjectImages[0]} 
                  alt={selectedProject.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <ProjectCoverPlaceholder title={selectedProject.title} />
              )}
              {hasGallery && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-black/70 text-white px-4 py-2 rounded-full type-caption backdrop-blur-sm flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                  View Gallery
                </span>
              </div>
              )}
            </div>

            {/* Right: Details */}
            <div className="w-full md:w-1/2 p-5 sm:p-8 flex flex-col bg-white dark:bg-gray-900 min-h-0">
              <h3 className="type-subsection-title mb-2">{selectedProject.title}</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.technologies.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 type-caption text-slate-700 dark:text-slate-300 rounded border border-gray-200 dark:border-gray-700">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="type-body mb-8 flex-grow overflow-y-auto">
                <p>{selectedProject.description}</p>
              </div>

              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
                {selectedProject.liveUrl !== '#' && (
                  <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl type-button hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                    Visit Site
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                )}
                {selectedProject.githubUrl !== '#' && (
                  <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white py-3 rounded-xl type-button hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    GitHub
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </AnimatedModal>

      {/* --- ADDED THIS SECTION BELOW --- */}
      <ProjectGalleryModal 
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={galleryImages}
      />

    </section>
  );
}