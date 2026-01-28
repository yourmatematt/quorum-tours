# Supabase Authentication Setup Checklist

Complete these steps to fully enable authentication in your Quorum Tours app.

## Phase 1: Basic Setup (Required)

- [ ] **Get Supabase credentials**
  - [ ] Go to [Supabase Dashboard](https://app.supabase.com)
  - [ ] Select "hello@quorumtours.com's Project"
  - [ ] Go to Settings > API
  - [ ] Copy Project URL (NEXT_PUBLIC_SUPABASE_URL)
  - [ ] Copy Anon public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

- [ ] **Set environment variables**
  - [ ] Open `.env.local` in project root
  - [ ] Add `NEXT_PUBLIC_SUPABASE_URL=` with your Project URL
  - [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY=` with your Anon key
  - [ ] Save and close

- [ ] **Restart dev server**
  - [ ] Stop the dev server (Ctrl+C)
  - [ ] Run `npm run dev` again
  - [ ] Verify no errors in console about missing env vars

- [ ] **Test basic auth**
  - [ ] Go to `http://localhost:3000/signup`
  - [ ] Create a test account with an email and password
  - [ ] Go to `http://localhost:3000/login`
  - [ ] Log in with your test account
  - [ ] Verify you're logged in

## Phase 2: Email Confirmation (Recommended)

- [ ] **Configure email template in Supabase**
  - [ ] Go to Supabase Dashboard
  - [ ] Go to Authentication > Email Templates
  - [ ] Click on "Confirm signup" template
  - [ ] Replace the confirmation URL with:
    ```
    {{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=email_change
    ```
  - [ ] Save changes

- [ ] **Test email confirmation**
  - [ ] Create a new account from `/signup`
  - [ ] Check your email inbox for confirmation email
  - [ ] Click the confirmation link
  - [ ] Verify you're logged in after confirmation
  - [ ] Note: In development, check spam folder too

## Phase 3: OAuth Setup (Optional)

### Enable Google OAuth

- [ ] **Create Google OAuth credentials**
  - [ ] Go to [Google Cloud Console](https://console.cloud.google.com)
  - [ ] Create a new project or select existing
  - [ ] Enable Google+ API
  - [ ] Go to Credentials
  - [ ] Create OAuth 2.0 credentials (Web application)
  - [ ] Add authorized redirect URI:
    ```
    https://your-project-id.supabase.co/auth/v1/callback
    ```
    (Replace `your-project-id` with actual ID from Supabase URL)
  - [ ] Copy Client ID and Client Secret

- [ ] **Enable Google in Supabase**
  - [ ] Go to Supabase Dashboard
  - [ ] Go to Authentication > Providers
  - [ ] Click on Google provider
  - [ ] Enable it
  - [ ] Paste Client ID and Client Secret
  - [ ] Save

- [ ] **Test Google OAuth**
  - [ ] Go to `/login` or `/signup`
  - [ ] Click "Sign in with Google"
  - [ ] Complete Google authorization
  - [ ] Verify you're logged in

### Enable GitHub OAuth (Optional)

- [ ] **Create GitHub OAuth credentials**
  - [ ] Go to GitHub Settings > Developer settings > OAuth Apps
  - [ ] Create New OAuth App
  - [ ] Set Authorization callback URL to:
    ```
    https://your-project-id.supabase.co/auth/v1/callback
    ```
  - [ ] Copy Client ID and Client Secret

- [ ] **Enable GitHub in Supabase**
  - [ ] Go to Supabase Dashboard
  - [ ] Go to Authentication > Providers
  - [ ] Click on GitHub provider
  - [ ] Enable it
  - [ ] Paste Client ID and Client Secret
  - [ ] Save

- [ ] **Test GitHub OAuth**
  - [ ] Go to `/login` or `/signup`
  - [ ] Click "Sign in with GitHub"
  - [ ] Complete GitHub authorization
  - [ ] Verify you're logged in

## Phase 4: Database & Row-Level Security (Advanced)

If you're querying user data from the database:

- [ ] **Create users table**
  - [ ] Go to Supabase Dashboard > SQL Editor
  - [ ] Create a `profiles` table with user info
  - [ ] Add user ID as foreign key to `auth.users`

- [ ] **Set up Row-Level Security (RLS)**
  - [ ] Enable RLS on your table
  - [ ] Create policy: Users can view own records
  - [ ] Create policy: Users can insert own records
  - [ ] Create policy: Users can update own records

## Phase 5: Deployment (When Ready)

- [ ] **Set environment variables in production**
  - [ ] Go to your hosting platform (Vercel, etc.)
  - [ ] Add `NEXT_PUBLIC_SUPABASE_URL` to environment variables
  - [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` to environment variables
  - [ ] Redeploy your app

- [ ] **Update OAuth redirect URIs**
  - [ ] Add production domain to Google OAuth:
    ```
    https://yourdomain.com/auth/callback
    ```
  - [ ] Add production domain to GitHub OAuth:
    ```
    https://yourdomain.com/auth/callback
    ```
  - [ ] Add production domain to Supabase email templates

- [ ] **Test in production**
  - [ ] Go to login page on production
  - [ ] Test email/password login
  - [ ] Test OAuth providers
  - [ ] Test logout

## Phase 6: User Experience Enhancements

Once basic auth is working, consider:

- [ ] **Password reset flow**
  - [ ] Enable in Supabase dashboard
  - [ ] Create `/reset-password` page
  - [ ] Update email template with reset link

- [ ] **User profile page**
  - [ ] Create `/profile` to show logged-in user info
  - [ ] Show user email
  - [ ] Add logout button
  - [ ] Allow user to update profile info

- [ ] **Protected navigation**
  - [ ] Update navigation bar
  - [ ] Show user email when logged in
  - [ ] Show logout button when logged in
  - [ ] Hide login/signup links when logged in

- [ ] **Logout from all navigation pages**
  - [ ] Add logout button to operator dashboard
  - [ ] Add logout button to user profile
  - [ ] Add logout button to footer

## Quick Reference: User Flows

### Signup Flow
1. User goes to `/signup`
2. Enters email and password
3. Clicks "Create account"
4. Receives confirmation email (if configured)
5. Clicks link in email
6. Account is confirmed
7. User can log in

### Login Flow
1. User goes to `/login`
2. Enters email and password
3. Clicks "Log in"
4. Middleware checks session
5. User is logged in
6. User is redirected to home or specified page

### OAuth Flow
1. User clicks "Sign in with Google/GitHub"
2. Redirected to provider
3. User authorizes app
4. Redirected back to `/auth/callback`
5. Session is created
6. User is logged in

### Logout Flow
1. User clicks logout
2. Session is cleared
3. Cookies are deleted
4. User is redirected to home
5. Middleware enforces redirect to login

## Troubleshooting

**Problem: Auth not working after env changes**
- Solution: Restart dev server with `npm run dev`

**Problem: Signup email not received**
- Solution: Check spam folder, or disable email confirmation in Supabase dashboard for testing

**Problem: OAuth not working**
- Solution: Verify Client ID/Secret in Supabase, check redirect URI matches

**Problem: Users randomly logged out**
- Solution: Ensure middleware.ts is in project root and hasn't been modified

**Problem: "Email not confirmed" error**
- Solution: Configure email template in Supabase dashboard (Phase 2)

## Getting Help

1. Check logs in Supabase Dashboard
2. Read the full docs: `/docs/AUTHENTICATION_SETUP.md`
3. Check browser console for JavaScript errors
4. Review Supabase auth docs: https://supabase.com/docs/guides/auth
5. Check Next.js docs for Server Components: https://nextjs.org/docs

## Completion

Once all checkboxes are complete:
- [ ] Mark this checklist as done
- [ ] Test all auth flows one more time
- [ ] Commit changes to git
- [ ] Deploy to production

Estimated time: 30 minutes (for Phase 1-2)
