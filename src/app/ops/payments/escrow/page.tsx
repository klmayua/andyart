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
        <h1 className="font-serif text-2xl font-bold text-andy-black">Escrow</h1>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-andy-stone/10 p-4 text-center">
          <p className="text-lg font-bold text-andy-black">{counts.funded || 0}</p>
          <p className="text-xs text-andy-bronze">Funded</p>
        </div>
        <div className="bg-white rounded-xl border border-andy-stone/10 p-4 text-center">
          <p className="text-lg font-bold text-andy-black">{counts.released || 0}</p>
          <p className="text-xs text-andy-bronze">Released</p>
        </div>
        <div className="bg-white rounded-xl border border-andy-stone/10 p-4 text-center">
          <p className="text-lg font-bold text-andy-black">{counts.disputed || 0}</p>
          <p className="text-xs text-andy-bronze">Disputed</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {(['all', 'pending', 'funded', 'released', 'disputed', 'refunded'] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === s ? 'bg-andy-gold text-andy-black' : 'bg-white text-andy-bronze border border-andy-stone/20'}`}>
            {s === 'all' ? 'All' : ESCROW_STATUS_LABELS[s]} ({counts[s] || 0})
          </button>
        ))}
      </div>

      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-andy-bronze" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search escrow..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-andy-stone/20 text-sm focus:outline-none focus:ring-2 focus:ring-andy-gold/40" />
      </div>

      <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
        <div className="px-6 py-4 border-b border-andy-stone/10 flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-andy-black">Escrow Cases</h2>
          <span className="text-xs text-andy-bronze">{filtered.length} records</span>
        </div>
        <div className="divide-y divide-andy-stone/5">
          {filtered.map((e) => (
            <div key={e.id} className="px-6 py-4 hover:bg-andy-stone/5 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Shield size={16} className="text-andy-gold" />
                  <div>
                    <p className="text-sm font-semibold text-andy-black">{e.escrowNumber}</p>
                    <p className="text-xs text-andy-bronze/60">{e.buyerName} → {e.sellerName || 'Seller'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-andy-black">${(e.amount / 1000).toFixed(0)}k {e.currency}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${ESCROW_STATUS_COLORS[e.status]}`}>{ESCROW_STATUS_LABELS[e.status]}</span>
                </div>
              </div>
              <p className="text-xs text-andy-bronze mb-2">{e.releaseConditions}</p>
              <div className="flex items-center gap-2">
                {e.status === 'funded' && (
                  <button onClick={() => handleAction(e.id, 'released')} className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100">
                    <CheckCircle size={10} /> Release
                  </button>
                )}
                {e.status === 'funded' && (
                  <button onClick={() => handleAction(e.id, 'disputed')} className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100">
                    <XCircle size={10} /> Dispute
                  </button>
                )}
                {e.status === 'disputed' && (
                  <button onClick={() => handleAction(e.id, 'refunded')} className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-100">
                    <RotateCcw size={10} /> Refund
                  </button>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="px-6 py-12 text-center text-sm text-andy-bronze/40">No escrow cases</div>}
        </div>
      </div>
    </div>
  );
}