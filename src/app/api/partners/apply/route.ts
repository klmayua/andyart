import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      businessName, 
      contactName, 
      email, 
      phone, 
      partnerType, 
      message,
      website 
    } = body;

    // Validate required fields
    if (!businessName || !contactName || !email || !phone || !partnerType) {
      return NextResponse.json(
        { error: 'Missing required fields: businessName, contactName, email, phone, partnerType' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate partner type
    const validPartnerTypes = ['interior_designer', 'corporate', 'venue', 'other'];
    if (!validPartnerTypes.includes(partnerType)) {
      return NextResponse.json(
        { error: 'Invalid partner type' },
        { status: 400 }
      );
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone format' },
        { status: 400 }
      );
    }

    // Create the application
    const application = await prisma.partnerApplication.create({
      data: {
        businessName,
        contactName,
        email,
        phone,
        partnerType,
        message: message || null,
        status: 'pending',
      },
    });

    // In production, you would:
    // 1. Send a confirmation email to the applicant
    // 2. Notify the admin team
    // 3. Add to CRM system

    return NextResponse.json({
      success: true,
      applicationId: application.id,
      status: application.status,
      message: 'Application submitted successfully. We will review and contact you within 2-3 business days.',
    });
  } catch (error) {
    console.error('Partner application API error:', error);
    
    // Handle Prisma errors
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Failed to submit application', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
