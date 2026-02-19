'use client';

import { useState } from 'react';
import { Eye, Mail, Download } from 'lucide-react';
import { DashboardViewContainer, DashboardViewHeader, DashboardScrollArea, StatusBadge } from '@/components/operator';
import { useOperatorContext } from '@/hooks/useOperatorContext';
import { useOperatorBookings } from '@/hooks/useOperatorBookings';
import type { OperatorBooking } from '@/hooks/useOperatorBookings';

type TrustTier = OperatorBooking['trust_tier'];

const trustTierConfig: Record<TrustTier, { label: string; className: string }> = {
  'new': {
    label: 'New',
    className: 'bg-[var(--color-surface-sunken)] text-[var(--color-ink)]',
  },
  'trusted': {
    label: 'Trusted',
    className: 'bg-[var(--color-primary-subtle)] text-[var(--color-primary)]',
  },
  'strike-1': {
    label: '1 Strike',
    className: 'bg-[var(--color-surface-sunken)] text-[var(--color-ink-muted)]',
  },
  'strike-2': {
    label: '2 Strikes',
    className: 'bg-[var(--color-surface-sunken)] text-[var(--color-ink-muted)]',
  },
};

const FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'held', label: 'Held' },
  { id: 'paid', label: 'Paid' },
  { id: 'forfeited', label: 'Forfeited' },
  { id: 'cancelled', label: 'Cancelled' },
] as const;

export function BookingsView() {
  const { operatorId } = useOperatorContext();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { bookings, isLoading, error } = useOperatorBookings(operatorId);

  const filteredBookings = bookings.filter((booking) => {
    if (statusFilter !== 'all' && booking.status !== statusFilter) return false;
    return true;
  });

  if (isLoading) {
    return (
      <DashboardViewContainer maxWidth="wide">
        <DashboardViewHeader
          title="Bookings"
          subtitle="Manage participant bookings across all tours"
        />
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-[var(--color-border)] border-t-[var(--color-primary)] rounded-full animate-spin mb-4" />
            <p className="text-sm text-[var(--color-ink-muted)]">Loading bookings...</p>
          </div>
        </div>
      </DashboardViewContainer>
    );
  }

  if (error) {
    return (
      <DashboardViewContainer maxWidth="wide">
        <DashboardViewHeader
          title="Bookings"
          subtitle="Manage participant bookings across all tours"
        />
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <p className="text-sm text-[var(--color-ink-muted)]">Unable to load bookings. Please try again later.</p>
          </div>
        </div>
      </DashboardViewContainer>
    );
  }

  return (
    <DashboardViewContainer maxWidth="wide">
      {/* Fixed Header - Never Scrolls */}
      <DashboardViewHeader
        title="Bookings"
        subtitle="Manage participant bookings across all tours"
      />

      {/* Fixed Filter Buttons */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => setStatusFilter(option.id)}
              className={`px-4 py-2 rounded-[var(--radius-organic)] font-medium text-sm transition-colors duration-200 min-h-[44px] ${
                statusFilter === option.id
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface)] border-2 border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] font-medium text-sm hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors min-h-[44px]">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Deposit System Explainer */}
      <div className="mb-6 p-4 bg-[var(--color-surface-sunken)] border border-[var(--color-border)] rounded-[var(--radius-organic)]">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-xs">
            ?
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-ink)] mb-1">
              How deposits protect your tours
            </p>
            <p className="text-sm text-[var(--color-ink-muted)]">
              New users and those with strikes pay a deposit you set. If they miss the 24-hour payment window after quorum,
              you receive 97% of their deposit as compensation. &quot;Forfeited&quot; bookings show this income.{' '}
              <a href="/operator/help#deposits" className="text-[var(--color-primary)] hover:underline">
                Learn more
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <DashboardScrollArea>
        {/* Desktop: Table */}
        <div className="hidden md:block bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--color-surface-raised)] border-b-2 border-[var(--color-border)]">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-ink)]">Tour</th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-ink)]">Participant</th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-ink)]">Trust</th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-ink)]">Status</th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-ink)]">Booking Date</th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-ink)]">Amount</th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-ink)]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-[var(--color-surface-sunken)] transition-colors">
                      <td className="px-6 py-4 text-sm text-[var(--color-ink)]">{booking.tour_name}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-[var(--color-ink)]">{booking.participant_name}</div>
                        <div className="text-xs text-[var(--color-ink-muted)]">{booking.participant_email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${trustTierConfig[booking.trust_tier].className}`}>
                          {trustTierConfig[booking.trust_tier].label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge.Booking status={booking.status} />
                      </td>
                      <td className="px-6 py-4 text-sm text-[var(--color-ink-muted)]">
                        {new Date(booking.booking_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-[var(--color-ink)]">
                          ${booking.amount.toLocaleString()}
                        </div>
                        {booking.deposit_amount && booking.status !== 'forfeited' && (
                          <div className="text-xs text-[var(--color-ink-muted)]">
                            ${booking.deposit_amount} deposit
                          </div>
                        )}
                        {booking.status === 'forfeited' && booking.deposit_amount && (
                          <div className="text-xs text-[var(--color-primary)]">
                            +${Math.round(booking.deposit_amount * 0.97)} received
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 hover:bg-[var(--color-surface-sunken)] rounded-md transition-colors"
                            title="View Details"
                            aria-label="View booking details"
                          >
                            <Eye className="w-4 h-4 text-[var(--color-ink-muted)]" />
                          </button>
                          <button
                            className="p-2 hover:bg-[var(--color-surface-sunken)] rounded-md transition-colors"
                            title="Send Message"
                            aria-label="Send message to participant"
                          >
                            <Mail className="w-4 h-4 text-[var(--color-ink-muted)]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-[var(--color-ink-muted)]">
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile: Card Stack */}
        <div className="md:hidden space-y-3">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)] p-4"
              >
                {/* Tour Name */}
                <div className="mb-3">
                  <p className="text-xs text-[var(--color-ink-muted)] mb-1">Tour</p>
                  <p className="font-medium text-[var(--color-ink)]">{booking.tour_name}</p>
                </div>

                {/* Participant + Trust */}
                <div className="mb-3">
                  <p className="text-xs text-[var(--color-ink-muted)] mb-1">Participant</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[var(--color-ink)]">{booking.participant_name}</p>
                      <p className="text-sm text-[var(--color-ink-muted)]">{booking.participant_email}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${trustTierConfig[booking.trust_tier].className}`}>
                      {trustTierConfig[booking.trust_tier].label}
                    </span>
                  </div>
                </div>

                {/* Status and Amount Row */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-[var(--color-border)]">
                  <div>
                    <p className="text-xs text-[var(--color-ink-muted)] mb-1">Status</p>
                    <StatusBadge.Booking status={booking.status} />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[var(--color-ink-muted)] mb-1">Amount</p>
                    <p className="text-lg font-semibold text-[var(--color-ink)]">
                      ${booking.amount.toLocaleString()}
                    </p>
                    {booking.deposit_amount && booking.status !== 'forfeited' && (
                      <p className="text-xs text-[var(--color-ink-muted)]">
                        ${booking.deposit_amount} deposit
                      </p>
                    )}
                    {booking.status === 'forfeited' && booking.deposit_amount && (
                      <p className="text-xs text-[var(--color-primary)]">
                        +${Math.round(booking.deposit_amount * 0.97)} received
                      </p>
                    )}
                  </div>
                </div>

                {/* Date and Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[var(--color-ink-muted)] mb-1">Booking Date</p>
                    <p className="text-sm text-[var(--color-ink)]">
                      {new Date(booking.booking_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] rounded-md transition-colors"
                      aria-label="View booking details"
                    >
                      <Eye className="w-5 h-5 text-[var(--color-ink-muted)]" />
                    </button>
                    <button
                      className="p-2 border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] rounded-md transition-colors"
                      aria-label="Send message to participant"
                    >
                      <Mail className="w-5 h-5 text-[var(--color-ink-muted)]" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-8 text-center">
              <p className="text-[var(--color-ink-muted)]">No bookings found</p>
            </div>
          )}
        </div>
      </DashboardScrollArea>
    </DashboardViewContainer>
  );
}
