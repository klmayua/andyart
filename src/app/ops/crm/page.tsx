'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Users, Crown, Zap, UserCheck, TrendingUp, Eye, MessageSquare, ArrowRight, BarChart3 } from 'lucide-react';
import { getAllLeads, getPipelineCounts } from '@/lib/leadCapture';
import { getSubscribers, getSegmentCounts, getHottestInterest } from '@/lib/newsletterScoring';
import type { LeadTemperature } from '@/types/crm';

const TEMP_ICONS: Record<LeadTemperature, string> = {
  vip_priority: 'VIP Priority',
  hot: 'Hot Lead',
  warm: 'Warm',
  cold: 'Cold',
};

const TEMP_COLORS: Record<LeadTemperature, { bg: string; text: string; border: string }> = {
  vip_priority: { bg: 'bg-andy-gold/10', text: 'text-andy-gold', border: 'border-andy-gold/30' },
  hot: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
  warm: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
  cold: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
};

export default function CrmDashboardPage() {
  const [leads, setLeads] = useState([] as any[]);
  const [subs, setSubs] = useState([] as any[]);
  const [counts, setCounts] = useState({ vip: 0, collector: 0, prospect: 0, reader: 0 });
  const [hottest, setHottest] = useState<string | null>(null);
  const [pipeline, setPipeline] = useState({ new: 0, qualified: 0, contacted: 0, negotiation: 0, converted: 0, archived: 0 });

  useEffect(() => {
    const l = getAllLeads();
    const s = getSubscribers();
    setLeads(l);
    setSubs(s);
    setCounts(getSegmentCounts());
    setHottest(getHottestInterest());
    setPipeline(getPipelineCounts());
  }, []);

  const vipLeads = leads.filter((l) => l.temperature === 'vip_priority').sort((a, b) => b.leadScore - a.leadScore);
  const hotLeads = leads.filter((l) => l.temperature === 'hot').sort((a, b) => b.leadScore - a.leadScore);
  const coldLeads = leads.filter((l) => l.temperature === 'cold');

  const totalPipelineValue = leads.reduce((s, l) => {
    if (l.budgetBand === '100000_plus') return s + 100000;
    if (l.budgetBand === '25000_100000') return s + 62500;
    if (l.budgetBand === '5000_25000') return s + 15000;
    if (l.budgetBand === '1000_5000') return s + 3000;
    return s;
  }, 0);

  const conversionRate = leads.length > 0 ? Math.round((leads.filter((l) => l.status === 'converted').length / leads.length) * 100) : 0;

  const avgScore = leads.length > 0 ? Math.round(leads.reduce((s, l) => s + l.leadScore, 0) / leads.length) : 0;

  const topSource = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of leads) map[l.source] = (map[l.source] || 0) + 1;
    return Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';
  }, [leads]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-andy-black">Relationship Command</h1>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Leads', value: leads.length, sub: `${pipeline.new} new`, icon: Users, href: '/ops/crm/leads' },
          { label: 'VIP Priority', value: vipLeads.length, sub: `${hotLeads.length} hot`, icon: Crown, href: '/ops/crm/leads' },
          { label: 'Pipeline Value', value: `$${(totalPipelineValue / 1000).toFixed(0)}k`, sub: `${leads.length} total`, icon: TrendingUp, href: '/ops/crm/pipeline' },
          { label: 'Subscribers', value: subs.length, sub: `${counts.vip} VIP`, icon: UserCheck, href: '/ops/crm/subscribers' },
        ].map((kpi) => (
          <Link
            key={kpi.label}
            href={kpi.href}
            className="bg-white rounded-2xl border border-andy-stone/20 p-5 hover:border-andy-gold/30 hover:shadow-premium transition-all group"
          >
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
          { label: 'Conversion Rate', value: `${conversionRate}%` },
          { label: 'Avg Lead Score', value: avgScore },
          { label: 'Hot Leads', value: hotLeads.length },
          { label: 'Cold Leads', value: coldLeads.length },
          { label: 'Top Source', value: topSource },
        ].map((m) => (
          <div key={m.label} className="bg-white rounded-xl border border-andy-stone/10 p-4 text-center">
            <p className="text-lg font-bold text-andy-black">{m.value}</p>
            <p className="text-xs text-andy-bronze mt-0.5">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* VIP Leads */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <div className="flex items-center gap-3">
              <Crown size={18} className="text-andy-gold" />
              <h2 className="font-serif text-lg font-bold text-andy-black">VIP Priority Leads</h2>
            </div>
            <Link href="/ops/crm/leads" className="text-xs text-andy-bronze hover:text-andy-gold transition-colors">
              View all <ArrowRight size={12} className="inline" />
            </Link>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {vipLeads.length > 0 ? vipLeads.slice(0, 5).map((lead) => {
              const c = TEMP_COLORS[lead.temperature];
              return (
                <div key={lead.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${c.text === 'text-andy-gold' ? 'bg-andy-gold' : 'bg-red-500'}`} />
                    <div>
                      <p className="text-sm font-semibold text-andy-black">{lead.profile.fullName}</p>
                      <p className="text-xs text-andy-bronze/60">{lead.interest.itemTitle || lead.interest.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-andy-bronze capitalize">{lead.segment.replace('_', ' ')}</span>
                    <div className="text-right">
                      <span className="text-sm font-bold text-andy-gold">{lead.leadScore}</span>
                      <p className="text-[10px] text-andy-bronze/50">{lead.status}</p>
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="px-6 py-12 text-center">
                <p className="text-sm text-andy-bronze/40">No VIP leads yet</p>
                <p className="text-xs text-andy-bronze/30 mt-1">Leads from modal captures will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Pipeline Snapshot */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <div className="flex items-center gap-3">
              <BarChart3 size={18} className="text-andy-gold" />
              <h2 className="font-serif text-lg font-bold text-andy-black">Pipeline Stages</h2>
            </div>
            <Link href="/ops/crm/pipeline" className="text-xs text-andy-bronze hover:text-andy-gold transition-colors">
              View board <ArrowRight size={12} className="inline" />
            </Link>
          </div>
          <div className="px-6 py-4 space-y-3">
            {([
              { key: 'new', label: 'New' },
              { key: 'qualified', label: 'Qualified' },
              { key: 'contacted', label: 'Contacted' },
              { key: 'negotiation', label: 'Negotiating' },
              { key: 'converted', label: 'Converted' },
              { key: 'archived', label: 'Archived' },
            ] as const).map(({ key, label }) => {
              const count = pipeline[key] || 0;
              const pct = leads.length > 0 ? Math.round((count / leads.length) * 100) : 0;
              return (
                <div key={key} className="flex items-center gap-4">
                  <span className="text-sm text-andy-bronze w-24">{label}</span>
                  <div className="flex-1">
                    <div className="w-full h-2.5 bg-andy-stone/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${key === 'converted' ? 'bg-green-500' : key === 'archived' ? 'bg-gray-400' : 'bg-andy-gold'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-andy-black w-6 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subscriber Tiers */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <div className="flex items-center gap-3">
              <Zap size={18} className="text-andy-gold" />
              <h2 className="font-serif text-lg font-bold text-andy-black">Subscriber Tiers</h2>
            </div>
            <Link href="/ops/crm/subscribers" className="text-xs text-andy-bronze hover:text-andy-gold transition-colors">
              Details <ArrowRight size={12} className="inline" />
            </Link>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-4">
              {(['vip', 'collector', 'prospect', 'reader'] as const).map((tier) => {
                const count = counts[tier];
                const pct = subs.length > 0 ? Math.round((count / subs.length) * 100) : 0;
                return (
                  <div key={tier} className="flex items-center gap-4">
                    <span className="text-sm text-andy-bronze w-20 capitalize">{tier}</span>
                    <div className="flex-1">
                      <div className="w-full h-3 bg-andy-stone/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${tier === 'vip' ? 'bg-andy-gold' : tier === 'collector' ? 'bg-andy-black' : 'bg-andy-stone'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-bold text-andy-black w-6 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
            {hottest && (
              <div className="mt-4 pt-4 border-t border-andy-stone/10 flex items-center gap-2">
                <Zap size={14} className="text-andy-gold" />
                <span className="text-xs text-andy-bronze">Hottest interest:</span>
                <span className="text-xs font-bold text-andy-gold capitalize">{hottest.replace('_', ' ')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
          <h2 className="font-serif text-lg font-bold text-andy-black mb-5">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'View All Leads', href: '/ops/crm/leads', icon: Users },
              { label: 'Pipeline Board', href: '/ops/crm/pipeline', icon: BarChart3 },
              { label: 'Subscribers', href: '/ops/crm/subscribers', icon: UserCheck },
              { label: 'Insights', href: '/ops/crm/insights', icon: TrendingUp },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-andy-stone/20 hover:border-andy-gold/30 hover:bg-andy-stone/5 transition-all"
              >
                <action.icon size={16} className="text-andy-gold" />
                <span className="text-sm font-medium text-andy-black">{action.label}</span>
              </Link>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-andy-stone/10">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs text-andy-bronze hover:text-andy-black transition-colors"
            >
              <Eye size={14} /> Back to public site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}