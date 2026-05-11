import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Ticker from '@/components/Ticker';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import FloatingActions from '@/components/FloatingActions';
import ConversionLayer from '@/components/conversion/ConversionLayer';
import { AuthProvider } from '@/hooks/useAuth';
import { NewsletterSeedProvider } from '@/hooks/useNewsletterSeed';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'AndyArt | Collect Culture. Live Beautifully. Leave Legacy.',
  description: 'Premium African art, curated experiences, bespoke commissions, and timeless cultural living for every generation.',
  keywords: ['premium art', 'African art', 'art collection', 'bespoke commissions', 'cultural house', 'collector concierge'],
  authors: [{ name: 'AndyArt' }],
  openGraph: {
    title: 'AndyArt | Collect Culture. Live Beautifully. Leave Legacy.',
    description: 'Premium African art, curated experiences, bespoke commissions, and timeless cultural living for every generation.',
    type: 'website',
    locale: 'en_US',
    siteName: 'AndyArt',
  },
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-[#F7F2E8] min-h-screen`}>
        <AuthProvider>
          <NewsletterSeedProvider />
          <Ticker />
          <Header />
          <main className="pb-[90px] md:pb-0">
            {children}
          </main>
          <BottomNav />
          <FloatingActions />
          <ConversionLayer />
        </AuthProvider>
      </body>
    </html>
  );
}
