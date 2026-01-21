/**
 * Booking Progress Dashboard Section
 * Real-time threshold visualization and commitment activity
 */

interface ProgressMetric {
  tourId: string;
  tourTitle: string;
  current: number;
  threshold: number;
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
      threshold: 6,
      recentActivity: '2 commitments in last 48 hours',
      trend: 'up',
    },
    {
      tourId: 'tour-004',
      tourTitle: 'Costa Rica Cloud Forest',
      current: 2,
      threshold: 8,
      recentActivity: 'No recent activity',
      trend: 'stable',
    },
  ];

  const trendColors = {
    up: 'text-confirmed',
    stable: 'text-forming',
    down: 'text-red-600',
  };

  const trendIcons = {
    up: '↗',
    stable: '→',
    down: '↘',
  };

  return (
    <section className="bg-surface-raised border border-border rounded-lg p-6">
      <h2 className="font-display text-xl font-semibold text-ink mb-6">
        Booking Progress
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {progressMetrics.map((metric) => (
          <div
            key={metric.tourId}
            className="border border-border rounded-lg p-4 bg-surface"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-ink">{metric.tourTitle}</h3>
              <span
                className={`font-mono text-lg font-semibold ${trendColors[metric.trend]}`}
              >
                {trendIcons[metric.trend]}
              </span>
            </div>

            <div className="mb-3" aria-live="polite" aria-atomic="true">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-mono text-2xl font-semibold text-ink">
                  {metric.current}
                </span>
                <span className="text-sm text-ink-muted">
                  of {metric.threshold} needed
                </span>
              </div>
              <div className="w-full bg-surface-sunken rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-forming"
                  style={{
                    width: `${(metric.current / metric.threshold) * 100}%`,
                  }}
                />
              </div>
            </div>

            <p className="text-xs text-ink-muted">{metric.recentActivity}</p>
          </div>
        ))}
      </div>

      {progressMetrics.length === 0 && (
        <div className="border border-border rounded-md p-8 text-center text-ink-muted">
          No active tours with pending bookings
        </div>
      )}
    </section>
  );
}
