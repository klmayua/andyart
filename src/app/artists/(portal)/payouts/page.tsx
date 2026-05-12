'use client';

import { useState, useEffect } from 'react';
import { CreditCard, CheckCircle, Clock, AlertCircle, ArrowRight } from 'lucide-react';
import { useCurrentArtist } from '@/hooks/useCurrentArtist';
import { getPayouts } from '@/lib/artist';
import { PAYOUT_STATUS_LABELS } from '@/types/artist';
import { EmptyStates } from '@/components/EmptyState';
import InlineLoader from '@/components/InlineLoader';

export default function ArtistPayoutsPage() {
  const artist = useCurrentArtist();
  const [payouts, setPayouts] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (!artist) return;
    setPayouts(getPayouts(artist.id));
  }, [artist]);

  if (!artist) {
    return <InlineLoader label="Loading payouts..." />;
  }

  const pending = payouts.filter((p) => p.status === 'pending' || p.status === 'processing');
  const completed = payouts.filter((p) => p.status === 'completed');

  const filtered = filter === 'all' ? payouts : filter === 'pending' ? pending : completed;

  const totalPending = pending.reduce((s, p) => s + p.netAmount, 0);
  const totalCompleted = completed.reduce((s, p) => s + p.netAmount, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-andy-black">Payouts</h1>
        <p className="text-sm text-andy-bronze mt-1">Track pending and completed artist payouts, splits, and tax documents.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Payouts', value: payouts.length, icon: CreditCard },
          { label: 'Pending', value: `$${(totalPending / 1000).toFixed(0)}k`, icon: Clock, color: 'text-andy-gold' },
          { label: 'Completed', value: `$${(totalCompleted / 1000).toFixed(0)}k`, icon: CheckCircle, color: 'text-green-600' },
          { label: 'Total Gross', value: `$${(payouts.reduce((s, p) => s + p.grossAmount, 0) / 1000).toFixed(0)}k`, icon: ArrowRight },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl border border-andy-stone/20 p-5">
            <div className="flex items-center justify-between mb-3">
              <kpi.icon size={18} className="text-andy-gold" />
            </div>
            <p className={`text-xl font-bold ${kpi.color || 'text-andy-black'}`}>{kpi.value}</p>
            <p className="text-xs text-andy-bronze mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: 'all', label: 'All', count: payouts.length },
          { key: 'pending', label: 'Pending', count: pending.length },
          { key: 'completed', label: 'Completed', count: completed.length },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              filter === f.key
                ? 'bg-andy-gold/10 text-andy-gold border border-andy-gold/30'
                : 'bg-white text-andy-bronze border border-andy-stone/20 hover:border-andy-gold/30'
            }`}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-andy-stone/20 p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-serif text-sm font-bold text-andy-black">{p.payoutNumber}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${p.status === 'completed' ? 'bg-green-50 text-green-700' : p.status === 'pending' ? 'bg-andy-gold/10 text-andy-gold' : 'bg-red-50 text-red-600'}`}>
                    {PAYOUT_STATUS_LABELS[p.status]}
                  </span>
                </div>
                <p className="text-xs text-andy-bronze/60">{new Date(p.periodStart).toLocaleDateString()} - {new Date(p.periodEnd).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-andy-gold">${(p.netAmount / 1000).toFixed(0)}k</p>
                <p className="text-[10px] text-andy-bronze/50">{p.currency}</p>
              </div>
            </div>

            {/* Commission Splits */}
            <div className="mb-3">
              {p.commissionSplits.map((s: any, i: number) => (
                <div key={i} className="flex items-center justify-between text-xs py-1">
                  <span className="text-andy-bronze">{s.artworkTitle}</span>
                  <div className="flex gap-3">
                    <span className="text-andy-bronze/50">Gross ${(s.grossAmount / 1000).toFixed(0)}k</span>
                    <span className="text-andy-bronze/50">Fee ${(s.galleryFee / 1000).toFixed(0)}k</span>
                    <span className="text-andy-gold font-semibold">Net ${(s.artistShare / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-andy-stone/5 rounded-xl p-3">
                <p className="text-andy-bronze/50 mb-0.5">Gross</p>
                <p className="font-semibold text-andy-black">${(p.grossAmount / 1000).toFixed(0)}k</p>
              </div>
              <div className="bg-andy-stone/5 rounded-xl p-3">
                <p className="text-andy-bronze/50 mb-0.5">Gallery Fee</p>
                <p className="font-semibold text-andy-black">${(p.galleryFee / 1000).toFixed(0)}k</p>
              </div>
              <div className="bg-andy-stone/5 rounded-xl p-3">
                <p className="text-andy-bronze/50 mb-0.5">Tax</p>
                <p className="font-semibold text-andy-black">${(p.taxWithheld / 1000).toFixed(0)}k</p>
              </div>
              <div className="bg-andy-stone/5 rounded-xl p-3">
                <p className="text-andy-bronze/50 mb-0.5">Method</p>
                <p className="font-semibold text-andy-black capitalize">{p.paymentMethod?.replace('_', ' ') || '—'}</p>
              </div>
            </div>

            {p.processedAt && (
              <div className="mt-3 pt-3 border-t border-andy-stone/10 flex items-center gap-2 text-xs text-green-700">
                <CheckCircle size={12} /> Processed on {new Date(p.processedAt).toLocaleDateString()}
                {p.paymentReference && <span className="text-andy-bronze/50">· Ref: {p.paymentReference}</span>}
              </div>
            )}

            {p.notes && <p className="mt-2 text-xs text-andy-bronze/50 italic">{p.notes}</p>}
          </div>
        ))}
      </div>

      {filtered.length === 0 && <EmptyStates.Payouts />}
    </div>
  );
}
