import MagneticButton from './MagneticButton';
import { Dialog } from './dialog';

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

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => { if (!open) onClose(); }}
      ariaLabelledBy={labelledBy}
      className="fixed inset-0 z-50 m-0 flex max-h-none w-screen max-w-none items-end justify-center overflow-hidden border-0 bg-transparent p-0 sm:items-center sm:p-4 [&::backdrop]:bg-slate-900/80"
    >
      <div className={'relative z-10 flex max-h-[95vh] w-full ' + maxWidth + ' flex-col overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-2xl animate-modal-enter dark:border-slate-800 dark:bg-slate-900 sm:max-h-[90vh] sm:rounded-3xl'}>
        <div className="absolute right-4 top-4 z-20">
          <MagneticButton>
            <button type="button" onClick={onClose} className="group rounded-full bg-slate-100/80 p-3 text-gray-800 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md dark:bg-slate-800/80 dark:text-white dark:hover:bg-slate-700" aria-label="Close modal">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:rotate-90" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </MagneticButton>
        </div>
        <div className="h-full overflow-y-auto">{children}</div>
      </div>
    </Dialog>
  );
}
