'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MapPin,
  PlusCircle,
  Users,
  DollarSign,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/operator', icon: LayoutDashboard },
  { label: 'My Tours', href: '/operator/tours', icon: MapPin },
  { label: 'Create Tour', href: '/operator/tours/create', icon: PlusCircle },
  { label: 'Bookings', href: '/operator/bookings', icon: Users },
  { label: 'Earnings', href: '/operator/earnings', icon: DollarSign },
  { label: 'Profile', href: '/operator/profile', icon: Settings },
  { label: 'Help', href: '/operator/help', icon: HelpCircle },
];

export function OperatorSidebar({
  isOpen = true,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/operator') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  const handleLinkClick = () => {
    // Close mobile drawer when link is clicked
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen w-64 
          bg-[var(--color-surface)] border-r-2 border-[var(--color-border)] 
          flex flex-col z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo/Brand */}
        <div className="px-6 py-8 border-b-2 border-[var(--color-border)]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">
                Quorum Tours
              </h1>
              <p className="text-sm text-[var(--color-ink-muted)] mt-1">
                Operator Dashboard
              </p>
            </div>
            {/* Close button for mobile */}
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-2 hover:bg-[var(--color-surface-sunken)] rounded-md transition-colors"
                aria-label="Close sidebar"
              >
                <svg
                  className="w-6 h-6 text-[var(--color-ink-muted)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto" role="navigation" aria-label="Operator Dashboard Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={`
                  flex items-center gap-3 px-4 py-3
                  rounded-[var(--radius-organic)]
                  font-medium text-sm
                  transition-colors duration-200
                  ${
                    active
                      ? 'bg-[var(--color-primary)] text-white shadow-[var(--shadow-card)]'
                      : 'text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-primary)]'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-4 py-6 border-t-2 border-[var(--color-border)]">
          <button
            onClick={() => {
              // TODO: Implement logout logic
              console.log('Logout clicked');
            }}
            className="
              flex items-center gap-3 px-4 py-3 w-full
              rounded-[var(--radius-organic)]
              font-medium text-sm
              text-[var(--color-ink-muted)]
              hover:bg-[var(--color-surface-sunken)]
              hover:text-[var(--color-primary)]
              transition-colors duration-200
            "
          >
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
