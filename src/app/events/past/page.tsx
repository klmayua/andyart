import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function PastEventsPage() {
  const pastEvents = [
    {
      id: '1',
      title: 'Holiday Gala 2025',
      slug: 'holiday-gala-2025',
      date: 'December 15, 2025',
      description: 'Our annual holiday celebration featuring live music, art auctions, and festive refreshments.',
      image: '/placeholder-event.jpg',
    },
    {
      id: '2',
      title: 'Fall Exhibition Opening',
      slug: 'fall-exhibition-opening',
      date: 'October 5, 2025',
      description: 'Preview of our fall collection with artist meet-and-greet and wine tasting.',
      image: '/placeholder-event.jpg',
    },
    {
      id: '3',
      title: 'Summer Paint & Sip Series',
      slug: 'summer-paint-sip-series',
      date: 'August 20, 2025',
      description: 'A month-long series of painting workshops with local artists.',
      image: '/placeholder-event.jpg',
    },
  ];

  return (
    <div className="min-h-screen py-8 px-container-mobile">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6"
        >
          <ChevronLeft size={20} />
          Back to Events
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-8">
          Past Events
        </h1>

        <div className="space-y-6">
          {pastEvents.map((event) => (
            <div
              key={event.id}
              className="bg-surface border border-border-light rounded-lg overflow-hidden"
            >
              <div className="grid md:grid-cols-3 gap-0">
                <div className="relative aspect-square md:aspect-auto bg-background">
                  <div className="absolute inset-0 flex items-center justify-center text-text-secondary">
                    <span className="text-sm">Event Image</span>
                  </div>
                </div>
                <div className="md:col-span-2 p-6">
                  <h2 className="font-serif text-xl font-semibold text-text-primary mb-2">
                    {event.title}
                  </h2>
                  <p className="text-sm text-success-gold mb-3">{event.date}</p>
                  <p className="text-text-secondary mb-4">{event.description}</p>
                  <Link
                    href={`/events/${event.slug}`}
                    className="text-primary font-medium hover:underline text-sm"
                  >
                    View event details
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
