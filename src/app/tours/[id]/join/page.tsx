'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import {
  JoinForm,
  InterestForm,
  PaymentSection,
  DepositSection,
  CommitmentSummary,
} from '@/components/join';
import { Button } from '@/components/ui/Button';
import { ConfirmationStatusBadge } from '@/components/ui/ConfirmationStatusBadge';
import { EmptyState } from '@/components/ui/EmptyState';
import { QuorumProgressBar } from '@/components/ui/QuorumProgressBar';
import { useTour } from '@/lib/supabase/useTours';
import { useAuth } from '@/lib/supabase/useAuth';

/**
 * Join Tour Page - Commitment flow for tours
 *
 * Desktop: Two-column layout
 *   Left (sticky): Tour summary, price, quorum progress
 *   Right: Form, payment details, terms, submit
 *
 * Mobile: Stacked single column
 *
 * Handles two flows:
 * 1. Confirmed tours: Full join with payment
 * 2. Forming tours: Express interest (deposit if required)
 */

type ConfirmationStatus = 'confirmed' | 'forming' | 'not-running';

// Map database status to display status
function mapStatus(dbStatus: string): ConfirmationStatus {
  switch (dbStatus) {
    case 'confirmed':
    case 'completed':
      return 'confirmed';
    case 'forming':
    case 'payment_pending':
      return 'forming';
    case 'cancelled':
    default:
      return 'not-running';
  }
}

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

// Format cancellation deadline
function formatCancellationDeadline(bookingDeadline: string): string {
  const date = new Date(bookingDeadline);
  return date.toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function JoinTourPage() {
  const params = useParams();
  const router = useRouter();
  const tourId = params.id as string;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch tour data from database
  const { tour: dbTour, isLoading, error } = useTour(tourId);
  const { user } = useAuth();

  // Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[var(--color-surface)]">
        <div className="w-full max-w-6xl mx-auto px-[var(--space-lg)] py-[var(--space-xl)]">
          <div className="animate-pulse space-y-[var(--space-lg)]">
            <div className="h-4 bg-[var(--color-border)] rounded w-1/3" />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-[var(--space-xl)]">
              <div className="lg:col-span-2 h-[400px] bg-[var(--color-border)] rounded-[var(--radius-organic)]" />
              <div className="lg:col-span-3 space-y-[var(--space-lg)]">
                <div className="h-[200px] bg-[var(--color-border)] rounded-[var(--radius-organic)]" />
                <div className="h-[200px] bg-[var(--color-border)] rounded-[var(--radius-organic)]" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !dbTour) {
    return (
      <main className="min-h-screen bg-[var(--color-surface)]">
        <div className="w-full max-w-6xl mx-auto px-[var(--space-lg)] py-[var(--space-xl)]">
          <EmptyState
            title="Tour not found"
            description={error || "The tour you're looking for doesn't exist or has been removed."}
            actionLabel="Browse all tours"
            onAction={() => (window.location.href = '/tours')}
          />
        </div>
      </main>
    );
  }

  // Map database tour to display format
  const tour = {
    id: dbTour.id,
    slug: dbTour.slug,
    name: dbTour.title,
    dates: formatDateRange(dbTour.date_start, dbTour.date_end),
    location: (dbTour.operator as any)?.base_location || 'Australia',
    operatorName: dbTour.operator?.name || 'Unknown Operator',
    status: mapStatus(dbTour.status),
    currentParticipants: dbTour.current_participants,
    threshold: dbTour.threshold,
    capacity: dbTour.capacity,
    price: dbTour.price_cents / 100,
    deposit: dbTour.deposit_cents / 100,
    cancellationDeadline: formatCancellationDeadline(dbTour.booking_deadline),
    included: dbTour.included || ['Transport', 'Guide fees'],
  };

  // Quorum logic: if current participants >= threshold, tour is "confirmed" for booking purposes
  // New users joining a confirmed tour pay full price immediately
  const hasReachedQuorum = tour.currentParticipants >= tour.threshold;
  const isConfirmed = tour.status === 'confirmed' || hasReachedQuorum;
  const requiresDeposit = tour.deposit > 0 && !hasReachedQuorum;
  const userEmail = user?.email || '';

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isConfirmed) {
        // For confirmed tours: redirect to embedded payment page for full payment
        router.push(`/tours/${tour.slug}/join/payment?type=full`);
      } else if (requiresDeposit) {
        // For forming tours with deposit: redirect to embedded payment page for deposit
        router.push(`/tours/${tour.slug}/join/payment?type=deposit`);
      } else {
        // For forming tours without deposit: express interest only
        // TODO: Create reservation in database
        await new Promise((resolve) => setTimeout(resolve, 1500));
        router.push(`/tours/${tour.slug}/join/success?type=interest`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };;;

  // Auth gate - redirect to login if not authenticated
  if (!user) {
    return (
      <ErrorBoundary>
        <main className="min-h-screen bg-[var(--color-surface)]">
          <div className="min-h-[calc(100vh-80px)] flex items-center">
            <div className="w-full max-w-md mx-auto px-[var(--space-md)]">
              <div
                className="
                  bg-[var(--color-surface-raised)]
                  border-2 border-[var(--color-border)]
                  rounded-[var(--radius-organic)]
                  p-[var(--space-xl)]
                  text-center
                  shadow-[var(--shadow-card)]
                "
              >
                <h1
                  className="
                    font-display
                    text-xl
                    font-semibold
                    text-[var(--color-ink)]
                    mb-[var(--space-sm)]
                  "
                >
                  Sign in to continue
                </h1>
                <p className="text-sm text-[var(--color-ink-muted)] mb-[var(--space-lg)]">
                  To commit to this tour, you'll need an account. This lets us
                  notify you when the tour confirms.
                </p>

                <div className="flex flex-col gap-[var(--space-sm)]">
                  <Link
                    href={`/login?redirect=/tours/${tour.slug}/join`}
                    className="
                      inline-flex items-center justify-center
                      h-11
                      px-[var(--space-lg)]
                      text-base font-semibold
                      text-[var(--color-ink)]
                      bg-[var(--color-accent)]
                      rounded-[var(--radius-md)]
                      hover:bg-[var(--color-accent-hover)]
                      transition-colors
                    "
                  >
                    Sign in
                  </Link>
                  <Link
                    href={`/signup?redirect=/tours/${tour.slug}/join`}
                    className="
                      inline-flex items-center justify-center
                      h-11
                      px-[var(--space-lg)]
                      text-base font-medium
                      text-[var(--color-primary)]
                      bg-transparent
                      border-2 border-[var(--color-border)]
                      rounded-[var(--radius-md)]
                      hover:border-[var(--color-primary)]
                      transition-colors
                    "
                  >
                    Create account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-[var(--color-surface)]">
        <div className="w-full max-w-[var(--container-max)] mx-auto px-[var(--space-md)] sm:px-[var(--space-lg)] py-[var(--space-lg)]">
          {/* Breadcrumb */}
          <nav className="mb-[var(--space-md)]" aria-label="Breadcrumb">
            <ol className="flex items-center gap-[var(--space-xs)] text-sm text-[var(--color-ink-muted)]">
              <li>
                <Link href="/tours" className="hover:text-[var(--color-primary)]">
                  Tours
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>
                <Link href={`/tours/${tour.slug}`} className="hover:text-[var(--color-primary)]">
                  {tour.name}
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li className="text-[var(--color-ink)]">
                {isConfirmed ? 'Join' : 'Commit'}
              </li>
            </ol>
          </nav>

          {/* Two-column layout */}
          <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-[var(--space-xl)]">

              {/* Left Column - Form Flow */}
              <div className="flex-1 min-w-0">
                <div className="space-y-[var(--space-lg)]">
                  {/* Page Title - Mobile shows here, desktop in left column */}
                  <div className="lg:hidden">
                    <h1
                      className="
                        font-display
                        text-2xl
                        font-semibold
                        text-[var(--color-ink)]
                        mb-[var(--space-sm)]
                      "
                    >
                      {isConfirmed ? 'Join this tour' : 'Commit to this tour'}
                    </h1>
                  </div>

                  {/* Desktop title */}
                  <div className="hidden lg:block">
                    <h2
                      className="
                        font-display
                        text-2xl
                        font-semibold
                        text-[var(--color-ink)]
                        mb-[var(--space-xs)]
                      "
                    >
                      {isConfirmed ? 'Complete your booking' : 'Confirm your commitment'}
                    </h2>
                    <p className="text-sm text-[var(--color-ink-muted)]">
                      {isConfirmed
                        ? 'Fill in your details to reserve your spot.'
                        : "You'll be notified when this tour reaches quorum."}
                    </p>
                  </div>

                  {/* Section 1: Information Collection */}
                  {isConfirmed ? (
                    <JoinForm
                      defaultEmail={userEmail}
                      defaultPhone=""
                    />
                  ) : (
                    <InterestForm defaultEmail={userEmail} requiresDeposit={requiresDeposit} />
                  )}

                  {/* Section 2: Payment/Deposit - only show if required */}
                  {isConfirmed ? (
                    <PaymentSection
                      price={tour.price}
                      priceNote="Includes transport, meals, and guide fees"
                    />
                  ) : requiresDeposit ? (
                    <DepositSection
                      price={tour.price}
                      deposit={tour.deposit}
                    />
                  ) : null}

                  {/* Section 3: Commitment Summary */}
                  <CommitmentSummary
                    status={tour.status}
                    tourName={tour.name}
                    tourDate={tour.dates}
                    price={tour.price}
                    deposit={tour.deposit}
                    cancellationDeadline={tour.cancellationDeadline}
                  />
                </div>
              </div>

              {/* Right Column - Tour Summary (Sticky on desktop) */}
              <div className="lg:w-[340px] flex-shrink-0 lg:pt-[6.5rem]">
                <div className="lg:sticky lg:top-[calc(57px+2.5rem)]">
                <div
                  className="
                    bg-[var(--color-surface-raised)]
                    border-2 border-[var(--color-border)]
                    rounded-[var(--radius-organic)]
                    overflow-hidden
                    shadow-[var(--shadow-card)]
                  "
                >
                  {/* Tour Header */}
                  <div className="p-[var(--space-lg)] border-b border-[var(--color-border)]">
                    <div className="flex items-start justify-between gap-[var(--space-sm)] mb-[var(--space-sm)]">
                      <h1
                        className="
                          font-display
                          text-xl
                          font-semibold
                          text-[var(--color-ink)]
                        "
                      >
                        {tour.name}
                      </h1>
                      <ConfirmationStatusBadge status={tour.status} />
                    </div>
                    <p className="text-sm text-[var(--color-ink-muted)]">
                      {tour.dates} · {tour.location}
                    </p>
                    <p className="text-sm text-[var(--color-ink-muted)]">
                      Led by {tour.operatorName}
                    </p>
                  </div>

                  {/* Quorum Progress - Only for forming tours */}
                  {!isConfirmed && (
                    <div className="p-[var(--space-lg)] border-b border-[var(--color-border)] bg-[var(--color-surface-sunken)]">
                      <QuorumProgressBar
                        current={tour.currentParticipants}
                        quorum={tour.threshold}
                        capacity={tour.capacity}
                      />
                      <p className="text-xs text-[var(--color-ink-subtle)] mt-[var(--space-sm)]">
                        {tour.threshold - tour.currentParticipants} more commitments needed
                      </p>
                    </div>
                  )}

                  {/* Confirmed badge for confirmed tours */}
                  {isConfirmed && (
                    <div className="p-[var(--space-lg)] border-b border-[var(--color-border)] bg-[var(--color-primary-subtle)]">
                      <div className="flex items-center gap-[var(--space-sm)]">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--color-primary)"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-sm font-medium text-[var(--color-primary)]">
                          This tour is confirmed and running
                        </p>
                      </div>
                      <p className="text-xs text-[var(--color-ink-muted)] mt-[var(--space-xs)] ml-7">
                        {tour.currentParticipants} participants already joined
                      </p>
                    </div>
                  )}

                  {/* Price Display */}
                  <div className="p-[var(--space-lg)]">
                    <div className="flex items-baseline justify-between mb-[var(--space-md)]">
                      <span className="text-sm text-[var(--color-ink-muted)]">Tour price</span>
                      <span className="font-mono text-2xl font-medium text-[var(--color-ink)]">
                        ${tour.price}
                      </span>
                    </div>

                    {/* What's included */}
                    <div className="pt-[var(--space-md)] border-t border-[var(--color-border)]">
                      <p className="text-xs font-medium text-[var(--color-ink)] mb-[var(--space-sm)]">
                        Included
                      </p>
                      <div className="flex flex-wrap gap-[var(--space-xs)]">
                        {tour.included.map((item) => (
                          <span
                            key={item}
                            className="
                              text-xs
                              px-[var(--space-sm)] py-1
                              bg-[var(--color-surface-sunken)]
                              text-[var(--color-ink-muted)]
                              rounded-full
                            "
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="p-[var(--space-lg)] border-t border-[var(--color-border)]">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                      className="
                        w-full
                        !bg-[var(--color-accent)]
                        !text-[var(--color-ink)]
                        hover:!bg-[var(--color-accent-hover)]
                        !rounded-[var(--radius-organic)]
                        !font-semibold
                        !shadow-[var(--shadow-card)]
                        !h-12
                        transition-all duration-200
                      "
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          {isConfirmed ? 'Processing...' : 'Registering...'}
                        </>
                      ) : (
                        isConfirmed ? 'Reserve My Spot' : 'Commit'
                      )}
                    </Button>

                    <p className="text-sm text-[var(--color-ink-muted)] text-center mt-[var(--space-md)]">
                      {isConfirmed
                        ? `Confirmation will be sent to ${userEmail}`
                        : "We'll notify you when this tour confirms"}
                    </p>

                    {/* Trust note */}
                    <div className="mt-[var(--space-md)] pt-[var(--space-md)] border-t border-[var(--color-border)]">
                      <p className="text-xs text-[var(--color-ink-subtle)] text-center">
                        {isConfirmed
                          ? 'Secure payment processed by Stripe. Your card details are never stored on our servers.'
                          : 'If the tour doesn\'t reach quorum, any deposit is fully refunded.'}
                      </p>
                    </div>
                  </div>

                </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </ErrorBoundary>
  );
}
