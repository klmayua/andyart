import type {
  PaymentIntent, Invoice, EscrowCase, SettlementRecord, TransactionRecord, ReservationDeposit,
  PaymentStatus, PaymentMethod, PaymentType, InvoiceStatus, EscrowStatus, SettlementStatus, ReservationStatus,
} from '@/types/payment';

const PAYMENTS_KEY = 'andyart_payments';
const INVOICES_KEY = 'andyart_invoices';
const ESCROW_KEY = 'andyart_escrow';
const SETTLEMENTS_KEY = 'andyart_settlements';
const TRANSACTIONS_KEY = 'andyart_transactions';
const RESERVATIONS_KEY = 'andyart_reservations';

function uid(): string { return Math.random().toString(36).slice(2) + Date.now().toString(36); }
function genNum(prefix: string): string { return `${prefix}-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Date.now().toString(36).slice(-4).toUpperCase()}`; }

// ─── Payments ──────────────────────────────────────────────────────────────────

export function getPayments(filter?: { collectorId?: string; status?: PaymentStatus }): PaymentIntent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(PAYMENTS_KEY);
    if (!raw) return [];
    let all: PaymentIntent[] = JSON.parse(raw);
    if (filter?.collectorId) all = all.filter((p) => p.collectorId === filter.collectorId);
    if (filter?.status) all = all.filter((p) => p.status === filter.status);
    return all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch { return []; }
}

export function getPayment(id: string): PaymentIntent | null {
  return getPayments().find((p) => p.id === id) || null;
}

export function savePayment(payment: PaymentIntent): void {
  if (typeof window === 'undefined') return;
  const all = getPayments();
  const idx = all.findIndex((p) => p.id === payment.id);
  if (idx >= 0) all[idx] = payment; else all.push(payment);
  localStorage.setItem(PAYMENTS_KEY, JSON.stringify(all));
}

export function createPaymentIntent(data: Omit<PaymentIntent, 'id' | 'createdAt' | 'updatedAt'>): PaymentIntent {
  const now = new Date().toISOString();
  const payment: PaymentIntent = { ...data, id: uid(), createdAt: now, updatedAt: now };
  savePayment(payment);
  return payment;
}

export function updatePaymentStatus(id: string, status: PaymentStatus): PaymentIntent | null {
  const p = getPayment(id);
  if (!p) return null;
  p.status = status;
  p.updatedAt = new Date().toISOString();
  if (status === 'completed') p.completedAt = new Date().toISOString();
  savePayment(p);
  return p;
}

// ─── Invoices ──────────────────────────────────────────────────────────────────

export function getInvoices(filter?: { collectorId?: string; status?: InvoiceStatus }): Invoice[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(INVOICES_KEY);
    if (!raw) return [];
    let all: Invoice[] = JSON.parse(raw);
    if (filter?.collectorId) all = all.filter((i) => i.collectorId === filter.collectorId);
    if (filter?.status) all = all.filter((i) => i.status === filter.status);
    return all.sort((a, b) => new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime());
  } catch { return []; }
}

export function getInvoice(id: string): Invoice | null {
  return getInvoices().find((i) => i.id === id) || null;
}

export function saveInvoice(invoice: Invoice): void {
  if (typeof window === 'undefined') return;
  const all = getInvoices();
  const idx = all.findIndex((i) => i.id === invoice.id);
  if (idx >= 0) all[idx] = invoice; else all.push(invoice);
  localStorage.setItem(INVOICES_KEY, JSON.stringify(all));
}

export function createInvoice(data: Omit<Invoice, 'id'>): Invoice {
  const invoice: Invoice = { ...data, id: uid() };
  saveInvoice(invoice);
  return invoice;
}

// ─── Escrow ────────────────────────────────────────────────────────────────────

export function getEscrowCases(filter?: { buyerId?: string; status?: EscrowStatus }): EscrowCase[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ESCROW_KEY);
    if (!raw) return [];
    let all: EscrowCase[] = JSON.parse(raw);
    if (filter?.buyerId) all = all.filter((e) => e.buyerId === filter.buyerId);
    if (filter?.status) all = all.filter((e) => e.status === filter.status);
    return all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch { return []; }
}

export function getEscrow(id: string): EscrowCase | null {
  return getEscrowCases().find((e) => e.id === id) || null;
}

export function saveEscrow(escrow: EscrowCase): void {
  if (typeof window === 'undefined') return;
  const all = getEscrowCases();
  const idx = all.findIndex((e) => e.id === escrow.id);
  if (idx >= 0) all[idx] = escrow; else all.push(escrow);
  localStorage.setItem(ESCROW_KEY, JSON.stringify(all));
}

export function updateEscrowStatus(id: string, status: EscrowStatus): EscrowCase | null {
  const e = getEscrow(id);
  if (!e) return null;
  e.status = status;
  e.updatedAt = new Date().toISOString();
  if (status === 'funded') e.fundedAt = new Date().toISOString();
  if (status === 'released') e.releasedAt = new Date().toISOString();
  if (status === 'disputed') e.disputedAt = new Date().toISOString();
  if (status === 'refunded') e.refundedAt = new Date().toISOString();
  saveEscrow(e);
  return e;
}

// ─── Settlements ───────────────────────────────────────────────────────────────

export function getSettlements(filter?: { status?: SettlementStatus }): SettlementRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SETTLEMENTS_KEY);
    if (!raw) return [];
    let all: SettlementRecord[] = JSON.parse(raw);
    if (filter?.status) all = all.filter((s) => s.status === filter.status);
    return all.sort((a, b) => new Date(b.periodEnd).getTime() - new Date(a.periodEnd).getTime());
  } catch { return []; }
}

export function saveSettlement(settlement: SettlementRecord): void {
  if (typeof window === 'undefined') return;
  const all = getSettlements();
  const idx = all.findIndex((s) => s.id === settlement.id);
  if (idx >= 0) all[idx] = settlement; else all.push(settlement);
  localStorage.setItem(SETTLEMENTS_KEY, JSON.stringify(all));
}

// ─── Transactions ──────────────────────────────────────────────────────────────

export function getTransactions(filter?: { collectorId?: string; type?: string }): TransactionRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(TRANSACTIONS_KEY);
    if (!raw) return [];
    let all: TransactionRecord[] = JSON.parse(raw);
    if (filter?.collectorId) all = all.filter((t) => t.collectorId === filter.collectorId);
    if (filter?.type) all = all.filter((t) => t.type === filter.type);
    return all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch { return []; }
}

export function saveTransaction(tx: TransactionRecord): void {
  if (typeof window === 'undefined') return;
  const all = getTransactions();
  const idx = all.findIndex((t) => t.id === tx.id);
  if (idx >= 0) all[idx] = tx; else all.push(tx);
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(all));
}

export function createTransaction(data: Omit<TransactionRecord, 'id' | 'createdAt'>): TransactionRecord {
  const tx: TransactionRecord = { ...data, id: uid(), createdAt: new Date().toISOString() };
  saveTransaction(tx);
  return tx;
}

// ─── Reservations ──────────────────────────────────────────────────────────────

export function getReservations(filter?: { collectorId?: string; status?: ReservationStatus }): ReservationDeposit[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RESERVATIONS_KEY);
    if (!raw) return [];
    let all: ReservationDeposit[] = JSON.parse(raw);
    if (filter?.collectorId) all = all.filter((r) => r.collectorId === filter.collectorId);
    if (filter?.status) all = all.filter((r) => r.status === filter.status);
    return all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch { return []; }
}

export function saveReservation(res: ReservationDeposit): void {
  if (typeof window === 'undefined') return;
  const all = getReservations();
  const idx = all.findIndex((r) => r.id === res.id);
  if (idx >= 0) all[idx] = res; else all.push(res);
  localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(all));
}

// ─── Stats ─────────────────────────────────────────────────────────────────────

export function getPaymentStats() {
  const payments = getPayments();
  const invoices = getInvoices();
  const escrow = getEscrowCases();
  const settlements = getSettlements();
  const reservations = getReservations();
  return {
    totalVolume: payments.filter((p) => p.status === 'completed').reduce((s, p) => s + p.amount, 0),
    pendingVolume: payments.filter((p) => p.status === 'pending').reduce((s, p) => s + p.amount, 0),
    totalPayments: payments.length,
    completedPayments: payments.filter((p) => p.status === 'completed').length,
    pendingInvoices: invoices.filter((i) => i.status === 'sent' || i.status === 'viewed').length,
    overdueInvoices: invoices.filter((i) => i.status === 'overdue').length,
    paidInvoices: invoices.filter((i) => i.status === 'paid').length,
    escrowFunded: escrow.filter((e) => e.status === 'funded').length,
    escrowPending: escrow.filter((e) => e.status === 'pending').length,
    escrowReleased: escrow.filter((e) => e.status === 'released').length,
    escrowDisputed: escrow.filter((e) => e.status === 'disputed').length,
    escrowBalance: escrow.filter((e) => e.status === 'funded').reduce((s, e) => s + e.amount, 0),
    pendingSettlements: settlements.filter((s) => s.status === 'pending' || s.status === 'in_review').length,
    activeReservations: reservations.filter((r) => r.status === 'pending' || r.status === 'deposit_paid').length,
    totalReservations: reservations.length,
  };
}

export function getCollectorPaymentStats(collectorId: string) {
  const payments = getPayments({ collectorId });
  const invoices = getInvoices({ collectorId });
  const escrow = getEscrowCases({ buyerId: collectorId });
  const transactions = getTransactions({ collectorId });
  const reservations = getReservations({ collectorId });
  return {
    totalSpent: payments.filter((p) => p.status === 'completed').reduce((s, p) => s + p.amount, 0),
    totalPayments: payments.length,
    pendingPayments: payments.filter((p) => p.status === 'pending').length,
    totalInvoices: invoices.length,
    unpaidInvoices: invoices.filter((i) => i.status === 'sent' || i.status === 'viewed' || i.status === 'overdue').length,
    activeEscrow: escrow.filter((e) => e.status === 'pending' || e.status === 'funded').length,
    totalTransactions: transactions.length,
    activeReservations: reservations.filter((r) => r.status === 'pending' || r.status === 'deposit_paid').length,
  };
}

// ─── Seed helpers ──────────────────────────────────────────────────────────────

export function seedPayments(mock: PaymentIntent[]): void {
  if (typeof window === 'undefined') return;
  const existing = getPayments();
  if (existing.length >= mock.length) return;
  const merged = [...existing];
  for (const m of mock) { if (!merged.find((p) => p.id === m.id)) merged.push(m); }
  localStorage.setItem(PAYMENTS_KEY, JSON.stringify(merged));
}

export function seedInvoices(mock: Invoice[]): void {
  if (typeof window === 'undefined') return;
  const existing = getInvoices();
  if (existing.length >= mock.length) return;
  const merged = [...existing];
  for (const m of mock) { if (!merged.find((i) => i.id === m.id)) merged.push(m); }
  localStorage.setItem(INVOICES_KEY, JSON.stringify(merged));
}

export function seedEscrow(mock: EscrowCase[]): void {
  if (typeof window === 'undefined') return;
  const existing = getEscrowCases();
  if (existing.length >= mock.length) return;
  const merged = [...existing];
  for (const m of mock) { if (!merged.find((e) => e.id === m.id)) merged.push(m); }
  localStorage.setItem(ESCROW_KEY, JSON.stringify(merged));
}

export function seedSettlements(mock: SettlementRecord[]): void {
  if (typeof window === 'undefined') return;
  const existing = getSettlements();
  if (existing.length >= mock.length) return;
  const merged = [...existing];
  for (const m of mock) { if (!merged.find((s) => s.id === m.id)) merged.push(m); }
  localStorage.setItem(SETTLEMENTS_KEY, JSON.stringify(merged));
}

export function seedTransactions(mock: TransactionRecord[]): void {
  if (typeof window === 'undefined') return;
  const existing = getTransactions();
  if (existing.length >= mock.length) return;
  const merged = [...existing];
  for (const m of mock) { if (!merged.find((t) => t.id === m.id)) merged.push(m); }
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(merged));
}

export function seedReservations(mock: ReservationDeposit[]): void {
  if (typeof window === 'undefined') return;
  const existing = getReservations();
  if (existing.length >= mock.length) return;
  const merged = [...existing];
  for (const m of mock) { if (!merged.find((r) => r.id === m.id)) merged.push(m); }
  localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(merged));
}