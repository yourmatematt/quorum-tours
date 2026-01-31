'use client';

import { useState, useRef } from 'react';

interface ChaseListBird {
  id: string;
  commonName: string;
  scientificName?: string;
  region?: string;
  addedDate?: string;
  /** Whether this species appears on a booked tour */
  isMatched?: boolean;
}

interface ChaseListSectionProps {
  birds: ChaseListBird[];
  onImport?: (file: File) => void;
  onRemove?: (id: string) => void;
  onAdd?: (name: string) => void;
}

// Region color mapping per spec
const regionColors: Record<string, { bg: string; text: string }> = {
  NT: { bg: 'bg-amber-100', text: 'text-amber-800' },
  NSW: { bg: 'bg-blue-100', text: 'text-blue-800' },
  VIC: { bg: 'bg-purple-100', text: 'text-purple-800' },
  QLD: { bg: 'bg-pink-100', text: 'text-pink-800' },
  SA: { bg: 'bg-orange-100', text: 'text-orange-800' },
  WA: { bg: 'bg-cyan-100', text: 'text-cyan-800' },
  TAS: { bg: 'bg-emerald-100', text: 'text-emerald-800' },
  ACT: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
};

/**
 * ChaseListSection - Primary sidebar element
 *
 * Design per spec:
 * - Green-tinted header bar with crosshair icon
 * - Species count badge + Edit link
 * - Matched species get green highlight
 * - State tags with color coding
 * - "+ Add species" CTA at bottom
 */
export function ChaseListSection({ birds, onImport, onRemove, onAdd }: ChaseListSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'importing' | 'success'>('idle');
  const [isEditing, setIsEditing] = useState(false);
  const [newSpecies, setNewSpecies] = useState('');
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

  const handleAddSpecies = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSpecies.trim()) {
      onAdd?.(newSpecies.trim());
      setNewSpecies('');
    }
  };

  return (
    <div className="bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] overflow-hidden">
      {/* Green-tinted header bar */}
      <div className="flex items-center justify-between px-3 py-2.5 bg-[var(--color-confirmed-bg)]">
        <div className="flex items-center gap-2">
          {/* Crosshair/target icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-[var(--color-confirmed)]"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="22" y1="12" x2="18" y2="12" />
            <line x1="6" y1="12" x2="2" y2="12" />
            <line x1="12" y1="6" x2="12" y2="2" />
            <line x1="12" y1="22" x2="12" y2="18" />
          </svg>
          <h2 className="font-display text-sm font-semibold text-[var(--color-ink)]">
            Chase List
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {/* Species count badge */}
          <span className="px-2 py-0.5 text-xs font-medium bg-[var(--color-primary)] text-white rounded">
            {birds.length}
          </span>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs font-medium text-[var(--color-primary)] hover:underline"
          >
            {isEditing ? 'Done' : 'Edit'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Add species input - show when editing */}
        {isEditing && (
          <form onSubmit={handleAddSpecies} className="mb-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={newSpecies}
                onChange={(e) => setNewSpecies(e.target.value)}
                placeholder="Add species..."
                className="flex-1 px-2.5 py-1.5 text-sm border border-[var(--color-border)] rounded-[var(--radius-sm)] bg-[var(--color-surface)] focus:outline-none focus:border-[var(--color-primary)]"
              />
              <button
                type="submit"
                disabled={!newSpecies.trim()}
                className="px-3 py-1.5 text-sm font-medium text-white bg-[var(--color-primary)] rounded-[var(--radius-sm)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add
              </button>
            </div>
          </form>
        )}

        {/* eBird Import - show when editing */}
        {isEditing && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              mb-3 py-2.5 px-3 border border-dashed rounded-[var(--radius-sm)] cursor-pointer transition-colors
              ${isDragging ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]' : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'}
              ${importStatus === 'success' ? 'border-[var(--color-confirmed)] bg-[var(--color-confirmed-bg)]' : ''}
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="sr-only"
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
        )}

        {/* Species List */}
        {birds.length > 0 ? (
          <ul className="space-y-1">
            {birds.map((bird) => {
              const regionStyle = bird.region ? regionColors[bird.region] : null;
              return (
                <li
                  key={bird.id}
                  className={`
                    flex items-center justify-between py-2 px-2.5 rounded-[var(--radius-sm)]
                    ${bird.isMatched ? 'bg-[var(--color-confirmed-bg)]' : 'bg-transparent hover:bg-[var(--color-surface-sunken)]'}
                  `}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {/* Match indicator dot */}
                    {bird.isMatched && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-confirmed)] flex-shrink-0" />
                    )}
                    <span className="text-sm text-[var(--color-ink)] truncate">
                      {bird.commonName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Region tag with color */}
                    {bird.region && regionStyle && (
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${regionStyle.bg} ${regionStyle.text}`}>
                        {bird.region}
                      </span>
                    )}
                    {/* Remove button when editing */}
                    {isEditing && (
                      <button
                        onClick={() => handleRemove(bird.id)}
                        className="p-0.5 text-[var(--color-ink-muted)] hover:text-[var(--color-destructive)] transition-colors"
                        aria-label={`Remove ${bird.commonName}`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-xs text-[var(--color-ink-muted)] text-center py-4">
            No target species yet
          </p>
        )}

        {/* Add species CTA at bottom */}
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="w-full mt-3 py-2 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors"
          >
            + Add species to your chase list
          </button>
        )}

        {/* Help link - only show when editing */}
        {isEditing && (
          <a
            href="https://ebird.org/MyEBird?cmd=lifeList"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-3 pt-3 border-t border-[var(--color-border)] text-xs text-[var(--color-primary)] hover:underline"
          >
            How to export from eBird →
          </a>
        )}
      </div>
    </div>
  );
}
