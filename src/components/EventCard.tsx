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
    <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-white shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:scale-[1.01]">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={image || 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800'}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent pointer-events-none" />
        
        {/* Gold border on hover */}
        <div className="absolute inset-0 rounded-t-2xl border-t border-x border-transparent group-hover:border-primary/20 transition-colors pointer-events-none" />
        
        {remainingTickets !== null && remainingTickets < 10 && (
          <div className="absolute top-3 right-3 bg-error/95 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full shadow-lg font-medium">
            Only {remainingTickets} left
          </div>
        )}
      </div>

      <div className="p-5 space-y-3">
        <h3 className="font-serif text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-text-secondary line-clamp-2">
          {description}
        </p>

        <div className="space-y-2.5 text-sm">
          <div className="flex items-center gap-2.5 text-text-secondary">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
              <Calendar size={15} className="text-primary" />
            </div>
            <span>{formatDate(startDatetime)}</span>
          </div>
          <div className="flex items-center gap-2.5 text-text-secondary">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
              <Clock size={15} className="text-primary" />
            </div>
            <span>
              {formatTime(startDatetime)} - {formatTime(endDatetime)}
              {durationHours > 0 && ` (${durationHours}h ${durationMinutes}m)`}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-text-secondary">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
              <MapPin size={15} className="text-primary" />
            </div>
            <span>{isVirtual ? 'Virtual Event (Zoom)' : location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div>
            <span className="text-2xl font-bold text-primary">
              {ticketPrice === null || ticketPrice === 0 ? 'Free' : `$${ticketPrice}`}
            </span>
            {ticketPrice && ticketPrice > 0 && (
              <p className="text-xs text-text-secondary">per person</p>
            )}
          </div>
          <Link
            href={`/events/${slug}`}
            className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:scale-105"
          >
            RSVP Now
          </Link>
        </div>
      </div>
    </div>
  );
}
