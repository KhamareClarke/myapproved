import { generateMetadata } from '@/lib/seo';
import { Briefcase, Users, Clock, Shield, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata = generateMetadata('postJob', {
  title: 'Post a Job | MyApproved - Find Tradespeople for Your Project',
  description: 'Post your job and get quotes from verified tradespeople. Free to post, easy to manage, and find the perfect professional for your project.',
  keywords: ['post job', 'hire tradespeople', 'find professionals', 'job posting', 'tradesperson hiring'],
  canonical: 'https://myapproved.co.uk/post-job'
});

export default function PostJobPage() {
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
            <Briefcase className="w-4 h-4" />
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            Find Perfect Tradespeople
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-yellow-200 bg-clip-text text-transparent animate-slide-up" style={{animationDelay: '0.2s'}}>
            Post Your Job
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.4s'}}>
            Connect with skilled tradespeople in your area. Post your job for free and receive competitive quotes.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-blue-200 animate-slide-up" style={{animationDelay: '0.6s'}}>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-full">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Free to post</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-full">
              <Users className="w-4 h-4 text-blue-400" />
              <span>5000+ verified tradespeople</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-full">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span>Quick responses</span>
            </div>
          </div>
        </div>
      </section>

      {/* Job Posting Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Create Your Job Posting</h2>
              <p className="text-gray-600">Provide details about your project to attract the right professionals</p>
            </div>

            <form className="space-y-8">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Kitchen renovation, Bathroom fitting, Garden landscaping"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Job Category *
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select a category</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="building">Building & Construction</option>
                  <option value="painting">Painting & Decorating</option>
                  <option value="gardening">Gardening & Landscaping</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="roofing">Roofing</option>
                  <option value="heating">Heating & Gas</option>
                </select>
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your project in detail. Include materials, timeline, and any specific requirements..."
                />
                <p className="text-sm text-gray-500 mt-2">
                  Tip: The more details you provide, the more accurate quotes you'll receive.
                </p>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Budget Range
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    'Under £500',
                    '£500 - £1,000',
                    '£1,000 - £5,000',
                    '£5,000+'
                  ].map((budget) => (
                    <button
                      key={budget}
                      type="button"
                      className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-sm font-medium"
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  When do you need this completed? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {[
                    'ASAP',
                    'Within 1 week',
                    'Within 1 month',
                    'Flexible'
                  ].map((timeline) => (
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

              {/* Location */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Postcode *
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter postcode"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City/Town
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter city or town"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t pt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
                >
                  <Briefcase className="w-5 h-5" />
                  Post My Job
                  <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  By posting a job, you agree to our Terms & Conditions and Privacy Policy
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Post on MyApproved?</h2>
            <p className="text-gray-600">Join thousands of satisfied customers who found their perfect tradesperson</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Verified Professionals',
                description: 'All tradespeople are background checked, insured, and verified for quality'
              },
              {
                icon: Users,
                title: 'Multiple Quotes',
                description: 'Receive up to 5 competitive quotes to compare prices and services'
              },
              {
                icon: CheckCircle,
                title: 'No Upfront Costs',
                description: 'Posting jobs is completely free with no hidden charges or fees'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md">
                <benefit.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
