export function ConfirmationSection() {
  const guaranteed = [
    'The tour runs on the scheduled date',
    'The operator attends and leads the tour',
    'The location and itinerary are as described',
    'The duration is as stated',
  ];

  const notGuaranteed = [
    'Specific species sightings—nature is nature',
    'Perfect weather conditions',
    'Exact group size above the threshold',
    'Specific photography opportunities',
  ];

  return (
    <section className="
      py-20
      bg-[var(--color-surface-sunken)]
    ">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-6 lg:px-8
      ">
        <div className="max-w-4xl mx-auto">
          {/* Section headline */}
          <h2 className="
            font-display
            text-[clamp(1.75rem,4vw,2.5rem)]
            leading-tight
            text-[var(--color-ink)]
            mb-[var(--space-xl)]
          ">
            What confirmation means
          </h2>

          {/* Definition */}
          <p className="
            text-[var(--color-ink-muted)]
            text-[var(--text-base)]
            leading-relaxed
            mb-[var(--space-2xl)]
          ">
            A confirmed tour is one where the threshold has been met. The operator has
            committed to run it, and all participants have committed to attend. It's a
            mutual agreement: certainty for everyone.
          </p>

          {/* Two-column layout for guarantees */}
          <div className="
            grid grid-cols-1 md:grid-cols-2
            gap-[var(--space-xl)]
          ">
            {/* Guaranteed column */}
            <div className="
              p-[var(--space-xl)]
              bg-[var(--color-confirmed-bg)]
              border-2 border-[var(--color-confirmed)]
              border-opacity-20
              rounded-[var(--radius-organic)]
              shadow-[var(--shadow-card)]
            ">
              <h3 className="
                font-display
                text-[var(--text-lg)]
                text-[var(--color-ink)]
                mb-[var(--space-lg)]
                flex items-center gap-[var(--space-sm)]
              ">
                <svg
                  width="20"
                  height="20"
                  className="w-5 h-5 text-[var(--color-confirmed)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                Guaranteed
              </h3>
              <ul className="space-y-[var(--space-md)]">
                {guaranteed.map((item, index) => (
                  <li
                    key={index}
                    className="
                      text-[var(--color-ink)]
                      text-[var(--text-sm)]
                      flex items-start gap-[var(--space-sm)]
                    "
                  >
                    <span className="
                      text-[var(--color-confirmed)]
                      mt-0.5
                      flex-shrink-0
                    " aria-hidden="true">
                      <svg
                        width="16"
                        height="16"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Not guaranteed column */}
            <div className="
              p-[var(--space-xl)]
              bg-[var(--color-surface-raised)]
              border-2 border-[var(--color-border)]
              rounded-[var(--radius-organic)]
              shadow-[var(--shadow-card)]
            ">
              <h3 className="
                font-display
                text-[var(--text-lg)]
                text-[var(--color-ink)]
                mb-[var(--space-lg)]
                flex items-center gap-[var(--space-sm)]
              ">
                <svg
                  width="20"
                  height="20"
                  className="w-5 h-5 text-[var(--color-ink-subtle)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
                Not guaranteed
              </h3>
              <ul className="space-y-[var(--space-md)]">
                {notGuaranteed.map((item, index) => (
                  <li
                    key={index}
                    className="
                      text-[var(--color-ink-muted)]
                      text-[var(--text-sm)]
                      flex items-start gap-[var(--space-sm)]
                    "
                  >
                    <span className="
                      text-[var(--color-ink-subtle)]
                      mt-0.5
                      flex-shrink-0
                    " aria-hidden="true">
                      <svg
                        width="16"
                        height="16"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Expectation setter */}
          <p className="
            mt-[var(--space-2xl)]
            text-[var(--color-ink-muted)]
            text-[var(--text-sm)]
            leading-relaxed
          ">
            Confirmation means the tour runs—it doesn't mean perfect conditions or
            guaranteed sightings. Birding has inherent uncertainty, and we're honest about
            that. What we can guarantee is that everyone shows up and the experience happens.
          </p>
        </div>
      </div>
    </section>
  );
}
