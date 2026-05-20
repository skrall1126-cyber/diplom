"use client";

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-[#06030f]">
          <div className="text-center max-w-md px-6">
            <div className="mb-6">
              <svg
                className="mx-auto h-16 w-16 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Алдаа гарлаа
            </h1>
            <p className="text-white/60 mb-6">
              {this.state.error?.message || 'Тодорхойгүй алдаа гарлаа'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Дахин оролдох
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Error display component for specific errors
export function ErrorDisplay({ 
  error, 
  onRetry 
}: { 
  error: string; 
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-lg border border-red-400/20 bg-red-500/10 p-4">
      <div className="flex items-start gap-3">
        <svg
          className="h-5 w-5 text-red-400 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="flex-1">
          <p className="text-sm text-red-200">{error}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-xs text-red-300 hover:text-red-100 underline"
            >
              Дахин оролдох
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// 401 Unauthorized error
export function UnauthorizedError({ onLogin }: { onLogin?: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06030f]">
      <div className="text-center max-w-md px-6">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Нэвтрэх шаардлагатай
        </h1>
        <p className="text-white/60 mb-6">
          Энэ хуудсыг үзэхийн тулд эхлээд нэвтэрнэ үү.
        </p>
        <button
          onClick={onLogin || (() => window.location.href = '/admin/login')}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Нэвтрэх
        </button>
      </div>
    </div>
  );
}

// 403 Forbidden error
export function ForbiddenError({ onGoBack }: { onGoBack?: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06030f]">
      <div className="text-center max-w-md px-6">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Хандах эрхгүй
        </h1>
        <p className="text-white/60 mb-6">
          Та энэ хуудсыг үзэх эрхгүй байна. Хэрэв энэ нь алдаа гэж бодож байвал админтай холбогдоно уу.
        </p>
        <button
          onClick={onGoBack || (() => window.history.back())}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Буцах
        </button>
      </div>
    </div>
  );
}

// Loading component
export function LoadingSpinner({ message = 'Уншиж байна...' }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06030f]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
        <p className="text-white/60">{message}</p>
      </div>
    </div>
  );
}
