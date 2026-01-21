import { ConfirmationStatusBadge } from '../ui/ConfirmationStatusBadge';

type ConfirmationStatus = 'confirmed' | 'forming' | 'not-running';

interface TourConfirmationSummaryProps {
  tourName: string;
  tourDates: string;
  location: string;
  operatorName: string;
  status: ConfirmationStatus;
  currentParticipants: number;
  threshold: number;
}

/**
 * TourConfirmationSummary - Tour context card for join flow
 *
 * Confirms user is committing to the correct tour.
 * Shows current confirmation status and participant progress.
 *
 * Per IA: "Reinforce what they're joining" without urgency.
 */
export function TourConfirmationSummary({
  tourName,
  tourDates,
  location,
  operatorName,
  status,
  currentParticipants,
  threshold,
}: TourConfirmationSummaryProps) {
  const isConfirmed = status === 'confirmed';

  return (
    <div
      className="
        bg-[var(--color-surface-raised)]
        border border-[var(--color-border)]
        rounded-[var(--radius-lg)]
        p-[var(--space-lg)]
      "
    >
      {/* Tour Name and Status */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-[var(--space-sm)] mb-[var(--space-md)]">
        <h2
          className="
            font-display
            text-[var(--text-xl)]
            text-[var(--color-ink)]
          "
        >
          {tourName}
        </h2>
        <ConfirmationStatusBadge status={status} />
      </div>

      {/* Tour Details */}
      <div className="space-y-[var(--space-xs)] mb-[var(--space-md)]">
        <p className="text-[var(--text-sm)] text-[var(--color-ink-muted)]">
          {tourDates} · {location}
        </p>
        <p className="text-[var(--text-sm)] text-[var(--color-ink-muted)]">
          Led by {operatorName}
        </p>
      </div>

      {/* Participant Progress */}
      <div
        className="
          pt-[var(--space-md)]
          border-t border-[var(--color-border)]
        "
      >
        {isConfirmed ? (
          <p className="text-[var(--text-sm)] text-[var(--color-confirmed)]">
            Tour confirmed with {currentParticipants} participants
          </p>
        ) : (
          <div>
            <p className="text-[var(--text-sm)] text-[var(--color-ink-muted)] mb-[var(--space-sm)]">
              <span className="font-mono font-medium text-[var(--color-ink)]">
                {currentParticipants}
              </span>{' '}
              of{' '}
              <span className="font-mono">{threshold}</span>{' '}
              participants needed to confirm
            </p>
            {/* Progress bar */}
            <div
              className="
                w-full h-2
                bg-[var(--color-surface-sunken)]
                rounded-[var(--radius-pill)]
                overflow-hidden
              "
              role="progressbar"
              aria-valuenow={currentParticipants}
              aria-valuemin={0}
              aria-valuemax={threshold}
              aria-label={`${currentParticipants} of ${threshold} participants`}
            >
              <div
                className="h-full rounded-[var(--radius-pill)] transition-all duration-500 ease-out"
                style={{
                  width: `${Math.min((currentParticipants / threshold) * 100, 100)}%`,
                  backgroundColor: 'var(--color-forming)',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
