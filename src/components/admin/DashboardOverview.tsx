/**
 * Dashboard Overview Section
 * Displays critical alerts, platform health summary, and quick action shortcuts
 */

interface Alert {
  id: string;
  level: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  actionLabel?: string;
}

interface HealthMetric {
  label: string;
  value: string | number;
  status: 'healthy' | 'warning' | 'critical';
}

export function DashboardOverview() {
  // Mock data - would come from API
  const criticalAlerts: Alert[] = [
    {
      id: '1',
      level: 'critical',
      message: 'Payment processing error on 3 operator payouts',
      timestamp: '5 minutes ago',
      actionLabel: 'Review Payouts',
    },
    {
      id: '2',
      level: 'warning',
      message: '12 operator credentials expiring within 7 days',
      timestamp: '1 hour ago',
      actionLabel: 'View Expiring',
    },
  ];

  const healthMetrics: HealthMetric[] = [
    { label: 'Tours Active', value: 47, status: 'healthy' },
    { label: 'Operators Pending Verification', value: 8, status: 'warning' },
    { label: 'System Status', value: 'Operational', status: 'healthy' },
    { label: 'Active Users (24h)', value: 1243, status: 'healthy' },
  ];

  const alertLevelStyles = {
    critical: 'border-l-4 border-red-600 bg-red-50',
    warning: 'border-l-4 border-forming bg-forming-bg',
    info: 'border-l-4 border-accent bg-blue-50',
  };

  const healthStatusStyles = {
    healthy: 'text-confirmed',
    warning: 'text-forming',
    critical: 'text-red-600',
  };

  return (
    <section className="bg-surface-raised border border-border rounded-lg p-6">
      <h2 className="font-display text-xl font-semibold text-ink mb-6">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Alerts */}
        <div>
          <h3 className="font-medium text-ink mb-4">Critical Alerts</h3>
          {criticalAlerts.length === 0 ? (
            <div className="border border-border rounded-md p-4 text-center text-ink-muted">
              No critical alerts
            </div>
          ) : (
            <div className="space-y-3">
              {criticalAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`${alertLevelStyles[alert.level]} rounded-md p-4`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-ink">
                        {alert.message}
                      </p>
                      <p className="text-xs text-ink-muted mt-1">
                        {alert.timestamp}
                      </p>
                    </div>
                    {alert.actionLabel && (
                      <button className="text-sm font-medium text-accent hover:text-accent-hover ml-4">
                        {alert.actionLabel} →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Platform Health Summary */}
        <div>
          <h3 className="font-medium text-ink mb-4">Platform Health</h3>
          <div className="grid grid-cols-2 gap-4">
            {healthMetrics.map((metric, index) => (
              <div
                key={index}
                className="border border-border rounded-md p-4 bg-surface"
              >
                <p className="text-xs text-ink-muted mb-1">{metric.label}</p>
                <p
                  className={`font-mono text-lg font-semibold ${healthStatusStyles[metric.status]}`}
                >
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="font-medium text-ink mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 text-sm font-medium text-ink bg-surface border border-border-strong rounded-md hover:border-accent hover:text-accent transition-colors">
            Review Pending Operators
          </button>
          <button className="px-4 py-2 text-sm font-medium text-ink bg-surface border border-border-strong rounded-md hover:border-accent hover:text-accent transition-colors">
            View Flagged Content
          </button>
          <button className="px-4 py-2 text-sm font-medium text-ink bg-surface border border-border-strong rounded-md hover:border-accent hover:text-accent transition-colors">
            Export Reports
          </button>
        </div>
      </div>
    </section>
  );
}
