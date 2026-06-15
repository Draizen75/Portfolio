import { lazy, Suspense, useCallback } from 'react';
import GridPattern from './components/common/GridPattern';
import Navigation from './components/navigation/Navigation';
import Hero from './components/hero/Hero';
import BackToTop from './components/backToTop/BackToTop';
import { ThemeProvider } from './contexts/ThemeContext';
import { useScrollDetection } from './hooks/useScrollDetection';
import { scrollToSection } from './utils/scrollUtils';

const About = lazy(() => import('./components/about/About'));
const Skills = lazy(() => import('./components/skills/Skills'));
const Projects = lazy(() => import('./components/projects/Projects'));
const Contact = lazy(() => import('./components/contact/Contact'));
const Footer = lazy(() => import('./components/footer/Footer'));

/**
 * Main App Component
 *
 * Orchestrates all portfolio sections and handles global navigation.
 * Below-the-fold sections are lazy-loaded to improve initial bundle size.
 */
export default function App() {
  const sections: string[] = ['home', 'about', 'skills', 'projects', 'contact'];
  const { activeSection, isScrolled, showBackToTop, setActiveSection } = useScrollDetection(sections);

  /**
   * Handles section navigation clicks
   *
   * @param sectionId - The ID of the section to navigate to
   */
  const handleSectionClick = useCallback((sectionId: string): void => {
    setActiveSection(sectionId);
    scrollToSection(sectionId);
  }, [setActiveSection]);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        <div className="fixed inset-0 z-0 bg-[var(--page-bg)]">
          <GridPattern />
        </div>
        <div className="relative z-10 bg-transparent">
          <Navigation
            activeSection={activeSection}
            isScrolled={isScrolled}
            onSectionClick={handleSectionClick}
          />
          <Hero onSectionClick={handleSectionClick} />
          <Suspense fallback={null}>
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
          </Suspense>
          <BackToTop isVisible={showBackToTop} />
        </div>
      </div>
    </ThemeProvider>
  );
}
