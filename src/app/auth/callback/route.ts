import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://quorumtours.com';
const emailFunctionUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-email`;

/**
 * Auth Callback Route Handler
 *
 * This route handles OAuth callbacks and email confirmation callbacks from Supabase.
 *
 * When users sign up with email, they receive a confirmation email with a link that redirects here.
 * When users sign in with OAuth (Google, GitHub, etc.), they're redirected here after authorization.
 *
 * URL format:
 * - Email confirmation: /auth/callback?token_hash=xxx&type=email_change
 * - OAuth: /auth/callback?code=xxx
 * - With redirect: /auth/callback?token_hash=xxx&type=email_change&next=/profile
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Get the token hash and type from the URL for email verification
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;

  // Get the OAuth code if this is an OAuth callback
  const code = searchParams.get('code');

  // Get the redirect destination (where to send user after auth)
  const next = searchParams.get('next') || '/';

  // Create redirect URL
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete('token_hash');
  redirectTo.searchParams.delete('type');
  redirectTo.searchParams.delete('code');
  redirectTo.searchParams.delete('next');

  // Create error redirect URL
  const errorRedirect = request.nextUrl.clone();
  errorRedirect.pathname = '/auth/error';
  errorRedirect.searchParams.delete('token_hash');
  errorRedirect.searchParams.delete('type');
  errorRedirect.searchParams.delete('code');
  errorRedirect.searchParams.delete('next');

  try {
    const supabase = await createClient();

    // Handle email verification (email confirmation, password reset, etc.)
    if (token_hash && type) {
      const { error } = await supabase.auth.verifyOtp({
        type,
        token_hash,
      });

      if (error) {
        errorRedirect.searchParams.set('error', error.message);
        return NextResponse.redirect(errorRedirect);
      }

      // For new signups (type === 'signup' or 'email'), send welcome email
      if (type === 'signup' || type === 'email') {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user?.email) {
            // Check if we've already sent a welcome email to this user
            const supabaseAdmin = createAdminClient(
              process.env.NEXT_PUBLIC_SUPABASE_URL!,
              process.env.SUPABASE_SERVICE_ROLE_KEY!
            );

            const { data: existingWelcome } = await supabaseAdmin
              .from('email_log')
              .select('id')
              .eq('user_id', user.id)
              .eq('email_type', 'welcome')
              .limit(1)
              .single();

            if (!existingWelcome) {
              // Send welcome email
              const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'there';

              await fetch(emailFunctionUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
                },
                body: JSON.stringify({
                  template: 'welcome',
                  to: user.email,
                  data: {
                    userName,
                    email: user.email,
                    loginUrl: `${siteUrl}/login`,
                    toursUrl: `${siteUrl}/tours`,
                    chaseListUrl: `${siteUrl}/profile`,
                  },
                }),
              });

              // Log the email
              await supabaseAdmin.from('email_log').insert({
                user_id: user.id,
                email_type: 'welcome',
                subject: 'Welcome to Quorum Tours!',
                recipient_email: user.email,
                status: 'sent',
              });

              console.log(`Welcome email sent to ${user.email}`);
            }
          }
        } catch (emailErr) {
          // Don't block auth flow if email fails
          console.error('Failed to send welcome email:', emailErr);
        }
      }

      // Email verified successfully, redirect to next page
      return NextResponse.redirect(redirectTo);
    }

    // Handle OAuth callback
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        errorRedirect.searchParams.set('error', error.message);
        return NextResponse.redirect(errorRedirect);
      }

      // OAuth successful, redirect to next page
      return NextResponse.redirect(redirectTo);
    }

    // No token or code provided - this shouldn't happen in normal flow
    errorRedirect.searchParams.set('error', 'Invalid callback parameters');
    return NextResponse.redirect(errorRedirect);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
    errorRedirect.searchParams.set('error', errorMessage);
    return NextResponse.redirect(errorRedirect);
  }
}
