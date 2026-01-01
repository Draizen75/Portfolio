import { useState } from 'react';

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

const Navigation = ({ activeSection, isScrolled, onSectionClick }: NavigationProps): React.JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

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

  /**
   * Toggles mobile menu
   */
  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] py-3 sm:py-3.5 md:py-4 transition-all duration-300 ${
      isScrolled 
        ? 'professional-card shadow-lg bg-white/95 backdrop-blur-md' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center">
        <div 
          className="cursor-pointer group touch-manipulation"
          onClick={handleLogoClick}
        >
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-text-primary transition-all duration-300 group-hover:text-accent-primary group-active:text-accent-primary">
            Portfolio
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-4 lg:gap-6 list-none m-0 p-0">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`text-sm lg:text-base font-medium text-text-secondary relative transition-all duration-300 no-underline py-2 px-1 touch-manipulation ${
                  activeSection === item.id 
                    ? 'text-accent-primary' 
                    : 'hover:text-accent-primary'
                }`}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                <span className="relative z-10">{item.label}</span>
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-primary rounded-full"></span>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2.5 sm:p-3 text-text-primary hover:text-accent-primary active:text-accent-primary transition-colors duration-300 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 professional-card shadow-lg bg-white transition-all duration-300 max-h-[calc(100vh-60px)] overflow-y-auto ${
        isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <ul className="flex flex-col list-none m-0 p-3 sm:p-4 space-y-1 sm:space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`flex items-center py-3 sm:py-3.5 px-4 sm:px-5 text-base sm:text-lg font-medium rounded-lg transition-all duration-300 touch-manipulation min-h-[44px] ${
                  activeSection === item.id 
                    ? 'text-accent-primary bg-accent-light' 
                    : 'text-text-secondary active:text-accent-primary active:bg-accent-light/50 hover:text-accent-primary hover:bg-accent-light/50'
                }`}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;


