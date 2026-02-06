'use client';

import { useState, useEffect } from 'react';
import { TourCard } from '../TourCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { createClient } from '@/lib/supabase/client';
import { type Tour } from '@/lib/supabase/useTours';
import { format } from 'date-fns';

// Map database tour status to display status for TourCard
type DisplayStatus = 'confirmed' | 'forming' | 'not-running';
function mapTourStatus(dbStatus: string): DisplayStatus {
  switch (dbStatus) {
    case 'confirmed':
    case 'payment_pending':
      return 'confirmed';
    case 'forming':
      return 'forming';
    default:
      return 'not-running';
  }
}

/**
 * Featured Tours Section - Organic Biophilic Design
 *
 * Design System: HOME-REDESIGN-DECISIONS.md
 * - Shows featured tours from database (is_featured = true)
 * - Demonstrates transparency of the quorum mechanic
 * - Organic rounded corners, natural shadows
 */
export function TourStatesSection() {
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedTours() {
      const supabase = createClient();

      try {
        const { data, error } = await supabase
          .from('tours')
          .select(`
            *,
            operator:operators(id, name, slug, base_location)
          `)
          .eq('is_featured', true)
          .in('status', ['forming', 'payment_pending', 'confirmed'])
          .order('date_start', { ascending: true })
          .limit(3);

        if (error) throw error;

        const enrichedTours: Tour[] = (data || []).map(tour => ({
          ...tour,
          current_participants: tour.current_participant_count || 0,
        }));

        setFeaturedTours(enrichedTours);
      } catch (err) {
        console.error('Error fetching featured tours:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFeaturedTours();
  }, []);

  // Don't show the section if there are no featured tours and not loading
  if (!isLoading && featuredTours.length === 0) {
    return null;
  }

  return (
    <section className="
      py-12 sm:py-16 lg:py-20
      bg-[var(--color-surface)]
    ">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-4 sm:px-6 lg:px-8
      ">
        {/* Section header - center aligned */}
        <ScrollReveal variant="fade-up" duration={500}>
          <div className="mb-10 sm:mb-16 text-center max-w-2xl mx-auto">
            <h2 className="
              font-display
              text-[clamp(1.75rem,4vw,2.5rem)]
              leading-tight
              text-[var(--color-ink)]
              mb-3 sm:mb-[var(--space-md)]
            ">
              Featured tours.
            </h2>
            <p className="
              text-[var(--color-ink-muted)]
              text-base sm:text-lg
              leading-relaxed
            ">
              Every tour shows its confirmation state. No hidden status. No guessing.
            </p>
          </div>
        </ScrollReveal>

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-10 sm:mb-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-white border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] animate-pulse" />
            ))}
          </div>
        )}

        {/* Tour cards grid - organic spacing */}
        {!isLoading && (
          <div className="
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            gap-4 sm:gap-8
            mb-10 sm:mb-16
          ">
            {featuredTours.map((tour, index) => (
              <ScrollReveal
                key={tour.id}
                variant="fade-up"
                delay={index * 100}
                duration={500}
              >
                <TourCard
                  title={tour.title}
                  operatorName={tour.operator?.name || 'Unknown Operator'}
                  status={mapTourStatus(tour.status)}
                  currentParticipants={tour.current_participants}
                  quorum={tour.threshold}
                  capacity={tour.capacity}
                  date={format(new Date(tour.date_start), 'MMM d, yyyy')}
                  location={tour.operator?.base_location || tour.location || 'TBD'}
                />
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Status legend - organic cards */}
        <ScrollReveal variant="fade-up" delay={300} duration={500}>
          <div className="
            max-w-4xl mx-auto
            grid grid-cols-1 md:grid-cols-3
            gap-4 sm:gap-6
          ">
            <div className="
              p-4 sm:p-6
              bg-white
              border-2 border-[var(--color-border)]
              rounded-[var(--radius-organic)]
              shadow-[var(--shadow-card)]
              flex items-start gap-3 sm:gap-4
            ">
              <div className="
                flex-shrink-0
                w-10 h-10 sm:w-12 sm:h-12
                bg-[var(--color-confirmed-bg)]
                rounded-full
                flex items-center justify-center
              ">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-confirmed)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
              </div>
              <div>
                <strong className="text-[var(--color-ink)] font-semibold text-sm sm:text-base block mb-1">Confirmed</strong>
                <p className="text-[var(--color-ink-muted)] text-xs sm:text-sm leading-relaxed">
                  Quorum reached. This tour will run.
                </p>
              </div>
            </div>

            <div className="
              p-4 sm:p-6
              bg-white
              border-2 border-[var(--color-border)]
              rounded-[var(--radius-organic)]
              shadow-[var(--shadow-card)]
              flex items-start gap-3 sm:gap-4
            ">
              <div className="
                flex-shrink-0
                w-10 h-10 sm:w-12 sm:h-12
                bg-[var(--color-forming-bg)]
                rounded-full
                flex items-center justify-center
              ">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-forming)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <strong className="text-[var(--color-ink)] font-semibold text-sm sm:text-base block mb-1">Forming</strong>
                <p className="text-[var(--color-ink-muted)] text-xs sm:text-sm leading-relaxed">
                  Gathering commitments. Not yet confirmed.
                </p>
              </div>
            </div>

            <div className="
              p-4 sm:p-6
              bg-white
              border-2 border-[var(--color-border)]
              rounded-[var(--radius-organic)]
              shadow-[var(--shadow-card)]
              flex items-start gap-3 sm:gap-4
            ">
              <div className="
                flex-shrink-0
                w-10 h-10 sm:w-12 sm:h-12
                bg-[var(--color-not-running-bg)]
                rounded-full
                flex items-center justify-center
              ">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-not-running)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <strong className="text-[var(--color-ink)] font-semibold text-sm sm:text-base block mb-1">Not Running</strong>
                <p className="text-[var(--color-ink-muted)] text-xs sm:text-sm leading-relaxed">
                  Quorum not reached. No one is charged.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
