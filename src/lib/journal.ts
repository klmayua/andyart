import { journalArticles, type JournalArticle } from '@/data/journal';

export function getAllArticles(): JournalArticle[] {
  return journalArticles;
}

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return journalArticles.find((article) => article.slug === slug);
}

export function getFeaturedArticle(): JournalArticle | undefined {
  return journalArticles.find((article) => article.featured);
}

export function getRelatedArticles(currentSlug: string, count: number = 3): JournalArticle[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return [];

  return journalArticles
    .filter((article) => article.slug !== currentSlug)
    .sort((a, b) => {
      const aScore = a.category === current.category ? 2 : a.tags.some((tag) => current.tags.includes(tag)) ? 1 : 0;
      const bScore = b.category === current.category ? 2 : b.tags.some((tag) => current.tags.includes(tag)) ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, count);
}

export function getArticlesByCategory(category: string): JournalArticle[] {
  if (category === 'All') return journalArticles;
  return journalArticles.filter((article) => article.category === category);
}

export function getAllCategories(): string[] {
  const categories = new Set(journalArticles.map((a) => a.category));
  return ['All', ...Array.from(categories)];
}

export function getAdjacentArticles(slug: string): { previous: JournalArticle | null; next: JournalArticle | null } {
  const index = journalArticles.findIndex((a) => a.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: index > 0 ? journalArticles[index - 1] : null,
    next: index < journalArticles.length - 1 ? journalArticles[index + 1] : null,
  };
}
