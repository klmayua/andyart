import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Palette, Calendar, Users, Award } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-background" />
        <Image
          src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1920"
          alt="Art Gallery Hero"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
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
              className="bg-primary text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-text-primary transition-colors inline-flex items-center justify-center gap-2"
            >
              Explore Gallery
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/events"
              className="bg-white text-text-primary border border-border-light px-8 py-4 rounded-md font-medium text-lg hover:bg-background transition-colors inline-flex items-center justify-center"
            >
              View Events
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-md flex items-center justify-center text-3xl mx-auto mb-4">
                🎨
              </div>
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Curated Art</h3>
              <p className="text-sm text-text-secondary">Handpicked pieces from emerging and established artists</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-md flex items-center justify-center text-3xl mx-auto mb-4">
                🖼️
              </div>
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Art Services</h3>
              <p className="text-sm text-text-secondary">Consultation, curation, and custom experiences</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-md flex items-center justify-center text-3xl mx-auto mb-4">
                📅
              </div>
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Events</h3>
              <p className="text-sm text-text-secondary">Paint & sip, artist talks, and exclusive previews</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-md flex items-center justify-center text-3xl mx-auto mb-4">
                🏆
              </div>
              <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">Partnerships</h3>
              <p className="text-sm text-text-secondary">Trade programs for designers and corporations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-16 md:py-24 px-4 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-primary">Featured Artworks</h2>
            <Link href="/gallery" className="text-success-gold font-medium hover:underline flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: 'Sunset Over Mountains', artist: 'Jane Doe', price: '$2,500', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800' },
              { title: 'Urban Dreams', artist: 'John Smith', price: '$3,200', image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800' },
              { title: 'Abstract Emotions', artist: 'Jane Doe', price: 'On request', image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800' },
            ].map((artwork, index) => (
              <Link key={index} href={`/gallery/${artwork.title.toLowerCase().replace(/\s+/g, '-')}`} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-gray-100 mb-3">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-serif text-base font-semibold text-text-primary group-hover:text-success-gold transition-colors">
                  {artwork.title}
                </h3>
                <p className="text-sm text-text-secondary">{artwork.artist}</p>
                <p className="text-sm font-medium text-success-gold">{artwork.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-primary">Upcoming Events</h2>
            <Link href="/events" className="text-success-gold font-medium hover:underline flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Paint & Sip: Sunset Edition', date: 'May 15, 2026', price: '$75', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800' },
              { title: 'Artist Talk: Contemporary Visions', date: 'May 22, 2026', price: 'Free', image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800' },
            ].map((event, index) => (
              <div key={index} className="rounded-md border border-border-light bg-surface shadow-subtle overflow-hidden">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-serif text-xl font-semibold text-text-primary">{event.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">{event.date}</span>
                    <span className="text-lg font-semibold text-success-gold">{event.price}</span>
                  </div>
                  <Link
                    href="/events"
                    className="block w-full bg-primary text-white text-center px-4 py-2 rounded-md text-sm font-medium hover:bg-text-primary transition-colors"
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
      <section className="py-16 md:py-24 px-4 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-primary">Our Services</h2>
            <Link href="/services" className="text-success-gold font-medium hover:underline flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Art Consultation', price: '$150/hour', icon: '🎨', description: 'One-on-one session to find perfect pieces' },
              { name: 'Corporate Curation', price: 'Custom quote', icon: '🏢', description: 'Full-service art for offices' },
              { name: 'Paint & Sip Events', price: '$75/person', icon: '🍷', description: 'Private or public painting events' },
            ].map((service, index) => (
              <div key={index} className="rounded-md border border-border-light bg-background p-6">
                <div className="w-14 h-14 bg-accent rounded-md flex items-center justify-center text-2xl mb-4">
                  {service.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold text-text-primary mb-2">{service.name}</h3>
                <p className="text-sm text-text-secondary mb-4">{service.description}</p>
                <Link
                  href="/services"
                  className="block w-full bg-primary text-white text-center px-4 py-2 rounded-md text-sm font-medium hover:bg-text-primary transition-colors"
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-primary text-white">
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
              className="bg-white text-primary px-8 py-4 rounded-md font-medium text-lg hover:bg-accent transition-colors inline-flex items-center justify-center"
            >
              Become a Partner
            </Link>
            <Link
              href="/consult"
              className="bg-primary text-white border border-accent px-8 py-4 rounded-md font-medium text-lg hover:bg-text-primary transition-colors inline-flex items-center justify-center"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-background border-t border-border-light">
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
