import type { Metadata } from 'next';
import Link from 'next/link';
import { speciesData, conservationStatusColors } from '@/data/species';

export const metadata: Metadata = {
  title: 'Australian Birding Species Guide — Target Birds for Birders',
  description:
    'Discover Australia\'s most sought-after bird species — from the critically endangered Orange-bellied Parrot to the iconic Superb Lyrebird. Expert guides to finding each bird, best locations, and the birding tours that get you there.',
  keywords: [
    'Australian bird species',
    'birding species guide Australia',
    'rare birds Australia',
    'bird watching species list',
    'Australian endemic birds',
    'threatened birds Australia',
    'birding targets Australia',
  ],
  openGraph: {
    title: 'Australian Birding Species Guide | Quorum Tours',
    description:
      'Expert guides to finding Australia\'s most sought-after birds — locations, seasons, difficulty ratings, and conservation status.',
  },
};

const difficultyColors: Record<string, { bg: string; text: string }> = {
  Easy: { bg: '#d6ebe3', text: '#1b3d2f' },
  Moderate: { bg: '#d6ebe3', text: '#2a6048' },
  Hard: { bg: '#f5e8d6', text: '#7a4f1a' },
  Expert: { bg: '#fdf0ee', text: '#922b21' },
};

export default function SpeciesIndexPage() {
  const sortedSpecies = [...speciesData].sort((a, b) => {
    const order = { CR: 0, EN: 1, VU: 2, NT: 3, LC: 4 };
    return order[a.conservationStatusCode] - order[b.conservationStatusCode];
  });

  return (
    <main>
      {/* Hero */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: 'linear-gradient(135deg, #1B3D2F 0%, #2a5a42 60%, #1B3D2F 100%)' }}
      >
        <div className="absolute inset-0 opacity-10" aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, #D4915D 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4A7C89 0%, transparent 50%)',
          }}
        />
        <div className="relative w-full max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#D4915D] text-sm font-medium tracking-widest uppercase mb-4">
            Species Guides
          </p>
          <h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6"
            style={{ lineHeight: 1.1 }}
          >
            Australia's Most Sought-After Birds
          </h1>
          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Detailed guides to finding Australia's rarest, most elusive, and most spectacular birds — with expert advice on locations, seasons, and the tours that will get you there.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Critically Endangered', 'Endangered', 'Vulnerable', 'Least Concern'].map((status) => (
              <span
                key={status}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: status === 'Critically Endangered' ? '#fdf0ee'
                    : status === 'Endangered' ? '#fdf0ee'
                    : status === 'Vulnerable' ? '#f5e8d6'
                    : '#d6ebe3',
                  color: status === 'Critically Endangered' ? '#7d1a13'
                    : status === 'Endangered' ? '#922b21'
                    : status === 'Vulnerable' ? '#7a4f1a'
                    : '#1b3d2f',
                }}
              >
                {status}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Species Grid */}
      <section className="py-16 md:py-20" style={{ background: 'var(--color-surface)' }}>
        <div className="w-full max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedSpecies.map((species) => {
              const statusColor = conservationStatusColors[species.conservationStatusCode];
              const diffColor = difficultyColors[species.difficulty];

              return (
                <Link
                  key={species.slug}
                  href={`/species/${species.slug}`}
                  className="group block rounded-[var(--radius-lg)] overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  {/* Card colour bar by conservation status */}
                  <div
                    className="h-1.5 w-full"
                    style={{ background: statusColor.text }}
                    aria-hidden="true"
                  />

                  <div className="p-6">
                    {/* Status badges */}
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ background: statusColor.bg, color: statusColor.text }}
                      >
                        {species.conservationStatusCode} · {species.conservationStatus}
                      </span>
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ background: diffColor.bg, color: diffColor.text }}
                      >
                        {species.difficulty}
                      </span>
                    </div>

                    {/* Name */}
                    <h2
                      className="font-display text-2xl font-semibold mb-1 group-hover:text-[var(--color-accent)] transition-colors"
                      style={{ color: 'var(--color-ink)' }}
                    >
                      {species.commonName}
                    </h2>
                    <p className="text-sm italic mb-3" style={{ color: 'var(--color-ink-subtle)' }}>
                      {species.scientificName}
                    </p>

                    {/* Tagline */}
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-ink-muted)' }}>
                      {species.tagline}
                    </p>

                    {/* Habitat tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {species.habitatTypes.slice(0, 2).map((h) => (
                        <span
                          key={h}
                          className="px-2 py-0.5 rounded text-xs"
                          style={{ background: 'var(--color-surface-sunken)', color: 'var(--color-ink-subtle)' }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Read more */}
                    <div
                      className="flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      View species guide
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA: Find tours */}
      <section className="py-16" style={{ background: 'var(--color-surface-raised)' }}>
        <div className="w-full max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4" style={{ color: 'var(--color-ink)' }}>
            Ready to tick your targets?
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: 'var(--color-ink-muted)' }}>
            Browse expert-led birding tours focused on Australia's most sought-after species. Tours run when enough birders commit — no cancellations.
          </p>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-[var(--radius-organic)] text-base font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{ background: 'var(--color-primary)' }}
          >
            Browse birding tours
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
