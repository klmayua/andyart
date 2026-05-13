'use client';

import { useState, useEffect } from 'react';
import { Layers, TrendingUp, DollarSign, Package, ArrowRight } from 'lucide-react';
import { useCurrentArtist } from '@/hooks/useCurrentArtist';
import { getInventory, getInventoryStats } from '@/lib/artist';
import { OWNERSHIP_STATUS_LABELS, MEDIUM_LABELS } from '@/types/artist';
import { EmptyStates } from '@/components/EmptyState';
import InlineLoader from '@/components/InlineLoader';

export default function ArtistInventoryPage() {
  const artist = useCurrentArtist();
  const [items, setItems] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (!artist) return;
    setItems(getInventory(artist.id));
    setStats(getInventoryStats(artist.id));
  }, [artist]);

  const filtered = filter === 'all' ? items : items.filter((i) => i.status === filter);

  const filters = [
    { key: 'all', label: 'All', count: stats?.total || 0 },
    { key: 'artist_owned', label: 'Owned', count: stats?.available || 0 },
    { key: 'gallery_consigned', label: 'Consigned', count: items.filter((i) => i.status === 'gallery_consigned').length },
    { key: 'sold', label: 'Sold', count: stats?.sold || 0 },
    { key: 'reserved', label: 'Reserved', count: stats?.reserved || 0 },
  ];

  if (!artist || !stats) {
    return <InlineLoader label="Loading inventory..." />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-andy-black">Artwork Portfolio</h1>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Works', value: stats.total, icon: Layers },
          { label: 'Available', value: stats.available, icon: Package },
          { label: 'Total Value', value: `$${(stats.totalValue / 1000).toFixed(0)}k`, icon: DollarSign },
          { label: 'Total Revenue', value: `$${(stats.totalRevenue / 1000).toFixed(0)}k`, icon: TrendingUp },
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

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              filter === f.key
                ? 'bg-andy-gold/10 text-andy-gold border border-andy-gold/30'
                : 'bg-white text-andy-bronze border border-andy-stone/20 hover:border-andy-gold/30'
            }`}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden hover:border-andy-gold/30 transition-all">
            <div className="aspect-[4/3] bg-andy-stone/20 flex items-center justify-center">
              <Layers size={32} className="text-andy-stone/50" />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.status === 'sold' ? 'bg-green-50 text-green-700' : item.status === 'reserved' ? 'bg-orange-50 text-orange-600' : 'bg-andy-gold/10 text-andy-gold'}`}>
                  {OWNERSHIP_STATUS_LABELS[item.status]}
                </span>
                <span className="text-[10px] text-andy-bronze/50">{item.year}</span>
              </div>
              <h3 className="font-serif text-sm font-bold text-andy-black mb-1">{item.title}</h3>
              <p className="text-xs text-andy-bronze/60 mb-3">{MEDIUM_LABELS[item.medium]} · {item.dimensions}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-andy-gold">${(item.price / 1000).toFixed(0)}k</p>
                {item.soldPrice && item.soldPrice !== item.price && (
                  <p className="text-xs text-green-600">Sold ${(item.soldPrice / 1000).toFixed(0)}k</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && <EmptyStates.Inventory />}
    </div>
  );
}
