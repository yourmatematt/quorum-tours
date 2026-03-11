'use client';

/**
 * User Management Section
 * Search users, adjust tiers, moderation actions
 */

import { useState } from 'react';
import { AdminCollapsible } from './AdminCollapsible';

interface UserResult {
  id: string;
  email: string;
  name: string | null;
  tier: number;
  trust_score: number;
  tours_completed: number;
  strikes: number;
  is_flagged: boolean;
  is_admin: boolean;
  role: string | null;
  location: string | null;
  created_at: string;
  linked_operator_id: string | null;
}

const TIER_LABELS: Record<number, string> = {
  0: 'New',
  1: 'Trusted',
  2: 'Strike 1',
  3: 'Strike 2',
  4: 'Suspended',
};

function getTierColor(tier: number): string {
  switch (tier) {
    case 0: return 'bg-[var(--color-surface-sunken)] text-[var(--color-ink-muted)]';
    case 1: return 'bg-[var(--color-confirmed-bg)] text-[var(--color-confirmed)]';
    case 2: return 'bg-amber-50 text-amber-700';
    case 3: return 'bg-orange-50 text-orange-700';
    case 4: return 'bg-red-50 text-red-700';
    default: return 'bg-[var(--color-surface-sunken)] text-[var(--color-ink-muted)]';
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function UserManagement() {
  const [query, setQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [users, setUsers] = useState<UserResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(e?: React.FormEvent) {
    e?.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const params = new URLSearchParams({
        q: query.trim(),
        tier: tierFilter,
        status: statusFilter,
      });

      const response = await fetch(`/api/admin/users?${params}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Search failed.');
        return;
      }

      setUsers(data.users || []);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AdminCollapsible
      title="User Management"
      subtitle="Search users, adjust tiers, moderation actions"
    >
      {/* Search Interface */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, email, or user ID..."
            className="flex-1 px-4 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] bg-[var(--color-surface)] focus:border-[var(--color-primary)] focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="px-6 py-2 text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] rounded-[var(--radius-organic)] transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          <select
            value={tierFilter}
            onChange={e => setTierFilter(e.target.value)}
            className="px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] bg-[var(--color-surface)] focus:border-[var(--color-primary)] focus:outline-none"
          >
            <option value="all">All Tiers</option>
            <option value="0">New</option>
            <option value="1">Trusted</option>
            <option value="2">Strike 1</option>
            <option value="3">Strike 2</option>
            <option value="4">Suspended</option>
          </select>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] bg-[var(--color-surface)] focus:border-[var(--color-primary)] focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="flagged">Flagged</option>
          </select>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-[var(--radius-md)]">
          {error}
        </div>
      )}

      {/* Results */}
      {hasSearched && !isLoading && users.length === 0 && !error && (
        <div className="text-center py-8 text-[var(--color-ink-muted)]">
          No users found matching &ldquo;{query}&rdquo;
        </div>
      )}

      {users.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-[var(--color-ink-muted)] mb-3">
            {users.length} result{users.length !== 1 ? 's' : ''}
          </p>

          {users.map(user => (
            <div
              key={user.id}
              className="
                p-4
                bg-[var(--color-surface)]
                border-2 border-[var(--color-border)]
                rounded-[var(--radius-organic)]
                hover:border-[var(--color-primary)]/30
                transition-colors
              "
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                {/* Left: user info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-medium text-[var(--color-ink)] truncate">
                      {user.name || 'No name set'}
                    </span>
                    {/* Tier badge */}
                    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${getTierColor(user.tier)}`}>
                      {TIER_LABELS[user.tier] || `Tier ${user.tier}`}
                    </span>
                    {/* Role badges */}
                    {user.is_admin && (
                      <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-purple-50 text-purple-700">
                        Admin
                      </span>
                    )}
                    {user.linked_operator_id && (
                      <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-700">
                        Operator
                      </span>
                    )}
                    {user.is_flagged && (
                      <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-red-50 text-red-700">
                        Flagged
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[var(--color-ink-muted)] truncate">
                    {user.email}
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-[var(--color-ink-subtle)]">
                    {user.location && <span>{user.location}</span>}
                    <span>Joined {formatDate(user.created_at)}</span>
                    <span>{user.tours_completed || 0} tours completed</span>
                    {user.strikes > 0 && (
                      <span className="text-red-600">{user.strikes} strike{user.strikes !== 1 ? 's' : ''}</span>
                    )}
                  </div>
                </div>

                {/* Right: ID */}
                <div className="flex-shrink-0">
                  <code className="text-xs text-[var(--color-ink-subtle)] bg-[var(--color-surface-sunken)] px-2 py-1 rounded">
                    {user.id.slice(0, 8)}...
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Default state */}
      {!hasSearched && (
        <div className="text-center py-6 text-[var(--color-ink-muted)]">
          Enter search criteria to find users
        </div>
      )}
    </AdminCollapsible>
  );
}
