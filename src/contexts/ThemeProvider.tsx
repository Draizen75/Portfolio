/**
 * Theme Provider
 *
 * Manages dark/light theme state and provides theme toggle functionality.
 */

import { useEffect, useLayoutEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import type { ReactNode } from 'react';
import { THEME_TRANSITION_MS } from '../constants/patternCraftBackgrounds';
import { ThemeContext, type Theme } from './themeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

interface BrowserViewTransition {
  finished: Promise<void>;
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => BrowserViewTransition;
};

/**
 * Enables short-lived color transitions on the document during theme changes.
 */
let themeTransitionTimeoutId = 0;

const startThemeTransition = (): void => {
  const root = document.documentElement;
  window.clearTimeout(themeTransitionTimeoutId);
  root.classList.add('theme-changing');
  themeTransitionTimeoutId = window.setTimeout(() => {
    root.classList.remove('theme-changing');
  }, THEME_TRANSITION_MS);
};

const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Provides theme state and toggle to descendant components.
 *
 * @param children - React nodes wrapped by the provider
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      return storedTheme;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme === 'dark' ? '#0a0a0f' : '#f8fafc');
    }
  }, [theme]);

  useEffect(() => {
    return () => {
      window.clearTimeout(themeTransitionTimeoutId);
      document.documentElement.classList.remove('theme-changing', 'theme-view-transition');
    };
  }, []);

  /**
   * Toggles between light and dark theme.
   */
  const toggleTheme = (): void => {
    const updateTheme = (): void => {
      flushSync(() => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
      });
    };

    const root = document.documentElement;
    const viewTransitionDocument = document as ViewTransitionDocument;

    if (prefersReducedMotion() || !viewTransitionDocument.startViewTransition) {
      startThemeTransition();
      updateTheme();
      return;
    }

    window.clearTimeout(themeTransitionTimeoutId);
    root.classList.remove('theme-changing');
    root.classList.add('theme-view-transition');

    const transition = viewTransitionDocument.startViewTransition(updateTheme);
    transition.finished.finally(() => {
      root.classList.remove('theme-view-transition');
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
