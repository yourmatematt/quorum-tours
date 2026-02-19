'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface OperatorApplication {
  id: string;
  contact_name: string;
  contact_email: string;
  business_name: string;
  base_location: string;
  description: string;
  years_experience: number;
  credentials: string | null;
  website_url: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'more_info_requested';
  profile_id: string | null;
  admin_notes: string | null;
  created_at: string;
}

export function useOperatorApplications(status?: string) {
  const [applications, setApplications] = useState<OperatorApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      let query = supabase
        .from('operator_applications')
        .select('*')
        .order('created_at', { ascending: true });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        setError(fetchError.message);
        return;
      }

      setApplications(data || []);
    } catch (err) {
      setError('Failed to fetch applications');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return { applications, isLoading, error, refetch: fetchApplications };
}
