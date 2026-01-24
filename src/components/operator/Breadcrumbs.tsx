'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

const ROUTE_NAMES: Record<string, string> = {
  '/operator': 'Dashboard',
  '/operator/tours': 'My Tours',
  '/operator/tours/create': 'Create Tour',
  '/operator/bookings': 'Bookings',
  '/operator/earnings': 'Earnings',
  '/operator/profile': 'Profile',
  '/operator/help': 'Help & Support',
};

export function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show breadcrumbs on the main dashboard
  if (pathname === '/operator') {
    return null;
  }

  // Build breadcrumb trail
  const pathSegments = pathname?.split('/').filter(Boolean) || [];
  const breadcrumbs = [];

  // Always start with Dashboard
  breadcrumbs.push({
    label: 'Dashboard',
    href: '/operator',
    isHome: true,
  });

  // Build path segments
  let currentPath = '';
  for (let i = 0; i < pathSegments.length; i++) {
    currentPath += `/${pathSegments[i]}`;

    // Skip the 'operator' segment since we already have Dashboard
    if (pathSegments[i] === 'operator') {
      continue;
    }

    const routeName = ROUTE_NAMES[currentPath] || pathSegments[i];
    const isLast = i === pathSegments.length - 1;

    breadcrumbs.push({
      label: routeName,
      href: currentPath,
      isLast,
    });
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-[var(--color-ink-muted)]" />
            )}

            {crumb.isLast ? (
              <span className="text-[var(--color-ink)] font-medium">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] transition-colors duration-200 flex items-center gap-1"
              >
                {crumb.isHome && <Home className="w-4 h-4" />}
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
