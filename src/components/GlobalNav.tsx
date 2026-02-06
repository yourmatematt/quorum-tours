'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/supabase/useAuth';
import { createClient } from '@/lib/supabase/client';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/tours', label: 'Tours' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/operators', label: 'Operators' },
];

interface AccountDropdownProps {
  onNavigate?: () => void;
  userName: string;
  userEmail: string;
  onSignOut: () => void;
}

function AccountDropdown({ onNavigate, userName, userEmail, onSignOut }: AccountDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device on mount
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Clear any pending close timeout
  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  // Delayed close for forgiving hover (300ms grace period)
  const scheduleClose = () => {
    cancelClose();
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  // Hover handlers (desktop only)
  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      cancelClose();
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      scheduleClose();
    }
  };

  // Click handler (works on both, but primary for touch)
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

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

  // Close on escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => cancelClose();
  }, []);

  const handleItemClick = () => {
    setIsOpen(false);
    onNavigate?.();
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleClick}
        className="
          flex items-center gap-[var(--space-xs)]
          text-sm font-medium
          text-[var(--color-ink-muted)]
          hover:text-[var(--color-ink)]
          transition-colors duration-[var(--transition-fast)]
        "
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        My Account
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
          <path d="M3 4.5l3 3 3-3" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="
            absolute right-0 top-full mt-[var(--space-sm)]
            w-48
            bg-[var(--color-surface-raised)]
            border border-[var(--color-border)]
            rounded-[var(--radius-sm)]
            shadow-[var(--shadow-dropdown)]
            py-[var(--space-xs)]
            z-50
          "
          role="menu"
        >
          {/* User info */}
          <div className="px-[var(--space-md)] py-[var(--space-sm)] border-b border-[var(--color-border)]">
            <p className="text-sm font-medium text-[var(--color-ink)]">{userName}</p>
            <p className="text-xs text-[var(--color-ink-muted)]">{userEmail}</p>
          </div>

          {/* Menu items */}
          <Link
            href="/profile"
            onClick={handleItemClick}
            className="
              block px-[var(--space-md)] py-[var(--space-sm)]
              text-sm text-[var(--color-ink-muted)]
              hover:bg-[var(--color-surface-sunken)]
              hover:text-[var(--color-ink)]
              transition-colors
            "
            role="menuitem"
          >
            Profile
          </Link>
          <Link
            href="/profile#bookings"
            onClick={handleItemClick}
            className="
              block px-[var(--space-md)] py-[var(--space-sm)]
              text-sm text-[var(--color-ink-muted)]
              hover:bg-[var(--color-surface-sunken)]
              hover:text-[var(--color-ink)]
              transition-colors
            "
            role="menuitem"
          >
            My Bookings
          </Link>

          {/* Divider */}
          <div className="my-[var(--space-xs)] border-t border-[var(--color-border)]" />

          {/* Sign out */}
          <button
            onClick={() => {
              setIsOpen(false);
              onNavigate?.();
              onSignOut();
            }}
            className="
              w-full text-left
              px-[var(--space-md)] py-[var(--space-sm)]
              text-sm text-[var(--color-ink-muted)]
              hover:bg-[var(--color-surface-sunken)]
              hover:text-[var(--color-ink)]
              transition-colors
            "
            role="menuitem"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export function GlobalNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoggedIn = !!user;
  const userName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  // Don't render navigation on dashboard routes (but keep for /operators consumer page)
  const isDashboard = pathname === '/operator' || pathname?.startsWith('/operator/') || pathname?.startsWith('/admin');

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    }
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [mobileMenuOpen]);

  // Early return after all hooks
  if (isDashboard) {
    return null;
  }

  return (
    <>
      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-[57px]" aria-hidden="true" />
      <nav
        className="
          fixed top-0 left-0 right-0
          bg-white/80 backdrop-blur-xl backdrop-saturate-150
          border-b border-[var(--color-border)]/50
          shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.03)]
          z-40
        "
        aria-label="Main navigation"
      >
        <div className="
          w-full max-w-[var(--container-max)]
          mx-auto px-[var(--space-md)] md:px-[var(--space-lg)]
          py-[var(--space-md)]
          flex items-center justify-between
        ">
          {/* Logo / Home link */}
          <Link
            href="/"
            className="
              font-display text-lg text-[var(--color-ink)]
              hover:text-[var(--color-accent)]
              transition-colors duration-[var(--transition-fast)]
            "
          >
            Quorum Tours
          </Link>

          {/* Desktop Nav links - hidden on mobile */}
          <div className="hidden md:flex items-center gap-[var(--space-lg)]">
            {navItems.map(item => {
              const isActive = item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

              return (
                <Link
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
                </Link>
              );
            })}

            {/* Auth section - separated from main nav */}
            <div className="ml-[var(--space-md)] pl-[var(--space-lg)] border-l border-[var(--color-border)]">
              {isLoggedIn ? (
                <AccountDropdown
                  userName={userName}
                  userEmail={userEmail}
                  onSignOut={handleSignOut}
                />
              ) : (
                <Link
                  href="/login"
                  className="
                    text-sm font-medium
                    text-[var(--color-primary)]
                    hover:text-[var(--color-primary-hover)]
                    transition-colors duration-[var(--transition-fast)]
                  "
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>

          {/* Mobile hamburger button - visible only on mobile */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="
              md:hidden
              p-2 -mr-2
              text-[var(--color-ink-muted)]
              hover:text-[var(--color-ink)]
              transition-colors
            "
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              // Close icon (X)
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              // Hamburger icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <div
            id="mobile-menu"
            className="
              fixed top-[57px] left-0 right-0 bottom-0
              bg-white/95 backdrop-blur-xl backdrop-saturate-150
              z-30 md:hidden
              overflow-y-auto
              animate-in slide-in-from-top-2 duration-200
            "
          >
            <div className="px-[var(--space-md)] pt-[var(--space-2xl)] pb-[var(--space-lg)]">
              {/* Nav links */}
              <div className="space-y-1">
                {navItems.map(item => {
                  const isActive = item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        block px-[var(--space-md)] py-[var(--space-sm)]
                        text-base font-medium
                        rounded-[var(--radius-sm)]
                        transition-colors
                        ${isActive
                          ? 'bg-[var(--color-primary-subtle)] text-[var(--color-accent)]'
                          : 'text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-ink)]'
                        }
                      `}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="my-[var(--space-lg)] border-t border-[var(--color-border)]" />

              {/* Auth section */}
              {isLoggedIn ? (
                <div className="space-y-[var(--space-md)]">
                  {/* User info */}
                  <div className="px-[var(--space-md)]">
                    <p className="text-sm font-medium text-[var(--color-ink)]">{userName}</p>
                    <p className="text-xs text-[var(--color-ink-muted)]">{userEmail}</p>
                  </div>

                  {/* Account links */}
                  <div className="space-y-1">
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="
                        block px-[var(--space-md)] py-[var(--space-sm)]
                        text-base font-medium
                        text-[var(--color-ink-muted)]
                        rounded-[var(--radius-sm)]
                        hover:bg-[var(--color-surface-sunken)]
                        hover:text-[var(--color-ink)]
                        transition-colors
                      "
                    >
                      Profile
                    </Link>
                    <Link
                      href="/profile#bookings"
                      onClick={() => setMobileMenuOpen(false)}
                      className="
                        block px-[var(--space-md)] py-[var(--space-sm)]
                        text-base font-medium
                        text-[var(--color-ink-muted)]
                        rounded-[var(--radius-sm)]
                        hover:bg-[var(--color-surface-sunken)]
                        hover:text-[var(--color-ink)]
                        transition-colors
                      "
                    >
                      My Bookings
                    </Link>
                  </div>

                  {/* Sign out */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleSignOut();
                    }}
                    className="
                      w-full text-left
                      px-[var(--space-md)] py-[var(--space-sm)]
                      text-base font-medium
                      text-[var(--color-ink-muted)]
                      rounded-[var(--radius-sm)]
                      hover:bg-[var(--color-surface-sunken)]
                      hover:text-[var(--color-ink)]
                      transition-colors
                    "
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="space-y-[var(--space-sm)]">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="
                      block w-full px-[var(--space-md)] py-[var(--space-sm)]
                      text-center text-base font-medium
                      text-[var(--color-primary)]
                      border-2 border-[var(--color-primary)]
                      rounded-[var(--radius-md)]
                      hover:bg-[var(--color-primary-subtle)]
                      transition-colors
                    "
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="
                      block w-full px-[var(--space-md)] py-[var(--space-sm)]
                      text-center text-base font-medium
                      text-white
                      bg-[var(--color-primary)]
                      rounded-[var(--radius-md)]
                      hover:bg-[var(--color-primary-hover)]
                      transition-colors
                    "
                  >
                    Create account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
