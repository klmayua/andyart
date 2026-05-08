import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ViewingRoomsPage() {
  const viewingRooms = [
    {
      id: '1',
      title: 'Heritage Collection Preview',
      slug: 'heritage-collection-preview',
      description: 'Timeless works rooted in African tradition. Preview the full collection before public release.',
      artworkCount: 24,
      endDate: 'June 30, 2026',
    },
    {
      id: '2',
      title: 'Emerging Masters Showcase',
      slug: 'emerging-masters-showcase',
      description: 'Discover the next generation of artistic talent with our emerging artists collection.',
      artworkCount: 18,
      endDate: 'May 31, 2026',
    },
    {
      id: '3',
      title: 'Abstract Expressions',
      slug: 'abstract-expressions',
      description: 'A deep dive into abstract art from our most innovative contemporary artists.',
      artworkCount: 15,
      endDate: 'July 15, 2026',
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-andy-bronze text-xs uppercase tracking-[0.25em] mb-2 font-medium">Exclusive Access</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-andy-black editorial-headline mb-3">
            Viewing Rooms
          </h1>
          <p className="text-andy-bronze max-w-xl leading-relaxed">
            Immersive digital exhibitions. Each viewing room presents a curated collection around a specific theme or artist.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {viewingRooms.map((room) => (
            <div key={room.id} className="bg-white border border-andy-stone/30 rounded-2xl overflow-hidden group hover:border-andy-gold/30 hover:shadow-premium transition-all">
              <div className="relative aspect-[4/3] bg-andy-stone/20">
                <div className="absolute inset-0 flex items-center justify-center text-andy-bronze">
                  <span className="text-sm">Viewing Room</span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <h2 className="font-serif text-xl font-semibold text-andy-black group-hover:text-andy-bronze transition-colors">
                  {room.title}
                </h2>
                <p className="text-sm text-andy-bronze leading-relaxed line-clamp-2">{room.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-andy-bronze">
                    {room.artworkCount} works &bull; Until {room.endDate}
                  </span>
                  <Link href={`/viewing-rooms/${room.slug}`} className="text-andy-gold text-sm font-medium hover:underline flex items-center gap-1">
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
