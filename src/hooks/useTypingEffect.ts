import { useState, useEffect } from 'react';

/**
 * Custom hook for typing effect animation
 * 
 * @param texts - Array of texts to cycle through
 * @param typingSpeed - Speed of typing in milliseconds (default: 100)
 * @param deletingSpeed - Speed of deleting in milliseconds (default: 50)
 * @param pauseDuration - Duration to pause before deleting in milliseconds (default: 2000)
 */
export function useTypingEffect(
  texts: string[],
  typingSpeed: number = 100,
  deletingSpeed: number = 50,
  pauseDuration: number = 2000
): string {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (texts.length === 0) return;

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
  }, [charIndex, isDeleting, currentTextIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return currentText;
}

