import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * High-Performance Interactive Background
 * 
 * Optimizations for Large/High-DPI Screens:
 * - Replaced heavy 'blur' filters with optimized gradients
 * - Added 'will-change' to promote layers to GPU compositing
 * - Reduced the size of noise textures to minimize paint cost
 * - Simplified spotlight calculation
 */
const GridPattern = React.memo(function GridPattern() {
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Very smooth springs with higher damping to reduce "jitter" on large screens
  const springConfig = { damping: 40, stiffness: 80 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const parallaxX = useTransform(springX, (val) => val * -1);
  const parallaxY = useTransform(springY, (val) => val * -1);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Optimize for anything below large laptop
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smoother updates on high-refresh monitors
      requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const x = (clientX / innerWidth) - 0.5;
        const y = (clientY / innerHeight) - 0.5;
        
        mouseX.set(x * 30);
        mouseY.set(y * 30);

        const spotX = (clientX / innerWidth) * 100;
        const spotY = (clientY / innerHeight) * 100;
        document.documentElement.style.setProperty('--mouse-x', `${spotX}%`);
        document.documentElement.style.setProperty('--mouse-y', `${spotY}%`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#FBFBFE] dark:bg-[#030303] transition-colors duration-700">
      
      {/* 1. Optimized Mesh Gradients (Using radial gradients instead of blur filters where possible) */}
      <div className="absolute inset-0 z-10 overflow-hidden opacity-30 dark:opacity-40 will-change-transform">
        {/* Orb 1: Primary Blue */}
        <motion.div 
          style={{ x: isMobile ? 0 : springX, y: isMobile ? 0 : springY }}
          className="absolute -top-[15%] -left-[10%] w-[80%] h-[80%] rounded-full bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.15),_transparent_70%)] dark:bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.08),_transparent_70%)] transform-gpu will-change-transform"
        />
        
        {/* Orb 2: Purple Accent */}
        {!isMobile && (
          <motion.div 
            style={{ x: parallaxX, y: parallaxY }}
            className="absolute top-[10%] -right-[15%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.1),_transparent_70%)] dark:bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.05),_transparent_70%)] transform-gpu will-change-transform"
          />
        )}
      </div>

      {/* 2. Parallax Grid Layer */}
      <motion.div 
        style={{ x: isMobile ? 0 : parallaxX, y: isMobile ? 0 : parallaxY, scale: isMobile ? 1 : 1.05 }}
        className="absolute inset-0 z-20 transform-gpu will-change-transform"
      >
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.5] dark:opacity-[0.2]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="premium-grid-ultra" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M.5 60V.5H60" fill="none" className="stroke-blue-500/50 dark:stroke-blue-400/30" strokeWidth="1" />
              <circle cx="0.5" cy="0.5" r="1.5" className="fill-blue-600/30 dark:fill-blue-400/20" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#premium-grid-ultra)" />
        </svg>
      </motion.div>

      {/* 3. Optimized Spotlight */}
      {!isMobile && (
        <div 
          className="absolute inset-0 z-30 pointer-events-none will-change-[background]"
          style={{
            background: `radial-gradient(1000px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.04), transparent 80%)`
          }}
        />
      )}

      {/* 4. Optimized Film Grain (Using a more efficient opacity and will-change) */}
      <div className="absolute inset-0 z-40 opacity-[0.015] dark:opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] transform-gpu will-change-transform" />

      {/* 5. Fixed Masking for smoother edges */}
      <div className="absolute inset-0 z-50 pointer-events-none bg-gradient-to-b from-[#FBFBFE]/20 via-transparent to-[#FBFBFE]/40 dark:from-transparent dark:to-black/40" />
    </div>
  );
});

export default GridPattern;