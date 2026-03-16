import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_COLORS, OG_GRADIENT, loadFont, BrandHeader } from '@/lib/og-utils';

export const runtime = 'edge';
export const alt = 'Apply as an Operator — Quorum Tours';
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
        <div style={{ fontSize: '60px', fontWeight: 700, color: OG_COLORS.ink, lineHeight: 1.1, marginBottom: '20px', display: 'flex' }}>
          Apply to list your tours
        </div>
        <div style={{ fontSize: '28px', color: OG_COLORS.inkMuted, lineHeight: 1.4, marginBottom: '40px', display: 'flex' }}>
          Join Quorum Tours as a verified operator. List tours that only run when enough birders commit.
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['No upfront cost', '6% commission', 'Stripe payouts', 'Full control'].map(item => (
            <div key={item} style={{
              padding: '10px 20px', borderRadius: '24px',
              background: 'rgba(46, 139, 87, 0.12)',
              border: '1.5px solid rgba(46, 139, 87, 0.25)',
              fontSize: '20px', color: OG_COLORS.primary, fontWeight: 500,
            }}>
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
