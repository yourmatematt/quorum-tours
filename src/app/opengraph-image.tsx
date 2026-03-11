import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Quorum Tours — Birding Tours That Run When Birders Commit';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  const fontData = await fetch(
    'https://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZ.woff2'
  ).then(res => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #F0FFF4 0%, #e6f9ea 40%, #d4f0dc 100%)',
          padding: '56px 64px',
          fontFamily: 'Crimson Pro, Georgia, serif',
          justifyContent: 'center',
        }}
      >
        {/* Logo + brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%',
            background: '#2E8B57', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '28px', fontWeight: 700,
          }}>Q</div>
          <span style={{ fontSize: '28px', color: '#2E8B57', fontWeight: 600 }}>Quorum Tours</span>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: '72px', fontWeight: 700, color: '#1A3320',
          lineHeight: 1.1, marginBottom: '24px',
          display: 'flex',
        }}>
          Birding tours that run when birders commit
        </div>

        {/* Subheading */}
        <div style={{
          fontSize: '28px', color: '#2d5a3d',
          lineHeight: 1.4, marginBottom: '40px',
          display: 'flex',
        }}>
          No last-minute cancellations. Full refund if quorum isn't reached.
        </div>

        {/* Three pillars */}
        <div style={{ display: 'flex', gap: '32px' }}>
          {[
            { label: 'Commit', desc: 'Pay a deposit to signal intent' },
            { label: 'Reach quorum', desc: 'Tour confirms when enough join' },
            { label: 'Go birding', desc: 'Everyone pays, everyone goes' },
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: '#DAA520', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#1A3320', fontSize: '18px', fontWeight: 700,
              }}>{i + 1}</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '20px', fontWeight: 600, color: '#1A3320' }}>{step.label}</span>
                <span style={{ fontSize: '16px', color: '#4a7a5a' }}>{step.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Crimson Pro', data: fontData, style: 'normal', weight: 700 }],
    }
  );
}
