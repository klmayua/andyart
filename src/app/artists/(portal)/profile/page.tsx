'use client';

import { useState, useEffect } from 'react';
import {
  MapPin, GraduationCap, Award, Calendar, Instagram, Globe, Linkedin, CheckCircle, XCircle, Clock,
} from 'lucide-react';
import { useCurrentArtist } from '@/hooks/useCurrentArtist';
import { getStudio } from '@/lib/artist';
import { AVAILABILITY_LABELS, ARTIST_STATUS_LABELS } from '@/types/artist';
import InlineLoader from '@/components/InlineLoader';

export default function ArtistProfilePage() {
  const artist = useCurrentArtist();
  const [studio, setStudio] = useState<any>(null);

  useEffect(() => {
    if (!artist) return;
    setStudio(getStudio(artist.id));
  }, [artist]);

  if (!artist) {
    return <InlineLoader label="Loading profile..." />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-andy-black">Artist Profile</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 bg-andy-stone/30 rounded-2xl flex items-center justify-center text-2xl font-bold text-andy-black flex-shrink-0">
                {artist.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="font-serif text-xl font-bold text-andy-black">{artist.name}</h2>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${artist.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                    {ARTIST_STATUS_LABELS[artist.status]}
                  </span>
                </div>
                <p className="text-sm text-andy-bronze mb-3">{artist.basedIn} · {AVAILABILITY_LABELS[artist.availabilityStatus]}</p>
                <div className="flex flex-wrap gap-2">
                  {artist.mediums.map((m) => (
                    <span key={m} className="text-[10px] px-2.5 py-1 bg-andy-stone/10 text-andy-bronze rounded-full capitalize">{m.replace('_', ' ')}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
            <h3 className="font-serif text-base font-bold text-andy-black mb-3">Biography</h3>
            <p className="text-sm text-andy-bronze leading-relaxed">{artist.biography}</p>
          </div>

          {/* Artist Statement */}
          <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
            <h3 className="font-serif text-base font-bold text-andy-black mb-3">Artist Statement</h3>
            <p className="text-sm text-andy-bronze leading-relaxed italic">&ldquo;{artist.artistStatement}&rdquo;</p>
          </div>

          {/* Exhibitions */}
          <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
            <div className="px-6 py-4 border-b border-andy-stone/10">
              <h3 className="font-serif text-base font-bold text-andy-black">Exhibition History</h3>
            </div>
            <div className="divide-y divide-andy-stone/5">
              {artist.exhibitions.map((ex, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-andy-black">{ex.title}</p>
                    <p className="text-xs text-andy-bronze/60">{ex.venue} · {ex.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-andy-bronze">{ex.year}</p>
                    <p className="text-[10px] text-andy-bronze/50 capitalize">{ex.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
            <div className="px-6 py-4 border-b border-andy-stone/10">
              <h3 className="font-serif text-base font-bold text-andy-black">Awards & Recognition</h3>
            </div>
            <div className="divide-y divide-andy-stone/5">
              {artist.awards.length > 0 ? artist.awards.map((aw, i) => (
                <div key={i} className="px-6 py-4 flex items-start gap-3">
                  <Award size={16} className="text-andy-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-andy-black">{aw.title}</p>
                    <p className="text-xs text-andy-bronze/60">{aw.organization} · {aw.year}</p>
                    {aw.description && <p className="text-xs text-andy-bronze/50 mt-1">{aw.description}</p>}
                  </div>
                </div>
              )) : (
                <div className="px-6 py-8 text-center text-sm text-andy-bronze/40">No awards yet</div>
              )}
            </div>
          </div>

          {/* Education */}
          {artist.education && artist.education.length > 0 && (
            <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-andy-stone/10">
                <h3 className="font-serif text-base font-bold text-andy-black">Education</h3>
              </div>
              <div className="divide-y divide-andy-stone/5">
                {artist.education.map((ed, i) => (
                  <div key={i} className="px-6 py-4 flex items-start gap-3">
                    <GraduationCap size={16} className="text-andy-bronze mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-andy-black">{ed.institution}</p>
                      <p className="text-xs text-andy-bronze/60">{ed.degree} · {ed.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
            <h3 className="font-serif text-base font-bold text-andy-black mb-4">Account Status</h3>
            <div className="space-y-3">
              {[
                { label: 'Identity Verified', value: artist.verifiedIdentity },
                { label: 'Contract Signed', value: artist.contractSigned },
                { label: 'Insurance Coverage', value: artist.insuranceCoverage },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-xs text-andy-bronze">{item.label}</span>
                  {item.value ? <CheckCircle size={14} className="text-green-600" /> : <XCircle size={14} className="text-red-500" />}
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 border-t border-andy-stone/10">
                <span className="text-xs text-andy-bronze">Commission Split</span>
                <span className="text-sm font-bold text-andy-gold">{artist.commissionRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-andy-bronze">Member Since</span>
                <span className="text-xs text-andy-black">{new Date(artist.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Studio Info */}
          {studio && (
            <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
              <h3 className="font-serif text-base font-bold text-andy-black mb-4">Studio</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-andy-bronze mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-andy-black">{studio.name}</p>
                    <p className="text-xs text-andy-bronze/60">{studio.address}<br/>{studio.city}, {studio.country}</p>
                  </div>
                </div>
                {studio.size && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-andy-bronze">Size</span>
                    <span className="text-xs text-andy-black">{studio.size}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-andy-bronze">Type</span>
                  <span className="text-xs text-andy-black capitalize">{studio.type}</span>
                </div>
                {studio.openingHours && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-andy-bronze">Hours</span>
                    <span className="text-xs text-andy-black">{studio.openingHours}</span>
                  </div>
                )}
                <div className="flex items-center gap-4 pt-2">
                  {studio.hasClimateControl && <span className="text-[10px] px-2 py-0.5 bg-green-50 text-green-700 rounded-full">Climate</span>}
                  {studio.hasSecurity && <span className="text-[10px] px-2 py-0.5 bg-green-50 text-green-700 rounded-full">Security</span>}
                  {studio.accessibleToVisitors && <span className="text-[10px] px-2 py-0.5 bg-andy-gold/10 text-andy-gold rounded-full">Open</span>}
                </div>
              </div>
            </div>
          )}

          {/* Social Links */}
          {artist.socialLinks && (
            <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
              <h3 className="font-serif text-base font-bold text-andy-black mb-4">Online Presence</h3>
              <div className="space-y-2">
                {artist.socialLinks.instagram && (
                  <div className="flex items-center gap-2 text-xs text-andy-bronze">
                    <Instagram size={14} /> {artist.socialLinks.instagram}
                  </div>
                )}
                {artist.socialLinks.website && (
                  <div className="flex items-center gap-2 text-xs text-andy-bronze">
                    <Globe size={14} /> {artist.socialLinks.website}
                  </div>
                )}
                {artist.socialLinks.linkedin && (
                  <div className="flex items-center gap-2 text-xs text-andy-bronze">
                    <Linkedin size={14} /> {artist.socialLinks.linkedin}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Collections */}
          <div className="bg-white rounded-2xl border border-andy-stone/20 p-6">
            <h3 className="font-serif text-base font-bold text-andy-black mb-4">Collections</h3>
            <div className="space-y-2">
              {artist.collectionsFeaturedIn.length > 0 ? artist.collectionsFeaturedIn.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-andy-bronze">
                  <Clock size={12} className="text-andy-gold" /> {c}
                </div>
              )) : (
                <p className="text-xs text-andy-bronze/40">No collections recorded</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
