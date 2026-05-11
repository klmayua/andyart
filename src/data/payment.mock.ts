import type { PaymentIntent, Invoice, EscrowCase, SettlementRecord, TransactionRecord, ReservationDeposit } from '@/types/payment';
import { seedPayments, seedInvoices, seedEscrow, seedSettlements, seedTransactions, seedReservations } from '@/lib/payment';

export const PAYMENT_MOCKS: PaymentIntent[] = [
  {
    id: 'pay-001', collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke', collectorEmail: 'obafemi.okeke@andela.com',
    type: 'artwork_purchase', artworkId: 'art-001', artworkTitle: 'Whispers of Ancestors', artistName: 'Ben Enwonwu',
    amount: 850000, currency: 'USD', status: 'completed', method: 'bank_transfer',
    description: 'Artwork purchase — Whispers of Ancestors', metadata: {},
    createdAt: '2023-03-15T10:00:00Z', updatedAt: '2023-03-15T10:30:00Z', completedAt: '2023-03-15T10:30:00Z',
    receiptUrl: '#', invoiceId: 'inv-001', escrowId: 'esc-001',
  },
  {
    id: 'pay-002', collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke', collectorEmail: 'obafemi.okeke@andela.com',
    type: 'artwork_purchase', artworkId: 'art-002', artworkTitle: 'Market Day II', artistName: 'El Anatsui',
    amount: 650000, currency: 'USD', status: 'completed', method: 'stripe',
    description: 'Artwork purchase — Market Day II', metadata: {},
    createdAt: '2023-06-20T14:00:00Z', updatedAt: '2023-06-20T14:15:00Z', completedAt: '2023-06-20T14:15:00Z',
    receiptUrl: '#', invoiceId: 'inv-002',
  },
  {
    id: 'pay-003', collectorId: 'col-004', collectorName: 'Dr. Fatima Al-Hassan', collectorEmail: 'fatima.alhassan@uonbi.ac.ke',
    type: 'artwork_purchase', artworkId: 'art-003', artworkTitle: 'Sunset Over Kilimanjaro', artistName: 'Sane Wadu',
    amount: 120000, currency: 'USD', status: 'completed', method: 'flutterwave',
    description: 'Auction purchase — Sunset Over Kilimanjaro', metadata: {},
    createdAt: '2023-04-10T09:00:00Z', updatedAt: '2023-04-10T09:45:00Z', completedAt: '2023-04-10T09:45:00Z',
    receiptUrl: '#', invoiceId: 'inv-003',
  },
  {
    id: 'pay-004', collectorId: 'col-007', collectorName: 'Jean-Pierre Dubois', collectorEmail: 'jp.dubois@louvre.fr',
    type: 'artwork_purchase', artworkId: 'art-004', artworkTitle: 'Diaspora Dialogues', artistName: 'Yinka Shonibare',
    amount: 1800000, currency: 'EUR', status: 'completed', method: 'bank_transfer',
    description: 'Artwork purchase — Diaspora Dialogues', metadata: {},
    createdAt: '2023-02-28T11:00:00Z', updatedAt: '2023-02-28T11:20:00Z', completedAt: '2023-02-28T11:20:00Z',
    receiptUrl: '#', invoiceId: 'inv-004', escrowId: 'esc-002',
  },
  {
    id: 'pay-005', collectorId: 'col-011', collectorName: 'Chioma Eze', collectorEmail: 'chioma.eze@gtbank.com',
    type: 'commission_retainer', artworkId: 'art-005', artworkTitle: 'Mother and Child Reimagined', artistName: 'Njideka Akunyili Crosby',
    amount: 2200000, currency: 'USD', status: 'completed', method: 'stripe',
    description: 'Commission retainer — Mother and Child Reimagined', metadata: {},
    createdAt: '2023-05-15T13:00:00Z', updatedAt: '2023-05-15T13:10:00Z', completedAt: '2023-05-15T13:10:00Z',
    receiptUrl: '#', invoiceId: 'inv-005',
  },
  {
    id: 'pay-006', collectorId: 'col-012', collectorName: 'Marcus Chen', collectorEmail: 'm.chen@artbasel.com',
    type: 'artwork_purchase', artworkId: 'art-006', artworkTitle: 'Gravity and Grace', artistName: 'El Anatsui',
    amount: 4500000, currency: 'USD', status: 'completed', method: 'bank_transfer',
    description: 'Artwork purchase — Gravity and Grace', metadata: {},
    createdAt: '2023-01-20T08:00:00Z', updatedAt: '2023-01-20T08:30:00Z', completedAt: '2023-01-20T08:30:00Z',
    receiptUrl: '#', invoiceId: 'inv-006', escrowId: 'esc-003',
  },
  {
    id: 'pay-007', collectorId: 'col-002', collectorName: 'Amara Nwosu', collectorEmail: 'amara.n@zenith.com',
    type: 'artwork_purchase', artworkId: 'art-007', artworkTitle: 'Digital Futures', artistName: 'Wangechi Mutu',
    amount: 380000, currency: 'USD', status: 'completed', method: 'paystack',
    description: 'Artwork purchase — Digital Futures', metadata: {},
    createdAt: '2023-07-10T15:00:00Z', updatedAt: '2023-07-10T15:05:00Z', completedAt: '2023-07-10T15:05:00Z',
    receiptUrl: '#', invoiceId: 'inv-007',
  },
  {
    id: 'pay-008', collectorId: 'col-005', collectorName: 'Thabo Mokoena', collectorEmail: 'thabo.m@investec.co.za',
    type: 'artwork_purchase', artworkId: 'art-008', artworkTitle: 'Portrait of a Miner', artistName: 'William Kentridge',
    amount: 750000, currency: 'USD', status: 'completed', method: 'stripe',
    description: 'Auction purchase — Portrait of a Miner', metadata: {},
    createdAt: '2023-08-05T12:00:00Z', updatedAt: '2023-08-05T12:10:00Z', completedAt: '2023-08-05T12:10:00Z',
    receiptUrl: '#', invoiceId: 'inv-008',
  },
  {
    id: 'pay-009', collectorId: 'col-008', collectorName: 'Nia Johnson', collectorEmail: 'nia.j@arts.columbia.edu',
    type: 'artwork_purchase', artworkId: 'art-009', artworkTitle: 'Somnyama Ngonyama', artistName: 'Zanele Muholi',
    amount: 280000, currency: 'USD', status: 'completed', method: 'stripe',
    description: 'Artwork purchase — Somnyama Ngonyama', metadata: {},
    createdAt: '2023-09-12T14:00:00Z', updatedAt: '2023-09-12T14:05:00Z', completedAt: '2023-09-12T14:05:00Z',
    receiptUrl: '#', invoiceId: 'inv-009',
  },
  {
    id: 'pay-010', collectorId: 'col-003', collectorName: 'Kofi Asante', collectorEmail: 'k.asante@stanbic.com.gh',
    type: 'artwork_purchase', artworkId: 'art-010', artworkTitle: 'Yellow Brick', artistName: 'Serge Attukwei Clottey',
    amount: 95000, currency: 'USD', status: 'completed', method: 'flutterwave',
    description: 'Studio purchase — Yellow Brick', metadata: {},
    createdAt: '2023-10-01T10:00:00Z', updatedAt: '2023-10-01T10:15:00Z', completedAt: '2023-10-01T10:15:00Z',
    receiptUrl: '#', invoiceId: 'inv-010',
  },
  {
    id: 'pay-011', collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke', collectorEmail: 'obafemi.okeke@andela.com',
    type: 'reservation', artworkId: 'art-019', artworkTitle: 'Dawn Chorus', artistName: 'Njideka Akunyili Crosby',
    amount: 180000, currency: 'USD', status: 'completed', method: 'bank_transfer',
    description: 'Reservation deposit — Dawn Chorus', metadata: {},
    createdAt: '2024-01-10T10:00:00Z', updatedAt: '2024-01-10T10:05:00Z', completedAt: '2024-01-10T10:05:00Z',
    receiptUrl: '#',
  },
  {
    id: 'pay-012', collectorId: 'col-009', collectorName: 'Oluwatobi Adeyemi', collectorEmail: 'tobi.adeyemi@flutterwave.com',
    type: 'commission_retainer', artworkId: 'art-025', artworkTitle: 'Office Collection', artistName: 'Ibrahim Mahama',
    amount: 150000, currency: 'USD', status: 'pending', method: 'paystack',
    description: 'Commission retainer — Office Collection', metadata: {},
    createdAt: '2024-12-01T09:00:00Z', updatedAt: '2024-12-01T09:00:00Z',
  },
];

export const INVOICE_MOCKS: Invoice[] = [
  {
    id: 'inv-001', invoiceNumber: 'AA-INV-2023-001', collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke', collectorEmail: 'obafemi.okeke@andela.com',
    artworkId: 'art-001', artworkTitle: 'Whispers of Ancestors', artistName: 'Ben Enwonwu',
    subtotal: 850000, taxRate: 0, taxAmount: 0, fees: 0, total: 850000, currency: 'USD',
    status: 'paid', dueDate: '2023-03-30T00:00:00Z', issuedDate: '2023-03-15T10:00:00Z', paidDate: '2023-03-15T10:30:00Z',
    notes: 'Paid in full via bank transfer', lineItems: [
      { description: 'Whispers of Ancestors — Oil on canvas, 120x150cm', quantity: 1, unitPrice: 850000, total: 850000 },
    ], paymentIntentId: 'pay-001',
  },
  {
    id: 'inv-002', invoiceNumber: 'AA-INV-2023-002', collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke', collectorEmail: 'obafemi.okeke@andela.com',
    artworkId: 'art-002', artworkTitle: 'Market Day II', artistName: 'El Anatsui',
    subtotal: 650000, taxRate: 0, taxAmount: 0, fees: 16250, total: 666250, currency: 'USD',
    status: 'paid', dueDate: '2023-07-05T00:00:00Z', issuedDate: '2023-06-20T14:00:00Z', paidDate: '2023-06-20T14:15:00Z',
    notes: 'Paid via Stripe. Platform fee applied.', lineItems: [
      { description: 'Market Day II — Aluminum bottle caps, 300x400cm', quantity: 1, unitPrice: 650000, total: 650000 },
      { description: 'Platform fee (2.5%)', quantity: 1, unitPrice: 16250, total: 16250 },
    ], paymentIntentId: 'pay-002',
  },
  {
    id: 'inv-003', invoiceNumber: 'AA-INV-2023-003', collectorId: 'col-004', collectorName: 'Dr. Fatima Al-Hassan', collectorEmail: 'fatima.alhassan@uonbi.ac.ke',
    artworkId: 'art-003', artworkTitle: 'Sunset Over Kilimanjaro', artistName: 'Sane Wadu',
    subtotal: 120000, taxRate: 0.16, taxAmount: 19200, fees: 3000, total: 142200, currency: 'USD',
    status: 'paid', dueDate: '2023-04-25T00:00:00Z', issuedDate: '2023-04-10T09:00:00Z', paidDate: '2023-04-10T09:45:00Z',
    notes: 'Auction purchase with VAT', lineItems: [
      { description: 'Sunset Over Kilimanjaro — Oil on canvas', quantity: 1, unitPrice: 120000, total: 120000 },
      { description: 'VAT (16%)', quantity: 1, unitPrice: 19200, total: 19200 },
      { description: 'Auction fee', quantity: 1, unitPrice: 3000, total: 3000 },
    ], paymentIntentId: 'pay-003',
  },
  {
    id: 'inv-004', invoiceNumber: 'AA-INV-2023-004', collectorId: 'col-007', collectorName: 'Jean-Pierre Dubois', collectorEmail: 'jp.dubois@louvre.fr',
    artworkId: 'art-004', artworkTitle: 'Diaspora Dialogues', artistName: 'Yinka Shonibare',
    subtotal: 1800000, taxRate: 0.20, taxAmount: 360000, fees: 0, total: 2160000, currency: 'EUR',
    status: 'paid', dueDate: '2023-03-15T00:00:00Z', issuedDate: '2023-02-28T11:00:00Z', paidDate: '2023-02-28T11:20:00Z',
    notes: 'International wire with French VAT', lineItems: [
      { description: 'Diaspora Dialogues — Fiberglass, Dutch wax fabric', quantity: 1, unitPrice: 1800000, total: 1800000 },
      { description: 'TVA (20%)', quantity: 1, unitPrice: 360000, total: 360000 },
    ], paymentIntentId: 'pay-004',
  },
  {
    id: 'inv-005', invoiceNumber: 'AA-INV-2023-005', collectorId: 'col-011', collectorName: 'Chioma Eze', collectorEmail: 'chioma.eze@gtbank.com',
    artworkId: 'art-005', artworkTitle: 'Mother and Child Reimagined', artistName: 'Njideka Akunyili Crosby',
    subtotal: 2200000, taxRate: 0, taxAmount: 0, fees: 55000, total: 2255000, currency: 'USD',
    status: 'paid', dueDate: '2023-05-30T00:00:00Z', issuedDate: '2023-05-15T13:00:00Z', paidDate: '2023-05-15T13:10:00Z',
    notes: 'Commission retainer — 50% paid. Balance on delivery.', lineItems: [
      { description: 'Commission retainer — Mother and Child Reimagined', quantity: 1, unitPrice: 2200000, total: 2200000 },
      { description: 'Platform fee (2.5%)', quantity: 1, unitPrice: 55000, total: 55000 },
    ], paymentIntentId: 'pay-005',
  },
  {
    id: 'inv-006', invoiceNumber: 'AA-INV-2023-006', collectorId: 'col-012', collectorName: 'Marcus Chen', collectorEmail: 'm.chen@artbasel.com',
    artworkId: 'art-006', artworkTitle: 'Gravity and Grace', artistName: 'El Anatsui',
    subtotal: 4500000, taxRate: 0, taxAmount: 0, fees: 0, total: 4500000, currency: 'USD',
    status: 'paid', dueDate: '2023-02-05T00:00:00Z', issuedDate: '2023-01-20T08:00:00Z', paidDate: '2023-01-20T08:30:00Z',
    notes: 'Private sale — no platform fees for founding members', lineItems: [
      { description: 'Gravity and Grace — Aluminum bottle caps, 500x700cm', quantity: 1, unitPrice: 4500000, total: 4500000 },
    ], paymentIntentId: 'pay-006',
  },
  {
    id: 'inv-007', invoiceNumber: 'AA-INV-2023-007', collectorId: 'col-009', collectorName: 'Oluwatobi Adeyemi', collectorEmail: 'tobi.adeyemi@flutterwave.com',
    artworkId: 'art-025', artworkTitle: 'Office Collection', artistName: 'Ibrahim Mahama',
    subtotal: 300000, taxRate: 0, taxAmount: 0, fees: 7500, total: 307500, currency: 'USD',
    status: 'sent', dueDate: '2024-12-15T00:00:00Z', issuedDate: '2024-12-01T09:00:00Z',
    notes: 'Corporate commission — 50% retainer invoice', lineItems: [
      { description: 'Office Collection — Commission retainer (50%)', quantity: 1, unitPrice: 150000, total: 150000 },
      { description: 'Office Collection — Materials deposit', quantity: 1, unitPrice: 150000, total: 150000 },
      { description: 'Platform fee (2.5%)', quantity: 1, unitPrice: 7500, total: 7500 },
    ], paymentIntentId: 'pay-012',
  },
  {
    id: 'inv-008', invoiceNumber: 'AA-INV-2024-008', collectorId: 'col-006', collectorName: 'Aisha Bello', collectorEmail: 'aisha.bello@gmail.com',
    artworkId: 'art-026', artworkTitle: 'Morning Bloom', artistName: 'Peju Alatise',
    subtotal: 12000, taxRate: 0, taxAmount: 0, fees: 300, total: 12300, currency: 'USD',
    status: 'overdue', dueDate: '2024-11-15T00:00:00Z', issuedDate: '2024-11-01T10:00:00Z',
    notes: 'Overdue — payment reminder sent', lineItems: [
      { description: 'Morning Bloom — Acrylic on canvas, 60x80cm', quantity: 1, unitPrice: 12000, total: 12000 },
      { description: 'Platform fee (2.5%)', quantity: 1, unitPrice: 300, total: 300 },
    ],
  },
];

export const ESCROW_MOCKS: EscrowCase[] = [
  {
    id: 'esc-001', escrowNumber: 'AA-ESC-2023-001', buyerId: 'col-001', buyerName: 'Dr. Obafemi Okeke',
    sellerId: 'art-001', sellerName: 'Ben Enwonwu Estate',
    artworkId: 'art-001', artworkTitle: 'Whispers of Ancestors', artistName: 'Ben Enwonwu',
    amount: 850000, currency: 'USD', status: 'released',
    fundedAt: '2023-03-15T10:30:00Z', releasedAt: '2023-03-20T14:00:00Z',
    releaseConditions: 'Artwork received and inspected by buyer',
    notes: 'Smooth transaction. Artwork verified upon receipt.', createdAt: '2023-03-15T10:00:00Z', updatedAt: '2023-03-20T14:00:00Z',
  },
  {
    id: 'esc-002', escrowNumber: 'AA-ESC-2023-002', buyerId: 'col-007', buyerName: 'Jean-Pierre Dubois',
    sellerId: 'art-004', sellerName: 'Stephen Friedman Gallery',
    artworkId: 'art-004', artworkTitle: 'Diaspora Dialogues', artistName: 'Yinka Shonibare',
    amount: 1800000, currency: 'EUR', status: 'released',
    fundedAt: '2023-02-28T11:20:00Z', releasedAt: '2023-03-15T09:00:00Z',
    releaseConditions: 'Customs clearance confirmed, artwork delivered to Paris',
    notes: 'International escrow with customs documentation.', createdAt: '2023-02-28T11:00:00Z', updatedAt: '2023-03-15T09:00:00Z',
  },
  {
    id: 'esc-003', escrowNumber: 'AA-ESC-2023-003', buyerId: 'col-012', buyerName: 'Marcus Chen',
    sellerId: 'art-006', sellerName: 'Private Collection',
    artworkId: 'art-006', artworkTitle: 'Gravity and Grace', artistName: 'El Anatsui',
    amount: 4500000, currency: 'USD', status: 'released',
    fundedAt: '2023-01-20T08:30:00Z', releasedAt: '2023-02-01T10:00:00Z',
    releaseConditions: 'Installation complete, climate control verified',
    notes: 'Large-scale installation escrow. White-glove delivery.', createdAt: '2023-01-20T08:00:00Z', updatedAt: '2023-02-01T10:00:00Z',
  },
  {
    id: 'esc-004', escrowNumber: 'AA-ESC-2024-004', buyerId: 'col-009', buyerName: 'Oluwatobi Adeyemi',
    sellerId: 'art-025', sellerName: 'Ibrahim Mahama Studio',
    artworkId: 'art-025', artworkTitle: 'Office Collection', artistName: 'Ibrahim Mahama',
    amount: 300000, currency: 'USD', status: 'funded',
    fundedAt: '2024-12-01T09:15:00Z',
    releaseConditions: 'Commission complete, final approval from buyer',
    notes: 'Corporate commission escrow. Milestone-based release.', createdAt: '2024-12-01T09:00:00Z', updatedAt: '2024-12-01T09:15:00Z',
  },
  {
    id: 'esc-005', escrowNumber: 'AA-ESC-2024-005', buyerId: 'col-006', buyerName: 'Aisha Bello',
    sellerId: 'art-026', sellerName: 'Peju Alatise Studio',
    artworkId: 'art-026', artworkTitle: 'Morning Bloom', artistName: 'Peju Alatise',
    amount: 12000, currency: 'USD', status: 'pending',
    releaseConditions: 'Payment received, artwork prepared for shipment',
    notes: 'Awaiting buyer payment to fund escrow.', createdAt: '2024-11-01T10:00:00Z', updatedAt: '2024-11-01T10:00:00Z',
  },
];

export const SETTLEMENT_MOCKS: SettlementRecord[] = [
  {
    id: 'set-001', settlementNumber: 'AA-SET-2023-Q1-001',
    artistId: 'artist-001', artistName: 'Ben Enwonwu Estate',
    collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke',
    artworkId: 'art-001', artworkTitle: 'Whispers of Ancestors',
    grossAmount: 850000, platformFee: 21250, paymentFee: 0, taxWithheld: 0, netAmount: 828750,
    currency: 'USD', status: 'processed', periodStart: '2023-01-01T00:00:00Z', periodEnd: '2023-03-31T23:59:59Z',
    processedAt: '2023-04-05T10:00:00Z', paymentMethod: 'bank_transfer', paymentReference: 'WIRE-001',
  },
  {
    id: 'set-002', settlementNumber: 'AA-SET-2023-Q2-001',
    artistId: 'artist-002', artistName: 'El Anatsui',
    collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke',
    artworkId: 'art-002', artworkTitle: 'Market Day II',
    grossAmount: 650000, platformFee: 16250, paymentFee: 22750, taxWithheld: 0, netAmount: 611000,
    currency: 'USD', status: 'processed', periodStart: '2023-04-01T00:00:00Z', periodEnd: '2023-06-30T23:59:59Z',
    processedAt: '2023-07-10T14:00:00Z', paymentMethod: 'bank_transfer', paymentReference: 'WIRE-002',
  },
  {
    id: 'set-003', settlementNumber: 'AA-SET-2023-Q1-002',
    artistId: 'artist-004', artistName: 'Yinka Shonibare',
    collectorId: 'col-007', collectorName: 'Jean-Pierre Dubois',
    artworkId: 'art-004', artworkTitle: 'Diaspora Dialogues',
    grossAmount: 1800000, platformFee: 0, paymentFee: 0, taxWithheld: 360000, netAmount: 1440000,
    currency: 'EUR', status: 'processed', periodStart: '2023-01-01T00:00:00Z', periodEnd: '2023-03-31T23:59:59Z',
    processedAt: '2023-04-05T10:00:00Z', paymentMethod: 'bank_transfer', paymentReference: 'WIRE-003',
  },
  {
    id: 'set-004', settlementNumber: 'AA-SET-2024-Q4-001',
    artistId: 'artist-025', artistName: 'Ibrahim Mahama',
    collectorId: 'col-009', collectorName: 'Oluwatobi Adeyemi',
    artworkId: 'art-025', artworkTitle: 'Office Collection',
    grossAmount: 150000, platformFee: 3750, paymentFee: 5250, taxWithheld: 0, netAmount: 141000,
    currency: 'USD', status: 'pending', periodStart: '2024-10-01T00:00:00Z', periodEnd: '2024-12-31T23:59:59Z',
    paymentMethod: 'bank_transfer',
  },
];

export const TRANSACTION_MOCKS: TransactionRecord[] = [
  { id: 'tx-001', transactionNumber: 'AA-TX-2023-001', type: 'payment_in', paymentIntentId: 'pay-001', collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke', amount: 850000, currency: 'USD', description: 'Artwork purchase — Whispers of Ancestors', status: 'completed', method: 'bank_transfer', createdAt: '2023-03-15T10:30:00Z', processedAt: '2023-03-15T10:30:00Z' },
  { id: 'tx-002', transactionNumber: 'AA-TX-2023-002', type: 'fee', paymentIntentId: 'pay-002', collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke', amount: 16250, currency: 'USD', description: 'Platform fee — Market Day II', status: 'completed', method: 'stripe', createdAt: '2023-06-20T14:15:00Z', processedAt: '2023-06-20T14:15:00Z' },
  { id: 'tx-003', transactionNumber: 'AA-TX-2023-003', type: 'payment_in', paymentIntentId: 'pay-003', collectorId: 'col-004', collectorName: 'Dr. Fatima Al-Hassan', amount: 142200, currency: 'USD', description: 'Auction purchase — Sunset Over Kilimanjaro', status: 'completed', method: 'flutterwave', createdAt: '2023-04-10T09:45:00Z', processedAt: '2023-04-10T09:45:00Z' },
  { id: 'tx-004', transactionNumber: 'AA-TX-2023-004', type: 'payment_in', paymentIntentId: 'pay-004', collectorId: 'col-007', collectorName: 'Jean-Pierre Dubois', amount: 2160000, currency: 'EUR', description: 'Artwork purchase — Diaspora Dialogues', status: 'completed', method: 'bank_transfer', createdAt: '2023-02-28T11:20:00Z', processedAt: '2023-02-28T11:20:00Z' },
  { id: 'tx-005', transactionNumber: 'AA-TX-2023-005', type: 'escrow_fund', escrowId: 'esc-001', collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke', amount: 850000, currency: 'USD', description: 'Escrow funded — Whispers of Ancestors', status: 'completed', method: 'bank_transfer', createdAt: '2023-03-15T10:30:00Z', processedAt: '2023-03-15T10:30:00Z' },
  { id: 'tx-006', transactionNumber: 'AA-TX-2023-006', type: 'escrow_release', escrowId: 'esc-001', collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke', amount: 850000, currency: 'USD', description: 'Escrow released — Whispers of Ancestors', status: 'completed', method: 'bank_transfer', createdAt: '2023-03-20T14:00:00Z', processedAt: '2023-03-20T14:00:00Z' },
  { id: 'tx-007', transactionNumber: 'AA-TX-2023-007', type: 'payment_out', settlementId: 'set-001', artistId: 'artist-001', artistName: 'Ben Enwonwu Estate', amount: 828750, currency: 'USD', description: 'Artist settlement — Q1 2023', status: 'completed', method: 'bank_transfer', createdAt: '2023-04-05T10:00:00Z', processedAt: '2023-04-05T10:00:00Z' },
  { id: 'tx-008', transactionNumber: 'AA-TX-2023-008', type: 'commission', paymentIntentId: 'pay-005', collectorId: 'col-011', collectorName: 'Chioma Eze', amount: 55000, currency: 'USD', description: 'Platform commission — Mother and Child Reimagined', status: 'completed', method: 'stripe', createdAt: '2023-05-15T13:10:00Z', processedAt: '2023-05-15T13:10:00Z' },
  { id: 'tx-009', transactionNumber: 'AA-TX-2024-009', type: 'deposit', paymentIntentId: 'pay-012', collectorId: 'col-009', collectorName: 'Oluwatobi Adeyemi', amount: 150000, currency: 'USD', description: 'Commission deposit — Office Collection', status: 'pending', method: 'paystack', createdAt: '2024-12-01T09:00:00Z' },
  { id: 'tx-010', transactionNumber: 'AA-TX-2024-010', type: 'refund', paymentIntentId: 'pay-012', collectorId: 'col-009', collectorName: 'Oluwatobi Adeyemi', amount: 150000, currency: 'USD', description: 'Refund — Commission cancelled', status: 'refunded', method: 'paystack', createdAt: '2024-12-05T10:00:00Z', processedAt: '2024-12-05T10:30:00Z' },
];

export const RESERVATION_MOCKS: ReservationDeposit[] = [
  {
    id: 'res-001', reservationNumber: 'AA-RES-2024-001', collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke',
    artworkId: 'art-019', artworkTitle: 'Dawn Chorus', artistName: 'Njideka Akunyili Crosby',
    depositAmount: 180000, fullAmount: 1800000, currency: 'USD', status: 'full_paid',
    depositPaidAt: '2024-01-10T10:05:00Z', fullPaidAt: '2024-01-10T10:05:00Z',
    expiryDate: '2024-02-10T00:00:00Z', notes: 'Full payment made immediately', createdAt: '2024-01-10T10:00:00Z',
  },
  {
    id: 'res-002', reservationNumber: 'AA-RES-2024-002', collectorId: 'col-007', collectorName: 'Jean-Pierre Dubois',
    artworkId: 'art-022', artworkTitle: 'Colonial Shadows', artistName: 'Yinka Shonibare',
    depositAmount: 320000, fullAmount: 3200000, currency: 'EUR', status: 'deposit_paid',
    depositPaidAt: '2024-01-20T11:00:00Z',
    expiryDate: '2024-03-20T00:00:00Z', notes: '10% deposit paid. Balance due before shipment.', createdAt: '2024-01-20T11:00:00Z',
  },
  {
    id: 'res-003', reservationNumber: 'AA-RES-2024-003', collectorId: 'col-011', collectorName: 'Chioma Eze',
    artworkId: 'art-023', artworkTitle: 'Sisterhood Unbound', artistName: 'Zanele Muholi',
    depositAmount: 95000, fullAmount: 950000, currency: 'USD', status: 'deposit_paid',
    depositPaidAt: '2024-02-28T13:00:00Z',
    expiryDate: '2024-04-28T00:00:00Z', notes: '10% deposit for foundation acquisition.', createdAt: '2024-02-28T13:00:00Z',
  },
  {
    id: 'res-004', reservationNumber: 'AA-RES-2024-004', collectorId: 'col-012', collectorName: 'Marcus Chen',
    artworkId: 'art-024', artworkTitle: 'Market Women II', artistName: 'Amoako Boafo',
    depositAmount: 68000, fullAmount: 680000, currency: 'USD', status: 'pending',
    expiryDate: '2024-12-31T00:00:00Z', notes: 'Awaiting deposit payment.', createdAt: '2024-04-10T08:00:00Z',
  },
];

export function seedPaymentData(): void {
  if (typeof window === 'undefined') return;
  seedPayments(PAYMENT_MOCKS);
  seedInvoices(INVOICE_MOCKS);
  seedEscrow(ESCROW_MOCKS);
  seedSettlements(SETTLEMENT_MOCKS);
  seedTransactions(TRANSACTION_MOCKS);
  seedReservations(RESERVATION_MOCKS);
}