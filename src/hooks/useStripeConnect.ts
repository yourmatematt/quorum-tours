'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface StripeStatus {
  hasAccount: boolean;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  detailsSubmitted: boolean;
  accountId: string | null;
}

export function useStripeConnect(operator: {
  stripe_account_id: string | null;
  stripe_charges_enabled: boolean;
  stripe_payouts_enabled: boolean;
  stripe_details_submitted: boolean;
} | null) {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stripeStatus: StripeStatus = {
    hasAccount: !!operator?.stripe_account_id,
    chargesEnabled: operator?.stripe_charges_enabled || false,
    payoutsEnabled: operator?.stripe_payouts_enabled || false,
    detailsSubmitted: operator?.stripe_details_submitted || false,
    accountId: operator?.stripe_account_id || null,
  };

  async function startOnboarding(operatorId: string) {
    setIsRedirecting(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setError('Not authenticated');
        setIsRedirecting(false);
        return;
      }

      const response = await supabase.functions.invoke('stripe-connect-onboard', {
        body: { operator_id: operatorId },
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to start Stripe onboarding');
      }

      const { url } = response.data;
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No onboarding URL returned');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start Stripe onboarding');
      setIsRedirecting(false);
    }
  }

  return { stripeStatus, startOnboarding, isRedirecting, error };
}
