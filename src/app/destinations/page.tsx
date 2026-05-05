import type { Metadata } from 'next';
import Link from 'next/link';
import { destinationsData } from '@/data/destinations';

export const metadata: Metadata = {
  title: 'Australian Birding Destinations — Region Guides for Birders',
  description:
    'Expert region guides for Australia\'s best birding destinations — from East Gippsland and Mallacoota to the Kimberley. Best birds, best seasons, and guided tour options.',
  keywords: [
    'Australian birding destinations',
    'bird watching destinations Australia',
    'birding region guides',
    'best birding spots Australia',
    'wildlife tour destinations',
    'Gippsland birding',
    'Mallacoota wildlife',
  ],
  openGraph: {
    title: 'Australian Birding Destinations | Quorum Tours',
    description:
      'Expert region guides for Australia\'s best birding destinations — birds, seasons, and the guided tours that take you there.',
  },
};

export default function DestinationsIndexPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: 'linear-gradient(135deg, #2a3d4a 0%, #1B3D2F 60%, #2a3d4a 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 60%, #4A7C89 0%, transparent 50%), radial-gradient(circle at 80% 20%, #D4915D 0%, transparent 40%)',
          }}
        />
        <div className="relative w-full max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#D4915D] text-sm font-medium tracking-widest uppercase mb-4">
            Destination Guides
          </p>
          <h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6"
            style={{ lineHeight: 1.1 }}
          >
            Australia's Best Birding Regions
          </h1>
          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            In-depth guides to the regions, habitats, and access points that give Australian birding its extraordinary character. From remote wilderness to accessible day trips.
          </p>
        </div>
      </section>

      {/* Destination cards */}
      <section className="py-16 md:py-20" style={{ background: 'var(--color-surface)' }}>
        <div className="w-full max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {destinationsData.map((dest) => (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                className="group block rounded-[var(--radius-lg)] overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                {/* Top strip */}
                <div
                  className="h-2 w-full"
                  style={{ background: 'linear-gradient(90deg, #1B3D2F, #4A7C89)' }}
                  aria-hidden="true"
                />

                <div className="p-7">
                  {/* Region label */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ background: 'var(--color-secondary-subtle)', color: 'var(--color-secondary)' }}
                    >
                      {dest.region}
                    </span>
                    {dest.relatedOperators.length > 0 && (
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ background: '#d6ebe3', color: '#1b3d2f' }}
                      >
                        Guided tours available
                      </span>
                    )}
                  </div>

                  <h2
                    className="font-display text-2xl sm:text-3xl font-semibold mb-2 group-hover:text-[var(--color-accent)] transition-colors"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {dest.name}
                  </h2>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
                    {dest.tagline}
                  </p>

                  {/* Key birds */}
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-ink-subtle)' }}>
                      Key birds
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {dest.keyBirds.slice(0, 6).map((bird) => (
                        <span
                          key={bird}
                          className="px-2 py-0.5 rounded text-xs"
                          style={{ background: 'var(--color-surface-sunken)', color: 'var(--color-ink-subtle)' }}
                        >
                          {bird}
                        </span>
                      ))}
                      {dest.keyBirds.length > 6 && (
                        <span
                          className="px-2 py-0.5 rounded text-xs"
                          style={{ background: 'var(--color-surface-sunken)', color: 'var(--color-ink-subtle)' }}
                        >
                          +{dest.keyBirds.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    Read region guide
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: 'var(--color-surface-raised)' }}>
        <div className="w-full max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold mb-4"
            style={{ color: 'var(--color-ink)' }}
          >
            Ready to explore?
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: 'var(--color-ink-muted)' }}>
            Browse tours across all of Australia's great birding regions. Commit when you find one you love — no upfront risk.
          </p>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-[var(--radius-organic)] text-base font-semibold text-white transition-all duration-200 hover:opacity-90"
            style={{ background: 'var(--color-primary)' }}
          >
            Browse birding tours
          </Link>
        </div>
      </section>
    </main>
  );
}
