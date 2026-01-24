export function ProblemSection() {
  return (
    <section className="
      py-20
      bg-[var(--color-surface)]
    ">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-6 lg:px-8
      ">
        <div className="max-w-4xl mx-auto">
          {/* Section headline - left aligned */}
          <h2 className="
            font-display
            text-[clamp(1.75rem,4vw,2.5rem)]
            leading-tight
            text-[var(--color-ink)]
            mb-[var(--space-xl)]
          ">
            The synchronization problem
          </h2>

          {/* Explanation paragraphs */}
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

          {/* Visual representation of the gap */}
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
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="
                        w-10 h-10
                        bg-[var(--color-surface-raised)]
                        border border-[var(--color-border)]
                        rounded-full
                        flex items-center justify-center
                      "
                    >
                      <svg
                        width="20"
                        height="20"
                        className="w-5 h-5 text-[var(--color-ink-subtle)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0"
                        />
                      </svg>
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
                    w-10 h-10
                    bg-[var(--color-surface-raised)]
                    border border-[var(--color-border)]
                    rounded-full
                    flex items-center justify-center
                  ">
                    <svg
                      width="20"
                      height="20"
                      className="w-5 h-5 text-[var(--color-ink-subtle)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
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
        </div>
      </div>
    </section>
  );
}
