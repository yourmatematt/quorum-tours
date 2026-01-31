'use client';

interface ChaseListMatchAlertProps {
  /** The species name that was matched */
  speciesName: string;
  /** The tour name where the species appears */
  tourName: string;
  /** Optional: Link to the tour */
  tourId?: string;
  /** Additional context about the match */
  context?: string;
}

/**
 * ChaseListMatchAlert - Amber notification for chase list matches
 *
 * Design per spec:
 * - Warm amber background
 * - Bell icon
 * - Shows when chase list species matches a booked/new tour
 */
export function ChaseListMatchAlert({
  speciesName,
  tourName,
  tourId,
  context,
}: ChaseListMatchAlertProps) {
  return (
    <div className="bg-[var(--color-forming-bg)] border border-[var(--color-warning-border)] rounded-[var(--radius-organic)] p-3">
      <div className="flex gap-3">
        {/* Bell icon */}
        <div className="flex-shrink-0 mt-0.5">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-[var(--color-forming)]"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[var(--color-warning-text)]">
            Chase List Match
          </p>
          <p className="text-sm text-[var(--color-ink)] mt-0.5">
            {context ? (
              context
            ) : (
              <>
                A new tour targeting <strong>{speciesName}</strong> was just listed
                {tourId ? (
                  <>
                    {' '}in the{' '}
                    <a
                      href={`/tours/${tourId}`}
                      className="text-[var(--color-primary)] hover:underline"
                    >
                      {tourName}
                    </a>
                  </>
                ) : (
                  <> in the {tourName}</>
                )}
                . Your Kakadu trip already covers this — you're set.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
