interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

export function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <span
      className="
        inline-flex items-center gap-2
        px-3 py-1.5
        text-sm
        bg-[var(--color-surface-sunken)]
        border border-[var(--color-border)]
        rounded-[var(--radius-pill)]
        text-[var(--color-ink)]
      "
    >
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="
          w-4 h-4
          flex items-center justify-center
          rounded-full
          text-[var(--color-ink-subtle)]
          hover:text-[var(--color-ink)]
          hover:bg-[var(--color-border)]
          transition-colors duration-[var(--transition-fast)]
          focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-1
        "
        aria-label={`Remove ${label} filter`}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M1 1l8 8M9 1l-8 8" />
        </svg>
      </button>
    </span>
  );
}
