interface PastTourItemProps {
  id: string;
  title: string;
  date: string;
  outcome: 'completed' | 'cancelled';
  participantCount?: number;
}

export function PastTourItem({
  id,
  title,
  date,
  outcome,
  participantCount,
}: PastTourItemProps) {
  const outcomeConfig = {
    completed: {
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="var(--color-confirmed)"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M2 7l3 3 7-7" />
        </svg>
      ),
      label: 'Completed',
      textColor: 'text-[var(--color-confirmed)]',
    },
    cancelled: {
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="var(--color-ink-subtle)"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M3 3l8 8M11 3l-8 8" />
        </svg>
      ),
      label: 'Did not run',
      textColor: 'text-[var(--color-ink-subtle)]',
    },
  };

  const config = outcomeConfig[outcome];

  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-[var(--color-border)] last:border-b-0">
      <div className="min-w-0 flex-1">
        <div className="text-sm text-[var(--color-ink)] truncate">{title}</div>
        <div className="text-xs text-[var(--color-ink-subtle)]">
          {date}
          {outcome === 'completed' && participantCount !== undefined && (
            <> · {participantCount} participants</>
          )}
        </div>
      </div>
      <div className={`flex items-center gap-1 flex-shrink-0 ${config.textColor}`}>
        {config.icon}
        <span className="text-xs">{config.label}</span>
      </div>
    </div>
  );
}
