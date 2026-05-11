'use client';

import { useMemo } from 'react';
import { Calendar, Star, MapPin, User } from 'lucide-react';
import { useCurrentCollectorId } from '@/hooks/useCurrentCollector';
import { getViewings } from '@/lib/collector';
import { VIEWING_TYPE_LABELS } from '@/types/collector';

export default function CollectorViewingsPage() {
  const collectorId = useCurrentCollectorId();
  const viewings = useMemo(() => collectorId ? getViewings(collectorId) : [], [collectorId]);

  const attended = viewings.filter((v) => v.attended);
  const upcoming = viewings.filter((v) => !v.attended && new Date(v.date) > new Date());

  if (!collectorId) {
    return <div className="text-center py-20 text-sm text-andy-bronze">Loading...</div>;
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-andy-black mb-6">Viewing History</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-andy-stone/10 p-4 text-center">
          <p className="text-lg font-bold text-andy-black">{viewings.length}</p>
          <p className="text-xs text-andy-bronze">Total Viewings</p>
        </div>
        <div className="bg-white rounded-xl border border-andy-stone/10 p-4 text-center">
          <p className="text-lg font-bold text-andy-black">{attended.length}</p>
          <p className="text-xs text-andy-bronze">Attended</p>
        </div>
        <div className="bg-white rounded-xl border border-andy-stone/10 p-4 text-center">
          <p className="text-lg font-bold text-andy-black">{upcoming.length}</p>
          <p className="text-xs text-andy-bronze">Upcoming</p>
        </div>
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-andy-stone/10">
            <h2 className="font-serif text-lg font-bold text-andy-black">Upcoming Viewings</h2>
          </div>
          <div className="divide-y divide-andy-stone/5">
            {upcoming.map((v) => (
              <div key={v.id} className="px-6 py-4 hover:bg-andy-stone/5 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-andy-black">{VIEWING_TYPE_LABELS[v.viewingType]}</p>
                    <p className="text-xs text-andy-bronze/60">{v.location}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-andy-gold/10 text-andy-gold rounded-full font-medium">Upcoming</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-andy-bronze">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(v.date).toLocaleDateString()}</span>
                  {v.curatorName && <span className="flex items-center gap-1"><User size={12} /> {v.curatorName}</span>}
                </div>
                {v.notes && <p className="text-xs text-andy-bronze/50 mt-2">{v.notes}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Past Viewings */}
      <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
        <div className="px-6 py-4 border-b border-andy-stone/10">
          <h2 className="font-serif text-lg font-bold text-andy-black">Past Viewings</h2>
        </div>
        <div className="divide-y divide-andy-stone/5">
          {attended.map((v) => (
            <div key={v.id} className="px-6 py-4 hover:bg-andy-stone/5 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-andy-black">{VIEWING_TYPE_LABELS[v.viewingType]}</p>
                  <p className="text-xs text-andy-bronze/60">{v.location}</p>
                </div>
                <div className="flex items-center gap-1">
                  {v.collectorRating && (
                    <span className="flex items-center gap-1 text-xs text-andy-gold">
                      <Star size={12} fill="currentColor" /> {v.collectorRating}
                    </span>
                  )}
                  <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full font-medium">Attended</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-andy-bronze">
                <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(v.date).toLocaleDateString()}</span>
                {v.curatorName && <span className="flex items-center gap-1"><User size={12} /> {v.curatorName}</span>}
              </div>
              {v.notes && <p className="text-xs text-andy-bronze/50 mt-2">{v.notes}</p>}
              {v.feedback && (
                <div className="mt-2 p-2.5 bg-andy-stone/5 rounded-lg">
                  <p className="text-xs text-andy-bronze italic">&ldquo;{v.feedback}&rdquo;</p>
                </div>
              )}
            </div>
          ))}
          {attended.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-andy-bronze/40">No past viewings</div>
          )}
        </div>
      </div>
    </div>
  );
}