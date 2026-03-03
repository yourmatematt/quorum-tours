'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface OperatorEarnings {
  escrowed: { amount: number; tours: number; bookings: number };
  confirmed: { amount: number; tours: number; bookings: number };
  forfeited: { amount: number; count: number };
  paidAllTime: number;
  isLoading: boolean;
  error: string | null;
}

export function useOperatorEarnings(operatorId: string | null) {
  const [earnings, setEarnings] = useState<Omit<OperatorEarnings, 'isLoading' | 'error'>>({
    escrowed: { amount: 0, tours: 0, bookings: 0 },
    confirmed: { amount: 0, tours: 0, bookings: 0 },
    forfeited: { amount: 0, count: 0 },
    paidAllTime: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEarnings = useCallback(async () => {
    if (!operatorId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Fetch all tours for this operator
      const { data: tours, error: tourError } = await supabase
        .from('tours')
        .select('id, status, price_cents')
        .eq('operator_id', operatorId);

      if (tourError) {
        setError(tourError.message);
        return;
      }

      if (!tours || tours.length === 0) {
        setIsLoading(false);
        return;
      }

      const tourIds = tours.map(t => t.id);

      // Fetch all reservations for these tours
      const { data: reservations, error: resError } = await supabase
        .from('reservations')
        .select('tour_id, status, deposit_cents, balance_cents, operator_payout_cents')
        .in('tour_id', tourIds)
        .not('status', 'in', '("cancelled","abandoned")');

      // Fetch forfeited reservations separately (they may have been excluded above depending on status)
      const { data: forfeitedRes, error: forfeitError } = await supabase
        .from('reservations')
        .select('deposit_cents')
        .in('tour_id', tourIds)
        .eq('status', 'forfeited');

      if (forfeitError) {
        setError(forfeitError.message);
        return;
      }

      if (resError) {
        setError(resError.message);
        return;
      }

      // Calculate earnings by tour status
      const tourStatusMap = new Map(tours.map(t => [t.id, t.status]));

      let escrowed = { amount: 0, tours: new Set<string>(), bookings: 0 };
      let confirmed = { amount: 0, tours: new Set<string>(), bookings: 0 };
      let forfeited = { amount: 0, count: 0 };
      let paid = 0;

      // Calculate forfeit income (97% of deposit — 3% platform commission)
      for (const r of (forfeitedRes || [])) {
        const deposit = r.deposit_cents || 0;
        if (deposit > 0) {
          forfeited.amount += Math.round(deposit * 0.97);
          forfeited.count++;
        }
      }

      for (const r of (reservations || [])) {
        const tourStatus = tourStatusMap.get(r.tour_id);
        const deposit = r.deposit_cents || 0;
        const payout = r.operator_payout_cents || 0;

        if (tourStatus === 'forming') {
          escrowed.amount += deposit;
          escrowed.tours.add(r.tour_id);
          escrowed.bookings++;
        } else if (tourStatus === 'payment_pending' || tourStatus === 'confirmed') {
          confirmed.amount += payout || deposit;
          confirmed.tours.add(r.tour_id);
          confirmed.bookings++;
        } else if (tourStatus === 'completed') {
          paid += payout;
        }
      }

      setEarnings({
        escrowed: {
          amount: escrowed.amount / 100,
          tours: escrowed.tours.size,
          bookings: escrowed.bookings,
        },
        confirmed: {
          amount: confirmed.amount / 100,
          tours: confirmed.tours.size,
          bookings: confirmed.bookings,
        },
        forfeited: {
          amount: forfeited.amount / 100,
          count: forfeited.count,
        },
        paidAllTime: paid / 100,
      });
    } catch (err) {
      setError('Failed to fetch earnings');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [operatorId]);

  useEffect(() => {
    fetchEarnings();
  }, [fetchEarnings]);

  return { ...earnings, isLoading, error, refetch: fetchEarnings };
}
