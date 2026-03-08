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
  Pencil,
  X,
  Plus,
  Loader2,
  Check,
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
  established_year: number | null;
  metadata: Record<string, unknown> | null;
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

interface ProfileFormData {
  name: string;
  description: string;
  tagline: string;
  specialties: string[];
  logo_url: string;
  base_location: string;
  years_experience: string;
  vessel_name: string;
  why_quorum: string;
  established_year: string;
  access_areas: string;
  max_group_size: string;
}

function buildFormData(op: OperatorDetail): ProfileFormData {
  const meta = (op.metadata ?? {}) as Record<string, unknown>;
  return {
    name: op.name ?? '',
    description: op.description ?? '',
    tagline: op.tagline ?? '',
    specialties: op.specialties ?? [],
    logo_url: op.logo_url ?? '',
    base_location: op.base_location ?? '',
    years_experience: meta.years_experience != null ? String(meta.years_experience) : '',
    vessel_name: (meta.vessel_name as string) ?? '',
    why_quorum: (meta.why_quorum as string) ?? '',
    established_year: op.established_year != null ? String(op.established_year) : '',
    access_areas: (meta.access_areas as string) ?? '',
    max_group_size: meta.max_group_size != null ? String(meta.max_group_size) : '',
  };
}

/* ---- Tag Input ---- */
function TagInput({
  tags,
  onChange,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  const [input, setInput] = useState('');

  function addTag() {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInput('');
  }

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full border border-[var(--color-primary)]/20"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(tags.filter((t) => t !== tag))}
              className="hover:text-[var(--color-destructive)] transition-colors"
              aria-label={`Remove ${tag}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        {tags.length === 0 && (
          <span className="text-xs text-[var(--color-ink-muted)]">No specialties added</span>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder="Type and press Enter"
          className="flex-1 px-3 py-1.5 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] focus:border-[var(--color-primary)] focus:outline-none"
        />
        <button
          type="button"
          onClick={addTag}
          disabled={!input.trim()}
          className="px-2.5 py-1.5 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-primary)] transition-colors disabled:opacity-40"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ---- Field helper ---- */
function Field({
  label,
  htmlFor,
  hint,
  children,
  span2,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: React.ReactNode;
  span2?: boolean;
}) {
  return (
    <div className={span2 ? 'col-span-2' : ''}>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-[var(--color-ink)] mb-1"
      >
        {label}
      </label>
      {children}
      {hint && (
        <p className="text-xs text-[var(--color-ink-muted)] mt-1">{hint}</p>
      )}
    </div>
  );
}

const inputClass =
  'w-full px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] focus:border-[var(--color-primary)] focus:outline-none';

export default function AdminOperatorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const operatorId = params.id as string;

  const [operator, setOperator] = useState<OperatorDetail | null>(null);
  const [tours, setTours] = useState<TourData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Profile editor state
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<ProfileFormData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ variant: 'success' | 'error'; message: string } | null>(null);

  function openEditor() {
    if (operator) {
      setForm(buildFormData(operator));
      setIsEditing(true);
      setToast(null);
    }
  }

  function closeEditor() {
    setIsEditing(false);
    setForm(null);
  }

  function updateField<K extends keyof ProfileFormData>(key: K, value: ProfileFormData[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  async function handleSave() {
    if (!form) return;
    setIsSaving(true);
    setToast(null);

    const payload: Record<string, unknown> = {
      name: form.name,
      description: form.description || null,
      tagline: form.tagline || null,
      logo_url: form.logo_url || null,
      base_location: form.base_location || null,
      specialties: form.specialties,
      established_year: form.established_year ? Number(form.established_year) : null,
      // Metadata fields
      years_experience: form.years_experience ? Number(form.years_experience) : null,
      vessel_name: form.vessel_name || null,
      why_quorum: form.why_quorum || null,
      access_areas: form.access_areas || null,
      max_group_size: form.max_group_size ? Number(form.max_group_size) : null,
    };

    try {
      const res = await fetch(`/api/admin/operators/${operatorId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(data.error || 'Failed to save');
      }

      // Refresh operator data
      const refreshRes = await fetch(`/api/admin/operators/${operatorId}`);
      const refreshData = await refreshRes.json();
      if (refreshRes.ok) {
        setOperator(refreshData.operator);
        setTours(refreshData.tours);
      }

      setToast({ variant: 'success', message: 'Profile updated.' });
      setIsEditing(false);
      setForm(null);
    } catch (err) {
      setToast({ variant: 'error', message: err instanceof Error ? err.message : 'Failed to save changes.' });
    } finally {
      setIsSaving(false);
    }
  }

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
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={openEditor}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[var(--color-ink)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              <Pencil className="w-4 h-4" />
              Edit Profile
            </button>
            <a
              href={`/operators/${operator.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[var(--color-primary)] border-2 border-[var(--color-primary)] rounded-[var(--radius-organic)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View public profile
            </a>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`flex items-center gap-2 px-4 py-3 text-sm rounded-[var(--radius-organic)] border-2 ${
            toast.variant === 'success'
              ? 'bg-[var(--color-confirmed)]/10 border-[var(--color-confirmed)] text-[var(--color-confirmed)]'
              : 'bg-[var(--color-destructive)]/10 border-[var(--color-destructive)] text-[var(--color-destructive)]'
          }`}
        >
          {toast.variant === 'success' ? (
            <Check className="w-4 h-4 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0" />
          )}
          {toast.message}
          <button
            onClick={() => setToast(null)}
            className="ml-auto"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Profile Editor */}
      {isEditing && form && (
        <AdminSection
          title="Edit Operator Profile"
          actions={
            <button
              onClick={closeEditor}
              className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
              aria-label="Close editor"
            >
              <X className="w-5 h-5" />
            </button>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Name" htmlFor="ed-name">
              <input
                id="ed-name"
                type="text"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Location / Base" htmlFor="ed-location">
              <input
                id="ed-location"
                type="text"
                value={form.base_location}
                onChange={(e) => updateField('base_location', e.target.value)}
                placeholder="Melbourne, Victoria"
                className={inputClass}
              />
            </Field>

            <Field label="Short Bio" htmlFor="ed-tagline" span2 hint="Single paragraph shown as headline on the profile">
              <input
                id="ed-tagline"
                type="text"
                value={form.tagline}
                onChange={(e) => updateField('tagline', e.target.value)}
                placeholder="Wetland and waterbird specialist"
                className={inputClass}
              />
            </Field>

            <Field label="Bio" htmlFor="ed-description" span2 hint="Full about section. Use blank lines between paragraphs.">
              <textarea
                id="ed-description"
                rows={6}
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                className={`${inputClass} resize-y`}
              />
            </Field>

            <Field label="Profile Photo URL" htmlFor="ed-photo" span2 hint="Direct URL to a square image (400x400 min)">
              <input
                id="ed-photo"
                type="url"
                value={form.logo_url}
                onChange={(e) => updateField('logo_url', e.target.value)}
                placeholder="https://..."
                className={inputClass}
              />
            </Field>

            <Field label="Specialties" span2>
              <TagInput
                tags={form.specialties}
                onChange={(tags) => updateField('specialties', tags)}
              />
            </Field>

            <Field label="Years Experience" htmlFor="ed-years">
              <input
                id="ed-years"
                type="number"
                min="0"
                value={form.years_experience}
                onChange={(e) => updateField('years_experience', e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Operating Since (Year)" htmlFor="ed-established" hint="Year the business started">
              <input
                id="ed-established"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                value={form.established_year}
                onChange={(e) => updateField('established_year', e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Vessel Name" htmlFor="ed-vessel" hint="Leave blank if not applicable">
              <input
                id="ed-vessel"
                type="text"
                value={form.vessel_name}
                onChange={(e) => updateField('vessel_name', e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Max Group Size" htmlFor="ed-group-size">
              <input
                id="ed-group-size"
                type="number"
                min="1"
                value={form.max_group_size}
                onChange={(e) => updateField('max_group_size', e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Access Areas" htmlFor="ed-access" span2 hint="Regions, parks, or restricted areas this operator can access">
              <input
                id="ed-access"
                type="text"
                value={form.access_areas}
                onChange={(e) => updateField('access_areas', e.target.value)}
                placeholder="Western Treatment Plant, Werribee South, You Yangs"
                className={inputClass}
              />
            </Field>

            <Field label="&ldquo;Why I Joined Quorum&rdquo; Quote" htmlFor="ed-why-quorum" span2>
              <textarea
                id="ed-why-quorum"
                rows={3}
                value={form.why_quorum}
                onChange={(e) => updateField('why_quorum', e.target.value)}
                placeholder="A personal quote about why this operator joined the platform..."
                className={`${inputClass} resize-y`}
              />
            </Field>
          </div>

          {/* Save / Cancel */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[var(--color-border)]">
            <button
              onClick={closeEditor}
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-primary)] transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !form.name.trim()}
              className="px-4 py-2 text-sm font-medium bg-[var(--color-primary)] text-white rounded-[var(--radius-organic)] hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </span>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </AdminSection>
      )}

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
