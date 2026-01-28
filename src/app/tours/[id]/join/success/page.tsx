'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { SuccessMessage } from '@/components/join';
import { ShareTour } from '@/components/ui/ShareTour';

/**
 * Join Success Page - Confirmation after commitment
 *
 * Shows success message with next steps.
 * Different content for join vs interest flows.
 * Prompts sharing for forming tours that need more participants.
 *
 * UI Shell: All data is placeholder.
 * Per IA: "Calm, informative confirmation"
 */

// Example tour data (UI shell - would come from API in production)
const exampleTours: Record<string, {
  name: string;
  dates: string;
  location: string;
  operatorName: string;
  targetSpecies: string;
  currentParticipants: number;
  threshold: number;
}> = {
  'kakadu-wetlands-2026': {
    name: 'Kakadu Wetlands Expedition',
    dates: 'Mar 15-18, 2026',
    location: 'Kakadu, Northern Territory',
    operatorName: 'Outback Birding Co',
    targetSpecies: 'Gouldian Finch, Rainbow Pitta',
    currentParticipants: 9, // Incremented after join
    threshold: 6,
  },
  'tasmania-raptors-2026': {
    name: 'Tasmania Raptor Circuit',
    dates: 'Apr 22-25, 2026',
    location: 'Tasmania',
    operatorName: 'Wings & Wilderness',
    targetSpecies: 'Wedge-tailed Eagle, Grey Goshawk',
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

  // Calculate spots needed
  const spotsNeeded = tour.threshold - tour.currentParticipants;
  const needsMorePeople = spotsNeeded > 0;

  // Build tour URL for sharing (in production, use actual URL)
  const tourUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/tours/${tourId}`
    : `https://quorumtours.com/tours/${tourId}`;

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
          quorum={flowType === 'interest' ? tour.threshold : undefined}
        />

        {/* Share prompt for forming tours that need more people */}
        {flowType === 'interest' && needsMorePeople && (
          <div className="mt-[var(--space-xl)]">
            <ShareTour
              tourName={tour.name}
              tourDate={tour.dates}
              tourLocation={tour.location}
              operatorName={tour.operatorName}
              targetSpecies={tour.targetSpecies}
              spotsNeeded={spotsNeeded}
              tourUrl={tourUrl}
            />
          </div>
        )}
      </div>
    </main>
  );
}
