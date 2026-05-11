export interface ArtworkSummary {
  id: string;
  title: string;
  slug: string;
  artist: { name: string; slug: string };
  price: number | null;
  isPriceOnRequest: boolean;
  images: string[];
  category: string;
  inStock: boolean;
  medium: string;
  dimensions: string;
  year: number;
}

export interface ArtistDetail {
  id: string;
  name: string;
  slug: string;
  bio: string;
  profileImage: string;
  instagram?: string;
  website?: string;
  location: string;
  specialty: string;
  artworks: ArtworkSummary[];
}

export const artists: ArtistDetail[] = [
  {
    id: '1',
    name: 'Ngozi Okeke',
    slug: 'ngozi-okeke',
    bio: 'Contemporary sculptor working in bronze and reclaimed timber. Her work explores identity, memory, and the quiet strength of women across generations. Born in Enugu and trained in architecture before turning to sculpture, Okeke brings a spatial intelligence to her figurative work that distinguishes her from her peers. Her pieces are held in private collections across Lagos, London, and New York.',
    profileImage: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800&q=80',
    instagram: '@ngoziokeke',
    website: 'https://ngoziokeke.art',
    location: 'Enugu, Nigeria',
    specialty: 'Bronze & Reclaimed Timber Sculpture',
    artworks: [
      {
        id: 'a1',
        title: 'Soft Resistance I',
        slug: 'soft-resistance-i',
        artist: { name: 'Ngozi Okeke', slug: 'ngozi-okeke' },
        price: 18500,
        isPriceOnRequest: false,
        images: ['https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800&q=80'],
        category: 'sculpture',
        inStock: true,
        medium: 'Bronze',
        dimensions: '140 x 60 x 45 cm',
        year: 2025,
      },
      {
        id: 'a2',
        title: 'Roots That Whisper III',
        slug: 'roots-that-whisper-iii',
        artist: { name: 'Ngozi Okeke', slug: 'ngozi-okeke' },
        price: 22000,
        isPriceOnRequest: false,
        images: ['https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80'],
        category: 'sculpture',
        inStock: true,
        medium: 'Bronze & Timber',
        dimensions: '180 x 75 x 60 cm',
        year: 2024,
      },
      {
        id: 'a3',
        title: 'The Weight of Morning',
        slug: 'the-weight-of-morning',
        artist: { name: 'Ngozi Okeke', slug: 'ngozi-okeke' },
        price: null,
        isPriceOnRequest: true,
        images: ['https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=800&q=80'],
        category: 'sculpture',
        inStock: true,
        medium: 'Reclaimed Timber',
        dimensions: '120 x 50 x 40 cm',
        year: 2025,
      },
      {
        id: 'a4',
        title: 'Shoulder Memory',
        slug: 'shoulder-memory',
        artist: { name: 'Ngozi Okeke', slug: 'ngozi-okeke' },
        price: 14500,
        isPriceOnRequest: false,
        images: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80'],
        category: 'sculpture',
        inStock: false,
        medium: 'Bronze',
        dimensions: '90 x 45 x 35 cm',
        year: 2024,
      },
    ],
  },
  {
    id: '2',
    name: 'Kofi Asante',
    slug: 'kofi-asante',
    bio: 'Multidisciplinary artist working in painting and digital media. Known for bold color fields and abstract landscapes that reimagine the Ghanaian coast through a contemporary lens. Asante studied at the Kwame Nkrumah University of Science and Technology before residencies in Berlin and Mexico City. His work bridges traditional Adinkra symbolism with digital glitch aesthetics.',
    profileImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    instagram: '@kofiasante',
    website: 'https://kofiasante.studio',
    location: 'Accra, Ghana',
    specialty: 'Painting & Digital Media',
    artworks: [
      {
        id: 'b1',
        title: 'Coastline No. 7',
        slug: 'coastline-no-7',
        artist: { name: 'Kofi Asante', slug: 'kofi-asante' },
        price: 8400,
        isPriceOnRequest: false,
        images: ['https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=80'],
        category: 'painting',
        inStock: true,
        medium: 'Acrylic on Canvas',
        dimensions: '120 x 150 cm',
        year: 2025,
      },
      {
        id: 'b2',
        title: 'Glitch Adinkra',
        slug: 'glitch-adinkra',
        artist: { name: 'Kofi Asante', slug: 'kofi-asante' },
        price: 12000,
        isPriceOnRequest: false,
        images: ['https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&q=80'],
        category: 'digital',
        inStock: true,
        medium: 'Digital Print on Aluminum',
        dimensions: '100 x 100 cm',
        year: 2025,
      },
      {
        id: 'b3',
        title: 'Elmina Sunset',
        slug: 'elmina-sunset',
        artist: { name: 'Kofi Asante', slug: 'kofi-asante' },
        price: null,
        isPriceOnRequest: true,
        images: ['https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80'],
        category: 'painting',
        inStock: true,
        medium: 'Oil & Acrylic on Linen',
        dimensions: '180 x 220 cm',
        year: 2024,
      },
      {
        id: 'b4',
        title: 'Sankofa Signal',
        slug: 'sankofa-signal',
        artist: { name: 'Kofi Asante', slug: 'kofi-asante' },
        price: 6800,
        isPriceOnRequest: false,
        images: ['https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80'],
        category: 'digital',
        inStock: true,
        medium: 'Generative Print',
        dimensions: '80 x 80 cm',
        year: 2025,
      },
    ],
  },
  {
    id: '3',
    name: 'Amara Okafor',
    slug: 'amara-okafor',
    bio: 'Sculptor and installation artist exploring the relationship between nature and technology through mixed media. Okafor works with recycled electronics, botanical specimens, and resin to create pieces that feel both organic and artificial. Based in Nairobi, she has exhibited at the Zeitz MOCAA and the Lagos Biennial. Her practice asks what it means to be natural in an age of synthetic replication.',
    profileImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    instagram: '@amaraokafor',
    location: 'Nairobi, Kenya',
    specialty: 'Mixed Media Installation',
    artworks: [
      {
        id: 'c1',
        title: 'Synthetic Garden III',
        slug: 'synthetic-garden-iii',
        artist: { name: 'Amara Okafor', slug: 'amara-okafor' },
        price: 9500,
        isPriceOnRequest: false,
        images: ['https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80'],
        category: 'installation',
        inStock: true,
        medium: 'Resin, Circuit Boards, Dried Flora',
        dimensions: '100 x 100 x 30 cm',
        year: 2025,
      },
      {
        id: 'c2',
        title: 'Motherboard Venus',
        slug: 'motherboard-venus',
        artist: { name: 'Amara Okafor', slug: 'amara-okafor' },
        price: null,
        isPriceOnRequest: true,
        images: ['https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=800&q=80'],
        category: 'sculpture',
        inStock: true,
        medium: 'Recycled Electronics & Resin',
        dimensions: '60 x 40 x 35 cm',
        year: 2024,
      },
      {
        id: 'c3',
        title: 'Echoes of Green',
        slug: 'echoes-of-green',
        artist: { name: 'Amara Okafor', slug: 'amara-okafor' },
        price: 7200,
        isPriceOnRequest: false,
        images: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80'],
        category: 'installation',
        inStock: false,
        medium: 'Botanical Resin Cast',
        dimensions: '75 x 75 x 12 cm',
        year: 2025,
      },
    ],
  },
];

export function getArtistBySlug(slug: string): ArtistDetail | undefined {
  return artists.find((a) => a.slug === slug);
}
