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
      <div className="min-h-screen py-8 px-4 pt-24">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="w-20 h-20 bg-andy-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-andy-black" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-andy-black mb-4">
            Application Submitted
          </h1>
          <p className="text-lg text-andy-bronze mb-8">
            Our partnerships team will review your application and respond within 2-3 business days.
          </p>
          <Link href="/" className="bg-andy-black text-andy-ivory px-8 py-3 rounded-full font-medium hover:bg-andy-black/80 transition-colors inline-block text-sm">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 pt-24">
      <div className="max-w-2xl mx-auto">
        <Link href="/partners" className="inline-flex items-center gap-2 text-andy-bronze hover:text-andy-black mb-6 text-sm">
          <ChevronLeft size={18} />
          Back to Partnerships
        </Link>

        <div className="mb-8">
          <p className="text-andy-bronze text-xs uppercase tracking-[0.25em] mb-2 font-medium">Collaboration</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-andy-black editorial-headline mb-3">
            Partner Application
          </h1>
          <p className="text-andy-bronze leading-relaxed">
            Tell us about your business and how you would like to partner with AndyArt.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-andy-stone/30 rounded-2xl p-6 md:p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-andy-black mb-1">Business Name</label>
            <input type="text" required value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} className="w-full px-4 py-2 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50" placeholder="Your business name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-andy-black mb-1">Contact Name</label>
            <input type="text" required value={formData.contactName} onChange={(e) => setFormData({ ...formData, contactName: e.target.value })} className="w-full px-4 py-2 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50" placeholder="Your full name" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-andy-black mb-1">Email</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50" placeholder="you@company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-andy-black mb-1">Phone</label>
              <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50" placeholder="+234 800 000 0000" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-andy-black mb-1">Partnership Type</label>
            <select value={formData.partnerType} onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })} className="w-full px-4 py-2 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50">
              <option value="interior_designer">Interior Designer</option>
              <option value="corporate">Corporate Client</option>
              <option value="venue">Venue / Hospitality</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-andy-black mb-1">Website (optional)</label>
            <input type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="w-full px-4 py-2 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50" placeholder="https://yourwebsite.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-andy-black mb-1">Tell us about your business</label>
            <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-2 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50" placeholder="Describe your business, typical projects, and how you plan to work with us..." />
          </div>
          <div className="bg-andy-ivory rounded-lg p-4">
            <p className="text-sm text-andy-bronze">
              By submitting, you agree to our{' '}
              <Link href="/legal/terms" className="text-andy-gold hover:underline">Terms</Link>
              {' '}and{' '}
              <Link href="/legal/privacy" className="text-andy-gold hover:underline">Privacy Policy</Link>.
            </p>
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-andy-black text-andy-ivory py-3 rounded-full font-medium hover:bg-andy-black/80 transition-colors disabled:opacity-50 text-sm tracking-wide">
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}
