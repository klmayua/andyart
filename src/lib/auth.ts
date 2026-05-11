import type { User, Session } from '@/types/auth';
import { getPermissionsForRole } from '@/lib/permissions';
import { logLogin, logLogout } from '@/lib/audit';

const USERS_KEY = 'andyart_ops_users';
const SESSION_KEY = 'andyart_ops_session';
const DEMO_PASSWORD_HASH = 'demo_hashed'; // In production, use bcrypt

const DEMO_USERS: User[] = [
  {
    id: 'user-001', email: 'chioma@andyart.gallery', name: 'Chioma A.', role: 'concierge_director',
    permissions: [], phone: '+2348002649278', department: 'Concierge', isActive: true,
    lastLoginAt: new Date(Date.now() - 3600000).toISOString(),
    createdAt: '2024-01-15T08:00:00Z', updatedAt: new Date().toISOString(),
  },
  {
    id: 'user-002', email: 'tunde@andyart.gallery', name: 'Tunde B.', role: 'concierge_director',
    permissions: [], phone: '+2348002649279', department: 'Concierge', isActive: true,
    lastLoginAt: new Date(Date.now() - 7200000).toISOString(),
    createdAt: '2024-02-01T08:00:00Z', updatedAt: new Date().toISOString(),
  },
  {
    id: 'user-003', email: 'admin@andyart.gallery', name: 'Admin User', role: 'super_admin',
    permissions: [], phone: '+2348002649280', department: 'Administration', isActive: true,
    createdAt: '2024-01-01T08:00:00Z', updatedAt: new Date().toISOString(),
  },
  {
    id: 'user-004', email: 'readview@andyart.gallery', name: 'Read Only User', role: 'readonly',
    permissions: [], department: 'Audit', isActive: true,
    createdAt: '2024-03-01T08:00:00Z', updatedAt: new Date().toISOString(),
  },
  {
    id: 'user-005', email: 'compliance@andyart.gallery', name: 'Compliance Officer', role: 'compliance',
    permissions: [], department: 'Compliance', isActive: true,
    createdAt: '2024-02-15T08:00:00Z', updatedAt: new Date().toISOString(),
  },
];

function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function hashPassword(password: string): string {
  // Simple demo hash — production would use bcrypt
  return `hashed_${password}_${Date.now()}`;
}

function verifyPassword(password: string, hash: string): boolean {
  return hash.startsWith('hashed_') || hash === DEMO_PASSWORD_HASH;
}

// Users
function getUsers(): User[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      const withPerms = DEMO_USERS.map((u) => ({ ...u, permissions: getPermissionsForRole(u.role) }));
      localStorage.setItem(USERS_KEY, JSON.stringify(withPerms));
      return withPerms;
    }
    return JSON.parse(raw);
  } catch { return DEMO_USERS.map((u) => ({ ...u, permissions: getPermissionsForRole(u.role) })); }
}

function saveUsers(users: User[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const session = getSession();
  if (!session) return null;
  const users = getUsers();
  return users.find((u) => u.id === session.userId && u.isActive) || null;
}

export function getSession(): Session | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session: Session = JSON.parse(raw);
    if (new Date(session.expiresAt) < new Date()) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch { return null; }
}

export function login(email: string, password: string): { success: boolean; user?: User; error?: string } {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.isActive);
  if (!user) return { success: false, error: 'Invalid credentials' };

  const now = new Date();
  const session: Session = {
    id: uid(),
    userId: user.id,
    token: uid() + uid(),
    expiresAt: new Date(now.getTime() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours
    createdAt: now.toISOString(),
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  const updated = users.map((u) => u.id === user.id ? { ...u, lastLoginAt: now.toISOString(), updatedAt: now.toISOString() } : u);
  saveUsers(updated);

  logLogin(user.id, user.email);
  return { success: true, user: { ...user, permissions: getPermissionsForRole(user.role), lastLoginAt: now.toISOString(), updatedAt: now.toISOString() } };
}

export function logout(): void {
  const user = getCurrentUser();
  if (user) logLogout(user.id, user.email);
  if (typeof window !== 'undefined') localStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}

export function getAllOpsUsers(): User[] {
  return getUsers();
}

export function inviteUser(email: string, name: string, role: User['role']): { success: boolean; user?: User; error?: string } {
  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: 'User already exists' };
  }
  const now = new Date().toISOString();
  const newUser: User = {
    id: uid(), email, name, role,
    permissions: getPermissionsForRole(role),
    isActive: true, createdAt: now, updatedAt: now,
  };
  users.push(newUser);
  saveUsers(users);
  return { success: true, user: newUser };
}

export function updateUserRole(userId: string, role: User['role']): void {
  const users = getUsers();
  const now = new Date().toISOString();
  const updated = users.map((u) => u.id === userId ? { ...u, role, permissions: getPermissionsForRole(role), updatedAt: now } : u);
  saveUsers(updated);
}

export function deactivateUser(userId: string): void {
  const users = getUsers();
  const updated = users.map((u) => u.id === userId ? { ...u, isActive: false, updatedAt: new Date().toISOString() } : u);
  saveUsers(updated);
}