import { useCallback } from 'react';
import GridPattern from './components/common/GridPattern';
import Navigation from './components/navigation/Navigation';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Skills from './components/skills/Skills';
import Projects from './components/projects/Projects';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import BackToTop from './components/backToTop/BackToTop';
import { ThemeProvider } from './contexts/ThemeContext';
import { useScrollDetection } from './hooks/useScrollDetection';
import { scrollToSection } from './utils/scrollUtils';

/**
 * Main App Component
 * 
 * Orchestrates all portfolio sections and handles global navigation.
 * Uses custom hooks for scroll detection and utility functions for navigation.
 */
export default function App() {
  const sections: string[] = ['home', 'about', 'skills', 'projects', 'contact'];
  const { activeSection, isScrolled, setActiveSection } = useScrollDetection(sections);

  /**
   * Handles section navigation clicks
   * 
   * @param sectionId - The ID of the section to navigate to
   */
  const handleSectionClick = useCallback((sectionId: string): void => {
    // Immediately set the active section when clicking navigation
    setActiveSection(sectionId);
    scrollToSection(sectionId);
  }, [setActiveSection]);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[#FBFBFE] dark:bg-black transition-colors duration-300">
        <div className="fixed inset-0 z-0">
          <GridPattern />
        </div>
        <div className="relative z-10 bg-transparent">
          <Navigation
            activeSection={activeSection}
            isScrolled={isScrolled}
            onSectionClick={handleSectionClick}
          />
          <Hero onSectionClick={handleSectionClick} />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
          <BackToTop />
        </div>
      </div>
    </ThemeProvider>
  );
}