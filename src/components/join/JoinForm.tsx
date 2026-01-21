'use client';

import { useState } from 'react';

interface JoinFormProps {
  defaultEmail?: string;
  defaultPhone?: string;
}

/**
 * JoinForm - Information collection for confirmed tour joins
 *
 * Minimal fields to reduce friction.
 * Pre-fills from account where possible.
 *
 * Per IA: "Single-page flow, minimal fields" (OP-8)
 */
export function JoinForm({ defaultEmail = '', defaultPhone = '' }: JoinFormProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [phone, setPhone] = useState(defaultPhone);
  const [emergencyContact, setEmergencyContact] = useState('');
  const [requirements, setRequirements] = useState('');

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
            htmlFor="join-email"
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
            id="join-email"
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
            Confirmation will be sent here
          </p>
        </div>

        {/* Phone - Optional */}
        <div>
          <label
            htmlFor="join-phone"
            className="
              block text-[var(--text-sm)] font-medium
              text-[var(--color-ink)]
              mb-[var(--space-xs)]
            "
          >
            Phone number
            <span className="font-normal text-[var(--color-ink-muted)]"> (optional)</span>
          </label>
          <input
            type="tel"
            id="join-phone"
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
          <p className="text-[var(--text-xs)] text-[var(--color-ink-subtle)] mt-1">
            For day-of coordination
          </p>
        </div>

        {/* Emergency Contact - Optional */}
        <div>
          <label
            htmlFor="join-emergency"
            className="
              block text-[var(--text-sm)] font-medium
              text-[var(--color-ink)]
              mb-[var(--space-xs)]
            "
          >
            Emergency contact
            <span className="font-normal text-[var(--color-ink-muted)]"> (optional)</span>
          </label>
          <input
            type="text"
            id="join-emergency"
            value={emergencyContact}
            onChange={(e) => setEmergencyContact(e.target.value)}
            placeholder="Name and phone number"
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

        {/* Requirements - Optional */}
        <div>
          <label
            htmlFor="join-requirements"
            className="
              block text-[var(--text-sm)] font-medium
              text-[var(--color-ink)]
              mb-[var(--space-xs)]
            "
          >
            Any requirements?
            <span className="font-normal text-[var(--color-ink-muted)]"> (optional)</span>
          </label>
          <textarea
            id="join-requirements"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value.slice(0, 200))}
            placeholder="Dietary needs, accessibility requirements, etc."
            rows={3}
            className="
              w-full
              px-[var(--space-md)] py-[var(--space-sm)]
              text-[var(--color-ink)]
              bg-[var(--color-surface)]
              border border-[var(--color-border)]
              rounded-[var(--radius-md)]
              focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent
              transition-colors duration-[var(--transition-fast)]
              resize-none
            "
          />
          <p className="text-[var(--text-xs)] text-[var(--color-ink-subtle)] mt-1">
            {requirements.length}/200 characters
          </p>
        </div>
      </div>
    </div>
  );
}
