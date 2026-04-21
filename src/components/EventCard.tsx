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
    <div className="rounded-md border border-border-light bg-surface shadow-subtle overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={image || '/placeholder-event.jpg'}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
        />
        {remainingTickets !== null && remainingTickets < 10 && (
          <div className="absolute top-3 right-3 bg-error text-surface text-xs px-2 py-1 rounded-sm">
            Only {remainingTickets} left
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-serif text-xl font-semibold text-text-primary">
          {title}
        </h3>

        <p className="text-sm text-text-secondary line-clamp-2">
          {description}
        </p>

        <div className="space-y-2 text-sm text-text-secondary">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{formatDate(startDatetime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>
              {formatTime(startDatetime)} - {formatTime(endDatetime)}
              {durationHours > 0 && ` (${durationHours}h ${durationMinutes}m)`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{isVirtual ? 'Virtual Event (Zoom)' : location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border-light">
          <span className="text-lg font-semibold text-success-gold">
            {ticketPrice === null || ticketPrice === 0 ? 'Free' : `$${ticketPrice}`}
          </span>
          <Link
            href={`/events/${slug}`}
            className="bg-primary text-surface px-4 py-2 rounded-md text-sm font-medium hover:bg-text-primary transition-colors"
          >
            RSVP Now
          </Link>
        </div>
      </div>
    </div>
  );
}
