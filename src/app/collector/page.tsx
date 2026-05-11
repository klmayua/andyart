'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import {
  ShoppingBag, Award, Calendar, Heart, Lock, TrendingUp, ArrowRight, Eye,
} from 'lucide-react';
import { useCurrentCollector } from '@/hooks/useCurrentCollector';
import { getCollectorStats, getAcquisitions, getCertificates, getViewings, getWishlist, getVault } from '@/lib/collector';
import { COLLECTOR_TIER_LABELS } from '@/types/collector';

export default function CollectorOverviewPage() {
  const collector = useCurrentCollector();
  const stats = useMemo(() => collector ? getCollectorStats(collector.id) : null, [collector]);
  const recentAcq = useMemo(() => collector ? getAcquisitions(collector.id).slice(0, 3) : [], [collector]);
  const certs = useMemo(() => collector ? getCertificates(collector.id).slice(0, 3) : [], [collector]);
  const viewings = useMemo(() => collector ? getViewings(collector.id).slice(0, 3) : [], [collector]);
  const wishlist = useMemo(() => collector ? getWishlist(collector.id).slice(0, 3) : [], [collector]);
  const vault = useMemo(() => collector ? getVault(collector.id) : null, [collector]);

  if (!collector || !stats) {
    return (
      <div className="text-center py-20">
        <p className="text-andy-bronze text-sm">Loading collector profile...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-andy-black">My Collection</h1>
          <p className="text-sm text-andy-bronze mt-1">
            {collector.name} · {COLLECTOR_TIER_LABELS[collector.tier]} · {collector.location}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Acquisitions', value: stats.totalAcquisitions, sub: `${stats.totalSpent > 0 ? `$${(stats.totalSpent / 1000).toFixed(0)}k` : '—'} total`, icon: ShoppingBag, href: '/collector/acquisitions' },
          { label: 'Certificates', value: stats.totalCertificates, sub: 'Authenticated', icon: Award, href: '/collector/certificates' },
          { label: 'Viewings', value: stats.totalViewings, sub: 'Attended', icon: Calendar, href: '/collector/viewings' },
          { label: 'Wishlist', value: stats.wishlistCount, sub: 'Saved', icon: Heart, href: '/collector/wishlist' },
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Acquisitions */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <h2 className="font-serif text-lg font-bold text-andy-black">Recent Acquisitions</h2>
            <Link href="/collector/acquisitions" className="text-xs text-andy-bronze hover:text-andy-gold">View all →</Link>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {recentAcq.length > 0 ? recentAcq.map((a) => (
              <div key={a.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{a.artworkTitle}</p>
                  <p className="text-xs text-andy-bronze/60">{a.artistName} · {new Date(a.acquisitionDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-andy-gold">${(a.purchasePrice / 1000).toFixed(0)}k</p>
                  <p className="text-[10px] text-andy-bronze/50 capitalize">{a.source.replace('_', ' ')}</p>
                </div>
              </div>
            )) : (
              <div className="px-6 py-12 text-center text-sm text-andy-bronze/40">No acquisitions yet</div>
            )}
          </div>
        </div>

        {/* Certificates */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <h2 className="font-serif text-lg font-bold text-andy-black">Certificates</h2>
            <Link href="/collector/certificates" className="text-xs text-andy-bronze hover:text-andy-gold">View all →</Link>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {certs.length > 0 ? certs.map((c) => (
              <div key={c.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{c.artworkTitle}</p>
                  <p className="text-xs text-andy-bronze/60">{c.artistName} · {c.yearCreated}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono text-andy-bronze">{c.verificationCode}</p>
                  <p className="text-[10px] text-andy-gold">Verified</p>
                </div>
              </div>
            )) : (
              <div className="px-6 py-12 text-center text-sm text-andy-bronze/40">No certificates yet</div>
            )}
          </div>
        </div>

        {/* Upcoming Viewings */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <h2 className="font-serif text-lg font-bold text-andy-black">Recent Viewings</h2>
            <Link href="/collector/viewings" className="text-xs text-andy-bronze hover:text-andy-gold">View all →</Link>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {viewings.length > 0 ? viewings.map((v) => (
              <div key={v.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{v.viewingType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                  <p className="text-xs text-andy-bronze/60">{v.location} · {new Date(v.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  {v.attended ? <span className="text-xs text-green-600">Attended</span> : <span className="text-xs text-andy-bronze">Upcoming</span>}
                  {v.collectorRating && <p className="text-[10px] text-andy-gold">★ {v.collectorRating}</p>}
                </div>
              </div>
            )) : (
              <div className="px-6 py-12 text-center text-sm text-andy-bronze/40">No viewings yet</div>
            )}
          </div>
        </div>

        {/* Wishlist Preview */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <h2 className="font-serif text-lg font-bold text-andy-black">Wishlist</h2>
            <Link href="/collector/wishlist" className="text-xs text-andy-bronze hover:text-andy-gold">View all →</Link>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {wishlist.length > 0 ? wishlist.map((w) => (
              <div key={w.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{w.artworkTitle}</p>
                  <p className="text-xs text-andy-bronze/60">{w.artistName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-andy-black">${w.price ? (w.price / 1000).toFixed(0) + 'k' : '—'}</p>
                  <p className={`text-[10px] capitalize ${w.priority === 'acquiring' ? 'text-andy-gold' : w.priority === 'high' ? 'text-red-500' : 'text-andy-bronze'}`}>{w.priority}</p>
                </div>
              </div>
            )) : (
              <div className="px-6 py-12 text-center text-sm text-andy-bronze/40">No wishlist items</div>
            )}
          </div>
        </div>
      </div>

      {/* Vault Quick Link */}
      <div className="mt-6 bg-white rounded-2xl border border-andy-stone/20 p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-andy-black rounded-xl flex items-center justify-center">
            <Lock size={18} className="text-andy-gold" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-andy-black">Digital Vault</h3>
            <p className="text-xs text-andy-bronze">{vault?.totalDocuments || 0} documents securely stored</p>
          </div>
        </div>
        <Link href="/collector/vault" className="flex items-center gap-2 text-xs text-andy-bronze hover:text-andy-gold transition-colors">
          Open Vault <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}