'use client';

import { useState, useEffect } from 'react';
import { getCollectorProfile } from '@/lib/collector';
import type { CollectorProfile } from '@/types/collector';

export function useCurrentCollectorId(): string | null {
  const [collectorId, setCollectorId] = useState<string | null>('col-001');

  useEffect(() => {
    setCollectorId('col-001');
  }, []);

  return collectorId;
}

export function useCurrentCollector(): CollectorProfile | null {
  const [collector, setCollector] = useState<CollectorProfile | null>(null);

  useEffect(() => {
    const fallback = getCollectorProfile('col-001');
    setCollector(fallback);
  }, []);

  return collector;
}