/**
 * Revenue Dashboard Section
 * Financial tracking with explicit escrowed vs paid distinction
 */

interface RevenueBreakdown {
  tourTitle: string;
  status: 'forming' | 'confirmed' | 'completed';
  escrowedAmount: number;
  escrowedCount: number;
  confirmedAmount: number;
  confirmedCount: number;
  paidAmount: number;
  nextPayoutDate?: string;
}

export function RevenueDashboard() {
  // Mock data
  const revenueData: RevenueBreakdown[] = [
    {
      tourTitle: 'Patagonian Endemics',
      status: 'forming',
      escrowedAmount: 1800,
      escrowedCount: 4,
      confirmedAmount: 0,
      confirmedCount: 0,
      paidAmount: 0,
    },
    {
      tourTitle: 'Spring Migration - Gulf Coast',
      status: 'confirmed',
      escrowedAmount: 0,
      escrowedCount: 0,
      confirmedAmount: 3200,
      confirmedCount: 10,
      paidAmount: 0,
      nextPayoutDate: '2026-04-17',
    },
  ];

  const platformCommission = 0.10; // 10%
  const totalEscrowed = revenueData.reduce((sum, r) => sum + r.escrowedAmount, 0);
  const totalConfirmed = revenueData.reduce(
    (sum, r) => sum + r.confirmedAmount,
    0
  );
  const totalPaid = revenueData.reduce((sum, r) => sum + r.paidAmount, 0);

  return (
    <section className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)] p-6">
      <h2 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-6">
        Revenue Dashboard
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-4 bg-[var(--color-surface)]">
          <p className="text-xs text-[var(--color-ink-muted)] mb-1">
            Escrowed (forming tours)
          </p>
          <p className="font-mono text-2xl font-semibold text-[var(--color-forming)]">
            ${totalEscrowed.toLocaleString()}
          </p>
          <p className="text-xs text-[var(--color-ink-muted)] mt-1">
            Held, not yet charged
          </p>
        </div>

        <div className="border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-4 bg-[var(--color-surface)]">
          <p className="text-xs text-[var(--color-ink-muted)] mb-1">
            Confirmed (awaiting payout)
          </p>
          <p className="font-mono text-2xl font-semibold text-[var(--color-confirmed)]">
            ${totalConfirmed.toLocaleString()}
          </p>
          <p className="text-xs text-[var(--color-ink-muted)] mt-1">
            Charged after quorum met
          </p>
        </div>

        <div className="border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-4 bg-[var(--color-surface)]">
          <p className="text-xs text-[var(--color-ink-muted)] mb-1">Paid Out</p>
          <p className="font-mono text-2xl font-semibold text-[var(--color-ink)]">
            ${totalPaid.toLocaleString()}
          </p>
          <p className="text-xs text-[var(--color-ink-muted)] mt-1">Transferred to account</p>
        </div>
      </div>

      {/* Tour Breakdown */}
      <div className="space-y-3">
        <h3 className="font-medium text-[var(--color-ink)] mb-3">By Tour</h3>
        {revenueData.map((tour, index) => (
          <div
            key={index}
            className="border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-4 bg-[var(--color-surface)]"
          >
            <h4 className="font-semibold text-[var(--color-ink)] mb-3">{tour.tourTitle}</h4>

            {tour.status === 'forming' && (
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-[var(--color-ink-muted)]">
                    Escrowed Deposits:
                  </span>
                  <div className="text-right">
                    <span className="font-mono text-lg font-semibold text-[var(--color-forming)]">
                      ${tour.escrowedAmount.toLocaleString()}
                    </span>
                    <span className="text-xs text-[var(--color-ink-muted)] ml-2">
                      ({tour.escrowedCount} × $
                      {(tour.escrowedAmount / tour.escrowedCount).toFixed(0)})
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[var(--color-ink-muted)] italic">
                  Will be charged when quorum is reached
                </p>
              </div>
            )}

            {tour.status === 'confirmed' && (
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-[var(--color-ink-muted)]">
                    Confirmed Revenue:
                  </span>
                  <div className="text-right">
                    <span className="font-mono text-lg font-semibold text-[var(--color-confirmed)]">
                      ${tour.confirmedAmount.toLocaleString()}
                    </span>
                    <span className="text-xs text-[var(--color-ink-muted)] ml-2">
                      ({tour.confirmedCount} participants)
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-baseline text-sm">
                  <span className="text-[var(--color-ink-muted)]">Platform commission (10%):</span>
                  <span className="font-mono text-[var(--color-ink)]">
                    -$
                    {(tour.confirmedAmount * platformCommission).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t-2 border-[var(--color-border)]">
                  <span className="text-sm font-medium text-[var(--color-ink)]">
                    Your payout:
                  </span>
                  <span className="font-mono text-lg font-semibold text-[var(--color-ink)]">
                    $
                    {(
                      tour.confirmedAmount *
                      (1 - platformCommission)
                    ).toLocaleString()}
                  </span>
                </div>
                {tour.nextPayoutDate && (
                  <p className="text-xs text-[var(--color-ink-muted)] mt-2">
                    Scheduled payout:{' '}
                    {new Date(tour.nextPayoutDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}{' '}
                    (7 days after tour completion)
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Stripe Connect Status */}
      <div className="mt-6 pt-6 border-t-2 border-[var(--color-border)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--color-ink)]">Stripe Connect Status</p>
            <p className="text-xs text-[var(--color-ink-muted)] mt-1">
              Payments enabled • Account verified
            </p>
          </div>
          <button className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] py-2 px-2 min-h-[44px]">
            View Stripe Dashboard →
          </button>
        </div>
      </div>
    </section>
  );
}
