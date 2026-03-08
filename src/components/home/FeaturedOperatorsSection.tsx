'use client';

import { useState, useEffect } from 'react';
import { OperatorCard } from '@/components/ui/OperatorCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { createClient } from '@/lib/supabase/client';

interface FeaturedOperator {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  logo_url: string | null;
  base_location: string | null;
  is_verified: boolean;
  rating_avg: number | null;
  rating_count: number | null;
  tours_completed: number | null;
}

/**
 * Featured Operators Section — Home Page
 *
 * Displays operators marked as is_featured in the database.
 * Hides entirely if no operators are featured.
 */
export function FeaturedOperatorsSection() {
  const [operators, setOperators] = useState<FeaturedOperator[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      const supabase = createClient();

      try {
        const { data, error } = await supabase
          .from('operators')
          .select('id, slug, name, tagline, logo_url, base_location, is_verified, rating_avg, rating_count, tours_completed')
          .eq('is_featured', true)
          .eq('is_active', true)
          .order('name', { ascending: true })
          .limit(6);

        if (error) throw error;
        setOperators(data || []);
      } catch (err) {
        console.error('Error fetching featured operators:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  if (!isLoading && operators.length === 0) {
    return null;
  }

  return (
    <section className="
      py-12 sm:py-16 lg:py-20
      bg-[var(--color-surface-sunken)]
    ">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-4 sm:px-6 lg:px-8
      ">
        {/* Section header */}
        <ScrollReveal variant="fade-up" duration={500}>
          <div className="mb-10 sm:mb-16 text-center max-w-2xl mx-auto">
            <h2 className="
              font-display
              text-[clamp(1.75rem,4vw,2.5rem)]
              leading-tight
              text-[var(--color-ink)]
              mb-3 sm:mb-[var(--space-md)]
            ">
              Meet our operators.
            </h2>
            <p className="
              text-[var(--color-ink-muted)]
              text-base sm:text-lg
              leading-relaxed
            ">
              Verified guides with real track records. Every operator on Quorum is vetted and accountable.
            </p>
          </div>
        </ScrollReveal>

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-52 bg-white border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] animate-pulse" />
            ))}
          </div>
        )}

        {/* Operator cards grid */}
        {!isLoading && (
          <div className="
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            gap-4 sm:gap-8
          ">
            {operators.map((op, index) => (
              <ScrollReveal
                key={op.id}
                variant="fade-up"
                delay={index * 100}
                duration={500}
              >
                <OperatorCard
                  id={op.slug}
                  name={op.name}
                  photo={op.logo_url ?? undefined}
                  verified={op.is_verified}
                  expertise={op.tagline ?? ''}
                  location={op.base_location ?? ''}
                  totalReviews={op.rating_count ?? 0}
                  averageRating={op.rating_avg ?? 0}
                  toursCompleted={op.tours_completed ?? 0}
                />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
