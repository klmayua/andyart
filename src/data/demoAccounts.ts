export interface DemoAccount {
  id: string;
  role: string;
  name: string;
  email: string;
  password: string;
  title: string;
  initials: string;
  defaultRoute: string;
  allowedRoutes: string[];
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: 'demo-001',
    role: 'executive_director',
    name: 'Amina Okoye',
    email: 'amina@andyart.house',
    password: 'Executive2026',
    title: 'Executive Director',
    initials: 'AO',
    defaultRoute: '/enterprise',
    allowedRoutes: ['/enterprise', '/ops', '/ops/executive', '/system-access'],
  },
  {
    id: 'demo-002',
    role: 'crm_director',
    name: 'David Mensah',
    email: 'crm@andyart.house',
    password: 'Collector2026',
    title: 'CRM Director',
    initials: 'DM',
    defaultRoute: '/ops/crm',
    allowedRoutes: ['/ops/crm', '/ops/crm/leads', '/ops/crm/pipeline', '/ops/crm/subscribers', '/ops/crm/insights'],
  },
  {
    id: 'demo-003',
    role: 'concierge_director',
    name: 'Leila Haddad',
    email: 'concierge@andyart.house',
    password: 'Concierge2026',
    title: 'Concierge Director',
    initials: 'LH',
    defaultRoute: '/ops/concierge',
    allowedRoutes: ['/ops/concierge', '/ops/concierge/requests', '/ops/concierge/bookings', '/ops/concierge/commissions', '/ops/concierge/corporate', '/ops/concierge/vip'],
  },
  {
    id: 'demo-004',
    role: 'finance_operations',
    name: 'Kwame Adeyemi',
    email: 'finance@andyart.house',
    password: 'Finance2026',
    title: 'Finance Operations',
    initials: 'KA',
    defaultRoute: '/ops/payments',
    allowedRoutes: ['/ops/payments', '/ops/payments/invoices', '/ops/payments/escrow', '/ops/payments/settlements'],
  },
  {
    id: 'demo-005',
    role: 'collector',
    name: 'Eleanor Whitmore',
    email: 'collector@andyart.house',
    password: 'CollectorVault2026',
    title: 'Collector',
    initials: 'EW',
    defaultRoute: '/collector',
    allowedRoutes: ['/collector', '/collector/profile', '/collector/collection', '/collector/acquisitions', '/collector/certificates', '/collector/viewings', '/collector/wishlist', '/collector/vault', '/collector/payments', '/collector/invoices', '/collector/transactions'],
  },
  {
    id: 'demo-006',
    role: 'artist',
    name: 'Malik Adebayo',
    email: 'artist@andyart.house',
    password: 'ArtistStudio2026',
    title: 'Artist',
    initials: 'MA',
    defaultRoute: '/artists/portal',
    allowedRoutes: ['/artists/portal', '/artists/profile', '/artists/inventory', '/artists/consignments', '/artists/commissions', '/artists/exhibitions', '/artists/payouts', '/artists/analytics'],
  },
  {
    id: 'demo-007',
    role: 'gallery_partner',
    name: 'Sofia El-Khoury',
    email: 'partner@andyart.house',
    password: 'Gallery2026',
    title: 'Gallery Partner',
    initials: 'SE',
    defaultRoute: '/partners',
    allowedRoutes: ['/partners', '/partners/apply'],
  },
];

export function findDemoAccount(email: string, password: string): DemoAccount | null {
  return DEMO_ACCOUNTS.find(
    (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
  ) || null;
}

export function getDemoAccountById(id: string): DemoAccount | null {
  return DEMO_ACCOUNTS.find((a) => a.id === id) || null;
}