'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Mail, Phone, Star, TrendingUp, DollarSign, Palette, Eye, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getCollectorProfile, getCollectorStats } from '@/lib/collector';
import { COLLECTOR_TIER_LABELS, COLLECTOR_TIER_COLORS } from '@/types/collector';

function useCurrentCollector() {
  const { user } = useAuth();
  return useMemo(() => {
    if (!user) return null;
    const all = (() => { try { return JSON.parse(localStorage.getItem('andyart_collector_profiles') || '[]'); } catch { return []; } })();
    const byEmail = all.find((c: any) => c.email.toLowerCase() === user.email.toLowerCase());
    if (byEmail) return byEmail;
    return getCollectorProfile('col-001');
  }, [user]);
}

export default function CollectorProfilePage() {
  const collector = useCurrentCollector();
  const stats = useMemo(() => collector ? getCollectorStats(collector.id) : null, [collector]);

  if (!collector) {
    return <div className="text-center py-20 text-sm text-andy-bronze">Loading profile...</div>;
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-andy-black mb-6">Collector Profile</h1>

      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-andy-stone/20 p-6 mb-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 bg-andy-black text-andy-gold rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0">
            {collector.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="font-serif text-xl font-bold text-andy-black">{collector.name}</h2>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-andy-gold/10 ${COLLECTOR_TIER_COLORS[collector.tier]}`}>
                {COLLECTOR_TIER_LABELS[collector.tier]}
              </span>
            </div>
            <p className="text-sm text-andy-bronze mb-3">{collector.bio}</p>
            <div className="flex flex-wrap gap-4 text-xs text-andy-bronze">
              <span className="flex items-center gap-1"><MapPin size={12} /> {collector.location}</span>
              <span className="flex items-center gap-1"><Mail size={12} /> {collector.email}</span>
              {collector.phone && <span className="flex items-center gap-1"><Phone size={12} /> {collector.phone}</span>}
              <span className="flex items-center gap-1"><Calendar size={12} /> Collecting since {collector.collectingSince}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Spent', value: stats ? `$${(stats.totalSpent / 1000).toFixed(0)}k` : '—', icon: DollarSign },
          { label: 'Acquisitions', value: stats?.totalAcquisitions || 0, icon: TrendingUp },
          { label: 'Avg. Value', value: stats ? `$${(stats.avgAcquisitionValue / 1000).toFixed(0)}k` : '—', icon: Star },
          { label: 'Wishlist', value: stats?.wishlistCount || 0, icon: Eye },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-andy-stone/10 p-4 text-center">
            <p className="text-lg font-bold text-andy-black">{s.value}</p>
            <p className="text-xs text-andy-bronze mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Collecting Focus */}
      <div className="bg-white rounded-2xl border border-andy-stone/20 p-6 mb-6">
        <h3 className="font-serif text-base font-bold text-andy-black mb-4">Collecting Focus</h3>
        <div className="space-y-3">
          {collector.collectingFocus.map((focus) => (
            <div key={focus.category} className="flex items-center gap-3">
              <span className="text-xs text-andy-bronze w-32">{focus.category}</span>
              <div className="flex-1">
                <div className="w-full h-2 bg-andy-stone/10 rounded-full overflow-hidden">
                  <div className="h-full bg-andy-gold rounded-full" style={{ width: `${(focus.strength / 5) * 100}%` }} />
                </div>
              </div>
              <span className="text-xs font-bold text-andy-black w-4">{focus.strength}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Preferred Mediums */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
          <h3 className="font-serif text-base font-bold text-andy-black mb-4">Preferred Mediums</h3>
          <div className="flex flex-wrap gap-2">
            {collector.preferredMediums.map((m) => (
              <span key={m} className="px-3 py-1.5 bg-andy-stone/5 rounded-lg text-xs text-andy-bronze border border-andy-stone/10">{m}</span>
            ))}
          </div>
        </div>

        {/* Preferred Artists */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
          <h3 className="font-serif text-base font-bold text-andy-black mb-4">Preferred Artists</h3>
          <div className="flex flex-wrap gap-2">
            {collector.preferredArtists.map((a) => (
              <span key={a} className="px-3 py-1.5 bg-andy-gold/5 rounded-lg text-xs text-andy-gold border border-andy-gold/10">{a}</span>
            ))}
          </div>
        </div>

        {/* Acquisition Budget */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
          <h3 className="font-serif text-base font-bold text-andy-black mb-4">Acquisition Profile</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-andy-bronze">Budget Range</span><span className="text-andy-black font-medium capitalize">{collector.acquisitionBudget.replace('_', ' ')}</span></div>
            <div className="flex justify-between"><span className="text-andy-bronze">Access Level</span><span className="text-andy-black font-medium capitalize">{collector.privateAccessLevel.replace('_', ' ')}</span></div>
            <div className="flex justify-between"><span className="text-andy-bronze">Preferred Currency</span><span className="text-andy-black font-medium">{collector.preferredCurrency}</span></div>
            <div className="flex justify-between"><span className="text-andy-bronze">Member Since</span><span className="text-andy-black font-medium">{new Date(collector.joinDate).toLocaleDateString()}</span></div>
          </div>
        </div>

        {/* Concierge Notes */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
          <h3 className="font-serif text-base font-bold text-andy-black mb-4">Concierge Notes</h3>
          <p className="text-sm text-andy-bronze leading-relaxed">{collector.conciergeNotes}</p>
        </div>

        {/* Cross-System Links */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
          <h3 className="font-serif text-base font-bold text-andy-black mb-4">Financial Profile</h3>
          <div className="space-y-2">
            <Link href="/collector/payments" className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-andy-bronze hover:bg-andy-stone/5 hover:text-andy-black transition-all">
              <span>View Payments</span>
              <ArrowRight size={12} />
            </Link>
            <Link href="/collector/invoices" className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-andy-bronze hover:bg-andy-stone/5 hover:text-andy-black transition-all">
              <span>View Invoices</span>
              <ArrowRight size={12} />
            </Link>
            <Link href="/collector/transactions" className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-andy-bronze hover:bg-andy-stone/5 hover:text-andy-black transition-all">
              <span>View Transactions</span>
              <ArrowRight size={12} />
            </Link>
            <Link href="/collector/acquisitions" className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-andy-bronze hover:bg-andy-stone/5 hover:text-andy-black transition-all">
              <span>View Acquisitions</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}