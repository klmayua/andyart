import { NextRequest, NextResponse } from 'next/server';
import { stripe, createCheckoutSession } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { artworkId, quantity = 1, userEmail } = body;

    // Validate required fields
    if (!artworkId || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: artworkId, userEmail' },
        { status: 400 }
      );
    }

    // Get artwork details
    const artwork = await prisma.artwork.findUnique({
      where: { id: artworkId },
      include: {
        artist: true,
      },
    });

    if (!artwork) {
      return NextResponse.json(
        { error: 'Artwork not found' },
        { status: 404 }
      );
    }

    if (!artwork.inStock) {
      return NextResponse.json(
        { error: 'Artwork is not available for purchase' },
        { status: 400 }
      );
    }

    if (artwork.isPriceOnRequest || !artwork.price) {
      return NextResponse.json(
        { error: 'This artwork is price on request. Please contact us for pricing.' },
        { status: 400 }
      );
    }

    // Get artwork image (use first image or placeholder)
    const images = artwork.images as string[];
    const image = images?.[0] || 'https://via.placeholder.com/400x500';

    // Create Stripe checkout session
    const session = await createCheckoutSession({
      artworkId,
      title: artwork.title,
      price: artwork.price,
      image,
      successUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/profile/orders?success=true`,
      cancelUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/gallery/${artwork.slug}?canceled=true`,
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Checkout API error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Failed to create checkout session', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
