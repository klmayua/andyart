import { NextRequest, NextResponse } from 'next/server';
import { CollectorRepository } from '@/lib/repositories';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const email = searchParams.get('email');

    if (id) {
      const collector = await CollectorRepository.findById(id);
      if (!collector) {
        return NextResponse.json({ error: 'Collector not found' }, { status: 404 });
      }
      return NextResponse.json({ collector });
    }

    if (email) {
      const collector = await CollectorRepository.findByEmail(email);
      if (!collector) {
        return NextResponse.json({ error: 'Collector not found' }, { status: 404 });
      }
      return NextResponse.json({ collector });
    }

    const collectors = await CollectorRepository.findAll();
    return NextResponse.json({ collectors });
  } catch (error) {
    console.error('Collector API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
