'use client';

import { useState } from 'react';
import BaseModal from './BaseModal';
import { captureLead } from '@/lib/leadCapture';
import { useAnalytics } from '@/hooks/useAnalytics';
import type { LeadBudgetBand } from '@/types/crm';

interface CommissionBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistName?: string;
  artistSlug?: string;
  contextTitle?: string;
}

export default function CommissionBriefModal({ isOpen, onClose, artistName, artistSlug, contextTitle }: CommissionBriefModalProps) {
  const { track } = useAnalytics();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState<{
    fullName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    budgetBand: LeadBudgetBand;
    timeline: string;
    subject: string;
    medium: string;
    dimensions: string;
    space: string;
    inspiration: string;
    specialRequirements: string;
  }>({
    fullName: '',
    email: '',
    phone: '',
    country: 'Nigeria',
    city: '',
    budgetBand: 'undisclosed',
    timeline: '90_days',
    subject: '',
    medium: '',
    dimensions: '',
    space: '',
    inspiration: '',
    specialRequirements: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      captureLead({
        profile: { fullName: form.fullName, email: form.email, phone: form.phone, country: form.country, city: form.city },
        segment: 'commission_client',
        interest: {
          category: 'commission',
          itemId: artistSlug,
          itemType: 'artist',
          itemTitle: artistName || contextTitle || 'Bespoke Commission',
        },
        budgetBand: form.budgetBand,
        urgency: form.timeline === '30_days' ? '30_days' : form.timeline === 'immediate' ? 'immediate' : '90_days',
        notes: [
          `Subject: ${form.subject}`,
          form.medium ? `Medium: ${form.medium}` : '',
          form.dimensions ? `Dimensions: ${form.dimensions}` : '',
          form.space ? `Space: ${form.space}` : '',
          form.inspiration ? `Inspiration: ${form.inspiration}` : '',
          form.specialRequirements ? `Special Requirements: ${form.specialRequirements}` : '',
        ].filter(Boolean).join('\n'),
        source: 'website',
      });

      track('artist_commission', { page: 'commission_modal', slug: artistSlug, title: artistName });
      setStep('success');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setStep('form');
    setForm({ fullName: '', email: '', phone: '', country: 'Nigeria', city: '', budgetBand: 'undisclosed', timeline: '90_days', subject: '', medium: '', dimensions: '', space: '', inspiration: '', specialRequirements: '' });
    setError('');
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={reset} title={step === 'success' ? 'Brief Received' : 'Commission a Work'} subtitle={step === 'form' ? artistName ? `Commission a work by ${artistName}` : 'Start your bespoke commission' : undefined}>
      {step === 'success' ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-andy-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-andy-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <p className="text-andy-bronze mb-2">Our commission team will review your brief and contact you within 48 hours to discuss next steps.</p>
          <p className="text-xs text-andy-bronze/70 mb-6">We match every commission with the ideal artist and manage the process end-to-end.</p>
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
            <select value={form.budgetBand} onChange={(e) => setForm({ ...form, budgetBand: e.target.value as LeadBudgetBand })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black">
              <option value="undisclosed">Budget — Flexible</option>
              <option value="under_1000">Under $1,000</option>
              <option value="1000_5000">$1,000 – $5,000</option>
              <option value="5000_25000">$5,000 – $25,000</option>
              <option value="25000_100000">$25,000 – $100,000</option>
              <option value="100000_plus">$100,000+</option>
            </select>
            <select value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value as typeof form.timeline })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black">
              <option value="90_days">Timeline — 90 Days</option>
              <option value="30_days">Within 30 Days</option>
              <option value="immediate">Immediate</option>
            </select>
          </div>
          <input required type="text" placeholder="What would you like to commission?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black placeholder:text-andy-bronze/50" />
          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="Medium / Materials" value={form.medium} onChange={(e) => setForm({ ...form, medium: e.target.value })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black placeholder:text-andy-bronze/50" />
            <input type="text" placeholder="Approximate Dimensions" value={form.dimensions} onChange={(e) => setForm({ ...form, dimensions: e.target.value })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black placeholder:text-andy-bronze/50" />
          </div>
          <input type="text" placeholder="Where will the work hang? (Room type, wall dimensions)" value={form.space} onChange={(e) => setForm({ ...form, space: e.target.value })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black placeholder:text-andy-bronze/50" />
          <textarea rows={2} placeholder="Inspiration, mood, or reference images you have in mind..." value={form.inspiration} onChange={(e) => setForm({ ...form, inspiration: e.target.value })} className="w-full px-4 py-2.5 border border-andy-stone/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-white text-sm text-andy-black placeholder:text-andy-bronze/50 resize-none" />

          {error && <p className="text-xs text-andy-wine bg-andy-wine/10 px-3 py-2 rounded-lg">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-andy-stone/30 rounded-full text-sm font-medium text-andy-black hover:bg-andy-stone/20 transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 bg-andy-black text-andy-ivory px-4 py-2.5 rounded-full text-sm font-medium hover:bg-andy-black/80 transition-colors disabled:opacity-60">
              {isSubmitting ? 'Sending...' : 'Submit Brief'}
            </button>
          </div>
        </form>
      )}
    </BaseModal>
  );
}
