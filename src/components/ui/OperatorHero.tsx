interface OperatorHeroProps {
  name: string;
  photo?: string;
  coverImage?: string;
  verified: boolean;
  isFoundingOperator?: boolean;
  location: string;
  yearsExperience: number;
}

export function OperatorHero({
  name,
  photo,
  coverImage,
  verified,
  isFoundingOperator,
  location,
  yearsExperience,
}: OperatorHeroProps) {
  return (
    <section>
      {/* Cover banner + overlapping photo wrapper */}
      <div className="relative">
        {/* Cover banner — full card width, no horizontal padding */}
        <div
          className="
            w-full
            h-[140px] sm:h-[180px] lg:h-[220px]
            overflow-hidden
            rounded-t-[var(--radius-organic)] lg:rounded-t-[var(--radius-organic)]
          "
        >
          {coverImage ? (
            <img
              src={coverImage}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary-subtle) 0%, var(--color-surface-sunken) 50%, var(--color-secondary) 100%)',
                opacity: 0.6,
              }}
            />
          )}
        </div>

        {/* Profile photo — overlaps bottom of banner */}
        <div
          className="
            absolute
            left-[var(--space-md)] sm:left-[var(--space-lg)]
            bottom-0 translate-y-1/2
            z-10
          "
        >
          <div
            className="
              w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36
              rounded-full
              bg-[var(--color-surface-sunken)]
              border-4 border-white
              shadow-[var(--shadow-card)]
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
                width="40"
                height="40"
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
        </div>
      </div>

      {/* Spacer for overflowing photo + identity info */}
      <div className="pt-14 sm:pt-16 lg:pt-20 px-[var(--space-md)] sm:px-[var(--space-lg)]">
        {/* Name */}
        <h1 className="font-display text-xl sm:text-3xl lg:text-4xl font-semibold text-[var(--color-ink)] leading-tight">
          {name}
        </h1>

        {/* Badges */}
        {(verified || isFoundingOperator) && (
          <div className="flex flex-row flex-wrap items-center gap-1.5 sm:gap-[var(--space-sm)] mt-1">
            {verified && (
              <span
                className="
                  inline-flex items-center gap-[var(--space-xs)]
                  px-[var(--space-sm)] py-[var(--space-xs)]
                  bg-[var(--color-confirmed-bg)]
                  text-[var(--color-confirmed)]
                  text-xs font-medium
                  rounded-[var(--radius-sm)]
                  whitespace-nowrap
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
            {isFoundingOperator && (
              <span
                className="
                  inline-flex items-center
                  px-[var(--space-sm)] py-[var(--space-xs)]
                  bg-[var(--color-founding-bg)]
                  text-[var(--color-founding)]
                  text-xs font-medium
                  rounded-[var(--radius-sm)]
                  whitespace-nowrap
                "
              >
                Founding Operator
              </span>
            )}
          </div>
        )}

        {/* Location + guiding since */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-[var(--space-lg)] text-sm text-[var(--color-ink-subtle)] mt-[var(--space-sm)]">
          <div className="flex items-center gap-[var(--space-xs)] whitespace-nowrap">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="flex-shrink-0"
              aria-hidden="true"
            >
              <path d="M8 14s-5-3.5-5-7a5 5 0 1110 0c0 3.5-5 7-5 7z" />
              <circle cx="8" cy="7" r="1.5" />
            </svg>
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center gap-[var(--space-xs)]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="flex-shrink-0"
              aria-hidden="true"
            >
              <rect x="2" y="3" width="12" height="11" rx="1" />
              <path d="M2 6h12M5 1v4M11 1v4" />
            </svg>
            <span>Guiding since {new Date().getFullYear() - yearsExperience}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
