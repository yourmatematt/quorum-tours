import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  suggestions?: string[];
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  suggestions,
}: EmptyStateProps) {
  return (
    <div
      className="
        flex flex-col items-center justify-center
        py-[var(--space-4xl)]
        px-[var(--space-xl)]
        text-center
      "
    >
      {/* Simple icon - not a sad illustration */}
      <div
        className="
          w-16 h-16 mb-[var(--space-xl)]
          flex items-center justify-center
          bg-[var(--color-surface-sunken)]
          rounded-full
          text-[var(--color-ink-subtle)]
        "
        aria-hidden="true"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="16" cy="16" r="12" />
          <path d="M16 10v6M16 20v2" />
        </svg>
      </div>

      <h2 className="
        font-display
        text-[var(--text-xl)]
        text-[var(--color-ink)]
        mb-[var(--space-sm)]
      ">
        {title}
      </h2>

      <p className="
        text-[var(--color-ink-muted)]
        max-w-[40ch]
        mb-[var(--space-lg)]
      ">
        {description}
      </p>

      {suggestions && suggestions.length > 0 && (
        <div className="
          mb-[var(--space-xl)]
          text-sm text-[var(--color-ink-subtle)]
        ">
          <p className="mb-[var(--space-sm)]">Try:</p>
          <ul className="space-y-1">
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      {actionLabel && onAction && (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
