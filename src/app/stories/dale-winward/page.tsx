import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Dale Winward — From Black Summer Rescue to Nature Tourism | Mallacoota Cruises",
  description:
    'The story of Dale Winward and the M.V. Loch-Ard — how a Black Summer wildlife rescue mission turned into a vision for sustainable nature tourism at Mallacoota Inlet, East Gippsland.',
  keywords: [
    'Dale Winward',
    'Mallacoota Cruises',
    'Black Summer wildlife rescue',
    'MV Loch-Ard',
    'Mallacoota tours',
    'East Gippsland wildlife',
    'nature tourism Gippsland',
    'Mallacoota wildlife tours',
  ],
  openGraph: {
    title: "Dale Winward — From Black Summer Rescue to Nature Tourism",
    description:
      'How the 2019–20 Black Summer fires transformed a local identity into an ambassador for East Gippsland\'s extraordinary wildlife.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Dale Winward — From Black Summer Rescue to Nature Tourism',
  description:
    'The story of Dale Winward and the M.V. Loch-Ard — how a Black Summer wildlife rescue mission turned into a vision for sustainable nature tourism at Mallacoota.',
  about: {
    '@type': 'Person',
    name: 'Dale Winward',
    jobTitle: 'Wildlife Guide & Tour Operator',
    worksFor: { '@type': 'Organization', name: 'Mallacoota Cruises' },
  },
  author: { '@type': 'Organization', name: 'Quorum Tours' },
  publisher: {
    '@type': 'Organization',
    name: 'Quorum Tours',
    url: 'https://quorumtours.com',
  },
  url: 'https://quorumtours.com/stories/dale-winward',
  mainEntityOfPage: 'https://quorumtours.com/stories/dale-winward',
};

export default function DaleWinwardStoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* Hero */}
        <section
          className="relative py-20 md:py-32"
          style={{ background: 'linear-gradient(160deg, #1B3D2F 0%, #2a3d4a 50%, #1B3D2F 100%)' }}
        >
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage:
                'radial-gradient(circle at 15% 85%, rgba(212,145,93,0.15) 0%, transparent 50%), radial-gradient(circle at 85% 15%, rgba(74,124,137,0.12) 0%, transparent 50%)',
            }}
          />
          <div className="relative w-full max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-white/50">
                <li><Link href="/" className="hover:text-white/80 transition-colors">Home</Link></li>
                <li aria-hidden="true" className="text-white/30">/</li>
                <li><Link href="/operators" className="hover:text-white/80 transition-colors">Operators</Link></li>
                <li aria-hidden="true" className="text-white/30">/</li>
                <li className="text-white/80">Dale Winward's Story</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <p className="text-[#D4915D] text-sm font-medium tracking-widest uppercase mb-4">
                Operator Story
              </p>
              <h1
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6"
                style={{ lineHeight: 1.1 }}
              >
                From Black Summer to Birding Guide
              </h1>
              <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
                When fire surrounded Mallacoota in January 2020 and the sky turned black at noon, Dale Winward didn't evacuate. He took to the water. What happened next led him to a new purpose — and a mission to show the world what this place holds.
              </p>
              <div className="flex flex-wrap gap-3">
                <span
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)' }}
                >
                  Mallacoota, East Gippsland
                </span>
                <span
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)' }}
                >
                  M.V. Loch-Ard
                </span>
                <span
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)' }}
                >
                  Wildlife & Birding Tours
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Story content */}
        <section className="py-16 md:py-24" style={{ background: 'var(--color-surface)' }}>
          <div className="w-full max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* Main story */}
              <article className="lg:col-span-2">

                {/* Pull quote */}
                <blockquote
                  className="mb-12 pl-6 py-2"
                  style={{ borderLeft: '4px solid #D4915D' }}
                >
                  <p
                    className="font-display text-2xl sm:text-3xl italic leading-relaxed"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    "The animals were coming to us. Singed kangaroos swimming to the boat. Wombats walking down the beach looking for help. I couldn't leave."
                  </p>
                  <footer className="mt-3 text-sm font-medium" style={{ color: 'var(--color-ink-muted)' }}>
                    — Dale Winward
                  </footer>
                </blockquote>

                {/* Chapter 1 */}
                <h2
                  className="font-display text-3xl font-semibold mb-5"
                  style={{ color: 'var(--color-ink)' }}
                >
                  New Year's Day, 2020
                </h2>
                <div className="space-y-4 mb-10" style={{ color: 'var(--color-ink-muted)' }}>
                  <p className="leading-relaxed">
                    Most of Mallacoota had been evacuating for days. The fires had jumped containment lines across East Gippsland, and by 30 December the town was hemmed in — roads out closed, power cut, phone signals fading. As the new year arrived, the sky turned from orange to deep red to black. Ash fell like snow. The air smelled of nothing good.
                  </p>
                  <p className="leading-relaxed">
                    More than 4,000 people gathered on the beach and jetty area, photographed from above by media helicopters. The images went around the world: a town under apocalyptic skies, people in masks, huddled at the water's edge. For the global audience, Mallacoota became a symbol of the Black Summer's ferocity.
                  </p>
                  <p className="leading-relaxed">
                    Dale Winward was on the water. A lifelong local with deep roots in the region, Dale had been running boat tours on Mallacoota Inlet for years. He knew the waterways, the bays, the wildlife. And on those days of fire and darkness, he used that knowledge to do something that didn't make the news the same way the beach photos did: he and others began pulling injured animals out of the water.
                  </p>
                  <p className="leading-relaxed">
                    Kangaroos that had run from the fire and ended up swimming in the inlet. Wombats walking dazed down the shoreline. Birds that had fled the smoke and collapsed. The inlet became a refuge — the only unburned corridor in a burning landscape — and the people on the water became its stewards.
                  </p>
                </div>

                {/* Chapter 2 */}
                <h2
                  className="font-display text-3xl font-semibold mb-5"
                  style={{ color: 'var(--color-ink)' }}
                >
                  The M.V. Loch-Ard
                </h2>
                <div className="space-y-4 mb-10" style={{ color: 'var(--color-ink-muted)' }}>
                  <p className="leading-relaxed">
                    Dale's vessel is the M.V. Loch-Ard — a name that carries its own history. The original Loch Ard was a clipper ship that wrecked at Port Campbell on Victoria's Shipwreck Coast in 1878, in one of Australia's most famous maritime disasters. Of the 54 people aboard, only two survived: a young Irish immigrant named Eva Carmichael and an apprentice named Tom Pearce, who became an unlikely hero.
                  </p>
                  <p className="leading-relaxed">
                    The connection to this history is not incidental for Dale. He named his boat deliberately — as a nod to the resilience embedded in Australia's colonial history, and as a statement about this coastline's character. The Gippsland coast has always been a place of hardship and beauty in equal measure. The Loch Ard wreck is only a few hundred kilometres west of Mallacoota. The shipwreck coast connects to the wilderness coast; the stories connect too.
                  </p>
                  <p className="leading-relaxed">
                    The M.V. Loch-Ard now carries a different kind of cargo: birders, wildlife watchers, and visitors who want to experience Mallacoota Inlet in the way it deserves — from the water, with someone who knows every waterway, every nesting site, every seasonal pattern.
                  </p>
                </div>

                {/* Chapter 3 */}
                <h2
                  className="font-display text-3xl font-semibold mb-5"
                  style={{ color: 'var(--color-ink)' }}
                >
                  After the Fire — A New Mission
                </h2>
                <div className="space-y-4 mb-10" style={{ color: 'var(--color-ink-muted)' }}>
                  <p className="leading-relaxed">
                    When the fires passed and Mallacoota began its long recovery, something shifted for Dale. The intensity of the fire season — and the extraordinary wildlife he had witnessed coming to the water for refuge — clarified something he had always known but perhaps not quite articulated: this place is extraordinary, and most of the world doesn't know it.
                  </p>
                  <p className="leading-relaxed">
                    Mallacoota sits at the end of a long road, backed by one of Victoria's wildest national parks. It's the kind of place that takes effort to reach — which is also why it has remained largely intact. The inlet is one of the most biodiverse estuaries in southeastern Australia. White-bellied Sea-Eagles nest along the shore. Glossy Black-Cockatoos feed in sheoak stands near the water. Ospreys fish the channels. On any morning on the inlet, the bird life is extraordinary.
                  </p>
                  <p className="leading-relaxed">
                    Dale's tours through Mallacoota Cruises have become a way of showing people what this place actually is — not just a town that was on the news during a disaster, but a living, recovering, deeply beautiful ecosystem with something remarkable around every bend.
                  </p>
                  <p className="leading-relaxed">
                    His knowledge is the kind that comes from decades, not months. He can read the water, the weather, the seasonal patterns of the inlet's wildlife. He knows when the Little Terns are nesting on the sandbars. He knows the trees where the sea eagles roost. He can point you to the right stand of sheoak at the right time of year and give you a genuine shot at a Glossy Black-Cockatoo — one of the harder encounters in Victorian birding.
                  </p>
                </div>

                {/* Chapter 4 */}
                <h2
                  className="font-display text-3xl font-semibold mb-5"
                  style={{ color: 'var(--color-ink)' }}
                >
                  Tourism as Conservation
                </h2>
                <div className="space-y-4 mb-12" style={{ color: 'var(--color-ink-muted)' }}>
                  <p className="leading-relaxed">
                    There is a tension at the heart of wildlife tourism that Dale navigates carefully: the presence of visitors can disturb the very wildlife that draws them. The answer, Dale believes, is not less tourism — it's better tourism. Tours led by people with deep local knowledge who understand what disturbance looks like and how to avoid it. Visitors who come away understanding why this place matters.
                  </p>
                  <p className="leading-relaxed">
                    The 2019–20 fires disrupted the region's tourism economy for a full season. Recovery has been gradual. But Dale is clear-eyed about the longer arc: the fires did not diminish what Mallacoota is. In some ways, the extraordinary recovery of the surrounding bush — the resilience that Australians have documented in the years since — has made the story richer, not poorer.
                  </p>
                  <p className="leading-relaxed">
                    He talks about the inlet the way people talk about places they love — with a mix of pride and protectiveness. When he points out a sea eagle nest that has been used for decades, or describes the seasonal movements of the Glossy Black-Cockatoo through the coastal heath, there's no performance in it. It's just someone telling you about a place they know well, and wanting you to know it too.
                  </p>
                </div>

                {/* Closing quote */}
                <blockquote
                  className="mb-12 pl-6 py-2"
                  style={{ borderLeft: '4px solid #4A7C89' }}
                >
                  <p
                    className="font-display text-xl sm:text-2xl italic leading-relaxed"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    "If you want to understand what this coast actually is, you need to be on the water at first light. That's when everything comes alive. I've done that trip a thousand times and I still look forward to it."
                  </p>
                  <footer className="mt-3 text-sm font-medium" style={{ color: 'var(--color-ink-muted)' }}>
                    — Dale Winward
                  </footer>
                </blockquote>

              </article>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Book with Dale */}
                <div
                  className="rounded-[var(--radius-lg)] p-6 sticky top-6"
                  style={{ background: 'var(--color-primary)' }}
                >
                  <h3 className="font-display text-xl font-semibold text-white mb-3">
                    Join Dale on the water
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed mb-5">
                    Mallacoota Cruises operates guided wildlife and birding tours on the inlet aboard the M.V. Loch-Ard. Tours only depart when enough birders commit — no cancellations, no wasted trips.
                  </p>
                  <Link
                    href="/operators/mallacoota-cruises"
                    className="block w-full py-3 px-4 text-center rounded-[var(--radius-organic)] text-sm font-semibold mb-3 transition-all duration-200 hover:opacity-90"
                    style={{ background: '#D4915D', color: '#1B3D2F' }}
                  >
                    View Mallacoota Cruises
                  </Link>
                  <Link
                    href="/tours"
                    className="block w-full py-3 px-4 text-center rounded-[var(--radius-organic)] text-sm font-medium text-white/70 hover:text-white transition-colors border border-white/20"
                  >
                    Browse all tours
                  </Link>
                </div>

                {/* Destination guide */}
                <div
                  className="rounded-[var(--radius-lg)] p-6"
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <h3 className="font-semibold mb-3" style={{ color: 'var(--color-ink)' }}>
                    Plan your visit
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-ink-muted)' }}>
                    Read our full Mallacoota & East Gippsland region guide — birds, seasons, and how to get there.
                  </p>
                  <Link
                    href="/destinations/mallacoota-east-gippsland"
                    className="text-sm font-medium hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    Mallacoota region guide →
                  </Link>
                </div>

                {/* Key birds */}
                <div
                  className="rounded-[var(--radius-lg)] p-6"
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <h3 className="font-semibold mb-4" style={{ color: 'var(--color-ink)' }}>
                    Birds you might see
                  </h3>
                  <div className="space-y-2">
                    {[
                      { name: 'White-bellied Sea-Eagle', href: null },
                      { name: 'Glossy Black-Cockatoo', href: '/species/glossy-black-cockatoo' },
                      { name: 'Osprey', href: null },
                      { name: 'Azure Kingfisher', href: null },
                      { name: 'Superb Lyrebird', href: '/species/superb-lyrebird' },
                      { name: 'Australian Pelican', href: null },
                    ].map((bird) => (
                      <div key={bird.name} className="flex items-center gap-2">
                        <span
                          className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ background: '#d6ebe3' }}
                          aria-hidden="true"
                        >
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#1b3d2f" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        {bird.href ? (
                          <Link
                            href={bird.href}
                            className="text-sm hover:text-[var(--color-accent)] transition-colors"
                            style={{ color: 'var(--color-ink-muted)' }}
                          >
                            {bird.name}
                          </Link>
                        ) : (
                          <span className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                            {bird.name}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section
          className="py-16"
          style={{ background: 'var(--color-surface-raised)', borderTop: '1px solid var(--color-border)' }}
        >
          <div className="w-full max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2
                className="font-display text-3xl sm:text-4xl font-semibold mb-4"
                style={{ color: 'var(--color-ink)' }}
              >
                Experience Mallacoota from the water
              </h2>
              <p className="text-lg mb-8" style={{ color: 'var(--color-ink-muted)' }}>
                Mallacoota Cruises runs guided wildlife and birding tours on the inlet. The tour runs when enough birders commit — every departure is worth showing up for.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/operators/mallacoota-cruises"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[var(--radius-organic)] text-base font-semibold text-white transition-all duration-200 hover:opacity-90"
                  style={{ background: 'var(--color-primary)' }}
                >
                  See upcoming tours
                </Link>
                <Link
                  href="/destinations/mallacoota-east-gippsland"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[var(--radius-organic)] text-base font-medium transition-all duration-200"
                  style={{
                    background: 'var(--color-surface)',
                    color: 'var(--color-primary)',
                    border: '2px solid var(--color-primary)',
                  }}
                >
                  Region guide
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
