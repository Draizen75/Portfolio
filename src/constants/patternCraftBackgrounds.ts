/**
 * PatternCraft background styles for theme-aware page backgrounds.
 * Patterns sourced from https://patterncraft.fun/ (Effects category).
 */

import type { CSSProperties } from 'react';

/** Shared duration for theme crossfade (background + UI colors). */
export const THEME_TRANSITION_MS = 360;

export interface PatternCraftStyle {
  id: string;
  name: string;
  background: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundBlendMode?: string;
}

/** Light mode — Soft Morning Mist (tuned for slate/blue UI) */
export const lightPatternBackground: PatternCraftStyle = {
  id: 'soft-morning-mist',
  name: 'Soft Morning Mist',
  background: '#f8fafc',
  backgroundImage: `
    linear-gradient(135deg,
      rgba(248,250,252,1) 0%,
      rgba(219,234,254,0.55) 30%,
      rgba(191,219,254,0.35) 60%,
      rgba(165,180,252,0.3) 100%
    ),
    radial-gradient(circle at 20% 30%, rgba(255,255,255,0.7) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(199,210,254,0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(224,231,255,0.25) 0%, transparent 60%)
  `,
};

/** Dark mode — Cosmic Aurora (blue/indigo tuned to match accent palette) */
export const darkPatternBackground: PatternCraftStyle = {
  id: 'cosmic-aurora',
  name: 'Cosmic Aurora',
  background: '#0a0a0f',
  backgroundImage: `
    radial-gradient(ellipse at 20% 30%, rgba(59, 130, 246, 0.28) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 70%, rgba(99, 102, 241, 0.22) 0%, transparent 70%),
    radial-gradient(ellipse at 60% 20%, rgba(56, 189, 248, 0.18) 0%, transparent 50%),
    radial-gradient(ellipse at 40% 80%, rgba(30, 64, 175, 0.15) 0%, transparent 65%)
  `,
};

/**
 * Resolves the PatternCraft background for the active theme.
 *
 * @param theme - Current application theme
 * @returns Pattern style object for light or dark mode
 */
export const getPatternBackgroundForTheme = (theme: 'light' | 'dark'): PatternCraftStyle => {
  return theme === 'dark' ? darkPatternBackground : lightPatternBackground;
};

/**
 * Converts a PatternCraft style object into React inline style props.
 *
 * @param pattern - PatternCraft background definition
 * @returns Inline CSS properties for the background layer
 */
export const toPatternBackgroundStyle = (
  pattern: PatternCraftStyle
): CSSProperties => ({
  background: pattern.background,
  backgroundImage: pattern.backgroundImage,
  backgroundSize: pattern.backgroundSize,
  backgroundBlendMode: pattern.backgroundBlendMode as CSSProperties['backgroundBlendMode'],
});
