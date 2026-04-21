'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Calendar, Clock, CheckCircle } from 'lucide-react';

export default function ConsultPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: 'morning',
    serviceType: 'Art Consultation',
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
            Consultation Request Received!
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            We'll contact you within 24 hours to confirm your appointment time.
          </p>
          <Link
            href="/"
            className="bg-primary text-surface px-8 py-3 rounded-md font-medium hover:bg-text-primary transition-colors inline-block"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-container-mobile">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6"
        >
          <ChevronLeft size={20} />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Book a Consultation
          </h1>
          <p className="text-text-secondary">
            Schedule a one-on-one session with our expert curators to discuss your art needs.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-surface border border-border-light rounded-lg p-4">
            <Calendar className="text-success-gold mb-2" size={24} />
            <h3 className="font-semibold text-text-primary mb-1">Availability</h3>
            <p className="text-sm text-text-secondary">Monday - Saturday</p>
            <p className="text-sm text-text-secondary">10am - 6pm</p>
          </div>
          <div className="bg-surface border border-border-light rounded-lg p-4">
            <Clock className="text-success-gold mb-2" size={24} />
            <h3 className="font-semibold text-text-primary mb-1">Duration</h3>
            <p className="text-sm text-text-secondary">60 minutes</p>
            <p className="text-sm text-text-secondary">$150/session</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-surface border border-border-light rounded-lg p-6 space-y-6">
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

          <div className="grid md:grid-cols-2 gap-4">
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
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                required
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Preferred Time
              </label>
              <select
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
              >
                <option value="morning">Morning (10am - 12pm)</option>
                <option value="afternoon">Afternoon (12pm - 4pm)</option>
                <option value="evening">Evening (4pm - 6pm)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Service Type
            </label>
            <select
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
            >
              <option>Art Consultation</option>
              <option>Corporate Art Curation</option>
              <option>Collection Management</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Message (optional)
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
              placeholder="Tell us about your project or any specific requirements..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-surface py-3 rounded-md font-medium hover:bg-text-primary transition-colors"
          >
            Request Consultation
          </button>
        </form>
      </div>
    </div>
  );
}
