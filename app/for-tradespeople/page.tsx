// @ts-nocheck
"use client";

import { useState } from "react";

import { CheckCircle, Users, TrendingUp, Shield, Star, User, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const benefits = [
  {
    icon: Users,
    title: "More Customers",
    description:
      "Connect with thousands of customers looking for your services every day",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    description:
      "Increase your revenue with our lead generation and business management tools",
  },
  {
    icon: Shield,
    title: "Build Trust",
    description:
      "Get verified status and showcase your credentials to win more work",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    subtitle: "Lead Preview",
    price: "£0",
    period: "per month",
    features: [
      "Register + verify ID + insurance",
      "See blurred/basic job info",
      "Apply to 2 leads/month for free",
      "No client messaging unless they pay",
    ],
    popular: false,
  },
  {
    name: "Labourer",
    subtitle: "Pro Features",
    price: "£39",
    period: "per month",
    features: [
      "Unlimited job access",
      "SMS/email lead alerts",
      "Apply to unlimited jobs",
      "CRM dashboard",
      "Featured profile",
      "Google reviews sync",
      "£5–£10 per accepted lead",
      "Priority placement in search",
    ],
    popular: true,
  },
  {
    name: "Professional",
    subtitle: "Agency Tier",
    price: "£99",
    period: "per month",
    features: [
      "Everything in Labourer",
      "0% lead fee",
      "Add team members",
      "White-label dashboard",
      "Lead auto-assignment",
      "Dedicated support",
      "Monthly performance report",
    ],
    popular: false,
  },
];

const testimonials = [
  {
    name: "Mike Johnson",
    trade: "Plumber",
    image:
      "https://images.pexels.com/photos/8865557/pexels-photo-8865557.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    quote:
      "MyApproved has transformed my business. I'm getting 3x more customers than before!",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    trade: "Electrician",
    image:
      "https://images.pexels.com/photos/5974004/pexels-photo-5974004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    quote:
      "The platform is so easy to use and the leads are high quality. Highly recommend!",
    rating: 5,
  },
  {
    name: "David Brown",
    trade: "Builder",
    image:
      "https://images.pexels.com/photos/8005394/pexels-photo-8005394.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    quote:
      "Best investment I've made for my business. The support team is fantastic too.",
    rating: 5,
  },
];

export default function ForTradespeople() {
  const [jobsPerWeek, setJobsPerWeek] = useState<number>(10);
  const [closeRate, setCloseRate] = useState<number>(30); // %
  const [avgJobValue, setAvgJobValue] = useState<number>(150); // £
  const [leadCost, setLeadCost] = useState<number>(15); // £ per lead
  const [trade, setTrade] = useState<string>("plumber");

  const tradeDefaults: Record<string, { jobs: number; close: number; avg: number; lead: number }> = {
    plumber: { jobs: 12, close: 35, avg: 180, lead: 18 },
    electrician: { jobs: 10, close: 30, avg: 160, lead: 16 },
    roofer: { jobs: 6, close: 25, avg: 850, lead: 35 },
    builder: { jobs: 4, close: 20, avg: 1200, lead: 40 },
    handyman: { jobs: 14, close: 40, avg: 100, lead: 10 },
    painter: { jobs: 8, close: 28, avg: 300, lead: 20 },
    locksmith: { jobs: 15, close: 45, avg: 120, lead: 12 },
    gardener: { jobs: 10, close: 32, avg: 140, lead: 12 },
  };

  const applyTradeDefaults = (t: string) => {
    const d = tradeDefaults[t];
    if (!d) return;
    setJobsPerWeek(d.jobs);
    setCloseRate(d.close);
    setAvgJobValue(d.avg);
    setLeadCost(d.lead);
  };
  const projectedMonthly = Math.max(0, jobsPerWeek) * 4 * (Math.min(100, Math.max(0, closeRate)) / 100) * Math.max(0, avgJobValue);
  const leadsPerWeek = closeRate > 0 ? (jobsPerWeek / (closeRate / 100)) : 0;
  const monthlyLeadCost = leadsPerWeek * 4 * Math.max(0, leadCost);
  const netMonthly = Math.max(0, projectedMonthly - monthlyLeadCost);
  return (
    <div className="min-h-screen bg-white">
      {/* Header removed; global Header comes from app/layout.tsx */}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4">
                Grow Your Trade Business with <span className="text-[#fdbd18]">MyApproved</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-6">
                Join thousands of successful tradespeople who use MyApproved to
                find new customers, grow their business, and build their
                reputation.
              </p>
              {/* Trust strip */}
              <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full ring-1 ring-white/20">
                  <Shield className="w-4 h-4" /> Verified ID & Insurance
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full ring-1 ring-white/20">
                  <Star className="w-4 h-4 text-yellow-400" /> 50,000+ 5★ reviews
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full ring-1 ring-white/20">
                  <Shield className="w-4 h-4" /> Money‑Back Guarantee
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[#fdbd18] hover:brightness-95 text-blue-900 font-bold"
                  asChild
                >
                  <Link href="/register/tradesperson">Get Started</Link>
                </Button>
                <Button
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-blue-50 font-bold"
                  asChild
                >
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/5691723/pexels-photo-5691723.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Successful tradesperson"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
          {/* Featured trade perks by plan */}
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <div className="font-extrabold text-blue-900 mb-1">Starter perks</div>
              <ul className="text-sm text-blue-900 space-y-1 list-disc pl-5">
                <li>Basic profile with verified badge</li>
                <li>Up to 10 targeted leads/month</li>
                <li>Email support</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
              <div className="font-extrabold text-blue-900 mb-1">Professional perks</div>
              <ul className="text-sm text-blue-900 space-y-1 list-disc pl-5">
                <li>Featured listing in search</li>
                <li>Priority customer matching</li>
                <li>Phone & email support</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
              <div className="font-extrabold text-blue-900 mb-1">Premium perks</div>
              <ul className="text-sm text-blue-900 space-y-1 list-disc pl-5">
                <li>Top of results + account manager</li>
                <li>Unlimited leads and advanced reporting</li>
                <li>Marketing assistance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur border-t border-blue-100 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-blue-900 text-sm sm:text-base font-semibold">
            Ready to get more jobs? Join MyApproved today.
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-[#fdbd18] text-blue-900 font-bold hover:brightness-95" asChild>
              <Link href="/register/tradesperson">Get Started Free</Link>
            </Button>
            <Button variant="outline" className="border-blue-200 text-blue-900 hover:bg-blue-50" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* How it works for trades */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 tracking-tight text-center mb-8">
            How it works for trades
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <div className="flex items-center gap-2 mb-2 text-blue-900 font-semibold">
                <User className="w-5 h-5" /> Apply
              </div>
              <p className="text-blue-800 text-sm">Create your profile and tell us the work you want.</p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <div className="flex items-center gap-2 mb-2 text-blue-900 font-semibold">
                <Shield className="w-5 h-5" /> Verify
              </div>
              <p className="text-blue-800 text-sm">Get ID and insurance verified to build trust fast.</p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <div className="flex items-center gap-2 mb-2 text-blue-900 font-semibold">
                <Users className="w-5 h-5" /> Get Leads
              </div>
              <p className="text-blue-800 text-sm">Receive quality local leads that match your trade.</p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <div className="flex items-center gap-2 mb-2 text-blue-900 font-semibold">
                <TrendingUp className="w-5 h-5" /> Grow
              </div>
              <p className="text-blue-800 text-sm">Win more work and grow your reputation with reviews.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Earnings calculator */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 tracking-tight mb-2">Earnings calculator</h2>
              <p className="text-blue-800/90 mb-4">Estimate projected monthly revenue for your trade on MyApproved.</p>
              <div className="space-y-4 rounded-2xl border border-blue-100 bg-white p-5">
                <div>
                  <Label htmlFor="trade" className="text-blue-900">Trade</Label>
                  <Select value={trade} onValueChange={(v) => { setTrade(v); applyTradeDefaults(v); }}>
                    <SelectTrigger id="trade" className="mt-1">
                      <SelectValue placeholder="Select a trade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plumber">Plumber</SelectItem>
                      <SelectItem value="electrician">Electrician</SelectItem>
                      <SelectItem value="roofer">Roofer</SelectItem>
                      <SelectItem value="builder">Builder</SelectItem>
                      <SelectItem value="handyman">Handyman</SelectItem>
                      <SelectItem value="painter">Painter & Decorator</SelectItem>
                      <SelectItem value="locksmith">Locksmith</SelectItem>
                      <SelectItem value="gardener">Gardener</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="jobsPerWeek" className="text-blue-900">Jobs you can take per week</Label>
                  <Input id="jobsPerWeek" type="number" min={0} value={jobsPerWeek} onChange={(e) => setJobsPerWeek(Math.max(0, Number(e.target.value)))} />
                </div>
                <div>
                  <Label htmlFor="closeRate" className="text-blue-900">Close rate (%)</Label>
                  <Input id="closeRate" type="number" step="1" min={0} max={100} value={closeRate} onChange={(e) => setCloseRate(Math.min(100, Math.max(0, Number(e.target.value))))} />
                </div>
                <div>
                  <Label htmlFor="avgValue" className="text-blue-900">Average job value (£)</Label>
                  <Input id="avgValue" type="number" min={0} value={avgJobValue} onChange={(e) => setAvgJobValue(Math.max(0, Number(e.target.value)))} />
                </div>
                <div>
                  <Label htmlFor="leadCost" className="text-blue-900">Lead cost / fee (£ per lead)</Label>
                  <input
                    id="leadCost"
                    type="range"
                    min={0}
                    max={60}
                    step={1}
                    value={leadCost}
                    onChange={(e) => setLeadCost(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <div className="flex items-center justify-between mt-1 text-sm text-blue-800">
                    <span>£0</span>
                    <span className="font-semibold">£{leadCost}</span>
                    <span>£60</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white p-6">
              <h3 className="text-xl font-extrabold text-blue-900 mb-2">Projected monthly revenue</h3>
              <p className="text-4xl font-extrabold text-blue-900 mb-3">{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(projectedMonthly)}</p>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl bg-blue-50 p-3">
                  <div className="text-blue-900 font-semibold">Monthly lead cost</div>
                  <div className="text-blue-800">{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(monthlyLeadCost)}</div>
                  <div className="text-[12px] text-blue-700/70">~{Math.round(leadsPerWeek * 4)} leads/mo at £{leadCost}/lead</div>
                </div>
                <div className="rounded-xl bg-green-50 p-3">
                  <div className="text-green-800 font-semibold">Net monthly (after lead costs)</div>
                  <div className="text-green-700">{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(netMonthly)}</div>
                  <div className="text-[12px] text-green-700/70">Excludes materials and labour</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-blue-800/80">Assumes 4 weeks/month. Increase your close rate with verified profile and fast response times.</p>
            </div>
          </div>
          {/* Tips to increase close rate */}
          <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-5">
            <h3 className="text-lg font-extrabold text-blue-900 mb-2">Top tips to increase close rate</h3>
            <ul className="list-disc pl-5 text-blue-900 space-y-1">
              <li><span className="font-semibold">Verify your ID and insurance:</span> get the verified badge to build instant trust.</li>
              <li><span className="font-semibold">Respond within minutes:</span> fast replies win more jobs — turn on notifications.</li>
              <li><span className="font-semibold">Add photos and reviews:</span> showcase recent work and invite clients to review.</li>
              <li><span className="font-semibold">Quote clearly:</span> outline scope, timelines, and what’s included to avoid back‑and‑forth.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Tradespeople Choose MyApproved
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to take your trade business to the next level
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <benefit.icon className="w-8 h-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Starter • Labourer • Professional Pricing</h2>
            <p className="text-lg text-gray-600">
              Choose the plan thats right for your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.popular ? "ring-2 ring-yellow-500 shadow-lg" : ""
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black">
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                    {plan.subtitle && (
                      <div className="text-sm font-bold text-blue-900/80 mb-2">{plan.subtitle}</div>
                    )}
                    <div className="text-4xl font-bold text-blue-700 mb-2">
                      {plan.price}
                      <span className="text-lg text-gray-600 font-normal">
                        /{plan.period}
                      </span>
                    </div>
                    {(plan.name === 'Labourer' || plan.name === 'Professional') && (
                      <TooltipProvider>
                        <div className="flex items-center justify-center gap-2 text-sm">
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-900 px-2 py-1 ring-1 ring-blue-100">
                            Lead fee: {plan.name === 'Labourer' ? '£5–£10' : '0%'}
                          </span>
                          <Tooltip>
                            <TooltipTrigger aria-label="Lead fee info" className="text-blue-900/80 hover:text-blue-900">
                              <Info className="w-4 h-4" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs text-sm">
                              {plan.name === 'Labourer'
                                ? 'You only pay a small fee when the client accepts your quote. Browsing leads and applying is included.'
                                : 'No per-lead fees. Accepted leads are included in your Agency subscription.'}
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TooltipProvider>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                        : "bg-blue-700 hover:bg-blue-800"
                    }`}
                    asChild
                  >
                    <Link href="/register/tradesperson">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plan comparison table */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-extrabold text-blue-900 tracking-tight mb-6 text-center">Compare plans</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-blue-100 rounded-2xl overflow-hidden">
              <thead className="bg-blue-50">
                <tr>
                  <th className="text-left text-blue-900 font-semibold p-3">Feature</th>
                  <th className="text-center text-blue-900 font-semibold p-3">Starter</th>
                  <th className="text-center text-blue-900 font-semibold p-3">Labourer</th>
                  <th className="text-center text-blue-900 font-semibold p-3">Professional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                <tr>
                  <td className="p-3 text-blue-900">Job access</td>
                  <td className="p-3 text-center text-blue-900">2 leads/month</td>
                  <td className="p-3 text-center text-blue-900">Unlimited</td>
                  <td className="p-3 text-center text-blue-900">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-3 text-blue-900">Lead fee</td>
                  <td className="p-3 text-center text-blue-900">—</td>
                  <td className="p-3 text-center text-blue-900">£5–£10</td>
                  <td className="p-3 text-center text-blue-900">0%</td>
                </tr>
                <tr>
                  <td className="p-3 text-blue-900">SMS/email lead alerts</td>
                  <td className="p-3 text-center text-blue-900">—</td>
                  <td className="p-3 text-center text-green-700">Included</td>
                  <td className="p-3 text-center text-green-700">Included</td>
                </tr>
                <tr>
                  <td className="p-3 text-blue-900">Apply to jobs</td>
                  <td className="p-3 text-center text-blue-900">Limited</td>
                  <td className="p-3 text-center text-green-700">Unlimited</td>
                  <td className="p-3 text-center text-green-700">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-3 text-blue-900">CRM dashboard</td>
                  <td className="p-3 text-center text-blue-900">—</td>
                  <td className="p-3 text-center text-green-700">Included</td>
                  <td className="p-3 text-center text-green-700">Included</td>
                </tr>
                <tr>
                  <td className="p-3 text-blue-900">Featured profile</td>
                  <td className="p-3 text-center text-blue-900">—</td>
                  <td className="p-3 text-center text-green-700">Included</td>
                  <td className="p-3 text-center text-green-700">Top placement</td>
                </tr>
                <tr>
                  <td className="p-3 text-blue-900">Google reviews sync</td>
                  <td className="p-3 text-center text-blue-900">—</td>
                  <td className="p-3 text-center text-green-700">Included</td>
                  <td className="p-3 text-center text-green-700">Included</td>
                </tr>
                <tr>
                  <td className="p-3 text-blue-900">Team members</td>
                  <td className="p-3 text-center text-blue-900">—</td>
                  <td className="p-3 text-center text-blue-900">—</td>
                  <td className="p-3 text-center text-green-700">Included</td>
                </tr>
                <tr>
                  <td className="p-3 text-blue-900">White‑label dashboard</td>
                  <td className="p-3 text-center text-blue-900">—</td>
                  <td className="p-3 text-center text-blue-900">—</td>
                  <td className="p-3 text-center text-green-700">Included</td>
                </tr>
                <tr>
                  <td className="p-3 text-blue-900">Lead auto‑assignment</td>
                  <td className="p-3 text-center text-blue-900">—</td>
                  <td className="p-3 text-center text-blue-900">—</td>
                  <td className="p-3 text-center text-green-700">Included</td>
                </tr>
                <tr>
                  <td className="p-3 text-blue-900">Support</td>
                  <td className="p-3 text-center text-blue-900">Email</td>
                  <td className="p-3 text-center text-blue-900">Phone & email</td>
                  <td className="p-3 text-center text-green-700">Dedicated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Tradesman Upsells (moved below Pricing) */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-extrabold text-blue-900 tracking-tight mb-4">Tradesman Upsells</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-blue-100 bg-white p-4">
              <div className="font-semibold text-blue-900">SEO / GMB boost</div>
              <div className="text-sm text-blue-800/80">Improve rankings and visibility</div>
              <div className="mt-1 font-extrabold text-blue-900">£199</div>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white p-4">
              <div className="font-semibold text-blue-900">Facebook / Google ads mgmt</div>
              <div className="text-sm text-blue-800/80">Managed campaigns</div>
              <div className="mt-1 font-extrabold text-blue-900">£99/month</div>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white p-4">
              <div className="font-semibold text-blue-900">Custom website</div>
              <div className="text-sm text-blue-800/80">Fast, branded site</div>
              <div className="mt-1 font-extrabold text-blue-900">£499</div>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white p-4">
              <div className="font-semibold text-blue-900">Branded AI chatbot</div>
              <div className="text-sm text-blue-800/80">24/7 lead capture</div>
              <div className="mt-1 font-extrabold text-blue-900">£29/month</div>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white p-4">
              <div className="font-semibold text-blue-900">Featured listing</div>
              <div className="text-sm text-blue-800/80">Boosted visibility</div>
              <div className="mt-1 font-extrabold text-blue-900">£25/week</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              What Our Tradespeople Say
            </h2>
            <p className="text-blue-800/80">Real results from verified pros using MyApproved.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white border border-blue-100 hover:shadow-lg hover:border-blue-200 transition-all rounded-2xl"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#fdbd18] fill-[#fdbd18]" />
                    ))}
                    <span className="ml-1 text-sm text-blue-800/80">5.0</span>
                  </div>
                  <div className="text-blue-900 font-semibold mb-2">“{testimonial.quote}”</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-3 ring-2 ring-blue-100"
                      />
                      <div>
                        <div className="font-extrabold text-blue-900 leading-tight">{testimonial.name}</div>
                        <div className="text-sm text-blue-800/80">{testimonial.trade}</div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-50 ring-1 ring-blue-100 text-blue-900">
                      <Shield className="w-3 h-3" /> Verified on MyApproved
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join MyApproved today and start connecting with more customers in
            your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              asChild
            >
              <Link href="/register/tradesperson">Get Started</Link>
            </Button>
            <Button
              size="lg"
              className="bg-white text-blue-900 hover:bg-gray-100"
              asChild
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer removed; global Footer comes from app/layout.tsx */}
    </div>
  );
}
