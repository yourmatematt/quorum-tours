'use client';

import { useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

interface AdminCollapsibleProps {
  children: React.ReactNode;
  /** Section title */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Actions to display in header (always visible) */
  actions?: React.ReactNode;
  /** Default collapsed state */
  defaultCollapsed?: boolean;
  /** Badge count to show next to title */
  badge?: number;
  /** Badge variant */
  badgeVariant?: 'default' | 'warning' | 'destructive';
}

/**
 * AdminCollapsible - Collapsible section wrapper
 *
 * Allows sections to be collapsed to manage information density.
 * Keyboard accessible with Enter/Space to toggle.
 */
export function AdminCollapsible({
  children,
  title,
  subtitle,
  actions,
  defaultCollapsed = false,
  badge,
  badgeVariant = 'default',
}: AdminCollapsibleProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const toggle = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    },
    [toggle]
  );

  const badgeColors = {
    default: 'bg-[var(--color-primary)] text-white',
    warning: 'bg-[var(--color-forming)] text-white',
    destructive: 'bg-[var(--color-destructive)] text-white',
  };

  return (
    <section className="bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] overflow-hidden">
      {/* Header - Always visible, clickable to toggle */}
      <div
        role="button"
        tabIndex={0}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-[var(--color-surface-sunken)]/50 transition-colors select-none"
        aria-expanded={!isCollapsed}
        aria-controls={`collapsible-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div className="flex items-center gap-3">
          <ChevronDown
            className={`w-5 h-5 text-[var(--color-ink-muted)] transition-transform duration-200 ${
              isCollapsed ? '-rotate-90' : ''
            }`}
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">
                {title}
              </h2>
              {badge !== undefined && badge > 0 && (
                <span
                  className={`px-2 py-0.5 text-xs font-semibold rounded-full ${badgeColors[badgeVariant]}`}
                >
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-sm text-[var(--color-ink-muted)] mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {actions && (
          <div
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {actions}
          </div>
        )}
      </div>

      {/* Content - Collapsible */}
      <div
        id={`collapsible-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className={`transition-all duration-200 ease-in-out ${
          isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[2000px] opacity-100'
        }`}
        style={{ overflow: isCollapsed ? 'hidden' : 'visible' }}
      >
        <div className="px-6 pb-6 pt-0">{children}</div>
      </div>
    </section>
  );
}
