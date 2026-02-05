'use client';

import { useState, useEffect, useMemo } from 'react';
import { createClient } from './client';

export type TourStatus = 'forming' | 'payment_pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Tour {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  tour_type: string;
  capacity: number;
  threshold: number;
  threshold_deadline: string | null;
  price_cents: number;
  deposit_cents: number;
  date_start: string;
  date_end: string;
  booking_deadline: string;
  status: TourStatus;
  target_species: string[];
  included: string[];
  itinerary: unknown;
  image_url: string | null;
  is_featured: boolean;
  created_at: string;
  // Joined data
  operator?: {
    id: string;
    name: string;
    slug: string;
    base_location?: string | null;
  } | null;
  guide?: {
    id: string;
    name: string;
  } | null;
  // Computed
  current_participants: number;
  location?: string;
}

interface UseToursOptions {
  status?: TourStatus | 'all';
  limit?: number;
}

export function useTours(options: UseToursOptions = {}) {
  const { status = 'all', limit = 50 } = options;
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTours() {
      const supabase = createClient();

      try {
        // First get tours with operator info
        let query = supabase
          .from('tours')
          .select(`
            *,
            operator:operators(id, name, slug, base_location)
          `)
          .order('date_start', { ascending: true })
          .limit(limit);

        // Filter by status if specified
        if (status !== 'all') {
          query = query.eq('status', status);
        } else {
          // Exclude cancelled/completed for public listing
          query = query.in('status', ['forming', 'payment_pending', 'confirmed']);
        }

        const { data: toursData, error: toursError } = await query;

        if (toursError) {
          throw toursError;
        }

        // Map tours data, using current_participant_count from the database
        const enrichedTours: Tour[] = (toursData || []).map(tour => ({
          ...tour,
          current_participants: tour.current_participant_count || 0,
        }));

        setTours(enrichedTours);
        setError(null);
      } catch (err) {
        console.error('Error fetching tours:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch tours');
      } finally {
        setIsLoading(false);
      }
    }

    fetchTours();
  }, [status, limit]);

  return { tours, isLoading, error };
}

export function useTour(idOrSlug: string) {
  const [tour, setTour] = useState<Tour | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTour() {
      if (!idOrSlug) {
        setIsLoading(false);
        return;
      }

      const supabase = createClient();

      try {
        // Try to fetch by ID first (UUID format), then by slug
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);

        let query = supabase
          .from('tours')
          .select(`
            *,
            operator:operators(id, name, slug, tagline, base_location)
          `);

        if (isUuid) {
          query = query.eq('id', idOrSlug);
        } else {
          query = query.eq('slug', idOrSlug);
        }

        const { data: tourData, error: tourError } = await query.single();

        if (tourError) {
          throw tourError;
        }

        // Use current_participant_count from the database
        const enrichedTour: Tour = {
          ...tourData,
          current_participants: tourData.current_participant_count || 0,
        };

        setTour(enrichedTour);
        setError(null);
      } catch (err) {
        console.error('Error fetching tour:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch tour');
      } finally {
        setIsLoading(false);
      }
    }

    fetchTour();
  }, [idOrSlug]);

  return { tour, isLoading, error };
}
