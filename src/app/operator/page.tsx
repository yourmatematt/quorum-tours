import {
  TourManagement,
  BookingProgressDashboard,
  ParticipantList,
  RevenueDashboard,
  ProfileManagement,
  ReviewsReputation,
} from '@/components/operator';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function OperatorDashboardPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Operator Header */}
      <header className="border-b border-border-strong bg-surface-raised">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <h1 className="font-display text-2xl font-semibold text-ink">
            Tour Operations
          </h1>
          <p className="text-sm text-ink-muted mt-1">
            Business management and tour coordination
          </p>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-[1600px] mx-auto px-6 py-8 space-y-8">
        {/* Section 1: Tour Management (Primary Surface) */}
        <ErrorBoundary>
          <TourManagement />
        </ErrorBoundary>

        {/* Section 2: Booking Progress Dashboard */}
        <ErrorBoundary>
          <BookingProgressDashboard />
        </ErrorBoundary>

        {/* Section 3: Participant List */}
        <ErrorBoundary>
          <ParticipantList />
        </ErrorBoundary>

        {/* Section 4: Revenue Dashboard */}
        <ErrorBoundary>
          <RevenueDashboard />
        </ErrorBoundary>

        {/* Section 5: Profile Management */}
        <ErrorBoundary>
          <ProfileManagement />
        </ErrorBoundary>

        {/* Section 6: Reviews & Reputation */}
        <ErrorBoundary>
          <ReviewsReputation />
        </ErrorBoundary>
      </main>
    </div>
  );
}
