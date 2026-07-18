'use client';
import { useEffect } from 'react';
import MagneticButton from './MagneticButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function AnimatedModal({ 
  isOpen, 
  onClose, 
  children, 
  maxWidth = 'max-w-4xl' 
}: ModalProps) {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

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
            onClick={(e) => e.stopPropagation()}
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

            <div className="overflow-y-auto h-full hide-scrollbar">
              {children}
            </div>
          </div>
        </div>
  );
}
