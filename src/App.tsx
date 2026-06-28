import { lazy, Suspense, useCallback, useEffect } from 'react';
import GridPattern from './components/common/GridPattern';
import Navigation from './components/navigation/Navigation';
import Hero from './components/hero/Hero';
import BackToTop from './components/backToTop/BackToTop';
import StructuredData from './components/seo/StructuredData';
import { ThemeProvider } from './contexts/ThemeProvider';
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

  useEffect(() => {
    // Dismiss preloader once the App mounts
    if (typeof window !== 'undefined' && (window as any).dismissPreloader) {
      (window as any).dismissPreloader();
    }
  }, []);

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
      <StructuredData />
      <a
        href="#home"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault();
          handleSectionClick('home');
        }}
      >
        Skip to main content
      </a>
      <div className="relative min-h-screen overflow-x-hidden">
        <div className="fixed inset-0 z-0 bg-[var(--page-bg)]" aria-hidden="true">
          <GridPattern />
        </div>
        <div className="relative z-10 bg-transparent">
          <Navigation
            activeSection={activeSection}
            isScrolled={isScrolled}
            onSectionClick={handleSectionClick}
          />
          <main id="main-content">
            <Hero onSectionClick={handleSectionClick} />
            <Suspense fallback={null}>
              <About />
              <Skills />
              <Projects />
              <Contact />
              <Footer />
            </Suspense>
          </main>
          <BackToTop isVisible={showBackToTop} />
        </div>
      </div>
    </ThemeProvider>
  );
}
