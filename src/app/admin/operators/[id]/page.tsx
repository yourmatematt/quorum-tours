'use client';

/**
 * Admin Operator Detail Page
 * Shows full metrics, profile health, improvement suggestions, and tour list.
 */

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ExternalLink,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';
import { AdminSection, AdminStatCard, AdminCard } from '@/components/admin/AdminSection';

interface OperatorDetail {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  logo_url: string | null;
  hero_image_url: string | null;
  base_location: string | null;
  specialties: string[] | null;
  languages: string[] | null;
  is_verified: boolean;
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

interface TourData {
  id: string;
  title: string;
  status: string;
  start_date: string | null;
  end_date: string | null;
  min_participants: number | null;
  max_participants: number | null;
  price_cents: number | null;
  created_at: string;
  reservation_count: number;
}

function calculateScore(op: OperatorDetail) {
  const liveTours = op.live_tours >= 1 ? 25 : 0;
  const quorumRate = op.quorum_rate !== null ? Math.round((op.quorum_rate / 100) * 30) : 0;
  const profileFields = [
    op.description,
    op.tagline,
    op.specialties && op.specialties.length > 0 ? op.specialties : null,
    op.logo_url,
    op.hero_image_url,
  ];
  const filledFields = profileFields.filter(Boolean).length;
  const profileCompleteness = Math.round((filledFields / profileFields.length) * 20);
  const stripeSetup = op.stripe_charges_enabled && op.stripe_payouts_enabled ? 10 : 0;
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
  let label: string;
  if (score >= 70) {
    colorClass = 'bg-[var(--color-confirmed)] text-white';
    label = 'Healthy';
  } else if (score >= 40) {
    colorClass = 'bg-[var(--color-forming)] text-white';
    label = 'Needs Work';
  } else {
    colorClass = 'bg-[var(--color-destructive)] text-white';
    label = 'At Risk';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm font-bold rounded-full ${colorClass}`}>
      {score} — {label}
    </span>
  );
}

const statusColors: Record<string, string> = {
  forming: 'bg-[var(--color-forming)]/10 text-[var(--color-forming)] border-[var(--color-forming)]',
  payment_pending: 'bg-[var(--color-forming)]/10 text-[var(--color-forming)] border-[var(--color-forming)]',
  confirmed: 'bg-[var(--color-confirmed)]/10 text-[var(--color-confirmed)] border-[var(--color-confirmed)]',
  completed: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]',
  cancelled: 'bg-[var(--color-destructive)]/10 text-[var(--color-destructive)] border-[var(--color-destructive)]',
};

export default function AdminOperatorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const operatorId = params.id as string;

  const [operator, setOperator] = useState<OperatorDetail | null>(null);
  const [tours, setTours] = useState<TourData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/admin/operators/${operatorId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setOperator(data.operator);
        setTours(data.tours);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load operator');
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [operatorId]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center py-16 text-[var(--color-ink-muted)]">
          <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading operator...
        </div>
      </div>
    );
  }

  if (error || !operator) {
    return (
      <div className="max-w-7xl mx-auto">
        <AdminCard>
          <div className="text-center py-8">
            <p className="text-[var(--color-destructive)] mb-2">{error || 'Operator not found'}</p>
            <button
              onClick={() => router.push('/admin/operators')}
              className="mt-3 px-4 py-2 text-sm font-medium text-[var(--color-primary)] hover:underline"
            >
              Back to operators
            </button>
          </div>
        </AdminCard>
      </div>
    );
  }

  const score = calculateScore(operator);

  // Profile health checklist
  const profileChecks = [
    { label: 'Description', filled: !!operator.description },
    { label: 'Tagline', filled: !!operator.tagline },
    { label: 'Specialties', filled: !!(operator.specialties && operator.specialties.length > 0) },
    { label: 'Logo', filled: !!operator.logo_url },
    { label: 'Hero image', filled: !!operator.hero_image_url },
  ];

  // Improvement suggestions
  const suggestions: string[] = [];
  if (operator.live_tours === 0) {
    suggestions.push('No live tours — encourage them to create one');
  }
  if (operator.quorum_rate !== null && operator.quorum_rate < 50) {
    suggestions.push('Low quorum rate — suggest smaller group sizes or better descriptions');
  }
  if (!operator.logo_url) {
    suggestions.push('Missing profile photo — suggest adding a logo');
  }
  if (!operator.stripe_charges_enabled || !operator.stripe_payouts_enabled) {
    suggestions.push("Stripe not fully set up — payouts won't work");
  }
  if (!operator.description) {
    suggestions.push('Missing description — profile will appear incomplete to birders');
  }
  if (!operator.tagline) {
    suggestions.push('Missing tagline — add a short summary of their operation');
  }
  if (operator.total_tours === 0) {
    suggestions.push("No tours created yet — they haven't started listing");
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Back button + Header */}
      <div>
        <button
          onClick={() => router.push('/admin/operators')}
          className="flex items-center gap-1.5 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to operators
        </button>

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="font-display text-3xl font-semibold text-[var(--color-ink)]">
                {operator.name}
              </h1>
              <ScoreBadge score={score.total} />
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--color-ink-muted)]">
              {operator.base_location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {operator.base_location}
                </span>
              )}
              <span>
                Verified {new Date(operator.created_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
          <a
            href={`/operators/${operator.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[var(--color-primary)] border-2 border-[var(--color-primary)] rounded-[var(--radius-organic)] hover:bg-[var(--color-primary)] hover:text-white transition-colors shrink-0"
          >
            <ExternalLink className="w-4 h-4" />
            View public profile
          </a>
        </div>
      </div>

      {/* Metrics cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AdminStatCard label="Live Tours" value={operator.live_tours} variant="forming" />
        <AdminStatCard label="Completed" value={operator.completed_tours} variant="confirmed" />
        <AdminStatCard label="Failed" value={operator.failed_tours} variant="destructive" />
        <AdminStatCard
          label="Quorum Rate"
          value={operator.quorum_rate !== null ? `${operator.quorum_rate}%` : '—'}
          variant={
            operator.quorum_rate === null
              ? 'default'
              : operator.quorum_rate >= 70
                ? 'confirmed'
                : operator.quorum_rate >= 40
                  ? 'forming'
                  : 'destructive'
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Health */}
        <AdminSection title="Profile Health" compact>
          <div className="space-y-2">
            {profileChecks.map((check) => (
              <div key={check.label} className="flex items-center gap-2 text-sm">
                {check.filled ? (
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-confirmed)]" />
                ) : (
                  <XCircle className="w-4 h-4 text-[var(--color-destructive)]" />
                )}
                <span className={check.filled ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink-muted)]'}>
                  {check.label}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-2 text-sm pt-2 border-t border-[var(--color-border)]">
              {operator.stripe_charges_enabled && operator.stripe_payouts_enabled ? (
                <CheckCircle2 className="w-4 h-4 text-[var(--color-confirmed)]" />
              ) : (
                <XCircle className="w-4 h-4 text-[var(--color-destructive)]" />
              )}
              <span className={
                operator.stripe_charges_enabled && operator.stripe_payouts_enabled
                  ? 'text-[var(--color-ink)]'
                  : 'text-[var(--color-ink-muted)]'
              }>
                Stripe payments active
              </span>
            </div>
          </div>
        </AdminSection>

        {/* Score Breakdown */}
        <AdminSection title="Score Breakdown" compact>
          <div className="space-y-2.5">
            {[
              { label: 'Live tours', value: score.liveTours, max: 25 },
              { label: 'Quorum success rate', value: score.quorumRate, max: 30 },
              { label: 'Profile completeness', value: score.profileCompleteness, max: 20 },
              { label: 'Stripe setup', value: score.stripeSetup, max: 10 },
              { label: 'Tour volume', value: score.tourVolume, max: 15 },
            ].map((factor) => (
              <div key={factor.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[var(--color-ink-muted)]">{factor.label}</span>
                  <span className="font-mono text-[var(--color-ink)]">
                    {factor.value}/{factor.max}
                  </span>
                </div>
                <div className="h-1.5 bg-[var(--color-surface-sunken)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--color-primary)] rounded-full transition-all"
                    style={{ width: `${(factor.value / factor.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </AdminSection>
      </div>

      {/* Improvement Suggestions */}
      {suggestions.length > 0 && (
        <AdminSection title="Areas for Improvement" compact>
          <div className="space-y-2">
            {suggestions.map((suggestion, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-[var(--color-forming)] shrink-0 mt-0.5" />
                <span className="text-[var(--color-ink-muted)]">{suggestion}</span>
              </div>
            ))}
          </div>
        </AdminSection>
      )}

      {/* Tour List */}
      <AdminSection
        title="Tours"
        subtitle={`${tours.length} total tours`}
      >
        {tours.length === 0 ? (
          <p className="text-sm text-[var(--color-ink-muted)] py-4 text-center">
            No tours created yet
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[var(--color-border)]">
                  <th className="text-left py-2 pr-4 text-xs font-medium text-[var(--color-ink-muted)]">Tour</th>
                  <th className="text-left py-2 px-4 text-xs font-medium text-[var(--color-ink-muted)]">Status</th>
                  <th className="text-left py-2 px-4 text-xs font-medium text-[var(--color-ink-muted)]">Dates</th>
                  <th className="text-right py-2 px-4 text-xs font-medium text-[var(--color-ink-muted)]">Quorum</th>
                  <th className="text-right py-2 pl-4 text-xs font-medium text-[var(--color-ink-muted)]">Reservations</th>
                </tr>
              </thead>
              <tbody>
                {tours.map((tour) => (
                  <tr key={tour.id} className="border-b border-[var(--color-border)]">
                    <td className="py-3 pr-4">
                      <p className="font-medium text-[var(--color-ink)] truncate max-w-[250px]">
                        {tour.title}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full border ${
                        statusColors[tour.status] || 'text-[var(--color-ink-muted)] border-[var(--color-border)]'
                      }`}>
                        {tour.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[var(--color-ink-muted)]">
                      {tour.start_date
                        ? new Date(tour.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                        : '—'}
                      {tour.end_date && tour.start_date !== tour.end_date && (
                        <> – {new Date(tour.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-[var(--color-ink-muted)]">
                      {tour.reservation_count}/{tour.min_participants || '?'}
                    </td>
                    <td className="py-3 pl-4 text-right font-mono text-[var(--color-ink)]">
                      {tour.reservation_count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminSection>
    </div>
  );
}
