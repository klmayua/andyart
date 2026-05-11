'use client';

import { useState } from 'react';
import BaseModal from './BaseModal';
import { captureLead } from '@/lib/leadCapture';
import { useAnalytics } from '@/hooks/useAnalytics';

interface EventRSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventSlug: string;
  ticketPrice: number | null;
  totalPrice?: number;
  remainingTickets?: number | null;
}

export default function EventRSVPModal({ isOpen, onClose, eventTitle, eventSlug, ticketPrice, totalPrice, remainingTickets }: EventRSVPModalProps) {
  const { track } = useAnalytics();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'Nigeria',
    guests: 1,
    notes: '',
  });

  const finalPrice = totalPrice !== undefined ? totalPrice : (ticketPrice && ticketPrice > 0 ? ticketPrice * form.guests : 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      captureLead({
        profile: { fullName: form.fullName, email: form.email, phone: form.phone, country: form.country },
        segment: 'experience_guest',
        interest: { category: 'event', itemId: eventSlug, itemType: 'event', itemTitle: eventTitle, itemSlug: eventSlug },
        budgetBand: ticketPrice && ticketPrice > 10000 ? '25000_100000' : ticketPrice && ticketPrice > 5000 ? '5000_25000' : ticketPrice && ticketPrice > 1000 ? '1000_5000' : 'under_1000',
        urgency: '30_days',
        notes: `RSVP for ${eventTitle}. Guests: ${form.guests}. ${form.notes}`,
        source: 'event',
      });

      track('event_rsvp', { page: 'rsvp_modal', slug: eventSlug, title: eventTitle, value: finalPrice || undefined });

      if (ticketPrice && ticketPrice > 0) {
        try {
          await fetch('/api/events/rsvp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              eventId: eventSlug,
              userName: form.fullName,
              userEmail: form.email,
              guests: form.guests,
            }),
          });
        } catch { /* non-blocking */ }
      }

      setStep('success');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setStep('form');
    setForm({ fullName: '', email: '', phone: '', country: 'Nigeria', guests: 1, notes: '' });
    setError('');
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={reset} title={step === 'success' ? 'RSVP Confirmed' : `RSVP — ${eventTitle}`} subtitle={step === 'form' && remainingTickets !== null ? `${remainingTickets} spots remaining` : undefined}>
      {step === 'success' ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-andy-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-andy-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <p className="text-andy-bronze mb-2">Your place is confirmed. Details will be sent to {form.email}</p>
          <p className="text-xs text-andy-bronze/70 mb-6">We look forward to seeing you.</p>
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

          <select value={form.guests} onChange={(e) => setForm({ ...form, guests: parseInt(e.target.value) })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black">
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}
          </select>

          {ticketPrice !== null && ticketPrice > 0 && (
            <div className="bg-andy-stone/20 rounded-xl p-4 text-sm space-y-2">
              <div className="flex justify-between text-andy-bronze"><span>Price per person</span><span className="text-andy-black">${ticketPrice}</span></div>
              <div className="flex justify-between text-andy-bronze"><span>Guests</span><span className="text-andy-black">{form.guests}</span></div>
              <div className="flex justify-between font-semibold pt-2 border-t border-andy-stone/30"><span className="text-andy-black">Total</span><span className="text-andy-gold">${(ticketPrice * form.guests).toLocaleString()}</span></div>
            </div>
          )}

          <textarea rows={2} placeholder="Dietary requirements, accessibility needs, or other notes..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black placeholder:text-andy-bronze/50 resize-none" />

          {error && <p className="text-xs text-andy-wine bg-andy-wine/10 px-3 py-2 rounded-lg">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-andy-stone/30 rounded-full text-sm font-medium text-andy-black hover:bg-andy-stone/20 transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 bg-andy-black text-andy-ivory px-4 py-2.5 rounded-full text-sm font-medium hover:bg-andy-black/80 transition-colors disabled:opacity-60">
              {isSubmitting ? 'Processing...' : ticketPrice === 0 || ticketPrice === null ? 'Confirm RSVP' : `Pay $${(ticketPrice * form.guests).toLocaleString()}`}
            </button>
          </div>
        </form>
      )}
    </BaseModal>
  );
}
