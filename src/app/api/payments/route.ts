import { NextRequest, NextResponse } from 'next/server';
import { PaymentRepository, InvoiceRepository, EscrowRepository } from '@/lib/repositories';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const id = searchParams.get('id');
    const collectorId = searchParams.get('collectorId');
    const status = searchParams.get('status');

    if (type === 'payment') {
      if (id) {
        const payment = await PaymentRepository.findById(id);
        return payment
          ? NextResponse.json({ payment })
          : NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      if (collectorId) {
        const payments = await PaymentRepository.findByCollector(collectorId);
        return NextResponse.json({ payments });
      }
      const payments = await PaymentRepository.findAll({ status: status || undefined });
      return NextResponse.json({ payments });
    }

    if (type === 'invoice') {
      if (id) {
        const invoice = await InvoiceRepository.findById(id);
        return invoice
          ? NextResponse.json({ invoice })
          : NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      if (collectorId) {
        const invoices = await InvoiceRepository.findByCollector(collectorId);
        return NextResponse.json({ invoices });
      }
      const invoices = await InvoiceRepository.findAll();
      return NextResponse.json({ invoices });
    }

    if (type === 'escrow') {
      if (id) {
        const escrow = await EscrowRepository.findById(id);
        return escrow
          ? NextResponse.json({ escrow })
          : NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      const escrowCases = await EscrowRepository.findAll();
      return NextResponse.json({ escrowCases });
    }

    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
