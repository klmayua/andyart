import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting comprehensive seed...');

  // ─── Artists ──────────────────────────────────────────────────────────────
  const artists = await prisma.artist.createMany({
    data: [
      { id: 'artist-001', name: 'Ngozi Okeke', slug: 'ngozi-okeke', email: 'n.okeke@andyart.gallery', bio: 'Contemporary sculptor working in bronze and reclaimed timber.', artistStatement: 'I believe art should carry the weight of history.', basedIn: 'Lagos, Nigeria', studioLocation: 'Victoria Island, Lagos', availabilityStatus: 'available', yearsActive: 14, birthYear: 1985, birthPlace: 'Enugu, Nigeria', verifiedIdentity: true, contractSigned: true, insuranceCoverage: true, commissionRate: 60, status: 'active', joinDate: new Date('2021-03-15') },
      { id: 'artist-002', name: 'Kofi Asante', slug: 'kofi-asante', email: 'k.asante@andyart.gallery', bio: 'Multidisciplinary artist working in painting and digital media.', artistStatement: 'Color is my primary language.', basedIn: 'Accra, Ghana', studioLocation: 'Jamestown, Accra', availabilityStatus: 'commission_only', yearsActive: 10, birthYear: 1990, birthPlace: 'Kumasi, Ghana', verifiedIdentity: true, contractSigned: true, insuranceCoverage: true, commissionRate: 65, status: 'active', joinDate: new Date('2022-01-10') },
      { id: 'artist-003', name: 'Amara Okafor', slug: 'amara-okafor', email: 'a.okafor@andyart.gallery', bio: 'Sculptor exploring nature and technology relationships.', artistStatement: 'Where does the natural end and the synthetic begin?', basedIn: 'Lagos, Nigeria', studioLocation: 'Yaba, Lagos', availabilityStatus: 'available', yearsActive: 8, birthYear: 1992, birthPlace: 'Onitsha, Nigeria', verifiedIdentity: true, contractSigned: true, insuranceCoverage: true, commissionRate: 60, status: 'active', joinDate: new Date('2023-06-01') },
      { id: 'artist-004', name: 'Theodore Mensah', slug: 'theodore-mensah', email: 't.mensah@andyart.gallery', bio: 'Photographer documenting urban Africa.', artistStatement: 'The street is my studio.', basedIn: 'Accra, Ghana', studioLocation: 'Osu, Accra', availabilityStatus: 'traveling', yearsActive: 12, birthYear: 1982, birthPlace: 'Accra, Ghana', verifiedIdentity: true, contractSigned: true, insuranceCoverage: true, commissionRate: 65, status: 'active', joinDate: new Date('2021-09-15') },
      { id: 'artist-005', name: 'Zanele Muholi', slug: 'zanele-muholi', email: 'z.muholi@andyart.gallery', bio: 'Visual activist documenting Black LGBTQIA+ communities.', artistStatement: 'We exist. We resist. We persist.', basedIn: 'Johannesburg, South Africa', studioLocation: 'Braamfontein, Johannesburg', availabilityStatus: 'available', yearsActive: 20, birthYear: 1972, birthPlace: 'Durban, South Africa', verifiedIdentity: true, contractSigned: true, insuranceCoverage: true, commissionRate: 55, status: 'active', joinDate: new Date('2020-05-01') },
      { id: 'artist-006', name: 'Wangechi Mutu', slug: 'wangechi-mutu', email: 'w.mutu@andyart.gallery', bio: 'Kenyan-American artist exploring female body and colonialism.', artistStatement: 'I collage the body to reconstruct narratives.', basedIn: 'Brooklyn, USA', studioLocation: 'Bushwick, Brooklyn', availabilityStatus: 'commission_only', yearsActive: 22, birthYear: 1972, birthPlace: 'Nairobi, Kenya', verifiedIdentity: true, contractSigned: true, insuranceCoverage: true, commissionRate: 50, status: 'active', joinDate: new Date('2020-01-15') },
      { id: 'artist-007', name: 'El Anatsui', slug: 'el-anatsui', email: 'e.anatsui@andyart.gallery', bio: 'Ghanaian sculptor famous for bottle cap tapestries.', artistStatement: 'Art grows out of each particular situation.', basedIn: 'Nsukka, Nigeria', studioLocation: 'Nsukka, Enugu State', availabilityStatus: 'not_accepting', yearsActive: 45, birthYear: 1944, birthPlace: 'Anyako, Ghana', verifiedIdentity: true, contractSigned: true, insuranceCoverage: true, commissionRate: 45, status: 'active', joinDate: new Date('2019-06-01') },
      { id: 'artist-008', name: 'Yinka Shonibare', slug: 'yinka-shonibare', email: 'y.shonibare@andyart.gallery', bio: 'British-Nigerian artist exploring cultural identity.', artistStatement: 'I use fabric as a metaphor for complexity.', basedIn: 'London, UK', studioLocation: 'Shoreditch, London', availabilityStatus: 'available', yearsActive: 30, birthYear: 1962, birthPlace: 'London, UK', verifiedIdentity: true, contractSigned: true, insuranceCoverage: true, commissionRate: 50, status: 'active', joinDate: new Date('2019-01-10') },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ Seeded ${artists.count} artists`);

  // ─── Artworks ───────────────────────────────────────────────────────────────
  const artworks = await prisma.artwork.createMany({
    data: [
      { id: 'art-001', title: 'Whispers of Ancestors', slug: 'whispers-of-ancestors', artistId: 'artist-001', medium: 'sculpture', dimensions: '120x80x60cm', year: 2023, price: 850000, category: 'sculpture', curatorNote: 'Flagship bronze work' },
      { id: 'art-002', title: 'Market Day II', slug: 'market-day-ii', artistId: 'artist-002', medium: 'painting', dimensions: '200x150cm', year: 2023, price: 650000, category: 'painting', curatorNote: 'Bold color fields' },
      { id: 'art-003', title: 'Sunset Over Kilimanjaro', slug: 'sunset-over-kilimanjaro', artistId: 'artist-004', medium: 'photography', dimensions: '120x80cm', year: 2023, price: 120000, category: 'photography', curatorNote: 'Large-format print' },
      { id: 'art-004', title: 'Diaspora Dialogues', slug: 'diaspora-dialogues', artistId: 'artist-008', medium: 'installation', dimensions: 'Variable', year: 2023, price: 1800000, category: 'installation', curatorNote: 'Dutch wax fabric installation' },
      { id: 'art-005', title: 'Mother and Child Reimagined', slug: 'mother-and-child-reimagined', artistId: 'artist-006', medium: 'mixed_media', dimensions: '200x150cm', year: 2023, price: 2200000, category: 'mixed_media', curatorNote: 'Collage exploration' },
      { id: 'art-006', title: 'Gravity and Grace', slug: 'gravity-and-grace', artistId: 'artist-007', medium: 'sculpture', dimensions: '500x700cm', year: 2023, price: 4500000, category: 'sculpture', curatorNote: 'Monumental tapestry' },
      { id: 'art-007', title: 'Digital Futures', slug: 'digital-futures', artistId: 'artist-006', medium: 'mixed_media', dimensions: '200x150cm', year: 2023, price: 380000, category: 'mixed_media', curatorNote: 'Post-human identity' },
      { id: 'art-008', title: 'Market at Dawn', slug: 'market-at-dawn', artistId: 'artist-004', medium: 'photography', dimensions: '120x80cm', year: 2023, price: 280000, category: 'photography', curatorNote: 'Accra market sunrise' },
      { id: 'art-009', title: 'Somnyama Ngonyama #45', slug: 'somnyama-ngonyama-45', artistId: 'artist-005', medium: 'photography', dimensions: '150x100cm', year: 2023, price: 450000, category: 'photography', curatorNote: 'Self-portrait series' },
      { id: 'art-010', title: 'Yellow Brick', slug: 'yellow-brick', artistId: 'artist-003', medium: 'mixed_media', dimensions: '100x80cm', year: 2024, price: 95000, category: 'mixed_media', curatorNote: 'Found materials' },
      { id: 'art-011', title: 'Blue Horizon', slug: 'blue-horizon', artistId: 'artist-002', medium: 'painting', dimensions: '180x120cm', year: 2024, price: 520000, category: 'painting', curatorNote: 'Abstract landscape' },
      { id: 'art-012', title: 'Mother\'s Hands II', slug: 'mothers-hands-ii', artistId: 'artist-001', medium: 'sculpture', dimensions: '90x50x40cm', year: 2024, price: 620000, category: 'sculpture', curatorNote: 'Maternal strength in bronze' },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ Seeded ${artworks.count} artworks`);

  // ─── Studios ────────────────────────────────────────────────────────────────
  const studios = await prisma.studio.createMany({
    data: [
      { id: 'studio-001', artistId: 'artist-001', name: 'Ngozi Okeke Studio', address: '14b Ajose Adeogun Street', city: 'Victoria Island', country: 'Nigeria', size: '120 sqm', type: 'private', accessibleToVisitors: true, hasClimateControl: true, hasSecurity: true, description: 'Two-story studio with bronze foundry access.', openingHours: 'Mon-Fri 9am-6pm', contactPhone: '+234 801 234 5678', contactEmail: 'studio@ngoziokeke.com' },
      { id: 'studio-002', artistId: 'artist-002', name: 'Kofi Asante Atelier', address: '22 James Town Road', city: 'Accra', country: 'Ghana', size: '80 sqm', type: 'shared', accessibleToVisitors: false, hasClimateControl: true, hasSecurity: false, description: 'Shared studio in historic Jamestown.', openingHours: 'Tue-Sat 10am-7pm', contactPhone: '+233 24 567 8901', contactEmail: 'kofi@kofiasante.art' },
      { id: 'studio-003', artistId: 'artist-003', name: 'Amara Lab', address: '7 Commercial Avenue', city: 'Yaba', country: 'Nigeria', size: '60 sqm', type: 'private', accessibleToVisitors: true, hasClimateControl: false, hasSecurity: true, description: 'Experimental studio with electronics workshop.', openingHours: 'Mon-Sat 11am-8pm', contactPhone: '+234 802 345 6789', contactEmail: 'hello@amaraokafor.com' },
      { id: 'studio-004', artistId: 'artist-004', name: 'Theodore Mensah Darkroom', address: '45 Oxford Street', city: 'Osu', country: 'Ghana', size: '50 sqm', type: 'private', accessibleToVisitors: false, hasClimateControl: true, hasSecurity: true, description: 'Fully equipped darkroom and digital editing suite.', openingHours: 'By appointment', contactPhone: '+233 20 123 4567', contactEmail: 'studio@theodoremensah.com' },
      { id: 'studio-005', artistId: 'artist-005', name: 'Muholi Studio', address: '112 Juta Street', city: 'Braamfontein', country: 'South Africa', size: '200 sqm', type: 'commercial', accessibleToVisitors: false, hasClimateControl: true, hasSecurity: true, description: 'Professional studio with multiple shooting bays.', openingHours: 'Mon-Fri 9am-5pm', contactPhone: '+27 11 234 5678', contactEmail: 'studio@zanelemuholi.com' },
      { id: 'studio-006', artistId: 'artist-006', name: 'Mutu Studio', address: '387 Troutman Street', city: 'Brooklyn', country: 'USA', size: '300 sqm', type: 'commercial', accessibleToVisitors: false, hasClimateControl: true, hasSecurity: true, description: 'Large-scale studio with foundry access.', openingHours: 'By appointment', contactPhone: '+1 718 555 0199', contactEmail: 'studio@wangechimutu.com' },
      { id: 'studio-007', artistId: 'artist-007', name: 'Anatsui Workshop', address: 'University of Nigeria Campus', city: 'Nsukka', country: 'Nigeria', size: '500 sqm', type: 'private', accessibleToVisitors: true, hasClimateControl: false, hasSecurity: true, description: 'Sprawling workshop with dedicated teams.', openingHours: 'Mon-Sat 8am-6pm', contactPhone: '+234 803 456 7890', contactEmail: 'studio@elanatsui.com' },
      { id: 'studio-008', artistId: 'artist-008', name: 'Shonibare Studio', address: '19 Rivington Street', city: 'London', country: 'UK', size: '250 sqm', type: 'commercial', accessibleToVisitors: false, hasClimateControl: true, hasSecurity: true, description: 'Multi-disciplinary studio with costume workshop.', openingHours: 'Mon-Fri 10am-6pm', contactPhone: '+44 20 7123 4567', contactEmail: 'studio@yinkashonibare.com' },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ Seeded ${studios.count} studios`);

  // ─── Collector Profiles ─────────────────────────────────────────────────────
  const collectors = await prisma.collectorProfile.createMany({
    data: [
      { id: 'col-001', userId: 'u-col-001', email: 'obafemi.okeke@andela.com', name: 'Dr. Obafemi Okeke', tier: 'platinum', location: 'Lagos, Nigeria', collectingSince: 2010, acquisitionBudget: 'blue_chip', totalAcquisitions: 12, totalSpent: 4200000 },
      { id: 'col-002', userId: 'u-col-002', email: 'amara.n@zenith.com', name: 'Amara Nwosu', tier: 'founding_member', location: 'Abuja, Nigeria', collectingSince: 2015, acquisitionBudget: 'established', totalAcquisitions: 8, totalSpent: 1800000 },
      { id: 'col-003', userId: 'u-col-003', email: 'k.asante@stanbic.com.gh', name: 'Kofi Asante', tier: 'collector', location: 'Accra, Ghana', collectingSince: 2018, acquisitionBudget: 'mid_market', totalAcquisitions: 5, totalSpent: 650000 },
      { id: 'col-004', userId: 'u-col-004', email: 'fatima.alhassan@uonbi.ac.ke', name: 'Dr. Fatima Al-Hassan', tier: 'curator_circle', location: 'Nairobi, Kenya', collectingSince: 2012, acquisitionBudget: 'established', totalAcquisitions: 9, totalSpent: 2100000 },
      { id: 'col-005', userId: 'u-col-005', email: 'thabo.m@investec.co.za', name: 'Thabo Mokoena', tier: 'collector', location: 'Johannesburg, South Africa', collectingSince: 2019, acquisitionBudget: 'mid_market', totalAcquisitions: 4, totalSpent: 380000 },
      { id: 'col-006', userId: 'u-col-006', email: 'aisha.bello@gmail.com', name: 'Aisha Bello', tier: 'patron', location: 'Kano, Nigeria', collectingSince: 2021, acquisitionBudget: 'emerging', totalAcquisitions: 2, totalSpent: 45000 },
      { id: 'col-007', userId: 'u-col-007', email: 'jp.dubois@louvre.fr', name: 'Jean-Pierre Dubois', tier: 'platinum', location: 'Paris, France', collectingSince: 2005, acquisitionBudget: 'blue_chip', totalAcquisitions: 22, totalSpent: 8500000 },
      { id: 'col-008', userId: 'u-col-008', email: 'nia.j@arts.columbia.edu', name: 'Nia Johnson', tier: 'curator_circle', location: 'New York, USA', collectingSince: 2016, acquisitionBudget: 'established', totalAcquisitions: 7, totalSpent: 1200000 },
      { id: 'col-009', userId: 'u-col-009', email: 'tobi.adeyemi@flutterwave.com', name: 'Oluwatobi Adeyemi', tier: 'founding_member', location: 'Lagos, Nigeria', collectingSince: 2014, acquisitionBudget: 'blue_chip', totalAcquisitions: 15, totalSpent: 5600000 },
      { id: 'col-010', userId: 'u-col-010', email: 'layla.hassan@arts.museum', name: 'Layla Hassan', tier: 'collector', location: 'Cairo, Egypt', collectingSince: 2017, acquisitionBudget: 'mid_market', totalAcquisitions: 6, totalSpent: 890000 },
      { id: 'col-011', userId: 'u-col-011', email: 'chioma.eze@gtbank.com', name: 'Chioma Eze', tier: 'platinum', location: 'Lagos, Nigeria', collectingSince: 2008, acquisitionBudget: 'blue_chip', totalAcquisitions: 25, totalSpent: 12000000 },
      { id: 'col-012', userId: 'u-col-012', email: 'm.chen@artbasel.com', name: 'Marcus Chen', tier: 'founding_member', location: 'Hong Kong', collectingSince: 2003, acquisitionBudget: 'blue_chip', totalAcquisitions: 30, totalSpent: 18000000 },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ Seeded ${collectors.count} collectors`);

  // ─── Payments ───────────────────────────────────────────────────────────────
  await prisma.paymentIntent.createMany({
    data: [
      { id: 'pay-001', collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke', type: 'artwork_purchase', artworkId: 'art-001', artworkTitle: 'Whispers of Ancestors', amount: 850000, status: 'completed', method: 'bank_transfer', completedAt: new Date('2023-03-15') },
      { id: 'pay-002', collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke', type: 'artwork_purchase', artworkId: 'art-002', artworkTitle: 'Market Day II', amount: 650000, status: 'completed', method: 'stripe', completedAt: new Date('2023-06-20') },
      { id: 'pay-003', collectorId: 'col-004', collectorName: 'Dr. Fatima Al-Hassan', type: 'artwork_purchase', artworkId: 'art-003', artworkTitle: 'Sunset Over Kilimanjaro', amount: 120000, status: 'completed', method: 'flutterwave', completedAt: new Date('2023-04-10') },
      { id: 'pay-004', collectorId: 'col-007', collectorName: 'Jean-Pierre Dubois', type: 'artwork_purchase', artworkId: 'art-004', artworkTitle: 'Diaspora Dialogues', amount: 1800000, currency: 'EUR', status: 'completed', method: 'bank_transfer', completedAt: new Date('2023-02-28') },
      { id: 'pay-005', collectorId: 'col-011', collectorName: 'Chioma Eze', type: 'commission_retainer', artworkId: 'art-005', artworkTitle: 'Mother and Child Reimagined', amount: 2200000, status: 'completed', method: 'stripe', completedAt: new Date('2023-05-15') },
      { id: 'pay-006', collectorId: 'col-012', collectorName: 'Marcus Chen', type: 'artwork_purchase', artworkId: 'art-006', artworkTitle: 'Gravity and Grace', amount: 4500000, status: 'completed', method: 'bank_transfer', completedAt: new Date('2023-01-20') },
      { id: 'pay-007', collectorId: 'col-002', collectorName: 'Amara Nwosu', type: 'artwork_purchase', artworkId: 'art-007', artworkTitle: 'Digital Futures', amount: 380000, status: 'completed', method: 'paystack', completedAt: new Date('2023-07-10') },
      { id: 'pay-008', collectorId: 'col-005', collectorName: 'Thabo Mokoena', type: 'artwork_purchase', artworkId: 'art-008', artworkTitle: 'Market at Dawn', amount: 750000, status: 'completed', method: 'stripe', completedAt: new Date('2023-08-05') },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Seeded payments');

  // ─── Invoices ───────────────────────────────────────────────────────────────
  await prisma.invoice.createMany({
    data: [
      { id: 'inv-001', invoiceNumber: 'AA-INV-2023-001', collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke', artworkId: 'art-001', artworkTitle: 'Whispers of Ancestors', subtotal: 850000, total: 850000, status: 'paid', paidDate: new Date('2023-03-15'), paymentIntentId: 'pay-001' },
      { id: 'inv-002', invoiceNumber: 'AA-INV-2023-002', collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke', artworkId: 'art-002', artworkTitle: 'Market Day II', subtotal: 650000, fees: 16250, total: 666250, status: 'paid', paidDate: new Date('2023-06-20'), paymentIntentId: 'pay-002' },
      { id: 'inv-003', invoiceNumber: 'AA-INV-2023-003', collectorId: 'col-004', collectorName: 'Dr. Fatima Al-Hassan', artworkId: 'art-003', artworkTitle: 'Sunset Over Kilimanjaro', subtotal: 120000, taxRate: 0.16, taxAmount: 19200, fees: 3000, total: 142200, status: 'paid', paidDate: new Date('2023-04-10'), paymentIntentId: 'pay-003' },
      { id: 'inv-004', invoiceNumber: 'AA-INV-2023-004', collectorId: 'col-007', collectorName: 'Jean-Pierre Dubois', artworkId: 'art-004', artworkTitle: 'Diaspora Dialogues', subtotal: 1800000, currency: 'EUR', taxRate: 0.20, taxAmount: 360000, total: 2160000, status: 'paid', paidDate: new Date('2023-02-28'), paymentIntentId: 'pay-004' },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Seeded invoices');

  // ─── Escrow ─────────────────────────────────────────────────────────────────
  await prisma.escrowCase.createMany({
    data: [
      { id: 'esc-001', escrowNumber: 'AA-ESC-2023-001', buyerId: 'col-001', buyerName: 'Dr. Obafemi Okeke', artworkId: 'art-001', artworkTitle: 'Whispers of Ancestors', amount: 850000, status: 'released', fundedAt: new Date('2023-03-15'), releasedAt: new Date('2023-03-20') },
      { id: 'esc-002', escrowNumber: 'AA-ESC-2023-002', buyerId: 'col-007', buyerName: 'Jean-Pierre Dubois', artworkId: 'art-004', artworkTitle: 'Diaspora Dialogues', amount: 1800000, currency: 'EUR', status: 'released', fundedAt: new Date('2023-02-28'), releasedAt: new Date('2023-03-15') },
      { id: 'esc-003', escrowNumber: 'AA-ESC-2023-003', buyerId: 'col-012', buyerName: 'Marcus Chen', artworkId: 'art-006', artworkTitle: 'Gravity and Grace', amount: 4500000, status: 'released', fundedAt: new Date('2023-01-20'), releasedAt: new Date('2023-02-01') },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Seeded escrow');

  // ─── CRM Leads ──────────────────────────────────────────────────────────────
  await prisma.lead.createMany({
    data: [
      { id: 'lead-001', leadId: 'AA-L-001', email: 'vip1@example.com', profile: JSON.stringify({ fullName: 'Dr. Amina Bello', phone: '+2348012345678' }), interest: JSON.stringify({ category: 'contemporary_sculpture', itemTitle: 'Whispers of Ancestors' }), source: 'gallery_visit', temperature: 'vip_priority', status: 'negotiation', leadScore: 92, budgetBand: '100000_plus', segment: 'vip' },
      { id: 'lead-002', leadId: 'AA-L-002', email: 'collector2@example.com', profile: JSON.stringify({ fullName: 'James Okonkwo', phone: '+2348023456789' }), interest: JSON.stringify({ category: 'abstract_painting', itemTitle: 'Blue Horizon' }), source: 'website', temperature: 'hot', status: 'qualified', leadScore: 78, budgetBand: '25000_100000', segment: 'collector' },
      { id: 'lead-003', leadId: 'AA-L-003', email: 'prospect3@example.com', profile: JSON.stringify({ fullName: 'Sarah Mensah' }), interest: JSON.stringify({ category: 'photography' }), source: 'instagram', temperature: 'warm', status: 'new', leadScore: 45, budgetBand: '5000_25000', segment: 'prospect' },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Seeded CRM leads');

  // ─── Concierge Requests ─────────────────────────────────────────────────────
  await prisma.conciergeRequest.createMany({
    data: [
      { id: 'req-001', requestId: 'AA-CR-001', type: 'viewing', collectorName: 'Dr. Obafemi Okeke', collectorEmail: 'obafemi.okeke@andela.com', subject: 'Private viewing request', message: 'Would like to arrange a private viewing of the new Ngozi Okeke collection.', priority: 'high', status: 'resolved' },
      { id: 'req-002', requestId: 'AA-CR-002', type: 'appraisal', collectorName: 'Chioma Eze', collectorEmail: 'chioma.eze@gtbank.com', subject: 'Collection appraisal', message: 'Requesting formal appraisal of 12-piece collection for insurance.', priority: 'medium', status: 'in_progress' },
      { id: 'req-003', requestId: 'AA-CR-003', type: 'general', collectorName: 'Amara Nwosu', collectorEmail: 'amara.n@zenith.com', subject: 'Artist commission inquiry', message: 'Interested in commissioning a custom piece from Kofi Asante.', priority: 'high', status: 'open' },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Seeded concierge requests');

  // ─── VIP Profiles ───────────────────────────────────────────────────────────
  await prisma.vipProfile.createMany({
    data: [
      { id: 'vip-001', name: 'Dr. Obafemi Okeke', email: 'obafemi.okeke@andela.com', tier: 'diamond', totalSpent: 4200000, totalVisits: 24, lastVisit: new Date('2024-11-15') },
      { id: 'vip-002', name: 'Chioma Eze', email: 'chioma.eze@gtbank.com', tier: 'royal', totalSpent: 12000000, totalVisits: 45, lastVisit: new Date('2024-12-01') },
      { id: 'vip-003', name: 'Jean-Pierre Dubois', email: 'jp.dubois@louvre.fr', tier: 'royal', totalSpent: 8500000, totalVisits: 18, lastVisit: new Date('2024-10-20') },
      { id: 'vip-004', name: 'Marcus Chen', email: 'm.chen@artbasel.com', tier: 'royal', totalSpent: 18000000, totalVisits: 32, lastVisit: new Date('2024-11-28') },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Seeded VIP profiles');

  // ─── Artist Inventory ───────────────────────────────────────────────────────
  await prisma.artistInventory.createMany({
    data: [
      { id: 'inv-001', artistId: 'artist-001', artworkId: 'art-001', title: 'Whispers of Ancestors', slug: 'whispers-of-ancestors', medium: 'sculpture', dimensions: '120x80x60cm', year: 2023, price: 850000, status: 'sold', soldAt: new Date('2023-03-15'), soldPrice: 850000, collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke' },
      { id: 'inv-004', artistId: 'artist-002', artworkId: 'art-002', title: 'Market Day II', slug: 'market-day-ii', medium: 'painting', dimensions: '200x150cm', year: 2023, price: 650000, status: 'sold', soldAt: new Date('2023-06-20'), soldPrice: 650000, collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke' },
      { id: 'inv-007', artistId: 'artist-004', artworkId: 'art-008', title: 'Market at Dawn', slug: 'market-at-dawn', medium: 'photography', dimensions: '120x80cm', year: 2023, price: 280000, status: 'sold', soldAt: new Date('2023-08-05'), soldPrice: 280000, collectorId: 'col-008', collectorName: 'Nia Johnson' },
      { id: 'inv-009', artistId: 'artist-006', artworkId: 'art-007', title: 'Digital Futures', slug: 'digital-futures', medium: 'mixed_media', dimensions: '200x150cm', year: 2023, price: 380000, status: 'sold', soldAt: new Date('2023-07-10'), soldPrice: 380000, collectorId: 'col-002', collectorName: 'Amara Nwosu' },
      { id: 'inv-010', artistId: 'artist-007', artworkId: 'art-006', title: 'Gravity and Grace', slug: 'gravity-and-grace', medium: 'sculpture', dimensions: '500x700cm', year: 2023, price: 4500000, status: 'sold', soldAt: new Date('2023-01-20'), soldPrice: 4500000, collectorId: 'col-012', collectorName: 'Marcus Chen' },
      { id: 'inv-011', artistId: 'artist-008', artworkId: 'art-004', title: 'Diaspora Dialogues', slug: 'diaspora-dialogues', medium: 'installation', dimensions: 'Variable', year: 2023, price: 1800000, status: 'sold', soldAt: new Date('2023-02-28'), soldPrice: 1800000, collectorId: 'col-007', collectorName: 'Jean-Pierre Dubois' },
      { id: 'inv-012', artistId: 'artist-001', artworkId: 'art-012', title: 'Mother\'s Hands II', slug: 'mothers-hands-ii', medium: 'sculpture', dimensions: '90x50x40cm', year: 2024, price: 620000, status: 'gallery_consigned' },
      { id: 'inv-013', artistId: 'artist-002', artworkId: 'art-011', title: 'Blue Horizon', slug: 'blue-horizon', medium: 'painting', dimensions: '180x120cm', year: 2024, price: 520000, status: 'gallery_consigned' },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Seeded artist inventory');

  // ─── Consignments ───────────────────────────────────────────────────────────
  await prisma.consignment.createMany({
    data: [
      { id: 'cons-001', artistId: 'artist-001', artworkId: 'art-001', agreementNumber: 'AA-CON-2023-001', artworkTitle: 'Whispers of Ancestors', intakeDate: new Date('2023-01-15'), endDate: new Date('2024-01-15'), splitPercentage: 60, insuranceStatus: 'insured', insuranceValue: 900000, status: 'sold', soldDate: new Date('2023-03-15'), soldPrice: 850000 },
      { id: 'cons-002', artistId: 'artist-002', artworkId: 'art-002', agreementNumber: 'AA-CON-2023-002', artworkTitle: 'Market Day II', intakeDate: new Date('2023-02-01'), endDate: new Date('2024-02-01'), splitPercentage: 65, insuranceStatus: 'insured', insuranceValue: 700000, status: 'sold', soldDate: new Date('2023-06-20'), soldPrice: 650000 },
      { id: 'cons-007', artistId: 'artist-001', artworkId: 'art-012', agreementNumber: 'AA-CON-2024-007', artworkTitle: 'Mother\'s Hands II', intakeDate: new Date('2024-03-01'), endDate: new Date('2025-03-01'), splitPercentage: 60, insuranceStatus: 'insured', insuranceValue: 650000, status: 'in_gallery' },
      { id: 'cons-008', artistId: 'artist-002', artworkId: 'art-011', agreementNumber: 'AA-CON-2024-008', artworkTitle: 'Blue Horizon', intakeDate: new Date('2024-04-01'), endDate: new Date('2025-04-01'), splitPercentage: 65, insuranceStatus: 'pending', insuranceValue: 550000, status: 'in_gallery' },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Seeded consignments');

  // ─── Commissions ────────────────────────────────────────────────────────────
  await prisma.commission.createMany({
    data: [
      { id: 'comm-001', artistId: 'artist-005', collectorName: 'Chioma Eze', commissionNumber: 'AA-COM-2023-001', brief: 'A series of 5 portraits celebrating Nigerian women in leadership.', budget: 2200000, startDate: new Date('2023-05-01'), targetDeliveryDate: new Date('2023-11-01'), actualDeliveryDate: new Date('2023-10-15'), status: 'delivered', collectorFeedback: 'Absolutely stunning. Each portrait captures strength and dignity.' },
      { id: 'comm-002', artistId: 'artist-007', collectorName: 'Oluwatobi Adeyemi', commissionNumber: 'AA-COM-2024-002', brief: 'Monumental wall installation for corporate headquarters in Lagos. 8x12 meters.', budget: 5000000, startDate: new Date('2024-03-01'), targetDeliveryDate: new Date('2025-03-01'), status: 'milestone_2' },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Seeded commissions');

  // ─── Exhibitions ────────────────────────────────────────────────────────────
  await prisma.exhibitionParticipation.createMany({
    data: [
      { id: 'exh-001', artistId: 'artist-001', exhibitionId: 'exh-gal-001', exhibitionTitle: 'Echoes of Bronze', venue: 'AndyArt Gallery', location: 'Lagos, Nigeria', startDate: new Date('2023-03-01'), endDate: new Date('2023-04-30'), status: 'past', artworksSubmitted: JSON.stringify(['art-001', 'art-012']), artworksAccepted: JSON.stringify(['art-001', 'art-012']), artworksSold: 1, totalSales: 850000, attendanceEstimate: 450, collectorInterestCount: 12, marketingSupport: true, shippingProvided: true, insuranceProvided: true },
      { id: 'exh-002', artistId: 'artist-002', exhibitionId: 'exh-gal-002', exhibitionTitle: 'Color Fields', venue: 'AndyArt Gallery', location: 'Lagos, Nigeria', startDate: new Date('2024-02-01'), endDate: new Date('2024-03-31'), status: 'past', artworksSubmitted: JSON.stringify(['art-002', 'art-011']), artworksAccepted: JSON.stringify(['art-002', 'art-011']), artworksSold: 1, totalSales: 650000, attendanceEstimate: 380, collectorInterestCount: 15, marketingSupport: true, shippingProvided: true, insuranceProvided: true },
      { id: 'exh-007', artistId: 'artist-001', exhibitionId: 'exh-gal-007', exhibitionTitle: 'Lagos Art Fair 2025', venue: 'Eko Hotel', location: 'Lagos, Nigeria', startDate: new Date('2025-02-01'), endDate: new Date('2025-02-07'), status: 'upcoming', artworksSubmitted: JSON.stringify(['art-012']), artworksAccepted: JSON.stringify(['art-012']), marketingSupport: true, shippingProvided: true, insuranceProvided: true },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Seeded exhibitions');

  // ─── Payouts ────────────────────────────────────────────────────────────────
  await prisma.artistPayout.createMany({
    data: [
      { id: 'pay-001', artistId: 'artist-001', payoutNumber: 'AA-APO-2023-Q1-001', periodStart: new Date('2023-01-01'), periodEnd: new Date('2023-03-31'), totalSales: 850000, grossAmount: 850000, galleryFee: 340000, netAmount: 510000, status: 'completed', processedAt: new Date('2023-04-10'), paymentMethod: 'bank_transfer', paymentReference: 'WIRE-ART-001' },
      { id: 'pay-002', artistId: 'artist-002', payoutNumber: 'AA-APO-2023-Q2-001', periodStart: new Date('2023-04-01'), periodEnd: new Date('2023-06-30'), totalSales: 650000, grossAmount: 650000, galleryFee: 227500, netAmount: 422500, status: 'completed', processedAt: new Date('2023-07-15'), paymentMethod: 'bank_transfer', paymentReference: 'WIRE-ART-002' },
      { id: 'pay-004', artistId: 'artist-007', payoutNumber: 'AA-APO-2023-Q1-002', periodStart: new Date('2023-01-01'), periodEnd: new Date('2023-03-31'), totalSales: 4500000, grossAmount: 4500000, galleryFee: 2475000, netAmount: 2025000, status: 'completed', processedAt: new Date('2023-04-15'), paymentMethod: 'bank_transfer', paymentReference: 'WIRE-ART-004' },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Seeded payouts');

  // ─── Payout Splits ──────────────────────────────────────────────────────────
  await prisma.payoutSplit.createMany({
    data: [
      { id: 'split-001', payoutId: 'pay-001', artworkTitle: 'Whispers of Ancestors', grossAmount: 850000, galleryFee: 340000, artistShare: 510000 },
      { id: 'split-002', payoutId: 'pay-002', artworkTitle: 'Market Day II', grossAmount: 650000, galleryFee: 227500, artistShare: 422500 },
      { id: 'split-003', payoutId: 'pay-004', artworkTitle: 'Gravity and Grace', grossAmount: 4500000, galleryFee: 2475000, artistShare: 2025000 },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Seeded payout splits');

  // ─── Transactions ───────────────────────────────────────────────────────────
  await prisma.transactionRecord.createMany({
    data: [
      { id: 'tx-001', transactionNumber: 'AA-TX-2023-001', type: 'payment_in', paymentIntentId: 'pay-001', collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke', amount: 850000, description: 'Artwork purchase', status: 'completed', method: 'bank_transfer', createdAt: new Date('2023-03-15'), processedAt: new Date('2023-03-15') },
      { id: 'tx-007', transactionNumber: 'AA-TX-2023-007', type: 'payment_out', settlementId: 'set-001', artistId: 'artist-001', artistName: 'Ngozi Okeke', amount: 510000, description: 'Artist settlement Q1 2023', status: 'completed', method: 'bank_transfer', createdAt: new Date('2023-04-05'), processedAt: new Date('2023-04-05') },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Seeded transactions');

  // ─── Notifications ──────────────────────────────────────────────────────────
  await prisma.notification.createMany({
    data: [
      { id: 'notif-001', userId: 'user-001', type: 'info', title: 'New lead captured', message: 'Dr. Amina Bello submitted an inquiry for Whispers of Ancestors.', actionUrl: '/ops/crm/leads' },
      { id: 'notif-002', userId: 'user-001', type: 'success', title: 'Payment received', message: 'Payment of $850,000 received from Dr. Obafemi Okeke.', actionUrl: '/ops/payments' },
      { id: 'notif-003', userId: 'user-001', type: 'warning', title: 'Consignment expiring', message: 'Agreement AA-CON-2024-008 expires in 30 days.', actionUrl: '/ops/artists' },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Seeded notifications');

  // ─── Audit Logs ─────────────────────────────────────────────────────────────
  await prisma.auditLog.createMany({
    data: [
      { id: 'audit-001', userId: 'user-001', userName: 'Chioma A.', action: 'login', entityType: 'user', details: JSON.stringify({ method: 'password' }) },
      { id: 'audit-002', userId: 'user-001', userName: 'Chioma A.', action: 'payment_approved', entityType: 'payment_intent', entityId: 'pay-001', details: JSON.stringify({ amount: 850000 }) },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Seeded audit logs');

  console.log('\n🎉 Seed complete. Database populated with production-grade relational data.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
