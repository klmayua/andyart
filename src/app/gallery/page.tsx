'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, BadgeCheck, Bookmark, Gem, Frame, CreditCard } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { IMAGES } from '@/lib/images';

const categories = ['All', 'Heritage', 'Contemporary', 'New Luxury', 'Family Living', 'Corporate'];

const rarityLabels: Record<string, { text: string; style: string }> = {
  new: { text: 'New Arrival', style: 'bg-andy-green text-andy-ivory' },
  reserved: { text: 'Reserved', style: 'bg-andy-wine text-andy-ivory' },
  featured: { text: 'Collector Pick', style: 'bg-andy-gold text-andy-black' },
  premium: { text: 'Signature Work', style: 'bg-andy-black text-andy-gold' },
};

export default function GalleryPage() {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useAppStore();

  return (
    <div className="min-h-screen py-8 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-andy-bronze text-xs uppercase tracking-[0.25em] mb-2 font-medium">Collection</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-andy-black editorial-headline mb-3">
            Collect
          </h1>
          <p className="text-andy-bronze max-w-xl leading-relaxed">
            Acquire exceptional works from emerging and established African artists. 
            Each piece is curated, authenticated, and ready for its next home.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className="px-5 py-2 rounded-full border border-andy-stone/30 bg-white text-sm font-medium text-andy-bronze hover:bg-andy-black hover:text-andy-ivory transition-all"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Artwork Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {IMAGES.artworks.map((artwork, index) => {
            const inWishlist = isInWishlist(artwork.id);
            const slug = artwork.title.toLowerCase().replace(/\s+/g, '-');
            const artist = index % 2 === 0 ? 'Ngozi Okeke' : 'Kofi Asante';
            const price = index % 3 === 0 ? null : (index + 1) * 2500;
            const inStock = index !== 5;
            const rarity = index === 0 ? 'new' : index === 2 ? 'featured' : index === 4 ? 'premium' : undefined;

            return (
              <div key={artwork.id} className="group">
                <Link href={`/gallery/${slug}`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-andy-stone/30 mb-4">
                    <Image
                      src={artwork.image}
                      alt={artwork.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-andy-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Rarity Badge */}
                    {rarity && (
                      <div className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${rarityLabels[rarity].style}`}>
                        {rarityLabels[rarity].text}
                      </div>
                    )}

                    {/* Wishlist */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (inWishlist) removeFromWishlist(artwork.id);
                        else addToWishlist(artwork.id);
                      }}
                      className="absolute top-3 right-3 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full shadow-subtle flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <Heart size={16} className={inWishlist ? 'fill-andy-gold text-andy-gold' : 'text-andy-black'} />
                    </button>

                    {/* Sold badge */}
                    {!inStock && (
                      <div className="absolute top-3 left-3 bg-andy-black text-andy-ivory text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        Sold
                      </div>
                    )}

                    {/* Hover actions */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                      <span className="flex-1 bg-andy-ivory/95 backdrop-blur-sm text-andy-black text-xs font-semibold py-2 rounded-full text-center">
                        <Eye size={12} className="inline mr-1" /> View Details
                      </span>
                    </div>
                  </div>
                </Link>

                <h3 className="font-serif text-base font-semibold text-andy-black group-hover:text-andy-bronze transition-colors">
                  {artwork.title}
                </h3>
                <p className="text-sm text-andy-bronze">{artist}</p>
                <p className="text-sm font-medium text-andy-gold mt-1">
                  {price ? `$${price.toLocaleString()}` : 'Price on request'}
                </p>

                {/* Micro badges */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[10px] bg-andy-stone/30 text-andy-bronze px-2 py-0.5 rounded-full flex items-center gap-1">
                    <BadgeCheck size={10} /> Authenticated
                  </span>
                  {index % 2 === 0 && (
                    <span className="text-[10px] bg-andy-stone/30 text-andy-bronze px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Frame size={10} /> Framing
                    </span>
                  )}
                  {index % 3 === 0 && (
                    <span className="text-[10px] bg-andy-stone/30 text-andy-bronze px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CreditCard size={10} /> Installments
                    </span>
                  )}
                </div>

                {/* Action row */}
                <div className="flex gap-2 mt-3">
                  {inStock ? (
                    <>
                      <Link
                        href={`/gallery/${slug}`}
                        className="flex-1 bg-andy-black text-andy-ivory text-xs font-semibold py-2 rounded-full text-center hover:bg-andy-black/80 transition-colors"
                      >
                        Inquire
                      </Link>
                      <button className="px-3 py-2 border border-andy-stone/30 rounded-full text-xs font-medium text-andy-bronze hover:border-andy-gold/30 transition-colors">
                        <Bookmark size={12} />
                      </button>
                    </>
                  ) : (
                    <button className="w-full border border-andy-stone/30 text-andy-bronze text-xs font-semibold py-2 rounded-full hover:border-andy-gold/30 transition-colors">
                      Request Similar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
