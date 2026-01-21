/**
 * Audit Log Section
 * Admin action history for compliance and transparency
 */

interface AuditEntry {
  id: string;
  adminName: string;
  actionType: string;
  targetType: string;
  targetId: string;
  description: string;
  timestamp: string;
  reason?: string;
}

export function AuditLog() {
  // Mock data
  const entries: AuditEntry[] = [
    {
      id: 'audit-001',
      adminName: 'admin@quorumtours.com',
      actionType: 'APPROVED',
      targetType: 'Operator',
      targetId: 'op-789',
      description: 'Approved operator verification',
      timestamp: '2026-01-21 15:42:03 UTC',
      reason: 'All credentials verified and valid',
    },
    {
      id: 'audit-002',
      adminName: 'admin@quorumtours.com',
      actionType: 'REJECTED',
      targetType: 'Operator',
      targetId: 'op-654',
      description: 'Rejected operator application',
      timestamp: '2026-01-21 14:15:28 UTC',
      reason: 'Insurance certificate expired',
    },
    {
      id: 'audit-003',
      adminName: 'support@quorumtours.com',
      actionType: 'ADJUSTED',
      targetType: 'User',
      targetId: 'user-3421',
      description: 'Manually upgraded user tier',
      timestamp: '2026-01-21 11:30:15 UTC',
      reason: 'Verified external credentials via email',
    },
  ];

  const actionTypeColors: Record<string, string> = {
    APPROVED: 'text-confirmed',
    REJECTED: 'text-red-600',
    ADJUSTED: 'text-forming',
    SUSPENDED: 'text-red-600',
    RESTORED: 'text-confirmed',
  };

  return (
    <section className="bg-surface-raised border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold text-ink">
          Audit Log
        </h2>
        <div className="flex gap-2">
          <select className="px-3 py-1 text-xs border border-border-strong rounded-md focus:outline-none focus:ring-2 focus:ring-accent">
            <option>All Actions</option>
            <option>Approved</option>
            <option>Rejected</option>
            <option>Suspended</option>
          </select>
          <select className="px-3 py-1 text-xs border border-border-strong rounded-md focus:outline-none focus:ring-2 focus:ring-accent">
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="border border-border rounded-md p-4 bg-surface"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className={`font-mono text-sm font-semibold ${actionTypeColors[entry.actionType] || 'text-ink'}`}
                  >
                    {entry.actionType}
                  </span>
                  <span className="text-sm text-ink-muted">
                    {entry.targetType}
                  </span>
                  <span className="font-mono text-xs text-ink-muted">
                    #{entry.targetId}
                  </span>
                </div>
                <p className="text-sm text-ink mb-1">{entry.description}</p>
                {entry.reason && (
                  <p className="text-xs text-ink-muted italic">
                    Reason: {entry.reason}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-ink-muted pt-2 border-t border-border">
              <span>Admin: {entry.adminName}</span>
              <span>•</span>
              <span>{entry.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
        <button className="px-3 py-1 text-sm font-medium text-ink-muted hover:text-ink disabled:opacity-50">
          ← Previous
        </button>
        <span className="text-sm text-ink-muted">Page 1 of 12</span>
        <button className="px-3 py-1 text-sm font-medium text-accent hover:text-accent-hover">
          Next →
        </button>
      </div>
    </section>
  );
}
