import ViewingRoomDetailClient from './ViewingRoomDetailClient';

export default function ViewingRoomDetailPage({ params }: { params: { slug: string } }) {
  return <ViewingRoomDetailClient slug={params.slug} />;
}
