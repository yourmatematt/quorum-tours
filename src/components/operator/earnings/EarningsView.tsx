'use client';

/**
 * Earnings View - Operator Revenue Dashboard
 *
 * DESIGN PHILOSOPHY (following DashboardHome):
 * - Rejects generic StatCard patterns (icon-box -> number -> label)
 * - Uses domain-specific visualizations that tell a story
 * - Revenue flows through stages: Escrowed -> Confirmed -> Paid
 * - Each stage has distinct visual treatment matching its certainty level
 */

import { useState } from 'react';
import { ExternalLink, Download, TrendingUp, Loader2, AlertCircle } from 'lucide-react';
import { DashboardViewContainer, DashboardViewHeader, StatusBadge } from '@/components/operator';
import { useOperatorContext } from '@/hooks/useOperatorContext';
import { useOperatorEarnings } from '@/hooks/useOperatorEarnings';
import { useOperatorTours } from '@/hooks/useOperatorTours';
import { useStripeConnect } from '@/hooks/useStripeConnect';

const TOUR_FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'forming', label: 'Forming' },
  { id: 'confirmed', label: 'Confirmed' },
] as const;

export function EarningsView() {
  const [tourFilter, setTourFilter] = useState<string>('all');
  const { operator, operatorId } = useOperatorContext();
  const { escrowed, confirmed, paidAllTime, isLoading: earningsLoading } = useOperatorEarnings(operatorId);
  const { tours, isLoading: toursLoading } = useOperatorTours(operatorId);
  const { stripeStatus, startOnboarding, isRedirecting, error: stripeError } = useStripeConnect(operator);

  const isLoading = earningsLoading || toursLoading;

  // Derive tour revenue data from real tours
  const tourRevenue = (tours || [])
    .filter(t => t.status === 'forming' || t.status === 'confirmed' || t.status === 'payment_pending')
    .map(t => ({
      name: t.title,
      dates: `${new Date(t.date_start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}–${new Date(t.date_end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
      bookings: t.current_participants || 0,
      price: t.price_cents / 100,
      total: (t.current_participants || 0) * (t.price_cents / 100),
      stage: (t.status === 'confirmed' || t.status === 'payment_pending' ? 'confirmed' : 'forming') as 'forming' | 'confirmed',
      quorum: t.threshold,
    }));

  // Stripe button logic
  function renderStripeButton() {
    if (isRedirecting) {
      return (
        <button disabled className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-primary)] text-white rounded-[var(--radius-organic)] font-medium text-sm opacity-50">
          <Loader2 className="w-4 h-4 animate-spin" />
          Redirecting...
        </button>
      );
    }

    if (!stripeStatus.hasAccount || !stripeStatus.detailsSubmitted) {
      return (
        <button
          onClick={() => operatorId && startOnboarding(operatorId)}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-primary)] text-white rounded-[var(--radius-organic)] font-medium text-sm hover:bg-[var(--color-primary-hover)] transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          {stripeStatus.hasAccount ? 'Complete Stripe Setup' : 'Connect Stripe'}
        </button>
      );
    }

    return (
      <a
        href="https://dashboard.stripe.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-primary)] text-white rounded-[var(--radius-organic)] font-medium text-sm hover:bg-[var(--color-primary-hover)] transition-colors"
      >
        <ExternalLink className="w-4 h-4" />
        Stripe Dashboard
      </a>
    );
  }

  if (isLoading) {
    return (
      <DashboardViewContainer>
        <DashboardViewHeader title="Earnings" subtitle="Track your revenue and payouts" />
        <div className="flex items-center justify-center py-16 text-[var(--color-ink-muted)]">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          Loading earnings...
        </div>
      </DashboardViewContainer>
    );
  }

  return (
    <DashboardViewContainer>
      {/* Fixed Header */}
      <DashboardViewHeader
        title="Earnings"
        subtitle="Track your revenue and payouts"
        actions={
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] font-medium text-sm hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            {renderStripeButton()}
          </div>
        }
      />

      {/* Stripe connection banner */}
      {!stripeStatus.hasAccount && (
        <div className="mb-4 flex items-start gap-3 px-4 py-3 bg-[var(--color-forming-bg)] border-2 border-[var(--color-forming)]/30 rounded-[var(--radius-organic)]">
          <AlertCircle className="w-5 h-5 text-[var(--color-forming)] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-[var(--color-ink)]">Connect Stripe to receive payouts</p>
            <p className="text-sm text-[var(--color-ink-muted)]">You need a connected Stripe account before any confirmed tour revenue can be paid out to you.</p>
          </div>
        </div>
      )}

      {stripeStatus.hasAccount && !stripeStatus.detailsSubmitted && (
        <div className="mb-4 flex items-start gap-3 px-4 py-3 bg-[var(--color-surface-sunken)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)]">
          <AlertCircle className="w-5 h-5 text-[var(--color-ink-muted)] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-[var(--color-ink)]">Complete your Stripe setup</p>
            <p className="text-sm text-[var(--color-ink-muted)]">Your Stripe account is created but setup is incomplete. Click "Complete Stripe Setup" above to finish.</p>
          </div>
        </div>
      )}

      {stripeStatus.chargesEnabled && stripeStatus.payoutsEnabled && (
        <div className="mb-4 flex items-center gap-2 px-3 py-2 bg-[var(--color-confirmed-bg)] border border-[var(--color-confirmed)]/30 rounded-[var(--radius-organic)]">
          <div className="w-2 h-2 rounded-full bg-[var(--color-confirmed)]" />
          <span className="text-sm text-[var(--color-confirmed)] font-medium">Stripe connected — payouts enabled</span>
        </div>
      )}

      {stripeError && (
        <div className="mb-4 px-4 py-3 bg-[var(--color-danger-bg)] border border-[var(--color-danger)] rounded-[var(--radius-organic)] text-sm text-[var(--color-danger)]">
          {stripeError}
        </div>
      )}

      {/* Revenue Flow Visualization */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-[var(--color-ink-muted)] mb-3 uppercase tracking-wide">
          Revenue Pipeline
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RevenueStageCard
            stage="escrowed"
            label="Escrowed"
            sublabel="Forming tours"
            amount={escrowed.amount}
            detail={`${escrowed.bookings} commitments across ${escrowed.tours} tours`}
            hint="Held until quorum reached"
          />
          <RevenueStageCard
            stage="confirmed"
            label="Confirmed"
            sublabel="Awaiting payout"
            amount={confirmed.amount}
            detail={`${confirmed.bookings} bookings across ${confirmed.tours} tours`}
            hint={stripeStatus.chargesEnabled ? 'Payout on tour completion' : 'Connect Stripe to receive payouts'}
          />
          <RevenueStageCard
            stage="paid"
            label="Paid All Time"
            sublabel="Completed"
            amount={paidAllTime}
            detail="Total earnings received"
            hint=""
          />
        </div>
      </div>

      {/* Revenue by Tour */}
      <div className="flex-1 flex flex-col min-h-0">
        <h2 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-3">
          Revenue by Tour
        </h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {TOUR_FILTER_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => setTourFilter(option.id)}
              aria-label={`Filter by ${option.label} tours`}
              aria-pressed={tourFilter === option.id}
              className={`px-3 py-1.5 min-h-[44px] rounded-[var(--radius-organic)] font-medium text-sm transition-colors duration-200 ${
                tourFilter === option.id
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface)] border-2 border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {tourRevenue
            .filter((tour) => tourFilter === 'all' || tour.stage === tourFilter)
            .map((tour, idx) => (
              <TourRevenueCard key={idx} {...tour} />
            ))}
          {tourRevenue.filter((tour) => tourFilter === 'all' || tour.stage === tourFilter).length === 0 && (
            <div className="text-center py-8 text-[var(--color-ink-muted)] text-sm">
              No tour revenue to show yet.
            </div>
          )}
        </div>
      </div>
    </DashboardViewContainer>
  );
}

/**
 * Revenue Stage Card - Domain-specific visualization
 */
function RevenueStageCard({
  stage,
  label,
  sublabel,
  amount,
  detail,
  hint,
  trend
}: {
  stage: 'escrowed' | 'confirmed' | 'paid';
  label: string;
  sublabel: string;
  amount: number;
  detail: string;
  hint: string;
  trend?: 'up' | 'down';
}) {
  const stageStyles = {
    escrowed: {
      border: 'border-[var(--color-forming)]/30',
      bg: 'bg-[var(--color-forming-bg)]/50',
      amount: 'text-[var(--color-forming)]',
      indicator: 'bg-[var(--color-forming)]',
    },
    confirmed: {
      border: 'border-[var(--color-confirmed)]/30',
      bg: 'bg-[var(--color-confirmed-bg)]/50',
      amount: 'text-[var(--color-confirmed)]',
      indicator: 'bg-[var(--color-confirmed)]',
    },
    paid: {
      border: 'border-[var(--color-border)]',
      bg: 'bg-[var(--color-surface)]',
      amount: 'text-[var(--color-ink)]',
      indicator: 'bg-[var(--color-ink-muted)]',
    },
  };

  const styles = stageStyles[stage];

  return (
    <div className={`${styles.bg} ${styles.border} border-2 rounded-[var(--radius-organic)] p-4`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${styles.indicator}`} />
        <span className="text-sm font-medium text-[var(--color-ink)]">{label}</span>
        <span className="text-xs text-[var(--color-ink-muted)]">&bull; {sublabel}</span>
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className={`font-mono text-2xl font-semibold ${styles.amount}`}>
          ${amount.toLocaleString()}
        </span>
        {trend && (
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-[var(--color-confirmed)]' : 'text-[var(--color-destructive)]'}`}>
            <TrendingUp className={`w-4 h-4 inline ${trend === 'down' ? 'rotate-180' : ''}`} />
          </span>
        )}
      </div>

      <p className="text-sm text-[var(--color-ink-muted)] mb-1">{detail}</p>
      {hint && <p className="text-xs text-[var(--color-ink-muted)]">{hint}</p>}
    </div>
  );
}

/**
 * Tour Revenue Card
 */
function TourRevenueCard({
  name,
  bookings,
  total,
  stage,
  quorum
}: {
  name: string;
  dates: string;
  bookings: number;
  price: number;
  total: number;
  stage: 'forming' | 'confirmed';
  payoutDate?: string;
  quorum?: number;
}) {
  const isConfirmed = stage === 'confirmed';

  return (
    <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-3 hover:border-[var(--color-primary)] transition-colors cursor-pointer">
      <p className="text-sm font-medium text-[var(--color-ink)] mb-2 truncate">{name}</p>

      <div className="flex items-center justify-between gap-2 mb-2">
        <span className={`font-mono text-lg font-semibold ${isConfirmed ? 'text-[var(--color-confirmed)]' : 'text-[var(--color-forming)]'}`}>
          ${total.toLocaleString()}
        </span>
        <StatusBadge.Tour status={stage === 'confirmed' ? 'confirmed' : 'forming'} />
      </div>

      <p className="text-xs text-[var(--color-ink-muted)]">
        {isConfirmed ? `${bookings} bookings` : `${bookings}/${quorum} participants`}
      </p>
    </div>
  );
}
