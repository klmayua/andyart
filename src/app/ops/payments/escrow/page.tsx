'use client';

import { useMemo, useState } from 'react';
import { Shield, Search, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { getEscrowCases, updateEscrowStatus } from '@/lib/payment';
import { ESCROW_STATUS_LABELS, ESCROW_STATUS_COLORS } from '@/types/payment';
import type { EscrowStatus } from '@/types/payment';

export default function OpsEscrowPage() {
  const [escrow, setEscrow] = useState(() => getEscrowCases());
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<EscrowStatus | 'all'>('all');

  const filtered = escrow.filter((e) => {
    const matchesSearch = e.escrowNumber.toLowerCase().includes(search.toLowerCase()) || e.buyerName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || e.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleAction = (id: string, status: EscrowStatus) => {
    updateEscrowStatus(id, status);
    setEscrow(getEscrowCases());
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const e of escrow) { c[e.status] = (c[e.status] || 0) + 1; }
    return c;
  }, [escrow]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-[#F5EBDD]">Escrow</h1>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[linear-gradient(180deg,rgba(28,23,20,0.94)_0%,rgba(22,18,16,0.98)_100%)] rounded-[20px] border border-[rgba(214,170,92,0.08)] p-4 text-center shadow-[0_2px_10px_rgba(0,0,0,0.16)]">
          <p className="text-lg font-bold text-[#FFF3DF]">{counts.funded || 0}</p>
          <p className="text-xs text-[#7B6854]">Funded</p>
        </div>
        <div className="bg-[linear-gradient(180deg,rgba(28,23,20,0.94)_0%,rgba(22,18,16,0.98)_100%)] rounded-[20px] border border-[rgba(214,170,92,0.08)] p-4 text-center shadow-[0_2px_10px_rgba(0,0,0,0.16)]">
          <p className="text-lg font-bold text-[#FFF3DF]">{counts.released || 0}</p>
          <p className="text-xs text-[#7B6854]">Released</p>
        </div>
        <div className="bg-[linear-gradient(180deg,rgba(28,23,20,0.94)_0%,rgba(22,18,16,0.98)_100%)] rounded-[20px] border border-[rgba(214,170,92,0.08)] p-4 text-center shadow-[0_2px_10px_rgba(0,0,0,0.16)]">
          <p className="text-lg font-bold text-[#FFF3DF]">{counts.disputed || 0}</p>
          <p className="text-xs text-[#7B6854]">Disputed</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {(['all', 'pending', 'funded', 'released', 'disputed', 'refunded'] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === s ? 'bg-[#C89B4F] text-[#0A0A0A]' : 'bg-[rgba(34,29,25,0.88)] text-[#B9A48A] border border-[rgba(214,170,92,0.15)]'}`}>
            {s === 'all' ? 'All' : ESCROW_STATUS_LABELS[s]} ({counts[s] || 0})
          </button>
        ))}
      </div>

      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7B6854]" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search escrow..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[rgba(214,170,92,0.15)] text-sm bg-[rgba(255,255,255,0.05)] text-[#F5EBDD] placeholder:text-[#7B6854] focus:outline-none focus:ring-2 focus:ring-[#C89B4F]/40" />
      </div>

      <div className="bg-[linear-gradient(180deg,rgba(28,23,20,0.94)_0%,rgba(22,18,16,0.98)_100%)] rounded-[26px] border border-[rgba(214,170,92,0.08)] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.16)]">
        <div className="px-6 py-4 border-b border-[rgba(214,170,92,0.08)] flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-[#E8D8C2]">Escrow Cases</h2>
          <span className="text-xs text-[#7B6854]">{filtered.length} records</span>
        </div>
        <div className="divide-y divide-[rgba(255,255,255,0.03)]">
          {filtered.map((e) => (
            <div key={e.id} className="px-6 py-4 hover:bg-[rgba(255,255,255,0.025)] transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Shield size={16} className="text-[#C89B4F]" />
                  <div>
                    <p className="text-sm font-semibold text-[#F5EBDD]">{e.escrowNumber}</p>
                    <p className="text-xs text-[#7B6854]">{e.buyerName} → {e.sellerName || 'Seller'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#FFF3DF]">${(e.amount / 1000).toFixed(0)}k {e.currency}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${ESCROW_STATUS_COLORS[e.status]}`}>{ESCROW_STATUS_LABELS[e.status]}</span>
                </div>
              </div>
              <p className="text-xs text-[#7B6854] mb-2">{e.releaseConditions}</p>
              <div className="flex items-center gap-2">
                {e.status === 'funded' && (
                  <button onClick={() => handleAction(e.id, 'released')} className="flex items-center gap-1 px-3 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-xs font-medium hover:bg-green-500/20">
                    <CheckCircle size={10} /> Release
                  </button>
                )}
                {e.status === 'funded' && (
                  <button onClick={() => handleAction(e.id, 'disputed')} className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs font-medium hover:bg-red-500/20">
                    <XCircle size={10} /> Dispute
                  </button>
                )}
                {e.status === 'disputed' && (
                  <button onClick={() => handleAction(e.id, 'refunded')} className="flex items-center gap-1 px-3 py-1.5 bg-gray-500/10 text-gray-400 border border-gray-500/20 rounded-lg text-xs font-medium hover:bg-gray-500/20">
                    <RotateCcw size={10} /> Refund
                  </button>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="px-6 py-12 text-center text-sm text-[#7B6854]/40">No escrow cases</div>}
        </div>
      </div>
    </div>
  );
}