'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, Bookmark, Mail, MessageCircle, Gem, SlidersHorizontal, ChevronDown, Filter } from 'lucide-react';
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
  new: { text: 'New Arrival', style: 'bg-[#7D917D] text-[#FFFDF9]' },
  reserved: { text: 'Reserved', style: 'bg-[#B84C4C] text-[#FFFDF9]' },
  featured: { text: 'Collector Pick', style: 'bg-[#C6A66B] text-[#171614]' },
  premium: { text: 'Signature Work', style: 'bg-[#171614] text-[#C6A66B]' },
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

    if (activeCategory !== 'All') {
      result = result.filter((a) => a.category.toLowerCase() === activeCategory.toLowerCase());
    }

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

    if (availabilityFilter === 'available') {
      result = result.filter((a) => a.inStock);
    } else if (availabilityFilter === 'sold') {
      result = result.filter((a) => !a.inStock);
    }

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
    <div className="min-h-screen pb-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <p className="section-label animate-fade-in-up">Collection</p>
          <h1 className="display-lg mb-6 text-[#171614] animate-fade-in-up delay-1">
            Collect
          </h1>
          <p className="text-md max-w-2xl leading-relaxed animate-fade-in-up delay-2" style={{ color: 'rgba(93, 70, 51, 0.8)' }}>
            Acquire exceptional works from emerging and established African artists.
            Each piece is curated, authenticated, and ready for its next home.
          </p>
        </div>

        {/* Featured Work - Postmodern Grid */}
        {featuredWork && activeCategory === 'All' && activePriceBand === 0 && availabilityFilter === 'all' && sortBy === 'newest' && (
          <div className="mb-16 animate-fade-in-up delay-3">
            <p className="text-sm font-semibold mb-4" style={{ color: '#A78345', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Featured Acquisition
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden card-postmodern">
                <Image src={featuredWork.images[0]} alt={featuredWork.title} fill sizes="50vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full" style={{ background: 'rgba(23, 22, 20, 0.9)', color: '#C6A66B' }}>
                    Signature Work
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <p className="mb-3" style={{ fontSize: '0.875rem', color: '#A78345', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  {featuredWork.artist.name} — {featuredWork.medium}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#171614] mb-4 leading-tight">
                  {featuredWork.title}
                </h2>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(93, 70, 51, 0.85)' }}>
                  {featuredWork.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/gallery/${featuredWork.slug}`}
                    onClick={() => track('artwork_inquire', { page: 'gallery_listing', slug: featuredWork.slug, title: featuredWork.title })}
                    className="btn-postmodern-primary text-sm"
                  >
                    Inquire — ${featuredWork.price?.toLocaleString()}
                  </Link>
                  <Link
                    href="/consult"
                    onClick={() => track('artwork_private_viewing', { page: 'gallery_listing', slug: featuredWork.slug })}
                    className="btn-postmodern-secondary text-sm"
                  >
                    Book Private Viewing
                  </Link>
                </div>
                {featuredWork.collectorInterestCount && featuredWork.collectorInterestCount > 5 && (
                  <p className="text-xs mt-6 flex items-center gap-1.5" style={{ color: 'rgba(93, 70, 51, 0.7)' }}>
                    <Gem size={12} style={{ color: '#C6A66B' }} />
                    {featuredWork.collectorInterestCount} collectors have expressed interest
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Filters Bar */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {artworkCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    track('filter_apply', { page: 'gallery_listing', filter: `category:${cat}` });
                  }}
                  className={`postmodern-label px-4 py-2 text-sm transition-all ${
                    activeCategory === cat
                      ? 'bg-[#171614] text-[#FFFDF9] border-[#171614]'
                      : 'bg-white text-[#5D4633] border-[rgba(23,22,20,0.1)] hover:bg-[#171614] hover:text-[#FFFDF9] hover:border-[#171614]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border hover:bg-[#171614] hover:text-[#FFFDF9]"
                style={{ background: 'rgba(255,253,249,0.5)', borderColor: 'rgba(23,22,20,0.1)', color: '#5D4633' }}
              >
                <SlidersHorizontal size={14} />
                {showFilters ? 'Hide Filters' : 'More Filters'}
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border hover:bg-[#171614] hover:text-[#FFFDF9]"
                  style={{ background: 'rgba(255,253,249,0.5)', borderColor: 'rgba(23,22,20,0.1)', color: '#5D4633' }}
                >
                  {sortOptions.find((s) => s.value === sortBy)?.label}
                  <ChevronDown size={14} />
                </button>
                {isSortOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-lg shadow-lg overflow-hidden z-20" style={{ background: 'white', borderColor: 'rgba(23,22,20,0.08)' }}>
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSortBy(opt.value);
                          setIsSortOpen(false);
                          track('sort_apply', { page: 'gallery_listing', sort: opt.value });
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          sortBy === opt.value ? 'bg-[#F7F2E8] text-[#171614] font-medium' : 'text-[#5D4633] hover:bg-[rgba(215,206,193,0.3)]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="rounded-2xl p-6 space-y-5 animate-fade-in-up" style={{ background: 'rgba(255,253,249,0.5)', border: '1px solid rgba(23,22,20,0.06)' }}>
              <div>
                <p className="text-xs font-medium mb-3" style={{ color: '#A78345', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Price</p>
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
                          ? 'bg-[#171614] text-[#FFFDF9]'
                          : 'bg-white text-[#5D4633] hover:bg-[#D7CEC1]'
                      }`}
                    >
                      {band.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium mb-3" style={{ color: '#A78345', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Availability</p>
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
                        track('filter_apply', { page: 'gallery_listing', filter: `availability:${opt.label}` });
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        availabilityFilter === opt.value
                          ? 'bg-[#171614] text-[#FFFDF9]'
                          : 'bg-white text-[#5D4633] hover:bg-[#D7CEC1]'
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
        <p className="text-xs mb-6" style={{ color: 'rgba(93, 70, 51, 0.6)' }}>
          Showing {filtered.length} work{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Artwork Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {filtered.map((artwork) => {
              const inWishlist = isInWishlist(artwork.id);

              return (
                <div key={artwork.id} className="group">
                  <Link href={`/gallery/${artwork.slug}`} className="block">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl card-postmodern">
                      <Image
                        src={artwork.images[0]}
                        alt={artwork.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {artwork.rarity && (
                        <div className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${rarityLabels[artwork.rarity].style}`}>
                          {rarityLabels[artwork.rarity].text}
                        </div>
                      )}

                      {!artwork.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-serif text-lg font-bold">Acquired</span>
                        </div>
                      )}

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
                        className="absolute top-3 right-3 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 hover:scale-110"
                      >
                        <Heart size={16} className={inWishlist ? 'fill-[#C6A66B] text-[#C6A66B]' : 'text-[#171614]'} />
                      </button>
                    </div>
                  </Link>

                  <Link href={`/gallery/${artwork.slug}`} className="block mt-3">
                    <h3 className="font-serif text-base font-semibold text-[#171614] group-hover:text-[#A78345] transition-colors leading-tight">
                      {artwork.title}
                    </h3>
                  </Link>
                  <Link href={`/artists/${artwork.artist.slug}`} className="text-sm text-[#5D4633] hover:text-[#C6A66B] transition-colors">
                    {artwork.artist.name}
                  </Link>
                  <p className="text-sm mt-1" style={{ color: '#C6A66B' }}>
                    {artwork.isPriceOnRequest ? 'Price on request' : artwork.price ? `$${artwork.price.toLocaleString()}` : 'Inquire'}
                  </p>

                  <div className="flex gap-2 mt-3">
                    <Link
                      href={`/gallery/${artwork.slug}`}
                      onClick={() => track('artwork_inquire', { page: 'gallery_listing', slug: artwork.slug, title: artwork.title })}
                      className="flex-1 btn-postmodern-primary text-xs"
                    >
                      Inquire
                    </Link>
                    {artwork.inStock && (
                      <Link
                        href="/consult"
                        onClick={() => track('artwork_reserve', { page: 'gallery_listing', slug: artwork.slug, title: artwork.title })}
                        className="px-3 py-2 border hover:border-[#C6A66B] hover:text-[#C6A66B] rounded-full text-xs text-[#5D4633] transition-all"
                        title="Reserve"
                      >
                        <Bookmark size={12} />
                      </Link>
                    )}
                  </div>

                  {artwork.inStock && (
                    <div className="flex flex-wrap gap-3 mt-2">
                      <Link
                        href="/consult"
                        onClick={() => track('artwork_private_viewing', { page: 'gallery_listing', slug: artwork.slug })}
                        className="text-[10px] text-[#5D4633] hover:text-[#C6A66B] transition-colors flex items-center gap-1"
                      >
                        <Eye size={10} /> Private Viewing
                      </Link>
                      <a
                        href={`${WA_BASE}?text=${buildWhatsAppMessage({ artworkTitle: artwork.title, artistName: artwork.artist.name, slug: artwork.slug })}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track('artwork_talk_curator', { page: 'gallery_listing', slug: artwork.slug, channel: 'whatsapp' })}
                        className="text-[10px] text-[#5D4633] hover:text-[#C6A66B] transition-colors flex items-center gap-1"
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
          <div className="rounded-2xl p-20 text-center" style={{ background: 'rgba(215,206,193,0.3)', border: '1px solid rgba(215,206,193,0.4)' }}>
            <Filter size={48} className="mx-auto mb-5" style={{ color: 'rgba(93, 70, 51, 0.3)' }} />
            <h3 className="font-serif text-2xl font-semibold text-[#171614] mb-3">No works match your filters</h3>
            <p className="text-[#5D4633] mb-7">Try adjusting your category, price range, or availability settings.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setActivePriceBand(0);
                setAvailabilityFilter('all');
                setSortBy('newest');
              }}
              className="btn-postmodern-primary text-sm"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}