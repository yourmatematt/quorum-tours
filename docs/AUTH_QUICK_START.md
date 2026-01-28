# Supabase Auth Quick Start Guide

Get Supabase authentication running in 5 minutes.

## Step 1: Set Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to get these:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to Settings > API
4. Copy the values

## Step 2: Start the Dev Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Step 3: Test Authentication

### Test Signup
1. Go to `/signup`
2. Enter an email and password (8+ characters)
3. Click "Create account"
4. You should see a success message

### Test Login
1. Go to `/login`
2. Enter your credentials
3. You should be logged in and redirected to home

### Test Logout
Look for a logout button in your app navigation and click it.

## What's Been Set Up

### Files Created

**Supabase Client Utilities**
- `/src/lib/supabase/client.ts` - Browser client for Client Components
- `/src/lib/supabase/server.ts` - Server client for Server Components
- `/src/lib/supabase/proxy.ts` - Middleware for session refresh
- `/src/lib/supabase/useAuth.ts` - Custom hooks for auth state

**Authentication Routes**
- `/src/app/auth/callback/route.ts` - OAuth & email confirmation
- `/src/app/auth/error/page.tsx` - Error page
- `/src/app/auth/logout/route.ts` - Logout endpoint

**App Middleware**
- `/middleware.ts` - Session refresh on every request

**Updated Components**
- `/src/components/auth/LoginForm.tsx` - Real Supabase auth
- `/src/components/auth/SignupForm.tsx` - Real Supabase auth

## Next: Set Up Email Confirmation (Optional)

In your Supabase dashboard:

1. Go to **Authentication** > **Email Templates**
2. Edit the **Confirm signup** template
3. Change the confirmation URL to:
   ```
   {{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=email_change
   ```
4. Save

Users will now receive a confirmation email when they sign up.

## Next: Set Up OAuth (Optional)

### Enable Google OAuth

1. In Supabase dashboard, go to **Authentication** > **Providers**
2. Enable **Google**
3. Create OAuth credentials in [Google Cloud Console](https://console.cloud.google.com):
   - Create a new project
   - Enable Google+ API
   - Create OAuth 2.0 credentials (Web application)
   - Add authorized redirect URI: `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`
4. Copy Client ID and secret to Supabase dashboard
5. Users can now click "Sign in with Google"

## Using Auth in Your Components

### Check if User is Logged In

```typescript
'use client';

import { useAuth } from '@/lib/supabase/useAuth';

export function MyComponent() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Please log in</div>;

  return <div>Welcome, {user.email}</div>;
}
```

### Sign Out

```typescript
'use client';

import { useSignOut } from '@/lib/supabase/useAuth';

export function LogoutButton() {
  const { signOut } = useSignOut();
  return <button onClick={() => signOut()}>Sign Out</button>;
}
```

### Get User in Server Component

```typescript
import { createClient } from '@/lib/supabase/server';

export async function UserInfo() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return <div>Not logged in</div>;

  return <div>User: {user.email}</div>;
}
```

## Protected Routes

Routes that require a user to be logged in will automatically redirect to `/login`.

The middleware (in `middleware.ts`) handles this automatically. No configuration needed.

## Troubleshooting

### Environment variables not loading
- Make sure you edited `.env.local` (not `.env.example`)
- Restart your dev server after changing env vars
- Check that variable names start with `NEXT_PUBLIC_` (for client-side)

### Signup/login not working
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set correctly
- Check the browser console for errors
- Check the Network tab in DevTools

### OAuth showing errors
- Make sure OAuth provider is enabled in Supabase dashboard
- Check that Client ID and secret are set
- Verify redirect URI matches in both Supabase and OAuth provider

### Users getting logged out randomly
- Make sure `middleware.ts` exists in project root
- Check that it has the correct matcher pattern
- Restart dev server

## Full Documentation

See `/docs/AUTHENTICATION_SETUP.md` for complete documentation including:
- Architecture overview
- All available auth methods
- Security best practices
- Common tasks
- Advanced usage

## Support

Check Supabase docs: https://supabase.com/docs/guides/auth
