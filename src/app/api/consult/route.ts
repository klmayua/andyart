import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      preferredDate,
      preferredTime,
      serviceType,
      message,
    } = body;

    if (!name || !email || !preferredDate) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, preferredDate' },
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

    const preferredDateTime = new Date(preferredDate);
    if (preferredDateTime < new Date()) {
      return NextResponse.json(
        { error: 'Preferred date must be in the future' },
        { status: 400 }
      );
    }

    const application = await prisma.partnerApplication.create({
      data: {
        businessName: serviceType || 'General Consultation',
        contactName: name,
        email,
        phone: phone || 'Not provided',
        partnerType: 'other',
        message: message
          ? `Preferred time: ${preferredTime || 'Any'}\n\n${message}`
          : `Preferred time: ${preferredTime || 'Any'}`,
        status: 'pending',
      },
    });

    return NextResponse.json({
      success: true,
      applicationId: application.id,
      status: application.status,
      message: 'Consultation request submitted successfully. Our concierge team will contact you within 24 hours.',
    });
  } catch (error) {
    console.error('Consult API error:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Failed to submit consultation', details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
