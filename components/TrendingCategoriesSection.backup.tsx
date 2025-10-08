import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  Wrench,
  Bolt,
  Hammer,
  Paintbrush,
  Home as HomeIcon,
  Leaf,
  Layout,
  Key,
  Sparkles,
  Shield,
  Star,
  Layers,
  Square,
  Utensils,
  ShowerHead,
  Wind,
  Bug,
  Monitor,
  Thermometer,
  Brush,
  Fence,
  Droplets,
  Snowflake,
  ChevronLeft,
  ChevronRight,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

interface Category {
  name: string;
  jobs: number;
}

const tradeCategories: Category[] = [
  { name: 'Plumber', jobs: 10 },
  { name: 'Electrician', jobs: 20 },
  { name: 'Builder', jobs: 30 },
  { name: 'Painter', jobs: 40 },
  { name: 'Roofer', jobs: 50 },
  { name: 'Gardener', jobs: 60 },
  { name: 'Tiler', jobs: 70 },
  { name: 'Carpenter', jobs: 80 },
  { name: 'Locksmith', jobs: 90 },
  { name: 'Cleaner', jobs: 100 },
  { name: 'Handyman', jobs: 110 },
  { name: 'Plasterer', jobs: 120 },
  { name: 'Flooring', jobs: 130 },
  { name: 'Kitchen Fitter', jobs: 140 },
  { name: 'Bathroom Fitter', jobs: 150 },
  { name: 'Window Cleaner', jobs: 160 },
  { name: 'Pest Control', jobs: 170 },
  { name: 'Appliance Repair', jobs: 180 },
  { name: 'HVAC', jobs: 190 },
  { name: 'Decorator', jobs: 200 },
  { name: 'Driveway', jobs: 210 },
  { name: 'Fencing', jobs: 220 },
  { name: 'Guttering', jobs: 230 },
  { name: 'Insulation', jobs: 240 },
];

const TrendingCategoriesSection = () => {
  // Embla carousel for featured services
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const tradeCategoriesSorted = [...tradeCategories].sort((a, b) => b.jobs - a.jobs);
  const featuredNames = [
    'Electrician',
    'Plumber',
    'Builder',
    'Roofer',
    'Cleaner',
    'Gardener',
  ];
  const displayed = tradeCategoriesSorted.filter(c => featuredNames.includes(c.name)).slice(0, 6);
  // Handle select and snaps for indicators
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  // Auto-rotate (pause on hover)
  useEffect(() => {
    if (!emblaApi) return;
    if (isHovering) return; // pause on hover
    const id = setInterval(() => {
      try { emblaApi.scrollNext(); } catch {}
    }, 3500);
    return () => clearInterval(id);
  }, [emblaApi, isHovering]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Premium Services Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
            Most Popular Services in Your Area
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with verified professionals for the services you need most
          </p>
        </div>

        {/* Premium 2x3 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayed.map((category, index) => {
              let TradeIcon: any = null;
              let MiniIcon: any = null;
              switch (category.name) {
                case "Plumber":
                  TradeIcon = Wrench;
                  MiniIcon = Droplets;
                  break;
                case "Electrician":
                  TradeIcon = Bolt;
                  MiniIcon = Bolt;
                  break;
                case "Builder":
                  TradeIcon = Hammer;
                  MiniIcon = Hammer;
                  break;
                case "Roofer":
                  TradeIcon = HomeIcon;
                  MiniIcon = Layers;
                  break;
                case "Painter":
                  TradeIcon = Paintbrush;
                  MiniIcon = Brush;
                  break;
                case "Home":
                  TradeIcon = HomeIcon;
                  MiniIcon = HomeIcon;
                  break;
                case "Gardener":
                  TradeIcon = Leaf;
                  MiniIcon = Leaf;
                  break;
                case "Cleaner":
                  TradeIcon = Brush;
                  MiniIcon = Sparkles;
                  break;
                case "Layout":
                  TradeIcon = Layout;
                  MiniIcon = Layout;
                  break;
                case "Key":
                  TradeIcon = Key;
                  MiniIcon = Key;
                  break;
                case "Decorator":
                  TradeIcon = Sparkles;
                  MiniIcon = Sparkles;
                  break;
                case "Layers":
                  TradeIcon = Layers;
                  MiniIcon = Layers;
                  break;
                case "Square":
                  TradeIcon = Square;
                  MiniIcon = Square;
                  break;
                case "Utensils":
                  TradeIcon = Utensils;
                  MiniIcon = Utensils;
                  break;
                case "ShowerHead":
                  TradeIcon = ShowerHead;
                  MiniIcon = ShowerHead;
                  break;
                case "Wind":
                  TradeIcon = Wind;
                  MiniIcon = Wind;
                  break;
                case "Bug":
                  TradeIcon = Bug;
                  MiniIcon = Bug;
                  break;
                case "Monitor":
                  TradeIcon = Monitor;
                  MiniIcon = Monitor;
                  break;
                case "Thermometer":
                  TradeIcon = Thermometer;
                  MiniIcon = Thermometer;
                  break;
                case "Brush":
                  TradeIcon = Brush;
                  MiniIcon = Brush;
                  break;
                case "Fence":
                  TradeIcon = Fence;
                  MiniIcon = Fence;
                  break;
                case "Guttering":
                  TradeIcon = Droplets;
                  MiniIcon = Droplets;
                  break;
                default:
                  TradeIcon = Wrench;
                  MiniIcon = Wrench;
              }
              const isPopular = category.jobs >= 100;
              // Deterministic, SEO-safe urgency cues based on jobs
              const availableToday = Math.max(1, Math.round(category.jobs / 40));
              const responseMins = 5 + (category.jobs % 15);
              const jobsToday = Math.max(10, Math.floor(category.jobs / 2));
              return (
                <Link
                  key={category.name}
                  href={`/find-tradespeople?trade=${encodeURIComponent(category.name)}`}
                  className="embla__slide group min-w-[280px] max-w-[300px]"
                  aria-label={`Get ${category.name} quotes`}
                >
                  <div className="relative bg-white rounded-3xl border-2 border-gray-100 p-8 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    
                    {/* ULTIMATE Icon */}
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                        {TradeIcon && <TradeIcon className="w-10 h-10" />}
                      </div>
                    </div>

                    {/* ULTIMATE Title */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-black text-gray-900 mb-2">{category.name}</h3>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-bold text-green-600">Available Now</span>
                      </div>
                    </div>

                    {/* ULTIMATE Stats */}
                    <div className="text-center mb-8">
                      <div className="text-3xl font-black text-blue-600 mb-1">{responseMins} min</div>
                      <div className="text-sm text-gray-600">Average Response</div>
                    </div>

                    {/* ULTIMATE CTA */}
                    <Button className="w-full h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-black text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                      Get Free Quote
                    </Button>
                  </div>
                </Link>
              );
            })}
            </div>
          </div>
          {/* ULTIMATE Navigation */}
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
            <button
              onClick={() => emblaApi && emblaApi.scrollPrev()}
              className="pointer-events-auto -ml-4 h-14 w-14 rounded-full bg-white shadow-2xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 hover:scale-110"
              aria-label="Previous"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
            <button
              onClick={() => emblaApi && emblaApi.scrollNext()}
              className="pointer-events-auto -mr-4 h-14 w-14 rounded-full bg-white shadow-2xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 hover:scale-110"
              aria-label="Next"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>

          {/* ULTIMATE Indicators */}
          <div className="flex items-center justify-center gap-2 mt-12">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi && emblaApi.scrollTo(i)}
                className={`h-3 w-8 rounded-full transition-all duration-300 ${
                  i === selectedIndex 
                    ? 'bg-blue-600 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ULTIMATE Trust Section */}
        <div className="mt-20 text-center">
          <div className="flex items-center justify-center gap-12 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-black text-gray-900">10,000+</div>
                <div className="text-sm text-gray-600">Verified Pros</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-left">
                <div className="font-black text-gray-900">4.9★</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-black text-gray-900">£2M+</div>
                <div className="text-sm text-gray-600">Insured</div>
              </div>
            </div>
          </div>

          {/* ULTIMATE Final CTA */}
          <Link 
            href="/find-tradespeople" 
            className="inline-flex items-center px-12 py-5 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            Browse All Services
            <ChevronRight className="w-6 h-6 ml-3" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingCategoriesSection;
