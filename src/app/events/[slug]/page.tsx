'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, MapPin, Clock, Users, ChevronLeft } from 'lucide-react';

// Mock data - will be replaced with API call
const event = {
  id: '1',
  title: 'Paint & Sip: Sunset Edition',
  slug: 'paint-sip-sunset',
  description: 'Join us for an evening of painting and wine as we capture the perfect sunset on canvas. All materials provided, including professional brushes, paints, and canvas. Wine and light refreshments will be served. No experience necessary - our instructor will guide you step by step through creating your own masterpiece.',
  startDatetime: '2026-05-15T18:00:00Z',
  endDatetime: '2026-05-15T21:00:00Z',
  location: 'AndyArt Studio, Downtown',
  isVirtual: false,
  zoomLink: null,
  ticketPrice: 75,
  image: '/placeholder-event.jpg',
  remainingTickets: 12,
  totalTickets: 20,
};

export default function EventDetailPage() {
  const params = useParams();
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpData, setRsvpData] = useState({
    name: '',
    email: '',
    guests: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
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

  const handleSubmitRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/events/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          userName: rsvpData.name,
          userEmail: rsvpData.email,
          guests: rsvpData.guests,
        }),
      });

      if (response.ok) {
        setRsvpSubmitted(true);
      }
    } catch (error) {
      console.error('RSVP error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-container-mobile">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6"
        >
          <ChevronLeft size={20} />
          Back to Events
        </Link>

        {/* Event Image */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-8">
          <div className="absolute inset-0 bg-border-light flex items-center justify-center text-text-secondary">
            <span className="text-sm">Event Image</span>
          </div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary">
              {event.title}
            </h1>

            <p className="text-text-secondary leading-relaxed">
              {event.description}
            </p>

            {/* Details */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-semibold text-text-primary">Event Details</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="text-success-gold mt-1" size={20} />
                  <div>
                    <p className="font-medium text-text-primary">Date</p>
                    <p className="text-text-secondary">{formatDate(event.startDatetime)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="text-success-gold mt-1" size={20} />
                  <div>
                    <p className="font-medium text-text-primary">Time</p>
                    <p className="text-text-secondary">
                      {formatTime(event.startDatetime)} - {formatTime(event.endDatetime)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="text-success-gold mt-1" size={20} />
                  <div>
                    <p className="font-medium text-text-primary">Location</p>
                    <p className="text-text-secondary">
                      {event.isVirtual ? 'Virtual Event (Zoom link will be sent after RSVP)' : event.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RSVP Card */}
          <div className="md:col-span-1">
            <div className="bg-surface border border-border-light rounded-lg p-6 sticky top-8">
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-bold text-success-gold">
                    {event.ticketPrice === 0 ? 'Free' : `$${event.ticketPrice}`}
                  </p>
                  <p className="text-sm text-text-secondary">per person</p>
                </div>

                {event.remainingTickets !== null && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users size={16} className="text-text-secondary" />
                    <span className="text-text-secondary">
                      {event.remainingTickets} spots remaining
                    </span>
                  </div>
                )}

                <button
                  onClick={() => setIsRsvpOpen(true)}
                  disabled={event.remainingTickets === 0}
                  className="w-full bg-primary text-surface py-3 rounded-md font-medium hover:bg-text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {event.remainingTickets === 0 ? 'Event Full' : 'RSVP Now'}
                </button>

                <p className="text-xs text-text-secondary text-center">
                  {event.isVirtual 
                    ? 'Zoom link will be sent to your email after RSVP' 
                    : 'Confirmation will be sent to your email'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {isRsvpOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg shadow-large max-w-md w-full p-6">
            {rsvpSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-success-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-text-primary mb-2">
                  RSVP Confirmed!
                </h3>
                <p className="text-text-secondary mb-6">
                  We've sent a confirmation email to {rsvpData.email}
                </p>
                <button
                  onClick={() => setIsRsvpOpen(false)}
                  className="bg-primary text-surface px-6 py-2 rounded-md font-medium hover:bg-text-primary transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-2xl font-bold text-text-primary mb-4">
                  RSVP for this event
                </h3>
                <form onSubmit={handleSubmitRsvp} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={rsvpData.name}
                      onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={rsvpData.email}
                      onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Number of Guests
                    </label>
                    <select
                      value={rsvpData.guests}
                      onChange={(e) => setRsvpData({ ...rsvpData, guests: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'guest' : 'guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                  {event.ticketPrice !== null && event.ticketPrice > 0 && (
                    <div className="bg-background rounded-md p-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Price per person</span>
                        <span className="text-text-primary">${event.ticketPrice}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-text-secondary">Guests</span>
                        <span className="text-text-primary">{rsvpData.guests}</span>
                      </div>
                      <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-border-light">
                        <span className="text-text-primary">Total</span>
                        <span className="text-success-gold">${event.ticketPrice * rsvpData.guests}</span>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsRsvpOpen(false)}
                      className="flex-1 px-4 py-2 border border-border-light rounded-md font-medium text-text-primary hover:bg-background transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-primary text-surface px-4 py-2 rounded-md font-medium hover:bg-text-primary transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Confirm RSVP'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
