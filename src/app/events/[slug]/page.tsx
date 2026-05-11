'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, MapPin, Clock, Users, ChevronLeft, Star, Mail, MessageCircle } from 'lucide-react';
import { getEventBySlug } from '@/data/events';
import { useConversionModal } from '@/hooks/useConversionModal';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = getEventBySlug(params.slug);
  if (!event) notFound();

  const { openRSVP, openConcierge } = useConversionModal();
  const { track } = useAnalytics();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <div className="min-h-screen pt-24 pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/events" className="inline-flex items-center gap-2 text-andy-bronze hover:text-andy-black mb-8 text-sm transition-colors">
          <ChevronLeft size={18} />
          Back to Experiences
        </Link>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-10 bg-andy-stone/20 shadow-premium">
          <Image src={event.image} alt={event.title} fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-andy-black/60 via-andy-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-10">
            {event.isVirtual && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-andy-green text-andy-ivory mb-2 inline-block">Virtual</span>
            )}
            {event.isPrivate && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-andy-wine text-andy-ivory mb-2 ml-2 inline-block">Private</span>
            )}
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-andy-ivory editorial-headline">{event.title}</h1>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <div className="md:col-span-2 space-y-6">
            <p className="text-andy-bronze leading-[1.8]">{event.description}</p>

            <div className="space-y-4">
              <h2 className="font-serif text-xl font-semibold text-andy-black">Event Details</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="text-andy-gold mt-1" size={20} />
                  <div><p className="font-medium text-andy-black text-sm">Date</p><p className="text-andy-bronze text-sm">{formatDate(event.startDatetime)}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="text-andy-gold mt-1" size={20} />
                  <div><p className="font-medium text-andy-black text-sm">Time</p><p className="text-andy-bronze text-sm">{formatTime(event.startDatetime)} – {formatTime(event.endDatetime)}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="text-andy-gold mt-1" size={20} />
                  <div><p className="font-medium text-andy-black text-sm">Location</p><p className="text-andy-bronze text-sm">{event.isVirtual ? 'Virtual Event (Zoom link sent after RSVP)' : event.location}</p></div>
                </div>
              </div>
            </div>

            {/* Secondary commercial actions */}
            <div className="flex flex-wrap gap-3">
              {event.isPrivate && (
                <button
                  onClick={() => { track('event_vip_preview', { page: 'event_detail', slug: event.slug, title: event.title }); openConcierge({ context: `VIP preview for ${event.title}` }); }}
                  className="text-sm text-andy-bronze hover:text-andy-gold transition-colors flex items-center gap-1.5"
                >
                  <Star size={14} className="text-andy-gold" /> Request VIP Access
                </button>
              )}
              {event.category === 'corporate' && (
                <button
                  onClick={() => { track('event_sponsor_inquiry', { page: 'event_detail', slug: event.slug }); openConcierge({ context: `Sponsor inquiry: ${event.title}` }); }}
                  className="text-sm text-andy-bronze hover:text-andy-gold transition-colors flex items-center gap-1.5"
                >
                  <Mail size={14} /> Sponsor / Host Inquiry
                </button>
              )}
              <button
                onClick={() => { track('service_call_concierge', { page: 'event_detail', channel: 'whatsapp' }); openConcierge({ context: `Event inquiry: ${event.title}` }); }}
                className="text-sm text-andy-bronze hover:text-andy-gold transition-colors flex items-center gap-1.5"
              >
                <MessageCircle size={14} /> WhatsApp Concierge
              </button>
            </div>
          </div>

          {/* RSVP Card */}
          <div className="md:col-span-1">
            <div className="bg-white border border-andy-stone/30 rounded-2xl p-6 sticky top-24">
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-bold text-andy-gold">
                    {event.ticketPrice === 0 ? 'Free' : `$${event.ticketPrice}`}
                  </p>
                  <p className="text-sm text-andy-bronze">per person</p>
                </div>

                {event.remainingTickets !== null && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users size={16} className="text-andy-bronze" />
                    <span className="text-andy-bronze">{event.remainingTickets} spots remaining</span>
                  </div>
                )}

                <button
                  onClick={() => {
                    track('event_rsvp', { page: 'event_detail', slug: event.slug, title: event.title, value: event.ticketPrice || undefined });
                    openRSVP({
                      eventTitle: event.title,
                      eventSlug: event.slug,
                      ticketPrice: event.ticketPrice,
                      remainingTickets: event.remainingTickets,
                    });
                  }}
                  disabled={event.remainingTickets === 0}
                  className="w-full bg-andy-black text-andy-ivory py-3 rounded-full font-medium hover:bg-andy-black/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {event.remainingTickets === 0 ? 'Event Full' : event.ticketPrice === 0 ? 'RSVP Free' : `RSVP — $${event.ticketPrice}`}
                </button>

                <p className="text-xs text-andy-bronze text-center">
                  {event.isVirtual ? 'Zoom link will be sent after RSVP' : 'Confirmation will be emailed'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
