type ConfirmationStatus = 'confirmed' | 'forming';

interface CommitmentSummaryProps {
  status: ConfirmationStatus;
  tourName: string;
  tourDate: string;
  price: number;
  deposit?: number;
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
  deposit = 0,
  cancellationDeadline,
}: CommitmentSummaryProps) {
  const isConfirmed = status === 'confirmed';
  const requiresDeposit = deposit > 0;
  const balance = price - deposit;

  return (
    <div
      className="
        bg-[var(--color-surface-sunken)]
        border-2 border-[var(--color-border)]
        rounded-[var(--radius-organic)]
        p-[var(--space-lg)]
      "
    >
      <h3
        className="
          font-display
          text-lg
          font-semibold
          text-[var(--color-ink)]
          mb-[var(--space-md)]
        "
      >
        What you&apos;re agreeing to
      </h3>

      {isConfirmed ? (
        /* Confirmed Tour Summary */
        <div className="space-y-[var(--space-sm)]">
          <ul className="space-y-[var(--space-sm)] text-sm text-[var(--color-ink-muted)]">
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
            <p className="text-sm font-medium text-[var(--color-ink)] mb-[var(--space-xs)]">
              If you need to cancel:
            </p>
            <ul className="text-sm text-[var(--color-ink-muted)] space-y-[var(--space-xs)]">
              {cancellationDeadline && (
                <li>Before {cancellationDeadline}: Full refund</li>
              )}
              <li>After deadline: Contact operator for options</li>
            </ul>
          </div>
        </div>
      ) : requiresDeposit ? (
        /* Forming Tour - Deposit Required */
        <div className="space-y-[var(--space-sm)]">
          <ul className="space-y-[var(--space-sm)] text-sm text-[var(--color-ink-muted)]">
            <li className="flex items-start gap-[var(--space-sm)]">
              <span className="text-[var(--color-forming)] mt-0.5">•</span>
              <span>
                Your commitment to <strong className="text-[var(--color-ink)]">{tourName}</strong> is registered
              </span>
            </li>
            <li className="flex items-start gap-[var(--space-sm)]">
              <span className="text-[var(--color-forming)] mt-0.5">•</span>
              <span>
                Your <strong className="text-[var(--color-ink)]">${deposit}</strong> deposit secures your spot
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
            <h4
              className="
                font-display
                text-lg
                font-semibold
                text-[var(--color-ink)]
                mb-[var(--space-md)]
              "
            >
              When the tour reaches quorum:
            </h4>
            <ul className="space-y-[var(--space-sm)] text-sm text-[var(--color-ink-muted)]">
              <li className="flex items-start gap-[var(--space-sm)]">
                <span className="text-[var(--color-forming)] mt-0.5">•</span>
                <span>You&apos;ll receive an email with a payment link</span>
              </li>
              <li className="flex items-start gap-[var(--space-sm)]">
                <span className="text-[var(--color-forming)] mt-0.5">•</span>
                <span>You have <strong className="text-[var(--color-ink)]">24 hours</strong> to pay the remaining ${balance}</span>
              </li>
              <li className="flex items-start gap-[var(--space-sm)]">
                <span className="text-[var(--color-forming)] mt-0.5">•</span>
                <span>Your ${deposit} deposit is applied to the total</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        /* Forming Tour - No Deposit (Trusted User) */
        <div className="space-y-[var(--space-sm)]">
          <ul className="space-y-[var(--space-sm)] text-sm text-[var(--color-ink-muted)]">
            <li className="flex items-start gap-[var(--space-sm)]">
              <span className="text-[var(--color-forming)] mt-0.5">•</span>
              <span>
                Your commitment to <strong className="text-[var(--color-ink)]">{tourName}</strong> is registered
              </span>
            </li>
            <li className="flex items-start gap-[var(--space-sm)]">
              <span className="text-[var(--color-forming)] mt-0.5">•</span>
              <span>
                You&apos;ll be notified when the tour reaches quorum
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
            <h4
              className="
                font-display
                text-lg
                font-semibold
                text-[var(--color-ink)]
                mb-[var(--space-md)]
              "
            >
              When the tour reaches quorum:
            </h4>
            <ul className="space-y-[var(--space-sm)] text-sm text-[var(--color-ink-muted)]">
              <li className="flex items-start gap-[var(--space-sm)]">
                <span className="text-[var(--color-forming)] mt-0.5">•</span>
                <span>You&apos;ll receive an email with a payment link</span>
              </li>
              <li className="flex items-start gap-[var(--space-sm)]">
                <span className="text-[var(--color-forming)] mt-0.5">•</span>
                <span>You have <strong className="text-[var(--color-ink)]">24 hours</strong> to pay the full ${price}</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
