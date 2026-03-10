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
        colorPrimary: '#2E8B57',
        colorBackground: '#ffffff',
        colorText: '#1A3320',
        colorDanger: '#dc2626',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
      rules: {
        '.Input': {
          border: '2px solid #C6E6C6',
          boxShadow: 'none',
          padding: '12px',
        },
        '.Input:focus': {
          border: '2px solid #2E8B57',
          boxShadow: '0 0 0 3px rgba(46, 139, 87, 0.15)',
        },
        '.Input--invalid': {
          border: '2px solid #dc2626',
        },
        '.Label': {
          fontWeight: '500',
          color: '#1A3320',
          marginBottom: '6px',
        },
        '.Error': {
          color: '#dc2626',
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
