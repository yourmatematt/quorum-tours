'use client';

/**
 * System Status Widget
 * Compact system health indicator for the main dashboard
 * Shows overall status with link to full diagnostics
 */

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Activity, RefreshCw, ChevronRight } from 'lucide-react';

type ServiceStatus = 'operational' | 'degraded' | 'critical' | 'unknown' | 'checking';

interface ServiceHealth {
  name: string;
  status: ServiceStatus;
}

const StatusDot = ({ status }: { status: ServiceStatus }) => {
  const styles = {
    operational: 'bg-[var(--color-confirmed)] shadow-[0_0_6px_var(--color-confirmed)]',
    degraded: 'bg-[var(--color-forming)] shadow-[0_0_6px_var(--color-forming)] animate-pulse',
    critical: 'bg-[var(--color-destructive)] shadow-[0_0_8px_var(--color-destructive)] animate-[pulse_0.75s_ease-in-out_infinite]',
    unknown: 'bg-gray-400',
    checking: 'bg-[var(--color-info)] animate-pulse',
  };

  return (
    <span className={`inline-block w-2 h-2 rounded-full ${styles[status]}`} />
  );
};

export function SystemStatusWidget() {
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [services, setServices] = useState<ServiceHealth[]>([
    { name: 'Database', status: 'unknown' },
    { name: 'Payments', status: 'unknown' },
    { name: 'Email', status: 'unknown' },
    { name: 'Edge Functions', status: 'unknown' },
  ]);

  // Quick health check (simplified - just checks connectivity)
  const checkHealth = useCallback(async () => {
    setIsChecking(true);
    setServices(prev => prev.map(s => ({ ...s, status: 'checking' as ServiceStatus })));

    try {
      const response = await fetch('/api/admin/health-check', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tests: ['supabase', 'stripe', 'email', 'edge-functions'] }),
      });

      if (response.ok) {
        const data = await response.json();

        // Map results to services
        const newServices: ServiceHealth[] = [
          {
            name: 'Database',
            status: data.tests.find((t: any) => t.name.includes('Supabase'))?.status || 'unknown',
          },
          {
            name: 'Payments',
            status: data.tests.find((t: any) => t.name.includes('Stripe API'))?.status || 'unknown',
          },
          {
            name: 'Email',
            status: data.tests.find((t: any) => t.name.includes('Email') || t.name.includes('Resend'))?.status || 'unknown',
          },
          {
            name: 'Edge Functions',
            status: data.tests.some((t: any) => t.name.startsWith('Edge:') && t.status === 'critical')
              ? 'critical'
              : data.tests.some((t: any) => t.name.startsWith('Edge:') && t.status === 'degraded')
                ? 'degraded'
                : data.tests.some((t: any) => t.name.startsWith('Edge:') && t.status === 'operational')
                  ? 'operational'
                  : 'unknown',
          },
        ];

        setServices(newServices);
        setLastChecked(new Date());
      }
    } catch (error) {
      console.error('Health check failed:', error);
      setServices(prev => prev.map(s => ({ ...s, status: 'unknown' as ServiceStatus })));
    } finally {
      setIsChecking(false);
    }
  }, []);

  // Check on mount
  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  // Calculate overall status
  const overallStatus: ServiceStatus = services.some(s => s.status === 'critical')
    ? 'critical'
    : services.some(s => s.status === 'degraded')
      ? 'degraded'
      : services.every(s => s.status === 'operational')
        ? 'operational'
        : services.some(s => s.status === 'checking')
          ? 'checking'
          : 'unknown';

  const overallStatusText = {
    operational: 'All Systems Operational',
    degraded: 'Degraded Performance',
    critical: 'Issues Detected',
    unknown: 'Status Unknown',
    checking: 'Checking...',
  };

  const overallBorder = {
    operational: 'border-[var(--color-confirmed)]/30',
    degraded: 'border-[var(--color-forming)]/40',
    critical: 'border-[var(--color-destructive)]/50',
    unknown: 'border-[var(--color-border)]',
    checking: 'border-[var(--color-info)]/40',
  };

  return (
    <div
      className={`
        bg-[var(--color-surface)] border-2 rounded-[var(--radius-organic)] p-3
        transition-colors duration-300
        ${overallBorder[overallStatus]}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[var(--color-ink-muted)]" />
          <h4 className="text-xs font-medium text-[var(--color-ink-muted)] uppercase tracking-wide">
            System Status
          </h4>
        </div>
        <button
          onClick={checkHealth}
          disabled={isChecking}
          className="p-1 rounded-[var(--radius-sm)] text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-sunken)] transition-colors disabled:opacity-50"
          title="Refresh status"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Overall Status */}
      <div className="flex items-center gap-2 mb-3">
        <StatusDot status={overallStatus} />
        <span className="text-sm font-medium text-[var(--color-ink)]">
          {overallStatusText[overallStatus]}
        </span>
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {services.map(service => (
          <div key={service.name} className="flex items-center gap-1.5">
            <StatusDot status={service.status} />
            <span className="text-xs text-[var(--color-ink-muted)]">{service.name}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
        {lastChecked && (
          <span className="text-[10px] text-[var(--color-ink-subtle)]">
            {lastChecked.toLocaleTimeString()}
          </span>
        )}
        <Link
          href="/admin/system"
          className="flex items-center gap-1 text-xs text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium"
        >
          Run Diagnostics
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
