'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User, RoleId } from '@/types/auth';
import { login as apiLogin, logout as apiLogout, getCurrentUser } from '@/lib/auth';
import { 
  loginDemoUser, 
  logoutDemoUser, 
  getDemoUser, 
  isDemoAuthenticated,
  getDemoAccounts,
  type DemoSession 
} from '@/lib/demo-auth';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  enableDemoMode: (email: string, password: string) => { success: boolean; error?: string };
  isDemoMode: boolean;
  demoSession: DemoSession | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function sessionToUser(session: DemoSession): User {
  return {
    id: session.id,
    email: session.email,
    name: session.name,
    role: session.role as RoleId,
    permissions: session.permissions,
    department: session.title,
    isActive: true,
    createdAt: session.loggedInAt,
    updatedAt: new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoSession, setDemoSession] = useState<DemoSession | null>(null);

  useEffect(() => {
    const demoActive = isDemoAuthenticated();
    setIsDemoMode(demoActive);
    
    if (demoActive) {
      const session = getDemoUser();
      if (session) {
        setDemoSession(session);
        setUser(sessionToUser(session));
      }
      setIsLoading(false);
    } else {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    }
  }, []);

  const enableDemoMode = useCallback((email: string, password: string) => {
    const result = loginDemoUser(email, password);
    if (result.success && result.session) {
      setIsDemoMode(true);
      setDemoSession(result.session);
      setUser(sessionToUser(result.session));
      return { success: true };
    }
    return { success: false, error: result.error || 'Login failed' };
  }, []);

  const disableDemoMode = useCallback(() => {
    logoutDemoUser();
    setIsDemoMode(false);
    setDemoSession(null);
    setUser(null);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const demoResult = loginDemoUser(email, password);
    if (demoResult.success && demoResult.session) {
      setIsDemoMode(true);
      setDemoSession(demoResult.session);
      setUser(sessionToUser(demoResult.session));
      return { success: true };
    }

    const result = apiLogin(email, password);
    if (result.success && result.user) {
      setUser(result.user);
      logoutDemoUser();
      setIsDemoMode(false);
      setDemoSession(null);
      return { success: true };
    }
    return { success: false, error: result.error };
  }, []);

  const logout = useCallback(() => {
    apiLogout();
    logoutDemoUser();
    setUser(null);
    setIsDemoMode(false);
    setDemoSession(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout, enableDemoMode, isDemoMode, demoSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export { getDemoAccounts };