'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';

const trustItems = [
  {
    icon: '🔒',
    text: 'Deposits held, not charged, until confirmed',
  },
  {
    icon: '✓',
    text: 'Verified operators only',
  },
  {
    icon: '↩',
    text: 'Full refund if quorum not met',
  },
];

export function TrustStrip() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="w-full max-w-[1400px] mx-auto px-[var(--space-lg)]">
        <ScrollReveal variant="fade-up" duration={500}>
          <div className="flex flex-wrap justify-center gap-6">
            {trustItems.map((item, index) => (
              <div
                key={index}
                className="
                  inline-flex items-center gap-3
                  px-6 py-3
                  bg-white
                  border border-[var(--color-border)]
                  rounded-full
                  shadow-sm
                "
              >
                <span className="text-lg" role="img" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="text-[var(--color-ink-muted)] text-sm font-medium whitespace-nowrap">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
