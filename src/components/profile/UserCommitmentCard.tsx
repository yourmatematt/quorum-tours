import { ConfirmationStatusBadge } from '../ui/ConfirmationStatusBadge';

type CommitmentStatus = 'confirmed' | 'forming' | 'not-running';

interface UserCommitmentCardProps {
  tourId: string;
  tourName: string;
  tourDates: string;
  operatorId?: string; // unused but kept for API compatibility
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
  operatorName,
  location,
  status,
  currentParticipants,
  threshold,
}: UserCommitmentCardProps) {
  const isConfirmed = status === 'confirmed';

  return (
    <a
      href={`/tours/${tourId}`}
      className={`
        block bg-[var(--color-surface-raised)] border-2 rounded-[var(--radius-organic)] p-3
        transition-colors cursor-pointer
        ${isConfirmed
          ? 'border-[var(--color-confirmed)]/30 hover:border-[var(--color-confirmed)]'
          : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
        }
      `}
    >
      {/* Header: Name + Status */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-medium text-[var(--color-ink)] truncate">{tourName}</h3>
        <ConfirmationStatusBadge status={status} />
      </div>

      {/* Details */}
      <p className="text-sm text-[var(--color-ink-muted)] mb-2">
        {tourDates} · {location}
      </p>
      <p className="text-xs text-[var(--color-ink-muted)] mb-3">
        {operatorName}
      </p>

      {/* Progress indicator */}
      {status === 'forming' ? (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-[var(--color-surface-sunken)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-forming)] rounded-full"
              style={{ width: `${Math.min((currentParticipants / threshold) * 100, 100)}%` }}
            />
          </div>
          <span className="text-xs text-[var(--color-ink-muted)]">{currentParticipants}/{threshold}</span>
        </div>
      ) : (
        <p className="text-xs text-[var(--color-confirmed)]">
          {currentParticipants} participants confirmed
        </p>
      )}
    </a>
  );
}
