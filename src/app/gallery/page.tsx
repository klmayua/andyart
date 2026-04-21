'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';

const artworks = [
  {
    id: '1',
    title: 'Sunset Over Mountains',
    slug: 'sunset-over-mountains',
    artist: { name: 'Jane Doe', slug: 'jane-doe' },
    price: 2500,
    isPriceOnRequest: false,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
    category: 'painting',
    inStock: true,
  },
  {
    id: '2',
    title: 'Urban Dreams',
    slug: 'urban-dreams',
    artist: { name: 'John Smith', slug: 'john-smith' },
    price: 3200,
    isPriceOnRequest: false,
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800',
    category: 'painting',
    inStock: true,
  },
  {
    id: '3',
    title: 'Abstract Emotions',
    slug: 'abstract-emotions',
    artist: { name: 'Jane Doe', slug: 'jane-doe' },
    isPriceOnRequest: true,
    price: null,
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    category: 'abstract',
    inStock: true,
  },
  {
    id: '4',
    title: 'Ocean Waves',
    slug: 'ocean-waves',
    artist: { name: 'Emily Chen', slug: 'emily-chen' },
    price: 1800,
    isPriceOnRequest: false,
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800',
    category: 'painting',
    inStock: true,
  },
  {
    id: '5',
    title: 'City Lights',
    slug: 'city-lights',
    artist: { name: 'John Smith', slug: 'john-smith' },
    price: 4500,
    isPriceOnRequest: false,
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800',
    category: 'photography',
    inStock: true,
  },
  {
    id: '6',
    title: 'Nature\'s Whisper',
    slug: 'natures-whisper',
    artist: { name: 'Emily Chen', slug: 'emily-chen' },
    isPriceOnRequest: true,
    price: null,
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800',
    category: 'sculpture',
    inStock: false,
  },
];

const categories = ['All', 'painting', 'sculpture', 'digital', 'photography', 'abstract'];

export default function GalleryPage() {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useAppStore();

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Gallery
        </h1>
        <p className="text-text-secondary mb-8">
          Discover exceptional artwork from emerging and established artists.
        </p>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full border border-border-light bg-white text-sm font-medium text-text-secondary hover:bg-primary hover:text-white transition-colors"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Artwork Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {artworks.map((artwork) => {
            const inWishlist = isInWishlist(artwork.id);
            return (
              <Link key={artwork.id} href={`/gallery/${artwork.slug}`} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-gray-100 mb-3">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (inWishlist) removeFromWishlist(artwork.id);
                      else addToWishlist(artwork.id);
                    }}
                    className="absolute top-3 right-3 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full shadow-medium flex items-center justify-center"
                  >
                    <Heart size={18} className={inWishlist ? 'fill-error text-error' : 'text-text-secondary'} />
                  </button>
                  {!artwork.inStock && (
                    <div className="absolute top-3 left-3 bg-text-primary text-white text-xs px-2 py-1 rounded-sm">
                      Sold
                    </div>
                  )}
                </div>
                <h3 className="font-serif text-base font-semibold text-text-primary group-hover:text-success-gold transition-colors">
                  {artwork.title}
                </h3>
                <p className="text-sm text-text-secondary">{artwork.artist.name}</p>
                <p className="text-sm font-medium text-success-gold">
                  {artwork.isPriceOnRequest ? 'Price on request' : artwork.price ? `$${artwork.price.toLocaleString()}` : 'Inquire'}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
