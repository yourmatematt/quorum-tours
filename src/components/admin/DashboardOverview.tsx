/**
 * Dashboard Overview Section
 * Displays critical alerts, platform health summary, and quick action shortcuts
 */

import { AdminSection, AdminCard, AdminStatCard } from './AdminSection';

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
    { label: 'Operators Pending', value: 8, status: 'warning' },
    { label: 'System Status', value: 'Operational', status: 'healthy' },
    { label: 'Active Users (24h)', value: '1,243', status: 'healthy' },
  ];

  const alertLevelStyles = {
    critical:
      'border-l-4 border-[var(--color-destructive-border)] bg-[var(--color-destructive-bg)]',
    warning:
      'border-l-4 border-[var(--color-warning-border)] bg-[var(--color-warning-bg)]',
    info: 'border-l-4 border-[var(--color-info-border)] bg-[var(--color-info-bg)]',
  };

  const healthStatusVariants: Record<string, 'confirmed' | 'forming' | 'destructive'> = {
    healthy: 'confirmed',
    warning: 'forming',
    critical: 'destructive',
  };

  return (
    <AdminSection title="Dashboard Overview">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Alerts */}
        <div>
          <h3 className="font-medium text-[var(--color-ink)] mb-4">Critical Alerts</h3>
          {criticalAlerts.length === 0 ? (
            <AdminCard>
              <p className="text-center text-[var(--color-ink-muted)]">No critical alerts</p>
            </AdminCard>
          ) : (
            <div className="space-y-3">
              {criticalAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`${alertLevelStyles[alert.level]} rounded-[var(--radius-organic)] p-4`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[var(--color-ink)]">
                        {alert.message}
                      </p>
                      <p className="text-xs text-[var(--color-ink-muted)] mt-1">
                        {alert.timestamp}
                      </p>
                    </div>
                    {alert.actionLabel && (
                      <button className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] ml-4">
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
          <h3 className="font-medium text-[var(--color-ink)] mb-4">Platform Health</h3>
          <div className="grid grid-cols-2 gap-4">
            {healthMetrics.map((metric, index) => (
              <AdminStatCard
                key={index}
                label={metric.label}
                value={metric.value}
                variant={healthStatusVariants[metric.status]}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t-2 border-[var(--color-border)]">
        <h3 className="font-medium text-[var(--color-ink)] mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 text-sm font-medium text-[var(--color-ink)] bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
            Review Pending Operators
          </button>
          <button className="px-4 py-2 text-sm font-medium text-[var(--color-ink)] bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
            View Flagged Content
          </button>
          <button className="px-4 py-2 text-sm font-medium text-[var(--color-ink)] bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
            Export Reports
          </button>
        </div>
      </div>
    </AdminSection>
  );
}
