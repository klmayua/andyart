export type RoleId =
  | 'super_admin'
  | 'executive'
  | 'treasury_director'
  | 'treasury_operator'
  | 'broker_manager'
  | 'broker_agent'
  | 'concierge_director'
  | 'concierge_operator'
  | 'crm_manager'
  | 'compliance'
  | 'auditor'
  | 'readonly';

export type Permission =
  // CRM
  | 'crm:view'
  | 'crm:assign'
  | 'crm:export'
  | 'crm:convert'
  | 'crm:delete'
  | 'crm:manage_leads'
  // Concierge
  | 'concierge:manage_requests'
  | 'concierge:manage_vips'
  | 'concierge:manage_bookings'
  | 'concierge:manage_commissions'
  | 'concierge:manage_corporate'
  | 'concierge:view_all'
  // Treasury
  | 'treasury:publish_rates'
  | 'treasury:manage_liquidity'
  | 'treasury:approve_intervention'
  | 'treasury:view_reports'
  // WhatsApp
  | 'whatsapp:reply'
  | 'whatsapp:broadcast'
  | 'whatsapp:manage_templates'
  | 'whatsapp:view_conversations'
  // Admin
  | 'admin:manage_users'
  | 'admin:manage_roles'
  | 'admin:manage_settings'
  | 'admin:view_logs'
  // Ops
  | 'ops:view_dashboard'
  | 'ops:view_crm'
  | 'ops:view_concierge';

export type Domain = 'crm' | 'concierge' | 'treasury' | 'whatsapp' | 'admin' | 'ops';

export interface User {
  id: string;
  email: string;
  name: string;
  role: RoleId;
  permissions: Permission[];
  avatar?: string;
  phone?: string;
  department?: string;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  ipAddress?: string;
  userAgent?: string;
  expiresAt: string;
  createdAt: string;
}

export interface AuditEvent {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  domain: Domain;
  resourceType: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface AccessPolicy {
  role: RoleId;
  domain: Domain;
  permissions: Permission[];
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}

export type NotificationType =
  | 'vip_lead_created'
  | 'commission_confirmed'
  | 'workflow_failed'
  | 'treasury_alert'
  | 'compliance_issue'
  | 'operator_assignment'
  | 'request_urgent'
  | 'booking_confirmed'
  | 'system_alert';

export const ROLE_LABELS: Record<RoleId, string> = {
  super_admin: 'Super Admin',
  executive: 'Executive',
  treasury_director: 'Treasury Director',
  treasury_operator: 'Treasury Operator',
  broker_manager: 'Broker Manager',
  broker_agent: 'Broker Agent',
  concierge_director: 'Concierge Director',
  concierge_operator: 'Concierge Operator',
  crm_manager: 'CRM Manager',
  compliance: 'Compliance',
  auditor: 'Auditor',
  readonly: 'Read Only',
};

export const ROLE_DEPARTMENTS: Record<RoleId, string> = {
  super_admin: 'Administration',
  executive: 'Executive',
  treasury_director: 'Treasury',
  treasury_operator: 'Treasury',
  broker_manager: 'Brokerage',
  broker_agent: 'Brokerage',
  concierge_director: 'Concierge',
  concierge_operator: 'Concierge',
  crm_manager: 'CRM',
  compliance: 'Compliance',
  auditor: 'Audit',
  readonly: 'Read Only',
};

export const ROLE_COLORS: Record<RoleId, string> = {
  super_admin: 'bg-red-100 text-red-700',
  executive: 'bg-andy-black text-andy-gold',
  treasury_director: 'bg-purple-100 text-purple-700',
  treasury_operator: 'bg-purple-50 text-purple-600',
  broker_manager: 'bg-blue-100 text-blue-700',
  broker_agent: 'bg-blue-50 text-blue-600',
  concierge_director: 'bg-andy-gold/15 text-andy-gold',
  concierge_operator: 'bg-orange-50 text-orange-600',
  crm_manager: 'bg-green-100 text-green-700',
  compliance: 'bg-cyan-100 text-cyan-700',
  auditor: 'bg-gray-100 text-gray-600',
  readonly: 'bg-gray-50 text-gray-500',
};