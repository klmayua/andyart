import type { BudgetBand, InterestTag, SubscriberTier } from '@/types/newsletter';

const INTEREST_SCORES: Record<InterestTag, number> = {
  collectors_circle: 20,
  acquisitions: 25,
  private_viewings: 20,
  exhibitions: 10,
  events: 10,
  commissions: 20,
  interior_curation: 15,
  hospitality_design: 15,
  journal: 5,
  investment_opportunities: 25,
  institutional: 25,
};

const BUDGET_SCORES: Record<BudgetBand, number> = {
  exploratory: 5,
  emerging_collector: 15,
  established_collector: 25,
  premium_collector: 35,
  institutional: 40,
};

export function calculateSubscriberScore(
  interests: InterestTag[],
  budgetSignal: BudgetBand | null,
  hasWhatsApp: boolean
): number {
  let score = 0;
  for (const interest of interests) {
    score += INTEREST_SCORES[interest] ?? 0;
  }
  if (budgetSignal) {
    score += BUDGET_SCORES[budgetSignal] ?? 0;
  }
  if (hasWhatsApp) {
    score += 10;
  }
  return Math.min(score, 100);
}

export function classifyTier(score: number): SubscriberTier {
  if (score >= 76) return 'vip';
  if (score >= 51) return 'collector';
  if (score >= 26) return 'prospect';
  return 'reader';
}

export function getTierLabel(tier: SubscriberTier): string {
  const labels: Record<SubscriberTier, string> = {
    reader: 'Curious Reader',
    prospect: 'Active Prospect',
    collector: 'Serious Collector',
    vip: 'VIP Collector',
  };
  return labels[tier];
}

export function getTierColor(tier: SubscriberTier): { bg: string; text: string } {
  const colors: Record<SubscriberTier, { bg: string; text: string }> = {
    reader: { bg: 'bg-andy-stone/20', text: 'text-andy-bronze' },
    prospect: { bg: 'bg-andy-gold/10', text: 'text-andy-gold' },
    collector: { bg: 'bg-andy-black', text: 'text-andy-ivory' },
    vip: { bg: 'bg-andy-gold', text: 'text-andy-black' },
  };
  return colors[tier];
}

export const SUBSCRIBER_STORAGE_KEY = 'andyart_subscribers';

export function getSubscribers(): import('@/types/newsletter').NewsletterSubscriber[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SUBSCRIBER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSubscriber(subscriber: import('@/types/newsletter').NewsletterSubscriber): void {
  if (typeof window === 'undefined') return;
  const existing = getSubscribers();
  const idx = existing.findIndex((s) => s.identity.email === subscriber.identity.email);
  if (idx >= 0) {
    existing[idx] = subscriber;
  } else {
    existing.push(subscriber);
  }
  localStorage.setItem(SUBSCRIBER_STORAGE_KEY, JSON.stringify(existing));
}

export function getSubscriberCount(): number {
  return getSubscribers().length;
}

export function getSegmentCounts(): Record<SubscriberTier, number> {
  const subs = getSubscribers();
  return {
    reader: subs.filter((s) => s.tier === 'reader').length,
    prospect: subs.filter((s) => s.tier === 'prospect').length,
    collector: subs.filter((s) => s.tier === 'collector').length,
    vip: subs.filter((s) => s.tier === 'vip').length,
  };
}

export function getHottestInterest(): InterestTag | null {
  const subs = getSubscribers();
  const counts: Partial<Record<InterestTag, number>> = {};
  for (const sub of subs) {
    for (const interest of sub.interests) {
      counts[interest] = (counts[interest] ?? 0) + 1;
    }
  }
  let max = 0;
  let hottest: InterestTag | null = null;
  for (const [k, v] of Object.entries(counts)) {
    if (v > max) {
      max = v;
      hottest = k as InterestTag;
    }
  }
  return hottest;
}