'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShieldCheck,
  MapPin,
  Users,
  BarChart3,
  AlertTriangle,
  ScrollText,
  LogOut,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Operators', href: '/admin/operators', icon: ShieldCheck },
  { label: 'Tours', href: '/admin/tours', icon: MapPin },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Metrics', href: '/admin/metrics', icon: BarChart3 },
  { label: 'Alerts', href: '/admin/alerts', icon: AlertTriangle },
  { label: 'Audit Log', href: '/admin/audit', icon: ScrollText },
];

export function AdminSidebar({
  isOpen = true,
  onClose,
  alertCount = 0,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  alertCount?: number;
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  // Add badge to alerts nav item
  const navItemsWithBadges = navItems.map((item) => {
    if (item.href === '/admin/alerts' && alertCount > 0) {
      return { ...item, badge: alertCount };
    }
    return item;
  });

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
              <p className="text-sm text-[var(--color-destructive)] font-medium mt-1">
                Admin Console
              </p>
            </div>
            {/* Close button for mobile */}
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-2 hover:bg-[var(--color-surface-sunken)] rounded-[var(--radius-organic)] transition-colors"
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
        <nav
          className="flex-1 px-4 py-6 space-y-2 overflow-y-auto"
          role="navigation"
          aria-label="Admin Dashboard Navigation"
        >
          {navItemsWithBadges.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={`
                  flex items-center justify-between px-4 py-3
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
                <span className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </span>
                {item.badge && item.badge > 0 && (
                  <span
                    className={`
                      px-2 py-0.5 text-xs font-semibold rounded-full
                      ${active ? 'bg-white/20 text-white' : 'bg-[var(--color-destructive)] text-white'}
                    `}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-6 border-t-2 border-[var(--color-border)]">
          <button
            onClick={() => {
              // TODO: Implement logout logic
              console.log('Admin logout clicked');
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
