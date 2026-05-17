'use client';

import { useMemo } from 'react';
import { Users, TrendingUp, Globe, Zap, Crown } from 'lucide-react';
import { useClientData } from '@/hooks/useClientData';
import { getSubscribers, getSegmentCounts, getHottestInterest } from '@/lib/newsletterScoring';
import type { SubscriberTier, InterestTag } from '@/types/newsletter';
import { getTierColor, getTierLabel } from '@/lib/newsletterScoring';

const INTEREST_LABELS: Record<InterestTag, string> = {
  collectors_circle: 'Circle Membership',
  acquisitions: 'Acquisitions',
  private_viewings: 'Private Viewings',
  exhibitions: 'Exhibitions',
  events: 'Experiences',
  commissions: 'Commissions',
  interior_curation: 'Interior Curation',
  hospitality_design: 'Hospitality Design',
  journal: 'Journal',
  investment_opportunities: 'Investment',
  institutional: 'Institutional',
};

const TIERS: SubscriberTier[] = ['vip', 'collector', 'prospect', 'reader'];

export default function SubscribersPage() {
  const subs = useClientData(() => getSubscribers(), []);
  const counts = useClientData(() => getSegmentCounts(), { reader: 0, prospect: 0, collector: 0, vip: 0 }, [subs]);
  const hottest = useClientData(() => getHottestInterest(), null, [subs]);

  const byCountry = useMemo(() => {
    const map: Record<string, number> = {};
    for (const s of subs) {
      const c = s.identity.country || 'Unknown';
      map[c] = (map[c] || 0) + 1;
    }
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [subs]);

  const byInterest = useMemo(() => {
    const map: Partial<Record<InterestTag, number>> = {};
    for (const s of subs) {
      for (const i of s.interests) {
        map[i] = (map[i] || 0) + 1;
      }
    }
    return Object.entries(map).sort((a, b) => b[1] - a[1]) as [InterestTag, number][];
  }, [subs]);

  const avgScore = useMemo(() => {
    if (subs.length === 0) return 0;
    return Math.round(subs.reduce((sum, s) => sum + s.score, 0) / subs.length);
  }, [subs]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#F5EBDD]">Subscribers</h1>
          <p className="text-sm text-[#B9A48A] mt-1">{subs.length} total subscribers</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {TIERS.map((tier) => {
          const color = getTierColor(tier);
          const count = counts[tier];
          return (
            <div key={tier} className="bg-[linear-gradient(180deg,rgba(34,29,25,0.88)_0%,rgba(24,20,18,0.96)_100%)] rounded-xl border border-[rgba(214,170,92,0.10)] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${color.bg} flex items-center justify-center`}>
                  {tier === 'vip' ? <Crown size={18} className={color.text} /> : <Users size={18} className={color.text} />}
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${color.bg} ${color.text}`}>
                  {Math.round((count / subs.length) * 100) || 0}%
                </span>
              </div>
              <p className="text-2xl font-bold text-[#FFF3DF]">{count}</p>
              <p className="text-sm text-[#7B6854] mt-0.5">{getTierLabel(tier)}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={18} className="text-andy-gold" />
            <h2 className="font-serif text-lg font-bold text-andy-black">Interest Distribution</h2>
          </div>
          <div className="space-y-3">
            {byInterest.map(([interest, count]) => (
              <div key={interest} className="flex items-center gap-3">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-andy-bronze">{INTEREST_LABELS[interest]}</span>
                    <span className="text-sm font-bold text-andy-black">{count}</span>
                  </div>
                  <div className="w-full h-2 bg-andy-stone/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-andy-gold rounded-full"
                      style={{ width: `${(count / subs.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {hottest && (
            <div className="mt-5 pt-4 border-t border-andy-stone/10">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-andy-gold" />
                <span className="text-sm font-semibold text-andy-black">Hottest interest:</span>
                <span className="text-sm text-andy-gold font-bold">{INTEREST_LABELS[hottest]}</span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
          <div className="flex items-center gap-2 mb-5">
            <Globe size={18} className="text-andy-gold" />
            <h2 className="font-serif text-lg font-bold text-andy-black">Geography</h2>
          </div>
          <div className="space-y-3">
            {byCountry.slice(0, 12).map(([country, count]) => (
              <div key={country} className="flex items-center justify-between py-2 border-b border-andy-stone/5 last:border-0">
                <span className="text-sm text-andy-bronze">{country}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-andy-stone/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-andy-gold rounded-full"
                      style={{ width: `${(count / byCountry[0][1]) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-andy-black w-6 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
          <h2 className="font-serif text-lg font-bold text-andy-black mb-5">Email Cadence Preferences</h2>
          <div className="space-y-4">
            {(['weekly', 'biweekly', 'monthly', 'important_only'] as const).map((cadence) => {
              const count = subs.filter((s) => s.cadence === cadence).length;
              return (
                <div key={cadence} className="flex items-center justify-between">
                  <span className="text-sm text-andy-bronze capitalize">{cadence.replace('_', ' ')}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-andy-stone/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-andy-black rounded-full"
                        style={{ width: `${(count / subs.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-andy-black w-8 text-right">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
          <h2 className="font-serif text-lg font-bold text-andy-black mb-5">Segment Health</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-andy-bronze">Average Score</span>
              <span className="text-lg font-bold text-andy-gold">{avgScore}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-andy-bronze">With WhatsApp</span>
              <span className="text-sm font-bold text-andy-black">{subs.filter((s) => s.identity.whatsapp).length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-andy-bronze">With Name</span>
              <span className="text-sm font-bold text-andy-black">{subs.filter((s) => s.identity.fullName).length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-andy-bronze">Top Source</span>
              <span className="text-sm font-bold text-andy-black capitalize">
                {(() => {
                  const srcCounts: Record<string, number> = {};
                  for (const s of subs) srcCounts[s.source || 'unknown'] = (srcCounts[s.source || 'unknown'] || 0) + 1;
                  return Object.entries(srcCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'unknown';
                })()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}