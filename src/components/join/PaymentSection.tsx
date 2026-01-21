'use client';

import { useState } from 'react';

interface PaymentSectionProps {
  price: number;
  priceNote?: string;
}

/**
 * PaymentSection - Card collection for confirmed tours
 *
 * Collects payment method without charging.
 * Explicit "hold, not charge" explanation builds trust.
 *
 * Per IA: "Build trust through explicit process"
 * UI Shell: No actual payment processing.
 */
export function PaymentSection({ price, priceNote }: PaymentSectionProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  // Format expiry as MM/YY
  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
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
          mb-[var(--space-md)]
        "
      >
        Payment information
      </h3>

      {/* Price Confirmation */}
      <div className="mb-[var(--space-lg)]">
        <div className="flex items-baseline gap-[var(--space-xs)]">
          <span className="font-mono text-2xl font-medium text-[var(--color-ink)]">
            ${price}
          </span>
          <span className="text-[var(--text-sm)] text-[var(--color-ink-muted)]">
            per person
          </span>
        </div>
        {priceNote && (
          <p className="text-[var(--text-sm)] text-[var(--color-ink-subtle)] mt-1">
            {priceNote}
          </p>
        )}
      </div>

      {/* Card Input Fields */}
      <div className="space-y-[var(--space-md)]">
        {/* Card Number */}
        <div>
          <label
            htmlFor="card-number"
            className="
              block text-[var(--text-sm)] font-medium
              text-[var(--color-ink)]
              mb-[var(--space-xs)]
            "
          >
            Card number
          </label>
          <div className="relative">
            <input
              type="text"
              id="card-number"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              autoComplete="cc-number"
              className="
                w-full h-12
                px-[var(--space-md)]
                text-[var(--color-ink)]
                bg-[var(--color-surface)]
                border border-[var(--color-border)]
                rounded-[var(--radius-md)]
                focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent
                transition-colors duration-[var(--transition-fast)]
                font-mono
              "
            />
            {/* Card type indicator (UI shell) */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg
                width="24"
                height="16"
                viewBox="0 0 24 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-[var(--color-ink-subtle)]"
                aria-hidden="true"
              >
                <rect x="1" y="1" width="22" height="14" rx="2" />
                <path d="M1 5h22" />
              </svg>
            </div>
          </div>
        </div>

        {/* Expiry and CVC */}
        <div className="grid grid-cols-2 gap-[var(--space-md)]">
          <div>
            <label
              htmlFor="card-expiry"
              className="
                block text-[var(--text-sm)] font-medium
                text-[var(--color-ink)]
                mb-[var(--space-xs)]
              "
            >
              Expiry date
            </label>
            <input
              type="text"
              id="card-expiry"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              autoComplete="cc-exp"
              className="
                w-full h-12
                px-[var(--space-md)]
                text-[var(--color-ink)]
                bg-[var(--color-surface)]
                border border-[var(--color-border)]
                rounded-[var(--radius-md)]
                focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent
                transition-colors duration-[var(--transition-fast)]
                font-mono
              "
            />
          </div>
          <div>
            <label
              htmlFor="card-cvc"
              className="
                block text-[var(--text-sm)] font-medium
                text-[var(--color-ink)]
                mb-[var(--space-xs)]
              "
            >
              CVC
            </label>
            <input
              type="text"
              id="card-cvc"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="123"
              autoComplete="cc-csc"
              className="
                w-full h-12
                px-[var(--space-md)]
                text-[var(--color-ink)]
                bg-[var(--color-surface)]
                border border-[var(--color-border)]
                rounded-[var(--radius-md)]
                focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent
                transition-colors duration-[var(--transition-fast)]
                font-mono
              "
            />
          </div>
        </div>
      </div>

      {/* Payment Explanation - Trust Builder */}
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
            className="text-[var(--color-ink-subtle)] flex-shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" />
            <path d="M10 6v4M10 14h.01" />
          </svg>
          <div className="text-[var(--text-sm)] text-[var(--color-ink-muted)]">
            <p className="font-medium text-[var(--color-ink)] mb-1">
              Your card will be held but NOT charged today.
            </p>
            <p>
              Your card is charged when the tour runs. If the tour doesn&apos;t reach
              its threshold, your hold is released automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
