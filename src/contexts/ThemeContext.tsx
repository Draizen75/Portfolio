/**
 * Theme Context
 *
 * Manages dark/light theme state and provides theme toggle functionality.
 */

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { THEME_TRANSITION_MS } from '../constants/patternCraftBackgrounds';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Returns the current theme context values.
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Enables short-lived color transitions on the document during theme changes.
 */
const startThemeTransition = (): void => {
  const root = document.documentElement;
  root.classList.add('theme-changing');
  window.setTimeout(() => {
    root.classList.remove('theme-changing');
  }, THEME_TRANSITION_MS);
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const isFirstRender = useRef(true);
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

  useEffect(() => {
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

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    startThemeTransition();
  }, [theme]);

  /**
   * Toggles between light and dark theme.
   */
  const toggleTheme = (): void => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
