'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SpeciesSection } from '@/components/ui/SpeciesSection';
import { LogisticsSection } from '@/components/ui/LogisticsSection';
import { CommitmentCard } from '@/components/ui/CommitmentCard';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { EmptyState } from '@/components/ui/EmptyState';
import { useTour } from '@/lib/supabase/useTours';
import { useAuth } from '@/lib/supabase/useAuth';
import { usePersonalizedDeposit } from '@/hooks/usePersonalizedDeposit';
import { useUserTrust } from '@/hooks/useUserTrust';
import { useUserReservation } from '@/hooks/useUserReservation';
import { TourEnquiryForm } from '@/components/tours/TourEnquiryForm';

type ConfirmationStatus = 'confirmed' | 'forming' | 'not-running';

// Map database status to display status
function mapStatus(dbStatus: string): ConfirmationStatus {
  switch (dbStatus) {
    case 'confirmed':
    case 'completed':
      return 'confirmed';
    case 'forming':
    case 'payment_pending':
      return 'forming';
    case 'cancelled':
    default:
      return 'not-running';
  }
}

// Format date for display
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-AU', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// Calculate duration from start and end dates
function calculateDuration(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const hours = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60));

  if (hours < 24) {
    return `${hours} hours`;
  }

  const days = Math.ceil(hours / 24);
  return `${days} day${days > 1 ? 's' : ''}`;
}

// Generate species groups from target_species array
function generateSpeciesGroups(species: string[]) {
  if (!species || species.length === 0) {
    return [];
  }

  // Split into primary (first 2), secondary (next 3), opportunistic (rest)
  const primary = species.slice(0, 2);
  const secondary = species.slice(2, 5);
  const opportunistic = species.slice(5);

  const groups = [];

  if (primary.length > 0) {
    groups.push({
      level: 'primary' as const,
      species: primary.map(name => ({ name })),
    });
  }

  if (secondary.length > 0) {
    groups.push({
      level: 'secondary' as const,
      species: secondary.map(name => ({ name })),
    });
  }

  if (opportunistic.length > 0) {
    groups.push({
      level: 'opportunistic' as const,
      species: opportunistic.map(name => ({ name })),
    });
  }

  return groups;
}

// Itinerary day type
interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  vessel?: string;
  departure?: string;
  description?: string;
  end_time?: string;
}

// Generate logistics from tour data
function generateLogistics(tour: {
  capacity: number;
  current_participants: number;
  threshold: number;
  date_start: string;
  date_end: string;
  included: string[];
  not_included: string[];
  itinerary: ItineraryDay[] | null;
}) {
  const items: { icon: 'group' | 'fitness' | 'included' | 'not_included' | 'policy' | 'time' | 'location'; label: string; value: string; details: string[] }[] = [
    {
      icon: 'group',
      label: 'Group size',
      value: `Maximum ${tour.capacity} participants`,
      details: [
        `Currently ${tour.current_participants} committed`,
        tour.current_participants >= tour.threshold
          ? 'Tour is confirmed!'
          : `${tour.threshold - tour.current_participants} more needed to confirm`,
      ],
    },
  ];

  // Only show generic schedule if no itinerary
  if (!tour.itinerary || tour.itinerary.length === 0) {
    const startTime = new Date(tour.date_start).toLocaleTimeString('en-AU', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    const endTime = new Date(tour.date_end).toLocaleTimeString('en-AU', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    items.push({
      icon: 'time',
      label: 'Schedule',
      value: `${startTime} - ${endTime}`,
      details: ['Check tour details for meeting location'],
    });
  }

  if (tour.included && tour.included.length > 0) {
    items.push({
      icon: 'included',
      label: 'Included',
      value: `${tour.included.length} items`,
      details: tour.included,
    });
  }

  if (tour.not_included && tour.not_included.length > 0) {
    items.push({
      icon: 'not_included',
      label: 'Not Included',
      value: `${tour.not_included.length} items`,
      details: tour.not_included,
    });
  }

  return items;
}

// Default FAQs
const defaultFaqs = [
  {
    question: 'What if the tour doesn\'t reach quorum?',
    answer: 'If the minimum number of participants isn\'t reached by the deadline, your commitment is automatically cancelled and your deposit is fully refunded. We\'ll notify you as soon as we know.',
  },
  {
    question: 'What if I need to cancel after committing?',
    answer: 'You can cancel up to 7 days before the tour date for a full refund. Cancellations within 7 days may receive a partial refund or credit for a future tour, depending on circumstances.',
  },
  {
    question: 'What happens if weather forces a reschedule?',
    answer: 'If conditions are unsafe or would significantly impact the experience, we\'ll offer a full refund or reschedule to an alternative date at no extra cost.',
  },
];

export function TourDetailClient() {
  const params = useParams();
  const tourId = params.id as string;
  const { tour: dbTour, isLoading, error } = useTour(tourId);
  const { user } = useAuth();
  const { depositCents: personalizedDepositCents } = usePersonalizedDeposit(user?.id ?? null, dbTour?.id ?? null);
  const { trustTier } = useUserTrust(user?.id ?? null);
  const { hasCommitted } = useUserReservation(user?.id ?? null, dbTour?.id ?? null);
  const [imageError, setImageError] = useState(false);

  // Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[var(--color-surface)]">
        <div className="w-full max-w-[var(--container-max)] mx-auto px-[var(--space-lg)] py-[var(--space-3xl)]">
          <div className="animate-pulse space-y-[var(--space-xl)]">
            <div className="h-8 bg-[var(--color-border)] rounded w-2/3" />
            <div className="h-4 bg-[var(--color-border)] rounded w-1/3" />
            <div className="h-64 bg-[var(--color-border)] rounded-[var(--radius-lg)]" />
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !dbTour) {
    return (
      <main className="min-h-screen bg-[var(--color-surface)]">
        <div className="w-full max-w-[var(--container-max)] mx-auto px-[var(--space-lg)] py-[var(--space-3xl)]">
          <EmptyState
            title="Tour not found"
            description={error || "The tour you're looking for doesn't exist or has been removed."}
            actionLabel="Browse all tours"
            onAction={() => (window.location.href = '/tours')}
          />
        </div>
      </main>
    );
  }

  // Map database tour to display format
  const tour = {
    id: dbTour.id,
    slug: dbTour.slug,
    title: dbTour.title,
    operatorName: dbTour.operator?.name || 'Unknown Operator',
    operatorId: dbTour.operator?.slug || dbTour.operator?.id || '',
    operatorExpertise: (dbTour.operator as any)?.tagline || 'Birding specialist',
    operatorPhoto: (dbTour.operator as any)?.logo_url || null,
    operatorYears: 5,
    status: mapStatus(dbTour.status),
    currentParticipants: dbTour.current_participants,
    threshold: dbTour.threshold,
    capacity: dbTour.capacity,
    date: formatDate(dbTour.date_start),
    duration: calculateDuration(dbTour.date_start, dbTour.date_end),
    location: (dbTour.operator as any)?.base_location || 'Australia',
    description: dbTour.description || 'Join us for an unforgettable birding experience.',
    price: dbTour.price_cents / 100,
    deposit: (user && personalizedDepositCents !== null ? personalizedDepositCents : dbTour.deposit_cents) / 100,
    image: dbTour.image_url || undefined,
    species: generateSpeciesGroups(dbTour.target_species || []),
    itinerary: (Array.isArray(dbTour.itinerary) ? dbTour.itinerary : null) as ItineraryDay[] | null,
    logistics: generateLogistics({
      capacity: dbTour.capacity,
      current_participants: dbTour.current_participants,
      threshold: dbTour.threshold,
      date_start: dbTour.date_start,
      date_end: dbTour.date_end,
      included: dbTour.included || [],
      not_included: (dbTour as any).not_included || [],
      itinerary: Array.isArray(dbTour.itinerary) ? dbTour.itinerary as ItineraryDay[] : null,
    }),
    faqs: defaultFaqs,
  };

  const showHeroImage = tour.image && !imageError;

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-[var(--color-surface)]">
        {/* Hero Image Banner */}
        {showHeroImage && (
          <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
            <Image
              src={tour.image!}
              alt={`${tour.title} - ${tour.location}`}
              fill
              priority
              className="object-cover"
              sizes="100vw"
              onError={() => setImageError(true)}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#1B4D3E]/60 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
        )}

        {/* Main Content */}
        <div className="w-full max-w-[var(--container-max)] mx-auto px-[var(--space-lg)] py-[var(--space-2xl)]">
          {/* Breadcrumb */}
          <nav className="mb-[var(--space-lg)] text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-[var(--space-sm)]">
              <li>
                <a href="/" className="text-[var(--color-ink-muted)] hover:text-[var(--color-primary)]">
                  Home
                </a>
              </li>
              <li className="text-[var(--color-ink-subtle)]" aria-hidden="true">
                /
              </li>
              <li>
                <a href="/tours" className="text-[var(--color-ink-muted)] hover:text-[var(--color-primary)]">
                  Tours
                </a>
              </li>
              <li className="text-[var(--color-ink-subtle)]" aria-hidden="true">
                /
              </li>
              <li className="text-[var(--color-ink)]" aria-current="page">
                {tour.title}
              </li>
            </ol>
          </nav>

          {/* Two-column layout on desktop */}
          <div className="flex flex-col xl:flex-row gap-[var(--space-2xl)]">
            {/* Left column: Main content */}
            <div className="flex-1 min-w-0">
              {/* Section 2: Core Tour Overview */}
              <section className="mb-[var(--space-3xl)]">
                <h1 className="font-display text-4xl lg:text-5xl font-semibold text-[var(--color-ink)] mb-[var(--space-sm)]">
                  {tour.title}
                </h1>

                {/* Operator Attribution */}
                <p className="text-[var(--color-ink-muted)] mb-[var(--space-lg)]">
                  with{' '}
                  <a
                    href={`/operators/${tour.operatorId}`}
                    className="text-[var(--color-primary)] font-medium hover:underline"
                  >
                    {tour.operatorName}
                  </a>
                </p>

                {/* Tour Meta */}
                <div className="flex flex-wrap gap-[var(--space-lg)] mb-[var(--space-xl)] text-sm">
                  <div className="flex items-center gap-[var(--space-xs)]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <rect x="2" y="3" width="12" height="11" rx="1" />
                      <path d="M2 6h12M5 1v4M11 1v4" />
                    </svg>
                    <span className="text-[var(--color-ink)]">{tour.date}</span>
                  </div>
                  <div className="flex items-center gap-[var(--space-xs)]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <circle cx="8" cy="8" r="6" />
                      <path d="M8 4v4l3 2" />
                    </svg>
                    <span className="text-[var(--color-ink)]">{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-[var(--space-xs)]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path d="M8 14s-5-3.5-5-7a5 5 0 1110 0c0 3.5-5 7-5 7z" />
                      <circle cx="8" cy="7" r="1.5" />
                    </svg>
                    <span className="text-[var(--color-ink)]">{tour.location}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="text-[var(--color-ink-muted)] leading-relaxed space-y-[var(--space-md)]">
                  {tour.description.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {/* Expectations Disclaimer */}
                <p className="mt-[var(--space-lg)] text-sm text-[var(--color-ink-subtle)] italic">
                  Sightings depend on conditions and cannot be guaranteed. This tour focuses on creating
                  optimal viewing opportunities.
                </p>
              </section>

              {/* Inline booking widget — visible below xl (1280px), after overview */}
              <div className="xl:hidden mb-[var(--space-3xl)]">
                <CommitmentCard
                  tourId={tour.slug}
                  tourName={tour.title}
                  tourDate={tour.date}
                  tourLocation={tour.location}
                  operatorName={tour.operatorName}
                  targetSpecies={(dbTour.target_species || []).slice(0, 3).join(', ')}
                  status={tour.status}
                  price={tour.price}
                  deposit={tour.deposit}
                  currentParticipants={tour.currentParticipants}
                  quorum={tour.threshold}
                  capacity={tour.capacity}
                  isLoggedIn={!!user}
                  hasCommitted={hasCommitted}
                  trustMessage={
                    user
                      ? trustTier === 'trusted'
                        ? 'No deposit — Trusted member'
                        : trustTier === 'new'
                        ? 'Deposit required for first-time birders'
                        : trustTier === 'strike-1'
                        ? 'Deposit required — 1 strike on account'
                        : trustTier === 'strike-2'
                        ? 'Higher deposit required — 2 strikes on account'
                        : null
                      : 'Deposit varies by trust tier'
                  }
                />
              </div>

              {/* Section 3: Species Focus */}
              {tour.species.length > 0 && (
                <div className="mb-[var(--space-3xl)]">
                  <SpeciesSection groups={tour.species} />
                </div>
              )}

              {/* Section 4: Operator Preview */}
              <section className="mb-[var(--space-3xl)]">
                <h3 className="font-display text-[clamp(1.25rem,3vw,1.5rem)] leading-tight text-[var(--color-ink)] mb-[var(--space-md)]">
                  Your Guide
                </h3>

                <div className="bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-[var(--space-lg)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--color-primary)] transition-all duration-200">
                  <div className="flex items-start gap-[var(--space-lg)]">
                    {tour.operatorPhoto ? (
                      <div className="relative flex-shrink-0 w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={tour.operatorPhoto}
                          alt={tour.operatorName}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-16 h-16 bg-[var(--color-surface-sunken)] rounded-full flex items-center justify-center text-[var(--color-ink-subtle)]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="8" r="4" />
                          <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                        </svg>
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-[var(--color-ink)]">{tour.operatorName}</h4>
                      <p className="text-sm text-[var(--color-ink-muted)] mt-0.5">{tour.operatorExpertise}</p>
                      <a
                        href={`/operators/${tour.operatorId}`}
                        className="inline-flex items-center gap-[var(--space-xs)] mt-[var(--space-sm)] text-sm text-[var(--color-primary)] font-medium hover:underline"
                      >
                        View full profile
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M2 6h8M6 2l4 4-4 4" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5: Itinerary (per-day schedule) */}
              {tour.itinerary && tour.itinerary.length > 0 && (
                <section className="mb-[var(--space-3xl)]">
                  <h3 className="font-display text-[clamp(1.25rem,3vw,1.5rem)] leading-tight text-[var(--color-ink)] mb-[var(--space-md)]">
                    Schedule
                  </h3>
                  <div className="bg-[var(--color-surface-raised)] border border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)] px-[var(--space-lg)] py-[var(--space-md)]">
                    {tour.itinerary.map((day, index) => (
                      <div key={day.day}>
                        {index > 0 && (
                          <hr className="border-[var(--color-border)] my-[var(--space-md)]" />
                        )}
                        <div>
                          <h4 className="font-medium text-[var(--color-ink)]">
                            {day.title}
                          </h4>
                          {day.vessel && (
                            <p className="text-sm text-[var(--color-ink-muted)] mt-1">
                              Aboard the {day.vessel}
                            </p>
                          )}
                          {day.departure && (
                            <p className="text-sm text-[var(--color-ink-muted)] mt-0.5">
                              Departs: {day.departure}
                            </p>
                          )}
                          {day.description && (
                            <p className="text-sm text-[var(--color-ink-muted)] mt-[var(--space-sm)] leading-relaxed">
                              {day.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Section 6: Logistics */}
              <div className="mb-[var(--space-3xl)]">
                <LogisticsSection items={tour.logistics} />
              </div>

              {/* Section 7: Enquiry Form */}
              <TourEnquiryForm
                tourTitle={tour.title}
                tourSlug={tour.slug}
                operatorName={tour.operatorName}
              />

              {/* Section 8: FAQs */}
              {tour.faqs.length > 0 && (
                <div className="mb-[var(--space-3xl)]">
                  <FAQAccordion items={tour.faqs} />
                </div>
              )}
            </div>

            {/* Right column: Commitment Card — hidden below xl (shown inline above), sticky sidebar on xl+ */}
            <div className="hidden xl:block xl:w-[320px] flex-shrink-0">
              <div className="xl:sticky xl:top-[calc(57px+var(--space-lg))]">
                <CommitmentCard
                  tourId={tour.slug}
                  tourName={tour.title}
                  tourDate={tour.date}
                  tourLocation={tour.location}
                  operatorName={tour.operatorName}
                  targetSpecies={(dbTour.target_species || []).slice(0, 3).join(', ')}
                  status={tour.status}
                  price={tour.price}
                  deposit={tour.deposit}
                  currentParticipants={tour.currentParticipants}
                  quorum={tour.threshold}
                  capacity={tour.capacity}
                  isLoggedIn={!!user}
                  hasCommitted={hasCommitted}
                  trustMessage={
                    user
                      ? trustTier === 'trusted'
                        ? 'No deposit — Trusted member'
                        : trustTier === 'new'
                        ? 'Deposit required for first-time birders'
                        : trustTier === 'strike-1'
                        ? 'Deposit required — 1 strike on account'
                        : trustTier === 'strike-2'
                        ? 'Higher deposit required — 2 strikes on account'
                        : null
                      : 'Deposit varies by trust tier'
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </ErrorBoundary>
  );
}
