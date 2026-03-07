'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface ChaseListBird {
  id: string;
  commonName: string;
  scientificName?: string;
  region?: string;
  addedDate?: string;
}

export function useChaseList(userId: string | null) {
  const [birds, setBirds] = useState<ChaseListBird[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBirds = useCallback(async () => {
    if (!userId) {
      setBirds([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from('chase_list')
        .select('id, common_name, scientific_name, region, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
        return;
      }

      setBirds(
        (data || []).map((row) => ({
          id: row.id,
          commonName: row.common_name,
          scientificName: row.scientific_name ?? undefined,
          region: row.region ?? undefined,
          addedDate: row.created_at,
        }))
      );
    } catch (err) {
      setError('Failed to load chase list');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchBirds();
  }, [fetchBirds]);

  const addBird = useCallback(
    async (commonName: string) => {
      if (!userId) return;
      const supabase = createClient();
      const { data, error: insertError } = await supabase
        .from('chase_list')
        .insert({ user_id: userId, common_name: commonName })
        .select('id, common_name, scientific_name, region, created_at')
        .single();

      if (insertError) {
        if (insertError.code === '23505') return; // duplicate
        console.error(insertError);
        return;
      }

      if (data) {
        setBirds((prev) => [
          {
            id: data.id,
            commonName: data.common_name,
            scientificName: data.scientific_name ?? undefined,
            region: data.region ?? undefined,
            addedDate: data.created_at,
          },
          ...prev,
        ]);
      }
    },
    [userId]
  );

  const removeBird = useCallback(
    async (id: string) => {
      if (!userId) return;
      const supabase = createClient();
      const { error: deleteError } = await supabase
        .from('chase_list')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (deleteError) {
        console.error(deleteError);
        return;
      }

      setBirds((prev) => prev.filter((b) => b.id !== id));
    },
    [userId]
  );

  return { birds, isLoading, error, addBird, removeBird, refetch: fetchBirds };
}
