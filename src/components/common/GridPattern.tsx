import React from 'react';

const GridPattern = React.memo(function GridPattern() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            {/* FIX: 
                - Light Mode: stroke-gray-300 (Visible Gray lines on white)
                - Dark Mode: stroke-gray-800/60 (Subtle Dark lines)
            */}
            <path
              d="M.5 40V.5H40"
              fill="none"
              className="stroke-blue-300 dark:stroke-gray-800/60" 
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
      
      {/* Gradient Masks (Optional: remove these if you want the grid EVERYWHERE without fading) */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent dark:from-black/80 dark:via-transparent dark:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-transparent dark:from-black/80 dark:via-transparent dark:to-transparent" />
    </div>
  );
});

export default GridPattern;