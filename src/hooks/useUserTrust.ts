'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

type TrustTier = 'new' | 'trusted' | 'strike-1' | 'strike-2' | 'suspended';

interface StrikeRecord {
  id: string;
  reservation_id: string | null;
  strike_amount: number;
  reason: string;
  created_at: string;
}

interface Appeal {
  id: string;
  strike_history_id: string | null;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes: string | null;
  resolved_at: string | null;
  created_at: string;
}

interface UserTrustData {
  trustTier: TrustTier;
  strikes: number;
  completedTours: number;
  strikeHistory: StrikeRecord[];
  appeals: Appeal[];
  isLoading: boolean;
  error: string | null;
}

function deriveTrustTier(strikes: number, completedTours: number): TrustTier {
  if (strikes >= 3) return 'suspended';
  if (strikes === 2) return 'strike-2';
  if (strikes === 1) return 'strike-1';
  if (completedTours >= 1) return 'trusted';
  return 'new';
}

export function useUserTrust(userId: string | null) {
  const [data, setData] = useState<Omit<UserTrustData, 'isLoading' | 'error'>>({
    trustTier: 'new',
    strikes: 0,
    completedTours: 0,
    strikeHistory: [],
    appeals: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrust = useCallback(async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Fetch profile for strikes and completed tours count
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('strikes, tours_completed')
        .eq('id', userId)
        .single();

      if (profileError) {
        setError(profileError.message);
        return;
      }

      const strikes = profile?.strikes ?? 0;
      const completedTours = profile?.tours_completed ?? 0;

      // Fetch strike history
      const { data: strikeHistory, error: strikeError } = await supabase
        .from('strike_history')
        .select('id, reservation_id, strike_amount, reason, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (strikeError) {
        setError(strikeError.message);
        return;
      }

      // Fetch appeals
      const { data: appeals, error: appealsError } = await supabase
        .from('appeals')
        .select('id, strike_history_id, reason, status, admin_notes, resolved_at, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (appealsError) {
        setError(appealsError.message);
        return;
      }

      setData({
        trustTier: deriveTrustTier(strikes, completedTours),
        strikes,
        completedTours,
        strikeHistory: strikeHistory || [],
        appeals: appeals || [],
      });
    } catch (err) {
      setError('Failed to fetch trust status');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchTrust();
  }, [fetchTrust]);

  return { ...data, isLoading, error, refetch: fetchTrust };
}
