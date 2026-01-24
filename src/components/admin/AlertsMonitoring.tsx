'use client';

/**
 * Alerts & Monitoring Section
 * System health, fraud detection, payment issues, user-reported issues
 */

import { AdminCollapsible } from './AdminCollapsible';
import { AdminCard } from './AdminSection';

interface SystemAlert {
  id: string;
  category: 'system' | 'fraud' | 'payment' | 'user-report';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
}

export function AlertsMonitoring() {
  // Mock data
  const alerts: SystemAlert[] = [
    {
      id: 'alert-001',
      category: 'payment',
      severity: 'critical',
      title: 'Stripe payout failed for 3 operators',
      description: 'Insufficient funds in platform account',
      timestamp: '2026-01-21 14:23',
      resolved: false,
    },
    {
      id: 'alert-002',
      category: 'fraud',
      severity: 'warning',
      title: 'Multiple accounts from same IP',
      description: '4 accounts created in 10 minutes',
      timestamp: '2026-01-21 12:15',
      resolved: false,
    },
    {
      id: 'alert-003',
      category: 'user-report',
      severity: 'warning',
      title: 'Operator profile reported for misleading credentials',
      description: 'User flagged: "Pacific Coast Birding"',
      timestamp: '2026-01-21 09:45',
      resolved: false,
    },
  ];

  const severityStyles: Record<string, string> = {
    critical:
      'border-l-4 border-[var(--color-destructive-border)] bg-[var(--color-destructive-bg)]',
    warning:
      'border-l-4 border-[var(--color-warning-border)] bg-[var(--color-warning-bg)]',
    info: 'border-l-4 border-[var(--color-info-border)] bg-[var(--color-info-bg)]',
  };

  const categoryLabels: Record<string, string> = {
    system: 'System',
    fraud: 'Fraud Detection',
    payment: 'Payment',
    'user-report': 'User Report',
  };

  const unresolvedCount = alerts.filter((a) => !a.resolved).length;
  const hasCritical = alerts.some(
    (a) => a.severity === 'critical' && !a.resolved
  );

  return (
    <AdminCollapsible
      title="Alerts & Monitoring"
      badge={unresolvedCount}
      badgeVariant={hasCritical ? 'destructive' : 'warning'}
      subtitle="System health, fraud detection, and user reports"
    >
      {alerts.length === 0 ? (
        <AdminCard>
          <p className="text-center text-[var(--color-ink-muted)] py-4">
            No active alerts
          </p>
        </AdminCard>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`${severityStyles[alert.severity]} rounded-[var(--radius-organic)] p-4`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-[var(--color-ink-muted)] uppercase">
                      {categoryLabels[alert.category]}
                    </span>
                    <span className="text-xs text-[var(--color-ink-muted)]">
                      •
                    </span>
                    <span className="text-xs text-[var(--color-ink-muted)]">
                      {alert.timestamp}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[var(--color-ink)] mb-1">
                    {alert.title}
                  </h3>
                  <p className="text-sm text-[var(--color-ink-muted)]">
                    {alert.description}
                  </p>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button className="px-3 py-1 text-xs font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] rounded-[var(--radius-organic)] transition-colors">
                    Investigate
                  </button>
                  <button className="px-3 py-1 text-xs font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]">
                    Mark Resolved
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminCollapsible>
  );
}
