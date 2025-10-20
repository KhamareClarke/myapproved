import { generateMetadata } from '@/lib/seo';
import { HelpCircle, ChevronDown, Search, Shield, Users, CreditCard } from 'lucide-react';

export const metadata = generateMetadata('faq', {
  title: 'FAQ - Frequently Asked Questions | MyApproved',
  description: 'Find answers to common questions about MyApproved. Learn how to find tradespeople, post jobs, get quotes, and more.',
  keywords: ['FAQ', 'frequently asked questions', 'help', 'support', 'how to use MyApproved'],
  canonical: 'https://myapproved.co.uk/faq'
});

export default function FAQPage() {
  const faqCategories = [
    {
      title: 'Getting Started',
      icon: Users,
      questions: [
        {
          question: 'How does MyApproved work?',
          answer: 'MyApproved connects you with verified tradespeople in your area. Simply post your job or request quotes, receive responses from qualified professionals, compare their profiles and quotes, then hire the best person for your project.'
        },
        {
          question: 'Is MyApproved free to use?',
          answer: 'Yes, posting jobs and requesting quotes is completely free for customers. We only charge tradespeople a small fee when they successfully complete a job through our platform.'
        },
        {
          question: 'How do I create an account?',
          answer: 'Click "Sign Up" in the top right corner, choose whether you\'re a customer or tradesperson, fill in your details, and verify your email address. It takes less than 2 minutes!'
        }
      ]
    },
    {
      title: 'Finding Tradespeople',
      icon: Search,
      questions: [
        {
          question: 'How are tradespeople verified?',
          answer: 'All tradespeople undergo rigorous verification including ID checks, insurance verification, qualification checks, and reference verification. We also monitor reviews and ratings continuously.'
        },
        {
          question: 'How many quotes will I receive?',
          answer: 'You typically receive 3-5 quotes from qualified tradespeople in your area. The exact number depends on availability and the type of work required.'
        },
        {
          question: 'How quickly will I get responses?',
          answer: 'Most customers receive their first quote within 24 hours. Urgent jobs often get responses within a few hours.'
        },
        {
          question: 'Can I see reviews and ratings?',
          answer: 'Yes, every tradesperson has a detailed profile showing their average rating, customer reviews, completed projects, and verification status.'
        }
      ]
    },
    {
      title: 'Payments & Pricing',
      icon: CreditCard,
      questions: [
        {
          question: 'How do I pay for work?',
          answer: 'Payment is arranged directly between you and the tradesperson. We offer secure payment processing through our platform, or you can pay the tradesperson directly using their preferred method.'
        },
        {
          question: 'Are there any hidden fees?',
          answer: 'No hidden fees for customers. The price you agree with the tradesperson is what you pay. Our platform is free to use for posting jobs and getting quotes.'
        },
        {
          question: 'What if I\'m not satisfied with the work?',
          answer: 'We have a dispute resolution process and work guarantee. If you\'re not satisfied, contact our support team and we\'ll help resolve the issue with the tradesperson.'
        }
      ]
    },
    {
      title: 'Safety & Trust',
      icon: Shield,
      questions: [
        {
          question: 'Are all tradespeople insured?',
          answer: 'Yes, all tradespeople must have valid public liability insurance (minimum £1 million) and provide proof before joining our platform.'
        },
        {
          question: 'What if something goes wrong?',
          answer: 'We have comprehensive support and dispute resolution processes. All work is covered by our platform guarantee, and we\'ll help resolve any issues.'
        },
        {
          question: 'How do I report a problem?',
          answer: 'Contact our support team immediately through the platform, email, or phone. We take all reports seriously and investigate promptly.'
        }
      ]
    }
  ];

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
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-yellow-400 mb-6 animate-slide-up">
            <HelpCircle className="w-4 h-4" />
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            Instant Answers
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-yellow-200 bg-clip-text text-transparent animate-slide-up" style={{animationDelay: '0.2s'}}>
            Frequently Asked Questions
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 animate-slide-up" style={{animationDelay: '0.4s'}}>
            Find answers to common questions about using MyApproved
          </p>
          
          {/* Search Box */}
          <div className="max-w-md mx-auto relative animate-slide-up" style={{animationDelay: '0.6s'}}>
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                </div>

                <div className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <details key={index} className="group border border-gray-200 rounded-lg">
                      <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                        <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                        <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="px-4 pb-4">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Still need help?</h2>
          <p className="text-gray-600 mb-8">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Contact Support
            </a>
            <a
              href="mailto:help@myapproved.co.uk"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
