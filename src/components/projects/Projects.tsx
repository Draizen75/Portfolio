/**
 * Projects Component
 * 
 * Displays featured projects in a card layout with hover effects.
 * Each project shows image, title, description, and technologies used.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { getProjectImages } from '../../utils/imageUtils';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  image?: string;
  images?: string[];
  imageFolder?: string; // Folder name to automatically load images from
}

const Projects = (): React.JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const projects: Project[] = [
    {
      title: 'SYD Commerce',
      description:
        'A modern e-commerce platform built to provide a seamless shopping experience. Features include product catalog, shopping cart, user authentication, and secure payment processing. Designed with a focus on user experience and performance.',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js'],
      liveUrl: 'https://sydcommerce.com',
      githubUrl: '#',
      imageFolder: 'sydcommerce', // Automatically loads all images from /images/sydcommerce/
    },
    {
      title: 'SYD POS',
      description:
        'A comprehensive Point of Sale (POS) system designed for businesses to manage sales, inventory, and transactions efficiently. Features real-time inventory tracking, sales reporting, and receipt generation.',
      technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
      liveUrl: 'https://sydpos.biz',
      githubUrl: '#',
      imageFolder: 'sydpos', // Automatically loads all images from /images/sydpos/
    },
    {
      title: 'QR Generator',
      description:
        'A web application that converts URLs into QR codes instantly. Built with Python and Flask, it provides a simple and efficient way to generate QR codes for any web link. Perfect for sharing links quickly and efficiently.',
      technologies: ['Python', 'Flask'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'Movie Recommendations System',
      description:
        'A web-based application that suggests personalized movie recommendations based on user preferences. Built with Python and Flask, it integrates with The Movie Database (TMDB) API to fetch comprehensive movie data and descriptions. The system uses collaborative filtering algorithms to analyze user behavior and provide accurate movie suggestions.',
      technologies: ['Python', 'Flask', 'TMDB API'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'Analyzing Customer Preferences of Bicycle parts from Shopee using Data Mining',
      description:
        'Undergraduate Thesis project that uses Streamlit, a powerful and user-friendly Python library for creating web applications. This project aims to uncover insights into customer behavior and preferences in the bicycle parts market on Shopee.',
      technologies: ['Python', 'Streamlit', 'Data Mining'],
      liveUrl: '#',
      githubUrl: '#',
    },
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

  // Get all images for the selected project
  const getAllProjectImages = (project: Project | null): string[] => {
    if (!project) return [];
    // First check if imageFolder is specified (automatic loading)
    if (project.imageFolder) {
      const folderImages = getProjectImages(project.imageFolder);
      if (folderImages.length > 0) return folderImages;
    }
    // Fall back to manually specified images
    if (project.images && project.images.length > 0) return project.images;
    if (project.image) return [project.image];
    return [];
  };

  const projectImages = getAllProjectImages(selectedProject);
  const hasMultipleImages = projectImages.length > 1;

  const goToNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => {
      if (projectImages.length > 0) {
        return (prev + 1) % projectImages.length;
      }
      return prev;
    });
  }, [projectImages.length]);

  const goToPreviousImage = useCallback(() => {
    setCurrentImageIndex((prev) => {
      if (projectImages.length > 0) {
        return (prev - 1 + projectImages.length) % projectImages.length;
      }
      return prev;
    });
  }, [projectImages.length]);

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Handle ESC key to close modal/fullscreen and arrow keys for image navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;

      if (e.key === 'Escape') {
        if (isFullscreen) {
          closeFullscreen();
        } else {
          closeModal();
        }
      } else if (hasMultipleImages && (isFullscreen || !isFullscreen)) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToPreviousImage();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          goToNextImage();
        }
      }
    };

    if (selectedProject) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setCurrentImageIndex(0); // Reset to first image when modal opens
    } else {
      document.body.style.overflow = 'unset';
      setCurrentImageIndex(0);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject, hasMultipleImages, isFullscreen, goToNextImage, goToPreviousImage]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current || !hasMultipleImages) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNextImage();
    } else if (distance < -minSwipeDistance) {
      goToPreviousImage();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    setIsFullscreen(false);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  /**
   * Renders a single project card
   * 
   * @param project - The project data object
   * @param index - The index of the project (used for alternating layout)
   */
  const renderProjectCard = (project: Project, index: number): React.JSX.Element => {
    const isReverse: boolean = index % 2 === 1;
    const projectImages = getAllProjectImages(project);
    const firstImage = projectImages.length > 0 ? projectImages[0] : null;

    return (
      <div 
        key={index} 
        className={`flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center group w-full transition-all duration-700 cursor-pointer ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ 
          transitionDelay: `${index * 150}ms`
        }}
        onClick={() => openModal(project)}
      >
        {/* Project Image */}
        <div 
          className="relative rounded-xl overflow-hidden w-full h-[200px] xs:h-[240px] sm:h-[280px] md:h-[320px] lg:h-[400px] group/image touch-manipulation bg-background-secondary"
          style={isReverse ? { direction: 'ltr' } : {}}
        >
          {/* Project Image or Placeholder */}
          {firstImage ? (
            <img 
              src={firstImage} 
              alt={project.title}
              className="w-full h-full object-contain transition-transform duration-300 group-hover/image:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-accent-primary/5 transition-opacity duration-300"></div>
          )}
          
          {/* Overlay with links - hidden on mobile, visible on hover for desktop */}
          <div className="absolute inset-0 bg-white/98 backdrop-blur-sm flex items-center justify-center gap-4 sm:gap-6 md:gap-8 opacity-0 lg:opacity-0 lg:group-hover/image:opacity-100 transition-all duration-300 z-20 pointer-events-none lg:pointer-events-auto">
            <a
              href={project.liveUrl}
              onClick={(e) => e.stopPropagation()}
              className="p-3 sm:p-4 md:p-5 bg-accent-primary text-white rounded-lg transition-all duration-200 active:bg-accent-hover hover:bg-accent-hover hover-lift touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center shadow-sm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live`}
            >
              <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
            <a
              href={project.githubUrl}
              onClick={(e) => e.stopPropagation()}
              className="p-3 sm:p-4 md:p-5 bg-accent-primary text-white rounded-lg transition-all duration-200 active:bg-accent-hover hover:bg-accent-hover hover-lift touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center shadow-sm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
            >
              <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Project Content */}
        <div 
          className="w-full space-y-3 sm:space-y-4 relative z-10"
          style={isReverse ? { direction: 'ltr' } : {}}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <p className="text-text-muted dark:text-gray-300 text-xs sm:text-sm md:text-base font-mono whitespace-nowrap">Featured Project</p>
            <div className="flex-1 h-px bg-border-default dark:bg-gray-700"></div>
          </div>
          
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary dark:text-white group-hover:text-accent-primary transition-colors duration-300 break-words">
            {project.title}
          </h3>
          
          <div className="professional-card p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl hover-lift">
            <p className="text-text-secondary dark:text-gray-200 leading-relaxed text-sm sm:text-base md:text-lg mb-4 sm:mb-5 md:mb-6 break-words">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {project.technologies.map((tech, techIndex) => (
                <span 
                  key={techIndex} 
                  className="px-2.5 sm:px-3 md:px-4 py-1.5 bg-background-secondary dark:bg-gray-700 text-text-secondary dark:text-gray-200 text-xs sm:text-sm md:text-base font-medium rounded-md border border-border-default dark:border-gray-600 hover:border-border-light dark:hover:border-gray-500 hover:bg-background-tertiary dark:hover:bg-gray-600 active:bg-background-tertiary dark:active:bg-gray-600 transition-all duration-200 touch-manipulation break-words"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="bg-background-secondary dark:bg-gray-800 py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary dark:text-white break-words">
            My Projects
          </h2>
          <div className="flex-1 h-px bg-border-default"></div>
        </div>
        
        <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 lg:gap-20">
          {projects.map((project, index) => renderProjectCard(project, index))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[1100] flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-hidden"
          onClick={closeModal}
        >
          <div 
              className="relative bg-background-primary dark:bg-gray-800 rounded-none sm:rounded-2xl shadow-2xl max-w-4xl w-full h-full sm:h-auto sm:max-h-[90vh] flex flex-col animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Inside modal, top right */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-[1200] w-10 h-10 rounded-full bg-background-secondary dark:bg-gray-700 hover:bg-background-tertiary dark:hover:bg-gray-600 flex items-center justify-center transition-colors duration-200 shadow-lg"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6 text-text-primary dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content - Scrollable on mobile */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10 pt-12 sm:pt-6">
              {/* Project Images Carousel */}
              {projectImages.length > 0 && (
                <div 
                  className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-6 bg-background-secondary dark:bg-gray-700"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Image Container */}
                  <div className="relative w-full h-full">
                    {projectImages.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 cursor-pointer ${
                          index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          openFullscreen();
                        }}
                      >
                        <img 
                          src={image} 
                          alt={`${selectedProject.title} - Image ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Navigation Buttons - Only show if multiple images */}
                  {hasMultipleImages && (
                    <>
                      {/* Previous Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          goToPreviousImage();
                        }}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-200 shadow-lg touch-manipulation"
                        aria-label="Previous image"
                      >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>

                      {/* Next Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          goToNextImage();
                        }}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-200 shadow-lg touch-manipulation"
                        aria-label="Next image"
                      >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Image Indicators/Dots */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                        {projectImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              goToImage(index);
                            }}
                            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-200 touch-manipulation ${
                              index === currentImageIndex 
                                ? 'bg-white w-6 sm:w-8' 
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                            aria-current={index === currentImageIndex ? 'true' : 'false'}
                          />
                        ))}
                      </div>

                      {/* Image Counter */}
                      <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-black/50 text-white text-xs sm:text-sm font-medium">
                        {currentImageIndex + 1} / {projectImages.length}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Project Title */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary dark:text-white mb-4 break-words">
                {selectedProject.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary dark:text-gray-200 leading-relaxed text-base sm:text-lg md:text-xl mb-6 break-words">
                {selectedProject.description}
              </p>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-sm sm:text-base font-semibold text-text-muted dark:text-gray-300 uppercase tracking-wide mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {selectedProject.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="px-3 sm:px-4 py-2 bg-background-secondary dark:bg-gray-700 text-text-secondary dark:text-gray-200 text-sm sm:text-base font-medium rounded-md border border-border-default dark:border-gray-600 break-words"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-border-default dark:border-gray-700">
                {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-lg font-semibold transition-all duration-200 hover:bg-accent-hover hover-lift shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Visit Live Site</span>
                  </a>
                )}
                {selectedProject.githubUrl && selectedProject.githubUrl !== '#' && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-background-secondary dark:bg-gray-700 text-text-primary dark:text-white rounded-lg font-semibold border border-border-default dark:border-gray-600 transition-all duration-200 hover:bg-background-tertiary dark:hover:bg-gray-600 hover-lift"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <span>View Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Viewer */}
      {isFullscreen && selectedProject && projectImages.length > 0 && (
        <div 
          className="fixed inset-0 z-[1200] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeFullscreen}
        >
          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 z-[1300] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-200 shadow-lg backdrop-blur-sm"
            aria-label="Close fullscreen"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Fullscreen Image Container */}
          <div 
            className="relative w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Image */}
            <img 
              src={projectImages[currentImageIndex]} 
              alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Navigation Buttons - Only show if multiple images */}
            {hasMultipleImages && (
              <>
                {/* Previous Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPreviousImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-[1300] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 shadow-lg backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Next Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-[1300] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 shadow-lg backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image Indicators/Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1300] flex gap-2">
                  {projectImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToImage(index);
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                        index === currentImageIndex 
                          ? 'bg-white w-8' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Image Counter */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1300] px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  {currentImageIndex + 1} / {projectImages.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
