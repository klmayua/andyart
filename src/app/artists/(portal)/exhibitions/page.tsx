'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, DollarSign, TrendingUp } from 'lucide-react';
import { useCurrentArtist } from '@/hooks/useCurrentArtist';
import { getExhibitions } from '@/lib/artist';
import { EmptyStates } from '@/components/EmptyState';
import InlineLoader from '@/components/InlineLoader';

export default function ArtistExhibitionsPage() {
  const artist = useCurrentArtist();
  const [exhibitions, setExhibitions] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (!artist) return;
    setExhibitions(getExhibitions(artist.id));
  }, [artist]);

  if (!artist) {
    return <InlineLoader label="Loading exhibitions..." />;
  }

  const upcoming = exhibitions.filter((e) => e.status === 'upcoming');
  const active = exhibitions.filter((e) => e.status === 'active');
  const past = exhibitions.filter((e) => e.status === 'past');

  const filtered = filter === 'all' ? exhibitions : filter === 'upcoming' ? upcoming : filter === 'active' ? active : past;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-andy-black">Exhibitions</h1>
        <p className="text-sm text-andy-bronze mt-1">Track your exhibition participation, sales, and attendance.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: 'all', label: 'All', count: exhibitions.length },
          { key: 'upcoming', label: 'Upcoming', count: upcoming.length },
          { key: 'active', label: 'Active', count: active.length },
          { key: 'past', label: 'Past', count: past.length },
        ].map((f) => (
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

      <div className="space-y-4">
        {filtered.map((e) => (
          <div key={e.id} className="bg-white rounded-2xl border border-andy-stone/20 p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-serif text-sm font-bold text-andy-black">{e.exhibitionTitle}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${e.status === 'upcoming' ? 'bg-andy-gold/10 text-andy-gold' : e.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'}`}>
                    {e.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-andy-bronze/60">
                  <span className="flex items-center gap-1"><MapPin size={10} /> {e.venue}</span>
                  <span className="flex items-center gap-1"><Calendar size={10} /> {new Date(e.startDate).toLocaleDateString()} - {new Date(e.endDate).toLocaleDateString()}</span>
                </div>
              </div>
              {e.totalSales > 0 && (
                <div className="text-right">
                  <p className="text-sm font-bold text-andy-gold">${(e.totalSales / 1000).toFixed(0)}k</p>
                  <p className="text-[10px] text-andy-bronze/50">{e.artworksSold} sold</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
              <div className="bg-andy-stone/5 rounded-xl p-3 text-center">
                <p className="text-xs text-andy-bronze/50 mb-0.5">Works</p>
                <p className="text-sm font-bold text-andy-black">{e.artworksAccepted.length}</p>
              </div>
              <div className="bg-andy-stone/5 rounded-xl p-3 text-center">
                <p className="text-xs text-andy-bronze/50 mb-0.5">Attendance</p>
                <p className="text-sm font-bold text-andy-black">{e.attendanceEstimate?.toLocaleString() || '—'}</p>
              </div>
              <div className="bg-andy-stone/5 rounded-xl p-3 text-center">
                <p className="text-xs text-andy-bronze/50 mb-0.5">Interest</p>
                <p className="text-sm font-bold text-andy-black">{e.collectorInterestCount}</p>
              </div>
              <div className="bg-andy-stone/5 rounded-xl p-3 text-center">
                <p className="text-xs text-andy-bronze/50 mb-0.5">Support</p>
                <p className="text-sm font-bold text-andy-black">{e.marketingSupport ? 'Full' : 'Basic'}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {e.shippingProvided && <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">Shipping</span>}
              {e.insuranceProvided && <span className="text-[10px] px-2 py-0.5 bg-green-50 text-green-700 rounded-full">Insurance</span>}
            </div>

            {e.notes && <p className="mt-3 text-xs text-andy-bronze/50 italic">{e.notes}</p>}
          </div>
        ))}
      </div>

      {filtered.length === 0 && <EmptyStates.Exhibitions />}
    </div>
  );
}
