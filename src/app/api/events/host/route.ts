import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      organization,
      eventType,
      expectedGuests,
      preferredDate,
      message,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const application = await prisma.partnerApplication.create({
      data: {
        businessName: organization || 'Private Event',
        contactName: name,
        email,
        phone: phone || 'Not provided',
        partnerType: 'venue',
        message: [
          `Event type: ${eventType || 'Not specified'}`,
          expectedGuests ? `Expected guests: ${expectedGuests}` : '',
          preferredDate ? `Preferred date: ${preferredDate}` : '',
          message || '',
        ].filter(Boolean).join('\n'),
        status: 'pending',
      },
    });

    return NextResponse.json({
      success: true,
      applicationId: application.id,
      status: application.status,
      message: 'Event hosting request submitted successfully. Our experiences team will contact you within 2-3 business days.',
    });
  } catch (error) {
    console.error('Events host API error:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Failed to submit event request', details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
