'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export function EmailVerifiedBanner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (searchParams.get('verified') === '1') {
      setShow(true);
      // Clean the URL without triggering a navigation
      const url = new URL(window.location.href);
      url.searchParams.delete('verified');
      window.history.replaceState({}, '', url.toString());
      // Auto-dismiss after 8 seconds
      const timer = setTimeout(() => setShow(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!show) return null;

  return (
    <div className="
      fixed top-4 left-1/2 -translate-x-1/2 z-50
      max-w-md w-[calc(100%-2rem)]
      px-5 py-4
      bg-[var(--color-surface-raised)]
      border-2 border-[var(--color-confirmed)]
      rounded-[var(--radius-organic)]
      shadow-lg
      animate-in fade-in slide-in-from-top-2
      flex items-start gap-3
    ">
      <span className="flex-shrink-0 mt-0.5 text-[var(--color-confirmed)]">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 10l4 4 8-8" />
        </svg>
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-[var(--color-ink)]">Email verified</p>
        <p className="text-sm text-[var(--color-ink-muted)] mt-0.5">
          Your account is confirmed. Welcome to Quorum Tours.
        </p>
      </div>
      <button
        onClick={() => setShow(false)}
        className="flex-shrink-0 text-[var(--color-ink-subtle)] hover:text-[var(--color-ink)] transition-colors"
        aria-label="Dismiss"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </button>
    </div>
  );
}
