'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { CreditCard, Receipt, TrendingUp, Clock, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
import { useCurrentCollectorId } from '@/hooks/useCurrentCollector';
import { getPayments, getInvoices, getEscrowCases, getReservations, getCollectorPaymentStats } from '@/lib/payment';
import { PAYMENT_STATUS_LABELS, PAYMENT_STATUS_COLORS, INVOICE_STATUS_LABELS, INVOICE_STATUS_COLORS, ESCROW_STATUS_LABELS, ESCROW_STATUS_COLORS } from '@/types/payment';

export default function CollectorPaymentsPage() {
  const collectorId = useCurrentCollectorId();
  const stats = useMemo(() => collectorId ? getCollectorPaymentStats(collectorId) : null, [collectorId]);
  const payments = useMemo(() => collectorId ? getPayments({ collectorId }).slice(0, 5) : [], [collectorId]);
  const invoices = useMemo(() => collectorId ? getInvoices({ collectorId }).slice(0, 3) : [], [collectorId]);
  const escrow = useMemo(() => collectorId ? getEscrowCases({ buyerId: collectorId }).slice(0, 3) : [], [collectorId]);
  const reservations = useMemo(() => collectorId ? getReservations({ collectorId }).slice(0, 3) : [], [collectorId]);

  if (!collectorId) {
    return <div className="text-center py-20 text-sm text-andy-bronze">Loading...</div>;
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-andy-black mb-6">Payments & Finance</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Spent', value: stats ? `$${(stats.totalSpent / 1000).toFixed(0)}k` : '—', icon: TrendingUp, href: '/collector/transactions' },
          { label: 'Invoices', value: stats?.totalInvoices || 0, sub: `${stats?.unpaidInvoices || 0} unpaid`, icon: Receipt, href: '/collector/invoices' },
          { label: 'Active Escrow', value: stats?.activeEscrow || 0, icon: CreditCard, href: '/collector/transactions' },
          { label: 'Reservations', value: stats?.activeReservations || 0, icon: Clock, href: '/collector/transactions' },
        ].map((kpi) => (
          <Link key={kpi.label} href={kpi.href} className="bg-white rounded-2xl border border-andy-stone/20 p-5 hover:border-andy-gold/30 hover:shadow-premium transition-all group">
            <div className="flex items-center justify-between mb-3">
              <kpi.icon size={20} className="text-andy-gold" />
              <ArrowRight size={14} className="text-andy-bronze/40 group-hover:text-andy-gold transition-colors" />
            </div>
            <p className="text-2xl font-bold text-andy-black">{kpi.value}</p>
            <p className="text-xs text-andy-bronze mt-0.5">{kpi.label}</p>
            {kpi.sub && <p className="text-xs text-andy-bronze/50">{kpi.sub}</p>}
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <h2 className="font-serif text-lg font-bold text-andy-black">Recent Payments</h2>
            <Link href="/collector/transactions" className="text-xs text-andy-bronze hover:text-andy-gold">View all →</Link>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {payments.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{p.description}</p>
                  <p className="text-xs text-andy-bronze/60">{p.method} · {new Date(p.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-andy-black">${(p.amount / 1000).toFixed(0)}k</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${PAYMENT_STATUS_COLORS[p.status]}`}>{PAYMENT_STATUS_LABELS[p.status]}</span>
                </div>
              </div>
            ))}
            {payments.length === 0 && <div className="px-6 py-12 text-center text-sm text-andy-bronze/40">No payments</div>}
          </div>
        </div>

        {/* Invoices */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <h2 className="font-serif text-lg font-bold text-andy-black">Invoices</h2>
            <Link href="/collector/invoices" className="text-xs text-andy-bronze hover:text-andy-gold">View all →</Link>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {invoices.map((i) => (
              <div key={i.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{i.invoiceNumber}</p>
                  <p className="text-xs text-andy-bronze/60">{i.artworkTitle || i.notes} · Due {new Date(i.dueDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-andy-black">${(i.total / 1000).toFixed(0)}k</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${INVOICE_STATUS_COLORS[i.status]}`}>{INVOICE_STATUS_LABELS[i.status]}</span>
                </div>
              </div>
            ))}
            {invoices.length === 0 && <div className="px-6 py-12 text-center text-sm text-andy-bronze/40">No invoices</div>}
          </div>
        </div>

        {/* Escrow */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <h2 className="font-serif text-lg font-bold text-andy-black">Escrow</h2>
            <Link href="/collector/transactions" className="text-xs text-andy-bronze hover:text-andy-gold">View all →</Link>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {escrow.map((e) => (
              <div key={e.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{e.artworkTitle}</p>
                  <p className="text-xs text-andy-bronze/60">{e.escrowNumber} · {e.releaseConditions}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-andy-black">${(e.amount / 1000).toFixed(0)}k</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${ESCROW_STATUS_COLORS[e.status]}`}>{ESCROW_STATUS_LABELS[e.status]}</span>
                </div>
              </div>
            ))}
            {escrow.length === 0 && <div className="px-6 py-12 text-center text-sm text-andy-bronze/40">No escrow</div>}
          </div>
        </div>

        {/* Reservations */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <h2 className="font-serif text-lg font-bold text-andy-black">Reservations</h2>
            <Link href="/collector/transactions" className="text-xs text-andy-bronze hover:text-andy-gold">View all →</Link>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {reservations.map((r) => (
              <div key={r.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{r.artworkTitle}</p>
                  <p className="text-xs text-andy-bronze/60">Deposit: ${(r.depositAmount / 1000).toFixed(0)}k · Expires {new Date(r.expiryDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-andy-black">${(r.fullAmount / 1000).toFixed(0)}k</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${r.status === 'full_paid' ? 'text-green-600 bg-green-50' : r.status === 'deposit_paid' ? 'text-blue-600 bg-blue-50' : 'text-orange-600 bg-orange-50'}`}>
                    {r.status === 'full_paid' ? 'Paid' : r.status === 'deposit_paid' ? 'Deposit' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
            {reservations.length === 0 && <div className="px-6 py-12 text-center text-sm text-andy-bronze/40">No reservations</div>}
          </div>
        </div>
      </div>
    </div>
  );
}