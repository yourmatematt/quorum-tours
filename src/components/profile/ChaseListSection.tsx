'use client';

import { useState, useRef } from 'react';

interface ChaseListBird {
  id: string;
  commonName: string;
  scientificName: string;
  region?: string;
  addedDate: string;
}

interface ChaseListSectionProps {
  birds: ChaseListBird[];
  onImport?: (file: File) => void;
}

/**
 * ChaseListSection - View chase list and import from eBird
 *
 * Features:
 * - View current chase list (target species)
 * - Import from eBird CSV export
 * - View-only mode (no inline editing per user preference)
 *
 * Design: Compact list with eBird import prominent
 */
export function ChaseListSection({ birds, onImport }: ChaseListSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'importing' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) {
      handleFileImport(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileImport(file);
    }
  };

  const handleFileImport = (file: File) => {
    setImportStatus('importing');
    // Simulate import delay (UI shell only)
    setTimeout(() => {
      setImportStatus('success');
      onImport?.(file);
      // Reset after showing success
      setTimeout(() => setImportStatus('idle'), 2000);
    }, 1500);
  };

  return (
    <section aria-labelledby="chase-list-heading" className="flex flex-col h-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <h2
          id="chase-list-heading"
          className="font-display text-base font-semibold text-[var(--color-ink)]"
        >
          Chase List
        </h2>
        <span className="text-xs text-[var(--color-ink-muted)]">
          {birds.length} {birds.length === 1 ? 'species' : 'species'}
        </span>
      </div>

      {/* eBird Import Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          mb-3 p-4 border-2 border-dashed rounded-[var(--radius-organic)] cursor-pointer
          transition-colors text-center
          ${isDragging
            ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]'
            : 'border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-sunken)]'
          }
          ${importStatus === 'success' ? 'border-[var(--color-confirmed)] bg-[var(--color-confirmed-bg)]' : ''}
          ${importStatus === 'error' ? 'border-[var(--color-destructive)] bg-red-50' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="sr-only"
          aria-label="Import eBird CSV file"
        />

        {importStatus === 'idle' && (
          <>
            <div className="mb-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mx-auto text-[var(--color-ink-muted)]"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[var(--color-ink)]">
              Import from eBird
            </p>
            <p className="text-xs text-[var(--color-ink-muted)] mt-1">
              Drag & drop CSV or click to browse
            </p>
          </>
        )}

        {importStatus === 'importing' && (
          <>
            <div className="mb-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mx-auto text-[var(--color-primary)] animate-spin"
              >
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[var(--color-primary)]">
              Importing...
            </p>
          </>
        )}

        {importStatus === 'success' && (
          <>
            <div className="mb-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mx-auto text-[var(--color-confirmed)]"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[var(--color-confirmed)]">
              Import successful!
            </p>
          </>
        )}

        {importStatus === 'error' && (
          <>
            <div className="mb-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mx-auto text-[var(--color-destructive)]"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[var(--color-destructive)]">
              Import failed
            </p>
          </>
        )}
      </div>

      {/* Chase List - Scrollable */}
      <div className="flex-1 overflow-y-auto min-h-0 -mx-1 px-1">
        {birds.length > 0 ? (
          <ul className="space-y-1">
            {birds.map((bird) => (
              <li
                key={bird.id}
                className="flex items-center justify-between py-2 px-3 bg-[var(--color-surface-raised)] border border-[var(--color-border)] rounded-[var(--radius-sm)] hover:border-[var(--color-primary)]/50 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[var(--color-ink)] truncate">
                    {bird.commonName}
                  </p>
                  <p className="text-xs text-[var(--color-ink-muted)] italic truncate">
                    {bird.scientificName}
                  </p>
                </div>
                {bird.region && (
                  <span className="ml-2 text-xs text-[var(--color-ink-subtle)] bg-[var(--color-surface-sunken)] px-2 py-0.5 rounded flex-shrink-0">
                    {bird.region}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-[var(--color-ink-subtle)] mb-3"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <p className="text-sm text-[var(--color-ink-muted)]">
              No target species yet
            </p>
            <p className="text-xs text-[var(--color-ink-subtle)] mt-1">
              Import your eBird needs to get started
            </p>
          </div>
        )}
      </div>

      {/* Help link */}
      <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
        <a
          href="https://ebird.org/MyEBird?cmd=lifeList"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--color-primary)] hover:underline inline-flex items-center gap-1"
        >
          How to export from eBird
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
