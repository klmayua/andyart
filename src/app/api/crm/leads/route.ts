import { NextRequest, NextResponse } from 'next/server';
import { LeadRepository } from '@/lib/repositories';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const temperature = searchParams.get('temperature');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '100');

    if (id) {
      const lead = await LeadRepository.findById(id);
      if (!lead) {
        return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
      }
      return NextResponse.json({ lead });
    }

    const leads = await LeadRepository.findAll({ temperature: temperature || undefined, status: status || undefined, limit });
    return NextResponse.json({ leads });
  } catch (error) {
    console.error('CRM leads API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const lead = await LeadRepository.create({
      leadId: `AA-L-${Date.now()}`,
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    console.error('CRM lead create error:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
