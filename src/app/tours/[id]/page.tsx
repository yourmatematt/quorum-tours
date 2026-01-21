'use client';

import { useMemo } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ConfirmationBanner } from '@/components/ui/ConfirmationBanner';
import { SpeciesSection } from '@/components/ui/SpeciesSection';
import { LogisticsSection } from '@/components/ui/LogisticsSection';
import { CommitmentCard } from '@/components/ui/CommitmentCard';
import { FAQAccordion } from '@/components/ui/FAQAccordion';

type ConfirmationStatus = 'confirmed' | 'forming' | 'not-running';

// Example tour data - in production this would come from an API/database
const exampleTours: Record<string, {
  id: string;
  title: string;
  operatorName: string;
  operatorId: string;
  operatorExpertise: string;
  operatorYears: number;
  status: ConfirmationStatus;
  currentParticipants: number;
  threshold: number;
  date: string;
  duration: string;
  location: string;
  region: string;
  description: string;
  price: number;
  priceNote: string;
  species: { level: 'primary' | 'secondary' | 'opportunistic'; species: { name: string; scientificName?: string }[] }[];
  logistics: { icon: 'group' | 'fitness' | 'included' | 'policy' | 'time' | 'location'; label: string; value: string; details?: string[] }[];
  faqs: { question: string; answer: string }[];
}> = {
  '1': {
    id: '1',
    title: 'Dawn Chorus at Werribee',
    operatorName: 'Sarah Mitchell',
    operatorId: 'sarah-mitchell',
    operatorExpertise: 'Wetland specialists',
    operatorYears: 12,
    status: 'confirmed',
    currentParticipants: 8,
    threshold: 6,
    date: 'Saturday, March 15, 2026',
    duration: '6 hours',
    location: 'Werribee Treatment Plant, Victoria',
    region: 'VIC',
    description: `This tour focuses on the internationally significant wetlands at Werribee, home to thousands of migratory shorebirds during the Australian summer. We'll explore the treatment ponds, grasslands, and coastal habitats in search of both resident and migratory species.

The morning start allows us to experience the dawn chorus and observe birds during their most active feeding period. Expect to see a variety of waterfowl, waders, and grassland specialists.`,
    price: 180,
    priceNote: 'Includes transport from Melbourne CBD',
    species: [
      {
        level: 'primary',
        species: [
          { name: 'Brolga', scientificName: 'Antigone rubicunda' },
          { name: "Latham's Snipe", scientificName: 'Gallinago hardwickii' },
        ],
      },
      {
        level: 'secondary',
        species: [
          { name: 'Orange-bellied Parrot', scientificName: 'Neophema chrysogaster' },
          { name: 'Blue-billed Duck', scientificName: 'Oxyura australis' },
          { name: 'Freckled Duck', scientificName: 'Stictonetta naevosa' },
        ],
      },
      {
        level: 'opportunistic',
        species: [
          { name: 'Black Falcon', scientificName: 'Falco subniger' },
          { name: 'Plains-wanderer', scientificName: 'Pedionomus torquatus' },
          { name: 'Brown Songlark', scientificName: 'Cincloramphus cruralis' },
          { name: 'Golden-headed Cisticola', scientificName: 'Cisticola exilis' },
        ],
      },
    ],
    logistics: [
      {
        icon: 'group',
        label: 'Group size',
        value: 'Maximum 12 participants',
        details: ['Small group ensures quality viewing', 'Currently 8 confirmed'],
      },
      {
        icon: 'fitness',
        label: 'Physical requirements',
        value: 'Easy to moderate',
        details: ['Flat terrain, well-maintained paths', 'Walking distance: 4-6km', 'Standing for extended periods'],
      },
      {
        icon: 'time',
        label: 'Schedule',
        value: '5:30 AM - 11:30 AM',
        details: ['Meet at Melbourne CBD pickup point', 'Early start for best birding conditions'],
      },
      {
        icon: 'included',
        label: 'Included',
        value: 'Transport, guide, snacks',
        details: ['Return transport from Melbourne', 'Expert guide with optics for sharing', 'Morning tea and snacks'],
      },
      {
        icon: 'policy',
        label: 'Cancellation policy',
        value: 'Full refund if tour doesn\'t run',
        details: ['Cancel up to 7 days before for full refund', 'Weather cancellations fully refunded'],
      },
    ],
    faqs: [
      {
        question: 'What if I need to cancel after the tour confirms?',
        answer: 'You can cancel up to 7 days before the tour date for a full refund. Cancellations within 7 days may receive a partial refund or credit for a future tour, depending on circumstances.',
      },
      {
        question: 'What equipment should I bring?',
        answer: 'Bring your own binoculars if you have them (the guide has spares). Wear comfortable walking shoes, weather-appropriate layers, and bring sun protection. A notebook and camera are optional.',
      },
      {
        question: 'What happens if weather forces a reschedule?',
        answer: 'If conditions are unsafe or would significantly impact the experience, we\'ll offer a full refund or reschedule to an alternative date at no extra cost.',
      },
    ],
  },
  '2': {
    id: '2',
    title: 'Shorebird Migration Watch',
    operatorName: 'David Chen',
    operatorId: 'david-chen',
    operatorExpertise: 'Shorebird identification',
    operatorYears: 8,
    status: 'forming',
    currentParticipants: 5,
    threshold: 8,
    date: 'Thursday, April 2, 2026',
    duration: '8 hours',
    location: 'Cairns Esplanade and surrounds, Queensland',
    region: 'QLD',
    description: `Experience the spectacular shorebird migration at one of Australia's premier sites. The Cairns region hosts thousands of migratory waders during the northward migration, offering excellent opportunities to observe and photograph these long-distance travelers.

We'll visit multiple sites including the Esplanade mudflats, nearby wetlands, and coastal habitats to maximize species diversity.`,
    price: 220,
    priceNote: 'Transport within Cairns included',
    species: [
      {
        level: 'primary',
        species: [
          { name: 'Eastern Curlew', scientificName: 'Numenius madagascariensis' },
          { name: 'Bar-tailed Godwit', scientificName: 'Limosa lapponica' },
          { name: 'Great Knot', scientificName: 'Calidris tenuirostris' },
        ],
      },
      {
        level: 'secondary',
        species: [
          { name: 'Lesser Sand Plover', scientificName: 'Charadrius mongolus' },
          { name: 'Terek Sandpiper', scientificName: 'Xenus cinereus' },
          { name: 'Asian Dowitcher', scientificName: 'Limnodromus semipalmatus' },
        ],
      },
      {
        level: 'opportunistic',
        species: [
          { name: 'Nordmann\'s Greenshank', scientificName: 'Tringa guttifer' },
          { name: 'Spoon-billed Sandpiper', scientificName: 'Calidris pygmaea' },
        ],
      },
    ],
    logistics: [
      {
        icon: 'group',
        label: 'Group size',
        value: 'Maximum 10 participants',
        details: ['Currently 5 committed', '3 more needed to confirm'],
      },
      {
        icon: 'fitness',
        label: 'Physical requirements',
        value: 'Easy',
        details: ['Mostly flat walking on paths and beaches', 'Some standing for extended periods'],
      },
      {
        icon: 'time',
        label: 'Schedule',
        value: '6:00 AM - 2:00 PM',
        details: ['Tides determine exact timing', 'Hotel pickup available'],
      },
      {
        icon: 'included',
        label: 'Included',
        value: 'Guide, transport, lunch',
        details: ['Experienced shorebird guide', 'Telescope provided for group'],
      },
      {
        icon: 'policy',
        label: 'What if tour doesn\'t confirm?',
        value: 'Full refund if threshold not met',
        details: ['No payment until tour confirms', 'Notification 14 days before'],
      },
    ],
    faqs: [
      {
        question: 'How do tides affect the tour?',
        answer: 'Shorebird viewing is tide-dependent. We schedule tours around optimal tides and may adjust start times accordingly. You\'ll be notified of any timing changes.',
      },
      {
        question: 'Is this tour suitable for beginners?',
        answer: 'Yes, though shorebird identification can be challenging. The guide will help with identification and explain key features to look for.',
      },
    ],
  },
};

// Get tour by ID with fallback
function getTourById(id: string) {
  return exampleTours[id] || exampleTours['1'];
}

interface PageProps {
  params: { id: string };
}

export default function TourDetailPage({ params }: PageProps) {
  const tour = useMemo(() => getTourById(params.id), [params.id]);

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-[var(--color-surface)]">
      {/* Section 1: Confirmation Status Banner */}
      <div className="
        w-full
        bg-[var(--color-surface-raised)]
        border-b border-[var(--color-border)]
        py-[var(--space-lg)]
      ">
        <div className="
          w-full max-w-[var(--container-max)]
          mx-auto px-[var(--space-lg)]
        ">
          <ConfirmationBanner
            status={tour.status}
            currentParticipants={tour.currentParticipants}
            threshold={tour.threshold}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-[var(--space-lg)]
        py-[var(--space-2xl)]
      ">
        {/* Breadcrumb */}
        <nav className="mb-[var(--space-lg)] text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center gap-[var(--space-sm)]">
            <li>
              <a href="/" className="text-[var(--color-ink-muted)] hover:text-[var(--color-accent)]">
                Home
              </a>
            </li>
            <li className="text-[var(--color-ink-subtle)]" aria-hidden="true">/</li>
            <li>
              <a href="/tours" className="text-[var(--color-ink-muted)] hover:text-[var(--color-accent)]">
                Tours
              </a>
            </li>
            <li className="text-[var(--color-ink-subtle)]" aria-hidden="true">/</li>
            <li className="text-[var(--color-ink)]" aria-current="page">
              {tour.title}
            </li>
          </ol>
        </nav>

        {/* Two-column layout on desktop */}
        <div className="
          flex flex-col lg:flex-row
          gap-[var(--space-2xl)]
        ">
          {/* Left column: Main content */}
          <div className="flex-1 min-w-0">
            {/* Section 2: Core Tour Overview */}
            <section className="mb-[var(--space-3xl)]">
              <h1 className="
                font-display
                text-[var(--text-2xl)]
                text-[var(--color-ink)]
                mb-[var(--space-sm)]
              ">
                {tour.title}
              </h1>

              {/* Operator Attribution */}
              <p className="text-[var(--color-ink-muted)] mb-[var(--space-lg)]">
                with{' '}
                <a
                  href={`/operators/${tour.operatorId}`}
                  className="text-[var(--color-accent)] hover:underline"
                >
                  {tour.operatorName}
                </a>
              </p>

              {/* Tour Meta */}
              <div className="
                flex flex-wrap gap-[var(--space-lg)]
                mb-[var(--space-xl)]
                text-sm
              ">
                <div className="flex items-center gap-[var(--space-xs)]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <rect x="2" y="3" width="12" height="11" rx="1" />
                    <path d="M2 6h12M5 1v4M11 1v4" />
                  </svg>
                  <span className="text-[var(--color-ink)]">{tour.date}</span>
                </div>
                <div className="flex items-center gap-[var(--space-xs)]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <circle cx="8" cy="8" r="6" />
                    <path d="M8 4v4l3 2" />
                  </svg>
                  <span className="text-[var(--color-ink)]">{tour.duration}</span>
                </div>
                <div className="flex items-center gap-[var(--space-xs)]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M8 14s-5-3.5-5-7a5 5 0 1110 0c0 3.5-5 7-5 7z" />
                    <circle cx="8" cy="7" r="1.5" />
                  </svg>
                  <span className="text-[var(--color-ink)]">{tour.location}</span>
                </div>
              </div>

              {/* Description */}
              <div className="
                text-[var(--color-ink-muted)]
                leading-relaxed
                space-y-[var(--space-md)]
              ">
                {tour.description.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Expectations Disclaimer */}
              <p className="
                mt-[var(--space-lg)]
                text-sm text-[var(--color-ink-subtle)]
                italic
              ">
                Sightings depend on conditions and cannot be guaranteed. This tour focuses on creating optimal viewing opportunities.
              </p>
            </section>

            {/* Section 3: Species Focus */}
            <div className="mb-[var(--space-3xl)]">
              <SpeciesSection groups={tour.species} />
            </div>

            {/* Section 4: Operator Preview */}
            <section className="mb-[var(--space-3xl)]">
              <h3 className="
                font-display text-lg text-[var(--color-ink)]
                mb-[var(--space-md)]
              ">
                Your Guide
              </h3>

              <div className="
                bg-[var(--color-surface-raised)]
                border border-[var(--color-border)]
                rounded-[var(--radius-lg)]
                p-[var(--space-lg)]
              ">
                <div className="flex items-start gap-[var(--space-lg)]">
                  {/* Placeholder for operator photo */}
                  <div className="
                    flex-shrink-0
                    w-16 h-16
                    bg-[var(--color-surface-sunken)]
                    rounded-full
                    flex items-center justify-center
                    text-[var(--color-ink-subtle)]
                  ">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[var(--color-ink)]">
                      {tour.operatorName}
                    </h4>
                    <p className="text-sm text-[var(--color-ink-muted)] mt-0.5">
                      {tour.operatorExpertise} · {tour.operatorYears} years experience
                    </p>
                    <a
                      href={`/operators/${tour.operatorId}`}
                      className="
                        inline-flex items-center gap-[var(--space-xs)]
                        mt-[var(--space-sm)]
                        text-sm text-[var(--color-accent)]
                        hover:underline
                      "
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

            {/* Section 5: Logistics */}
            <div className="mb-[var(--space-3xl)]">
              <LogisticsSection items={tour.logistics} />
            </div>

            {/* Section 7: FAQs */}
            {tour.faqs.length > 0 && (
              <div className="mb-[var(--space-3xl)]">
                <FAQAccordion items={tour.faqs} />
              </div>
            )}
          </div>

          {/* Right column: Commitment Card (sticky on desktop) */}
          <div className="lg:w-[320px] flex-shrink-0">
            <div className="lg:sticky lg:top-[var(--space-lg)]">
              <CommitmentCard
                status={tour.status}
                price={tour.price}
                priceNote={tour.priceNote}
                currentParticipants={tour.currentParticipants}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
    </ErrorBoundary>
  );
}
