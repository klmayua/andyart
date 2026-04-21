import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      serviceId, 
      customerName, 
      customerEmail, 
      customerPhone, 
      preferredDate, 
      message 
    } = body;

    // Validate required fields
    if (!serviceId || !customerName || !customerEmail || !preferredDate) {
      return NextResponse.json(
        { error: 'Missing required fields: serviceId, customerName, customerEmail, preferredDate' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate date is in the future
    const preferredDateTime = new Date(preferredDate);
    if (preferredDateTime < new Date()) {
      return NextResponse.json(
        { error: 'Preferred date must be in the future' },
        { status: 400 }
      );
    }

    // In production, you would:
    // 1. Check if the service exists and is active
    // 2. Check availability for the requested date
    // 3. Send confirmation to Cal.com or similar service

    // Create the booking (mock implementation)
    const booking = await prisma.serviceBooking.create({
      data: {
        serviceId,
        customerName,
        customerEmail,
        customerPhone: customerPhone || null,
        preferredDate: preferredDateTime,
        message: message || null,
        status: 'pending',
      },
    });

    // In production, you would:
    // 1. Send a confirmation email
    // 2. Notify the service provider
    // 3. Add to customer's profile

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      status: booking.status,
      message: 'Booking request submitted successfully',
    });
  } catch (error) {
    console.error('Service booking API error:', error);
    
    // Handle Prisma errors
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Failed to create booking', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
