import type { AuditEvent, Domain } from '@/types/auth';

const AUDIT_KEY = 'andyart_audit_log';
const MAX_EVENTS = 5000;

function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function getAuditLog(): AuditEvent[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(AUDIT_KEY) || '[]'); } catch { return []; }
}

function appendEvent(event: Omit<AuditEvent, 'id' | 'timestamp'>): void {
  if (typeof window === 'undefined') return;
  const log = getAuditLog();
  const entry: AuditEvent = {
    ...event,
    id: uid(),
    timestamp: new Date().toISOString(),
  };
  log.unshift(entry);
  if (log.length > MAX_EVENTS) log.splice(MAX_EVENTS);
  localStorage.setItem(AUDIT_KEY, JSON.stringify(log));
}

export function logAudit(params: {
  userId: string;
  userEmail: string;
  action: string;
  domain: Domain;
  resourceType: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  severity?: 'info' | 'warning' | 'critical';
  ipAddress?: string;
  userAgent?: string;
}): void {
  appendEvent({
    ...params,
    severity: params.severity ?? 'info',
  });
}

export function logLogin(userId: string, userEmail: string, ipAddress?: string): void {
  logAudit({ userId, userEmail, action: 'login', domain: 'admin', resourceType: 'session', ipAddress, severity: 'info' });
}

export function logLogout(userId: string, userEmail: string): void {
  logAudit({ userId, userEmail, action: 'logout', domain: 'admin', resourceType: 'session', severity: 'info' });
}

export function logLeadAssignment(userId: string, userEmail: string, leadId: string, leadName: string, assignee: string): void {
  logAudit({ userId, userEmail, action: 'lead_assigned', domain: 'crm', resourceType: 'lead', resourceId: leadId, metadata: { leadName, assignee }, severity: 'info' });
}

export function logStatusChange(userId: string, userEmail: string, resourceType: string, resourceId: string, oldStatus: string, newStatus: string, domain: Domain): void {
  logAudit({ userId, userEmail, action: 'status_changed', domain, resourceType, resourceId, metadata: { oldStatus, newStatus }, severity: 'info' });
}

export function logCommissionUpdate(userId: string, userEmail: string, commissionId: string, milestone?: string): void {
  logAudit({ userId, userEmail, action: 'commission_updated', domain: 'concierge', resourceType: 'commission', resourceId: commissionId, metadata: milestone ? { milestone } : undefined, severity: 'info' });
}

export function logRatePublication(userId: string, userEmail: string, currencyPair: string, oldRate: number, newRate: number): void {
  logAudit({ userId, userEmail, action: 'rate_published', domain: 'treasury', resourceType: 'rate', metadata: { currencyPair, oldRate, newRate }, severity: 'warning' });
}

export function logRoleChange(userId: string, userEmail: string, targetUserId: string, oldRole: string, newRole: string): void {
  logAudit({ userId, userEmail, action: 'role_changed', domain: 'admin', resourceType: 'user', resourceId: targetUserId, metadata: { oldRole, newRole }, severity: 'critical' });
}

export function logWorkflowFailure(userId: string, userEmail: string, workflowType: string, error: string): void {
  logAudit({ userId, userEmail, action: 'workflow_failed', domain: 'ops', resourceType: 'workflow', metadata: { workflowType, error }, severity: 'critical' });
}

export function logUnauthorizedAccess(userId: string, userEmail: string, attemptedAction: string, domain: Domain): void {
  logAudit({ userId, userEmail, action: 'unauthorized_access_attempt', domain, resourceType: 'permission', metadata: { attemptedAction }, severity: 'warning' });
}

export function getAuditByDomain(domain: Domain, limit = 50): AuditEvent[] {
  return getAuditLog().filter((e) => e.domain === domain).slice(0, limit);
}

export function getAuditByUser(userId: string, limit = 50): AuditEvent[] {
  return getAuditLog().filter((e) => e.userId === userId).slice(0, limit);
}

export function getAuditByResource(resourceType: string, resourceId: string): AuditEvent[] {
  return getAuditLog().filter((e) => e.resourceType === resourceType && e.resourceId === resourceId);
}