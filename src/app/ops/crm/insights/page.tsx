'use client';

import { useMemo } from 'react';
import { TrendingUp, Users, DollarSign, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useClientData } from '@/hooks/useClientData';
import { getAllLeads } from '@/lib/leadCapture';
import { getSubscribers, getSegmentCounts, getHottestInterest } from '@/lib/newsletterScoring';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function InsightsPage() {
  const leads = useClientData(() => getAllLeads(), []);
  const subs = useClientData(() => getSubscribers(), []);
  const counts = useClientData(() => getSegmentCounts(), { reader: 0, prospect: 0, collector: 0, vip: 0 }, [subs]);
  const hottest = useClientData(() => getHottestInterest(), null, [subs]);

  const bySource = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of leads) map[l.source] = (map[l.source] || 0) + 1;
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [leads]);

  const bySegment = useMemo(() => {
    const map: Record<string, { value: number; score: number; count: number }> = {};
    for (const l of leads) {
      if (!map[l.segment]) map[l.segment] = { value: 0, score: 0, count: 0 };
      map[l.segment].value++;
      map[l.segment].score += l.leadScore;
      map[l.segment].count++;
    }
    return Object.entries(map)
      .map(([seg, data]) => ({ seg, count: data.value, avgScore: Math.round(data.score / data.count) }))
      .sort((a, b) => b.count - a.count);
  }, [leads]);

  const conversionRate = useMemo(() => {
    const converted = leads.filter((l) => l.status === 'converted').length;
    return leads.length > 0 ? Math.round((converted / leads.length) * 100) : 0;
  }, [leads]);

  const vipLeads = leads.filter((l) => l.temperature === 'vip_priority');
  const hotLeads = leads.filter((l) => l.temperature === 'hot');
  const avgScore = leads.length > 0 ? Math.round(leads.reduce((s, l) => s + l.leadScore, 0) / leads.length) : 0;

  const pipelineValue = leads.reduce((s, l) => {
    if (l.status === 'converted') return s;
    if (l.budgetBand === '100000_plus') return s + 100000;
    if (l.budgetBand === '25000_100000') return s + 62500;
    if (l.budgetBand === '5000_25000') return s + 15000;
    if (l.budgetBand === '1000_5000') return s + 3000;
    return s;
  }, 0);

  const byMonth = useMemo(() => {
    const now = new Date();
    const months: string[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
    }
    const leadsPerMonth = months.map((m) => {
      return leads.filter((l) => {
        const d = new Date(l.createdAt);
        return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }) === m;
      }).length;
    });
    const maxVal = Math.max(...leadsPerMonth, 1);
    return { months, leadsPerMonth, maxVal };
  }, [leads]);

  const topCategories = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of leads) {
      const cat = l.interest.category;
      map[cat] = (map[cat] || 0) + 1;
    }
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 7);
  }, [leads]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-andy-black">Insights</h1>
        <p className="text-sm text-andy-bronze mt-1">Performance metrics and pipeline intelligence</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Leads', value: leads.length, icon: Users, trend: null },
          { label: 'VIP Priority', value: vipLeads.length, icon: Target, trend: null },
          { label: 'Conversion Rate', value: `${conversionRate}%`, icon: TrendingUp, trend: null },
          { label: 'Pipeline Value', value: `$${(pipelineValue / 1000).toFixed(0)}k`, icon: DollarSign, trend: null },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl border border-andy-stone/20 p-5">
            <div className="flex items-center justify-between mb-3">
              <kpi.icon size={20} className="text-andy-gold" />
            </div>
            <p className="text-2xl font-bold text-andy-black">{kpi.value}</p>
            <p className="text-xs text-andy-bronze mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Lead Growth */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
          <h2 className="font-serif text-lg font-bold text-andy-black mb-6">Lead Acquisition (6 Months)</h2>
          <div className="flex items-end gap-3 h-40">
            {byMonth.months.map((month, i) => {
              const count = byMonth.leadsPerMonth[i] || 0;
              const pct = (count / byMonth.maxVal) * 100;
              return (
                <div key={month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-bold text-andy-black">{count}</span>
                  <div
                    className="w-full bg-andy-gold/20 rounded-t-lg hover:bg-andy-gold/30 transition-colors relative"
                    style={{ height: `${pct || 4}%`, minHeight: count > 0 ? '8px' : '4px' }}
                  >
                    <div className="absolute inset-0 bg-andy-gold rounded-t-lg" style={{ height: count > 0 ? '100%' : '0' }} />
                  </div>
                  <span className="text-xs text-andy-bronze/70">{month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Source Quality */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
          <h2 className="font-serif text-lg font-bold text-andy-black mb-6">Source Quality</h2>
          <div className="space-y-4">
            {bySource.map(([source, count]) => {
              const sourceLeads = leads.filter((l) => l.source === source);
              const avg = sourceLeads.length > 0 ? Math.round(sourceLeads.reduce((s, l) => s + l.leadScore, 0) / sourceLeads.length) : 0;
              const converted = sourceLeads.filter((l) => l.status === 'converted').length;
              const pct = Math.round((converted / sourceLeads.length) * 100) || 0;
              return (
                <div key={source}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-andy-black capitalize">{source}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-andy-bronze">{count} leads</span>
                      <span className="text-xs font-bold text-andy-gold">avg {avg}</span>
                      <span className="text-xs text-green-600">{pct}% conv.</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-andy-stone/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-andy-gold rounded-full"
                      style={{ width: `${(count / leads.length) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Segment Quality */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
          <h2 className="font-serif text-lg font-bold text-andy-black mb-6">Segment Quality</h2>
          <div className="space-y-4">
            {bySegment.map(({ seg, count, avgScore: segAvg }) => (
              <div key={seg} className="flex items-center justify-between py-2 border-b border-andy-stone/5 last:border-0">
                <span className="text-sm capitalize text-andy-bronze">{seg.replace('_', ' ')}</span>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-andy-bronze">{count} leads</span>
                  <div className="w-16 h-1.5 bg-andy-stone/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-andy-gold rounded-full"
                      style={{ width: `${(count / leads.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-andy-black w-8 text-right">{segAvg}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* High-Intent Categories */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
          <h2 className="font-serif text-lg font-bold text-andy-black mb-6">Interest Categories</h2>
          <div className="space-y-3">
            {topCategories.map(([cat, count]) => (
              <div key={cat}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm capitalize text-andy-bronze">{cat.replace('_', ' ')}</span>
                  <span className="text-sm font-bold text-andy-black">{count}</span>
                </div>
                <div className="w-full h-2 bg-andy-stone/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-andy-gold rounded-full"
                    style={{ width: `${(count / (topCategories[0]?.[1] || 1)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          {hottest && (
            <div className="mt-4 pt-3 border-t border-andy-stone/10">
              <p className="text-xs text-andy-bronze">
                Hottest interest: <span className="font-bold text-andy-gold capitalize">{hottest.replace('_', ' ')}</span>
              </p>
            </div>
          )}
        </div>

        {/* Subscriber Tier Distribution */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
          <h2 className="font-serif text-lg font-bold text-andy-black mb-6">Subscriber Tiers</h2>
          <div className="space-y-3">
            {(['vip', 'collector', 'prospect', 'reader'] as const).map((tier) => {
              const count = counts[tier];
              const pct = subs.length > 0 ? Math.round((count / subs.length) * 100) : 0;
              return (
                <div key={tier}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm capitalize text-andy-bronze">{tier}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-andy-black">{count}</span>
                      <span className="text-xs text-andy-bronze/60">{pct}%</span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-andy-stone/20 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${tier === 'vip' ? 'bg-andy-gold' : tier === 'collector' ? 'bg-andy-black' : 'bg-andy-stone'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top VIP Leads */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
          <h2 className="font-serif text-lg font-bold text-andy-black mb-6">Top VIP Leads</h2>
          <div className="space-y-3">
            {[...vipLeads, ...hotLeads].sort((a, b) => b.leadScore - a.leadScore).slice(0, 6).map((lead) => (
              <div key={lead.id} className="flex items-center justify-between py-2.5 border-b border-andy-stone/5 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{lead.profile.fullName}</p>
                  <p className="text-xs text-andy-bronze/60">{lead.interest.itemTitle || lead.interest.category}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-andy-gold">{lead.leadScore}</span>
                  <p className="text-xs text-andy-bronze/60">{formatDate(lead.createdAt)}</p>
                </div>
              </div>
            ))}
            {leads.length === 0 && (
              <p className="text-sm text-andy-bronze/40 text-center py-8">No leads yet. Seed data loads on first visit.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}