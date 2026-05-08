import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import FloatingFooter from '@/components/FloatingFooter';
import Chatbot from '@/components/Chatbot';

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
  description: 'Premium African art, curated experiences, bespoke commissions, and timeless cultural living for every generation. AndyArt is a premium cultural house where collecting, gathering, gifting, commissioning, and living with art converge.',
  keywords: ['premium art', 'African art', 'art collection', 'bespoke commissions', 'art experiences', 'cultural house', 'collector concierge', 'corporate curation', 'art gifting'],
  authors: [{ name: 'AndyArt' }],
  openGraph: {
    title: 'AndyArt | Collect Culture. Live Beautifully. Leave Legacy.',
    description: 'Premium African art, curated experiences, bespoke commissions, and timeless cultural living for every generation.',
    type: 'website',
    locale: 'en_US',
    siteName: 'AndyArt',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AndyArt | Collect Culture. Live Beautifully. Leave Legacy.',
    description: 'Premium African art, curated experiences, bespoke commissions, and timeless cultural living for every generation.',
  },
};

// Force dynamic rendering for client components
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-andy-ivory min-h-screen`}>
        <Header />
        <main className="pb-[90px] md:pb-0">
          {children}
        </main>
        <BottomNav />
        <FloatingFooter />
        <Chatbot />
      </body>
    </html>
  );
}
