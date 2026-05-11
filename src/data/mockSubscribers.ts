import type { BudgetBand, Cadence, InterestTag, NewsletterSubscriber, SubscriberTier } from '@/types/newsletter';
import { calculateSubscriberScore, classifyTier } from '@/lib/newsletterScoring';
import { SUBSCRIBER_STORAGE_KEY } from '@/lib/newsletterScoring';

function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const FIRST_NAMES = [
  'Adaeze', 'Kwame', 'Amara', 'Thabo', 'Fatima', 'Obiora', 'Zainab', 'Hassan', 'Nneka', 'Yusuf',
  'Chioma', 'Senam', 'Mariam', 'Emeka', 'Latifa', 'Nii', 'Aisha', 'Tunde', 'Rebecca', 'Kelvin',
  'Blessing', 'Oluwaseun', 'Isabella', 'Abiodun', 'Precious', 'Chidi', 'Grace', 'Emmanuel', 'Diana', 'Felix',
  'Ifeoma', 'Kofi', 'Sandra', 'Samuel', 'Amina', 'David', 'Halima', 'Chukwudi', 'Rukmini', 'Tariro',
  'Uchenna', 'Nadia', 'Bright', 'Chidinma', 'Tobias', 'Halima', 'Zawadi', 'Sef', 'Adaeze', 'Valentine',
  'Amara', 'Ethan', 'Nadia', 'Femi', 'Leila', 'Kwesi', 'Bontle', 'Hamid', 'Obi', 'Zara',
  'Amara', 'Tunde', 'Wanjiku', 'Emeka', 'Layla', 'Tendai', 'Nia', 'Yemi', 'Fatou', 'Chigozie',
  'Astrid', 'Ademola', 'Nefertiti', 'Kwabena', 'Amira', 'Obinna', 'Zuleikha', 'Tinashe', 'Chiamaka', 'Yakubu',
  'Fatou', 'Kwame', 'Nadia', 'Ibrahim', 'Blessing', 'Zawadi', 'Oluwaseun', 'Damilola', 'Kenji', 'Malika',
  'Chidi', 'Amara', 'Rahim', 'Ify', 'Tawanda', 'Leila', 'Emeka', 'Zara', 'Kwesi', 'Amina',
];

const LAST_NAMES = [
  'Okonkwo', 'Mensah', 'Nduka', 'Dube', 'Al-Rashid', 'Adeyemi', 'Mwangi', 'Adeyemi', 'Osei', 'Bakr',
  'Eze', 'Sefa', 'Diallo', 'Okafor', 'Abubakar', 'Ayisi', 'Ibrahim', 'Okeke', 'Toure', 'Nwachukwu',
  'Kamara', 'Adesanya', 'Osei', 'Obiora', 'Sow', 'Oduya', 'Hassan', 'Ude', 'Olayinka', 'Anyanwu',
  'Ndlovu', 'Adeboye', 'Kone', 'Chibueze', 'Dieng', 'Okonkwo', 'Sarr', 'Eze', 'Mensah', 'Nnamdi',
  'Diop', 'Abara', 'Touray', 'Obi', 'Adisa', 'Giwa', 'Moyo', 'Olumide', 'Nwanze', 'Kargbo',
  'Nwek', 'Itoe', 'Okoro', 'Bashir', 'Nwosu', 'Fofana', 'Moyo', 'Adeoye', 'Ogbonna', 'Djibril',
  'Mensah', 'Adesanya', 'Sow', 'Nduka', 'Aliyu', 'Nkrumah', 'Obiora', 'Ayeva', 'Toure', 'Eze',
  'Kone', 'Okafor', 'Kamara', 'Udechukwu', 'Sarr', 'Eze', 'Okonkwo', 'Diallo', 'Eze', 'Mensah',
  'Obi', 'Dieng', 'Adesanya', 'Nwankwo', 'Touray', 'Oduya', 'Bakr', 'Nduka', 'Kargbo', 'Okeke',
  'Osei', 'Aliyu', 'Eze', 'Mensah', 'Sefa', 'Obi', 'Ndlovu', 'Ibrahim', 'Adeyemi', 'Nwosu',
];

const COUNTRIES = [
  'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'UK', 'UAE', 'USA', 'France',
  'Germany', 'Canada', 'Australia', 'Singapore', 'Portugal', 'Spain', 'Italy', 'Netherlands',
  'Switzerland', 'Saudi Arabia', 'Qatar', 'Egypt', 'Morocco', 'Tanzania', 'Uganda', 'Zimbabwe',
];

const EMAIL_DOMAINS = [
  'gmail.com', 'outlook.com', 'yahoo.com', 'icloud.com', 'hotmail.com',
  'msn.com', 'me.com', 'live.com', 'protonmail.com',
];

const WHATSAPPS_BY_REGION: Record<string, string[]> = {
  Nigeria: ['234801', '234802', '234803', '234904', '234905'],
  Ghana: ['23324', '23355', '23356'],
  Kenya: ['25470', '25471', '25411'],
  'South Africa': ['2782', '2783'],
  UK: ['44791', '44792', '44793'],
  UAE: ['97150', '97155', '9714'],
  USA: ['1202', '1347', '1513'],
  France: ['3361', '3362', '3366'],
  Germany: ['4915', '4916', '4917'],
  default: ['23480'],
};

const ALL_INTERESTS: InterestTag[] = [
  'collectors_circle', 'acquisitions', 'private_viewings', 'exhibitions', 'events',
  'commissions', 'interior_curation', 'hospitality_design', 'journal', 'investment_opportunities',
];

const BUDGETS: BudgetBand[] = ['exploratory', 'emerging_collector', 'established_collector', 'premium_collector', 'institutional'];
const CADENCES: Cadence[] = ['weekly', 'biweekly', 'monthly', 'important_only'];
const SOURCES = ['journal', 'footer', 'gallery', 'events', 'services', 'organic', 'referral', 'instagram', 'word_of_mouth'];

function makeEmail(first: string, last: string, country: string): string {
  const domain = EMAIL_DOMAINS[Math.floor(Math.random() * EMAIL_DOMAINS.length)];
  const separator = Math.random() > 0.5 ? '.' : '';
  return `${first.toLowerCase()}${separator}${last.toLowerCase()}${Math.floor(Math.random() * 99)}@${domain}`;
}

function makeWhatsApp(country: string): string | null {
  if (Math.random() > 0.35) return null;
  const prefixes = WHATSAPPS_BY_REGION[country] || WHATSAPPS_BY_REGION.default;
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  return `+${prefix}${String(Math.floor(Math.random() * 9000000 + 1000000))}`;
}

function makeDate(start: number, end: number): string {
  const ts = start + Math.random() * (end - start);
  return new Date(ts).toISOString();
}

function generateSubscribers(): NewsletterSubscriber[] {
  const subs: NewsletterSubscriber[] = [];

  const distributions: { tier: SubscriberTier; count: number; interests: InterestTag[]; budget: BudgetBand }[] = [
    { tier: 'reader', count: 50, interests: ['journal', 'events'], budget: 'exploratory' },
    { tier: 'reader', count: 0, interests: ['journal'], budget: 'exploratory' },
    { tier: 'prospect', count: 25, interests: ['events', 'exhibitions', 'journal'], budget: 'emerging_collector' },
    { tier: 'prospect', count: 20, interests: ['acquisitions', 'private_viewings', 'commissions'], budget: 'emerging_collector' },
    { tier: 'collector', count: 20, interests: ['acquisitions', 'private_viewings', 'exhibitions', 'collectors_circle'], budget: 'established_collector' },
    { tier: 'collector', count: 15, interests: ['commissions', 'interior_curation', 'hospitality_design'], budget: 'premium_collector' },
    { tier: 'vip', count: 10, interests: ['acquisitions', 'investment_opportunities', 'private_viewings', 'collectors_circle', 'institutional'], budget: 'premium_collector' },
    { tier: 'vip', count: 10, interests: ['commissions', 'hospitality_design', 'investment_opportunities'], budget: 'institutional' },
  ];

  const now = Date.now();
  const ONE_YEAR = 365 * 24 * 60 * 60 * 1000;

  let idx = 0;
  for (const dist of distributions) {
    for (let i = 0; i < dist.count; i++) {
      const firstName = FIRST_NAMES[idx % FIRST_NAMES.length];
      const lastName = LAST_NAMES[idx % LAST_NAMES.length];
      const country = COUNTRIES[idx % COUNTRIES.length];
      const hasWhatsApp = Math.random() > 0.65;
      const interests = pickN(dist.interests, Math.min(dist.interests.length, 1 + Math.floor(Math.random() * 3)));
      const score = calculateSubscriberScore(interests, dist.budget, hasWhatsApp);
      const tier = classifyTier(score);
      const cadence: Cadence = tier === 'vip' ? 'weekly' : tier === 'collector' ? 'biweekly' : tier === 'prospect' ? 'monthly' : 'important_only';
      const source = SOURCES[idx % SOURCES.length];

      subs.push({
        id: uid(),
        createdAt: makeDate(now - ONE_YEAR, now),
        identity: {
          fullName: `${firstName} ${lastName}`,
          email: makeEmail(firstName, lastName, country),
          whatsapp: makeWhatsApp(country),
          country,
        },
        interests,
        budgetSignal: dist.budget,
        cadence,
        score,
        tier,
        source,
      });
      idx++;
    }
  }

  return subs.sort(() => 0.5 - Math.random());
}

export const MOCK_SUBSCRIBERS = generateSubscribers();

export function seedMockSubscribers(): void {
  if (typeof window === 'undefined') return;
  const existing = localStorage.getItem(SUBSCRIBER_STORAGE_KEY);
  if (existing) return;
  localStorage.setItem(SUBSCRIBER_STORAGE_KEY, JSON.stringify(MOCK_SUBSCRIBERS));
}

export function isSubscribed(email: string): boolean {
  if (typeof window === 'undefined') return false;
  const subs = JSON.parse(localStorage.getItem(SUBSCRIBER_STORAGE_KEY) || '[]') as NewsletterSubscriber[];
  return subs.some((s) => s.identity.email.toLowerCase() === email.toLowerCase());
}