'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

/**
 * Check if a user has an active reservation for a specific tour.
 * Returns hasCommitted: true if user has a non-cancelled reservation.
 */
export function useUserReservation(userId: string | null, tourId: string | null) {
  const [hasCommitted, setHasCommitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId || !tourId) {
      setHasCommitted(false);
      setIsLoading(false);
      return;
    }

    async function checkReservation() {
      const supabase = createClient();

      const { data } = await supabase
        .from('reservations')
        .select('id')
        .eq('user_id', userId!)
        .eq('tour_id', tourId!)
        .not('status', 'in', '("cancelled","abandoned","refunded")')
        .limit(1)
        .maybeSingle();

      setHasCommitted(!!data);
      setIsLoading(false);
    }

    checkReservation();
  }, [userId, tourId]);

  return { hasCommitted, isLoading };
}
