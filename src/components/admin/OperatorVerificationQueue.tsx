'use client';

/**
 * Operator Verification Queue Section
 * Displays pending operator applications with approval/rejection workflow
 * Supports bulk selection and actions
 */

import { useState } from 'react';
import { StatusBadge } from '@/components/operator';
import { AdminCollapsible } from './AdminCollapsible';
import { AdminCard } from './AdminSection';
import {
  AdminBulkActions,
  AdminCheckbox,
  useBulkSelection,
} from './AdminBulkActions';
import { useOperatorApplications, type OperatorApplication } from '@/hooks/useOperatorApplications';

export function OperatorVerificationQueue() {
  const { applications, isLoading, error, refetch } = useOperatorApplications('pending');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const { selectedIds, setSelectedIds, toggleSelection, isSelected } =
    useBulkSelection();

  const allIds = applications.map((app) => app.id);

  async function handleAction(applicationId: string, action: 'approve' | 'reject' | 'request_info', adminNotes?: string) {
    setActionLoading(applicationId);
    setActionError(null);

    try {
      const response = await fetch(`/api/admin/operator-applications/${applicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, adminNotes }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      // Remove from selection and refetch
      const newSelected = new Set(selectedIds);
      newSelected.delete(applicationId);
      setSelectedIds(newSelected);
      setRejectingId(null);
      setRejectReason('');
      refetch();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setActionLoading(null);
    }
  }

  async function handleBulkAction(action: 'approve' | 'reject') {
    for (const id of Array.from(selectedIds)) {
      await handleAction(id, action);
    }
  }

  if (isLoading) {
    return (
      <AdminCollapsible
        title="Operator Verification Queue"
        badge={0}
        badgeVariant="warning"
        subtitle="Review and approve operator applications"
      >
        <AdminCard>
          <div className="flex items-center justify-center py-8 text-[var(--color-ink-muted)]">
            <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading applications...
          </div>
        </AdminCard>
      </AdminCollapsible>
    );
  }

  if (error) {
    return (
      <AdminCollapsible
        title="Operator Verification Queue"
        badge={0}
        badgeVariant="warning"
        subtitle="Review and approve operator applications"
      >
        <AdminCard>
          <div className="text-center py-8">
            <p className="text-[var(--color-danger)] mb-2">Failed to load applications</p>
            <p className="text-sm text-[var(--color-ink-muted)]">{error}</p>
            <button
              onClick={refetch}
              className="mt-3 px-4 py-2 text-sm font-medium text-[var(--color-primary)] hover:underline"
            >
              Try again
            </button>
          </div>
        </AdminCard>
      </AdminCollapsible>
    );
  }

  return (
    <AdminCollapsible
      title="Operator Verification Queue"
      badge={applications.length}
      badgeVariant="warning"
      subtitle="Review and approve operator applications"
    >
      {actionError && (
        <div className="mb-4 px-4 py-3 bg-[var(--color-danger-bg)] border border-[var(--color-danger)] rounded-[var(--radius-organic)] text-sm text-[var(--color-danger)]">
          {actionError}
        </div>
      )}

      {/* Bulk Actions Bar */}
      <AdminBulkActions
        totalItems={applications.length}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        allIds={allIds}
      >
        {({ selectedCount }) => (
          <>
            <button
              onClick={() => handleBulkAction('approve')}
              className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-confirmed)] hover:brightness-90 rounded-[var(--radius-organic)] transition-all"
            >
              Approve {selectedCount}
            </button>
            <button
              onClick={() => handleBulkAction('reject')}
              className="px-4 py-2 text-sm font-medium text-[var(--color-destructive)] bg-[var(--color-surface)] border-2 border-[var(--color-destructive)] rounded-[var(--radius-organic)] hover:bg-[var(--color-destructive)] hover:text-white transition-colors"
            >
              Reject {selectedCount}
            </button>
          </>
        )}
      </AdminBulkActions>

      {applications.length === 0 ? (
        <AdminCard>
          <p className="text-center text-[var(--color-ink-muted)] py-4">
            No operators pending verification
          </p>
        </AdminCard>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              isSelected={isSelected(app.id)}
              onToggleSelect={() => toggleSelection(app.id)}
              isLoading={actionLoading === app.id}
              isRejecting={rejectingId === app.id}
              rejectReason={rejectReason}
              onRejectReasonChange={setRejectReason}
              onApprove={() => handleAction(app.id, 'approve')}
              onReject={() => {
                if (rejectingId === app.id) {
                  handleAction(app.id, 'reject', rejectReason);
                } else {
                  setRejectingId(app.id);
                  setRejectReason('');
                }
              }}
              onCancelReject={() => {
                setRejectingId(null);
                setRejectReason('');
              }}
              onRequestInfo={() => handleAction(app.id, 'request_info')}
            />
          ))}
        </div>
      )}
    </AdminCollapsible>
  );
}

interface ApplicationCardProps {
  application: OperatorApplication;
  isSelected: boolean;
  onToggleSelect: () => void;
  isLoading: boolean;
  isRejecting: boolean;
  rejectReason: string;
  onRejectReasonChange: (value: string) => void;
  onApprove: () => void;
  onReject: () => void;
  onCancelReject: () => void;
  onRequestInfo: () => void;
}

function ApplicationCard({
  application,
  isSelected,
  onToggleSelect,
  isLoading,
  isRejecting,
  rejectReason,
  onRejectReasonChange,
  onApprove,
  onReject,
  onCancelReject,
  onRequestInfo,
}: ApplicationCardProps) {
  return (
    <div
      className={`border-2 rounded-[var(--radius-organic)] p-6 bg-[var(--color-surface)] transition-colors ${
        isSelected
          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
          : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
      } ${isLoading ? 'opacity-60 pointer-events-none' : ''}`}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <AdminCheckbox
          checked={isSelected}
          onChange={onToggleSelect}
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-[var(--color-ink)] text-lg">
                {application.business_name}
              </h3>
              <p className="text-sm text-[var(--color-ink-muted)] mt-1">
                {application.contact_name} &middot; {application.contact_email}
              </p>
              <p className="text-sm text-[var(--color-ink-muted)] mt-0.5">
                {application.base_location} &middot; {application.years_experience} years experience
              </p>
              <p className="text-xs text-[var(--color-ink-subtle)] mt-1">
                Applied{' '}
                {new Date(application.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <StatusBadge status="pending" />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4 ml-8">
        <h4 className="text-sm font-medium text-[var(--color-ink)] mb-1">About Their Operation</h4>
        <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
          {application.description}
        </p>
        {application.credentials && (
          <p className="text-sm text-[var(--color-ink-muted)] mt-2">
            <strong>Credentials:</strong> {application.credentials}
          </p>
        )}
        {application.website_url && (
          <p className="text-sm mt-1">
            <a
              href={application.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-primary)] hover:underline"
            >
              {application.website_url}
            </a>
          </p>
        )}
        {!application.profile_id && (
          <p className="text-xs text-[var(--color-ink-subtle)] mt-2 italic">
            No linked account — applicant will need to create one before accessing dashboard
          </p>
        )}
      </div>

      {/* Reject reason input */}
      {isRejecting && (
        <div className="mb-4 ml-8">
          <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">
            Rejection reason (sent to applicant)
          </label>
          <textarea
            value={rejectReason}
            onChange={(e) => onRejectReasonChange(e.target.value)}
            placeholder="Explain why this application was not approved..."
            rows={3}
            className="w-full px-3 py-2 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 ml-8 border-t-2 border-[var(--color-border)]">
        {isRejecting ? (
          <>
            <button
              onClick={onReject}
              disabled={isLoading}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[var(--color-destructive)] hover:brightness-90 rounded-[var(--radius-organic)] transition-all disabled:opacity-50"
            >
              {isLoading ? 'Rejecting...' : 'Confirm Rejection'}
            </button>
            <button
              onClick={onCancelReject}
              className="px-4 py-2 text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onApprove}
              disabled={isLoading}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[var(--color-confirmed)] hover:brightness-90 rounded-[var(--radius-organic)] transition-all disabled:opacity-50"
            >
              {isLoading ? 'Approving...' : 'Approve Operator'}
            </button>
            <button
              onClick={onReject}
              disabled={isLoading}
              className="flex-1 px-4 py-2 text-sm font-medium text-[var(--color-ink)] bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-destructive)] hover:text-[var(--color-destructive)] transition-colors disabled:opacity-50"
            >
              Reject with Reason
            </button>
            <button
              onClick={onRequestInfo}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] disabled:opacity-50"
            >
              Request Info
            </button>
          </>
        )}
      </div>
    </div>
  );
}
