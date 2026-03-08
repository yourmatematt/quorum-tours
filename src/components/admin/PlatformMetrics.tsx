'use client';

/**
 * Platform Metrics Section
 * Real counts from database for tours, users, and operators
 */

import { useState, useEffect } from 'react';
import { AdminCollapsible } from './AdminCollapsible';
import { AdminCard } from './AdminSection';
import { createClient } from '@/lib/supabase/client';

interface Metrics {
  tours: { active: number; completed: number; cancelled: number; quorumRate: number | null };
  users: { total: number };
  operators: { verified: number; pending: number };
}

export function PlatformMetrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      const supabase = createClient();

      try {
        const [activeRes, completedRes, cancelledRes, usersRes, operatorsRes, pendingRes] = await Promise.all([
          supabase.from('tours').select('id', { count: 'exact', head: true }).in('status', ['forming', 'payment_pending', 'confirmed']),
          supabase.from('tours').select('id', { count: 'exact', head: true }).eq('status', 'completed'),
          supabase.from('tours').select('id', { count: 'exact', head: true }).eq('status', 'cancelled'),
          supabase.from('profiles').select('id', { count: 'exact', head: true }),
          supabase.from('operators').select('id', { count: 'exact', head: true }).eq('is_verified', true),
          supabase.from('operator_applications').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        ]);

        const completed = completedRes.count ?? 0;
        const cancelled = cancelledRes.count ?? 0;
        const denom = completed + cancelled;

        setMetrics({
          tours: {
            active: activeRes.count ?? 0,
            completed,
            cancelled,
            quorumRate: denom > 0 ? Math.round((completed / denom) * 100) : null,
          },
          users: { total: usersRes.count ?? 0 },
          operators: {
            verified: operatorsRes.count ?? 0,
            pending: pendingRes.count ?? 0,
          },
        });
      } catch (err) {
        console.error('Failed to fetch platform metrics:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMetrics();
  }, []);

  return (
    <AdminCollapsible
      title="Platform Metrics"
      subtitle="Live counts from the database"
    >
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3].map(i => (
            <AdminCard key={i} className="p-5">
              <div className="h-4 w-24 bg-[var(--color-border)] rounded animate-pulse mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map(j => (
                  <div key={j} className="h-4 bg-[var(--color-border)] rounded animate-pulse" />
                ))}
              </div>
            </AdminCard>
          ))}
        </div>
      ) : metrics ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tours */}
          <AdminCard className="p-5">
            <h3 className="font-medium text-[var(--color-ink)] mb-4">Tours</h3>
            <div className="space-y-3">
              <MetricRow label="Active" value={metrics.tours.active} />
              <MetricRow label="Completed" value={metrics.tours.completed} variant="confirmed" />
              <MetricRow label="Cancelled" value={metrics.tours.cancelled} variant="destructive" />
              <MetricRow
                label="Quorum Rate"
                value={metrics.tours.quorumRate !== null ? `${metrics.tours.quorumRate}%` : '—'}
                variant="confirmed"
                border
              />
            </div>
          </AdminCard>

          {/* Users */}
          <AdminCard className="p-5">
            <h3 className="font-medium text-[var(--color-ink)] mb-4">Users</h3>
            <div className="space-y-3">
              <MetricRow label="Total Accounts" value={metrics.users.total} />
            </div>
          </AdminCard>

          {/* Operators */}
          <AdminCard className="p-5">
            <h3 className="font-medium text-[var(--color-ink)] mb-4">Operators</h3>
            <div className="space-y-3">
              <MetricRow label="Verified" value={metrics.operators.verified} />
              <MetricRow label="Pending Applications" value={metrics.operators.pending} variant="forming" />
            </div>
          </AdminCard>
        </div>
      ) : (
        <AdminCard>
          <p className="text-center text-[var(--color-ink-muted)] py-4">Failed to load metrics</p>
        </AdminCard>
      )}
    </AdminCollapsible>
  );
}

function MetricRow({
  label,
  value,
  variant,
  border,
}: {
  label: string;
  value: string | number;
  variant?: 'confirmed' | 'forming' | 'destructive';
  border?: boolean;
}) {
  const colors: Record<string, string> = {
    confirmed: 'text-[var(--color-confirmed)]',
    forming: 'text-[var(--color-forming)]',
    destructive: 'text-[var(--color-destructive)]',
  };

  return (
    <div className={`flex justify-between items-baseline ${border ? 'pt-3 border-t-2 border-[var(--color-border)]' : ''}`}>
      <span className="text-sm text-[var(--color-ink-muted)]">{label}</span>
      <span className={`font-mono text-lg font-semibold ${variant ? colors[variant] : 'text-[var(--color-ink)]'}`}>
        {value}
      </span>
    </div>
  );
}
