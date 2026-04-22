import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Palette, Calendar, Users, Award, Paintbrush, Building, Wine } from 'lucide-react';
import { IMAGES } from '@/lib/images';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent/20 to-background">
        <Image
          src={IMAGES.hero}
          alt="Art Gallery Hero"
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-4 flex justify-center">
            <div className="w-32 h-32 md:w-48 md:h-48 relative">
              <Image
                src="/images/logo.png"
                alt="AndyArt Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
            Your digital gallery.
            <br />
            <span className="text-primary/60">Your art business.</span>
            <br />
            Elevated.
          </h1>
          <p className="text-base md:text-lg text-text-secondary mb-6 max-w-2xl mx-auto">
            Discover exceptional artwork, book immersive experiences, and partner with a gallery that understands your vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/gallery"
              className="bg-primary text-white px-6 py-3 rounded-full font-medium text-base hover:bg-primary/80 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
            >
              Explore Gallery
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/events"
              className="bg-white text-primary border border-white/30 px-6 py-3 rounded-full font-medium text-base hover:bg-accent transition-all inline-flex items-center justify-center"
            >
              View Events
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                <Palette className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-base font-semibold text-primary mb-1">Curated Art</h3>
              <p className="text-xs text-text-secondary">Handpicked pieces from emerging and established artists</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                <Paintbrush className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-base font-semibold text-primary mb-1">Art Services</h3>
              <p className="text-xs text-text-secondary">Consultation, curation, and custom experiences</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-base font-semibold text-primary mb-1">Events</h3>
              <p className="text-xs text-text-secondary">Paint & sip, artist talks, and exclusive previews</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-base font-semibold text-primary mb-1">Partnerships</h3>
              <p className="text-xs text-text-secondary">Trade programs for designers and corporations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-12 md:py-16 px-4 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">Featured Artworks</h2>
            <Link href="/gallery" className="text-primary font-medium hover:underline flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {IMAGES.artworks.slice(0, 3).map((artwork, index) => (
              <Link key={artwork.id} href={`/gallery/${artwork.title.toLowerCase().replace(/\s+/g, '-')}`} className="group">
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
                <h3 className="font-serif text-base font-semibold text-primary group-hover:text-primary transition-colors">
                  {artwork.title}
                </h3>
                <p className="text-sm text-text-secondary">{index % 2 === 0 ? 'Jane Doe' : 'John Smith'}</p>
                <p className="text-sm font-medium text-primary">{index % 2 === 0 ? 'Price on request' : `$${(index + 1) * 500}`}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">Upcoming Events</h2>
            <Link href="/events" className="text-primary font-medium hover:underline flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {IMAGES.events.map((event, index) => (
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
                    <span className="text-sm text-text-secondary">{index === 0 ? 'May 15, 2026' : 'May 22, 2026'}</span>
                    <span className="text-lg font-semibold text-success-gold">{index === 0 ? '$75' : 'Free'}</span>
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
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">Our Services</h2>
            <Link href="/services" className="text-primary font-medium hover:underline flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Art Consultation', price: '$150/hour', icon: Paintbrush, description: 'One-on-one session to find perfect pieces' },
              { name: 'Corporate Curation', price: 'Custom quote', icon: Building, description: 'Full-service art for offices' },
              { name: 'Paint & Sip Events', price: '$75/person', icon: Wine, description: 'Private or public painting events' },
            ].map((service, index) => (
              <div key={index} className="rounded-xl border border-white/20 bg-background p-6">
                <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mb-4">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-primary mb-2">{service.name}</h3>
                <p className="text-sm text-text-secondary mb-4">{service.description}</p>
                <Link
                  href="/services"
                  className="block w-full bg-primary text-white text-center px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/80 transition-all"
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
          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Whether you're collecting art for the first time or looking to partner with us for a large project, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/partners/apply"
              className="bg-white text-primary px-8 py-4 rounded-full font-medium text-lg hover:bg-accent transition-all inline-flex items-center justify-center"
            >
              Become a Partner
            </Link>
            <Link
              href="/consult"
              className="bg-primary text-white border border-white/30 px-8 py-4 rounded-full font-medium text-lg hover:bg-white/10 transition-all inline-flex items-center justify-center"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-background border-t border-white/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-serif text-lg font-semibold text-primary mb-4">Gallery</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><Link href="/gallery" className="hover:text-primary">All Artworks</Link></li>
                <li><Link href="/artists" className="hover:text-primary">Artists</Link></li>
                <li><Link href="/viewing-rooms" className="hover:text-primary">Viewing Rooms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-primary mb-4">Events</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><Link href="/events" className="hover:text-primary">Upcoming</Link></li>
                <li><Link href="/events/past" className="hover:text-primary">Past Events</Link></li>
                <li><Link href="/events/host" className="hover:text-primary">Host an Event</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-primary mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><Link href="/services" className="hover:text-primary">All Services</Link></li>
                <li><Link href="/consult" className="hover:text-primary">Consultation</Link></li>
                <li><Link href="/partners/apply" className="hover:text-primary">Partnerships</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-primary mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>hello@andyart.gallery</li>
                <li>@andyart</li>
                <li>/company/andyart</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-secondary">
              © {new Date().getFullYear()} AndyArt Gallery. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-text-secondary">
              <Link href="/legal/terms" className="hover:text-primary">Terms</Link>
              <Link href="/legal/privacy" className="hover:text-primary">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
