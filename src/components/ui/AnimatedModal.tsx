'use client';
import { useEffect, useRef } from 'react';
import MagneticButton from './MagneticButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  labelledBy?: string;
}

export default function AnimatedModal({ 
  isOpen, 
  onClose, 
  children, 
  maxWidth = 'max-w-4xl',
  labelledBy,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    if (isOpen) {
      previousActiveElementRef.current = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
      document.body.style.overflow = 'hidden';

      window.setTimeout(() => {
        const focusableElement = modalRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusableElement?.focus();
      }, 0);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      previousActiveElementRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !modalRef.current) {
        return;
      }

      const focusableElements = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.offsetParent !== null);

      if (focusableElements.length === 0) {
        event.preventDefault();
        modalRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/80 animate-fade-in"
          />

          {/* Modal Card */}
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            className={`relative w-full ${maxWidth} max-h-[95vh] sm:max-h-[90vh] overflow-hidden bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col z-10 animate-modal-enter`}
          >
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-20">
              <MagneticButton>
                <button
                  onClick={onClose}
                  className="p-3 rounded-full bg-slate-100/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-700 text-gray-800 dark:text-white transition-all shadow-sm hover:shadow-md backdrop-blur-sm group"
                  aria-label="Close modal"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="transition-transform group-hover:rotate-90 duration-300"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </MagneticButton>
            </div>

            <div className="overflow-y-auto h-full">
              {children}
            </div>
          </div>
        </div>
  );
}
