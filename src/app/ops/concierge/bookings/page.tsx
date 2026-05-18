'use client';

import { useState, useMemo } from 'react';
import { Calendar, Clock, Users, MapPin, Video, Home, Building, X, CheckCircle, Eye } from 'lucide-react';
import { useClientData } from '@/hooks/useClientData';
import { getAllViewings, updateViewingStatus } from '@/lib/concierge';
import type { ViewingSession } from '@/types/concierge';

const STATUS_COLORS: Record<string, string> = {
  scheduled: 'bg-blue-100 text-blue-800',
  confirmed: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-600',
  cancelled: 'bg-red-100 text-red-600',
  no_show: 'bg-red-100 text-red-600',
};

const TYPE_ICONS: Record<string, React.ElementType> = {
  virtual: Video,
  in_gallery: Eye,
  private_home: Home,
  corporate_consult: Building,
  commission_consultation: Calendar,
};

export default function BookingsPage() {
  const [filterStatus, setFilterStatus] = useState<ViewingSession['status'] | 'all'>('all');
  const [filterType, setFilterType] = useState('all');
  const [selected, setSelected] = useState<ViewingSession | null>(null);

  const all = useClientData(() => getAllViewings(), [], [selected]);

  const filtered = useMemo(() => {
    let r = [...all].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    if (filterStatus !== 'all') r = r.filter((x) => x.status === filterStatus);
    if (filterType !== 'all') r = r.filter((x) => x.viewingType === filterType);
    return r;
  }, [all, filterStatus, filterType]);

  const grouped = useMemo(() => {
    const groups: Record<string, ViewingSession[]> = {};
    for (const v of filtered) {
      const key = new Date(v.date).toDateString();
      if (!groups[key]) groups[key] = [];
      groups[key].push(v);
    }
    return Object.entries(groups).sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime());
  }, [filtered]);

  const handleStatus = (id: string, status: ViewingSession['status']) => {
    updateViewingStatus(id, status);
    setSelected((prev) => prev ? { ...prev, status } : null);
  };

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#F5EBDD]">Bookings</h1>
          <p className="text-sm text-[#7B6854] mt-1">{all.length} total viewings</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)} className="px-4 py-2.5 rounded-xl border border-[rgba(214,170,92,0.15)] text-sm bg-[rgba(255,255,255,0.05)] text-[#B9A48A] focus:outline-none">
          <option value="all">All Statuses</option>
          {Object.keys(STATUS_COLORS).map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-2.5 rounded-xl border border-[rgba(214,170,92,0.15)] text-sm bg-[rgba(255,255,255,0.05)] text-[#B9A48A] focus:outline-none">
          <option value="all">All Types</option>
          {['virtual','in_gallery','private_home','corporate_consult','commission_consultation'].map((t) => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
        </select>
      </div>

      <div className="space-y-8">
        {grouped.map(([dateStr, viewings]) => (
          <div key={dateStr}>
            <h3 className="font-serif text-lg font-bold text-[#E8D8C2] mb-3 sticky top-0 bg-[linear-gradient(180deg,rgba(28,23,20,0.94)_0%,rgba(22,18,16,0.98)_100%)] py-2 z-10">{formatDate(dateStr)}</h3>
            <div className="space-y-3">
              {viewings.map((v) => {
                const Icon = TYPE_ICONS[v.viewingType] || Calendar;
                return (
                  <div key={v.id} className="bg-[linear-gradient(180deg,rgba(28,23,20,0.94)_0%,rgba(22,18,16,0.98)_100%)] rounded-[26px] border border-[rgba(214,170,92,0.08)] p-5 hover:border-[rgba(214,170,92,0.12)] transition-all shadow-[0_2px_10px_rgba(0,0,0,0.16)]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[rgba(255,255,255,0.05)] flex items-center justify-center flex-shrink-0">
                          <Icon size={20} className="text-[#C89B4F]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#F5EBDD]">{v.clientName}</p>
                          <p className="text-xs text-[#7B6854] capitalize">{v.viewingType.replace('_', ' ')}</p>
                          <div className="flex items-center gap-4 mt-1.5 text-xs text-[#7B6854]/70">
                            <span className="flex items-center gap-1"><Clock size={12} />{v.time} · {v.duration} min</span>
                            {v.guestCount && <span className="flex items-center gap-1"><Users size={12} />{v.guestCount} guests</span>}
                            {v.location && <span className="flex items-center gap-1"><MapPin size={12} />{v.location}</span>}
                          </div>
                          {v.artworkIds && <p className="text-xs text-andy-bronze/50 mt-1">{v.artworkIds.length} artworks selected</p>}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS[v.status]}`}>{v.status}</span>
                        {v.priority !== 'standard' && <span className={`text-xs font-bold ${v.priority === 'vip' ? 'text-andy-gold' : 'text-purple-600'}`}>{v.priority.toUpperCase()}</span>}
                        {v.assignedTo && <span className="text-xs text-andy-bronze/50">→ {v.assignedTo}</span>}
                        <div className="flex gap-2 mt-2">
                          {(v.status === 'scheduled' || v.status === 'confirmed') && (
                            <button onClick={() => handleStatus(v.id, 'completed')} className="text-xs px-2.5 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors">Complete</button>
                          )}
                          <button onClick={() => setSelected(v)} className="text-xs px-2.5 py-1 bg-andy-stone/20 text-andy-bronze rounded-full hover:bg-andy-stone/30 transition-colors">Details</button>
                        </div>
                      </div>
                    </div>
                    {v.notes && <p className="text-xs text-andy-bronze/60 mt-3 border-t border-andy-stone/10 pt-3">{v.notes}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-andy-stone/20 py-16 text-center text-andy-bronze/50">No bookings match filters</div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-andy-black/30 backdrop-blur-sm" />
          <div className="relative w-full max-w-md bg-[#F7F2E8] shadow-premium overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-andy-stone/20 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="font-serif text-lg font-bold text-andy-black">{selected.clientName}</h2>
                <p className="text-sm text-andy-bronze capitalize">{selected.viewingType.replace('_', ' ')}</p>
              </div>
              <button onClick={() => setSelected(null)}><X size={20} className="text-andy-bronze" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl border border-andy-stone/20 p-4 text-center">
                  <p className="text-xs text-andy-bronze uppercase tracking-wider mb-1">Date</p>
                  <p className="text-sm font-semibold text-andy-black">{new Date(selected.date).toLocaleDateString()}</p>
                </div>
                <div className="bg-white rounded-xl border border-andy-stone/20 p-4 text-center">
                  <p className="text-xs text-andy-bronze uppercase tracking-wider mb-1">Time</p>
                  <p className="text-sm font-semibold text-andy-black">{selected.time}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                <p className="text-xs text-andy-bronze uppercase tracking-wider mb-3">Status</p>
                <div className="flex flex-wrap gap-2">
                  {(['scheduled','confirmed','completed','cancelled','no_show'] as const).map((s) => (
                    <button key={s} onClick={() => handleStatus(selected.id, s)} className={`text-xs px-3 py-1.5 rounded-full transition-all ${selected.status === s ? STATUS_COLORS[s] : 'bg-andy-stone/20 text-andy-bronze hover:bg-andy-stone/30'}`}>{s}</button>
                  ))}
                </div>
              </div>
              {selected.notes && (
                <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                  <p className="text-xs text-andy-bronze uppercase tracking-wider mb-2">Notes</p>
                  <p className="text-sm text-andy-bronze leading-relaxed">{selected.notes}</p>
                </div>
              )}
              <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                <p className="text-xs text-andy-bronze uppercase tracking-wider mb-2">Contact</p>
                <p className="text-sm text-andy-black font-medium">{selected.clientName}</p>
                <p className="text-xs text-andy-bronze">{selected.clientEmail}</p>
                <p className="text-xs text-andy-bronze">{selected.clientPhone}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}