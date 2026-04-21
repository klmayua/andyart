import Link from 'next/link';
import { ChevronLeft, ArrowRight } from 'lucide-react';

export default function ViewingRoomsPage() {
  const viewingRooms = [
    {
      id: '1',
      title: 'Summer Collection 2026',
      slug: 'summer-collection-2026',
      description: 'Explore our curated selection of summer artworks featuring vibrant colors and outdoor themes.',
      artworkCount: 24,
      endDate: 'June 30, 2026',
      image: '/placeholder-room.jpg',
    },
    {
      id: '2',
      title: 'Emerging Artists Showcase',
      slug: 'emerging-artists-showcase',
      description: 'Discover the next generation of artistic talent with our emerging artists collection.',
      artworkCount: 18,
      endDate: 'May 31, 2026',
      image: '/placeholder-room.jpg',
    },
    {
      id: '3',
      title: 'Abstract Expressions',
      slug: 'abstract-expressions',
      description: 'A deep dive into abstract art from our most innovative contemporary artists.',
      artworkCount: 15,
      endDate: 'July 15, 2026',
      image: '/placeholder-room.jpg',
    },
  ];

  return (
    <div className="min-h-screen py-8 px-container-mobile">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6"
        >
          <ChevronLeft size={20} />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Viewing Rooms
          </h1>
          <p className="text-text-secondary">
            Immerse yourself in our curated digital exhibitions. Each viewing room presents a unique collection of artworks around a specific theme or artist.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {viewingRooms.map((room) => (
            <div
              key={room.id}
              className="bg-surface border border-border-light rounded-lg overflow-hidden group"
            >
              <div className="relative aspect-[4/3] bg-background">
                <div className="absolute inset-0 flex items-center justify-center text-text-secondary">
                  <span className="text-sm">Viewing Room Image</span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <h2 className="font-serif text-xl font-semibold text-text-primary group-hover:text-success-gold transition-colors">
                  {room.title}
                </h2>
                <p className="text-sm text-text-secondary line-clamp-2">
                  {room.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">
                    {room.artworkCount} artworks • Until {room.endDate}
                  </span>
                  <Link
                    href={`/viewing-rooms/${room.slug}`}
                    className="text-success-gold text-sm font-medium hover:underline flex items-center gap-1"
                  >
                    Enter <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
