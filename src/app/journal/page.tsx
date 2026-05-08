import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, User } from 'lucide-react';

const articles = [
  {
    category: 'Artist Stories',
    title: 'The Quiet Revolution of Ngozi Okeke',
    excerpt: 'How one sculptor is redefining bronze for a new generation of collectors. We visit her studio in Enugu.',
    author: 'Kofi Asante',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
  },
  {
    category: 'Living With Art',
    title: 'Curating Light: A Collector\'s Guide',
    excerpt: 'The overlooked art of placing works where morning light becomes part of the composition.',
    author: 'Amara Okafor',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800',
  },
  {
    category: 'Collector Guides',
    title: 'First Acquisition: Where to Begin',
    excerpt: 'A thoughtful framework for buying your first serious piece without second-guessing.',
    author: 'Priya Naidoo',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
  },
  {
    category: 'Culture Essays',
    title: 'Why African Art Is the Next Blue Chip',
    excerpt: 'Market analysis and cultural momentum point to a generational shift in collecting priorities.',
    author: 'David Mensah',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800',
  },
  {
    category: 'Space Inspiration',
    title: 'The Executive Suite as Gallery',
    excerpt: 'How leading CEOs are using art to signal culture, ambition, and taste in their offices.',
    author: 'Kofi Asante',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
  },
  {
    category: 'Heritage Narratives',
    title: 'The Language of Adinkra in Modern Sculpture',
    excerpt: 'Contemporary artists are returning to Adinkra symbols—and collectors are paying attention.',
    author: 'Amara Okafor',
    readTime: '9 min',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800',
  },
];

const categories = ['All', 'Artist Stories', 'Living With Art', 'Culture Essays', 'Collector Guides', 'Space Inspiration', 'Heritage Narratives'];

export default function JournalPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-andy-black">
        <Image
          src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=1920"
          alt="The Journal"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 cinematic-overlay" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-andy-gold text-xs uppercase tracking-[0.3em] mb-4 font-medium">Authority Engine</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-andy-ivory mb-4 editorial-headline">
            The Journal
          </h1>
          <p className="text-base md:text-lg text-andy-ivory/60 max-w-2xl mx-auto leading-relaxed">
            Stories, guides, and essays on collecting, culture, and living with art.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20 md:py-28 px-4 bg-andy-ivory">
        <div className="max-w-6xl mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-5 py-2 rounded-full border border-andy-stone/30 bg-white text-sm font-medium text-andy-bronze hover:bg-andy-black hover:text-andy-ivory transition-all"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured */}
          <Link href="#" className="group block mb-12">
            <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-white border border-andy-stone/30 hover:border-andy-gold/30 hover:shadow-premium transition-all duration-500">
              <div className="relative aspect-[16/10] md:aspect-auto">
                <Image
                  src={articles[0].image}
                  alt={articles[0].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="50vw"
                  loading="eager"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <p className="text-andy-gold text-xs uppercase tracking-wider font-medium mb-3">{articles[0].category}</p>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-andy-black mb-4 group-hover:text-andy-bronze transition-colors">
                  {articles[0].title}
                </h2>
                <p className="text-andy-bronze leading-relaxed mb-6">{articles[0].excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-andy-bronze">
                  <span className="flex items-center gap-1"><User size={12} /> {articles[0].author}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {articles[0].readTime}</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(1).map((article) => (
              <Link key={article.title} href="#" className="group">
                <div className="bg-white rounded-2xl overflow-hidden border border-andy-stone/30 hover:border-andy-gold/30 hover:shadow-premium transition-all duration-500">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="33vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-andy-gold text-xs uppercase tracking-wider font-medium mb-2">{article.category}</p>
                    <h3 className="font-serif text-lg font-bold text-andy-black mb-2 group-hover:text-andy-bronze transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-andy-bronze leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-andy-bronze">
                      <span className="flex items-center gap-1"><User size={12} /> {article.author}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
