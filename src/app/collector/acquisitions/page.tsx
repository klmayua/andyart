'use client';

import { useMemo } from 'react';
import { ShoppingBag, TrendingUp, Shield, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { useCurrentCollectorId } from '@/hooks/useCurrentCollector';
import { getAcquisitions } from '@/lib/collector';

export default function CollectorAcquisitionsPage() {
  const collectorId = useCurrentCollectorId();
  const acq = useMemo(() => collectorId ? getAcquisitions(collectorId) : [], [collectorId]);

  const totalValue = acq.reduce((s, a) => s + a.purchasePrice, 0);
  const currentValue = acq.reduce((s, a) => s + (a.currentValuation || a.purchasePrice), 0);
  const appreciation = totalValue > 0 ? Math.round(((currentValue - totalValue) / totalValue) * 100) : 0;

  if (!collectorId) {
    return <div className="text-center py-20 text-sm text-andy-bronze">Loading...</div>;
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-andy-black mb-6">Acquisition History</h1>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-andy-stone/10 p-4 text-center">
          <p className="text-lg font-bold text-andy-black">{acq.length}</p>
          <p className="text-xs text-andy-bronze">Total Acquisitions</p>
        </div>
        <div className="bg-white rounded-xl border border-andy-stone/10 p-4 text-center">
          <p className="text-lg font-bold text-andy-black">${(totalValue / 1000).toFixed(0)}k</p>
          <p className="text-xs text-andy-bronze">Purchase Value</p>
        </div>
        <div className="bg-white rounded-xl border border-andy-stone/10 p-4 text-center">
          <div className="flex items-center justify-center gap-1">
            <p className="text-lg font-bold text-andy-black">{appreciation > 0 ? '+' : ''}{appreciation}%</p>
            {appreciation > 0 ? <ArrowUpRight size={14} className="text-green-500" /> : appreciation < 0 ? <ArrowDownRight size={14} className="text-red-500" /> : <Minus size={14} className="text-andy-bronze" />}
          </div>
          <p className="text-xs text-andy-bronze">Appreciation</p>
        </div>
      </div>

      {/* Acquisitions List */}
      <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
        <div className="px-6 py-4 border-b border-andy-stone/10">
          <h2 className="font-serif text-lg font-bold text-andy-black">All Acquisitions</h2>
        </div>
        <div className="divide-y divide-andy-stone/5">
          {acq.map((a) => {
            const valDiff = (a.currentValuation || a.purchasePrice) - a.purchasePrice;
            const valPct = a.purchasePrice > 0 ? Math.round((valDiff / a.purchasePrice) * 100) : 0;
            return (
              <div key={a.id} className="px-6 py-5 hover:bg-andy-stone/5 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-andy-black">{a.artworkTitle}</p>
                    <p className="text-xs text-andy-bronze/60">{a.artistName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-andy-black">${(a.purchasePrice / 1000).toFixed(0)}k</p>
                    <p className="text-[10px] text-andy-bronze">{new Date(a.acquisitionDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-andy-bronze">
                  <span className="flex items-center gap-1 capitalize"><ShoppingBag size={12} /> {a.source.replace('_', ' ')}</span>
                  <span className="flex items-center gap-1 capitalize"><Shield size={12} /> {a.insuranceStatus}</span>
                  {a.currentValuation && (
                    <span className={`flex items-center gap-1 ${valPct >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      <TrendingUp size={12} /> Now ${(a.currentValuation / 1000).toFixed(0)}k ({valPct > 0 ? '+' : ''}{valPct}%)
                    </span>
                  )}
                  {a.displayLocation && <span>· {a.displayLocation}</span>}
                </div>
                {a.notes && <p className="text-xs text-andy-bronze/50 mt-2 italic">&ldquo;{a.notes}&rdquo;</p>}
              </div>
            );
          })}
          {acq.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-andy-bronze/40">No acquisitions yet</div>
          )}
        </div>
      </div>
    </div>
  );
}