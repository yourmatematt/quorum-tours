import React from 'react';

interface DashboardViewContainerProps {
  children: React.ReactNode;
  maxWidth?: 'default' | 'wide' | 'full';
}

/**
 * Consistent container for all dashboard views
 * Ensures uniform max-width and padding across views
 */
export function DashboardViewContainer({
  children,
  maxWidth = 'default'
}: DashboardViewContainerProps) {
  const maxWidthClass = {
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
    full: 'max-w-none'
  }[maxWidth];

  return (
    <div className={`${maxWidthClass} mx-auto w-full`}>
      {children}
    </div>
  );
}

interface DashboardViewHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

/**
 * Fixed header section that never scrolls
 */
export function DashboardViewHeader({ title, subtitle, actions }: DashboardViewHeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div className="flex-1">
        <h1 className="font-display text-3xl font-semibold text-[var(--color-ink)]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[var(--color-ink-muted)] mt-2 text-lg">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="ml-6">
          {actions}
        </div>
      )}
    </div>
  );
}

interface DashboardScrollAreaProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Internal scroll area for content that overflows
 */
export function DashboardScrollArea({ children, className = '' }: DashboardScrollAreaProps) {
  return (
    <div className={`overflow-y-auto ${className}`}>
      {children}
    </div>
  );
}
