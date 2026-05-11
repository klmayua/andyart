'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Heart, Share2, ChevronLeft, BadgeCheck, Frame, CreditCard, Bookmark, Eye, MessageCircle } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { getArtworkBySlug } from '@/data/artworks';
import { useConversionModal } from '@/hooks/useConversionModal';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function ArtworkDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const artwork = getArtworkBySlug(slug);

  if (!artwork) notFound();

  const { addToWishlist, removeFromWishlist, isInWishlist } = useAppStore();
  const { openInquiry, openReserve, openPrivateViewing, openConcierge } = useConversionModal();
  const { track } = useAnalytics();
  const [selectedImage, setSelectedImage] = useState(0);

  const inWishlist = isInWishlist(artwork.id);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(artwork.id);
      track('artwork_wishlist_remove', { page: 'artwork_detail', slug });
    } else {
      addToWishlist(artwork.id);
      track('artwork_wishlist_add', { page: 'artwork_detail', slug, title: artwork.title });
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        <Link href="/gallery" className="inline-flex items-center gap-2 text-andy-bronze hover:text-andy-black mb-6 text-sm transition-colors">
          <ChevronLeft size={18} />
          Back to Collect
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-andy-stone/20 shadow-premium">
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-andy-black/10 pointer-events-none z-10" />
              <div className="absolute inset-0 rounded-2xl border border-andy-ivory/40 pointer-events-none z-20" />
              <Image
                src={artwork.images[selectedImage] || artwork.images[0]}
                alt={artwork.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            {artwork.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {artwork.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                      selectedImage === index ? 'border-andy-gold shadow-lg' : 'border-andy-stone/30 hover:shadow-md'
                    }`}
                  >
                    <Image src={image} alt={`${artwork.title} ${index + 1}`} fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {artwork.rarity && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-andy-gold text-andy-black">
                    {artwork.rarity === 'new' ? 'New Arrival' : artwork.rarity === 'reserved' ? 'Reserved' : artwork.rarity === 'featured' ? 'Collector Pick' : artwork.rarity === 'premium' ? 'Signature Work' : 'Featured'}
                  </span>
                )}
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-andy-green text-andy-ivory">Authenticated</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-andy-black mb-2">{artwork.title}</h1>
              <Link href={`/artists/${artwork.artist.slug}`} className="text-lg text-andy-bronze hover:text-andy-black transition-colors">
                {artwork.artist.name}
              </Link>
            </div>

            <p className="text-2xl font-semibold text-andy-gold">
              {artwork.isPriceOnRequest ? 'Price on request' : artwork.price ? `$${artwork.price.toLocaleString()}` : 'Inquire'}
            </p>

            {/* Primary Commercial CTAs */}
            {artwork.inStock ? (
              <div className="flex gap-3">
                <button onClick={handleWishlistToggle} className={`flex-1 px-6 py-3 rounded-full font-medium transition-all flex items-center justify-center gap-2 text-sm ${inWishlist ? 'bg-andy-wine text-andy-ivory' : 'bg-white border border-andy-stone/30 text-andy-black hover:bg-andy-stone/20'}`}>
                  <Heart size={16} className={inWishlist ? 'fill-current' : ''} />
                  {inWishlist ? 'Saved' : 'Save'}
                </button>
                <button
                  onClick={() => { track('artwork_inquire', { page: 'artwork_detail', slug, title: artwork.title }); openInquiry({ artworkTitle: artwork.title, artworkSlug: artwork.slug, artworkPrice: artwork.price, isPriceOnRequest: artwork.isPriceOnRequest }); }}
                  className="flex-1 bg-andy-black text-andy-ivory px-6 py-3 rounded-full font-medium hover:bg-andy-black/80 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  Inquire
                </button>
                <button
                  onClick={() => { track('service_call_concierge', { page: 'artwork_detail', channel: 'whatsapp', slug }); openConcierge({ context: `Artwork inquiry: ${artwork.title}` }); }}
                  className="px-4 py-3 border border-andy-stone/30 rounded-full hover:bg-andy-stone/20 transition-colors"
                  aria-label="WhatsApp concierge"
                >
                  <MessageCircle size={16} className="text-andy-bronze" />
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => { track('artwork_talk_curator', { page: 'artwork_detail', slug }); openConcierge({ context: `Request similar to ${artwork.title}` }); }}
                  className="flex-1 bg-andy-black text-andy-ivory px-6 py-3 rounded-full font-medium hover:bg-andy-black/80 transition-all text-sm"
                >
                  Request Similar
                </button>
              </div>
            )}

            {/* Secondary Actions */}
            <div className="flex flex-wrap gap-3">
              {artwork.inStock && (
                <button
                  onClick={() => { track('artwork_reserve', { page: 'artwork_detail', slug, title: artwork.title }); openReserve({ artworkTitle: artwork.title, artworkSlug: artwork.slug, artworkPrice: artwork.price }); }}
                  className="text-sm text-andy-bronze hover:text-andy-gold transition-colors flex items-center gap-1.5"
                >
                  <Bookmark size={14} /> Reserve for 72 hrs
                </button>
              )}
              <button
                onClick={() => { track('artwork_private_viewing', { page: 'artwork_detail', slug, title: artwork.title }); openPrivateViewing({ contextTitle: artwork.title, contextSlug: artwork.slug, contextType: 'artwork' }); }}
                className="text-sm text-andy-bronze hover:text-andy-gold transition-colors flex items-center gap-1.5"
              >
                <Eye size={14} /> Private Viewing
              </button>
            </div>

            {/* Micro badges */}
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] bg-andy-stone/20 text-andy-bronze px-2.5 py-1 rounded-full flex items-center gap-1"><BadgeCheck size={10} /> Authenticated</span>
              <span className="text-[10px] bg-andy-stone/20 text-andy-bronze px-2.5 py-1 rounded-full flex items-center gap-1"><Frame size={10} /> Framing Available</span>
              {artwork.price && artwork.price > 10000 && (
                <span className="text-[10px] bg-andy-stone/20 text-andy-bronze px-2.5 py-1 rounded-full flex items-center gap-1"><CreditCard size={10} /> Installments</span>
              )}
            </div>

            {/* Details */}
            <div className="border-t border-andy-stone/20 pt-6 space-y-4">
              <h2 className="font-serif text-xl font-semibold text-andy-black">Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-andy-bronze">Medium</span><p className="font-medium text-andy-black">{artwork.medium}</p></div>
                <div><span className="text-andy-bronze">Dimensions</span><p className="font-medium text-andy-black">{artwork.dimensions}</p></div>
                <div><span className="text-andy-bronze">Year</span><p className="font-medium text-andy-black">{artwork.year}</p></div>
                <div><span className="text-andy-bronze">Category</span><p className="font-medium text-andy-black capitalize">{artwork.category}</p></div>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-andy-stone/20 pt-6">
              <h2 className="font-serif text-xl font-semibold text-andy-black mb-3">About this piece</h2>
              <p className="text-andy-bronze leading-relaxed">{artwork.description}</p>
            </div>

            {artwork.curatorNote && (
              <div className="border-t border-andy-stone/20 pt-6">
                <h2 className="font-serif text-xl font-semibold text-andy-black mb-3">Curator&apos;s Note</h2>
                <p className="text-andy-bronze italic leading-relaxed">{artwork.curatorNote}</p>
              </div>
            )}

            <div className="border-t border-andy-stone/20 pt-6">
              <button className="flex items-center gap-2 text-andy-bronze hover:text-andy-black transition-colors text-sm">
                <Share2 size={16} /><span>Share this artwork</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
