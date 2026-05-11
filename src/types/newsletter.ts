export type InterestTag =
  | 'collectors_circle'
  | 'acquisitions'
  | 'private_viewings'
  | 'exhibitions'
  | 'events'
  | 'commissions'
  | 'interior_curation'
  | 'hospitality_design'
  | 'journal'
  | 'investment_opportunities';

export type BudgetBand = 'exploratory' | 'emerging_collector' | 'established_collector' | 'premium_collector' | 'institutional';

export type Cadence = 'weekly' | 'biweekly' | 'monthly' | 'important_only';

export type SubscriberTier = 'reader' | 'prospect' | 'collector' | 'vip';

export interface NewsletterSubscriber {
  id: string;
  createdAt: string;

  identity: {
    fullName: string | null;
    email: string;
    whatsapp: string | null;
    country: string | null;
  };

  interests: InterestTag[];

  budgetSignal: BudgetBand | null;

  cadence: Cadence;

  score: number;
  tier: SubscriberTier;

  source: string | null;
}

export interface SubscriberSegment {
  tier: SubscriberTier;
  count: number;
  interests: Record<InterestTag, number>;
  avgScore: number;
  topCountries: string[];
}