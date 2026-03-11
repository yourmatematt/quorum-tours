/**
 * Shared utilities for OG image generation.
 * Used by opengraph-image.tsx files across the app.
 */

export const OG_SIZE = { width: 1200, height: 630 };

export const OG_COLORS = {
  ink: '#1A3320',
  inkMuted: '#2d5a3d',
  inkSubtle: '#4a7a5a',
  primary: '#2E8B57',
  accent: '#DAA520',
  surface: '#F0FFF4',
};

export const OG_GRADIENT = 'linear-gradient(135deg, #F0FFF4 0%, #e6f9ea 40%, #d4f0dc 100%)';

// Crimson Pro 700 TTF — @vercel/og only supports ttf/woff, not woff2
// Use stable /s/ CDN path (permanent, unlike tokenized /l/font URLs that expire)
const FONT_URL = 'https://fonts.gstatic.com/s/crimsonpro/v28/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZKWp8OA.ttf';

export async function loadFont() {
  const res = await fetch(FONT_URL);
  if (!res.ok) {
    // Fallback to self-hosted TTF if Google CDN fails
    const fallback = await fetch(new URL('/fonts/CrimsonPro-Bold.ttf', process.env.NEXT_PUBLIC_SITE_URL || 'https://www.quorumtours.com'));
    return fallback.arrayBuffer();
  }
  return res.arrayBuffer();
}

export function BrandHeader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
      <div style={{
        width: '40px', height: '40px', borderRadius: '50%',
        background: OG_COLORS.primary,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontSize: '20px', fontWeight: 700,
      }}>Q</div>
      <span style={{ fontSize: '20px', color: OG_COLORS.inkSubtle, fontWeight: 500 }}>
        quorumtours.com
      </span>
    </div>
  );
}
