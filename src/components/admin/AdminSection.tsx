import React from 'react';

interface AdminSectionProps {
  children: React.ReactNode;
  /** Optional title for the section */
  title?: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Actions to display in the header */
  actions?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Compact mode reduces padding */
  compact?: boolean;
}

/**
 * AdminSection - Consistent wrapper for admin dashboard sections
 *
 * Provides unified styling with semantic tokens:
 * - Surface-raised background
 * - 2px border with organic radius
 * - Consistent padding (p-6 default, p-4 compact)
 */
export function AdminSection({
  children,
  title,
  subtitle,
  actions,
  className = '',
  compact = false,
}: AdminSectionProps) {
  const padding = compact ? 'p-4' : 'p-6';

  return (
    <section
      className={`
        bg-[var(--color-surface-raised)]
        border-2 border-[var(--color-border)]
        rounded-[var(--radius-organic)]
        ${padding}
        ${className}
      `}
    >
      {(title || actions) && (
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            {title && (
              <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-[var(--color-ink-muted)] mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div className="ml-4">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

interface AdminCardProps {
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Make card interactive (hover state) */
  interactive?: boolean;
  /** onClick handler for interactive cards */
  onClick?: () => void;
}

/**
 * AdminCard - Inner card component for admin sections
 *
 * Used for list items, detail cards, etc. within AdminSection
 */
export function AdminCard({
  children,
  className = '',
  interactive = false,
  onClick,
}: AdminCardProps) {
  const interactiveClasses = interactive
    ? 'hover:border-[var(--color-primary)] cursor-pointer'
    : '';

  return (
    <div
      className={`
        border-2 border-[var(--color-border)]
        rounded-[var(--radius-organic)]
        p-4
        bg-[var(--color-surface)]
        transition-colors
        ${interactiveClasses}
        ${className}
      `}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      {children}
    </div>
  );
}

interface AdminStatCardProps {
  label: string;
  value: string | number;
  /** Color variant for the value */
  variant?: 'default' | 'forming' | 'confirmed' | 'destructive' | 'primary';
  /** Optional trend indicator */
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
  };
}

/**
 * AdminStatCard - Compact stat display card
 *
 * Used for metric summaries and KPI displays
 */
export function AdminStatCard({
  label,
  value,
  variant = 'default',
  trend,
}: AdminStatCardProps) {
  const valueColorMap = {
    default: 'text-[var(--color-ink)]',
    forming: 'text-[var(--color-forming)]',
    confirmed: 'text-[var(--color-confirmed)]',
    destructive: 'text-[var(--color-destructive)]',
    primary: 'text-[var(--color-primary)]',
  };

  const trendColorMap = {
    up: 'text-[var(--color-confirmed)]',
    down: 'text-[var(--color-destructive)]',
    neutral: 'text-[var(--color-ink-muted)]',
  };

  return (
    <div className="border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-4 bg-[var(--color-surface)]">
      <p className="text-xs text-[var(--color-ink-muted)] mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className={`font-mono text-2xl font-semibold ${valueColorMap[variant]}`}>
          {value}
        </p>
        {trend && (
          <span className={`text-xs font-medium ${trendColorMap[trend.direction]}`}>
            {trend.direction === 'up' && '↑'}
            {trend.direction === 'down' && '↓'}
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}
