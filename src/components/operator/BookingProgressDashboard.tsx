/**
 * Booking Progress Dashboard Section
 * Real-time quorum visualization and commitment activity
 */

interface ProgressMetric {
  tourId: string;
  tourTitle: string;
  current: number;
  quorum: number;
  recentActivity: string;
  trend: 'up' | 'stable' | 'down';
}

export function BookingProgressDashboard() {
  // Mock data
  const progressMetrics: ProgressMetric[] = [
    {
      tourId: 'tour-001',
      tourTitle: 'Patagonian Endemics',
      current: 4,
      quorum: 6,
      recentActivity: '2 commitments in last 48 hours',
      trend: 'up',
    },
    {
      tourId: 'tour-004',
      tourTitle: 'Costa Rica Cloud Forest',
      current: 2,
      quorum: 8,
      recentActivity: 'No recent activity',
      trend: 'stable',
    },
  ];

  const trendColors = {
    up: 'text-[var(--color-confirmed)]',
    stable: 'text-[var(--color-forming)]',
    down: 'text-[var(--color-destructive)]',
  };

  const trendIcons = {
    up: '↗',
    stable: '→',
    down: '↘',
  };

  return (
    <section className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)] p-6">
      <h2 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-6">
        Booking Progress
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {progressMetrics.map((metric) => (
          <div
            key={metric.tourId}
            className="border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-4 bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-[var(--color-ink)]">{metric.tourTitle}</h3>
              <span
                className={`font-mono text-lg font-semibold ${trendColors[metric.trend]}`}
              >
                {trendIcons[metric.trend]}
              </span>
            </div>

            <div className="mb-3" aria-live="polite" aria-atomic="true">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-mono text-2xl font-semibold text-[var(--color-ink)]">
                  {metric.current}
                </span>
                <span className="text-sm text-[var(--color-ink-muted)]">
                  of {metric.quorum} needed
                </span>
              </div>
              <div className="w-full bg-[var(--color-surface-sunken)] rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-[var(--color-forming)]"
                  style={{
                    width: `${(metric.current / metric.quorum) * 100}%`,
                  }}
                />
              </div>
            </div>

            <p className="text-xs text-[var(--color-ink-muted)]">{metric.recentActivity}</p>
          </div>
        ))}
      </div>

      {progressMetrics.length === 0 && (
        <div className="border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-8 text-center text-[var(--color-ink-muted)]">
          No active tours with pending bookings
        </div>
      )}
    </section>
  );
}
