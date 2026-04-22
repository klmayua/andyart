'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAppStore } from '@/stores/useAppStore';
import { Heart } from 'lucide-react';

interface ArtworkCardProps {
  id: string;
  title: string;
  slug: string;
  artist: {
    name: string;
    slug: string;
  };
  price: number | null;
  isPriceOnRequest: boolean;
  images: string[];
  category: string;
  inStock: boolean;
}

export default function ArtworkCard({
  id,
  title,
  slug,
  artist,
  price,
  isPriceOnRequest,
  images,
  category,
  inStock,
}: ArtworkCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useAppStore();
  const inWishlist = isInWishlist(id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  return (
    <Link href={`/gallery/${slug}`} className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
        {/* Gradient overlay for depth and pop effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none z-10" />
        
        {/* Glassmorphism border effect */}
        <div className="absolute inset-0 rounded-2xl border border-white/50 pointer-events-none z-20" />
        
        {/* Subtle inner glow */}
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_rgba(255,255,255,0.3)] pointer-events-none z-10" />
        
        <Image
          src={images[0] || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800'}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Wishlist button with glassmorphism */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all z-30 flex items-center justify-center"
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={18}
            className={inWishlist ? 'fill-error text-error' : 'text-text-secondary'}
          />
        </button>

        {/* Out of stock badge with glassmorphism */}
        {!inStock && (
          <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full shadow-lg z-30">
            Sold
          </div>
        )}
      </div>

      <div className="mt-4 space-y-1.5 px-1">
        <h3 className="font-serif text-base font-semibold text-primary group-hover:text-primary/80 transition-colors">
          {title}
        </h3>
        <Link
          href={`/artists/${artist.slug}`}
          className="block text-sm text-text-secondary hover:text-primary transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {artist.name}
        </Link>
        <p className="text-sm font-medium text-primary">
          {isPriceOnRequest ? 'Price on request' : price ? `$${price.toLocaleString()}` : 'Inquire for price'}
        </p>
      </div>
    </Link>
  );
}
