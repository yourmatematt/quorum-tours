'use client';

/**
 * System Health Dashboard
 * Visual traffic light status indicators for all system services
 * With one-click diagnostics and real-time status updates
 */

import { useState, useEffect, useCallback } from 'react';
import {
  Activity,
  Database,
  CreditCard,
  Mail,
  Clock,
  Zap,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Trash2,
  ChevronDown,
  Copy,
  Check,
} from 'lucide-react';

type TestStatus = 'operational' | 'degraded' | 'critical' | 'unknown' | 'running';

interface TestResult {
  name: string;
  status: TestStatus;
  message: string;
  latencyMs?: number;
  details?: Record<string, unknown>;
}

interface ServiceGroup {
  id: string;
  name: string;
  icon: React.ReactNode;
  tests: string[];
  results: TestResult[];
}

// Status indicator component with traffic light colors
function StatusIndicator({ status, size = 'md' }: { status: TestStatus; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const statusStyles = {
    operational: 'bg-[var(--color-confirmed)] shadow-[0_0_8px_var(--color-confirmed)]',
    degraded: 'bg-[var(--color-forming)] shadow-[0_0_8px_var(--color-forming)] animate-pulse',
    critical: 'bg-[var(--color-destructive)] shadow-[0_0_12px_var(--color-destructive)] animate-[pulse_0.75s_ease-in-out_infinite]',
    unknown: 'bg-gray-400 border border-dashed border-gray-500',
    running: 'bg-[var(--color-info)] shadow-[0_0_8px_var(--color-info)] animate-[pulse_0.5s_ease-in-out_infinite]',
  };

  return (
    <span
      className={`inline-block rounded-full ${sizeClasses[size]} ${statusStyles[status]}`}
      role="status"
      aria-label={status}
    />
  );
}

// Status icon component
function StatusIcon({ status }: { status: TestStatus }) {
  const iconClass = 'w-4 h-4';

  switch (status) {
    case 'operational':
      return <CheckCircle2 className={`${iconClass} text-[var(--color-confirmed)]`} />;
    case 'degraded':
      return <AlertTriangle className={`${iconClass} text-[var(--color-forming)]`} />;
    case 'critical':
      return <XCircle className={`${iconClass} text-[var(--color-destructive)]`} />;
    case 'running':
      return <RefreshCw className={`${iconClass} text-[var(--color-info)] animate-spin`} />;
    default:
      return <HelpCircle className={`${iconClass} text-gray-400`} />;
  }
}

// Individual test result card with expandable error details
function TestResultCard({ result }: { result: TestResult }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const hasError = result.status === 'critical' || result.status === 'degraded';
  const isExpandable = hasError && (result.message.length > 50 || result.details);

  const borderStyles = {
    operational: 'border-[var(--color-confirmed)]/30 hover:border-[var(--color-confirmed)]/60',
    degraded: 'border-[var(--color-forming)]/30 hover:border-[var(--color-forming)]/60',
    critical: 'border-[var(--color-destructive)]/50 hover:border-[var(--color-destructive)]',
    unknown: 'border-[var(--color-border)] border-dashed',
    running: 'border-[var(--color-info)]/50',
  };

  // Format error details for copying
  const getErrorText = () => {
    let text = `Test: ${result.name}\n`;
    text += `Status: ${result.status}\n`;
    text += `Message: ${result.message}\n`;
    if (result.latencyMs !== undefined) {
      text += `Latency: ${result.latencyMs}ms\n`;
    }
    if (result.details) {
      text += `Details: ${JSON.stringify(result.details, null, 2)}`;
    }
    return text;
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(getErrorText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = getErrorText();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`
        rounded-[var(--radius-organic)]
        bg-[var(--color-surface)] border-2 transition-colors
        ${borderStyles[result.status]}
        ${isExpandable ? 'cursor-pointer' : ''}
      `}
      onClick={() => isExpandable && setIsExpanded(!isExpanded)}
    >
      {/* Main row */}
      <div className="flex items-center gap-3 p-3">
        <StatusIndicator status={result.status} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[var(--color-ink)] truncate">
              {result.name}
            </span>
            {result.latencyMs !== undefined && result.status !== 'running' && (
              <span className="text-xs font-mono text-[var(--color-ink-muted)]">
                {result.latencyMs}ms
              </span>
            )}
          </div>
          <p className={`text-xs text-[var(--color-ink-muted)] ${isExpanded ? '' : 'truncate'}`}>
            {result.message}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <StatusIcon status={result.status} />
          {isExpandable && (
            <ChevronDown
              className={`w-4 h-4 text-[var(--color-ink-muted)] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          )}
        </div>
      </div>

      {/* Expanded details */}
      {isExpanded && (
        <div className="px-3 pb-3 pt-0">
          <div className="
            p-3 rounded-[var(--radius-sm)]
            bg-[var(--color-surface-sunken)]
            border border-[var(--color-border)]
          ">
            {/* Full error message */}
            <div className="mb-2">
              <p className="text-xs font-medium text-[var(--color-ink-muted)] mb-1">Error Message:</p>
              <p className="text-sm text-[var(--color-ink)] font-mono whitespace-pre-wrap break-all">
                {result.message}
              </p>
            </div>

            {/* Details if available */}
            {result.details && (
              <div className="mb-2">
                <p className="text-xs font-medium text-[var(--color-ink-muted)] mb-1">Details:</p>
                <pre className="text-xs text-[var(--color-ink)] font-mono whitespace-pre-wrap break-all overflow-x-auto">
                  {JSON.stringify(result.details, null, 2)}
                </pre>
              </div>
            )}

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="
                flex items-center gap-1.5
                px-2.5 py-1.5
                text-xs font-medium
                text-[var(--color-ink-muted)]
                bg-[var(--color-surface)]
                border border-[var(--color-border)]
                rounded-[var(--radius-sm)]
                hover:border-[var(--color-primary)]
                hover:text-[var(--color-primary)]
                transition-colors
              "
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy error for debugging
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Service group card
function ServiceGroupCard({
  group,
  isRunning,
  onRunTests,
}: {
  group: ServiceGroup;
  isRunning: boolean;
  onRunTests: () => void;
}) {
  const overallStatus: TestStatus = isRunning
    ? 'running'
    : group.results.length === 0
      ? 'unknown'
      : group.results.some(r => r.status === 'critical')
        ? 'critical'
        : group.results.some(r => r.status === 'degraded')
          ? 'degraded'
          : group.results.every(r => r.status === 'operational')
            ? 'operational'
            : 'unknown';

  const borderStyles = {
    operational: 'border-[var(--color-confirmed)]/20',
    degraded: 'border-[var(--color-forming)]/30',
    critical: 'border-[var(--color-destructive)]/40',
    unknown: 'border-[var(--color-border)]',
    running: 'border-[var(--color-info)]/40',
  };

  return (
    <div
      className={`
        bg-[var(--color-surface)] border-2 rounded-[var(--radius-organic)] p-4
        transition-all duration-300
        ${borderStyles[overallStatus]}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[var(--color-ink-muted)]">{group.icon}</span>
          <h3 className="font-display text-sm font-semibold text-[var(--color-ink)]">
            {group.name}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <StatusIndicator status={overallStatus} size="lg" />
          <button
            onClick={onRunTests}
            disabled={isRunning}
            className={`
              p-1.5 rounded-[var(--radius-sm)] transition-colors
              ${isRunning
                ? 'text-[var(--color-ink-muted)] cursor-not-allowed'
                : 'text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-sunken)]'
              }
            `}
            title={isRunning ? 'Running...' : 'Run tests for this service'}
          >
            <RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-2">
        {group.results.length > 0 ? (
          group.results.map((result, idx) => (
            <TestResultCard key={`${result.name}-${idx}`} result={result} />
          ))
        ) : (
          <div className="text-center py-4 text-sm text-[var(--color-ink-muted)]">
            {isRunning ? 'Running diagnostics...' : 'Click refresh to run tests'}
          </div>
        )}
      </div>
    </div>
  );
}

// Main dashboard component
export function SystemHealthDashboard() {
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [runningGroups, setRunningGroups] = useState<Set<string>>(new Set());
  const [lastChecked, setLastChecked] = useState<string | null>(null);
  const [overallStatus, setOverallStatus] = useState<TestStatus>('unknown');
  const [testDataIds, setTestDataIds] = useState<string[]>([]);

  // Service groups configuration
  const [serviceGroups, setServiceGroups] = useState<ServiceGroup[]>([
    {
      id: 'database',
      name: 'Database',
      icon: <Database className="w-5 h-5" />,
      tests: ['supabase', 'supabase-write'],
      results: [],
    },
    {
      id: 'payments',
      name: 'Payments',
      icon: <CreditCard className="w-5 h-5" />,
      tests: ['stripe', 'stripe-webhook'],
      results: [],
    },
    {
      id: 'email',
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      tests: ['email'],
      results: [],
    },
    {
      id: 'edge',
      name: 'Edge Functions',
      icon: <Zap className="w-5 h-5" />,
      tests: ['edge-functions'],
      results: [],
    },
    {
      id: 'cron',
      name: 'Scheduled Jobs',
      icon: <Clock className="w-5 h-5" />,
      tests: ['cron'],
      results: [],
    },
  ]);

  // Get auth token (simplified - in production use proper session)
  const getAuthToken = useCallback(async () => {
    // For now, use service role key from a secure endpoint
    // In production, this should verify admin session
    return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  }, []);

  // Run health checks
  const runHealthChecks = useCallback(async (tests: string[] = ['all']) => {
    const token = await getAuthToken();

    try {
      const response = await fetch('/api/admin/health-check', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tests }),
      });

      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }, [getAuthToken]);

  // Run all tests
  const handleRunAllTests = useCallback(async () => {
    setIsRunningAll(true);
    setRunningGroups(new Set(serviceGroups.map(g => g.id)));

    // Set all groups to running state
    setServiceGroups(prev =>
      prev.map(group => ({
        ...group,
        results: group.results.map(r => ({ ...r, status: 'running' as TestStatus })),
      }))
    );

    try {
      const data = await runHealthChecks(['all']);

      // Map results back to groups
      setServiceGroups(prev =>
        prev.map(group => {
          const groupResults = data.tests.filter((t: TestResult) => {
            const testName = t.name.toLowerCase();
            if (group.id === 'database') return testName.includes('supabase');
            if (group.id === 'payments') return testName.includes('stripe');
            if (group.id === 'email') return testName.includes('email') || testName.includes('resend');
            if (group.id === 'edge') return testName.startsWith('edge:');
            if (group.id === 'cron') return testName.startsWith('cron:');
            return false;
          });

          return {
            ...group,
            results: groupResults,
          };
        })
      );

      setOverallStatus(data.overall);
      setLastChecked(data.timestamp);
      if (data.testDataIds) {
        setTestDataIds(data.testDataIds);
      }
    } catch (error) {
      // Set all to critical on failure
      setServiceGroups(prev =>
        prev.map(group => ({
          ...group,
          results: [{
            name: group.name,
            status: 'critical',
            message: 'Health check request failed',
          }],
        }))
      );
      setOverallStatus('critical');
    } finally {
      setIsRunningAll(false);
      setRunningGroups(new Set());
    }
  }, [runHealthChecks, serviceGroups]);

  // Run tests for a specific group
  const handleRunGroupTests = useCallback(async (groupId: string) => {
    const group = serviceGroups.find(g => g.id === groupId);
    if (!group) return;

    setRunningGroups(prev => new Set([...Array.from(prev), groupId]));

    try {
      const data = await runHealthChecks(group.tests);

      setServiceGroups(prev =>
        prev.map(g => {
          if (g.id !== groupId) return g;

          const groupResults = data.tests.filter((t: TestResult) => {
            const testName = t.name.toLowerCase();
            if (g.id === 'database') return testName.includes('supabase');
            if (g.id === 'payments') return testName.includes('stripe');
            if (g.id === 'email') return testName.includes('email') || testName.includes('resend');
            if (g.id === 'edge') return testName.startsWith('edge:');
            if (g.id === 'cron') return testName.startsWith('cron:');
            return false;
          });

          return { ...g, results: groupResults };
        })
      );

      // Recalculate overall status
      const allResults = serviceGroups.flatMap(g => g.results);
      const hasAnyCritical = allResults.some(r => r.status === 'critical');
      const hasAnyDegraded = allResults.some(r => r.status === 'degraded');
      setOverallStatus(hasAnyCritical ? 'critical' : hasAnyDegraded ? 'degraded' : 'operational');

      setLastChecked(data.timestamp);
    } catch (error) {
      setServiceGroups(prev =>
        prev.map(g => {
          if (g.id !== groupId) return g;
          return {
            ...g,
            results: [{
              name: g.name,
              status: 'critical',
              message: 'Test request failed',
            }],
          };
        })
      );
    } finally {
      setRunningGroups(prev => {
        const next = new Set(prev);
        next.delete(groupId);
        return next;
      });
    }
  }, [runHealthChecks, serviceGroups]);

  // Cleanup test data
  const handleCleanup = useCallback(async () => {
    const token = await getAuthToken();

    try {
      await fetch('/api/admin/health-check', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setTestDataIds([]);
    } catch (error) {
      console.error('Cleanup failed:', error);
    }
  }, [getAuthToken]);

  // Overall status display
  const overallStatusText = {
    operational: 'All Systems Operational',
    degraded: 'Some Services Degraded',
    critical: 'Critical Issues Detected',
    unknown: 'Status Unknown',
    running: 'Running Diagnostics...',
  };

  const overallStatusBg = {
    operational: 'bg-[var(--color-success-bg)] border-[var(--color-success-border)]',
    degraded: 'bg-[var(--color-warning-bg)] border-[var(--color-warning-border)]',
    critical: 'bg-[var(--color-destructive-bg)] border-[var(--color-destructive-border)]',
    unknown: 'bg-[var(--color-surface-sunken)] border-[var(--color-border)]',
    running: 'bg-[var(--color-info-bg)] border-[var(--color-info-border)]',
  };

  return (
    <div className="space-y-4">
      {/* Overall Status Banner */}
      <div
        className={`
          flex items-center justify-between p-4 rounded-[var(--radius-organic)] border-2
          ${overallStatusBg[isRunningAll ? 'running' : overallStatus]}
        `}
      >
        <div className="flex items-center gap-3">
          <StatusIndicator status={isRunningAll ? 'running' : overallStatus} size="lg" />
          <div>
            <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">
              {overallStatusText[isRunningAll ? 'running' : overallStatus]}
            </h2>
            {lastChecked && (
              <p className="text-xs text-[var(--color-ink-muted)]">
                Last checked: {new Date(lastChecked).toLocaleString()}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {testDataIds.length > 0 && (
            <button
              onClick={handleCleanup}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[var(--color-ink-muted)] bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-destructive)] hover:text-[var(--color-destructive)] transition-colors"
              title="Clean up test data"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Cleanup
            </button>
          )}
          <button
            onClick={handleRunAllTests}
            disabled={isRunningAll}
            className={`
              flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-[var(--radius-organic)]
              transition-all duration-200
              ${isRunningAll
                ? 'bg-[var(--color-surface-sunken)] text-[var(--color-ink-muted)] cursor-not-allowed'
                : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-sm hover:shadow-md'
              }
            `}
          >
            <Activity className={`w-4 h-4 ${isRunningAll ? 'animate-pulse' : ''}`} />
            {isRunningAll ? 'Running...' : 'Run All Tests'}
          </button>
        </div>
      </div>

      {/* Service Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {serviceGroups.map(group => (
          <ServiceGroupCard
            key={group.id}
            group={group}
            isRunning={runningGroups.has(group.id)}
            onRunTests={() => handleRunGroupTests(group.id)}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[var(--color-ink-muted)]">
        <div className="flex items-center gap-1.5">
          <StatusIndicator status="operational" size="sm" />
          <span>Operational</span>
        </div>
        <div className="flex items-center gap-1.5">
          <StatusIndicator status="degraded" size="sm" />
          <span>Degraded</span>
        </div>
        <div className="flex items-center gap-1.5">
          <StatusIndicator status="critical" size="sm" />
          <span>Critical</span>
        </div>
        <div className="flex items-center gap-1.5">
          <StatusIndicator status="unknown" size="sm" />
          <span>Not Tested</span>
        </div>
      </div>
    </div>
  );
}
