import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Update the user session by refreshing the auth token.
 * This middleware is called for every request and is responsible for:
 *
 * 1. Refreshing the Auth token by calling `supabase.auth.getUser()`
 * 2. Passing the refreshed Auth token to Server Components via `request.cookies.set`
 * 3. Passing the refreshed Auth token to the browser via `response.cookies.set`
 * 4. Enforcing role-based access for admin/operator subdomains
 *
 * This ensures that:
 * - Users don't get randomly logged out
 * - Auth tokens stay in sync between server and client
 * - Users can access protected routes even if their token expired
 * - Subdomain access is restricted by role
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Create a Supabase client with the request cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Set cookies on the request for Server Components
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          // Create a new response with updated request
          supabaseResponse = NextResponse.next({
            request,
          });
          // Set cookies on the response for the browser
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and supabase.auth.getUser()
  // A mistake could make it hard to debug issues with users being randomly logged out
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  // Get hostname for subdomain detection
  const hostname = request.headers.get('host') || '';
  const isAdminSubdomain = hostname.startsWith('admin.');
  const isOperatorsSubdomain = hostname.startsWith('operators.');

  // Public routes that don't require auth
  const isPublicRoute =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/signup') ||
    request.nextUrl.pathname.startsWith('/auth') ||
    request.nextUrl.pathname.startsWith('/access-denied');

  // Redirect unauthenticated users to login (unless on public route)
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Role-based subdomain access control
  if (user && !isPublicRoute) {
    const role = user.app_metadata?.role || 'user';

    // Admin subdomain: only 'admin' role allowed
    if (isAdminSubdomain && role !== 'admin') {
      const url = request.nextUrl.clone();
      url.pathname = '/access-denied';
      url.searchParams.set('reason', 'not-admin');
      return NextResponse.redirect(url);
    }

    // Operators subdomain: only 'operator' role allowed (admin cannot access)
    if (isOperatorsSubdomain && role !== 'operator') {
      const url = request.nextUrl.clone();
      url.pathname = '/access-denied';
      url.searchParams.set('reason', 'not-operator');
      return NextResponse.redirect(url);
    }
  }

  // IMPORTANT: You MUST return the supabaseResponse object as is.
  // If you're creating a new response object with NextResponse.next(),
  // make sure to copy over the cookies from supabaseResponse.
  return supabaseResponse;
}
