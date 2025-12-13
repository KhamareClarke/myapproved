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
    <section className="py-8 bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-blue-900 drop-shadow mb-3">
            Most In-Demand Services
          </h2>
          <p className="text-blue-700/90 max-w-2xl mx-auto">
            The services customers are booking right now. Trusted, approved, and ready to help.
          </p>
        </div>
        <div className="relative mt-2">
          <div
            className="overflow-hidden"
            ref={emblaRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="flex gap-5">
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
                  className="embla__slide group min-w-[300px] max-w-[340px]"
                  aria-label={`Browse ${category.name} tradespeople`}
                >
                  <div className="relative rounded-2xl bg-white border border-blue-100/70 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 p-5 md:p-6">
                    {isPopular && (
                      <span className="absolute top-3 right-3 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-400 text-blue-900/90">
                        Popular
                      </span>
                    )}
                    <div className="flex items-center gap-4">
                      <span className="relative inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-blue-600 text-white shadow-md">
                        {TradeIcon && <TradeIcon className="w-8 h-8 md:w-9 md:h-9" />}
                        {MiniIcon && (
                          <span className="absolute -bottom-1 -right-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-white text-blue-700 border border-blue-100 shadow">
                            <MiniIcon className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-lg md:text-xl font-semibold text-blue-900 leading-tight truncate">{category.name}</h3>
                        <p className="mt-1 text-sm text-slate-600">In demand • {category.jobs} jobs</p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-slate-700">
                      <div className="inline-flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                        <span>{responseMins} min • Available now</span>
                      </div>
                      <span className="hidden sm:inline opacity-40">•</span>
                      <div className="inline-flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span>Typically replies within {responseMins} min</span>
                      </div>
                      <span className="hidden sm:inline opacity-40">•</span>
                      <div className="inline-flex items-center gap-1.5 text-blue-800 font-medium">
                        <span>{jobsToday}+ jobs booked today near you</span>
                      </div>
                    </div>
                    <Button className="mt-4 w-full h-10 bg-[#fdbd18] hover:brightness-95 text-blue-900 font-bold rounded-xl">Get My Free Quote Now</Button>
                  </div>
                </Link>
              );
            })}
            </div>
          </div>
          {/* Side arrows */}
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
            <button
              onClick={() => emblaApi && emblaApi.scrollPrev()}
              className="pointer-events-auto -ml-2 sm:ml-0 h-10 w-10 sm:h-12 sm:w-12 p-0 rounded-full border border-blue-200 bg-white/90 text-blue-700 shadow-md hover:bg-white hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#fdbd18]/60 backdrop-blur"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
            <button
              onClick={() => emblaApi && emblaApi.scrollNext()}
              className="pointer-events-auto -mr-2 sm:mr-0 h-10 w-10 sm:h-12 sm:w-12 p-0 rounded-full border border-blue-200 bg-white/90 text-blue-700 shadow-md hover:bg-white hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#fdbd18]/60 backdrop-blur"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Slide indicators */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {scrollSnaps.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full ${i === selectedIndex ? 'bg-[#fdbd18]' : 'bg-blue-200'}`}
              />
            ))}
          </div>
        </div>
        {/* Quick filters (moved below carousel) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8 mb-6">
          {['Plumber','Electrician','Builder','Painter','Roofer','Cleaner'].map((tag) => (
            <Link key={tag} href={`/find-tradespeople?trade=${encodeURIComponent(tag)}`} className="px-4 py-2 rounded-full bg-white border border-blue-100 text-blue-900 text-sm font-medium hover:border-yellow-300 hover:shadow transition">
              {tag}
            </Link>
          ))}
        </div>
        {/* Trust strip (moved below carousel) */}
        <div className="flex flex-wrap items-center justify-center gap-5 mb-6 md:mb-8 text-sm text-blue-800">
          <span className="inline-flex items-center gap-2">
            <Shield className="w-4 h-4" /> All Trades Verified
          </span>
          <span className="inline-flex items-center gap-2">
            <Shield className="w-4 h-4" /> Insurance Guaranteed
          </span>
          <span className="inline-flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" /> Rated 5.0 by 50,000+ Customers
          </span>
        </div>
        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <Link href="/find-tradespeople" className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-bold shadow">
            Browse all categories
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingCategoriesSection;
