'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Clock, Users, Star, Mail, MessageCircle, ChevronRight, ChevronDown } from 'lucide-react';
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
    <div className="min-h-screen pb-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <p className="section-label animate-fade-in-up">Gatherings</p>
          <h1 className="display-lg mb-6 text-[#171614] animate-fade-in-up delay-1">
            AndyArt Experiences
          </h1>
          <p className="text-md max-w-2xl leading-relaxed animate-fade-in-up delay-2" style={{ color: 'rgba(93, 70, 51, 0.8)' }}>
            Immersive gatherings where art, culture, and connection converge.
            From intimate salons to corporate culture nights.
          </p>
        </div>

        {/* Featured Event Hero */}
        {featuredEvent && activeCategory === 'all' && sortBy === 'upcoming' && (
          <div className="mb-20 animate-fade-in-up delay-3">
            <p className="text-sm font-semibold mb-6" style={{ color: '#A78345', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Featured Gathering
            </p>
            <div className="relative rounded-2xl overflow-hidden card-postmodern">
              <div className="relative aspect-[21/9]">
                <Image src={featuredEvent.image} alt={featuredEvent.title} fill sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#C6A66B] text-[#171614]">
                      Featured
                    </span>
                    {featuredEvent.isPrivate && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#B84C4C] text-white">
                        Private
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4 leading-tight max-w-3xl">
                    {featuredEvent.title}
                  </h2>
                  <p className="text-white/70 text-base mb-8 max-w-2xl leading-relaxed">
                    {featuredEvent.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/events/${featuredEvent.slug}`}
                      onClick={() => track('event_rsvp', { page: 'events_listing', slug: featuredEvent.slug, title: featuredEvent.title })}
                      className="btn-postmodern-gold text-sm md:text-base"
                    >
                      {featuredEvent.ticketPrice === 0 ? 'RSVP Free' : `RSVP — $${featuredEvent.ticketPrice}`}
                    </Link>
                    {featuredEvent.isPrivate && (
                      <Link
                        href="/consult"
                        onClick={() => track('event_vip_preview', { page: 'events_listing', slug: featuredEvent.slug })}
                        className="btn-postmodern text-sm md:text-base"
                        style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                      >
                        Request VIP Access
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters & Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div className="flex flex-wrap gap-2">
            {eventCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setActiveCategory(cat.value);
                  track('filter_apply', { page: 'events_listing', filter: cat.value });
                }}
                className={`postmodern-label px-4 py-2 text-sm transition-all ${
                  activeCategory === cat.value
                    ? 'bg-[#171614] text-[#FFFDF9] border-[#171614]'
                    : 'bg-white text-[#5D4633] border-[rgba(23,22,20,0.1)] hover:bg-[#171614] hover:text-[#FFFDF9] hover:border-[#171614]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border hover:bg-[#171614] hover:text-[#FFFDF9]"
              style={{ background: 'rgba(255,253,249,0.5)', borderColor: 'rgba(23,22,20,0.1)', color: '#5D4633' }}
            >
              {sortOptions.find((s) => s.value === sortBy)?.label}
              <ChevronDown size={14} />
            </button>
            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg overflow-hidden z-20" style={{ background: 'white', borderColor: 'rgba(23,22,20,0.08)' }}>
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSortBy(opt.value);
                      setIsSortOpen(false);
                      track('sort_apply', { page: 'events_listing', sort: opt.value });
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      sortBy === opt.value ? 'bg-[#F7F2E8] text-[#171614] font-medium' : 'text-[#5D4633] hover:bg-[rgba(215,206,193,0.3)]'
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
        <div className="mb-16 p-8 md:p-12 rounded-2xl" style={{ background: '#171614' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
                Want to host an experience?
              </h2>
              <p className="text-white/60 text-base max-w-xl">
                We partner with venues, corporations, and private hosts for bespoke gatherings.
              </p>
            </div>
            <Link
              href="/events/host"
              onClick={() => track('cta_click', { page: 'events_listing', cta: 'host_event' })}
              className="btn-postmodern-gold text-sm whitespace-nowrap"
            >
              Request to Host
            </Link>
          </div>
        </div>

        {/* Events Grid */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((event) => {
              const startDate = new Date(event.startDatetime);
              const endDate = new Date(event.endDatetime);
              const durationMin = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60));
              const durationH = Math.floor(durationMin / 60);
              const durationM = durationMin % 60;

              return (
                <div key={event.id} className="card-postmodern overflow-hidden group">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

                    {event.featured && (
                      <div className="absolute top-4 left-4 bg-[#C6A66B] text-[#171614] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Star size={10} /> Featured
                      </div>
                    )}
                    {event.isPrivate && (
                      <div className="absolute top-4 right-4 bg-[#B84C4C] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        Private
                      </div>
                    )}
                    {event.remainingTickets !== null && event.remainingTickets < 10 && event.remainingTickets > 0 && (
                      <div className="absolute bottom-4 right-4 bg-[#171614]/90 backdrop-blur-sm text-[#C6A66B] text-xs font-bold px-3 py-1.5 rounded-full">
                        Only {event.remainingTickets} left
                      </div>
                    )}
                    {event.ticketState === 'sold-out' && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-serif text-xl font-bold">Sold Out</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: 'rgba(23, 22, 20, 0.08)', color: '#5D4633' }}>
                        {event.category.replace('-', ' ')}
                      </span>
                      {event.ticketPrice === 0 && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: '#7D917D22', color: '#7D917D', border: '1px solid rgba(125,145,125,0.2)' }}>
                          Free
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#171614] leading-tight">
                      {event.title}
                    </h3>
                    <p className="text-sm line-clamp-2 leading-relaxed" style={{ color: 'rgba(93, 70, 51, 0.7)' }}>
                      {event.description}
                    </p>

                    <div className="space-y-2 text-sm" style={{ color: 'rgba(93, 70, 51, 0.8)' }}>
                      <div className="flex items-center gap-2.5">
                        <Calendar size={16} style={{ color: '#C6A66B' }} />
                        <span>{formatDate(event.startDatetime)}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock size={16} style={{ color: '#C6A66B' }} />
                        <span>
                          {formatTime(event.startDatetime)} – {formatTime(event.endDatetime)}
                          {durationH > 0 && ` (${durationH}h${durationM > 0 ? ` ${durationM}m` : ''})`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <MapPin size={16} style={{ color: '#C6A66B' }} />
                        <span>{event.isVirtual ? 'Virtual Event' : event.location}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t" style={{ borderColor: 'rgba(23,22,20,0.06)' }}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-xl font-bold" style={{ color: '#C6A66B' }}>
                            {event.ticketPrice === null || event.ticketPrice === 0 ? 'Free' : `$${event.ticketPrice}`}
                          </span>
                          {event.ticketPrice && event.ticketPrice > 0 && (
                            <p className="text-xs" style={{ color: 'rgba(93, 70, 51, 0.5)' }}>per person</p>
                          )}
                        </div>
                        <Link
                          href={`/events/${event.slug}`}
                          onClick={() => track('event_rsvp', { page: 'events_listing', slug: event.slug, title: event.title })}
                          className="btn-postmodern-primary text-xs"
                        >
                          {event.ticketState === 'sold-out' ? 'Join Waitlist' : 'RSVP'}
                        </Link>
                      </div>

                      <div className="flex flex-wrap gap-3 text-xs">
                        {event.isPrivate && event.ticketState !== 'sold-out' && (
                          <Link
                            href="/consult"
                            onClick={() => track('event_vip_preview', { page: 'events_listing', slug: event.slug })}
                            className="group/link flex items-center gap-1" style={{ color: 'rgba(93, 70, 51, 0.7)' }}
                          >
                            <Star size={12} style={{ color: '#C6A66B' }} /> Request VIP
                            <ChevronRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        )}
                        <a
                          href={`${WA_BASE}?text=${buildEventWhatsAppMessage(event.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => track('service_call_concierge', { page: 'events_listing', channel: 'whatsapp', eventSlug: event.slug })}
                          className="group/link flex items-center gap-1" style={{ color: 'rgba(93, 70, 51, 0.7)' }}
                        >
                          <MessageCircle size={12} style={{ color: '#C6A66B' }} /> WhatsApp
                          <ChevronRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
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
          <div className="rounded-2xl p-20 text-center" style={{ background: 'rgba(215,206,193,0.3)', border: '1px solid rgba(215,206,193,0.4)' }}>
            <Users size={48} className="mx-auto mb-5" style={{ color: 'rgba(93, 70, 51, 0.3)' }} />
            <h3 className="font-serif text-2xl font-semibold text-[#171614] mb-3">No experiences found</h3>
            <p className="text-[#5D4633] mb-7">Try adjusting your filters or browse all upcoming events.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSortBy('upcoming');
              }}
              className="btn-postmodern-primary text-sm"
            >
              View All Events
            </button>
          </div>
        )}

        {/* Past Events Link */}
        <div className="mt-16 text-center">
          <Link
            href="/events/past"
            onClick={() => track('cta_click', { page: 'events_listing', cta: 'past_events' })}
            className="text-sm font-medium group/link flex items-center justify-center gap-2"
            style={{ color: '#C6A66B' }}
          >
            View Past Experiences
            <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}