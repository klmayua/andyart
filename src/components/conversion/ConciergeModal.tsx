'use client';

import { useState } from 'react';
import BaseModal from './BaseModal';
import { captureLead } from '@/lib/leadCapture';
import { useAnalytics } from '@/hooks/useAnalytics';

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  context?: string;
}

export default function ConciergeModal({ isOpen, onClose, context }: ConciergeModalProps) {
  const { track } = useAnalytics();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'Nigeria',
    serviceType: 'Private Viewing',
    budgetBand: 'undisclosed' as const,
    urgency: 'exploring' as const,
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const interestMap: Record<string, string> = {
        'Private Viewing': 'concierge',
        'Art Sourcing': 'artwork',
        'Bespoke Commission': 'commission',
        'Corporate Curation': 'corporate_curation',
        'Collection Advisory': 'concierge',
        'Other': 'concierge',
      };

      captureLead({
        profile: { fullName: form.fullName, email: form.email, phone: form.phone, country: form.country },
        segment: 'luxury_buyer',
        interest: { category: (interestMap[form.serviceType] || 'concierge') as any },
        budgetBand: form.budgetBand,
        urgency: form.urgency,
        notes: `${context ? context + '\n' : ''}Concierge request: ${form.serviceType}. ${form.notes}`,
        source: 'concierge',
      });

      track('service_call_concierge', { page: 'concierge_modal', context: context || 'general' });
      setStep('success');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setStep('form');
    setForm({ fullName: '', email: '', phone: '', country: 'Nigeria', serviceType: 'Private Viewing', budgetBand: 'undisclosed', urgency: 'exploring', notes: '' });
    setError('');
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={reset} title={step === 'success' ? 'Concierge Assigned' : 'Speak to Our Concierge'} subtitle={step === 'form' ? 'White glove service for discerning collectors' : undefined}>
      {step === 'success' ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-andy-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-andy-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <p className="text-andy-bronze mb-2">Your personal concierge will contact you within 24 hours.</p>
          <p className="text-xs text-andy-bronze/70 mb-6">Available Monday – Saturday, 10am – 6pm WAT</p>
          <button onClick={reset} className="bg-andy-black text-andy-ivory px-6 py-2.5 rounded-full text-sm font-medium hover:bg-andy-black/80 transition-colors">Close</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input required type="text" placeholder="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black placeholder:text-andy-bronze/50" />
            <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black placeholder:text-andy-bronze/50" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black placeholder:text-andy-bronze/50" />
            <input type="text" placeholder="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black placeholder:text-andy-bronze/50" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select value={form.serviceType} onChange={(e) => setForm({ ...form, serviceType: e.target.value })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black">
              <option>Private Viewing</option>
              <option>Art Sourcing</option>
              <option>Bespoke Commission</option>
              <option>Corporate Curation</option>
              <option>Collection Advisory</option>
              <option>Other</option>
            </select>
            <select value={form.budgetBand} onChange={(e) => setForm({ ...form, budgetBand: e.target.value as typeof form.budgetBand })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black">
              <option value="undisclosed">Budget — Flexible</option>
              <option value="under_1000">Under $1,000</option>
              <option value="1000_5000">$1,000 – $5,000</option>
              <option value="5000_25000">$5,000 – $25,000</option>
              <option value="25000_100000">$25,000 – $100,000</option>
              <option value="100000_plus">$100,000+</option>
            </select>
          </div>
          <select value={form.urgency} onChange={(e) => setForm({ ...form, urgency: e.target.value as typeof form.urgency })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black">
            <option value="exploring">Timeline — Exploring</option>
            <option value="90_days">Within 90 Days</option>
            <option value="30_days">Within 30 Days</option>
            <option value="immediate">Immediate</option>
          </select>
          <textarea rows={3} placeholder="Tell us what you have in mind..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black placeholder:text-andy-bronze/50 resize-none" />

          {error && <p className="text-xs text-andy-wine bg-andy-wine/10 px-3 py-2 rounded-lg">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-andy-stone/30 rounded-full text-sm font-medium text-andy-black hover:bg-andy-stone/20 transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 bg-andy-black text-andy-ivory px-4 py-2.5 rounded-full text-sm font-medium hover:bg-andy-black/80 transition-colors disabled:opacity-60">
              {isSubmitting ? 'Sending...' : 'Contact Concierge'}
            </button>
          </div>
        </form>
      )}
    </BaseModal>
  );
}
