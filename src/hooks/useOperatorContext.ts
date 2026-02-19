'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/lib/supabase/useAuth';

export interface OperatorProfile {
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
  stripe_account_id: string | null;
  stripe_charges_enabled: boolean;
  stripe_payouts_enabled: boolean;
  stripe_details_submitted: boolean;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export function useOperatorContext() {
  const { user, isLoading: authLoading } = useAuth();
  const [operator, setOperator] = useState<OperatorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setIsLoading(false);
      setError('Not authenticated');
      return;
    }

    async function fetchOperator() {
      setIsLoading(true);
      setError(null);

      try {
        const supabase = createClient();

        // Get operator membership
        const { data: membership, error: memError } = await supabase
          .from('operator_members')
          .select('operator_id')
          .eq('profile_id', user!.id)
          .eq('is_active', true)
          .maybeSingle();

        if (memError) {
          setError(memError.message);
          return;
        }

        if (!membership) {
          // Fallback: check linked_operator_id on profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('linked_operator_id')
            .eq('id', user!.id)
            .single();

          if (!profile?.linked_operator_id) {
            setError('No operator account linked');
            return;
          }

          const { data: op, error: opError } = await supabase
            .from('operators')
            .select('*')
            .eq('id', profile.linked_operator_id)
            .single();

          if (opError || !op) {
            setError('Operator record not found');
            return;
          }

          setOperator(op as OperatorProfile);
          return;
        }

        // Fetch operator record
        const { data: op, error: opError } = await supabase
          .from('operators')
          .select('*')
          .eq('id', membership.operator_id)
          .single();

        if (opError || !op) {
          setError('Operator record not found');
          return;
        }

        setOperator(op as OperatorProfile);
      } catch (err) {
        setError('Failed to load operator data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOperator();
  }, [user, authLoading]);

  return {
    operator,
    operatorId: operator?.id || null,
    user,
    isLoading: isLoading || authLoading,
    error,
  };
}
