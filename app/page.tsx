 "use client";

import { useState, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { SchemaMarkup, organizationSchema, WebsiteSchema, ServiceSchema } from '@/components/SchemaMarkup';
import dynamic from "next/dynamic";

// Dynamically import the InDemandServices component with SSR disabled
const InDemandServices = dynamic(
  () => import("./components/InDemandServices"),
  { ssr: false }
);
import {
  Search,
  MapPin,
  Star,
  Shield,
  UsersRound,
  TrendingUp,
  ChevronRight,
  Phone,
  Mail,
  ChevronLeft,
  Smartphone,
  Download,
  Bell,
  Calculator,
  Clock,
  Upload,
  X,
  User,
  Wrench,
  ChevronDown,
  CheckCircle,
  ShieldCheck,
  CircleDollarSign,
  Bolt,
  Hammer,
  Paintbrush,
  Home as HomeIcon,
  Leaf,
  Layout,
  Key,
  Sparkles,
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
  ArrowRight,
  Users,
  UserPlus,
  MessageSquareText
} from "lucide-react";
import "./recommended-scrollbar.css";
import SmartSearchBar from "../components/SmartSearchBar";
import TabsSection from "../components/TabsSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import InitialsAvatar from "@/components/InitialsAvatar";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import CookieConsent from "@/components/CookieConsent";
import FloatingAssistant from "@/components/FloatingAssistant";

 // Map trade to icon for Select menu (visual only)
 const tradeIconFor = (name: string) => {
   const n = name.toLowerCase();
   if (n.includes('plumb')) return <Droplets className="w-4 h-4 text-blue-600" />;
   if (n.includes('electric')) return <Bolt className="w-4 h-4 text-yellow-600" />;
   if (n.includes('builder')) return <Hammer className="w-4 h-4 text-gray-700" />;
   if (n.includes('paint')) return <Paintbrush className="w-4 h-4 text-rose-600" />;
   if (n.includes('roof')) return <HomeIcon className="w-4 h-4 text-amber-700" />;
   if (n.includes('garden')) return <Leaf className="w-4 h-4 text-green-700" />;
   if (n.includes('tiler') || n.includes('tile')) return <Layout className="w-4 h-4 text-slate-700" />;
   if (n.includes('carpenter')) return <Wrench className="w-4 h-4 text-amber-700" />;
   if (n.includes('lock')) return <Key className="w-4 h-4 text-slate-700" />;
   if (n.includes('clean')) return <Brush className="w-4 h-4 text-cyan-700" />;
   if (n.includes('fence')) return <Fence className="w-4 h-4 text-emerald-700" />;
   if (n.includes('hvac') || n.includes('air')) return <Wind className="w-4 h-4 text-sky-700" />;
   if (n.includes('bathroom')) return <ShowerHead className="w-4 h-4 text-sky-700" />;
   if (n.includes('kitchen')) return <Utensils className="w-4 h-4 text-amber-700" />;
   if (n.includes('appliance')) return <Monitor className="w-4 h-4 text-slate-700" />;
   if (n.includes('pest')) return <Bug className="w-4 h-4 text-rose-700" />;
   if (n.includes('insulation')) return <Thermometer className="w-4 h-4 text-orange-700" />;
   if (n.includes('gutter')) return <Droplets className="w-4 h-4 text-blue-600" />;
   return <Wrench className="w-4 h-4 text-slate-700" />;
 };

// Helper function to get trade icon with custom className for enhanced sections
const getTradeIcon = (tradeName: string, className: string = "w-6 h-6") => {
  const n = tradeName.toLowerCase();
  if (n.includes('plumb')) return <Droplets className={className} />;
  if (n.includes('electric')) return <Bolt className={className} />;
  if (n.includes('builder')) return <Hammer className={className} />;
  if (n.includes('paint')) return <Paintbrush className={className} />;
  if (n.includes('roof')) return <HomeIcon className={className} />;
  if (n.includes('garden')) return <Leaf className={className} />;
  if (n.includes('tiler') || n.includes('tile')) return <Layout className={className} />;
  if (n.includes('carpenter')) return <Wrench className={className} />;
  if (n.includes('lock')) return <Key className={className} />;
  if (n.includes('clean')) return <Sparkles className={className} />;
  if (n.includes('fence')) return <Fence className={className} />;
  if (n.includes('hvac') || n.includes('air')) return <Wind className={className} />;
  if (n.includes('bathroom')) return <ShowerHead className={className} />;
  if (n.includes('kitchen')) return <Utensils className={className} />;
  if (n.includes('appliance')) return <Monitor className={className} />;
  if (n.includes('pest')) return <Bug className={className} />;
  if (n.includes('insulation')) return <Thermometer className={className} />;
  if (n.includes('gutter')) return <Droplets className={className} />;
  return <Wrench className={className} />;
};

const tradeCategories = [
  { name: "Plumber", icon: "P", jobs: 1247 },
  { name: "Electrician", icon: "E", jobs: 892 },
  { name: "Builder", icon: "B", jobs: 1156 },
  { name: "Painter", icon: "P", jobs: 743 },
  { name: "Roofer", icon: "R", jobs: 567 },
  { name: "Gardener", icon: "G", jobs: 834 },
  { name: "Tiler", icon: "T", jobs: 445 },
  { name: "Carpenter", icon: "C", jobs: 678 },
  { name: "Locksmith", icon: "L", jobs: 324 },
  { name: "Cleaner", icon: "C", jobs: 956 },
  { name: "Handyman", icon: "H", jobs: 1089 },
  { name: "Plasterer", icon: "P", jobs: 387 },
  { name: "Flooring", icon: "F", jobs: 523 },
  { name: "Kitchen Fitter", icon: "K", jobs: 298 },
  { name: "Bathroom Fitter", icon: "B", jobs: 412 },
  { name: "Window Cleaner", icon: "W", jobs: 634 },
  { name: "Pest Control", icon: "P", jobs: 189 },
  { name: "Appliance Repair", icon: "A", jobs: 267 },
  { name: "HVAC", icon: "H", jobs: 345 },
  { name: "Decorator", icon: "D", jobs: 456 },
  { name: "Driveway", icon: "D", jobs: 234 },
  { name: "Fencing", icon: "F", jobs: 378 },
  { name: "Guttering", icon: "G", jobs: 289 },
  { name: "Insulation", icon: "I", jobs: 156 },
];

type FeaturedTP = {
  id: string;
  name: string;
  trade: string;
  rating: number;
  reviews: number;
  location: string;
  image: string | null;
  verified: boolean;
  yearsExperience: number;
};
// Will be populated from API
// const initialFeatured: FeaturedTP[] = [];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    trade: "",
    description: "",
    postcode: "",
    urgency: "",
    availability: "",
    images: [] as File[],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [estimate, setEstimate] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [featured, setFeatured] = useState<FeaturedTP[]>([]);
  // Embla for Recommended Jobs (ensures full cards per view)
  const [recEmblaRef, recEmblaApi] = useEmblaCarousel({ loop: false, align: 'start', containScroll: 'trimSnaps' });
  // Testimonials carousel state
  const [testimonialsSlide, setTestimonialsSlide] = useState(0);
  // Embla carousel for Most Popular Services
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      try { emblaApi.scrollNext(); } catch {}
    }, 3500);
    return () => clearInterval(interval);
  }, [emblaApi]);
  // Testimonials data and auto-rotate
  const testimonials = [
    {
      name: 'Sarah Thompson',
      city: 'London',
      quote:
        'I had an electrical fault late evening and got matched within minutes. The electrician arrived the next morning and fixed it quickly. The whole process felt safe and transparent.',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      name: 'Imran Khan',
      city: 'Manchester',
      quote:
        'Instant quotes saved me so much time. I compared two options, read reviews, and booked in the same hour. The pro turned up on time and the work was spotless.',
      image: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
    {
      name: 'Rebecca Lewis',
      city: 'Birmingham',
      quote:
        'The verified and insured badges gave me confidence. I chose a roofer with great ratings and the price matched the estimate. Would definitely use again.',
      image: 'https://randomuser.me/api/portraits/women/17.jpg',
    },
    {
      name: 'Daniel Murphy',
      city: 'Leeds',
      quote:
        'Super easy to use. I uploaded a couple of photos and got realistic estimates. The tradesman was friendly, tidy, and finished faster than expected.',
      image: 'https://randomuser.me/api/portraits/men/33.jpg',
    },
    {
      name: 'James Patel',
      city: 'Liverpool',
      quote:
        'Booked a plumber in minutes and the communication was brilliant. No hidden costs and the workmanship was excellent. Highly recommend.',
      image: 'https://randomuser.me/api/portraits/men/76.jpg',
    },
    {
      name: 'Priya Singh',
      city: 'Nottingham',
      quote:
        'The insurance guarantee gave me peace of mind. I loved being able to compare profiles and see genuine reviews before confirming.',
      image: 'https://randomuser.me/api/portraits/women/25.jpg',
    },
    {
      name: 'Oliver Wright',
      city: 'Bristol',
      quote:
        'Fast responses and fair pricing. I appreciated the clear timelines and follow-up. Great experience from start to finish.',
      image: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: 'Amelia Clark',
      city: 'Edinburgh',
      quote:
        'I found an experienced decorator who matched my budget. The work was spotless and on schedule. I’ll be back for future projects.',
      image: 'https://randomuser.me/api/portraits/women/49.jpg',
    },
  ];
  const testimonialsPerSlide = 3;
  const testimonialSlides = Math.ceil(testimonials.length / testimonialsPerSlide);
  useEffect(() => {
    const id = setInterval(() => {
      setTestimonialsSlide((i) => (i + 1) % testimonialSlides);
    }, 4500);
    return () => clearInterval(id);
  }, [testimonialSlides]);
  // Rotating hero search messages
  const typingPhrases = [
    "Search plumber in London...",
    "Find electrician in Manchester...",
    "Book roofer in Birmingham...",
    "Hire gardener in Leeds...",
  ];
  const [typed, setTyped] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = typingPhrases[phraseIndex];
    const speed = deleting ? 60 : 100;
    const id = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, charIndex + 1);
        setTyped(next);
        setCharIndex(charIndex + 1);
        if (next === current) setDeleting(true);
      } else {
        const next = current.slice(0, Math.max(0, charIndex - 1));
        setTyped(next);
        setCharIndex(Math.max(0, charIndex - 1));
        if (next.length === 0) {
          setDeleting(false);
          setPhraseIndex((phraseIndex + 1) % typingPhrases.length);
        }
      }
    }, speed);
    return () => clearTimeout(id);
  }, [charIndex, deleting, phraseIndex, typingPhrases]);

  const itemsPerSlide = 8;
  const totalSlides = Math.ceil(tradeCategories.length / itemsPerSlide);

  const trades = [
    "Plumber",
    "Electrician",
    "Builder",
    "Painter",
    "Roofer",
    "Gardener",
    "Tiler",
    "Carpenter",
    "Locksmith",
    "Cleaner",
    "Handyman",
    "Plasterer",
    "Flooring",
    "Kitchen Fitter",
    "Bathroom Fitter",
    "Window Cleaner",
    "Pest Control",
    "Appliance Repair",
    "HVAC",
    "Decorator",
    "Driveway",
    "Fencing",
    "Guttering",
    "Insulation",
    "Other",
  ];

  const urgencyOptions = [
    { value: "emergency", label: "Emergency (Same day)", icon: "!" },
    { value: "urgent", label: "Urgent (Within 24 hours)", icon: "!" },
    { value: "normal", label: "Normal (Within a week)", icon: "•" },
    { value: "flexible", label: "Flexible (No rush)", icon: "~" },
  ];

  const steps = [
    { number: 1, title: "Select Trade", icon: "1" },
    { number: 2, title: "Describe Job", icon: "2" },
    { number: 3, title: "Location & Timing", icon: "3" },
    { number: 4, title: "Get Estimate", icon: "4" },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalSlides, isAutoPlaying]);

  // Load featured tradespeople from API (top 3)
  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const res = await fetch(
          "/api/tradespeopleeeee/list?page=1&limit=3&sortBy=rating",
          { cache: "no-store" } as RequestInit
        );
        const data = await res.json();
        if (data.success) {
          const mapped: FeaturedTP[] = (data.tradespeople || []).map(
            (p: any) => ({
              id: p.id,
              name: p.name,
              trade: p.trade,
              rating: p.rating,
              reviews: p.reviews,
              location: (p.location || "").toString().split(",")[0] || "",
              image: p.image || null,
              verified: p.verified || false,
              yearsExperience: p.yearsExperience || 0,
            })
          );
          setFeatured(mapped);
        }
      } catch {}
    };
    loadFeatured();
  }, []);


  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  const getCurrentSlideItems = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return tradeCategories.slice(startIndex, startIndex + itemsPerSlide);
  };

  const handleInputChange = (field: string, value: string | File[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateEstimate = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Base pricing by trade and urgency
      const basePricing = {
        plumber: {
          emergency: { min: 200, max: 350 },
          urgent: { min: 150, max: 250 },
          normal: { min: 100, max: 200 },
          flexible: { min: 80, max: 150 },
        },
        electrician: {
          emergency: { min: 300, max: 500 },
          urgent: { min: 200, max: 350 },
          normal: { min: 150, max: 250 },
          flexible: { min: 100, max: 200 },
        },
        builder: {
          emergency: { min: 500, max: 1000 },
          urgent: { min: 400, max: 800 },
          normal: { min: 300, max: 600 },
          flexible: { min: 200, max: 400 },
        },
        painter: {
          emergency: { min: 250, max: 400 },
          urgent: { min: 200, max: 300 },
          normal: { min: 150, max: 250 },
          flexible: { min: 100, max: 200 },
        },
        roofer: {
          emergency: { min: 400, max: 700 },
          urgent: { min: 300, max: 500 },
          normal: { min: 250, max: 400 },
          flexible: { min: 200, max: 350 },
        },
        carpenter: {
          emergency: { min: 300, max: 500 },
          urgent: { min: 250, max: 400 },
          normal: { min: 200, max: 300 },
          flexible: { min: 150, max: 250 },
        },
        tiler: {
          emergency: { min: 350, max: 600 },
          urgent: { min: 300, max: 500 },
          normal: { min: 250, max: 400 },
          flexible: { min: 200, max: 350 },
        },
        handyman: {
          emergency: { min: 150, max: 300 },
          urgent: { min: 120, max: 250 },
          normal: { min: 100, max: 200 },
          flexible: { min: 80, max: 150 },
        },
        cleaner: {
          emergency: { min: 100, max: 200 },
          urgent: { min: 80, max: 150 },
          normal: { min: 60, max: 120 },
          flexible: { min: 50, max: 100 },
        },
        locksmith: {
          emergency: { min: 200, max: 400 },
          urgent: { min: 150, max: 300 },
          normal: { min: 100, max: 200 },
          flexible: { min: 80, max: 150 },
        },
        gardener: {
          emergency: { min: 120, max: 250 },
          urgent: { min: 100, max: 200 },
          normal: { min: 80, max: 150 },
          flexible: { min: 60, max: 120 },
        },
        plasterer: {
          emergency: { min: 250, max: 450 },
          urgent: { min: 200, max: 350 },
          normal: { min: 150, max: 250 },
          flexible: { min: 120, max: 200 },
        },
        flooring: {
          emergency: { min: 300, max: 600 },
          urgent: { min: 250, max: 500 },
          normal: { min: 200, max: 400 },
          flexible: { min: 150, max: 300 },
        },
        "kitchen fitter": {
          emergency: { min: 800, max: 1500 },
          urgent: { min: 600, max: 1200 },
          normal: { min: 500, max: 1000 },
          flexible: { min: 400, max: 800 },
        },
        "bathroom fitter": {
          emergency: { min: 600, max: 1200 },
          urgent: { min: 500, max: 1000 },
          normal: { min: 400, max: 800 },
          flexible: { min: 300, max: 600 },
        },
        "window cleaner": {
          emergency: { min: 80, max: 150 },
          urgent: { min: 60, max: 120 },
          normal: { min: 50, max: 100 },
          flexible: { min: 40, max: 80 },
        },
        "pest control": {
          emergency: { min: 150, max: 300 },
          urgent: { min: 120, max: 250 },
          normal: { min: 100, max: 200 },
          flexible: { min: 80, max: 150 },
        },
        "appliance repair": {
          emergency: { min: 200, max: 400 },
          urgent: { min: 150, max: 300 },
          normal: { min: 120, max: 250 },
          flexible: { min: 100, max: 200 },
        },
        hvac: {
          emergency: { min: 400, max: 700 },
          urgent: { min: 300, max: 500 },
          normal: { min: 250, max: 400 },
          flexible: { min: 200, max: 350 },
        },
        decorator: {
          emergency: { min: 200, max: 350 },
          urgent: { min: 150, max: 250 },
          normal: { min: 120, max: 200 },
          flexible: { min: 100, max: 180 },
        },
        driveway: {
          emergency: { min: 500, max: 1000 },
          urgent: { min: 400, max: 800 },
          normal: { min: 300, max: 600 },
          flexible: { min: 250, max: 500 },
        },
        fencing: {
          emergency: { min: 300, max: 600 },
          urgent: { min: 250, max: 500 },
          normal: { min: 200, max: 400 },
          flexible: { min: 150, max: 300 },
        },
        guttering: {
          emergency: { min: 200, max: 400 },
          urgent: { min: 150, max: 300 },
          normal: { min: 120, max: 250 },
          flexible: { min: 100, max: 200 },
        },
        insulation: {
          emergency: { min: 400, max: 800 },
          urgent: { min: 300, max: 600 },
          normal: { min: 250, max: 500 },
          flexible: { min: 200, max: 400 },
        },
      };

      // Location multipliers (based on UK regions)
      const locationMultipliers = {
        london: 1.4,
        manchester: 1.2,
        birmingham: 1.1,
        leeds: 1.1,
        liverpool: 1.0,
        sheffield: 1.0,
        edinburgh: 1.2,
        glasgow: 1.1,
        bristol: 1.2,
        cardiff: 1.1,
        newcastle: 1.0,
        belfast: 1.0,
        default: 1.0,
      };

      const tradeKey = formData.trade.toLowerCase();
      const urgencyKey = formData.urgency as keyof typeof basePricing.plumber;

      // Get base pricing for the trade and urgency
      const basePrice =
        basePricing[tradeKey as keyof typeof basePricing]?.[urgencyKey] ||
        basePricing.handyman[urgencyKey];

      // Determine location multiplier
      const postcode = formData.postcode.toLowerCase();
      let locationMultiplier = locationMultipliers.default;

      // Check for major cities in postcode
      for (const [city, multiplier] of Object.entries(locationMultipliers)) {
        if (postcode.includes(city)) {
          locationMultiplier = multiplier;
          break;
        }
      }

      // Apply location multiplier
      const adjustedMin = Math.round(basePrice.min * locationMultiplier);
      const adjustedMax = Math.round(basePrice.max * locationMultiplier);

      // Add some randomness to make it feel more realistic
      const randomVariation = 0.9 + Math.random() * 0.2; // ±10% variation
      const finalMin = Math.round(adjustedMin * randomVariation);
      const finalMax = Math.round(adjustedMax * randomVariation);

      const estimate = `£${finalMin}-${finalMax}`;
      setEstimate(estimate);
    } catch (error) {
      console.error("Error generating estimate:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitJob = async () => {
    // Simply redirect to login
    window.location.href = '/login/client';
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8 md:mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                What <span className="text-[#fdbd18]">service</span> do you need?
              </h3>
              <p className="text-gray-600 text-base md:text-lg">
                Select the type of <span className="text-[#fdbd18] font-semibold">trade</span> you are looking for
              </p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <Sparkles className="w-4 h-4" /> AI will tailor questions for faster, accurate quotes
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent my-2 md:my-3" />

            <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-[2px] border border-blue-100 rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm">
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-4">
                Trade Category <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.trade}
                onValueChange={(value) => handleInputChange("trade", value)}
              >
                <SelectTrigger className="w-full h-14 rounded-xl border border-blue-200 bg-white/90 focus:ring-2 focus:ring-blue-400 focus:border-blue-300 transition-shadow shadow-sm hover:shadow">
                  <SelectValue placeholder="e.g. Plumber, Electrician, Builder" />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {tradeCategories.map((option) => (
                    <SelectItem key={option.name} value={option.name.toLowerCase()}>
                      <div className="flex items-center gap-2">
                        {tradeIconFor(option.name)}
                        <span>{option.name}</span>
                        <span className="ml-auto text-[11px] text-slate-500">{option.jobs} jobs</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-blue-800"><ShieldCheck className="w-3.5 h-3.5" /> Verified pros</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-200 bg-yellow-50 px-2.5 py-1 text-yellow-800"><Star className="w-3.5 h-3.5" /> Top rated</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-green-800"><Clock className="w-3.5 h-3.5" /> Under 60s</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-amber-800"><Shield className="w-3.5 h-3.5" /> Fully insured</span>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Tell us about your <span className="text-[#fdbd18]">job</span>
              </h3>
              <p className="text-gray-600 text-base md:text-lg">
                A few details help us get you an <span className="text-[#fdbd18] font-semibold">accurate</span> quote
              </p>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <Sparkles className="w-3.5 h-3.5" /> AI highlights what pros need to know
              </div>
            </div>

            <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-[2px] border border-blue-100 rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                    Describe the work <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="E.g. Leak under kitchen sink, steady drip when tap runs…"
                    className="min-h-[120px] text-base bg-white border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Tip: mention size, access, materials, and any photos
                  </p>
                </div>

                <div>
                  <label className="block text-sm md:text-base font-semibold text-gray-700 mb-3">
                    Urgency <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.urgency}
                    onValueChange={(value) => handleInputChange("urgency", value)}
                  >
                    <SelectTrigger className="w-full h-12 rounded-xl border border-blue-200 bg-white/90 focus:ring-2 focus:ring-blue-400 focus:border-blue-300 transition-shadow shadow-sm hover:shadow">
                      <SelectValue placeholder="How urgent is it? (e.g. Emergency, Urgent, Normal)" />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyOptions.map((u) => (
                        <SelectItem key={u.value} value={u.value}>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-700" />
                            <span>{u.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm md:text-base font-semibold text-gray-700 mb-3">
                    Add photos (optional)
                  </label>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-11 rounded-xl bg-blue-700 hover:bg-blue-800 text-white"
                    >
                      <Upload className="w-4 h-4 mr-2" /> Upload images
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <span className="text-xs text-gray-500">JPG or PNG up to 10MB each</span>
                  </div>

                  {formData.images?.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {formData.images.map((file, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`upload-${idx}`}
                            className="h-24 w-full object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute -top-2 -right-2 bg-white/95 border border-gray-200 rounded-full p-1 shadow hover:shadow-md"
                            aria-label="Remove image"
                          >
                            <X className="w-3.5 h-3.5 text-gray-700" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-blue-800"><ShieldCheck className="w-3.5 h-3.5" /> Verified pros</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-amber-800"><Shield className="w-3.5 h-3.5" /> Fully insured</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Location & Availability
              </h3>
              <p className="text-gray-600">
                Where and when do you need the work done?
              </p>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <MapPin className="w-3.5 h-3.5" /> AI suggests nearby verified pros based on your area
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Where? <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  value={formData.postcode}
                  onChange={(e) =>
                    handleInputChange("postcode", e.target.value.toUpperCase())
                  }
                  placeholder="Enter your postcode or town"
                  className="pl-10 h-12 text-base text-gray-900 bg-white border-gray-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Preferred Availability
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Morning", "Afternoon", "Evening", "Flexible"].map((time) => (
                  <Button
                    key={time}
                    variant={
                      formData.availability === time ? "default" : "outline"
                    }
                    onClick={() => handleInputChange("availability", time)}
                    className={`h-14 text-sm md:text-base font-medium transition-all duration-200 ${
                      formData.availability === time
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg"
                        : "bg-white text-gray-900 border-2 border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                    }`}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Your AI Estimate
              </h3>
              <p className="text-gray-600">
                Based on your job details and location
              </p>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
                <p className="text-gray-600">Generating your estimate...</p>
              </div>
            ) : estimate ? (
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl">
                <CardContent className="p-8 md:p-10 text-center">
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
                    {estimate}
                  </div>
                  <p className="text-gray-700 mb-6 text-lg">
                    Estimated cost for your {formData.trade.toLowerCase()} job
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-gray-700 bg-white/50 rounded-lg p-4 mb-6">
                    <div>
                      <strong>Trade:</strong> {formData.trade}
                    </div>
                    <div>
                      <strong>Location:</strong> {formData.postcode}
                    </div>
                    <div>
                      <strong>Urgency:</strong>{" "}
                      {
                        urgencyOptions.find((u) => u.value === formData.urgency)
                          ?.label
                      }
                    </div>
                    <div>
                      <strong>Availability:</strong>{" "}
                      {formData.availability || "Flexible"}
                    </div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800 font-medium">
                      ⚠️ This is an AI-generated quote. Your selected tradesman
                      may quote differently.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center">
                <Button
                  onClick={generateEstimate}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black text-lg font-medium py-4 px-8 rounded-lg font-semibold"
                >
                  Generate Estimate
                </Button>
              </div>
            )}

            {estimate && (
              <div className="text-center space-y-4">
                <div className="space-y-3">
                  <Button
                    onClick={submitJob}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base md:text-lg font-medium py-3 sm:py-4 px-4 sm:px-6 md:px-8 rounded-lg w-full font-semibold"
                  >
                    Submit Job for Approval
                  </Button>
                  
                <Button
                  asChild
                    variant="outline"
                    className="bg-blue-700 hover:bg-blue-800 text-white text-sm sm:text-base md:text-lg font-medium py-3 sm:py-4 px-4 sm:px-6 md:px-8 rounded-lg w-full font-semibold"
                >
                  <Link href="/find-tradespeople">
                      Browse Tradespeople Instead
                  </Link>
                </Button>
                </div>
                
                {submitResult && (
                  <div className={`p-4 rounded-lg ${
                    submitResult.success 
                      ? 'bg-green-50 border border-green-200 text-green-800' 
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}>
                    <p className="font-semibold">{submitResult.message}</p>
                    {submitResult.data?.jobId && (
                      <p className="text-sm mt-1">Job ID: {submitResult.data.jobId}</p>
                    )}
                  </div>
                )}
                
                <p className="text-sm text-gray-700">
                  Submit your job for admin approval, or browse available tradespeople
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // Add Font Awesome CSS for icons (client-only, in effect to avoid hydration issues)
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
    link.rel = "stylesheet";
    link.crossOrigin = "anonymous";
    link.referrerPolicy = "no-referrer";
    document.head.appendChild(link);
    return () => {
      try {
        document.head.removeChild(link);
      } catch {}
    };
  }, []);

  return (
    <div suppressHydrationWarning>
      {/* SEO Schema Markup */}
      <SchemaMarkup schema={organizationSchema} />
      <WebsiteSchema />
      <SchemaMarkup schema={ServiceSchema} />
      
      <CookieConsent />
      <FloatingAssistant mode="home" />
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-white overflow-hidden min-h-[90vh] flex items-center pt-4 mb-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/80 via-blue-800/70 to-indigo-800/60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.2),transparent_50%)] animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-400/20 rounded-full blur-xl animate-bounce" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-white/10 rounded-full blur-lg animate-bounce" style={{animationDelay: '2s'}}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 flex flex-col lg:flex-row items-start lg:items-end gap-8 sm:gap-12">
          {/* Left Column: Text & Search */}
          <div className="flex-1 z-10 flex flex-col items-start justify-center text-left">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 mb-4 animate-fade-in">
                <Star className="w-3.5 h-3.5 text-yellow-400" />
                <span className="text-xs font-medium text-yellow-100">Rated #1 Tradesperson Platform</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6 text-balance animate-slide-up">
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl font-black">Find</span> <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl font-black">Trusted</span>
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl animate-pulse font-black">Local </span>
                <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl font-black">Trades</span>
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl animate-pulse font-black">people</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-blue-100 leading-relaxed mb-2 animate-slide-up" style={{animationDelay: '0.1s'}}>
                Hire vetted professionals near you — fast, reliable, and backed by verified reviews.
              </p>
            </div>
            
            {/* Statistics Bar - Single Line */}
            <div className="flex items-center gap-4 mb-3 animate-slide-up whitespace-nowrap overflow-x-auto pb-2 -mx-2 px-2" style={{animationDelay: '0.4s'}}>
              <div className="flex items-center gap-1 text-white/90 bg-white/5 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
                <span className="text-xs font-medium">50,000+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-1 text-white/90 bg-white/5 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
                <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse flex-shrink-0" style={{animationDelay: '0.5s'}}></div>
                <span className="text-xs font-medium">5,000+ Verified Trades</span>
              </div>
              <div className="flex items-center gap-1 text-white/90 bg-white/5 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse flex-shrink-0" style={{animationDelay: '1s'}}></div>
                <span className="text-xs font-medium">4.9★ Average Rating</span>
              </div>
            </div>
            <div className="w-full max-w-4xl animate-slide-up" style={{animationDelay: '0.6s'}}>
              <Dialog>
                <DialogTrigger asChild>
                  <div id="ai-quote-trigger" className="relative group cursor-pointer">
                    {/* Enhanced Glow Effect with Gold Accent */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-3xl blur-lg opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/50 via-white/30 to-yellow-400/50 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                    
                    <div className="relative flex items-center bg-white backdrop-blur-sm rounded-xl shadow-xl p-3 border-2 border-yellow-400/60 group-hover:border-yellow-400 transition-all duration-300">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md group-hover:scale-105 transition-transform duration-200">
                        <Search className="w-5 h-5 text-white" />
                      </div>
                      <input
                        type="text"
                        placeholder={typed || typingPhrases[phraseIndex]}
                        className="flex-1 py-3 px-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none text-base font-medium bg-transparent cursor-pointer"
                        readOnly
                      />
                      <Button
                        type="button"
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-medium rounded-lg px-6 h-12 text-sm shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl w-full p-0 bg-white max-h-[90vh] overflow-y-auto">
                  <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                    {/* 4-Step AI Quote Form (Stepper) */}
                    <div className="flex items-center justify-between mb-8 md:mb-10">
                      {steps.map((step, index) => (
                        <div key={step.number} className="flex items-center flex-1">
                          <div
                            className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
                              currentStep >= step.number
                                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-110"
                                : "bg-gray-100 text-gray-500 border-2 border-gray-200"
                            }`}
                          >
                            {currentStep > step.number ? (
                              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                            ) : (
                              step.number
                            )}
                          </div>
                          {index < steps.length - 1 && (
                            <div
                              className={`flex-1 h-1 mx-2 md:mx-4 rounded-full transition-all duration-300 ${
                                currentStep > step.number
                                  ? "bg-gradient-to-r from-blue-600 to-blue-700"
                                  : "bg-gray-200"
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="min-h-[350px] md:min-h-[400px]">{renderStep()}</div>
                    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 md:mt-10">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="flex items-center justify-center bg-white text-gray-900 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 px-6 py-3 text-base font-medium"
                      >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                      {currentStep < 4 && (
                        <Button
                          onClick={nextStep}
                          disabled={
                            (currentStep === 1 && !formData.trade) ||
                            (currentStep === 2 && (!formData.description || !formData.urgency)) ||
                            (currentStep === 3 && !formData.postcode)
                          }
                          className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-8 py-3 text-base shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          Next
                        </Button>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              {/* Enhanced Trust badges - Compact */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs animate-slide-up" style={{animationDelay: '0.8s'}}>
                <div className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm px-2 py-1 rounded-full border border-green-400/30 shadow-sm">
                  <ShieldCheck className="w-3 h-3 text-green-400" />
                  <span className="font-medium text-green-100">All Trades <span className="text-white">Verified</span></span>
                </div>
                <div className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm px-2 py-1 rounded-full border border-blue-400/30 shadow-sm">
                  <Shield className="w-3 h-3 text-blue-400" />
                  <span className="font-medium text-blue-100">Insurance Guaranteed</span>
                </div>
                <div className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400/90 to-yellow-500/90 backdrop-blur-sm px-2 py-1 rounded-full border border-yellow-300 shadow-sm">
                  <Star className="w-3 h-3 text-yellow-900 fill-current" />
                  <span className="font-semibold text-yellow-900">4.9★ by 50K+</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-4">
                <img src="/logo.svg" alt="Testimonial" className="w-14 h-14 rounded-full border-2 border-yellow-400 shadow" />
                <div>
                  <p className="text-base text-blue-100 italic">"The easiest way to find a reliable tradesperson. Highly recommended!"</p>
                  <span className="text-yellow-300 font-semibold text-xs">— Sarah M., London</span>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column: Enlarged Hero Visual */}
          <div className="flex-1 z-10 flex items-end justify-center relative animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="relative w-full max-w-2xl">
              {/* Glow effect behind image */}
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 via-blue-500/20 to-yellow-400/20 rounded-3xl blur-2xl animate-pulse"></div>
              
              <div className="relative">
                <img
                  src="/hero.png"
                  alt="Trusted Tradespeople"
                  className="w-full h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                />
                
                {/* Trust Badges Container */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-3 w-full px-4">
                  {/* Verification Badge */}
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg shadow-xl font-medium flex items-center gap-2 border-2 border-white backdrop-blur-sm transition-all duration-300 hover:scale-105">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute w-2 h-2 bg-white rounded-full animate-ping opacity-75"></div>
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                    <span className="text-sm font-semibold">All Trades Verified</span>
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-blue-900 px-4 py-2 rounded-lg shadow-xl font-medium flex items-center gap-2 border-2 border-yellow-300 backdrop-blur-sm transition-all duration-300 hover:scale-105">
                    <Star className="w-4 h-4 fill-current text-amber-600" />
                    <span className="text-sm font-semibold">4.9★ Rating</span>
                  </div>
                  
                  {/* User Count Badge */}
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg shadow-xl font-medium flex items-center gap-2 border-2 border-white backdrop-blur-sm transition-all duration-300 hover:scale-105">
                    <Users className="w-4 h-4 text-blue-100" />
                    <span className="text-sm font-semibold">50K+ Users</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      
      

      

      <InDemandServices />

      {/* Customer Testimonials Section */}
      <section className="relative py-16 md:py-20 my-16 bg-white text-gray-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-blue-50 to-indigo-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-100 mb-3">
              <Star className="w-3.5 h-3.5 text-yellow-600" />
              <span className="text-xs font-medium text-blue-800">Customer Reviews</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-3">
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">What Customers</span>{' '}
              <span className="text-gray-900">Say</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Real reviews from customers across the UK
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Sarah Thompson",
                city: "London",
                quote: "I had an electrical fault late evening and got matched within minutes. The electrician arrived the next morning and fixed it quickly. The whole process felt safe and transparent."
              },
              {
                name: "Imran Khan", 
                city: "Manchester",
                quote: "Instant quotes saved me so much time. I compared two options, read reviews, and booked in the same hour. The pro turned up on time and the work was spotless."
              },
              {
                name: "Rebecca Lewis",
                city: "Birmingham", 
                quote: "The verified and insured badges gave me confidence. I chose a roofer with great ratings and the price matched the estimate. Would definitely use again."
              },
              {
                name: "Daniel Murphy",
                city: "Leeds",
                quote: "Super easy to use. I uploaded a couple of photos and got realistic estimates. The tradesman was friendly, tidy, and finished faster than expected."
              },
              {
                name: "James Patel",
                city: "Liverpool",
                quote: "Booked a plumber in minutes and the communication was brilliant. No hidden costs and the workmanship was excellent. Highly recommend."
              },
              {
                name: "Priya Singh",
                city: "Nottingham",
                quote: "The insurance guarantee gave me peace of mind. I loved being able to compare profiles and see genuine reviews before confirming."
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="group bg-white rounded-xl p-5 border border-gray-100 hover:border-yellow-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden flex flex-col h-full"
              >
                <div className="relative z-10 flex flex-col h-full">
                  {/* Customer Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center font-semibold text-blue-700">
                      {`${testimonial.name.split(' ')[0][0]}${testimonial.name.split(' ').slice(-1)[0][0]}`.toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <MapPin className="w-3.5 h-3.5" />
                        {testimonial.city}
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mt-auto">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Stats */}
          <div className="mt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: '4.9/5', label: 'Average Rating' },
                { value: '50k+', label: 'Happy Customers' },
                { value: '98%', label: 'Would Recommend' },
                { value: '24/7', label: 'Customer Support' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      

      

      

      {/* Get Started Section - Consistent with InDemand */}
      <section className="relative py-12 md:py-16 my-16 bg-white text-gray-900 overflow-hidden">
        {/* Animated Background Elements - More subtle */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-blue-50 to-indigo-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-100 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-yellow-600" />
              <span className="text-xs font-medium text-blue-800">Get Started Today</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-3">
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">Choose Your</span>{' '}
              <span className="text-gray-900">Path</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Whether you need a service or provide one, we've got you covered
            </p>
          </div>

          {/* Action Cards Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Hire a tradesperson */}
            <Link href="/find-tradespeople" className="h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-yellow-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 shadow-sm group relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Hero Image */}
                <div className="relative h-96 overflow-hidden">
                  <img 
                    src="/hire-tradesperson.jpg" 
                    alt="Professional tradesperson at work"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-medium">
                      Popular
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  {/* Service Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <div className="text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                        <Search className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
                        Hire a tradesperson
                      </h3>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="flex-1 space-y-3 mb-4">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Find your local pro and get quotes in minutes.
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Instant quotes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Local pros</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <div className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-medium py-2.5 px-4 rounded-xl text-center transition-all duration-200 shadow-md hover:shadow-lg text-sm">
                      Hire now
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Tradesperson sign up */}
            <Link href="/trades/signup" className="h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-yellow-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 shadow-sm group relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Hero Image */}
                <div className="relative h-96 overflow-hidden">
                  <img 
                    src="/tradesperson-signup.jpg" 
                    alt="Successful tradesperson growing business"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                      Business
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  {/* Service Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-green-50 to-green-100 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <div className="text-green-600 group-hover:text-green-700 transition-colors duration-300">
                        <UserPlus className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300 leading-tight">
                        Tradesperson sign up
                      </h3>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="flex-1 space-y-3 mb-4">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Join 10,000+ approved tradespeople and grow your business.
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>10k+ members</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <div className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2.5 px-4 rounded-xl text-center transition-all duration-200 shadow-md hover:shadow-lg text-sm">
                      Join today
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Request a quote */}
            <button onClick={() => document.getElementById('ai-quote-trigger')?.click()} className="h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-yellow-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 shadow-sm group relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Hero Image */}
                <div className="relative h-96 overflow-hidden">
                  <img 
                    src="/request-quote.jpg" 
                    alt="Customer requesting quotes from tradespeople"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">
                      Instant
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  {/* Service Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <div className="text-purple-600 group-hover:text-purple-700 transition-colors duration-300">
                        <MessageSquareText className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300 leading-tight">
                        Request a quote
                      </h3>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="flex-1 space-y-3 mb-4">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Tell us your job and we'll match you instantly with 3 vetted tradespeople.
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Instant match</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="w-3.5 h-3.5" />
                        <span>3 vetted pros</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <div className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-xl text-center transition-all duration-200 shadow-md hover:shadow-lg text-sm">
                      Request a quote
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Popular Services Section - Consistent with InDemand */}
      <section className="relative py-12 md:py-16 my-16 bg-white text-gray-900 overflow-hidden">
        {/* Animated Background Elements - More subtle */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-blue-50 to-indigo-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-100 mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-yellow-600" />
              <span className="text-xs font-medium text-blue-800">Popular Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-3">
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">Find Trusted</span>{' '}
              <span className="text-gray-900">Tradespeople</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Connect with top-rated professionals in your area for all your home service needs
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Popular Jobs', 'Find Tradespeople', 'Find Out More'].map((tab, index) => (
              <Link
                key={index}
                href="/find-tradespeople"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  index === 0 
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md hover:shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {tab}
              </Link>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Electricians in London',
              'Roofers in Edinburgh', 
              'Gardeners in Wolverhampton',
              'Electricians in Cardiff',
              'Plumbers in Liverpool',
              'Plumbers in Croydon',
              'Roofers in Plymouth',
              'Plumbers in Norwich',
              'Gardeners in Luton',
              'Plumbers in Birmingham',
              'Roofers in Belfast',
              'Gutter Cleaning Services in Manchester'
            ].map((service, index) => (
              <Link
                key={index}
                href="/find-tradespeople"
                className="block p-4 bg-white rounded-xl border border-gray-100 hover:border-yellow-300 hover:shadow-lg transition-all duration-300 group relative overflow-hidden shadow-sm"
              >
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-gray-900 font-medium group-hover:text-blue-700 transition-colors duration-300">
                    {service}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-8">
            <Link 
              href="/find-tradespeople"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg group"
            >
              <span>View All Services</span>
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section - Consistent with InDemand */}
      <section className="relative py-12 md:py-16 my-16 bg-white text-gray-900 overflow-hidden">
        {/* Animated Background Elements - More subtle */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-blue-50 to-indigo-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-100 mb-3">
              <Star className="w-3.5 h-3.5 text-yellow-600" />
              <span className="text-xs font-medium text-blue-800">Frequently Asked Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-3">
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">Got</span>{' '}
              <span className="text-gray-900">Questions?</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Everything you need to know about finding trusted tradespeople
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              {
                icon: <ShieldCheck className="w-5 h-5" />,
                question: "How do I know a tradesperson is approved?",
                answer: "All tradespeople are identity‑checked and verified. We conduct thorough background checks, verify qualifications, and ensure they have valid insurance before they can join our platform.",
                link: { text: "How We Verify Tradespeople", href: "/blog/how-we-verify-tradespeople" }
              },
              {
                icon: <Clock className="w-5 h-5" />,
                question: "Can I get instant quotes in my area?",
                answer: "Yes — use our AI-powered quote tool for instant estimates and availability near you. Our smart matching system connects you with local professionals in minutes.",
                link: { text: "How Instant Quotes Work", href: "/blog/instant-quotes-near-you" }
              },
              {
                icon: <Shield className="w-5 h-5" />,
                question: "Are tradespeople insured?",
                answer: "We check for valid public liability insurance to protect your job. Every tradesperson must provide proof of comprehensive insurance coverage before joining our platform.",
                link: { text: "Why Hiring an Insured Tradesperson Matters", href: "/blog/insured-tradespeople" }
              },
              {
                icon: <ArrowRight className="w-5 h-5" />,
                question: "How quickly can I book?",
                answer: "Same‑day bookings are often available and most pros reply within minutes. Our streamlined booking process gets you connected with qualified tradespeople fast.",
                link: { text: "How to Book a Tradesperson Fast", href: "/blog/book-a-tradesperson-fast" }
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-gray-100 hover:border-yellow-300 transition-all duration-300 hover:shadow-lg shadow-sm group relative overflow-hidden"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={`faq-${index + 1}`} className="border-none">
                    <AccordionTrigger className="relative px-6 py-5 text-left hover:no-underline group/trigger">
                      <div className="flex items-center gap-4 w-full">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 group-hover/trigger:scale-110 transition-transform duration-300 shadow-sm flex-shrink-0">
                          <div className="text-blue-600 group-hover/trigger:text-blue-700 transition-colors duration-300">
                            {faq.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-bold text-gray-900 group-hover/trigger:text-blue-700 transition-colors duration-300 leading-tight">
                            {faq.question}
                          </h3>
                        </div>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 group-hover/trigger:bg-yellow-100 transition-colors duration-300 flex-shrink-0">
                          <ChevronDown className="w-4 h-4 text-gray-500 group-hover/trigger:text-yellow-600 transition-transform duration-300 group-data-[state=open]/trigger:rotate-180" />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5">
                      <div className="ml-14 space-y-3">
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {faq.answer}
                        </p>
                        <div className="flex items-center gap-3">
                          <Link 
                            href={faq.link.href}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200 text-yellow-700 hover:text-yellow-800 hover:bg-yellow-200 transition-all duration-200 group/link text-sm"
                          >
                            <span className="font-medium">{faq.link.text}</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                Our support team is here to help you find the perfect tradesperson
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link 
                  href="/find-tradespeople"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg group"
                >
                  <span>Get Your Free Quote</span>
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 font-medium"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
          {/* JSON-LD: FAQPage schema for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How do I know a tradesperson is approved?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text:
                        "All tradespeople are identity‑checked and verified. Learn more in our guide: https://your-domain.com/blog/how-we-verify-tradespeople",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I get instant quotes in my area?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text:
                        "Yes — use our quote tool for instant estimates and availability near you. Read more: https://your-domain.com/blog/instant-quotes-near-you",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are tradespeople insured?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text:
                        "We check for valid public liability insurance to protect your job. Learn why this matters: https://your-domain.com/blog/insured-tradespeople",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How quickly can I book?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text:
                        "Same‑day bookings are often available and most pros reply within minutes. Tips to book faster: https://your-domain.com/blog/book-a-tradesperson-fast",
                    },
                  },
                ],
              }),
            }}
          />
        </div>
      </section>

    </div>
  );
}

