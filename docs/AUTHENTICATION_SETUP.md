# Supabase Authentication Setup for Quorum Tours

This document explains how Supabase authentication has been integrated into the Quorum Tours Next.js application.

## Overview

The application uses **Supabase Auth** for user authentication with the following features:

- Email/password authentication
- OAuth integration (Google, GitHub)
- Server-side rendering (SSR) support with secure session management
- Automatic session refresh via middleware
- Protected routes that redirect to login if needed

## Architecture

### Key Files

```
quorum-tours/
├── middleware.ts                           # Auth session refresh on every request
├── src/
│   ├── lib/supabase/
│   │   ├── client.ts                      # Browser client (Client Components)
│   │   ├── server.ts                      # Server client (Server Components)
│   │   ├── proxy.ts                       # Session refresh logic
│   │   └── useAuth.ts                     # Custom hooks for auth state
│   ├── components/auth/
│   │   ├── LoginForm.tsx                  # Login form with Supabase integration
│   │   └── SignupForm.tsx                 # Signup form with Supabase integration
│   └── app/auth/
│       ├── callback/route.ts              # OAuth & email confirmation callback
│       ├── error/page.tsx                 # Auth error page
│       └── logout/route.ts                # Logout endpoint
└── .env.example                           # Environment variable template
```

## Environment Configuration

### Required Variables

Add these to your `.env.local` file (copy from `.env.example`):

```bash
# Get these from your Supabase project dashboard
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### How to Get Your Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project (hello@quorumtours.com's Project)
3. Go to **Settings** > **API**
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## How It Works

### 1. Session Management with Middleware

The `middleware.ts` file runs on every request and:

1. Creates a Supabase server client
2. Calls `getUser()` to validate the JWT token
3. Refreshes expired tokens automatically
4. Syncs session cookies between server and client
5. Redirects unauthenticated users to login (except on `/login`, `/signup`, `/auth`)

```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}
```

### 2. Client-Side Authentication

#### Using the Supabase Client in Client Components

```typescript
'use client';

import { createClient } from '@/lib/supabase/client';

export function MyComponent() {
  const supabase = createClient();

  // Use supabase methods...
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'user@example.com',
    password: 'password',
  });
}
```

#### Using the Auth Hook

```typescript
'use client';

import { useAuth, useSignOut } from '@/lib/supabase/useAuth';

export function UserProfile() {
  const { user, isLoading, error } = useAuth();
  const { signOut } = useSignOut();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;

  return (
    <div>
      <p>Welcome, {user.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
```

### 3. Server-Side Authentication

#### Using the Supabase Server Client

```typescript
// In Server Components or Server Actions
import { createClient } from '@/lib/supabase/server';

export async function getData() {
  const supabase = await createClient();

  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();

  // Query data (RLS will apply automatically)
  const { data } = await supabase
    .from('tours')
    .select('*')
    .eq('user_id', user.id);
}
```

### 4. Authentication Flows

#### Email/Password Login

```typescript
const { error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
});
```

#### Email/Password Signup

```typescript
const { error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password',
  options: {
    emailRedirectTo: `${window.location.origin}/auth/callback`,
  },
});
```

User receives a confirmation email with a link to `/auth/callback?token_hash=xxx&type=email_change`

#### OAuth (Google, GitHub)

```typescript
const { error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${window.location.origin}/auth/callback`,
  },
});
```

After OAuth provider confirms, user is redirected to `/auth/callback?code=xxx`

#### Logout

```typescript
// Option 1: Client-side
const { signOut } = useSignOut();
await signOut();

// Option 2: Server action or link
<a href="/auth/logout">Log Out</a>
```

## Login and Signup Forms

The `LoginForm` and `SignupForm` components in `/src/components/auth/` have been integrated with Supabase:

### LoginForm.tsx

- Validates email and password
- Calls `supabase.auth.signInWithPassword()`
- Handles errors (invalid credentials, network issues)
- Shows loading state during submission
- Redirects to target page on success
- Supports OAuth sign-in with Google

### SignupForm.tsx

- Validates email and password (8+ characters)
- Calls `supabase.auth.signUp()`
- Shows success message with confirmation email instructions
- Handles errors (email already exists, etc.)
- Supports OAuth sign-up with Google

## Protected Routes

Routes that require authentication will automatically redirect unauthenticated users to `/login` with a redirect parameter to return them afterward.

Example:
- User tries to access `/profile`
- Middleware checks if they're logged in
- If not, redirects to `/login?redirect=%2Fprofile`
- After login, they're sent back to `/profile`

To protect a route, simply ensure the middleware is active (it is by default).

## Email Confirmation Flow

### Setup Required in Supabase Dashboard

1. Go to **Authentication** > **Email Templates**
2. Edit the **Confirm signup** template
3. Change the confirmation URL to:
   ```
   {{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=email_change
   ```

### User Flow

1. User signs up with email and password
2. Receives a confirmation email from Supabase
3. Clicks the link in the email (goes to `/auth/callback?token_hash=...&type=email_change`)
4. `/auth/callback` verifies the token and confirms the email
5. User is redirected to their destination page
6. Session cookie is automatically set

## OAuth Configuration

### Required Setup in Supabase Dashboard

1. Go to **Authentication** > **Providers**
2. Enable **Google** (or GitHub, etc.)
3. Add OAuth credentials:
   - For Google: Create OAuth 2.0 credentials in [Google Cloud Console](https://console.cloud.google.com)
   - Authorized redirect URIs should include:
     - `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`
     - Your app's `/auth/callback` route (for local dev: `http://localhost:3000/auth/callback`)

4. Copy the OAuth client ID and secret to Supabase dashboard

### User Flow

1. User clicks "Sign in with Google"
2. Redirected to Google login
3. User authorizes the app
4. Redirected back to `/auth/callback?code=xxx`
5. `/auth/callback` exchanges code for session
6. User is logged in and redirected to destination

## Security Considerations

### Do's

- ✅ Keep `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
- ✅ Use `createClient()` from `@/lib/supabase/client` in Client Components
- ✅ Use `createClient()` from `@/lib/supabase/server` in Server Components
- ✅ Always validate user input before sending to auth
- ✅ Use HTTPS in production
- ✅ Let middleware handle session refresh automatically

### Don'ts

- ❌ Don't expose `SUPABASE_SERVICE_ROLE_KEY` to the client
- ❌ Don't manually manage JWT tokens
- ❌ Don't trust `getSession()` on the server (use `getUser()` instead)
- ❌ Don't disable the middleware - it's essential for session management
- ❌ Don't store sensitive data in localStorage (tokens are managed by Supabase)

## Troubleshooting

### "NEXT_PUBLIC_SUPABASE_URL is not defined"

**Fix:** Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`

### Users getting randomly logged out

**Check:**
- Middleware is enabled (middleware.ts exists)
- Environment variables are set correctly
- Session cookies aren't being blocked

### "Email not confirmed" error

**Fix:**
- Make sure email confirmation flow is set up in Supabase dashboard
- Check that the email template has the correct callback URL
- Ask user to check spam folder for confirmation email

### OAuth not working

**Check:**
- OAuth provider is enabled in Supabase dashboard
- Client ID and secret are set correctly
- Redirect URI matches in both your app and OAuth provider settings
- Testing on `http://localhost:3000` (not IP address)

## Common Tasks

### Get the current user

```typescript
import { useAuth } from '@/lib/supabase/useAuth';

function MyComponent() {
  const { user } = useAuth();
  console.log('Current user:', user?.email);
}
```

### Sign out the user

```typescript
import { useSignOut } from '@/lib/supabase/useAuth';

function LogoutButton() {
  const { signOut } = useSignOut();
  return <button onClick={() => signOut()}>Sign out</button>;
}
```

### Query user data (Server Component)

```typescript
import { createClient } from '@/lib/supabase/server';

export async function UserProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return <div>Not logged in</div>;

  return <div>Welcome, {user.email}</div>;
}
```

### Redirect after login

The `redirectTo` parameter in login/signup forms handles this automatically. Users are redirected to the URL specified in the query parameter.

## Next Steps

1. Set up environment variables in `.env.local`
2. Configure OAuth in Supabase dashboard (optional)
3. Customize email templates in Supabase dashboard
4. Add Row Level Security (RLS) policies to your database tables
5. Create user profile pages using the auth hooks
6. Add logout buttons to your app navigation

## Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase SSR Package](https://supabase.com/docs/guides/auth/server-side)
- [Next.js Supabase Integration](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

## Support

For issues or questions about authentication, check:
1. Supabase logs in the dashboard
2. Browser console for errors
3. Network tab to see auth requests
4. Supabase documentation linked above
