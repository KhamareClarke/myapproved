"use client";

import React from 'react';
import Link from 'next/link';
import {
  Wrench,
  UsersRound,
  Calculator,
  ChevronRight,
  Star,
  Shield,
  TrendingUp,
  Clock,
  Award,
  Zap,
  Users,
  Target,
} from 'lucide-react';

interface CTACard {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  href?: string;
  onClick?: () => void;
  icon: React.ElementType;
  gradient: string;
  hoverGradient: string;
  stats?: {
    label: string;
    value: string;
  }[];
  features?: string[];
  image: string;
  badge?: string;
}

const CTACardsSection = () => {
  const ctaCards: CTACard[] = [
    {
      id: 'hire',
      title: 'Hire a Tradesperson',
      description: 'Find verified, insured professionals in your area. Get instant quotes and book with confidence.',
      buttonText: 'Find Tradespeople',
      href: '/find-tradespeople',
      icon: Wrench,
      gradient: 'from-[#0056D2] via-blue-600 to-blue-700',
      hoverGradient: 'from-blue-700 via-[#0056D2] to-blue-600',
      image: '/background.jpg',
      badge: 'Most Popular',
      stats: [
        { label: 'Average Response', value: '3 mins' },
        { label: 'Success Rate', value: '98%' }
      ],
      features: ['Instant quotes', 'Verified professionals', 'Insurance guaranteed']
    },
    {
      id: 'join',
      title: 'Join as Tradesperson',
      description: 'Grow your business with quality leads. Join 10,000+ approved tradespeople earning more.',
      buttonText: 'Start Earning Today',
      href: '/register/tradesperson',
      icon: UsersRound,
      gradient: 'from-[#FDBD18] via-yellow-400 to-orange-400',
      hoverGradient: 'from-orange-400 via-[#FDBD18] to-yellow-400',
      image: '/hero.png',
      badge: 'High Demand',
      stats: [
        { label: 'Avg. Monthly Leads', value: '47' },
        { label: 'Conversion Rate', value: '73%' }
      ],
      features: ['Quality leads only', 'No upfront costs', 'Instant notifications']
    },
    {
      id: 'quote',
      title: 'Get Instant Quote',
      description: 'AI-powered quotes in 60 seconds. Compare prices and book the best tradesperson for your job.',
      buttonText: 'Get My Quote',
      onClick: () => document.getElementById('ai-quote-trigger')?.click(),
      icon: Calculator,
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      hoverGradient: 'from-teal-500 via-green-500 to-emerald-500',
      image: '/background.jpg',
      badge: 'AI Powered',
      stats: [
        { label: 'Quote Accuracy', value: '94%' },
        { label: 'Time to Quote', value: '60s' }
      ],
      features: ['No obligation', 'Instant estimates', 'Compare options']
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#FDBD18]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0056D2]/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#0056D2]/10 text-[#0056D2] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Target className="w-4 h-4" />
            <span>Choose Your Path</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#0056D2] mb-4">
            Ready to Get <span className="text-[#FDBD18]">Started?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Whether you need work done or want to grow your business, we've got you covered. <span className="font-semibold text-[#0056D2]">Join thousands</span> who trust MyApproved.
          </p>
        </div>

        {/* Enhanced CTA Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ctaCards.map((card, index) => {
            const IconComponent = card.icon;
            
            return (
              <div
                key={card.id}
                className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-3 hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Background image with overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br ${card.gradient}"></div>`;
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-80 group-hover:opacity-70 transition-opacity duration-300`}></div>
                  
                  {/* Badge */}
                  {card.badge && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-black border border-white/30">
                        {card.badge}
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Stats overlay */}
                  {card.stats && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        {card.stats.map((stat, i) => (
                          <div key={i} className="text-center">
                            <div className="text-white font-black text-lg">{stat.value}</div>
                            <div className="text-white/80 text-xs">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-black text-[#0056D2] mb-2 group-hover:text-[#FDBD18] transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Features */}
                  {card.features && (
                    <div className="space-y-2">
                      {card.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="pt-2">
                    {card.href ? (
                      <Link
                        href={card.href}
                        className={`group/btn w-full inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-gradient-to-r ${card.gradient} hover:bg-gradient-to-r hover:${card.hoverGradient} text-white font-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
                      >
                        <span>{card.buttonText}</span>
                        <ChevronRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    ) : (
                      <button
                        onClick={card.onClick}
                        className={`group/btn w-full inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-gradient-to-r ${card.gradient} hover:bg-gradient-to-r hover:${card.hoverGradient} text-white font-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
                      >
                        <span>{card.buttonText}</span>
                        <ChevronRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FDBD18]/5 to-[#0056D2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom trust section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-[#0056D2]/5 via-white to-[#FDBD18]/5 rounded-3xl p-8">
            <h3 className="text-2xl font-black text-[#0056D2] mb-6">Why Choose MyApproved?</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="font-bold text-[#0056D2] text-lg">100% Verified</div>
                <div className="text-sm text-gray-600">All tradespeople checked</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="font-bold text-[#0056D2] text-lg">Instant Quotes</div>
                <div className="text-sm text-gray-600">AI-powered estimates</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FDBD18] to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Star className="w-6 h-6 text-[#0056D2]" />
                </div>
                <div className="font-bold text-[#0056D2] text-lg">4.9★ Rating</div>
                <div className="text-sm text-gray-600">50,000+ reviews</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="font-bold text-[#0056D2] text-lg">Award Winning</div>
                <div className="text-sm text-gray-600">Industry recognized</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTACardsSection;
