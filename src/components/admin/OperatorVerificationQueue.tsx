'use client';

/**
 * Operator Verification Queue Section
 * Displays pending operator applications with approval/rejection workflow
 * Supports bulk selection and actions
 */

import { StatusBadge } from '@/components/operator';
import { AdminCollapsible } from './AdminCollapsible';
import { AdminCard } from './AdminSection';
import {
  AdminBulkActions,
  AdminCheckbox,
  useBulkSelection,
} from './AdminBulkActions';

interface PendingOperator {
  id: string;
  businessName: string;
  contactName: string;
  region: string;
  submittedDate: string;
  credentialStatus: 'pending' | 'confirmed' | 'cancelled';
  documents: {
    type: string;
    url: string;
    status: 'pending' | 'confirmed' | 'cancelled';
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
        { type: 'Insurance Certificate', url: '#', status: 'confirmed' },
      ],
    },
  ];

  const { selectedIds, setSelectedIds, toggleSelection, isSelected } =
    useBulkSelection();

  const allIds = pendingOperators.map((op) => op.id);

  const handleBulkApprove = () => {
    // TODO: Implement bulk approve API call
    console.log('Bulk approve:', Array.from(selectedIds));
    setSelectedIds(new Set());
  };

  const handleBulkReject = () => {
    // TODO: Implement bulk reject API call
    console.log('Bulk reject:', Array.from(selectedIds));
    setSelectedIds(new Set());
  };

  return (
    <AdminCollapsible
      title="Operator Verification Queue"
      badge={pendingOperators.length}
      badgeVariant="warning"
      subtitle="Review and approve operator applications"
    >
      {/* Bulk Actions Bar */}
      <AdminBulkActions
        totalItems={pendingOperators.length}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        allIds={allIds}
      >
        {({ selectedCount }) => (
          <>
            <button
              onClick={handleBulkApprove}
              className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-confirmed)] hover:brightness-90 rounded-[var(--radius-organic)] transition-all"
            >
              Approve {selectedCount}
            </button>
            <button
              onClick={handleBulkReject}
              className="px-4 py-2 text-sm font-medium text-[var(--color-destructive)] bg-[var(--color-surface)] border-2 border-[var(--color-destructive)] rounded-[var(--radius-organic)] hover:bg-[var(--color-destructive)] hover:text-white transition-colors"
            >
              Reject {selectedCount}
            </button>
          </>
        )}
      </AdminBulkActions>

      {pendingOperators.length === 0 ? (
        <AdminCard>
          <p className="text-center text-[var(--color-ink-muted)]">
            No operators pending verification
          </p>
        </AdminCard>
      ) : (
        <div className="space-y-4">
          {pendingOperators.map((operator) => (
            <div
              key={operator.id}
              className={`border-2 rounded-[var(--radius-organic)] p-6 bg-[var(--color-surface)] transition-colors ${
                isSelected(operator.id)
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                  : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
              }`}
            >
              {/* Operator Header */}
              <div className="flex items-start gap-4 mb-4">
                <AdminCheckbox
                  checked={isSelected(operator.id)}
                  onChange={() => toggleSelection(operator.id)}
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-[var(--color-ink)] text-lg">
                        {operator.businessName}
                      </h3>
                      <p className="text-sm text-[var(--color-ink-muted)] mt-1">
                        Contact: {operator.contactName} • {operator.region}
                      </p>
                      <p className="text-xs text-[var(--color-ink-muted)] mt-1">
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
                    <StatusBadge status={operator.credentialStatus} />
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="mb-4 ml-8">
                <h4 className="text-sm font-medium text-[var(--color-ink)] mb-2">
                  Submitted Documents
                </h4>
                <div className="space-y-2">
                  {operator.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-[var(--color-ink)]">
                          {doc.type}
                        </span>
                        <StatusBadge status={doc.status} size="sm" />
                      </div>
                      <button className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">
                        View Document →
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 ml-8 border-t-2 border-[var(--color-border)]">
                <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[var(--color-confirmed)] hover:brightness-90 rounded-[var(--radius-organic)] transition-all">
                  Approve Operator
                </button>
                <button className="flex-1 px-4 py-2 text-sm font-medium text-[var(--color-ink)] bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-destructive)] hover:text-[var(--color-destructive)] transition-colors">
                  Reject with Reason
                </button>
                <button className="px-4 py-2 text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-primary)]">
                  Request Info
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminCollapsible>
  );
}
