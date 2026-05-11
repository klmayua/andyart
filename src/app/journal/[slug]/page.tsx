import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getArticleBySlug } from '@/lib/journal';
import JournalArticleClient from './JournalArticleClient';

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
  if (!article) notFound();
  return <JournalArticleClient />;
}