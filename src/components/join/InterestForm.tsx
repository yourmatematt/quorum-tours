'use client';

import { useState } from 'react';

interface InterestFormProps {
  defaultEmail?: string;
}

/**
 * InterestForm - Minimal form for expressing interest in forming tours
 *
 * Even simpler than JoinForm - only email and notification preference.
 * No payment information required.
 *
 * Per IA: "No payment required until the tour confirms"
 */
export function InterestForm({ defaultEmail = '' }: InterestFormProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [notifyBySms, setNotifyBySms] = useState(false);
  const [phone, setPhone] = useState('');

  // Format phone number
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length >= 6) {
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    } else if (digits.length >= 3) {
      return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    }
    return digits;
  };

  return (
    <div
      className="
        bg-[var(--color-surface-raised)]
        border border-[var(--color-border)]
        rounded-[var(--radius-lg)]
        p-[var(--space-lg)]
      "
    >
      <h3
        className="
          font-display
          text-[var(--text-lg)]
          text-[var(--color-ink)]
          mb-[var(--space-lg)]
        "
      >
        Your information
      </h3>

      <div className="space-y-[var(--space-lg)]">
        {/* Email - Required */}
        <div>
          <label
            htmlFor="interest-email"
            className="
              block text-[var(--text-sm)] font-medium
              text-[var(--color-ink)]
              mb-[var(--space-xs)]
            "
          >
            Email address
          </label>
          <input
            type="email"
            id="interest-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
            className="
              w-full h-12
              px-[var(--space-md)]
              text-[var(--color-ink)]
              bg-[var(--color-surface)]
              border border-[var(--color-border)]
              rounded-[var(--radius-md)]
              focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent
              transition-colors duration-[var(--transition-fast)]
            "
          />
          <p className="text-[var(--text-xs)] text-[var(--color-ink-subtle)] mt-1">
            We&apos;ll notify you when the tour confirms
          </p>
        </div>

        {/* Notification Preference */}
        <div>
          <p
            className="
              text-[var(--text-sm)] font-medium
              text-[var(--color-ink)]
              mb-[var(--space-sm)]
            "
          >
            How should we notify you?
          </p>

          <div className="space-y-[var(--space-sm)]">
            {/* Email option - always on */}
            <label className="flex items-center gap-[var(--space-sm)] cursor-pointer">
              <input
                type="checkbox"
                checked={true}
                disabled
                className="
                  w-5 h-5
                  rounded
                  border-[var(--color-border)]
                  text-[var(--color-accent)]
                  focus:ring-[var(--color-accent)]
                "
              />
              <span className="text-[var(--text-sm)] text-[var(--color-ink)]">
                Email
              </span>
              <span className="text-[var(--text-xs)] text-[var(--color-ink-subtle)]">
                (always)
              </span>
            </label>

            {/* SMS option */}
            <label className="flex items-center gap-[var(--space-sm)] cursor-pointer">
              <input
                type="checkbox"
                checked={notifyBySms}
                onChange={(e) => setNotifyBySms(e.target.checked)}
                className="
                  w-5 h-5
                  rounded
                  border-[var(--color-border)]
                  text-[var(--color-accent)]
                  focus:ring-[var(--color-accent)]
                  cursor-pointer
                "
              />
              <span className="text-[var(--text-sm)] text-[var(--color-ink)]">
                SMS
              </span>
              <span className="text-[var(--text-xs)] text-[var(--color-ink-subtle)]">
                (optional)
              </span>
            </label>
          </div>

          {/* Phone input - shown if SMS selected */}
          {notifyBySms && (
            <div className="mt-[var(--space-md)]">
              <label
                htmlFor="interest-phone"
                className="
                  block text-[var(--text-sm)] font-medium
                  text-[var(--color-ink)]
                  mb-[var(--space-xs)]
                "
              >
                Phone number for SMS
              </label>
              <input
                type="tel"
                id="interest-phone"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="0400 000 000"
                autoComplete="tel"
                className="
                  w-full h-12
                  px-[var(--space-md)]
                  text-[var(--color-ink)]
                  bg-[var(--color-surface)]
                  border border-[var(--color-border)]
                  rounded-[var(--radius-md)]
                  focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent
                  transition-colors duration-[var(--transition-fast)]
                "
              />
            </div>
          )}
        </div>
      </div>

      {/* No payment info notice */}
      <div
        className="
          mt-[var(--space-lg)]
          pt-[var(--space-md)]
          border-t border-[var(--color-border)]
        "
      >
        <div className="flex items-start gap-[var(--space-sm)]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-[var(--color-forming)] flex-shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <circle cx="10" cy="10" r="8" />
            <path d="M10 6v4l2 2" />
          </svg>
          <p className="text-[var(--text-sm)] text-[var(--color-ink-muted)]">
            No payment information required. You&apos;ll only be asked for payment
            details if the tour confirms.
          </p>
        </div>
      </div>
    </div>
  );
}
