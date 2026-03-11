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

export async function loadFont() {
  // Fetch from Google Fonts CSS API with woff2 user-agent to get direct font URL
  const css = await fetch(
    'https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@700&display=swap',
    { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)' } }
  ).then(res => res.text());

  // Extract the woff/woff2 URL from the CSS
  const urlMatch = css.match(/src:\s*url\(([^)]+)\)/);
  if (urlMatch) {
    return fetch(urlMatch[1]).then(res => res.arrayBuffer());
  }

  // Fallback: fetch directly from a known stable URL
  return fetch(
    'https://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZ.woff'
  ).then(res => res.arrayBuffer());
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
