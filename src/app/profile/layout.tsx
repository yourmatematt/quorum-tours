import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Dashboard — Quorum Tours',
  description: 'Manage your tour commitments, chase list, and account settings.',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
