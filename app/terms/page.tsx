import { generateMetadata } from '@/lib/seo';
import { FileText, Scale, Users, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export const metadata = generateMetadata('terms', {
  title: 'Terms & Conditions | MyApproved - Platform Terms of Use',
  description: 'Read MyApproved\'s terms and conditions. Understand your rights and responsibilities when using our tradesperson platform.',
  keywords: ['terms and conditions', 'terms of use', 'platform rules', 'user agreement', 'legal terms'],
  canonical: 'https://myapproved.co.uk/terms'
});

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-bold">Terms & Conditions</h1>
          </div>
          <p className="text-xl text-blue-100">
            These terms govern your use of MyApproved platform and services. Please read them carefully.
          </p>
          <div className="mt-6 text-sm text-blue-200">
            Last updated: January 2024
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          
          {/* Quick Summary */}
          <div className="mb-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5" />
              Key Points
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-blue-800">
                <CheckCircle className="w-4 h-4" />
                <span>Platform connects users with tradespeople</span>
              </div>
              <div className="flex items-center gap-2 text-blue-800">
                <Users className="w-4 h-4" />
                <span>Separate terms for clients and tradespeople</span>
              </div>
              <div className="flex items-center gap-2 text-blue-800">
                <Shield className="w-4 h-4" />
                <span>We verify tradespeople but don't guarantee work</span>
              </div>
              <div className="flex items-center gap-2 text-blue-800">
                <AlertTriangle className="w-4 h-4" />
                <span>Users responsible for their own agreements</span>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  By accessing or using MyApproved ("the Platform"), you agree to be bound by these Terms and Conditions. 
                  If you do not agree to these terms, please do not use our services.
                </p>
                <p className="text-gray-700">
                  These terms apply to all users, including clients seeking services and tradespeople offering services.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Platform Description</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  MyApproved is an online platform that connects homeowners and businesses ("Clients") with verified 
                  tradespeople and service providers ("Tradespeople"). We facilitate introductions but are not a party 
                  to any agreements between Clients and Tradespeople.
                </p>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Our Services Include:</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Tradesperson verification and background checks</li>
                  <li>Quote request and matching system</li>
                  <li>Review and rating system</li>
                  <li>Secure messaging platform</li>
                  <li>Payment processing facilitation</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts and Registration</h2>
              <div className="prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Account Requirements</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                  <li>You must be at least 18 years old to create an account</li>
                  <li>You must provide accurate and complete information</li>
                  <li>You are responsible for maintaining account security</li>
                  <li>One account per person or business entity</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">Tradesperson Verification</h3>
                <p className="text-gray-700 mb-2">Tradespeople must provide:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Valid business registration or sole trader documentation</li>
                  <li>Public liability insurance (minimum £1 million)</li>
                  <li>Relevant trade qualifications and certifications</li>
                  <li>Identity verification and right to work documentation</li>
                  <li>References from previous clients (where applicable)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Client Terms</h2>
              <div className="prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Quote Requests</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                  <li>Provide accurate project descriptions and requirements</li>
                  <li>Respond to tradesperson questions in a timely manner</li>
                  <li>Allow reasonable access for site visits and assessments</li>
                  <li>Pay any agreed fees for quotes or consultations</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">Hiring and Payments</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>You are responsible for vetting tradespeople for your specific needs</li>
                  <li>All contracts are directly between you and the tradesperson</li>
                  <li>Payment terms are agreed between you and the tradesperson</li>
                  <li>We may facilitate payments but are not responsible for disputes</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Tradesperson Terms</h2>
              <div className="prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Professional Standards</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                  <li>Maintain all required licenses, insurance, and certifications</li>
                  <li>Provide accurate quotes and project timelines</li>
                  <li>Perform work to industry standards and building regulations</li>
                  <li>Communicate professionally and promptly with clients</li>
                  <li>Honor quoted prices and agreed terms</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">Platform Fees</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Lead fees may apply for quote requests</li>
                  <li>Commission fees may apply on completed jobs</li>
                  <li>Subscription fees for premium features</li>
                  <li>All fees are clearly disclosed before charges</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Prohibited Uses</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">You may not use our platform to:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Violate any laws or regulations</li>
                  <li>Provide false or misleading information</li>
                  <li>Harass, abuse, or discriminate against other users</li>
                  <li>Circumvent our verification or safety measures</li>
                  <li>Spam or send unsolicited communications</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Attempt to hack or disrupt our services</li>
                  <li>Create multiple accounts to avoid restrictions</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Disclaimers and Limitations</h2>
              <div className="prose prose-gray max-w-none">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 text-yellow-800 font-semibold mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    Important Disclaimer
                  </div>
                  <p className="text-yellow-800 text-sm">
                    MyApproved is a platform service only. We do not perform any trade work and are not responsible 
                    for the quality, safety, or legality of services provided by tradespeople.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">Platform Limitations</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>We verify tradespeople but cannot guarantee work quality</li>
                  <li>All contracts are between clients and tradespeople directly</li>
                  <li>We are not liable for disputes, damages, or losses</li>
                  <li>Platform availability is not guaranteed 24/7</li>
                  <li>We may suspend or terminate accounts at our discretion</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Dispute Resolution</h2>
              <div className="prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Between Users</h3>
                <p className="text-gray-700 mb-4">
                  Disputes between clients and tradespeople should be resolved directly. We may provide 
                  mediation services but are not obligated to resolve disputes.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">With MyApproved</h3>
                <p className="text-gray-700">
                  Any disputes with MyApproved will be governed by English law and subject to the 
                  jurisdiction of English courts. We encourage resolution through our customer service team first.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700">
                  We may update these terms from time to time. Significant changes will be communicated 
                  via email or platform notifications. Continued use of the platform constitutes acceptance 
                  of updated terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  For questions about these terms or our services:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-gray-700">
                    <strong>MyApproved Ltd</strong><br />
                    123 Business Street<br />
                    London, UK, SW1A 1AA<br />
                    <br />
                    <strong>Email:</strong> legal@myapproved.co.uk<br />
                    <strong>Phone:</strong> 0800 123 4567<br />
                    <strong>Company Registration:</strong> 12345678
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Last Updated */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
            These terms and conditions were last updated on January 15, 2024. 
            By using MyApproved, you acknowledge that you have read and understood these terms.
          </div>
        </div>
      </div>
    </div>
  );
}
