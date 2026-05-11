import type {
  CollectorProfile, CollectorCollection, AcquisitionRecord,
  CertificateOfAuthenticity, ViewingHistory, WishlistItem,
  CollectorVault, VaultDocument, CollectorTier, CollectionStatus,
  InsuranceStatus, ViewingType, DocumentType,
} from '@/types/collector';

const PROFILES_KEY = 'andyart_collector_profiles';
const COLLECTIONS_KEY = 'andyart_collector_collections';
const ACQUISITIONS_KEY = 'andyart_collector_acquisitions';
const CERTIFICATES_KEY = 'andyart_collector_certificates';
const VIEWINGS_KEY = 'andyart_collector_viewings';
const WISHLISTS_KEY = 'andyart_collector_wishlists';
const VAULT_KEY = 'andyart_collector_vaults';

function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function genCertId(): string {
  return `AA-CO-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function genVerifyCode(): string {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

// ─── Collector Profile ───────────────────────────────────────────────────────

export function getCollectorProfile(collectorId: string): CollectorProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    if (!raw) return null;
    const profiles: CollectorProfile[] = JSON.parse(raw);
    return profiles.find((p) => p.id === collectorId) || null;
  } catch { return null; }
}

export function getCollectorByEmail(email: string): CollectorProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    if (!raw) return null;
    const profiles: CollectorProfile[] = JSON.parse(raw);
    return profiles.find((p) => p.email.toLowerCase() === email.toLowerCase()) || null;
  } catch { return null; }
}

export function getAllCollectors(): CollectorProfile[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveCollectorProfile(profile: CollectorProfile): void {
  if (typeof window === 'undefined') return;
  const profiles = getAllCollectors();
  const idx = profiles.findIndex((p) => p.id === profile.id);
  if (idx >= 0) profiles[idx] = profile;
  else profiles.push(profile);
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

export function updateCollectorProfile(collectorId: string, updates: Partial<CollectorProfile>): CollectorProfile | null {
  const profile = getCollectorProfile(collectorId);
  if (!profile) return null;
  const updated = { ...profile, ...updates };
  saveCollectorProfile(updated);
  return updated;
}

// ─── Collections ─────────────────────────────────────────────────────────────

export function getCollections(collectorId: string): CollectorCollection[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(COLLECTIONS_KEY);
    if (!raw) return [];
    return JSON.parse(raw).filter((c: CollectorCollection) => c.collectorId === collectorId);
  } catch { return []; }
}

export function saveCollection(collection: CollectorCollection): void {
  if (typeof window === 'undefined') return;
  const all = (() => { try { return JSON.parse(localStorage.getItem(COLLECTIONS_KEY) || '[]'); } catch { return []; } })();
  const idx = all.findIndex((c: CollectorCollection) => c.id === collection.id);
  if (idx >= 0) all[idx] = collection; else all.push(collection);
  localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(all));
}

export function createCollection(collectorId: string, name: string, description: string, isDefault = false): CollectorCollection {
  const collection: CollectorCollection = {
    id: uid(), collectorId, name, description,
    status: 'private', artworks: [], createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(), isDefault,
  };
  saveCollection(collection);
  return collection;
}

// ─── Acquisitions ─────────────────────────────────────────────────────────────

export function getAcquisitions(collectorId: string): AcquisitionRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ACQUISITIONS_KEY);
    if (!raw) return [];
    return JSON.parse(raw).filter((a: AcquisitionRecord) => a.collectorId === collectorId)
      .sort((a: AcquisitionRecord, b: AcquisitionRecord) => new Date(b.acquisitionDate).getTime() - new Date(a.acquisitionDate).getTime());
  } catch { return []; }
}

export function saveAcquisition(record: AcquisitionRecord): void {
  if (typeof window === 'undefined') return;
  const all = (() => { try { return JSON.parse(localStorage.getItem(ACQUISITIONS_KEY) || '[]'); } catch { return []; } })();
  const idx = all.findIndex((a: AcquisitionRecord) => a.id === record.id);
  if (idx >= 0) all[idx] = record; else all.push(record);
  localStorage.setItem(ACQUISITIONS_KEY, JSON.stringify(all));
}

export function getTotalSpent(collectorId: string): number {
  return getAcquisitions(collectorId).reduce((s, a) => s + a.purchasePrice, 0);
}

// ─── Certificates ──────────────────────────────────────────────────────────────

export function getCertificates(collectorId: string): CertificateOfAuthenticity[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CERTIFICATES_KEY);
    if (!raw) return [];
    return JSON.parse(raw).filter((c: CertificateOfAuthenticity) => c.collectorId === collectorId);
  } catch { return []; }
}

export function getCertificateByCode(code: string): CertificateOfAuthenticity | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CERTIFICATES_KEY);
    if (!raw) return null;
    return JSON.parse(raw).find((c: CertificateOfAuthenticity) => c.verificationCode === code || c.certificateId === code) || null;
  } catch { return null; }
}

export function saveCertificate(cert: CertificateOfAuthenticity): void {
  if (typeof window === 'undefined') return;
  const all = (() => { try { return JSON.parse(localStorage.getItem(CERTIFICATES_KEY) || '[]'); } catch { return []; } })();
  const idx = all.findIndex((c: CertificateOfAuthenticity) => c.id === cert.id);
  if (idx >= 0) all[idx] = cert; else all.push(cert);
  localStorage.setItem(CERTIFICATES_KEY, JSON.stringify(all));
}

// ─── Viewings ─────────────────────────────────────────────────────────────────

export function getViewings(collectorId: string): ViewingHistory[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(VIEWINGS_KEY);
    if (!raw) return [];
    return JSON.parse(raw).filter((v: ViewingHistory) => v.collectorId === collectorId)
      .sort((a: ViewingHistory, b: ViewingHistory) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch { return []; }
}

export function saveViewing(viewing: ViewingHistory): void {
  if (typeof window === 'undefined') return;
  const all = (() => { try { return JSON.parse(localStorage.getItem(VIEWINGS_KEY) || '[]'); } catch { return []; } })();
  const idx = all.findIndex((v: ViewingHistory) => v.id === viewing.id);
  if (idx >= 0) all[idx] = viewing; else all.push(viewing);
  localStorage.setItem(VIEWINGS_KEY, JSON.stringify(all));
}

// ─── Wishlist ──────────────────────────────────────────────────────────────────

export function getWishlist(collectorId: string): WishlistItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(WISHLISTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw).filter((w: WishlistItem) => w.collectorId === collectorId)
      .sort((a: WishlistItem, b: WishlistItem) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
  } catch { return []; }
}

export function addToWishlist(collectorId: string, artwork: { id: string; title: string; artist: string; image?: string; price?: number }): WishlistItem {
  const item: WishlistItem = {
    id: uid(), collectorId, artworkId: artwork.id,
    artworkTitle: artwork.title, artistName: artwork.artist,
    artworkImage: artwork.image, price: artwork.price,
    addedAt: new Date().toISOString(), priority: 'medium',
    notifyAvailable: true, conciergeFollowUp: false,
  };
  if (typeof window !== 'undefined') {
    const all = (() => { try { return JSON.parse(localStorage.getItem(WISHLISTS_KEY) || '[]'); } catch { return []; } })();
    all.push(item);
    localStorage.setItem(WISHLISTS_KEY, JSON.stringify(all));
  }
  return item;
}

export function removeFromWishlist(collectorId: string, wishlistItemId: string): void {
  if (typeof window === 'undefined') return;
  const all = (() => { try { return JSON.parse(localStorage.getItem(WISHLISTS_KEY) || '[]'); } catch { return []; } })();
  const filtered = all.filter((w: WishlistItem) => w.id !== wishlistItemId);
  localStorage.setItem(WISHLISTS_KEY, JSON.stringify(filtered));
}

export function updateWishlistPriority(collectorId: string, wishlistItemId: string, priority: WishlistItem['priority']): void {
  if (typeof window === 'undefined') return;
  const all = (() => { try { return JSON.parse(localStorage.getItem(WISHLISTS_KEY) || '[]'); } catch { return []; } })();
  const idx = all.findIndex((w: WishlistItem) => w.id === wishlistItemId);
  if (idx >= 0) { all[idx].priority = priority; localStorage.setItem(WISHLISTS_KEY, JSON.stringify(all)); }
}

export function isInWishlist(collectorId: string, artworkId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(WISHLISTS_KEY);
    if (!raw) return false;
    return JSON.parse(raw).some((w: WishlistItem) => w.collectorId === collectorId && w.artworkId === artworkId);
  } catch { return false; }
}

// ─── Vault ─────────────────────────────────────────────────────────────────────

export function getVault(collectorId: string): CollectorVault {
  if (typeof window === 'undefined') return { collectorId, documents: [], totalDocuments: 0, lastUpdated: '' };
  try {
    const raw = localStorage.getItem(VAULT_KEY);
    if (!raw) return { collectorId, documents: [], totalDocuments: 0, lastUpdated: '' };
    const vaults = JSON.parse(raw);
    return vaults.find((v: CollectorVault) => v.collectorId === collectorId) || { collectorId, documents: [], totalDocuments: 0, lastUpdated: '' };
  } catch { return { collectorId, documents: [], totalDocuments: 0, lastUpdated: '' }; }
}

export function saveVault(vault: CollectorVault): void {
  if (typeof window === 'undefined') return;
  vault.lastUpdated = new Date().toISOString();
  vault.totalDocuments = vault.documents.length;
  const all = (() => { try { return JSON.parse(localStorage.getItem(VAULT_KEY) || '[]'); } catch { return []; } })();
  const idx = all.findIndex((v: CollectorVault) => v.collectorId === collectorId);
  if (idx >= 0) all[idx] = vault; else all.push(vault);
  localStorage.setItem(VAULT_KEY, JSON.stringify(all));
}

export function addVaultDocument(collectorId: string, doc: Omit<VaultDocument, 'id' | 'collectorId' | 'uploadedAt'>): VaultDocument {
  const vault = getVault(collectorId);
  const newDoc: VaultDocument = { ...doc, id: uid(), collectorId, uploadedAt: new Date().toISOString() };
  vault.documents.unshift(newDoc);
  vault.totalDocuments = vault.documents.length;
  vault.lastUpdated = new Date().toISOString();
  saveVault(vault);
  return newDoc;
}

export function getVaultByDocumentType(collectorId: string, type: DocumentType): VaultDocument[] {
  const vault = getVault(collectorId);
  return vault.documents.filter((d) => d.type === type);
}

// ─── Stats ─────────────────────────────────────────────────────────────────────

export function getCollectorStats(collectorId: string) {
  const acq = getAcquisitions(collectorId);
  const certs = getCertificates(collectorId);
  const viewings = getViewings(collectorId);
  const wishlist = getWishlist(collectorId);
  return {
    totalAcquisitions: acq.length,
    totalSpent: acq.reduce((s, a) => s + a.purchasePrice, 0),
    totalCertificates: certs.length,
    totalViewings: viewings.length,
    wishlistCount: wishlist.length,
    avgAcquisitionValue: acq.length > 0 ? Math.round(acq.reduce((s, a) => s + a.purchasePrice, 0) / acq.length) : 0,
  };
}

// ─── Mock Seed ─────────────────────────────────────────────────────────────────

export function seedCollectors(mockCollectors: CollectorProfile[]): void {
  if (typeof window === 'undefined') return;
  const existing = getAllCollectors();
  if (existing.length >= mockCollectors.length) return;
  const merged = [...existing];
  for (const mc of mockCollectors) {
    if (!merged.find((p) => p.id === mc.id)) merged.push(mc);
  }
  localStorage.setItem(PROFILES_KEY, JSON.stringify(merged));
}

export function seedAcquisitions(mockAcquisitions: AcquisitionRecord[]): void {
  if (typeof window === 'undefined') return;
  const existing = (() => { try { return JSON.parse(localStorage.getItem(ACQUISITIONS_KEY) || '[]'); } catch { return []; } })() as AcquisitionRecord[];
  const merged = [...existing];
  for (const ma of mockAcquisitions) {
    if (!merged.find((a) => a.id === ma.id)) merged.push(ma);
  }
  localStorage.setItem(ACQUISITIONS_KEY, JSON.stringify(merged));
}

export function seedCertificates(mockCerts: CertificateOfAuthenticity[]): void {
  if (typeof window === 'undefined') return;
  const existing = (() => { try { return JSON.parse(localStorage.getItem(CERTIFICATES_KEY) || '[]'); } catch { return []; } })() as CertificateOfAuthenticity[];
  const merged = [...existing];
  for (const mc of mockCerts) {
    if (!merged.find((c) => c.id === mc.id)) merged.push(mc);
  }
  localStorage.setItem(CERTIFICATES_KEY, JSON.stringify(merged));
}

export function seedViewings(mockViewings: ViewingHistory[]): void {
  if (typeof window === 'undefined') return;
  const existing = (() => { try { return JSON.parse(localStorage.getItem(VIEWINGS_KEY) || '[]'); } catch { return []; } })() as ViewingHistory[];
  const merged = [...existing];
  for (const mv of mockViewings) {
    if (!merged.find((v) => v.id === mv.id)) merged.push(mv);
  }
  localStorage.setItem(VIEWINGS_KEY, JSON.stringify(merged));
}

export function seedWishlists(mockWishlists: WishlistItem[]): void {
  if (typeof window === 'undefined') return;
  const existing = (() => { try { return JSON.parse(localStorage.getItem(WISHLISTS_KEY) || '[]'); } catch { return []; } })() as WishlistItem[];
  const merged = [...existing];
  for (const mw of mockWishlists) {
    if (!merged.find((w) => w.id === mw.id)) merged.push(mw);
  }
  localStorage.setItem(WISHLISTS_KEY, JSON.stringify(merged));
}

export function seedVaults(mockVaults: CollectorVault[]): void {
  if (typeof window === 'undefined') return;
  const existing = (() => { try { return JSON.parse(localStorage.getItem(VAULT_KEY) || '[]'); } catch { return []; } })() as CollectorVault[];
  const merged = [...existing];
  for (const mv of mockVaults) {
    const idx = merged.findIndex((v) => v.collectorId === mv.collectorId);
    if (idx >= 0) merged[idx] = mv; else merged.push(mv);
  }
  localStorage.setItem(VAULT_KEY, JSON.stringify(merged));
}