import { Metadata } from 'next';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import {
  ProfileHeader,
  CommitmentsSection,
  PastToursSection,
  SettingsSection,
} from '@/components/profile';

export const metadata: Metadata = {
  title: 'Your Profile — Quorum Tours',
  description: 'Manage your tour commitments and account settings.',
};

/**
 * Profile Page - User dashboard
 *
 * Primary job: Calm, functional dashboard to manage tour
 * commitments and account. Not a social profile or achievement display.
 *
 * Per IA:
 * - Profile exists to manage commitments, not display status
 * - No progression bars, levels, XP, or achievement badges
 * - No social comparison or peer visibility
 * - Institutional, understated visual treatment
 *
 * UI Shell: All data is placeholder/example for Phase 2.
 */

// Example user data (UI shell - would come from auth in production)
const exampleUser = {
  displayName: 'Sarah Mitchell',
  email: 'sarah.mitchell@email.com',
  memberSince: 'January 2025',
};

// Example commitments (UI shell - would come from API in production)
const exampleCommitments = [
  {
    tourId: 'kakadu-wetlands-2026',
    tourName: 'Kakadu Wetlands Expedition',
    tourDates: 'Mar 15-18, 2026',
    operatorId: 'outback-birding',
    operatorName: 'Outback Birding Co',
    location: 'Northern Territory',
    status: 'confirmed' as const,
    currentParticipants: 8,
    threshold: 6,
  },
  {
    tourId: 'tasmania-raptors-2026',
    tourName: 'Tasmania Raptor Circuit',
    tourDates: 'Apr 22-25, 2026',
    operatorId: 'wings-wilderness',
    operatorName: 'Wings & Wilderness',
    location: 'Tasmania',
    status: 'forming' as const,
    currentParticipants: 4,
    threshold: 6,
  },
];

// Example past tours (UI shell)
const examplePastTours = [
  {
    id: 'broome-shorebirds-2025',
    title: 'Broome Shorebird Migration',
    date: 'Sep 12-15, 2025',
    outcome: 'completed' as const,
    participantCount: 8,
  },
  {
    id: 'cairns-rainforest-2025',
    title: 'Cairns Rainforest Endemics',
    date: 'Jul 5-8, 2025',
    outcome: 'completed' as const,
    participantCount: 6,
  },
  {
    id: 'phillip-island-2025',
    title: 'Phillip Island Pelagic',
    date: 'May 20, 2025',
    outcome: 'cancelled' as const,
  },
];

export default function ProfilePage() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-[var(--color-surface)]">
      <div
        className="
          w-full max-w-[1000px] mx-auto
          px-4 sm:px-6
          py-6 sm:py-8
        "
      >
        {/* Profile Header */}
        <div className="mb-6">
          <ProfileHeader
            displayName={exampleUser.displayName}
            email={exampleUser.email}
            memberSince={exampleUser.memberSince}
          />
        </div>

        {/* Active Commitments - Primary section */}
        <div className="mb-6">
          <CommitmentsSection commitments={exampleCommitments} />
        </div>

        {/* Past Tours + Account Settings - Side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PastToursSection tours={examplePastTours} />
          <SettingsSection />
        </div>
      </div>
    </main>
    </ErrorBoundary>
  );
}
