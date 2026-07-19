import { useState } from 'react';
import { FileUser } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

/**
 * Navigation Component
 * 
 * Displays the main navigation bar with smooth scrolling to sections.
 * Highlights the active section based on scroll position.
 * Renders a sliding background indicator under active navigation links.
 * Renders a fixed scroll progress bar at the very top of the window.
 */
interface NavigationProps {
  activeSection: string;
  isScrolled: boolean;
  onSectionClick: (sectionId: string) => void;
}

const ThemeToggleButton = ({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) => (
  <button
    onClick={toggleTheme}
    className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-[background-color,color,box-shadow,border-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 active:scale-95"
    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
  >
    <svg
      className={`absolute w-6 h-6 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-45 scale-75'}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
    <svg
      className={`absolute w-6 h-6 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-45 scale-75'}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  </button>
);

const ResumeButton = () => (
  <a
    href="/Martirez_Resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="relative w-10 h-10 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-[background-color,color,box-shadow,border-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 active:scale-95"
    aria-label="View resume"
    title="View resume"
  >
    <FileUser className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
  </a>
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transform-gpu border-b transition-[background-color,backdrop-filter,border-color,box-shadow,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled
        ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-slate-200/60 dark:border-slate-900/70 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.35)] py-2.5 sm:py-3'
        : 'bg-transparent backdrop-blur-0 border-transparent shadow-none py-4 sm:py-5'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              handleLogoClick();
            }}
            className="flex-shrink-0 type-logo"
            aria-label="Draizen — go to home"
          >
            Draizen
          </a>

          {/* Desktop Navigation - sliding active pill */}
          <div className="hidden md:flex items-center space-x-1.5 bg-slate-100/50 dark:bg-slate-900/35 p-1 rounded-full border border-slate-200/40 dark:border-slate-800/40 backdrop-blur-sm relative">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative px-4 py-2 rounded-full type-nav-link transition-colors duration-300 z-10 select-none ${activeSection === item.id
                    ? 'text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                {item.label}
                <span
                  className={`absolute inset-0 bg-white dark:bg-slate-800 rounded-full -z-10 shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-none border border-slate-200/10 dark:border-slate-700/20 transition-opacity duration-300 ${activeSection === item.id ? 'opacity-100' : 'opacity-0'
                    }`}
                />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-1">
            <ResumeButton />
            <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ResumeButton />
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
        <div className="md:hidden border-t border-slate-200/40 bg-white/90 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-950/90">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`block px-3 py-3 min-h-[44px] rounded-md type-nav-link ${activeSection === item.id
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
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
}
