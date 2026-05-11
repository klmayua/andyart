'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { hasPermission } from '@/lib/permissions';
import type { Permission } from '@/types/auth';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredPermissions?: Permission[];
  fallbackUrl?: string;
}

export function RouteGuard({ children, requiredPermissions = [], fallbackUrl = '/auth/signin' }: RouteGuardProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push(fallbackUrl);
      return;
    }

    if (requiredPermissions.length > 0 && user) {
      const hasAccess = requiredPermissions.some((p) => hasPermission(user.role, p));
      if (!hasAccess) {
        router.push('/unauthorized');
        return;
      }
    }

    setAuthorized(true);
  }, [isLoading, isAuthenticated, user, requiredPermissions, router, fallbackUrl]);

  if (isLoading || !authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F2E8]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-andy-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-andy-bronze text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}