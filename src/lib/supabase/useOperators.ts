'use client';

import { useState, useEffect } from 'react';
import { createClient } from './client';

export interface Operator {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  logo_url: string | null;
  hero_image_url: string | null;
  base_location: string | null;
  established_year: number | null;
  languages: string[];
  specialties: string[];
  is_verified: boolean;
  created_at: string;
  // Computed
  tours_count: number;
  average_rating: number;
  total_reviews: number;
}

interface UseOperatorsOptions {
  verified_only?: boolean;
  limit?: number;
}

export function useOperators(options: UseOperatorsOptions = {}) {
  const { verified_only = true, limit = 50 } = options;
  const [operators, setOperators] = useState<Operator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOperators() {
      const supabase = createClient();

      try {
        let query = supabase
          .from('operators')
          .select('*')
          .order('name', { ascending: true })
          .limit(limit);

        if (verified_only) {
          query = query.eq('is_verified', true);
        }

        const { data: operatorsData, error: operatorsError } = await query;

        if (operatorsError) {
          throw operatorsError;
        }

        // Get tour counts for each operator
        const operatorIds = operatorsData?.map(o => o.id) || [];

        const { data: tourCounts, error: tourError } = await supabase
          .from('tours')
          .select('operator_id')
          .in('operator_id', operatorIds)
          .in('status', ['forming', 'payment_pending', 'confirmed']);

        if (tourError) {
          console.error('Error fetching tour counts:', tourError);
        }

        // Count tours per operator
        const countMap = new Map<string, number>();
        tourCounts?.forEach(t => {
          countMap.set(t.operator_id, (countMap.get(t.operator_id) || 0) + 1);
        });

        // Enrich with computed fields
        const enrichedOperators: Operator[] = (operatorsData || []).map(op => ({
          ...op,
          tours_count: countMap.get(op.id) || 0,
          average_rating: 0, // TODO: implement reviews
          total_reviews: 0,
        }));

        setOperators(enrichedOperators);
        setError(null);
      } catch (err) {
        console.error('Error fetching operators:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch operators');
      } finally {
        setIsLoading(false);
      }
    }

    fetchOperators();
  }, [verified_only, limit]);

  return { operators, isLoading, error };
}

export function useOperator(idOrSlug: string) {
  const [operator, setOperator] = useState<Operator | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOperator() {
      if (!idOrSlug) {
        setIsLoading(false);
        return;
      }

      const supabase = createClient();

      try {
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);

        let query = supabase.from('operators').select('*');

        if (isUuid) {
          query = query.eq('id', idOrSlug);
        } else {
          query = query.eq('slug', idOrSlug);
        }

        const { data: operatorData, error: operatorError } = await query.single();

        if (operatorError) {
          throw operatorError;
        }

        // Get tour count
        const { count, error: countError } = await supabase
          .from('tours')
          .select('*', { count: 'exact', head: true })
          .eq('operator_id', operatorData.id)
          .in('status', ['forming', 'payment_pending', 'confirmed']);

        if (countError) {
          console.error('Error fetching tour count:', countError);
        }

        const enrichedOperator: Operator = {
          ...operatorData,
          tours_count: count || 0,
          average_rating: 0,
          total_reviews: 0,
        };

        setOperator(enrichedOperator);
        setError(null);
      } catch (err) {
        console.error('Error fetching operator:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch operator');
      } finally {
        setIsLoading(false);
      }
    }

    fetchOperator();
  }, [idOrSlug]);

  return { operator, isLoading, error };
}
