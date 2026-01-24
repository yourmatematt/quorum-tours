interface OperatorCardProps {
  id: string;
  name: string;
  photo?: string;
  verified: boolean;
  expertise: string;
  location: string;
  totalReviews: number;
  averageRating: number;
  toursCompleted: number;
}

export function OperatorCard({
  id,
  name,
  photo,
  verified,
  expertise,
  location,
  totalReviews,
  averageRating,
  toursCompleted,
}: OperatorCardProps) {
  return (
    <a
      href={`/operators/${id}`}
      className="
        block
        p-[var(--space-lg)]
        bg-[var(--color-surface-raised)]
        border-2 border-[var(--color-border)]
        rounded-[var(--radius-organic)]
        shadow-[var(--shadow-card)]
        transition-all duration-200
        hover:border-[var(--color-primary)]
        hover:shadow-[var(--shadow-card-hover)]
        focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
        group
      "
    >
      {/* Top row: Photo + Name/Expertise */}
      <div className="flex items-start gap-[var(--space-md)] mb-[var(--space-md)]">
        {/* Photo */}
        <div
          className="
            w-14 h-14
            rounded-full
            bg-[var(--color-surface-sunken)]
            flex items-center justify-center
            text-xl text-[var(--color-ink-subtle)]
            overflow-hidden
            flex-shrink-0
          "
          aria-hidden="true"
        >
          {photo ? (
            <img src={photo} alt="" className="w-full h-full object-cover" />
          ) : (
            name.charAt(0).toUpperCase()
          )}
        </div>

        {/* Name and expertise */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[var(--space-sm)] mb-[var(--space-xs)]">
            <span className="
              font-medium text-[var(--color-ink)]
              group-hover:text-[var(--color-primary)]
              transition-colors duration-200
              truncate
            ">
              {name}
            </span>
            {verified && (
              <span
                className="
                  inline-flex items-center
                  px-[var(--space-xs)] py-0.5
                  text-xs font-medium
                  bg-[var(--color-confirmed-bg)]
                  text-[var(--color-confirmed)]
                  rounded-[var(--radius-sm)]
                  flex-shrink-0
                "
              >
                Verified
              </span>
            )}
          </div>
          <p className="text-sm text-[var(--color-ink-muted)] line-clamp-2">
            {expertise}
          </p>
        </div>
      </div>

      {/* Location */}
      <p className="
        text-sm text-[var(--color-ink-subtle)]
        mb-[var(--space-md)]
        flex items-center gap-[var(--space-xs)]
      ">
        <svg
          width="14"
          height="14"
          className="flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        {location}
      </p>

      {/* Stats row */}
      <div className="
        flex items-center gap-[var(--space-lg)]
        pt-[var(--space-md)]
        border-t border-[var(--color-border)]
        text-sm text-[var(--color-ink-muted)]
      ">
        {/* Rating */}
        {totalReviews > 0 && (
          <span className="flex items-center gap-[var(--space-xs)]">
            <svg
              width="14"
              height="14"
              className="text-[var(--color-accent)] flex-shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-medium text-[var(--color-ink)]">
              {averageRating.toFixed(1)}
            </span>
            <span>({totalReviews})</span>
          </span>
        )}

        {/* Tours completed */}
        <span>
          <span className="font-medium text-[var(--color-ink)]">{toursCompleted}</span>
          {' '}tours
        </span>
      </div>

      {/* Arrow indicator */}
      <div className="
        mt-[var(--space-md)]
        text-sm text-[var(--color-ink-subtle)]
        group-hover:text-[var(--color-primary)]
        transition-colors duration-200
        flex items-center gap-[var(--space-xs)]
      ">
        View profile
        <span aria-hidden="true">&rarr;</span>
      </div>
    </a>
  );
}
