import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Palette, Calendar, Users, Award } from 'lucide-react';

export default function HomePage() {
  const featuredArtworks = [
    {
      id: '1',
      title: 'Sunset Over Mountains',
      slug: 'sunset-over-mountains',
      artist: { name: 'Jane Doe', slug: 'jane-doe' },
      price: 2500,
      isPriceOnRequest: false,
      images: ['/placeholder-artwork.jpg'],
      category: 'painting',
      inStock: true,
    },
    {
      id: '2',
      title: 'Urban Dreams',
      slug: 'urban-dreams',
      artist: { name: 'John Smith', slug: 'john-smith' },
      price: 3200,
      isPriceOnRequest: false,
      images: ['/placeholder-artwork.jpg'],
      category: 'painting',
      inStock: true,
    },
    {
      id: '3',
      title: 'Abstract Emotions',
      slug: 'abstract-emotions',
      artist: { name: 'Jane Doe', slug: 'jane-doe' },
      isPriceOnRequest: true,
      price: null,
      images: ['/placeholder-artwork.jpg'],
      category: 'abstract',
      inStock: true,
    },
  ];

  const upcomingEvents = [
    {
      id: '1',
      title: 'Paint & Sip: Sunset Edition',
      slug: 'paint-sip-sunset',
      description: 'Join us for an evening of painting and wine as we capture the perfect sunset.',
      startDatetime: '2026-05-15T18:00:00Z',
      endDatetime: '2026-05-15T21:00:00Z',
      location: 'AndyArt Studio, Downtown',
      isVirtual: false,
      ticketPrice: 75,
      image: '/placeholder-event.jpg',
      remainingTickets: 12,
    },
    {
      id: '2',
      title: 'Artist Talk: Contemporary Visions',
      slug: 'artist-talk-contemporary',
      description: 'Meet our featured artists and learn about their creative process.',
      startDatetime: '2026-05-22T19:00:00Z',
      endDatetime: '2026-05-22T21:00:00Z',
      location: 'Virtual Event',
      isVirtual: true,
      ticketPrice: 0,
      image: '/placeholder-event.jpg',
      remainingTickets: null,
    },
  ];

  const services = [
    {
      id: '1',
      name: 'Art Consultation',
      slug: 'art-consultation',
      description: 'One-on-one session to help you find the perfect pieces for your space.',
      priceType: 'hourly',
      price: 150,
      icon: '🎨',
      isActive: true,
    },
    {
      id: '2',
      name: 'Corporate Art Curation',
      slug: 'corporate-art-curation',
      description: 'Full-service art selection and installation for offices and commercial spaces.',
      priceType: 'quote',
      price: null,
      icon: '🏢',
      isActive: true,
    },
    {
      id: '3',
      name: 'Paint & Sip Events',
      slug: 'paint-sip-events',
      description: 'Private or public painting events with wine and expert instruction.',
      priceType: 'fixed',
      price: 75,
      icon: '🍷',
      isActive: true,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-background" />
        <div className="relative z-10 text-center px-container-mobile max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6">
            Your digital gallery.
            <br />
            <span className="text-success-gold">Your art business.</span>
            <br />
            Elevated.
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Discover exceptional artwork, book immersive experiences, and partner with a gallery that understands your vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gallery"
              className="bg-primary text-surface px-8 py-4 rounded-md font-medium text-lg hover:bg-text-primary transition-colors inline-flex items-center justify-center gap-2"
            >
              Explore Gallery
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/events"
              className="bg-surface text-text-primary border border-border-light px-8 py-4 rounded-md font-medium text-lg hover:bg-background transition-colors inline-flex items-center justify-center"
            >
              View Events
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-container-mobile">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-md flex items-center justify-center text-3xl mx-auto mb-4">
                <Palette />
              </div>
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Curated Art</h3>
              <p className="text-sm text-text-secondary">Handpicked pieces from emerging and established artists</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-md flex items-center justify-center text-3xl mx-auto mb-4">
                🎨
              </div>
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Art Services</h3>
              <p className="text-sm text-text-secondary">Consultation, curation, and custom experiences</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-md flex items-center justify-center text-3xl mx-auto mb-4">
                <Calendar />
              </div>
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Events</h3>
              <p className="text-sm text-text-secondary">Paint & sip, artist talks, and exclusive previews</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-md flex items-center justify-center text-3xl mx-auto mb-4">
                <Award />
              </div>
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Partnerships</h3>
              <p className="text-sm text-text-secondary">Trade programs for designers and corporations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-16 md:py-24 px-container-mobile bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-primary">Featured Artworks</h2>
            <Link href="/gallery" className="text-success-gold font-medium hover:underline flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {featuredArtworks.map((artwork) => (
              <Link key={artwork.id} href={`/gallery/${artwork.slug}`} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-background mb-3">
                  <div className="absolute inset-0 bg-border-light flex items-center justify-center text-text-secondary">
                    <span className="text-sm">Artwork Image</span>
                  </div>
                </div>
                <h3 className="font-serif text-base font-semibold text-text-primary group-hover:text-success-gold transition-colors">
                  {artwork.title}
                </h3>
                <p className="text-sm text-text-secondary">{artwork.artist.name}</p>
                <p className="text-sm font-medium text-success-gold">
                  {artwork.isPriceOnRequest ? 'Price on request' : artwork.price ? `$${artwork.price.toLocaleString()}` : 'Inquire'}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 md:py-24 px-container-mobile">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-primary">Upcoming Events</h2>
            <Link href="/events" className="text-success-gold font-medium hover:underline flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="rounded-md border border-border-light bg-surface shadow-subtle overflow-hidden">
                <div className="relative aspect-[16/9] bg-border-light">
                  <div className="absolute inset-0 flex items-center justify-center text-text-secondary">
                    <span className="text-sm">Event Image</span>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-serif text-xl font-semibold text-text-primary">{event.title}</h3>
                  <p className="text-sm text-text-secondary line-clamp-2">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">
                      {new Date(event.startDatetime).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="text-lg font-semibold text-success-gold">
                      {event.ticketPrice === 0 ? 'Free' : `$${event.ticketPrice}`}
                    </span>
                  </div>
                  <Link
                    href={`/events/${event.slug}`}
                    className="block w-full bg-primary text-surface text-center px-4 py-2 rounded-md text-sm font-medium hover:bg-text-primary transition-colors"
                  >
                    RSVP Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 px-container-mobile bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-primary">Our Services</h2>
            <Link href="/services" className="text-success-gold font-medium hover:underline flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="rounded-md border border-border-light bg-background p-6">
                <div className="w-14 h-14 bg-accent rounded-md flex items-center justify-center text-2xl mb-4">
                  {service.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold text-text-primary mb-2">{service.name}</h3>
                <p className="text-sm text-text-secondary mb-4">{service.description}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="block w-full bg-primary text-surface text-center px-4 py-2 rounded-md text-sm font-medium hover:bg-text-primary transition-colors"
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-container-mobile bg-primary text-surface">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg md:text-xl text-accent mb-8 max-w-2xl mx-auto">
            Whether you're collecting art for the first time or looking to partner with us for a large project, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/partners/apply"
              className="bg-surface text-primary px-8 py-4 rounded-md font-medium text-lg hover:bg-accent transition-colors inline-flex items-center justify-center"
            >
              Become a Partner
            </Link>
            <Link
              href="/consult"
              className="bg-primary text-surface border border-accent px-8 py-4 rounded-md font-medium text-lg hover:bg-text-primary transition-colors inline-flex items-center justify-center"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-container-mobile bg-background border-t border-border-light">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-serif text-lg font-semibold text-text-primary mb-4">Gallery</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><Link href="/gallery" className="hover:text-text-primary">All Artworks</Link></li>
                <li><Link href="/artists" className="hover:text-text-primary">Artists</Link></li>
                <li><Link href="/viewing-rooms" className="hover:text-text-primary">Viewing Rooms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-text-primary mb-4">Events</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><Link href="/events" className="hover:text-text-primary">Upcoming</Link></li>
                <li><Link href="/events/past" className="hover:text-text-primary">Past Events</Link></li>
                <li><Link href="/events/host" className="hover:text-text-primary">Host an Event</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-text-primary mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><Link href="/services" className="hover:text-text-primary">All Services</Link></li>
                <li><Link href="/consult" className="hover:text-text-primary">Consultation</Link></li>
                <li><Link href="/partners/apply" className="hover:text-text-primary">Partnerships</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-text-primary mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>hello@andyart.gallery</li>
                <li>@andyart</li>
                <li>/company/andyart</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border-light flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-secondary">
              © {new Date().getFullYear()} AndyArt Gallery. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-text-secondary">
              <Link href="/legal/terms" className="hover:text-text-primary">Terms</Link>
              <Link href="/legal/privacy" className="hover:text-text-primary">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
