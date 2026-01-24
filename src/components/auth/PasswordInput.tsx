'use client';

import { useState, type InputHTMLAttributes } from 'react';

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

/**
 * PasswordInput - Password field with visibility toggle
 *
 * Designed for older demographics (OP-8 pain point):
 * - Large 48px height for easy interaction
 * - Visible label above input (not placeholder-only)
 * - Password visibility toggle with clear Show/Hide text
 * - Accessible: keyboard-navigable toggle, aria-labels
 */
export function PasswordInput({
  label,
  error,
  id,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || 'password';
  const errorId = `${inputId}-error`;

  return (
    <div className="w-full">
      {/* Label */}
      <label
        htmlFor={inputId}
        className="
          block
          text-sm
          font-medium
          text-[var(--color-ink)]
          mb-[var(--space-xs)]
        "
      >
        {label}
      </label>

      {/* Input wrapper */}
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id={inputId}
          className={`
            w-full
            h-12 sm:h-[52px]
            px-[var(--space-md)]
            pr-20
            text-base
            text-[var(--color-ink)]
            bg-white
            border-2 rounded-[var(--radius-organic)]
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-1
            ${
              error
                ? 'border-[var(--color-danger)] focus:ring-[var(--color-danger)]'
                : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
            }
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />

        {/* Visibility toggle button */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="
            absolute right-1 top-1/2 -translate-y-1/2
            px-[var(--space-sm)]
            py-[var(--space-xs)]
            text-sm
            text-[var(--color-ink-muted)]
            hover:text-[var(--color-ink)]
            focus:outline-none focus:text-[var(--color-primary)]
            transition-colors duration-200
            flex items-center gap-1
          "
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {/* Eye icon */}
          {showPassword ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
          <span className="hidden sm:inline">
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </button>
      </div>

      {/* Error message */}
      {error && (
        <p
          id={errorId}
          className="
            mt-[var(--space-xs)]
            text-sm
            text-[var(--color-danger)]
          "
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
