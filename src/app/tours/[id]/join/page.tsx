'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  TourConfirmationSummary,
  JoinForm,
  InterestForm,
  PaymentSection,
  CommitmentSummary,
} from '@/components/join';
import { Button } from '@/components/ui/Button';

/**
 * Join Tour Page - Commitment flow for tours
 *
 * Handles two flows:
 * 1. Confirmed tours: Full join with payment
 * 2. Forming tours: Express interest (no payment)
 *
 * UI Shell: All data is placeholder. No backend integration.
 * Per IA: "Commitment is conditional, not binding"
 */

// Example tour data (UI shell - would come from API in production)
const exampleTours: Record<string, {
  name: string;
  dates: string;
  location: string;
  operatorName: string;
  status: 'confirmed' | 'forming';
  currentParticipants: number;
  threshold: number;
  price: number;
  cancellationDeadline: string;
}> = {
  'kakadu-wetlands-2026': {
    name: 'Kakadu Wetlands Expedition',
    dates: 'Mar 15-18, 2026',
    location: 'Northern Territory',
    operatorName: 'Outback Birding Co',
    status: 'confirmed',
    currentParticipants: 8,
    threshold: 6,
    price: 1850,
    cancellationDeadline: 'Feb 15, 2026',
  },
  'tasmania-raptors-2026': {
    name: 'Tasmania Raptor Circuit',
    dates: 'Apr 22-25, 2026',
    location: 'Tasmania',
    operatorName: 'Wings & Wilderness',
    status: 'forming',
    currentParticipants: 4,
    threshold: 6,
    price: 1650,
    cancellationDeadline: 'Mar 22, 2026',
  },
};

// Example user (UI shell - would come from auth in production)
const exampleUser = {
  email: 'sarah.mitchell@email.com',
  phone: '0412 345 678',
  isAuthenticated: true, // Toggle to test auth gate
};

export default function JoinTourPage() {
  const params = useParams();
  const router = useRouter();
  const tourId = params.id as string;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get tour data (UI shell)
  const tour = exampleTours[tourId] || exampleTours['tasmania-raptors-2026'];
  const isConfirmed = tour.status === 'confirmed';

  // Handle form submission (UI shell)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Navigate to success page
    router.push(`/tours/${tourId}/join/success?type=${isConfirmed ? 'join' : 'interest'}`);
  };

  // Auth gate (UI shell - would check real auth in production)
  if (!exampleUser.isAuthenticated) {
    return (
      <main className="min-h-screen bg-[var(--color-surface)]">
        <div
          className="
            w-full max-w-[600px] mx-auto
            px-[var(--space-md)] sm:px-[var(--space-lg)]
            py-[var(--space-2xl)] sm:py-[var(--space-3xl)]
          "
        >
          {/* Auth Gate */}
          <div
            className="
              bg-[var(--color-surface-raised)]
              border border-[var(--color-border)]
              rounded-[var(--radius-lg)]
              p-[var(--space-xl)] sm:p-[var(--space-2xl)]
              text-center
            "
          >
            <h1
              className="
                font-display
                text-[var(--text-xl)] sm:text-[var(--text-2xl)]
                text-[var(--color-ink)]
                mb-[var(--space-md)]
              "
            >
              Sign in to continue
            </h1>
            <p className="text-[var(--color-ink-muted)] mb-[var(--space-xl)] max-w-[40ch] mx-auto">
              To commit to this tour, you&apos;ll need an account. This lets us
              notify you when the tour confirms and track your commitments.
            </p>

            <div className="flex flex-col sm:flex-row gap-[var(--space-md)] justify-center">
              <Link
                href={`/login?redirect=/tours/${tourId}/join`}
                className="
                  inline-flex items-center justify-center
                  h-12
                  px-[var(--space-xl)]
                  text-[var(--text-sm)]
                  font-medium
                  text-white
                  bg-[var(--color-accent)]
                  rounded-[var(--radius-md)]
                  hover:opacity-90
                  focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2
                  transition-opacity duration-[var(--transition-fast)]
                "
              >
                Sign in
              </Link>
              <Link
                href={`/signup?redirect=/tours/${tourId}/join`}
                className="
                  inline-flex items-center justify-center
                  h-12
                  px-[var(--space-xl)]
                  text-[var(--text-sm)]
                  font-medium
                  text-[var(--color-accent)]
                  bg-transparent
                  border border-[var(--color-accent)]
                  rounded-[var(--radius-md)]
                  hover:bg-[var(--color-accent)] hover:text-white
                  focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2
                  transition-colors duration-[var(--transition-fast)]
                "
              >
                Create account
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
          py-[var(--space-2xl)] sm:py-[var(--space-3xl)]
        "
      >
        {/* Breadcrumb */}
        <nav className="mb-[var(--space-lg)]" aria-label="Breadcrumb">
          <ol className="flex items-center gap-[var(--space-xs)] text-[var(--text-sm)] text-[var(--color-ink-muted)]">
            <li>
              <Link href="/tours" className="hover:text-[var(--color-accent)]">
                Tours
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link href={`/tours/${tourId}`} className="hover:text-[var(--color-accent)]">
                {tour.name}
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li className="text-[var(--color-ink)]">
              {isConfirmed ? 'Join' : 'Express Interest'}
            </li>
          </ol>
        </nav>

        {/* Page Title */}
        <h1
          className="
            font-display
            text-[var(--text-2xl)] sm:text-[var(--text-3xl)]
            text-[var(--color-ink)]
            mb-[var(--space-xl)]
          "
        >
          {isConfirmed ? 'Join this tour' : 'Express interest'}
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Tour Summary */}
          <div className="mb-[var(--space-xl)]">
            <TourConfirmationSummary
              tourName={tour.name}
              tourDates={tour.dates}
              location={tour.location}
              operatorName={tour.operatorName}
              status={tour.status}
              currentParticipants={tour.currentParticipants}
              threshold={tour.threshold}
            />
          </div>

          {/* Section 2: Information Collection */}
          <div className="mb-[var(--space-xl)]">
            {isConfirmed ? (
              <JoinForm
                defaultEmail={exampleUser.email}
                defaultPhone={exampleUser.phone}
              />
            ) : (
              <InterestForm defaultEmail={exampleUser.email} />
            )}
          </div>

          {/* Section 3: Payment (Confirmed tours only) */}
          {isConfirmed && (
            <div className="mb-[var(--space-xl)]">
              <PaymentSection
                price={tour.price}
                priceNote="Includes transport, meals, and guide fees"
              />
            </div>
          )}

          {/* Section 4: Commitment Summary */}
          <div className="mb-[var(--space-xl)]">
            <CommitmentSummary
              status={tour.status}
              tourName={tour.name}
              tourDate={tour.dates}
              price={tour.price}
              cancellationDeadline={tour.cancellationDeadline}
            />
          </div>

          {/* Section 5: Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="w-full sm:w-auto min-w-[200px]"
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
                  {isConfirmed ? 'Reserving...' : 'Registering...'}
                </>
              ) : (
                isConfirmed ? 'Reserve My Spot' : 'Express Interest'
              )}
            </Button>

            <p className="text-[var(--text-sm)] text-[var(--color-ink-muted)] mt-[var(--space-md)]">
              {isConfirmed
                ? `You'll receive confirmation at ${exampleUser.email}`
                : "We'll notify you when this tour confirms"}
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
