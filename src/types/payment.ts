export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled';
export type PaymentMethod = 'card' | 'bank_transfer' | 'flutterwave' | 'paystack' | 'stripe' | 'crypto' | 'cash';
export type PaymentType = 'artwork_purchase' | 'deposit' | 'commission_retainer' | 'event_ticket' | 'concierge_retainer' | 'reservation' | 'invoice_payment';
export type InvoiceStatus = 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue' | 'cancelled';
export type EscrowStatus = 'pending' | 'funded' | 'released' | 'disputed' | 'refunded' | 'expired';
export type SettlementStatus = 'pending' | 'in_review' | 'approved' | 'processed' | 'failed';
export type TransactionType = 'payment_in' | 'payment_out' | 'refund' | 'fee' | 'commission' | 'escrow_fund' | 'escrow_release' | 'deposit';
export type ReservationStatus = 'pending' | 'deposit_paid' | 'full_paid' | 'expired' | 'cancelled';

export interface PaymentIntent {
  id: string;
  collectorId: string;
  collectorName: string;
  collectorEmail: string;
  type: PaymentType;
  artworkId?: string;
  artworkTitle?: string;
  artistName?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  description: string;
  metadata: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  receiptUrl?: string;
  invoiceId?: string;
  escrowId?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  collectorId: string;
  collectorName: string;
  collectorEmail: string;
  artworkId?: string;
  artworkTitle?: string;
  artistName?: string;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  fees: number;
  total: number;
  currency: string;
  status: InvoiceStatus;
  dueDate: string;
  issuedDate: string;
  paidDate?: string;
  notes?: string;
  lineItems: InvoiceLineItem[];
  paymentIntentId?: string;
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface EscrowCase {
  id: string;
  escrowNumber: string;
  buyerId: string;
  buyerName: string;
  sellerId?: string;
  sellerName?: string;
  artworkId: string;
  artworkTitle: string;
  artistName: string;
  amount: number;
  currency: string;
  status: EscrowStatus;
  fundedAt?: string;
  releasedAt?: string;
  disputedAt?: string;
  refundedAt?: string;
  releaseConditions: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SettlementRecord {
  id: string;
  settlementNumber: string;
  artistId?: string;
  artistName?: string;
  collectorId?: string;
  collectorName?: string;
  artworkId?: string;
  artworkTitle?: string;
  grossAmount: number;
  platformFee: number;
  paymentFee: number;
  taxWithheld: number;
  netAmount: number;
  currency: string;
  status: SettlementStatus;
  periodStart: string;
  periodEnd: string;
  processedAt?: string;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
}

export interface TransactionRecord {
  id: string;
  transactionNumber: string;
  type: TransactionType;
  paymentIntentId?: string;
  invoiceId?: string;
  escrowId?: string;
  settlementId?: string;
  collectorId?: string;
  collectorName?: string;
  artistId?: string;
  artistName?: string;
  amount: number;
  currency: string;
  description: string;
  status: PaymentStatus;
  method: PaymentMethod;
  createdAt: string;
  processedAt?: string;
}

export interface ReservationDeposit {
  id: string;
  reservationNumber: string;
  collectorId: string;
  collectorName: string;
  artworkId: string;
  artworkTitle: string;
  artistName: string;
  depositAmount: number;
  fullAmount: number;
  currency: string;
  status: ReservationStatus;
  depositPaidAt?: string;
  fullPaidAt?: string;
  expiryDate: string;
  notes?: string;
  createdAt: string;
}

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
  refunded: 'Refunded',
  cancelled: 'Cancelled',
};

export const PAYMENT_STATUS_COLORS: Record<PaymentStatus, string> = {
  pending: 'text-orange-600 bg-orange-50',
  processing: 'text-blue-600 bg-blue-50',
  completed: 'text-green-600 bg-green-50',
  failed: 'text-red-600 bg-red-50',
  refunded: 'text-gray-600 bg-gray-50',
  cancelled: 'text-gray-400 bg-gray-50',
};

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  draft: 'Draft',
  sent: 'Sent',
  viewed: 'Viewed',
  paid: 'Paid',
  overdue: 'Overdue',
  cancelled: 'Cancelled',
};

export const INVOICE_STATUS_COLORS: Record<InvoiceStatus, string> = {
  draft: 'text-gray-600 bg-gray-50',
  sent: 'text-blue-600 bg-blue-50',
  viewed: 'text-purple-600 bg-purple-50',
  paid: 'text-green-600 bg-green-50',
  overdue: 'text-red-600 bg-red-50',
  cancelled: 'text-gray-400 bg-gray-50',
};

export const ESCROW_STATUS_LABELS: Record<EscrowStatus, string> = {
  pending: 'Pending',
  funded: 'Funded',
  released: 'Released',
  disputed: 'Disputed',
  refunded: 'Refunded',
  expired: 'Expired',
};

export const ESCROW_STATUS_COLORS: Record<EscrowStatus, string> = {
  pending: 'text-orange-600 bg-orange-50',
  funded: 'text-blue-600 bg-blue-50',
  released: 'text-green-600 bg-green-50',
  disputed: 'text-red-600 bg-red-50',
  refunded: 'text-gray-600 bg-gray-50',
  expired: 'text-gray-400 bg-gray-50',
};

export const SETTLEMENT_STATUS_LABELS: Record<SettlementStatus, string> = {
  pending: 'Pending',
  in_review: 'In Review',
  approved: 'Approved',
  processed: 'Processed',
  failed: 'Failed',
};

export const SETTLEMENT_STATUS_COLORS: Record<SettlementStatus, string> = {
  pending: 'text-orange-600 bg-orange-50',
  in_review: 'text-blue-600 bg-blue-50',
  approved: 'text-purple-600 bg-purple-50',
  processed: 'text-green-600 bg-green-50',
  failed: 'text-red-600 bg-red-50',
};

export const RESERVATION_STATUS_LABELS: Record<ReservationStatus, string> = {
  pending: 'Pending Deposit',
  deposit_paid: 'Deposit Paid',
  full_paid: 'Fully Paid',
  expired: 'Expired',
  cancelled: 'Cancelled',
};

export const RESERVATION_STATUS_COLORS: Record<ReservationStatus, string> = {
  pending: 'text-orange-600 bg-orange-50',
  deposit_paid: 'text-blue-600 bg-blue-50',
  full_paid: 'text-green-600 bg-green-50',
  expired: 'text-gray-400 bg-gray-50',
  cancelled: 'text-gray-400 bg-gray-50',
};