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
  quorum: number;
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
        className="font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-tight text-[var(--color-ink)] mb-[var(--space-md)]"
      >
        Your Commitments
      </h2>

      {hasCommitments ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
              quorum={commitment.quorum}
            />
          ))}
        </div>
      ) : (
        /* Empty state - compact */
        <div className="bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-6 text-center">
          <p className="text-[var(--color-ink-muted)] mb-3">
            No active commitments yet.
          </p>
          <a
            href="/tours"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary)] rounded-[var(--radius-organic)] hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            Browse tours
          </a>
        </div>
      )}
    </section>
  );
}
