import ArtworkCard from '@/components/ArtworkCard';

// Mock data - will be replaced with API call
const artworks = [
  {
    id: '1',
    title: 'Sunset Over Mountains',
    slug: 'sunset-over-mountains',
    artist: { name: 'Jane Doe', slug: 'jane-doe' },
    price: 2500,
    isPriceOnRequest: false,
    images: ['/placeholder-artwork.jpg'],
    category: 'painting',
    inStock: true,
  },
  {
    id: '2',
    title: 'Urban Dreams',
    slug: 'urban-dreams',
    artist: { name: 'John Smith', slug: 'john-smith' },
    price: 3200,
    isPriceOnRequest: false,
    images: ['/placeholder-artwork.jpg'],
    category: 'painting',
    inStock: true,
  },
  {
    id: '3',
    title: 'Abstract Emotions',
    slug: 'abstract-emotions',
    artist: { name: 'Jane Doe', slug: 'jane-doe' },
    isPriceOnRequest: true,
    price: null,
    images: ['/placeholder-artwork.jpg'],
    category: 'abstract',
    inStock: true,
  },
  {
    id: '4',
    title: 'Ocean Waves',
    slug: 'ocean-waves',
    artist: { name: 'Emily Chen', slug: 'emily-chen' },
    price: 1800,
    isPriceOnRequest: false,
    images: ['/placeholder-artwork.jpg'],
    category: 'painting',
    inStock: true,
  },
  {
    id: '5',
    title: 'City Lights',
    slug: 'city-lights',
    artist: { name: 'John Smith', slug: 'john-smith' },
    price: 4500,
    isPriceOnRequest: false,
    images: ['/placeholder-artwork.jpg'],
    category: 'photography',
    inStock: true,
  },
  {
    id: '6',
    title: 'Nature\'s Whisper',
    slug: 'natures-whisper',
    artist: { name: 'Emily Chen', slug: 'emily-chen' },
    isPriceOnRequest: true,
    price: null,
    images: ['/placeholder-artwork.jpg'],
    category: 'sculpture',
    inStock: false,
  },
];

const categories = ['All', 'painting', 'sculpture', 'digital', 'photography', 'abstract', 'mixed media'];

export default function GalleryPage() {
  return (
    <div className="min-h-screen py-8 px-container-mobile">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Gallery
          </h1>
          <p className="text-text-secondary">
            Discover exceptional artwork from emerging and established artists.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-pill border border-border-light bg-surface text-sm font-medium text-text-secondary hover:bg-primary hover:text-surface transition-colors"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Artwork Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} {...artwork} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="bg-surface border border-border-light px-8 py-3 rounded-md font-medium text-text-primary hover:bg-background transition-colors">
            Load More Artworks
          </button>
        </div>
      </div>
    </div>
  );
}
