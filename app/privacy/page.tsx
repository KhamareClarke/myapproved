import { generateMetadata } from '@/lib/seo';
import { Shield, Lock, Eye, UserCheck, Database, Mail } from 'lucide-react';

export const metadata = generateMetadata('privacy', {
  title: 'Privacy Policy | MyApproved - Your Data Protection Rights',
  description: 'Learn how MyApproved protects your personal data and privacy. Comprehensive privacy policy covering data collection, usage, and your rights under GDPR.',
  keywords: ['privacy policy', 'data protection', 'GDPR', 'personal data', 'privacy rights'],
  canonical: 'https://myapproved.co.uk/privacy'
});

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl text-blue-100">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <div className="mt-6 text-sm text-blue-200">
            Last updated: January 2024
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          
          {/* Quick Overview */}
          <div className="mb-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Quick Overview
            </h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 text-blue-800">
                <Lock className="w-4 h-4" />
                <span>Data encrypted & secure</span>
              </div>
              <div className="flex items-center gap-2 text-blue-800">
                <UserCheck className="w-4 h-4" />
                <span>GDPR compliant</span>
              </div>
              <div className="flex items-center gap-2 text-blue-800">
                <Database className="w-4 h-4" />
                <span>Minimal data collection</span>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <div className="prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Name, email address, and phone number when you register</li>
                  <li>Address and postcode for location-based services</li>
                  <li>Payment information for transactions (processed securely by Stripe)</li>
                  <li>Profile information for tradespeople accounts</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-6">Usage Information</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Pages visited and time spent on our platform</li>
                  <li>Search queries and service requests</li>
                  <li>Device information and IP address</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <div className="prose prose-gray max-w-none">
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>To provide and improve our tradesperson matching services</li>
                  <li>To process payments and manage your account</li>
                  <li>To communicate with you about services and updates</li>
                  <li>To verify tradespeople and ensure platform safety</li>
                  <li>To analyze usage patterns and improve user experience</li>
                  <li>To comply with legal obligations and prevent fraud</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  We do not sell your personal information. We may share your information only in these circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>With tradespeople when you request quotes or services</li>
                  <li>With payment processors for transaction processing</li>
                  <li>With service providers who help operate our platform</li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with a business transfer or merger</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  We implement industry-standard security measures to protect your information:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure servers with regular security updates</li>
                  <li>Access controls and employee training</li>
                  <li>Regular security audits and monitoring</li>
                  <li>PCI DSS compliance for payment processing</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights (GDPR)</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Under GDPR, you have the following rights regarding your personal data:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                  <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                  <li><strong>Portability:</strong> Receive your data in a portable format</li>
                  <li><strong>Restriction:</strong> Limit how we process your data</li>
                  <li><strong>Objection:</strong> Object to processing for marketing purposes</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Tracking</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  We use cookies and similar technologies to enhance your experience:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li><strong>Essential cookies:</strong> Required for platform functionality</li>
                  <li><strong>Analytics cookies:</strong> Help us understand usage patterns</li>
                  <li><strong>Marketing cookies:</strong> For personalized advertising (with consent)</li>
                  <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  You can manage cookie preferences through your browser settings or our cookie consent banner.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700">
                  We retain your personal information only as long as necessary for the purposes outlined in this policy:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-4">
                  <li>Account information: Until account deletion or 3 years of inactivity</li>
                  <li>Transaction records: 7 years for tax and legal compliance</li>
                  <li>Marketing data: Until you unsubscribe or object</li>
                  <li>Analytics data: Anonymized after 26 months</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Us</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  If you have questions about this privacy policy or want to exercise your rights, contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <strong>Email:</strong> privacy@myapproved.co.uk
                  </div>
                  <div className="text-gray-700">
                    <strong>Address:</strong> MyApproved Ltd, 123 Privacy Street, London, UK, SW1A 1AA
                  </div>
                  <div className="text-gray-700 mt-2">
                    <strong>Data Protection Officer:</strong> dpo@myapproved.co.uk
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Last Updated */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
            This privacy policy was last updated on January 15, 2024. We may update this policy from time to time. 
            We will notify you of any significant changes by email or through our platform.
          </div>
        </div>
      </div>
    </div>
  );
}
