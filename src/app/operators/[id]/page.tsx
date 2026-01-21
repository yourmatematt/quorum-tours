'use client';

import { useState, useMemo } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { OperatorHero } from '@/components/ui/OperatorHero';
import { AuthoritySection } from '@/components/ui/AuthoritySection';
import { RatingDistribution } from '@/components/ui/RatingDistribution';
import { ReviewCard } from '@/components/ui/ReviewCard';
import { CapabilitiesSection } from '@/components/ui/CapabilitiesSection';
import { PastTourItem } from '@/components/ui/PastTourItem';
import { TrackRecordSummary } from '@/components/ui/TrackRecordSummary';
import { TourCard } from '@/components/TourCard';

// TypeScript interfaces per IA specification
interface Credential {
  title: string;
  issuer: string;
  year?: number;
}

interface Review {
  id: string;
  reviewerName: string;
  tourId: string;
  tourTitle: string;
  tourDate: string;
  reviewDate: string;
  rating: number;
  text: string;
  operatorResponse?: string;
}

interface EquipmentItem {
  name: string;
  description?: string;
}

interface CapacityInfo {
  typical: string;
  maximum: number;
  privateAvailable: boolean;
}

interface TourPreview {
  id: string;
  title: string;
  status: 'confirmed' | 'forming' | 'not-running';
  currentParticipants: number;
  threshold: number;
  date: string;
  location: string;
  speciesHighlight?: string;
}

interface PastTour {
  id: string;
  title: string;
  date: string;
  outcome: 'completed' | 'cancelled';
  participantCount?: number;
}

interface OperatorProfile {
  id: string;
  slug: string;
  name: string;
  photo?: string;
  verified: boolean;
  expertise: string;
  location: string;
  yearsExperience: number;
  specializations: string[];
  credentials: Credential[];
  affiliations: string[];
  bio: string;
  philosophy?: string;
  reviews: Review[];
  ratingDistribution: number[];
  averageRating: number;
  totalReviews: number;
  equipment: EquipmentItem[];
  capacity: CapacityInfo;
  accessibility: string[];
  languages: string[];
  activeTours: TourPreview[];
  pastTours: PastTour[];
  trackRecord: {
    toursCompleted: number;
    confirmationRate: number;
    totalParticipants: number;
  };
}

// Example operator data
const exampleOperators: Record<string, OperatorProfile> = {
  'sarah-mitchell': {
    id: 'sarah-mitchell',
    slug: 'sarah-mitchell',
    name: 'Sarah Mitchell',
    photo: undefined,
    verified: true,
    expertise: 'Wetland and waterbird specialist',
    location: 'Melbourne, Victoria',
    yearsExperience: 12,
    specializations: [
      'Wetland habitats',
      'Waterbird identification',
      'Shorebird migration',
      'Victorian grasslands',
    ],
    credentials: [
      {
        title: 'BirdLife Australia Guide Certification',
        issuer: 'BirdLife Australia',
        year: 2014,
      },
      {
        title: 'Wildlife Tourism Operator License',
        issuer: 'Parks Victoria',
        year: 2012,
      },
    ],
    affiliations: [
      'BirdLife Australia',
      'Victorian Ornithological Research Group',
      'Australasian Wader Studies Group',
    ],
    bio: `I've been guiding birding tours across Victoria since 2012, with a particular focus on the internationally significant wetlands at Werribee and the Western Treatment Plant. My background in environmental science informs my approach to bird identification and habitat understanding.

I believe the best birding experiences come from patience and attention to habitat. Rather than rushing between sites, I prefer to spend time in productive areas, allowing the birds to reveal themselves naturally.`,
    philosophy: 'Small groups, expert guidance, and respect for wildlife. Every tour is an opportunity to deepen your connection with the natural world.',
    reviews: [
      {
        id: 'r1',
        reviewerName: 'Michael Thompson',
        tourId: '1',
        tourTitle: 'Dawn Chorus at Werribee',
        tourDate: 'February 2026',
        reviewDate: 'March 2, 2026',
        rating: 5,
        text: 'Sarah\'s knowledge of the wetlands is exceptional. She helped us identify several tricky shorebirds and knew exactly where to find the Brolgas. The early start was worth it for the dawn chorus.',
        operatorResponse: 'Thanks Michael! Those Brolgas were particularly cooperative that morning. Hope to see you on a future tour.',
      },
      {
        id: 'r2',
        reviewerName: 'Jennifer Liu',
        tourId: '1',
        tourTitle: 'Dawn Chorus at Werribee',
        tourDate: 'January 2026',
        reviewDate: 'January 28, 2026',
        rating: 5,
        text: 'Fantastic experience. Sarah was patient with beginners and helped me improve my identification skills. We saw over 60 species including a Freckled Duck, which was a lifer for me.',
      },
      {
        id: 'r3',
        reviewerName: 'Robert Chen',
        tourId: 'past-1',
        tourTitle: 'Winter Waterbirds at Western Port',
        tourDate: 'July 2025',
        reviewDate: 'August 5, 2025',
        rating: 4,
        text: 'Good tour overall. Weather wasn\'t ideal but Sarah made the best of it. Saw some great species including a Hooded Plover.',
      },
      {
        id: 'r4',
        reviewerName: 'Amanda Foster',
        tourId: 'past-2',
        tourTitle: 'Grassland Specialists Tour',
        tourDate: 'October 2025',
        reviewDate: 'October 22, 2025',
        rating: 5,
        text: 'The grassland tour exceeded expectations. Sarah\'s ability to locate Plains-wanderers is remarkable. Professional, knowledgeable, and genuinely passionate about conservation.',
      },
    ],
    ratingDistribution: [0, 0, 0, 1, 3],
    averageRating: 4.8,
    totalReviews: 4,
    equipment: [
      { name: 'Swarovski telescope', description: 'Available for group use' },
      { name: 'Spare binoculars', description: '8x42 for those without their own' },
      { name: 'Field guides', description: 'Regional guides provided' },
    ],
    capacity: {
      typical: '6-8 participants',
      maximum: 12,
      privateAvailable: true,
    },
    accessibility: [
      'Tours on flat terrain available',
      'Vehicle-based viewing options for mobility limitations',
      'Dietary requirements accommodated',
    ],
    languages: ['English'],
    activeTours: [
      {
        id: '1',
        title: 'Dawn Chorus at Werribee',
        status: 'confirmed',
        currentParticipants: 8,
        threshold: 6,
        date: 'Saturday, March 15, 2026',
        location: 'Werribee, VIC',
        speciesHighlight: 'Brolga, Latham\'s Snipe',
      },
    ],
    pastTours: [
      {
        id: 'past-1',
        title: 'Winter Waterbirds at Western Port',
        date: 'July 2025',
        outcome: 'completed',
        participantCount: 8,
      },
      {
        id: 'past-2',
        title: 'Grassland Specialists Tour',
        date: 'October 2025',
        outcome: 'completed',
        participantCount: 6,
      },
      {
        id: 'past-3',
        title: 'You Yangs Woodland Walk',
        date: 'September 2025',
        outcome: 'cancelled',
      },
      {
        id: 'past-4',
        title: 'Werribee Dawn Chorus',
        date: 'August 2025',
        outcome: 'completed',
        participantCount: 10,
      },
    ],
    trackRecord: {
      toursCompleted: 47,
      confirmationRate: 89,
      totalParticipants: 342,
    },
  },
  'david-chen': {
    id: 'david-chen',
    slug: 'david-chen',
    name: 'David Chen',
    photo: undefined,
    verified: true,
    expertise: 'Shorebird identification specialist',
    location: 'Cairns, Queensland',
    yearsExperience: 8,
    specializations: [
      'Migratory shorebirds',
      'Tropical wetlands',
      'Far North Queensland endemics',
      'Pelagic birding',
    ],
    credentials: [
      {
        title: 'Shorebird Identification Certification',
        issuer: 'Australasian Wader Studies Group',
        year: 2018,
      },
    ],
    affiliations: [
      'Birds Queensland',
      'Australasian Wader Studies Group',
    ],
    bio: `Based in Cairns since 2016, I specialise in the migratory shorebirds that pass through Queensland's coastline. My background in marine biology gives me insight into the tidal patterns and feeding behaviors that make shorebird watching so rewarding.

I've documented over 380 species in the Cairns region and maintain detailed records of migration timing and shorebird counts for citizen science projects.`,
    reviews: [
      {
        id: 'r1',
        reviewerName: 'Patricia Wong',
        tourId: '2',
        tourTitle: 'Shorebird Migration Watch',
        tourDate: 'March 2025',
        reviewDate: 'April 2, 2025',
        rating: 5,
        text: 'David\'s shorebird identification skills are incredible. He spotted a Nordmann\'s Greenshank that I would have completely missed. Patient teacher who explains the key field marks clearly.',
      },
      {
        id: 'r2',
        reviewerName: 'James Murray',
        tourId: 'past-1',
        tourTitle: 'Cairns Esplanade at High Tide',
        tourDate: 'February 2025',
        reviewDate: 'February 20, 2025',
        rating: 4,
        text: 'Good introduction to shorebirding. The timing with tides was perfect. David knows his stuff.',
      },
    ],
    ratingDistribution: [0, 0, 0, 1, 1],
    averageRating: 4.5,
    totalReviews: 2,
    equipment: [
      { name: 'Spotting scope', description: 'Essential for shorebird ID' },
      { name: 'Tide charts', description: 'Planning around optimal viewing' },
    ],
    capacity: {
      typical: '4-6 participants',
      maximum: 10,
      privateAvailable: true,
    },
    accessibility: [
      'Flat terrain suitable for all abilities',
      'Beach wheelchair available on request',
    ],
    languages: ['English', 'Mandarin'],
    activeTours: [
      {
        id: '2',
        title: 'Shorebird Migration Watch',
        status: 'forming',
        currentParticipants: 5,
        threshold: 8,
        date: 'Thursday, April 2, 2026',
        location: 'Cairns, QLD',
        speciesHighlight: 'Eastern Curlew, Bar-tailed Godwit',
      },
    ],
    pastTours: [
      {
        id: 'past-1',
        title: 'Cairns Esplanade at High Tide',
        date: 'February 2025',
        outcome: 'completed',
        participantCount: 6,
      },
      {
        id: 'past-2',
        title: 'Atherton Tablelands Endemics',
        date: 'January 2025',
        outcome: 'completed',
        participantCount: 4,
      },
    ],
    trackRecord: {
      toursCompleted: 23,
      confirmationRate: 82,
      totalParticipants: 124,
    },
  },
};

function getOperatorById(id: string): OperatorProfile {
  return exampleOperators[id] || exampleOperators['sarah-mitchell'];
}

interface PageProps {
  params: { id: string };
}

export default function OperatorProfilePage({ params }: PageProps) {
  const operator = useMemo(() => getOperatorById(params.id), [params.id]);
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-[var(--color-surface)]">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-[var(--space-lg)]
        py-[var(--space-2xl)]
      ">
        {/* Breadcrumb */}
        <nav className="mb-[var(--space-xl)] text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center gap-[var(--space-sm)]">
            <li>
              <a href="/" className="text-[var(--color-ink-muted)] hover:text-[var(--color-accent)]">
                Home
              </a>
            </li>
            <li className="text-[var(--color-ink-subtle)]" aria-hidden="true">/</li>
            <li>
              <a href="/operators" className="text-[var(--color-ink-muted)] hover:text-[var(--color-accent)]">
                Operators
              </a>
            </li>
            <li className="text-[var(--color-ink-subtle)]" aria-hidden="true">/</li>
            <li className="text-[var(--color-ink)]" aria-current="page">
              {operator.name}
            </li>
          </ol>
        </nav>

        {/* Section 1: Identity & Legitimacy */}
        <OperatorHero
          name={operator.name}
          photo={operator.photo}
          verified={operator.verified}
          expertise={operator.expertise}
          location={operator.location}
          yearsExperience={operator.yearsExperience}
        />

        {/* Section 2: Authority Signals */}
        <AuthoritySection
          specializations={operator.specializations}
          credentials={operator.credentials}
          affiliations={operator.affiliations}
        />

        {/* Section 3: Narrative */}
        {operator.bio && (
          <section className="mb-[var(--space-3xl)]">
            <h2 className="font-display text-lg text-[var(--color-ink)] mb-[var(--space-lg)]">
              About
            </h2>
            <div className="
              text-[var(--color-ink-muted)]
              leading-relaxed
              space-y-[var(--space-md)]
            ">
              {operator.bio.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            {operator.philosophy && (
              <p className="
                mt-[var(--space-lg)]
                text-[var(--color-ink)]
                italic
                border-l-2 border-[var(--color-accent)]
                pl-[var(--space-md)]
              ">
                {operator.philosophy}
              </p>
            )}
          </section>
        )}

        {/* Section 4: Reviews & Feedback */}
        {operator.reviews.length > 0 && (
          <section className="mb-[var(--space-3xl)]">
            <h2 className="font-display text-lg text-[var(--color-ink)] mb-[var(--space-lg)]">
              Reviews
            </h2>

            {/* Rating Distribution */}
            <div className="mb-[var(--space-xl)]">
              <RatingDistribution
                distribution={operator.ratingDistribution}
                averageRating={operator.averageRating}
                totalReviews={operator.totalReviews}
              />
            </div>

            {/* Individual Reviews */}
            <div className="space-y-[var(--space-lg)]">
              {operator.reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  reviewerName={review.reviewerName}
                  tourId={review.tourId}
                  tourTitle={review.tourTitle}
                  tourDate={review.tourDate}
                  reviewDate={review.reviewDate}
                  rating={review.rating}
                  text={review.text}
                  operatorResponse={review.operatorResponse}
                />
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Assets & Capabilities */}
        <CapabilitiesSection
          equipment={operator.equipment}
          capacity={operator.capacity}
          accessibility={operator.accessibility}
          languages={operator.languages}
        />

        {/* Section 6: Active & Past Tours */}
        <section className="mb-[var(--space-3xl)]">
          <h2 className="font-display text-lg text-[var(--color-ink)] mb-[var(--space-lg)]">
            Tours
          </h2>

          {/* Track Record Summary */}
          <div className="mb-[var(--space-xl)]">
            <TrackRecordSummary
              toursCompleted={operator.trackRecord.toursCompleted}
              confirmationRate={operator.trackRecord.confirmationRate}
              totalParticipants={operator.trackRecord.totalParticipants}
            />
          </div>

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
                  ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
                  : 'border-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
                }
              `}
            >
              Active Tours ({operator.activeTours.length})
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
                  ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
                  : 'border-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
                }
              `}
            >
              Past Tours ({operator.pastTours.length})
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'active' && (
            <div>
              {operator.activeTours.length > 0 ? (
                <div className="grid gap-[var(--space-lg)] sm:grid-cols-2 lg:grid-cols-3">
                  {operator.activeTours.map((tour) => (
                    <TourCard
                      key={tour.id}
                      title={tour.title}
                      operatorName={operator.name}
                      status={tour.status}
                      currentParticipants={tour.currentParticipants}
                      threshold={tour.threshold}
                      date={tour.date}
                      location={tour.location}
                      href={`/tours/${tour.id}`}
                      speciesHighlight={tour.speciesHighlight}
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
              border border-[var(--color-border)]
              rounded-[var(--radius-lg)]
              p-[var(--space-lg)]
            ">
              {operator.pastTours.length > 0 ? (
                <div>
                  {operator.pastTours.map((tour) => (
                    <PastTourItem
                      key={tour.id}
                      id={tour.id}
                      title={tour.title}
                      date={tour.date}
                      outcome={tour.outcome}
                      participantCount={tour.participantCount}
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
      </div>
    </main>
    </ErrorBoundary>
  );
}
