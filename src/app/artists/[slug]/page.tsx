import { notFound } from 'next/navigation';
import ArtistDetailClient from './ArtistDetailClient';

export default function ArtistDetailPage({ params }: { params: { slug: string } }) {
  return <ArtistDetailClient slug={params.slug} />;
}
