'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, Calendar, Palette, Building2, Crown, TrendingUp, Clock, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
import { getAllRequests, getAllViewings, getAllCommissions, getRequestCounts, getBookingCounts, getCommissionCounts } from '@/lib/concierge';

export default function ConciergeOverviewPage() {
  const [reqCounts, setReqCounts] = useState<{ new: number; vip: number; total: number; assigned: number; confirmed: number; fulfilled: number; byStatus: any }>({ new: 0, vip: 0, total: 0, assigned: 0, confirmed: 0, fulfilled: 0, byStatus: {} });
  const [bookCounts, setBookCounts] = useState<{ total: number; today: number; scheduled: number; completed: number }>({ total: 0, today: 0, scheduled: 0, completed: 0 });
  const [comCounts, setComCounts] = useState({ open: 0, inProgress: 0, delivered: 0, total: 0 });
  const [allReqs, setAllReqs] = useState([] as any[]);
  const [allViewings, setAllViewings] = useState([] as any[]);
  const [allComs, setAllComs] = useState([] as any[]);

  useEffect(() => {
    setReqCounts(getRequestCounts());
    setBookCounts(getBookingCounts());
    setComCounts(getCommissionCounts());
    setAllReqs(getAllRequests());
    setAllViewings(getAllViewings());
    setAllComs(getAllCommissions());
  }, []);

  const urgent = allReqs.filter((r) => r.priority === 'vip' || r.priority === 'executive').slice(0, 4);
  const todayViewings = allViewings.filter((v) => new Date(v.date).toDateString() === new Date().toDateString());
  const activeComs = allComs.filter((c) => c.status === 'in_progress' || c.status === 'artist_matching').slice(0, 4);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-andy-black">Concierge Command</h1>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'New Requests', value: reqCounts.new, sub: `${reqCounts.vip} VIP priority`, icon: MessageSquare, href: '/ops/concierge/requests', color: 'text-blue-600' },
          { label: 'Bookings Today', value: bookCounts.today, sub: `${bookCounts.scheduled} scheduled`, icon: Calendar, href: '/ops/concierge/bookings', color: 'text-green-600' },
          { label: 'Open Commissions', value: comCounts.open, sub: `${comCounts.inProgress} in progress`, icon: Palette, href: '/ops/concierge/commissions', color: 'text-purple-600' },
          { label: 'Fulfillment Rate', value: comCounts.total > 0 ? `${Math.round((comCounts.delivered / comCounts.total) * 100)}%` : '—', sub: `${comCounts.delivered} completed`, icon: CheckCircle, href: '/ops/concierge/commissions', color: 'text-andy-gold' },
        ].map((kpi) => (
          <Link key={kpi.label} href={kpi.href} className="bg-white rounded-2xl border border-andy-stone/20 p-5 hover:border-andy-gold/30 hover:shadow-premium transition-all">
            <div className="flex items-center justify-between mb-3">
              <kpi.icon size={20} className={kpi.color} />
              <ArrowRight size={14} className="text-andy-bronze/40" />
            </div>
            <p className="text-2xl font-bold text-andy-black">{kpi.value}</p>
            <p className="text-xs text-andy-bronze mt-0.5">{kpi.label}</p>
            <p className="text-xs text-andy-bronze/50">{kpi.sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* VIP & Urgent Requests */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <div className="flex items-center gap-3">
              <AlertCircle size={18} className="text-andy-gold" />
              <h2 className="font-serif text-lg font-bold text-andy-black">Priority Requests</h2>
            </div>
            <Link href="/ops/concierge/requests" className="text-xs text-andy-bronze hover:text-andy-gold">View all →</Link>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {urgent.length > 0 ? urgent.map((req) => (
              <div key={req.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{req.subject}</p>
                  <p className="text-xs text-andy-bronze/60">{req.clientProfile.name} · {req.type.replace('_', ' ')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    req.priority === 'executive' ? 'bg-andy-black text-andy-gold' :
                    req.priority === 'vip' ? 'bg-andy-gold/15 text-andy-gold' :
                    'bg-purple-100 text-purple-700'
                  }`}>{req.priority.toUpperCase()}</span>
                  <span className="text-xs text-andy-bronze capitalize">{req.status.replace('_', ' ')}</span>
                </div>
              </div>
            )) : (
              <div className="px-6 py-12 text-center text-sm text-andy-bronze/40">No priority requests</div>
            )}
          </div>
        </div>

        {/* Today's Viewings */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-andy-gold" />
              <h2 className="font-serif text-lg font-bold text-andy-black">Today&apos;s Viewings</h2>
            </div>
            <Link href="/ops/concierge/bookings" className="text-xs text-andy-bronze hover:text-andy-gold">View all →</Link>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {todayViewings.length > 0 ? todayViewings.map((v) => (
              <div key={v.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{v.clientName}</p>
                  <p className="text-xs text-andy-bronze/60">{v.viewingType.replace('_', ' ')} · {v.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-andy-bronze">{v.guestCount ? `${v.guestCount} guests` : v.duration + ' min'}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    v.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    v.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>{v.status}</span>
                </div>
              </div>
            )) : (
              <div className="px-6 py-12 text-center">
                <p className="text-sm text-andy-bronze/40">No viewings today</p>
                <p className="text-xs text-andy-bronze/30 mt-1">{allViewings.length} total bookings scheduled</p>
              </div>
            )}
          </div>
        </div>

        {/* Active Commissions */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <div className="flex items-center gap-3">
              <Palette size={18} className="text-andy-gold" />
              <h2 className="font-serif text-lg font-bold text-andy-black">Active Commissions</h2>
            </div>
            <Link href="/ops/concierge/commissions" className="text-xs text-andy-bronze hover:text-andy-gold">View all →</Link>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {activeComs.map((c) => (
              <div key={c.id} className="px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-andy-black">{c.clientName}</p>
                  <span className="text-xs font-bold text-andy-gold">{c.progress}%</span>
                </div>
                <p className="text-xs text-andy-bronze/60 mb-2 line-clamp-1">{c.brief}</p>
                <div className="w-full h-1.5 bg-andy-stone/10 rounded-full overflow-hidden">
                  <div className="h-full bg-andy-gold rounded-full" style={{ width: `${c.progress}%` }} />
                </div>
              </div>
            ))}
            {activeComs.length === 0 && (
              <div className="px-6 py-12 text-center text-sm text-andy-bronze/40">No active commissions</div>
            )}
          </div>
        </div>

        {/* Pipeline Snapshot */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
          <h2 className="font-serif text-lg font-bold text-andy-black mb-5">Request Pipeline</h2>
          <div className="space-y-4">
            {(['new','qualified','assigned','proposal_sent','negotiating','confirmed','fulfilled'] as const).map((s) => {
              const count = reqCounts.byStatus[s] || 0;
              const pct = reqCounts.total > 0 ? (count / reqCounts.total) * 100 : 0;
              return (
                <div key={s} className="flex items-center gap-4">
                  <span className="text-xs text-andy-bronze w-28 capitalize">{s.replace('_', ' ')}</span>
                  <div className="flex-1">
                    <div className="w-full h-2 bg-andy-stone/10 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${s === 'fulfilled' ? 'bg-green-500' : 'bg-andy-gold'}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-andy-black w-5 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}