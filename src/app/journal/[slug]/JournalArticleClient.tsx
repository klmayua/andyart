'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Clock, User, Share2, Bookmark, MessageCircle } from 'lucide-react';
import { getArticleBySlug, getRelatedArticles, getAdjacentArticles } from '@/lib/journal';
import JournalArticleNewsletter from '@/components/newsletter/JournalArticleNewsletter';

export default function JournalArticleClient() {
  const params = useParams();
  const slug = params.slug as string;
  const article = getArticleBySlug(slug);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  if (!article) return null;

  const related = getRelatedArticles(slug, 3);
  const { previous, next } = getAdjacentArticles(slug);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen" style={{ background: '#F8F4EC' }}>
      {/* Breadcrumb */}
      <div className="relative z-10 px-4 pt-8 pb-4">
        <div className="max-w-[860px] mx-auto">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-sm text-[#A57B3A] hover:text-[#8A6B3A] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Journal
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative px-4 pb-12">
        <div className="max-w-[860px] mx-auto">
          <span
            className="inline-block text-xs font-semibold tracking-[0.12em] uppercase mb-6"
            style={{ color: '#A57B3A' }}
          >
            {article.category}
          </span>

          <h1
            className="font-serif font-[650] text-[#171410] editorial-headline mb-6"
            style={{
              fontSize: 'clamp(46px, 5vw, 74px)',
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
            }}
          >
            {article.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-[#7A6E60] mb-8">
            <div className="flex items-center gap-2">
              <User size={14} />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>{article.readTime} min read</span>
            </div>
            <span>{formatDate(article.publishedAt)}</span>
          </div>

          {article.heroImage && (
            <div className="relative w-full rounded-2xl overflow-hidden mb-10 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <div style={{ paddingBottom: '52%' }} />
              <Image
                src={article.heroImage}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 860px) 100vw, 860px"
                priority
              />
            </div>
          )}
        </div>
      </section>

      {/* Article Body */}
      <section className="px-4 mb-12">
        <div className="max-w-[680px] mx-auto">
          <div
            className="text-[#3D3630] leading-[1.85] text-[17px] space-y-6"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-xs bg-[#F0EBE2] text-[#7A6E60] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-8 mt-10 border-t border-[rgba(61,54,48,0.10)]">
            <button className="flex items-center gap-2 text-sm text-[#7A6E60] hover:text-[#171410] transition-colors">
              <Bookmark size={16} />
              <span>Save for later</span>
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigator.share?.({ title: article.title, url: window.location.href })}
                className="flex items-center gap-2 text-sm text-[#7A6E60] hover:text-[#171410] transition-colors"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl || '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#7A6E60] hover:text-[#171410] transition-colors"
              >
                <MessageCircle size={16} />
                <span>Discuss</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="px-4 pb-16">
          <div className="max-w-[860px] mx-auto">
            <h2 className="font-serif text-2xl font-bold text-[#171410] mb-8">Continue Reading</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link key={rel.slug} href={`/journal/${rel.slug}`} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-shadow duration-500">
                    {rel.heroImage && (
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image src={rel.heroImage} alt={rel.title} fill sizes="33vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
                      </div>
                    )}
                    <div className="p-5">
                      <p className="text-[11px] text-[#A57B3A] font-semibold tracking-[0.08em] uppercase mb-2">{rel.category}</p>
                      <h3 className="font-serif font-semibold text-[#171410] text-base group-hover:text-[#A57B3A] transition-colors">
                        {rel.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="px-4 pb-8">
        <div className="max-w-[860px] mx-auto">
          <div className="grid grid-cols-2 gap-4">
            {previous ? (
              <Link href={`/journal/${previous.slug}`} className="group flex flex-col p-5 bg-white rounded-xl border border-[rgba(61,54,48,0.08)] hover:border-[rgba(198,166,107,0.30)] transition-all">
                <span className="text-xs text-[#7A6E60] mb-2 flex items-center gap-1"><ArrowLeft size={12} /> Previous</span>
                <span className="font-serif text-sm font-semibold text-[#171410] group-hover:text-[#A57B3A] transition-colors">{previous.title}</span>
              </Link>
            ) : <div />}
            {next && (
              <Link href={`/journal/${next.slug}`} className="group flex flex-col items-end p-5 bg-white rounded-xl border border-[rgba(61,54,48,0.08)] hover:border-[rgba(198,166,107,0.30)] transition-all text-right">
                <span className="text-xs text-[#7A6E60] mb-2 flex items-center gap-1">Next <ArrowRight size={12} /></span>
                <span className="font-serif text-sm font-semibold text-[#171410] group-hover:text-[#A57B3A] transition-colors">{next.title}</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      <JournalArticleNewsletter articleTitle={article.title} />
    </div>
  );
}