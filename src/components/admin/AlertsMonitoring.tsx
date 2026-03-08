'use client';

/**
 * Alerts & Monitoring Section
 * Empty state until alerting system is implemented
 */

import { AdminCollapsible } from './AdminCollapsible';
import { AdminCard } from './AdminSection';

export function AlertsMonitoring() {
  return (
    <AdminCollapsible
      title="Alerts & Monitoring"
      subtitle="System health, fraud detection, and user reports"
    >
      <AdminCard>
        <div className="text-center py-8">
          <p className="text-[var(--color-ink-muted)] mb-1">
            No active alerts
          </p>
          <p className="text-sm text-[var(--color-ink-subtle)]">
            Alerts will appear here when monitoring is configured.
          </p>
        </div>
      </AdminCard>
    </AdminCollapsible>
  );
}
