"use client";

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Shield,
  Award,
  Users,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Download,
  Smartphone,
  Apple,
  Play,
  ExternalLink,
} from 'lucide-react';

const EnhancedFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'For Customers',
      links: [
        { name: 'Find Tradespeople', href: '/find-tradespeople' },
        { name: 'Get Instant Quote', href: '/instant-quote' },
        { name: 'How It Works', href: '/how-it-works' },
        { name: 'Customer Reviews', href: '/find-tradespeople' },
        { name: 'Emergency Services', href: '/emergency' },
        { name: 'Price Guide', href: '/pricing-guide' }
      ]
    },
    {
      title: 'For Tradespeople',
      links: [
        { name: 'Join MyApproved', href: '/register/tradesperson' },
        { name: 'Tradesperson Login', href: '/login/tradesperson' },
        { name: 'Lead Generation', href: '/leads' },
        { name: 'Success Stories', href: '/success-stories' },
        { name: 'Training & Support', href: '/support' },
        { name: 'Pricing Plans', href: '/tradesperson-pricing' }
      ]
    },
    {
      title: 'Trade Categories',
      links: [
        { name: 'Plumbers', href: '/find-tradespeople?trade=plumber' },
        { name: 'Electricians', href: '/find-tradespeople?trade=electrician' },
        { name: 'Builders', href: '/find-tradespeople?trade=builder' },
        { name: 'Painters', href: '/find-tradespeople?trade=painter' },
        { name: 'Roofers', href: '/find-tradespeople?trade=roofer' },
        { name: 'View All Trades', href: '/trades' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press & Media', href: '/press' },
        { name: 'Blog', href: '/blog' },
        { name: 'Help Center', href: '/help' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/myapproved', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/myapproved', color: 'hover:text-sky-500' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/myapproved', color: 'hover:text-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/myapproved', color: 'hover:text-blue-700' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/myapproved', color: 'hover:text-red-600' }
  ];

  const trustBadges = [
    { name: 'Trustpilot', rating: '4.9', reviews: '50,000+' },
    { name: 'Google Reviews', rating: '4.8', reviews: '25,000+' },
    { name: 'Which? Trusted', rating: 'Approved', reviews: 'Trader' }
  ];

  return (
    <footer className="bg-gradient-to-br from-[#0056D2] via-blue-800 to-blue-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FDBD18]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand section */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <Link href="/" className="inline-flex items-center gap-3 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FDBD18] to-yellow-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src="/logo-icon.svg" 
                      alt="MyApproved Logo Icon"
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        // Fallback to Shield icon if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <Shield className="w-7 h-7 text-[#0056D2] hidden" />
                  </div>
                  <div className="flex items-center">
                    <img 
                      src="/logo-text.svg" 
                      alt="MyApproved Logo"
                      className="h-10 sm:h-12 object-contain"
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden">
                      <div className="text-2xl font-black text-white">MyApproved</div>
                      <div className="text-sm text-blue-200">Trusted Tradespeople</div>
                    </div>
                  </div>
                </Link>
              </div>

              <p className="text-blue-100 leading-relaxed max-w-md">
                The UK's most trusted platform for finding verified, insured tradespeople. 
                Connect with quality professionals in your area and get the job done right.
              </p>

              {/* Trust badges */}
              <div className="space-y-3">
                <h4 className="font-bold text-white text-sm">Trusted by thousands:</h4>
                <div className="flex flex-wrap items-center gap-4">
                  {trustBadges.map((badge, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                      <div className="text-xs font-bold text-[#FDBD18]">{badge.name}</div>
                      <div className="text-sm font-black text-white">{badge.rating}</div>
                      <div className="text-xs text-blue-200">{badge.reviews}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-3">
                <h4 className="font-bold text-white text-sm">Get in touch:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-blue-200">
                    <Phone className="w-4 h-4 text-[#FDBD18]" />
                    <span className="text-sm">0800 123 4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-blue-200">
                    <Mail className="w-4 h-4 text-[#FDBD18]" />
                    <span className="text-sm">hello@myapproved.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-blue-200">
                    <MapPin className="w-4 h-4 text-[#FDBD18]" />
                    <span className="text-sm">London, UK</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation sections */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {footerSections.map((section, i) => (
                  <div key={i} className="space-y-4">
                    <h3 className="font-black text-white text-lg">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.links.map((link, j) => (
                        <li key={j}>
                          {link.href === '#' ? (
                            <button
                              className="text-blue-200 hover:text-[#FDBD18] transition-colors duration-300 text-sm group flex items-center gap-1"
                            >
                              <span>{link.name}</span>
                              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                            </button>
                          ) : (
                            <Link
                              href={link.href}
                              className="text-blue-200 hover:text-[#FDBD18] transition-colors duration-300 text-sm group flex items-center gap-1"
                            >
                              <span>{link.name}</span>
                              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* App download section */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="font-black text-white text-xl mb-2">Download Our App</h3>
                <p className="text-blue-200 text-sm">Get instant quotes and manage jobs on the go</p>
              </div>
              
              <div className="flex items-center gap-4">
                <Link
                  href="#"
                  className="group flex items-center gap-3 bg-black hover:bg-gray-900 rounded-2xl px-4 py-3 transition-colors duration-300"
                >
                  <Apple className="w-8 h-8 text-white" />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on the</div>
                    <div className="text-sm font-bold text-white">App Store</div>
                  </div>
                </Link>
                
                <Link
                  href="#"
                  className="group flex items-center gap-3 bg-black hover:bg-gray-900 rounded-2xl px-4 py-3 transition-colors duration-300"
                >
                  <Play className="w-8 h-8 text-white" />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Get it on</div>
                    <div className="text-sm font-bold text-white">Google Play</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Social links */}
              <div className="flex items-center gap-4">
                <span className="text-blue-200 text-sm font-semibold">Follow us:</span>
                {socialLinks.map((social, i) => {
                  const IconComponent = social.icon;
                  return (
                    <Link
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 text-blue-200 ${social.color}`}
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </Link>
                  );
                })}
              </div>

              {/* Legal links */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-blue-200">
                <Link href="/privacy" className="hover:text-[#FDBD18] transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-[#FDBD18] transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="hover:text-[#FDBD18] transition-colors duration-300">
                  Cookie Policy
                </Link>
                <Link href="/accessibility" className="hover:text-[#FDBD18] transition-colors duration-300">
                  Accessibility
                </Link>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="text-blue-200 text-sm">
                © {currentYear} MyApproved Ltd. All rights reserved. 
                <span className="mx-2">•</span>
                Registered in England & Wales
                <span className="mx-2">•</span>
                Company No. 12345678
              </p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center gap-2 text-xs text-blue-300">
                  <Shield className="w-4 h-4 text-[#FDBD18]" />
                  <span>FCA Regulated</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-blue-300">
                  <Award className="w-4 h-4 text-[#FDBD18]" />
                  <span>ISO 27001 Certified</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-blue-300">
                  <Users className="w-4 h-4 text-[#FDBD18]" />
                  <span>GDPR Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
