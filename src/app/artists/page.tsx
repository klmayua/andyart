import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ArtistsPage() {
  const artists = [
    {
      id: '1',
      name: 'Ngozi Okeke',
      slug: 'ngozi-okeke',
      bio: 'Contemporary sculptor working in bronze and reclaimed timber. Her work explores identity, memory, and the quiet strength of women across generations.',
      artworkCount: 12,
    },
    {
      id: '2',
      name: 'Kofi Asante',
      slug: 'kofi-asante',
      bio: 'Multidisciplinary artist working in painting and digital media. Known for bold color fields and abstract landscapes.',
      artworkCount: 8,
    },
    {
      id: '3',
      name: 'Amara Okafor',
      slug: 'amara-okafor',
      bio: 'Sculptor exploring nature and technology relationships through mixed media installations.',
      artworkCount: 6,
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="text-andy-bronze text-xs uppercase tracking-[0.25em] mb-2 font-medium">Our Artists</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-andy-black editorial-headline mb-3">
            Artists
          </h1>
          <p className="text-andy-bronze max-w-xl leading-relaxed">
            Exceptional voices from across Africa and the diaspora. Each artist is personally selected by our curation team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {artists.map((artist) => (
            <Link
              key={artist.id}
              href={`/artists/${artist.slug}`}
              className="bg-white border border-andy-stone/30 rounded-2xl p-6 hover:border-andy-gold/30 hover:shadow-premium transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-andy-stone/30 rounded-full flex items-center justify-center text-xl font-bold text-andy-black flex-shrink-0">
                  {artist.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-serif text-xl font-semibold text-andy-black mb-1 group-hover:text-andy-bronze transition-colors">
                    {artist.name}
                  </h2>
                  <p className="text-sm text-andy-bronze mb-2 leading-relaxed">{artist.bio}</p>
                  <p className="text-sm text-andy-gold font-medium">{artist.artworkCount} works</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
