import Link from 'next/link';
import Image from 'next/image';

export default function ArtistsPage() {
  const data = {
    label: 'Our Artists',
    title: 'Artists',
    description: 'Exceptional voices from across Africa and the diaspora. Each artist is personally selected by our curation team.'
  };

  const artists = [
    {
      id: '1',
      name: 'Ngozi Okeke',
      slug: 'ngozi-okeke',
      bio: 'Contemporary sculptor working in bronze and reclaimed timber. Her work explores identity, memory, and the quiet strength of women across generations.',
      artworkCount: 12,
      featured: true,
      location: 'Enugu, Nigeria',
    },
    {
      id: '2',
      name: 'Kofi Asante',
      slug: 'kofi-asante',
      bio: 'Multidisciplinary artist working in painting and digital media. Known for bold color fields and abstract landscapes.',
      artworkCount: 8,
      featured: true,
      location: 'Accra, Ghana',
    },
    {
      id: '3',
      name: 'Amara Okafor',
      slug: 'amara-okafor',
      bio: 'Sculptor exploring nature and technology relationships through mixed media installations.',
      artworkCount: 6,
      featured: false,
      location: 'Lagos, Nigeria',
    },
    {
      id: '4',
      name: 'Fatoumata Diallo',
      slug: 'fatoumata-diallo',
      bio: 'Textile artist weaving contemporary narratives from traditional West African techniques.',
      artworkCount: 15,
      featured: false,
      location: 'Dakar, Senegal',
    },
    {
      id: '5',
      name: 'Theo Mokoena',
      slug: 'theo-mokoena',
      bio: 'Photographer and visual artist documenting urban landscapes across African cities.',
      artworkCount: 20,
      featured: true,
      location: 'Johannesburg, South Africa',
    },
    {
      id: '6',
      name: 'Zara Al-Fayed',
      slug: 'zara-al-fayed',
      bio: 'Mixed media artist combining calligraphy with contemporary abstract expressionism.',
      artworkCount: 9,
      featured: false,
      location: 'Cairo, Egypt',
    },
  ];

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <p className="section-label animate-fade-in-up">{data.label}</p>
          <h1 className="display-lg mb-6 text-[#171614] animate-fade-in-up delay-1">
            {data.title}
          </h1>
          <p className="text-md max-w-2xl leading-relaxed animate-fade-in-up delay-2" style={{ color: 'rgba(93, 70, 51, 0.8)' }}>
            {data.description}
          </p>
        </div>

        {/* Featured Artist */}
        {artists.filter(a => a.featured)[0] && (
          <div className="mb-20 animate-fade-in-up delay-3">
            <p className="text-sm font-semibold mb-6" style={{ color: '#A78345', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Featured Artist
            </p>
            <Link
              href={`/artists/${artists.filter(a => a.featured)[0].slug}`}
              className="grid md:grid-cols-2 gap-8 items-center glass-card p-6 md:p-8 rounded-2xl"
            >
              <div className="relative aspect-square md:aspect-auto md:h-[400px] rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C6A66B 0%, #A78345 100%)' }}>
                  <span className="font-serif text-8xl md:text-9xl font-bold text-white/20">
                    {artists.filter(a => a.featured)[0].name.charAt(0)}
                  </span>
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm" style={{ color: '#A78345', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  {artists.filter(a => a.featured)[0].location}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#171614] mb-4 leading-tight">
                  {artists.filter(a => a.featured)[0].name}
                </h2>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(93, 70, 51, 0.85)' }}>
                  {artists.filter(a => a.featured)[0].bio}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium" style={{ color: '#C6A66B' }}>
                    View Collection
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#C6A66B' }}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Artists Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((artist, idx) => (
            <Link
              key={artist.id}
              href={`/artists/${artist.slug}`}
              className="group card-postmodern overflow-hidden"
              style={{ animationDelay: `${(idx % 3) * 0.1}s` }}
            >
              <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-6xl md:text-7xl font-bold text-gray-300 group-hover:text-gray-400 transition-colors">
                    {artist.name.charAt(0)}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: 'rgba(23, 22, 20, 0.9)', color: '#C6A66B' }}>
                    {artist.featured ? 'Featured' : 'Established'}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs mb-2" style={{ color: '#A78345', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  {artist.location}
                </p>
                <h3 className="font-serif text-xl font-bold text-[#171614] mb-2 group-hover:text-[#C6A66B] transition-colors leading-tight">
                  {artist.name}
                </h3>
                <p className="text-sm mb-4 line-clamp-2 leading-relaxed" style={{ color: 'rgba(93, 70, 51, 0.7)' }}>
                  {artist.bio}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium" style={{ color: '#C6A66B' }}>
                    {artist.artworkCount} works
                  </span>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center transition-all group-hover:translate-x-1" style={{ background: 'rgba(23, 22, 20, 0.1)' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#171614]">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}