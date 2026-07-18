import { useRef } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable magnetic effect on touch devices to avoid sticky transforms
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(pointer: fine)').matches) {
      return;
    }
    
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    ref.current.style.transform = `translate3d(${middleX * 0.2}px, ${middleY * 0.2}px, 0)`;
  };

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate3d(0, 0, 0)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={`inline-block w-full xs:w-auto transition-transform duration-300 ease-out will-change-transform ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
