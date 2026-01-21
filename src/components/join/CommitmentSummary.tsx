type ConfirmationStatus = 'confirmed' | 'forming';

interface CommitmentSummaryProps {
  status: ConfirmationStatus;
  tourName: string;
  tourDate: string;
  price: number;
  cancellationDeadline?: string;
}

/**
 * CommitmentSummary - What user is agreeing to
 *
 * Crystal clear explanation of commitment terms.
 * Cancellation policy visible BEFORE the CTA, not buried.
 *
 * Per IA: "No hidden terms or buried conditions"
 */
export function CommitmentSummary({
  status,
  tourName,
  tourDate,
  price,
  cancellationDeadline,
}: CommitmentSummaryProps) {
  const isConfirmed = status === 'confirmed';

  return (
    <div
      className="
        bg-[var(--color-surface-sunken)]
        border border-[var(--color-border)]
        rounded-[var(--radius-lg)]
        p-[var(--space-lg)]
      "
    >
      <h3
        className="
          font-display
          text-[var(--text-lg)]
          text-[var(--color-ink)]
          mb-[var(--space-md)]
        "
      >
        What you&apos;re agreeing to
      </h3>

      {isConfirmed ? (
        /* Confirmed Tour Summary */
        <div className="space-y-[var(--space-sm)]">
          <ul className="space-y-[var(--space-sm)] text-[var(--text-sm)] text-[var(--color-ink-muted)]">
            <li className="flex items-start gap-[var(--space-sm)]">
              <span className="text-[var(--color-confirmed)] mt-0.5">•</span>
              <span>
                Your spot on <strong className="text-[var(--color-ink)]">{tourName}</strong> on {tourDate} is reserved
              </span>
            </li>
            <li className="flex items-start gap-[var(--space-sm)]">
              <span className="text-[var(--color-confirmed)] mt-0.5">•</span>
              <span>
                Your card will be charged <strong className="text-[var(--color-ink)]">${price}</strong> upon confirmation
              </span>
            </li>
            {cancellationDeadline && (
              <li className="flex items-start gap-[var(--space-sm)]">
                <span className="text-[var(--color-confirmed)] mt-0.5">•</span>
                <span>
                  You can cancel with full refund until {cancellationDeadline}
                </span>
              </li>
            )}
          </ul>

          {/* Cancellation Policy */}
          <div
            className="
              mt-[var(--space-md)]
              pt-[var(--space-md)]
              border-t border-[var(--color-border)]
            "
          >
            <p className="text-[var(--text-sm)] font-medium text-[var(--color-ink)] mb-[var(--space-xs)]">
              If you need to cancel:
            </p>
            <ul className="text-[var(--text-sm)] text-[var(--color-ink-muted)] space-y-[var(--space-xs)]">
              {cancellationDeadline && (
                <li>Before {cancellationDeadline}: Full refund</li>
              )}
              <li>After deadline: Contact operator for options</li>
            </ul>
          </div>
        </div>
      ) : (
        /* Forming Tour Summary */
        <div className="space-y-[var(--space-sm)]">
          <ul className="space-y-[var(--space-sm)] text-[var(--text-sm)] text-[var(--color-ink-muted)]">
            <li className="flex items-start gap-[var(--space-sm)]">
              <span className="text-[var(--color-forming)] mt-0.5">•</span>
              <span>
                Your interest in <strong className="text-[var(--color-ink)]">{tourName}</strong> is registered
              </span>
            </li>
            <li className="flex items-start gap-[var(--space-sm)]">
              <span className="text-[var(--color-forming)] mt-0.5">•</span>
              <span>
                You&apos;ll be notified when the tour reaches its threshold
              </span>
            </li>
            <li className="flex items-start gap-[var(--space-sm)]">
              <span className="text-[var(--color-forming)] mt-0.5">•</span>
              <span>
                You can withdraw your interest anytime before confirmation
              </span>
            </li>
            <li className="flex items-start gap-[var(--space-sm)]">
              <span className="text-[var(--color-forming)] mt-0.5">•</span>
              <span>
                <strong className="text-[var(--color-ink)]">No payment required</strong> until the tour confirms
              </span>
            </li>
          </ul>

          {/* What happens next */}
          <div
            className="
              mt-[var(--space-md)]
              pt-[var(--space-md)]
              border-t border-[var(--color-border)]
            "
          >
            <p className="text-[var(--text-sm)] font-medium text-[var(--color-ink)] mb-[var(--space-xs)]">
              If the tour confirms:
            </p>
            <ul className="text-[var(--text-sm)] text-[var(--color-ink-muted)] space-y-[var(--space-xs)]">
              <li>You&apos;ll receive an email to complete your booking</li>
              <li>You&apos;ll have 48 hours to confirm or release your spot</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
