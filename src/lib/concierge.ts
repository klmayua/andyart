import type { ConciergeRequest, ViewingSession, CommissionCase, CorporateProject, VipClient, RequestStatus, PriorityLevel } from '@/types/concierge';

const REQUESTS_KEY = 'andyart_concierge_requests';
const VIEWINGS_KEY = 'andyart_concierge_viewings';
const COMMISSIONS_KEY = 'andyart_concierge_commissions';
const CORPORATE_KEY = 'andyart_concierge_corporate';
const VIP_KEY = 'andyart_concierge_vips';

function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// Generic storage
function getStore<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
}
function setStore<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

// REQUESTS
export function getAllRequests(): ConciergeRequest[] { return getStore(REQUESTS_KEY); }
export function saveRequest(req: ConciergeRequest): void {
  const all = getAllRequests();
  const idx = all.findIndex((r) => r.id === req.id);
  if (idx >= 0) all[idx] = req; else all.unshift(req);
  setStore(REQUESTS_KEY, all);
}
export function createRequest(data: Omit<ConciergeRequest, 'id' | 'createdAt' | 'updatedAt'>): ConciergeRequest {
  const now = new Date().toISOString();
  const req: ConciergeRequest = { ...data, id: uid(), createdAt: now, updatedAt: now };
  saveRequest(req);
  return req;
}
export function updateRequestStatus(id: string, status: RequestStatus): void {
  const all = getAllRequests();
  const idx = all.findIndex((r) => r.id === id);
  if (idx >= 0) { all[idx] = { ...all[idx], status, updatedAt: new Date().toISOString() }; setStore(REQUESTS_KEY, all); }
}
export function updateRequestPriority(id: string, priority: PriorityLevel): void {
  const all = getAllRequests();
  const idx = all.findIndex((r) => r.id === id);
  if (idx >= 0) { all[idx] = { ...all[idx], priority, updatedAt: new Date().toISOString() }; setStore(REQUESTS_KEY, all); }
}
export function assignRequest(id: string, owner: string): void {
  const all = getAllRequests();
  const idx = all.findIndex((r) => r.id === id);
  if (idx >= 0) { all[idx] = { ...all[idx], assignedTo: owner, updatedAt: new Date().toISOString() }; setStore(REQUESTS_KEY, all); }
}

// VIEWINGS
export function getAllViewings(): ViewingSession[] { return getStore(VIEWINGS_KEY); }
export function saveViewing(v: ViewingSession): void {
  const all = getAllViewings();
  const idx = all.findIndex((x) => x.id === v.id);
  if (idx >= 0) all[idx] = v; else all.unshift(v);
  setStore(VIEWINGS_KEY, all);
}
export function createViewing(data: Omit<ViewingSession, 'id' | 'createdAt'>): ViewingSession {
  const v: ViewingSession = { ...data, id: uid(), createdAt: new Date().toISOString() };
  saveViewing(v);
  return v;
}
export function updateViewingStatus(id: string, status: ViewingSession['status']): void {
  const all = getAllViewings();
  const idx = all.findIndex((v) => v.id === id);
  if (idx >= 0) { all[idx] = { ...all[idx], status }; setStore(VIEWINGS_KEY, all); }
}

// COMMISSIONS
export function getAllCommissions(): CommissionCase[] { return getStore(COMMISSIONS_KEY); }
export function saveCommission(c: CommissionCase): void {
  const all = getAllCommissions();
  const idx = all.findIndex((x) => x.id === c.id);
  if (idx >= 0) all[idx] = c; else all.unshift(c);
  setStore(COMMISSIONS_KEY, all);
}
export function createCommission(data: Omit<CommissionCase, 'id' | 'createdAt' | 'updatedAt'>): CommissionCase {
  const now = new Date().toISOString();
  const c: CommissionCase = { ...data, id: uid(), createdAt: now, updatedAt: now };
  saveCommission(c);
  return c;
}
export function updateCommissionStatus(id: string, status: CommissionCase['status']): void {
  const all = getAllCommissions();
  const idx = all.findIndex((c) => c.id === id);
  if (idx >= 0) { all[idx] = { ...all[idx], status, updatedAt: new Date().toISOString() }; setStore(COMMISSIONS_KEY, all); }
}
export function updateCommissionProgress(id: string, progress: number): void {
  const all = getAllCommissions();
  const idx = all.findIndex((c) => c.id === id);
  if (idx >= 0) { all[idx] = { ...all[idx], progress, updatedAt: new Date().toISOString() }; setStore(COMMISSIONS_KEY, all); }
}

// CORPORATE
export function getAllCorporate(): CorporateProject[] { return getStore(CORPORATE_KEY); }
export function saveCorporate(p: CorporateProject): void {
  const all = getAllCorporate();
  const idx = all.findIndex((x) => x.id === p.id);
  if (idx >= 0) all[idx] = p; else all.unshift(p);
  setStore(CORPORATE_KEY, all);
}
export function createCorporateProject(data: Omit<CorporateProject, 'id' | 'createdAt'>): CorporateProject {
  const p: CorporateProject = { ...data, id: uid(), createdAt: new Date().toISOString() };
  saveCorporate(p);
  return p;
}
export function updateCorporateStatus(id: string, status: CorporateProject['status']): void {
  const all = getAllCorporate();
  const idx = all.findIndex((p) => p.id === id);
  if (idx >= 0) { all[idx] = { ...all[idx], status }; setStore(CORPORATE_KEY, all); }
}

// VIP
export function getAllVips(): VipClient[] { return getStore(VIP_KEY); }
export function saveVip(v: VipClient): void {
  const all = getAllVips();
  const idx = all.findIndex((x) => x.id === v.id);
  if (idx >= 0) all[idx] = v; else all.unshift(v);
  setStore(VIP_KEY, all);
}

// STATS
export function getRequestCounts() {
  const reqs = getAllRequests();
  return {
    total: reqs.length,
    new: reqs.filter((r) => r.status === 'new').length,
    vip: reqs.filter((r) => r.priority === 'vip' || r.priority === 'executive').length,
    assigned: reqs.filter((r) => r.status === 'assigned').length,
    confirmed: reqs.filter((r) => r.status === 'confirmed').length,
    fulfilled: reqs.filter((r) => r.status === 'fulfilled').length,
    byStatus: Object.fromEntries(['new','qualified','assigned','proposal_sent','negotiating','confirmed','fulfilled','archived'].map((s) => [s, reqs.filter((r) => r.status === s as RequestStatus).length])),
  };
}
export function getBookingCounts() {
  const v = getAllViewings();
  const today = new Date().toDateString();
  return {
    total: v.length,
    today: v.filter((x) => new Date(x.date).toDateString() === today).length,
    scheduled: v.filter((x) => x.status === 'scheduled' || x.status === 'confirmed').length,
    completed: v.filter((x) => x.status === 'completed').length,
  };
}
export function getCommissionCounts() {
  const c = getAllCommissions();
  return {
    total: c.length,
    open: c.filter((x) => !['delivered', 'cancelled'].includes(x.status)).length,
    inProgress: c.filter((x) => x.status === 'in_progress').length,
    delivered: c.filter((x) => x.status === 'delivered').length,
  };
}