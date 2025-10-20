import { generateMetadata } from '@/lib/seo';
import { Zap, Clock, Calculator, CheckCircle, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateMetadata('instantQuote', {
  title: 'Get Instant Quote | MyApproved - Free Tradesperson Quotes in Minutes',
  description: 'Get instant quotes from verified tradespeople near you. Compare prices, read reviews, and hire the best professional for your project in minutes.',
  keywords: ['instant quote', 'tradesperson quotes', 'free quotes', 'compare prices', 'hire tradespeople'],
  canonical: 'https://myapproved.co.uk/instant-quote'
});

export default function InstantQuotePage() {
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
            <Zap className="w-4 h-4" />
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            Lightning Fast Quotes
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-yellow-200 bg-clip-text text-transparent animate-slide-up" style={{animationDelay: '0.2s'}}>
            Get Instant Quotes
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.4s'}}>
            Compare quotes from verified tradespeople in your area. Free, fast, and no obligation.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-blue-200 mb-8 animate-slide-up" style={{animationDelay: '0.6s'}}>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-full">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span>Quotes in 24 hours</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-full">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-full">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>Verified professionals</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 lg:p-12 animate-slide-up">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent mb-4">Tell us about your project</h2>
              <p className="text-blue-100">Get matched with the right tradespeople for your needs</p>
            </div>

            <form className="space-y-6">
              {/* Service Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  What service do you need?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    'Plumbing', 'Electrical', 'Building', 'Painting',
                    'Gardening', 'Cleaning', 'Roofing', 'Heating'
                  ].map((service) => (
                    <button
                      key={service}
                      type="button"
                      className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-sm font-medium"
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Describe your project
                </label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please provide details about what you need done..."
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Postcode
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your postcode"
                />
              </div>

              {/* Timeline */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  When do you need this done?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['ASAP', 'Within 1 month', 'No rush'].map((timeline) => (
                    <button
                      key={timeline}
                      type="button"
                      className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-sm font-medium"
                    >
                      {timeline}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your name"
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
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Get My Instant Quotes
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Get quotes in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Tell us your needs',
                description: 'Describe your project and we\'ll match you with suitable tradespeople'
              },
              {
                step: '2',
                title: 'Receive quotes',
                description: 'Get up to 5 quotes from verified professionals in your area'
              },
              {
                step: '3',
                title: 'Choose & hire',
                description: 'Compare quotes, read reviews, and hire the best tradesperson'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
