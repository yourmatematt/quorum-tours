'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { SuccessMessage } from '@/components/join';

/**
 * Join Success Page - Confirmation after commitment
 *
 * Shows success message with next steps.
 * Different content for join vs interest flows.
 *
 * UI Shell: All data is placeholder.
 * Per IA: "Calm, informative confirmation"
 */

// Example tour data (UI shell - would come from API in production)
const exampleTours: Record<string, {
  name: string;
  dates: string;
  currentParticipants: number;
  threshold: number;
}> = {
  'kakadu-wetlands-2026': {
    name: 'Kakadu Wetlands Expedition',
    dates: 'Mar 15-18, 2026',
    currentParticipants: 9, // Incremented after join
    threshold: 6,
  },
  'tasmania-raptors-2026': {
    name: 'Tasmania Raptor Circuit',
    dates: 'Apr 22-25, 2026',
    currentParticipants: 5, // Incremented after interest
    threshold: 6,
  },
};

// Example user email (UI shell)
const exampleUserEmail = 'sarah.mitchell@email.com';

export default function JoinSuccessPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const tourId = params.id as string;
  const flowType = (searchParams.get('type') as 'join' | 'interest') || 'interest';

  // Get tour data (UI shell)
  const tour = exampleTours[tourId] || exampleTours['tasmania-raptors-2026'];

  return (
    <main className="min-h-screen bg-[var(--color-surface)]">
      <div
        className="
          w-full max-w-[600px] mx-auto
          px-[var(--space-md)] sm:px-[var(--space-lg)]
          py-[var(--space-3xl)] sm:py-[var(--space-4xl)]
        "
      >
        <SuccessMessage
          flowType={flowType}
          tourName={tour.name}
          tourDate={tour.dates}
          email={exampleUserEmail}
          currentParticipants={flowType === 'interest' ? tour.currentParticipants : undefined}
          threshold={flowType === 'interest' ? tour.threshold : undefined}
        />
      </div>
    </main>
  );
}
