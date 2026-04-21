'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, CheckCircle } from 'lucide-react';

export default function HostEventPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    eventType: 'private',
    expectedGuests: '20-50',
    preferredDate: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In production, submit to API
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-8 px-container-mobile">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="w-20 h-20 bg-success-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-surface" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Request Received!
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            Thank you for your interest in hosting an event with us. Our events team will contact you within 2-3 business days to discuss your requirements.
          </p>
          <Link
            href="/events"
            className="bg-primary text-surface px-8 py-3 rounded-md font-medium hover:bg-text-primary transition-colors inline-block"
          >
            View Upcoming Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-container-mobile">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6"
        >
          <ChevronLeft size={20} />
          Back to Events
        </Link>

        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Host an Event With Us
          </h1>
          <p className="text-text-secondary">
            Planning a corporate event, private celebration, or team building activity? Partner with AndyArt for a unique and memorable experience.
          </p>
        </div>

        {/* Event Types */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-surface border border-border-light rounded-lg p-4">
            <h3 className="font-semibold text-text-primary mb-2">Private Parties</h3>
            <p className="text-sm text-text-secondary">Birthdays, anniversaries, and celebrations with a creative twist.</p>
          </div>
          <div className="bg-surface border border-border-light rounded-lg p-4">
            <h3 className="font-semibold text-text-primary mb-2">Corporate Events</h3>
            <p className="text-sm text-text-secondary">Team building, client entertainment, and company celebrations.</p>
          </div>
          <div className="bg-surface border border-border-light rounded-lg p-4">
            <h3 className="font-semibold text-text-primary mb-2">Workshops</h3>
            <p className="text-sm text-text-secondary">Educational sessions and skill-building art workshops.</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-surface border border-border-light rounded-lg p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Organization (optional)
              </label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
                placeholder="Company or group name"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Event Type
              </label>
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
              >
                <option value="private">Private Party</option>
                <option value="corporate">Corporate Event</option>
                <option value="workshop">Workshop</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Expected Guests
              </label>
              <select
                value={formData.expectedGuests}
                onChange={(e) => setFormData({ ...formData, expectedGuests: e.target.value })}
                className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
              >
                <option value="1-10">1-10 guests</option>
                <option value="11-20">11-20 guests</option>
                <option value="20-50">20-50 guests</option>
                <option value="50+">50+ guests</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Preferred Date
            </label>
            <input
              type="date"
              value={formData.preferredDate}
              onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
              className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Tell Us About Your Event
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
              placeholder="Describe your vision, any special requirements, or questions..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-surface py-3 rounded-md font-medium hover:bg-text-primary transition-colors"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
