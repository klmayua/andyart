'use client';

import UnifiedShell from '@/components/ops/UnifiedShell';

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return <UnifiedShell>{children}</UnifiedShell>;
}