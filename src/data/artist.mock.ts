import type {
  ArtistProfile, StudioProfile, ArtworkInventory, ConsignmentAgreement,
  ArtistCommission, ExhibitionParticipation, ArtistPayout, ArtistAnalytics,
} from '@/types/artist';
import {
  seedArtistProfiles, seedStudios, seedInventory, seedConsignments,
  seedCommissions, seedExhibitions, seedPayouts, seedAnalytics,
} from '@/lib/artist';

export const MOCK_ARTISTS: ArtistProfile[] = [
  {
    id: 'artist-001', userId: 'u-art-001', email: 'n.okeke@andyart.gallery', name: 'Ngozi Okeke',
    slug: 'ngozi-okeke', avatar: undefined,
    biography: 'Contemporary sculptor working in bronze and reclaimed timber. Her work explores identity, memory, and the quiet strength of women across generations.',
    artistStatement: 'I believe art should carry the weight of history while speaking to the present moment. Every piece is a conversation between what was and what could be.',
    mediums: ['sculpture', 'mixed_media', 'installation'],
    yearsActive: 14, birthYear: 1985, birthPlace: 'Enugu, Nigeria',
    basedIn: 'Lagos, Nigeria', studioLocation: 'Victoria Island, Lagos',
    availabilityStatus: 'available',
    socialLinks: { instagram: '@ngozi_okeke', website: 'ngoziokeke.com' },
    exhibitions: [
      { title: 'Echoes of Bronze', venue: 'AndyArt Gallery', location: 'Lagos', year: 2023, type: 'solo' },
      { title: 'Women in Form', venue: 'Zeitz MOCAA', location: 'Cape Town', year: 2022, type: 'group' },
      { title: 'Lagos Biennial', venue: 'National Museum', location: 'Lagos', year: 2021, type: 'biennial' },
    ],
    awards: [
      { title: 'Visual Arts Prize', organization: 'Nigeria Arts Council', year: 2022, description: 'Excellence in sculptural practice' },
      { title: 'Emerging Artist Grant', organization: 'Gucci Arts Fund', year: 2019 },
    ],
    collectionsFeaturedIn: ['Zeitz MOCAA', 'National Gallery of Nigeria', 'Private Collection of Dr. Obafemi Okeke'],
    education: [
      { institution: 'Yaba College of Technology', degree: 'HND Fine Art', year: 2008 },
      { institution: 'Goldsmiths, University of London', degree: 'MA Fine Art', year: 2012 },
    ],
    status: 'active', joinDate: '2021-03-15T00:00:00Z', lastActive: '2024-12-01T00:00:00Z',
    totalWorks: 24, totalSold: 18, totalRevenue: 4200000, averageWorkPrice: 175000,
    collectorCount: 12, commissionRate: 60, insuranceCoverage: true, verifiedIdentity: true, contractSigned: true,
    notes: 'Flagship artist. Strong relationship with gallery.',
  },
  {
    id: 'artist-002', userId: 'u-art-002', email: 'k.asante@andyart.gallery', name: 'Kofi Asante',
    slug: 'kofi-asante', avatar: undefined,
    biography: 'Multidisciplinary artist working in painting and digital media. Known for bold color fields and abstract landscapes that reimagine West African topography.',
    artistStatement: 'Color is my primary language. I paint the land as I feel it, not as I see it.',
    mediums: ['painting', 'digital', 'mixed_media'],
    yearsActive: 10, birthYear: 1990, birthPlace: 'Kumasi, Ghana',
    basedIn: 'Accra, Ghana', studioLocation: 'Jamestown, Accra',
    availabilityStatus: 'commission_only',
    socialLinks: { instagram: '@kofi_asante_art', website: 'kofiasante.art' },
    exhibitions: [
      { title: 'Color Fields', venue: 'AndyArt Gallery', location: 'Lagos', year: 2024, type: 'solo' },
      { title: 'African Abstraction', venue: '1-54 Contemporary African Art Fair', location: 'London', year: 2023, type: 'fair' },
    ],
    awards: [
      { title: 'Kuenyehia Prize', organization: 'Kuenyehia Trust', year: 2020 },
    ],
    collectionsFeaturedIn: ['Sindika Dokolo Collection', 'Private Collection of Kofi Asante'],
    education: [
      { institution: 'Kwame Nkrumah University', degree: 'BFA Painting', year: 2013 },
    ],
    status: 'active', joinDate: '2022-01-10T00:00:00Z', lastActive: '2024-11-20T00:00:00Z',
    totalWorks: 31, totalSold: 22, totalRevenue: 3100000, averageWorkPrice: 100000,
    collectorCount: 18, commissionRate: 65, insuranceCoverage: true, verifiedIdentity: true, contractSigned: true,
  },
  {
    id: 'artist-003', userId: 'u-art-003', email: 'a.okafor@andyart.gallery', name: 'Amara Okafor',
    slug: 'amara-okafor', avatar: undefined,
    biography: 'Sculptor exploring nature and technology relationships through mixed media installations. Her work often incorporates found electronics and organic materials.',
    artistStatement: 'Where does the natural end and the synthetic begin? My work lives in that liminal space.',
    mediums: ['installation', 'sculpture', 'mixed_media'],
    yearsActive: 8, birthYear: 1992, birthPlace: 'Onitsha, Nigeria',
    basedIn: 'Lagos, Nigeria', studioLocation: 'Yaba, Lagos',
    availabilityStatus: 'available',
    socialLinks: { instagram: '@amara.okafor', twitter: '@amaraokafor' },
    exhibitions: [
      { title: 'Synthetic Nature', venue: 'AndyArt Gallery', location: 'Lagos', year: 2024, type: 'solo' },
      { title: 'New Media Lagos', venue: 'CCA Lagos', location: 'Lagos', year: 2023, type: 'group' },
    ],
    awards: [],
    collectionsFeaturedIn: ['CCA Lagos Collection'],
    education: [
      { institution: 'University of Lagos', degree: 'BA Fine Arts', year: 2015 },
    ],
    status: 'active', joinDate: '2023-06-01T00:00:00Z', lastActive: '2024-12-05T00:00:00Z',
    totalWorks: 15, totalSold: 8, totalRevenue: 980000, averageWorkPrice: 122500,
    collectorCount: 6, commissionRate: 60, insuranceCoverage: true, verifiedIdentity: true, contractSigned: true,
  },
  {
    id: 'artist-004', userId: 'u-art-004', email: 't.mensah@andyart.gallery', name: 'Theodore Mensah',
    slug: 'theodore-mensah', avatar: undefined,
    biography: 'Photographer and visual storyteller documenting the changing face of urban Africa. His large-format prints capture intimate moments in public spaces.',
    artistStatement: 'The street is my studio. Every face tells a story that deserves to be preserved.',
    mediums: ['photography', 'digital'],
    yearsActive: 12, birthYear: 1982, birthPlace: 'Accra, Ghana',
    basedIn: 'Accra, Ghana', studioLocation: 'Osu, Accra',
    availabilityStatus: 'traveling',
    socialLinks: { instagram: '@theo.mensah', website: 'theodoremensah.com' },
    exhibitions: [
      { title: 'Street Chronicles', venue: 'AndyArt Gallery', location: 'Lagos', year: 2023, type: 'solo' },
      { title: 'Rencontres d\'Arles', venue: 'Arles Photography Festival', location: 'Arles, France', year: 2022, type: 'group' },
    ],
    awards: [
      { title: 'Canon Photography Prize', organization: 'Canon Europe', year: 2021 },
    ],
    collectionsFeaturedIn: ['National Gallery of Ghana', 'Private Collection of Jean-Pierre Dubois'],
    education: [
      { institution: 'Ghana Institute of Journalism', degree: 'Diploma Photography', year: 2005 },
    ],
    status: 'active', joinDate: '2021-09-15T00:00:00Z', lastActive: '2024-10-30T00:00:00Z',
    totalWorks: 45, totalSold: 32, totalRevenue: 2800000, averageWorkPrice: 87500,
    collectorCount: 22, commissionRate: 65, insuranceCoverage: true, verifiedIdentity: true, contractSigned: true,
  },
  {
    id: 'artist-005', userId: 'u-art-005', email: 'z.muholi@andyart.gallery', name: 'Zanele Muholi',
    slug: 'zanele-muholi', avatar: undefined,
    biography: 'Visual activist and photographer working to document Black LGBTQIA+ communities in South Africa and beyond. Their work challenges dominant narratives and celebrates identity.',
    artistStatement: 'We exist. We resist. We persist. My lens is a weapon of love and documentation.',
    mediums: ['photography', 'mixed_media'],
    yearsActive: 20, birthYear: 1972, birthPlace: 'Durban, South Africa',
    basedIn: 'Johannesburg, South Africa', studioLocation: 'Braamfontein, Johannesburg',
    availabilityStatus: 'available',
    socialLinks: { instagram: '@muholizanele', website: 'zanelemuholi.com' },
    exhibitions: [
      { title: 'Somnyama Ngonyama', venue: 'Tate Modern', location: 'London', year: 2024, type: 'solo' },
      { title: 'Venice Biennale', venue: 'South African Pavilion', location: 'Venice', year: 2023, type: 'biennial' },
      { title: 'Faces and Phases', venue: 'AndyArt Gallery', location: 'Lagos', year: 2022, type: 'solo' },
    ],
    awards: [
      { title: 'Infinity Award', organization: 'International Center of Photography', year: 2016 },
      { title: 'Chevalier de l\'Ordre des Arts', organization: 'French Ministry of Culture', year: 2023 },
    ],
    collectionsFeaturedIn: ['Tate Modern', 'Guggenheim', 'SFMOMA', 'Zeitz MOCAA'],
    education: [
      { institution: 'Ryerson University', degree: 'MFA Documentary Media', year: 2009 },
    ],
    status: 'active', joinDate: '2020-05-01T00:00:00Z', lastActive: '2024-12-10T00:00:00Z',
    totalWorks: 120, totalSold: 85, totalRevenue: 12500000, averageWorkPrice: 147000,
    collectorCount: 45, commissionRate: 55, insuranceCoverage: true, verifiedIdentity: true, contractSigned: true,
  },
  {
    id: 'artist-006', userId: 'u-art-006', email: 'w.mutu@andyart.gallery', name: 'Wangechi Mutu',
    slug: 'wangechi-mutu', avatar: undefined,
    biography: 'Kenyan-American artist known for her collages, films, and sculptures that explore the female body, colonialism, and African identity.',
    artistStatement: 'I collage the body to reconstruct narratives about who we are and who we can become.',
    mediums: ['mixed_media', 'sculpture', 'digital'],
    yearsActive: 22, birthYear: 1972, birthPlace: 'Nairobi, Kenya',
    basedIn: 'Brooklyn, USA', studioLocation: 'Bushwick, Brooklyn',
    availabilityStatus: 'commission_only',
    socialLinks: { instagram: '@wangechimutu', website: 'wangechimutu.com' },
    exhibitions: [
      { title: 'The NewOnes, will free Us', venue: 'Metropolitan Museum', location: 'New York', year: 2024, type: 'solo' },
      { title: 'Whisper', venue: 'AndyArt Gallery', location: 'Lagos', year: 2023, type: 'solo' },
    ],
    awards: [
      { title: 'Cooper Hewitt National Design Award', organization: 'Smithsonian', year: 2022 },
    ],
    collectionsFeaturedIn: ['Metropolitan Museum', 'Museum of Modern Art', 'Guggenheim', 'British Museum'],
    education: [
      { institution: 'Yale University', degree: 'MFA Sculpture', year: 2000 },
      { institution: 'Cooper Union', degree: 'BFA Fine Arts', year: 1996 },
    ],
    status: 'active', joinDate: '2020-01-15T00:00:00Z', lastActive: '2024-11-15T00:00:00Z',
    totalWorks: 85, totalSold: 62, totalRevenue: 18000000, averageWorkPrice: 290000,
    collectorCount: 38, commissionRate: 50, insuranceCoverage: true, verifiedIdentity: true, contractSigned: true,
  },
  {
    id: 'artist-007', userId: 'u-art-007', email: 'e.anatsui@andyart.gallery', name: 'El Anatsui',
    slug: 'el-anatsui', avatar: undefined,
    biography: 'Ghanaian sculptor active for over four decades, famous for transforming simple bottle caps into monumental tapestries that rethink sculpture and textile traditions.',
    artistStatement: 'Art grows out of each particular situation, and I believe that artists are better off working with whatever their environment throws up.',
    mediums: ['sculpture', 'installation', 'textile'],
    yearsActive: 45, birthYear: 1944, birthPlace: 'Anyako, Ghana',
    basedIn: 'Nsukka, Nigeria', studioLocation: 'Nsukka, Enugu State',
    availabilityStatus: 'not_accepting',
    socialLinks: { website: 'elanatsui.com' },
    exhibitions: [
      { title: 'Triumphant Scale', venue: 'Haus der Kunst', location: 'Munich', year: 2024, type: 'solo' },
      { title: 'Behind the Red Moon', venue: 'Tate Modern', location: 'London', year: 2023, type: 'solo' },
      { title: 'Venice Biennale Golden Lion', venue: 'Venice', location: 'Italy', year: 2015, type: 'biennial' },
    ],
    awards: [
      { title: 'Golden Lion for Lifetime Achievement', organization: 'Venice Biennale', year: 2015 },
      { title: 'Praemium Imperiale', organization: 'Japan Art Association', year: 2017 },
    ],
    collectionsFeaturedIn: ['Tate Modern', 'Metropolitan Museum', 'British Museum', 'Centre Pompidou'],
    education: [
      { institution: 'University of Nigeria, Nsukka', degree: 'BA Sculpture', year: 1968 },
    ],
    status: 'active', joinDate: '2019-06-01T00:00:00Z', lastActive: '2024-09-01T00:00:00Z',
    totalWorks: 200, totalSold: 145, totalRevenue: 45000000, averageWorkPrice: 310000,
    collectorCount: 60, commissionRate: 45, insuranceCoverage: true, verifiedIdentity: true, contractSigned: true,
  },
  {
    id: 'artist-008', userId: 'u-art-008', email: 'y.shonibare@andyart.gallery', name: 'Yinka Shonibare',
    slug: 'yinka-shonibare', avatar: undefined,
    biography: 'British-Nigerian artist exploring cultural identity, colonialism, and post-colonialism within the context of globalization. Best known for his use of Dutch wax fabric.',
    artistStatement: 'I use fabric as a metaphor for the complexity of identity and the layered histories we all carry.',
    mediums: ['installation', 'sculpture', 'mixed_media'],
    yearsActive: 30, birthYear: 1962, birthPlace: 'London, UK',
    basedIn: 'London, UK', studioLocation: 'Shoreditch, London',
    availabilityStatus: 'available',
    socialLinks: { instagram: '@yinkashonibare', website: 'yinkashonibare.com' },
    exhibitions: [
      { title: 'Suspended States', venue: 'Serpentine Gallery', location: 'London', year: 2024, type: 'solo' },
      { title: 'Decolonised Structures', venue: 'AndyArt Gallery', location: 'Lagos', year: 2023, type: 'solo' },
    ],
    awards: [
      { title: 'CBE', organization: 'British Empire', year: 2019 },
      { title: 'RA', organization: 'Royal Academy of Arts', year: 2013 },
    ],
    collectionsFeaturedIn: ['Tate', 'V&A', 'National Museum of African Art', 'Smithsonian'],
    education: [
      { institution: 'Goldsmiths College', degree: 'MFA', year: 1991 },
      { institution: 'Byam Shaw School of Art', degree: 'BA Fine Art', year: 1988 },
    ],
    status: 'active', joinDate: '2019-01-10T00:00:00Z', lastActive: '2024-12-08T00:00:00Z',
    totalWorks: 95, totalSold: 72, totalRevenue: 22000000, averageWorkPrice: 305000,
    collectorCount: 35, commissionRate: 50, insuranceCoverage: true, verifiedIdentity: true, contractSigned: true,
  },
];

export const MOCK_STUDIOS: StudioProfile[] = [
  {
    id: 'studio-001', artistId: 'artist-001', name: 'Ngozi Okeke Studio',
    address: '14b Ajose Adeogun Street', city: 'Victoria Island', country: 'Nigeria',
    size: '120 sqm', type: 'private', accessibleToVisitors: true,
    hasClimateControl: true, hasSecurity: true,
    description: 'Two-story studio with bronze foundry access, woodshop, and exhibition space.',
    openingHours: 'Mon-Fri 9am-6pm', contactPhone: '+234 801 234 5678', contactEmail: 'studio@ngoziokeke.com',
  },
  {
    id: 'studio-002', artistId: 'artist-002', name: 'Kofi Asante Atelier',
    address: '22 James Town Road', city: 'Accra', country: 'Ghana',
    size: '80 sqm', type: 'shared', accessibleToVisitors: false,
    hasClimateControl: true, hasSecurity: false,
    description: 'Shared studio space in historic Jamestown with natural light and sea breeze.',
    openingHours: 'Tue-Sat 10am-7pm', contactPhone: '+233 24 567 8901', contactEmail: 'kofi@kofiasante.art',
  },
  {
    id: 'studio-003', artistId: 'artist-003', name: 'Amara Lab',
    address: '7 Commercial Avenue', city: 'Yaba', country: 'Nigeria',
    size: '60 sqm', type: 'private', accessibleToVisitors: true,
    hasClimateControl: false, hasSecurity: true,
    description: 'Experimental studio with electronics workshop and mixed media facilities.',
    openingHours: 'Mon-Sat 11am-8pm', contactPhone: '+234 802 345 6789', contactEmail: 'hello@amaraokafor.com',
  },
  {
    id: 'studio-004', artistId: 'artist-004', name: 'Theodore Mensah Darkroom',
    address: '45 Oxford Street', city: 'Osu', country: 'Ghana',
    size: '50 sqm', type: 'private', accessibleToVisitors: false,
    hasClimateControl: true, hasSecurity: true,
    description: 'Fully equipped darkroom and digital editing suite for large-format photography.',
    openingHours: 'By appointment', contactPhone: '+233 20 123 4567', contactEmail: 'studio@theodoremensah.com',
  },
  {
    id: 'studio-005', artistId: 'artist-005', name: 'Muholi Studio',
    address: '112 Juta Street', city: 'Braamfontein', country: 'South Africa',
    size: '200 sqm', type: 'commercial', accessibleToVisitors: false,
    hasClimateControl: true, hasSecurity: true,
    description: 'Professional studio with multiple shooting bays, editing suites, and archive storage.',
    openingHours: 'Mon-Fri 9am-5pm', contactPhone: '+27 11 234 5678', contactEmail: 'studio@zanelemuholi.com',
  },
  {
    id: 'studio-006', artistId: 'artist-006', name: 'Mutu Studio',
    address: '387 Troutman Street', city: 'Brooklyn', country: 'USA',
    size: '300 sqm', type: 'commercial', accessibleToVisitors: false,
    hasClimateControl: true, hasSecurity: true,
    description: 'Large-scale studio with foundry access, printmaking facilities, and film editing suite.',
    openingHours: 'By appointment', contactPhone: '+1 718 555 0199', contactEmail: 'studio@wangechimutu.com',
  },
  {
    id: 'studio-007', artistId: 'artist-007', name: 'Anatsui Workshop',
    address: 'University of Nigeria Campus', city: 'Nsukka', country: 'Nigeria',
    size: '500 sqm', type: 'private', accessibleToVisitors: true,
    hasClimateControl: false, hasSecurity: true,
    description: 'Sprawling workshop with dedicated teams for sorting, flattening, and assembling bottle cap tapestries.',
    openingHours: 'Mon-Sat 8am-6pm', contactPhone: '+234 803 456 7890', contactEmail: 'studio@elanatsui.com',
  },
  {
    id: 'studio-008', artistId: 'artist-008', name: 'Shonibare Studio',
    address: '19 Rivington Street', city: 'London', country: 'UK',
    size: '250 sqm', type: 'commercial', accessibleToVisitors: false,
    hasClimateControl: true, hasSecurity: true,
    description: 'Multi-disciplinary studio with costume workshop, sculpture fabrication, and painting ateliers.',
    openingHours: 'Mon-Fri 10am-6pm', contactPhone: '+44 20 7123 4567', contactEmail: 'studio@yinkashonibare.com',
  },
];

export const MOCK_INVENTORY: ArtworkInventory[] = [
  // Ngozi Okeke
  { id: 'inv-001', artistId: 'artist-001', title: 'Whispers of Ancestors', slug: 'whispers-of-ancestors', medium: 'sculpture', dimensions: '120x80x60cm', year: 2023, price: 850000, currency: 'USD', status: 'sold', consignmentId: 'cons-001', images: [], description: 'Bronze and reclaimed timber sculpture exploring generational memory.', provenance: 'Created in artist studio, Lagos. Sold via AndyArt Gallery.', createdAt: '2023-01-15T00:00:00Z', updatedAt: '2023-03-15T00:00:00Z', listedAt: '2023-02-01T00:00:00Z', soldAt: '2023-03-15T00:00:00Z', soldPrice: 850000, collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke', galleryNotes: 'Flagship work. Strong collector interest.', tags: ['bronze', 'timber', 'memory'] },
  { id: 'inv-002', artistId: 'artist-001', title: 'Mother\'s Hands II', slug: 'mothers-hands-ii', medium: 'sculpture', dimensions: '90x50x40cm', year: 2024, price: 620000, currency: 'USD', status: 'gallery_consigned', images: [], description: 'Continued exploration of maternal strength in bronze.', provenance: 'Created in artist studio, Lagos.', createdAt: '2024-01-10T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z', listedAt: '2024-03-01T00:00:00Z', tags: ['bronze', 'maternal', 'strength'] },
  { id: 'inv-003', artistId: 'artist-001', title: 'Market Day Memories', slug: 'market-day-memories', medium: 'mixed_media', dimensions: '150x100cm', year: 2024, price: 480000, currency: 'USD', status: 'artist_owned', images: [], description: 'Mixed media on canvas depicting Lagos market scenes.', provenance: 'Created in artist studio.', createdAt: '2024-02-15T00:00:00Z', updatedAt: '2024-02-15T00:00:00Z', tags: ['mixed media', 'market', 'Lagos'] },
  // Kofi Asante
  { id: 'inv-004', artistId: 'artist-002', title: 'Market Day II', slug: 'market-day-ii', medium: 'painting', dimensions: '200x150cm', year: 2023, price: 650000, currency: 'USD', status: 'sold', consignmentId: 'cons-002', images: [], description: 'Bold color fields inspired by Kumasi market atmosphere.', provenance: 'Created in Jamestown studio. Sold via AndyArt.', createdAt: '2023-01-20T00:00:00Z', updatedAt: '2023-06-20T00:00:00Z', listedAt: '2023-03-01T00:00:00Z', soldAt: '2023-06-20T00:00:00Z', soldPrice: 650000, collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke', tags: ['painting', 'market', 'color'] },
  { id: 'inv-005', artistId: 'artist-002', title: 'Blue Horizon', slug: 'blue-horizon', medium: 'painting', dimensions: '180x120cm', year: 2024, price: 520000, currency: 'USD', status: 'gallery_consigned', images: [], description: 'Abstract landscape in deep blues and ochres.', provenance: 'Created in Accra studio.', createdAt: '2024-03-01T00:00:00Z', updatedAt: '2024-05-01T00:00:00Z', listedAt: '2024-04-01T00:00:00Z', tags: ['abstract', 'landscape', 'blue'] },
  // Amara Okafor
  { id: 'inv-006', artistId: 'artist-003', title: 'Circuit Garden', slug: 'circuit-garden', medium: 'installation', dimensions: 'Variable', year: 2024, price: 380000, currency: 'USD', status: 'gallery_consigned', images: [], description: 'Installation combining living plants with LED circuits.', provenance: 'Created in Yaba studio.', createdAt: '2024-01-05T00:00:00Z', updatedAt: '2024-04-01T00:00:00Z', listedAt: '2024-02-01T00:00:00Z', tags: ['installation', 'technology', 'nature'] },
  // Theodore Mensah
  { id: 'inv-007', artistId: 'artist-004', title: 'Market at Dawn', slug: 'market-at-dawn', medium: 'photography', dimensions: '120x80cm', year: 2023, price: 280000, currency: 'USD', status: 'sold', consignmentId: 'cons-003', images: [], description: 'Large-format photograph of Accra market at sunrise.', provenance: 'Printed in Osu darkroom. Sold via AndyArt.', createdAt: '2023-01-10T00:00:00Z', updatedAt: '2023-08-05T00:00:00Z', listedAt: '2023-03-01T00:00:00Z', soldAt: '2023-08-05T00:00:00Z', soldPrice: 280000, collectorId: 'col-008', collectorName: 'Nia Johnson', tags: ['photography', 'market', 'Accra'] },
  // Zanele Muholi
  { id: 'inv-008', artistId: 'artist-005', title: 'Somnyama Ngonyama #45', slug: 'somnyama-ngonyama-45', medium: 'photography', dimensions: '150x100cm', year: 2023, price: 450000, currency: 'USD', status: 'gallery_consigned', images: [], description: 'Self-portrait exploring Black identity and resilience.', provenance: 'Created in Johannesburg studio.', createdAt: '2023-01-01T00:00:00Z', updatedAt: '2023-06-01T00:00:00Z', listedAt: '2023-02-01T00:00:00Z', tags: ['photography', 'identity', 'self-portrait'] },
  // Wangechi Mutu
  { id: 'inv-009', artistId: 'artist-006', title: 'Digital Futures', slug: 'digital-futures', medium: 'mixed_media', dimensions: '200x150cm', year: 2023, price: 380000, currency: 'USD', status: 'sold', consignmentId: 'cons-004', images: [], description: 'Collage exploring post-human African identity.', provenance: 'Created in Brooklyn studio.', createdAt: '2023-01-01T00:00:00Z', updatedAt: '2023-07-10T00:00:00Z', listedAt: '2023-02-01T00:00:00Z', soldAt: '2023-07-10T00:00:00Z', soldPrice: 380000, collectorId: 'col-002', collectorName: 'Amara Nwosu', tags: ['collage', 'identity', 'digital'] },
  // El Anatsui
  { id: 'inv-010', artistId: 'artist-007', title: 'Gravity and Grace', slug: 'gravity-and-grace', medium: 'sculpture', dimensions: '500x700cm', year: 2023, price: 4500000, currency: 'USD', status: 'sold', consignmentId: 'cons-005', images: [], description: 'Monumental tapestry of aluminum bottle caps and copper wire.', provenance: 'Created in Nsukka workshop. Private sale.', createdAt: '2023-01-01T00:00:00Z', updatedAt: '2023-01-20T00:00:00Z', listedAt: '2023-01-01T00:00:00Z', soldAt: '2023-01-20T00:00:00Z', soldPrice: 4500000, collectorId: 'col-012', collectorName: 'Marcus Chen', tags: ['tapestry', 'monumental', 'bottle caps'] },
  // Yinka Shonibare
  { id: 'inv-011', artistId: 'artist-008', title: 'Diaspora Dialogues', slug: 'diaspora-dialogues', medium: 'installation', dimensions: 'Variable', year: 2023, price: 1800000, currency: 'EUR', status: 'sold', consignmentId: 'cons-006', images: [], description: 'Installation with mannequins in Dutch wax fabric exploring colonial trade.', provenance: 'Created in London studio.', createdAt: '2023-01-01T00:00:00Z', updatedAt: '2023-02-28T00:00:00Z', listedAt: '2023-01-15T00:00:00Z', soldAt: '2023-02-28T00:00:00Z', soldPrice: 1800000, collectorId: 'col-007', collectorName: 'Jean-Pierre Dubois', tags: ['installation', 'colonialism', 'wax fabric'] },
];

export const MOCK_CONSIGNMENTS: ConsignmentAgreement[] = [
  { id: 'cons-001', artistId: 'artist-001', artistName: 'Ngozi Okeke', agreementNumber: 'AA-CON-2023-001', artworkId: 'inv-001', artworkTitle: 'Whispers of Ancestors', intakeDate: '2023-01-15T00:00:00Z', endDate: '2024-01-15T00:00:00Z', splitPercentage: 60, insuranceStatus: 'insured', insuranceValue: 900000, releaseTerms: '30 days notice required for return. Artist responsible for transport.', status: 'sold', notes: 'Sold within 2 months of intake.', createdAt: '2023-01-15T00:00:00Z', updatedAt: '2023-03-15T00:00:00Z', soldDate: '2023-03-15T00:00:00Z', soldPrice: 850000 },
  { id: 'cons-002', artistId: 'artist-002', artistName: 'Kofi Asante', agreementNumber: 'AA-CON-2023-002', artworkId: 'inv-004', artworkTitle: 'Market Day II', intakeDate: '2023-02-01T00:00:00Z', endDate: '2024-02-01T00:00:00Z', splitPercentage: 65, insuranceStatus: 'insured', insuranceValue: 700000, releaseTerms: 'Auto-renew unless terminated.', status: 'sold', notes: 'Strong performance.', createdAt: '2023-02-01T00:00:00Z', updatedAt: '2023-06-20T00:00:00Z', soldDate: '2023-06-20T00:00:00Z', soldPrice: 650000 },
  { id: 'cons-003', artistId: 'artist-004', artistName: 'Theodore Mensah', agreementNumber: 'AA-CON-2023-003', artworkId: 'inv-007', artworkTitle: 'Market at Dawn', intakeDate: '2023-02-15T00:00:00Z', endDate: '2024-02-15T00:00:00Z', splitPercentage: 65, insuranceStatus: 'insured', insuranceValue: 300000, releaseTerms: 'Standard 12-month term.', status: 'sold', notes: 'Photography sale.', createdAt: '2023-02-15T00:00:00Z', updatedAt: '2023-08-05T00:00:00Z', soldDate: '2023-08-05T00:00:00Z', soldPrice: 280000 },
  { id: 'cons-004', artistId: 'artist-006', artistName: 'Wangechi Mutu', agreementNumber: 'AA-CON-2023-004', artworkId: 'inv-009', artworkTitle: 'Digital Futures', intakeDate: '2023-01-15T00:00:00Z', endDate: '2024-01-15T00:00:00Z', splitPercentage: 50, insuranceStatus: 'insured', insuranceValue: 400000, releaseTerms: 'High-value artwork — specialized transport only.', status: 'sold', notes: 'International collector.', createdAt: '2023-01-15T00:00:00Z', updatedAt: '2023-07-10T00:00:00Z', soldDate: '2023-07-10T00:00:00Z', soldPrice: 380000 },
  { id: 'cons-005', artistId: 'artist-007', artistName: 'El Anatsui', agreementNumber: 'AA-CON-2023-005', artworkId: 'inv-010', artworkTitle: 'Gravity and Grace', intakeDate: '2022-12-01T00:00:00Z', endDate: '2023-12-01T00:00:00Z', splitPercentage: 45, insuranceStatus: 'insured', insuranceValue: 5000000, releaseTerms: 'White-glove installation included.', status: 'sold', notes: 'Private sale to Art Basel collector.', createdAt: '2022-12-01T00:00:00Z', updatedAt: '2023-01-20T00:00:00Z', soldDate: '2023-01-20T00:00:00Z', soldPrice: 4500000 },
  { id: 'cons-006', artistId: 'artist-008', artistName: 'Yinka Shonibare', agreementNumber: 'AA-CON-2023-006', artworkId: 'inv-011', artworkTitle: 'Diaspora Dialogues', intakeDate: '2023-01-10T00:00:00Z', endDate: '2024-01-10T00:00:00Z', splitPercentage: 50, insuranceStatus: 'insured', insuranceValue: 2000000, releaseTerms: 'International shipping with customs handling.', status: 'sold', notes: 'Sold to European museum.', createdAt: '2023-01-10T00:00:00Z', updatedAt: '2023-02-28T00:00:00Z', soldDate: '2023-02-28T00:00:00Z', soldPrice: 1800000 },
  { id: 'cons-007', artistId: 'artist-001', artistName: 'Ngozi Okeke', agreementNumber: 'AA-CON-2024-007', artworkId: 'inv-002', artworkTitle: 'Mother\'s Hands II', intakeDate: '2024-03-01T00:00:00Z', endDate: '2025-03-01T00:00:00Z', splitPercentage: 60, insuranceStatus: 'insured', insuranceValue: 650000, releaseTerms: '12-month term, auto-renew.', status: 'in_gallery', notes: 'Currently on display in main gallery.', createdAt: '2024-03-01T00:00:00Z', updatedAt: '2024-03-01T00:00:00Z' },
  { id: 'cons-008', artistId: 'artist-002', artistName: 'Kofi Asante', agreementNumber: 'AA-CON-2024-008', artworkId: 'inv-005', artworkTitle: 'Blue Horizon', intakeDate: '2024-04-01T00:00:00Z', endDate: '2025-04-01T00:00:00Z', splitPercentage: 65, insuranceStatus: 'pending', insuranceValue: 550000, releaseTerms: 'Standard consignment.', status: 'in_gallery', notes: 'Awaiting insurance confirmation.', createdAt: '2024-04-01T00:00:00Z', updatedAt: '2024-04-01T00:00:00Z' },
];

export const MOCK_COMMISSIONS: ArtistCommission[] = [
  {
    id: 'comm-001', artistId: 'artist-005', artistName: 'Zanele Muholi', collectorId: 'col-011', collectorName: 'Chioma Eze',
    commissionNumber: 'AA-COM-2023-001', brief: 'A series of 5 portraits celebrating Nigerian women in leadership positions. To be displayed in the Eze Foundation offices.',
    budget: 2200000, currency: 'USD', startDate: '2023-05-01T00:00:00Z', targetDeliveryDate: '2023-11-01T00:00:00Z', actualDeliveryDate: '2023-10-15T00:00:00Z',
    status: 'delivered',
    milestones: [
      { id: 'ms-001', title: 'Concept Development', description: 'Mood boards and concept sketches', dueDate: '2023-05-15T00:00:00Z', completedAt: '2023-05-10T00:00:00Z', status: 'completed' },
      { id: 'ms-002', title: 'First Shoot', description: 'Initial portrait sessions in Lagos', dueDate: '2023-06-30T00:00:00Z', completedAt: '2023-06-25T00:00:00Z', status: 'completed' },
      { id: 'ms-003', title: 'Editing & Selection', description: 'Post-production and final selection', dueDate: '2023-09-01T00:00:00Z', completedAt: '2023-08-28T00:00:00Z', status: 'completed' },
      { id: 'ms-004', title: 'Final Delivery', description: 'Print production and framing', dueDate: '2023-11-01T00:00:00Z', completedAt: '2023-10-15T00:00:00Z', status: 'completed' },
    ],
    approvals: [
      { stage: 'Concept', approvedBy: 'Chioma Eze', approvedAt: '2023-05-12T00:00:00Z', notes: 'Love the direction' },
      { stage: 'First Shoot', approvedBy: 'Chioma Eze', approvedAt: '2023-07-01T00:00:00Z' },
    ],
    collectorFeedback: 'Absolutely stunning. Each portrait captures the subject\'s strength and dignity.',
    finalImages: [], contractUrl: '#', createdAt: '2023-05-01T00:00:00Z', updatedAt: '2023-10-15T00:00:00Z',
  },
  {
    id: 'comm-002', artistId: 'artist-007', artistName: 'El Anatsui', collectorId: 'col-009', collectorName: 'Oluwatobi Adeyemi',
    commissionNumber: 'AA-COM-2024-002', brief: 'A monumental wall installation for a new corporate headquarters in Lagos. Approximately 8x12 meters. Theme: trade and transformation.',
    budget: 5000000, currency: 'USD', startDate: '2024-03-01T00:00:00Z', targetDeliveryDate: '2025-03-01T00:00:00Z',
    status: 'milestone_2',
    milestones: [
      { id: 'ms-005', title: 'Material Sourcing', description: 'Collection and sorting of bottle caps', dueDate: '2024-04-01T00:00:00Z', completedAt: '2024-03-28T00:00:00Z', status: 'completed' },
      { id: 'ms-006', title: 'Design Approval', description: 'Full-scale maquette and design presentation', dueDate: '2024-06-01T00:00:00Z', completedAt: '2024-05-30T00:00:00Z', status: 'completed' },
      { id: 'ms-007', title: 'Assembly Phase 1', description: 'Primary panel construction', dueDate: '2024-09-01T00:00:00Z', completedAt: '2024-08-15T00:00:00Z', status: 'completed' },
      { id: 'ms-008', title: 'Assembly Phase 2', description: 'Secondary panels and connection pieces', dueDate: '2024-12-01T00:00:00Z', status: 'in_progress' },
      { id: 'ms-009', title: 'Installation', description: 'On-site installation and final adjustments', dueDate: '2025-03-01T00:00:00Z', status: 'pending' },
    ],
    approvals: [
      { stage: 'Design', approvedBy: 'Oluwatobi Adeyemi', approvedAt: '2024-06-02T00:00:00Z', notes: 'The maquette is magnificent.' },
    ],
    contractUrl: '#', createdAt: '2024-03-01T00:00:00Z', updatedAt: '2024-08-15T00:00:00Z',
  },
  {
    id: 'comm-003', artistId: 'artist-001', artistName: 'Ngozi Okeke', collectorId: 'col-003', collectorName: 'Kofi Asante',
    commissionNumber: 'AA-COM-2024-003', brief: 'A bronze bust of the collector\'s late grandmother for private residence in Accra.',
    budget: 450000, currency: 'USD', startDate: '2024-06-01T00:00:00Z', targetDeliveryDate: '2024-12-01T00:00:00Z',
    status: 'in_progress',
    milestones: [
      { id: 'ms-010', title: 'Sittings & Sketches', description: 'Working from photographs and family descriptions', dueDate: '2024-07-01T00:00:00Z', completedAt: '2024-06-28T00:00:00Z', status: 'completed' },
      { id: 'ms-011', title: 'Clay Model', description: 'Full-size clay model for approval', dueDate: '2024-09-01T00:00:00Z', status: 'in_progress' },
      { id: 'ms-012', title: 'Bronze Casting', description: 'Lost-wax casting in bronze', dueDate: '2024-11-01T00:00:00Z', status: 'pending' },
      { id: 'ms-013', title: 'Patina & Delivery', description: 'Final patina and delivery to Accra', dueDate: '2024-12-01T00:00:00Z', status: 'pending' },
    ],
    approvals: [],
    contractUrl: '#', createdAt: '2024-06-01T00:00:00Z', updatedAt: '2024-06-28T00:00:00Z',
  },
];

export const MOCK_EXHIBITIONS: ExhibitionParticipation[] = [
  {
    id: 'exh-001', artistId: 'artist-001', artistName: 'Ngozi Okeke', exhibitionId: 'exh-gal-001', exhibitionTitle: 'Echoes of Bronze', venue: 'AndyArt Gallery', location: 'Lagos, Nigeria',
    startDate: '2023-03-01T00:00:00Z', endDate: '2023-04-30T00:00:00Z', status: 'past',
    artworksSubmitted: ['inv-001', 'inv-002'], artworksAccepted: ['inv-001', 'inv-002'], artworksSold: 1, totalSales: 850000,
    attendanceEstimate: 450, collectorInterestCount: 12, marketingSupport: true, shippingProvided: true, insuranceProvided: true,
    notes: 'Successful solo debut.', createdAt: '2023-01-01T00:00:00Z', updatedAt: '2023-04-30T00:00:00Z',
  },
  {
    id: 'exh-002', artistId: 'artist-002', artistName: 'Kofi Asante', exhibitionId: 'exh-gal-002', exhibitionTitle: 'Color Fields', venue: 'AndyArt Gallery', location: 'Lagos, Nigeria',
    startDate: '2024-02-01T00:00:00Z', endDate: '2024-03-31T00:00:00Z', status: 'past',
    artworksSubmitted: ['inv-004', 'inv-005'], artworksAccepted: ['inv-004', 'inv-005'], artworksSold: 1, totalSales: 650000,
    attendanceEstimate: 380, collectorInterestCount: 15, marketingSupport: true, shippingProvided: true, insuranceProvided: true,
    notes: 'Strong sales for emerging artist.', createdAt: '2023-11-01T00:00:00Z', updatedAt: '2024-03-31T00:00:00Z',
  },
  {
    id: 'exh-003', artistId: 'artist-005', artistName: 'Zanele Muholi', exhibitionId: 'exh-gal-003', exhibitionTitle: 'Faces and Phases', venue: 'AndyArt Gallery', location: 'Lagos, Nigeria',
    startDate: '2022-06-01T00:00:00Z', endDate: '2022-08-31T00:00:00Z', status: 'past',
    artworksSubmitted: ['inv-008'], artworksAccepted: ['inv-008'], artworksSold: 0, totalSales: 0,
    attendanceEstimate: 1200, collectorInterestCount: 45, marketingSupport: true, shippingProvided: true, insuranceProvided: true,
    notes: 'Record attendance. All works reserved post-exhibition.', createdAt: '2022-01-01T00:00:00Z', updatedAt: '2022-08-31T00:00:00Z',
  },
  {
    id: 'exh-004', artistId: 'artist-001', artistName: 'Ngozi Okeke', exhibitionId: 'exh-gal-004', exhibitionTitle: 'Women in Form', venue: 'Zeitz MOCAA', location: 'Cape Town, South Africa',
    startDate: '2022-09-01T00:00:00Z', endDate: '2022-11-30T00:00:00Z', status: 'past',
    artworksSubmitted: ['inv-001'], artworksAccepted: ['inv-001'], artworksSold: 0, totalSales: 0,
    attendanceEstimate: 800, collectorInterestCount: 8, marketingSupport: false, shippingProvided: true, insuranceProvided: true,
    notes: 'Group show. Strong critical reception.', createdAt: '2022-05-01T00:00:00Z', updatedAt: '2022-11-30T00:00:00Z',
  },
  {
    id: 'exh-005', artistId: 'artist-006', artistName: 'Wangechi Mutu', exhibitionId: 'exh-gal-005', exhibitionTitle: 'Whisper', venue: 'AndyArt Gallery', location: 'Lagos, Nigeria',
    startDate: '2023-09-01T00:00:00Z', endDate: '2023-10-31T00:00:00Z', status: 'past',
    artworksSubmitted: ['inv-009'], artworksAccepted: ['inv-009'], artworksSold: 1, totalSales: 380000,
    attendanceEstimate: 650, collectorInterestCount: 22, marketingSupport: true, shippingProvided: true, insuranceProvided: true,
    notes: 'International shipping required.', createdAt: '2023-05-01T00:00:00Z', updatedAt: '2023-10-31T00:00:00Z',
  },
  {
    id: 'exh-006', artistId: 'artist-003', artistName: 'Amara Okafor', exhibitionId: 'exh-gal-006', exhibitionTitle: 'Synthetic Nature', venue: 'AndyArt Gallery', location: 'Lagos, Nigeria',
    startDate: '2024-05-01T00:00:00Z', endDate: '2024-06-30T00:00:00Z', status: 'past',
    artworksSubmitted: ['inv-006'], artworksAccepted: ['inv-006'], artworksSold: 0, totalSales: 0,
    attendanceEstimate: 320, collectorInterestCount: 6, marketingSupport: true, shippingProvided: true, insuranceProvided: true,
    notes: 'First solo show.', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-06-30T00:00:00Z',
  },
  {
    id: 'exh-007', artistId: 'artist-001', artistName: 'Ngozi Okeke', exhibitionId: 'exh-gal-007', exhibitionTitle: 'Lagos Art Fair 2025', venue: 'Eko Hotel', location: 'Lagos, Nigeria',
    startDate: '2025-02-01T00:00:00Z', endDate: '2025-02-07T00:00:00Z', status: 'upcoming',
    artworksSubmitted: ['inv-002', 'inv-003'], artworksAccepted: ['inv-002', 'inv-003'], artworksSold: 0, totalSales: 0,
    collectorInterestCount: 0, marketingSupport: true, shippingProvided: true, insuranceProvided: true,
    notes: 'Preparing booth installation.', createdAt: '2024-10-01T00:00:00Z', updatedAt: '2024-10-01T00:00:00Z',
  },
  {
    id: 'exh-008', artistId: 'artist-008', artistName: 'Yinka Shonibare', exhibitionId: 'exh-gal-008', exhibitionTitle: 'Decolonised Structures', venue: 'AndyArt Gallery', location: 'Lagos, Nigeria',
    startDate: '2023-04-01T00:00:00Z', endDate: '2023-05-31T00:00:00Z', status: 'past',
    artworksSubmitted: ['inv-011'], artworksAccepted: ['inv-011'], artworksSold: 1, totalSales: 1800000,
    attendanceEstimate: 900, collectorInterestCount: 18, marketingSupport: true, shippingProvided: true, insuranceProvided: true,
    notes: 'Sold to European collector during preview.', createdAt: '2023-01-01T00:00:00Z', updatedAt: '2023-05-31T00:00:00Z',
  },
];

export const MOCK_PAYOUTS: ArtistPayout[] = [
  {
    id: 'pay-001', artistId: 'artist-001', artistName: 'Ngozi Okeke', payoutNumber: 'AA-APO-2023-Q1-001',
    periodStart: '2023-01-01T00:00:00Z', periodEnd: '2023-03-31T00:00:00Z',
    totalSales: 850000, commissionSplits: [
      { artworkId: 'inv-001', artworkTitle: 'Whispers of Ancestors', grossAmount: 850000, galleryFee: 340000, artistShare: 510000 },
    ],
    grossAmount: 850000, galleryFee: 340000, platformFee: 0, taxWithheld: 0, netAmount: 510000, currency: 'USD',
    status: 'completed', processedAt: '2023-04-10T00:00:00Z', paymentMethod: 'bank_transfer', paymentReference: 'WIRE-ART-001',
    taxDocumentUrl: '#', notes: 'Q1 2023 payout.', createdAt: '2023-04-01T00:00:00Z', updatedAt: '2023-04-10T00:00:00Z',
  },
  {
    id: 'pay-002', artistId: 'artist-002', artistName: 'Kofi Asante', payoutNumber: 'AA-APO-2023-Q2-001',
    periodStart: '2023-04-01T00:00:00Z', periodEnd: '2023-06-30T00:00:00Z',
    totalSales: 650000, commissionSplits: [
      { artworkId: 'inv-004', artworkTitle: 'Market Day II', grossAmount: 650000, galleryFee: 227500, artistShare: 422500 },
    ],
    grossAmount: 650000, galleryFee: 227500, platformFee: 0, taxWithheld: 0, netAmount: 422500, currency: 'USD',
    status: 'completed', processedAt: '2023-07-15T00:00:00Z', paymentMethod: 'bank_transfer', paymentReference: 'WIRE-ART-002',
    taxDocumentUrl: '#', notes: 'Q2 2023 payout.', createdAt: '2023-07-01T00:00:00Z', updatedAt: '2023-07-15T00:00:00Z',
  },
  {
    id: 'pay-003', artistId: 'artist-006', artistName: 'Wangechi Mutu', payoutNumber: 'AA-APO-2023-Q3-001',
    periodStart: '2023-07-01T00:00:00Z', periodEnd: '2023-09-30T00:00:00Z',
    totalSales: 380000, commissionSplits: [
      { artworkId: 'inv-009', artworkTitle: 'Digital Futures', grossAmount: 380000, galleryFee: 190000, artistShare: 190000 },
    ],
    grossAmount: 380000, galleryFee: 190000, platformFee: 0, taxWithheld: 38000, netAmount: 152000, currency: 'USD',
    status: 'completed', processedAt: '2023-10-10T00:00:00Z', paymentMethod: 'bank_transfer', paymentReference: 'WIRE-ART-003',
    taxDocumentUrl: '#', notes: 'US tax withholding applied.', createdAt: '2023-10-01T00:00:00Z', updatedAt: '2023-10-10T00:00:00Z',
  },
  {
    id: 'pay-004', artistId: 'artist-007', artistName: 'El Anatsui', payoutNumber: 'AA-APO-2023-Q1-002',
    periodStart: '2023-01-01T00:00:00Z', periodEnd: '2023-03-31T00:00:00Z',
    totalSales: 4500000, commissionSplits: [
      { artworkId: 'inv-010', artworkTitle: 'Gravity and Grace', grossAmount: 4500000, galleryFee: 2475000, artistShare: 2025000 },
    ],
    grossAmount: 4500000, galleryFee: 2475000, platformFee: 0, taxWithheld: 0, netAmount: 2025000, currency: 'USD',
    status: 'completed', processedAt: '2023-04-15T00:00:00Z', paymentMethod: 'bank_transfer', paymentReference: 'WIRE-ART-004',
    taxDocumentUrl: '#', notes: 'Large private sale.', createdAt: '2023-04-01T00:00:00Z', updatedAt: '2023-04-15T00:00:00Z',
  },
  {
    id: 'pay-005', artistId: 'artist-008', artistName: 'Yinka Shonibare', payoutNumber: 'AA-APO-2023-Q1-003',
    periodStart: '2023-01-01T00:00:00Z', periodEnd: '2023-03-31T00:00:00Z',
    totalSales: 1800000, commissionSplits: [
      { artworkId: 'inv-011', artworkTitle: 'Diaspora Dialogues', grossAmount: 1800000, galleryFee: 900000, artistShare: 900000 },
    ],
    grossAmount: 1800000, galleryFee: 900000, platformFee: 0, taxWithheld: 180000, netAmount: 720000, currency: 'EUR',
    status: 'completed', processedAt: '2023-04-20T00:00:00Z', paymentMethod: 'bank_transfer', paymentReference: 'WIRE-ART-005',
    taxDocumentUrl: '#', notes: 'EUR payout with UK tax.', createdAt: '2023-04-01T00:00:00Z', updatedAt: '2023-04-20T00:00:00Z',
  },
  {
    id: 'pay-006', artistId: 'artist-005', artistName: 'Zanele Muholi', payoutNumber: 'AA-APO-2023-Q3-002',
    periodStart: '2023-07-01T00:00:00Z', periodEnd: '2023-09-30T00:00:00Z',
    totalSales: 2200000, commissionSplits: [
      { artworkId: 'comm-001', artworkTitle: 'Eze Foundation Portraits', grossAmount: 2200000, galleryFee: 990000, artistShare: 1210000 },
    ],
    grossAmount: 2200000, galleryFee: 990000, platformFee: 0, taxWithheld: 0, netAmount: 1210000, currency: 'USD',
    status: 'completed', processedAt: '2023-10-20T00:00:00Z', paymentMethod: 'bank_transfer', paymentReference: 'WIRE-ART-006',
    taxDocumentUrl: '#', notes: 'Commission payout.', createdAt: '2023-10-01T00:00:00Z', updatedAt: '2023-10-20T00:00:00Z',
  },
  {
    id: 'pay-007', artistId: 'artist-007', artistName: 'El Anatsui', payoutNumber: 'AA-APO-2024-Q4-001',
    periodStart: '2024-10-01T00:00:00Z', periodEnd: '2024-12-31T00:00:00Z',
    totalSales: 1500000, commissionSplits: [
      { artworkId: 'comm-002', artworkTitle: 'Corporate Installation (Phase 1)', grossAmount: 1500000, galleryFee: 825000, artistShare: 675000 },
    ],
    grossAmount: 1500000, galleryFee: 825000, platformFee: 0, taxWithheld: 0, netAmount: 675000, currency: 'USD',
    status: 'pending', paymentMethod: 'bank_transfer',
    notes: 'Milestone payment pending contract approval.', createdAt: '2024-12-01T00:00:00Z', updatedAt: '2024-12-01T00:00:00Z',
  },
  {
    id: 'pay-008', artistId: 'artist-004', artistName: 'Theodore Mensah', payoutNumber: 'AA-APO-2023-Q3-003',
    periodStart: '2023-07-01T00:00:00Z', periodEnd: '2023-09-30T00:00:00Z',
    totalSales: 280000, commissionSplits: [
      { artworkId: 'inv-007', artworkTitle: 'Market at Dawn', grossAmount: 280000, galleryFee: 98000, artistShare: 182000 },
    ],
    grossAmount: 280000, galleryFee: 98000, platformFee: 0, taxWithheld: 0, netAmount: 182000, currency: 'USD',
    status: 'completed', processedAt: '2023-10-05T00:00:00Z', paymentMethod: 'bank_transfer', paymentReference: 'WIRE-ART-008',
    taxDocumentUrl: '#', notes: 'Photography sale.', createdAt: '2023-10-01T00:00:00Z', updatedAt: '2023-10-05T00:00:00Z',
  },
];

export const MOCK_ANALYTICS: ArtistAnalytics[] = [
  {
    artistId: 'artist-001', period: '2024-Q4',
    profileViews: 1240, artworkViews: 3850, inquiryCount: 18, inquiryRate: 4.7,
    salesVolume: 0, salesCount: 0, averageSalePrice: 0,
    collectorInterest: [
      { collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke', interestScore: 95, lastInteraction: '2024-11-15T00:00:00Z' },
      { collectorId: 'col-003', collectorName: 'Kofi Asante', interestScore: 82, lastInteraction: '2024-12-01T00:00:00Z' },
      { collectorId: 'col-005', collectorName: 'Thabo Mokoena', interestScore: 68, lastInteraction: '2024-10-20T00:00:00Z' },
    ],
    topPerformingWorks: [
      { artworkId: 'inv-002', artworkTitle: 'Mother\'s Hands II', views: 1200, inquiries: 8, sales: 0, revenue: 0 },
      { artworkId: 'inv-003', artworkTitle: 'Market Day Memories', views: 950, inquiries: 5, sales: 0, revenue: 0 },
    ],
    mediumPerformance: [
      { medium: 'sculpture', views: 2100, inquiries: 12, sales: 0, revenue: 0 },
      { medium: 'mixed_media', views: 950, inquiries: 5, sales: 0, revenue: 0 },
    ],
    geographicReach: [
      { country: 'Nigeria', collectors: 8, sales: 0 },
      { country: 'South Africa', collectors: 3, sales: 0 },
      { country: 'Ghana', collectors: 2, sales: 0 },
    ],
    updatedAt: '2024-12-01T00:00:00Z',
  },
  {
    artistId: 'artist-002', period: '2024-Q4',
    profileViews: 980, artworkViews: 2900, inquiryCount: 12, inquiryRate: 4.1,
    salesVolume: 0, salesCount: 0, averageSalePrice: 0,
    collectorInterest: [
      { collectorId: 'col-001', collectorName: 'Dr. Obafemi Okeke', interestScore: 88, lastInteraction: '2024-11-01T00:00:00Z' },
      { collectorId: 'col-009', collectorName: 'Oluwatobi Adeyemi', interestScore: 72, lastInteraction: '2024-11-20T00:00:00Z' },
    ],
    topPerformingWorks: [
      { artworkId: 'inv-005', artworkTitle: 'Blue Horizon', views: 1500, inquiries: 7, sales: 0, revenue: 0 },
    ],
    mediumPerformance: [
      { medium: 'painting', views: 2900, inquiries: 12, sales: 0, revenue: 0 },
    ],
    geographicReach: [
      { country: 'Nigeria', collectors: 6, sales: 0 },
      { country: 'Ghana', collectors: 4, sales: 0 },
    ],
    updatedAt: '2024-12-01T00:00:00Z',
  },
  {
    artistId: 'artist-007', period: '2024-Q4',
    profileViews: 2100, artworkViews: 5600, inquiryCount: 4, inquiryRate: 0.7,
    salesVolume: 1500000, salesCount: 1, averageSalePrice: 1500000,
    collectorInterest: [
      { collectorId: 'col-009', collectorName: 'Oluwatobi Adeyemi', interestScore: 99, lastInteraction: '2024-12-01T00:00:00Z' },
    ],
    topPerformingWorks: [
      { artworkId: 'comm-002', artworkTitle: 'Corporate Installation', views: 3200, inquiries: 3, sales: 1, revenue: 1500000 },
    ],
    mediumPerformance: [
      { medium: 'sculpture', views: 3200, inquiries: 3, sales: 1, revenue: 1500000 },
    ],
    geographicReach: [
      { country: 'Nigeria', collectors: 2, sales: 1 },
    ],
    updatedAt: '2024-12-01T00:00:00Z',
  },
];

export function seedArtistData(): void {
  if (typeof window === 'undefined') return;
  seedArtistProfiles(MOCK_ARTISTS);
  seedStudios(MOCK_STUDIOS);
  seedInventory(MOCK_INVENTORY);
  seedConsignments(MOCK_CONSIGNMENTS);
  seedCommissions(MOCK_COMMISSIONS);
  seedExhibitions(MOCK_EXHIBITIONS);
  seedPayouts(MOCK_PAYOUTS);
  seedAnalytics(MOCK_ANALYTICS);
  // Set default current artist for demo
  if (!localStorage.getItem('andyart_current_artist_id')) {
    localStorage.setItem('andyart_current_artist_id', 'artist-001');
  }
}
