import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventId, userEmail, userName, guests } = body;

    // Validate required fields
    if (!eventId || !userEmail || !userName) {
      return NextResponse.json(
        { error: 'Missing required fields: eventId, userEmail, userName' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate guests number
    const guestsCount = parseInt(guests) || 1;
    if (guestsCount < 1 || guestsCount > 10) {
      return NextResponse.json(
        { error: 'Number of guests must be between 1 and 10' },
        { status: 400 }
      );
    }

    // In production, you would:
    // 1. Check if the event exists
    // 2. Check if there are enough remaining tickets
    // 3. Check if the user has already RSVP'd

    // For now, create the RSVP (mock implementation)
    const rsvp = await prisma.eventRsvp.create({
      data: {
        eventId,
        userEmail,
        userName,
        guests: guestsCount,
      },
    });

    // In production, you would:
    // 1. Send a confirmation email
    // 2. Update remaining tickets
    // 3. Add to user's profile

    return NextResponse.json({
      success: true,
      message: 'RSVP saved successfully',
      rsvpId: rsvp.id,
    });
  } catch (error) {
    console.error('RSVP API error:', error);
    
    // Handle Prisma errors
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Failed to save RSVP', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
