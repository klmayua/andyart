'use client';

import { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, Milestone } from 'lucide-react';
import { useCurrentArtist } from '@/hooks/useCurrentArtist';
import { getCommissions } from '@/lib/artist';
import { COMMISSION_STATUS_LABELS } from '@/types/artist';
import { EmptyStates } from '@/components/EmptyState';
import InlineLoader from '@/components/InlineLoader';

export default function ArtistCommissionsPage() {
  const artist = useCurrentArtist();
  const [commissions, setCommissions] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (!artist) return;
    setCommissions(getCommissions(artist.id));
  }, [artist]);

  if (!artist) {
    return <InlineLoader label="Loading commissions..." />;
  }

  const active = commissions.filter((c) => c.status === 'in_progress' || c.status === 'milestone_1' || c.status === 'milestone_2' || c.status === 'milestone_3');
  const completed = commissions.filter((c) => c.status === 'delivered' || c.status === 'approved');

  const filtered = filter === 'all' ? commissions : filter === 'active' ? active : completed;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-andy-black">Commissions</h1>
        <p className="text-sm text-andy-bronze mt-1">Manage commission briefs, milestones, and collector feedback.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: 'all', label: 'All', count: commissions.length },
          { key: 'active', label: 'Active', count: active.length },
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
        {filtered.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl border border-andy-stone/20 p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-serif text-sm font-bold text-andy-black">{c.commissionNumber}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${c.status === 'delivered' || c.status === 'approved' ? 'bg-green-50 text-green-700' : c.status === 'cancelled' ? 'bg-red-50 text-red-600' : 'bg-andy-gold/10 text-andy-gold'}`}>
                    {COMMISSION_STATUS_LABELS[c.status]}
                  </span>
                </div>
                <p className="text-xs text-andy-bronze/60">{c.collectorName} · Budget ${(c.budget / 1000).toFixed(0)}k</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-andy-bronze">Due</p>
                <p className="text-xs font-semibold text-andy-black">{new Date(c.targetDeliveryDate).toLocaleDateString()}</p>
              </div>
            </div>

            <p className="text-xs text-andy-bronze leading-relaxed mb-4 bg-andy-stone/5 rounded-xl p-3">{c.brief}</p>

            {/* Milestones */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-andy-black mb-2 flex items-center gap-1.5">
                <Milestone size={12} className="text-andy-gold" /> Milestones
              </h4>
              <div className="space-y-2">
                {c.milestones.map((m: any) => (
                  <div key={m.id} className="flex items-center gap-3">
                    {m.status === 'completed' ? (
                      <CheckCircle size={14} className="text-green-600 flex-shrink-0" />
                    ) : m.status === 'overdue' ? (
                      <AlertCircle size={14} className="text-red-500 flex-shrink-0" />
                    ) : (
                      <Clock size={14} className="text-andy-bronze/40 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className={`text-xs ${m.status === 'completed' ? 'text-andy-black line-through opacity-60' : 'text-andy-black'}`}>{m.title}</p>
                      <p className="text-[10px] text-andy-bronze/50">{m.description}</p>
                    </div>
                    <span className="text-[10px] text-andy-bronze/40">{new Date(m.dueDate).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Approvals */}
            {c.approvals.length > 0 && (
              <div className="pt-3 border-t border-andy-stone/10">
                <h4 className="text-xs font-semibold text-andy-black mb-2">Approvals</h4>
                <div className="flex flex-wrap gap-2">
                  {c.approvals.map((a: any, i: number) => (
                    <span key={i} className="text-[10px] px-2 py-1 bg-green-50 text-green-700 rounded-full flex items-center gap-1">
                      <CheckCircle size={10} /> {a.stage} · {new Date(a.approvedAt).toLocaleDateString()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {c.collectorFeedback && (
              <div className="mt-3 pt-3 border-t border-andy-stone/10">
                <p className="text-xs text-andy-bronze italic">&ldquo;{c.collectorFeedback}&rdquo;</p>
                <p className="text-[10px] text-andy-bronze/50 mt-1">— {c.collectorName}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && <EmptyStates.Commissions />}
    </div>
  );
}
