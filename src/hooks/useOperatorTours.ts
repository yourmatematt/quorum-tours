'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Tour } from '@/lib/supabase/useTours';

export function useOperatorTours(operatorId: string | null, options?: { status?: string }) {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTours = useCallback(async () => {
    if (!operatorId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      let query = supabase
        .from('tours')
        .select('*, operator:operators(id, name, slug, base_location)')
        .eq('operator_id', operatorId)
        .order('date_start', { ascending: true });

      if (options?.status && options.status !== 'all') {
        query = query.eq('status', options.status);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        setError(fetchError.message);
        return;
      }

      // Map DB fields to Tour interface
      const mapped: Tour[] = (data || []).map((t: Record<string, unknown>) => ({
        ...t,
        current_participants: (t.current_participant_count as number) || 0,
      })) as Tour[];

      setTours(mapped);
    } catch (err) {
      setError('Failed to fetch tours');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [operatorId, options?.status]);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  return { tours, isLoading, error, refetch: fetchTours };
}
