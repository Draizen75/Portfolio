/**
 * Projects Component
 * 
 * Displays featured projects in a card layout with hover effects.
 * Each project shows image, title, description, and technologies used.
 */

interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

const Projects = (): React.JSX.Element => {
  const projects: Project[] = [
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
      title: 'YouTube Downloader',
      description:
        'A web application that allows users to download audio from YouTube videos. Built with Python and Flask, it features a clean and intuitive interface for easy video URL input. The application uses pytubefix library with anti-bot detection measures to ensure reliable downloads. Users can convert YouTube videos to MP3 format with just a few clicks.',
      technologies: ['Python', 'Flask', 'pytubefix'],
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

  /**
   * Renders a single project card
   * 
   * @param project - The project data object
   * @param index - The index of the project (used for alternating layout)
   */
  const renderProjectCard = (project: Project, index: number): React.JSX.Element => {
    const isReverse: boolean = index % 2 === 1;

    return (
      <div 
        key={index} 
        className={`flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center group w-full`}
        style={isReverse ? { direction: 'rtl' } : {}}
      >
        {/* Project Image */}
        <div 
          className="relative rounded-xl overflow-hidden w-full h-[200px] xs:h-[240px] sm:h-[280px] md:h-[320px] lg:h-[400px] group/image touch-manipulation"
          style={isReverse ? { direction: 'ltr' } : {}}
        >
          {/* Professional gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 via-accent-secondary/20 to-accent-primary/10 opacity-90 group-hover/image:opacity-100 group-active/image:opacity-100 transition-opacity duration-500"></div>
          
          {/* Overlay with links - visible on mobile touch */}
          <div className="absolute inset-0 professional-card flex items-center justify-center gap-4 sm:gap-6 md:gap-8 opacity-100 lg:opacity-0 lg:group-hover/image:opacity-100 transition-all duration-500 z-20 bg-white/95 backdrop-blur-sm">
            <a
              href={project.liveUrl}
              className="p-3 sm:p-4 md:p-5 bg-accent-primary/20 rounded-lg border-2 border-accent-primary text-accent-primary transition-all duration-300 active:bg-accent-primary active:text-white hover:bg-accent-primary hover:text-white hover-lift touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live`}
            >
              <svg width="24" height="24" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
            <a
              href={project.githubUrl}
              className="p-3 sm:p-4 md:p-5 bg-accent-primary/20 rounded-lg border-2 border-accent-primary text-accent-primary transition-all duration-300 active:bg-accent-primary active:text-white hover:bg-accent-primary hover:text-white hover-lift touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
            >
              <svg width="24" height="24" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            <p className="text-text-secondary text-xs sm:text-sm md:text-base font-mono whitespace-nowrap">Featured Project</p>
            <div className="flex-1 h-px bg-gradient-to-r from-accent-primary/30 to-transparent"></div>
          </div>
          
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary group-hover:text-accent-primary transition-colors duration-300 break-words">
            {project.title}
          </h3>
          
          <div className="professional-card p-4 sm:p-6 md:p-8 rounded-xl hover-lift">
            <p className="text-text-secondary leading-relaxed text-sm sm:text-base md:text-lg mb-4 sm:mb-6 break-words">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {project.technologies.map((tech, techIndex) => (
                <span 
                  key={techIndex} 
                  className="px-2 sm:px-3 py-1.5 sm:py-2 bg-accent-light text-accent-primary text-xs sm:text-sm md:text-base font-mono rounded border border-accent-primary/20 hover:bg-accent-primary/10 hover:border-accent-primary/40 active:bg-accent-primary/20 transition-all duration-300 touch-manipulation"
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
    <section id="projects" className="bg-background-secondary py-12 sm:py-16 md:py-20 lg:py-32 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            <span className="text-accent-primary font-mono text-lg sm:text-xl md:text-2xl lg:text-3xl mr-2 sm:mr-3">03.</span>
            My Projects
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-accent-primary/30 to-transparent"></div>
        </div>
        
        <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 lg:gap-24">
          {projects.map((project, index) => renderProjectCard(project, index))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
