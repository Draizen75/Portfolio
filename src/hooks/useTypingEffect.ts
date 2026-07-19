import { useState, useEffect } from 'react';

/**
 * Custom hook for typing effect animation
 * 
 * @param texts - Array of texts to cycle through
 * @param typingSpeed - Speed of typing in milliseconds (default: 100)
 * @param deletingSpeed - Speed of deleting in milliseconds (default: 50)
 * @param pauseDuration - Duration to pause before deleting in milliseconds (default: 2000)
 * @param respectReducedMotion - Whether to show static text when reduced motion is preferred
 */
export function useTypingEffect(
  texts: string[],
  typingSpeed: number = 100,
  deletingSpeed: number = 50,
  pauseDuration: number = 2000,
  respectReducedMotion: boolean = true
): string {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    if (respectReducedMotion && prefersReducedMotion) {
      return;
    }

    const currentFullText = texts[currentTextIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (charIndex < currentFullText.length) {
          setCurrentText(currentFullText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Finished typing, wait before deleting
          setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      } else {
        // Deleting
        if (charIndex > 0) {
          setCurrentText(currentFullText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentTextIndex, texts, typingSpeed, deletingSpeed, pauseDuration, prefersReducedMotion, respectReducedMotion]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);

    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  return respectReducedMotion && prefersReducedMotion ? (texts[0] ?? '') : currentText;
}


