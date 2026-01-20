interface BoundaryItemProps {
  title: string;
  explanation: string;
}

export function BoundaryItem({ title, explanation }: BoundaryItemProps) {
  return (
    <div className="flex items-start gap-[var(--space-md)]">
      {/* X icon */}
      <span className="
        flex-shrink-0
        w-8 h-8
        bg-[var(--color-surface-sunken)]
        rounded-full
        flex items-center justify-center
        text-[var(--color-ink-subtle)]
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

      <div>
        {/* Boundary title with "Quorum is not" prefix */}
        <p className="
          text-[var(--color-ink)]
          text-[var(--text-base)]
          font-medium
          mb-[var(--space-xs)]
        ">
          Quorum is not {title}
        </p>

        {/* Explanation */}
        <p className="
          text-[var(--color-ink-muted)]
          text-[var(--text-sm)]
          leading-relaxed
        ">
          {explanation}
        </p>
      </div>
    </div>
  );
}
