import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to Quorum Tours to commit to birding tours and manage your bookings.',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
