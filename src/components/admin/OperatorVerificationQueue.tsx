/**
 * Operator Verification Queue Section
 * Displays pending operator applications with approval/rejection workflow
 */

interface PendingOperator {
  id: string;
  businessName: string;
  contactName: string;
  region: string;
  submittedDate: string;
  credentialStatus: 'pending' | 'verified' | 'rejected' | 'expired';
  documents: {
    type: string;
    url: string;
    status: 'pending' | 'verified' | 'rejected';
  }[];
}

export function OperatorVerificationQueue() {
  // Mock data - would come from API
  const pendingOperators: PendingOperator[] = [
    {
      id: 'op-001',
      businessName: 'Pacific Coast Birding',
      contactName: 'Sarah Chen',
      region: 'Pacific Northwest',
      submittedDate: '2026-01-18',
      credentialStatus: 'pending',
      documents: [
        { type: 'Business License', url: '#', status: 'pending' },
        { type: 'Insurance Certificate', url: '#', status: 'pending' },
        { type: 'Guide Certification', url: '#', status: 'pending' },
      ],
    },
    {
      id: 'op-002',
      businessName: 'Southeast Birding Adventures',
      contactName: 'Michael Torres',
      region: 'Southeast US',
      submittedDate: '2026-01-17',
      credentialStatus: 'pending',
      documents: [
        { type: 'Business License', url: '#', status: 'pending' },
        { type: 'Insurance Certificate', url: '#', status: 'verified' },
      ],
    },
  ];

  const statusBadgeStyles = {
    pending: 'bg-forming-bg text-forming border-forming',
    verified: 'bg-confirmed-bg text-confirmed border-confirmed',
    rejected: 'bg-red-100 text-red-800 border-red-800',
    expired: 'bg-gray-100 text-gray-600 border-gray-600',
  };

  return (
    <section className="bg-surface-raised border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold text-ink">
          Operator Verification Queue
        </h2>
        <span className="font-mono text-sm text-ink-muted">
          {pendingOperators.length} pending
        </span>
      </div>

      {pendingOperators.length === 0 ? (
        <div className="border border-border rounded-md p-8 text-center text-ink-muted">
          No operators pending verification
        </div>
      ) : (
        <div className="space-y-4">
          {pendingOperators.map((operator) => (
            <div
              key={operator.id}
              className="border border-border rounded-lg p-6 bg-surface hover:border-accent transition-colors"
            >
              {/* Operator Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-ink text-lg">
                    {operator.businessName}
                  </h3>
                  <p className="text-sm text-ink-muted mt-1">
                    Contact: {operator.contactName} • {operator.region}
                  </p>
                  <p className="text-xs text-ink-muted mt-1">
                    Submitted:{' '}
                    {new Date(operator.submittedDate).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    )}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-medium border rounded-full ${statusBadgeStyles[operator.credentialStatus]}`}
                >
                  {operator.credentialStatus}
                </span>
              </div>

              {/* Documents */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-ink mb-2">
                  Submitted Documents
                </h4>
                <div className="space-y-2">
                  {operator.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-surface-raised border border-border rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-ink">{doc.type}</span>
                        <span
                          className={`px-2 py-0.5 text-xs border rounded ${statusBadgeStyles[doc.status]}`}
                        >
                          {doc.status}
                        </span>
                      </div>
                      <button className="text-sm font-medium text-accent hover:text-accent-hover">
                        View Document →
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-confirmed hover:bg-green-700 rounded-md transition-colors">
                  Approve Operator
                </button>
                <button className="flex-1 px-4 py-2 text-sm font-medium text-ink bg-surface border border-border-strong rounded-md hover:border-red-600 hover:text-red-600 transition-colors">
                  Reject with Reason
                </button>
                <button className="px-4 py-2 text-sm font-medium text-ink-muted hover:text-accent">
                  Request Additional Info
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
