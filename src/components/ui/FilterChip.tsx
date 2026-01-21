interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

export function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <span
      className="
        inline-flex items-center gap-2
        pl-4 pr-2 py-2
        min-h-[48px]
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
          min-w-[32px] min-h-[32px]
          flex items-center justify-center
          rounded-full
          text-[var(--color-ink-subtle)]
          hover:text-[var(--color-ink)]
          hover:bg-[var(--color-border)]
          transition-colors duration-[var(--transition-fast)]
          focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-1
          -mr-1
        "
        aria-label={`Remove ${label} filter`}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M2 2l8 8M10 2l-8 8" />
        </svg>
      </button>
    </span>
  );
}
