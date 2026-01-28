import Link from 'next/link';

type FlowType = 'join' | 'interest';

interface SuccessMessageProps {
  flowType: FlowType;
  tourName: string;
  tourDate: string;
  email: string;
  currentParticipants?: number;
  quorum?: number;
}

/**
 * SuccessMessage - Confirmation after successful commitment
 *
 * Calm, informative confirmation without celebration animations.
 * Clear next steps and path to manage commitment.
 *
 * Per IA: "NO confetti or celebration animations"
 */
export function SuccessMessage({
  flowType,
  tourName,
  tourDate,
  email,
  currentParticipants,
  quorum,
}: SuccessMessageProps) {
  const isJoin = flowType === 'join';

  return (
    <div className="text-center">
      {/* Success Icon */}
      <div
        className="
          w-16 h-16 mx-auto mb-[var(--space-lg)]
          flex items-center justify-center
          bg-[var(--color-confirmed-bg)]
          rounded-full
        "
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          stroke="var(--color-confirmed)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M8 16l6 6 10-12" />
        </svg>
      </div>

      {/* Primary Message */}
      <h1
        className="
          font-display
          text-[var(--text-2xl)] sm:text-[var(--text-3xl)]
          text-[var(--color-ink)]
          mb-[var(--space-sm)]
        "
      >
        {isJoin ? "You're in!" : 'Interest registered!'}
      </h1>

      {/* Secondary Message */}
      <p className="text-[var(--color-ink-muted)] mb-[var(--space-2xl)]">
        {isJoin ? (
          <>Your spot on <strong className="text-[var(--color-ink)]">{tourName}</strong> is reserved.</>
        ) : (
          <>You&apos;ve expressed interest in <strong className="text-[var(--color-ink)]">{tourName}</strong>.</>
        )}
      </p>

      {/* What's Next Section */}
      <div
        className="
          bg-[var(--color-surface-raised)]
          border border-[var(--color-border)]
          rounded-[var(--radius-lg)]
          p-[var(--space-lg)]
          text-left
          mb-[var(--space-2xl)]
        "
      >
        <h2
          className="
            font-display
            text-[var(--text-lg)]
            text-[var(--color-ink)]
            mb-[var(--space-md)]
          "
        >
          What&apos;s next
        </h2>

        {isJoin ? (
          <ul className="space-y-[var(--space-sm)] text-[var(--text-sm)] text-[var(--color-ink-muted)]">
            <li className="flex items-start gap-[var(--space-sm)]">
              <span className="text-[var(--color-confirmed)] mt-0.5">✓</span>
              <span>Confirmation email sent to <strong className="text-[var(--color-ink)]">{email}</strong></span>
            </li>
            <li className="flex items-start gap-[var(--space-sm)]">
              <span className="text-[var(--color-confirmed)] mt-0.5">✓</span>
              <span>Tour details and instructions will be sent closer to {tourDate}</span>
            </li>
            <li className="flex items-start gap-[var(--space-sm)]">
              <span className="text-[var(--color-confirmed)] mt-0.5">✓</span>
              <span>You can manage your booking from your profile</span>
            </li>
          </ul>
        ) : (
          <ul className="space-y-[var(--space-sm)] text-[var(--text-sm)] text-[var(--color-ink-muted)]">
            <li className="flex items-start gap-[var(--space-sm)]">
              <span className="text-[var(--color-forming)] mt-0.5">•</span>
              <span>We&apos;ll email you at <strong className="text-[var(--color-ink)]">{email}</strong> when the tour confirms</span>
            </li>
            {currentParticipants !== undefined && quorum !== undefined && (
              <li className="flex items-start gap-[var(--space-sm)]">
                <span className="text-[var(--color-forming)] mt-0.5">•</span>
                <span>
                  Current progress: <strong className="text-[var(--color-ink)]">{currentParticipants}</strong> of <strong className="text-[var(--color-ink)]">{quorum}</strong> participants
                </span>
              </li>
            )}
            <li className="flex items-start gap-[var(--space-sm)]">
              <span className="text-[var(--color-forming)] mt-0.5">•</span>
              <span>You can withdraw anytime from your profile</span>
            </li>
          </ul>
        )}
      </div>

      {/* Action Links */}
      <div className="flex flex-col sm:flex-row gap-[var(--space-md)] justify-center">
        <Link
          href="/profile"
          className="
            inline-flex items-center justify-center
            h-12
            px-[var(--space-xl)]
            text-[var(--text-sm)]
            font-medium
            text-white
            bg-[var(--color-accent)]
            rounded-[var(--radius-md)]
            hover:opacity-90
            focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2
            transition-opacity duration-[var(--transition-fast)]
          "
        >
          View in Your Profile
        </Link>
        <Link
          href="/tours"
          className="
            inline-flex items-center justify-center
            h-12
            px-[var(--space-xl)]
            text-[var(--text-sm)]
            font-medium
            text-[var(--color-accent)]
            bg-transparent
            border border-[var(--color-accent)]
            rounded-[var(--radius-md)]
            hover:bg-[var(--color-accent)] hover:text-white
            focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2
            transition-colors duration-[var(--transition-fast)]
          "
        >
          Browse More Tours
        </Link>
      </div>
    </div>
  );
}
