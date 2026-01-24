'use client';

/**
 * Earnings View - Operator Revenue Dashboard
 *
 * DESIGN PHILOSOPHY (following DashboardHome):
 * - Rejects generic StatCard patterns (icon-box → number → label)
 * - Uses domain-specific visualizations that tell a story
 * - Revenue flows through stages: Escrowed → Confirmed → Paid
 * - Each stage has distinct visual treatment matching its certainty level
 */

import { useState } from 'react';
import { ExternalLink, Download, TrendingUp } from 'lucide-react';
import { DashboardViewContainer, DashboardViewHeader, StatusBadge } from '@/components/operator';

const TIME_FILTER_OPTIONS = [
  { id: '1m', label: '1 Month' },
  { id: '3m', label: '3 Months' },
  { id: '6m', label: '6 Months' },
  { id: '1y', label: '1 Year' },
  { id: 'all', label: 'All Time' },
] as const;

const TOUR_FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'forming', label: 'Forming' },
  { id: 'confirmed', label: 'Confirmed' },
] as const;

export function EarningsView() {
  const [timeFilter, setTimeFilter] = useState<string>('6m');
  const [tourFilter, setTourFilter] = useState<string>('all');

  // Mock data - in production this comes from API
  const earningsData = {
    escrowed: { amount: 12450, tours: 3, bookings: 28 },
    confirmed: { amount: 8900, tours: 2, bookings: 18 },
    paidThisMonth: { amount: 6720, prevMonth: 4600 },
    paidAllTime: 47320,
    nextPayoutDate: 'Jan 28, 2026',
    nextPayoutAmount: 8900,
  };

  const payouts = [
    { date: 'Jan 28, 2026', amount: 8900, status: 'pending' as const, bookings: 18, tours: 2, tourNames: ['Andean Condor Quest', 'Pantanal Jaguars'] },
    { date: 'Jan 14, 2026', amount: 6720, status: 'paid' as const, bookings: 24, tours: 3, tourNames: ['Costa Rica Cloud Forest', 'Galápagos Expedition', 'Patagonian Endemics'] },
    { date: 'Dec 31, 2025', amount: 5200, status: 'paid' as const, bookings: 16, tours: 2, tourNames: ['Amazon Basin', 'Andes Crossing'] },
  ];

  const tourRevenue = [
    { name: 'Andean Condor Quest', dates: 'Feb 10-17, 2026', bookings: 6, price: 4200, total: 25200, stage: 'confirmed' as const, payoutDate: 'Feb 25, 2026' },
    { name: 'Jaguar Tracking Pantanal', dates: 'Mar 5-12, 2026', bookings: 4, price: 5800, total: 23200, stage: 'forming' as const, threshold: 6 },
    { name: 'Costa Rica Highlands', dates: 'Apr 1-8, 2026', bookings: 2, price: 3200, total: 6400, stage: 'forming' as const, threshold: 8 },
  ];

  const monthGrowth = ((earningsData.paidThisMonth.amount - earningsData.paidThisMonth.prevMonth) / earningsData.paidThisMonth.prevMonth * 100).toFixed(0);

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
            <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-primary)] text-white rounded-[var(--radius-organic)] font-medium text-sm hover:bg-[var(--color-primary-hover)] transition-colors">
              <ExternalLink className="w-4 h-4" />
              Stripe
            </button>
          </div>
        }
      />

      {/* Revenue Flow Visualization - Domain-specific, NOT generic StatCards */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-[var(--color-ink-muted)] mb-3 uppercase tracking-wide">
          Revenue Pipeline
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Escrowed - Uncertain, lighter treatment */}
          <RevenueStageCard
            stage="escrowed"
            label="Escrowed"
            sublabel="Forming tours"
            amount={earningsData.escrowed.amount}
            detail={`${earningsData.escrowed.bookings} commitments across ${earningsData.escrowed.tours} tours`}
            hint="Held until threshold met"
          />

          {/* Confirmed - Certain, stronger treatment */}
          <RevenueStageCard
            stage="confirmed"
            label="Confirmed"
            sublabel="Awaiting payout"
            amount={earningsData.confirmed.amount}
            detail={`${earningsData.confirmed.bookings} bookings across ${earningsData.confirmed.tours} tours`}
            hint={`Next payout: ${earningsData.nextPayoutDate}`}
          />

          {/* Paid - Complete, neutral treatment */}
          <RevenueStageCard
            stage="paid"
            label="Paid This Month"
            sublabel="January 2026"
            amount={earningsData.paidThisMonth.amount}
            detail={`+${monthGrowth}% vs last month`}
            hint={`All time: $${earningsData.paidAllTime.toLocaleString()}`}
            trend={parseInt(monthGrowth) > 0 ? 'up' : 'down'}
          />
        </div>
      </div>

      {/* Side-by-Side Scrollable Containers */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
        {/* Payout Timeline */}
        <div className="flex flex-col min-h-0">
          <h2 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-3">
            Payout Timeline
          </h2>
          {/* Time Filter */}
          <div className="flex flex-wrap gap-2 mb-3">
            {TIME_FILTER_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setTimeFilter(option.id)}
                aria-label={`Filter by ${option.label}`}
                aria-pressed={timeFilter === option.id}
                className={`px-3 py-1.5 min-h-[44px] rounded-[var(--radius-organic)] font-medium text-sm transition-colors duration-200 ${
                  timeFilter === option.id
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-surface)] border-2 border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {payouts.map((payout, idx) => (
              <PayoutTimelineCard key={idx} {...payout} />
            ))}
          </div>
        </div>

        {/* Revenue by Tour */}
        <div className="flex flex-col min-h-0">
          <h2 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-3">
            Revenue by Tour
          </h2>
          {/* Tour Filter */}
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
          </div>
        </div>
      </div>
    </DashboardViewContainer>
  );
}

/**
 * Revenue Stage Card - Domain-specific visualization
 * Shows revenue at different stages of the pipeline
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
      {/* Stage indicator dot */}
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${styles.indicator}`} />
        <span className="text-sm font-medium text-[var(--color-ink)]">{label}</span>
        <span className="text-xs text-[var(--color-ink-muted)]">• {sublabel}</span>
      </div>

      {/* Amount with optional trend */}
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

      {/* Contextual detail */}
      <p className="text-sm text-[var(--color-ink-muted)] mb-1">{detail}</p>
      <p className="text-xs text-[var(--color-ink-muted)]">{hint}</p>
    </div>
  );
}

/**
 * Payout Timeline Card - Compact card for side-by-side layout
 */
function PayoutTimelineCard({
  date,
  amount,
  status,
  bookings,
}: {
  date: string;
  amount: number;
  status: 'pending' | 'paid';
  bookings: number;
  tours: number;
  tourNames: string[];
}) {
  return (
    <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-3 hover:border-[var(--color-primary)] transition-colors cursor-pointer">
      {/* Date */}
      <p className="text-sm font-medium text-[var(--color-ink)] mb-2">{date}</p>

      {/* Amount + Status */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="font-mono text-lg font-semibold text-[var(--color-ink)]">
          ${amount.toLocaleString()}
        </span>
        <StatusBadge.Payout status={status} />
      </div>

      {/* Bookings count */}
      <p className="text-xs text-[var(--color-ink-muted)]">
        {bookings} bookings
      </p>
    </div>
  );
}

/**
 * Tour Revenue Card - Compact card matching PayoutTimelineCard size
 */
function TourRevenueCard({
  name,
  bookings,
  total,
  stage,
  threshold
}: {
  name: string;
  dates: string;
  bookings: number;
  price: number;
  total: number;
  stage: 'forming' | 'confirmed';
  payoutDate?: string;
  threshold?: number;
}) {
  const isConfirmed = stage === 'confirmed';

  return (
    <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-3 hover:border-[var(--color-primary)] transition-colors cursor-pointer">
      {/* Tour name */}
      <p className="text-sm font-medium text-[var(--color-ink)] mb-2 truncate">{name}</p>

      {/* Amount + Status */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className={`font-mono text-lg font-semibold ${isConfirmed ? 'text-[var(--color-confirmed)]' : 'text-[var(--color-forming)]'}`}>
          ${total.toLocaleString()}
        </span>
        <StatusBadge.Tour status={stage === 'confirmed' ? 'confirmed' : 'forming'} />
      </div>

      {/* Bookings count or progress */}
      <p className="text-xs text-[var(--color-ink-muted)]">
        {isConfirmed ? `${bookings} bookings` : `${bookings}/${threshold} participants`}
      </p>
    </div>
  );
}
