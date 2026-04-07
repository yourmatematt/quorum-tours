'use client';

import { useState } from 'react';

/**
 * QuorumProgressBar - Two-phase progress visualization
 *
 * Phase 1 (Forming): Shows progress toward quorum using dots
 * Phase 2 (Confirmed): Shows spots filled / spots remaining toward capacity
 *
 * Visual states:
 * - Forming (orange): Below quorum, need more people to run
 * - Confirmed (green): Quorum met, tour will run, showing available spots
 */

interface QuorumProgressBarProps {
  current: number;
  quorum: number;
  capacity: number;
  showLabel?: boolean;
  /** Maximum dots to display (uses proportional representation if exceeds this) */
  maxDots?: number;
  /** Size variant */
  size?: 'sm' | 'md';
  /** Show detailed breakdown text */
  showDetails?: boolean;
  /** Show "What is quorum?" info tooltip trigger */
  showTooltip?: boolean;
}

export function QuorumProgressBar({
  current,
  quorum,
  capacity,
  showLabel = true,
  maxDots = 10,
  size = 'md',
  showDetails = false,
  showTooltip = false,
}: QuorumProgressBarProps) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const isConfirmed = current >= quorum;
  const isFull = current >= capacity;
  const spotsRemaining = Math.max(0, capacity - current);

  // Size configurations
  const sizeConfig = {
    sm: { dot: 'w-2.5 h-2.5', gap: 'gap-1', text: 'text-xs' },
    md: { dot: 'w-3 h-3', gap: 'gap-1.5', text: 'text-sm' },
  };

  const config = sizeConfig[size];

  // Determine what to show based on phase
  // Phase 1 (Forming): Show progress to quorum
  // Phase 2 (Confirmed): Show filled spots / capacity
  const displayMax = isConfirmed ? capacity : quorum;
  const displayCurrent = Math.min(current, displayMax);

  // Calculate display dots (proportional if displayMax > maxDots)
  const displayDots = displayMax <= maxDots ? displayMax : maxDots;
  const filledDots =
    displayMax <= maxDots
      ? displayCurrent
      : Math.round((displayCurrent / displayMax) * maxDots);

  const dots = [];
  for (let i = 0; i < displayDots; i++) {
    const isFilled = i < filledDots;
    dots.push(
      <span
        key={i}
        className={`
          ${config.dot} rounded-full transition-all duration-300
          ${
            isFilled
              ? isConfirmed
                ? 'bg-[var(--color-confirmed)]'
                : 'bg-[var(--color-forming)]'
              : 'bg-[var(--color-surface-sunken)] border-2 border-[var(--color-border)]'
          }
        `}
        aria-hidden="true"
      />
    );
  }

  // Label text based on phase
  const labelText = isConfirmed
    ? isFull
      ? 'Tour full'
      : `${spotsRemaining} ${spotsRemaining === 1 ? 'spot' : 'spots'} left`
    : current === 0
    ? 'Be first to commit'
    : `${current}/${quorum} to run`;

  return (
    <div className="w-full">
      <div
        className={`flex items-center ${config.gap} ${showLabel ? 'justify-between' : ''}`}
        role="meter"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={displayMax}
        aria-label={
          isConfirmed
            ? `Tour confirmed. ${current} of ${capacity} spots filled.`
            : current === 0
            ? `Be the first to commit. ${quorum} participants needed for this tour to run.`
            : `${current} of ${quorum} participants needed for tour to run.`
        }
      >
        {/* Dots visualization */}
        <div className={`flex ${config.gap}`}>{dots}</div>

        {/* Label */}
        {showLabel && (
          <span className={`${config.text} text-[var(--color-ink-muted)] whitespace-nowrap ml-2 flex items-center gap-1`}>
            <span
              className={`font-medium ${
                isFull
                  ? 'text-[var(--color-ink-muted)]'
                  : isConfirmed
                    ? 'text-[var(--color-confirmed)]'
                    : 'text-[var(--color-forming)]'
              }`}
            >
              {labelText}
            </span>
            {showTooltip && (
              <button
                type="button"
                aria-label="What is quorum?"
                aria-expanded={tooltipOpen}
                onClick={() => setTooltipOpen(v => !v)}
                className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[var(--color-ink-subtle)] hover:text-[var(--color-primary)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a1 1 0 110 2 1 1 0 010-2zm-.75 3.5h1.5v4.5h-1.5V7.5z"/>
                </svg>
              </button>
            )}
          </span>
        )}
      </div>

      {/* Quorum explanation tooltip */}
      {showTooltip && tooltipOpen && (
        <div className="mt-2 px-3 py-2 bg-[var(--color-surface-raised)] border border-[var(--color-border)] rounded-[var(--radius-sm)] text-xs text-[var(--color-ink-muted)] leading-relaxed">
          A tour confirms once enough people commit. If the minimum isn&apos;t reached, everyone is fully refunded.
        </div>
      )}

      {/* Detailed breakdown (optional) */}
      {showDetails && (
        <div className={`mt-1 ${config.text} text-[var(--color-ink-subtle)]`}>
          {isConfirmed ? (
            <span>
              Quorum reached ({quorum} minimum) · {current}/{capacity} booked
            </span>
          ) : (
            <span>
              {quorum - current} more {quorum - current === 1 ? 'person' : 'people'} needed to confirm
            </span>
          )}
        </div>
      )}
    </div>
  );
}
