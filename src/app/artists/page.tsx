import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function ArtistsPage() {
  const artists = [
    {
      id: '1',
      name: 'Jane Doe',
      slug: 'jane-doe',
      bio: 'Contemporary artist known for vibrant landscape paintings.',
      artworkCount: 12,
    },
    {
      id: '2',
      name: 'John Smith',
      slug: 'john-smith',
      bio: 'Multidisciplinary artist working in painting and digital media.',
      artworkCount: 8,
    },
    {
      id: '3',
      name: 'Emily Chen',
      slug: 'emily-chen',
      bio: 'Sculptor exploring nature and technology relationships.',
      artworkCount: 6,
    },
  ];

  return (
    <div className="min-h-screen py-8 px-container-mobile">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6"
        >
          <ChevronLeft size={20} />
          Back to Home
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-8">
          Artists
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {artists.map((artist) => (
            <Link
              key={artist.id}
              href={`/artists/${artist.slug}`}
              className="bg-surface border border-border-light rounded-lg p-6 hover:shadow-medium transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-xl font-bold text-primary flex-shrink-0">
                  {artist.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-serif text-xl font-semibold text-text-primary mb-1">
                    {artist.name}
                  </h2>
                  <p className="text-sm text-text-secondary mb-2">{artist.bio}</p>
                  <p className="text-sm text-success-gold">{artist.artworkCount} artworks</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
