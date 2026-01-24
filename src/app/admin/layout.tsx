'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, Keyboard } from 'lucide-react';
import { AdminSidebar } from '@/components/admin';
import {
  AdminKeyboardShortcuts,
  KeyboardShortcutsHelp,
} from '@/components/admin/AdminKeyboardShortcuts';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shortcutsHelpOpen, setShortcutsHelpOpen] = useState(false);

  // TODO: Fetch actual alert count from API
  const alertCount = 3;

  // Handle ? key for shortcuts help
  const handleQuestionMark = useCallback((e: KeyboardEvent) => {
    if (
      e.key === '?' &&
      !(
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
    ) {
      e.preventDefault();
      setShortcutsHelpOpen(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleQuestionMark);
    return () => window.removeEventListener('keydown', handleQuestionMark);
  }, [handleQuestionMark]);

  return (
    <div className="min-h-screen bg-[var(--color-surface-sunken)] flex overflow-hidden">
      {/* Keyboard shortcuts handler */}
      <AdminKeyboardShortcuts />

      {/* Keyboard shortcuts help modal */}
      <KeyboardShortcutsHelp
        isOpen={shortcutsHelpOpen}
        onClose={() => setShortcutsHelpOpen(false)}
      />

      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-[var(--radius-organic)] focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Fixed Sidebar Navigation */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        alertCount={alertCount}
      />

      {/* Main Content Area - Responsive margins */}
      <main
        id="main-content"
        role="main"
        className="flex-1 min-h-screen overflow-y-auto lg:ml-64"
      >
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-[var(--color-surface)] border-b-2 border-[var(--color-border)] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-[var(--color-surface-sunken)] rounded-[var(--radius-organic)] transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6 text-[var(--color-ink)]" />
            </button>
            <span className="ml-3 font-display text-lg font-semibold text-[var(--color-ink)]">
              Admin Console
            </span>
          </div>
        </div>

        {/* Content with responsive padding */}
        <div className="min-h-full px-4 md:px-6 lg:px-8 py-4 md:py-6">
          {children}
        </div>

        {/* Keyboard shortcuts hint - desktop only */}
        <button
          onClick={() => setShortcutsHelpOpen(true)}
          className="hidden lg:flex fixed bottom-4 right-4 items-center gap-2 px-3 py-2 text-xs text-[var(--color-ink-muted)] bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          title="Keyboard shortcuts"
        >
          <Keyboard className="w-4 h-4" />
          <span>Press ? for shortcuts</span>
        </button>
      </main>
    </div>
  );
}
