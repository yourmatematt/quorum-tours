'use client';

import { useState } from 'react';
import { Eye, Mail, Download } from 'lucide-react';
import { DashboardViewContainer, DashboardViewHeader, DashboardScrollArea, StatusBadge } from '@/components/operator';

interface Booking {
  id: string;
  tour_name: string;
  participant_name: string;
  participant_email: string;
  status: 'held' | 'paid' | 'cancelled';
  booking_date: string;
  amount: number;
}

const FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'held', label: 'Held' },
  { id: 'paid', label: 'Paid' },
  { id: 'cancelled', label: 'Cancelled' },
] as const;

const STUBBED_BOOKINGS: Booking[] = [
  {
    id: '1',
    tour_name: 'Patagonian Birding Adventure',
    participant_name: 'Sarah Johnson',
    participant_email: 'sarah.j@email.com',
    status: 'paid',
    booking_date: '2026-01-15',
    amount: 4200,
  },
  {
    id: '2',
    tour_name: 'Costa Rica Cloud Forest',
    participant_name: 'Michael Chen',
    participant_email: 'mchen@email.com',
    status: 'held',
    booking_date: '2026-01-18',
    amount: 3200,
  },
  {
    id: '3',
    tour_name: 'Buenos Aires Urban Birding',
    participant_name: 'Emma Thompson',
    participant_email: 'emma.t@email.com',
    status: 'paid',
    booking_date: '2026-01-20',
    amount: 180,
  },
];

export function BookingsView() {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredBookings = STUBBED_BOOKINGS.filter((booking) => {
    if (statusFilter !== 'all' && booking.status !== statusFilter) return false;
    return true;
  });

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
                        <StatusBadge.Booking status={booking.status} />
                      </td>
                      <td className="px-6 py-4 text-sm text-[var(--color-ink-muted)]">
                        {new Date(booking.booking_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-[var(--color-ink)]">
                        ${booking.amount.toLocaleString()}
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
                    <td colSpan={6} className="px-6 py-12 text-center text-[var(--color-ink-muted)]">
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

                {/* Participant */}
                <div className="mb-3">
                  <p className="text-xs text-[var(--color-ink-muted)] mb-1">Participant</p>
                  <p className="font-medium text-[var(--color-ink)]">{booking.participant_name}</p>
                  <p className="text-sm text-[var(--color-ink-muted)]">{booking.participant_email}</p>
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
