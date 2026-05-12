'use client';

import {
  Paintbrush, TrendingUp, Layers, AlertTriangle, CreditCard, Calendar,
} from 'lucide-react';
import { ARTIST_STATUS_LABELS, PAYOUT_STATUS_LABELS } from '@/types/artist';

interface OpsArtistsClientProps {
  artists: any[];
  consignments: any[];
  payouts: any[];
  exhibitions: any[];
  commissions: any[];
  inventoryHealth: any[];
  expiryAlerts: any[];
  payoutQueue: any[];
  upcomingExhibitions: any[];
}

export default function OpsArtistsClient({
  artists, payouts, inventoryHealth, expiryAlerts, payoutQueue, upcomingExhibitions,
}: OpsArtistsClientProps) {
  const activeArtists = artists.filter((a) => a.status === 'active');
  const pendingOnboarding = artists.filter((a) => a.status === 'pending_onboarding');
  const totalRevenue = artists.reduce((s, a) => s + (a.totalRevenue || 0), 0);
  const totalWorks = artists.reduce((s, a) => s + (a.totalWorks || 0), 0);
  const topArtists = [...artists].sort((a, b) => (b.totalRevenue || 0) - (a.totalRevenue || 0)).slice(0, 5);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-andy-black">Artist Console</h1>
          <p className="text-sm text-andy-bronze mt-1">Supply-side pipeline, inventory health, and payout operations.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Artists', value: activeArtists.length, sub: `${pendingOnboarding.length} pending onboarding`, icon: Paintbrush },
          { label: 'Total Works', value: totalWorks, sub: `${inventoryHealth.filter((a) => a.health === 'healthy').length} healthy inventories`, icon: Layers },
          { label: 'Total Revenue', value: `$${(totalRevenue / 1000000).toFixed(1)}M`, sub: 'All-time artist sales', icon: TrendingUp },
          { label: 'Pending Payouts', value: payoutQueue.length, sub: `$${(payoutQueue.reduce((s, p) => s + (p.netAmount || 0), 0) / 1000).toFixed(0)}k queued`, icon: CreditCard },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl border border-andy-stone/20 p-5 hover:border-andy-gold/30 hover:shadow-premium transition-all">
            <div className="flex items-center justify-between mb-3">
              <kpi.icon size={20} className="text-andy-gold" />
            </div>
            <p className="text-2xl font-bold text-andy-black">{kpi.value}</p>
            <p className="text-xs text-andy-bronze mt-0.5">{kpi.label}</p>
            <p className="text-xs text-andy-bronze/50">{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Performing Artists */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <div className="flex items-center gap-3">
              <TrendingUp size={18} className="text-andy-gold" />
              <h2 className="font-serif text-lg font-bold text-andy-black">Top Performing Artists</h2>
            </div>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {topArtists.map((a, i) => (
              <div key={a.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-andy-bronze/30 w-4">{i + 1}</span>
                  <div>
                    <p className="text-sm font-semibold text-andy-black">{a.name}</p>
                    <p className="text-xs text-andy-bronze/60">{(a.totalSold || 0)} sold · {(a.collectorCount || 0)} collectors</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-andy-gold">${((a.totalRevenue || 0) / 1000).toFixed(0)}k</p>
                  <p className="text-[10px] text-andy-bronze/50">{a.commissionRate}% split</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Health */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <div className="flex items-center gap-3">
              <Layers size={18} className="text-andy-gold" />
              <h2 className="font-serif text-lg font-bold text-andy-black">Inventory Health</h2>
            </div>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {inventoryHealth.slice(0, 5).map((a) => (
              <div key={a.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{a.name}</p>
                  <p className="text-xs text-andy-bronze/60">{(a.total || 0)} works · {(a.available || 0)} available</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-andy-bronze">${((a.totalValue || 0) / 1000).toFixed(0)}k value</p>
                    <p className="text-[10px] text-andy-bronze/50">${((a.totalRevenue || 0) / 1000).toFixed(0)}k sold</p>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${a.health === 'healthy' ? 'bg-green-500' : a.health === 'sold_out' ? 'bg-andy-gold' : 'bg-red-500'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consignment Expiry Alerts */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <div className="flex items-center gap-3">
              <AlertTriangle size={18} className="text-andy-gold" />
              <h2 className="font-serif text-lg font-bold text-andy-black">Consignment Expiry Alerts</h2>
            </div>
            <span className="text-xs text-andy-bronze">{expiryAlerts.length} alerts</span>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {expiryAlerts.length > 0 ? expiryAlerts.slice(0, 5).map((c) => {
              const daysLeft = Math.ceil((new Date(c.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              return (
                <div key={c.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-andy-black">{c.artworkTitle}</p>
                    <p className="text-xs text-andy-bronze/60">{c.artistName} · {c.agreementNumber}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold ${daysLeft < 14 ? 'text-red-600' : 'text-andy-gold'}`}>{daysLeft} days left</span>
                    <p className="text-[10px] text-andy-bronze/50">{new Date(c.endDate).toLocaleDateString()}</p>
                  </div>
                </div>
              );
            }) : (
              <div className="px-6 py-12 text-center text-sm text-andy-bronze/40">No expiry alerts</div>
            )}
          </div>
        </div>

        {/* Payout Queue */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <div className="flex items-center gap-3">
              <CreditCard size={18} className="text-andy-gold" />
              <h2 className="font-serif text-lg font-bold text-andy-black">Payout Queue</h2>
            </div>
            <span className="text-xs text-andy-bronze">{payoutQueue.length} pending</span>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {payoutQueue.length > 0 ? payoutQueue.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{p.payoutNumber}</p>
                  <p className="text-xs text-andy-bronze/60">{p.artistName} · {new Date(p.periodStart).toLocaleDateString()} - {new Date(p.periodEnd).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-andy-gold">${((p.netAmount || 0) / 1000).toFixed(0)}k</p>
                  <span className="text-[10px] text-andy-gold bg-andy-gold/10 px-1.5 py-0.5 rounded-full">{PAYOUT_STATUS_LABELS[p.status as any] || p.status}</span>
                </div>
              </div>
            )) : (
              <div className="px-6 py-12 text-center text-sm text-andy-bronze/40">No pending payouts</div>
            )}
          </div>
        </div>

        {/* Exhibition Readiness */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-andy-gold" />
              <h2 className="font-serif text-lg font-bold text-andy-black">Exhibition Readiness</h2>
            </div>
            <span className="text-xs text-andy-bronze">{upcomingExhibitions.length} upcoming</span>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {upcomingExhibitions.length > 0 ? upcomingExhibitions.map((e) => {
              const daysUntil = Math.ceil((new Date(e.startDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              return (
                <div key={e.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-andy-black">{e.exhibitionTitle}</p>
                    <p className="text-xs text-andy-bronze/60">{e.artistName} · {e.venue}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold ${daysUntil < 30 ? 'text-red-600' : daysUntil < 60 ? 'text-andy-gold' : 'text-green-600'}`}>{daysUntil} days</span>
                    <p className="text-[10px] text-andy-bronze/50">{(e.artworksAccepted as string[]).length} works ready</p>
                  </div>
                </div>
              );
            }) : (
              <div className="px-6 py-12 text-center text-sm text-andy-bronze/40">No upcoming exhibitions</div>
            )}
          </div>
        </div>

        {/* Artist Pipeline */}
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-andy-stone/10">
            <div className="flex items-center gap-3">
              <Paintbrush size={18} className="text-andy-gold" />
              <h2 className="font-serif text-lg font-bold text-andy-black">Artist Pipeline</h2>
            </div>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {artists.slice(0, 5).map((a) => (
              <div key={a.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-andy-stone/30 rounded-full flex items-center justify-center text-xs font-bold text-andy-black">
                    {a.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-andy-black">{a.name}</p>
                    <p className="text-xs text-andy-bronze/60">{a.basedIn} · {(a.totalWorks || 0)} works</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${a.status === 'active' ? 'bg-green-50 text-green-700' : a.status === 'pending_onboarding' ? 'bg-andy-gold/10 text-andy-gold' : 'bg-gray-50 text-gray-600'}`}>
                    {ARTIST_STATUS_LABELS[a.status as any] || a.status}
                  </span>
                  <div className="text-right">
                    <p className="text-xs font-bold text-andy-gold">{a.commissionRate}%</p>
                    <p className="text-[10px] text-andy-bronze/50">split</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
