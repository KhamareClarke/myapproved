import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import EnhancedHeader from '@/components/EnhancedHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MyApproved - Find Trusted Local Tradespeople | UK\'s #1 Platform',
  description: 'Find verified, reliable tradespeople in your area. Connect with approved plumbers, electricians, builders, and more. Get instant quotes, compare services, and hire with confidence on MyApproved.',
  keywords: 'tradespeople, plumber, electrician, builder, handyman, home improvement, local trades, verified professionals, quotes, UK, trusted, reliable, approved, certified',
};
const fixedHeaderStyles = `
  :root {
    --header-height: 80px;
  }
  
  @media (max-width: 768px) {
    :root {
      --header-height: 70px;
    }
  }
  
  body {
    padding-top: var(--header-height);
  }
  
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background: linear-gradient(to bottom, rgba(30, 58, 138, 0.98), rgba(30, 58, 138, 0.95));
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: fixedHeaderStyles }} />
      </head>
      <body className={`${inter.className} bg-gray-50`}>
        <AnalyticsProvider>
          <EnhancedHeader />
          <Breadcrumbs />
          <main>{children}</main>
          <Footer />
        </AnalyticsProvider>
      </body>
    </html>
  );
}