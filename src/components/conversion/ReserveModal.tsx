'use client';

import { useState } from 'react';
import BaseModal from './BaseModal';
import { captureLead } from '@/lib/leadCapture';
import { useAnalytics } from '@/hooks/useAnalytics';

interface ReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
  artworkTitle: string;
  artworkSlug: string;
  artworkPrice: number | null;
}

export default function ReserveModal({ isOpen, onClose, artworkTitle, artworkSlug, artworkPrice }: ReserveModalProps) {
  const { track } = useAnalytics();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'Nigeria',
    preferredDate: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      captureLead({
        profile: { fullName: form.fullName, email: form.email, phone: form.phone, country: form.country },
        segment: 'collector',
        interest: { category: 'artwork', itemId: artworkSlug, itemType: 'artwork', itemTitle: artworkTitle, itemSlug: artworkSlug },
        budgetBand: artworkPrice ? (artworkPrice > 25000 ? '25000_100000' : artworkPrice > 5000 ? '5000_25000' : '1000_5000') : 'undisclosed',
        urgency: 'immediate',
        notes: `Reserve request for ${artworkTitle}. Preferred viewing: ${form.preferredDate || 'Any'}. ${form.notes}`,
        source: 'website',
      });

      track('artwork_reserve', { page: 'reserve_modal', slug: artworkSlug, title: artworkTitle, value: artworkPrice || undefined });
      setStep('success');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setStep('form');
    setForm({ fullName: '', email: '', phone: '', country: 'Nigeria', preferredDate: '', notes: '' });
    setError('');
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={reset} title={step === 'success' ? 'Reservation Requested' : 'Reserve This Work'} subtitle={step === 'form' ? `${artworkTitle}${artworkPrice ? ` — $${artworkPrice.toLocaleString()}` : ''}` : undefined}>
      {step === 'success' ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-andy-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-andy-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <p className="text-andy-bronze mb-2">This work will be held for 72 hours while we confirm.</p>
          <p className="text-xs text-andy-bronze/70 mb-6">Our concierge will contact you within 4 hours.</p>
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
          <div>
            <label className="block text-xs text-andy-bronze mb-1.5">Preferred Viewing Date</label>
            <input type="date" value={form.preferredDate} onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black" />
          </div>
          <textarea rows={2} placeholder="Any special requests..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black placeholder:text-andy-bronze/50 resize-none" />

          {error && <p className="text-xs text-andy-wine bg-andy-wine/10 px-3 py-2 rounded-lg">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-andy-stone/30 rounded-full text-sm font-medium text-andy-black hover:bg-andy-stone/20 transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 bg-andy-black text-andy-ivory px-4 py-2.5 rounded-full text-sm font-medium hover:bg-andy-black/80 transition-colors disabled:opacity-60">
              {isSubmitting ? 'Sending...' : 'Reserve Work'}
            </button>
          </div>
        </form>
      )}
    </BaseModal>
  );
}
