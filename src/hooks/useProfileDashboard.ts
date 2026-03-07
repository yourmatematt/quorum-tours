'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

type TrustTier = 'new' | 'trusted' | 'strike-1' | 'strike-2' | 'suspended';
type CommitmentStatus = 'confirmed' | 'forming' | 'not-running';
type PaymentStatus = 'paid' | 'deposit-paid' | 'pending' | 'overdue';

interface Commitment {
  tourId: string;
  tourName: string;
  tourDates: string;
  operatorId: string;
  operatorName: string;
  location: string;
  status: CommitmentStatus;
  currentParticipants: number;
  quorum: number;
  capacity: number;
  paymentStatus: PaymentStatus;
  departureDate: Date;
  fellowTravelers: { id: string; name: string; initials: string }[];
  targetSpecies: { id: string; name: string }[];
}

interface PastTour {
  id: string;
  title: string;
  date: string;
  outcome: 'completed' | 'cancelled';
  participantCount?: number;
}

interface ProfileData {
  displayName: string;
  memberSince: string;
  trustTier: TrustTier;
  completedTours: number;
  strikeCount: number;
  commitments: Commitment[];
  pastTours: PastTour[];
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

function mapTourStatus(dbStatus: string): CommitmentStatus {
  switch (dbStatus) {
    case 'confirmed':
    case 'completed':
      return 'confirmed';
    case 'forming':
    case 'payment_pending':
      return 'forming';
    default:
      return 'not-running';
  }
}

function mapPaymentStatus(reservation: { status: string; deposit_charged: boolean; balance_paid_at: string | null }): PaymentStatus {
  if (reservation.balance_paid_at) return 'paid';
  if (reservation.deposit_charged) return 'deposit-paid';
  if (reservation.status === 'payment_pending') return 'pending';
  return 'pending';
}

function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const startMonth = startDate.toLocaleDateString('en-AU', { month: 'short' });
  const endMonth = endDate.toLocaleDateString('en-AU', { month: 'short' });
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const year = endDate.getFullYear();

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay}–${endDay}, ${year}`;
  }
  return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${year}`;
}

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0] || '').join('').slice(0, 2).toUpperCase();
}

export function useProfileDashboard(userId: string | null) {
  const [data, setData] = useState<Omit<ProfileData, 'isLoading' | 'error'>>({
    displayName: '',
    memberSince: '',
    trustTier: 'new',
    completedTours: 0,
    strikeCount: 0,
    commitments: [],
    pastTours: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Fetch profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('name, email, created_at, strikes, tours_completed')
        .eq('id', userId)
        .single();

      if (profileError) {
        setError(profileError.message);
        return;
      }

      const strikes = profile?.strikes ?? 0;
      const completedTours = profile?.tours_completed ?? 0;
      const displayName = profile?.name || profile?.email?.split('@')[0] || 'User';
      const memberSince = new Date(profile?.created_at).toLocaleDateString('en-AU', {
        month: 'long',
        year: 'numeric',
      });

      // Fetch active reservations with tour + operator data
      const { data: reservations, error: resError } = await supabase
        .from('reservations')
        .select(`
          id, status, deposit_charged, balance_paid_at, tour_id,
          tours (
            id, slug, title, status, date_start, date_end,
            current_participant_count, threshold, capacity, target_species,
            operator_id,
            operators ( id, slug, name, base_location )
          )
        `)
        .eq('user_id', userId)
        .not('status', 'in', '("cancelled","abandoned","refunded")')
        .order('created_at', { ascending: false });

      if (resError) {
        setError(resError.message);
        return;
      }

      const now = new Date();
      const commitments: Commitment[] = [];
      const pastTours: PastTour[] = [];

      for (const res of (reservations || [])) {
        const tour = res.tours as any;
        if (!tour) continue;

        const operator = tour.operators as any;
        const tourEndDate = new Date(tour.date_end);
        const tourStatus = mapTourStatus(tour.status);

        // Past tours: completed or tour date has passed
        if (tour.status === 'completed' || (tourEndDate < now && tour.status !== 'forming')) {
          pastTours.push({
            id: tour.slug || tour.id,
            title: tour.title,
            date: formatDateRange(tour.date_start, tour.date_end),
            outcome: tour.status === 'cancelled' ? 'cancelled' : 'completed',
            participantCount: tour.current_participant_count,
          });
          continue;
        }

        // Upcoming tours
        // Fetch fellow travelers for this tour
        const { data: fellowRes } = await supabase
          .from('reservations')
          .select('user_id, profiles ( name )')
          .eq('tour_id', tour.id)
          .neq('user_id', userId)
          .not('status', 'in', '("cancelled","abandoned","refunded")')
          .limit(8);

        const fellowTravelers = (fellowRes || []).map((fr: any) => {
          const name = fr.profiles?.name || 'Birder';
          return {
            id: fr.user_id,
            name,
            initials: getInitials(name),
          };
        });

        const targetSpecies = (tour.target_species || []).slice(0, 4).map((name: string, i: number) => ({
          id: `sp-${i}`,
          name,
        }));

        commitments.push({
          tourId: tour.slug || tour.id,
          tourName: tour.title,
          tourDates: formatDateRange(tour.date_start, tour.date_end),
          operatorId: operator?.slug || operator?.id || '',
          operatorName: operator?.name || 'Unknown Operator',
          location: operator?.base_location || 'Australia',
          status: tourStatus,
          currentParticipants: tour.current_participant_count,
          quorum: tour.threshold,
          capacity: tour.capacity,
          paymentStatus: mapPaymentStatus(res),
          departureDate: new Date(tour.date_start),
          fellowTravelers,
          targetSpecies,
        });
      }

      // Sort commitments by departure date
      commitments.sort((a, b) => a.departureDate.getTime() - b.departureDate.getTime());

      setData({
        displayName,
        memberSince,
        trustTier: deriveTrustTier(strikes, completedTours),
        completedTours,
        strikeCount: strikes,
        commitments,
        pastTours,
      });
    } catch (err) {
      setError('Failed to load profile');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { ...data, isLoading, error, refetch: fetchProfile };
}
