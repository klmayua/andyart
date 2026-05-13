'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, Receipt, Shield, Landmark, ArrowRight, DollarSign, AlertCircle, Clock } from 'lucide-react';
import { getPaymentStats, getInvoices, getEscrowCases, getSettlements, getTransactions } from '@/lib/payment';
import { INVOICE_STATUS_COLORS, INVOICE_STATUS_LABELS, ESCROW_STATUS_COLORS, ESCROW_STATUS_LABELS } from '@/types/payment';

export default function OpsPaymentsPage() {
  const [stats, setStats] = useState({ totalVolume: 0, pendingVolume: 0, completedPayments: 0, pendingInvoices: 0, overdueInvoices: 0, paidInvoices: 0, escrowFunded: 0, escrowPending: 0, escrowReleased: 0, escrowDisputed: 0, escrowBalance: 0, pendingSettlements: 0, activeReservations: 0, totalReservations: 0 });
  const [recentInvoices, setRecentInvoices] = useState([] as any[]);
  const [recentEscrow, setRecentEscrow] = useState([] as any[]);
  const [recentTx, setRecentTx] = useState([] as any[]);

  useEffect(() => {
    setStats(getPaymentStats());
    setRecentInvoices(getInvoices().slice(0, 5));
    setRecentEscrow(getEscrowCases().slice(0, 5));
    setRecentTx(getTransactions().slice(0, 5));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-andy-black">Financial Operations</h1>
        <p className="text-sm text-andy-bronze mt-1">Revenue management, invoicing, and settlement processing</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Volume', value: `$${(stats.totalVolume / 1000).toFixed(0)}k`, sub: `${stats.completedPayments} completed`, icon: TrendingUp, href: '/ops/payments' },
          { label: 'Pending Invoices', value: stats.pendingInvoices, sub: `${stats.overdueInvoices} overdue`, icon: Receipt, href: '/ops/payments/invoices' },
          { label: 'Escrow Balance', value: `$${(stats.escrowBalance / 1000).toFixed(0)}k`, sub: `${stats.escrowFunded} funded`, icon: Shield, href: '/ops/payments/escrow' },
          { label: 'Pending Settlements', value: stats.pendingSettlements, sub: 'In pipeline', icon: Landmark, href: '/ops/payments/settlements' },
        ].map((kpi) => (
          <Link key={kpi.label} href={kpi.href} className="bg-white rounded-2xl border border-andy-stone/20 p-5 hover:border-andy-gold/30 hover:shadow-premium transition-all group">
            <div className="flex items-center justify-between mb-3">
              <kpi.icon size={20} className="text-andy-gold" />
              <ArrowRight size={14} className="text-andy-bronze/40 group-hover:text-andy-gold transition-colors" />
            </div>
            <p className="text-2xl font-bold text-andy-black">{kpi.value}</p>
            <p className="text-xs text-andy-bronze mt-0.5">{kpi.label}</p>
            <p className="text-xs text-andy-bronze/50">{kpi.sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <h2 className="font-serif text-lg font-bold text-andy-black">Recent Invoices</h2>
            <Link href="/ops/payments/invoices" className="text-xs text-andy-bronze hover:text-andy-gold">View all →</Link>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {recentInvoices.map((i) => (
              <div key={i.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{i.invoiceNumber}</p>
                  <p className="text-xs text-andy-bronze/60">{i.collectorName} · {i.artworkTitle || 'General'}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-andy-black">${(i.total / 1000).toFixed(0)}k</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${INVOICE_STATUS_COLORS[i.status]}`}>{INVOICE_STATUS_LABELS[i.status]}</span>
                </div>
              </div>
            ))}
            {recentInvoices.length === 0 && <div className="px-6 py-12 text-center text-sm text-andy-bronze/40">No invoices</div>}
          </div>
        </div>

        {/* Escrow */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <h2 className="font-serif text-lg font-bold text-andy-black">Escrow Activity</h2>
            <Link href="/ops/payments/escrow" className="text-xs text-andy-bronze hover:text-andy-gold">View all →</Link>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {recentEscrow.map((e) => (
              <div key={e.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{e.escrowNumber}</p>
                  <p className="text-xs text-andy-bronze/60">{e.buyerName} · {e.artworkTitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-andy-black">${(e.amount / 1000).toFixed(0)}k</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${ESCROW_STATUS_COLORS[e.status]}`}>{ESCROW_STATUS_LABELS[e.status]}</span>
                </div>
              </div>
            ))}
            {recentEscrow.length === 0 && <div className="px-6 py-12 text-center text-sm text-andy-bronze/40">No escrow</div>}
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <h2 className="font-serif text-lg font-bold text-andy-black">Recent Transactions</h2>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {recentTx.map((t) => (
              <div key={t.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{t.description}</p>
                  <p className="text-xs text-andy-bronze/60">{t.type.replace('_', ' ')} · {t.method}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-andy-black">${(t.amount / 1000).toFixed(0)}k</p>
                  <p className="text-[10px] text-andy-bronze/50">{new Date(t.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {recentTx.length === 0 && <div className="px-6 py-12 text-center text-sm text-andy-bronze/40">No transactions</div>}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
          <h2 className="font-serif text-lg font-bold text-andy-black mb-4">Alerts</h2>
          <div className="space-y-3">
            {stats.overdueInvoices > 0 && (
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                <AlertCircle size={16} className="text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-700">{stats.overdueInvoices} overdue invoice{stats.overdueInvoices > 1 ? 's' : ''}</p>
                  <p className="text-xs text-red-500">Payment reminders sent</p>
                </div>
              </div>
            )}
            {stats.escrowDisputed > 0 && (
              <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
                <AlertCircle size={16} className="text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-700">{stats.escrowDisputed} disputed escrow</p>
                  <p className="text-xs text-orange-500">Requires review</p>
                </div>
              </div>
            )}
            {stats.pendingSettlements > 0 && (
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <Clock size={16} className="text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-700">{stats.pendingSettlements} pending settlement{stats.pendingSettlements > 1 ? 's' : ''}</p>
                  <p className="text-xs text-blue-500">Awaiting approval</p>
                </div>
              </div>
            )}
            {stats.overdueInvoices === 0 && stats.escrowDisputed === 0 && stats.pendingSettlements === 0 && (
              <div className="text-center py-8 text-sm text-andy-bronze/40">No alerts</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}