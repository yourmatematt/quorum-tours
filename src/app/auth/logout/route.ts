import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * Logout Route Handler
 *
 * This route handles user logout by signing them out of Supabase
 * and clearing their session cookies.
 *
 * Can be called via:
 * - POST /auth/logout
 * - GET /auth/logout
 *
 * After logout, the user is redirected to the home page.
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // Sign out the user
  await supabase.auth.signOut();

  // Redirect to home page
  return NextResponse.redirect(new URL('/', request.url), {
    status: 302,
  });
}

// Also support GET for convenience (though POST is preferred)
export async function GET(request: NextRequest) {
  const supabase = await createClient();

  // Sign out the user
  await supabase.auth.signOut();

  // Redirect to home page
  return NextResponse.redirect(new URL('/', request.url), {
    status: 302,
  });
}
