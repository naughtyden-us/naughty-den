'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AppError } from '@/types';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: AppError, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: AppError | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error: {
        code: 'COMPONENT_ERROR',
        message: error.message,
        details: error,
      },
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(
        {
          code: 'COMPONENT_ERROR',
          message: error.message,
          details: error,
        },
        errorInfo
      );
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full text-center">
            <div className="mb-6">
              <svg
                className="w-16 h-16 text-red-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
              <p className="text-gray-400 mb-4">
                We're sorry, but something unexpected happened. Please try refreshing the page.
              </p>
            </div>
            
            {this.state.error && (
              <div className="mb-6 p-4 bg-gray-800 rounded-lg text-left">
                <h3 className="text-sm font-semibold text-red-400 mb-2">Error Details:</h3>
                <p className="text-xs text-gray-300 break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}
            
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full py-3 px-4 rounded-lg bg-pink-600 hover:bg-pink-700 transition-colors font-bold"
              >
                Refresh Page
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full py-3 px-4 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for functional components to handle errors
export function useErrorHandler() {
  const handleError = (error: Error, context?: string) => {
    console.error(`Error in ${context || 'component'}:`, error);
    
    // In a real app, you might want to send this to an error reporting service
    // like Sentry, LogRocket, etc.
  };

  return { handleError };
}
