export function BeforeAfterSection() {
  const transformations = [
    {
      category: "Payment Collection",
      before: "Chasing invoices, writing card numbers on sticky notes",
      after: "Automated collection, secure processing",
      stat: "Save 8 hours/week on payment admin",
    },
    {
      category: "Cash Flow",
      before: "$8,000 out-of-pocket months before revenue",
      after: "Vendor deposits released when tour confirms",
      stat: "Zero upfront financial risk",
    },
    {
      category: "Cancellation Anxiety",
      before: "Answering 50-100 emails only to cancel",
      after: "Transparent progress, fair refunds if threshold not met",
      stat: "33% fewer cancellations",
    },
    {
      category: "Admin Burden",
      before: "24/7 tether to WhatsApp, email, phone",
      after: "Centralized dashboard, automated reminders",
      stat: "Operators report saving 15 hours/week",
    },
  ];

  return (
    <section className="
      py-[var(--space-section-loose)]
      bg-[var(--color-surface)]
    ">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-[var(--space-lg)]
      ">
        {/* Section header */}
        <div className="text-center mb-[var(--space-3xl)]">
          <h2 className="
            font-display
            text-[var(--text-3xl)]
            text-[var(--color-ink)]
            mb-[var(--space-md)]
          ">
            What Changes for You
          </h2>
        </div>

        {/* 2x4 Before/After Grid */}
        <div className="space-y-[var(--space-2xl)]">
          {transformations.map((item, index) => (
            <div
              key={index}
              className="
                grid grid-cols-1 md:grid-cols-2 gap-[var(--space-lg)]
                p-[var(--space-lg)]
                bg-[var(--color-surface-raised)]
                border border-[var(--color-border)]
                rounded-[var(--radius-lg)]
              "
              style={{
                // Varied heights to avoid uniformity (kill-list #3)
                minHeight: index % 2 === 0 ? '160px' : '140px',
              }}
            >
              {/* Category header */}
              <div className="md:col-span-2 mb-[var(--space-sm)]">
                <h3 className="
                  text-sm
                  uppercase
                  tracking-wider
                  text-[var(--color-ink-subtle)]
                  font-medium
                ">
                  {item.category}
                </h3>
              </div>

              {/* Before column */}
              <div className="flex flex-col">
                <div className="
                  text-xs
                  uppercase
                  tracking-wider
                  text-[var(--color-ink-subtle)]
                  mb-[var(--space-sm)]
                  font-medium
                ">
                  Before
                </div>
                <p className="
                  flex-1
                  text-[var(--text-base)]
                  text-[var(--color-ink-muted)]
                  leading-relaxed
                ">
                  {item.before}
                </p>
              </div>

              {/* Arrow divider (desktop only) */}
              <div className="
                hidden md:flex
                absolute left-1/2 top-1/2
                -translate-x-1/2 -translate-y-1/2
                w-8 h-8
                items-center justify-center
                bg-[var(--color-accent)]
                text-white
                rounded-full
                z-10
              " aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 8h12M10 4l4 4-4 4"/>
                </svg>
              </div>

              {/* After column */}
              <div className="flex flex-col relative">
                <div className="
                  text-xs
                  uppercase
                  tracking-wider
                  text-[var(--color-confirmed)]
                  mb-[var(--space-sm)]
                  font-medium
                ">
                  After
                </div>
                <p className="
                  flex-1
                  text-[var(--text-base)]
                  text-[var(--color-ink)]
                  font-medium
                  leading-relaxed
                ">
                  {item.after}
                </p>
              </div>

              {/* Supporting stat */}
              <div className="md:col-span-2 mt-[var(--space-sm)] pt-[var(--space-sm)] border-t border-[var(--color-border)]">
                <p className="text-sm text-[var(--color-ink-muted)]">
                  <span className="inline-flex items-center gap-2 px-2 py-1 bg-[var(--color-confirmed-bg)] text-[var(--color-confirmed)] rounded-[var(--radius-sm)] font-medium">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                      <path d="M10 3L4.5 8.5 2 6l1-1 1.5 1.5L9 2z"/>
                    </svg>
                    {item.stat}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
