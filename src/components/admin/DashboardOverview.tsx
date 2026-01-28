'use client';

/**
 * Dashboard Overview Section
 * Compact single-viewport view with grouped metrics, alerts, and quick actions
 */

import { AlertTriangle, CheckCircle } from 'lucide-react';
import { SystemStatusWidget } from './SystemStatusWidget';

interface Alert {
  id: string;
  level: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  actionLabel?: string;
}

export function DashboardOverview() {
  // Mock data - would come from API
  const criticalAlerts: Alert[] = [
    {
      id: '1',
      level: 'critical',
      message: 'Payment processing error on 3 operator payouts',
      timestamp: '5 min ago',
      actionLabel: 'Review',
    },
    {
      id: '2',
      level: 'warning',
      message: '12 operator credentials expiring within 7 days',
      timestamp: '1 hr ago',
      actionLabel: 'View',
    },
  ];

  const metrics = {
    revenue: {
      escrowed: 284750,
      paidOut: 156230,
      commission: 28475,
    },
    tours: {
      quorumRate: 73,
      active: 47,
      completedThisMonth: 12,
    },
    users: {
      totalActive: 3847,
      newThisWeek: 142,
      retentionRate: 68,
    },
    operators: {
      verified: 89,
      pending: 8,
      completionRate: 82,
    },
  };

  const alertLevelStyles = {
    critical: 'border-l-4 border-[var(--color-destructive-border)] bg-[var(--color-destructive-bg)]',
    warning: 'border-l-4 border-[var(--color-warning-border)] bg-[var(--color-warning-bg)]',
    info: 'border-l-4 border-[var(--color-info-border)] bg-[var(--color-info-bg)]',
  };

  const alertIcons = {
    critical: <AlertTriangle className="w-4 h-4 text-[var(--color-destructive)] flex-shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-[var(--color-warning-text)] flex-shrink-0" />,
    info: <CheckCircle className="w-4 h-4 text-[var(--color-info-text)] flex-shrink-0" />,
  };

  return (
    <div className="space-y-4">
      {/* Metrics Grid - 2x2 compact cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Revenue */}
        <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-3">
          <h4 className="text-xs font-medium text-[var(--color-ink-muted)] uppercase tracking-wide mb-2">
            Revenue
          </h4>
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-[var(--color-ink-muted)]">Escrowed</span>
              <span className="font-mono text-sm font-semibold text-[var(--color-forming)]">
                ${metrics.revenue.escrowed.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-[var(--color-ink-muted)]">Paid Out</span>
              <span className="font-mono text-sm font-semibold text-[var(--color-confirmed)]">
                ${metrics.revenue.paidOut.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-baseline pt-1 border-t border-[var(--color-border)]">
              <span className="text-xs text-[var(--color-ink-muted)]">Commission</span>
              <span className="font-mono text-sm font-semibold text-[var(--color-primary)]">
                ${metrics.revenue.commission.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Tours */}
        <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-3">
          <h4 className="text-xs font-medium text-[var(--color-ink-muted)] uppercase tracking-wide mb-2">
            Tours
          </h4>
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-[var(--color-ink-muted)]">Quorum Rate</span>
              <span className="font-mono text-sm font-semibold text-[var(--color-confirmed)]">
                {metrics.tours.quorumRate}%
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-[var(--color-ink-muted)]">Active</span>
              <span className="font-mono text-sm font-semibold text-[var(--color-ink)]">
                {metrics.tours.active}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-[var(--color-ink-muted)]">Completed (mo)</span>
              <span className="font-mono text-sm font-semibold text-[var(--color-ink)]">
                {metrics.tours.completedThisMonth}
              </span>
            </div>
          </div>
        </div>

        {/* Users */}
        <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-3">
          <h4 className="text-xs font-medium text-[var(--color-ink-muted)] uppercase tracking-wide mb-2">
            Users
          </h4>
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-[var(--color-ink-muted)]">Total Active</span>
              <span className="font-mono text-sm font-semibold text-[var(--color-ink)]">
                {metrics.users.totalActive.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-[var(--color-ink-muted)]">New (week)</span>
              <span className="font-mono text-sm font-semibold text-[var(--color-confirmed)]">
                +{metrics.users.newThisWeek}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-[var(--color-ink-muted)]">Retention</span>
              <span className="font-mono text-sm font-semibold text-[var(--color-ink)]">
                {metrics.users.retentionRate}%
              </span>
            </div>
          </div>
        </div>

        {/* Operators */}
        <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-3">
          <h4 className="text-xs font-medium text-[var(--color-ink-muted)] uppercase tracking-wide mb-2">
            Operators
          </h4>
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-[var(--color-ink-muted)]">Verified</span>
              <span className="font-mono text-sm font-semibold text-[var(--color-ink)]">
                {metrics.operators.verified}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-[var(--color-ink-muted)]">Pending</span>
              <span className="font-mono text-sm font-semibold text-[var(--color-forming)]">
                {metrics.operators.pending}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-[var(--color-ink-muted)]">Completion</span>
              <span className="font-mono text-sm font-semibold text-[var(--color-ink)]">
                {metrics.operators.completionRate}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-3">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-medium text-[var(--color-ink-muted)] uppercase tracking-wide">
            Active Alerts
          </h4>
          <span className="text-xs text-[var(--color-ink-muted)]">
            {criticalAlerts.length} requiring attention
          </span>
        </div>

        {criticalAlerts.length === 0 ? (
          <p className="text-sm text-[var(--color-ink-muted)] text-center py-2">
            No active alerts
          </p>
        ) : (
          <div className="space-y-2">
            {criticalAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`${alertLevelStyles[alert.level]} rounded-[var(--radius-organic)] px-3 py-2`}
              >
                <div className="flex items-center gap-2">
                  {alertIcons[alert.level]}
                  <p className="flex-1 text-sm text-[var(--color-ink)]">
                    {alert.message}
                  </p>
                  <span className="text-xs text-[var(--color-ink-muted)] hidden sm:inline">
                    {alert.timestamp}
                  </span>
                  {alert.actionLabel && (
                    <button className="text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">
                      {alert.actionLabel} →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* System Status + Quick Actions Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* System Status Widget */}
        <SystemStatusWidget />

        {/* Quick Actions */}
        <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-3">
          <h4 className="text-xs font-medium text-[var(--color-ink-muted)] uppercase tracking-wide mb-2">
            Quick Actions
          </h4>
          <div className="flex flex-wrap gap-2">
            <a
              href="/admin/operators"
              className="px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] bg-[var(--color-surface-sunken)] border border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              Review Operators
            </a>
            <a
              href="/admin/tours"
              className="px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] bg-[var(--color-surface-sunken)] border border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              Tour Oversight
            </a>
            <a
              href="/admin/alerts"
              className="px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] bg-[var(--color-surface-sunken)] border border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              All Alerts
            </a>
            <a
              href="/admin/audit"
              className="px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] bg-[var(--color-surface-sunken)] border border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              Audit Log
            </a>
            <a
              href="/admin/system"
              className="px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] bg-[var(--color-surface-sunken)] border border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              System Health
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
