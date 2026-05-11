'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Instagram, Globe, MapPin, Bookmark, Eye, MessageCircle } from 'lucide-react';
import { getArtistBySlug } from '@/data/artists';
import ArtworkCard from '@/components/ArtworkCard';
import { useConversionModal } from '@/hooks/useConversionModal';
import { useAnalytics } from '@/hooks/useAnalytics';

interface ArtistDetailClientProps {
  slug: string;
}

export default function ArtistDetailClient({ slug }: ArtistDetailClientProps) {
  const artist = getArtistBySlug(slug);
  if (!artist) return null;

  const { openPrivateViewing, openCommission, openConcierge } = useConversionModal();
  const { track } = useAnalytics();
  const inStockCount = artist.artworks.filter((a) => a.inStock).length;

  return (
    <div className="min-h-screen pt-24 pb-24 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/artists" className="inline-flex items-center gap-2 text-andy-bronze hover:text-andy-black mb-8 text-sm transition-colors">
          <ArrowLeft size={16} />
          Back to Artists
        </Link>

        {/* Hero */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-14 mb-16">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-andy-stone/20 shadow-premium">
            <Image src={artist.profileImage} alt={artist.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority />
            <div className="absolute inset-0 rounded-2xl border border-andy-ivory/30 pointer-events-none z-10" />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 text-andy-bronze text-xs uppercase tracking-[0.2em] mb-3">
              <MapPin size={12} />
              {artist.location}
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-andy-black editorial-headline mb-4">{artist.name}</h1>
            <p className="text-andy-gold font-medium text-sm tracking-wide mb-8">{artist.specialty}</p>
            <p className="text-andy-bronze leading-[1.8] mb-10 max-w-lg">{artist.bio}</p>

            <div className="flex flex-wrap gap-3 mb-6">
              {artist.instagram && (
                <a href={`https://instagram.com/${artist.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-andy-stone/30 text-sm text-andy-black hover:border-andy-gold/40 hover:bg-andy-stone/10 transition-all">
                  <Instagram size={14} /> {artist.instagram}
                </a>
              )}
              {artist.website && (
                <a href={artist.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-andy-stone/30 text-sm text-andy-black hover:border-andy-gold/40 hover:bg-andy-stone/10 transition-all">
                  <Globe size={14} /> Website
                </a>
              )}
            </div>

            {/* Artist Commercial Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => { track('artist_commission', { page: 'artist_detail', slug }); openCommission({ artistName: artist.name, artistSlug: artist.slug }); }}
                className="bg-andy-black text-andy-ivory px-5 py-2.5 rounded-full font-medium text-sm hover:bg-andy-black/80 transition-colors"
              >
                Commission a Work
              </button>
              <button
                onClick={() => { track('artwork_private_viewing', { page: 'artist_detail', slug }); openPrivateViewing({ contextTitle: `${artist.name} collection`, contextSlug: artist.slug, contextType: 'artist' }); }}
                className="px-5 py-2.5 rounded-full border border-andy-stone/30 text-sm text-andy-black font-medium hover:bg-andy-stone/20 transition-colors"
              >
                Book Studio Visit
              </button>
              <button
                onClick={() => { track('artist_acquire', { page: 'artist_detail', slug }); openConcierge({ context: `Acquiring works by ${artist.name}` }); }}
                className="px-4 py-2.5 rounded-full border border-andy-stone/30 hover:bg-andy-stone/20 transition-colors"
                aria-label="WhatsApp concierge"
              >
                <MessageCircle size={16} className="text-andy-bronze" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 border-y border-andy-stone/20 py-8 mb-16">
          <div className="text-center">
            <p className="font-serif text-3xl md:text-4xl font-bold text-andy-black">{artist.artworks.length}</p>
            <p className="text-[11px] text-andy-bronze uppercase tracking-[0.2em] mt-2">Total Works</p>
          </div>
          <div className="text-center border-x border-andy-stone/20">
            <p className="font-serif text-3xl md:text-4xl font-bold text-andy-black">{inStockCount}</p>
            <p className="text-[11px] text-andy-bronze uppercase tracking-[0.2em] mt-2">Available</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-3xl md:text-4xl font-bold text-andy-black">{artist.artworks[0]?.year ?? '—'}</p>
            <p className="text-[11px] text-andy-bronze uppercase tracking-[0.2em] mt-2">Latest Work</p>
          </div>
        </div>

        {/* Works */}
        <div className="mb-6">
          <p className="text-andy-bronze text-xs uppercase tracking-[0.25em] mb-2 font-medium">Collection</p>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-andy-black editorial-headline">Available Works</h2>
        </div>

        {artist.artworks.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {artist.artworks.map((artwork) => (
              <ArtworkCard key={artwork.id} {...artwork} />
            ))}
          </div>
        ) : (
          <div className="bg-andy-stone/20 rounded-2xl p-12 text-center border border-andy-stone/20">
            <p className="text-andy-bronze">No works currently available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
