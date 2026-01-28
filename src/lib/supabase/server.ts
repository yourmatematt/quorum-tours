import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Create a Supabase client for use in Server Components, Server Actions, and Route Handlers.
 * This client runs only on the server and has access to cookies.
 *
 * Call this in:
 * - Server Components
 * - Server Actions (use 'use server')
 * - Route Handlers (api/*)
 *
 * Note: Must be an async function to access the cookies() API.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
            // The middleware (proxy.ts) will handle setting cookies on the response.
          }
        },
      },
    }
  );
}
