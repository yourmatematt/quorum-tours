'use client';

/**
 * FeaturedOperators
 * Admin component to manage which operators appear in the home page featured section.
 */

import { useState, useEffect, useCallback } from 'react';
import { Star, MapPin, ExternalLink } from 'lucide-react';
import { AdminSection, AdminCard } from './AdminSection';
import Link from 'next/link';

interface OperatorData {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  logo_url: string | null;
  base_location: string | null;
  is_featured: boolean;
}

export function FeaturedOperators() {
  const [operators, setOperators] = useState<OperatorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchOperators = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/operators');
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
    fetchOperators();
  }, [fetchOperators]);

  async function toggleFeatured(op: OperatorData) {
    setTogglingId(op.id);
    try {
      const res = await fetch(`/api/admin/operators/${op.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_featured: !op.is_featured }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      // Update local state
      setOperators(prev =>
        prev.map(o => o.id === op.id ? { ...o, is_featured: !o.is_featured } : o)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update');
    } finally {
      setTogglingId(null);
    }
  }

  const featured = operators.filter(o => o.is_featured);
  const unfeatured = operators.filter(o => !o.is_featured);

  return (
    <AdminSection
      title="Featured Operators"
      subtitle="Operators shown on the home page. Drag-to-reorder is not supported — display order is alphabetical."
    >
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
          <div className="text-center py-6">
            <p className="text-[var(--color-destructive)] mb-2">{error}</p>
            <button
              onClick={fetchOperators}
              className="text-sm text-[var(--color-primary)] hover:underline"
            >
              Try again
            </button>
          </div>
        </AdminCard>
      ) : (
        <>
          {/* Currently featured */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[var(--color-ink-muted)] mb-3">
              Currently featured ({featured.length})
            </h3>
            {featured.length === 0 ? (
              <p className="text-sm text-[var(--color-ink-subtle)] py-4">
                No operators are featured. Use the list below to add operators to the home page.
              </p>
            ) : (
              <div className="space-y-2">
                {featured.map(op => (
                  <OperatorRow
                    key={op.id}
                    operator={op}
                    onToggle={() => toggleFeatured(op)}
                    isToggling={togglingId === op.id}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Available operators */}
          <div>
            <h3 className="text-sm font-medium text-[var(--color-ink-muted)] mb-3">
              Available operators ({unfeatured.length})
            </h3>
            <div className="space-y-2">
              {unfeatured.map(op => (
                <OperatorRow
                  key={op.id}
                  operator={op}
                  onToggle={() => toggleFeatured(op)}
                  isToggling={togglingId === op.id}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </AdminSection>
  );
}

function OperatorRow({
  operator,
  onToggle,
  isToggling,
}: {
  operator: OperatorData;
  onToggle: () => void;
  isToggling: boolean;
}) {
  return (
    <AdminCard>
      <div className="flex items-center justify-between gap-3">
        {/* Left: photo + info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-full bg-[var(--color-surface-sunken)] flex items-center justify-center overflow-hidden flex-shrink-0">
            {operator.logo_url ? (
              <img src={operator.logo_url} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm text-[var(--color-ink-subtle)]">
                {operator.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-sm text-[var(--color-ink)] truncate">
              {operator.name}
            </p>
            {operator.base_location && (
              <p className="text-xs text-[var(--color-ink-muted)] flex items-center gap-1">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                {operator.base_location}
              </p>
            )}
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/operators/${operator.slug}`}
            className="p-1.5 text-[var(--color-ink-subtle)] hover:text-[var(--color-primary)] transition-colors"
            title="View public profile"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={onToggle}
            disabled={isToggling}
            className={`
              inline-flex items-center gap-1.5
              px-3 py-1.5
              text-xs font-medium
              rounded-[var(--radius-sm)]
              transition-colors
              disabled:opacity-50
              ${operator.is_featured
                ? 'bg-[var(--color-forming-bg)] text-[var(--color-forming)] hover:bg-[var(--color-destructive-bg)] hover:text-[var(--color-destructive)]'
                : 'bg-[var(--color-surface-sunken)] text-[var(--color-ink-muted)] hover:bg-[var(--color-confirmed-bg)] hover:text-[var(--color-confirmed)]'
              }
            `}
          >
            <Star className={`w-3.5 h-3.5 ${operator.is_featured ? 'fill-current' : ''}`} />
            {isToggling ? '...' : operator.is_featured ? 'Featured' : 'Feature'}
          </button>
        </div>
      </div>
    </AdminCard>
  );
}
