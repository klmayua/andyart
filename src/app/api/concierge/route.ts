import { NextRequest, NextResponse } from 'next/server';
import { ConciergeRepository } from '@/lib/repositories';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    if (type === 'requests') {
      const requests = await ConciergeRepository.findRequests({ status: status || undefined });
      return NextResponse.json({ requests });
    }

    if (type === 'bookings') {
      const bookings = await ConciergeRepository.findBookings({ status: status || undefined });
      return NextResponse.json({ bookings });
    }

    if (type === 'commissions') {
      const commissions = await ConciergeRepository.findCommissions({ status: status || undefined });
      return NextResponse.json({ commissions });
    }

    if (type === 'vips') {
      const vips = await ConciergeRepository.findVips();
      return NextResponse.json({ vips });
    }

    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
  } catch (error) {
    console.error('Concierge API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
