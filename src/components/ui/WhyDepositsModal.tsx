'use client';

import { useEffect } from 'react';

interface WhyDepositsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * WhyDepositsModal - Explains why deposits exist in the Quorum system
 *
 * Trust-focused explanation for older demographic (45-70).
 * Clear, honest, non-manipulative language.
 */
export function WhyDepositsModal({ isOpen, onClose }: WhyDepositsModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="why-deposits-title"
    >
      <div
        className="
          bg-[var(--color-surface-raised)]
          border-2 border-[var(--color-border)]
          rounded-[var(--radius-organic)]
          p-[var(--space-lg)]
          max-w-md w-full mx-4
          shadow-xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-[var(--space-md)]">
          <h2
            id="why-deposits-title"
            className="font-display text-xl font-semibold text-[var(--color-ink)]"
          >
            Why deposits?
          </h2>
          <button
            onClick={onClose}
            className="
              p-1 -m-1
              text-[var(--color-ink-muted)]
              hover:text-[var(--color-ink)]
              transition-colors
            "
            aria-label="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-[var(--space-md)]">
          {/* Main explanation */}
          <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
            Deposits help ensure tours actually run. When birders commit with a small
            deposit, operators can plan with confidence.
          </p>

          {/* Benefits list */}
          <div className="space-y-[var(--space-sm)]">
            <div className="flex gap-[var(--space-sm)]">
              <div className="
                flex-shrink-0 w-6 h-6
                bg-[var(--color-primary-subtle)]
                rounded-full
                flex items-center justify-center
                text-[var(--color-primary)]
              ">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-[var(--color-ink)]">
                  <strong className="font-medium">Applied to your total</strong>
                </p>
                <p className="text-xs text-[var(--color-ink-muted)]">
                  Your deposit is not extra—it's part of the tour price.
                </p>
              </div>
            </div>

            <div className="flex gap-[var(--space-sm)]">
              <div className="
                flex-shrink-0 w-6 h-6
                bg-[var(--color-primary-subtle)]
                rounded-full
                flex items-center justify-center
                text-[var(--color-primary)]
              ">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-[var(--color-ink)]">
                  <strong className="font-medium">Fully refunded if tour doesn't run</strong>
                </p>
                <p className="text-xs text-[var(--color-ink-muted)]">
                  If quorum isn't reached, you get 100% back automatically.
                </p>
              </div>
            </div>

            <div className="flex gap-[var(--space-sm)]">
              <div className="
                flex-shrink-0 w-6 h-6
                bg-[var(--color-primary-subtle)]
                rounded-full
                flex items-center justify-center
                text-[var(--color-primary)]
              ">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-[var(--color-ink)]">
                  <strong className="font-medium">Trust reduces deposits</strong>
                </p>
                <p className="text-xs text-[var(--color-ink-muted)]">
                  Complete tours reliably and your deposit percentage drops—even to zero.
                </p>
              </div>
            </div>
          </div>

          {/* Trust note */}
          <div className="
            p-[var(--space-sm)]
            bg-[var(--color-surface-sunken)]
            rounded-[var(--radius-sm)]
            border border-[var(--color-border)]
          ">
            <p className="text-xs text-[var(--color-ink-subtle)]">
              Deposits protect operators from no-shows while keeping your risk low.
              It's how Quorum makes specialized tours possible.
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="
            mt-[var(--space-lg)]
            w-full px-4 py-2.5
            text-sm font-medium
            text-[var(--color-ink)]
            bg-[var(--color-surface)]
            border-2 border-[var(--color-border)]
            rounded-[var(--radius-md)]
            hover:border-[var(--color-primary)]
            transition-colors
          "
        >
          Got it
        </button>
      </div>
    </div>
  );
}
