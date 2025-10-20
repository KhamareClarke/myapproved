import { generateMetadata } from '@/lib/seo';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';

export const metadata = generateMetadata('contact', {
  title: 'Contact Us | MyApproved - Get in Touch with Our Support Team',
  description: 'Contact MyApproved for support, questions, or feedback. Multiple ways to reach us including phone, email, and live chat.',
  keywords: ['contact MyApproved', 'customer support', 'help', 'get in touch', 'support team'],
  canonical: 'https://myapproved.co.uk/contact'
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900">
      {/* Hero Section - Consistent with Homepage */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-white overflow-hidden min-h-[70vh] flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/80 via-blue-800/70 to-indigo-800/60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.2),transparent_50%)] animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-400/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-400/20 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-yellow-400 mb-6 animate-slide-up">
            <MessageCircle className="w-4 h-4" />
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            24/7 Support Available
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-yellow-200 bg-clip-text text-transparent animate-slide-up" style={{animationDelay: '0.2s'}}>
            Contact Us
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.4s'}}>
            We're here to help. Get in touch with our friendly support team.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Phone,
                title: 'Phone Support',
                description: 'Speak directly with our support team',
                contact: '0800 123 4567',
                subtext: 'Mon-Fri 8AM-8PM, Sat-Sun 9AM-5PM',
                action: 'Call Now'
              },
              {
                icon: Mail,
                title: 'Email Support',
                description: 'Send us a detailed message',
                contact: 'support@myapproved.co.uk',
                subtext: 'We respond within 24 hours',
                action: 'Send Email'
              },
              {
                icon: MessageCircle,
                title: 'Live Chat',
                description: 'Chat with us in real-time',
                contact: 'Available on website',
                subtext: 'Mon-Fri 8AM-8PM',
                action: 'Start Chat'
              }
            ].map((method, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <method.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <div className="font-semibold text-blue-600 mb-2">{method.contact}</div>
                <p className="text-sm text-gray-500 mb-6">{method.subtext}</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                  {method.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
              <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible</p>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="tradesperson">Tradesperson Application</option>
                  <option value="complaint">Complaint</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  We typically respond within 24 hours during business days
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Office</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">
                      MyApproved Ltd<br />
                      123 Business Street<br />
                      London, UK<br />
                      SW1A 1AA
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                      <p>Saturday - Sunday: 9:00 AM - 5:00 PM</p>
                      <p className="text-sm text-blue-600">Emergency support available 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-200 rounded-xl h-64 lg:h-80 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <p>Interactive Map</p>
                <p className="text-sm">London Office Location</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Link */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Looking for Quick Answers?</h2>
          <p className="text-blue-100 mb-8">
            Check our FAQ section for instant answers to common questions
          </p>
          <a
            href="/faq"
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors inline-block"
          >
            Visit FAQ
          </a>
        </div>
      </section>
    </div>
  );
}
