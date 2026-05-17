'use client';

import { usePathname } from 'next/navigation';
import Ticker from '@/components/Ticker';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import FloatingActions from '@/components/FloatingActions';
import ConversionLayer from '@/components/conversion/ConversionLayer';
import { ConversionModalProvider } from '@/hooks/useConversionModal';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  const isEnterpriseRoute = pathname.startsWith('/enterprise') || pathname.startsWith('/ops');

  return (
    <ConversionModalProvider>
      {!isEnterpriseRoute && <Ticker />}
      {!isEnterpriseRoute && <Header />}
      <main className={isEnterpriseRoute ? '' : 'pb-[90px] md:pb-0'}>
        {children}
      </main>
      {!isEnterpriseRoute && <BottomNav />}
      {!isEnterpriseRoute && <FloatingActions />}
      {!isEnterpriseRoute && <ConversionLayer />}
    </ConversionModalProvider>
  );
}