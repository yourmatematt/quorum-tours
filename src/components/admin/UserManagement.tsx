'use client';

/**
 * User Management Section
 * Search users, adjust tiers, moderation actions
 */

import { AdminCollapsible } from './AdminCollapsible';
import { AdminCard } from './AdminSection';

export function UserManagement() {
  return (
    <AdminCollapsible
      title="User Management"
      subtitle="Search users, adjust tiers, moderation actions"
    >
      {/* Search Interface */}
      <div className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search by name, email, or user ID..."
            className="flex-1 px-4 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] bg-[var(--color-surface)] focus:border-[var(--color-primary)] focus:outline-none"
          />
          <button className="px-6 py-2 text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] rounded-[var(--radius-organic)] transition-colors">
            Search
          </button>
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          <select className="px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] bg-[var(--color-surface)] focus:border-[var(--color-primary)] focus:outline-none">
            <option>All Tiers</option>
            <option>Explorer</option>
            <option>Field Naturalist</option>
            <option>Trusted Contributor</option>
          </select>
          <select className="px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] bg-[var(--color-surface)] focus:border-[var(--color-primary)] focus:outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Suspended</option>
            <option>Flagged</option>
          </select>
        </div>
      </div>

      {/* Placeholder for user results */}
      <AdminCard>
        <p className="text-center text-[var(--color-ink-muted)] py-4">
          Enter search criteria to find users
        </p>
      </AdminCard>
    </AdminCollapsible>
  );
}
