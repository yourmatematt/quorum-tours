'use client';

import { useCallback, useEffect, useState } from 'react';
import { type User } from '@supabase/supabase-js';
import { createClient } from './client';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook for managing authentication state in Client Components.
 *
 * Usage:
 * ```tsx
 * const { user, isLoading, error } = useAuth();
 * if (isLoading) return <div>Loading...</div>;
 * if (!user) return <div>Please log in</div>;
 * return <div>Welcome, {user.email}</div>;
 * ```
 */
export function useAuth() {
  const supabase = createClient();
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  // Get the current user session
  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          setState((prev) => ({
            ...prev,
            error: error.message,
            isLoading: false,
          }));
          return;
        }

        setState({
          user,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: err instanceof Error ? err.message : 'An error occurred',
          isLoading: false,
        }));
      }
    };

    getUser();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setState({
        user: session?.user ?? null,
        isLoading: false,
        error: null,
      });
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase]);

  return state;
}

/**
 * Custom hook for signing out the current user.
 *
 * Usage:
 * ```tsx
 * const { signOut, isLoading } = useSignOut();
 * return <button onClick={() => signOut()}>Log out</button>;
 * ```
 */
export function useSignOut() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        setError(error.message);
        return;
      }

      // Redirect to home or login after sign out
      window.location.href = '/';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  return { signOut, isLoading, error };
}
