import { notFound } from 'next/navigation';
import { getArtworkBySlug } from '@/data/artworks';
import GalleryDetailClient from './GalleryDetailClient';

export default function ArtworkDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const artwork = getArtworkBySlug(slug);

  if (!artwork) notFound();

  return <GalleryDetailClient artwork={artwork} />;
}