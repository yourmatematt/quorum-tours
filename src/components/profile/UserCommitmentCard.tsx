import { ConfirmationStatusBadge } from '../ui/ConfirmationStatusBadge';

type CommitmentStatus = 'confirmed' | 'forming' | 'not-running';

interface UserCommitmentCardProps {
  tourId: string;
  tourName: string;
  tourDates: string;
  operatorId: string;
  operatorName: string;
  location: string;
  status: CommitmentStatus;
  currentParticipants: number;
  threshold: number;
}

/**
 * UserCommitmentCard - Individual commitment display for profile
 *
 * Shows tour the user has committed to with confirmation status.
 * Human-readable participant counts ("4 of 6 participants").
 * No urgency language or countdown pressure.
 *
 * Per IA: "What happens next" mini-explanation for non-confirmed tours
 */
export function UserCommitmentCard({
  tourId,
  tourName,
  tourDates,
  operatorId,
  operatorName,
  location,
  status,
  currentParticipants,
  threshold,
}: UserCommitmentCardProps) {
  const isConfirmed = status === 'confirmed';
  const isNotRunning = status === 'not-running';

  return (
    <div
      className="
        bg-[var(--color-surface-raised)]
        border border-[var(--color-border)]
        rounded-[var(--radius-lg)]
        p-[var(--space-lg)]
        transition-colors duration-[var(--transition-normal)]
        hover:border-[var(--color-border-strong)]
      "
    >
      {/* Tour name and status */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-[var(--space-sm)] mb-[var(--space-md)]">
        <a
          href={`/tours/${tourId}`}
          className="
            font-display
            text-[var(--text-lg)]
            text-[var(--color-ink)]
            hover:text-[var(--color-accent)]
            transition-colors duration-[var(--transition-fast)]
          "
        >
          {tourName}
        </a>
        <ConfirmationStatusBadge status={status} />
      </div>

      {/* Tour details */}
      <div className="space-y-[var(--space-xs)] mb-[var(--space-md)]">
        <p className="text-[var(--text-sm)] text-[var(--color-ink-muted)]">
          {tourDates} · {location}
        </p>
        <p className="text-[var(--text-sm)] text-[var(--color-ink-muted)]">
          <a
            href={`/operators/${operatorId}`}
            className="hover:text-[var(--color-accent)] transition-colors duration-[var(--transition-fast)]"
          >
            {operatorName}
          </a>
        </p>
      </div>

      {/* Participant count - human readable, not percentage */}
      <div className="mb-[var(--space-md)]">
        {isConfirmed ? (
          <p className="text-[var(--text-sm)] text-[var(--color-confirmed)]">
            Confirmed with {currentParticipants} participants
          </p>
        ) : isNotRunning ? (
          <p className="text-[var(--text-sm)] text-[var(--color-ink-subtle)]">
            Did not reach threshold
          </p>
        ) : (
          <p className="text-[var(--text-sm)] text-[var(--color-ink-muted)]">
            <span className="font-mono font-medium text-[var(--color-ink)]">
              {currentParticipants}
            </span>{' '}
            of{' '}
            <span className="font-mono">{threshold}</span>{' '}
            participants
          </p>
        )}
      </div>

      {/* Progress bar for forming tours only */}
      {status === 'forming' && (
        <div className="mb-[var(--space-md)]">
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

      {/* "What happens next" for non-confirmed tours */}
      {status === 'forming' && (
        <p className="text-[var(--text-sm)] text-[var(--color-ink-subtle)]">
          Your card is not charged until tour confirms.
        </p>
      )}

      {/* View tour details link */}
      <div className="mt-[var(--space-md)] pt-[var(--space-md)] border-t border-[var(--color-border)]">
        <a
          href={`/tours/${tourId}`}
          className="
            text-[var(--text-sm)]
            text-[var(--color-accent)]
            hover:underline
            focus:outline-none focus:underline
          "
        >
          View tour details →
        </a>
      </div>
    </div>
  );
}
