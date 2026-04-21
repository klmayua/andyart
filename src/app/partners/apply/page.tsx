'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, CheckCircle } from 'lucide-react';

export default function PartnerApplyPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    partnerType: 'interior_designer',
    website: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/partners/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Application error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-8 px-container-mobile">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="w-20 h-20 bg-success-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-surface" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Application Submitted!
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            Thank you for your interest in partnering with AndyArt. Our team will review your application and get back to you within 2-3 business days.
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
        {/* Back Button */}
        <Link
          href="/partners"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6"
        >
          <ChevronLeft size={20} />
          Back to Partnerships
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Partner Application
          </h1>
          <p className="text-text-secondary">
            Tell us about your business and how you'd like to partner with us.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-surface border border-border-light rounded-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Business Name
            </label>
            <input
              type="text"
              required
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
              placeholder="Your business or company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Contact Name
            </label>
            <input
              type="text"
              required
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
              placeholder="Your full name"
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
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Phone
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Partnership Type
            </label>
            <select
              value={formData.partnerType}
              onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
              className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
            >
              <option value="interior_designer">Interior Designer</option>
              <option value="corporate">Corporate Client</option>
              <option value="venue">Venue / Hospitality</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Website (optional)
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
              placeholder="https://yourwebsite.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Tell us about your business
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
              placeholder="Describe your business, typical projects, and how you plan to work with us..."
            />
          </div>

          <div className="bg-background rounded-md p-4">
            <p className="text-sm text-text-secondary">
              By submitting this application, you agree to our{' '}
              <Link href="/legal/terms" className="text-success-gold hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/legal/privacy" className="text-success-gold hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-surface py-3 rounded-md font-medium hover:bg-text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}
