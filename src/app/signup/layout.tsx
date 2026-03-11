import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Join Quorum Tours — commit to birding tours that only run when enough birders sign up. No risk, full refund if quorum isn\'t reached.',
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
