'use client';

import { useState, useMemo, useCallback } from 'react';
import { Search, MessageCircle, Phone, Mail, X, ChevronDown, ChevronUp, ExternalLink, MessageSquare } from 'lucide-react';
import { useClientData } from '@/hooks/useClientData';
import { getAllRequests, updateRequestStatus, assignRequest, updateRequestPriority } from '@/lib/concierge';
import type { ConciergeRequest, RequestStatus, PriorityLevel } from '@/types/concierge';

const STATUS_OPTS: { key: RequestStatus; label: string; color: string }[] = [
  { key: 'new', label: 'New', color: 'bg-blue-100 text-blue-800' },
  { key: 'qualified', label: 'Qualified', color: 'bg-purple-100 text-purple-800' },
  { key: 'assigned', label: 'Assigned', color: 'bg-indigo-100 text-indigo-800' },
  { key: 'proposal_sent', label: 'Proposal Sent', color: 'bg-yellow-100 text-yellow-800' },
  { key: 'negotiating', label: 'Negotiating', color: 'bg-orange-100 text-orange-800' },
  { key: 'confirmed', label: 'Confirmed', color: 'bg-green-100 text-green-800' },
  { key: 'fulfilled', label: 'Fulfilled', color: 'bg-emerald-100 text-emerald-800' },
  { key: 'archived', label: 'Archived', color: 'bg-gray-100 text-gray-500' },
];

const PRIORITY_COLORS: Record<PriorityLevel, string> = {
  standard: 'bg-gray-100 text-gray-600',
  priority: 'bg-purple-100 text-purple-700',
  vip: 'bg-andy-gold/15 text-andy-gold',
  executive: 'bg-andy-black text-andy-gold',
};

const OWNERS = ['Chioma A.', 'Tunde B.', 'Unassigned'];

export default function RequestsPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<RequestStatus | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<PriorityLevel | 'all'>('all');
  const [filterOwner, setFilterOwner] = useState('all');
  const [selected, setSelected] = useState<ConciergeRequest | null>(null);

  const requests = useClientData(() => getAllRequests(), [], [selected]);

  const filtered = useMemo(() => {
    let r = [...requests];
    if (search) {
      const q = search.toLowerCase();
      r = r.filter((x) => x.subject.toLowerCase().includes(q) || x.clientProfile.name.toLowerCase().includes(q) || x.clientProfile.email.toLowerCase().includes(q));
    }
    if (filterStatus !== 'all') r = r.filter((x) => x.status === filterStatus);
    if (filterPriority !== 'all') r = r.filter((x) => x.priority === filterPriority);
    if (filterOwner !== 'all') r = r.filter((x) => x.assignedTo === filterOwner || (!x.assignedTo && filterOwner === 'Unassigned'));
    r.sort((a, b) => {
      const pOrder: Record<PriorityLevel, number> = { executive: 0, vip: 1, priority: 2, standard: 3 };
      return pOrder[a.priority] - pOrder[b.priority] || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return r;
  }, [requests, search, filterStatus, filterPriority, filterOwner]);

  const handleStatus = useCallback((id: string, s: RequestStatus) => {
    updateRequestStatus(id, s);
    setSelected((prev) => prev ? { ...prev, status: s } : null);
  }, []);

  const handleAssign = useCallback((id: string, owner: string) => {
    assignRequest(id, owner);
    setSelected((prev) => prev ? { ...prev, assignedTo: owner } : null);
  }, []);

  const handlePriority = useCallback((id: string, p: PriorityLevel) => {
    updateRequestPriority(id, p);
    setSelected((prev) => prev ? { ...prev, priority: p } : null);
  }, []);

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#F5EBDD]">Requests</h1>
          <p className="text-sm text-[#B9A48A] mt-1">Concierge request management and fulfillment</p>
          <p className="text-xs text-[#7B6854] mt-1">{filtered.length} of {requests.length} requests</p>
        </div>
      </div>

      <div className="bg-[linear-gradient(180deg,rgba(34,29,25,0.88)_0%,rgba(24,20,18,0.96)_100%)] rounded-xl border border-[rgba(214,170,92,0.10)] p-4 mb-6 flex flex-wrap gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7B6854]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search requests..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[rgba(214,170,92,0.15)] text-sm bg-[rgba(255,255,255,0.05)] text-[#F5EBDD] placeholder:text-[#7B6854] focus:outline-none focus:ring-2 focus:ring-[#C89B4F]/30" />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)} className="px-3 py-2.5 rounded-xl border border-andy-stone/30 text-sm bg-white focus:outline-none">
          <option value="all">All Statuses</option>
          {STATUS_OPTS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
        </select>
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value as typeof filterPriority)} className="px-3 py-2.5 rounded-xl border border-andy-stone/30 text-sm bg-white focus:outline-none">
          <option value="all">All Priority</option>
          {(['standard','priority','vip','executive'] as PriorityLevel[]).map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={filterOwner} onChange={(e) => setFilterOwner(e.target.value)} className="px-3 py-2.5 rounded-xl border border-andy-stone/30 text-sm bg-white focus:outline-none">
          <option value="all">All Owners</option>
          {OWNERS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map((req) => (
          <div key={req.id} className="bg-[#FAF8F3] rounded-xl border border-black/[0.06] p-5 hover:border-andy-gold/20 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${PRIORITY_COLORS[req.priority]}`}>{req.priority.toUpperCase()}</span>
                  <span className="text-xs text-andy-bronze capitalize px-2 py-0.5 bg-andy-stone/20 rounded-full">{req.type.replace('_', ' ')}</span>
                  {req.assignedTo && <span className="text-xs text-andy-bronze/60">→ {req.assignedTo}</span>}
                </div>
                <h3 className="font-semibold text-andy-black mb-1">{req.subject}</h3>
                <p className="text-sm text-andy-bronze/70">{req.clientProfile.name} · {req.clientProfile.email} · {req.clientProfile.country}</p>
                {req.budgetRange && <p className="text-xs text-andy-gold font-medium mt-1">Budget: {req.budgetRange}</p>}
              </div>
              <div className="flex flex-col items-end gap-2">
                <select value={req.status} onChange={(e) => handleStatus(req.id, e.target.value as RequestStatus)} className={`text-xs font-medium px-2.5 py-1.5 rounded-full border-0 focus:outline-none cursor-pointer ${STATUS_OPTS.find((o) => o.key === req.status)?.color}`}>
                  {STATUS_OPTS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
                </select>
                <span className="text-xs text-andy-bronze/60">{formatDate(req.createdAt)}</span>
                <button onClick={() => setSelected(req)} className="text-xs text-andy-gold hover:underline flex items-center gap-1">
                  Details <ExternalLink size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-andy-stone/20 p-8 text-center">
            <div className="w-12 h-12 bg-andy-stone/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageSquare size={20} className="text-andy-bronze/40" />
            </div>
            <p className="text-andy-bronze font-medium">No service requests</p>
            <p className="text-xs text-andy-bronze/60 mt-1">Requests will appear here when clients submit inquiries</p>
          </div>
        )}
      </div>

      {/* Detail Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-andy-black/30 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg bg-[#F7F2E8] shadow-premium overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-andy-stone/20 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="font-serif text-xl font-bold text-andy-black">{selected.subject}</h2>
                <p className="text-sm text-andy-bronze">{selected.clientProfile.name}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-andy-stone/10 rounded-lg"><X size={20} className="text-andy-bronze" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-andy-stone/20 p-4">
                  <p className="text-xs text-andy-bronze uppercase tracking-wider mb-1">Status</p>
                  <select value={selected.status} onChange={(e) => handleStatus(selected.id, e.target.value as RequestStatus)} className={`text-sm font-medium px-2.5 py-1 rounded-full border-0 focus:outline-none cursor-pointer w-full ${STATUS_OPTS.find((o) => o.key === selected.status)?.color}`}>
                    {STATUS_OPTS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
                  </select>
                </div>
                <div className="bg-white rounded-xl border border-andy-stone/20 p-4">
                  <p className="text-xs text-andy-bronze uppercase tracking-wider mb-1">Priority</p>
                  <select value={selected.priority} onChange={(e) => handlePriority(selected.id, e.target.value as PriorityLevel)} className="w-full text-sm bg-white border border-andy-stone/30 rounded-lg px-3 py-2 focus:outline-none">
                    {(['standard','priority','vip','executive'] as PriorityLevel[]).map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="bg-white rounded-xl border border-andy-stone/20 p-4">
                  <p className="text-xs text-andy-bronze uppercase tracking-wider mb-1">Assigned To</p>
                  <select value={selected.assignedTo || ''} onChange={(e) => handleAssign(selected.id, e.target.value)} className="w-full text-sm bg-white border border-andy-stone/30 rounded-lg px-3 py-2 focus:outline-none">
                    <option value="">Unassigned</option>
                    {OWNERS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div className="bg-white rounded-xl border border-andy-stone/20 p-4">
                  <p className="text-xs text-andy-bronze uppercase tracking-wider mb-1">Source</p>
                  <p className="text-sm font-medium text-andy-black capitalize">{selected.source}</p>
                </div>
              </div>

              {selected.description && (
                <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                  <p className="text-xs text-andy-bronze uppercase tracking-wider mb-2">Description</p>
                  <p className="text-sm text-andy-bronze leading-relaxed">{selected.description}</p>
                </div>
              )}

              <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                <p className="text-xs text-andy-bronze uppercase tracking-wider mb-3">Contact</p>
                <div className="space-y-2">
                  <p className="text-sm text-andy-black font-medium">{selected.clientProfile.name}</p>
                  <div className="flex items-center gap-2 text-sm text-andy-bronze">
                    <Mail size={14} />{selected.clientProfile.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-andy-bronze">
                    <Phone size={14} />{selected.clientProfile.phone}
                  </div>
                  {selected.clientProfile.whatsapp && (
                    <a href={`https://wa.me/${selected.clientProfile.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-green-600 hover:underline">
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                  )}
                </div>
              </div>

              {selected.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-andy-stone/20 text-andy-bronze px-2.5 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              )}

              <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                <p className="text-xs text-andy-bronze uppercase tracking-wider mb-2">Timeline</p>
                <p className="text-sm text-andy-black">Created {formatDate(selected.createdAt)}</p>
                {selected.timeline && <p className="text-xs text-andy-bronze mt-1">Timeline: {selected.timeline}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}