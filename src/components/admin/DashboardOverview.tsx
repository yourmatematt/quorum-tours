'use client';

/**
 * Dashboard Overview Section
 * Compact single-viewport view with real metrics and quick actions
 */

import { useState, useEffect } from 'react';
import { SystemStatusWidget } from './SystemStatusWidget';
import { createClient } from '@/lib/supabase/client';

interface DashboardMetrics {
  operators: { verified: number; pending: number };
  tours: { active: number; completed: number; quorumRate: number | null };
  users: { total: number };
}

export function DashboardOverview() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      const supabase = createClient();

      try {
        // Fetch counts in parallel
        const [operatorsRes, pendingRes, toursRes, completedRes, cancelledRes, usersRes] = await Promise.all([
          supabase.from('operators').select('id', { count: 'exact', head: true }).eq('is_verified', true),
          supabase.from('operator_applications').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('tours').select('id', { count: 'exact', head: true }).in('status', ['forming', 'payment_pending', 'confirmed']),
          supabase.from('tours').select('id', { count: 'exact', head: true }).eq('status', 'completed'),
          supabase.from('tours').select('id', { count: 'exact', head: true }).eq('status', 'cancelled'),
          supabase.from('profiles').select('id', { count: 'exact', head: true }),
        ]);

        const completed = completedRes.count ?? 0;
        const cancelled = cancelledRes.count ?? 0;
        const quorumDenom = completed + cancelled;

        setMetrics({
          operators: {
            verified: operatorsRes.count ?? 0,
            pending: pendingRes.count ?? 0,
          },
          tours: {
            active: toursRes.count ?? 0,
            completed,
            quorumRate: quorumDenom > 0 ? Math.round((completed / quorumDenom) * 100) : null,
          },
          users: {
            total: usersRes.count ?? 0,
          },
        });
      } catch (err) {
        console.error('Failed to fetch dashboard metrics:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMetrics();
  }, []);

  return (
    <div className="space-y-4">
      {/* Metrics Grid - compact cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard
          title="Operators"
          items={[
            { label: 'Verified', value: metrics?.operators.verified ?? 0 },
            { label: 'Pending', value: metrics?.operators.pending ?? 0, variant: 'forming' },
          ]}
          isLoading={isLoading}
        />
        <MetricCard
          title="Tours"
          items={[
            { label: 'Active', value: metrics?.tours.active ?? 0 },
            { label: 'Completed', value: metrics?.tours.completed ?? 0, variant: 'confirmed' },
            { label: 'Quorum Rate', value: metrics?.tours.quorumRate !== null && metrics?.tours.quorumRate !== undefined ? `${metrics.tours.quorumRate}%` : '—' },
          ]}
          isLoading={isLoading}
        />
        <MetricCard
          title="Users"
          items={[
            { label: 'Total', value: metrics?.users.total ?? 0 },
          ]}
          isLoading={isLoading}
        />
        <MetricCard
          title="Revenue"
          items={[
            { label: 'Status', value: 'Pre-launch' },
          ]}
          isLoading={isLoading}
        />
      </div>

      {/* System Status + Quick Actions Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* System Status Widget */}
        <SystemStatusWidget />

        {/* Quick Actions */}
        <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-3">
          <h4 className="text-xs font-medium text-[var(--color-ink-muted)] uppercase tracking-wide mb-2">
            Quick Actions
          </h4>
          <div className="flex flex-wrap gap-2">
            <a
              href="/admin/operators"
              className="px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] bg-[var(--color-surface-sunken)] border border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              Review Operators
            </a>
            <a
              href="/admin/tours"
              className="px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] bg-[var(--color-surface-sunken)] border border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              Tour Oversight
            </a>
            <a
              href="/admin/system"
              className="px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] bg-[var(--color-surface-sunken)] border border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              System Health
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  items,
  isLoading,
}: {
  title: string;
  items: { label: string; value: string | number; variant?: 'confirmed' | 'forming' | 'destructive' }[];
  isLoading: boolean;
}) {
  const variantColors: Record<string, string> = {
    confirmed: 'text-[var(--color-confirmed)]',
    forming: 'text-[var(--color-forming)]',
    destructive: 'text-[var(--color-destructive)]',
  };

  return (
    <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-3">
      <h4 className="text-xs font-medium text-[var(--color-ink-muted)] uppercase tracking-wide mb-2">
        {title}
      </h4>
      {isLoading ? (
        <div className="space-y-2">
          {items.map((_, i) => (
            <div key={i} className="h-4 bg-[var(--color-border)] rounded animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-1">
          {items.map((item) => (
            <div key={item.label} className="flex justify-between items-baseline">
              <span className="text-xs text-[var(--color-ink-muted)]">{item.label}</span>
              <span className={`font-mono text-sm font-semibold ${item.variant ? variantColors[item.variant] : 'text-[var(--color-ink)]'}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
