import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/artworks - Get paginated list of artworks
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const artistId = searchParams.get('artistId');

    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {
      inStock: true,
    };

    if (category) {
      where.category = category;
    }

    if (artistId) {
      where.artistId = artistId;
    }

    const [artworks, total] = await Promise.all([
      prisma.artwork.findMany({
        where,
        skip,
        take: limit,
        include: {
          artist: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.artwork.count({ where }),
    ]);

    return NextResponse.json({
      artworks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Artworks API error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Failed to fetch artworks', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
