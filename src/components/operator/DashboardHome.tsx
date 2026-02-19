'use client';

/**
 * DashboardHome - Operator Dashboard Landing
 *
 * Organized by operator mental model:
 * 1. What needs attention NOW (forming tours, urgency)
 * 2. What's ready to go (confirmed tours)
 * 3. What's coming in (bookings)
 *
 * Uses real Supabase data via operator hooks.
 */

import Link from 'next/link';
import { Clock, Calendar, ArrowRight, Users, TrendingUp, CheckCircle, Plus, Loader2 } from 'lucide-react';
import {
  DashboardViewContainer,
  DashboardViewHeader,
  DashboardScrollArea,
  QuorumIndicatorRing,
  StatusBadge,
} from '@/components/operator';
import { useOperatorContext } from '@/hooks/useOperatorContext';
import { useOperatorTours } from '@/hooks/useOperatorTours';
import { useOperatorBookings } from '@/hooks/useOperatorBookings';
import type { Tour } from '@/lib/supabase/useTours';
import type { OperatorBooking } from '@/hooks/useOperatorBookings';

// =============================================================================
// HELPERS
// =============================================================================

function extractFirstName(fullName: string): string {
  return fullName.split(' ')[0] || fullName;
}

function computeDaysUntil(dateString: string): number {
  const now = new Date();
  const target = new Date(dateString);
  const diffMs = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
}

// =============================================================================
// DOMAIN-SPECIFIC METRICS
// =============================================================================

function QuorumSummary({
  forming,
  confirmed,
  departingSoon,
}: {
  forming: number;
  confirmed: number;
  departingSoon: number;
}) {
  return (
    <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)] p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[var(--color-ink-muted)]">
          Tour Status
        </h3>
        {departingSoon > 0 && (
          <div className="flex items-center gap-2 px-2 py-1 bg-[var(--color-info-bg)] border border-[var(--color-info-border)] rounded-full">
            <Calendar className="w-3.5 h-3.5 text-[var(--color-info)]" />
            <span className="text-xs font-medium text-[var(--color-info-text)]">
              {departingSoon} soon
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[var(--color-forming)]" />
          <div>
            <span className="text-2xl font-display font-semibold text-[var(--color-ink)]">
              {forming}
            </span>
            <span className="text-sm text-[var(--color-ink-muted)] ml-2">forming</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[var(--color-confirmed)]" />
          <div>
            <span className="text-2xl font-display font-semibold text-[var(--color-ink)]">
              {confirmed}
            </span>
            <span className="text-sm text-[var(--color-ink-muted)] ml-2">confirmed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingMomentum({ totalBookings }: { totalBookings: number }) {
  return (
    <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)] p-5">
      <h3 className="text-sm font-medium text-[var(--color-ink-muted)] mb-3">
        Booking Activity
      </h3>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-display font-semibold text-[var(--color-ink)]">
          {totalBookings}
        </span>
        <span className="text-sm text-[var(--color-ink-muted)]">total bookings</span>
      </div>
    </div>
  );
}

function PayoutPreview({
  amount,
  nextDate,
  tours,
}: {
  amount: string;
  nextDate: string;
  tours: number;
}) {
  return (
    <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)] p-5">
      <h3 className="text-sm font-medium text-[var(--color-ink-muted)] mb-3">
        Next Payout
      </h3>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-display font-semibold text-[var(--color-ink)]">
          {amount}
        </span>
      </div>
      <div className="flex items-center gap-2 text-sm text-[var(--color-ink-muted)]">
        <Calendar className="w-4 h-4" />
        <span>{nextDate}</span>
        <span>•</span>
        <span>{tours} tours</span>
      </div>
    </div>
  );
}

// =============================================================================
// FORMING TOUR CARD
// =============================================================================

interface FormingTourData {
  id: string;
  title: string;
  daysUntil: number;
  current: number;
  quorum: number;
  needed: number;
}

function FormingTourCard({ tour }: { tour: FormingTourData }) {
  let urgency: 'urgent' | 'soon' | 'normal';
  if (tour.daysUntil <= 14) {
    urgency = 'urgent';
  } else if (tour.daysUntil <= 30) {
    urgency = 'soon';
  } else {
    urgency = 'normal';
  }

  const urgencyStyles = {
    urgent: 'border-[var(--color-warning-border)] bg-[var(--color-warning-bg)]/30',
    soon: 'border-[var(--color-border)]',
    normal: 'border-[var(--color-border)]',
  };

  return (
    <Link
      href={`/operator/tours/${tour.id}/edit`}
      className={`block bg-[var(--color-surface)] border-2 ${urgencyStyles[urgency]} rounded-[var(--radius-organic)] shadow-[var(--shadow-card)] p-4 hover:border-[var(--color-primary)] transition-colors`}
    >
      <div className="flex items-start gap-4">
        <QuorumIndicatorRing
          current={tour.current}
          quorum={tour.quorum}
          size={52}
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-display font-semibold text-[var(--color-ink)] truncate mb-1">
            {tour.title}
          </h4>
          <p className="text-sm text-[var(--color-ink-muted)] mb-2">
            Need <span className="font-semibold text-[var(--color-forming)]">{tour.needed} more</span> to confirm
          </p>
          <div className="flex items-center gap-1 text-xs text-[var(--color-ink-muted)]">
            <Clock className="w-3.5 h-3.5" />
            <span>{tour.daysUntil} days until departure</span>
            {urgency === 'urgent' && (
              <span className="ml-2 px-2 py-0.5 bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] rounded-full font-medium">
                Urgent
              </span>
            )}
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-[var(--color-ink-muted)] flex-shrink-0" />
      </div>
    </Link>
  );
}

// =============================================================================
// CONFIRMED TOUR CARD
// =============================================================================

interface ConfirmedTourData {
  id: string;
  title: string;
  daysUntil: number;
  participants: number;
  departureDate: string;
}

function ConfirmedTourCard({ tour }: { tour: ConfirmedTourData }) {
  return (
    <Link
      href={`/operator/tours/${tour.id}/edit`}
      className="block bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)] p-4 hover:border-[var(--color-primary)] transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--color-confirmed-bg)] flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-[var(--color-confirmed)]" />
          </div>
          <div>
            <h4 className="font-display font-semibold text-[var(--color-ink)] truncate">
              {tour.title}
            </h4>
            <div className="flex items-center gap-2 text-sm text-[var(--color-ink-muted)]">
              <span>{tour.departureDate}</span>
              <span>•</span>
              <span>{tour.participants} participants</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {tour.daysUntil <= 7 && (
            <span className="px-2 py-1 bg-[var(--color-info-bg)] text-[var(--color-info-text)] rounded-full text-xs font-medium">
              {tour.daysUntil === 0 ? 'Today!' : `${tour.daysUntil}d`}
            </span>
          )}
          <ArrowRight className="w-5 h-5 text-[var(--color-ink-muted)]" />
        </div>
      </div>
    </Link>
  );
}

// =============================================================================
// ACTIVITY ITEM
// =============================================================================

interface ActivityItem {
  id: string;
  type: 'booking' | 'quorum' | 'review' | 'payout';
  message: string;
  timestamp: string;
  tourId?: string;
}

function ActivityListItem({ activity }: { activity: ActivityItem }) {
  const typeConfig = {
    booking: { icon: Users, color: 'text-[var(--color-primary)]', bg: 'bg-[var(--color-primary)]/10' },
    quorum: { icon: CheckCircle, color: 'text-[var(--color-confirmed)]', bg: 'bg-[var(--color-confirmed-bg)]' },
    review: { icon: TrendingUp, color: 'text-[var(--color-forming)]', bg: 'bg-[var(--color-forming-bg)]' },
    payout: { icon: Calendar, color: 'text-[var(--color-info)]', bg: 'bg-[var(--color-info-bg)]' },
  };

  const { icon: Icon, color, bg } = typeConfig[activity.type];

  return (
    <div className="flex items-start gap-3 py-3">
      <div className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[var(--color-ink)]">{activity.message}</p>
        <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">{activity.timestamp}</p>
      </div>
    </div>
  );
}

// =============================================================================
// EMPTY STATE
// =============================================================================

function EmptyToursCta() {
  return (
    <div className="bg-[var(--color-surface)] border-2 border-dashed border-[var(--color-border)] rounded-[var(--radius-organic)] p-8 text-center">
      <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto mb-4">
        <Plus className="w-7 h-7 text-[var(--color-primary)]" />
      </div>
      <h3 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-2">
        Create Your First Tour
      </h3>
      <p className="text-sm text-[var(--color-ink-muted)] mb-4 max-w-sm mx-auto">
        Start building your first quorum-based tour. Set your threshold, dates, and pricing to get started.
      </p>
      <Link
        href="/operator/tours/create"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-[var(--radius-organic)] font-medium text-sm hover:opacity-90 transition-opacity"
      >
        <Plus className="w-4 h-4" />
        Create Tour
      </Link>
    </div>
  );
}

// =============================================================================
// LOADING STATE
// =============================================================================

function DashboardLoading() {
  return (
    <DashboardViewContainer>
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin" />
      </div>
    </DashboardViewContainer>
  );
}

// =============================================================================
// DATA DERIVATION
// =============================================================================

function deriveFormingTours(tours: Tour[]): FormingTourData[] {
  return tours
    .filter((t) => t.status === 'forming')
    .map((t) => ({
      id: t.id,
      title: t.title,
      daysUntil: computeDaysUntil(t.date_start),
      current: t.current_participants,
      quorum: t.threshold,
      needed: Math.max(0, t.threshold - t.current_participants),
    }));
}

function deriveConfirmedTours(tours: Tour[]): ConfirmedTourData[] {
  return tours
    .filter((t) => t.status === 'confirmed' || t.status === 'payment_pending')
    .map((t) => ({
      id: t.id,
      title: t.title,
      daysUntil: computeDaysUntil(t.date_start),
      participants: t.current_participants,
      departureDate: formatDate(t.date_start),
    }));
}

function deriveTourStatusCounts(tours: Tour[]): {
  forming: number;
  confirmed: number;
  departingSoon: number;
} {
  let forming = 0;
  let confirmed = 0;
  let departingSoon = 0;

  for (const t of tours) {
    if (t.status === 'forming') forming++;
    if (t.status === 'confirmed' || t.status === 'payment_pending') confirmed++;

    const days = computeDaysUntil(t.date_start);
    if (days <= 14 && (t.status === 'confirmed' || t.status === 'payment_pending')) {
      departingSoon++;
    }
  }

  return { forming, confirmed, departingSoon };
}

function deriveRecentActivity(bookings: OperatorBooking[]): ActivityItem[] {
  return bookings.slice(0, 5).map((b) => ({
    id: b.id,
    type: 'booking' as const,
    message: `${b.participant_name} booked "${b.tour_name}"`,
    timestamp: formatRelativeTime(b.booking_date),
    tourId: b.tour_id,
  }));
}

// =============================================================================
// MAIN DASHBOARD
// =============================================================================

export function DashboardHome() {
  const { operator, operatorId, isLoading: operatorLoading } = useOperatorContext();
  const { tours, isLoading: toursLoading } = useOperatorTours(operatorId);
  const { bookings, isLoading: bookingsLoading } = useOperatorBookings(operatorId);

  const isLoading = operatorLoading || toursLoading || bookingsLoading;

  if (isLoading) {
    return <DashboardLoading />;
  }

  const operatorName = operator ? extractFirstName(operator.name) : 'Operator';
  const tourStatus = deriveTourStatusCounts(tours);
  const formingTours = deriveFormingTours(tours);
  const confirmedTours = deriveConfirmedTours(tours);
  const recentActivity = deriveRecentActivity(bookings);
  const hasTours = tours.length > 0;

  // Payout data is not yet available from a real source; show a placeholder
  const nextPayout = {
    amount: '--',
    nextDate: 'Coming soon',
    tours: tourStatus.confirmed,
  };

  return (
    <DashboardViewContainer>
      <DashboardViewHeader
        title={`Welcome back, ${operatorName}`}
        subtitle="Here's what's happening with your tours"
      />

      {!hasTours ? (
        <EmptyToursCta />
      ) : (
        <>
          {/* Domain-Specific Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <QuorumSummary {...tourStatus} />
            <BookingMomentum totalBookings={bookings.length} />
            <PayoutPreview {...nextPayout} />
          </div>

          {/* Scrollable Content */}
          <DashboardScrollArea>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Tours */}
              <div className="space-y-6">
                {/* Forming Tours */}
                {formingTours.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">
                        Building Quorum
                      </h2>
                      <StatusBadge status="forming" label={`${formingTours.length} tours`} size="sm" />
                    </div>
                    <div className="space-y-3">
                      {formingTours.map((tour) => (
                        <FormingTourCard key={tour.id} tour={tour} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Confirmed Tours */}
                {confirmedTours.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">
                        Ready to Go
                      </h2>
                      <StatusBadge status="confirmed" label={`${confirmedTours.length} confirmed`} size="sm" />
                    </div>
                    <div className="space-y-3">
                      {confirmedTours.map((tour) => (
                        <ConfirmedTourCard key={tour.id} tour={tour} />
                      ))}
                    </div>
                  </section>
                )}

                {/* No forming or confirmed tours, but has other tours */}
                {formingTours.length === 0 && confirmedTours.length === 0 && (
                  <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)] p-6 text-center">
                    <p className="text-sm text-[var(--color-ink-muted)]">
                      No active tours right now.
                    </p>
                    <Link
                      href="/operator/tours/create"
                      className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-[var(--color-primary)] hover:underline"
                    >
                      <Plus className="w-4 h-4" />
                      Create a new tour
                    </Link>
                  </div>
                )}
              </div>

              {/* Right Column - Activity */}
              <div>
                <section>
                  <h2 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-3">
                    Recent Activity
                  </h2>
                  {recentActivity.length > 0 ? (
                    <>
                      <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)] px-4 divide-y divide-[var(--color-border)]">
                        {recentActivity.map((activity) => (
                          <ActivityListItem key={activity.id} activity={activity} />
                        ))}
                      </div>
                      <Link
                        href="/operator/bookings"
                        className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-[var(--color-primary)] hover:underline"
                      >
                        View all activity
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </>
                  ) : (
                    <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)] p-6 text-center">
                      <p className="text-sm text-[var(--color-ink-muted)]">
                        No recent activity yet. Bookings will appear here as they come in.
                      </p>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </DashboardScrollArea>
        </>
      )}
    </DashboardViewContainer>
  );
}
