'use client';

import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/tours', label: 'Tours' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/operators', label: 'Operators' },
];

export function GlobalNav() {
  const pathname = usePathname();

  // Don't render navigation on dashboard routes (but keep for /operators consumer page)
  const isDashboard = pathname === '/operator' || pathname?.startsWith('/operator/') || pathname?.startsWith('/admin');
  if (isDashboard) {
    return null;
  }

  return (
    <nav
      className="
        w-full
        bg-[var(--color-surface-raised)]
        border-b border-[var(--color-border)]
      "
      aria-label="Main navigation"
    >
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-[var(--space-lg)]
        py-[var(--space-md)]
        flex items-center justify-between
      ">
        {/* Logo / Home link */}
        <a
          href="/"
          className="
            font-display text-lg text-[var(--color-ink)]
            hover:text-[var(--color-accent)]
            transition-colors duration-[var(--transition-fast)]
          "
        >
          Quorum
        </a>

        {/* Nav links */}
        <div className="flex items-center gap-[var(--space-lg)]">
          {navItems.map(item => {
            const isActive = item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

            return (
              <a
                key={item.href}
                href={item.href}
                className={`
                  text-sm font-medium
                  transition-colors duration-[var(--transition-fast)]
                  ${isActive
                    ? 'text-[var(--color-accent)]'
                    : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
