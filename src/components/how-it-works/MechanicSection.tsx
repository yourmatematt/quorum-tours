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
    title: 'Browse and find a tour',
    description:
      'Explore our curated tours led by verified guides. Each tour displays its threshold, available spots, current interest, and commitment deadline.',
    clarification: 'All tour details are transparent upfront—no hidden mechanics or surprise requirements.',
  },
  {
    number: 2,
    title: 'Express interest (no charge)',
    description:
      'Signal that you want this tour to happen. Your interest joins the aggregate count visible to everyone. No account required, no payment, no obligation.',
    clarification: "This is pure signal. You're saying \"I would go\" not \"I will go.\"",
  },
  {
    number: 3,
    title: 'Commit conditionally',
    description:
      "Agree to join the tour if the threshold is met. Your payment method is authorized but not charged. You're committed only if enough others commit too.",
    clarification:
      "The commitment is conditional. If the threshold isn't reached, your authorization expires and you owe nothing.",
  },
  {
    number: 4,
    title: 'Tour confirms when threshold met',
    description:
      'The threshold is met by the commitment deadline. The tour is now guaranteed to run. All conditional commits are charged. The operator confirms logistics.',
    clarification:
      'Confirmation means certainty for everyone—birders know the tour runs, operators know they have participants.',
  },
  {
    number: 5,
    title: 'You go birding',
    description:
      'Join your confirmed tour with the guide and fellow birders. The tour runs as scheduled with the guaranteed group size.',
    clarification:
      'No last-minute cancellations. Everyone committed, everyone shows up, the tour happens.',
  },
];

export function MechanicSection() {
  return (
    <section className="
      py-20
      bg-[var(--color-surface-sunken)]
    ">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-6 lg:px-8
      ">
        {/* Section header - center aligned */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="
            font-display
            text-2xl sm:text-3xl
            font-semibold
            text-[var(--color-ink)]
            mb-[var(--space-md)]
          ">
            For Birders: Your Journey
          </h2>
          <p className="
            text-[var(--color-ink-muted)]
            text-[var(--text-base)]
          ">
            Five clear steps from browsing to birding. You control how far you go at each stage.
          </p>
        </div>

        {/* Vertical timeline */}
        <div className="max-w-4xl mx-auto">
          {stages.map((stage, index) => (
            <div key={stage.number} className="relative">
              {/* Step container with horizontal layout */}
              <div className="flex gap-[var(--space-lg)]">
                {/* Number badge on left */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="
                    w-10 h-10
                    bg-[var(--color-primary)]
                    text-white
                    font-mono font-medium
                    rounded-full
                    flex items-center justify-center
                    text-base
                    flex-shrink-0
                  ">
                    {stage.number}
                  </div>

                  {/* Vertical connecting line */}
                  {index < stages.length - 1 && (
                    <div className="
                      w-0.5
                      flex-1
                      bg-[var(--color-border)]
                      my-[var(--space-sm)]
                      min-h-[var(--space-2xl)]
                    " aria-hidden="true" />
                  )}
                </div>

                {/* Content on right */}
                <div className="flex-1 pb-[var(--space-2xl)]">
                  <h3 className="
                    font-display
                    text-[var(--text-lg)]
                    text-[var(--color-ink)]
                    mb-[var(--space-sm)]
                  ">
                    {stage.title}
                  </h3>

                  <p className="
                    text-[var(--color-ink-muted)]
                    text-[var(--text-base)]
                    leading-relaxed
                    mb-[var(--space-md)]
                  ">
                    {stage.description}
                  </p>

                  <p className="
                    text-[var(--color-ink-subtle)]
                    text-[var(--text-sm)]
                    leading-relaxed
                    pl-[var(--space-md)]
                    border-l-2 border-[var(--color-border)]
                  ">
                    {stage.clarification}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key money clarification */}
        <div className="
          mt-16
          p-8
          bg-[var(--color-surface-raised)]
          border-2 border-[var(--color-border)]
          rounded-[var(--radius-organic)]
          shadow-[var(--shadow-card)]
          max-w-3xl
          mx-auto
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
