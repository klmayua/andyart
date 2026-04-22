'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Heart, Share2, Mail, ChevronLeft } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';

// Mock data - will be replaced with API call
const artwork = {
  id: '1',
  title: 'Sunset Over Mountains',
  slug: 'sunset-over-mountains',
  artist: {
    name: 'Jane Doe',
    slug: 'jane-doe',
    bio: 'Jane Doe is a contemporary artist known for her vibrant landscape paintings.',
    instagram: '@janedoeart',
    website: 'https://janedoe.art',
  },
  price: 2500,
  isPriceOnRequest: false,
  images: [
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
  ],
  category: 'painting',
  inStock: true,
  medium: 'Oil on canvas',
  dimensions: '36 x 48 inches',
  year: 2024,
  curatorNote: 'A stunning depiction of nature\'s beauty at golden hour.',
  description: 'This captivating piece captures the serene moment when the sun dips below the mountain horizon, painting the sky in brilliant hues of orange, pink, and purple. The artist\'s masterful brushwork brings depth and movement to the landscape.',
};

export default function ArtworkDetailPage() {
  const params = useParams();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useAppStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  
  const inWishlist = isInWishlist(artwork.id);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(artwork.id);
    } else {
      addToWishlist(artwork.id);
    }
  };

  return (
    <div className="min-h-screen py-8 px-container-mobile">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6"
        >
          <ChevronLeft size={20} />
          Back to Gallery
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-gray-100">
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
                    className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${artwork.title} thumbnail ${index + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-2">
                {artwork.title}
              </h1>
              <Link
                href={`/artists/${artwork.artist.slug}`}
                className="text-lg text-text-secondary hover:text-text-primary"
              >
                {artwork.artist.name}
              </Link>
            </div>

            <p className="text-2xl font-semibold text-success-gold">
              {artwork.isPriceOnRequest ? 'Price on request' : `$${artwork.price.toLocaleString()}`}
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleWishlistToggle}
                className={`flex-1 px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
                  inWishlist
                    ? 'bg-error text-surface'
                    : 'bg-surface border border-border-light text-text-primary hover:bg-background'
                }`}
              >
                <Heart size={18} className={inWishlist ? 'fill-current' : ''} />
                {inWishlist ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
              <button
                onClick={() => setIsInquiryOpen(true)}
                className="flex-1 bg-primary text-surface px-6 py-3 rounded-md font-medium hover:bg-text-primary transition-colors flex items-center justify-center gap-2"
              >
                <Mail size={18} />
                {artwork.inStock ? 'Inquire to Buy' : 'Contact for Availability'}
              </button>
            </div>

            {/* Details */}
            <div className="border-t border-border-light pt-6 space-y-4">
              <h2 className="font-serif text-xl font-semibold text-text-primary">Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-text-secondary">Medium</span>
                  <p className="font-medium text-text-primary">{artwork.medium}</p>
                </div>
                <div>
                  <span className="text-text-secondary">Dimensions</span>
                  <p className="font-medium text-text-primary">{artwork.dimensions}</p>
                </div>
                <div>
                  <span className="text-text-secondary">Year</span>
                  <p className="font-medium text-text-primary">{artwork.year}</p>
                </div>
                <div>
                  <span className="text-text-secondary">Category</span>
                  <p className="font-medium text-text-primary capitalize">{artwork.category}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-border-light pt-6">
              <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">About this piece</h2>
              <p className="text-text-secondary">{artwork.description}</p>
            </div>

            {/* Curator Note */}
            {artwork.curatorNote && (
              <div className="border-t border-border-light pt-6">
                <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">Curator's Note</h2>
                <p className="text-text-secondary italic">{artwork.curatorNote}</p>
              </div>
            )}

            {/* Share */}
            <div className="border-t border-border-light pt-6">
              <button className="flex items-center gap-2 text-text-secondary hover:text-text-primary">
                <Share2 size={18} />
                <span>Share this artwork</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {isInquiryOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg shadow-large max-w-md w-full p-6">
            <h3 className="font-serif text-2xl font-bold text-text-primary mb-4">
              Inquire about this artwork
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
                  placeholder="I'm interested in this artwork..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsInquiryOpen(false)}
                  className="flex-1 px-4 py-2 border border-border-light rounded-md font-medium text-text-primary hover:bg-background transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-surface px-4 py-2 rounded-md font-medium hover:bg-text-primary transition-colors"
                >
                  Send Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
