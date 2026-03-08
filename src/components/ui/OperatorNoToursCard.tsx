'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/supabase/useAuth';
import { createClient } from '@/lib/supabase/client';

interface OperatorNoToursCardProps {
  operatorFirstName: string;
}

export function OperatorNoToursCard({ operatorFirstName }: OperatorNoToursCardProps) {
  const { user, isLoading: authLoading } = useAuth();
  const [chaseListCount, setChaseListCount] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;

    async function fetchCount() {
      const supabase = createClient();
      const { count } = await supabase
        .from('chase_list')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user!.id);

      setChaseListCount(count ?? 0);
    }

    fetchCount();
  }, [user]);

  // Derive CTA state
  let ctaLabel: string;
  let ctaHref: string;

  if (!user) {
    ctaLabel = 'Start your chase list';
    ctaHref = '/signup';
  } else if (chaseListCount && chaseListCount > 0) {
    ctaLabel = 'View your chase list \u2192';
    ctaHref = '/profile';
  } else {
    ctaLabel = 'Start your chase list';
    ctaHref = '/profile';
  }

  return (
    <section aria-label="Upcoming tours">
      <div className="
        bg-[var(--color-primary-subtle)]
        border-2 border-[var(--color-border)]
        rounded-[var(--radius-organic)]
        shadow-[var(--shadow-card)]
        px-[var(--space-md)] py-[var(--space-lg)] sm:px-[var(--space-xl)] sm:py-[var(--space-xl)]
      ">
        <h2 className="font-display text-xl text-[var(--color-ink)] mb-[var(--space-sm)]">
          {operatorFirstName}&rsquo;s first tours are coming soon.
        </h2>

        <p className="text-[var(--color-ink-muted)] leading-relaxed mb-[var(--space-lg)] max-w-prose">
          Add species to your chase list and you&rsquo;ll be the first notified
          when {operatorFirstName} lists a tour targeting them. No spam. Just the
          birds you&rsquo;re looking for.
        </p>

        {!authLoading && (
          <div>
            <Link
              href={ctaHref}
              className="
                block w-full sm:inline-block sm:w-auto
                px-5 py-2.5
                text-sm font-medium text-center
                bg-[var(--color-primary)] text-white
                rounded-[var(--radius-organic)]
                hover:bg-[var(--color-primary-hover)]
                transition-colors
              "
            >
              {ctaLabel}
            </Link>

            {!user && (
              <p className="text-xs text-[var(--color-ink-subtle)] mt-[var(--space-sm)]">
                Free account. No credit card.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
