/**
 * Alerts & Monitoring Section
 * System health, fraud detection, payment issues, user-reported issues
 */

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

  const severityStyles = {
    critical: 'border-l-4 border-red-600 bg-red-50',
    warning: 'border-l-4 border-forming bg-forming-bg',
    info: 'border-l-4 border-accent bg-blue-50',
  };

  const categoryLabels = {
    system: 'System',
    fraud: 'Fraud Detection',
    payment: 'Payment',
    'user-report': 'User Report',
  };

  return (
    <section className="bg-surface-raised border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold text-ink">
          Alerts & Monitoring
        </h2>
        <span className="font-mono text-sm text-ink-muted">
          {alerts.filter((a) => !a.resolved).length} unresolved
        </span>
      </div>

      {alerts.length === 0 ? (
        <div className="border border-border rounded-md p-8 text-center text-ink-muted">
          No active alerts
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`${severityStyles[alert.severity]} rounded-md p-4`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-ink-muted uppercase">
                      {categoryLabels[alert.category]}
                    </span>
                    <span className="text-xs text-ink-muted">•</span>
                    <span className="text-xs text-ink-muted">
                      {alert.timestamp}
                    </span>
                  </div>
                  <h3 className="font-semibold text-ink mb-1">
                    {alert.title}
                  </h3>
                  <p className="text-sm text-ink-muted">{alert.description}</p>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button className="px-3 py-1 text-xs font-medium text-white bg-accent hover:bg-accent-hover rounded transition-colors">
                    Investigate
                  </button>
                  <button className="px-3 py-1 text-xs font-medium text-ink-muted hover:text-ink">
                    Mark Resolved
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
