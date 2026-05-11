export interface ArtworkDetail {
  id: string;
  title: string;
  slug: string;
  artist: {
    name: string;
    slug: string;
    bio: string;
    instagram?: string;
    website?: string;
  };
  price: number | null;
  isPriceOnRequest: boolean;
  images: string[];
  category: string;
  inStock: boolean;
  medium: string;
  dimensions: string;
  year: number;
  description: string;
  curatorNote?: string;
  rarity?: 'new' | 'reserved' | 'featured' | 'premium';
  tags: string[];
  edition?: string;
  provenance?: string;
  collectorInterestCount?: number;
}

export const artworks: ArtworkDetail[] = [
  {
    id: '1',
    title: 'Abstract Sunset',
    slug: 'abstract-sunset',
    artist: {
      name: 'Kofi Asante',
      slug: 'kofi-asante',
      bio: 'Multidisciplinary artist working in painting and digital media. Known for bold color fields and abstract landscapes.',
    },
    price: 12500,
    isPriceOnRequest: false,
    images: ['/images/WhatsApp Image 2026-04-22 at 02.59.50.jpeg'],
    category: 'painting',
    inStock: true,
    medium: 'Oil on Canvas',
    dimensions: '120 x 150 cm',
    year: 2025,
    description: 'A luminous exploration of the golden hour, where the boundary between sky and earth dissolves into pure chromatic sensation.',
    curatorNote: 'One of the most sought-after works from Asante\'s 2025 Lagos studio residency.',
    rarity: 'new',
    tags: ['abstract', 'landscape', 'contemporary', 'oil'],
    edition: 'Unique',
    provenance: 'Direct from artist studio, Lagos 2025',
    collectorInterestCount: 8,
  },
  {
    id: '2',
    title: 'Urban Dreams',
    slug: 'urban-dreams',
    artist: {
      name: 'Ngozi Okeke',
      slug: 'ngozi-okeke',
      bio: 'Contemporary sculptor working in bronze and reclaimed timber.',
    },
    price: 28000,
    isPriceOnRequest: false,
    images: ['/images/WhatsApp Image 2026-04-22 at 02.59.51.jpeg'],
    category: 'sculpture',
    inStock: true,
    medium: 'Bronze & Reclaimed Timber',
    dimensions: '160 x 70 x 55 cm',
    year: 2024,
    description: 'A towering bronze figure that seems to emerge from the gallery floor itself.',
    curatorNote: 'The first work from Okeke\'s Roots That Whisper series to reach the secondary market.',
    rarity: 'featured',
    tags: ['sculpture', 'bronze', 'figurative', 'heritage'],
    edition: 'Unique',
    provenance: 'Direct from artist studio, Enugu 2024',
    collectorInterestCount: 14,
  },
  {
    id: '3',
    title: 'Modern Art',
    slug: 'modern-art',
    artist: {
      name: 'Amara Okafor',
      slug: 'amara-okafor',
      bio: 'Sculptor and installation artist exploring nature and technology.',
    },
    price: null,
    isPriceOnRequest: true,
    images: ['/images/WhatsApp Image 2026-04-22 at 02.59.52.jpeg'],
    category: 'installation',
    inStock: true,
    medium: 'Resin, Circuit Boards, Dried Flora',
    dimensions: '100 x 100 x 30 cm',
    year: 2025,
    description: 'A synthetic garden where botanical specimens are suspended in resin alongside fragments of obsolete technology.',
    rarity: 'premium',
    tags: ['installation', 'mixed-media', 'technology', 'botanical'],
    edition: 'Unique',
    provenance: 'Direct from artist studio, Nairobi 2025',
    collectorInterestCount: 6,
  },
  {
    id: '4',
    title: 'Contemporary Piece',
    slug: 'contemporary-piece',
    artist: {
      name: 'Kofi Asante',
      slug: 'kofi-asante',
      bio: 'Multidisciplinary artist working in painting and digital media.',
    },
    price: 8400,
    isPriceOnRequest: false,
    images: ['/images/WhatsApp Image 2026-04-22 at 02.59.52 (1).jpeg'],
    category: 'painting',
    inStock: true,
    medium: 'Acrylic on Canvas',
    dimensions: '90 x 120 cm',
    year: 2025,
    description: 'A study in geometric restraint, where Asante limits his palette to three colors.',
    tags: ['abstract', 'geometric', 'minimal', 'acrylic'],
    edition: 'Unique',
    provenance: 'Direct from artist studio, Accra 2025',
    collectorInterestCount: 3,
  },
  {
    id: '5',
    title: 'Artistic Vision',
    slug: 'artistic-vision',
    artist: {
      name: 'Ngozi Okeke',
      slug: 'ngozi-okeke',
      bio: 'Contemporary sculptor working in bronze and reclaimed timber.',
    },
    price: null,
    isPriceOnRequest: true,
    images: ['/images/WhatsApp Image 2026-04-22 at 02.59.52 (2).jpeg'],
    category: 'sculpture',
    inStock: true,
    medium: 'Bronze',
    dimensions: '90 x 45 x 35 cm',
    year: 2024,
    description: 'A smaller-scale work that concentrates Okeke\'s signature themes into an intimate form.',
    rarity: 'featured',
    tags: ['sculpture', 'bronze', 'figurative', 'intimate'],
    edition: 'Unique',
    provenance: 'Direct from artist studio, Enugu 2024',
    collectorInterestCount: 9,
  },
  {
    id: '6',
    title: 'Creative Expression',
    slug: 'creative-expression',
    artist: {
      name: 'Amara Okafor',
      slug: 'amara-okafor',
      bio: 'Sculptor and installation artist exploring nature and technology.',
    },
    price: 6200,
    isPriceOnRequest: false,
    images: ['/images/WhatsApp Image 2026-04-22 at 02.59.49.jpeg'],
    category: 'installation',
    inStock: false,
    medium: 'Recycled Electronics & Resin',
    dimensions: '60 x 40 x 35 cm',
    year: 2025,
    description: 'A compact work that transforms discarded phone screens and circuit boards into a luminous terrarium.',
    rarity: 'reserved',
    tags: ['installation', 'digital', 'recycled', 'light'],
    edition: 'Unique',
    provenance: 'Direct from artist studio, Nairobi 2025',
    collectorInterestCount: 11,
  },
  {
    id: '7',
    title: 'Heritage Study No. 3',
    slug: 'heritage-study-no-3',
    artist: {
      name: 'Kofi Asante',
      slug: 'kofi-asante',
      bio: 'Multidisciplinary artist working in painting and digital media.',
    },
    price: 18500,
    isPriceOnRequest: false,
    images: ['https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80'],
    category: 'painting',
    inStock: true,
    medium: 'Oil & Gold Leaf on Panel',
    dimensions: '150 x 120 cm',
    year: 2025,
    description: 'Adinkra symbols float across a deep indigo field, rendered in gold leaf and oil.',
    rarity: 'premium',
    tags: ['painting', 'heritage', 'adinkra', 'gold-leaf'],
    edition: 'Unique',
    provenance: 'Direct from artist studio, Accra 2025',
    collectorInterestCount: 7,
  },
  {
    id: '8',
    title: 'Soft Resistance II',
    slug: 'soft-resistance-ii',
    artist: {
      name: 'Ngozi Okeke',
      slug: 'ngozi-okeke',
      bio: 'Contemporary sculptor working in bronze and reclaimed timber.',
    },
    price: 32000,
    isPriceOnRequest: false,
    images: ['https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800&q=80'],
    category: 'sculpture',
    inStock: true,
    medium: 'Bronze',
    dimensions: '180 x 80 x 60 cm',
    year: 2025,
    description: 'The largest work in Okeke\'s Soft Resistance series.',
    curatorNote: 'Featured in the AndyArt Heritage Collection Preview.',
    rarity: 'featured',
    tags: ['sculpture', 'bronze', 'monumental', 'figurative'],
    edition: 'Unique',
    provenance: 'Direct from artist studio, Enugu 2025',
    collectorInterestCount: 22,
  },
  {
    id: '9',
    title: 'Chromatic Hymn',
    slug: 'chromatic-hymn',
    artist: {
      name: 'Kofi Asante',
      slug: 'kofi-asante',
      bio: 'Multidisciplinary artist working in painting and digital media.',
    },
    price: 22000,
    isPriceOnRequest: false,
    images: ['https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=80'],
    category: 'painting',
    inStock: true,
    medium: 'Oil on Canvas',
    dimensions: '220 x 180 cm',
    year: 2025,
    description: 'A vast field of overlapping color that seems to pulse with its own rhythm.',
    rarity: 'new',
    tags: ['painting', 'abstract', 'large-scale', 'color-field'],
    edition: 'Unique',
    provenance: 'Direct from artist studio, Accra 2025',
    collectorInterestCount: 5,
  },
  {
    id: '10',
    title: 'Synthetic Garden I',
    slug: 'synthetic-garden-i',
    artist: {
      name: 'Amara Okafor',
      slug: 'amara-okafor',
      bio: 'Sculptor and installation artist exploring nature and technology.',
    },
    price: 7800,
    isPriceOnRequest: false,
    images: ['https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80'],
    category: 'installation',
    inStock: true,
    medium: 'Resin & Dried Flora',
    dimensions: '75 x 75 x 12 cm',
    year: 2024,
    description: 'The first work in Okafor\'s Synthetic Garden series.',
    tags: ['installation', 'botanical', 'resin', 'mixed-media'],
    edition: 'Unique',
    provenance: 'Direct from artist studio, Nairobi 2024',
    collectorInterestCount: 4,
  },
];

export function getArtworkBySlug(slug: string): ArtworkDetail | undefined {
  return artworks.find((a) => a.slug === slug);
}

export const artworkCategories = [
  'All',
  'Painting',
  'Sculpture',
  'Installation',
  'Digital',
] as const;

export const priceBands = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $10,000', min: 0, max: 10000 },
  { label: '$10,000 – $25,000', min: 10000, max: 25000 },
  { label: 'Over $25,000', min: 25000, max: Infinity },
  { label: 'Price on Request', min: -1, max: -1 },
] as const;

export const rarityOrder: Record<string, number> = {
  premium: 4,
  featured: 3,
  new: 2,
  reserved: 1,
};
