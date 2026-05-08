import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PastEventsPage() {
  const pastEvents = [
    {
      id: '1',
      title: 'Holiday Gala 2025',
      slug: 'holiday-gala-2025',
      date: 'December 15, 2025',
      description: 'Our annual holiday celebration featuring live music, art auctions, and festive refreshments.',
    },
    {
      id: '2',
      title: 'Fall Exhibition Opening',
      slug: 'fall-exhibition-opening',
      date: 'October 5, 2025',
      description: 'Preview of our fall collection with artist meet-and-greet and wine tasting.',
    },
    {
      id: '3',
      title: 'Summer Heritage Workshop Series',
      slug: 'summer-heritage-workshop-series',
      date: 'August 20, 2025',
      description: 'A month-long series of heritage workshops for children and families.',
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="text-andy-bronze text-xs uppercase tracking-[0.25em] mb-2 font-medium">Archive</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-andy-black editorial-headline mb-3">
            Past Experiences
          </h1>
        </div>

        <div className="space-y-4">
          {pastEvents.map((event) => (
            <div key={event.id} className="bg-white border border-andy-stone/30 rounded-2xl overflow-hidden hover:border-andy-gold/30 transition-colors">
              <div className="grid md:grid-cols-3 gap-0">
                <div className="relative aspect-square md:aspect-auto bg-andy-stone/20">
                  <div className="absolute inset-0 flex items-center justify-center text-andy-bronze">
                    <span className="text-sm">Experience</span>
                  </div>
                </div>
                <div className="md:col-span-2 p-6">
                  <h2 className="font-serif text-xl font-semibold text-andy-black mb-2">{event.title}</h2>
                  <p className="text-sm text-andy-gold mb-3">{event.date}</p>
                  <p className="text-andy-bronze mb-4 text-sm leading-relaxed">{event.description}</p>
                  <Link href={`/events/${event.slug}`} className="text-andy-black font-medium hover:text-andy-gold transition-colors text-sm flex items-center gap-1">
                    View details <ArrowRight size={14} />
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
