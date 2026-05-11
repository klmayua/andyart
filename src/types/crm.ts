export type LeadSegment =
  | 'collector'
  | 'investor'
  | 'interior_designer'
  | 'corporate'
  | 'hospitality'
  | 'luxury_buyer'
  | 'art_enthusiast'
  | 'experience_guest'
  | 'commission_client';

export type LeadInterestCategory =
  | 'artwork'
  | 'event'
  | 'membership'
  | 'commission'
  | 'concierge'
  | 'corporate_curation'
  | 'interior_transformation';

export type LeadBudgetBand =
  | 'under_1000'
  | '1000_5000'
  | '5000_25000'
  | '25000_100000'
  | '100000_plus'
  | 'undisclosed';

export type LeadUrgency = 'immediate' | '30_days' | '90_days' | 'exploring';

export type LeadSource =
  | 'website'
  | 'whatsapp'
  | 'concierge'
  | 'event'
  | 'referral'
  | 'newsletter';

export type LeadStatus =
  | 'new'
  | 'qualified'
  | 'contacted'
  | 'negotiation'
  | 'converted'
  | 'archived';

export type LeadTemperature = 'cold' | 'warm' | 'hot' | 'vip_priority';

export interface LeadProfile {
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  country: string;
  city?: string;
}

export interface LeadInterest {
  category: LeadInterestCategory;
  itemId?: string;
  itemType?: string;
  itemTitle?: string;
  itemSlug?: string;
}

export interface Lead {
  id: string;
  createdAt: string;
  updatedAt: string;
  profile: LeadProfile;
  segment: LeadSegment;
  interest: LeadInterest;
  budgetBand: LeadBudgetBand;
  urgency: LeadUrgency;
  notes?: string;
  leadScore: number;
  temperature: LeadTemperature;
  source: LeadSource;
  status: LeadStatus;
  engagementCount: number;
  lastEngagementAt?: string;
}

export interface LeadCapturePayload {
  profile: Partial<LeadProfile>;
  segment?: LeadSegment;
  interest: LeadInterest;
  budgetBand?: LeadBudgetBand;
  urgency?: LeadUrgency;
  notes?: string;
  source: LeadSource;
}

export interface NewsletterPreference {
  collector: boolean;
  experiences: boolean;
  journal: boolean;
  privatePreviews: boolean;
  investmentOpportunities: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  fullName?: string;
  preferences: NewsletterPreference;
  segment?: LeadSegment;
  subscribedAt: string;
  source: LeadSource;
}
