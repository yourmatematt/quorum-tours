export function HumanSupportSection() {
  return (
    <section className="
      py-[var(--space-section)]
      bg-[var(--color-surface-raised)]
      border-y border-[var(--color-border)]
    ">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-[var(--space-lg)]
      ">
        {/* Section header */}
        <h2 className="
          text-[var(--text-lg)]
          text-[var(--color-ink-subtle)]
          text-center
          mb-[var(--space-2xl)]
        ">
          Built for Birders, Not IT Departments
        </h2>

        {/* 3-column trust signals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-xl)]">
          {/* Phone Support */}
          <div className="text-center">
            <div className="
              inline-flex items-center justify-center
              w-16 h-16
              mb-[var(--space-md)]
              bg-[var(--color-accent)]/10
              rounded-[var(--radius-lg)]
            ">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="var(--color-accent)" strokeWidth="2" aria-hidden="true">
                <path d="M4 6h6l3 7-4 3c1.5 4.5 6 9 10.5 10.5l3-4 7 3v6a3 3 0 01-3 3C12.5 34.5 0 22 0 6a3 3 0 013-3z"/>
              </svg>
            </div>
            <p className="
              text-[var(--text-base)]
              text-[var(--color-ink)]
              font-medium
              mb-[var(--space-xs)]
            ">
              Call us at <a href="tel:+1234567890" className="font-mono text-[var(--color-accent)] hover:underline">(123) 456-7890</a>
            </p>
            <p className="text-sm text-[var(--color-ink-muted)]">
              Real humans, not chatbots
            </p>
          </div>

          {/* Concierge Onboarding */}
          <div className="text-center">
            <div className="
              inline-flex items-center justify-center
              w-16 h-16
              mb-[var(--space-md)]
              bg-[var(--color-confirmed)]/10
              rounded-[var(--radius-lg)]
            ">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="var(--color-confirmed)" strokeWidth="2" aria-hidden="true">
                <circle cx="14" cy="10" r="5"/>
                <path d="M5 26c0-5 4-9 9-9s9 4 9 9"/>
                <rect x="22" y="18" width="4" height="8" rx="0.5"/>
              </svg>
            </div>
            <p className="
              text-[var(--text-base)]
              text-[var(--color-ink)]
              font-medium
              mb-[var(--space-xs)]
            ">
              We walk you through setup
            </p>
            <p className="text-sm text-[var(--color-ink-muted)]">
              30-minute call, zero tech jargon
            </p>
          </div>

          {/* Response Time */}
          <div className="text-center">
            <div className="
              inline-flex items-center justify-center
              w-16 h-16
              mb-[var(--space-md)]
              bg-[var(--color-forming)]/10
              rounded-[var(--radius-lg)]
            ">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="var(--color-forming)" strokeWidth="2" aria-hidden="true">
                <circle cx="14" cy="14" r="11"/>
                <path d="M14 7v7l4 4"/>
              </svg>
            </div>
            <p className="
              text-[var(--text-base)]
              text-[var(--color-ink)]
              font-medium
              mb-[var(--space-xs)]
            ">
              Support response within 2 hours
            </p>
            <p className="text-sm text-[var(--color-ink-muted)]">
              During business hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
