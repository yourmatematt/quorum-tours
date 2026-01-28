import { Metadata } from 'next';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import {
  ProfileHeader,
  TrustStatusCard,
  EnhancedTourCard,
  ChaseListSection,
  PastToursSection,
  SettingsSection,
} from '@/components/profile';

export const metadata: Metadata = {
  title: 'Your Dashboard — Quorum Tours',
  description: 'Manage your tour commitments, chase list, and account settings.',
};

/**
 * Profile Page - User Dashboard (No-scroll desktop)
 *
 * Primary job: At-a-glance control room for birders
 * - Active tour commitments with full context
 * - Chase list with eBird import
 * - Quick access to settings
 *
 * Layout: Viewport-height dashboard, no scroll on desktop
 * Scrolling contained within individual panels where needed.
 *
 * Per IA:
 * - Profile exists to manage commitments, not display status
 * - Social connections: fellow travelers visible on tour cards
 * - Chase list integration for trip relevance
 */

// Example user data (UI shell - would come from auth in production)
const exampleUser = {
  displayName: 'Sarah Mitchell',
  email: 'sarah.mitchell@email.com',
  memberSince: 'January 2025',
  trustTier: 'trusted' as const,
  completedTours: 2,
  strikeCount: 0,
};

// Enhanced commitment data with new fields
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
    quorum: 6,
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
    itinerarySummary: [
      'Arrive Darwin, transfer to Kakadu',
      'Yellow Water cruise, Mamukala Wetlands',
      'Gunlom Falls, savanna woodlands',
      'East Alligator region, departure',
    ],
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
    quorum: 6,
    paymentStatus: 'deposit-paid' as const,
    departureDate: new Date('2026-04-22'),
    fellowTravelers: [
      { id: 'user-8', name: 'Robert Kim', initials: 'RK' },
      { id: 'user-9', name: 'Sophie Brown', initials: 'SB' },
      { id: 'user-10', name: 'Andrew White', initials: 'AW' },
    ],
    itinerarySummary: [
      'Hobart arrival, Mount Wellington',
      'Bruny Island pelagic day',
      'Tasman Peninsula, sea cliffs',
      'Central highlands, departure',
    ],
  },
];

// Example chase list (UI shell)
const exampleChaseList = [
  { id: 'bird-1', commonName: 'Gouldian Finch', scientificName: 'Chloebia gouldiae', region: 'NT', addedDate: '2025-12-01' },
  { id: 'bird-2', commonName: 'Regent Honeyeater', scientificName: 'Anthochaera phrygia', region: 'NSW', addedDate: '2025-11-15' },
  { id: 'bird-3', commonName: 'Plains-wanderer', scientificName: 'Pedionomus torquatus', region: 'VIC', addedDate: '2025-10-20' },
  { id: 'bird-4', commonName: 'Night Parrot', scientificName: 'Pezoporus occidentalis', region: 'QLD', addedDate: '2025-09-05' },
  { id: 'bird-5', commonName: 'Helmeted Honeyeater', scientificName: 'Lichenostomus melanops cassidix', region: 'VIC', addedDate: '2025-08-10' },
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
];

export default function ProfilePage() {
  return (
    <ErrorBoundary>
      {/* Dashboard: Full viewport height, no scroll on desktop */}
      <main className="bg-[var(--color-surface)] lg:h-[calc(100vh-65px)] lg:overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-4 lg:py-6 h-full flex flex-col">

          {/* Top Row: Profile + Trust Status */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4 flex-shrink-0">
            <div className="lg:col-span-3">
              <ProfileHeader
                displayName={exampleUser.displayName}
                email={exampleUser.email}
                memberSince={exampleUser.memberSince}
              />
            </div>
            <TrustStatusCard
              trustTier={exampleUser.trustTier}
              completedTours={exampleUser.completedTours}
              strikeCount={exampleUser.strikeCount}
            />
          </div>

          {/* Main Dashboard Grid - Takes remaining height */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">

            {/* Left Column: My Tours (2/3 width on desktop) */}
            <section
              aria-labelledby="my-tours-heading"
              className="lg:col-span-8 flex flex-col min-h-0"
            >
              <h2
                id="my-tours-heading"
                className="font-display text-xl font-semibold text-[var(--color-ink)] mb-3 flex-shrink-0"
              >
                My Tours
              </h2>

              {exampleCommitments.length > 0 ? (
                <div className="flex-1 overflow-y-auto min-h-0 space-y-4 pr-1">
                  {exampleCommitments.map((commitment) => (
                    <EnhancedTourCard
                      key={commitment.tourId}
                      {...commitment}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)]">
                  <div className="text-center p-6">
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
            </section>

            {/* Right Column: Chase List + Settings (1/3 width on desktop) */}
            <div className="lg:col-span-4 flex flex-col gap-4 min-h-0">

              {/* Chase List - Takes available height */}
              <div className="flex-1 min-h-0 bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-4 flex flex-col">
                <ChaseListSection
                  birds={exampleChaseList}
                />
              </div>

              {/* Collapsible sections at bottom */}
              <div className="flex-shrink-0 space-y-3">
                <PastToursSection tours={examplePastTours} />
                <SettingsSection />
              </div>
            </div>
          </div>
        </div>
      </main>
    </ErrorBoundary>
  );
}
