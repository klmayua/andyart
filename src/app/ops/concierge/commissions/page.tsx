'use client';

import { useState, useMemo } from 'react';
import { CheckCircle, Circle, AlertCircle, X, ChevronRight, MessageCircle } from 'lucide-react';
import { useClientData } from '@/hooks/useClientData';
import { getAllCommissions, updateCommissionStatus, updateCommissionProgress } from '@/lib/concierge';
import type { CommissionCase } from '@/types/concierge';

const STATUS_COLORS: Record<string, string> = {
  brief_received: 'bg-blue-100 text-blue-800',
  artist_matching: 'bg-purple-100 text-purple-800',
  proposal_sent: 'bg-yellow-100 text-yellow-800',
  contract_review: 'bg-indigo-100 text-indigo-800',
  in_progress: 'bg-orange-100 text-orange-800',
  quality_check: 'bg-cyan-100 text-cyan-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-100 text-gray-500',
};

const STEPS = ['brief_received','artist_matching','proposal_sent','contract_review','in_progress','quality_check','delivered'];

export default function CommissionsPage() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<CommissionCase | null>(null);

  const all = useClientData(() => getAllCommissions(), [], [selected]);

  const filtered = useMemo(() => {
    if (filter === 'all') return [...all].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    if (filter === 'active') return all.filter((c) => !['delivered','cancelled'].includes(c.status));
    if (filter === 'open') return all.filter((c) => c.status === 'brief_received' || c.status === 'artist_matching' || c.status === 'proposal_sent');
    return all.filter((c) => c.status === filter);
  }, [all, filter]);

  const handleStatus = (id: string, s: CommissionCase['status']) => {
    updateCommissionStatus(id, s);
    setSelected((prev) => prev ? { ...prev, status: s } : null);
  };

  const handleProgress = (id: string, p: number) => {
    updateCommissionProgress(id, p);
    setSelected((prev) => prev ? { ...prev, progress: p } : null);
  };

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#F5EBDD]">Commissions</h1>
          <p className="text-sm text-[#7B6854] mt-1">{filtered.length} of {all.length} cases</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {[{ v: 'all', l: 'All' },{ v: 'active', l: 'Active' },{ v: 'open', l: 'Open Briefs' },{ v: 'in_progress', l: 'In Progress' },{ v: 'delivered', l: 'Delivered' }].map((f) => (
          <button key={f.v} onClick={() => setFilter(f.v)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === f.v ? 'bg-[#C89B4F] text-[#0A0A0A]' : 'bg-[rgba(255,255,255,0.05)] border border-[rgba(214,170,92,0.15)] text-[#7B6854] hover:bg-[rgba(255,255,255,0.08)]'}`}>{f.l}</button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((c) => (
          <div key={c.id} className="bg-[linear-gradient(180deg,rgba(28,23,20,0.94)_0%,rgba(22,18,16,0.98)_100%)] rounded-[26px] border border-[rgba(214,170,92,0.08)] p-5 hover:border-[rgba(214,170,92,0.12)] transition-all shadow-[0_2px_10px_rgba(0,0,0,0.16)]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS[c.status]}`}>{c.status.replace('_', ' ')}</span>
                  <span className={`text-xs font-bold ${c.priority === 'vip' || c.priority === 'executive' ? 'text-[#C89B4F]' : 'text-[#7B6854]/60'}`}>{c.priority.toUpperCase()}</span>
                  {c.matchedArtist && <span className="text-xs bg-[rgba(255,255,255,0.05)] text-[#7B6854] px-2 py-0.5 rounded-full">Artist: {c.matchedArtist}</span>}
                </div>
                <h3 className="font-semibold text-[#F5EBDD] mb-1">{c.clientName}</h3>
                <p className="text-xs text-[#7B6854]/70 line-clamp-2">{c.brief}</p>
                <div className="flex items-center gap-4 mt-2">
                  {c.medium && <span className="text-xs text-[#7B6854]">{c.medium}</span>}
                  {c.dimensions && <span className="text-xs text-[#7B6854]">{c.dimensions}</span>}
                  {c.budgetRange && <span className="text-xs text-[#C89B4F] font-medium">{c.budgetRange}</span>}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 min-w-[120px]">
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-andy-stone/10 rounded-full overflow-hidden">
                    <div className="h-full bg-andy-gold rounded-full" style={{ width: `${c.progress}%` }} />
                  </div>
                  <span className="text-xs font-bold text-andy-black">{c.progress}%</span>
                </div>
                {c.estimate && <span className="text-sm font-bold text-andy-gold">Est. {c.estimate}</span>}
                {c.deadline && <span className="text-xs text-andy-bronze/60">Due: {c.deadline}</span>}
                {c.assignedTo && <span className="text-xs text-andy-bronze/50">→ {c.assignedTo}</span>}
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-andy-stone/10">
              <span className="text-xs text-andy-bronze/50">Started {formatDate(c.createdAt)}</span>
              <div className="flex gap-2">
                {c.clientPhone && (
                  <a href={`https://wa.me/${c.clientPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs hover:bg-green-100 transition-colors">
                    <MessageCircle size={12} /> WhatsApp
                  </a>
                )}
                <button onClick={() => setSelected(c)} className="px-3 py-1.5 bg-andy-stone/20 text-andy-bronze rounded-full text-xs hover:bg-andy-stone/30 transition-colors">View Brief</button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-andy-stone/20 py-16 text-center text-andy-bronze/50">No commissions</div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-andy-black/30 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg bg-[#F7F2E8] shadow-premium overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-andy-stone/20 px-6 py-4 flex items-center justify-between z-10">
              <div><h2 className="font-serif text-lg font-bold text-andy-black">{selected.clientName}</h2><p className="text-sm text-andy-bronze">Commission Case</p></div>
              <button onClick={() => setSelected(null)}><X size={20} className="text-andy-bronze" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                <p className="text-xs text-andy-bronze uppercase tracking-wider mb-2">Client Brief</p>
                <p className="text-sm text-andy-bronze leading-relaxed">{selected.brief}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { l: 'Medium', v: selected.medium || '—' },
                  { l: 'Dimensions', v: selected.dimensions || '—' },
                  { l: 'Budget', v: selected.budgetRange || '—' },
                  { l: 'Deadline', v: selected.deadline || '—' },
                  { l: 'Artist', v: selected.matchedArtist || 'TBD' },
                  { l: 'Estimate', v: selected.estimate || '—' },
                ].map((item) => (
                  <div key={item.l} className="bg-white rounded-xl border border-andy-stone/20 p-3">
                    <p className="text-xs text-andy-bronze uppercase tracking-wider mb-1">{item.l}</p>
                    <p className="text-sm font-medium text-andy-black">{item.v}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                <p className="text-xs text-andy-bronze uppercase tracking-wider mb-3">Milestones</p>
                <div className="space-y-2">
                  {selected.milestones.map((m, i) => (
                    <div key={i} className="flex items-start gap-3">
                      {m.completed ? <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" /> : <Circle size={16} className="text-andy-stone/40 mt-0.5 flex-shrink-0" />}
                      <div className="flex-1">
                        <p className={`text-sm ${m.completed ? 'text-andy-black font-medium' : 'text-andy-bronze'}`}>{m.label}</p>
                        {m.due && <p className="text-xs text-andy-bronze/50">Due: {m.due}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                <p className="text-xs text-andy-bronze uppercase tracking-wider mb-3">Progress</p>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex-1 h-3 bg-andy-stone/10 rounded-full overflow-hidden">
                    <div className="h-full bg-andy-gold rounded-full transition-all" style={{ width: `${selected.progress}%` }} />
                  </div>
                  <span className="text-lg font-bold text-andy-gold">{selected.progress}%</span>
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {[0, 25, 50, 75, 100].map((p) => (
                    <button key={p} onClick={() => handleProgress(selected.id, p)} className={`text-xs py-1 rounded ${selected.progress === p ? 'bg-andy-gold text-andy-black font-bold' : 'bg-andy-stone/10 text-andy-bronze hover:bg-andy-stone/20'}`}>{p}%</button>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                <p className="text-xs text-andy-bronze uppercase tracking-wider mb-2">Contact</p>
                <p className="text-sm text-andy-black font-medium">{selected.clientName}</p>
                <p className="text-xs text-andy-bronze">{selected.clientEmail}</p>
                <p className="text-xs text-andy-bronze">{selected.clientPhone}</p>
              </div>
              {selected.notes && (
                <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                  <p className="text-xs text-andy-bronze uppercase tracking-wider mb-2">Internal Notes</p>
                  <p className="text-sm text-andy-bronze leading-relaxed">{selected.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}