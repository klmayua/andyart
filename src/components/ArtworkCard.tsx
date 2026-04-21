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
      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-background">
        <Image
          src={images[0] || '/placeholder-artwork.jpg'}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-102"
          loading="lazy"
        />
        
        {/* Wishlist button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 w-9 h-9 bg-surface rounded-full shadow-medium flex items-center justify-center hover:shadow-large transition-shadow"
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={18}
            className={inWishlist ? 'fill-error text-error' : 'text-text-secondary'}
          />
        </button>

        {/* Out of stock badge */}
        {!inStock && (
          <div className="absolute top-3 left-3 bg-text-primary text-surface text-xs px-2 py-1 rounded-sm">
            Sold
          </div>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="font-serif text-base font-semibold text-text-primary group-hover:text-success-gold transition-colors">
          {title}
        </h3>
        <Link
          href={`/artists/${artist.slug}`}
          className="block text-sm text-text-secondary hover:text-text-primary transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {artist.name}
        </Link>
        <p className="text-sm font-medium text-success-gold">
          {isPriceOnRequest ? 'Price on request' : price ? `$${price.toLocaleString()}` : 'Inquire for price'}
        </p>
      </div>
    </Link>
  );
}
