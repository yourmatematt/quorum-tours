'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { OperatorSidebar } from '@/components/operator';

export default function OperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-surface-sunken)] flex overflow-hidden">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Fixed Sidebar Navigation */}
      <OperatorSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area - Responsive margins */}
      <main
        id="main-content"
        role="main"
        className="flex-1 min-h-screen overflow-y-auto lg:ml-64"
      >
        {/* Mobile Hamburger Menu */}
        <div className="lg:hidden sticky top-0 z-30 bg-[var(--color-surface)] border-b-2 border-[var(--color-border)] px-4 py-3 flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-[var(--color-surface-sunken)] rounded-md transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6 text-[var(--color-ink)]" />
          </button>
          <span className="ml-3 font-display text-lg font-semibold text-[var(--color-ink)]">
            Quorum Tours
          </span>
        </div>

        {/* Content with responsive padding */}
        <div className="min-h-full px-4 md:px-6 lg:px-8 py-4 md:py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
