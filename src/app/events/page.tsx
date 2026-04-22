import EventCard from '@/components/EventCard';
import Link from 'next/link';

// Mock data - will be replaced with API call
const events = [
  {
    id: '1',
    title: 'Paint & Sip: Sunset Edition',
    slug: 'paint-sip-sunset',
    description: 'Join us for an evening of painting and wine as we capture the perfect sunset on canvas. All materials provided.',
    startDatetime: '2026-05-15T18:00:00Z',
    endDatetime: '2026-05-15T21:00:00Z',
    location: 'AndyArt Studio, Downtown',
    isVirtual: false,
    ticketPrice: 75,
    image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800',
    remainingTickets: 12,
  },
  {
    id: '2',
    title: 'Artist Talk: Contemporary Visions',
    slug: 'artist-talk-contemporary',
    description: 'Meet our featured artists and learn about their creative process. Q&A session included.',
    startDatetime: '2026-05-22T19:00:00Z',
    endDatetime: '2026-05-22T21:00:00Z',
    location: 'Virtual Event',
    isVirtual: true,
    ticketPrice: 0,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
    remainingTickets: null,
  },
  {
    id: '3',
    title: 'Sculpture Workshop: Clay Basics',
    slug: 'sculpture-workshop-clay',
    description: 'Learn the fundamentals of clay sculpting with professional artist Maria Santos.',
    startDatetime: '2026-06-05T14:00:00Z',
    endDatetime: '2026-06-05T18:00:00Z',
    location: 'AndyArt Studio, Downtown',
    isVirtual: false,
    ticketPrice: 120,
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800',
    remainingTickets: 6,
  },
  {
    id: '4',
    title: 'Gallery Opening: Summer Collection',
    slug: 'gallery-opening-summer',
    description: 'Be the first to see our new summer collection. Wine and hors d\'oeuvres will be served.',
    startDatetime: '2026-06-20T18:00:00Z',
    endDatetime: '2026-06-20T21:00:00Z',
    location: 'AndyArt Gallery, Main Street',
    isVirtual: false,
    ticketPrice: 0,
    image: '/placeholder-event.jpg',
    remainingTickets: 50,
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen py-8 px-container-mobile">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Events
          </h1>
          <p className="text-text-secondary">
            Join us for immersive art experiences, from paint & sip sessions to artist talks and gallery openings.
          </p>
        </div>

        {/* Host Event CTA */}
        <div className="mb-8 bg-primary text-surface rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold mb-2">Want to host an event with us?</h2>
              <p className="text-accent">We partner with venues and organizations for private and public events.</p>
            </div>
            <Link
              href="/events/host"
              className="bg-surface text-primary px-6 py-3 rounded-md font-medium hover:bg-accent transition-colors whitespace-nowrap"
            >
              Request to Host
            </Link>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        {/* Past Events Link */}
        <div className="mt-12 text-center">
          <Link
            href="/events/past"
            className="text-success-gold font-medium hover:underline inline-flex items-center gap-2"
          >
            View Past Events
          </Link>
        </div>
      </div>
    </div>
  );
}
