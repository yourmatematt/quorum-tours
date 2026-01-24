'use client';

import { useState, useRef, useEffect } from 'react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

export function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
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
        <span className="text-[var(--color-ink-subtle)]">{label}:</span>
        <span className="font-medium">{selectedOption?.label || 'All'}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`
            transition-transform duration-[var(--transition-fast)]
            ${isOpen ? 'rotate-180' : ''}
          `}
          aria-hidden="true"
        >
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="
            absolute z-10 mt-1
            w-full min-w-[160px]
            bg-[var(--color-surface-raised)]
            border-2 border-[var(--color-border)]
            rounded-[var(--radius-organic)]
            shadow-[var(--shadow-card)]
            py-1
          "
          role="listbox"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`
                w-full px-4 py-3 min-h-[48px] text-left text-sm
                hover:bg-[var(--color-surface-sunken)]
                transition-colors duration-200
                ${value === option.value ? 'text-[var(--color-primary)] font-medium' : 'text-[var(--color-ink)]'}
              `}
              role="option"
              aria-selected={value === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
