import { UserCommitmentCard } from './UserCommitmentCard';

type CommitmentStatus = 'confirmed' | 'forming' | 'not-running';

interface Commitment {
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

interface CommitmentsSectionProps {
  commitments: Commitment[];
}

/**
 * CommitmentsSection - Active tour commitments container
 *
 * Primary section of the profile page. Shows all tours
 * the user has committed to with their confirmation status.
 *
 * Per IA: "Clear message when empty, no sad illustrations"
 */
export function CommitmentsSection({ commitments }: CommitmentsSectionProps) {
  const hasCommitments = commitments.length > 0;

  return (
    <section aria-labelledby="commitments-heading">
      <h2
        id="commitments-heading"
        className="
          font-display
          text-[var(--text-xl)]
          text-[var(--color-ink)]
          mb-[var(--space-lg)]
        "
      >
        Your Commitments
      </h2>

      {hasCommitments ? (
        <div className="space-y-[var(--space-md)]">
          {commitments.map((commitment) => (
            <UserCommitmentCard
              key={commitment.tourId}
              tourId={commitment.tourId}
              tourName={commitment.tourName}
              tourDates={commitment.tourDates}
              operatorId={commitment.operatorId}
              operatorName={commitment.operatorName}
              location={commitment.location}
              status={commitment.status}
              currentParticipants={commitment.currentParticipants}
              threshold={commitment.threshold}
            />
          ))}
        </div>
      ) : (
        /* Empty state - no sad illustrations, clear guidance */
        <div
          className="
            bg-[var(--color-surface-raised)]
            border border-[var(--color-border)]
            rounded-[var(--radius-lg)]
            p-[var(--space-xl)] sm:p-[var(--space-2xl)]
            text-center
          "
        >
          {/* Simple icon - not a sad illustration */}
          <div
            className="
              w-12 h-12 mx-auto mb-[var(--space-lg)]
              flex items-center justify-center
              bg-[var(--color-surface-sunken)]
              rounded-full
              text-[var(--color-ink-subtle)]
            "
            aria-hidden="true"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M3 10h18" />
              <path d="M8 2v4M16 2v4" />
            </svg>
          </div>

          <h3
            className="
              font-display
              text-[var(--text-lg)]
              text-[var(--color-ink)]
              mb-[var(--space-sm)]
            "
          >
            No active commitments
          </h3>

          <p className="text-[var(--color-ink-muted)] mb-[var(--space-lg)] max-w-[40ch] mx-auto">
            When you commit to tours, they&apos;ll appear here. Your commitments
            show tour status and confirmation progress.
          </p>

          <a
            href="/tours"
            className="
              inline-flex items-center justify-center
              h-10
              px-[var(--space-lg)]
              text-[var(--text-sm)]
              font-medium
              text-[var(--color-accent)]
              bg-transparent
              border border-[var(--color-accent)]
              rounded-[var(--radius-md)]
              hover:bg-[var(--color-accent)] hover:text-white
              focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2
              transition-colors duration-[var(--transition-normal)]
            "
          >
            Browse tours
          </a>
        </div>
      )}
    </section>
  );
}
