'use client';

import { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

interface PaymentFormProps {
  tourSlug: string;
  amount: number;
  isDeposit: boolean;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export function PaymentForm({
  tourSlug,
  amount,
  isDeposit,
  onSuccess,
  onError,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    const returnUrl = `${window.location.origin}/tours/${tourSlug}/join/success?type=${isDeposit ? 'deposit' : 'payment'}`;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
    });

    // Error handling - only reaches here if there's an immediate error
    // (user will be redirected on success)
    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setErrorMessage(error.message || 'Payment failed. Please check your card details.');
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
      onError?.(error.message || 'Payment failed');
    } else {
      onSuccess?.();
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-[var(--space-lg)]">
      {/* Stripe Payment Element */}
      <div
        className="
          bg-[var(--color-surface-raised)]
          border-2 border-[var(--color-border)]
          rounded-[var(--radius-organic)]
          p-[var(--space-lg)]
        "
      >
        <PaymentElement
          options={{
            layout: 'tabs',
          }}
        />
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div
          className="
            p-[var(--space-md)]
            bg-[var(--color-destructive-bg)]
            border border-[var(--color-destructive-border)]
            rounded-[var(--radius-md)]
            text-sm text-[var(--color-destructive-text)]
          "
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className="
          w-full
          h-14
          flex items-center justify-center gap-[var(--space-sm)]
          bg-[var(--color-accent)]
          text-[var(--color-ink)]
          font-semibold
          text-base
          rounded-[var(--radius-organic)]
          shadow-[var(--shadow-card)]
          hover:bg-[var(--color-accent-hover)]
          focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
        "
      >
        {isProcessing ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
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
            Processing payment...
          </>
        ) : (
          <>
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
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            Pay ${(amount / 100).toFixed(2)} AUD
          </>
        )}
      </button>

      {/* Security note */}
      <div className="flex items-center justify-center gap-[var(--space-xs)] text-xs text-[var(--color-ink-subtle)]">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>Secure payment powered by Stripe</span>
      </div>
    </form>
  );
}
