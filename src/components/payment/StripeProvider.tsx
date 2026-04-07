'use client';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ReactNode } from 'react';

// Load Stripe outside of component to avoid recreating on every render
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

interface StripeProviderProps {
  clientSecret: string;
  children: ReactNode;
}

export function StripeProvider({ clientSecret, children }: StripeProviderProps) {
  if (!stripePromise) {
    return (
      <div className="p-[var(--space-lg)] bg-[var(--color-destructive-bg)] border border-[var(--color-destructive-border)] rounded-[var(--radius-organic)]">
        <p className="text-sm font-medium text-[var(--color-destructive-text)]">
          Payment system is not configured. Please contact support.
        </p>
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#1B3D2F',
        colorBackground: '#ffffff',
        colorText: '#1B3D2F',
        colorDanger: '#c0392b',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
      rules: {
        '.Input': {
          border: '2px solid #C8BAA8',
          boxShadow: 'none',
          padding: '12px',
        },
        '.Input:focus': {
          border: '2px solid #1B3D2F',
          boxShadow: '0 0 0 3px rgba(27, 61, 47, 0.12)',
        },
        '.Input--invalid': {
          border: '2px solid #c0392b',
        },
        '.Label': {
          fontWeight: '500',
          color: '#1B3D2F',
          marginBottom: '6px',
        },
        '.Error': {
          color: '#c0392b',
          fontSize: '14px',
        },
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}
