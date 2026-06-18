import { useState } from 'react';
import { getProjectImages } from '../../utils/imageUtils';
import type { PortfolioProject } from '../../data/projectsData';
import ProjectCoverArt from './ProjectCoverArt';

interface ProjectDetailProps {
  project: PortfolioProject;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const projectImages = getProjectImages(project.imageFolder);
  const hasGallery = projectImages.length > 0;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === projectImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? projectImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col md:flex-row md:min-h-[400px] md:h-[500px] bg-white dark:bg-gray-900 rounded-b-[2.5rem] overflow-hidden">
      {/* Left: Image Preview & Gallery */}
      <div className="relative w-full md:w-1/2 h-56 sm:h-64 md:h-auto bg-gray-100 dark:bg-gray-800 group overflow-hidden flex items-center justify-center shrink-0">
        {hasGallery ? (
          <>
            <img
              src={projectImages[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-contain transition-opacity duration-300"
            />
            {projectImages.length > 1 && (
              <>
                <button
                  onClick={goToPrevImage}
                  className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button
                  onClick={goToNextImage}
                  className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
                  aria-label="Next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white text-xs rounded-full">
                  {currentImageIndex + 1} / {projectImages.length}
                </div>
              </>
            )}
          </>
        ) : (
          <ProjectCoverArt title={project.title} />
        )}
      </div>

      {/* Right: Details */}
      <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col min-h-0">
        <h3 className="type-subsection-title mb-2">{project.title}</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 type-caption text-slate-700 dark:text-slate-300 rounded border border-gray-200 dark:border-gray-700">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="type-body mb-8 flex-grow overflow-y-auto">
          <p>{project.description}</p>
        </div>

        <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
          {project.liveUrl !== '#' && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl type-button hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
              Visit Site
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          )}
          {project.githubUrl !== '#' && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white py-3 rounded-xl type-button hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              GitHub
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
