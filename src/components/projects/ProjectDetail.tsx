import { useState, useEffect } from 'react';
import { getProjectImages } from '../../utils/imageUtils';
import type { PortfolioProject } from '../../data/projectsData';
import ProjectCoverArt from './ProjectCoverArt';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';

interface ProjectDetailProps {
  project: PortfolioProject;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const projectImages = getProjectImages(project.imageFolder);
  const hasGallery = projectImages.length > 0;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) goToNextImage();
    if (isRightSwipe) goToPrevImage();
  };

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

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') goToNextImage();
      if (e.key === 'ArrowLeft') goToPrevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, currentImageIndex, projectImages.length]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 } // removed initial delay
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 25 } }
  };

  return (
    <>
      <div className="flex flex-col bg-white dark:bg-slate-900 rounded-b-2xl sm:rounded-b-[2.5rem] overflow-hidden">
        {/* Top: Image Preview & Gallery within Mockup Frame */}
        <div className="relative w-full bg-slate-50 dark:bg-slate-950/40 p-4 sm:p-6 md:p-8 flex items-center justify-center border-b border-slate-100 dark:border-slate-800/50">
          <div className="w-full max-w-4xl rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden bg-white dark:bg-slate-900 flex flex-col">
            {/* Mockup Browser/App Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-850 select-none">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-400 dark:bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-500/60" />
              </div>
              <div className="mx-4 bg-white/70 dark:bg-slate-950/30 rounded-md py-0.5 px-6 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-mono text-center tracking-wide truncate max-w-xs md:max-w-md w-full">
                {project.liveUrl !== '#' ? project.liveUrl.replace('https://', '') : `localhost:3000/${project.imageFolder}`}
              </div>
              <div className="w-12 shrink-0" /> {/* Spacer */}
            </div>

            {/* Mockup Viewport Area */}
            <div className="relative aspect-[16/10] bg-slate-100/50 dark:bg-slate-850/40 overflow-hidden flex items-center justify-center">
              {hasGallery ? (
                <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4">
                  <img
                    key={currentImageIndex}
                    src={projectImages[currentImageIndex]}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain rounded-lg cursor-zoom-in hover:scale-[1.01] transition-transform duration-300 select-none"
                    onClick={() => setIsLightboxOpen(true)}
                    draggable={false}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    decoding="async"
                  />
                  {projectImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); goToPrevImage(); }}
                        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/75 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10 text-slate-800 dark:text-white hover:bg-white dark:hover:bg-black/60 hover:scale-105 transition-all shadow-md"
                        aria-label="Previous image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); goToNextImage(); }}
                        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/75 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10 text-slate-800 dark:text-white hover:bg-white dark:hover:bg-black/60 hover:scale-105 transition-all shadow-md"
                        aria-label="Next image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/80 dark:bg-black/50 backdrop-blur-md border border-black/5 dark:border-white/10 text-slate-800 dark:text-white text-[10px] font-bold rounded-full tracking-widest shadow-sm pointer-events-none">
                        {currentImageIndex + 1} / {projectImages.length}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="w-full h-full p-0">
                  <div className="w-full h-full">
                    <ProjectCoverArt title={project.title} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom: Redone 2-Column Split Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full p-6 sm:p-10 md:p-12 bg-white dark:bg-slate-900"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column (2/3 width) - Case Study Details */}
            <div className="lg:col-span-8 flex flex-col space-y-8 text-left">
              <motion.div variants={itemVariants}>
                <span className="type-eyebrow mb-2 block">Case Study</span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-950 dark:text-white tracking-tight mb-4">
                  {project.title}
                </h3>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Overview
                </h4>
                <div className="type-body text-slate-700 dark:text-slate-350 text-base sm:text-lg leading-relaxed max-w-3xl">
                  <p>{project.description}</p>
                </div>
              </motion.div>

              {project.highlights && project.highlights.length > 0 && (
                <motion.div variants={itemVariants} className="pt-2">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4">
                    Key Features & Highlights
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-1 shrink-0 p-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md border border-blue-100/50 dark:border-blue-800/30">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="type-body text-sm sm:text-base text-slate-700 dark:text-slate-300">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Right Column (1/3 width) - Project Specs & CTAs */}
            <div className="lg:col-span-4 flex flex-col space-y-6">
              
              {/* Specs & CTAs Card */}
              <motion.div 
                variants={itemVariants} 
                className="glass-surface p-6 sm:p-8 rounded-2xl flex flex-col space-y-6 text-left"
              >
                <div>
                  <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-4">
                    Project Information
                  </h4>
                  <div className="space-y-4">
                    {project.category && (
                      <div className="flex justify-between items-center text-sm py-1 border-b border-slate-100 dark:border-slate-800/50">
                        <span className="font-medium text-slate-500 dark:text-slate-400">Type</span>
                        <span className="font-semibold text-slate-900 dark:text-slate-200">{project.category}</span>
                      </div>
                    )}
                    {project.duration && (
                      <div className="flex justify-between items-center text-sm py-1 border-b border-slate-100 dark:border-slate-800/50">
                        <span className="font-medium text-slate-500 dark:text-slate-400">Duration</span>
                        <span className="font-semibold text-slate-900 dark:text-slate-200">{project.duration}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {project.liveUrl !== '#' && (
                    <MagneticButton>
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 sm:py-3.5 px-5 rounded-xl text-sm sm:text-base font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
                      >
                        Visit Site
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px]"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                      </a>
                    </MagneticButton>
                  )}
                  {project.githubUrl !== '#' && (
                    <MagneticButton>
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full flex items-center justify-center gap-2 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white py-2.5 sm:py-3 px-5 rounded-xl text-sm sm:text-base font-semibold hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                      >
                        GitHub
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px]"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      </a>
                    </MagneticButton>
                  )}
                </div>

                <div>
                  <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-3">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-md border border-slate-200/50 dark:border-slate-700/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            </div>
            
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox Overlay */}
      <AnimatePresence>
        {isLightboxOpen && hasGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button 
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
              aria-label="Close fullscreen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            {projectImages.length > 1 && (
              <>
                {/* Desktop Side Navigation */}
                <button
                  onClick={(e) => { e.stopPropagation(); goToPrevImage(); }}
                  className="hidden sm:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-transparent hover:bg-white/10 text-white/70 hover:text-white transition-all hover:scale-110"
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goToNextImage(); }}
                  className="hidden sm:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-transparent hover:bg-white/10 text-white/70 hover:text-white transition-all hover:scale-110"
                  aria-label="Next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>

                {/* Bottom Bar: Counter */}
                <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center z-50 w-full pointer-events-none">
                  <div className="px-5 py-2 bg-black/60 backdrop-blur-md text-white text-sm font-bold rounded-full tracking-widest shadow-lg border border-white/10 pointer-events-auto">
                    {currentImageIndex + 1} / {projectImages.length}
                  </div>
                </div>
              </>
            )}

            <img
              key={`lightbox-${currentImageIndex}`}
              src={projectImages[currentImageIndex]}
              alt={`${project.title} - Fullscreen`}
              className="max-w-[95vw] sm:max-w-[calc(100vw-160px)] max-h-[85vh] sm:max-h-[90vh] object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] cursor-zoom-out select-none"
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(false);
              }}
              draggable={false}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              decoding="async"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
