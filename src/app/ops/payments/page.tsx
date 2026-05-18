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
        <h1 className="font-serif text-3xl font-bold text-[#F5EBDD]">Financial Operations</h1>
        <p className="text-sm text-[#B9A48A] mt-1">Payment processing and financial tracking</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Volume', value: `$${(stats.totalVolume / 1000).toFixed(0)}k`, sub: `${stats.completedPayments} completed`, icon: TrendingUp, href: '/ops/payments' },
          { label: 'Pending Invoices', value: stats.pendingInvoices, sub: `${stats.overdueInvoices} overdue`, icon: Receipt, href: '/ops/payments/invoices' },
          { label: 'Escrow Balance', value: `$${(stats.escrowBalance / 1000).toFixed(0)}k`, sub: `${stats.escrowFunded} funded`, icon: Shield, href: '/ops/payments/escrow' },
          { label: 'Pending Settlements', value: stats.pendingSettlements, sub: 'In pipeline', icon: Landmark, href: '/ops/payments/settlements' },
        ].map((kpi) => (
          <Link key={kpi.label} href={kpi.href} className="bg-[linear-gradient(180deg,rgba(28,23,20,0.94)_0%,rgba(22,18,16,0.98)_100%)] rounded-[26px] border border-[rgba(214,170,92,0.08)] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.16)] hover:border-[rgba(214,170,92,0.16)] hover:bg-[linear-gradient(180deg,rgba(32,26,23,0.96)_0%,rgba(24,20,18,1)_100%)] transition-[border,background] duration-200 ease group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-[rgba(214,170,92,0.06)] border border-[rgba(214,170,92,0.10)] flex items-center justify-center">
                <kpi.icon size={16} className="text-[#C89B4F]" />
              </div>
              <ArrowRight size={14} className="text-[#9D8466] group-hover:text-[#C89B4F] transition-colors" />
            </div>
            <p className="text-2xl font-bold text-[#F3E7D3]">{kpi.value}</p>
            <p className="text-xs text-[#9D8466] mt-0.5">{kpi.label}</p>
            <p className="text-xs text-[#73614E]">{kpi.sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <div className="bg-[linear-gradient(180deg,rgba(28,23,20,0.94)_0%,rgba(22,18,16,0.98)_100%)] rounded-[26px] border border-[rgba(214,170,92,0.08)] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.16)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-bold text-[#E8D8C2]">Recent Invoices</h2>
            <Link href="/ops/payments/invoices" className="text-xs text-[#7B6854] hover:text-[#C89B4F]">View all →</Link>
          </div>
          <div className="divide-y divide-[rgba(255,255,255,0.03)]">
            {recentInvoices.map((i) => (
              <div key={i.id} className="flex items-center justify-between px-6 py-4 hover:bg-[rgba(255,255,255,0.025)] transition-colors">
                <div>
                  <p className="text-sm font-semibold text-[#F5EBDD]">{i.invoiceNumber}</p>
                  <p className="text-xs text-[#7B6854]">{i.collectorName} · {i.artworkTitle || 'General'}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#FFF3DF]">${(i.total / 1000).toFixed(0)}k</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${INVOICE_STATUS_COLORS[i.status]}`}>{INVOICE_STATUS_LABELS[i.status]}</span>
                </div>
              </div>
            ))}
            {recentInvoices.length === 0 && <div className="px-6 py-12 text-center text-sm text-[#7B6854]/40">No invoices</div>}
          </div>
        </div>

        {/* Escrow */}
        <div className="bg-[linear-gradient(180deg,rgba(28,23,20,0.94)_0%,rgba(22,18,16,0.98)_100%)] rounded-[26px] border border-[rgba(214,170,92,0.08)] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.16)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-bold text-[#E8D8C2]">Escrow Activity</h2>
            <Link href="/ops/payments/escrow" className="text-xs text-[#7B6854] hover:text-[#C89B4F]">View all →</Link>
          </div>
          <div className="divide-y divide-[rgba(255,255,255,0.03)]">
            {recentEscrow.map((e) => (
              <div key={e.id} className="flex items-center justify-between py-4 hover:bg-[rgba(255,255,255,0.025)] transition-colors">
                <div>
                  <p className="text-sm font-semibold text-[#F5EBDD]">{e.escrowNumber}</p>
                  <p className="text-xs text-[#7B6854]">{e.buyerName} · {e.artworkTitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#FFF3DF]">${(e.amount / 1000).toFixed(0)}k</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${ESCROW_STATUS_COLORS[e.status]}`}>{ESCROW_STATUS_LABELS[e.status]}</span>
                </div>
              </div>
            ))}
            {recentEscrow.length === 0 && <div className="py-12 text-center text-sm text-[#7B6854]/40">No escrow</div>}
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-[linear-gradient(180deg,rgba(28,23,20,0.94)_0%,rgba(22,18,16,0.98)_100%)] rounded-[26px] border border-[rgba(214,170,92,0.08)] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.16)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-bold text-[#E8D8C2]">Recent Transactions</h2>
          </div>
          <div className="divide-y divide-[rgba(255,255,255,0.03)]">
            {recentTx.map((t) => (
              <div key={t.id} className="flex items-center justify-between py-4 hover:bg-[rgba(255,255,255,0.025)] transition-colors">
                <div>
                  <p className="text-sm font-semibold text-[#F5EBDD]">{t.description}</p>
                  <p className="text-xs text-[#7B6854]">{t.type.replace('_', ' ')} · {t.method}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#FFF3DF]">${(t.amount / 1000).toFixed(0)}k</p>
                  <p className="text-[10px] text-[#7B6854]/50">{new Date(t.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {recentTx.length === 0 && <div className="py-12 text-center text-sm text-[#7B6854]/40">No transactions</div>}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-[linear-gradient(180deg,rgba(28,23,20,0.94)_0%,rgba(22,18,16,0.98)_100%)] rounded-[26px] border border-[rgba(214,170,92,0.08)] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.16)]">
          <h2 className="font-serif text-lg font-bold text-[#E8D8C2] mb-4">Alerts</h2>
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