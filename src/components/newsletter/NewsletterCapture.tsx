'use client';

import { useState, useCallback } from 'react';
import { CheckCircle } from 'lucide-react';
import type { InterestTag, NewsletterSubscriber } from '@/types/newsletter';
import { calculateSubscriberScore, classifyTier, saveSubscriber } from '@/lib/newsletterScoring';
import { useAnalytics } from '@/hooks/useAnalytics';

const ALL_INTERESTS: { value: InterestTag; label: string; desc: string }[] = [
  { value: 'collectors_circle', label: 'Circle Membership', desc: 'VIP access & collector events' },
  { value: 'acquisitions', label: 'Acquisitions', desc: 'New works & investment opportunities' },
  { value: 'private_viewings', label: 'Private Viewings', desc: 'Exclusive gallery access' },
  { value: 'exhibitions', label: 'Exhibitions', desc: 'Gallery openings & showcases' },
  { value: 'events', label: 'Experiences', desc: 'Salons, dinners & cultural gatherings' },
  { value: 'commissions', label: 'Commissions', desc: 'Bespoke artworks & artist projects' },
  { value: 'interior_curation', label: 'Interior Curation', desc: 'Space transformation & styling' },
  { value: 'hospitality_design', label: 'Hospitality Design', desc: 'Hotels, restaurants & corporate' },
  { value: 'journal', label: 'Journal', desc: 'Artist stories & collector guides' },
  { value: 'investment_opportunities', label: 'Investment', desc: 'Market insights & portfolio building' },
];

const CADENCE_OPTIONS = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Bi-weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'important_only', label: 'Important only' },
];

interface NewsletterCaptureProps {
  source?: string;
  title?: string;
  compact?: boolean;
  dark?: boolean;
}

export default function NewsletterCapture({ source = 'unknown', title, compact = false, dark = false }: NewsletterCaptureProps) {
  const { track } = useAnalytics();
  const [step, setStep] = useState<'email' | 'prefs' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<InterestTag[]>([]);
  const [cadence, setCadence] = useState('monthly');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const textBase = dark ? 'text-andy-ivory' : 'text-andy-black';
  const textMuted = dark ? 'text-andy-ivory/50' : 'text-andy-bronze';
  const inputBg = dark ? 'bg-white/10' : 'bg-white';
  const cardBg = dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.60)';
  const cardBorder = dark ? 'border-white/10' : 'border-andy-gold/20';

  const toggleInterest = (interest: InterestTag) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStep('prefs');
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const hasWhatsApp = false;
    const score = calculateSubscriberScore(selectedInterests, null, hasWhatsApp);
    const tier = classifyTier(score);
    const now = new Date().toISOString();

    const subscriber: NewsletterSubscriber = {
      id: Math.random().toString(36).slice(2) + Date.now().toString(36),
      createdAt: now,
      identity: {
        fullName: name || null,
        email,
        whatsapp: null,
        country: null,
      },
      interests: selectedInterests,
      budgetSignal: null,
      cadence: cadence as NewsletterSubscriber['cadence'],
      score,
      tier,
      source,
    };

    saveSubscriber(subscriber);

    track('newsletter_subscribe', {
      source,
      title,
      email,
      interests: selectedInterests,
      cadence,
      score,
      tier,
    });

    setIsSubmitting(false);
    setStep('success');
  }, [email, name, selectedInterests, cadence, source, title, track]);

  if (step === 'success') {
    return (
      <div className="text-center">
        <div className={`w-12 h-12 ${dark ? 'bg-andy-gold/20' : 'bg-andy-gold/20'} rounded-full flex items-center justify-center mx-auto mb-3`}>
          <CheckCircle size={24} className={dark ? 'text-andy-gold' : 'text-andy-gold'} />
        </div>
        <p className={`font-serif text-lg font-bold ${textBase} mb-1`}>
          You&apos;re on the list
        </p>
        <p className={`text-sm ${textMuted}`}>
          Welcome to the AndyArt circle. We&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <div>
      {step === 'email' ? (
        <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          {!compact && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className={`flex-1 px-5 py-3 rounded-full text-sm ${inputBg} border ${dark ? 'border-white/20' : 'border-andy-stone/40'} focus:outline-none focus:ring-2 focus:ring-andy-gold/30 ${dark ? 'text-andy-ivory placeholder:text-andy-ivory/40' : 'text-andy-black placeholder:text-andy-bronze/50'}`}
            />
          )}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className={`flex-1 px-5 py-3 rounded-full text-sm ${inputBg} border ${dark ? 'border-white/20' : 'border-andy-stone/40'} focus:outline-none focus:ring-2 focus:ring-andy-gold/30 ${dark ? 'text-andy-ivory placeholder:text-andy-ivory/40' : 'text-andy-black placeholder:text-andy-bronze/50'}`}
          />
          <button
            type="submit"
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-colors ${dark ? 'bg-andy-gold text-andy-black hover:bg-andy-gold/80' : 'bg-andy-black text-andy-ivory hover:bg-andy-black/80'}`}
          >
            Subscribe
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <p className={`text-sm font-semibold ${textMuted} text-center`}>
            What interests you most? <span className="text-xs">(optional)</span>
          </p>
          <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
            {ALL_INTERESTS.map((interest) => {
              const selected = selectedInterests.includes(interest.value);
              return (
                <button
                  key={interest.value}
                  type="button"
                  onClick={() => toggleInterest(interest.value)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${
                    selected
                      ? dark
                        ? 'bg-andy-gold text-andy-black'
                        : 'bg-andy-black text-andy-ivory'
                      : dark
                        ? 'bg-white/10 text-andy-ivory/70 hover:bg-white/15 border border-white/10'
                        : 'bg-white border border-andy-stone/30 text-andy-bronze hover:border-andy-gold/30'
                  }`}
                >
                  {interest.label}
                </button>
              );
            })}
          </div>

          {!compact && (
            <div>
              <p className={`text-xs ${textMuted} text-center mb-2`}>Email frequency</p>
              <div className="flex flex-wrap justify-center gap-2">
                {CADENCE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setCadence(opt.value)}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                      cadence === opt.value
                        ? dark
                          ? 'bg-andy-gold text-andy-black'
                          : 'bg-andy-black text-andy-ivory'
                        : dark
                          ? 'bg-white/10 text-andy-ivory/60 border border-white/10'
                          : 'bg-andy-stone/20 text-andy-bronze'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <button
              type="button"
              onClick={() => setStep('email')}
              className={`px-5 py-2.5 rounded-full text-xs font-medium border ${dark ? 'border-white/20 text-andy-ivory/60 hover:bg-white/5' : 'border-andy-stone/30 text-andy-bronze hover:bg-andy-stone/20'}`}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-colors ${dark ? 'bg-andy-gold text-andy-black hover:bg-andy-gold/80' : 'bg-andy-black text-andy-ivory hover:bg-andy-black/80'} disabled:opacity-50`}
            >
              {isSubmitting ? 'Joining...' : 'Join the Circle'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}