import { generateMetadata } from '@/lib/seo';
import { Heart, Shield, Users, Award, Target, CheckCircle } from 'lucide-react';

export const metadata = generateMetadata('about', {
  title: 'About Us | MyApproved - UK\'s Trusted Tradesperson Platform',
  description: 'Learn about MyApproved\'s mission to connect homeowners with trusted, verified tradespeople across the UK. Our story, values, and commitment to quality.',
  keywords: ['about MyApproved', 'company story', 'mission', 'trusted tradespeople', 'UK platform'],
  canonical: 'https://myapproved.co.uk/about'
});

export default function AboutPage() {
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
            <Heart className="w-4 h-4" />
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            Our Story & Mission
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-yellow-200 bg-clip-text text-transparent animate-slide-up" style={{animationDelay: '0.2s'}}>
            About MyApproved
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.4s'}}>
            We're on a mission to transform how homeowners connect with trusted tradespeople across the UK.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-xl leading-relaxed mb-6">
                MyApproved was born from a simple frustration: finding reliable, trustworthy tradespeople 
                shouldn't be a gamble. Too many homeowners have experienced the stress of hiring the wrong 
                person for their project.
              </p>
              
              <p className="leading-relaxed mb-6">
                Founded in 2020, we set out to create a platform that puts trust, quality, and transparency 
                at the heart of every interaction. We believe that both homeowners and tradespeople deserve 
                better – a platform that protects customers while empowering skilled professionals to grow 
                their businesses.
              </p>

              <p className="leading-relaxed">
                Today, we're proud to be the UK's fastest-growing platform for connecting homeowners with 
                verified tradespeople. With over 50,000 satisfied customers and 5,000+ verified professionals, 
                we're building a community based on trust, quality, and mutual respect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
            <p className="text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Trust First',
                description: 'Every tradesperson is thoroughly vetted, verified, and continuously monitored to ensure the highest standards of professionalism and quality.'
              },
              {
                icon: Shield,
                title: 'Safety & Security',
                description: 'We prioritize the safety of our community with comprehensive insurance requirements, background checks, and secure payment processing.'
              },
              {
                icon: Users,
                title: 'Community Focused',
                description: 'We\'re building a supportive community where homeowners and tradespeople can connect, collaborate, and succeed together.'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-md text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Commitment to Quality</h2>
                <div className="space-y-4">
                  {[
                    'Rigorous verification process for all tradespeople',
                    'Continuous monitoring of work quality and customer satisfaction',
                    'Comprehensive insurance requirements and safety standards',
                    'Transparent pricing with no hidden fees for customers',
                    '24/7 customer support and dispute resolution',
                    'Regular training and development opportunities for tradespeople'
                  ].map((commitment, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                      <span>{commitment}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/10 rounded-lg p-6">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">50k+</div>
                    <div className="text-sm">Happy Customers</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-6">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">5k+</div>
                    <div className="text-sm">Verified Tradespeople</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-6">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">4.9★</div>
                    <div className="text-sm">Average Rating</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-6">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">99%</div>
                    <div className="text-sm">Customer Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose MyApproved?</h2>
            <p className="text-gray-600">What sets us apart from other platforms</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: 'Quality Guaranteed',
                description: 'All work is backed by our quality guarantee and comprehensive insurance coverage.'
              },
              {
                icon: Target,
                title: 'Perfect Matches',
                description: 'Our smart matching system connects you with the most suitable tradespeople for your specific needs.'
              },
              {
                icon: Shield,
                title: 'Fully Protected',
                description: 'Every tradesperson is verified, insured, and continuously monitored for quality and safety.'
              },
              {
                icon: Users,
                title: 'Local Experts',
                description: 'Connect with skilled professionals in your local area who understand your community\'s needs.'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8">
            Join thousands of satisfied customers who trust MyApproved for their home improvement projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/instant-quote"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Get Free Quotes
            </a>
            <a
              href="/contact"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
