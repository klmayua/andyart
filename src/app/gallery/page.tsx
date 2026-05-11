'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, BadgeCheck, Frame, CreditCard, ChevronDown, Bookmark, Mail, MessageCircle, Gem, SlidersHorizontal } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { artworks, artworkCategories, priceBands, rarityOrder } from '@/data/artworks';
import { useAnalytics } from '@/hooks/useAnalytics';

const WA_NUMBER = '2348002649278';
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

function buildWhatsAppMessage(opts: { artworkTitle?: string; artistName?: string; slug?: string }): string {
  const lines: string[] = ['Hello AndyArt,'];
  if (opts.artworkTitle) lines.push(`I'm interested in: ${opts.artworkTitle}`);
  if (opts.artistName) lines.push(`Artist: ${opts.artistName}`);
  if (!opts.artworkTitle) lines.push('I would like to speak with your concierge team.');
  return encodeURIComponent(lines.join('\n'));
}

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'curator', label: 'Curator Picks' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rarity', label: 'Rarity' },
  { value: 'interest', label: 'Most Popular' },
];

const rarityLabels: Record<string, { text: string; style: string }> = {
  new: { text: 'New Arrival', style: 'bg-andy-green text-andy-ivory' },
  reserved: { text: 'Reserved', style: 'bg-andy-wine text-andy-ivory' },
  featured: { text: 'Collector Pick', style: 'bg-andy-gold text-andy-black' },
  premium: { text: 'Signature Work', style: 'bg-andy-black text-andy-gold' },
};

export default function GalleryPage() {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useAppStore();
  const { track } = useAnalytics();

  const [activeCategory, setActiveCategory] = useState('All');
  const [activePriceBand, setActivePriceBand] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'sold'>('all');

  const filtered = useMemo(() => {
    let result = [...artworks];

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter((a) => a.category.toLowerCase() === activeCategory.toLowerCase());
    }

    // Price band filter
    const band = priceBands[activePriceBand];
    if (band.label === 'Price on Request') {
      result = result.filter((a) => a.isPriceOnRequest);
    } else if (band.max !== Infinity) {
      result = result.filter((a) => {
        if (a.isPriceOnRequest) return false;
        if (a.price === null) return false;
        return a.price >= band.min && a.price <= band.max;
      });
    }

    // Availability filter
    if (availabilityFilter === 'available') {
      result = result.filter((a) => a.inStock);
    } else if (availabilityFilter === 'sold') {
      result = result.filter((a) => !a.inStock);
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'curator':
        result.sort((a, b) => (b.curatorNote ? 1 : 0) - (a.curatorNote ? 1 : 0));
        break;
      case 'price-low':
        result.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
        break;
      case 'price-high':
        result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case 'rarity':
        result.sort((a, b) => (rarityOrder[b.rarity ?? ''] ?? 0) - (rarityOrder[a.rarity ?? ''] ?? 0));
        break;
      case 'interest':
        result.sort((a, b) => (b.collectorInterestCount ?? 0) - (a.collectorInterestCount ?? 0));
        break;
    }

    return result;
  }, [activeCategory, activePriceBand, sortBy, availabilityFilter]);

  const featuredWork = useMemo(() => artworks.find((a) => a.rarity === 'premium' && a.inStock), []);

  return (
    <div className="min-h-screen pt-24 pb-24 px-4">
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

        {/* Featured Work Hero */}
        {featuredWork && activeCategory === 'All' && activePriceBand === 0 && availabilityFilter === 'all' && sortBy === 'newest' && (
          <div className="mb-12 grid md:grid-cols-2 gap-8 items-center bg-andy-stone/20 rounded-2xl overflow-hidden border border-andy-stone/20 shadow-premium">
            <div className="relative aspect-[4/5] md:aspect-auto md:h-full min-h-[300px]">
              <Image src={featuredWork.images[0]} alt={featuredWork.title} fill sizes="50vw" className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-andy-stone/20 pointer-events-none" />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-andy-black text-andy-gold">
                  Signature Work
                </span>
              </div>
            </div>
            <div className="p-8 md:p-10">
              <p className="text-andy-bronze text-xs uppercase tracking-[0.2em] mb-2">Featured Acquisition</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-andy-black editorial-headline mb-3">
                {featuredWork.title}
              </h2>
              <p className="text-andy-gold font-medium mb-4">
                {featuredWork.artist.name} — {featuredWork.medium}
              </p>
              <p className="text-andy-bronze leading-relaxed mb-6">{featuredWork.description}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/gallery/${featuredWork.slug}`}
                  onClick={() => track('artwork_inquire', { page: 'gallery_listing', slug: featuredWork.slug, title: featuredWork.title })}
                  className="bg-andy-black text-andy-ivory px-6 py-3 rounded-full font-medium text-sm hover:bg-andy-black/80 transition-colors"
                >
                  Inquire — ${featuredWork.price?.toLocaleString()}
                </Link>
                <Link
                  href="/consult"
                  onClick={() => track('artwork_private_viewing', { page: 'gallery_listing', slug: featuredWork.slug })}
                  className="border border-andy-stone/30 text-andy-black px-6 py-3 rounded-full font-medium text-sm hover:bg-andy-stone/20 transition-colors"
                >
                  Book Private Viewing
                </Link>
              </div>
              {featuredWork.collectorInterestCount && featuredWork.collectorInterestCount > 5 && (
                <p className="text-xs text-andy-bronze mt-4 flex items-center gap-1">
                  <Gem size={12} className="text-andy-gold" />
                  {featuredWork.collectorInterestCount} collectors have expressed interest
                </p>
              )}
            </div>
          </div>
        )}

        {/* Filters Bar */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {/* Category Chips */}
            {artworkCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  track('filter_apply', { page: 'gallery_listing', filter: `category:${cat}` });
                }}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-andy-black text-andy-ivory border-andy-black'
                    : 'bg-white text-andy-bronze border-andy-stone/30 hover:bg-andy-black hover:text-andy-ivory'
                }`}
              >
                {cat}
              </button>
            ))}

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-andy-stone/30 bg-white text-sm font-medium text-andy-bronze hover:bg-andy-black hover:text-andy-ivory transition-all"
            >
              <SlidersHorizontal size={14} />
              {showFilters ? 'Hide Filters' : 'More Filters'}
            </button>

            <div className="ml-auto relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-andy-stone/30 bg-white text-sm font-medium text-andy-bronze hover:border-andy-gold/40 transition-all"
              >
                {sortOptions.find((s) => s.value === sortBy)?.label}
                <ChevronDown size={14} />
              </button>
              {isSortOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-andy-stone/30 rounded-xl shadow-premium z-20 overflow-hidden">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSortBy(opt.value);
                        setIsSortOpen(false);
                        track('sort_apply', { page: 'gallery_listing', sort: opt.value });
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        sortBy === opt.value ? 'bg-andy-stone/20 text-andy-black font-medium' : 'text-andy-bronze hover:bg-andy-stone/10'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="bg-white border border-andy-stone/30 rounded-2xl p-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Price Band */}
              <div>
                <p className="text-xs font-medium text-andy-bronze uppercase tracking-[0.2em] mb-2">Price</p>
                <div className="flex flex-wrap gap-2">
                  {priceBands.map((band, idx) => (
                    <button
                      key={band.label}
                      onClick={() => {
                        setActivePriceBand(idx);
                        track('filter_apply', { page: 'gallery_listing', filter: `price:${band.label}` });
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        activePriceBand === idx
                          ? 'bg-andy-black text-andy-ivory'
                          : 'bg-andy-stone/20 text-andy-bronze hover:bg-andy-stone/40'
                      }`}
                    >
                      {band.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <p className="text-xs font-medium text-andy-bronze uppercase tracking-[0.2em] mb-2">Availability</p>
                <div className="flex gap-2">
                  {[
                    { value: 'all', label: 'All' },
                    { value: 'available', label: 'Available' },
                    { value: 'sold', label: 'Sold' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setAvailabilityFilter(opt.value as typeof availabilityFilter);
                        track('filter_apply', { page: 'gallery_listing', filter: `availability:${opt.value}` });
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        availabilityFilter === opt.value
                          ? 'bg-andy-black text-andy-ivory'
                          : 'bg-andy-stone/20 text-andy-bronze hover:bg-andy-stone/40'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <p className="text-xs text-andy-bronze mb-6">
          Showing {filtered.length} work{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Artwork Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((artwork) => {
              const inWishlist = isInWishlist(artwork.id);

              return (
                <div key={artwork.id} className="group">
                  {/* Image Card */}
                  <Link href={`/gallery/${artwork.slug}`} className="block">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-andy-stone/30 mb-4 shadow-subtle group-hover:shadow-premium transition-all duration-500">
                      <Image
                        src={artwork.images[0]}
                        alt={artwork.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-andy-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Rarity Badge */}
                      {artwork.rarity && (
                        <div className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${rarityLabels[artwork.rarity].style}`}>
                          {rarityLabels[artwork.rarity].text}
                        </div>
                      )}

                      {/* Sold badge */}
                      {!artwork.inStock && (
                        <div className="absolute inset-0 bg-andy-black/50 flex items-center justify-center">
                          <span className="text-andy-ivory font-serif text-lg font-bold">Acquired</span>
                        </div>
                      )}

                      {/* Wishlist */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (inWishlist) {
                            removeFromWishlist(artwork.id);
                            track('artwork_wishlist_remove', { page: 'gallery_listing', slug: artwork.slug, title: artwork.title });
                          } else {
                            addToWishlist(artwork.id);
                            track('artwork_wishlist_add', { page: 'gallery_listing', slug: artwork.slug, title: artwork.title });
                          }
                        }}
                        className="absolute top-3 right-3 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full shadow-subtle flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:scale-110"
                      >
                        <Heart size={16} className={inWishlist ? 'fill-andy-gold text-andy-gold' : 'text-andy-black'} />
                      </button>

                      {/* Hover action */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                        <span className="flex-1 bg-andy-ivory/95 backdrop-blur-sm text-andy-black text-xs font-semibold py-2 rounded-full text-center block">
                          <Eye size={12} className="inline mr-1" /> View Details
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Meta */}
                  <Link href={`/gallery/${artwork.slug}`} className="block">
                    <h3 className="font-serif text-base font-semibold text-andy-black group-hover:text-andy-bronze transition-colors">
                      {artwork.title}
                    </h3>
                  </Link>
                  <Link href={`/artists/${artwork.artist.slug}`} className="text-sm text-andy-bronze hover:text-andy-gold transition-colors">
                    {artwork.artist.name}
                  </Link>
                  <p className="text-sm font-medium text-andy-gold mt-1">
                    {artwork.isPriceOnRequest ? 'Price on request' : artwork.price ? `$${artwork.price.toLocaleString()}` : 'Inquire'}
                  </p>

                  {/* Micro badges */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-[10px] bg-andy-stone/30 text-andy-bronze px-2 py-0.5 rounded-full flex items-center gap-1">
                      <BadgeCheck size={10} /> Authenticated
                    </span>
                    {artwork.inStock && (
                      <span className="text-[10px] bg-andy-stone/30 text-andy-bronze px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Frame size={10} /> Framing
                      </span>
                    )}
                    {artwork.price && artwork.price > 10000 && (
                      <span className="text-[10px] bg-andy-stone/30 text-andy-bronze px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CreditCard size={10} /> Installments
                      </span>
                    )}
                  </div>

                  {/* Collector interest */}
                  {artwork.collectorInterestCount && artwork.collectorInterestCount > 5 && (
                    <p className="text-[10px] text-andy-bronze mt-1.5 flex items-center gap-1">
                      <Gem size={10} className="text-andy-gold" />
                      {artwork.collectorInterestCount} interested
                    </p>
                  )}

                  {/* Commercial Actions */}
                  <div className="flex gap-2 mt-3">
                    {artwork.inStock ? (
                      <>
                        <Link
                          href={`/gallery/${artwork.slug}`}
                          onClick={() => track('artwork_inquire', { page: 'gallery_listing', slug: artwork.slug, title: artwork.title })}
                          className="flex-1 bg-andy-black text-andy-ivory text-xs font-semibold py-2 rounded-full text-center hover:bg-andy-black/80 transition-colors"
                        >
                          Inquire
                        </Link>
                        <Link
                          href="/consult"
                          onClick={() => track('artwork_reserve', { page: 'gallery_listing', slug: artwork.slug, title: artwork.title })}
                          className="px-3 py-2 border border-andy-stone/30 rounded-full text-xs font-medium text-andy-bronze hover:border-andy-gold/40 hover:bg-andy-stone/10 transition-colors"
                          title="Reserve"
                        >
                          <Bookmark size={12} />
                        </Link>
                      </>
                    ) : (
                      <button
                        onClick={() => track('artwork_talk_curator', { page: 'gallery_listing', slug: artwork.slug, title: artwork.title })}
                        className="w-full border border-andy-stone/30 text-andy-bronze text-xs font-semibold py-2 rounded-full hover:border-andy-gold/40 hover:bg-andy-stone/10 transition-colors"
                      >
                        Request Similar
                      </button>
                    )}
                  </div>

                  {/* Secondary CTAs */}
                  {artwork.inStock && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Link
                        href="/consult"
                        onClick={() => track('artwork_private_viewing', { page: 'gallery_listing', slug: artwork.slug })}
                        className="text-[10px] text-andy-bronze hover:text-andy-gold transition-colors flex items-center gap-1"
                      >
                        <Eye size={10} /> Private Viewing
                      </Link>
                      <a
                        href={`${WA_BASE}?text=${buildWhatsAppMessage({ artworkTitle: artwork.title, artistName: artwork.artist.name, slug: artwork.slug })}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track('artwork_talk_curator', { page: 'gallery_listing', slug: artwork.slug, channel: 'whatsapp' })}
                        className="text-[10px] text-andy-bronze hover:text-andy-gold transition-colors flex items-center gap-1"
                      >
                        <MessageCircle size={10} /> WhatsApp Curator
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-andy-stone/20 rounded-2xl p-16 text-center border border-andy-stone/20">
            <SlidersHorizontal size={40} className="mx-auto mb-4 text-andy-bronze/50" />
            <h3 className="font-serif text-xl font-semibold text-andy-black mb-2">No works match your filters</h3>
            <p className="text-andy-bronze mb-6">Try adjusting your category, price range, or availability settings.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setActivePriceBand(0);
                setAvailabilityFilter('all');
                setSortBy('newest');
              }}
              className="bg-andy-black text-andy-ivory px-6 py-2.5 rounded-full font-medium text-sm hover:bg-andy-black/80 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
