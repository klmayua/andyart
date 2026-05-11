'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { getCollectorProfile } from '@/lib/collector';
import type { CollectorProfile } from '@/types/collector';

export function useCurrentCollectorId(): string | null {
  const { user } = useAuth();
  const [collectorId, setCollectorId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) { setCollectorId(null); return; }
    try {
      const raw = localStorage.getItem('andyart_collector_profiles');
      const all = raw ? JSON.parse(raw) : [];
      const byEmail = all.find((c: any) => c.email.toLowerCase() === user.email.toLowerCase());
      setCollectorId(byEmail?.id || 'col-001');
    } catch {
      setCollectorId('col-001');
    }
  }, [user]);

  return collectorId;
}

export function useCurrentCollector(): CollectorProfile | null {
  const { user } = useAuth();
  const [collector, setCollector] = useState<CollectorProfile | null>(null);

  useEffect(() => {
    if (!user) { setCollector(null); return; }
    try {
      const raw = localStorage.getItem('andyart_collector_profiles');
      const all = raw ? JSON.parse(raw) : [];
      const byEmail = all.find((c: any) => c.email.toLowerCase() === user.email.toLowerCase());
      if (byEmail) { setCollector(byEmail); return; }
      const fallback = getCollectorProfile('col-001');
      setCollector(fallback);
    } catch {
      setCollector(null);
    }
  }, [user]);

  return collector;
}
