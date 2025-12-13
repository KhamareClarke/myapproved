import './globals.css';
import { SchemaMarkup, organizationSchema, WebsiteSchema, ServiceSchema, LocalBusinessSchema, ReviewSchema, FAQSchema, BreadcrumbSchema } from '@/components/SchemaMarkup';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import EnhancedHeader from '@/components/EnhancedHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://myapproved.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-GB': '/en-gb',
    },
  },
  title: 'MyApproved - Find Trusted Local Tradespeople | UK\'s #1 Platform',
  description: 'Find verified, reliable tradespeople in your area. Connect with approved plumbers, electricians, builders, and more. Get instant quotes, compare services, and hire with confidence on MyApproved.',
  applicationName: 'MyApproved',
  authors: [{ name: 'MyApproved', url: 'https://myapproved.co.uk' }],
  category: 'Home Services',
  keywords: 'tradespeople, plumber, electrician, builder, handyman, home improvement, local trades, verified professionals, quotes, UK, trusted, reliable, approved, certified',
  creator: 'MyApproved',
  publisher: 'MyApproved',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'MyApproved - Find Trusted Local Tradespeople | UK\'s #1 Platform',
    description: 'Find verified, reliable tradespeople in your area. Connect with approved plumbers, electricians, builders, and more. Get instant quotes, compare services, and hire with confidence.',
    url: 'https://myapproved.com',
    siteName: 'MyApproved',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MyApproved - Find Trusted Tradespeople',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyApproved - Find Trusted Local Tradespeople',
    description: 'Find verified, reliable tradespeople in your area. Get instant quotes and hire with confidence.',
    images: ['/twitter-image.jpg'],
    creator: '@myapproved',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'ferjstUZHhIE6kYLP1O8Jptch0hICiQHHLWXpmH7Vk8',
  },
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

const schemas = [
  organizationSchema,
  WebsiteSchema(),
  ServiceSchema,
  LocalBusinessSchema,
  ReviewSchema,
  FAQSchema,
  BreadcrumbSchema
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <head>
        <meta name="google-site-verification" content="ferjstUZHhIE6kYLP1O8Jptch0hICiQHHLWXpmH7Vk8" />
        <style dangerouslySetInnerHTML={{ __html: fixedHeaderStyles }} />
        {schemas.map((schema, index) => (
          <SchemaMarkup key={index} schema={schema} />
        ))}
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