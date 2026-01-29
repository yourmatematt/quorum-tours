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
  onRemove?: (id: string) => void;
}

/**
 * ChaseListSection - Compact chase list with eBird import
 *
 * Features:
 * - Import from eBird CSV
 * - Remove individual species
 * - No nested scrolling - expands naturally
 */
export function ChaseListSection({ birds, onImport, onRemove }: ChaseListSectionProps) {
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
    setTimeout(() => {
      setImportStatus('success');
      onImport?.(file);
      setTimeout(() => setImportStatus('idle'), 2000);
    }, 1500);
  };

  const handleRemove = (id: string) => {
    onRemove?.(id);
  };

  return (
    <div className="bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--color-border)]">
        <h2 className="font-display text-sm font-semibold text-[var(--color-ink)]">
          Chase List
        </h2>
        <span className="text-xs text-[var(--color-ink-muted)]">
          {birds.length} species
        </span>
      </div>

      {/* Content - no internal scrolling */}
      <div className="p-3">
        {/* eBird Import - Minimal */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            mb-2 py-2 px-3 border border-dashed rounded-[var(--radius-sm)] cursor-pointer
            transition-colors
            ${isDragging
              ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]'
              : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
            }
            ${importStatus === 'success' ? 'border-[var(--color-confirmed)] bg-[var(--color-confirmed-bg)]' : ''}
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

          <div className="flex items-center justify-center gap-2">
            {importStatus === 'idle' && (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-ink-muted)]">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span className="text-xs text-[var(--color-ink-muted)]">Import from eBird</span>
              </>
            )}
            {importStatus === 'importing' && (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-primary)] animate-spin">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
                <span className="text-xs text-[var(--color-primary)]">Importing...</span>
              </>
            )}
            {importStatus === 'success' && (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-confirmed)]">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-xs text-[var(--color-confirmed)]">Imported!</span>
              </>
            )}
          </div>
        </div>

        {/* Species List - NO max-height, expands naturally */}
        {birds.length > 0 ? (
          <ul className="space-y-1">
            {birds.map((bird) => (
              <li
                key={bird.id}
                className="group flex items-center justify-between py-1.5 px-2 bg-[var(--color-surface-sunken)] rounded-[var(--radius-sm)]"
              >
                <span className="text-sm text-[var(--color-ink)] truncate flex-1">
                  {bird.commonName}
                </span>
                <div className="flex items-center gap-2">
                  {bird.region && (
                    <span className="text-xs text-[var(--color-ink-subtle)]">
                      {bird.region}
                    </span>
                  )}
                  <button
                    onClick={() => handleRemove(bird.id)}
                    className="opacity-0 group-hover:opacity-100 p-0.5 text-[var(--color-ink-subtle)] hover:text-[var(--color-destructive)] transition-opacity"
                    aria-label={`Remove ${bird.commonName}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-[var(--color-ink-muted)] text-center py-3">
            No target species yet
          </p>
        )}

        {/* Help link */}
        <a
          href="https://ebird.org/MyEBird?cmd=lifeList"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-2 pt-2 border-t border-[var(--color-border)] text-xs text-[var(--color-primary)] hover:underline"
        >
          How to export from eBird ↗
        </a>
      </div>
    </div>
  );
}
