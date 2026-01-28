'use client';

import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

// Placeholder face images - replace with real stock photos
// Stock search: "australian person portrait", "outdoor enthusiast portrait", "nature guide portrait"
const birderFaces = [
  { src: '/images/faces/birder-1.jpg', alt: 'Birder interested in shorebird tour' },
  { src: '/images/faces/birder-2.jpg', alt: 'Birder interested in shorebird tour' },
  { src: '/images/faces/birder-3.jpg', alt: 'Birder interested in shorebird tour' },
  { src: '/images/faces/birder-4.jpg', alt: 'Birder interested in shorebird tour' },
];

const operatorFace = {
  src: '/images/faces/operator-1.jpg',
  alt: 'Tour operator unable to see demand',
};

export function ProblemSection() {
  return (
    <section className="
      py-20
      bg-[var(--color-surface)]
    ">
      <div className="
        w-full max-w-[1400px]
        mx-auto px-[var(--space-lg)]
      ">
        {/* Section headline - left aligned */}
        <ScrollReveal variant="fade-up" duration={500}>
          <h2 className="
            font-display
            text-[clamp(1.75rem,4vw,2.5rem)]
            leading-tight
            text-[var(--color-ink)]
            mb-[var(--space-xl)]
          ">
            The synchronization problem
          </h2>
        </ScrollReveal>

        {/* Explanation paragraphs */}
        <ScrollReveal variant="fade-up" delay={100} duration={500}>
        <div className="space-y-[var(--space-lg)]">
          <p className="
            text-[var(--color-ink-muted)]
            text-[var(--text-base)]
            leading-relaxed
          ">
            Demand for birding tours exists—but it's invisible. Four birders in Brisbane
            each want a shorebird tour next month. None knows the others exist.
          </p>

          <p className="
            text-[var(--color-ink-muted)]
            text-[var(--text-base)]
            leading-relaxed
          ">
            The operator can't justify running a tour without knowing demand is there.
            The birders won't commit without knowing the tour will run. Everyone waits.
            Nothing happens.
          </p>

          <p className="
            text-[var(--color-ink-muted)]
            text-[var(--text-base)]
            leading-relaxed
          ">
            This is the synchronization gap: real demand that never becomes real tours
            because neither side can see the other's intentions.
          </p>
        </div>
        </ScrollReveal>

        {/* Visual representation of the gap */}
        <ScrollReveal variant="fade-up" delay={200} duration={500}>
        <div className="
          mt-[var(--space-3xl)]
          p-[var(--space-xl)]
          bg-[var(--color-surface-sunken)]
          border-2 border-[var(--color-border)]
          rounded-[var(--radius-organic)]
        " role="img" aria-label="Diagram showing four birders wanting the same tour but unable to see each other's interest">
          <div className="
            flex flex-col md:flex-row
            items-center
            gap-[var(--space-xl)]
          ">
            {/* Birders side */}
            <div className="flex-1 text-left">
              <p className="
                text-[var(--color-ink-subtle)]
                text-[var(--text-sm)]
                mb-[var(--space-sm)]
              ">
                Birders
              </p>
              <div className="flex gap-[var(--space-sm)]">
                {birderFaces.map((face, i) => (
                  <div
                    key={i}
                    className="
                      w-12 h-12
                      bg-[var(--color-surface-raised)]
                      border-2 border-[var(--color-border)]
                      rounded-full
                      overflow-hidden
                      relative
                    "
                  >
                    <Image
                      src={face.src}
                      alt={face.alt}
                      fill
                      className="object-cover"
                      sizes="48px"
                      onError={(e) => {
                        // Hide broken image, show fallback
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    {/* Fallback initial */}
                    <span className="
                      absolute inset-0
                      flex items-center justify-center
                      text-[var(--color-ink-subtle)]
                      text-sm font-medium
                      bg-[var(--color-surface-raised)]
                      -z-10
                    ">
                      {String.fromCharCode(65 + i)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="
                text-[var(--color-ink-subtle)]
                text-[var(--text-xs)]
                mt-[var(--space-sm)]
              ">
                Each wants the same tour
              </p>
            </div>

            {/* Gap indicator */}
            <div className="
              flex flex-col items-center
              text-[var(--color-ink-subtle)]
            ">
              <div className="
                text-[var(--text-lg)]
                font-mono
                mb-[var(--space-xs)]
              " aria-hidden="true">?</div>
              <p className="text-[var(--text-xs)]">Can't see each other</p>
            </div>

            {/* Operator side */}
            <div className="flex-1 text-left md:text-right">
              <p className="
                text-[var(--color-ink-subtle)]
                text-[var(--text-sm)]
                mb-[var(--space-sm)]
              ">
                Operator
              </p>
              <div className="flex md:justify-end">
                <div className="
                  w-14 h-14
                  bg-[var(--color-surface-raised)]
                  border-2 border-[var(--color-primary)]/30
                  rounded-full
                  overflow-hidden
                  relative
                ">
                  <Image
                    src={operatorFace.src}
                    alt={operatorFace.alt}
                    fill
                    className="object-cover"
                    sizes="56px"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* Fallback initial */}
                  <span className="
                    absolute inset-0
                    flex items-center justify-center
                    text-[var(--color-primary)]
                    text-base font-medium
                    bg-[var(--color-primary-subtle)]
                    -z-10
                  ">
                    O
                  </span>
                </div>
              </div>
              <p className="
                text-[var(--color-ink-subtle)]
                text-[var(--text-xs)]
                mt-[var(--space-sm)]
              ">
                Can't see the demand
              </p>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
