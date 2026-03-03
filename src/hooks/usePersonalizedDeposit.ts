'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface PersonalizedDeposit {
  depositCents: number | null;
  isLoading: boolean;
  error: string | null;
}

export function usePersonalizedDeposit(userId: string | null, tourId: string | null) {
  const [depositCents, setDepositCents] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDeposit = useCallback(async () => {
    if (!userId || !tourId) {
      setDepositCents(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      const { data, error: rpcError } = await supabase.rpc('calculate_required_deposit', {
        p_user_id: userId,
        p_tour_id: tourId,
      });

      if (rpcError) {
        setError(rpcError.message);
        return;
      }

      setDepositCents(data ?? null);
    } catch (err) {
      setError('Failed to calculate deposit');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userId, tourId]);

  useEffect(() => {
    fetchDeposit();
  }, [fetchDeposit]);

  return { depositCents, isLoading, error };
}
