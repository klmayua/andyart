import { NextRequest, NextResponse } from 'next/server';
import { ArtistRepository } from '@/lib/repositories';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    if (id) {
      const artist = await ArtistRepository.findById(id);
      if (!artist) {
        return NextResponse.json({ error: 'Artist not found' }, { status: 404 });
      }
      return NextResponse.json({ artist });
    }

    if (slug) {
      const artist = await ArtistRepository.findBySlug(slug);
      if (!artist) {
        return NextResponse.json({ error: 'Artist not found' }, { status: 404 });
      }
      return NextResponse.json({ artist });
    }

    const artists = await ArtistRepository.findAll({ status: status || undefined, limit, offset });
    return NextResponse.json({ artists });
  } catch (error) {
    console.error('Artist API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
