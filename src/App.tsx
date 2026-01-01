import Navigation from './components/navigation/Navigation';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Skills from './components/skills/Skills';
import Projects from './components/projects/Projects';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import BackToTop from './components/backToTop/BackToTop';
import { useScrollDetection } from './hooks/useScrollDetection';
import { scrollToSection } from './utils/scrollUtils';

/**
 * Main App Component
 * 
 * Orchestrates all portfolio sections and handles global navigation.
 * Uses custom hooks for scroll detection and utility functions for navigation.
 */
function App(): React.JSX.Element {
  const sections: string[] = ['home', 'about', 'skills', 'projects', 'contact'];
  const { activeSection, isScrolled } = useScrollDetection(sections);

  /**
   * Handles section navigation clicks
   * 
   * @param sectionId - The ID of the section to navigate to
   */
  const handleSectionClick = (sectionId: string): void => {
    scrollToSection(sectionId);
  };

  return (
    <div className="w-full min-h-screen bg-background-primary text-text-primary overflow-x-hidden">
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
  );
}

export default App;
