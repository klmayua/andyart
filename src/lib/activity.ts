import { getAllLeads, getPipelineCounts } from '@/lib/leadCapture';
import { getAllRequests, getAllViewings, getAllCommissions } from '@/lib/concierge';
import { getPayments, getInvoices, getEscrowCases, getTransactions, getSettlements } from '@/lib/payment';
import { getAllCollectors } from '@/lib/collector';

export type ActivitySeverity = 'info' | 'success' | 'warning' | 'critical';

export interface ActivityEvent {
  id: string;
  timestamp: string;
  source: string;
  system: 'crm' | 'concierge' | 'payments' | 'collector' | 'platform';
  severity: ActivitySeverity;
  title: string;
  description: string;
  entityType: string;
  entityId?: string;
  entityUrl?: string;
  actorName?: string;
  actorId?: string;
  metadata?: Record<string, string>;
}

function uid(): string { return Math.random().toString(36).slice(2) + Date.now().toString(36); }

export function getActivityFeed(limit = 50): ActivityEvent[] {
  const events: ActivityEvent[] = [];

  // CRM events
  try {
    const leads = getAllLeads().slice(0, 20);
    for (const lead of leads) {
      events.push({
        id: uid(), timestamp: lead.createdAt,
        source: 'CRM', system: 'crm', severity: lead.temperature === 'vip_priority' ? 'warning' : 'info',
        title: lead.temperature === 'vip_priority' ? 'VIP Lead Detected' : 'New Lead Captured',
        description: `${lead.profile.fullName} — ${lead.interest.itemTitle || lead.interest.category}`,
        entityType: 'lead', entityId: lead.id, entityUrl: `/ops/crm/leads`,
        actorName: lead.profile.fullName,
        metadata: { score: String(lead.leadScore), temperature: lead.temperature },
      });
    }
  } catch { /* noop */ }

  // Concierge events
  try {
    const reqs = getAllRequests().slice(0, 15);
    for (const req of reqs) {
      events.push({
        id: uid(), timestamp: req.createdAt,
        source: 'Concierge', system: 'concierge',
        severity: req.priority === 'executive' || req.priority === 'vip' ? 'warning' : 'info',
        title: `Concierge Request: ${req.type.replace(/_/g, ' ')}`,
        description: `${req.clientProfile.name} — ${req.subject}`,
        entityType: 'request', entityId: req.id, entityUrl: `/ops/concierge/requests`,
        actorName: req.clientProfile.name,
        metadata: { priority: req.priority, status: req.status },
      });
    }
    const coms = getAllCommissions().slice(0, 10);
    for (const com of coms) {
      events.push({
        id: uid(), timestamp: com.createdAt,
        source: 'Concierge', system: 'concierge', severity: 'info',
        title: 'Commission Started',
        description: `${com.clientName} — ${com.brief.substring(0, 60)}...`,
        entityType: 'commission', entityId: com.id, entityUrl: `/ops/concierge/commissions`,
        actorName: com.clientName,
        metadata: { progress: String(com.progress), status: com.status },
      });
    }
    const views = getAllViewings().slice(0, 10);
    for (const v of views) {
      events.push({
        id: uid(), timestamp: v.createdAt,
        source: 'Concierge', system: 'concierge', severity: 'info',
        title: 'Viewing Booked',
        description: `${v.clientName} — ${v.viewingType.replace(/_/g, ' ')} at ${v.location}`,
        entityType: 'viewing', entityId: v.id, entityUrl: `/ops/concierge/bookings`,
        actorName: v.clientName,
        metadata: { date: v.date, status: v.status },
      });
    }
  } catch { /* noop */ }

  // Payment events
  try {
    const payments = getPayments().slice(0, 15);
    for (const p of payments) {
      if (p.status === 'completed') {
        events.push({
          id: uid(), timestamp: p.completedAt || p.createdAt,
          source: 'Payments', system: 'payments', severity: 'success',
          title: 'Payment Completed',
          description: `${p.collectorName} — $${(p.amount / 1000).toFixed(0)}k ${p.currency}`,
          entityType: 'payment', entityId: p.id, entityUrl: `/ops/payments`,
          actorName: p.collectorName,
          metadata: { amount: String(p.amount), method: p.method },
        });
      }
    }
    const escrow = getEscrowCases().slice(0, 10);
    for (const e of escrow) {
      if (e.status === 'released') {
        events.push({
          id: uid(), timestamp: e.releasedAt || e.updatedAt,
          source: 'Payments', system: 'payments', severity: 'success',
          title: 'Escrow Released',
          description: `${e.artworkTitle} — $${(e.amount / 1000).toFixed(0)}k ${e.currency}`,
          entityType: 'escrow', entityId: e.id, entityUrl: `/ops/payments/escrow`,
          actorName: e.buyerName,
          metadata: { amount: String(e.amount) },
        });
      }
    }
    const invoices = getInvoices({ status: 'paid' }).slice(0, 10);
    for (const inv of invoices) {
      events.push({
        id: uid(), timestamp: inv.paidDate || inv.issuedDate,
        source: 'Payments', system: 'payments', severity: 'success',
        title: 'Invoice Paid',
        description: `${inv.invoiceNumber} — ${inv.collectorName}`,
        entityType: 'invoice', entityId: inv.id, entityUrl: `/ops/payments/invoices`,
        actorName: inv.collectorName,
        metadata: { total: String(inv.total) },
      });
    }
  } catch { /* noop */ }

  // Collector events
  try {
    const collectors = getAllCollectors().slice(0, 10);
    for (const c of collectors) {
      events.push({
        id: uid(), timestamp: c.joinDate,
        source: 'Collector', system: 'collector', severity: 'info',
        title: 'Collector Registered',
        description: `${c.name} — ${c.tier.replace(/_/g, ' ')}`,
        entityType: 'collector', entityId: c.id,
        actorName: c.name,
        metadata: { tier: c.tier, location: c.location },
      });
    }
  } catch { /* noop */ }

  return events
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}

export function getActivityStats() {
  const feed = getActivityFeed(100);
  const today = new Date().toDateString();
  return {
    totalEvents: feed.length,
    todayEvents: feed.filter((e) => new Date(e.timestamp).toDateString() === today).length,
    criticalCount: feed.filter((e) => e.severity === 'critical').length,
    warningCount: feed.filter((e) => e.severity === 'warning').length,
    successCount: feed.filter((e) => e.severity === 'success').length,
    bySystem: feed.reduce((acc, e) => { acc[e.system] = (acc[e.system] || 0) + 1; return acc; }, {} as Record<string, number>),
  };
}