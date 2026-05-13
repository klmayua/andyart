'use client';

import { useMemo, useState } from 'react';
import { Landmark, Search, CheckCircle, ArrowUpRight } from 'lucide-react';
import { useClientData } from '@/hooks/useClientData';
import { getSettlements } from '@/lib/payment';
import { SETTLEMENT_STATUS_LABELS, SETTLEMENT_STATUS_COLORS } from '@/types/payment';
import type { SettlementStatus } from '@/types/payment';

export default function OpsSettlementsPage() {
  const settlements = useClientData(() => getSettlements(), []);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<SettlementStatus | 'all'>('all');

  const filtered = settlements.filter((s) => {
    const matchesSearch = s.settlementNumber.toLowerCase().includes(search.toLowerCase()) || s.artistName?.toLowerCase().includes(search.toLowerCase() || '');
    const matchesFilter = filter === 'all' || s.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totals = useMemo(() => {
    const gross = settlements.filter((s) => s.status === 'processed').reduce((sum, s) => sum + s.grossAmount, 0);
    const net = settlements.filter((s) => s.status === 'processed').reduce((sum, s) => sum + s.netAmount, 0);
    const pending = settlements.filter((s) => s.status === 'pending' || s.status === 'in_review').reduce((sum, s) => sum + s.netAmount, 0);
    return { gross, net, pending };
  }, [settlements]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-andy-black">Settlement Processing</h1>
        <p className="text-sm text-andy-bronze mt-1">Artist payouts, commission distributions, and financial reconciliation</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-andy-stone/10 p-4 text-center">
          <p className="text-lg font-bold text-green-600">${(totals.net / 1000).toFixed(0)}k</p>
          <p className="text-xs text-andy-bronze">Net Paid</p>
        </div>
        <div className="bg-white rounded-xl border border-andy-stone/10 p-4 text-center">
          <p className="text-lg font-bold text-andy-black">${(totals.gross / 1000).toFixed(0)}k</p>
          <p className="text-xs text-andy-bronze">Gross Volume</p>
        </div>
        <div className="bg-white rounded-xl border border-andy-stone/10 p-4 text-center">
          <p className="text-lg font-bold text-blue-600">${(totals.pending / 1000).toFixed(0)}k</p>
          <p className="text-xs text-andy-bronze">Pending</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {(['all', 'pending', 'in_review', 'approved', 'processed', 'failed'] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === s ? 'bg-andy-gold text-andy-black' : 'bg-white text-andy-bronze border border-andy-stone/20'}`}>
            {s === 'all' ? 'All' : SETTLEMENT_STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-andy-bronze" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search settlements..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-andy-stone/20 text-sm focus:outline-none focus:ring-2 focus:ring-andy-gold/40" />
      </div>

      <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
        <div className="px-6 py-4 border-b border-andy-stone/10 flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-andy-black">Settlement Records</h2>
          <span className="text-xs text-andy-bronze">{filtered.length} records</span>
        </div>
        <div className="divide-y divide-andy-stone/5">
          {filtered.map((s) => (
            <div key={s.id} className="px-6 py-4 hover:bg-andy-stone/5 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Landmark size={16} className="text-andy-gold" />
                  <div>
                    <p className="text-sm font-semibold text-andy-black">{s.settlementNumber}</p>
                    <p className="text-xs text-andy-bronze/60">{s.artistName || 'Unknown'} · {s.artworkTitle || 'General'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-andy-black">${(s.netAmount / 1000).toFixed(0)}k {s.currency}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${SETTLEMENT_STATUS_COLORS[s.status]}`}>{SETTLEMENT_STATUS_LABELS[s.status]}</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs text-andy-bronze mb-2">
                <div className="bg-andy-stone/5 rounded-lg p-2"><p className="text-[10px] text-andy-bronze/60">Gross</p><p className="font-medium text-andy-black">${(s.grossAmount / 1000).toFixed(0)}k</p></div>
                <div className="bg-andy-stone/5 rounded-lg p-2"><p className="text-[10px] text-andy-bronze/60">Platform</p><p className="font-medium text-andy-black">${(s.platformFee / 1000).toFixed(0)}k</p></div>
                <div className="bg-andy-stone/5 rounded-lg p-2"><p className="text-[10px] text-andy-bronze/60">Payment Fee</p><p className="font-medium text-andy-black">${(s.paymentFee / 1000).toFixed(0)}k</p></div>
                <div className="bg-andy-stone/5 rounded-lg p-2"><p className="text-[10px] text-andy-bronze/60">Tax</p><p className="font-medium text-andy-black">${(s.taxWithheld / 1000).toFixed(0)}k</p></div>
              </div>
              <div className="flex items-center justify-between text-xs text-andy-bronze">
                <span>Period: {new Date(s.periodStart).toLocaleDateString()} — {new Date(s.periodEnd).toLocaleDateString()}</span>
                {s.status === 'pending' && (
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-andy-gold text-andy-black rounded-lg text-xs font-medium hover:bg-andy-gold/80">
                    <CheckCircle size={10} /> Approve
                  </button>
                )}
                {s.status === 'approved' && (
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100">
                    <ArrowUpRight size={10} /> Process
                  </button>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="px-6 py-12 text-center text-sm text-andy-bronze/40">No settlements</div>}
        </div>
      </div>
    </div>
  );
}