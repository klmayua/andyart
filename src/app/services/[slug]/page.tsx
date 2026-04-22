'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ChevronLeft, CheckCircle, Paintbrush } from 'lucide-react';

// Mock data - will be replaced with API call
const service = {
  id: '1',
  name: 'Art Consultation',
  slug: 'art-consultation',
  description: 'One-on-one session with our expert curators to help you find the perfect pieces for your space. We\'ll discuss your style, budget, and vision to create a personalized art acquisition plan.\n\nDuring this session, we will:\n- Review your space and existing decor\n- Discuss your artistic preferences and goals\n- Present curated options from our gallery and network\n- Create a customized acquisition roadmap\n- Provide guidance on framing, placement, and lighting\n\nWhether you\'re a first-time collector or expanding your collection, our consultation will set you on the right path.',
  priceType: 'hourly',
  price: 150,
  icon: 'Paintbrush',
  isActive: true,
  duration: '60 minutes',
  availability: 'Monday - Saturday, 10am - 6pm',
};

export default function ServiceDetailPage() {
  const params = useParams();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/services/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: service.id,
          customerName: bookingData.name,
          customerEmail: bookingData.email,
          customerPhone: bookingData.phone,
          preferredDate: bookingData.preferredDate,
          message: bookingData.message,
        }),
      });

      if (response.ok) {
        setBookingSubmitted(true);
      }
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = () => {
    if (service.priceType === 'quote') return 'Request a quote';
    if (service.priceType === 'hourly' && service.price) return `$${service.price}/hour`;
    if (service.priceType === 'fixed' && service.price) return `$${service.price}`;
    return 'Contact for pricing';
  };

  return (
    <div className="min-h-screen py-8 px-container-mobile">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6"
        >
          <ChevronLeft size={20} />
          Back to Services
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {/* Icon and Title */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-accent rounded-md flex items-center justify-center text-3xl flex-shrink-0">
                {service.icon}
              </div>
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary">
                  {service.name}
                </h1>
                <p className="text-lg text-success-gold font-semibold mt-1">
                  {formatPrice()}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-neutral max-w-none">
              <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                {service.description}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-semibold text-text-primary">Service Details</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="text-success-gold" size={20} />
                  <span className="text-text-secondary">{service.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-success-gold" size={20} />
                  <span className="text-text-secondary">{service.availability}</span>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-background rounded-lg p-6">
              <h2 className="font-serif text-xl font-semibold text-text-primary mb-4">What's Included</h2>
              <ul className="space-y-2">
                {[
                  'Personalized attention from expert curators',
                  'Customized art acquisition plan',
                  'Access to exclusive gallery inventory',
                  'Follow-up consultation within 30 days',
                  'Complimentary framing consultation',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="text-success-gold mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking Card */}
          <div className="md:col-span-1">
            <div className="bg-surface border border-border-light rounded-lg p-6 sticky top-8">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Starting at</p>
                  <p className="text-3xl font-bold text-success-gold">
                    {service.priceType === 'quote' ? 'Custom Quote' : `$${service.price}`}
                  </p>
                  {service.priceType === 'hourly' && (
                    <p className="text-sm text-text-secondary">per hour</p>
                  )}
                </div>

                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full bg-primary text-surface py-3 rounded-md font-medium hover:bg-text-primary transition-colors"
                >
                  Book this service
                </button>

                <p className="text-xs text-text-secondary text-center">
                  No payment required until confirmation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg shadow-large max-w-md w-full p-6">
            {bookingSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-success-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-surface" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-text-primary mb-2">
                  Booking Request Sent!
                </h3>
                <p className="text-text-secondary mb-6">
                  We'll contact you within 24 hours to confirm your appointment.
                </p>
                <button
                  onClick={() => setIsBookingOpen(false)}
                  className="bg-primary text-surface px-6 py-2 rounded-md font-medium hover:bg-text-primary transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-2xl font-bold text-text-primary mb-4">
                  Book {service.name}
                </h3>
                <form onSubmit={handleSubmitBooking} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
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
                      value={bookingData.email}
                      onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingData.preferredDate}
                      onChange={(e) => setBookingData({ ...bookingData, preferredDate: e.target.value })}
                      className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Message (optional)
                    </label>
                    <textarea
                      rows={3}
                      value={bookingData.message}
                      onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                      className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
                      placeholder="Tell us about your project or any special requirements..."
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsBookingOpen(false)}
                      className="flex-1 px-4 py-2 border border-border-light rounded-md font-medium text-text-primary hover:bg-background transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-primary text-surface px-4 py-2 rounded-md font-medium hover:bg-text-primary transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Request Booking'}
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
