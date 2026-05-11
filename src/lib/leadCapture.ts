import { v4 as uuidv4 } from 'uuid';
import type { Lead, LeadCapturePayload, LeadStatus } from '@/types/crm';
import { calculateLeadScore, classifyTemperature } from './leadScoring';

const STORAGE_KEY = 'andyart_leads';

function getStoredLeads(): Lead[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function storeLeads(leads: Lead[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

export function findLeadByEmail(email: string): Lead | undefined {
  const leads = getStoredLeads();
  return leads.find((l) => l.profile.email.toLowerCase() === email.toLowerCase());
}

export function captureLead(payload: LeadCapturePayload): Lead {
  const now = new Date().toISOString();
  const existing = findLeadByEmail(payload.profile.email || '');

  if (existing) {
    // Update existing lead
    const engagementCount = existing.engagementCount + 1;
    const score = calculateLeadScore(payload, engagementCount);
    const updated: Lead = {
      ...existing,
      updatedAt: now,
      profile: {
        ...existing.profile,
        ...payload.profile,
      },
      segment: payload.segment || existing.segment,
      interest: payload.interest,
      budgetBand: payload.budgetBand || existing.budgetBand,
      urgency: payload.urgency || existing.urgency,
      notes: payload.notes ? `${existing.notes || ''}\n---\n${payload.notes}`.trim() : existing.notes,
      leadScore: score,
      temperature: classifyTemperature(score),
      engagementCount,
      lastEngagementAt: now,
    };

    const leads = getStoredLeads().map((l) => (l.id === existing.id ? updated : l));
    storeLeads(leads);
    return updated;
  }

  // Create new lead
  const score = calculateLeadScore(payload, 1);
  const lead: Lead = {
    id: uuidv4(),
    createdAt: now,
    updatedAt: now,
    profile: {
      fullName: payload.profile.fullName || '',
      email: payload.profile.email || '',
      phone: payload.profile.phone || '',
      whatsapp: payload.profile.whatsapp,
      country: payload.profile.country || 'Nigeria',
      city: payload.profile.city,
    },
    segment: payload.segment || 'art_enthusiast',
    interest: payload.interest,
    budgetBand: payload.budgetBand || 'undisclosed',
    urgency: payload.urgency || 'exploring',
    notes: payload.notes,
    leadScore: score,
    temperature: classifyTemperature(score),
    source: payload.source,
    status: 'new',
    engagementCount: 1,
    lastEngagementAt: now,
  };

  const leads = getStoredLeads();
  leads.push(lead);
  storeLeads(leads);
  return lead;
}

export function getAllLeads(): Lead[] {
  return getStoredLeads();
}

export function updateLeadStatus(leadId: string, status: LeadStatus): Lead | undefined {
  const leads = getStoredLeads();
  const idx = leads.findIndex((l) => l.id === leadId);
  if (idx === -1) return undefined;

  leads[idx] = { ...leads[idx], status, updatedAt: new Date().toISOString() };
  storeLeads(leads);
  return leads[idx];
}

export function getLeadsByTemperature(): Record<string, Lead[]> {
  const leads = getStoredLeads();
  return {
    vip_priority: leads.filter((l) => l.temperature === 'vip_priority'),
    hot: leads.filter((l) => l.temperature === 'hot'),
    warm: leads.filter((l) => l.temperature === 'warm'),
    cold: leads.filter((l) => l.temperature === 'cold'),
  };
}

export function getPipelineCounts(): Record<LeadStatus, number> {
  const leads = getStoredLeads();
  return {
    new: leads.filter((l) => l.status === 'new').length,
    qualified: leads.filter((l) => l.status === 'qualified').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    negotiation: leads.filter((l) => l.status === 'negotiation').length,
    converted: leads.filter((l) => l.status === 'converted').length,
    archived: leads.filter((l) => l.status === 'archived').length,
  };
}

export function clearAllLeads(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
