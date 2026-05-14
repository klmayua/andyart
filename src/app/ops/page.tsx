'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import UnifiedShell from '@/components/ops/UnifiedShell';

function isDemoModeActive(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('aa_demo_mode') === 'enabled' && localStorage.getItem('andyart-demo-session') !== null;
}

export default function OpsIndexPage() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated, isDemoMode } = useAuth();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    const demoActive = isDemoModeActive();
    if (!isAuthenticated && !isDemoMode && !demoActive) { 
      router.push('/auth/signin'); 
      return; 
    }
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

  return (
    <UnifiedShell>
      <div className="p-6">
        <h1 className="font-serif text-2xl font-bold text-andy-black">Operations Dashboard</h1>
        <p className="text-sm text-andy-bronze mt-1">Welcome back, {user?.name || 'User'}</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a href="/ops/executive" className="bg-white rounded-xl border border-andy-stone/20 p-5 hover:border-andy-gold/30 transition-all">
            <h3 className="font-medium text-andy-black">Executive Overview</h3>
            <p className="text-xs text-andy-bronze mt-1">Platform KPIs and metrics</p>
          </a>
          <a href="/ops/crm" className="bg-white rounded-xl border border-andy-stone/20 p-5 hover:border-andy-gold/30 transition-all">
            <h3 className="font-medium text-andy-black">CRM Dashboard</h3>
            <p className="text-xs text-andy-bronze mt-1">Customer relationship management</p>
          </a>
          <a href="/ops/concierge" className="bg-white rounded-xl border border-andy-stone/20 p-5 hover:border-andy-gold/30 transition-all">
            <h3 className="font-medium text-andy-black">Concierge Hub</h3>
            <p className="text-xs text-andy-bronze mt-1">VIP services and bookings</p>
          </a>
          <a href="/ops/payments" className="bg-white rounded-xl border border-andy-stone/20 p-5 hover:border-andy-gold/30 transition-all">
            <h3 className="font-medium text-andy-black">Payments</h3>
            <p className="text-xs text-andy-bronze mt-1">Financial operations</p>
          </a>
        </div>
      </div>
    </UnifiedShell>
  );
}