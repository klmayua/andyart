'use client';

import { useEffect } from 'react';
import { seedMockSubscribers } from '@/data/mockSubscribers';
import { seedMockLeads } from '@/data/leads.mock';

export function useNewsletterSeed() {
  useEffect(() => {
    seedMockSubscribers();
    seedMockLeads();
  }, []);
}