interface StageCardProps {
  number: number;
  title: string;
  description: string;
  clarification?: string;
}

export function StageCard({ number, title, description, clarification }: StageCardProps) {
  return (
    <div className="relative">
      <div className="
        bg-[var(--color-surface-raised)]
        border-2 border-[var(--color-border)]
        rounded-[var(--radius-organic)]
        shadow-[var(--shadow-card)]
        p-[var(--space-xl)]
        relative
        h-full
      ">
        {/* Step number badge */}
        <div className="
          absolute -top-4 left-[var(--space-xl)]
          w-8 h-8
          bg-[var(--color-primary)]
          text-white
          font-mono font-medium
          rounded-full
          flex items-center justify-center
          text-sm
        " aria-hidden="true">
          {number}
        </div>

        {/* Stage title */}
        <h3 className="
          font-display
          text-[var(--text-lg)]
          text-[var(--color-ink)]
          mt-[var(--space-md)]
          mb-[var(--space-sm)]
        ">
          {title}
        </h3>

        {/* Stage description */}
        <p className="
          text-[var(--color-ink-muted)]
          text-[var(--text-base)]
          leading-relaxed
          mb-[var(--space-md)]
        ">
          {description}
        </p>

        {/* Optional clarification */}
        {clarification && (
          <p className="
            text-[var(--color-ink-subtle)]
            text-[var(--text-sm)]
            leading-relaxed
            border-t border-[var(--color-border)]
            pt-[var(--space-md)]
          ">
            {clarification}
          </p>
        )}
      </div>
    </div>
  );
}
