import Link from 'next/link';
import { ArrowRight, Eye, Calendar } from 'lucide-react';

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

export default function ViewingRoomsPage() {
  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-16 pt-8">
          <p className="section-label animate-fade-in-up">Exclusive Access</p>
          <h1 className="display-lg mb-6 text-[#171614] animate-fade-in-up delay-1">
            Viewing Rooms
          </h1>
          <p className="text-md max-w-2xl leading-relaxed animate-fade-in-up delay-2" style={{ color: 'rgba(93, 70, 51, 0.8)' }}>
            Curated private viewing experiences. Browse rare collections, explore thematic exhibitions, and discover works before they reach the public.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {viewingRooms.map((room, idx) => (
            <Link
              key={room.id}
              href={`/viewing-rooms/${room.slug}`}
              className="group card-postmodern overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative aspect-[4/3] bg-gradient-to-br from-[#C6A66B]/20 to-[#A78345]/20 flex items-center justify-center">
                <Eye size={48} className="text-[#C6A66B] opacity-30" />
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#171614] text-[#C6A66B]">
                    Preview
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="font-serif text-xl font-bold text-[#171614] mb-3 group-hover:text-[#C6A66B] transition-colors">
                  {room.title}
                </h2>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: 'rgba(93,70,51,0.7)' }}>
                  {room.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs" style={{ color: 'rgba(93,70,51,0.6)' }}>
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {room.artworkCount} works
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {room.endDate}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:translate-x-1" style={{ background: 'rgba(23, 22, 20, 0.1)' }}>
                    <ArrowRight size={14} style={{ color: '#171614' }} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Private Viewing CTA */}
        <div className="rounded-2xl p-12 text-center border" style={{ background: '#171614' }}>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
            Want a personal viewing experience?
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-8">
            Book a private viewing room session with our curators. Exclusive access, champagne service, and personalized guidance.
          </p>
          <Link href="/consult" className="btn-postmodern-gold text-base">
            Book Private Viewing
          </Link>
        </div>
      </div>
    </div>
  );
}