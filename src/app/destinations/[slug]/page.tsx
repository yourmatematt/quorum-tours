import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getDestinationBySlug,
  getRelatedDestinations,
  destinationsData,
} from '@/data/destinations';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return destinationsData.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) return { title: 'Destination Not Found' };

  return {
    title: `${dest.name} Birding Guide — ${dest.region}`,
    description: dest.metaDescription,
    keywords: dest.keywords,
    openGraph: {
      title: `${dest.name} Birding Guide | Quorum Tours`,
      description: dest.metaDescription,
    },
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) notFound();

  const relatedDests = getRelatedDestinations(dest.relatedDestinationSlugs);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${dest.name} Birding Guide`,
    description: dest.metaDescription,
    about: {
      '@type': 'Place',
      name: dest.name,
      description: dest.heroDescription,
      address: {
        '@type': 'PostalAddress',
        addressRegion: dest.state,
        addressCountry: 'AU',
      },
    },
    author: { '@type': 'Organization', name: 'Quorum Tours' },
    publisher: {
      '@type': 'Organization',
      name: 'Quorum Tours',
      url: 'https://quorumtours.com',
    },
    url: `https://quorumtours.com/destinations/${dest.slug}`,
    mainEntityOfPage: `https://quorumtours.com/destinations/${dest.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

          <div className="relative w-full max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-white/50">
                <li><Link href="/" className="hover:text-white/80 transition-colors">Home</Link></li>
                <li aria-hidden="true" className="text-white/30">/</li>
                <li><Link href="/destinations" className="hover:text-white/80 transition-colors">Destinations</Link></li>
                <li aria-hidden="true" className="text-white/30">/</li>
                <li className="text-white/80">{dest.name}</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <span
                className="inline-block mb-5 px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: 'rgba(74,124,137,0.3)', color: '#a8d4de' }}
              >
                {dest.region}
              </span>

              <h1
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-4"
                style={{ lineHeight: 1.1 }}
              >
                {dest.name}
              </h1>
              <p className="text-white/85 text-lg sm:text-xl leading-relaxed max-w-2xl">
                {dest.heroDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Highlights bar */}
        <section
          className="py-10 border-b"
          style={{
            background: 'var(--color-surface-raised)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div className="w-full max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dest.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0" aria-hidden="true">{h.icon}</span>
                  <div>
                    <p className="font-semibold text-sm mb-1" style={{ color: 'var(--color-ink)' }}>
                      {h.title}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
                      {h.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="py-16 md:py-20" style={{ background: 'var(--color-surface)' }}>
          <div className="w-full max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Article */}
              <article className="lg:col-span-2">
                <div className="mb-12">
                  {dest.fullDescription.split('\n\n').map((para, i) => {
                    if (para.startsWith('**') && para.endsWith('**')) {
                      return (
                        <h2
                          key={i}
                          className="font-display text-2xl font-semibold mt-8 mb-4"
                          style={{ color: 'var(--color-ink)' }}
                        >
                          {para.replace(/\*\*/g, '')}
                        </h2>
                      );
                    }
                    const rendered = para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                    return (
                      <p
                        key={i}
                        className="mb-4 leading-relaxed"
                        style={{ color: 'var(--color-ink-muted)' }}
                        dangerouslySetInnerHTML={{ __html: rendered }}
                      />
                    );
                  })}
                </div>

                {/* Key birds */}
                <div className="mb-12">
                  <h2
                    className="font-display text-3xl font-semibold mb-6"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    Key birds to look for
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {dest.keyBirds.map((bird) => (
                      <div
                        key={bird}
                        className="flex items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2.5"
                        style={{
                          background: 'var(--color-surface-raised)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        <span
                          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: '#d6ebe3' }}
                          aria-hidden="true"
                        >
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#1b3d2f" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                          {bird}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical info */}
                <div className="mb-12 space-y-6">
                  <h2
                    className="font-display text-3xl font-semibold"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    Practical information
                  </h2>

                  {[
                    { label: 'Best season', content: dest.bestSeason },
                    { label: 'Getting there', content: dest.gettingThere },
                    { label: 'Where to stay', content: dest.wherToStay },
                  ].map(({ label, content }) => (
                    <div
                      key={label}
                      className="rounded-[var(--radius-md)] p-5"
                      style={{
                        background: 'var(--color-surface-raised)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <h3 className="font-semibold mb-2" style={{ color: 'var(--color-ink)' }}>
                        {label}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
                        {content}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Book a tour CTA */}
                <div
                  className="rounded-[var(--radius-lg)] p-6 sticky top-6"
                  style={{ background: 'var(--color-primary)' }}
                >
                  <h3 className="font-display text-xl font-semibold text-white mb-3">
                    Book a guided tour here
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed mb-5">
                    Expert-led tours in {dest.name}. Commit when you find one you love — tours only run when enough birders sign up.
                  </p>
                  <Link
                    href="/tours"
                    className="block w-full py-3 px-4 text-center rounded-[var(--radius-organic)] text-sm font-semibold transition-all duration-200 hover:opacity-90"
                    style={{ background: '#D4915D', color: '#1B3D2F' }}
                  >
                    Browse tours
                  </Link>
                </div>

                {/* Local operators */}
                {dest.relatedOperators.length > 0 && (
                  <div
                    className="rounded-[var(--radius-lg)] p-6"
                    style={{
                      background: 'var(--color-surface-raised)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <h3 className="font-semibold mb-4" style={{ color: 'var(--color-ink)' }}>
                      Local guides
                    </h3>
                    <div className="space-y-4">
                      {dest.relatedOperators.map((op) => (
                        <div key={op.slug}>
                          <Link
                            href={`/operators/${op.slug}`}
                            className="font-medium text-sm hover:text-[var(--color-accent)] transition-colors"
                            style={{ color: 'var(--color-ink)' }}
                          >
                            {op.name} →
                          </Link>
                          <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
                            {op.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related destinations */}
                {relatedDests.length > 0 && (
                  <div
                    className="rounded-[var(--radius-lg)] p-6"
                    style={{
                      background: 'var(--color-surface-raised)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <h3 className="font-semibold mb-4" style={{ color: 'var(--color-ink)' }}>
                      Nearby destinations
                    </h3>
                    <div className="space-y-3">
                      {relatedDests.map((rd) => (
                        <Link
                          key={rd.slug}
                          href={`/destinations/${rd.slug}`}
                          className="block group"
                        >
                          <p
                            className="text-sm font-medium group-hover:text-[var(--color-accent)] transition-colors"
                            style={{ color: 'var(--color-ink)' }}
                          >
                            {rd.name}
                          </p>
                          <p className="text-xs" style={{ color: 'var(--color-ink-subtle)' }}>
                            {rd.region}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
