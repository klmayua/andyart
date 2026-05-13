'use client';

import type { RoleId, Permission } from '@/types/auth';
import { DemoAccount, findDemoAccount, getDemoAccountById, DEMO_ACCOUNTS } from '@/data/demoAccounts';

const SESSION_KEY = 'andyart-demo-session';

export interface DemoSession {
  id: string;
  role: RoleId;
  name: string;
  email: string;
  title: string;
  initials: string;
  defaultRoute: string;
  allowedRoutes: string[];
  permissions: Permission[];
  loggedInAt: string;
}

export function loginDemoUser(email: string, password: string): { success: boolean; error?: string; session?: DemoSession } {
  const account = findDemoAccount(email, password);
  
  if (!account) {
    return { success: false, error: 'Invalid credentials. Please try again.' };
  }

  const session: DemoSession = {
    id: account.id,
    role: account.role as RoleId,
    name: account.name,
    email: account.email,
    title: account.title,
    initials: account.initials,
    defaultRoute: account.defaultRoute,
    allowedRoutes: account.allowedRoutes,
    permissions: [],
    loggedInAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    localStorage.setItem('aa_demo_mode', 'enabled');
  }

  return { success: true, session };
}

export function loginWithDemoAccount(account: DemoAccount): { success: boolean; session?: DemoSession } {
  const session: DemoSession = {
    id: account.id,
    role: account.role as RoleId,
    name: account.name,
    email: account.email,
    title: account.title,
    initials: account.initials,
    defaultRoute: account.defaultRoute,
    allowedRoutes: account.allowedRoutes,
    permissions: [],
    loggedInAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    localStorage.setItem('aa_demo_mode', 'enabled');
  }

  return { success: true, session };
}

export function logoutDemoUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('aa_demo_mode');
  }
}

export function getDemoUser(): DemoSession | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as DemoSession;
  } catch {
    return null;
  }
}

export function isDemoAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('aa_demo_mode') === 'enabled' && getDemoUser() !== null;
}

export function hasRoleAccess(route: string): boolean {
  const session = getDemoUser();
  if (!session) return false;
  
  if (session.role === 'executive_director' || session.role === 'super_admin') {
    return true;
  }
  
  return session.allowedRoutes.some((r) => route.startsWith(r));
}

export function getDemoAccounts() {
  return DEMO_ACCOUNTS;
}