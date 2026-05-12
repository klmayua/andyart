'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User } from '@/types/auth';
import { login as apiLogin, logout as apiLogout, getCurrentUser, isAuthenticated } from '@/lib/auth';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  enableDemoMode: () => void;
  disableDemoMode: () => void;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_USER: User = {
  id: 'demo-001',
  email: 'demo@andyart.gallery',
  name: 'Demo User',
  role: 'super_admin',
  permissions: ['all'],
  department: 'Demo',
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    const demoEnabled = typeof window !== 'undefined' && localStorage.getItem('aa_demo_mode') === 'enabled';
    setIsDemoMode(demoEnabled);
    
    if (demoEnabled) {
      setUser(DEMO_USER);
      setIsLoading(false);
    } else {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    }
  }, []);

  const enableDemoMode = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aa_demo_mode', 'enabled');
      setIsDemoMode(true);
      setUser(DEMO_USER);
    }
  }, []);

  const disableDemoMode = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('aa_demo_mode');
      setIsDemoMode(false);
      apiLogout();
      setUser(null);
    }
  }, []);

  const login = useCallback((email: string, password: string) => {
    const result = apiLogin(email, password);
    if (result.success && result.user) {
      setUser(result.user);
      localStorage.removeItem('aa_demo_mode');
      setIsDemoMode(false);
      return { success: true };
    }
    return { success: false, error: result.error };
  }, []);

  const logout = useCallback(() => {
    apiLogout();
    setUser(null);
    localStorage.removeItem('aa_demo_mode');
    setIsDemoMode(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout, enableDemoMode, disableDemoMode, isDemoMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}