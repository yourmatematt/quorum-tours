interface RatingDistributionProps {
  distribution: number[]; // [1-star count, 2-star count, 3-star count, 4-star count, 5-star count]
  averageRating: number;
  totalReviews: number;
}

export function RatingDistribution({
  distribution,
  averageRating,
  totalReviews,
}: RatingDistributionProps) {
  const maxCount = Math.max(...distribution);

  return (
    <div className="
      bg-[var(--color-surface-raised)]
      border border-[var(--color-border)]
      rounded-[var(--radius-lg)]
      p-[var(--space-lg)]
    ">
      <div className="flex flex-col sm:flex-row gap-[var(--space-xl)]">
        {/* Summary */}
        <div className="flex-shrink-0 text-center sm:text-left">
          <div className="font-mono text-[var(--text-2xl)] text-[var(--color-ink)]">
            {averageRating.toFixed(1)}
          </div>
          <div className="text-sm text-[var(--color-ink-muted)]">
            Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
          </div>
        </div>

        {/* Histogram */}
        <div className="flex-1">
          <div
            className="space-y-[var(--space-xs)]"
            role="img"
            aria-label={`Rating distribution: ${distribution.map((count, i) => `${5 - i} stars: ${count} reviews`).join(', ')}`}
          >
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = distribution[stars - 1];
              const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;

              return (
                <div key={stars} className="flex items-center gap-[var(--space-sm)]">
                  <span className="text-xs text-[var(--color-ink-muted)] w-4 text-right">
                    {stars}
                  </span>
                  <div
                    className="
                      flex-1 h-2
                      bg-[var(--color-surface-sunken)]
                      rounded-[var(--radius-sm)]
                      overflow-hidden
                    "
                  >
                    <div
                      className="h-full bg-[var(--color-accent)] rounded-[var(--radius-sm)]"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-[var(--color-ink-subtle)] w-6 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
