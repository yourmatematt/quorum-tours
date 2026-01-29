'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useTour } from '@/lib/supabase/useTours';
import { useAuth } from '@/lib/supabase/useAuth';
import { ShareTour } from '@/components/ui/ShareTour';

/**
 * Join Success Page - Confirmation after commitment
 *
 * Handles multiple flow types:
 * - deposit: User paid deposit for forming tour
 * - payment: User paid full amount for confirmed tour
 * - interest: User expressed interest without payment (legacy/trusted users)
 *
 * Calm, informative confirmation without celebration animations.
 * Per IA: "NO confetti or celebration animations"
 */

type FlowType = 'deposit' | 'payment' | 'interest';

// Format date range for display
function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const startMonth = startDate.toLocaleDateString('en-AU', { month: 'short' });
  const endMonth = endDate.toLocaleDateString('en-AU', { month: 'short' });
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const year = endDate.getFullYear();

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay}-${endDay}, ${year}`;
  }
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
}

export default function JoinSuccessPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const tourId = params.id as string;

  // Determine flow type from URL params
  const typeParam = searchParams.get('type');
  const flowType: FlowType =
    typeParam === 'deposit' ? 'deposit' :
    typeParam === 'payment' ? 'payment' :
    typeParam === 'join' ? 'payment' : // legacy support
    'interest';

  // Stripe payment status (from redirect)
  const paymentIntentStatus = searchParams.get('redirect_status');
  const paymentSucceeded = paymentIntentStatus === 'succeeded' || !paymentIntentStatus;

  const { tour: dbTour, isLoading } = useTour(tourId);
  const { user } = useAuth();

  const userEmail = user?.email || '';

  // Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[var(--color-surface)]">
        <div className="w-full max-w-[600px] mx-auto px-[var(--space-md)] sm:px-[var(--space-lg)] py-[var(--space-3xl)]">
          <div className="animate-pulse space-y-[var(--space-lg)]">
            <div className="w-16 h-16 bg-[var(--color-border)] rounded-full mx-auto" />
            <div className="h-8 bg-[var(--color-border)] rounded w-3/4 mx-auto" />
            <div className="h-4 bg-[var(--color-border)] rounded w-1/2 mx-auto" />
          </div>
        </div>
      </main>
    );
  }

  // Get tour data with fallbacks
  const tour = dbTour ? {
    name: dbTour.title,
    dates: formatDateRange(dbTour.date_start, dbTour.date_end),
    location: (dbTour.operator as any)?.base_location || 'Australia',
    operatorName: dbTour.operator?.name || 'Tour Operator',
    currentParticipants: dbTour.current_participants,
    threshold: dbTour.threshold,
    deposit: dbTour.deposit_cents / 100,
    price: dbTour.price_cents / 100,
    slug: dbTour.slug,
    isConfirmed: dbTour.status === 'confirmed',
  } : null;

  // Calculate spots needed for sharing prompt
  const spotsNeeded = tour ? tour.threshold - tour.currentParticipants : 0;
  const needsMorePeople = spotsNeeded > 0;

  // Build tour URL for sharing
  const tourUrl = typeof window !== 'undefined' && tour
    ? `${window.location.origin}/tours/${tour.slug}`
    : '';

  // Payment failed state
  if (!paymentSucceeded) {
    return (
      <main className="min-h-screen bg-[var(--color-surface)]">
        <div className="w-full max-w-[600px] mx-auto px-[var(--space-md)] sm:px-[var(--space-lg)] py-[var(--space-3xl)]">
          <div className="text-center">
            {/* Error Icon */}
            <div
              className="
                w-16 h-16 mx-auto mb-[var(--space-lg)]
                flex items-center justify-center
                bg-[var(--color-destructive-bg)]
                rounded-full
              "
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                stroke="var(--color-destructive)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="16" cy="16" r="12" />
                <line x1="12" y1="12" x2="20" y2="20" />
                <line x1="20" y1="12" x2="12" y2="20" />
              </svg>
            </div>

            <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)] mb-[var(--space-sm)]">
              Payment unsuccessful
            </h1>
            <p className="text-[var(--color-ink-muted)] mb-[var(--space-2xl)]">
              Your payment couldn't be processed. No charges were made.
            </p>

            <div className="flex flex-col sm:flex-row gap-[var(--space-md)] justify-center">
              <Link
                href={tour ? `/tours/${tour.slug}/join/payment?type=${flowType}` : '/tours'}
                className="
                  inline-flex items-center justify-center
                  h-12 px-[var(--space-xl)]
                  text-sm font-semibold
                  text-[var(--color-ink)]
                  bg-[var(--color-accent)]
                  rounded-[var(--radius-md)]
                  hover:bg-[var(--color-accent-hover)]
                  transition-colors
                "
              >
                Try again
              </Link>
              <Link
                href="/tours"
                className="
                  inline-flex items-center justify-center
                  h-12 px-[var(--space-xl)]
                  text-sm font-medium
                  text-[var(--color-ink-muted)]
                  hover:text-[var(--color-ink)]
                  transition-colors
                "
              >
                Browse other tours
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-surface)]">
      <div
        className="
          w-full max-w-[600px] mx-auto
          px-[var(--space-md)] sm:px-[var(--space-lg)]
          py-[var(--space-3xl)] sm:py-[var(--space-4xl)]
        "
      >
        <div className="text-center">
          {/* Success Icon */}
          <div
            className="
              w-16 h-16 mx-auto mb-[var(--space-lg)]
              flex items-center justify-center
              bg-[var(--color-confirmed-bg)]
              rounded-full
            "
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              stroke="var(--color-confirmed)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8 16l6 6 10-12" />
            </svg>
          </div>

          {/* Primary Message */}
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--color-ink)] mb-[var(--space-sm)]">
            {flowType === 'payment' && "You're in!"}
            {flowType === 'deposit' && 'Commitment confirmed!'}
            {flowType === 'interest' && 'Interest registered!'}
          </h1>

          {/* Secondary Message */}
          <p className="text-[var(--color-ink-muted)] mb-[var(--space-2xl)]">
            {flowType === 'payment' && tour && (
              <>Your spot on <strong className="text-[var(--color-ink)]">{tour.name}</strong> is reserved.</>
            )}
            {flowType === 'deposit' && tour && (
              <>Your deposit for <strong className="text-[var(--color-ink)]">{tour.name}</strong> has been received.</>
            )}
            {flowType === 'interest' && tour && (
              <>You've expressed interest in <strong className="text-[var(--color-ink)]">{tour.name}</strong>.</>
            )}
          </p>

          {/* What's Next Section */}
          <div
            className="
              bg-[var(--color-surface-raised)]
              border-2 border-[var(--color-border)]
              rounded-[var(--radius-organic)]
              p-[var(--space-lg)]
              text-left
              mb-[var(--space-2xl)]
              shadow-[var(--shadow-card)]
            "
          >
            <h2 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-[var(--space-md)]">
              What happens next
            </h2>

            {flowType === 'payment' && (
              <ul className="space-y-[var(--space-sm)] text-sm text-[var(--color-ink-muted)]">
                <li className="flex items-start gap-[var(--space-sm)]">
                  <span className="text-[var(--color-confirmed)] mt-0.5 flex-shrink-0">✓</span>
                  <span>
                    Confirmation email sent to <strong className="text-[var(--color-ink)]">{userEmail}</strong>
                  </span>
                </li>
                <li className="flex items-start gap-[var(--space-sm)]">
                  <span className="text-[var(--color-confirmed)] mt-0.5 flex-shrink-0">✓</span>
                  <span>
                    Tour details and meeting instructions will arrive closer to {tour?.dates}
                  </span>
                </li>
                <li className="flex items-start gap-[var(--space-sm)]">
                  <span className="text-[var(--color-confirmed)] mt-0.5 flex-shrink-0">✓</span>
                  <span>You can manage your booking from your profile</span>
                </li>
              </ul>
            )}

            {flowType === 'deposit' && tour && (
              <>
                <ul className="space-y-[var(--space-sm)] text-sm text-[var(--color-ink-muted)]">
                  <li className="flex items-start gap-[var(--space-sm)]">
                    <span className="text-[var(--color-forming)] mt-0.5 flex-shrink-0">•</span>
                    <span>
                      Your <strong className="text-[var(--color-ink)]">${tour.deposit}</strong> deposit is held securely
                    </span>
                  </li>
                  <li className="flex items-start gap-[var(--space-sm)]">
                    <span className="text-[var(--color-forming)] mt-0.5 flex-shrink-0">•</span>
                    <span>
                      We'll email <strong className="text-[var(--color-ink)]">{userEmail}</strong> when the tour reaches quorum
                    </span>
                  </li>
                  <li className="flex items-start gap-[var(--space-sm)]">
                    <span className="text-[var(--color-forming)] mt-0.5 flex-shrink-0">•</span>
                    <span>
                      You'll have <strong className="text-[var(--color-ink)]">24 hours</strong> to pay the remaining ${tour.price - tour.deposit}
                    </span>
                  </li>
                </ul>

                {/* Refund note */}
                <div
                  className="
                    mt-[var(--space-md)]
                    pt-[var(--space-md)]
                    border-t border-[var(--color-border)]
                  "
                >
                  <p className="text-sm text-[var(--color-ink-subtle)]">
                    If the tour doesn't reach quorum, your deposit is <strong className="text-[var(--color-ink)]">fully refunded</strong>.
                  </p>
                </div>
              </>
            )}

            {flowType === 'interest' && (
              <ul className="space-y-[var(--space-sm)] text-sm text-[var(--color-ink-muted)]">
                <li className="flex items-start gap-[var(--space-sm)]">
                  <span className="text-[var(--color-forming)] mt-0.5 flex-shrink-0">•</span>
                  <span>
                    We'll email <strong className="text-[var(--color-ink)]">{userEmail}</strong> when the tour confirms
                  </span>
                </li>
                {tour && (
                  <li className="flex items-start gap-[var(--space-sm)]">
                    <span className="text-[var(--color-forming)] mt-0.5 flex-shrink-0">•</span>
                    <span>
                      Current progress: <strong className="text-[var(--color-ink)]">{tour.currentParticipants}</strong> of <strong className="text-[var(--color-ink)]">{tour.threshold}</strong> participants
                    </span>
                  </li>
                )}
                <li className="flex items-start gap-[var(--space-sm)]">
                  <span className="text-[var(--color-forming)] mt-0.5 flex-shrink-0">•</span>
                  <span>You can withdraw anytime from your profile</span>
                </li>
              </ul>
            )}
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row gap-[var(--space-md)] justify-center">
            <Link
              href="/profile"
              className="
                inline-flex items-center justify-center
                h-12
                px-[var(--space-xl)]
                text-sm
                font-semibold
                text-[var(--color-ink)]
                bg-[var(--color-accent)]
                rounded-[var(--radius-md)]
                hover:bg-[var(--color-accent-hover)]
                focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2
                transition-colors
              "
            >
              View in your profile
            </Link>
            <Link
              href="/tours"
              className="
                inline-flex items-center justify-center
                h-12
                px-[var(--space-xl)]
                text-sm
                font-medium
                text-[var(--color-primary)]
                bg-transparent
                border-2 border-[var(--color-border)]
                rounded-[var(--radius-md)]
                hover:border-[var(--color-primary)]
                focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
                transition-colors
              "
            >
              Browse more tours
            </Link>
          </div>
        </div>

        {/* Share prompt for forming tours that need more people */}
        {flowType === 'deposit' && needsMorePeople && tour && (
          <div className="mt-[var(--space-xl)]">
            <ShareTour
              tourName={tour.name}
              tourDate={tour.dates}
              tourLocation={tour.location}
              operatorName={tour.operatorName}
              targetSpecies=""
              spotsNeeded={spotsNeeded}
              tourUrl={tourUrl}
            />
          </div>
        )}
      </div>
    </main>
  );
}
