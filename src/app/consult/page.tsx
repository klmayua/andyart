'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Calendar, Clock, CheckCircle, Phone, MessageCircle } from 'lucide-react';

export default function ConsultPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
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
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/consult', {
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
      <div className="min-h-screen pb-32">
        <div className="max-w-2xl mx-auto text-center py-20 px-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: '#C6A66B' }}>
            <CheckCircle className="w-10 h-10 text-[#171614]" />
          </div>
          <h1 className="display-md mb-4 text-[#171614]">
            Request Received
          </h1>
          <p className="text-lg mb-8" style={{ color: 'rgba(93,70,51,0.8)' }}>
            Our concierge team will contact you within 24 hours to confirm your appointment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn-postmodern-primary text-sm">
              Return Home
            </Link>
            <a
              href="https://wa.me/2348002649278"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-postmodern-secondary text-sm inline-flex items-center justify-center gap-2"
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
    <div className="min-h-screen pb-32">
      <div className="max-w-2xl mx-auto px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm mb-6 hover:text-[#C6A66B] transition-colors" style={{ color: '#5D4633' }}>
          <ChevronLeft size={18} />
          Back to Home
        </Link>

        <div className="mb-10">
          <p className="section-label">White Glove Service</p>
          <h1 className="display-md mb-4 text-[#171614]">
            Book a Consultation
          </h1>
          <p className="text-md leading-relaxed" style={{ color: 'rgba(93,70,51,0.8)' }}>
            Schedule a one-on-one session with our collector concierge. 
            Private viewings, sourcing advice, commission discussions, and more.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-white rounded-xl border p-5 card-postmodern">
            <Calendar className="mb-3" size={22} style={{ color: '#C6A66B' }} />
            <h3 className="font-semibold text-[#171614] mb-1 text-sm">Availability</h3>
            <p className="text-sm" style={{ color: '#5D4633' }}>Monday - Saturday</p>
            <p className="text-sm" style={{ color: '#5D4633' }}>10am - 6pm</p>
          </div>
          <div className="bg-white rounded-xl border p-5 card-postmodern">
            <Clock className="mb-3" size={22} style={{ color: '#C6A66B' }} />
            <h3 className="font-semibold text-[#171614] mb-1 text-sm">Duration</h3>
            <p className="text-sm" style={{ color: '#5D4633' }}>60 - 90 minutes</p>
            <p className="text-sm" style={{ color: '#5D4633' }}>Complimentary</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border p-6 md:p-8 space-y-6" style={{ borderColor: 'rgba(23,22,20,0.06)' }}>
          <div>
            <label className="block text-sm font-medium text-[#171614] mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{ background: 'rgba(247,242,232,0.5)', borderColor: 'rgba(23,22,20,0.1)', color: '#171614' }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#171614] mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                style={{ background: 'rgba(247,242,232,0.5)', borderColor: 'rgba(23,22,20,0.1)', color: '#171614' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#171614] mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                style={{ background: 'rgba(247,242,232,0.5)', borderColor: 'rgba(23,22,20,0.1)', color: '#171614' }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#171614] mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                required
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                style={{ background: 'rgba(247,242,232,0.5)', borderColor: 'rgba(23,22,20,0.1)', color: '#171614' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#171614] mb-2">
                Preferred Time
              </label>
              <select
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                style={{ background: 'rgba(247,242,232,0.5)', borderColor: 'rgba(23,22,20,0.1)', color: '#171614' }}
              >
                <option value="morning">Morning (10am - 12pm)</option>
                <option value="afternoon">Afternoon (12pm - 4pm)</option>
                <option value="evening">Evening (4pm - 6pm)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#171614] mb-2">
              Service Type
            </label>
            <select
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{ background: 'rgba(247,242,232,0.5)', borderColor: 'rgba(23,22,20,0.1)', color: '#171614' }}
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
            <label className="block text-sm font-medium text-[#171614] mb-2">
              Message (optional)
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none"
              style={{ background: 'rgba(247,242,232,0.5)', borderColor: 'rgba(23,22,20,0.1)', color: '#171614' }}
              placeholder="Tell us about your project, taste, or any specific requirements..."
            />
          </div>

          {error && (
            <p className="text-sm px-4 py-3 rounded-lg" style={{ background: 'rgba(184,76,76,0.1)', color: '#B84C4C' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-postmodern-primary py-3.5 text-sm tracking-wide disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting...' : 'Request Consultation'}
          </button>

          <div className="flex items-center justify-center gap-4 pt-2">
            <a href="https://wa.me/2348002649278" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-[#C6A66B] transition-colors flex items-center gap-1" style={{ color: '#5D4633' }}>
              <MessageCircle size={12} />
              WhatsApp
            </a>
            <span style={{ color: '#D7CEC1' }}>|</span>
            <a href="tel:+2348002649278" className="text-xs hover:text-[#C6A66B] transition-colors flex items-center gap-1" style={{ color: '#5D4633' }}>
              <Phone size={12} />
              Call
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}