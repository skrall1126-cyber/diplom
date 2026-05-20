"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  status: string;
  first_name: string;
  last_name: string;
  phone?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = authApi.getToken();
      const savedUser = authApi.getUser();
      
      if (!token || !savedUser) {
        setLoading(false);
        return;
      }

      // Use saved user from localStorage
      setUser(savedUser);
      setLoading(false);
    } catch (error) {
      console.error('Auth check error:', error);
      authApi.logout();
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const result = await authApi.login(username, password);
      
      if (result.error) {
        return { success: false, error: result.error };
      }

      if (result.data) {
        authApi.saveToken(result.data.token);
        if (result.data.refreshToken) {
          authApi.saveRefreshToken(result.data.refreshToken);
        }
        authApi.saveUser(result.data.user);
        setUser(result.data.user);
        return { success: true };
      }

      return { success: false, error: 'Нэвтрэх явцад алдаа гарлаа' };
    } catch (error: any) {
      return { success: false, error: error.message || 'Нэвтрэх явцад алдаа гарлаа' };
    }
  };

  const logout = async () => {
    try {
      // Call logout API to clear cookie
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    // Clear localStorage
    authApi.logout();
    setUser(null);
    router.push('/admin/login');
  };

  const hasRole = (role: string): boolean => {
    return user?.role === role;
  };

  const hasAnyRole = (roles: string[]): boolean => {
    return user ? roles.includes(user.role) : false;
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    hasRole,
    hasAnyRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// HOC for protected pages
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles?: string[]
) {
  return function ProtectedRoute(props: P) {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!isAuthenticated) {
          router.push('/admin/login');
        } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
          // User doesn't have required role
          router.push('/admin/dashboard');
        }
      }
    }, [loading, isAuthenticated, user, router]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#06030f]">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Уншиж байна...</p>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#06030f]">
          <div className="text-white text-center">
            <p className="text-xl mb-4">Хандах эрхгүй байна</p>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            >
              Буцах
            </button>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
