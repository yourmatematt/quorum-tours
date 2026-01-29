'use client';

import { useState } from 'react';
import { ConfirmationStatusBadge } from '../ui/ConfirmationStatusBadge';
import { QuorumProgressBar } from '../ui/QuorumProgressBar';

type CommitmentStatus = 'confirmed' | 'forming' | 'not-running';
type PaymentStatus = 'paid' | 'deposit-paid' | 'pending' | 'overdue';

interface FellowTraveler {
  id: string;
  name: string;
  initials: string;
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
  // New enhanced fields
  paymentStatus: PaymentStatus;
  departureDate: Date;
  fellowTravelers: FellowTraveler[];
  itinerarySummary: string[];
}

/**
 * EnhancedTourCard - Full-featured commitment card for dashboard
 *
 * Shows everything a birder needs at a glance:
 * - Tour status and progress
 * - Days until departure
 * - Payment status
 * - Quick actions (contact operator, view itinerary)
 * - Fellow travelers with profile links
 *
 * Design: Field notebook feel - dense but scannable
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
  itinerarySummary,
}: EnhancedTourCardProps) {
  const [showItinerary, setShowItinerary] = useState(false);
  const isConfirmed = status === 'confirmed';

  // Calculate days until departure
  const today = new Date();
  const daysUntil = Math.ceil((departureDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const departureLabel = daysUntil === 0 ? 'Today!' : daysUntil === 1 ? '1 day' : `${daysUntil} days`;

  const paymentConfig: Record<PaymentStatus, { label: string; color: string; bgColor: string }> = {
    'paid': { label: 'Paid in full', color: 'text-[var(--color-confirmed)]', bgColor: 'bg-[var(--color-confirmed-bg)]' },
    'deposit-paid': { label: 'Deposit paid', color: 'text-[var(--color-primary)]', bgColor: 'bg-[var(--color-primary-subtle)]' },
    'pending': { label: 'Payment pending', color: 'text-[var(--color-forming)]', bgColor: 'bg-[var(--color-forming-bg)]' },
    'overdue': { label: 'Payment overdue', color: 'text-[var(--color-destructive)]', bgColor: 'bg-red-50' },
  };

  const payment = paymentConfig[paymentStatus];

  return (
    <div
      className={`
        bg-[var(--color-surface-raised)] border-2 rounded-[var(--radius-organic)]
        transition-colors
        ${isConfirmed
          ? 'border-[var(--color-confirmed)]/30'
          : 'border-[var(--color-border)]'
        }
      `}
    >
      {/* Main Card Content */}
      <div className="p-4">
        {/* Header: Name + Status + Days Until */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <a
              href={`/tours/${tourId}`}
              className="block font-display text-lg font-medium text-[var(--color-ink)] hover:text-[var(--color-primary)] transition-colors truncate"
            >
              {tourName}
            </a>
            <p className="text-sm text-[var(--color-ink-muted)]">
              {tourDates} · {location}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
            <ConfirmationStatusBadge status={status} />
            {daysUntil > 0 && (
              <span className="text-xs font-mono text-[var(--color-ink-muted)] bg-[var(--color-surface-sunken)] px-2 py-0.5 rounded">
                {departureLabel}
              </span>
            )}
          </div>
        </div>

        {/* Quorum Progress */}
        <div className="mb-3">
          <QuorumProgressBar
            current={currentParticipants}
            quorum={quorum}
            capacity={capacity}
            size="sm"
          />
        </div>

        {/* Payment Status + Operator Row */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${payment.bgColor} ${payment.color}`}>
            {payment.label}
          </span>
          <a
            href={`/operators/${operatorId}`}
            className="text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] transition-colors"
          >
            {operatorName} →
          </a>
        </div>

        {/* Action Buttons Row */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => window.location.href = `mailto:contact@${operatorId}.example.com?subject=Question about ${tourName}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] text-[var(--color-ink)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Contact
          </button>
          <button
            onClick={() => setShowItinerary(!showItinerary)}
            aria-expanded={showItinerary}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] text-[var(--color-ink)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            Itinerary
          </button>
        </div>

        {/* Itinerary Dropdown */}
        {showItinerary && (
          <div className="mb-3 p-3 bg-[var(--color-surface-sunken)] rounded-[var(--radius-sm)] text-sm">
            <p className="font-medium text-[var(--color-ink)] mb-2">Trip Overview</p>
            <ul className="space-y-1">
              {itinerarySummary.map((item, idx) => (
                <li key={idx} className="text-[var(--color-ink-muted)] flex items-start gap-2">
                  <span className="text-xs font-mono text-[var(--color-ink-subtle)] mt-0.5">Day {idx + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={`/tours/${tourId}#itinerary`}
              className="inline-block mt-2 text-xs text-[var(--color-primary)] hover:underline"
            >
              View full itinerary →
            </a>
          </div>
        )}

        {/* Fellow Travelers - Avatar Row */}
        {fellowTravelers.length > 0 && (
          <div className="pt-3 border-t border-[var(--color-border)]">
            <p className="text-xs text-[var(--color-ink-subtle)] mb-2">
              Fellow travelers ({isConfirmed ? currentParticipants : `${currentParticipants} committed`})
            </p>
            <div className="flex items-center gap-1">
              {/* Show first 6 travelers */}
              {fellowTravelers.slice(0, 6).map((traveler, idx) => (
                <a
                  key={traveler.id}
                  href={`/travelers/${traveler.id}`}
                  title={traveler.name}
                  className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-xs font-medium hover:ring-2 hover:ring-[var(--color-primary)] hover:ring-offset-2 transition-all"
                  style={{ marginLeft: idx > 0 ? '-0.25rem' : 0 }}
                >
                  {traveler.initials}
                </a>
              ))}
              {/* Overflow indicator */}
              {fellowTravelers.length > 6 && (
                <span className="ml-1 text-xs text-[var(--color-ink-muted)]">
                  +{fellowTravelers.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
