import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, User } from 'lucide-react';
import { journalArticles } from '@/data/journal';
import { getAllCategories } from '@/lib/journal';
import JournalNewsletter from '@/components/newsletter/JournalNewsletter';

export default function JournalPage() {
  const categories = getAllCategories();
  const featured = journalArticles.find((a) => a.featured) || journalArticles[0];
  const gridArticles = journalArticles.filter((a) => a.slug !== featured.slug);

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
          <Link href={`/journal/${featured.slug}`} className="group block mb-12">
            <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-white border border-andy-stone/30 hover:border-andy-gold/30 hover:shadow-premium transition-all duration-500">
              <div className="relative aspect-[16/10] md:aspect-auto">
                <Image
                  src={featured.heroImage}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="50vw"
                  loading="eager"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <p className="text-andy-gold text-xs uppercase tracking-wider font-medium mb-3">{featured.category}</p>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-andy-black mb-4 group-hover:text-andy-bronze transition-colors">
                  {featured.title}
                </h2>
                <p className="text-andy-bronze leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-andy-bronze">
                  <span className="flex items-center gap-1"><User size={12} /> {featured.author}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {featured.readTime}</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridArticles.map((article) => (
              <Link key={article.slug} href={`/journal/${article.slug}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden border border-andy-stone/30 hover:border-andy-gold/30 hover:shadow-premium transition-all duration-500">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.heroImage}
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

      <JournalNewsletter />
    </div>
  );
}
