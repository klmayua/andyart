'use client';

import { useState, useEffect } from 'react';
import { BarChart3, Eye, MessageSquare, TrendingUp, MapPin } from 'lucide-react';
import { useCurrentArtist } from '@/hooks/useCurrentArtist';
import { getAnalytics } from '@/lib/artist';
import { MEDIUM_LABELS } from '@/types/artist';
import { EmptyStates } from '@/components/EmptyState';
import InlineLoader from '@/components/InlineLoader';

export default function ArtistAnalyticsPage() {
  const artist = useCurrentArtist();
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    if (!artist) return;
    setAnalytics(getAnalytics(artist.id));
  }, [artist]);

  if (!artist) {
    return <InlineLoader label="Loading analytics..." />;
  }

  if (!analytics) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="font-serif text-2xl font-bold text-andy-black">Analytics</h1>
          <p className="text-sm text-andy-bronze mt-1">Performance metrics and collector insights.</p>
        </div>
        <EmptyStates.Analytics />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-andy-black">Analytics</h1>
        <p className="text-sm text-andy-bronze mt-1">Performance metrics and collector insights for {analytics.period}.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Profile Views', value: analytics.profileViews.toLocaleString(), icon: Eye },
          { label: 'Artwork Views', value: analytics.artworkViews.toLocaleString(), icon: BarChart3 },
          { label: 'Inquiries', value: `${analytics.inquiryCount} (${analytics.inquiryRate}%)`, icon: MessageSquare },
          { label: 'Sales Volume', value: `$${(analytics.salesVolume / 1000).toFixed(0)}k`, icon: TrendingUp },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl border border-andy-stone/20 p-5">
            <div className="flex items-center justify-between mb-3">
              <kpi.icon size={18} className="text-andy-gold" />
            </div>
            <p className="text-xl font-bold text-andy-black">{kpi.value}</p>
            <p className="text-xs text-andy-bronze mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Performing Works */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-andy-stone/10">
            <h2 className="font-serif text-base font-bold text-andy-black">Top Performing Works</h2>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {analytics.topPerformingWorks.map((w: any, i: number) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{w.artworkTitle}</p>
                  <p className="text-xs text-andy-bronze/60">{w.views.toLocaleString()} views · {w.inquiries} inquiries</p>
                </div>
                <div className="text-right">
                  {w.sales > 0 && <p className="text-sm font-bold text-andy-gold">${(w.revenue / 1000).toFixed(0)}k</p>}
                  <p className="text-[10px] text-andy-bronze/50">{w.sales} sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medium Performance */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-andy-stone/10">
            <h2 className="font-serif text-base font-bold text-andy-black">Medium Performance</h2>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {analytics.mediumPerformance.map((m: any, i: number) => (
              <div key={i} className="px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-andy-black">{MEDIUM_LABELS[m.medium]}</p>
                  <p className="text-xs text-andy-gold font-bold">${(m.revenue / 1000).toFixed(0)}k</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-andy-bronze/60">
                  <span>{m.views.toLocaleString()} views</span>
                  <span>{m.inquiries} inquiries</span>
                  <span>{m.sales} sales</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collector Interest */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-andy-stone/10">
            <h2 className="font-serif text-base font-bold text-andy-black">Collector Interest</h2>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {analytics.collectorInterest.map((c: any, i: number) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{c.collectorName}</p>
                  <p className="text-xs text-andy-bronze/60">Last interaction: {new Date(c.lastInteraction).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1.5">
                    <div className="w-16 h-1.5 bg-andy-stone/10 rounded-full overflow-hidden">
                      <div className="h-full bg-andy-gold rounded-full" style={{ width: `${c.interestScore}%` }} />
                    </div>
                    <span className="text-xs font-bold text-andy-gold">{c.interestScore}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Reach */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-andy-stone/10">
            <h2 className="font-serif text-base font-bold text-andy-black">Geographic Reach</h2>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {analytics.geographicReach.map((g: any, i: number) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-andy-bronze/40" />
                  <span className="text-sm font-semibold text-andy-black">{g.country}</span>
                </div>
                <div className="flex gap-4 text-xs text-andy-bronze/60">
                  <span>{g.collectors} collectors</span>
                  <span>{g.sales} sales</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
