'use client';

import { useMemo, useState } from 'react';
import { Heart, Trash2, Bell, MessageSquare, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getWishlist, removeFromWishlist, updateWishlistPriority } from '@/lib/collector';

function useCurrentCollectorId() {
  const { user } = useAuth();
  return useMemo(() => {
    if (!user) return null;
    const all = (() => { try { return JSON.parse(localStorage.getItem('andyart_collector_profiles') || '[]'); } catch { return []; } })();
    const byEmail = all.find((c: any) => c.email.toLowerCase() === user.email.toLowerCase());
    return byEmail?.id || 'col-001';
  }, [user]);
}

const PRIORITY_COLORS = {
  low: 'bg-gray-100 text-gray-600',
  medium: 'bg-blue-50 text-blue-600',
  high: 'bg-orange-50 text-orange-600',
  acquiring: 'bg-andy-gold/10 text-andy-gold',
};

export default function CollectorWishlistPage() {
  const collectorId = useCurrentCollectorId();
  const wishlist = useMemo(() => collectorId ? getWishlist(collectorId) : [], [collectorId]);
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? wishlist : wishlist.filter((w) => w.priority === filter);

  if (!collectorId) {
    return <div className="text-center py-20 text-sm text-andy-bronze">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-andy-black">My Wishlist</h1>
        <span className="text-xs text-andy-bronze">{wishlist.length} items</span>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {['all', 'acquiring', 'high', 'medium', 'low'].map((p) => (
          <button
            key={p}
            onClick={() => setFilter(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === p ? 'bg-andy-gold text-andy-black' : 'bg-white text-andy-bronze border border-andy-stone/20 hover:border-andy-gold/30'
            }`}
          >
            {p === 'all' ? 'All' : p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Wishlist */}
      <div className="space-y-3">
        {filtered.map((w) => (
          <div key={w.id} className="bg-white rounded-2xl border border-andy-stone/20 p-5 flex items-start gap-4">
            <div className="w-14 h-14 bg-andy-stone/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Heart size={20} className="text-andy-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{w.artworkTitle}</p>
                  <p className="text-xs text-andy-bronze/60">{w.artistName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${PRIORITY_COLORS[w.priority]}`}>
                    {w.priority}
                  </span>
                  <button
                    onClick={() => { if (collectorId) removeFromWishlist(collectorId, w.id); window.location.reload(); }}
                    className="p-1.5 text-andy-bronze/40 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-andy-bronze mb-2">
                <span className="font-bold text-andy-black">${w.price ? (w.price / 1000).toFixed(0) + 'k' : 'Price on request'}</span>
                <span className="flex items-center gap-1">{w.notifyAvailable ? <Bell size={10} /> : null} {w.notifyAvailable ? 'Notify when available' : null}</span>
                <span className="flex items-center gap-1">{w.conciergeFollowUp ? <MessageSquare size={10} /> : null} {w.conciergeFollowUp ? 'Concierge follow-up' : null}</span>
              </div>
              {w.notes && <p className="text-xs text-andy-bronze/50 italic">{w.notes}</p>}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-andy-stone/20">
            <Heart size={32} className="text-andy-stone/30 mx-auto mb-3" />
            <p className="text-sm text-andy-bronze/40">Your wishlist is empty</p>
            <p className="text-xs text-andy-bronze/30 mt-1">Save artworks you love to track them here</p>
          </div>
        )}
      </div>
    </div>
  );
}