import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * Navigation Component
 * 
 * Displays the main navigation bar with smooth scrolling to sections.
 * Highlights the active section based on scroll position.
 * 
 * @param activeSection - The currently active section identifier
 * @param isScrolled - Boolean indicating if the page has been scrolled
 * @param onSectionClick - Callback function to handle section navigation clicks
 */
interface NavigationProps {
  activeSection: string;
  isScrolled: boolean;
  onSectionClick: (sectionId: string) => void;
}

const ThemeToggleButton = ({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) => (
  <button
    onClick={toggleTheme}
    className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
  >
    {theme === 'light' ? (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ) : (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )}
  </button>
);

export default function Navigation({ activeSection, isScrolled, onSectionClick }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  /**
   * Handles navigation link clicks
   * Prevents default behavior and scrolls to the target section
   */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string): void => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    onSectionClick(sectionId);
  };

  /**
   * Handles logo click to scroll to home section
   */
  const handleLogoClick = (): void => {
    setIsMobileMenuOpen(false);
    onSectionClick('home');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transform-gpu transition-all duration-200 ${
      isScrolled ? 'glass-chrome shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 cursor-pointer" onClick={handleLogoClick}>
            <span className="type-logo">Draizen</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`type-nav-link transition-colors ${
                  activeSection === item.id 
                    ? 'text-slate-900 dark:text-white' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          
          <div className="hidden md:flex items-center">
            <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-2 sm:ml-4 p-2.5 min-w-[44px] min-h-[44px] rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-chrome">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`block px-3 py-3 min-h-[44px] rounded-md type-nav-link ${
                  activeSection === item.id 
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};