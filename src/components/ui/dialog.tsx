import { useEffect, useRef, type KeyboardEvent, type MouseEvent, type ReactNode, type SyntheticEvent } from 'react';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  className?: string;
  onKeyDown?: (event: KeyboardEvent<HTMLDialogElement>) => void;
}

/** Native modal dialog primitive: top-layer rendering, focus management and Escape handling. */
export function Dialog({ open, onOpenChange, children, ariaLabel, ariaLabelledBy, className = '', onKeyDown }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    onOpenChange(false);
  };

  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onOpenChange(false);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      onCancel={handleCancel}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      className={`${open ? '' : 'hidden'} ${className}`}
    >
      {children}
    </dialog>
  );
}
