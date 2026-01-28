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
} from 'lucide-react';
import { DashboardViewContainer, DashboardViewHeader, DashboardScrollArea, QuorumIndicatorRing, StatusBadge } from '@/components/operator';

// TODO: Replace with real API data
interface Tour {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  duration_days: number;
  type: 'single-day' | 'multi-day';
  price_per_person: number;
  status: 'forming' | 'confirmed' | 'past' | 'cancelled';
  participants_current: number;
  participants_quorum: number;
  participants_max: number;
  target_species: string[];
  days_until_departure: number;
}

// Stubbed tour data
const STUBBED_TOURS: Tour[] = [
  {
    id: '1',
    title: 'Patagonian Birding Adventure',
    start_date: '2026-05-10',
    end_date: '2026-05-24',
    duration_days: 14,
    type: 'multi-day',
    price_per_person: 4200,
    status: 'forming',
    participants_current: 4,
    participants_quorum: 6,
    participants_max: 8,
    target_species: ['Andean Condor', 'Magellanic Woodpecker', 'Austral Parakeet', 'Black-necked Swan'],
    days_until_departure: 80,
  },
  {
    id: '2',
    title: 'Costa Rica Cloud Forest Expedition',
    start_date: '2026-03-15',
    end_date: '2026-03-22',
    duration_days: 7,
    type: 'multi-day',
    price_per_person: 3200,
    status: 'confirmed',
    participants_current: 8,
    participants_quorum: 6,
    participants_max: 8,
    target_species: ['Resplendent Quetzal', 'Three-wattled Bellbird', 'Keel-billed Toucan'],
    days_until_departure: 24,
  },
  {
    id: '3',
    title: 'Buenos Aires Urban Birding',
    start_date: '2026-03-01',
    end_date: '2026-03-01',
    duration_days: 1,
    type: 'single-day',
    price_per_person: 180,
    status: 'confirmed',
    participants_current: 6,
    participants_quorum: 4,
    participants_max: 10,
    target_species: ['Southern Lapwing', 'Rufous Hornero', 'Chalk-browed Mockingbird'],
    days_until_departure: 8,
  },
  {
    id: '4',
    title: 'Atlantic Forest Endemics',
    start_date: '2025-11-20',
    end_date: '2025-11-27',
    duration_days: 7,
    type: 'multi-day',
    price_per_person: 3800,
    status: 'past',
    participants_current: 7,
    participants_quorum: 6,
    participants_max: 8,
    target_species: ['Red-ruffed Fruitcrow', 'Black-fronted Piping Guan', 'Blue Manakin'],
    days_until_departure: -64,
  },
  {
    id: '5',
    title: 'Pantanal Wetlands Safari',
    start_date: '2026-06-15',
    end_date: '2026-06-25',
    duration_days: 10,
    type: 'multi-day',
    price_per_person: 4500,
    status: 'forming',
    participants_current: 2,
    participants_quorum: 6,
    participants_max: 8,
    target_species: ['Hyacinth Macaw', 'Jabiru', 'Greater Rhea', 'Helmeted Manakin'],
    days_until_departure: 116,
  },
];

const FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'forming', label: 'Forming' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past' },
  { id: 'cancelled', label: 'Cancelled' },
] as const;

export function MyToursView() {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter tours
  const filteredTours = STUBBED_TOURS.filter((tour) => {
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
        {filteredTours.length > 0 ? (
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
