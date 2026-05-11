import type { RoleId, Permission, AccessPolicy } from '@/types/auth';

const ROLE_PERMISSIONS: Record<RoleId, Permission[]> = {
  super_admin: [
    'crm:view', 'crm:assign', 'crm:export', 'crm:convert', 'crm:delete', 'crm:manage_leads',
    'concierge:manage_requests', 'concierge:manage_vips', 'concierge:manage_bookings', 'concierge:manage_commissions', 'concierge:manage_corporate', 'concierge:view_all',
    'treasury:publish_rates', 'treasury:manage_liquidity', 'treasury:approve_intervention', 'treasury:view_reports',
    'whatsapp:reply', 'whatsapp:broadcast', 'whatsapp:manage_templates', 'whatsapp:view_conversations',
    'admin:manage_users', 'admin:manage_roles', 'admin:manage_settings', 'admin:view_logs',
    'ops:view_dashboard', 'ops:view_crm', 'ops:view_concierge',
  ],
  executive: [
    'crm:view', 'crm:assign', 'crm:export', 'crm:convert',
    'concierge:manage_requests', 'concierge:manage_vips', 'concierge:manage_bookings', 'concierge:manage_commissions', 'concierge:manage_corporate', 'concierge:view_all',
    'treasury:view_reports',
    'whatsapp:reply', 'whatsapp:broadcast', 'whatsapp:view_conversations',
    'ops:view_dashboard', 'ops:view_crm', 'ops:view_concierge',
  ],
  concierge_director: [
    'crm:view', 'crm:assign', 'crm:export',
    'concierge:manage_requests', 'concierge:manage_vips', 'concierge:manage_bookings', 'concierge:manage_commissions', 'concierge:manage_corporate', 'concierge:view_all',
    'whatsapp:reply', 'whatsapp:broadcast', 'whatsapp:manage_templates',
    'ops:view_dashboard', 'ops:view_crm', 'ops:view_concierge',
  ],
  concierge_operator: [
    'crm:view',
    'concierge:manage_requests', 'concierge:manage_bookings', 'concierge:manage_commissions', 'concierge:view_all',
    'whatsapp:reply',
    'ops:view_dashboard', 'ops:view_concierge',
  ],
  crm_manager: [
    'crm:view', 'crm:assign', 'crm:export', 'crm:convert', 'crm:manage_leads',
    'concierge:view_all',
    'ops:view_dashboard', 'ops:view_crm',
  ],
  treasury_director: [
    'treasury:publish_rates', 'treasury:manage_liquidity', 'treasury:approve_intervention', 'treasury:view_reports',
    'whatsapp:reply', 'whatsapp:broadcast',
    'admin:view_logs',
    'ops:view_dashboard',
  ],
  treasury_operator: [
    'treasury:manage_liquidity', 'treasury:view_reports',
    'whatsapp:reply',
    'ops:view_dashboard',
  ],
  broker_manager: [
    'crm:view', 'crm:assign', 'crm:export',
    'ops:view_dashboard', 'ops:view_crm',
  ],
  broker_agent: [
    'crm:view', 'crm:assign',
    'ops:view_dashboard',
  ],
  compliance: [
    'crm:view', 'crm:export',
    'concierge:view_all',
    'admin:view_logs',
    'ops:view_dashboard', 'ops:view_crm', 'ops:view_concierge',
  ],
  auditor: [
    'crm:view', 'crm:export',
    'concierge:view_all',
    'treasury:view_reports',
    'admin:view_logs',
    'ops:view_dashboard', 'ops:view_crm', 'ops:view_concierge',
  ],
  readonly: [
    'crm:view',
    'concierge:view_all',
    'ops:view_dashboard', 'ops:view_crm', 'ops:view_concierge',
  ],
};

export function getPermissionsForRole(role: RoleId): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

export function hasPermission(role: RoleId, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function hasAnyPermission(role: RoleId, perms: Permission[]): boolean {
  return perms.some((p) => hasPermission(role, p));
}

export function hasAllPermissions(role: RoleId, perms: Permission[]): boolean {
  return perms.every((p) => hasPermission(role, p));
}

export function canAccessDomain(role: RoleId, domain: string): boolean {
  const perms = getPermissionsForRole(role);
  if (domain === 'crm') return perms.some((p) => p.startsWith('crm:'));
  if (domain === 'concierge') return perms.some((p) => p.startsWith('concierge:'));
  if (domain === 'treasury') return perms.some((p) => p.startsWith('treasury:'));
  if (domain === 'whatsapp') return perms.some((p) => p.startsWith('whatsapp:'));
  if (domain === 'admin') return perms.some((p) => p.startsWith('admin:'));
  if (domain === 'ops') return perms.some((p) => p.startsWith('ops:'));
  return false;
}