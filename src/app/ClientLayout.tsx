'use client';

import { usePathname } from 'next/navigation';
import FloatingNav from '@/components/FloatingNav';
import BottomNav from '@/components/BottomNav';
import FloatingActions from '@/components/FloatingActions';
import Footer from '@/components/Footer';
import ConversionLayer from '@/components/conversion/ConversionLayer';
import { ConversionModalProvider } from '@/hooks/useConversionModal';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  const isEnterpriseRoute = pathname.startsWith('/enterprise') || pathname.startsWith('/ops');
  const isPublicRoute = !isEnterpriseRoute && !pathname.startsWith('/collector') && !pathname.startsWith('/checkout');

  return (
    <ConversionModalProvider>
      {!isEnterpriseRoute && <FloatingNav />}
      <main className={isEnterpriseRoute ? '' : 'pt-[120px] md:pt-[140px] pb-[120px] md:pb-[100px]'}>
        {children}
      </main>
      {!isEnterpriseRoute && <Footer />}
      {!isEnterpriseRoute && <BottomNav />}
      {!isEnterpriseRoute && <FloatingActions />}
      {!isEnterpriseRoute && <ConversionLayer />}
    </ConversionModalProvider>
  );
}