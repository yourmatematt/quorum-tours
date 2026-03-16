import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_COLORS, OG_GRADIENT, loadFont, BrandHeader } from '@/lib/og-utils';

export const runtime = 'edge';
export const alt = 'Tour Operators — Quorum Tours';
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

        <div style={{ fontSize: '64px', fontWeight: 700, color: OG_COLORS.ink, lineHeight: 1.1, marginBottom: '20px', display: 'flex' }}>
          Meet Our Tour Operators
        </div>

        <div style={{ fontSize: '28px', color: OG_COLORS.inkMuted, lineHeight: 1.4, marginBottom: '40px', display: 'flex' }}>
          Verified birding guides across Australia. Experienced operators running tours that confirm when birders commit.
        </div>

        {/* Verified badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '12px 24px', borderRadius: '24px',
            background: OG_COLORS.primary, color: 'white',
            fontSize: '20px', fontWeight: 600,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All operators verified
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '12px 24px', borderRadius: '24px',
            background: 'rgba(46, 139, 87, 0.12)',
            border: '1.5px solid rgba(46, 139, 87, 0.25)',
            fontSize: '20px', color: OG_COLORS.primary, fontWeight: 500,
          }}>
            Transparent track records
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [
      { name: 'Crimson Pro', data: font400, style: 'normal' as const, weight: 400 as const },
      { name: 'Crimson Pro', data: font700, style: 'normal' as const, weight: 700 as const },
    ] }
  );
}
