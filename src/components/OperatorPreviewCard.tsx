interface OperatorPreviewCardProps {
  name: string;
  expertise: string;
  imageUrl?: string;
  verified?: boolean;
  href?: string;
}

export function OperatorPreviewCard({
  name,
  expertise,
  imageUrl,
  verified = false,
  href = '#',
}: OperatorPreviewCardProps) {
  return (
    <a
      href={href}
      className="
        flex items-center gap-4
        p-4
        bg-[var(--color-surface-raised)]
        border border-[var(--color-border)]
        rounded-[var(--radius-lg)]
        transition-all duration-[var(--transition-normal)]
        hover:border-[var(--color-accent)]
        focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2
        group
      "
    >
      {/* Photo placeholder */}
      <div
        className="
          w-16 h-16
          rounded-full
          bg-[var(--color-surface-sunken)]
          flex items-center justify-center
          text-2xl text-[var(--color-ink-subtle)]
          overflow-hidden
          flex-shrink-0
        "
        aria-hidden="true"
      >
        {imageUrl ? (
          <img src={imageUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          name.charAt(0).toUpperCase()
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="
            font-medium text-[var(--color-ink)]
            group-hover:text-[var(--color-accent)]
            transition-colors duration-[var(--transition-normal)]
            truncate
          ">
            {name}
          </span>
          {verified && (
            <span
              className="
                inline-flex items-center
                px-2 py-0.5
                text-xs font-medium
                bg-[var(--color-confirmed-bg)]
                text-[var(--color-confirmed)]
                rounded-[var(--radius-sm)]
              "
            >
              Verified
            </span>
          )}
        </div>
        <p className="text-sm text-[var(--color-ink-muted)] truncate">
          {expertise}
        </p>
      </div>

      {/* Arrow indicator - appears on hover */}
      <span
        className="
          text-[var(--color-ink-subtle)]
          group-hover:text-[var(--color-accent)]
          group-hover:translate-x-1
          transition-all duration-[var(--transition-normal)]
        "
        aria-hidden="true"
      >
        &rarr;
      </span>
    </a>
  );
}
