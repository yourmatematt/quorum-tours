interface OperatorHeroProps {
  name: string;
  photo?: string;
  verified: boolean;
  expertise: string;
  location: string;
  yearsExperience: number;
}

export function OperatorHero({
  name,
  photo,
  verified,
  expertise,
  location,
  yearsExperience,
}: OperatorHeroProps) {
  return (
    <section className="mb-[var(--space-3xl)]">
      <div className="flex flex-col sm:flex-row items-start gap-[var(--space-xl)]">
        {/* Operator Photo */}
        <div
          className="
            flex-shrink-0
            w-32 h-32 sm:w-40 sm:h-40
            rounded-full
            bg-[var(--color-surface-sunken)]
            border-2 border-[var(--color-border)]
            overflow-hidden
            flex items-center justify-center
          "
        >
          {photo ? (
            <img
              src={photo}
              alt={`Photo of ${name}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              stroke="var(--color-ink-subtle)"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="24" cy="16" r="8" />
              <path d="M8 42c0-8 8-12 16-12s16 4 16 12" />
            </svg>
          )}
        </div>

        {/* Identity Info */}
        <div className="flex-1 min-w-0">
          {/* Name + Verification */}
          <div className="flex flex-wrap items-center gap-[var(--space-sm)] mb-[var(--space-sm)]">
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-ink)]">
              {name}
            </h1>
            {verified && (
              <span
                className="
                  inline-flex items-center gap-[var(--space-xs)]
                  px-[var(--space-sm)] py-[var(--space-xs)]
                  bg-[var(--color-confirmed-bg)]
                  text-[var(--color-confirmed)]
                  text-xs font-medium
                  rounded-[var(--radius-sm)]
                "
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10.28 2.72a.75.75 0 010 1.06l-5.5 5.5a.75.75 0 01-1.06 0l-2.5-2.5a.75.75 0 111.06-1.06L4.25 7.69l4.97-4.97a.75.75 0 011.06 0z" />
                </svg>
                Verified
              </span>
            )}
          </div>

          {/* Expertise */}
          <p className="text-[var(--text-lg)] text-[var(--color-ink-muted)] mb-[var(--space-md)]">
            {expertise}
          </p>

          {/* Location and Experience */}
          <div className="flex flex-wrap items-center gap-[var(--space-lg)] text-sm text-[var(--color-ink-subtle)]">
            <div className="flex items-center gap-[var(--space-xs)]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M8 14s-5-3.5-5-7a5 5 0 1110 0c0 3.5-5 7-5 7z" />
                <circle cx="8" cy="7" r="1.5" />
              </svg>
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-[var(--space-xs)]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <rect x="2" y="3" width="12" height="11" rx="1" />
                <path d="M2 6h12M5 1v4M11 1v4" />
              </svg>
              <span>Guiding since {new Date().getFullYear() - yearsExperience}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
