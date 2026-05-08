'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Heart, Share2, Mail, ChevronLeft, BadgeCheck, Frame, CreditCard, Eye, Bookmark } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';

const artwork = {
  id: '1',
  title: 'Sunset Over Mountains',
  slug: 'sunset-over-mountains',
  artist: {
    name: 'Ngozi Okeke',
    slug: 'ngozi-okeke',
    bio: 'Ngozi Okeke is a contemporary sculptor working in bronze and reclaimed timber. Her work explores identity, memory, and the quiet strength of women across generations.',
    instagram: '@ngoziokeke',
    website: 'https://ngoziokeke.art',
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
  curatorNote: 'A stunning depiction of nature\'s beauty at golden hour. The artist\'s masterful brushwork brings depth and movement to the landscape.',
  description: 'This captivating piece captures the serene moment when the sun dips below the mountain horizon, painting the sky in brilliant hues of orange, pink, and purple.',
  rarity: 'featured',
};

export default function ArtworkDetailPage() {
  const params = useParams();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useAppStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const inWishlist = isInWishlist(artwork.id);

  const handleWishlistToggle = () => {
    if (inWishlist) removeFromWishlist(artwork.id);
    else addToWishlist(artwork.id);
  };

  return (
    <div className="min-h-screen py-8 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        <Link href="/gallery" className="inline-flex items-center gap-2 text-andy-bronze hover:text-andy-black mb-6 text-sm">
          <ChevronLeft size={18} />
          Back to Collect
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-andy-stone/20">
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
                    <Image src={image} alt={`${artwork.title} thumbnail ${index + 1}`} fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-andy-gold text-andy-black">
                  Collector Pick
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-andy-green text-andy-ivory">
                  Authenticated
                </span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-andy-black mb-2">
                {artwork.title}
              </h1>
              <Link href={`/artists/${artwork.artist.slug}`} className="text-lg text-andy-bronze hover:text-andy-black transition-colors">
                {artwork.artist.name}
              </Link>
            </div>

            <p className="text-2xl font-semibold text-andy-gold">
              {artwork.isPriceOnRequest ? 'Price on request' : `$${artwork.price.toLocaleString()}`}
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleWishlistToggle}
                className={`flex-1 px-6 py-3 rounded-full font-medium transition-all flex items-center justify-center gap-2 text-sm ${
                  inWishlist
                    ? 'bg-andy-wine text-andy-ivory'
                    : 'bg-white border border-andy-stone/30 text-andy-black hover:bg-andy-stone/20'
                }`}
              >
                <Heart size={16} className={inWishlist ? 'fill-current' : ''} />
                {inWishlist ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={() => setIsInquiryOpen(true)}
                className="flex-1 bg-andy-black text-andy-ivory px-6 py-3 rounded-full font-medium hover:bg-andy-black/80 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Mail size={16} />
                Inquire
              </button>
              <button className="px-4 py-3 border border-andy-stone/30 rounded-full hover:bg-andy-stone/20 transition-colors">
                <Bookmark size={16} className="text-andy-bronze" />
              </button>
            </div>

            {/* Micro badges */}
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] bg-andy-stone/20 text-andy-bronze px-2.5 py-1 rounded-full flex items-center gap-1">
                <BadgeCheck size={10} /> Authenticated
              </span>
              <span className="text-[10px] bg-andy-stone/20 text-andy-bronze px-2.5 py-1 rounded-full flex items-center gap-1">
                <Frame size={10} /> Framing Available
              </span>
              <span className="text-[10px] bg-andy-stone/20 text-andy-bronze px-2.5 py-1 rounded-full flex items-center gap-1">
                <CreditCard size={10} /> Installments
              </span>
            </div>

            {/* Details */}
            <div className="border-t border-andy-stone/20 pt-6 space-y-4">
              <h2 className="font-serif text-xl font-semibold text-andy-black">Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-andy-bronze">Medium</span>
                  <p className="font-medium text-andy-black">{artwork.medium}</p>
                </div>
                <div>
                  <span className="text-andy-bronze">Dimensions</span>
                  <p className="font-medium text-andy-black">{artwork.dimensions}</p>
                </div>
                <div>
                  <span className="text-andy-bronze">Year</span>
                  <p className="font-medium text-andy-black">{artwork.year}</p>
                </div>
                <div>
                  <span className="text-andy-bronze">Category</span>
                  <p className="font-medium text-andy-black capitalize">{artwork.category}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-andy-stone/20 pt-6">
              <h2 className="font-serif text-xl font-semibold text-andy-black mb-3">About this piece</h2>
              <p className="text-andy-bronze leading-relaxed">{artwork.description}</p>
            </div>

            {/* Curator Note */}
            {artwork.curatorNote && (
              <div className="border-t border-andy-stone/20 pt-6">
                <h2 className="font-serif text-xl font-semibold text-andy-black mb-3">Curator&apos;s Note</h2>
                <p className="text-andy-bronze italic leading-relaxed">{artwork.curatorNote}</p>
              </div>
            )}

            {/* Share */}
            <div className="border-t border-andy-stone/20 pt-6">
              <button className="flex items-center gap-2 text-andy-bronze hover:text-andy-black transition-colors text-sm">
                <Share2 size={16} />
                <span>Share this artwork</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {isInquiryOpen && (
        <div className="fixed inset-0 bg-andy-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-andy-ivory rounded-2xl shadow-premium max-w-md w-full p-6">
            <h3 className="font-serif text-2xl font-bold text-andy-black mb-4">Inquire</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-andy-black mb-1">Name</label>
                <input type="text" required className="w-full px-4 py-2 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-andy-black mb-1">Email</label>
                <input type="email" required className="w-full px-4 py-2 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-andy-black mb-1">Message</label>
                <textarea rows={4} className="w-full px-4 py-2 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white" placeholder="I'm interested in this artwork..." />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setIsInquiryOpen(false)} className="flex-1 px-4 py-2 border border-andy-stone/30 rounded-full font-medium text-andy-black hover:bg-andy-stone/20 transition-colors text-sm">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-andy-black text-andy-ivory px-4 py-2 rounded-full font-medium hover:bg-andy-black/80 transition-colors text-sm">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
