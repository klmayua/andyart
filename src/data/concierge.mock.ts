import type { ConciergeRequest, ViewingSession, CommissionCase, CorporateProject, VipClient } from '@/types/concierge';

const REQUESTS_KEY = 'andyart_concierge_requests';
const VIEWINGS_KEY = 'andyart_concierge_viewings';
const COMMISSIONS_KEY = 'andyart_concierge_commissions';
const CORPORATE_KEY = 'andyart_concierge_corporate';
const VIP_KEY = 'andyart_concierge_vips';

function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
function daysAgo(n: number): string {
  return new Date(Date.now() - n * 86400000).toISOString();
}
function daysAhead(n: number): string {
  return new Date(Date.now() + n * 86400000).toISOString().split('T')[0];
}

export const MOCK_REQUESTS: ConciergeRequest[] = [
  {
    id: 'req-001', createdAt: daysAgo(1), updatedAt: daysAgo(1),
    type: 'acquisition_advisory', status: 'new', priority: 'vip', source: 'whatsapp',
    clientProfile: { id: 'cp-1', name: 'Adaeze Ogunlesi', email: 'adaeze@meridian.ng', phone: '+2348034567890', whatsapp: '+2348034567890', country: 'Nigeria', city: 'Lagos', tier: 'vip', privateAccessLevel: 'exclusive', createdAt: daysAgo(365) },
    subject: 'Looking for statement piece for new office lobby', description: 'Fintech CEO. Wants bold contemporary African work to anchor new headquarters lobby. Budget flexible.', budgetRange: '$50,000 - $100,000', timeline: '4-6 weeks',
    tags: ['corporate', 'contemporary', 'large-scale'],
  },
  {
    id: 'req-002', createdAt: daysAgo(2), updatedAt: daysAgo(1),
    type: 'commission_request', status: 'assigned', priority: 'priority', source: 'website',
    clientProfile: { id: 'cp-2', name: 'Priya Naidoo', email: 'priya.n@icloud.com', phone: '+27823345678', country: 'South Africa', city: 'Johannesburg', tier: 'collector', privateAccessLevel: 'preferred', createdAt: daysAgo(180) },
    subject: 'Commission: Nature series for home study', description: 'Collector wants 3-piece nature series in bronze and reclaimed timber for her home study.',
    budgetRange: '$15,000 - $25,000', timeline: '3 months',
    assignedTo: 'Chioma A.',
    tags: ['commission', 'bronze', 'nature'],
  },
  {
    id: 'req-003', createdAt: daysAgo(5), updatedAt: daysAgo(3),
    type: 'hospitality_design', status: 'proposal_sent', priority: 'executive', source: 'referral',
    clientProfile: { id: 'cp-3', name: 'Amara Diallo', email: 'amara.d@hospitality.group', phone: '+254712345678', country: 'Kenya', city: 'Nairobi', tier: 'premium', privateAccessLevel: 'exclusive', createdAt: daysAgo(90) },
    subject: 'Hotel art curation — 40-room boutique hotel', description: 'Art director for boutique hotel group. Needs complete curation across suites, lobby, restaurant, and spa.',
    budgetRange: '$100,000+', timeline: '8-10 weeks',
    assignedTo: 'Tunde B.',
    tags: ['hospitality', 'bulk-curation', 'hotel'],
  },
  {
    id: 'req-004', createdAt: daysAgo(3), updatedAt: daysAgo(3),
    type: 'private_viewing', status: 'confirmed', priority: 'priority', source: 'gallery',
    clientProfile: { id: 'cp-4', name: 'Kweku Anansi', email: 'studio@kwekuanansi.com', phone: '+233245678901', whatsapp: '+233245678901', country: 'Ghana', city: 'Accra', tier: 'collector', privateAccessLevel: 'preferred', createdAt: daysAgo(60) },
    subject: 'Private viewing for collector group — 8 guests', description: 'Accra-based collector hosting 8 guests for exclusive after-hours gallery access.',
    timeline: 'Flexible this week',
    assignedTo: 'Chioma A.',
    tags: ['private-viewing', 'group'],
  },
  {
    id: 'req-005', createdAt: daysAgo(7), updatedAt: daysAgo(5),
    type: 'artwork_inquiry', status: 'negotiating', priority: 'standard', source: 'website',
    clientProfile: { id: 'cp-5', name: 'Ngozi Eze', email: 'ngozi.eze@gmail.com', phone: '+2348051234567', country: 'Nigeria', city: 'Abuja', tier: 'collector', privateAccessLevel: 'preferred', createdAt: daysAgo(30) },
    subject: 'Inquiry: "Roots That Whisper" collection', description: 'First serious acquisition. Loved the bronze series. Asking about payment plan options.',
    budgetRange: '$5,000 - $15,000',
    tags: ['inquiry', 'bronze', 'payment-plan'],
  },
  {
    id: 'req-006', createdAt: daysAgo(10), updatedAt: daysAgo(8),
    type: 'bespoke_sourcing', status: 'qualified', priority: 'vip', source: 'event',
    clientProfile: { id: 'cp-6', name: 'Fatima Al-Hassan', email: 'fatima@luxuryinteriors.ae', phone: '+971501234567', whatsapp: '+971501234567', country: 'UAE', city: 'Dubai', tier: 'vip', privateAccessLevel: 'exclusive', createdAt: daysAgo(200) },
    subject: 'Source large-scale contemporary African works for villa', description: 'Interior designer sourcing 8-12 works for a client villa project in Palm Jumeirah. Needs large-scale contemporary pieces.',
    budgetRange: '$100,000+', timeline: '2 weeks urgent',
    tags: ['sourcing', 'large-scale', 'contemporary', 'urgent'],
  },
  {
    id: 'req-007', createdAt: daysAgo(14), updatedAt: daysAgo(14),
    type: 'vip_collectors_circle', status: 'fulfilled', priority: 'vip', source: 'referral',
    clientProfile: { id: 'cp-7', name: 'David Mensah', email: 'david.m@artfund.com', phone: '+442079460958', country: 'UK', city: 'London', tier: 'vip', privateAccessLevel: 'founding', createdAt: daysAgo(400) },
    subject: 'Circle membership upgrade — Investor tier', description: 'Art fund analyst. Wants early access to blue-chip works and quarterly market reports.',
    budgetRange: '$100,000+',
    assignedTo: 'Tunde B.',
    tags: ['membership', 'investor', 'circle'],
  },
  {
    id: 'req-008', createdAt: daysAgo(4), updatedAt: daysAgo(2),
    type: 'interior_curation', status: 'new', priority: 'priority', source: 'whatsapp',
    clientProfile: { id: 'cp-8', name: 'Tunde Bakare', email: 'tunde.b@yahoo.com', phone: '+2348029876543', country: 'Nigeria', city: 'Lagos', tier: 'collector', privateAccessLevel: 'standard', createdAt: daysAgo(45) },
    subject: 'Curate art for new apartment — living and dining', description: 'Urban professional. New 3-bedroom apartment. Needs curated pieces for living room, dining, and home office.',
    budgetRange: '$5,000 - $10,000', timeline: '2-3 weeks',
    tags: ['interior', 'residential', 'apartment'],
  },
];

export const MOCK_VIEWINGS: ViewingSession[] = [
  {
    id: 'view-001', createdAt: daysAgo(2),
    clientName: 'Kweku Anansi', clientEmail: 'studio@kwekuanansi.com', clientPhone: '+233245678901',
    viewingType: 'in_gallery', date: daysAhead(2), time: '3:00 PM', duration: 90,
    status: 'confirmed', guestCount: 8, priority: 'priority',
    notes: 'Collector group from Accra. Interested in contemporary works and limited editions.',
    assignedTo: 'Chioma A.',
  },
  {
    id: 'view-002', createdAt: daysAgo(1),
    clientName: 'Priya Naidoo', clientEmail: 'priya.n@icloud.com', clientPhone: '+27823345678',
    viewingType: 'virtual', date: daysAhead(1), time: '11:00 AM', duration: 60,
    status: 'scheduled', priority: 'priority',
    artworkIds: ['a1', 'a2', 'a5'],
    notes: 'Virtual walkthrough for nature series commissions. Show bronze + timber combinations.',
    assignedTo: 'Chioma A.',
  },
  {
    id: 'view-003', createdAt: daysAgo(5),
    clientName: 'Adaeze Ogunlesi', clientEmail: 'adaeze@meridian.ng', clientPhone: '+2348034567890',
    viewingType: 'corporate_consult', date: daysAhead(5), time: '10:00 AM', duration: 120,
    status: 'confirmed', priority: 'vip',
    location: 'Meridian Holdings HQ, Lagos',
    notes: 'Executive suite curation consultation. Bring portfolio and sample works.',
    assignedTo: 'Tunde B.',
  },
  {
    id: 'view-004', createdAt: daysAgo(3),
    clientName: 'Ngozi Eze', clientEmail: 'ngozi.eze@gmail.com', clientPhone: '+2348051234567',
    viewingType: 'in_gallery', date: daysAhead(1), time: '2:00 PM', duration: 60,
    status: 'scheduled', priority: 'standard',
    notes: 'First-time collector. Interested in bronze series. Introduce payment plan options.',
    assignedTo: 'Chioma A.',
  },
  {
    id: 'view-005', createdAt: daysAgo(8),
    clientName: 'Tunde Bakare', clientEmail: 'tunde.b@yahoo.com', clientPhone: '+2348029876543',
    viewingType: 'private_home', date: daysAhead(8), time: '4:00 PM', duration: 90,
    status: 'scheduled', priority: 'standard',
    location: 'Lekki Phase 2, Lagos',
    notes: 'Home curation for apartment. Photograph rooms before visit.',
    assignedTo: 'Tunde B.',
  },
];

export const MOCK_COMMISSIONS: CommissionCase[] = [
  {
    id: 'com-001', createdAt: daysAgo(30), updatedAt: daysAgo(2),
    clientName: 'Priya Naidoo', clientEmail: 'priya.n@icloud.com', clientPhone: '+27823345678',
    brief: 'Three-piece nature series for home study. Themes: forest canopy, river delta, mountain peak. Should evoke African landscape without being literal.',
    medium: 'Bronze + reclaimed timber', dimensions: '60x40cm each',
    budgetRange: '$15,000 - $25,000', deadline: '3 months',
    status: 'artist_matching', matchedArtist: 'Ngozi Okeke',
    progress: 15,
    milestones: [
      { label: 'Brief received & confirmed', completed: true },
      { label: 'Artist match confirmed', completed: true, due: daysAgo(25) },
      { label: 'Concept sketches', completed: false, due: daysAhead(7) },
      { label: 'Contract signed', completed: false, due: daysAhead(14) },
      { label: 'Work in progress', completed: false, due: daysAhead(60) },
      { label: 'Quality check', completed: false },
      { label: 'Delivery', completed: false, due: daysAhead(90) },
    ],
    estimate: '$22,000', priority: 'priority',
    assignedTo: 'Chioma A.',
    notes: 'Client prefers warm patina finish. Show Adinkra-inspired textures on frame.',
  },
  {
    id: 'com-002', createdAt: daysAgo(60), updatedAt: daysAgo(1),
    clientName: 'Adaeze Ogunlesi', clientEmail: 'adaeze@meridian.ng', clientPhone: '+2348034567890',
    brief: 'Large-scale commissioned piece for Meridian Holdings headquarters lobby. Theme: "Innovation Rooted in Heritage" — blend of traditional Adinkra symbols with contemporary abstract forms.',
    medium: 'Mixed media on canvas', dimensions: '300x200cm',
    budgetRange: '$40,000 - $60,000', deadline: '8 weeks',
    status: 'in_progress', matchedArtist: 'TBA — shortlisting 3 artists',
    progress: 45,
    milestones: [
      { label: 'Brief received', completed: true },
      { label: 'Concept approved', completed: true, due: daysAgo(45) },
      { label: 'Artist contracted', completed: true, due: daysAgo(30) },
      { label: 'Progress check 1', completed: true, due: daysAgo(10) },
      { label: 'Progress check 2', completed: false, due: daysAhead(5) },
      { label: 'Final approval', completed: false, due: daysAhead(30) },
      { label: 'Delivery & install', completed: false, due: daysAhead(56) },
    ],
    estimate: '$52,000', priority: 'vip',
    assignedTo: 'Tunde B.',
    notes: 'Priority client — CEO of Meridian fintech. Ensure museum-quality finish. Coordinate installation with building facilities team.',
  },
  {
    id: 'com-003', createdAt: daysAgo(90), updatedAt: daysAgo(15),
    clientName: 'David Mensah', clientEmail: 'david.m@artfund.com', clientPhone: '+442079460958',
    brief: 'Portrait series for art fund boardroom. 5 portraits of founding partners in contemporary African portraiture style.',
    medium: 'Oil on canvas', dimensions: '80x100cm each',
    budgetRange: '$25,000 - $35,000', deadline: '6 months',
    status: 'proposal_sent',
    progress: 30,
    milestones: [
      { label: 'Brief received', completed: true },
      { label: 'Proposal sent', completed: true, due: daysAgo(80) },
      { label: 'Client response', completed: false, due: daysAhead(3) },
      { label: 'Artist contracted', completed: false },
      { label: 'Work in progress', completed: false },
      { label: 'Delivery', completed: false },
    ],
    estimate: '$30,000', priority: 'executive',
    assignedTo: 'Tunde B.',
  },
  {
    id: 'com-004', createdAt: daysAgo(20), updatedAt: daysAgo(5),
    clientName: 'Fatima Al-Hassan', clientEmail: 'fatima@luxuryinteriors.ae', clientPhone: '+971501234567',
    brief: 'Villa commission: Abstract desert landscape diptych. Colors: sand, gold, deep teal. For main living room focal wall.',
    medium: 'Acrylic and gold leaf on linen', dimensions: '180x120cm',
    budgetRange: '$8,000 - $12,000', deadline: '4 weeks',
    status: 'brief_received', progress: 5,
    milestones: [
      { label: 'Brief received', completed: true, due: daysAgo(20) },
      { label: 'Artist matching', completed: false },
      { label: 'Proposal sent', completed: false },
      { label: 'Delivery', completed: false },
    ],
    priority: 'vip',
    notes: 'Urgent. Client has hard deadline for villa opening event.',
  },
];

export const MOCK_CORPORATE: CorporateProject[] = [
  {
    id: 'corp-001', createdAt: daysAgo(14),
    companyName: 'Meridian Holdings', contactName: 'Adaeze Ogunlesi', contactEmail: 'adaeze@meridian.ng', contactPhone: '+2348034567890',
    projectType: 'executive_suites', description: 'Full art curation for executive floor — 8 offices, 2 boardrooms, reception, and break areas.',
    location: 'Lagos, Nigeria', budgetRange: '$80,000 - $120,000', timeline: '6-8 weeks',
    status: 'proposal', roomCount: 12, estimatedWorks: 24,
    assignedTo: 'Tunde B.', priority: 'vip',
    notes: 'Priority client. Coordinate with interior designer. Prefer Nigerian and Ghanaian artists.',
  },
  {
    id: 'corp-002', createdAt: daysAgo(30),
    companyName: 'Sefa Hospitality Group', contactName: 'Amara Diallo', contactEmail: 'amara.d@hospitality.group', contactPhone: '+254712345678',
    projectType: 'hotel', description: 'Boutique hotel art program — 40 rooms, lobby, restaurant, spa, and pool area.',
    location: 'Nairobi, Kenya', budgetRange: '$100,000+', timeline: '10-12 weeks',
    status: 'consultation', roomCount: 40, estimatedWorks: 60,
    assignedTo: 'Chioma A.', priority: 'executive',
    notes: 'Largest hospitality project to date. Consider rotating leasing model as well as direct acquisition.',
  },
  {
    id: 'corp-003', createdAt: daysAgo(7),
    companyName: 'Emirates Interior Design', contactName: 'Fatima Al-Hassan', contactEmail: 'fatima@luxuryinteriors.ae', contactPhone: '+971501234567',
    projectType: 'retail', description: 'Art sourcing for 3 high-end retail spaces in Dubai Mall and DIFC.',
    location: 'Dubai, UAE', budgetRange: '$40,000 - $60,000', timeline: '3-4 weeks',
    status: 'acquiring', roomCount: 3, estimatedWorks: 18,
    assignedTo: 'Tunde B.', priority: 'vip',
    notes: 'URGENT. Client opening event in 3 weeks. Needs mix of established and emerging artists.',
  },
  {
    id: 'corp-004', createdAt: daysAgo(45),
    companyName: 'The Okavango Club', contactName: 'Thabo Molefe', contactEmail: 'thabo@okavango.co.bw', contactPhone: '+26772123456',
    projectType: 'hospitality', description: 'Members-only lodge art program — 20 suites, main lodge, and outdoor areas.',
    location: 'Moremi Game Reserve, Botswana', budgetRange: '$60,000 - $90,000', timeline: '8-10 weeks',
    status: 'installing', roomCount: 22, estimatedWorks: 45,
    assignedTo: 'Chioma A.', priority: 'priority',
    notes: 'Focus on wildlife and landscape photography alongside paintings. Coordinate with architect on lighting.',
  },
];

export const MOCK_VIPS: VipClient[] = [
  {
    id: 'vip-001',
    profile: { id: 'cp-1', name: 'Adaeze Ogunlesi', email: 'adaeze@meridian.ng', phone: '+2348034567890', whatsapp: '+2348034567890', country: 'Nigeria', city: 'Lagos', tier: 'vip', tasteProfile: ['contemporary', 'large-scale', 'corporate'], collectingHistory: 'High-value corporate collections; focused on works that signal innovation and heritage', avgBudget: '$50,000 - $100,000', favoriteMediums: ['mixed media', 'sculpture'], preferredArtists: ['Emerging Nigerian contemporary', 'Abstract expressionist'], privateAccessLevel: 'exclusive', conciergeNotes: 'CEO of Meridian fintech. Prefers WhatsApp communication. Fast decisions. Sensitive to pricing — always go direct to value proposition first.', createdAt: daysAgo(365) },
    totalAcquisitions: 12, lifetimeValue: '$340,000', lastContactedAt: daysAgo(1), lastCommissionAt: daysAgo(30), interests: ['corporate curation', 'investment-grade works', 'artist conversations'], preferredArtists: ['Ngozi Okeke', 'Wole Lagunju'], accessLevel: 'exclusive', collectorSince: '2024', eventsAttended: 8, commissionsCompleted: 2, privateViewingsCompleted: 5,
    acquisitionHistory: [
      { title: 'Heritage Series — 5 pieces', date: daysAgo(180), price: '$85,000' },
      { title: 'The Collector\'s Study (commission)', date: daysAgo(60), price: '$28,000' },
      { title: 'Abstract Conversations triptych', date: daysAgo(30), price: '$42,000' },
    ],
  },
  {
    id: 'vip-002',
    profile: { id: 'cp-6', name: 'Fatima Al-Hassan', email: 'fatima@luxuryinteriors.ae', phone: '+971501234567', whatsapp: '+971501234567', country: 'UAE', city: 'Dubai', tier: 'vip', tasteProfile: ['luxury residential', 'contemporary', 'gold accents'], collectingHistory: 'Interior designer with high-net-worth clients across GCC. Prefers large-scale contemporary works.', avgBudget: '$40,000 - $100,000', favoriteMediums: ['large-scale canvas', 'sculpture'], preferredArtists: ['Emerging African contemporary'], privateAccessLevel: 'exclusive', conciergeNotes: 'Dubai-based interior designer. Has 4 active villa projects. Very fast turnaround requirements. Always send reference images first.', createdAt: daysAgo(200) },
    totalAcquisitions: 28, lifetimeValue: '$680,000', lastContactedAt: daysAgo(2), lastCommissionAt: daysAgo(10), lastViewingAt: daysAgo(5), interests: ['large-scale acquisitions', 'hotel programs', 'art investment'], preferredArtists: ['Emerging African', 'Pan-African contemporary'], accessLevel: 'founding', collectorSince: '2023', eventsAttended: 4, commissionsCompleted: 8, privateViewingsCompleted: 12,
    acquisitionHistory: [
      { title: 'Villa Palm Jumeirah — 14 works', date: daysAgo(90), price: '$120,000' },
      { title: 'DIFC office — 6 works', date: daysAgo(60), price: '$48,000' },
    ],
  },
  {
    id: 'vip-003',
    profile: { id: 'cp-7', name: 'David Mensah', email: 'david.m@artfund.com', phone: '+442079460958', country: 'UK', city: 'London', tier: 'vip', tasteProfile: ['investment-focused', 'portraiture', 'blue-chip'], collectingHistory: 'Art fund analyst and founding Circle investor. Focused on works with appreciation potential and portfolio diversification.', avgBudget: '$50,000+', favoriteMediums: ['portraiture', 'photography'], preferredArtists: ['Established African masters', 'Photography'], privateAccessLevel: 'founding', conciergeNotes: 'Circle Founding member. Prefers formal communication. Interested in quarterly market reports and artist studio visits.', createdAt: daysAgo(400) },
    totalAcquisitions: 6, lifetimeValue: '$210,000', lastContactedAt: daysAgo(14), interests: ['artist studio visits', 'market intelligence', 'early access'], preferredArtists: ['Established masters', 'Photography'], accessLevel: 'founding', collectorSince: '2023', eventsAttended: 12, commissionsCompleted: 1, privateViewingsCompleted: 8,
    acquisitionHistory: [
      { title: 'Circle Founding membership', date: daysAgo(380), price: '$25,000' },
      { title: 'Portrait series acquisition', date: daysAgo(120), price: '$85,000' },
    ],
  },
  {
    id: 'vip-004',
    profile: { id: 'cp-3', name: 'Amara Diallo', email: 'amara.d@hospitality.group', phone: '+254712345678', country: 'Kenya', city: 'Nairobi', tier: 'premium', tasteProfile: ['hospitality', 'cultural authenticity', 'large-scale'], collectingHistory: 'Art director for boutique hotel group. Has curated 3 properties. Prefers works that tell African stories.', avgBudget: '$50,000 - $150,000', favoriteMediums: ['large-scale paintings', 'sculpture', 'photography'], preferredArtists: ['East African artists', 'Wildlife photography'], privateAccessLevel: 'exclusive', conciergeNotes: 'Long-term partner. Always consider rotating lease model for hospitality. Great referral source.', createdAt: daysAgo(90) },
    totalAcquisitions: 4, lifetimeValue: '$320,000', lastContactedAt: daysAgo(3), interests: ['hotel programs', 'cultural heritage', 'rotating collections'], preferredArtists: ['East African contemporary', 'Wildlife photography'], accessLevel: 'exclusive', collectorSince: '2024', eventsAttended: 2, commissionsCompleted: 0, privateViewingsCompleted: 3,
    acquisitionHistory: [
      { title: 'Sefa Group hotel — 40-room curation', date: daysAgo(30), price: '$180,000' },
    ],
  },
];

export function seedConciergeData(): void {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(REQUESTS_KEY)) localStorage.setItem(REQUESTS_KEY, JSON.stringify(MOCK_REQUESTS));
  if (!localStorage.getItem(VIEWINGS_KEY)) localStorage.setItem(VIEWINGS_KEY, JSON.stringify(MOCK_VIEWINGS));
  if (!localStorage.getItem(COMMISSIONS_KEY)) localStorage.setItem(COMMISSIONS_KEY, JSON.stringify(MOCK_COMMISSIONS));
  if (!localStorage.getItem(CORPORATE_KEY)) localStorage.setItem(CORPORATE_KEY, JSON.stringify(MOCK_CORPORATE));
  if (!localStorage.getItem(VIP_KEY)) localStorage.setItem(VIP_KEY, JSON.stringify(MOCK_VIPS));
}