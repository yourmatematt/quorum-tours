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
 * ChaseListSection - Compact chase list with eBird import
 *
 * Self-contained card component with proper overflow handling.
 * All content stays within the card boundaries.
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
    setTimeout(() => {
      setImportStatus('success');
      onImport?.(file);
      setTimeout(() => setImportStatus('idle'), 2000);
    }, 1500);
  };

  return (
    <div className="bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3 border-b border-[var(--color-border)]">
        <h2 className="font-display text-base font-semibold text-[var(--color-ink)]">
          Chase List
        </h2>
        <span className="text-xs text-[var(--color-ink-muted)]">
          {birds.length} species
        </span>
      </div>

      {/* Content */}
      <div className="p-4 pt-3">
        {/* eBird Import - Compact */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            mb-3 p-3 border-2 border-dashed rounded-[var(--radius-sm)] cursor-pointer
            transition-colors text-center
            ${isDragging
              ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]'
              : 'border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-sunken)]'
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

          {importStatus === 'idle' && (
            <div className="flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-ink-muted)]">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span className="text-xs text-[var(--color-ink-muted)]">
                Import from eBird
              </span>
            </div>
          )}

          {importStatus === 'importing' && (
            <div className="flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-primary)] animate-spin">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
              <span className="text-xs text-[var(--color-primary)]">Importing...</span>
            </div>
          )}

          {importStatus === 'success' && (
            <div className="flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-confirmed)]">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-xs text-[var(--color-confirmed)]">Imported!</span>
            </div>
          )}
        </div>

        {/* Species List - Scrollable with max-height */}
        <div className="max-h-[200px] overflow-y-auto">
          {birds.length > 0 ? (
            <ul className="space-y-1">
              {birds.map((bird) => (
                <li
                  key={bird.id}
                  className="flex items-center justify-between py-1.5 px-2 bg-[var(--color-surface-sunken)] rounded-[var(--radius-sm)] text-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-[var(--color-ink)] truncate">
                      {bird.commonName}
                    </p>
                  </div>
                  {bird.region && (
                    <span className="ml-2 text-xs text-[var(--color-ink-subtle)] flex-shrink-0">
                      {bird.region}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-[var(--color-ink-muted)] text-center py-4">
              No target species yet
            </p>
          )}
        </div>

        {/* Help link - Inside the card */}
        <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
          <a
            href="https://ebird.org/MyEBird?cmd=lifeList"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--color-primary)] hover:underline inline-flex items-center gap-1"
          >
            How to export from eBird
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
