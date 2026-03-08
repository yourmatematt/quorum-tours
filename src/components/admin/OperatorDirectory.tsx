'use client';

/**
 * Operator Directory
 * Searchable list of all approved operators with performance metrics and scoring.
 */

import { useState, useEffect, useCallback } from 'react';
import { Search, MapPin, Calendar, TrendingUp, ExternalLink } from 'lucide-react';
import { AdminSection, AdminStatCard, AdminCard } from './AdminSection';
import Link from 'next/link';

interface OperatorData {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  logo_url: string | null;
  hero_image_url: string | null;
  base_location: string | null;
  specialties: string[] | null;
  is_verified: boolean;
  is_featured: boolean;
  created_at: string;
  stripe_charges_enabled: boolean;
  stripe_payouts_enabled: boolean;
  live_tours: number;
  completed_tours: number;
  failed_tours: number;
  total_tours: number;
  total_reservations: number;
  quorum_rate: number | null;
}

interface ScoreBreakdown {
  total: number;
  liveTours: number;
  quorumRate: number;
  profileCompleteness: number;
  stripeSetup: number;
  tourVolume: number;
}

function calculateScore(op: OperatorData): ScoreBreakdown {
  // Has live tours (25 points)
  const liveTours = op.live_tours >= 1 ? 25 : 0;

  // Quorum success rate (30 points)
  const quorumRate = op.quorum_rate !== null ? Math.round((op.quorum_rate / 100) * 30) : 0;

  // Profile completeness (20 points)
  const profileFields = [
    op.description,
    op.tagline,
    op.specialties && op.specialties.length > 0 ? op.specialties : null,
    op.logo_url,
    op.hero_image_url,
  ];
  const filledFields = profileFields.filter(Boolean).length;
  const profileCompleteness = Math.round((filledFields / profileFields.length) * 20);

  // Stripe setup (10 points)
  const stripeSetup = op.stripe_charges_enabled && op.stripe_payouts_enabled ? 10 : 0;

  // Tour volume (15 points) — min(total_tours / 5, 1) × 15
  const tourVolume = Math.round(Math.min(op.total_tours / 5, 1) * 15);

  return {
    total: liveTours + quorumRate + profileCompleteness + stripeSetup + tourVolume,
    liveTours,
    quorumRate,
    profileCompleteness,
    stripeSetup,
    tourVolume,
  };
}

function ScoreBadge({ score }: { score: number }) {
  let colorClass: string;
  if (score >= 70) {
    colorClass = 'bg-[var(--color-confirmed)] text-white';
  } else if (score >= 40) {
    colorClass = 'bg-[var(--color-forming)] text-white';
  } else {
    colorClass = 'bg-[var(--color-destructive)] text-white';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-full ${colorClass}`}>
      {score}
    </span>
  );
}

export function OperatorDirectory() {
  const [operators, setOperators] = useState<OperatorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchOperators = useCallback(async (search: string) => {
    setIsLoading(true);
    try {
      const url = search
        ? `/api/admin/operators?search=${encodeURIComponent(search)}`
        : '/api/admin/operators';

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);
      setOperators(data.operators);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch operators');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOperators(debouncedSearch);
  }, [debouncedSearch, fetchOperators]);

  // Summary stats
  const scores = operators.map(op => calculateScore(op).total);
  const avgScore = scores.length > 0
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0;
  const needingAttention = scores.filter(s => s < 40).length;

  return (
    <AdminSection
      title="Operator Directory"
      subtitle="All approved operators with performance metrics"
    >
      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-muted)]" />
        <input
          type="text"
          placeholder="Search by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm rounded-[var(--radius-organic)] border-2 border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
        />
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <AdminStatCard label="Total Operators" value={operators.length} variant="primary" />
        <AdminStatCard label="Avg Score" value={avgScore} />
        <AdminStatCard
          label="Needing Attention"
          value={needingAttention}
          variant={needingAttention > 0 ? 'destructive' : 'confirmed'}
        />
      </div>

      {/* Operator list */}
      {isLoading ? (
        <AdminCard>
          <div className="flex items-center justify-center py-8 text-[var(--color-ink-muted)]">
            <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading operators...
          </div>
        </AdminCard>
      ) : error ? (
        <AdminCard>
          <div className="text-center py-8">
            <p className="text-[var(--color-destructive)] mb-2">Failed to load operators</p>
            <p className="text-sm text-[var(--color-ink-muted)]">{error}</p>
            <button
              onClick={() => fetchOperators(debouncedSearch)}
              className="mt-3 px-4 py-2 text-sm font-medium text-[var(--color-primary)] hover:underline"
            >
              Try again
            </button>
          </div>
        </AdminCard>
      ) : operators.length === 0 ? (
        <AdminCard>
          <p className="text-center text-[var(--color-ink-muted)] py-6">
            {debouncedSearch ? 'No operators match your search' : 'No approved operators yet'}
          </p>
        </AdminCard>
      ) : (
        <div className="space-y-3">
          {operators.map((op) => {
            const score = calculateScore(op);
            return (
              <Link
                key={op.id}
                href={`/admin/operators/${op.id}`}
                className="block"
              >
                <AdminCard interactive>
                  <div className="flex items-center justify-between gap-4">
                    {/* Left: Name + location */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-[var(--color-ink)] truncate">
                          {op.name}
                        </h3>
                        <ScoreBadge score={score.total} />
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[var(--color-ink-muted)]">
                        {op.base_location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {op.base_location}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Verified {new Date(op.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>

                    {/* Right: Stats */}
                    <div className="flex items-center gap-4 text-xs text-[var(--color-ink-muted)] shrink-0">
                      <div className="text-center">
                        <p className="font-mono text-sm font-semibold text-[var(--color-ink)]">
                          {op.live_tours}
                        </p>
                        <p>Live</p>
                      </div>
                      <div className="text-center">
                        <p className="font-mono text-sm font-semibold text-[var(--color-confirmed)]">
                          {op.completed_tours}
                        </p>
                        <p>Done</p>
                      </div>
                      <div className="text-center">
                        <p className="font-mono text-sm font-semibold text-[var(--color-destructive)]">
                          {op.failed_tours}
                        </p>
                        <p>Failed</p>
                      </div>
                      <div className="text-center">
                        <p className="font-mono text-sm font-semibold text-[var(--color-ink)]">
                          {op.quorum_rate !== null ? `${op.quorum_rate}%` : '—'}
                        </p>
                        <p>Quorum</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-[var(--color-ink-subtle)]" />
                    </div>
                  </div>
                </AdminCard>
              </Link>
            );
          })}
        </div>
      )}
    </AdminSection>
  );
}
