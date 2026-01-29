'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useTour } from '@/lib/supabase/useTours';
import { useAuth } from '@/lib/supabase/useAuth';
import { StripeProvider, PaymentForm } from '@/components/payment';
import { QuorumProgressBar } from '@/components/ui/QuorumProgressBar';

/**
 * Embedded Payment Page - Stripe Elements integration
 *
 * Handles both deposit payments (forming tours) and full payments (confirmed tours).
 * Keeps users on-site for a seamless experience.
 *
 * Per IA: "Trust as primary conversion surface"
 * - Clear payment breakdown
 * - Transparent refund policy
 * - No hidden fees or surprises
 */

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

export default function PaymentPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const tourId = params.id as string;

  // Get payment type from URL params
  const paymentType = searchParams.get('type') as 'deposit' | 'full' | null;
  const isDeposit = paymentType === 'deposit';

  const { tour: dbTour, isLoading, error } = useTour(tourId);
  const { user } = useAuth();

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Calculate amounts
  const price = dbTour ? dbTour.price_cents / 100 : 0;
  const deposit = dbTour ? dbTour.deposit_cents / 100 : 0;
  const amount = isDeposit ? deposit : price;
  const amountCents = isDeposit ? dbTour?.deposit_cents : dbTour?.price_cents;
  const balance = price - deposit;

  // Create PaymentIntent on mount
  useEffect(() => {
    if (!dbTour || !amountCents) return;

    const tourData = dbTour; // Capture for closure

    async function createPaymentIntent() {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tourId: tourData.id,
            tourSlug: tourData.slug,
            amount: amountCents,
            tourName: tourData.title,
            userId: user?.id || 'anonymous',
            userEmail: user?.email,
            isDeposit,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to initialize payment');
        }

        const { clientSecret } = await response.json();
        setClientSecret(clientSecret);
      } catch (err) {
        console.error('Payment initialization error:', err);
        setPaymentError(err instanceof Error ? err.message : 'Failed to initialize payment');
      }
    }

    createPaymentIntent();
  }, [dbTour, amountCents, user, isDeposit]);

  // Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[var(--color-surface)]">
        <div className="w-full max-w-3xl mx-auto px-[var(--space-md)] sm:px-[var(--space-lg)] py-[var(--space-xl)]">
          <div className="animate-pulse space-y-[var(--space-lg)]">
            <div className="h-4 bg-[var(--color-border)] rounded w-1/4" />
            <div className="h-8 bg-[var(--color-border)] rounded w-1/2" />
            <div className="h-64 bg-[var(--color-border)] rounded-[var(--radius-organic)]" />
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !dbTour) {
    return (
      <main className="min-h-screen bg-[var(--color-surface)]">
        <div className="w-full max-w-3xl mx-auto px-[var(--space-md)] sm:px-[var(--space-lg)] py-[var(--space-xl)]">
          <div
            className="
              bg-[var(--color-surface-raised)]
              border-2 border-[var(--color-border)]
              rounded-[var(--radius-organic)]
              p-[var(--space-xl)]
              text-center
            "
          >
            <h1 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-[var(--space-sm)]">
              Unable to load payment
            </h1>
            <p className="text-sm text-[var(--color-ink-muted)] mb-[var(--space-lg)]">
              {error || "We couldn't find the tour you're looking for."}
            </p>
            <Link
              href="/tours"
              className="
                inline-flex items-center justify-center
                h-11 px-[var(--space-lg)]
                text-sm font-medium
                text-[var(--color-primary)]
                border-2 border-[var(--color-primary)]
                rounded-[var(--radius-md)]
                hover:bg-[var(--color-primary)] hover:text-white
                transition-colors
              "
            >
              Browse tours
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Auth gate
  if (!user) {
    return (
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
              <h1 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-[var(--space-sm)]">
                Sign in to continue
              </h1>
              <p className="text-sm text-[var(--color-ink-muted)] mb-[var(--space-lg)]">
                Please sign in to complete your payment.
              </p>
              <Link
                href={`/login?redirect=/tours/${dbTour.slug}/join/payment?type=${paymentType}`}
                className="
                  inline-flex items-center justify-center
                  h-11 px-[var(--space-lg)]
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
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Check if quorum has been reached (tour is effectively confirmed for new joiners)
  const hasReachedQuorum = dbTour.current_participants >= dbTour.threshold;

  const tour = {
    id: dbTour.id,
    slug: dbTour.slug,
    name: dbTour.title,
    dates: formatDateRange(dbTour.date_start, dbTour.date_end),
    location: (dbTour.operator as any)?.base_location || 'Australia',
    operatorName: dbTour.operator?.name || 'Unknown Operator',
    currentParticipants: dbTour.current_participants,
    threshold: dbTour.threshold,
    capacity: dbTour.capacity,
    // Tour is "confirmed" if status is confirmed OR quorum has been reached
    isConfirmed: dbTour.status === 'confirmed' || hasReachedQuorum,
  };

  return (
    <main className="min-h-screen bg-[var(--color-surface)]">
      <div className="w-full max-w-3xl mx-auto px-[var(--space-md)] sm:px-[var(--space-lg)] py-[var(--space-lg)]">
        {/* Breadcrumb */}
        <nav className="mb-[var(--space-lg)]" aria-label="Breadcrumb">
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
            <li className="text-[var(--color-ink)]">Payment</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-[var(--space-xl)]">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-3 space-y-[var(--space-lg)]">
            {/* Page Header */}
            <div>
              <h1
                className="
                  font-display
                  text-2xl
                  font-semibold
                  text-[var(--color-ink)]
                  mb-[var(--space-xs)]
                "
              >
                {isDeposit ? 'Secure your spot' : 'Complete your booking'}
              </h1>
              <p className="text-sm text-[var(--color-ink-muted)]">
                {isDeposit
                  ? 'Your deposit confirms your commitment and is applied to the total.'
                  : 'Enter your payment details to finalize your reservation.'}
              </p>
            </div>

            {/* Payment Amount Summary */}
            <div
              className="
                bg-[var(--color-surface-raised)]
                border-2 border-[var(--color-border)]
                rounded-[var(--radius-organic)]
                p-[var(--space-lg)]
                shadow-[var(--shadow-card)]
              "
            >
              <h2 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-[var(--space-md)]">
                Payment summary
              </h2>

              <div className="space-y-[var(--space-sm)]">
                {isDeposit ? (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-ink-muted)]">
                        Refundable deposit
                      </span>
                      <span className="font-mono font-medium text-[var(--color-ink)]">
                        ${deposit.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-ink-muted)]">
                        Balance due when tour confirms
                      </span>
                      <span className="font-mono text-[var(--color-ink-muted)]">
                        ${balance.toFixed(2)}
                      </span>
                    </div>
                    <div className="pt-[var(--space-sm)] border-t border-[var(--color-border)]">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-[var(--color-ink)]">
                          Total tour price
                        </span>
                        <span className="font-mono font-medium text-[var(--color-ink)]">
                          ${price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-[var(--color-ink)]">
                      Tour total
                    </span>
                    <span className="font-mono text-xl font-medium text-[var(--color-ink)]">
                      ${price.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Deposit info box */}
              {isDeposit && (
                <div
                  className="
                    mt-[var(--space-md)]
                    p-[var(--space-md)]
                    bg-[var(--color-surface-sunken)]
                    rounded-[var(--radius-md)]
                    border border-[var(--color-border)]
                  "
                >
                  <p className="text-sm text-[var(--color-ink-muted)]">
                    <strong className="text-[var(--color-ink)]">Fully refundable</strong> if the tour
                    doesn't reach quorum. Your deposit is applied toward the total—not an extra fee.
                  </p>
                </div>
              )}
            </div>

            {/* Payment Form or Loading */}
            {paymentError ? (
              <div
                className="
                  p-[var(--space-lg)]
                  bg-[var(--color-destructive-bg)]
                  border border-[var(--color-destructive-border)]
                  rounded-[var(--radius-organic)]
                "
              >
                <h3 className="font-medium text-[var(--color-destructive-text)] mb-[var(--space-sm)]">
                  Payment initialization failed
                </h3>
                <p className="text-sm text-[var(--color-destructive-text)] mb-[var(--space-md)]">
                  {paymentError}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="
                    text-sm font-medium
                    text-[var(--color-destructive-text)]
                    underline underline-offset-2
                    hover:no-underline
                  "
                >
                  Try again
                </button>
              </div>
            ) : clientSecret ? (
              <StripeProvider clientSecret={clientSecret}>
                <PaymentForm
                  tourSlug={tour.slug}
                  amount={amountCents || 0}
                  isDeposit={isDeposit}
                />
              </StripeProvider>
            ) : (
              <div
                className="
                  bg-[var(--color-surface-raised)]
                  border-2 border-[var(--color-border)]
                  rounded-[var(--radius-organic)]
                  p-[var(--space-xl)]
                "
              >
                <div className="animate-pulse space-y-[var(--space-md)]">
                  <div className="h-12 bg-[var(--color-border)] rounded-[var(--radius-md)]" />
                  <div className="h-12 bg-[var(--color-border)] rounded-[var(--radius-md)]" />
                  <div className="h-12 bg-[var(--color-border)] rounded-[var(--radius-md)]" />
                  <div className="h-14 bg-[var(--color-border)] rounded-[var(--radius-organic)]" />
                </div>
                <p className="text-sm text-[var(--color-ink-muted)] text-center mt-[var(--space-md)]">
                  Loading secure payment form...
                </p>
              </div>
            )}

            {/* Trust signals */}
            <div className="flex items-center justify-center gap-[var(--space-lg)] text-xs text-[var(--color-ink-subtle)]">
              <div className="flex items-center gap-[var(--space-xs)]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>256-bit encryption</span>
              </div>
              <div className="flex items-center gap-[var(--space-xs)]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                <span>Card details never stored</span>
              </div>
            </div>
          </div>

          {/* Right Column - Tour Summary */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-[calc(57px+1.5rem)]">
              <div
                className="
                  bg-[var(--color-surface-raised)]
                  border-2 border-[var(--color-border)]
                  rounded-[var(--radius-organic)]
                  overflow-hidden
                  shadow-[var(--shadow-card)]
                "
              >
                {/* Tour Info */}
                <div className="p-[var(--space-lg)] border-b border-[var(--color-border)]">
                  <h3 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-[var(--space-xs)]">
                    {tour.name}
                  </h3>
                  <p className="text-sm text-[var(--color-ink-muted)]">
                    {tour.dates}
                  </p>
                  <p className="text-sm text-[var(--color-ink-muted)]">
                    {tour.location}
                  </p>
                  <p className="text-sm text-[var(--color-ink-subtle)] mt-[var(--space-xs)]">
                    Led by {tour.operatorName}
                  </p>
                </div>

                {/* Quorum Progress (for deposits) */}
                {isDeposit && (
                  <div className="p-[var(--space-lg)] border-b border-[var(--color-border)] bg-[var(--color-surface-sunken)]">
                    <QuorumProgressBar
                      current={tour.currentParticipants}
                      quorum={tour.threshold}
                      capacity={tour.capacity}
                    />
                    <p className="text-xs text-[var(--color-ink-subtle)] mt-[var(--space-sm)]">
                      {tour.threshold - tour.currentParticipants > 0
                        ? `${tour.threshold - tour.currentParticipants} more needed for quorum`
                        : 'Quorum reached!'}
                    </p>
                  </div>
                )}

                {/* Tour Status */}
                {tour.isConfirmed && (
                  <div className="p-[var(--space-lg)] border-b border-[var(--color-border)] bg-[var(--color-confirmed-bg)]">
                    <div className="flex items-center gap-[var(--space-sm)]">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--color-confirmed)"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium text-[var(--color-confirmed)]">
                        Tour confirmed
                      </span>
                    </div>
                  </div>
                )}

                {/* What you're paying for */}
                <div className="p-[var(--space-lg)]">
                  <p className="text-xs font-medium text-[var(--color-ink)] mb-[var(--space-sm)]">
                    {isDeposit ? "What you're committing to" : "What's included"}
                  </p>
                  <ul className="space-y-[var(--space-xs)] text-sm text-[var(--color-ink-muted)]">
                    <li className="flex items-start gap-[var(--space-sm)]">
                      <span className="text-[var(--color-primary)] mt-0.5">•</span>
                      <span>Your reserved spot on this tour</span>
                    </li>
                    <li className="flex items-start gap-[var(--space-sm)]">
                      <span className="text-[var(--color-primary)] mt-0.5">•</span>
                      <span>Email updates as the tour develops</span>
                    </li>
                    {isDeposit && (
                      <li className="flex items-start gap-[var(--space-sm)]">
                        <span className="text-[var(--color-primary)] mt-0.5">•</span>
                        <span>Full refund if quorum isn't met</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Cancel link */}
              <div className="mt-[var(--space-md)] text-center">
                <Link
                  href={`/tours/${tour.slug}/join`}
                  className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] underline underline-offset-2"
                >
                  ← Back to tour details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
