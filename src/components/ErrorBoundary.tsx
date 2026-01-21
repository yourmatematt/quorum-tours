'use client';

/**
 * Error Boundary Component
 * Catches JavaScript errors in child component tree and displays fallback UI
 */

import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service in production
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          className="border border-red-200 bg-red-50 rounded-lg p-6 my-4"
        >
          <h2 className="font-display text-xl font-semibold text-red-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-red-800 mb-4">
            We encountered an error loading this section. Please try refreshing
            the page.
          </p>
          {this.state.error && (
            <details className="text-xs text-red-700">
              <summary className="cursor-pointer font-medium mb-2">
                Error details
              </summary>
              <pre className="bg-red-100 p-3 rounded overflow-x-auto">
                {this.state.error.message}
              </pre>
            </details>
          )}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors min-h-[48px]"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
