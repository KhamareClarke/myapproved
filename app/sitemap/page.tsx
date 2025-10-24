import { generateMetadata } from '@/lib/seo';
import { Home, Search, Briefcase, Users, Info, Phone, HelpCircle, FileText, Shield, Cookie } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateMetadata('sitemap', {
  title: 'Sitemap | MyApproved - All Pages and Sections',
  description: 'Complete sitemap of MyApproved website. Find all pages, services, and sections easily.',
  keywords: ['sitemap', 'site navigation', 'all pages', 'website structure', 'MyApproved pages'],
  canonical: 'https://myapproved.co.uk/sitemap'
});

export default function SitemapPage() {
  const siteStructure = [
    {
      title: 'Main Pages',
      icon: Home,
      pages: [
        { name: 'Home', href: '/', description: 'Welcome to MyApproved - Find trusted tradespeople' },
        { name: 'Instant Quote', href: '/instant-quote', description: 'Get instant quotes from verified tradespeople' },
        { name: 'Post a Job', href: '/post-job', description: 'Post your job and receive competitive quotes' },
        { name: 'Find Tradespeople', href: '/find-tradespeople', description: 'Browse and search verified professionals' }
      ]
    },
    {
      title: 'Company Information',
      icon: Info,
      pages: [
        { name: 'About Us', href: '/about', description: 'Learn about MyApproved\'s mission and values' },
        { name: 'Contact', href: '/contact', description: 'Get in touch with our support team' },
        { name: 'FAQ', href: '/faq', description: 'Frequently asked questions and answers' }
      ]
    },
    {
      title: 'User Registration',
      icon: Users,
      pages: [
        { name: 'Register as Client', href: '/register/client', description: 'Sign up to find tradespeople' },
        { name: 'Register as Tradesperson', href: '/register/tradesperson', description: 'Join our platform to grow your business' },
        { name: 'Login', href: '/login', description: 'Access your MyApproved account' }
      ]
    },
    {
      title: 'Services',
      icon: Search,
      pages: [
        { name: 'Plumbers', href: '/services/plumber', description: 'Find qualified plumbers in your area' },
        { name: 'Electricians', href: '/services/electrician', description: 'Connect with certified electricians' },
        { name: 'Builders', href: '/services/builder', description: 'Hire experienced builders and contractors' },
        { name: 'Painters', href: '/services/painter', description: 'Professional painting and decorating services' },
        { name: 'Gardeners', href: '/services/gardener', description: 'Landscaping and garden maintenance' },
        { name: 'Cleaners', href: '/services/cleaner', description: 'Domestic and commercial cleaning services' }
      ]
    },
    {
      title: 'Locations',
      icon: Search,
      pages: [
        { name: 'London', href: '/find-tradespeople', description: 'Tradespeople in London' },
        { name: 'Manchester', href: '/find-tradespeople', description: 'Tradespeople in Manchester' },
        { name: 'Birmingham', href: '/find-tradespeople', description: 'Tradespeople in Birmingham' },
        { name: 'Leeds', href: '/find-tradespeople', description: 'Tradespeople in Leeds' },
        { name: 'Glasgow', href: '/find-tradespeople', description: 'Tradespeople in Glasgow' }
      ]
    },
    {
      title: 'Legal & Policies',
      icon: FileText,
      pages: [
        { name: 'Privacy Policy', href: '/privacy', description: 'How we protect and use your personal data' },
        { name: 'Terms & Conditions', href: '/terms', description: 'Terms of service and user agreement' },
        { name: 'Cookie Policy', href: '/cookies', description: 'Information about cookies and tracking' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900">
      {/* Hero Section - Consistent with Homepage */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-white overflow-hidden min-h-[50vh] flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/80 via-blue-800/70 to-indigo-800/60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.2),transparent_50%)] animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-400/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-400/20 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-yellow-400 mb-6 animate-slide-up">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            Complete Site Navigation
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-yellow-200 bg-clip-text text-transparent animate-slide-up" style={{animationDelay: '0.2s'}}>
            Sitemap
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.4s'}}>
            Navigate our complete website structure and find exactly what you're looking for.
          </p>
        </div>
      </section>

      {/* Sitemap Content - Hero Consistent */}
      <section className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12">
            {siteStructure.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 animate-slide-up" style={{animationDelay: `${sectionIndex * 0.1}s`}}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">{section.title}</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.pages.map((page, pageIndex) => (
                    <Link
                      key={pageIndex}
                      href={page.href}
                      className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-yellow-400/30 hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <h3 className="font-semibold text-white group-hover:text-yellow-400 mb-3 transition-colors duration-300">
                        {page.name}
                      </h3>
                      <p className="text-sm text-blue-100 leading-relaxed mb-4">
                        {page.description}
                      </p>
                      <div className="flex items-center text-yellow-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                        Visit page →
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats - Hero Consistent */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 animate-slide-up">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent mb-4">Website Overview</h2>
            <p className="text-blue-100 mb-8">
              MyApproved connects homeowners with trusted tradespeople across the UK
            </p>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { number: '20+', label: 'Total Pages' },
                { number: '6', label: 'Service Categories' },
                { number: '5', label: 'Major Cities' },
                { number: '100%', label: 'Mobile Friendly' }
              ].map((stat, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* XML Sitemap Link - Hero Consistent */}
      <section className="py-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-800/50 to-indigo-800/50 backdrop-blur-md rounded-2xl border border-white/20 p-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-white mb-4">For Search Engines</h2>
            <p className="text-blue-100 mb-6">
              Looking for our XML sitemap for SEO purposes?
            </p>
            <a
              href="/sitemap.xml"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              View XML Sitemap
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
