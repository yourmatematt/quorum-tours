'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';

interface SpeciesFilterProps {
  selected: string[];
  onChange: (species: string[]) => void;
  availableSpecies: string[];
  maxSelections?: number;
  /** Whether user is authenticated - shows sign-in prompt if false */
  isAuthenticated?: boolean;
}

/**
 * SpeciesFilter - Compact "Chase List" dropdown
 *
 * Fits inline with other FilterDropdowns.
 * Opens to reveal search + checkboxes for species.
 * Shows sign-in prompt for unauthenticated users.
 */
export function SpeciesFilter({
  selected,
  onChange,
  availableSpecies,
  maxSelections = 5,
  isAuthenticated = false,
}: SpeciesFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter species based on search
  const filteredSpecies = useMemo(() => {
    if (!search.trim()) return availableSpecies;
    const query = search.toLowerCase();
    return availableSpecies.filter(s => s.toLowerCase().includes(query));
  }, [search, availableSpecies]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleSpecies = (species: string) => {
    if (selected.includes(species)) {
      onChange(selected.filter(s => s !== species));
    } else if (selected.length < maxSelections) {
      onChange([...selected, species]);
    }
  };

  const buttonLabel = selected.length === 0
    ? 'Any species'
    : selected.length === 1
      ? selected[0]
      : `${selected.length} species`;

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger button - matches FilterDropdown style */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          inline-flex items-center gap-2
          px-4 py-3
          min-h-[48px]
          text-sm
          bg-[var(--color-surface-raised)]
          border-2 border-[var(--color-border)]
          rounded-[var(--radius-organic)]
          text-[var(--color-ink)]
          hover:border-[var(--color-primary)]
          focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-1
          transition-colors duration-200
        "
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-[var(--color-ink-subtle)]">Chase list:</span>
        <span className={`font-medium ${selected.length > 0 ? 'text-[var(--color-primary)]' : ''}`}>
          {buttonLabel}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="
          absolute z-20 mt-1
          w-[300px]
          bg-[var(--color-surface-raised)]
          border-2 border-[var(--color-border)]
          rounded-[var(--radius-organic)]
          shadow-[var(--shadow-card)]
          overflow-hidden
        ">
          {!isAuthenticated ? (
            /* Sign-in prompt for unauthenticated users */
            <div className="p-5 text-center">
              <div className="
                w-12 h-12 mx-auto mb-3
                bg-[var(--color-primary-subtle)]
                rounded-full
                flex items-center justify-center
              ">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-[var(--color-ink)] mb-1 whitespace-nowrap">
                Sign in to build your chase list
              </p>
              <p className="text-xs text-[var(--color-ink-muted)] mb-4">
                Save species you want to see and filter tours that feature them
              </p>
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="
                  inline-flex items-center justify-center
                  w-full px-4 py-2.5
                  text-sm font-medium
                  text-white
                  bg-[var(--color-primary)]
                  hover:bg-[var(--color-primary-hover)]
                  rounded-[var(--radius-md)]
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
                "
              >
                Sign up free
              </Link>
              <p className="mt-3 text-xs text-[var(--color-ink-subtle)]">
                Already have an account?{' '}
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-[var(--color-primary)] hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>
          ) : (
            <>
              {/* Search input */}
              <div className="p-2 border-b border-[var(--color-border)]">
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search species..."
                  className="
                    w-full px-3 py-2
                    text-sm
                    bg-[var(--color-surface)]
                    border border-[var(--color-border)]
                    rounded-[var(--radius-md)]
                    placeholder:text-[var(--color-ink-subtle)]
                    focus:outline-none focus:border-[var(--color-primary)]
                  "
                />
              </div>

              {/* Species list */}
              <div className="max-h-[240px] overflow-y-auto">
                {filteredSpecies.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-[var(--color-ink-muted)]">
                    No species found
                  </p>
                ) : (
                  filteredSpecies.map(species => {
                    const isSelected = selected.includes(species);
                    const isDisabled = !isSelected && selected.length >= maxSelections;

                    return (
                      <button
                        key={species}
                        type="button"
                        onClick={() => toggleSpecies(species)}
                        disabled={isDisabled}
                        className={`
                          w-full px-4 py-3 min-h-[44px]
                          flex items-center gap-3
                          text-sm text-left
                          transition-colors duration-150
                          ${isDisabled
                            ? 'opacity-40 cursor-not-allowed'
                            : 'hover:bg-[var(--color-surface-sunken)] cursor-pointer'
                          }
                          ${isSelected ? 'bg-[var(--color-primary-subtle)]' : ''}
                        `}
                      >
                        {/* Checkbox */}
                        <span className={`
                          w-5 h-5 flex-shrink-0
                          flex items-center justify-center
                          rounded border-2
                          transition-colors duration-150
                          ${isSelected
                            ? 'bg-[var(--color-primary)] border-[var(--color-primary)]'
                            : 'border-[var(--color-border)]'
                          }
                        `}>
                          {isSelected && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2">
                              <path d="M2 6l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        <span className={isSelected ? 'text-[var(--color-primary)] font-medium' : 'text-[var(--color-ink)]'}>
                          {species}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer with count */}
              <div className="px-4 py-2 border-t border-[var(--color-border)] bg-[var(--color-surface-sunken)]">
                <p className="text-xs text-[var(--color-ink-muted)]">
                  {selected.length}/{maxSelections} selected
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
