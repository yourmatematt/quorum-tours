import { StageCard } from './StageCard';

interface Stage {
  number: number;
  title: string;
  description: string;
  clarification: string;
}

const stages: Stage[] = [
  {
    number: 1,
    title: 'Express interest',
    description:
      'Signal that you want this tour to happen. Your interest joins the aggregate count visible to everyone. No account required, no payment, no obligation.',
    clarification: "This is pure signal. You're saying \"I would go\" not \"I will go.\"",
  },
  {
    number: 2,
    title: 'Commit conditionally',
    description:
      "Agree to join the tour if the threshold is met. Your payment method is authorized but not charged. You're committed only if enough others commit too.",
    clarification:
      "The commitment is conditional. If the threshold isn't reached, your authorization expires and you owe nothing.",
  },
  {
    number: 3,
    title: 'Tour confirms',
    description:
      'The threshold is met. The tour is now guaranteed to run. All conditional commits are charged. The operator confirms logistics. Everyone goes.',
    clarification:
      'Confirmation means certainty for everyone—birders know the tour runs, operators know they have participants.',
  },
];

export function MechanicSection() {
  return (
    <section className="
      py-[var(--space-section-normal)]
      bg-[var(--color-surface-sunken)]
    ">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-[var(--space-lg)]
      ">
        {/* Section header - left aligned */}
        <div className="mb-[var(--space-3xl)] max-w-[var(--container-content)]">
          <h2 className="
            font-display
            text-[var(--text-2xl)]
            text-[var(--color-ink)]
            mb-[var(--space-md)]
          ">
            How the threshold works
          </h2>
          <p className="
            text-[var(--color-ink-muted)]
            text-[var(--text-base)]
          ">
            Three stages from interest to confirmed tour. You control how far you go.
          </p>
        </div>

        {/* Stage cards with flow connectors */}
        <div className="
          grid grid-cols-1 md:grid-cols-3
          gap-[var(--space-xl)]
          relative
        ">
          {/* Connector line - visible on desktop */}
          <div
            className="
              hidden md:block
              absolute top-12 left-[16.67%] right-[16.67%]
              h-0.5 bg-[var(--color-border)]
            "
            aria-hidden="true"
          />

          {stages.map((stage, index) => (
            <div key={stage.number} className="relative">
              <StageCard
                number={stage.number}
                title={stage.title}
                description={stage.description}
                clarification={stage.clarification}
              />

              {/* Arrow connector on mobile */}
              {index < stages.length - 1 && (
                <div
                  className="
                    md:hidden
                    flex justify-center
                    py-[var(--space-md)]
                    text-[var(--color-ink-subtle)]
                  "
                  aria-hidden="true"
                >
                  <svg
                    width="24"
                    height="24"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Key money clarification */}
        <div className="
          mt-[var(--space-3xl)]
          p-[var(--space-lg)]
          bg-[var(--color-surface-raised)]
          border border-[var(--color-border)]
          rounded-[var(--radius-md)]
          max-w-[var(--container-content)]
        ">
          <p className="
            text-[var(--color-ink)]
            text-[var(--text-base)]
            font-medium
            mb-[var(--space-sm)]
          ">
            When does money change hands?
          </p>
          <p className="text-[var(--color-ink-muted)] text-[var(--text-sm)]">
            Only after the tour confirms. Expressing interest costs nothing. Conditional
            commitment authorizes payment but does not charge you. You are only charged when
            the threshold is met and the tour is guaranteed to run.
          </p>
        </div>
      </div>
    </section>
  );
}
