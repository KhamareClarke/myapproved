"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { SchemaMarkup } from './SchemaMarkup';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const pathname = usePathname();

  // Generate breadcrumbs from pathname if items not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [{ name: 'Home', href: '/' }];

    // Page name mappings
    const pageNames: Record<string, string> = {
      'instant-quote': 'Instant Quote',
      'post-job': 'Post a Job',
      'find-tradespeople': 'Find Tradespeople',
      'about': 'About Us',
      'contact': 'Contact',
      'faq': 'FAQ',
      'register': 'Register',
      'client': 'Client',
      'tradesperson': 'Tradesperson',
      'login': 'Login',
      'privacy': 'Privacy Policy',
      'terms': 'Terms & Conditions',
      'cookies': 'Cookie Policy'
    };

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const name = pageNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ name, href: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();

  // Generate breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://myapproved.co.uk${item.href}`
    }))
  };

  // Don't show breadcrumbs on home page
  if (pathname === '/' || breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <nav className={`bg-gray-50 border-b border-gray-200 ${className}`} aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 py-3 text-sm">
            {breadcrumbItems.map((item, index) => (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                )}
                
                {index === 0 ? (
                  <Link
                    href={item.href}
                    className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <Home className="w-4 h-4 mr-1" />
                    <span>{item.name}</span>
                  </Link>
                ) : index === breadcrumbItems.length - 1 ? (
                  <span className="text-gray-900 font-medium" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumbs;
