'use client';

import UnifiedShell from '@/components/ops/UnifiedShell';

export default function ExecutiveLayout({ children }: { children: React.ReactNode }) {
  return <UnifiedShell>{children}</UnifiedShell>;
}