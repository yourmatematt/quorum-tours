'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface OperatorBooking {
  id: string;
  tour_id: string;
  tour_name: string;
  participant_name: string;
  participant_email: string;
  status: 'held' | 'paid' | 'cancelled' | 'forfeited';
  booking_date: string;
  amount: number;
  deposit_amount: number;
  trust_tier: 'new' | 'trusted' | 'strike-1' | 'strike-2';
  guest_count: number;
}

export function useOperatorBookings(operatorId: string | null, options?: { status?: string }) {
  const [bookings, setBookings] = useState<OperatorBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    if (!operatorId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Fetch reservations for this operator's tours, joined with tour and profile data
      let query = supabase
        .from('reservations')
        .select(`
          id,
          tour_id,
          user_id,
          status,
          guest_count,
          deposit_cents,
          balance_cents,
          operator_payout_cents,
          created_at,
          tours!inner(id, title, operator_id, price_cents),
          profiles(id, name, email, tours_completed, strikes)
        `)
        .eq('tours.operator_id', operatorId)
        .order('created_at', { ascending: false });

      if (options?.status && options.status !== 'all') {
        query = query.eq('status', options.status);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        setError(fetchError.message);
        return;
      }

      const mapped: OperatorBooking[] = (data || []).map((r: Record<string, unknown>) => {
        const tour = r.tours as Record<string, unknown> | null;
        const profile = r.profiles as Record<string, unknown> | null;
        const strikes = (profile?.strikes as number) || 0;
        const toursCompleted = (profile?.tours_completed as number) || 0;

        let trustTier: OperatorBooking['trust_tier'] = 'new';
        if (strikes >= 2) trustTier = 'strike-2';
        else if (strikes === 1) trustTier = 'strike-1';
        else if (toursCompleted >= 1) trustTier = 'trusted';

        // Map reservation status to display status
        const status = r.status as string;
        const statusMap: Record<string, OperatorBooking['status']> = {
          reserved: 'held',
          confirmed: 'paid',
          abandoned: 'forfeited',
          cancelled: 'cancelled',
        };
        const displayStatus: OperatorBooking['status'] = statusMap[status] || 'held';

        return {
          id: r.id as string,
          tour_id: r.tour_id as string,
          tour_name: (tour?.title as string) || 'Unknown Tour',
          participant_name: (profile?.name as string) || 'Anonymous',
          participant_email: (profile?.email as string) || '',
          status: displayStatus,
          booking_date: r.created_at as string,
          amount: ((tour?.price_cents as number) || 0) / 100,
          deposit_amount: ((r.deposit_cents as number) || 0) / 100,
          trust_tier: trustTier,
          guest_count: (r.guest_count as number) || 1,
        };
      });

      setBookings(mapped);
    } catch (err) {
      setError('Failed to fetch bookings');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [operatorId, options?.status]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return { bookings, isLoading, error, refetch: fetchBookings };
}
