'use client';

import { useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

interface Shortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  description: string;
  action: () => void;
}

/**
 * AdminKeyboardShortcuts - Global keyboard shortcuts for admin dashboard
 *
 * Provides quick navigation and actions via keyboard.
 */
export function AdminKeyboardShortcuts() {
  const router = useRouter();

  const shortcuts: Shortcut[] = useMemo(
    () => [
      {
        key: 'g',
        ctrl: true,
        description: 'Go to Overview',
        action: () => router.push('/admin'),
      },
      {
        key: 'o',
        ctrl: true,
        description: 'Go to Operators',
        action: () => router.push('/admin/operators'),
      },
      {
        key: 't',
        ctrl: true,
        description: 'Go to Tours',
        action: () => router.push('/admin/tours'),
      },
      {
        key: 'u',
        ctrl: true,
        description: 'Go to Users',
        action: () => router.push('/admin/users'),
      },
      {
        key: 'a',
        ctrl: true,
        description: 'Go to Alerts',
        action: () => router.push('/admin/alerts'),
      },
    ],
    [router]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrl ? e.ctrlKey || e.metaKey : !e.ctrlKey && !e.metaKey;
        const shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey;

        if (e.key.toLowerCase() === shortcut.key && ctrlMatch && shiftMatch) {
          e.preventDefault();
          shortcut.action();
          return;
        }
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // This component doesn't render anything visible
  return null;
}

interface KeyboardShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * KeyboardShortcutsHelp - Modal showing available shortcuts
 */
export function KeyboardShortcutsHelp({
  isOpen,
  onClose,
}: KeyboardShortcutsHelpProps) {
  const shortcuts = [
    { keys: ['Ctrl', 'G'], description: 'Go to Overview' },
    { keys: ['Ctrl', 'O'], description: 'Go to Operators' },
    { keys: ['Ctrl', 'T'], description: 'Go to Tours' },
    { keys: ['Ctrl', 'U'], description: 'Go to Users' },
    { keys: ['Ctrl', 'A'], description: 'Go to Alerts' },
    { keys: ['?'], description: 'Show this help' },
    { keys: ['Esc'], description: 'Close dialogs' },
  ];

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-6 max-w-md w-full mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-4">
          Keyboard Shortcuts
        </h2>
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-[var(--color-border)] last:border-0"
            >
              <span className="text-sm text-[var(--color-ink-muted)]">
                {shortcut.description}
              </span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, i) => (
                  <span key={i}>
                    <kbd className="px-2 py-1 text-xs font-mono bg-[var(--color-surface-sunken)] border border-[var(--color-border)] rounded">
                      {key}
                    </kbd>
                    {i < shortcut.keys.length - 1 && (
                      <span className="mx-1 text-[var(--color-ink-muted)]">+</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full px-4 py-2 text-sm font-medium text-[var(--color-ink)] bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-primary)] transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
