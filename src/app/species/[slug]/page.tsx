import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getSpeciesBySlug,
  getRelatedSpecies,
  speciesData,
  conservationStatusColors,
} from '@/data/species';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return speciesData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const species = getSpeciesBySlug(slug);
  if (!species) return { title: 'Species Not Found' };

  return {
    title: `${species.commonName} — Australian Birding Guide`,
    description: species.metaDescription,
    keywords: species.keywords,
    openGraph: {
      title: `${species.commonName} (${species.scientificName}) | Quorum Tours`,
      description: species.metaDescription,
    },
  };
}

const difficultyColors: Record<string, { bg: string; text: string }> = {
  Easy: { bg: '#d6ebe3', text: '#1b3d2f' },
  Moderate: { bg: '#d6ebe3', text: '#2a6048' },
  Hard: { bg: '#f5e8d6', text: '#7a4f1a' },
  Expert: { bg: '#fdf0ee', text: '#922b21' },
};

export default async function SpeciesDetailPage({ params }: Props) {
  const { slug } = await params;
  const species = getSpeciesBySlug(slug);
  if (!species) notFound();

  const statusColor = conservationStatusColors[species.conservationStatusCode];
  const diffColor = difficultyColors[species.difficulty];
  const relatedSpecies = getRelatedSpecies(species.relatedSpeciesSlugs);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${species.commonName} — Australian Birding Guide`,
    description: species.metaDescription,
    about: {
      '@type': 'Thing',
      name: species.commonName,
      alternateName: species.scientificName,
      description: species.heroDescription,
    },
    author: { '@type': 'Organization', name: 'Quorum Tours' },
    publisher: {
      '@type': 'Organization',
      name: 'Quorum Tours',
      url: 'https://quorumtours.com',
    },
    url: `https://quorumtours.com/species/${species.slug}`,
    mainEntityOfPage: `https://quorumtours.com/species/${species.slug}`,
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
          style={{ background: 'linear-gradient(135deg, #1B3D2F 0%, #2a5a42 60%, #1B3D2F 100%)' }}
        >
          <div
            className="absolute inset-0 opacity-10"
            aria-hidden="true"
            style={{
              backgroundImage:
                'radial-gradient(circle at 80% 20%, #D4915D 0%, transparent 50%), radial-gradient(circle at 20% 80%, #4A7C89 0%, transparent 50%)',
            }}
          />

          <div className="relative w-full max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-white/50">
                <li><Link href="/" className="hover:text-white/80 transition-colors">Home</Link></li>
                <li aria-hidden="true" className="text-white/30">/</li>
                <li><Link href="/species" className="hover:text-white/80 transition-colors">Species</Link></li>
                <li aria-hidden="true" className="text-white/30">/</li>
                <li className="text-white/80">{species.commonName}</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              {/* Status badges */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: statusColor.bg, color: statusColor.text }}
                >
                  {species.conservationStatus}
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: diffColor.bg, color: diffColor.text }}
                >
                  {species.difficulty} to find
                </span>
              </div>

              <h1
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-3"
                style={{ lineHeight: 1.1 }}
              >
                {species.commonName}
              </h1>
              <p className="text-white/60 italic text-lg mb-6">{species.scientificName}</p>
              <p className="text-white/85 text-lg sm:text-xl leading-relaxed max-w-2xl">
                {species.heroDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Quick stats bar */}
        <div
          className="border-b"
          style={{ background: 'var(--color-surface-raised)', borderColor: 'var(--color-border)' }}
        >
          <div className="w-full max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-0 divide-x" style={{ borderColor: 'var(--color-border)' }}>
              {[
                { label: 'Conservation Status', value: species.conservationStatus },
                { label: 'Best Season', value: species.bestSeason.split('.')[0] },
                { label: 'Difficulty', value: species.difficulty },
                { label: 'Top Location', value: species.bestLocations[0]?.name },
              ].map((stat, i) => (
                <div key={i} className="px-4 sm:px-6 py-4 flex-1 min-w-[140px]">
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--color-ink-subtle)' }}>
                    {stat.label}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <section className="py-16 md:py-20" style={{ background: 'var(--color-surface)' }}>
          <div className="w-full max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Article body */}
              <article className="lg:col-span-2">
                {/* Full description */}
                <div className="prose prose-lg max-w-none mb-12">
                  {species.fullDescription.split('\n\n').map((para, i) => {
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

                {/* Best locations */}
                <div className="mb-12">
                  <h2
                    className="font-display text-3xl font-semibold mb-6"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    Best places to see the {species.commonName}
                  </h2>
                  <div className="space-y-4">
                    {species.bestLocations.map((loc, i) => (
                      <div
                        key={i}
                        className="rounded-[var(--radius-md)] p-5"
                        style={{
                          background: 'var(--color-surface-raised)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                            style={{ background: 'var(--color-primary)' }}
                          >
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold" style={{ color: 'var(--color-ink)' }}>
                                {loc.name}
                              </h3>
                              <span
                                className="px-2 py-0.5 rounded text-xs font-medium"
                                style={{ background: 'var(--color-surface-sunken)', color: 'var(--color-ink-subtle)' }}
                              >
                                {loc.state}
                              </span>
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
                              {loc.notes}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top facts */}
                <div className="mb-12">
                  <h2
                    className="font-display text-3xl font-semibold mb-6"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    Key facts
                  </h2>
                  <ul className="space-y-3">
                    {species.topFacts.map((fact, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 rounded-[var(--radius-sm)] p-4"
                        style={{
                          background: 'var(--color-surface-raised)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        <span
                          className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: '#d6ebe3' }}
                          aria-hidden="true"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1b3d2f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
                          {fact}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Find a tour CTA */}
                <div
                  className="rounded-[var(--radius-lg)] p-6 sticky top-6"
                  style={{
                    background: 'var(--color-primary)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  <h3 className="font-display text-xl font-semibold text-white mb-3">
                    Find a tour for this species
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed mb-5">
                    Browse expert-led tours targeting the {species.commonName}. Tours only run when enough birders commit — no last-minute cancellations.
                  </p>
                  <Link
                    href="/tours"
                    className="block w-full py-3 px-4 text-center rounded-[var(--radius-organic)] text-sm font-semibold transition-all duration-200 hover:opacity-90"
                    style={{ background: '#D4915D', color: '#1B3D2F' }}
                  >
                    Browse tours
                  </Link>
                  <Link
                    href="/species"
                    className="block w-full py-3 px-4 text-center rounded-[var(--radius-organic)] text-sm font-medium text-white/70 hover:text-white transition-colors mt-2"
                  >
                    ← Back to species list
                  </Link>
                </div>

                {/* Habitat types */}
                <div
                  className="rounded-[var(--radius-lg)] p-6"
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <h3 className="font-semibold mb-4" style={{ color: 'var(--color-ink)' }}>
                    Habitat types
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {species.habitatTypes.map((h) => (
                      <span
                        key={h}
                        className="px-3 py-1.5 rounded-full text-xs font-medium"
                        style={{ background: 'var(--color-surface-sunken)', color: 'var(--color-ink-muted)' }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Season */}
                <div
                  className="rounded-[var(--radius-lg)] p-6"
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <h3 className="font-semibold mb-3" style={{ color: 'var(--color-ink)' }}>
                    Best season
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
                    {species.bestSeason}
                  </p>
                </div>

                {/* Related species */}
                {relatedSpecies.length > 0 && (
                  <div
                    className="rounded-[var(--radius-lg)] p-6"
                    style={{
                      background: 'var(--color-surface-raised)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <h3 className="font-semibold mb-4" style={{ color: 'var(--color-ink)' }}>
                      Related species
                    </h3>
                    <div className="space-y-3">
                      {relatedSpecies.map((rel) => {
                        const relStatus = conservationStatusColors[rel.conservationStatusCode];
                        return (
                          <Link
                            key={rel.slug}
                            href={`/species/${rel.slug}`}
                            className="flex items-start gap-3 group"
                          >
                            <div className="flex-1">
                              <p
                                className="text-sm font-medium group-hover:text-[var(--color-accent)] transition-colors"
                                style={{ color: 'var(--color-ink)' }}
                              >
                                {rel.commonName}
                              </p>
                              <p className="text-xs italic" style={{ color: 'var(--color-ink-subtle)' }}>
                                {rel.scientificName}
                              </p>
                            </div>
                            <span
                              className="flex-shrink-0 px-2 py-0.5 rounded text-xs font-medium"
                              style={{ background: relStatus.bg, color: relStatus.text }}
                            >
                              {rel.conservationStatusCode}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section
          className="py-16"
          style={{ background: 'var(--color-surface-raised)', borderTop: '1px solid var(--color-border)' }}
        >
          <div className="w-full max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold mb-4"
              style={{ color: 'var(--color-ink)' }}
            >
              Plan your birding trip
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: 'var(--color-ink-muted)' }}>
              Quorum Tours connects you with expert guides across Australia. Tours run when enough birders commit — so every tour that leaves is worth it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tours"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[var(--radius-organic)] text-base font-semibold text-white transition-all duration-200 hover:opacity-90"
                style={{ background: 'var(--color-primary)' }}
              >
                Browse all tours
              </Link>
              <Link
                href="/species"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[var(--radius-organic)] text-base font-medium transition-all duration-200"
                style={{
                  background: 'var(--color-surface)',
                  color: 'var(--color-primary)',
                  border: '2px solid var(--color-primary)',
                }}
              >
                More species guides
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
