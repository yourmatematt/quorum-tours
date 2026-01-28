'use client';

import { Button } from '../ui/Button';
import { ScrollReveal } from '../ui/ScrollReveal';

export function PathwaysSection() {
  return (
    <section className="
      py-[var(--space-section-loose)]
      bg-[var(--color-surface-sunken)]
    ">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-[var(--space-lg)]
      ">
        {/* Two prominent pathways - NOT three equal cards */}
        <div className="
          grid grid-cols-1 lg:grid-cols-2
          gap-[var(--space-2xl)]
          max-w-4xl
          mx-auto
        ">
          {/* Primary pathway - Browse Tours */}
          <ScrollReveal variant="fade-up" duration={500}>
            <div className="
              p-[var(--space-2xl)]
              bg-[var(--color-surface-raised)]
              border border-[var(--color-border)]
              rounded-[var(--radius-lg)]
            ">
              <h3 className="
                font-display
                text-[var(--text-xl)]
                text-[var(--color-ink)]
                mb-[var(--space-md)]
              ">
                Ready to explore?
              </h3>
              <p className="
                text-[var(--color-ink-muted)]
                mb-[var(--space-xl)]
                leading-relaxed
              ">
                Browse available tours by species, location, or date.
                See confirmation status and commit when you find the right one.
              </p>
              <Button variant="primary">
                Browse Available Tours
              </Button>
            </div>
          </ScrollReveal>

          {/* Secondary pathway - How It Works */}
          <ScrollReveal variant="fade-up" delay={100} duration={500}>
            <div className="
              p-[var(--space-2xl)]
              bg-transparent
              border border-[var(--color-border)]
              rounded-[var(--radius-lg)]
            ">
              <h3 className="
                font-display
                text-[var(--text-xl)]
                text-[var(--color-ink)]
                mb-[var(--space-md)]
              ">
                Want to understand more?
              </h3>
              <p className="
                text-[var(--color-ink-muted)]
                mb-[var(--space-xl)]
                leading-relaxed
              ">
                Learn exactly how quorum works, what happens if a tour doesn&apos;t run,
                and why conditional commitment protects you.
              </p>
              <Button variant="secondary">
                See How Confirmation Works
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
