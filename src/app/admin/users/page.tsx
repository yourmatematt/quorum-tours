import { ErrorBoundary } from '@/components/ErrorBoundary';
import { UserManagement } from '@/components/admin';

export default function AdminUsersPage() {
  return (
    <ErrorBoundary>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="font-display text-3xl font-semibold text-[var(--color-ink)]">
            User Management
          </h1>
          <p className="text-[var(--color-ink-muted)] mt-2">
            Search users, adjust tiers, and moderation actions
          </p>
        </div>

        <UserManagement />
      </div>
    </ErrorBoundary>
  );
}
