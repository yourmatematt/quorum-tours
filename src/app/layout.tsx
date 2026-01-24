import type { Metadata } from 'next';
import './globals.css';
import { GlobalNav } from '@/components/GlobalNav';
import { GlobalFooter } from '@/components/GlobalFooter';

export const metadata: Metadata = {
  title: 'Quorum Tours',
  description: 'Tours that run when birders commit.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Display/Heading font: Crimson Pro (Academic/Research) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Body font: Atkinson Hyperlegible (Accessibility-focused) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* Mono font: JetBrains Mono */}
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GlobalNav />
        {children}
        <GlobalFooter />
      </body>
    </html>
  );
}
