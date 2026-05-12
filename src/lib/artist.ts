import type {
  ArtistProfile, StudioProfile, ArtworkInventory, ConsignmentAgreement,
  ArtistCommission, ExhibitionParticipation, ArtistPayout, ArtistAnalytics,
} from '@/types/artist';

const PROFILE_KEY = 'andyart_artist_profiles';
const STUDIO_KEY = 'andyart_artist_studios';
const INVENTORY_KEY = 'andyart_artist_inventory';
const CONSIGNMENT_KEY = 'andyart_artist_consignments';
const COMMISSION_KEY = 'andyart_artist_commissions';
const EXHIBITION_KEY = 'andyart_artist_exhibitions';
const PAYOUT_KEY = 'andyart_artist_payouts';
const ANALYTICS_KEY = 'andyart_artist_analytics';

function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ─── Artist Profile ──────────────────────────────────────────────────────────

export function getArtistProfile(artistId: string): ArtistProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const profiles: ArtistProfile[] = JSON.parse(raw);
    return profiles.find((p) => p.id === artistId) || null;
  } catch { return null; }
}

export function getArtistByEmail(email: string): ArtistProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const profiles: ArtistProfile[] = JSON.parse(raw);
    return profiles.find((p) => p.email.toLowerCase() === email.toLowerCase()) || null;
  } catch { return null; }
}

export function getAllArtists(): ArtistProfile[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveArtistProfile(profile: ArtistProfile): void {
  if (typeof window === 'undefined') return;
  const profiles = getAllArtists();
  const idx = profiles.findIndex((p) => p.id === profile.id);
  if (idx >= 0) profiles[idx] = profile;
  else profiles.push(profile);
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profiles));
}

export function updateArtistProfile(artistId: string, updates: Partial<ArtistProfile>): ArtistProfile | null {
  const profile = getArtistProfile(artistId);
  if (!profile) return null;
  const updated = { ...profile, ...updates };
  saveArtistProfile(updated);
  return updated;
}

// ─── Studio ──────────────────────────────────────────────────────────────────

export function getStudio(artistId: string): StudioProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STUDIO_KEY);
    if (!raw) return null;
    const studios: StudioProfile[] = JSON.parse(raw);
    return studios.find((s) => s.artistId === artistId) || null;
  } catch { return null; }
}

export function saveStudio(studio: StudioProfile): void {
  if (typeof window === 'undefined') return;
  const all = (() => { try { return JSON.parse(localStorage.getItem(STUDIO_KEY) || '[]'); } catch { return []; } })();
  const idx = all.findIndex((s: StudioProfile) => s.id === studio.id);
  if (idx >= 0) all[idx] = studio; else all.push(studio);
  localStorage.setItem(STUDIO_KEY, JSON.stringify(all));
}

// ─── Inventory ───────────────────────────────────────────────────────────────

export function getInventory(artistId: string): ArtworkInventory[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(INVENTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw).filter((i: ArtworkInventory) => i.artistId === artistId)
      .sort((a: ArtworkInventory, b: ArtworkInventory) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch { return []; }
}

export function getInventoryItem(itemId: string): ArtworkInventory | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(INVENTORY_KEY);
    if (!raw) return null;
    return JSON.parse(raw).find((i: ArtworkInventory) => i.id === itemId) || null;
  } catch { return null; }
}

export function saveInventoryItem(item: ArtworkInventory): void {
  if (typeof window === 'undefined') return;
  const all = (() => { try { return JSON.parse(localStorage.getItem(INVENTORY_KEY) || '[]'); } catch { return []; } })();
  const idx = all.findIndex((i: ArtworkInventory) => i.id === item.id);
  if (idx >= 0) all[idx] = item; else all.push(item);
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(all));
}

export function getInventoryStats(artistId: string) {
  const items = getInventory(artistId);
  const available = items.filter((i) => i.status === 'artist_owned' || i.status === 'gallery_consigned');
  const sold = items.filter((i) => i.status === 'sold');
  const reserved = items.filter((i) => i.status === 'reserved');
  const totalRevenue = sold.reduce((s, i) => s + (i.soldPrice || i.price), 0);
  return {
    total: items.length,
    available: available.length,
    sold: sold.length,
    reserved: reserved.length,
    onLoan: items.filter((i) => i.status === 'on_loan').length,
    inTransit: items.filter((i) => i.status === 'in_transit').length,
    totalValue: available.reduce((s, i) => s + i.price, 0),
    totalRevenue,
    averagePrice: items.length > 0 ? Math.round(items.reduce((s, i) => s + i.price, 0) / items.length) : 0,
  };
}

// ─── Consignments ────────────────────────────────────────────────────────────

export function getConsignments(artistId: string): ConsignmentAgreement[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CONSIGNMENT_KEY);
    if (!raw) return [];
    return JSON.parse(raw).filter((c: ConsignmentAgreement) => c.artistId === artistId)
      .sort((a: ConsignmentAgreement, b: ConsignmentAgreement) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch { return []; }
}

export function getAllConsignments(): ConsignmentAgreement[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CONSIGNMENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveConsignment(c: ConsignmentAgreement): void {
  if (typeof window === 'undefined') return;
  const all = (() => { try { return JSON.parse(localStorage.getItem(CONSIGNMENT_KEY) || '[]'); } catch { return []; } })();
  const idx = all.findIndex((x: ConsignmentAgreement) => x.id === c.id);
  if (idx >= 0) all[idx] = c; else all.push(c);
  localStorage.setItem(CONSIGNMENT_KEY, JSON.stringify(all));
}

// ─── Commissions ─────────────────────────────────────────────────────────────

export function getCommissions(artistId: string): ArtistCommission[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(COMMISSION_KEY);
    if (!raw) return [];
    return JSON.parse(raw).filter((c: ArtistCommission) => c.artistId === artistId)
      .sort((a: ArtistCommission, b: ArtistCommission) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch { return []; }
}

export function getAllCommissions(): ArtistCommission[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(COMMISSION_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveCommission(c: ArtistCommission): void {
  if (typeof window === 'undefined') return;
  const all = (() => { try { return JSON.parse(localStorage.getItem(COMMISSION_KEY) || '[]'); } catch { return []; } })();
  const idx = all.findIndex((x: ArtistCommission) => x.id === c.id);
  if (idx >= 0) all[idx] = c; else all.push(c);
  localStorage.setItem(COMMISSION_KEY, JSON.stringify(all));
}

// ─── Exhibitions ───────────────────────────────────────────────────────────────

export function getExhibitions(artistId: string): ExhibitionParticipation[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(EXHIBITION_KEY);
    if (!raw) return [];
    return JSON.parse(raw).filter((e: ExhibitionParticipation) => e.artistId === artistId)
      .sort((a: ExhibitionParticipation, b: ExhibitionParticipation) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  } catch { return []; }
}

export function getAllExhibitions(): ExhibitionParticipation[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(EXHIBITION_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveExhibition(e: ExhibitionParticipation): void {
  if (typeof window === 'undefined') return;
  const all = (() => { try { return JSON.parse(localStorage.getItem(EXHIBITION_KEY) || '[]'); } catch { return []; } })();
  const idx = all.findIndex((x: ExhibitionParticipation) => x.id === e.id);
  if (idx >= 0) all[idx] = e; else all.push(e);
  localStorage.setItem(EXHIBITION_KEY, JSON.stringify(all));
}

// ─── Payouts ───────────────────────────────────────────────────────────────────

export function getPayouts(artistId: string): ArtistPayout[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(PAYOUT_KEY);
    if (!raw) return [];
    return JSON.parse(raw).filter((p: ArtistPayout) => p.artistId === artistId)
      .sort((a: ArtistPayout, b: ArtistPayout) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch { return []; }
}

export function getAllPayouts(): ArtistPayout[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(PAYOUT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function savePayout(p: ArtistPayout): void {
  if (typeof window === 'undefined') return;
  const all = (() => { try { return JSON.parse(localStorage.getItem(PAYOUT_KEY) || '[]'); } catch { return []; } })();
  const idx = all.findIndex((x: ArtistPayout) => x.id === p.id);
  if (idx >= 0) all[idx] = p; else all.push(p);
  localStorage.setItem(PAYOUT_KEY, JSON.stringify(all));
}

export function getPayoutStats(artistId: string) {
  const payouts = getPayouts(artistId);
  const pending = payouts.filter((p) => p.status === 'pending');
  const completed = payouts.filter((p) => p.status === 'completed');
  return {
    totalPayouts: payouts.length,
    pendingAmount: pending.reduce((s, p) => s + p.netAmount, 0),
    completedAmount: completed.reduce((s, p) => s + p.netAmount, 0),
    totalGross: payouts.reduce((s, p) => s + p.grossAmount, 0),
    totalFees: payouts.reduce((s, p) => s + p.galleryFee + p.platformFee, 0),
  };
}

// ─── Analytics ─────────────────────────────────────────────────────────────────

export function getAnalytics(artistId: string): ArtistAnalytics | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    if (!raw) return null;
    const all: ArtistAnalytics[] = JSON.parse(raw);
    return all.find((a) => a.artistId === artistId) || null;
  } catch { return null; }
}

export function saveAnalytics(a: ArtistAnalytics): void {
  if (typeof window === 'undefined') return;
  const all = (() => { try { return JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]'); } catch { return []; } })();
  const idx = all.findIndex((x: ArtistAnalytics) => x.artistId === x.artistId && x.period === a.period);
  if (idx >= 0) all[idx] = a; else all.push(a);
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(all));
}

// ─── Stats ─────────────────────────────────────────────────────────────────────

export function getArtistStats(artistId: string) {
  const profile = getArtistProfile(artistId);
  const inv = getInventoryStats(artistId);
  const payouts = getPayoutStats(artistId);
  const commissions = getCommissions(artistId);
  const exhibitions = getExhibitions(artistId);
  const activeExhibitions = exhibitions.filter((e) => e.status === 'active');
  const upcomingExhibitions = exhibitions.filter((e) => e.status === 'upcoming');
  return {
    totalWorks: inv.total,
    availableWorks: inv.available,
    soldWorks: inv.sold,
    totalRevenue: inv.totalRevenue,
    pendingPayouts: payouts.pendingAmount,
    completedPayouts: payouts.completedAmount,
    activeCommissions: commissions.filter((c) => c.status === 'in_progress' || c.status === 'milestone_1' || c.status === 'milestone_2' || c.status === 'milestone_3').length,
    completedCommissions: commissions.filter((c) => c.status === 'delivered' || c.status === 'approved').length,
    activeExhibitions: activeExhibitions.length,
    upcomingExhibitions: upcomingExhibitions.length,
    totalExhibitionSales: exhibitions.reduce((s, e) => s + e.totalSales, 0),
    collectorCount: profile?.collectorCount || 0,
    averageWorkPrice: inv.averagePrice,
  };
}

// ─── Seed ──────────────────────────────────────────────────────────────────────

export function seedArtistProfiles(profiles: ArtistProfile[]): void {
  if (typeof window === 'undefined') return;
  const existing = getAllArtists();
  if (existing.length >= profiles.length) return;
  const merged = [...existing];
  for (const p of profiles) {
    if (!merged.find((x) => x.id === p.id)) merged.push(p);
  }
  localStorage.setItem(PROFILE_KEY, JSON.stringify(merged));
}

export function seedStudios(studios: StudioProfile[]): void {
  if (typeof window === 'undefined') return;
  const existing = (() => { try { return JSON.parse(localStorage.getItem(STUDIO_KEY) || '[]'); } catch { return []; } })() as StudioProfile[];
  const merged = [...existing];
  for (const s of studios) {
    if (!merged.find((x) => x.id === s.id)) merged.push(s);
  }
  localStorage.setItem(STUDIO_KEY, JSON.stringify(merged));
}

export function seedInventory(items: ArtworkInventory[]): void {
  if (typeof window === 'undefined') return;
  const existing = (() => { try { return JSON.parse(localStorage.getItem(INVENTORY_KEY) || '[]'); } catch { return []; } })() as ArtworkInventory[];
  const merged = [...existing];
  for (const i of items) {
    if (!merged.find((x) => x.id === i.id)) merged.push(i);
  }
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(merged));
}

export function seedConsignments(items: ConsignmentAgreement[]): void {
  if (typeof window === 'undefined') return;
  const existing = (() => { try { return JSON.parse(localStorage.getItem(CONSIGNMENT_KEY) || '[]'); } catch { return []; } })() as ConsignmentAgreement[];
  const merged = [...existing];
  for (const i of items) {
    if (!merged.find((x) => x.id === i.id)) merged.push(i);
  }
  localStorage.setItem(CONSIGNMENT_KEY, JSON.stringify(merged));
}

export function seedCommissions(items: ArtistCommission[]): void {
  if (typeof window === 'undefined') return;
  const existing = (() => { try { return JSON.parse(localStorage.getItem(COMMISSION_KEY) || '[]'); } catch { return []; } })() as ArtistCommission[];
  const merged = [...existing];
  for (const i of items) {
    if (!merged.find((x) => x.id === i.id)) merged.push(i);
  }
  localStorage.setItem(COMMISSION_KEY, JSON.stringify(merged));
}

export function seedExhibitions(items: ExhibitionParticipation[]): void {
  if (typeof window === 'undefined') return;
  const existing = (() => { try { return JSON.parse(localStorage.getItem(EXHIBITION_KEY) || '[]'); } catch { return []; } })() as ExhibitionParticipation[];
  const merged = [...existing];
  for (const i of items) {
    if (!merged.find((x) => x.id === i.id)) merged.push(i);
  }
  localStorage.setItem(EXHIBITION_KEY, JSON.stringify(merged));
}

export function seedPayouts(items: ArtistPayout[]): void {
  if (typeof window === 'undefined') return;
  const existing = (() => { try { return JSON.parse(localStorage.getItem(PAYOUT_KEY) || '[]'); } catch { return []; } })() as ArtistPayout[];
  const merged = [...existing];
  for (const i of items) {
    if (!merged.find((x) => x.id === i.id)) merged.push(i);
  }
  localStorage.setItem(PAYOUT_KEY, JSON.stringify(merged));
}

export function seedAnalytics(items: ArtistAnalytics[]): void {
  if (typeof window === 'undefined') return;
  const existing = (() => { try { return JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]'); } catch { return []; } })() as ArtistAnalytics[];
  const merged = [...existing];
  for (const i of items) {
    const idx = merged.findIndex((x) => x.artistId === i.artistId && x.period === i.period);
    if (idx >= 0) merged[idx] = i; else merged.push(i);
  }
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(merged));
}
