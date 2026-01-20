'use client';

import { useState } from 'react';

interface MagicLinkOptionProps {
  onSubmit?: (email: string) => void;
}

/**
 * MagicLinkOption - Passwordless sign-in alternative
 *
 * Addresses OP-8 (Technology Frustration):
 * - No password to remember
 * - Simple one-click flow
 * - Clear success messaging
 *
 * UI Shell: No actual email sending implemented.
 */
export function MagicLinkOption({ onSubmit }: MagicLinkOptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call (UI shell only)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    setIsSubmitted(true);
    onSubmit?.(email);
  };

  // Success state
  if (isSubmitted) {
    return (
      <div
        className="
          p-[var(--space-md)]
          bg-[var(--color-confirmed-bg)]
          border border-[var(--color-confirmed)]
          rounded-[var(--radius-md)]
          text-center
        "
      >
        <div className="flex justify-center mb-[var(--space-sm)]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-confirmed)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <p className="text-[var(--text-sm)] font-medium text-[var(--color-confirmed)]">
          Check your inbox
        </p>
        <p className="text-[var(--text-sm)] text-[var(--color-ink-muted)] mt-[var(--space-xs)]">
          We sent a sign-in link to {email}
        </p>
        <button
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            setEmail('');
          }}
          className="
            mt-[var(--space-md)]
            text-[var(--text-sm)]
            text-[var(--color-accent)]
            hover:underline
            focus:outline-none focus:underline
          "
        >
          Use a different email
        </button>
      </div>
    );
  }

  // Collapsed state - show button
  if (!isExpanded) {
    return (
      <button
        type="button"
        onClick={() => setIsExpanded(true)}
        className="
          w-full
          h-12
          px-[var(--space-md)]
          flex items-center justify-center gap-[var(--space-sm)]
          text-[var(--text-base)]
          text-[var(--color-ink)]
          bg-[var(--color-surface)]
          border border-[var(--color-border)]
          rounded-[var(--radius-md)]
          hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]
          focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-1
          transition-colors duration-[var(--transition-normal)]
        "
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
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
        Email me a sign-in link
      </button>
    );
  }

  // Expanded state - show email input form
  return (
    <form onSubmit={handleSubmit} className="space-y-[var(--space-md)]">
      <div>
        <p className="text-[var(--text-sm)] text-[var(--color-ink-muted)] mb-[var(--space-sm)]">
          We&apos;ll send a one-time link to your email. No password needed.
        </p>
        <label htmlFor="magic-link-email" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="magic-link-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="
            w-full
            h-12
            px-[var(--space-md)]
            text-[var(--text-base)]
            text-[var(--color-ink)]
            bg-[var(--color-surface)]
            border border-[var(--color-border)]
            rounded-[var(--radius-md)]
            focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-1
            hover:border-[var(--color-border-strong)]
            transition-colors duration-[var(--transition-fast)]
          "
        />
      </div>

      <div className="flex gap-[var(--space-sm)]">
        <button
          type="button"
          onClick={() => setIsExpanded(false)}
          className="
            flex-1
            h-12
            px-[var(--space-md)]
            text-[var(--text-sm)]
            text-[var(--color-ink-muted)]
            bg-[var(--color-surface)]
            border border-[var(--color-border)]
            rounded-[var(--radius-md)]
            hover:border-[var(--color-border-strong)]
            focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-1
            transition-colors duration-[var(--transition-fast)]
          "
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!email || isLoading}
          className="
            flex-1
            h-12
            px-[var(--space-md)]
            text-[var(--text-sm)]
            font-medium
            text-white
            bg-[var(--color-accent)]
            rounded-[var(--radius-md)]
            hover:bg-[var(--color-accent-hover)]
            focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-[var(--transition-fast)]
            flex items-center justify-center gap-[var(--space-xs)]
          "
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending...
            </>
          ) : (
            'Send link'
          )}
        </button>
      </div>
    </form>
  );
}
