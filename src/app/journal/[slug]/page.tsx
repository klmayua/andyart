import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock, User, Share2, Bookmark, MessageCircle } from 'lucide-react';
import { getArticleBySlug, getRelatedArticles, getAdjacentArticles } from '@/lib/journal';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    return { title: 'Article Not Found | AndyArt Journal' };
  }
  return {
    title: `${article.title} | AndyArt Journal`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      authors: [article.author],
      publishedTime: article.publishedAt,
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default function JournalArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(params.slug, 3);
  const { previous, next } = getAdjacentArticles(params.slug);

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
          {/* Category Badge */}
          <span
            className="inline-block text-xs font-semibold tracking-[0.12em] uppercase mb-6"
            style={{ color: '#A57B3A' }}
          >
            {article.category}
          </span>

          {/* Title */}
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

          {/* Excerpt */}
          <p className="text-xl text-[#5D5245] leading-relaxed mb-8" style={{ maxWidth: '640px' }}>
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-[#7A6E60] mb-10">
            <span className="flex items-center gap-2">
              <User size={14} />
              {article.author}
              <span className="text-[#A57B3A]">· {article.authorTitle}</span>
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} />
              {article.readTime}
            </span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>

          {/* Hero Image */}
          <div
            className="relative w-full overflow-hidden mb-16"
            style={{ height: 'clamp(320px, 40vh, 520px)', borderRadius: '28px' }}
          >
            <Image
              src={article.heroImage}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 900px) 100vw, 860px"
              priority
            />
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="px-4 pb-20">
        <div className="max-w-[720px] mx-auto">
          {article.content.map((block, idx) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <p
                    key={idx}
                    className="text-[#3f372f]"
                    style={{
                      fontSize: '20px',
                      lineHeight: 1.95,
                      marginBottom: '28px',
                    }}
                  >
                    {block.text}
                  </p>
                );
              case 'heading':
                return (
                  <h2
                    key={idx}
                    className="font-serif font-semibold text-[#171410]"
                    style={{
                      fontSize: '34px',
                      marginTop: '60px',
                      marginBottom: '24px',
                      lineHeight: 1.1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {block.text}
                  </h2>
                );
              case 'quote':
                return (
                  <blockquote
                    key={idx}
                    className="my-10"
                    style={{
                      borderLeft: '3px solid #C6A66B',
                      background: 'rgba(198,166,107,.06)',
                      padding: '28px',
                      borderRadius: '20px',
                    }}
                  >
                    <p
                      className="font-serif text-[#171410] italic"
                      style={{ fontSize: '24px', lineHeight: 1.6 }}
                    >
                      "{block.text}"
                    </p>
                  </blockquote>
                );
              case 'image':
                return (
                  <figure key={idx} className="my-12">
                    <div
                      className="relative w-full overflow-hidden"
                      style={{ height: 'clamp(240px, 30vh, 400px)', borderRadius: '20px' }}
                    >
                      <Image
                        src={block.src!}
                        alt={block.alt!}
                        fill
                        className="object-cover"
                        sizes="(max-width: 900px) 100vw, 720px"
                        loading="lazy"
                      />
                    </div>
                    {block.caption && (
                      <figcaption className="text-center text-sm text-[#7A6E60] mt-3">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              case 'divider':
                return (
                  <div key={idx} className="flex items-center justify-center my-14">
                    <div className="w-16 h-px bg-[#C6A66B]" />
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </article>

      {/* Tags */}
      <section className="px-4 pb-8">
        <div className="max-w-[720px] mx-auto">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full text-sm font-medium"
                style={{
                  background: 'rgba(198,166,107,.10)',
                  color: '#A57B3A',
                  border: '1px solid rgba(198,166,107,.18)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Share Bar */}
      <section className="px-4 pb-16">
        <div className="max-w-[720px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors"
              style={{
                background: 'rgba(198,166,107,.10)',
                color: '#A57B3A',
                border: '1px solid rgba(198,166,107,.18)',
              }}
            >
              <Share2 size={14} />
              Share
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors"
              style={{
                background: 'rgba(198,166,107,.10)',
                color: '#A57B3A',
                border: '1px solid rgba(198,166,107,.18)',
              }}
            >
              <Bookmark size={14} />
              Save
            </button>
          </div>
          <Link
            href="/consult"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
            style={{
              background: '#171410',
              color: '#FFFDF9',
            }}
          >
            <MessageCircle size={14} />
            Discuss with Concierge
          </Link>
        </div>
      </section>

      {/* Previous / Next */}
      {(previous || next) && (
        <section className="px-4 pb-16">
          <div className="max-w-[860px] mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {previous && (
                <Link
                  href={`/journal/${previous.slug}`}
                  className="group flex flex-col p-6 rounded-2xl transition-all"
                  style={{
                    background: 'rgba(255,255,255,.60)',
                    border: '1px solid rgba(198,166,107,.16)',
                    backdropFilter: 'blur(18px)',
                  }}
                >
                  <span className="text-xs text-[#A57B3A] font-medium mb-2 flex items-center gap-1">
                    <ArrowLeft size={12} /> Previous
                  </span>
                  <h3 className="font-serif font-semibold text-[#171410] text-lg group-hover:text-[#A57B3A] transition-colors">
                    {previous.title}
                  </h3>
                </Link>
              )}
              {next && (
                <Link
                  href={`/journal/${next.slug}`}
                  className="group flex flex-col p-6 rounded-2xl transition-all md:items-end md:text-right"
                  style={{
                    background: 'rgba(255,255,255,.60)',
                    border: '1px solid rgba(198,166,107,.16)',
                    backdropFilter: 'blur(18px)',
                  }}
                >
                  <span className="text-xs text-[#A57B3A] font-medium mb-2 flex items-center gap-1 md:flex-row-reverse">
                    Next <ArrowRight size={12} />
                  </span>
                  <h3 className="font-serif font-semibold text-[#171410] text-lg group-hover:text-[#A57B3A] transition-colors">
                    {next.title}
                  </h3>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="px-4 pb-24">
          <div className="max-w-[860px] mx-auto">
            <h2
              className="font-serif font-semibold text-[#171410] mb-10"
              style={{ fontSize: '34px', letterSpacing: '-0.02em' }}
            >
              Related Stories
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link key={rel.slug} href={`/journal/${rel.slug}`} className="group">
                  <div
                    className="flex flex-col overflow-hidden rounded-2xl transition-all"
                    style={{
                      background: 'rgba(255,255,255,.60)',
                      border: '1px solid rgba(198,166,107,.16)',
                      backdropFilter: 'blur(18px)',
                      boxShadow: '0 24px 80px rgba(58,42,24,.08)',
                    }}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={rel.heroImage}
                        alt={rel.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="33vw"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-[#A57B3A] font-medium mb-2">{rel.category}</p>
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

      {/* Newsletter Signup */}
      <section className="px-4 pb-24">
        <div className="max-w-[720px] mx-auto text-center">
          <div
            className="rounded-2xl p-10 md:p-14"
            style={{
              background: 'rgba(255,255,255,.60)',
              border: '1px solid rgba(198,166,107,.16)',
              backdropFilter: 'blur(18px)',
            }}
          >
            <h3 className="font-serif font-semibold text-[#171410] text-2xl mb-3">
              Stay in the conversation
            </h3>
            <p className="text-[#7A6E60] mb-6" style={{ maxWidth: '480px', margin: '0 auto 24px' }}>
              New stories, collector guides, and artist profiles delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-5 py-3 rounded-full text-sm bg-white border border-[#D7CEC1] focus:outline-none focus:ring-2 focus:ring-[#C6A66B]/30"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full text-sm font-semibold bg-[#171410] text-[#FFFDF9] hover:bg-[#2a2520] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
