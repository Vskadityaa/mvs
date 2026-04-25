import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Full-height slide-in panel from the right + dimmed backdrop.
 * Closes on overlay tap, Escape, or after navigation.
 */
export function MobileDrawer({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200]" role="dialog" aria-modal="true" aria-label={title}>
          <motion.button
            type="button"
            aria-label="मेनू बंद करा"
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-[min(100vw-2.5rem,20rem)] flex-col border-l border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
              <span className="font-display text-sm font-semibold text-slate-900 dark:text-white">{title}</span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="बंद करा"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain py-2">{children}</div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/** Vertical three-dot (kebab) — opens site / nav panel without wrapping tabs in the header */
export function KebabMenuButton({ open, onClick, className = '' }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 ${
        open ? 'border-brand-400 bg-brand-50 text-brand-800 dark:border-brand-500 dark:bg-brand-950/50 dark:text-brand-100' : ''
      } ${className}`}
      aria-expanded={open}
      aria-label={open ? 'मेनू बंद करा' : 'साइट मेनू उघडा'}
      whileTap={{ scale: 0.95 }}
    >
      <span className="flex flex-col items-center gap-[5px]" aria-hidden>
        <span className="block h-1 w-1 rounded-full bg-current ring-1 ring-current/20 sm:h-1.5 sm:w-1.5" />
        <span className="block h-1 w-1 rounded-full bg-current ring-1 ring-current/20 sm:h-1.5 sm:w-1.5" />
        <span className="block h-1 w-1 rounded-full bg-current ring-1 ring-current/20 sm:h-1.5 sm:w-1.5" />
      </span>
    </motion.button>
  );
}

export function HamburgerButton({ open, onClick, className = '' }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 ${className}`}
      aria-expanded={open}
      aria-label={open ? 'मेनू बंद करा' : 'मेनू उघडा'}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="block h-0.5 w-5 rounded-full bg-current"
        animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-0.5 w-5 rounded-full bg-current"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="block h-0.5 w-5 rounded-full bg-current"
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
}
