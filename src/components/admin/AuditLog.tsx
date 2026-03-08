'use client';

/**
 * Audit Log Section
 * Admin action history — empty state until audit logging is implemented
 */

import { AdminCollapsible } from './AdminCollapsible';
import { AdminCard } from './AdminSection';

export function AuditLog() {
  return (
    <AdminCollapsible
      title="Audit Log"
      subtitle="Admin action history for compliance"
      defaultCollapsed={true}
    >
      <AdminCard>
        <div className="text-center py-8">
          <p className="text-[var(--color-ink-muted)] mb-1">
            No audit entries yet
          </p>
          <p className="text-sm text-[var(--color-ink-subtle)]">
            Admin actions will be logged here once audit logging is enabled.
          </p>
        </div>
      </AdminCard>
    </AdminCollapsible>
  );
}
