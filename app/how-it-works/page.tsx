// @ts-nocheck
"use client";

import { Search, UserCheck, MessageSquare, Star, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
// Dropdown menu imports removed; header is provided globally in app/layout.tsx

const steps = [
  {
    icon: Search,
    title: "Search & Compare",
    description:
      "Search for tradespeople in your area by trade type, location, and reviews. Compare profiles, rates, and availability.",
    image:
      "https://images.pexels.com/photos/5691723/pexels-photo-5691723.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
  },
  {
    icon: MessageSquare,
    title: "Get Quotes",
    description:
      "Contact multiple professionals or post your job to receive competitive quotes. Discuss your project requirements.",
    image:
      "https://images.pexels.com/photos/5691616/pexels-photo-5691616.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
  },
  {
    icon: UserCheck,
    title: "Choose & Hire",
    description:
      "Select the best tradesperson based on their profile, reviews, and quote. Book directly through our platform.",
    image:
      "https://images.pexels.com/photos/8865557/pexels-photo-8865557.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
  },
  {
    icon: Star,
    title: "Leave a Review",
    description:
      "After completion, rate your experience to help other customers and support quality tradespeople.",
    image:
      "https://images.pexels.com/photos/5974004/pexels-photo-5974004.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
  },
];

const faqs = [
  {
    question: "How are tradespeople verified?",
    answer:
      "All tradespeople go through our comprehensive verification process including ID checks, qualification verification, insurance validation, and reference checks.",
  },
  {
    question: "Is it free to use MyApproved?",
    answer:
      "Yes, it's completely free for customers to search, compare, and contact tradespeople. You only pay the tradesperson directly for their work.",
  },
  {
    question: "What if I'm not satisfied with the work?",
    answer:
      "We have a dispute resolution process and guarantee system. Contact our support team and we'll help resolve any issues with the tradesperson.",
  },
  {
    question: "How quickly can I find a tradesperson?",
    answer:
      "Many of our tradespeople respond within hours. For urgent jobs, you can filter by availability and response time to find someone quickly.",
  },
  {
    question: "Can I get multiple quotes?",
    answer:
      "Absolutely! We encourage getting multiple quotes to ensure you get the best value. You can contact several tradespeople or post a job to receive quotes.",
  },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header removed; global Header comes from app/layout.tsx */}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4">
            The Simple Way to <span className="text-[#fdbd18]">Hire</span> Trusted <span className="text-white">Trades</span><span className="text-[#fdbd18]">people</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6">
            Compare vetted pros, get instant estimates, and book with confidence — all in minutes.
          </p>
          {/* Trust strip */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
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
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-row-dense" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 p-4 rounded-full mr-4">
                      <step.icon className="w-8 h-8 text-blue-700" />
                    </div>
                    <div className="bg-yellow-500 text-black font-bold text-lg px-4 py-2 rounded-full">
                      Step {index + 1}
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <img
                    src={step.image}
                    alt={step.title}
                    className="rounded-xl shadow-lg w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose MyApproved?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <UserCheck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Verified Professionals
                </h3>
                <p className="text-gray-600">
                  All tradespeople are thoroughly vetted with background checks,
                  qualifications, and insurance verification.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Star className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Quality Guaranteed
                </h3>
                <p className="text-gray-600">
                  Read genuine reviews from real customers and choose
                  professionals with proven track records.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Search className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Easy to Use</h3>
                <p className="text-gray-600">
                  Our simple platform makes it easy to find, compare, and hire
                  the right tradesperson for your job.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section (accordion style to match home) */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-blue-900 tracking-tight text-center">FAQs</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <summary className="cursor-pointer font-semibold text-blue-900">{faq.question}</summary>
                <p className="mt-2 text-blue-800">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Get 3 Free Quotes?</h2>
          <p className="text-lg text-blue-100 mb-6">Vetted local pros, fast responses, and upfront pricing.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#fdbd18] hover:brightness-95 text-blue-900 font-bold" asChild>
              <Link href="/find-tradespeople">Find Tradespeople</Link>
            </Button>
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-bold" asChild>
              <Link href="/login/client">Post a Job</Link>
            </Button>
          </div>
          <span className="block mt-3 text-sm text-blue-100">Same‑day bookings available • High demand in your area</span>
        </div>
      </section>

    </div>

  );
}
