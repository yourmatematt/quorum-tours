import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_COLORS, OG_GRADIENT, loadFont, BrandHeader } from '@/lib/og-utils';

export const runtime = 'edge';
export const alt = 'For Operators — Quorum Tours';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function OGImage() {
  const { font400, font700 } = await loadFont();

  return new ImageResponse(
    (
      <div style={{
        display: 'flex', flexDirection: 'column', width: '100%', height: '100%',
        background: OG_GRADIENT, padding: '48px 56px',
        fontFamily: 'Crimson Pro, Georgia, serif',
      }}>
        <BrandHeader />

        <div style={{ fontSize: '60px', fontWeight: 700, color: OG_COLORS.ink, lineHeight: 1.1, marginBottom: '20px', display: 'flex' }}>
          Run tours that fill themselves
        </div>

        <div style={{ fontSize: '28px', color: OG_COLORS.inkMuted, lineHeight: 1.4, marginBottom: '40px', display: 'flex' }}>
          List your birding tours on Quorum. Only run when enough birders commit.
          No empty seats, no wasted days.
        </div>

        {/* Benefits */}
        <div style={{ display: 'flex', gap: '24px', marginTop: 'auto', flexWrap: 'wrap' }}>
          {['6% commission', 'No upfront fees', 'Stripe payouts', 'Built-in trust system'].map(item => (
            <div key={item} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 20px', borderRadius: '24px',
              background: 'rgba(218, 165, 32, 0.15)',
              border: '1.5px solid rgba(218, 165, 32, 0.3)',
              fontSize: '20px', color: OG_COLORS.ink, fontWeight: 500,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={OG_COLORS.accent} strokeWidth="2.5">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts: [
      { name: 'Crimson Pro', data: font400, style: 'normal' as const, weight: 400 as const },
      { name: 'Crimson Pro', data: font700, style: 'normal' as const, weight: 700 as const },
    ] }
  );
}
