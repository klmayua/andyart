import Link from 'next/link';
import Image from 'next/image';
import { Clock, User, ArrowRight } from 'lucide-react';
import { journalArticles } from '@/data/journal';
import { getAllCategories } from '@/lib/journal';

export default function JournalPage() {
  const categories = getAllCategories();
  const featured = journalArticles.find((a) => a.featured) || journalArticles[0];
  const gridArticles = journalArticles.filter((a) => a.slug !== featured.slug);

  return (
    <div className="min-h-screen">
      {/* Hero - Dark Theme */}
      <section
        className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden"
        style={{ background: '#171614' }}
      >
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=1920"
            alt="The Journal"
            fill
            className="object-cover opacity-15"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171614] via-[#171614]/70 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="section-label animate-fade-in-up" style={{ color: '#C6A66B' }}>Authority Engine</p>
          <h1 className="display-lg text-white mb-6 animate-fade-in-up delay-1">
            The Journal
          </h1>
          <p className="text-md max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-2" style={{ color: 'rgba(255,253,249,0.6)' }}>
            Stories, guides, and essays on collecting, culture, and living with art.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20 md:py-28 px-4" style={{ background: 'var(--warm-ivory)' }}>
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                className="postmodern-label px-5 py-2 text-sm transition-all border hover:bg-[#171614] hover:text-[#FFFDF9]"
                style={{ background: 'white', borderColor: 'rgba(23,22,20,0.1)', color: '#5D4633' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured */}
          <Link href={`/journal/${featured.slug}`} className="group block mb-12">
            <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-white border card-postmodern">
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
                <p className="text-xs uppercase tracking-wider font-medium mb-3" style={{ color: '#C6A66B' }}>{featured.category}</p>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#171614] mb-4 group-hover:text-[#A78345] transition-colors leading-tight">
                  {featured.title}
                </h2>
                <p className="leading-relaxed mb-6" style={{ color: 'rgba(93,70,51,0.8)' }}>{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs" style={{ color: 'rgba(93,70,51,0.6)' }}>
                  <span className="flex items-center gap-1"><User size={12} /> {featured.author}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {featured.readTime}</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridArticles.map((article, idx) => (
              <Link key={article.slug} href={`/journal/${article.slug}`} className="group animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="bg-white rounded-2xl overflow-hidden border card-postmodern" style={{ borderColor: 'rgba(23,22,20,0.06)' }}>
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
                    <p className="text-xs uppercase tracking-wider font-medium mb-2" style={{ color: '#C6A66B' }}>{article.category}</p>
                    <h3 className="font-serif text-lg font-bold text-[#171614] mb-2 group-hover:text-[#A78345] transition-colors leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: 'rgba(93,70,51,0.7)' }}>{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs" style={{ color: 'rgba(93,70,51,0.6)' }}>
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