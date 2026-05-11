'use client';

import { useState } from 'react';
import BaseModal from './BaseModal';
import { captureLead } from '@/lib/leadCapture';
import { useAnalytics } from '@/hooks/useAnalytics';

interface PrivateViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextTitle: string;
  contextSlug?: string;
  contextType: 'artwork' | 'artist' | 'collection' | 'viewing-room';
}

export default function PrivateViewingModal({ isOpen, onClose, contextTitle, contextSlug, contextType }: PrivateViewingModalProps) {
  const { track } = useAnalytics();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'Nigeria',
    city: '',
    preferredDate: '',
    preferredTime: 'morning',
    guests: 1,
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      captureLead({
        profile: { fullName: form.fullName, email: form.email, phone: form.phone, country: form.country, city: form.city },
        segment: 'collector',
        interest: { category: 'concierge', itemId: contextSlug, itemType: contextType, itemTitle: contextTitle },
        urgency: '30_days',
        notes: `Private viewing request for ${contextTitle}. Date: ${form.preferredDate || 'Flexible'}. Time: ${form.preferredTime}. Guests: ${form.guests}. ${form.notes}`,
        source: 'website',
      });

      track('artwork_private_viewing', { page: 'private_viewing_modal', slug: contextSlug, title: contextTitle, contextType });
      setStep('success');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setStep('form');
    setForm({ fullName: '', email: '', phone: '', country: 'Nigeria', city: '', preferredDate: '', preferredTime: 'morning', guests: 1, notes: '' });
    setError('');
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={reset} title={step === 'success' ? 'Viewing Scheduled' : 'Book a Private Viewing'} subtitle={step === 'form' ? contextTitle : undefined}>
      {step === 'success' ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-andy-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-andy-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <p className="text-andy-bronze mb-2">Our concierge will confirm your appointment within 24 hours.</p>
          <p className="text-xs text-andy-bronze/70 mb-6">Wine, canapés, and personal curation included.</p>
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
            <input type="text" placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black placeholder:text-andy-bronze/50" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input type="date" placeholder="Preferred Date" value={form.preferredDate} onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black" />
            <select value={form.preferredTime} onChange={(e) => setForm({ ...form, preferredTime: e.target.value })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black">
              <option value="morning">Morning (10am – 12pm)</option>
              <option value="afternoon">Afternoon (12pm – 4pm)</option>
              <option value="evening">Evening (4pm – 6pm)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-andy-bronze mb-1.5">Number of Guests</label>
            <select value={form.guests} onChange={(e) => setForm({ ...form, guests: parseInt(e.target.value) })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black">
              {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}
            </select>
          </div>
          <textarea rows={2} placeholder="Any requests or works you'd like to see..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black placeholder:text-andy-bronze/50 resize-none" />

          {error && <p className="text-xs text-andy-wine bg-andy-wine/10 px-3 py-2 rounded-lg">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-andy-stone/30 rounded-full text-sm font-medium text-andy-black hover:bg-andy-stone/20 transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 bg-andy-black text-andy-ivory px-4 py-2.5 rounded-full text-sm font-medium hover:bg-andy-black/80 transition-colors disabled:opacity-60">
              {isSubmitting ? 'Sending...' : 'Request Viewing'}
            </button>
          </div>
        </form>
      )}
    </BaseModal>
  );
}
