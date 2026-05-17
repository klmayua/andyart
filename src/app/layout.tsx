import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import '@/lib/runtime-boot';
import ClientLayout from './ClientLayout';

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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}