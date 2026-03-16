import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_COLORS, OG_GRADIENT, loadFont, BrandHeader } from '@/lib/og-utils';

export const runtime = 'edge';
export const alt = 'Browse Birding Tours — Quorum Tours';
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
          Browse Birding Tours
        </div>

        <div style={{ fontSize: '28px', color: OG_COLORS.inkMuted, lineHeight: 1.4, marginBottom: '40px', display: 'flex' }}>
          Find tours across Australia that run on commitment, not hope.
          Filter by region, species, and status.
        </div>

        {/* Feature pills */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: 'auto' }}>
          {['Pelagic', 'Woodland', 'Wetland', 'Rainforest', 'Desert', 'Coastal'].map(tag => (
            <div key={tag} style={{
              padding: '10px 24px', borderRadius: '24px',
              background: 'rgba(46, 139, 87, 0.12)',
              border: '1.5px solid rgba(46, 139, 87, 0.25)',
              fontSize: '20px', color: OG_COLORS.primary, fontWeight: 500,
            }}>
              {tag}
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
