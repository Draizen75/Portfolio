/**
 * Scroll Utility Functions
 * 
 * Utility functions for handling scroll-related operations.
 */

/**
 * Scrolls smoothly to a target section element
 * 
 * @param sectionId - The ID of the section to scroll to
 */
export const scrollToSection = (sectionId: string): void => {
  const element: HTMLElement | null = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * Determines which section is currently active based on scroll position
 * 
 * @param sections - Array of section IDs to check
 * @returns The ID of the currently active section, or empty string if none
 */
export const getActiveSection = (sections: string[]): string => {
  const scrollPosition: number = window.scrollY + 100;

  for (const section of sections) {
    const element: HTMLElement | null = document.getElementById(section);
    if (element) {
      const { offsetTop, offsetHeight } = element;
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        return section;
      }
    }
  }

  return '';
};

