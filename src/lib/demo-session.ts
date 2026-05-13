'use client';

export interface DemoRole {
  role: string;
  name: string;
  title: string;
  avatar?: string;
  initials: string;
  route: string;
  context: string;
  allowedSurfaces: string[];
}

export const DEMO_ROLES: DemoRole[] = [
  {
    role: 'executive_director',
    name: 'Amina Okoye',
    title: 'Executive Director',
    initials: 'AO',
    route: '/enterprise',
    context: 'Executive oversight, institutional performance, operational intelligence',
    allowedSurfaces: ['enterprise', 'executive', 'all'],
  },
  {
    role: 'crm_director',
    name: 'David Mensah',
    title: 'CRM Director',
    initials: 'DM',
    route: '/ops/crm',
    context: 'Collector relationships, lead development, acquisition pipeline',
    allowedSurfaces: ['ops', 'crm', 'collector_management'],
  },
  {
    role: 'concierge_director',
    name: 'Leila Haddad',
    title: 'Concierge Director',
    initials: 'LH',
    route: '/ops/concierge',
    context: 'VIP coordination, collector experiences, private requests',
    allowedSurfaces: ['ops', 'concierge', 'vip_services'],
  },
  {
    role: 'finance_operations',
    name: 'Kwame Adeyemi',
    title: 'Finance Operations',
    initials: 'KA',
    route: '/ops/payments',
    context: 'Escrow oversight, settlements, financial operations',
    allowedSurfaces: ['ops', 'finance', 'payments'],
  },
  {
    role: 'collector',
    name: 'Eleanor Whitmore',
    title: 'Collector',
    initials: 'EW',
    route: '/collector',
    context: 'Private acquisitions, vault access, artwork management',
    allowedSurfaces: ['collector', 'private', 'vault'],
  },
  {
    role: 'artist',
    name: 'Malik Adebayo',
    title: 'Artist',
    initials: 'MA',
    route: '/artists/portal',
    context: 'Consignments, exhibitions, commissions, payouts',
    allowedSurfaces: ['artist', 'portal', 'exhibitions'],
  },
  {
    role: 'gallery_partner',
    name: 'Sofia El-Khoury',
    title: 'Gallery Partner',
    initials: 'SE',
    route: '/partners',
    context: 'Institutional collaboration and exhibition coordination',
    allowedSurfaces: ['partner', 'collaboration', 'institutional'],
  },
];

const STORAGE_KEY = 'aa_demo_session';

export function setDemoSession(role: DemoRole): void {
  if (typeof window === 'undefined') return;
  
  const session = {
    role: role.role,
    name: role.name,
    title: role.title,
    initials: role.initials,
    route: role.route,
    allowedSurfaces: role.allowedSurfaces,
    timestamp: new Date().toISOString(),
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  localStorage.setItem('aa_demo_mode', 'enabled');
}

export function getDemoSession(): DemoSession | null {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored) as DemoSession;
  } catch {
    return null;
  }
}

export function clearDemoSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem('aa_demo_mode');
}

export function hasDemoAccess(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('aa_demo_mode') === 'enabled';
}

export function getDemoRoleFromSession(): DemoRole | null {
  const session = getDemoSession();
  if (!session) return null;
  
  return DEMO_ROLES.find(r => r.role === session.role) || null;
}

interface DemoSession {
  role: string;
  name: string;
  title: string;
  initials: string;
  route: string;
  allowedSurfaces: string[];
  timestamp: string;
}