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
  "url": "https://myapproved.com",
  "logo": "https://myapproved.com/logo.png",
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
    "alternateName": "My Approved.com",
    "url": "https://myapproved.com",
    "description": "UK's leading platform for finding trusted local tradespeople",
    "inLanguage": "en-GB",
    "copyrightYear": "2024",
    "copyrightHolder": {
      "@type": "Organization",
      "name": "My Approved Ltd"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://myapproved.com/find-tradespeople?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "WebPage",
      "@id": "https://myapproved.com/#webpage",
      "url": "https://myapproved.com",
      "name": "My Approved - Find Trusted Local Tradespeople",
      "description": "Connect with verified tradespeople in your area",
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://myapproved.com/og-image.jpg"
      }
    }
  };

  return <SchemaMarkup schema={websiteSchema} />;
};

export const LocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "MyApproved",
  "image": "https://myapproved.com/logo.png",
  "@id": "https://myapproved.com",
  "url": "https://myapproved.com",
  "telephone": "+44-800-123-4567",
  "priceRange": "££",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Business Street",
    "addressLocality": "London",
    "postalCode": "SW1A 1AA",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.5074,
    "longitude": -0.1278
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "17:00"
  },
  "sameAs": [
    "https://www.facebook.com/myapproved",
    "https://twitter.com/myapproved",
    "https://www.linkedin.com/company/myapproved",
    "https://www.instagram.com/myapproved"
  ]
};

export const ReviewSchema = {
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "itemReviewed": {
    "@type": "Organization",
    "name": "MyApproved",
    "sameAs": "https://myapproved.com"
  },
  "ratingValue": "4.9",
  "bestRating": "5",
  "worstRating": "1",
  "ratingCount": "50000",
  "reviewCount": "45000"
};

export const FAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How does MyApproved verify tradespeople?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "We verify all tradespeople through a rigorous process including license checks, insurance verification, and review of qualifications and certifications."
    }
  }, {
    "@type": "Question",
    "name": "Is MyApproved free to use?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes, MyApproved is completely free for customers to use. Get instant quotes and connect with verified professionals at no cost."
    }
  }, {
    "@type": "Question",
    "name": "Are all tradespeople insured?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes, all tradespeople on MyApproved must have valid public liability insurance and professional indemnity insurance where applicable."
    }
  }]
};

export const BreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://myapproved.com"
  }, {
    "@type": "ListItem",
    "position": 2,
    "name": "Find Tradespeople",
    "item": "https://myapproved.com/find-tradespeople"
  }]
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
