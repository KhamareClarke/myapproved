import React from 'react';

interface SchemaMarkupProps {
  schema: any;
}

export const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ schema }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// Predefined schema templates
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MyApproved",
  "url": "https://myapproved.co.uk",
  "logo": "https://myapproved.co.uk/logo.png",
  "description": "UK's leading platform for finding trusted local tradespeople",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "GB",
    "addressRegion": "England"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+44-800-123-4567",
    "contactType": "Customer Service",
    "availableLanguage": ["English"]
  },
  "sameAs": [
    "https://twitter.com/myapproved",
    "https://linkedin.com/company/myapproved"
  ]
};

export const WebsiteSchema = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "My Approved",
    "alternateName": "My Approved.co.uk",
    "url": "https://myapproved.co.uk",
    "description": "UK's leading platform for finding trusted local tradespeople",
    "inLanguage": "en-GB",
    "copyrightYear": "2024",
    "copyrightHolder": {
      "@type": "Organization",
      "name": "My Approved Ltd"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://myapproved.co.uk/find-tradespeople?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "WebPage",
      "@id": "https://myapproved.co.uk/#webpage",
      "url": "https://myapproved.co.uk",
      "name": "My Approved - Find Trusted Local Tradespeople",
      "description": "Connect with verified tradespeople in your area",
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://myapproved.co.uk/og-image.jpg"
      }
    }
  };

  return <SchemaMarkup schema={websiteSchema} />;
};

export const ServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Tradesperson Matching Service",
  "description": "Connect customers with verified local tradespeople",
  "provider": {
    "@type": "Organization",
  },
  "areaServed": {
    "@type": "Country",
    "name": "United Kingdom"
  },
  "serviceType": "Home Improvement Services"
};
