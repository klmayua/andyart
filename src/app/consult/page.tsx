'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Calendar, Clock, CheckCircle, Phone, MessageCircle } from 'lucide-react';

export default function ConsultPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: 'morning',
    serviceType: 'Private Viewing',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
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
            Our concierge team will contact you within 24 hours to confirm your appointment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="bg-andy-black text-andy-ivory px-8 py-3 rounded-full font-medium hover:bg-andy-black/80 transition-colors inline-block text-sm"
            >
              Return Home
            </Link>
            <a
              href="https://wa.me/2348002649278"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-andy-stone/30 text-andy-black px-8 py-3 rounded-full font-medium hover:bg-andy-stone/20 transition-colors inline-flex items-center justify-center gap-2 text-sm"
            >
              <MessageCircle size={16} />
              WhatsApp Concierge
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 pt-24">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-andy-bronze hover:text-andy-black mb-6 text-sm"
        >
          <ChevronLeft size={18} />
          Back to Home
        </Link>

        <div className="mb-8">
          <p className="text-andy-bronze text-xs uppercase tracking-[0.25em] mb-2 font-medium">White Glove Service</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-andy-black editorial-headline mb-3">
            Book a Consultation
          </h1>
          <p className="text-andy-bronze leading-relaxed">
            Schedule a one-on-one session with our collector concierge. 
            Private viewings, sourcing advice, commission discussions, and more.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-andy-stone/30 p-5">
            <Calendar className="text-andy-gold mb-2" size={22} />
            <h3 className="font-semibold text-andy-black mb-1 text-sm">Availability</h3>
            <p className="text-sm text-andy-bronze">Monday - Saturday</p>
            <p className="text-sm text-andy-bronze">10am - 6pm</p>
          </div>
          <div className="bg-white rounded-xl border border-andy-stone/30 p-5">
            <Clock className="text-andy-gold mb-2" size={22} />
            <h3 className="font-semibold text-andy-black mb-1 text-sm">Duration</h3>
            <p className="text-sm text-andy-bronze">60 - 90 minutes</p>
            <p className="text-sm text-andy-bronze">Complimentary</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-andy-stone/30 p-6 md:p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-andy-black mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50 text-andy-black placeholder:text-andy-bronze/50"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-andy-black mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50 text-andy-black placeholder:text-andy-bronze/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-andy-black mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50 text-andy-black placeholder:text-andy-bronze/50"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-andy-black mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                required
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50 text-andy-black placeholder:text-andy-bronze/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-andy-black mb-1">
                Preferred Time
              </label>
              <select
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50 text-andy-black"
              >
                <option value="morning">Morning (10am - 12pm)</option>
                <option value="afternoon">Afternoon (12pm - 4pm)</option>
                <option value="evening">Evening (4pm - 6pm)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-andy-black mb-1">
              Service Type
            </label>
            <select
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50 text-andy-black"
            >
              <option>Private Viewing</option>
              <option>Art Sourcing</option>
              <option>Bespoke Commission</option>
              <option>Corporate Curation</option>
              <option>Collection Advisory</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-andy-black mb-1">
              Message (optional)
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50 text-andy-black placeholder:text-andy-bronze/50"
              placeholder="Tell us about your project, taste, or any specific requirements..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-andy-black text-andy-ivory py-3.5 rounded-full font-medium hover:bg-andy-black/80 transition-all text-sm tracking-wide"
          >
            Request Consultation
          </button>

          <div className="flex items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/2348002649278"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-andy-bronze hover:text-andy-gold transition-colors flex items-center gap-1"
            >
              <MessageCircle size={12} />
              WhatsApp
            </a>
            <span className="text-andy-stone">|</span>
            <a
              href="tel:+2348002649278"
              className="text-xs text-andy-bronze hover:text-andy-gold transition-colors flex items-center gap-1"
            >
              <Phone size={12} />
              Call
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
