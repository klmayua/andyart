import EventCard from '@/components/EventCard';
import Link from 'next/link';

const categories = [
  'All Experiences',
  'Art and Wine Evenings',
  'Collector Salons',
  'Artist Conversations',
  'Luxury Paint Sessions',
  "Children's Heritage Workshops",
  'Corporate Culture Nights',
  'Private Dinners',
];

const experiences = [
  {
    id: '1',
    title: 'Art and Wine: Sunset Edition',
    slug: 'art-wine-sunset',
    description: 'An intimate evening of curated wine, live jazz, and guided art appreciation. All materials provided.',
    startDatetime: '2026-05-15T18:00:00Z',
    endDatetime: '2026-05-15T21:00:00Z',
    location: 'AndyArt Heritage Room, Lagos',
    isVirtual: false,
    ticketPrice: 150,
    image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800',
    remainingTickets: 8,
  },
  {
    id: '2',
    title: 'Collector Salon: Spring Preview',
    slug: 'collector-salon-spring',
    description: 'An exclusive gathering for Circle members and invited collectors. Preview the spring collection before public release.',
    startDatetime: '2026-05-22T19:00:00Z',
    endDatetime: '2026-05-22T22:00:00Z',
    location: 'AndyArt Private Suite, Lagos',
    isVirtual: false,
    ticketPrice: 0,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
    remainingTickets: null,
  },
  {
    id: '3',
    title: 'Artist Conversation: Ngozi Okeke',
    slug: 'artist-conversation-ngozi',
    description: 'A rare opportunity to hear Ngozi Okeke discuss her latest collection, Roots That Whisper, in an intimate Q&A setting.',
    startDatetime: '2026-06-05T18:00:00Z',
    endDatetime: '2026-06-05T20:00:00Z',
    location: 'Virtual Event',
    isVirtual: true,
    ticketPrice: 25,
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800',
    remainingTickets: 50,
  },
  {
    id: '4',
    title: "Children's Heritage Workshop: Adinkra",
    slug: 'children-heritage-adinkra',
    description: 'A hands-on workshop for ages 6–12 exploring Adinkra symbols through printmaking and storytelling.',
    startDatetime: '2026-06-12T10:00:00Z',
    endDatetime: '2026-06-12T14:00:00Z',
    location: 'AndyArt Studio, Lagos',
    isVirtual: false,
    ticketPrice: 45,
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800',
    remainingTickets: 6,
  },
  {
    id: '5',
    title: 'Private Dinner: The Collector\'s Table',
    slug: 'private-dinner-collectors',
    description: 'An intimate dinner for twelve collectors, hosted by our founder. Each course paired with a curated artwork discussion.',
    startDatetime: '2026-06-20T19:00:00Z',
    endDatetime: '2026-06-20T23:00:00Z',
    location: 'AndyArt Gallery, Main Street',
    isVirtual: false,
    ticketPrice: 350,
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
    remainingTickets: 4,
  },
  {
    id: '6',
    title: 'Corporate Culture Night: Art & Leadership',
    slug: 'corporate-culture-leadership',
    description: 'How art shapes organizational culture. A keynote and panel discussion for senior executives and HR leaders.',
    startDatetime: '2026-06-28T18:00:00Z',
    endDatetime: '2026-06-28T21:00:00Z',
    location: 'Meridian Holdings Auditorium',
    isVirtual: false,
    ticketPrice: 200,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    remainingTickets: 20,
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen py-8 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-andy-bronze text-xs uppercase tracking-[0.25em] mb-2 font-medium">Gatherings</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-andy-black editorial-headline mb-3">
            AndyArt Experiences
          </h1>
          <p className="text-andy-bronze max-w-xl leading-relaxed">
            Immersive gatherings where art, culture, and connection converge. 
            From intimate salons to corporate culture nights.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 rounded-full border border-andy-stone/30 bg-white text-sm font-medium text-andy-bronze hover:bg-andy-black hover:text-andy-ivory transition-all"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Host Event CTA */}
        <div className="mb-12 bg-andy-black text-andy-ivory rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold mb-2">Want to host an experience?</h2>
              <p className="text-andy-ivory/60">We partner with venues, corporations, and private hosts for bespoke gatherings.</p>
            </div>
            <Link
              href="/events/host"
              className="bg-andy-gold text-andy-black px-6 py-3 rounded-full font-medium hover:bg-andy-ivory transition-colors whitespace-nowrap text-sm"
            >
              Request to Host
            </Link>
          </div>
        </div>

        {/* Experiences Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {experiences.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        {/* Past Events Link */}
        <div className="mt-12 text-center">
          <Link
            href="/events/past"
            className="text-andy-gold font-medium hover:underline inline-flex items-center gap-2 text-sm"
          >
            View Past Experiences
          </Link>
        </div>
      </div>
    </div>
  );
}
