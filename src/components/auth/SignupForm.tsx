'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { PasswordInput } from './PasswordInput';
import { FormAlert } from './FormAlert';
import { OAuthButton } from './OAuthButton';

interface SignupFormProps {
  /** Redirect URL after successful signup */
  redirectTo?: string;
}

/**
 * SignupForm - Compact design for single-viewport auth pages
 *
 * Minimal fields: email, password only (no confirm password)
 * Trust-focused: Privacy assurance, social login, clear feedback
 */
export function SignupForm({ redirectTo }: SignupFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);

  // Field-level errors
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateEmail = (value: string): boolean => {
    if (!value) {
      setEmailError('Email address is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Enter a valid email address');
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validatePassword = (value: string): boolean => {
    if (!value) {
      setPasswordError('Password is required');
      return false;
    }
    if (value.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate all fields
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);

    try {
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo || '/')}`,
        },
      });

      if (signUpError) {
        setError(signUpError.message || 'Failed to create account. Please try again.');
        setIsLoading(false);
        return;
      }

      // Check if email confirmation is required
      if (data?.user?.identities?.length === 0) {
        // User already exists but is unconfirmed
        setError('An account with this email already exists.');
        setIsLoading(false);
        return;
      }

      // Success - show confirmation message
      setSignupSuccess(true);
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo || '/')}`,
        },
      });

      if (error) {
        setError(error.message || 'Failed to sign up with Google');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    }
  };

  // Show success message after signup
  if (signupSuccess) {
    return (
      <div className="space-y-[var(--space-md)]">
        <FormAlert variant="success">
          Account created! Check your email to confirm your account.
        </FormAlert>
        <button
          onClick={() => router.push('/login')}
          className="
            w-full
            h-11
            px-[var(--space-md)]
            text-base
            font-semibold
            text-[var(--color-ink)]
            bg-[var(--color-accent)]
            rounded-[var(--radius-md)]
            hover:bg-[var(--color-accent-hover)]
            shadow-sm
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
            transition-all duration-200
          "
        >
          Back to login
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-[var(--space-md)]">
      {/* Google OAuth - Primary option */}
      <OAuthButton provider="google" onClick={handleGoogleSignIn} />

      {/* Divider */}
      <div className="flex items-center gap-[var(--space-sm)]">
        <div className="flex-1 h-px bg-[var(--color-border)]" />
        <span className="text-xs text-[var(--color-ink-subtle)]">or continue with email</span>
        <div className="flex-1 h-px bg-[var(--color-border)]" />
      </div>

      {/* Form-level error */}
      {error && <FormAlert variant="error">{error}</FormAlert>}

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-[var(--space-sm)]">
        {/* Email field */}
        <div>
          <label
            htmlFor="signup-email"
            className="block text-sm font-medium text-[var(--color-ink)] mb-1"
          >
            Email address
          </label>
          <input
            type="email"
            id="signup-email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) validateEmail(e.target.value);
            }}
            onBlur={() => email && validateEmail(email)}
            placeholder="you@example.com"
            autoComplete="email"
            className={`
              w-full
              h-11
              px-[var(--space-md)]
              text-base
              text-[var(--color-ink)]
              bg-white
              border-2 rounded-[var(--radius-md)]
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-1
              ${
                emailError
                  ? 'border-[var(--color-danger)] focus:ring-[var(--color-danger)]'
                  : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
              }
            `}
            aria-invalid={emailError ? 'true' : 'false'}
            aria-describedby={emailError ? 'signup-email-error' : undefined}
          />
          {emailError && (
            <p id="signup-email-error" className="mt-1 text-xs text-[var(--color-danger)]" role="alert">
              {emailError}
            </p>
          )}
        </div>

        {/* Password field */}
        <div>
          <PasswordInput
            label="Create a password"
            id="signup-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) validatePassword(e.target.value);
            }}
            onBlur={() => password && validatePassword(password)}
            autoComplete="new-password"
            error={passwordError || undefined}
            compact
          />
          <p className="mt-1 text-xs text-[var(--color-ink-subtle)]">
            At least 8 characters
          </p>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="
            w-full
            h-11
            px-[var(--space-md)]
            text-base
            font-semibold
            text-[var(--color-ink)]
            bg-[var(--color-accent)]
            rounded-[var(--radius-md)]
            hover:bg-[var(--color-accent-hover)]
            shadow-sm
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
            flex items-center justify-center gap-[var(--space-sm)]
          "
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Creating account...
            </>
          ) : (
            'Create account'
          )}
        </button>
      </form>
    </div>
  );
}
