'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import {
  Edit,
  Eye,
  Copy,
  XCircle,
  Users,
  MapPin,
  MoreVertical,
  Share2,
  Loader2,
} from 'lucide-react';
import { DashboardViewContainer, DashboardViewHeader, DashboardScrollArea, QuorumIndicatorRing, StatusBadge } from '@/components/operator';
import { useOperatorContext } from '@/hooks/useOperatorContext';
import { useOperatorTours } from '@/hooks/useOperatorTours';
import type { Tour as DBTour } from '@/lib/supabase/useTours';

interface Tour {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  duration_days: number;
  type: string;
  price_per_person: number;
  status: 'forming' | 'confirmed' | 'past' | 'cancelled';
  participants_current: number;
  participants_quorum: number;
  participants_max: number;
  target_species: string[];
  days_until_departure: number;
}

function mapDBStatus(dbStatus: DBTour['status']): Tour['status'] {
  switch (dbStatus) {
    case 'completed':
      return 'past';
    case 'payment_pending':
      return 'confirmed';
    default:
      return dbStatus;
  }
}

function mapDBTourToLocal(tour: DBTour): Tour {
  const now = Date.now();
  const startMs = new Date(tour.date_start).getTime();
  const endMs = new Date(tour.date_end).getTime();
  const daysUntilDeparture = Math.ceil((startMs - now) / (1000 * 60 * 60 * 24));
  const durationDays = Math.max(1, Math.ceil((endMs - startMs) / (1000 * 60 * 60 * 24)) + 1);

  return {
    id: tour.id,
    title: tour.title,
    start_date: tour.date_start,
    end_date: tour.date_end,
    duration_days: durationDays,
    type: tour.tour_type,
    price_per_person: tour.price_cents / 100,
    status: mapDBStatus(tour.status),
    participants_current: tour.current_participants || 0,
    participants_quorum: tour.threshold,
    participants_max: tour.capacity,
    target_species: tour.target_species || [],
    days_until_departure: daysUntilDeparture,
  };
}

const FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'forming', label: 'Forming' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past' },
  { id: 'cancelled', label: 'Cancelled' },
] as const;

export function MyToursView() {
  const { operatorId } = useOperatorContext();
  const { tours: dbTours, isLoading, error } = useOperatorTours(operatorId);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const mappedTours = dbTours.map(mapDBTourToLocal);

  const filteredTours = mappedTours.filter((tour) => {
    if (statusFilter === 'all') {
      if (tour.status === 'cancelled') return false;
    } else if (statusFilter === 'forming') {
      if (tour.status !== 'forming') return false;
    } else if (statusFilter === 'confirmed') {
      if (tour.status !== 'confirmed') return false;
    } else if (statusFilter === 'upcoming') {
      if (tour.status === 'past' || tour.status === 'cancelled') return false;
      if (tour.days_until_departure > 60) return false;
    } else if (statusFilter === 'past') {
      if (tour.status !== 'past') return false;
    } else if (statusFilter === 'cancelled') {
      if (tour.status !== 'cancelled') return false;
    }

    return true;
  });

  return (
    <DashboardViewContainer>
      {/* Fixed Header */}
      <DashboardViewHeader
        title="My Tours"
        subtitle="Manage your tours and track bookings"
        actions={
          <Link
            href="/operator/tours/create"
            className="inline-flex items-center px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-organic)] font-medium shadow-[var(--shadow-card)] hover:bg-[var(--color-primary-hover)] transition-colors duration-200"
          >
            + Create Tour
          </Link>
        }
      />

      {/* Fixed Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
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

      {/* Scrollable Tours Grid */}
      <DashboardScrollArea>
        {isLoading ? (
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 text-[var(--color-ink-muted)] mx-auto mb-4 animate-spin" />
            <p className="text-[var(--color-ink-muted)]">Loading your tours...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-[var(--color-ink-muted)] mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-2">
              Unable to load tours
            </h3>
            <p className="text-[var(--color-ink-muted)] mb-6">{error}</p>
          </div>
        ) : filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-[var(--color-ink-muted)] mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-2">
              No tours found
            </h3>
            <p className="text-[var(--color-ink-muted)] mb-6">
              {statusFilter !== 'all'
                ? 'No tours match this filter. Try selecting a different filter.'
                : 'Create your first tour to get started.'}
            </p>
            <Link
              href="/operator/tours/create"
              className="inline-flex items-center px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-organic)] font-medium shadow-[var(--shadow-card)] hover:bg-[var(--color-primary-hover)] transition-colors duration-200"
            >
              + Create Your First Tour
            </Link>
          </div>
        )}
      </DashboardScrollArea>
    </DashboardViewContainer>
  );
}

// =============================================================================
// COMPACT TOUR CARD
// =============================================================================

function TourCard({ tour }: { tour: Tour }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isUrgent = tour.status === 'forming' && tour.days_until_departure < 14;
  const needed = tour.participants_quorum - tour.participants_current;

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [menuOpen]);

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Contextual primary action based on status
  const getPrimaryAction = () => {
    switch (tour.status) {
      case 'forming':
        return { label: 'Share', icon: Share2, onClick: () => console.log('Share tour', tour.id) };
      case 'confirmed':
        return { label: 'Participants', icon: Users, href: `/operator/bookings?tour=${tour.id}` };
      case 'past':
        return { label: 'Duplicate', icon: Copy, onClick: () => console.log('Duplicate tour', tour.id) };
      default:
        return null;
    }
  };

  // Menu actions
  const menuActions: Array<{
    label: string;
    icon: typeof Edit;
    href?: string;
    external?: boolean;
    onClick?: () => void;
    danger?: boolean;
  }> = [
    { label: 'Edit', icon: Edit, href: `/operator/tours/${tour.id}/edit` },
    { label: 'View Public Page', icon: Eye, href: `/tours/${tour.id}`, external: true },
    { label: 'Duplicate', icon: Copy, onClick: () => console.log('Duplicate tour', tour.id) },
  ];

  if (tour.status === 'forming') {
    menuActions.push({ label: 'Cancel Tour', icon: XCircle, onClick: () => console.log('Cancel tour', tour.id), danger: true });
  }

  const primaryAction = getPrimaryAction();

  return (
    <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)] flex flex-col">
      {/* Card Body - Clickable */}
      <Link
        href={`/operator/tours/${tour.id}/edit`}
        className="flex-1 p-4 hover:bg-[var(--color-surface-sunken)]/50 transition-colors"
      >
        {/* Header: Ring + Title/Status */}
        <div className="flex items-start gap-4">
          {/* Quorum Ring (forming/confirmed) or Status Icon (past/cancelled) */}
          {(tour.status === 'forming' || tour.status === 'confirmed') ? (
            <QuorumIndicatorRing
              current={tour.participants_current}
              quorum={tour.participants_quorum}
              size={48}
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[var(--color-surface-sunken)] flex items-center justify-center">
              <span className="text-lg text-[var(--color-ink-muted)]">
                {tour.status === 'past' ? '✓' : '✕'}
              </span>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-[var(--color-ink)] truncate mb-1">
              {tour.title}
            </h3>
            <StatusBadge.Tour status={tour.status} />
          </div>
        </div>

        {/* Info Row */}
        <div className="mt-4 space-y-1">
          <p className="text-sm text-[var(--color-ink-muted)]">
            {formatDate(tour.start_date)}
            {tour.duration_days > 1 && ` – ${formatDate(tour.end_date)}`}
            {' · '}
            {tour.duration_days} {tour.duration_days === 1 ? 'day' : 'days'}
          </p>

          {/* Status-specific message */}
          {tour.status === 'forming' && (
            <p className={`text-sm font-medium ${isUrgent ? 'text-[var(--color-destructive)]' : 'text-[var(--color-forming)]'}`}>
              Need {needed} more to confirm
              {isUrgent && ' · Urgent'}
            </p>
          )}
          {tour.status === 'confirmed' && (
            <p className="text-sm text-[var(--color-confirmed)] font-medium">
              {tour.participants_current} participants · {tour.days_until_departure}d away
            </p>
          )}
          {tour.status === 'past' && (
            <p className="text-sm text-[var(--color-ink-muted)]">
              {tour.participants_current} participants joined
            </p>
          )}
        </div>
      </Link>

      {/* Footer: Actions */}
      <div className="px-4 py-3 border-t-2 border-[var(--color-border)] flex items-center justify-between">
        {/* Primary Contextual Action */}
        {primaryAction ? (
          primaryAction.href ? (
            <Link
              href={primaryAction.href}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-[var(--radius-organic)] transition-colors"
            >
              <primaryAction.icon className="w-4 h-4" />
              {primaryAction.label}
            </Link>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                primaryAction.onClick?.();
              }}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-[var(--radius-organic)] transition-colors"
            >
              <primaryAction.icon className="w-4 h-4" />
              {primaryAction.label}
            </button>
          )
        ) : (
          <span />
        )}

        {/* Kebab Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-sunken)] rounded-[var(--radius-organic)] transition-colors"
            aria-label="More actions"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 bottom-full mb-2 w-48 bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-lg z-10 py-1">
              {menuActions.map((action, idx) => (
                action.href ? (
                  <Link
                    key={idx}
                    href={action.href}
                    target={action.external ? '_blank' : undefined}
                    rel={action.external ? 'noopener noreferrer' : undefined}
                    className={`flex items-center gap-3 px-4 py-2 text-sm hover:bg-[var(--color-surface-sunken)] transition-colors ${
                      action.danger ? 'text-[var(--color-destructive)]' : 'text-[var(--color-ink)]'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <action.icon className="w-4 h-4" />
                    {action.label}
                  </Link>
                ) : (
                  <button
                    key={idx}
                    onClick={() => {
                      action.onClick?.();
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-left hover:bg-[var(--color-surface-sunken)] transition-colors ${
                      action.danger ? 'text-[var(--color-destructive)]' : 'text-[var(--color-ink)]'
                    }`}
                  >
                    <action.icon className="w-4 h-4" />
                    {action.label}
                  </button>
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
