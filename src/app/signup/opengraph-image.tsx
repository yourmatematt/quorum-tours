import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_COLORS, OG_GRADIENT, loadFont, BrandHeader } from '@/lib/og-utils';

export const runtime = 'edge';
export const alt = 'Create Account — Quorum Tours';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function OGImage() {
  const { font400, font700 } = await loadFont();

  return new ImageResponse(
    (
      <div style={{
        display: 'flex', flexDirection: 'column', width: '100%', height: '100%',
        background: OG_GRADIENT, padding: '48px 56px',
        fontFamily: 'Crimson Pro, Georgia, serif', justifyContent: 'center',
      }}>
        <BrandHeader />
        <div style={{ fontSize: '64px', fontWeight: 700, color: OG_COLORS.ink, lineHeight: 1.1, marginBottom: '20px', display: 'flex' }}>
          Join Quorum Tours
        </div>
        <div style={{ fontSize: '28px', color: OG_COLORS.inkMuted, display: 'flex' }}>
          Commit to birding tours that only run when enough birders sign up. No risk — full refund if quorum isn't reached.
        </div>
      </div>
    ),
    { ...size, fonts: [
      { name: 'Crimson Pro', data: font400, style: 'normal' as const, weight: 400 as const },
      { name: 'Crimson Pro', data: font700, style: 'normal' as const, weight: 700 as const },
    ] }
  );
}
