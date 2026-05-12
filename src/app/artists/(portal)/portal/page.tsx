'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Layers, ClipboardList, Palette, Calendar, CreditCard, TrendingUp, ArrowRight, Eye,
} from 'lucide-react';
import { useCurrentArtist } from '@/hooks/useCurrentArtist';
import { getArtistStats, getInventory, getCommissions, getExhibitions, getPayouts } from '@/lib/artist';
import { AVAILABILITY_LABELS } from '@/types/artist';
import EmptyState from '@/components/EmptyState';
import InlineLoader from '@/components/InlineLoader';

export default function ArtistPortalPage() {
  const artist = useCurrentArtist();
  const [stats, setStats] = useState<any>(null);
  const [recentWorks, setRecentWorks] = useState<any[]>([]);
  const [commissions, setCommissions] = useState<any[]>([]);
  const [exhibitions, setExhibitions] = useState<any[]>([]);
  const [payouts, setPayouts] = useState<any[]>([]);

  useEffect(() => {
    if (!artist) return;
    setStats(getArtistStats(artist.id));
    setRecentWorks(getInventory(artist.id).slice(0, 3));
    setCommissions(getCommissions(artist.id).slice(0, 3));
    setExhibitions(getExhibitions(artist.id).slice(0, 3));
    setPayouts(getPayouts(artist.id).slice(0, 3));
  }, [artist]);

  if (!artist || !stats) {
    return <InlineLoader label="Loading artist profile..." />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-andy-black">Studio Overview</h1>
          <p className="text-sm text-andy-bronze mt-1">
            {artist.name} · {AVAILABILITY_LABELS[artist.availabilityStatus]} · {artist.basedIn}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Works', value: stats.totalWorks, sub: `${stats.availableWorks} available`, icon: Layers, href: '/artists/inventory' },
          { label: 'Sold Works', value: stats.soldWorks, sub: `$${(stats.totalRevenue / 1000).toFixed(0)}k revenue`, icon: TrendingUp, href: '/artists/inventory' },
          { label: 'Active Commissions', value: stats.activeCommissions, sub: `${stats.completedCommissions} completed`, icon: Palette, href: '/artists/commissions' },
          { label: 'Upcoming Shows', value: stats.upcomingExhibitions, sub: `${stats.activeExhibitions} active`, icon: Calendar, href: '/artists/exhibitions' },
        ].map((kpi) => (
          <Link key={kpi.label} href={kpi.href} className="bg-white rounded-2xl border border-andy-stone/20 p-5 hover:border-andy-gold/30 hover:shadow-premium transition-all group">
            <div className="flex items-center justify-between mb-3">
              <kpi.icon size={20} className="text-andy-gold" />
              <ArrowRight size={14} className="text-andy-bronze/40 group-hover:text-andy-gold transition-colors" />
            </div>
            <p className="text-2xl font-bold text-andy-black">{kpi.value}</p>
            <p className="text-xs text-andy-bronze mt-0.5">{kpi.label}</p>
            <p className="text-xs text-andy-bronze/50">{kpi.sub}</p>
          </Link>
        ))}
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Collector Count', value: stats.collectorCount },
          { label: 'Avg Price', value: `$${(stats.averageWorkPrice / 1000).toFixed(0)}k` },
          { label: 'Pending Payout', value: `$${(stats.pendingPayouts / 1000).toFixed(0)}k` },
          { label: 'Completed Payouts', value: `$${(stats.completedPayouts / 1000).toFixed(0)}k` },
          { label: 'Exhibition Sales', value: `$${(stats.totalExhibitionSales / 1000).toFixed(0)}k` },
        ].map((m) => (
          <div key={m.label} className="bg-white rounded-xl border border-andy-stone/10 p-4 text-center">
            <p className="text-lg font-bold text-andy-black">{m.value}</p>
            <p className="text-xs text-andy-bronze mt-0.5">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Works */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <h2 className="font-serif text-lg font-bold text-andy-black">Recent Works</h2>
            <Link href="/artists/inventory" className="text-xs text-andy-bronze hover:text-andy-gold">View all →</Link>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {recentWorks.length > 0 ? recentWorks.map((w) => (
              <div key={w.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{w.title}</p>
                  <p className="text-xs text-andy-bronze/60">{w.medium} · {w.year}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-andy-gold">${(w.price / 1000).toFixed(0)}k</p>
                  <p className="text-[10px] text-andy-bronze/50 capitalize">{w.status.replace('_', ' ')}</p>
                </div>
              </div>
            )) : (
              <EmptyState icon={Layers} title="No works yet" variant="compact" />
            )}
          </div>
        </div>

        {/* Commissions */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <h2 className="font-serif text-lg font-bold text-andy-black">Commissions</h2>
            <Link href="/artists/commissions" className="text-xs text-andy-bronze hover:text-andy-gold">View all →</Link>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {commissions.length > 0 ? commissions.map((c) => (
              <div key={c.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{c.commissionNumber}</p>
                  <p className="text-xs text-andy-bronze/60">{c.collectorName} · {c.status.replace('_', ' ')}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-andy-gold">${(c.budget / 1000).toFixed(0)}k</p>
                  <p className="text-[10px] text-andy-bronze/50">{new Date(c.targetDeliveryDate).toLocaleDateString()}</p>
                </div>
              </div>
            )) : (
              <EmptyState icon={Palette} title="No commissions yet" variant="compact" />
            )}
          </div>
        </div>

        {/* Exhibitions */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <h2 className="font-serif text-lg font-bold text-andy-black">Exhibitions</h2>
            <Link href="/artists/exhibitions" className="text-xs text-andy-bronze hover:text-andy-gold">View all →</Link>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {exhibitions.length > 0 ? exhibitions.map((e) => (
              <div key={e.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{e.exhibitionTitle}</p>
                  <p className="text-xs text-andy-bronze/60">{e.venue} · {new Date(e.startDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs capitalize ${e.status === 'upcoming' ? 'text-andy-gold' : e.status === 'active' ? 'text-green-600' : 'text-andy-bronze'}`}>{e.status}</span>
                  {e.totalSales > 0 && <p className="text-[10px] text-andy-gold">${(e.totalSales / 1000).toFixed(0)}k sold</p>}
                </div>
              </div>
            )) : (
              <EmptyState icon={Calendar} title="No exhibitions yet" variant="compact" />
            )}
          </div>
        </div>

        {/* Payouts */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <h2 className="font-serif text-lg font-bold text-andy-black">Recent Payouts</h2>
            <Link href="/artists/payouts" className="text-xs text-andy-bronze hover:text-andy-gold">View all →</Link>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {payouts.length > 0 ? payouts.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{p.payoutNumber}</p>
                  <p className="text-xs text-andy-bronze/60">{new Date(p.periodStart).toLocaleDateString()} - {new Date(p.periodEnd).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-andy-gold">${(p.netAmount / 1000).toFixed(0)}k</p>
                  <p className={`text-[10px] capitalize ${p.status === 'completed' ? 'text-green-600' : p.status === 'pending' ? 'text-andy-gold' : 'text-red-500'}`}>{p.status}</p>
                </div>
              </div>
            )) : (
              <EmptyState icon={CreditCard} title="No payouts yet" variant="compact" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
