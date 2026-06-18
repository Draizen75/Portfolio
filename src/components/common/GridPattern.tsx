import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import {
  darkPatternBackground,
  lightPatternBackground,
  THEME_TRANSITION_MS,
  toPatternBackgroundStyle,
} from '../../constants/patternCraftBackgrounds';

const layerTransitionClass = 'pattern-layer absolute inset-0 transition-opacity ease-in-out';

/**
 * Theme-aware background using PatternCraft Effects patterns.
 * Crossfades two layers via opacity for GPU-friendly theme transitions.
 * Light: Soft Morning Mist | Dark: Cosmic Aurora
 * @see https://patterncraft.fun/
 */
const GridPattern = React.memo(function GridPattern() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden [contain:strict]" aria-hidden="true">
      <div
        className={layerTransitionClass}
        style={{
          ...toPatternBackgroundStyle(lightPatternBackground),
          opacity: isDark ? 0 : 1,
          transitionDuration: `${THEME_TRANSITION_MS}ms`,
        }}
        data-pattern-id={lightPatternBackground.id}
        data-pattern-name={lightPatternBackground.name}
      />
      <div
        className={layerTransitionClass}
        style={{
          ...toPatternBackgroundStyle(darkPatternBackground),
          opacity: isDark ? 1 : 0,
          transitionDuration: `${THEME_TRANSITION_MS}ms`,
        }}
        data-pattern-id={darkPatternBackground.id}
        data-pattern-name={darkPatternBackground.name}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent dark:from-slate-950/20 dark:via-transparent dark:to-slate-950/40" />
    </div>
  );
});

export default GridPattern;
