/**
 * Scroll Utility Functions
 * 
 * Utility functions for handling scroll-related operations.
 */

// Flag to track if we're programmatically scrolling
let isScrollingProgrammatically = false;

/**
 * Scrolls smoothly to a target section element with offset for fixed navigation
 * 
 * @param sectionId - The ID of the section to scroll to
 */
export const scrollToSection = (sectionId: string): void => {
  const element: HTMLElement | null = document.getElementById(sectionId);
  if (element) {
    isScrollingProgrammatically = true;
    
    // Calculate the target position with offset for fixed navigation
    const offset = 80; // Account for fixed navigation height
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    // Use window.scrollTo for more control
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Reset the flag after scroll completes
    setTimeout(() => {
      isScrollingProgrammatically = false;
    }, 1000); // Adjust timeout based on scroll duration
  }
};

/**
 * Checks if we're currently scrolling programmatically
 * 
 * @returns true if scrolling programmatically, false otherwise
 */
export const isProgrammaticScroll = (): boolean => {
  return isScrollingProgrammatically;
};

/**
 * Determines which section is currently active based on scroll position
 * 
 * @param sections - Array of section IDs to check
 * @returns The ID of the currently active section, or empty string if none
 */
export const getActiveSection = (sections: string[]): string => {
  const scrollPosition: number = window.scrollY;
  const offset: number = 150; // Offset to account for fixed navigation

  // Check sections in reverse order (bottom to top) so the most recent section takes precedence
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i];
    const element: HTMLElement | null = document.getElementById(section);
    if (element) {
      const { offsetTop } = element;
      // If we've scrolled past this section's top (with offset), this is the active section
      if (scrollPosition + offset >= offsetTop) {
        return section;
      }
    }
  }

  // Fallback: return the first section if we're at the very top
  return sections[0] || '';
};


