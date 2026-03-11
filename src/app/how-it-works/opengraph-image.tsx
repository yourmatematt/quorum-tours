import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_COLORS, OG_GRADIENT, loadFont, BrandHeader } from '@/lib/og-utils';

export const runtime = 'edge';
export const alt = 'How It Works — Quorum Tours';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function OGImage() {
  const fontData = await loadFont();

  return new ImageResponse(
    (
      <div style={{
        display: 'flex', flexDirection: 'column', width: '100%', height: '100%',
        background: OG_GRADIENT, padding: '48px 56px',
        fontFamily: 'Crimson Pro, Georgia, serif',
      }}>
        <BrandHeader />

        <div style={{ fontSize: '64px', fontWeight: 700, color: OG_COLORS.ink, lineHeight: 1.1, marginBottom: '32px', display: 'flex' }}>
          How Quorum Works
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '20px' }}>
          {[
            { num: '1', title: 'Browse and commit', desc: 'Find a tour, pay a refundable deposit to signal your intent' },
            { num: '2', title: 'Reach quorum', desc: 'When enough birders commit, the tour is confirmed' },
            { num: '3', title: 'Pay and go', desc: 'Pay the balance, the operator runs the tour. Everyone shows up.' },
          ].map(step => (
            <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: OG_COLORS.primary, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: '24px', fontWeight: 700, flexShrink: 0,
              }}>{step.num}</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '26px', fontWeight: 600, color: OG_COLORS.ink }}>{step.title}</span>
                <span style={{ fontSize: '20px', color: OG_COLORS.inkMuted }}>{step.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          marginTop: 'auto', fontSize: '20px', color: OG_COLORS.inkSubtle,
        }}>
          Full refund if quorum isn't reached. No risk.
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Crimson Pro', data: fontData, style: 'normal' as const, weight: 700 as const }] }
  );
}
