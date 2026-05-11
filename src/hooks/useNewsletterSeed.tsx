'use client';

import { useEffect } from 'react';
import { seedMockSubscribers } from '@/data/mockSubscribers';
import { seedMockLeads } from '@/data/leads.mock';
import { seedConciergeData } from '@/data/concierge.mock';
import { seedCollectorData } from '@/data/collector.mock';
import { seedPaymentData } from '@/data/payment.mock';

export function NewsletterSeedProvider() {
  useEffect(() => {
    seedMockSubscribers();
    seedMockLeads();
    seedConciergeData();
    seedCollectorData();
    seedPaymentData();
  }, []);
  return null;
}