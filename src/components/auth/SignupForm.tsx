'use client';

import { useState } from 'react';
import { PasswordInput } from './PasswordInput';
import { PasswordRequirements } from './PasswordRequirements';
import { FormAlert } from './FormAlert';
import { AuthDivider } from './AuthDivider';
import { OAuthButton } from './OAuthButton';
import { TermsNotice } from './TermsNotice';

interface SignupFormProps {
  /** Redirect URL after successful signup */
  redirectTo?: string;
}

/**
 * SignupForm - Account registration form
 *
 * Minimal fields: email, password, confirm password.
 * No optional fields (reduces cognitive load).
 *
 * Designed to address:
 * - NW-2 (Intimidation): No expertise questions, welcoming tone
 * - OP-8 (Technology Frustration): Large inputs, clear feedback
 * - EL-2 (Payment Anxiety): No billing mentions, simple access
 *
 * UI Shell: No actual account creation implemented.
 */
export function SignupForm({ redirectTo }: SignupFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Field-level errors
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);

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

  const validateConfirmPassword = (value: string): boolean => {
    if (!value) {
      setConfirmError('Please confirm your password');
      return false;
    }
    if (value !== password) {
      setConfirmError('Passwords do not match');
      return false;
    }
    setConfirmError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate all fields
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmValid = validateConfirmPassword(confirmPassword);

    if (!isEmailValid || !isPasswordValid || !isConfirmValid) {
      return;
    }

    setIsLoading(true);

    // Simulate API call (UI shell only)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Log form data for development
    console.log('Signup form submitted:', {
      email,
      passwordLength: password.length,
      redirectTo: redirectTo || '/',
    });

    // Simulate success or error for demo purposes
    // In production, this would be a real auth call
    setIsLoading(false);

    // For demo: simulate email already exists error
    if (email === 'test@example.com') {
      setError('An account with this email already exists. Sign in instead?');
    } else {
      // Simulate success - in real app would redirect
      setError(null);
      console.log('Account created successfully');
    }
  };

  const handleOAuthClick = (provider: string) => {
    // UI shell: just log the action
    console.log(`OAuth signup with ${provider} requested`);
    console.log('Redirect to:', redirectTo || '/');
  };

  return (
    <div className="space-y-[var(--space-lg)]">
      {/* Form-level error */}
      {error && (
        <FormAlert variant="error">
          {error}
          {error.includes('Sign in') && (
            <a
              href="/login"
              className="
                block mt-[var(--space-xs)]
                text-[var(--color-danger)]
                underline
                hover:no-underline
              "
            >
              Go to sign in
            </a>
          )}
        </FormAlert>
      )}

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-[var(--space-md)]">
        {/* Email field */}
        <div>
          <label
            htmlFor="email"
            className="
              block
              text-[var(--text-sm)]
              font-medium
              text-[var(--color-ink)]
              mb-[var(--space-xs)]
            "
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
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
              h-12 sm:h-[52px]
              px-[var(--space-md)]
              text-[var(--text-base)]
              text-[var(--color-ink)]
              bg-[var(--color-surface)]
              border rounded-[var(--radius-md)]
              transition-colors duration-[var(--transition-fast)]
              focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-1
              ${
                emailError
                  ? 'border-[var(--color-danger)] focus:ring-[var(--color-danger)]'
                  : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)]'
              }
            `}
            aria-invalid={emailError ? 'true' : 'false'}
            aria-describedby={emailError ? 'email-error' : undefined}
          />
          {emailError && (
            <p
              id="email-error"
              className="
                mt-[var(--space-xs)]
                text-[var(--text-sm)]
                text-[var(--color-danger)]
              "
              role="alert"
            >
              {emailError}
            </p>
          )}
        </div>

        {/* Password field */}
        <div>
          <PasswordInput
            label="Create a password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) validatePassword(e.target.value);
              // Re-validate confirm if it has a value
              if (confirmPassword) {
                validateConfirmPassword(confirmPassword);
              }
            }}
            onBlur={() => password && validatePassword(password)}
            autoComplete="new-password"
            error={passwordError || undefined}
            aria-describedby="password-requirements"
          />
          {/* Password requirements checklist */}
          <PasswordRequirements password={password} id="password-requirements" />
        </div>

        {/* Confirm password field */}
        <div>
          <PasswordInput
            label="Confirm password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (confirmError) validateConfirmPassword(e.target.value);
            }}
            onBlur={() => confirmPassword && validateConfirmPassword(confirmPassword)}
            autoComplete="new-password"
            error={confirmError || undefined}
          />
        </div>

        {/* Terms notice */}
        <div className="pt-[var(--space-xs)]">
          <TermsNotice />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="
            w-full
            h-12 sm:h-[52px]
            px-[var(--space-md)]
            text-[var(--text-base)]
            font-medium
            text-white
            bg-[var(--color-accent)]
            rounded-[var(--radius-md)]
            hover:bg-[var(--color-accent-hover)]
            focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-[var(--transition-normal)]
            flex items-center justify-center gap-[var(--space-sm)]
          "
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
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

      {/* Divider */}
      <AuthDivider />

      {/* OAuth option */}
      <div>
        <OAuthButton provider="google" onClick={() => handleOAuthClick('google')} />
      </div>
    </div>
  );
}
