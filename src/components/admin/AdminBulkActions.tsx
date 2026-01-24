'use client';

import { useState, useCallback } from 'react';

interface AdminBulkActionsProps {
  /** Total items available for selection */
  totalItems: number;
  /** Currently selected item IDs */
  selectedIds: Set<string>;
  /** Callback when selection changes */
  onSelectionChange: (ids: Set<string>) => void;
  /** All item IDs for select all functionality */
  allIds: string[];
  /** Actions to render when items are selected */
  children: (props: {
    selectedCount: number;
    clearSelection: () => void;
  }) => React.ReactNode;
}

/**
 * AdminBulkActions - Bulk selection toolbar
 *
 * Shows when items are selected, provides select all / clear actions
 */
export function AdminBulkActions({
  totalItems,
  selectedIds,
  onSelectionChange,
  allIds,
  children,
}: AdminBulkActionsProps) {
  const selectedCount = selectedIds.size;
  const allSelected = selectedCount === totalItems && totalItems > 0;
  const someSelected = selectedCount > 0 && selectedCount < totalItems;

  const selectAll = useCallback(() => {
    onSelectionChange(new Set(allIds));
  }, [allIds, onSelectionChange]);

  const clearSelection = useCallback(() => {
    onSelectionChange(new Set());
  }, [onSelectionChange]);

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-between p-4 mb-4 bg-[var(--color-primary)]/10 border-2 border-[var(--color-primary)]/30 rounded-[var(--radius-organic)]">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={allSelected}
            ref={(el) => {
              if (el) el.indeterminate = someSelected;
            }}
            onChange={(e) => {
              if (e.target.checked) {
                selectAll();
              } else {
                clearSelection();
              }
            }}
            className="w-4 h-4 rounded border-2 border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)] focus:ring-offset-0"
          />
          <span className="text-sm font-medium text-[var(--color-ink)]">
            {selectedCount} of {totalItems} selected
          </span>
        </label>
        <button
          onClick={clearSelection}
          className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] underline"
        >
          Clear selection
        </button>
      </div>
      <div className="flex items-center gap-2">
        {children({ selectedCount, clearSelection })}
      </div>
    </div>
  );
}

/**
 * Hook for managing bulk selection state
 */
export function useBulkSelection() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isSelected = useCallback(
    (id: string) => selectedIds.has(id),
    [selectedIds]
  );

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  return {
    selectedIds,
    setSelectedIds,
    toggleSelection,
    isSelected,
    clearSelection,
  };
}

interface AdminCheckboxProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
}

/**
 * AdminCheckbox - Styled checkbox for bulk selection
 */
export function AdminCheckbox({ checked, onChange, label }: AdminCheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-2 border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)] focus:ring-offset-0 cursor-pointer"
      />
      {label && (
        <span className="text-sm text-[var(--color-ink-muted)]">{label}</span>
      )}
    </label>
  );
}
