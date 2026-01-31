'use client';

import { useState } from 'react';

type CommitmentStatus = 'confirmed' | 'forming' | 'not-running';
type PaymentStatus = 'paid' | 'deposit-paid' | 'pending' | 'overdue';

interface FellowTraveler {
  id: string;
  name: string;
  initials: string;
}

interface TargetSpecies {
  id: string;
  name: string;
  region?: string;
}

interface EnhancedTourCardProps {
  tourId: string;
  tourName: string;
  tourDates: string;
  operatorId: string;
  operatorName: string;
  location: string;
  status: CommitmentStatus;
  currentParticipants: number;
  quorum: number;
  capacity: number;
  paymentStatus: PaymentStatus;
  departureDate: Date;
  fellowTravelers: FellowTraveler[];
  targetSpecies?: TargetSpecies[];
}

/**
 * EnhancedTourCard - Redesigned commitment card for dashboard
 *
 * Design per spec:
 * - Top accent stripe (1px) colored by status
 * - Quorum as centrepiece with dot visualization
 * - Large Fraunces countdown
 * - Collapsible target species & actions
 * - Border+colored-shadow hover (no lift)
 */
export function EnhancedTourCard({
  tourId,
  tourName,
  tourDates,
  operatorId,
  operatorName,
  location,
  status,
  currentParticipants,
  quorum,
  capacity,
  paymentStatus,
  departureDate,
  fellowTravelers,
  targetSpecies = [],
}: EnhancedTourCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isConfirmed = status === 'confirmed';

  // Calculate days until departure
  const today = new Date();
  const daysUntil = Math.ceil((departureDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Status configuration
  const statusConfig = {
    confirmed: {
      label: 'Quorum Reached',
      accentColor: 'bg-[var(--color-confirmed)]',
      borderHover: 'hover:border-[var(--color-confirmed)]',
      shadowHover: 'hover:shadow-[0_4px_16px_rgba(46,139,87,0.15)]',
      badgeBg: 'bg-[var(--color-confirmed-bg)]',
      badgeText: 'text-[var(--color-confirmed)]',
      dotColor: 'bg-[var(--color-confirmed)]',
    },
    forming: {
      label: 'Forming',
      accentColor: 'bg-[var(--color-forming)]',
      borderHover: 'hover:border-[var(--color-forming)]',
      shadowHover: 'hover:shadow-[0_4px_16px_rgba(217,119,6,0.15)]',
      badgeBg: 'bg-[var(--color-forming-bg)]',
      badgeText: 'text-[var(--color-forming)]',
      dotColor: 'bg-[var(--color-forming)]',
    },
    'not-running': {
      label: 'Not Running',
      accentColor: 'bg-[var(--color-not-running)]',
      borderHover: 'hover:border-[var(--color-not-running)]',
      shadowHover: 'hover:shadow-[0_4px_16px_rgba(107,114,128,0.15)]',
      badgeBg: 'bg-[var(--color-not-running-bg)]',
      badgeText: 'text-[var(--color-not-running)]',
      dotColor: 'bg-[var(--color-not-running)]',
    },
  };

  const config = statusConfig[status];

  // Payment configuration
  const paymentConfig: Record<PaymentStatus, { label: string; color: string }> = {
    paid: { label: 'Paid in full', color: 'text-[var(--color-confirmed)]' },
    'deposit-paid': { label: 'Deposit paid', color: 'text-[var(--color-forming)]' },
    pending: { label: 'Payment pending', color: 'text-[var(--color-forming)]' },
    overdue: { label: 'Payment overdue', color: 'text-[var(--color-destructive)]' },
  };

  const payment = paymentConfig[paymentStatus];

  // Quorum progress - dots visualization
  const displayMax = isConfirmed ? capacity : quorum;
  const maxDots = 10;
  const displayDots = Math.min(displayMax, maxDots);
  const filledDots = displayMax <= maxDots
    ? Math.min(currentParticipants, displayMax)
    : Math.round((currentParticipants / displayMax) * maxDots);

  // Progress label
  const progressLabel = isConfirmed
    ? `${currentParticipants}/${capacity} · Running`
    : `${currentParticipants}/${quorum} to run`;

  return (
    <div
      className={`
        relative bg-[var(--color-surface-raised)]
        border-2 border-[var(--color-border)] rounded-[var(--radius-organic)]
        overflow-hidden transition-all duration-200
        ${config.borderHover} ${config.shadowHover}
      `}
    >
      {/* Top accent stripe */}
      <div className={`h-1 ${config.accentColor}`} />

      {/* Card content */}
      <div className="p-4">
        {/* Header: Tour name + Status badge */}
        <div className="flex items-start justify-between gap-3 mb-1">
          <a
            href={`/tours/${tourId}`}
            className="font-display text-xl font-semibold text-[var(--color-ink)] hover:text-[var(--color-primary)] transition-colors leading-tight tracking-tight"
          >
            {tourName}
          </a>
          <span
            className={`
              inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap
              ${config.badgeBg} ${config.badgeText}
            `}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
            {config.label}
          </span>
        </div>

        {/* Date + Location */}
        <p className="text-sm text-[var(--color-ink-muted)] mb-4">
          {tourDates} · {location}
        </p>

        {/* QUORUM PROGRESS section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-medium tracking-wider uppercase text-[var(--color-ink-subtle)]">
              Quorum Progress
            </span>
            {/* Days countdown - large Fraunces numeral */}
            {daysUntil > 0 && (
              <div className="text-right">
                <span className="font-display text-2xl font-semibold text-[var(--color-ink)] tracking-tight">
                  {daysUntil}
                </span>
                <span className="text-sm text-[var(--color-ink-muted)] ml-1">
                  days
                </span>
              </div>
            )}
          </div>

          {/* Dots visualization */}
          <div className="flex items-center gap-1 mb-1.5">
            {Array.from({ length: displayDots }).map((_, i) => {
              const isFilled = i < filledDots;
              return (
                <span
                  key={i}
                  className={`
                    rounded-full transition-all
                    ${isFilled
                      ? `w-3 h-3 ${config.dotColor} shadow-[0_0_4px_rgba(46,139,87,0.3)]`
                      : 'w-2.5 h-2.5 border-2 border-[var(--color-border)] bg-transparent'
                    }
                  `}
                />
              );
            })}
          </div>

          {/* Progress label */}
          <p className={`text-sm ${isConfirmed ? 'text-[var(--color-confirmed)]' : 'text-[var(--color-ink-muted)]'}`}>
            {progressLabel}
          </p>
        </div>

        {/* Payment status + Operator row */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className={`text-xs font-medium ${payment.color}`}>
            {payment.label}
          </span>
          <span className="text-xs text-[var(--color-ink-muted)]">
            {operatorName}
          </span>
        </div>

        {/* Fellow travelers avatars */}
        {fellowTravelers.length > 0 && (
          <div className="flex items-center gap-0.5 mb-3">
            {fellowTravelers.slice(0, 5).map((traveler, idx) => (
              <div
                key={traveler.id}
                title={traveler.name}
                className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-xs font-medium border-2 border-[var(--color-surface-raised)]"
                style={{ marginLeft: idx > 0 ? '-0.5rem' : 0 }}
              >
                {traveler.initials}
              </div>
            ))}
            {fellowTravelers.length > 5 && (
              <span className="ml-2 text-xs text-[var(--color-ink-muted)]">
                +{fellowTravelers.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Collapsible Target species & actions */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] transition-colors"
        >
          Target species & actions
          <svg
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          >
            <path d="M5 8l5 5 5-5" />
          </svg>
        </button>

        {/* Expanded content */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
            {/* Target species */}
            {targetSpecies.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-medium text-[var(--color-ink-subtle)] mb-2">Target species</p>
                <div className="flex flex-wrap gap-1.5">
                  {targetSpecies.map((species) => (
                    <span
                      key={species.id}
                      className="text-xs px-2 py-1 bg-[var(--color-surface-sunken)] text-[var(--color-ink)] rounded"
                    >
                      {species.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-2">
              <a
                href={`mailto:contact@${operatorId}.example.com?subject=Question about ${tourName}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium border border-[var(--color-border)] rounded-[var(--radius-sm)] text-[var(--color-ink)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Contact
              </a>
              <a
                href={`/tours/${tourId}#itinerary`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium border border-[var(--color-border)] rounded-[var(--radius-sm)] text-[var(--color-ink)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                Itinerary
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
