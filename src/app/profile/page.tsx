import { Metadata } from 'next';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import {
  ProfileHeader,
  EnhancedTourCard,
  ChaseListSection,
  ChaseListMatchAlert,
  PastToursSection,
  SettingsSection,
} from '@/components/profile';

export const metadata: Metadata = {
  title: 'Your Dashboard — Quorum Tours',
  description: 'Manage your tour commitments, chase list, and account settings.',
};

/**
 * Profile Page - User Dashboard
 *
 * Redesigned layout per spec:
 * - Compact inline header with trust badge
 * - UPCOMING TOURS section with Browse more link
 * - Tour cards as main content
 * - Past Tours collapsed below tours
 * - Right sidebar: Chase List (primary), Match Alert, Account (demoted)
 */

// Example user data (UI shell - would come from auth in production)
const exampleUser = {
  displayName: 'Sarah Mitchell',
  memberSince: 'January 2025',
  trustTier: 'trusted' as const,
};

// Enhanced commitment data
const exampleCommitments = [
  {
    tourId: 'kakadu-wetlands-2026',
    tourName: 'Kakadu Wetlands Expedition',
    tourDates: 'Mar 15–18, 2026',
    operatorId: 'outback-birding',
    operatorName: 'Outback Birding Co',
    location: 'Northern Territory',
    status: 'confirmed' as const,
    currentParticipants: 8,
    quorum: 10,
    capacity: 12,
    paymentStatus: 'paid' as const,
    departureDate: new Date('2026-03-15'),
    fellowTravelers: [
      { id: 'user-1', name: 'Michael Chen', initials: 'MC' },
      { id: 'user-2', name: 'Emma Watson', initials: 'EW' },
      { id: 'user-3', name: 'David Park', initials: 'DP' },
      { id: 'user-4', name: 'Lisa Thompson', initials: 'LT' },
      { id: 'user-5', name: 'James Miller', initials: 'JM' },
      { id: 'user-6', name: 'Anna Rodriguez', initials: 'AR' },
      { id: 'user-7', name: 'Chris Lee', initials: 'CL' },
    ],
    targetSpecies: [
      { id: 'sp-1', name: 'Gouldian Finch' },
      { id: 'sp-2', name: 'Rainbow Pitta' },
    ],
  },
  {
    tourId: 'tasmania-raptors-2026',
    tourName: 'Tasmania Raptor Circuit',
    tourDates: 'Apr 22–25, 2026',
    operatorId: 'wings-wilderness',
    operatorName: 'Wings & Wilderness',
    location: 'Tasmania',
    status: 'forming' as const,
    currentParticipants: 4,
    quorum: 6,
    capacity: 10,
    paymentStatus: 'deposit-paid' as const,
    departureDate: new Date('2026-04-22'),
    fellowTravelers: [
      { id: 'user-8', name: 'Robert Kim', initials: 'RK' },
      { id: 'user-9', name: 'Sophie Brown', initials: 'SB' },
      { id: 'user-10', name: 'Andrew White', initials: 'AW' },
    ],
    targetSpecies: [
      { id: 'sp-3', name: 'Wedge-tailed Eagle' },
      { id: 'sp-4', name: 'Grey Goshawk' },
    ],
  },
];

// Example chase list with match indicator
const exampleChaseList = [
  { id: 'bird-1', commonName: 'Gouldian Finch', region: 'NT', addedDate: '2025-12-01', isMatched: true },
  { id: 'bird-2', commonName: 'Regent Honeyeater', region: 'NSW', addedDate: '2025-11-15' },
  { id: 'bird-3', commonName: 'Plains-wanderer', region: 'VIC', addedDate: '2025-10-20' },
  { id: 'bird-4', commonName: 'Night Parrot', region: 'QLD', addedDate: '2025-09-05' },
  { id: 'bird-5', commonName: 'Helmeted Honeyeater', region: 'VIC', addedDate: '2025-08-10' },
];

// Example past tours
const examplePastTours = [
  {
    id: 'broome-shorebirds-2025',
    title: 'Broome Shorebird Migration',
    date: 'Sep 12–15, 2025',
    outcome: 'completed' as const,
    participantCount: 8,
  },
  {
    id: 'cairns-rainforest-2025',
    title: 'Cairns Rainforest Endemics',
    date: 'Jul 5–8, 2025',
    outcome: 'completed' as const,
    participantCount: 6,
  },
];

export default function ProfilePage() {
  return (
    <ErrorBoundary>
      <main className="bg-[var(--color-surface)] min-h-screen">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 pt-6">
          {/* Compact Profile Header */}
          <ProfileHeader
            displayName={exampleUser.displayName}
            memberSince={exampleUser.memberSince}
            trustTier={exampleUser.trustTier}
          />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8">
            {/* Left Column: Tours (8 cols on desktop) */}
            <div className="lg:col-span-8">
              {/* UPCOMING TOURS section header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[11px] font-semibold tracking-wider uppercase text-[var(--color-ink-subtle)]">
                  Upcoming Tours
                </h2>
                <a
                  href="/tours"
                  className="text-sm text-[var(--color-primary)] hover:underline"
                >
                  Browse more →
                </a>
              </div>

              {/* Tour Cards */}
              {exampleCommitments.length > 0 ? (
                <div className="space-y-4">
                  {exampleCommitments.map((commitment) => (
                    <EnhancedTourCard
                      key={commitment.tourId}
                      {...commitment}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)]">
                  <div className="text-center py-12 px-6">
                    <p className="text-[var(--color-ink-muted)] mb-3">
                      No active commitments yet.
                    </p>
                    <a
                      href="/tours"
                      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary)] rounded-[var(--radius-organic)] hover:bg-[var(--color-primary-hover)] transition-colors"
                    >
                      Browse tours
                    </a>
                  </div>
                </div>
              )}

              {/* Past Tours - collapsed, below tour cards */}
              {examplePastTours.length > 0 && (
                <div className="mt-4">
                  <PastToursSection tours={examplePastTours} />
                </div>
              )}
            </div>

            {/* Right Column: Sidebar (4 cols on desktop) */}
            <div className="lg:col-span-4 space-y-4">
              {/* Chase List - Primary sidebar element */}
              <ChaseListSection birds={exampleChaseList} />

              {/* Chase List Match Alert */}
              <ChaseListMatchAlert
                speciesName="Gouldian Finch"
                tourName="NT"
                context="A new tour targeting Gouldian Finch was just listed in the NT. Your Kakadu trip already covers this — you're set."
              />

              {/* Account Section - Demoted to bottom */}
              <SettingsSection />
            </div>
          </div>
        </div>
      </main>
    </ErrorBoundary>
  );
}
