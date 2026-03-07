'use client';

type TrustTier = 'new' | 'trusted' | 'strike-1' | 'strike-2' | 'suspended';

interface DepositSectionProps {
  price: number;
  deposit: number;
  trustTier?: TrustTier | null;
}

/**
 * DepositSection - Shows payment breakdown for forming tours
 *
 * Makes the two-stage payment process clear:
 * 1. Deposit now (to secure commitment)
 * 2. Balance after tour confirms
 *
 * Uses actual deposit amount from tour settings (database),
 * not calculated from trust tier.
 */
const trustTierLabels: Record<TrustTier, string> = {
  'new': 'First-time birder deposit',
  'trusted': 'No deposit required',
  'strike-1': 'Deposit required (1 strike)',
  'strike-2': 'Higher deposit required (2 strikes)',
  'suspended': 'Account suspended',
};

export function DepositSection({
  price,
  deposit,
  trustTier,
}: DepositSectionProps) {
  const balance = price - deposit;
  const depositPercent = Math.round((deposit / price) * 100);

  return (
    <div
      className="
        bg-[var(--color-surface-raised)]
        border-2 border-[var(--color-border)]
        rounded-[var(--radius-organic)]
        p-[var(--space-lg)]
        shadow-[var(--shadow-card)]
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
        Payment breakdown
      </h3>

      {/* Trust tier context */}
      {trustTier && trustTier !== 'trusted' && (
        <div className="
          flex items-center gap-[var(--space-sm)]
          mb-[var(--space-md)]
          px-[var(--space-md)] py-[var(--space-sm)]
          bg-[var(--color-surface-sunken)]
          rounded-[var(--radius-sm)]
          border border-[var(--color-border)]
        ">
          <span className="text-sm text-[var(--color-ink-muted)]">
            {trustTierLabels[trustTier]}
          </span>
          <span className="text-[var(--color-ink-subtle)]">·</span>
          <a
            href="/how-it-works#trust-system"
            className="text-sm text-[var(--color-primary)] hover:underline"
          >
            How trust tiers work
          </a>
        </div>
      )}

      {/* Payment breakdown */}
      <div className="space-y-[var(--space-sm)] mb-[var(--space-lg)]">
        {/* Deposit now */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--color-ink-muted)]">
            Deposit now ({depositPercent}%)
          </span>
          <span className="font-mono font-medium text-[var(--color-ink)]">
            ${deposit}
          </span>
        </div>

        {/* Balance later */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--color-ink-muted)]">
            Balance when tour confirms
          </span>
          <span className="font-mono text-[var(--color-ink-muted)]">
            ${balance}
          </span>
        </div>

        {/* Divider and total */}
        <div className="border-t border-[var(--color-border)] pt-[var(--space-sm)]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-ink)]">
              Total
            </span>
            <span className="font-mono font-medium text-[var(--color-ink)]">
              ${price}
            </span>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <p className="text-sm text-[var(--color-ink-subtle)] mb-[var(--space-md)]">
        Your deposit secures your spot and helps the operator plan with confidence.
        It's applied to your total—not an extra fee.
      </p>

      {/* How payment works */}
      <div
        className="
          p-[var(--space-md)]
          bg-[var(--color-surface-sunken)]
          rounded-[var(--radius-md)]
          border border-[var(--color-border)]
        "
      >
        <p className="text-sm font-medium text-[var(--color-ink)] mb-[var(--space-sm)]">
          How it works
        </p>
        <ol className="text-sm text-[var(--color-ink-muted)] space-y-[var(--space-xs)]">
          <li className="flex gap-[var(--space-sm)]">
            <span className="font-mono text-[var(--color-primary)]">1.</span>
            <span>Your deposit (${deposit}) is collected now</span>
          </li>
          <li className="flex gap-[var(--space-sm)]">
            <span className="font-mono text-[var(--color-primary)]">2.</span>
            <span>Tour reaches quorum and confirms</span>
          </li>
          <li className="flex gap-[var(--space-sm)]">
            <span className="font-mono text-[var(--color-primary)]">3.</span>
            <span>You pay the remaining ${balance} to finalize your booking</span>
          </li>
        </ol>

        <p className="text-xs text-[var(--color-ink-subtle)] mt-[var(--space-sm)] pt-[var(--space-sm)] border-t border-[var(--color-border)]">
          If the tour doesn't reach quorum, your deposit is fully refunded.
        </p>
      </div>
    </div>
  );
}
