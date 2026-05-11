'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Clock, Users, ChevronDown, Star, Mail, MessageCircle } from 'lucide-react';
import { events, eventCategories } from '@/data/events';
import { useAnalytics } from '@/hooks/useAnalytics';

const WA_NUMBER = '2348002649278';
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

function buildEventWhatsAppMessage(eventTitle: string): string {
  const msg = `Hello AndyArt, I'd like to know more about: ${eventTitle}`;
  return encodeURIComponent(msg);
}

const sortOptions = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'featured', label: 'Featured First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export default function EventsPage() {
  const { track } = useAnalytics();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('upcoming');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...events];

    if (activeCategory !== 'all') {
      result = result.filter((e) => e.category === activeCategory);
    }

    switch (sortBy) {
      case 'upcoming':
        result.sort((a, b) => new Date(a.startDatetime).getTime() - new Date(b.startDatetime).getTime());
        break;
      case 'featured':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'price-low':
        result.sort((a, b) => (a.ticketPrice ?? Infinity) - (b.ticketPrice ?? Infinity));
        break;
      case 'price-high':
        result.sort((a, b) => (b.ticketPrice ?? 0) - (a.ticketPrice ?? 0));
        break;
    }

    return result;
  }, [activeCategory, sortBy]);

  const featuredEvent = useMemo(() => events.find((e) => e.featured), []);

  return (
    <div className="min-h-screen pt-24 pb-24 px-4">
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

        {/* Featured Event Hero */}
        {featuredEvent && activeCategory === 'all' && sortBy === 'upcoming' && (
          <div className="mb-12 relative aspect-[21/9] rounded-2xl overflow-hidden shadow-premium group">
            <Image src={featuredEvent.image} alt={featuredEvent.title} fill sizes="100vw" className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-andy-black/80 via-andy-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-andy-gold text-andy-black">Featured</span>
                {featuredEvent.isPrivate && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-andy-wine text-andy-ivory">Private</span>
                )}
              </div>
              <h2 className="font-serif text-2xl md:text-4xl font-bold text-andy-ivory editorial-headline mb-2 max-w-2xl">
                {featuredEvent.title}
              </h2>
              <p className="text-andy-ivory/70 text-sm mb-4 max-w-xl">{featuredEvent.description}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/events/${featuredEvent.slug}`}
                  onClick={() => track('event_rsvp', { page: 'events_listing', slug: featuredEvent.slug, title: featuredEvent.title })}
                  className="bg-andy-gold text-andy-black px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-andy-ivory transition-colors"
                >
                  {featuredEvent.ticketPrice === 0 ? 'RSVP Free' : `RSVP — $${featuredEvent.ticketPrice}`}
                </Link>
                {featuredEvent.isPrivate && (
                  <Link
                    href="/consult"
                    onClick={() => track('event_vip_preview', { page: 'events_listing', slug: featuredEvent.slug })}
                    className="border border-andy-ivory/40 text-andy-ivory px-6 py-2.5 rounded-full font-medium text-sm hover:bg-andy-ivory/10 transition-colors"
                  >
                    Request VIP Access
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Filters & Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {eventCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setActiveCategory(cat.value);
                  track('filter_apply', { page: 'events_listing', filter: cat.value });
                }}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  activeCategory === cat.value
                    ? 'bg-andy-black text-andy-ivory border-andy-black'
                    : 'bg-white text-andy-bronze border-andy-stone/30 hover:bg-andy-black hover:text-andy-ivory'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-andy-stone/30 bg-white text-sm font-medium text-andy-bronze hover:border-andy-gold/40 transition-all"
            >
              {sortOptions.find((s) => s.value === sortBy)?.label}
              <ChevronDown size={14} />
            </button>
            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-andy-stone/30 rounded-xl shadow-premium z-20 overflow-hidden">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSortBy(opt.value);
                      setIsSortOpen(false);
                      track('sort_apply', { page: 'events_listing', sort: opt.value });
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      sortBy === opt.value ? 'bg-andy-stone/20 text-andy-black font-medium' : 'text-andy-bronze hover:bg-andy-stone/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Host Event CTA */}
        <div className="mb-12 bg-andy-black text-andy-ivory rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold mb-2">Want to host an experience?</h2>
              <p className="text-andy-ivory/60 text-sm">We partner with venues, corporations, and private hosts for bespoke gatherings.</p>
            </div>
            <Link
              href="/events/host"
              onClick={() => track('cta_click', { page: 'events_listing', cta: 'host_event' })}
              className="bg-andy-gold text-andy-black px-6 py-3 rounded-full font-medium hover:bg-andy-ivory transition-colors whitespace-nowrap text-sm"
            >
              Request to Host
            </Link>
          </div>
        </div>

        {/* Events Grid */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((event) => {
              const startDate = new Date(event.startDatetime);
              const endDate = new Date(event.endDatetime);
              const durationMin = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60));
              const durationH = Math.floor(durationMin / 60);
              const durationM = durationMin % 60;

              return (
                <div
                  key={event.id}
                  className="rounded-2xl border border-andy-stone/30 bg-white shadow-subtle hover:shadow-premium transition-all duration-500 overflow-hidden group hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-andy-black/10 via-transparent to-transparent pointer-events-none" />

                    {event.featured && (
                      <div className="absolute top-3 left-3 bg-andy-gold text-andy-black text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Star size={10} /> Featured
                      </div>
                    )}
                    {event.isPrivate && (
                      <div className="absolute top-3 right-3 bg-andy-wine text-andy-ivory text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        Private
                      </div>
                    )}
                    {event.remainingTickets !== null && event.remainingTickets < 10 && event.remainingTickets > 0 && (
                      <div className="absolute bottom-3 right-3 bg-andy-black/80 backdrop-blur-sm text-andy-gold text-xs font-bold px-3 py-1.5 rounded-full">
                        Only {event.remainingTickets} left
                      </div>
                    )}
                    {event.ticketState === 'sold-out' && (
                      <div className="absolute inset-0 bg-andy-black/60 flex items-center justify-center">
                        <span className="text-andy-ivory font-serif text-xl font-bold">Sold Out</span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-andy-stone/20 text-andy-bronze">
                        {event.category.replace('-', ' ')}
                      </span>
                      {event.ticketPrice === 0 && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-andy-green/15 text-andy-green border border-andy-green/20">
                          Free
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl font-bold text-andy-black group-hover:text-andy-bronze transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-andy-bronze line-clamp-2 leading-relaxed">{event.description}</p>

                    <div className="space-y-2.5 text-sm">
                      <div className="flex items-center gap-2.5 text-andy-bronze">
                        <Calendar size={14} className="text-andy-gold" />
                        <span>{formatDate(event.startDatetime)}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-andy-bronze">
                        <Clock size={14} className="text-andy-gold" />
                        <span>
                          {formatTime(event.startDatetime)} – {formatTime(event.endDatetime)}
                          {durationH > 0 && ` (${durationH}h${durationM > 0 ? ` ${durationM}m` : ''})`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 text-andy-bronze">
                        <MapPin size={14} className="text-andy-gold" />
                        <span>{event.isVirtual ? 'Virtual Event' : event.location}</span>
                      </div>
                    </div>

                    {/* Commercial Actions */}
                    <div className="pt-3 border-t border-andy-stone/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl font-bold text-andy-gold">
                            {event.ticketPrice === null || event.ticketPrice === 0 ? 'Free' : `$${event.ticketPrice}`}
                          </span>
                          {event.ticketPrice && event.ticketPrice > 0 && (
                            <p className="text-xs text-andy-bronze">per person</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Link
                            href={`/events/${event.slug}`}
                            onClick={() => track('event_rsvp', { page: 'events_listing', slug: event.slug, title: event.title })}
                            className="bg-andy-black text-andy-ivory px-5 py-2 rounded-full text-sm font-semibold hover:bg-andy-black/80 transition-all"
                          >
                            {event.ticketState === 'sold-out' ? 'Join Waitlist' : 'RSVP'}
                          </Link>
                        </div>
                      </div>

                      {/* Secondary CTAs */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {event.isPrivate && event.ticketState !== 'sold-out' && (
                          <Link
                            href="/consult"
                            onClick={() => track('event_vip_preview', { page: 'events_listing', slug: event.slug })}
                            className="text-xs text-andy-bronze hover:text-andy-gold transition-colors flex items-center gap-1"
                          >
                            <Star size={12} /> Request VIP Preview
                          </Link>
                        )}
                        {event.category === 'corporate' && (
                          <Link
                            href="/events/host"
                            onClick={() => track('event_sponsor_inquiry', { page: 'events_listing', slug: event.slug })}
                            className="text-xs text-andy-bronze hover:text-andy-gold transition-colors flex items-center gap-1"
                          >
                            <Mail size={12} /> Sponsor Inquiry
                          </Link>
                        )}
                        <a
                          href={`${WA_BASE}?text=${buildEventWhatsAppMessage(event.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => track('service_call_concierge', { page: 'events_listing', channel: 'whatsapp', eventSlug: event.slug })}
                          className="text-xs text-andy-bronze hover:text-andy-gold transition-colors flex items-center gap-1"
                        >
                          <MessageCircle size={12} /> WhatsApp Concierge
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-andy-stone/20 rounded-2xl p-16 text-center border border-andy-stone/20">
            <Users size={40} className="mx-auto mb-4 text-andy-bronze/50" />
            <h3 className="font-serif text-xl font-semibold text-andy-black mb-2">No experiences found</h3>
            <p className="text-andy-bronze mb-6">Try adjusting your filters or browse all upcoming events.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSortBy('upcoming');
              }}
              className="bg-andy-black text-andy-ivory px-6 py-2.5 rounded-full font-medium text-sm hover:bg-andy-black/80 transition-colors"
            >
              View All Events
            </button>
          </div>
        )}

        {/* Past Events Link */}
        <div className="mt-12 text-center">
          <Link
            href="/events/past"
            onClick={() => track('cta_click', { page: 'events_listing', cta: 'past_events' })}
            className="text-andy-gold font-medium hover:underline inline-flex items-center gap-2 text-sm"
          >
            View Past Experiences
          </Link>
        </div>
      </div>
    </div>
  );
}
