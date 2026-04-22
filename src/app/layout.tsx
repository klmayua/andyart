import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
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
  title: 'AndyArt | Your digital gallery. Your art business. Elevated.',
  description: 'A premium mobile-first art gallery platform. Buy art, book services, host events, and manage partnerships.',
  keywords: ['art gallery', 'buy art', 'art services', 'paint and sip', 'art events', 'interior design'],
  authors: [{ name: 'AndyArt Gallery' }],
  openGraph: {
    title: 'AndyArt | Your digital gallery. Your art business. Elevated.',
    description: 'A premium mobile-first art gallery platform.',
    type: 'website',
    locale: 'en_US',
    siteName: 'AndyArt',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AndyArt | Your digital gallery. Your art business. Elevated.',
    description: 'A premium mobile-first art gallery platform.',
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
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-background min-h-screen`}>
        <main className="pb-[90px]">
          {children}
        </main>
        <BottomNav />
        <FloatingFooter />
        <Chatbot />
      </body>
    </html>
  );
}
