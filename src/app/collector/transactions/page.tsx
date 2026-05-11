'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, Search, Filter } from 'lucide-react';
import { useCurrentCollectorId } from '@/hooks/useCurrentCollector';
import { getTransactions, getPayments, getEscrowCases } from '@/lib/payment';
import { PAYMENT_STATUS_COLORS, PAYMENT_STATUS_LABELS } from '@/types/payment';
import type { PaymentStatus } from '@/types/payment';

export default function CollectorTransactionsPage() {
  const collectorId = useCurrentCollectorId();
  const transactions = useMemo(() => collectorId ? getTransactions({ collectorId }) : [], [collectorId]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('all');

  const filtered = transactions.filter((t) => {
    const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || t.type === filter;
    return matchesSearch && matchesFilter;
  });

  if (!collectorId) {
    return <div className="text-center py-20 text-sm text-andy-bronze">Loading...</div>;
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-andy-black mb-6">Transaction History</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['all', 'payment_in', 'deposit', 'escrow_fund', 'escrow_release', 'refund', 'fee'].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f ? 'bg-andy-gold text-andy-black' : 'bg-white text-andy-bronze border border-andy-stone/20'}`}>
            {f === 'all' ? 'All' : f.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>

      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-andy-bronze" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search transactions..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-andy-stone/20 text-sm focus:outline-none focus:ring-2 focus:ring-andy-gold/40" />
      </div>

      <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
        <div className="px-6 py-4 border-b border-andy-stone/10 flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-andy-black">All Transactions</h2>
          <span className="text-xs text-andy-bronze">{filtered.length} records</span>
        </div>
        <div className="divide-y divide-andy-stone/5">
          {filtered.map((t) => (
            <div key={t.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.type === 'payment_in' || t.type === 'deposit' ? 'bg-green-50' : t.type === 'refund' ? 'bg-red-50' : t.type === 'fee' || t.type === 'commission' ? 'bg-orange-50' : 'bg-blue-50'}`}>
                  {t.type === 'payment_in' || t.type === 'deposit' ? <ArrowUpRight size={14} className="text-green-600" /> :
                   t.type === 'refund' ? <ArrowDownRight size={14} className="text-red-500" /> :
                   t.type === 'fee' || t.type === 'commission' ? <Minus size={14} className="text-orange-600" /> :
                   <ArrowUpRight size={14} className="text-blue-600" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-andy-black">{t.description}</p>
                  <p className="text-xs text-andy-bronze/60">{t.method} · {new Date(t.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${t.type === 'payment_in' || t.type === 'deposit' ? 'text-green-600' : t.type === 'refund' ? 'text-red-500' : 'text-andy-black'}`}>
                  {t.type === 'payment_in' || t.type === 'deposit' ? '+' : t.type === 'refund' ? '-' : ''}${(t.amount / 1000).toFixed(0)}k
                </p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${PAYMENT_STATUS_COLORS[t.status]}`}>{PAYMENT_STATUS_LABELS[t.status]}</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="px-6 py-12 text-center text-sm text-andy-bronze/40">No transactions</div>}
        </div>
      </div>
    </div>
  );
}