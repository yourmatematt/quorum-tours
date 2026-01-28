'use client';

/**
 * DashboardHome - Operator Dashboard Landing
 *
 * Redesigned to reject generic StatCard patterns.
 * Organized by operator mental model:
 * 1. What needs attention NOW (forming tours, urgency)
 * 2. What's ready to go (confirmed tours)
 * 3. What's coming in (money, bookings)
 *
 * Uses domain-specific visualizations instead of icon-box → number → label.
 */

import Link from 'next/link';
import { Clock, Calendar, ArrowRight, Users, TrendingUp, CheckCircle } from 'lucide-react';
import {
  DashboardViewContainer,
  DashboardViewHeader,
  DashboardScrollArea,
  QuorumIndicatorRing,
  QuorumIndicatorCompact,
  StatusBadge,
} from '@/components/operator';

// =============================================================================
// DOMAIN-SPECIFIC METRICS (Replacing Generic StatCard)
// =============================================================================

/**
 * QuorumSummary - Shows forming vs confirmed at a glance
 * NOT a generic stat card. Shows the core product state.
 */
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
        {/* Departing Soon - Moved to header row */}
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
        {/* Forming */}
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[var(--color-forming)]" />
          <div>
            <span className="text-2xl font-display font-semibold text-[var(--color-ink)]">
              {forming}
            </span>
            <span className="text-sm text-[var(--color-ink-muted)] ml-2">forming</span>
          </div>
        </div>

        {/* Confirmed */}
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

/**
 * BookingMomentum - Shows recent booking activity with context
 * Replaces generic "Total Bookings: 47" with actionable insight
 */
function BookingMomentum({
  thisWeek,
  lastWeek,
  trend,
}: {
  thisWeek: number;
  lastWeek: number;
  trend: 'up' | 'down' | 'flat';
}) {
  const trendConfig = {
    up: { color: 'text-[var(--color-confirmed)]', icon: '↑', label: 'up from last week' },
    down: { color: 'text-[var(--color-destructive)]', icon: '↓', label: 'down from last week' },
    flat: { color: 'text-[var(--color-ink-muted)]', icon: '→', label: 'same as last week' },
  };

  const { color, icon, label } = trendConfig[trend];

  return (
    <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)] p-5">
      <h3 className="text-sm font-medium text-[var(--color-ink-muted)] mb-3">
        Booking Activity
      </h3>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-display font-semibold text-[var(--color-ink)]">
          {thisWeek}
        </span>
        <span className="text-sm text-[var(--color-ink-muted)]">new this week</span>
      </div>
      <div className={`flex items-center gap-1 text-sm ${color}`}>
        <span>{icon}</span>
        <span>{Math.abs(thisWeek - lastWeek)} {label}</span>
      </div>
    </div>
  );
}

/**
 * PayoutPreview - Shows upcoming money with date context
 * Replaces generic "Upcoming Payouts: $12,450"
 */
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
// FORMING TOUR CARD (Urgency-focused)
// =============================================================================

interface FormingTour {
  id: string;
  title: string;
  daysUntil: number;
  current: number;
  quorum: number;
  needed: number;
}

function FormingTourCard({ tour }: { tour: FormingTour }) {
  const urgency = tour.daysUntil <= 14 ? 'urgent' : tour.daysUntil <= 30 ? 'soon' : 'normal';

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
// CONFIRMED TOUR CARD (Ready to run)
// =============================================================================

interface ConfirmedTour {
  id: string;
  title: string;
  daysUntil: number;
  participants: number;
  departureDate: string;
}

function ConfirmedTourCard({ tour }: { tour: ConfirmedTour }) {
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
// ACTIVITY ITEM (With type-specific styling)
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
// MAIN DASHBOARD
// =============================================================================

export function DashboardHome() {
  // TODO: Replace with real data from API
  const operatorName = 'Sarah';

  // Domain-specific metrics (not generic stats)
  const tourStatus = {
    forming: 3,
    confirmed: 5,
    departingSoon: 2,
  };

  const bookingActivity = {
    thisWeek: 12,
    lastWeek: 8,
    trend: 'up' as const,
  };

  const nextPayout = {
    amount: '$12,450',
    nextDate: 'Jan 28, 2026',
    tours: 5,
  };

  // Tours needing attention (forming)
  const formingTours: FormingTour[] = [
    {
      id: '1',
      title: 'Patagonian Birding Adventure',
      daysUntil: 14,
      current: 3,
      quorum: 6,
      needed: 3,
    },
    {
      id: '5',
      title: 'Pantanal Wetlands Safari',
      daysUntil: 45,
      current: 2,
      quorum: 6,
      needed: 4,
    },
  ];

  // Upcoming confirmed tours
  const confirmedTours: ConfirmedTour[] = [
    {
      id: '2',
      title: 'Costa Rica Cloud Forest',
      daysUntil: 7,
      participants: 8,
      departureDate: 'Mar 15',
    },
    {
      id: '3',
      title: 'Buenos Aires Urban Birding',
      daysUntil: 12,
      participants: 6,
      departureDate: 'Mar 1',
    },
  ];

  // Recent activity
  const recentActivity: ActivityItem[] = [
    {
      id: '1',
      type: 'booking',
      message: 'John D. joined "Amazon Basin Birding"',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      type: 'quorum',
      message: '"Costa Rica Cloud Forest" reached quorum!',
      timestamp: '5 hours ago',
    },
    {
      id: '3',
      type: 'review',
      message: '5-star review from Maria L.',
      timestamp: '1 day ago',
    },
  ];

  return (
    <DashboardViewContainer>
      {/* Header */}
      <DashboardViewHeader
        title={`Welcome back, ${operatorName}`}
        subtitle="Here's what's happening with your tours"
      />

      {/* Domain-Specific Metrics (NOT generic StatCards) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <QuorumSummary {...tourStatus} />
        <BookingMomentum {...bookingActivity} />
        <PayoutPreview {...nextPayout} />
      </div>

      {/* Scrollable Content */}
      <DashboardScrollArea>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Tours */}
          <div className="space-y-6">
            {/* Forming Tours - Need Attention */}
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

            {/* Confirmed Tours - Ready to Go */}
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
          </div>

          {/* Right Column - Activity */}
          <div>
            <section>
              <h2 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-3">
                Recent Activity
              </h2>
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
            </section>
          </div>
        </div>
      </DashboardScrollArea>
    </DashboardViewContainer>
  );
}
