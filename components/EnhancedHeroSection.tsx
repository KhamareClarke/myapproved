"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  ChevronRight, 
  Star, 
  Shield, 
  CheckCircle, 
  Clock, 
  Users,
  Zap,
  TrendingUp,
  Award,
  Play
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const EnhancedHeroSection = () => {
  const [jobsCount, setJobsCount] = useState(2000);
  const [reviewsCount, setReviewsCount] = useState(45000);
  const [tradespeopleCount, setTradespeopleCount] = useState(8000);

  // Animated counters
  useEffect(() => {
    const animateCounter = (target: number, setter: (value: number) => void, duration: number = 2000) => {
      const start = target * 0.7;
      const increment = (target - start) / (duration / 16);
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 16);
    };

    const timer = setTimeout(() => {
      animateCounter(2847, setJobsCount);
      animateCounter(50000, setReviewsCount);
      animateCounter(10000, setTradespeopleCount);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const popularServices = [
    'Plumber', 'Electrician', 'Builder', 'Painter', 'Roofer', 
    'Cleaner', 'Gardener', 'Handyman', 'Carpenter', 'Tiler'
  ];

  const trustBadges = [
    { name: 'BBC', logo: '/logos/bbc.png' },
    { name: 'TrustPilot', logo: '/logos/trustpilot.png' },
    { name: 'Google', logo: '/logos/google.png' },
    { name: 'Which?', logo: '/logos/which.png' }
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0056D2] via-blue-700 to-blue-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#FDBD18]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#FDBD18]/5 to-transparent rounded-full blur-3xl animate-spin" style={{animationDuration: '20s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column: Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Live stats bar */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold">LIVE: {jobsCount.toLocaleString()} jobs today</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Star className="w-4 h-4 text-[#FDBD18]" />
                <span className="text-sm font-bold">4.9★ from {reviewsCount.toLocaleString()}+ reviews</span>
              </div>
            </div>

            {/* Main headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight">
                <span className="block text-[#FDBD18] drop-shadow-lg">Find Trusted</span>
                <span className="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                  Tradespeople
                </span>
                <span className="block text-[#FDBD18] drop-shadow-lg">in Seconds</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 font-semibold leading-relaxed max-w-2xl">
                Get instant <span className="text-[#FDBD18] bg-[#FDBD18]/20 px-2 py-1 rounded-lg font-black">AI quotes</span> from 
                {' '}{tradespeopleCount.toLocaleString()}+ verified, insured professionals across the UK
              </p>
            </div>

            {/* Trust points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center border border-green-400/30">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <div className="font-bold text-white">No Cowboy Builders</div>
                  <div className="text-sm text-blue-200">All trades verified & insured</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#FDBD18]/20 rounded-2xl flex items-center justify-center border border-[#FDBD18]/30">
                  <Zap className="w-6 h-6 text-[#FDBD18]" />
                </div>
                <div>
                  <div className="font-bold text-white">60-Second Quotes</div>
                  <div className="text-sm text-blue-200">AI-powered instant estimates</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-400/30">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <div className="font-bold text-white">3-Min Response</div>
                  <div className="text-sm text-blue-200">Average tradesperson reply</div>
                </div>
              </div>
            </div>

            {/* Enhanced search box */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">What do you need?</label>
                    <Select>
                      <SelectTrigger className="h-12 rounded-2xl border-2 border-gray-200 focus:border-[#0056D2] bg-white">
                        <SelectValue placeholder="Choose a service..." />
                      </SelectTrigger>
                      <SelectContent>
                        {popularServices.map((service) => (
                          <SelectItem key={service} value={service.toLowerCase()}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Where are you?</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input 
                        placeholder="Enter postcode or city"
                        className="h-12 pl-12 rounded-2xl border-2 border-gray-200 focus:border-[#0056D2] bg-white"
                      />
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full h-14 bg-gradient-to-r from-[#FDBD18] to-yellow-400 hover:from-yellow-400 hover:to-[#FDBD18] text-[#0056D2] font-black text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
                >
                  <Search className="w-5 h-5 mr-3" />
                  <span>Get Instant Quotes</span>
                  <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                
                <div className="text-center text-sm text-gray-600">
                  <span className="font-semibold">Free • No obligation • Takes 60 seconds</span>
                </div>
              </div>
            </div>

            {/* As seen on badges */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-blue-200 text-center">As featured on:</p>
              <div className="flex items-center justify-center gap-6 opacity-80">
                {trustBadges.map((badge) => (
                  <div key={badge.name} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                    <div className="text-white font-bold text-sm">{badge.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Content */}
          <div className="relative animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <div className="relative">
              {/* Main hero image/video */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm">
                <img
                  src="/hero.png"
                  alt="Professional tradesperson at work"
                  className="w-full h-[500px] md:h-[600px] object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `
                      <div class="w-full h-[500px] md:h-[600px] bg-gradient-to-br from-[#FDBD18] to-yellow-400 flex items-center justify-center">
                        <div class="text-center text-[#0056D2]">
                          <Users class="w-24 h-24 mx-auto mb-4" />
                          <div class="text-2xl font-black">Professional Tradespeople</div>
                          <div class="text-lg">Ready to help with your project</div>
                        </div>
                      </div>
                    `;
                  }}
                />
                
                {/* Play button overlay for video */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 hover:bg-white/30 hover:scale-110 transition-all duration-300 group">
                    <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform duration-300" />
                  </button>
                </div>
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>

              {/* Floating stats cards */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 animate-bounce" style={{animationDelay: '1s'}}>
                <div className="text-center">
                  <div className="text-2xl font-black text-[#0056D2]">{jobsCount.toLocaleString()}</div>
                  <div className="text-xs text-gray-600 font-bold">Jobs Today</div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 animate-bounce" style={{animationDelay: '1.5s'}}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-[#0056D2]">98% Success</div>
                    <div className="text-xs text-gray-600">Job Completion</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1,2,3].map((i) => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-br from-[#0056D2] to-blue-700 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                        {i}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-black text-[#0056D2]">3 Quotes</div>
                    <div className="text-xs text-gray-600">In 2 minutes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-20 fill-white">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
