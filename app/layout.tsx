import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Providers } from '@/app/providers';
import { Toaster } from '@/components/ui/toaster';
import PageTransition from '@/components/PageTransition';
import StickyNavigation from '@/components/StickyNavigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NFT Marketplace',
  description: 'A comprehensive NFT marketplace with voice capture functionality',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0A192F',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </div>
          <StickyNavigation />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}