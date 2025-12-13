import React from 'react';
import { Search, MessageCircle, Phone, Mail, Clock, Shield, CheckCircle, ArrowRight, HelpCircle, Users, Wrench, Star, Award } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata = {
  title: 'Help Centre - MyApproved',
  description: 'Get help and support for using MyApproved. Find answers to common questions, contact support, and learn how to get the most out of our platform.',
};

export default function HelpPage() {
  const faqCategories = [
    {
      title: "Getting Started",
      icon: <Users className="w-5 h-5" />,
      questions: [
        {
          question: "How do I find a tradesperson?",
          answer: "Use our search function on the homepage or visit our 'Find Tradespeople' page. You can filter by trade type, location, and other criteria to find the perfect professional for your job."
        },
        {
          question: "How do I get a quote?",
          answer: "Click 'Get Quote' on any tradesperson's profile, or use our instant quote tool. Fill in your job details and we'll connect you with verified professionals who can provide accurate quotes."
        },
        {
          question: "Is MyApproved free to use?",
          answer: "Yes! Finding and connecting with tradespeople is completely free for customers. You only pay the tradesperson directly for the work completed."
        }
      ]
    },
    {
      title: "For Customers",
      icon: <Wrench className="w-5 h-5" />,
      questions: [
        {
          question: "How do I know a tradesperson is verified?",
          answer: "All tradespeople on MyApproved are thoroughly vetted. Look for the verification badges on their profiles, which indicate they've passed our background checks, insurance verification, and reference checks."
        },
        {
          question: "What if I'm not happy with the work?",
          answer: "We have a dispute resolution process. Contact our support team within 48 hours of job completion, and we'll work with you and the tradesperson to resolve any issues."
        },
        {
          question: "How quickly can I book a tradesperson?",
          answer: "Many tradespeople offer same-day or next-day availability. Response times are shown on their profiles, and you can filter by availability when searching."
        }
      ]
    },
    {
      title: "For Tradespeople",
      icon: <Star className="w-5 h-5" />,
      questions: [
        {
          question: "How do I join MyApproved?",
          answer: "Visit our 'For Tradespeople' page and click 'Join MyApproved'. Complete the registration form, upload required documents, and our team will review your application within 2-3 business days."
        },
        {
          question: "What documents do I need to provide?",
          answer: "You'll need to provide proof of insurance, relevant qualifications/certifications, and at least 3 customer references. We may also require a DBS check depending on your trade."
        },
        {
          question: "How much does it cost to join?",
          answer: "We offer flexible pricing plans starting from £29/month. This includes lead generation, profile management, and access to our customer base. No commission on completed jobs."
        }
      ]
    },
    {
      title: "Account & Billing",
      icon: <Award className="w-5 h-5" />,
      questions: [
        {
          question: "How do I update my profile?",
          answer: "Log into your account and go to 'My Profile'. You can update your information, add photos of your work, and manage your availability settings."
        },
        {
          question: "How do I cancel my subscription?",
          answer: "You can cancel your subscription at any time from your account settings. Your profile will remain active until the end of your current billing period."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our encrypted payment system."
        }
      ]
    }
  ];

  const contactMethods = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      href: "#",
      available: "Available 24/7"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      description: "Speak directly with our support team",
      action: "Call Now",
      href: "tel:+442012345678",
      available: "Mon-Fri 9AM-6PM"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "Send us a detailed message",
      action: "Send Email",
      href: "mailto:support@myapproved.com",
      available: "Response within 24hrs"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Help Centre
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Find answers, get support, and make the most of MyApproved
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help articles, guides, and FAQs..."
                  className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-xl border-0 shadow-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
                <Button className="absolute right-2 top-2 bg-yellow-500 hover:bg-yellow-600 text-black">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <p className="text-sm text-gray-500 mb-4">{method.available}</p>
                  <Button asChild className="w-full">
                    <Link href={method.href}>{method.action}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Find answers to the most common questions
            </p>
          </div>

          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center mb-6">
                  <div className="text-blue-600 mr-3">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                </div>
                
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`item-${categoryIndex}-${faqIndex}`}
                      className="border border-gray-200 rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-6">
                        <span className="text-lg font-semibold text-gray-900">
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Security & Trust
            </h2>
            <p className="text-xl text-gray-600">
              We take your safety and privacy seriously
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Verified Professionals</h3>
                <p className="text-gray-600">
                  All tradespeople undergo thorough background checks, insurance verification, and reference checks.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
                <p className="text-gray-600">
                  All transactions are encrypted and secure. Your payment information is never shared with tradespeople.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
                <p className="text-gray-600">
                  Our support team is available around the clock to help with any questions or concerns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Still Need Help?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Support
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
              <ArrowRight className="w-5 h-5 mr-2" />
              Browse All Articles
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
