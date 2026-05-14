'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UnifiedShell from '@/components/ops/UnifiedShell';
import { useAuth } from '@/hooks/useAuth';

export default function PaymentsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoading, isAuthenticated, isDemoMode } = useAuth();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated && !isDemoMode) { router.push('/auth/signin'); return; }
    setAuthorized(true);
  }, [isLoading, isAuthenticated, isDemoMode, router]);

  if (isLoading || !authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F2E8]">
        <div className="text-center">
          <div className="w-10 h-10 border-[3px] border-andy-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-andy-bronze text-xs">Verifying access...</p>
        </div>
      </div>
    );
  }

  return <UnifiedShell>{children}</UnifiedShell>;
}