import type { LeadCapturePayload, LeadTemperature, LeadBudgetBand, LeadUrgency, LeadSegment } from '@/types/crm';

const BUDGET_SCORES: Record<LeadBudgetBand, number> = {
  under_1000: 5,
  '1000_5000': 10,
  '5000_25000': 20,
  '25000_100000': 25,
  '100000_plus': 30,
  undisclosed: 10,
};

const URGENCY_SCORES: Record<LeadUrgency, number> = {
  immediate: 25,
  '30_days': 15,
  '90_days': 8,
  exploring: 3,
};

const SEGMENT_SCORES: Record<LeadSegment, number> = {
  collector: 15,
  investor: 18,
  interior_designer: 20,
  corporate: 22,
  hospitality: 18,
  luxury_buyer: 20,
  art_enthusiast: 8,
  experience_guest: 5,
  commission_client: 20,
};

const INTEREST_MULTIPLIERS: Record<string, number> = {
  commission: 1.5,
  corporate_curation: 1.4,
  concierge: 1.3,
  artwork: 1.2,
  interior_transformation: 1.3,
  membership: 1.1,
  event: 1.0,
};

export function calculateLeadScore(payload: LeadCapturePayload, engagementCount = 1): number {
  let score = 0;

  // Budget contribution
  score += BUDGET_SCORES[payload.budgetBand || 'undisclosed'];

  // Urgency contribution
  score += URGENCY_SCORES[payload.urgency || 'exploring'];

  // Segment contribution
  score += SEGMENT_SCORES[payload.segment || 'art_enthusiast'];

  // Interest multiplier
  const multiplier = INTEREST_MULTIPLIERS[payload.interest.category] || 1.0;
  score = Math.round(score * multiplier);

  // Engagement bonus
  if (engagementCount > 1) {
    score += Math.min((engagementCount - 1) * 5, 20);
  }

  // Cap at 100
  return Math.min(score, 100);
}

export function classifyTemperature(score: number): LeadTemperature {
  if (score >= 81) return 'vip_priority';
  if (score >= 61) return 'hot';
  if (score >= 31) return 'warm';
  return 'cold';
}

export function scoreToLabel(temperature: LeadTemperature): string {
  switch (temperature) {
    case 'vip_priority': return 'VIP Priority';
    case 'hot': return 'Hot Lead';
    case 'warm': return 'Warm Lead';
    case 'cold': return 'Cold Lead';
  }
}
