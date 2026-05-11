'use client';

import { useState, useMemo } from 'react';
import { Crown, Globe, Calendar, Palette, Eye, MessageCircle, Star, ArrowRight, X } from 'lucide-react';
import { useClientData } from '@/hooks/useClientData';
import { getAllVips, saveVip } from '@/lib/concierge';
import type { VipClient } from '@/types/concierge';

const ACCESS_COLORS: Record<string, string> = {
  standard: 'bg-gray-100 text-gray-600',
  preferred: 'bg-blue-100 text-blue-700',
  exclusive: 'bg-andy-gold/15 text-andy-gold',
  founding: 'bg-andy-black text-andy-gold',
};

export default function VipClientsPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<VipClient | null>(null);

  const all = useClientData(() => getAllVips(), [], [selected]);

  const filtered = useMemo(() => {
    if (!search) return [...all].sort((a, b) => b.totalAcquisitions - a.totalAcquisitions);
    const q = search.toLowerCase();
    return all.filter((v) =>
      v.profile.name.toLowerCase().includes(q) ||
      v.profile.email.toLowerCase().includes(q) ||
      v.profile.country.toLowerCase().includes(q) ||
      v.profile.tier?.toLowerCase().includes(q)
    );
  }, [all, search]);

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const formatMoney = (v: string) => v.replace('$', '$');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-andy-black">VIP Clients</h1>
          <p className="text-sm text-andy-bronze mt-1">{filtered.length} clients</p>
        </div>
      </div>

      <div className="relative mb-6 max-w-sm">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email, country..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-andy-stone/30 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-andy-gold/30" />
        <Crown size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-andy-bronze/50" />
      </div>

      <div className="space-y-4">
        {filtered.map((vip) => (
          <div key={vip.id} className="bg-white rounded-2xl border border-andy-stone/20 p-5 hover:border-andy-gold/30 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-14 h-14 bg-andy-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-andy-gold font-bold text-lg">{vip.profile.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-andy-black">{vip.profile.name}</h3>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${ACCESS_COLORS[vip.accessLevel]}`}>{vip.accessLevel}</span>
                  </div>
                  <p className="text-xs text-andy-bronze/70">{vip.profile.email} · {vip.profile.city ? `${vip.profile.city}, ` : ''}{vip.profile.country}</p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="text-xs text-andy-bronze"><Star size={12} className="inline mr-1 text-andy-gold" />{vip.totalAcquisitions} acquisitions</span>
                    <span className="text-xs text-andy-bronze"><Calendar size={12} className="inline mr-1 text-andy-bronze/50" />LTV: {formatMoney(vip.lifetimeValue)}</span>
                    <span className="text-xs text-andy-bronze"><Eye size={12} className="inline mr-1 text-andy-bronze/50" />{vip.privateViewingsCompleted} viewings</span>
                    <span className="text-xs text-andy-bronze"><Palette size={12} className="inline mr-1 text-andy-bronze/50" />{vip.commissionsCompleted} commissions</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-xs text-andy-bronze/50">Since {vip.collectorSince || 'recent'}</span>
                {vip.profile.whatsapp && (
                  <a href={`https://wa.me/${vip.profile.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-green-600 hover:underline">
                    <MessageCircle size={12} /> WhatsApp
                  </a>
                )}
                <button onClick={() => setSelected(vip)} className="text-xs px-3 py-1.5 bg-andy-gold/10 text-andy-gold rounded-full hover:bg-andy-gold/20 transition-colors flex items-center gap-1">
                  Profile <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-andy-stone/20 py-16 text-center text-andy-bronze/50">No VIP clients</div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-andy-black/30 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg bg-[#F7F2E8] shadow-premium overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-andy-stone/20 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-andy-gold/10 rounded-xl flex items-center justify-center">
                  <span className="text-andy-gold font-bold text-lg">{selected.profile.name.charAt(0)}</span>
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold text-andy-black">{selected.profile.name}</h2>
                  <p className="text-xs text-andy-bronze">{selected.profile.city ? `${selected.profile.city}, ` : ''}{selected.profile.country}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)}><X size={20} className="text-andy-bronze" /></button>
            </div>
            <div className="p-6 space-y-5">
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { l: 'Acquisitions', v: selected.totalAcquisitions },
                  { l: 'Lifetime Value', v: formatMoney(selected.lifetimeValue) },
                  { l: 'Events', v: selected.eventsAttended },
                ].map((s) => (
                  <div key={s.l} className="bg-white rounded-xl border border-andy-stone/20 p-4 text-center">
                    <p className="text-xl font-bold text-andy-black">{s.v}</p>
                    <p className="text-xs text-andy-bronze">{s.l}</p>
                  </div>
                ))}
              </div>

              {/* Taste Profile */}
              {selected.profile.tasteProfile && (
                <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                  <p className="text-xs text-andy-bronze uppercase tracking-wider mb-3">Taste Profile</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.profile.tasteProfile.map((t) => (
                      <span key={t} className="text-xs bg-andy-stone/20 text-andy-bronze px-2.5 py-1 rounded-full capitalize">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Interests */}
              {selected.interests.length > 0 && (
                <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                  <p className="text-xs text-andy-bronze uppercase tracking-wider mb-3">Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.interests.map((i) => (
                      <span key={i} className="text-xs bg-andy-gold/10 text-andy-gold px-2.5 py-1 rounded-full capitalize">{i.replace('_', ' ')}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Preferred Artists */}
              {selected.preferredArtists.length > 0 && (
                <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                  <p className="text-xs text-andy-bronze uppercase tracking-wider mb-3">Preferred Artists</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.preferredArtists.map((a) => (
                      <span key={a} className="text-xs bg-andy-stone/20 text-andy-bronze px-2.5 py-1 rounded-full">{a}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Collection History */}
              {selected.acquisitionHistory.length > 0 && (
                <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                  <p className="text-xs text-andy-bronze uppercase tracking-wider mb-3">Recent Acquisitions</p>
                  <div className="space-y-3">
                    {selected.acquisitionHistory.map((a, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-andy-stone/5 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-andy-black">{a.title}</p>
                          <p className="text-xs text-andy-bronze/50">{a.date}</p>
                        </div>
                        <span className="text-sm font-bold text-andy-gold">{a.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Concierge Notes */}
              {selected.profile.conciergeNotes && (
                <div className="bg-andy-gold/5 rounded-xl border border-andy-gold/20 p-5">
                  <p className="text-xs text-andy-gold uppercase tracking-wider mb-2">Concierge Notes</p>
                  <p className="text-sm text-andy-bronze leading-relaxed italic">{selected.profile.conciergeNotes}</p>
                </div>
              )}

              {/* Contact */}
              <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                <p className="text-xs text-andy-bronze uppercase tracking-wider mb-3">Contact</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-andy-bronze"><Globe size={14} />{selected.profile.country}</div>
                  <div className="flex items-center gap-2 text-sm text-andy-bronze">{selected.profile.email}</div>
                  <div className="flex items-center gap-2 text-sm text-andy-bronze">{selected.profile.phone}</div>
                  {selected.profile.whatsapp && (
                    <a href={`https://wa.me/${selected.profile.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-green-600 hover:underline">
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                  )}
                </div>
                <p className="text-xs text-andy-bronze/50 mt-3">Client since {selected.collectorSince || selected.profile.createdAt}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}