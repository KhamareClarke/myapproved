import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, CheckCircle, Shield } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Find a tradesperson", href: "/find-tradespeople" },
    { name: "How it works", href: "/how-it-works" },
    { name: "Customer reviews", href: "/find-tradespeople" },
    { name: "Help centre", href: "/help" },
  ];

  const locations = [
    { name: "Electricians in London", href: "/find-tradespeople" },
    { name: "Plumbers in Manchester", href: "/find-tradespeople" },
    { name: "Roofers in Birmingham", href: "/find-tradespeople" },
    { name: "Cleaners in Leeds", href: "/find-tradespeople" },
    { name: "Carpenters in Bristol", href: "/find-tradespeople" },
  ];

  const companyLinks = [
    { name: "About us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy policy", href: "/privacy" },
    { name: "Terms of service", href: "/terms" },
    { name: "Sitemap", href: "/sitemap.xml" },
  ];

  const contactInfo = [
    { icon: <Mail className="w-4 h-4" />, text: "support@myapproved.com" },
    { icon: <Phone className="w-4 h-4" />, text: "+44 20 1234 5678" },
    { icon: <MapPin className="w-4 h-4" />, text: "123 Trade Street, London, UK" },
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-950 to-blue-800 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & Description */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img 
                src="/logo-text.svg" 
                alt="MyApproved Logo"
                className="h-14 sm:h-16 md:h-20 object-contain"
              />
            </div>
            <p className="text-blue-100 leading-relaxed">
              Find trusted, approved tradespeople near you. Get fast quotes, compare, and book with confidence.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center text-xs bg-blue-800/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-700/50">
                <CheckCircle className="w-4 h-4 text-green-400 mr-1.5" />
                Verified Professionals
              </div>
              <div className="flex items-center text-xs bg-blue-800/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-700/50">
                <Shield className="w-4 h-4 text-blue-300 mr-1.5" />
                Secure Payments
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-blue-100 hover:text-yellow-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 rounded-full bg-yellow-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-5">Locations</h3>
            <ul className="space-y-3">
              {locations.map((location) => (
                <li key={location.name}>
                  <Link 
                    href={location.href}
                    className="text-blue-100 hover:text-yellow-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 rounded-full bg-yellow-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-5">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-yellow-400 mt-0.5">{item.icon}</span>
                  <span className="text-blue-100">{item.text}</span>
                </li>
              ))}
            </ul>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-blue-100 mb-3">Subscribe to our newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-blue-900/50 border border-blue-700 text-white text-sm rounded-l-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent placeholder-blue-300"
                />
                <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-medium px-4 py-2.5 rounded-r-lg transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* App Download */}
            <div className="mb-6 md:mb-0">
              <p className="text-blue-100 text-sm mb-3">Download our app</p>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="inline-block hover:opacity-90 transition-opacity"
                  aria-label="Download on the App Store"
                >
                  <img 
                    src="/badges/app-store.svg" 
                    alt="Download on the App Store" 
                    className="h-10 w-auto" 
                    width={135}
                    height={40}
                    loading="lazy"
                  />
                </a>
                <a 
                  href="#" 
                  className="inline-block hover:opacity-90 transition-opacity"
                  aria-label="Get it on Google Play"
                >
                  <img 
                    src="/badges/google-play.svg" 
                    alt="Get it on Google Play" 
                    className="h-10 w-auto"
                    width={135}
                    height={40}
                    loading="lazy"
                  />
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 mb-6 md:mb-0">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a 
                  key={social}
                  href={`https://${social}.com/myapproved`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-800/50 flex items-center justify-center text-blue-100 hover:bg-blue-700/50 hover:text-yellow-400 transition-colors duration-200"
                  aria-label={`Follow us on ${social}`}
                >
                  <span className="sr-only">{social}</span>
                  <i className={`fab fa-${social} text-lg`}></i>
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-blue-300">
                &copy; {currentYear} MyApproved. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-1 mt-2 text-xs text-blue-400">
                <Link href="/privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link>
                <span>•</span>
                <Link href="/terms" className="hover:text-yellow-400 transition-colors">Terms of Service</Link>
                <span>•</span>
                <Link href="/cookies" className="hover:text-yellow-400 transition-colors">Cookie Policy</Link>
                <span>•</span>
                <Link href="/sitemap" className="hover:text-yellow-400 transition-colors">Sitemap</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-blue-950 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-blue-400">
            <div className="flex items-center space-x-2 mb-2 md:mb-0">
              <Clock className="w-3.5 h-3.5 text-yellow-400" />
              <span>Customer Support: Mon-Fri 8am-8pm</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Accepted Payment Methods:</span>
              <div className="flex space-x-2">
                {['visa', 'mastercard', 'paypal'].map((method) => (
                  <span key={method} className="text-lg" aria-label={method}>
                    <i className={`fab fa-cc-${method}`}></i>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
