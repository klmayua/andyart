'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, CheckCircle } from 'lucide-react';

export default function HostEventPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
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
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/events/host', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError(data.error || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-8 px-4 pt-24">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="w-20 h-20 bg-andy-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-andy-black" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-andy-black mb-4">
            Request Received
          </h1>
          <p className="text-lg text-andy-bronze mb-8">
            Our experiences team will contact you within 2-3 business days.
          </p>
          <Link href="/events" className="bg-andy-black text-andy-ivory px-8 py-3 rounded-full font-medium hover:bg-andy-black/80 transition-colors inline-block text-sm">
            View Experiences
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 pt-24">
      <div className="max-w-2xl mx-auto">
        <Link href="/events" className="inline-flex items-center gap-2 text-andy-bronze hover:text-andy-black mb-6 text-sm">
          <ChevronLeft size={18} />
          Back to Experiences
        </Link>

        <div className="mb-8">
          <p className="text-andy-bronze text-xs uppercase tracking-[0.25em] mb-2 font-medium">Host</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-andy-black editorial-headline mb-3">
            Host an Experience
          </h1>
          <p className="text-andy-bronze leading-relaxed">
            Planning a corporate event, private celebration, or team-building experience? Partner with AndyArt.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-andy-stone/30 rounded-xl p-4">
            <h3 className="font-semibold text-andy-black mb-2 text-sm">Private Gatherings</h3>
            <p className="text-xs text-andy-bronze">Birthdays, anniversaries, and celebrations with a creative twist.</p>
          </div>
          <div className="bg-white border border-andy-stone/30 rounded-xl p-4">
            <h3 className="font-semibold text-andy-black mb-2 text-sm">Corporate Events</h3>
            <p className="text-xs text-andy-bronze">Team building, client entertainment, and company culture nights.</p>
          </div>
          <div className="bg-white border border-andy-stone/30 rounded-xl p-4">
            <h3 className="font-semibold text-andy-black mb-2 text-sm">Workshops</h3>
            <p className="text-xs text-andy-bronze">Educational sessions and heritage skill-building workshops.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-andy-stone/30 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-andy-black mb-1">Full Name</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-andy-black mb-1">Email</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-andy-black mb-1">Phone</label>
              <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-andy-black mb-1">Organization</label>
              <input type="text" value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} className="w-full px-4 py-2 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50" placeholder="Company or group name" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-andy-black mb-1">Event Type</label>
              <select value={formData.eventType} onChange={(e) => setFormData({ ...formData, eventType: e.target.value })} className="w-full px-4 py-2 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50">
                <option value="private">Private Gathering</option>
                <option value="corporate">Corporate Event</option>
                <option value="workshop">Workshop</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-andy-black mb-1">Expected Guests</label>
              <select value={formData.expectedGuests} onChange={(e) => setFormData({ ...formData, expectedGuests: e.target.value })} className="w-full px-4 py-2 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50">
                <option value="1-10">1-10 guests</option>
                <option value="11-20">11-20 guests</option>
                <option value="20-50">20-50 guests</option>
                <option value="50+">50+ guests</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-andy-black mb-1">Preferred Date</label>
            <input type="date" value={formData.preferredDate} onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })} className="w-full px-4 py-2 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-andy-black mb-1">Tell Us About Your Event</label>
            <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-2 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50" placeholder="Describe your vision..." />
          </div>

          {error && (
            <p className="text-sm text-andy-wine bg-andy-wine/10 px-4 py-3 rounded-lg">{error}</p>
          )}

          <button type="submit" disabled={isSubmitting} className="w-full bg-andy-black text-andy-ivory py-3 rounded-full font-medium hover:bg-andy-black/80 transition-colors text-sm tracking-wide disabled:opacity-60">
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
