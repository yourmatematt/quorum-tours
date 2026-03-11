'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { OperatorHero } from '@/components/ui/OperatorHero';
import { AuthoritySection } from '@/components/ui/AuthoritySection';
import { TrackRecordSummary } from '@/components/ui/TrackRecordSummary';
import { TourCard } from '@/components/TourCard';
import { PastTourItem } from '@/components/ui/PastTourItem';
import { CapabilitiesSection } from '@/components/ui/CapabilitiesSection';
import { OperatorNoToursCard } from '@/components/ui/OperatorNoToursCard';

/* ---- Types for DB data ---- */
interface OperatorRow {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  logo_url: string | null;
  hero_image_url: string | null;
  base_location: string | null;
  established_year: number | null;
  specialties: string[] | null;
  languages: string[] | null;
  is_verified: boolean;
  is_founding_operator: boolean;
  rating_avg: number | null;
  rating_count: number | null;
  tours_completed: number | null;
  guests_served: number | null;
  vessel_name: string | null;
  vessel_capacity: number | null;
  vessel_features: string[] | null;
  equipment_summary: string | null;
  metadata: Record<string, unknown> | null;
}

interface TourRow {
  id: string;
  slug: string;
  title: string;
  status: string;
  location: string | null;
  date_start: string | null;
  threshold: number | null;
  capacity: number | null;
  current_participant_count: number | null;
  highlights: string[] | null;
}

export function OperatorProfileClient() {
  const params = useParams();
  const slug = params.id as string;

  const [operator, setOperator] = useState<OperatorRow | null>(null);
  const [tours, setTours] = useState<TourRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');

  useEffect(() => {
    async function fetchOperator() {
      const supabase = createClient();

      // Try slug first, then UUID
      let query = supabase
        .from('operators')
        .select('*')
        .eq('is_active', true);

      // If it looks like a UUID, query by id; otherwise by slug
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
      query = isUuid ? query.eq('id', slug) : query.eq('slug', slug);

      const { data: op, error } = await query.single();

      if (error || !op) {
        setNotFoundState(true);
        setIsLoading(false);
        return;
      }

      setOperator(op);

      // Fetch tours for this operator
      const { data: tourData } = await supabase
        .from('tours')
        .select('id, slug, title, status, location, date_start, threshold, capacity, current_participant_count, highlights')
        .eq('operator_id', op.id)
        .order('date_start', { ascending: false });

      setTours(tourData ?? []);
      setIsLoading(false);
    }

    fetchOperator();
  }, [slug]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-[var(--color-ink-muted)]" />
      </main>
    );
  }

  if (notFoundState || !operator) {
    notFound();
  }

  const metadata = (operator.metadata ?? {}) as Record<string, unknown>;
  const currentYear = new Date().getFullYear();
  const yearsExperience = metadata.years_experience
    ? Number(metadata.years_experience)
    : operator.established_year
      ? currentYear - operator.established_year
      : 0;

  const whyQuorum = (metadata.why_quorum as string) ?? null;

  // Split tours into active vs past
  const now = new Date();
  const activeTours = tours.filter(
    (t) => t.status === 'forming' || t.status === 'confirmed' || (t.date_start && new Date(t.date_start) > now)
  );
  const pastTours = tours.filter(
    (t) => t.status === 'completed' || t.status === 'cancelled' || (t.date_start && new Date(t.date_start) <= now && t.status !== 'forming' && t.status !== 'confirmed')
  );

  // Build equipment/capabilities from DB fields
  const equipmentItems: { name: string; description?: string }[] = [];
  if (operator.vessel_name) {
    const desc = [
      operator.vessel_capacity ? `Capacity: ${operator.vessel_capacity}` : null,
      operator.vessel_features?.length ? operator.vessel_features.join(', ') : null,
    ].filter(Boolean).join('. ');
    equipmentItems.push({ name: operator.vessel_name, description: desc || undefined });
  }
  if (operator.equipment_summary) {
    equipmentItems.push({ name: operator.equipment_summary });
  }

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-[var(--color-surface)] lg:bg-[var(--color-surface-sunken)]">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-[var(--space-lg)]
        py-[var(--space-lg)] lg:py-[var(--space-2xl)]
      ">
        {/* Breadcrumb */}
        <nav className="mb-[var(--space-md)] lg:mb-[var(--space-lg)] text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center gap-[var(--space-sm)]">
            <li>
              <a href="/" className="text-[var(--color-ink-muted)] hover:text-[var(--color-primary)]">
                Home
              </a>
            </li>
            <li className="text-[var(--color-ink-subtle)]" aria-hidden="true">/</li>
            <li>
              <a href="/operators" className="text-[var(--color-ink-muted)] hover:text-[var(--color-primary)]">
                Operators
              </a>
            </li>
            <li className="text-[var(--color-ink-subtle)]" aria-hidden="true">/</li>
            <li className="text-[var(--color-ink)]" aria-current="page">
              {operator.name}
            </li>
          </ol>
        </nav>

        {/* Section cards — each section is its own card */}
        <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6">

        {/* Card 1: Hero — identity card */}
        <div className="
          bg-white
          rounded-[var(--radius-organic)]
          border border-[var(--color-border)]
          shadow-sm
          pb-4 sm:pb-6 lg:pb-8
        ">
          <OperatorHero
            name={operator.name}
            photo={operator.logo_url ?? undefined}
            coverImage={operator.hero_image_url ?? undefined}
            verified={operator.is_verified}
            isFoundingOperator={operator.is_founding_operator}
            location={operator.base_location ?? ''}
            yearsExperience={yearsExperience}
          />
          {/* Bio — desktop only, inside hero card */}
          {operator.tagline && (
            <p className="hidden lg:block px-[var(--space-lg)] mt-[var(--space-sm)] text-[var(--text-lg)] text-[var(--color-ink-muted)]">
              {operator.tagline}
            </p>
          )}
        </div>

        {/* Card 1b: Bio — mobile only */}
        {operator.tagline && (
          <div className="
            lg:hidden
            bg-white
            rounded-[var(--radius-organic)]
            border border-[var(--color-border)]
            shadow-sm
            p-4 sm:p-6
          ">
            <p className="text-[var(--color-ink-muted)] leading-relaxed">
              {operator.tagline}
            </p>
          </div>
        )}

        {/* Card 2: Why I Joined Quorum */}
        {whyQuorum && (
          <div className="
            bg-white
            rounded-[var(--radius-organic)]
            border border-[var(--color-border)]
            shadow-sm
            p-4 sm:p-6 lg:p-8
          ">
            <section>
              <h2 className="font-display text-[clamp(1.375rem,3.5vw,2.25rem)] leading-tight text-[var(--color-ink)] mb-[var(--space-lg)]">
                Why I Joined Quorum
              </h2>
              <blockquote className="
                border-l-4 border-[var(--color-primary)]
                pl-[var(--space-lg)]
                py-[var(--space-sm)]
                text-[var(--color-ink-muted)]
                leading-relaxed
                italic
                text-lg
              ">
                <p>&ldquo;{whyQuorum}&rdquo;</p>
                <footer className="mt-[var(--space-sm)] text-sm not-italic text-[var(--color-ink-subtle)]">
                  — {operator.name}
                </footer>
              </blockquote>
            </section>
          </div>
        )}

        {/* Card 3: Expertise (+ Track Record if available) */}
        <div className="
          bg-white
          rounded-[var(--radius-organic)]
          border border-[var(--color-border)]
          shadow-sm
          p-4 sm:p-6 lg:p-8
        ">
          {(operator.tours_completed ?? 0) > 0 && (
            <div className="mb-[var(--space-lg)]">
              <TrackRecordSummary
                toursCompleted={operator.tours_completed ?? 0}
                confirmationRate={0}
                totalParticipants={operator.guests_served ?? 0}
              />
            </div>
          )}
          <AuthoritySection
            specializations={operator.specialties ?? []}
            credentials={[]}
            affiliations={[]}
          />
        </div>

        {/* Card 4: About (+ Capabilities if available) */}
        {(operator.description || equipmentItems.length > 0 || (operator.languages ?? []).length > 0) && (
          <div className="
            bg-white
            rounded-[var(--radius-organic)]
            border border-[var(--color-border)]
            shadow-sm
            p-4 sm:p-6 lg:p-8
          ">
            {operator.description && (
              <section className={equipmentItems.length > 0 || (operator.languages ?? []).length > 0 ? 'mb-[var(--space-lg)]' : ''}>
                <h2 className="font-display text-[clamp(1.375rem,3.5vw,2.25rem)] leading-tight text-[var(--color-ink)] mb-[var(--space-lg)]">
                  About
                </h2>
                <div className="
                  text-[var(--color-ink-muted)]
                  leading-relaxed
                  space-y-[var(--space-sm)] sm:space-y-[var(--space-md)]
                ">
                  {operator.description.split('\n').map((line, index) => (
                    line.trim() === ''
                      ? <br key={index} />
                      : <p key={index}>{line}</p>
                  ))}
                </div>
              </section>
            )}
            <CapabilitiesSection
              equipment={equipmentItems}
              capacity={{
                typical: operator.vessel_capacity ? `Up to ${operator.vessel_capacity}` : '',
                maximum: operator.vessel_capacity ?? 0,
                privateAvailable: false,
              }}
              accessibility={[]}
              languages={operator.languages ?? []}
            />
          </div>
        )}

        {/* Card 5: Tours (or empty state) */}
        <div className="
          bg-white
          rounded-[var(--radius-organic)]
          border border-[var(--color-border)]
          shadow-sm
          p-4 sm:p-6 lg:p-8
        ">
          {activeTours.length === 0 && (
            <OperatorNoToursCard operatorFirstName={operator.name.split(' ')[0]} />
          )}

          {tours.length > 0 && (
            <section>
              <h2 className="font-display text-[clamp(1.375rem,3.5vw,2.25rem)] leading-tight text-[var(--color-ink)] mb-[var(--space-lg)]">
                Tours
              </h2>

              {/* Tab Navigation */}
              <div className="flex gap-[var(--space-md)] mb-[var(--space-lg)] border-b border-[var(--color-border)]">
                <button
                  type="button"
                  onClick={() => setActiveTab('active')}
                  className={`
                    pb-[var(--space-sm)]
                    py-3 px-2 min-h-[48px]
                    text-sm font-medium
                    border-b-2
                    transition-colors duration-[var(--transition-normal)]
                    ${activeTab === 'active'
                      ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                      : 'border-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
                    }
                  `}
                >
                  Active Tours ({activeTours.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('past')}
                  className={`
                    pb-[var(--space-sm)]
                    py-3 px-2 min-h-[48px]
                    text-sm font-medium
                    border-b-2
                    transition-colors duration-[var(--transition-normal)]
                    ${activeTab === 'past'
                      ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                      : 'border-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
                    }
                  `}
                >
                  Past Tours ({pastTours.length})
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'active' && (
                <div>
                  {activeTours.length > 0 ? (
                    <div className="grid gap-[var(--space-lg)] sm:grid-cols-2 lg:grid-cols-3">
                      {activeTours.map((tour) => (
                        <TourCard
                          key={tour.id}
                          title={tour.title}
                          operatorName={operator.name}
                          status={tour.status as 'confirmed' | 'forming' | 'not-running'}
                          currentParticipants={tour.current_participant_count ?? 0}
                          quorum={tour.threshold ?? 0}
                          capacity={tour.capacity ?? 0}
                          date={tour.date_start ? new Date(tour.date_start).toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                          location={tour.location ?? ''}
                          href={`/tours/${tour.slug ?? tour.id}`}
                          speciesHighlight={tour.highlights?.[0]}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-[var(--color-ink-muted)] py-[var(--space-xl)]">
                      No active tours at the moment. Check back soon.
                    </p>
                  )}
                </div>
              )}

              {activeTab === 'past' && (
                <div className="
                  bg-[var(--color-surface-raised)]
                  border-2 border-[var(--color-border)]
                  rounded-[var(--radius-organic)]
                  shadow-[var(--shadow-card)]
                  p-[var(--space-lg)]
                ">
                  {pastTours.length > 0 ? (
                    <div>
                      {pastTours.map((tour) => (
                        <PastTourItem
                          key={tour.id}
                          id={tour.id}
                          title={tour.title}
                          date={tour.date_start ? new Date(tour.date_start).toLocaleDateString('en-AU', { year: 'numeric', month: 'long' }) : ''}
                          outcome={tour.status === 'cancelled' ? 'cancelled' : 'completed'}
                          participantCount={tour.current_participant_count ?? undefined}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-[var(--color-ink-muted)]">
                      No past tours to display.
                    </p>
                  )}
                </div>
              )}
            </section>
          )}
        </div>

        </div>{/* end cards container */}
      </div>
    </main>
    </ErrorBoundary>
  );
}
