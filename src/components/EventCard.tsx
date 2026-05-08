'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Clock } from 'lucide-react';

interface EventCardProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  startDatetime: string;
  endDatetime: string;
  location: string;
  isVirtual: boolean;
  ticketPrice: number | null;
  image: string;
  remainingTickets: number | null;
}

export default function EventCard({
  id,
  title,
  slug,
  description,
  startDatetime,
  endDatetime,
  location,
  isVirtual,
  ticketPrice,
  image,
  remainingTickets,
}: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const startDate = new Date(startDatetime);
  const endDate = new Date(endDatetime);
  const duration = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60));
  const durationHours = Math.floor(duration / 60);
  const durationMinutes = duration % 60;

  return (
    <div className="rounded-2xl border border-andy-stone/30 bg-white shadow-subtle hover:shadow-premium transition-all duration-500 overflow-hidden group hover:-translate-y-1">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={image || 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800'}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-andy-black/10 via-transparent to-transparent pointer-events-none" />

        {remainingTickets !== null && remainingTickets < 10 && (
          <div className="absolute top-3 right-3 bg-andy-wine text-andy-ivory text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            Only {remainingTickets} left
          </div>
        )}
      </div>

      <div className="p-5 space-y-3">
        <h3 className="font-serif text-xl font-bold text-andy-black group-hover:text-andy-bronze transition-colors">
          {title}
        </h3>

        <p className="text-sm text-andy-bronze line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="space-y-2.5 text-sm">
          <div className="flex items-center gap-2.5 text-andy-bronze">
            <div className="w-8 h-8 rounded-full bg-andy-stone/30 flex items-center justify-center flex-shrink-0">
              <Calendar size={15} className="text-andy-gold" />
            </div>
            <span>{formatDate(startDatetime)}</span>
          </div>
          <div className="flex items-center gap-2.5 text-andy-bronze">
            <div className="w-8 h-8 rounded-full bg-andy-stone/30 flex items-center justify-center flex-shrink-0">
              <Clock size={15} className="text-andy-gold" />
            </div>
            <span>
              {formatTime(startDatetime)} - {formatTime(endDatetime)}
              {durationHours > 0 && ` (${durationHours}h ${durationMinutes}m)`}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-andy-bronze">
            <div className="w-8 h-8 rounded-full bg-andy-stone/30 flex items-center justify-center flex-shrink-0">
              <MapPin size={15} className="text-andy-gold" />
            </div>
            <span>{isVirtual ? 'Virtual Event (Zoom)' : location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-andy-stone/20">
          <div>
            <span className="text-2xl font-bold text-andy-gold">
              {ticketPrice === null || ticketPrice === 0 ? 'Free' : `$${ticketPrice}`}
            </span>
            {ticketPrice && ticketPrice > 0 && (
              <p className="text-xs text-andy-bronze">per person</p>
            )}
          </div>
          <Link
            href={`/events/${slug}`}
            className="bg-andy-black text-andy-ivory px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-andy-black/80 transition-all"
          >
            RSVP
          </Link>
        </div>
      </div>
    </div>
  );
}
