import { NextResponse } from 'next/server';

const baseUrl = 'https://myapproved.co.uk';

interface SitemapUrl {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export async function GET() {
  const currentDate = new Date().toISOString();
  
  const urls: SitemapUrl[] = [
    // Main pages
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/find-tradespeople`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9
    },
    
    // Core pages
    {
      url: `${baseUrl}/instant-quote`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${baseUrl}/post-job`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    
    // Registration pages
    {
      url: `${baseUrl}/register/client`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/register/tradesperson`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    
    // Service category pages
    {
      url: `${baseUrl}/services/plumber`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/services/electrician`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/services/builder`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/services/painter`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/services/gardener`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/services/cleaner`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    
    // Location pages (major UK cities)
    {
      url: `${baseUrl}/location/london`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6
    },
    {
      url: `${baseUrl}/location/manchester`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6
    },
    {
      url: `${baseUrl}/location/birmingham`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6
    },
    {
      url: `${baseUrl}/location/leeds`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6
    },
    {
      url: `${baseUrl}/location/glasgow`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6
    }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, lastModified, changeFrequency, priority }) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}
