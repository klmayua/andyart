'use client';

import { ArrowLeft, Calendar, Frame, Eye, MessageCircle } from 'lucide-react';
import { getViewingRoomBySlug } from '@/data/viewingRooms';
import ArtworkCard from '@/components/ArtworkCard';
import { useConversionModal } from '@/hooks/useConversionModal';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function ViewingRoomDetailClient({ slug }: { params: { slug: string } }) {
  const room = getViewingRoomBySlug(slug);
  if (!room) return null;

  const { openPrivateViewing, openConcierge } = useConversionModal();
  const { track } = useAnalytics();
  const availableCount = room.artworks.filter((a) => a.inStock).length;

  return (
    <div className="min-h-screen pt-24 pb-24 px-4">
      <div className="max-w-6xl mx-auto">
        <a href="/viewing-rooms" className="inline-flex items-center gap-2 text-andy-bronze hover:text-andy-black mb-8 text-sm transition-colors">
          <ArrowLeft size={16} />
          Back to Viewing Rooms
        </a>

        {/* Hero */}
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-10 bg-andy-stone/20 shadow-premium">
          <img src={room.heroImage} alt={room.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-andy-black/80 via-andy-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
            <p className="text-andy-gold text-xs uppercase tracking-[0.25em] mb-2 font-medium">Exclusive Access</p>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-andy-ivory editorial-headline max-w-2xl">{room.title}</h1>
          </div>
        </div>

        {/* Info */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          <div className="md:col-span-2">
            <p className="text-andy-bronze leading-[1.8] mb-8">{room.longDescription}</p>
            <div className="flex flex-wrap gap-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-andy-gold/15 text-andy-gold border border-andy-gold/20">{room.artworkCount} works</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-andy-green/15 text-andy-green border border-andy-green/20">{availableCount} available</span>
            </div>
          </div>

          <div className="bg-white border border-andy-stone/30 rounded-2xl p-6 lg:p-8 h-fit">
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 text-andy-bronze text-xs uppercase tracking-[0.2em] mb-1">
                  <Calendar size={12} /> Closes
                </div>
                <p className="font-serif text-xl font-semibold text-andy-black">{room.endDate}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-andy-bronze text-xs uppercase tracking-[0.2em] mb-1">
                  <Frame size={12} /> Works on View
                </div>
                <p className="font-serif text-xl font-semibold text-andy-black">{room.artworkCount}</p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-andy-stone/20 space-y-3">
              <button
                onClick={() => { track('artwork_private_viewing', { page: 'viewing_room_detail', slug }); openPrivateViewing({ contextTitle: room.title, contextSlug: room.slug, contextType: 'viewing-room' }); }}
                className="block w-full text-center bg-andy-black text-andy-ivory px-6 py-3 rounded-full font-medium hover:bg-andy-black/80 transition-colors text-sm"
              >
                Book Private Viewing
              </button>
              <div className="flex gap-2">
                <a href="https://wa.me/2348002649278" target="_blank" rel="noopener noreferrer" className="flex-1 text-center border border-andy-stone/30 text-andy-black px-6 py-3 rounded-full font-medium text-sm hover:bg-andy-stone/20 transition-colors">
                  <MessageCircle size={14} className="inline mr-1" /> WhatsApp
                </a>
                <button
                  onClick={() => { track('service_call_concierge', { page: 'viewing_room_detail', slug }); openConcierge({ context: `Viewing room: ${room.title}` }); }}
                  className="px-4 py-3 border border-andy-stone/30 rounded-full hover:bg-andy-stone/20 transition-colors"
                >
                  <Eye size={14} className="text-andy-bronze" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Works */}
        <div className="mb-6">
          <p className="text-andy-bronze text-xs uppercase tracking-[0.25em] mb-2 font-medium">Curated Selection</p>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-andy-black editorial-headline">Works in this Room</h2>
        </div>

        {room.artworks.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {room.artworks.map((artwork) => <ArtworkCard key={artwork.id} {...artwork} />)}
          </div>
        ) : (
          <div className="bg-andy-stone/20 rounded-2xl p-12 text-center border border-andy-stone/20">
            <p className="text-andy-bronze">No works currently on view.</p>
          </div>
        )}
      </div>
    </div>
  );
}
