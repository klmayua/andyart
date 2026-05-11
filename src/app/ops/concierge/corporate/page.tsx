'use client';

import { useState, useMemo } from 'react';
import { Building2, MapPin, X, MessageCircle, Phone, Mail } from 'lucide-react';
import { useClientData } from '@/hooks/useClientData';
import { getAllCorporate, updateCorporateStatus } from '@/lib/concierge';
import type { CorporateProject } from '@/types/concierge';

const STATUS_COLORS: Record<string, string> = {
  inquiry: 'bg-blue-100 text-blue-800',
  consultation: 'bg-purple-100 text-purple-800',
  proposal: 'bg-yellow-100 text-yellow-800',
  contract: 'bg-indigo-100 text-indigo-800',
  acquiring: 'bg-orange-100 text-orange-800',
  installing: 'bg-cyan-100 text-cyan-800',
  completed: 'bg-green-100 text-green-800',
  on_hold: 'bg-gray-100 text-gray-500',
};

const TYPE_LABELS: Record<string, string> = {
  office: 'Office', hotel: 'Hotel', restaurant: 'Restaurant', hospitality: 'Hospitality', retail: 'Retail', corporate_gifting: 'Corporate Gifting', executive_suites: 'Executive Suites',
};

export default function CorporatePage() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<CorporateProject | null>(null);

  const all = useClientData(() => getAllCorporate(), [], [selected]);

  const filtered = useMemo(() => {
    if (filter === 'all') return [...all].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    if (filter === 'active') return all.filter((c) => !['completed','on_hold'].includes(c.status));
    return all.filter((c) => c.status === filter);
  }, [all, filter]);

  const handleStatus = (id: string, s: CorporateProject['status']) => {
    updateCorporateStatus(id, s);
    setSelected((prev) => prev ? { ...prev, status: s } : null);
  };

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const totalValue = filtered.reduce((s, p) => {
    if (p.budgetRange?.includes('100,000+')) return s + 100000;
    if (p.budgetRange?.includes('80,000')) return s + 80000;
    if (p.budgetRange?.includes('60,000')) return s + 60000;
    if (p.budgetRange?.includes('40,000')) return s + 40000;
    return s + 30000;
  }, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-andy-black">Corporate Projects</h1>
          <p className="text-sm text-andy-bronze mt-1">{filtered.length} projects · Est. value: ${(totalValue / 1000).toFixed(0)}k</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {[{ v: 'all', l: 'All' },{ v: 'active', l: 'Active' },{ v: 'inquiry', l: 'Inquiry' },{ v: 'consultation', l: 'Consultation' },{ v: 'proposal', l: 'Proposal' },{ v: 'acquiring', l: 'Acquiring' },{ v: 'installing', l: 'Installing' },{ v: 'completed', l: 'Completed' }].map((f) => (
          <button key={f.v} onClick={() => setFilter(f.v)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === f.v ? 'bg-andy-black text-andy-ivory' : 'bg-white border border-andy-stone/30 text-andy-bronze hover:bg-andy-stone/10'}`}>{f.l}</button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-andy-stone/20 p-5 hover:border-andy-gold/30 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-xl bg-andy-stone/20 flex items-center justify-center flex-shrink-0">
                  <Building2 size={20} className="text-andy-gold" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-andy-black">{p.companyName}</h3>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS[p.status]}`}>{p.status.replace('_', ' ')}</span>
                    {p.priority !== 'standard' && <span className={`text-xs font-bold ${p.priority === 'executive' ? 'text-andy-gold' : 'text-purple-600'}`}>{p.priority.toUpperCase()}</span>}
                  </div>
                  <p className="text-sm text-andy-bronze/70">{TYPE_LABELS[p.projectType]} · {p.location}</p>
                  <p className="text-xs text-andy-bronze/50 mt-1 line-clamp-2">{p.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    {p.roomCount && <span className="text-xs text-andy-bronze">{p.roomCount} {p.projectType === 'hotel' ? 'rooms' : 'spaces'}</span>}
                    {p.estimatedWorks && <span className="text-xs text-andy-bronze">{p.estimatedWorks} works</span>}
                    {p.budgetRange && <span className="text-xs text-andy-gold font-medium">{p.budgetRange}</span>}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {p.assignedTo && <span className="text-xs text-andy-bronze/50">→ {p.assignedTo}</span>}
                <span className="text-xs text-andy-bronze/50">{formatDate(p.createdAt)}</span>
                <button onClick={() => setSelected(p)} className="text-xs px-3 py-1.5 bg-andy-stone/20 text-andy-bronze rounded-full hover:bg-andy-stone/30 transition-colors">Details</button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-andy-stone/20 py-16 text-center text-andy-bronze/50">No projects</div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-andy-black/30 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg bg-[#F7F2E8] shadow-premium overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-andy-stone/20 px-6 py-4 flex items-center justify-between z-10">
              <div><h2 className="font-serif text-lg font-bold text-andy-black">{selected.companyName}</h2><p className="text-sm text-andy-bronze">{TYPE_LABELS[selected.projectType]} · {selected.location}</p></div>
              <button onClick={() => setSelected(null)}><X size={20} className="text-andy-bronze" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                <p className="text-xs text-andy-bronze uppercase tracking-wider mb-2">Status</p>
                <select value={selected.status} onChange={(e) => handleStatus(selected.id, e.target.value as CorporateProject['status'])} className={`text-sm font-medium px-3 py-1.5 rounded-full border-0 focus:outline-none cursor-pointer ${STATUS_COLORS[selected.status]}`}>
                  {Object.keys(STATUS_COLORS).map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                </select>
              </div>
              <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                <p className="text-xs text-andy-bronze uppercase tracking-wider mb-3">Project Details</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { l: 'Type', v: TYPE_LABELS[selected.projectType] },
                    { l: 'Location', v: selected.location },
                    { l: 'Rooms/Spaces', v: selected.roomCount || '—' },
                    { l: 'Est. Works', v: selected.estimatedWorks || '—' },
                    { l: 'Budget', v: selected.budgetRange || '—' },
                    { l: 'Timeline', v: selected.timeline || '—' },
                  ].map((item) => (
                    <div key={item.l}>
                      <p className="text-xs text-andy-bronze uppercase tracking-wider mb-1">{item.l}</p>
                      <p className="text-sm font-medium text-andy-black">{item.v}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                <p className="text-xs text-andy-bronze uppercase tracking-wider mb-2">Description</p>
                <p className="text-sm text-andy-bronze leading-relaxed">{selected.description}</p>
              </div>
              <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                <p className="text-xs text-andy-bronze uppercase tracking-wider mb-3">Contact</p>
                <p className="text-sm font-medium text-andy-black">{selected.contactName}</p>
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm text-andy-bronze"><Mail size={14} />{selected.contactEmail}</div>
                  <div className="flex items-center gap-2 text-sm text-andy-bronze"><Phone size={14} />{selected.contactPhone}</div>
                  {selected.contactPhone && (
                    <a href={`https://wa.me/${selected.contactPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-green-600 hover:underline"><MessageCircle size={14} /> WhatsApp</a>
                  )}
                </div>
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