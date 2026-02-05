import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/proxy';

/**
 * Next.js Middleware for Supabase Auth and SEO Protection
 *
 * This middleware runs on every request and:
 * 1. Refreshes the user's auth session
 * 2. Syncs auth tokens between server and client
 * 3. Protects routes by redirecting to login if needed
 * 4. Adds X-Robots-Tag header to prevent indexing of admin/operator subdomains
 *
 * The matcher pattern below ensures we only run on routes that need auth,
 * skipping static files, images, and other assets.
 */
export async function middleware(request: NextRequest) {
  // Get the response from auth middleware
  const response = await updateSession(request);

  // Check if hostname starts with 'admin.' or 'operators.'
  const hostname = request.headers.get('host') || '';
  if (hostname.startsWith('admin.') || hostname.startsWith('operators.')) {
    // Prevent search engines from indexing dashboard subdomains
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public images and assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
