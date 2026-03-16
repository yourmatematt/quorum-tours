/**
 * Shared utilities for OG image generation.
 * Used by opengraph-image.tsx files across the app.
 */

export const OG_SIZE = { width: 1200, height: 630 };

export const OG_COLORS = {
  ink: '#1A3320',
  inkMuted: '#374151',
  inkSubtle: '#4B5563',
  primary: '#2E8B57',
  accent: '#DAA520',
  surface: '#ffffff',
};

export const OG_GRADIENT = '#ffffff';

// Crimson Pro TTF — @vercel/og only supports ttf/woff, not woff2
// Use stable /s/ CDN path (permanent, unlike tokenized /l/font URLs that expire)
const FONT_URL_400 = 'https://fonts.gstatic.com/s/crimsonpro/v28/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZzm18OA.ttf';
const FONT_URL_700 = 'https://fonts.gstatic.com/s/crimsonpro/v28/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZKWp8OA.ttf';

async function fetchFont(url: string, fallbackPath?: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok && fallbackPath) {
    const fallback = await fetch(new URL(fallbackPath, process.env.NEXT_PUBLIC_SITE_URL || 'https://www.quorumtours.com'));
    return fallback.arrayBuffer();
  }
  return res.arrayBuffer();
}

export async function loadFont(): Promise<{ font400: ArrayBuffer; font700: ArrayBuffer }> {
  const [font400, font700] = await Promise.all([
    fetchFont(FONT_URL_400),
    fetchFont(FONT_URL_700, '/fonts/CrimsonPro-Bold.ttf'),
  ]);
  return { font400, font700 };
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
      <span style={{ fontSize: '20px', color: OG_COLORS.inkMuted, fontWeight: 500 }}>
        quorumtours.com
      </span>
    </div>
  );
}
