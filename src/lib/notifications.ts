import type { Notification, NotificationType } from '@/types/auth';

const NOTIFS_KEY = 'andyart_notifications';

function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function getNotifs(): Notification[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(NOTIFS_KEY) || '[]'); } catch { return []; }
}
function setNotifs(n: Notification[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(NOTIFS_KEY, JSON.stringify(n.slice(0, 200)));
}

export function addNotification(params: Omit<Notification, 'id' | 'createdAt' | 'read'>): Notification {
  const notif: Notification = { ...params, id: uid(), createdAt: new Date().toISOString(), read: false };
  const all = getNotifs();
  all.unshift(notif);
  setNotifs(all);
  return notif;
}

export function markRead(id: string): void {
  const all = getNotifs();
  const idx = all.findIndex((n) => n.id === id);
  if (idx >= 0) { all[idx] = { ...all[idx], read: true }; setNotifs(all); }
}

export function markAllRead(userId: string): void {
  const all = getNotifs();
  const updated = all.map((n) => n.userId === userId ? { ...n, read: true } : n);
  setNotifs(updated);
}

export function getNotifications(userId: string): Notification[] {
  return getNotifs().filter((n) => n.userId === userId);
}

export function getUnreadCount(userId: string): number {
  return getNotifs().filter((n) => n.userId === userId && !n.read).length;
}

export function notifyVipLead(userId: string, leadName: string, leadId: string): void {
  addNotification({
    userId, type: 'vip_lead_created',
    title: 'VIP Lead Created',
    message: `${leadName} has been identified as a VIP priority lead. Immediate attention recommended.`,
    actionUrl: '/ops/crm/leads',
    metadata: { leadId, leadName },
  });
}

export function notifyCommissionConfirmed(userId: string, clientName: string, commissionId: string): void {
  addNotification({
    userId, type: 'commission_confirmed',
    title: 'Commission Confirmed',
    message: `${clientName} has confirmed a commission. Ready for artist matching.`,
    actionUrl: '/ops/concierge/commissions',
    metadata: { commissionId, clientName },
  });
}

export function notifyUrgentRequest(userId: string, subject: string, requestId: string): void {
  addNotification({
    userId, type: 'request_urgent',
    title: 'Urgent Request',
    message: subject,
    actionUrl: '/ops/concierge/requests',
    metadata: { requestId },
    severity: 'warning',
  });
}

export function notifyWorkflowFailure(userId: string, workflow: string, error: string): void {
  addNotification({
    userId, type: 'workflow_failed',
    title: 'Workflow Failed',
    message: `${workflow}: ${error}`,
    actionUrl: '/ops/crm',
    metadata: { workflow, error },
  });
}