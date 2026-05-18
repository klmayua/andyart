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
        <h1 className="font-serif text-2xl font-bold text-[#F5EBDD]">Settlements</h1>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[linear-gradient(180deg,rgba(28,23,20,0.94)_0%,rgba(22,18,16,0.98)_100%)] rounded-[20px] border border-[rgba(214,170,92,0.08)] p-4 text-center shadow-[0_2px_10px_rgba(0,0,0,0.16)]">
          <p className="text-lg font-bold text-green-400">${(totals.net / 1000).toFixed(0)}k</p>
          <p className="text-xs text-[#7B6854]">Net Paid</p>
        </div>
        <div className="bg-[linear-gradient(180deg,rgba(28,23,20,0.94)_0%,rgba(22,18,16,0.98)_100%)] rounded-[20px] border border-[rgba(214,170,92,0.08)] p-4 text-center shadow-[0_2px_10px_rgba(0,0,0,0.16)]">
          <p className="text-lg font-bold text-[#F5EBDD]">${(totals.gross / 1000).toFixed(0)}k</p>
          <p className="text-xs text-[#7B6854]">Gross Volume</p>
        </div>
        <div className="bg-[linear-gradient(180deg,rgba(28,23,20,0.94)_0%,rgba(22,18,16,0.98)_100%)] rounded-[20px] border border-[rgba(214,170,92,0.08)] p-4 text-center shadow-[0_2px_10px_rgba(0,0,0,0.16)]">
          <p className="text-lg font-bold text-blue-400">${(totals.pending / 1000).toFixed(0)}k</p>
          <p className="text-xs text-[#7B6854]">Pending</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {(['all', 'pending', 'in_review', 'approved', 'processed', 'failed'] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === s ? 'bg-[#C89B4F] text-[#0A0A0A]' : 'bg-[rgba(255,255,255,0.05)] text-[#7B6854] border border-[rgba(214,170,92,0.15)]'}`}>
            {s === 'all' ? 'All' : SETTLEMENT_STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7B6854]" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search settlements..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[rgba(214,170,92,0.15)] text-sm bg-[rgba(255,255,255,0.05)] text-[#F5EBDD] focus:outline-none focus:ring-2 focus:ring-[#C89B4F]/40" />
      </div>

      <div className="bg-[linear-gradient(180deg,rgba(28,23,20,0.94)_0%,rgba(22,18,16,0.98)_100%)] rounded-[26px] border border-[rgba(214,170,92,0.08)] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.16)]">
        <div className="px-6 py-4 border-b border-[rgba(214,170,92,0.08)] flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-[#E8D8C2]">Settlement Records</h2>
          <span className="text-xs text-[#7B6854]">{filtered.length} records</span>
        </div>
        <div className="divide-y divide-[rgba(255,255,255,0.03)]">
          {filtered.map((s) => (
            <div key={s.id} className="px-6 py-4 hover:bg-[rgba(255,255,255,0.025)] transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Landmark size={16} className="text-[#C89B4F]" />
                  <div>
                    <p className="text-sm font-semibold text-[#F5EBDD]">{s.settlementNumber}</p>
                    <p className="text-xs text-[#7B6854]/60">{s.artistName || 'Unknown'} · {s.artworkTitle || 'General'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#FFF3DF]">${(s.netAmount / 1000).toFixed(0)}k {s.currency}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${SETTLEMENT_STATUS_COLORS[s.status]}`}>{SETTLEMENT_STATUS_LABELS[s.status]}</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs text-[#7B6854] mb-2">
                <div className="bg-[rgba(255,255,255,0.03)] rounded-lg p-2"><p className="text-[10px] text-[#7B6854]/60">Gross</p><p className="font-medium text-[#F5EBDD]">${(s.grossAmount / 1000).toFixed(0)}k</p></div>
                <div className="bg-[rgba(255,255,255,0.03)] rounded-lg p-2"><p className="text-[10px] text-[#7B6854]/60">Platform</p><p className="font-medium text-[#F5EBDD]">${(s.platformFee / 1000).toFixed(0)}k</p></div>
                <div className="bg-[rgba(255,255,255,0.03)] rounded-lg p-2"><p className="text-[10px] text-[#7B6854]/60">Payment Fee</p><p className="font-medium text-[#F5EBDD]">${(s.paymentFee / 1000).toFixed(0)}k</p></div>
                <div className="bg-[rgba(255,255,255,0.03)] rounded-lg p-2"><p className="text-[10px] text-[#7B6854]/60">Tax</p><p className="font-medium text-[#F5EBDD]">${(s.taxWithheld / 1000).toFixed(0)}k</p></div>
              </div>
              <div className="flex items-center justify-between text-xs text-[#7B6854]">
                <span>Period: {new Date(s.periodStart).toLocaleDateString()} — {new Date(s.periodEnd).toLocaleDateString()}</span>
                {s.status === 'pending' && (
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-[#C89B4F] text-[#0A0A0A] rounded-lg text-xs font-medium hover:bg-[#C89B4F]/80">
                    <CheckCircle size={10} /> Approve
                  </button>
                )}
                {s.status === 'approved' && (
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-xs font-medium hover:bg-green-500/20">
                    <ArrowUpRight size={10} /> Process
                  </button>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="px-6 py-12 text-center text-sm text-[#7B6854]/40">No settlements</div>}
        </div>
      </div>
    </div>
  );
}