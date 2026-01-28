'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function FailureCaseSection() {
  const outcomes = [
    {
      text: 'Your conditional commitment expires automatically',
      icon: (
        <svg
          width="20"
          height="20"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      text: 'You are not charged',
      icon: (
        <svg
          width="20"
          height="20"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
          />
        </svg>
      ),
    },
    {
      text: 'You receive a notification that the tour did not confirm',
      icon: (
        <svg
          width="20"
          height="20"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
      ),
    },
    {
      text: 'Your commitment slot is freed up—you can immediately commit to other forming tours',
      icon: (
        <svg
          width="20"
          height="20"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="
      py-20
      bg-[var(--color-surface)]
    ">
      <div className="
        w-full max-w-[1400px]
        mx-auto px-[var(--space-lg)]
      ">
          {/* Direct question as headline */}
          <ScrollReveal variant="fade-up" duration={500}>
            <h2 className="
              font-display
              text-[clamp(1.75rem,4vw,2.5rem)]
              leading-tight
              text-[var(--color-ink)]
              mb-[var(--space-xl)]
            ">
              What if the tour doesn't reach quorum?
            </h2>

            {/* Direct answer */}
            <p className="
              text-[var(--color-ink-muted)]
              text-[var(--text-base)]
              leading-relaxed
              mb-[var(--space-2xl)]
            ">
              Each tour has a commitment deadline—typically 7 days before the scheduled date.
              If quorum isn't reached by that deadline, here's exactly what happens:
            </p>
          </ScrollReveal>

          {/* Outcome list */}
          <ul className="space-y-[var(--space-lg)]">
            {outcomes.map((outcome, index) => (
              <ScrollReveal
                key={index}
                variant="fade-up"
                delay={index * 100}
                duration={500}
              >
                <li className="flex items-start gap-[var(--space-md)]">
                  <span className="
                    flex-shrink-0
                    w-8 h-8
                    bg-[var(--color-surface-sunken)]
                    rounded-full
                    flex items-center justify-center
                    text-[var(--color-ink-subtle)]
                  " aria-hidden="true">
                    {outcome.icon}
                  </span>
                  <span className="
                    text-[var(--color-ink)]
                    text-[var(--text-base)]
                    pt-[var(--space-xs)]
                  ">
                    {outcome.text}
                  </span>
                </li>
              </ScrollReveal>
            ))}
          </ul>

          {/* Timeline note */}
          <ScrollReveal variant="fade-up" delay={400} duration={500}>
            <div className="
              mt-[var(--space-2xl)]
              p-[var(--space-lg)]
              bg-[var(--color-surface-sunken)]
              border-l-4 border-[var(--color-primary)]
              rounded-r-[var(--radius-organic)]
            ">
              <p className="
                text-[var(--color-ink)]
                text-[var(--text-sm)]
              ">
                <strong>The deadline is visible on every tour page.</strong> You'll always
                know exactly when quorum needs to be reached, so there are no surprises.
              </p>
            </div>
          </ScrollReveal>
      </div>
    </section>
  );
}
