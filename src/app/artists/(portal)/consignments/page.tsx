'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { useCurrentArtist } from '@/hooks/useCurrentArtist';
import { getConsignments } from '@/lib/artist';
import { CONSIGNMENT_STATUS_LABELS } from '@/types/artist';
import { EmptyStates } from '@/components/EmptyState';
import InlineLoader from '@/components/InlineLoader';

export default function ArtistConsignmentsPage() {
  const artist = useCurrentArtist();
  const [consignments, setConsignments] = useState<any[]>([]);

  useEffect(() => {
    if (!artist) return;
    setConsignments(getConsignments(artist.id));
  }, [artist]);

  if (!artist) {
    return <InlineLoader label="Loading consignments..." />;
  }

  const active = consignments.filter((c) => c.status === 'in_gallery' || c.status === 'intake_pending');
  const sold = consignments.filter((c) => c.status === 'sold');
  const expired = consignments.filter((c) => c.status === 'expired' || c.status === 'returned');

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-andy-black">Consignments</h1>
        <p className="text-sm text-andy-bronze mt-1">Track your gallery consignment agreements and splits.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Active', value: active.length, color: 'text-andy-gold' },
          { label: 'Sold', value: sold.length, color: 'text-green-600' },
          { label: 'Expired/Returned', value: expired.length, color: 'text-andy-bronze' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-andy-stone/20 p-5 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-andy-bronze mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {consignments.map((c) => {
          const isExpiringSoon = c.status === 'in_gallery' && new Date(c.endDate).getTime() - Date.now() < 1000 * 60 * 60 * 24 * 30;
          return (
            <div key={c.id} className="bg-white rounded-2xl border border-andy-stone/20 p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif text-sm font-bold text-andy-black">{c.agreementNumber}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${c.status === 'sold' ? 'bg-green-50 text-green-700' : c.status === 'in_gallery' ? 'bg-andy-gold/10 text-andy-gold' : 'bg-gray-50 text-gray-600'}`}>
                      {CONSIGNMENT_STATUS_LABELS[c.status]}
                    </span>
                    {isExpiringSoon && (
                      <span className="flex items-center gap-1 text-[10px] text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                        <AlertTriangle size={10} /> Expiring soon
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-andy-bronze/60">{c.artworkTitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-andy-gold">{c.splitPercentage}%</p>
                  <p className="text-[10px] text-andy-bronze/50">Artist split</p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="bg-andy-stone/5 rounded-xl p-3">
                  <p className="text-andy-bronze/50 mb-0.5">Intake</p>
                  <p className="font-semibold text-andy-black">{new Date(c.intakeDate).toLocaleDateString()}</p>
                </div>
                <div className="bg-andy-stone/5 rounded-xl p-3">
                  <p className="text-andy-bronze/50 mb-0.5">End Date</p>
                  <p className="font-semibold text-andy-black">{new Date(c.endDate).toLocaleDateString()}</p>
                </div>
                <div className="bg-andy-stone/5 rounded-xl p-3">
                  <p className="text-andy-bronze/50 mb-0.5">Insurance</p>
                  <p className="font-semibold text-andy-black capitalize">{c.insuranceStatus}</p>
                </div>
                <div className="bg-andy-stone/5 rounded-xl p-3">
                  <p className="text-andy-bronze/50 mb-0.5">Value</p>
                  <p className="font-semibold text-andy-black">{c.insuranceValue ? `$${(c.insuranceValue / 1000).toFixed(0)}k` : '—'}</p>
                </div>
              </div>

              {c.soldPrice && (
                <div className="mt-3 pt-3 border-t border-andy-stone/10 flex items-center gap-2 text-xs text-green-700">
                  <CheckCircle size={12} /> Sold for ${(c.soldPrice / 1000).toFixed(0)}k on {new Date(c.soldDate!).toLocaleDateString()}
                </div>
              )}

              {c.notes && (
                <p className="mt-3 text-xs text-andy-bronze/50 italic">{c.notes}</p>
              )}
            </div>
          );
        })}
      </div>

      {consignments.length === 0 && <EmptyStates.Consignments />}
    </div>
  );
}
