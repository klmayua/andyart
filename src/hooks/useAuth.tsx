'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User } from '@/types/auth';
import { login as apiLogin, logout as apiLogout, getCurrentUser } from '@/lib/auth';
import { getDemoSession, clearDemoSession, hasDemoAccess, DEMO_ROLES, type DemoRole } from '@/lib/demo-session';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  enableDemoMode: (role: DemoRole) => void;
  disableDemoMode: () => void;
  isDemoMode: boolean;
  demoRole: DemoRole | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function sessionToUser(session: ReturnType<typeof getDemoSession>): User {
  const demoRole = DEMO_ROLES.find(r => r.role === session?.role);
  return {
    id: session?.role || 'demo-001',
    email: `demo.${session?.role}@andyart.gallery`,
    name: session?.name || 'Demo User',
    role: session?.role || 'super_admin',
    permissions: demoRole?.allowedSurfaces || ['all'],
    department: session?.title || 'Demo',
    isActive: true,
    createdAt: session?.timestamp || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoRole, setDemoRole] = useState<DemoRole | null>(null);

  useEffect(() => {
    const demoActive = hasDemoAccess();
    setIsDemoMode(demoActive);
    
    if (demoActive) {
      const session = getDemoSession();
      if (session) {
        const role = DEMO_ROLES.find(r => r.role === session.role);
        setDemoRole(role || null);
        setUser(sessionToUser(session));
      }
      setIsLoading(false);
    } else {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    }
  }, []);

  const enableDemoMode = useCallback((role: DemoRole) => {
    if (typeof window !== 'undefined') {
      const session = getDemoSession();
      setIsDemoMode(true);
      setDemoRole(role);
      setUser(sessionToUser(session));
    }
  }, []);

  const disableDemoMode = useCallback(() => {
    clearDemoSession();
    setIsDemoMode(false);
    setDemoRole(null);
    setUser(null);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const result = apiLogin(email, password);
    if (result.success && result.user) {
      setUser(result.user);
      clearDemoSession();
      setIsDemoMode(false);
      setDemoRole(null);
      return { success: true };
    }
    return { success: false, error: result.error };
  }, []);

  const logout = useCallback(() => {
    apiLogout();
    setUser(null);
    clearDemoSession();
    setIsDemoMode(false);
    setDemoRole(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout, enableDemoMode, disableDemoMode, isDemoMode, demoRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}