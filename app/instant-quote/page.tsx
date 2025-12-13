'use client';

import { useState } from 'react';
import { Zap, Clock, Calculator, CheckCircle, ArrowRight, Star, ChevronLeft, ChevronRight, Calendar, Wrench, FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

interface QuoteFormData {
  trade: string;
  description: string;
  postcode: string;
  urgency: string;
  availability: string;
  images: File[];
}

const trades = [
  'Plumber', 'Electrician', 'Builder', 'Painter', 'Roofer', 'Gardener', 'Tiler', 'Carpenter',
  'Locksmith', 'Cleaner', 'Handyman', 'Plasterer', 'Flooring', 'Kitchen Fitter', 'Bathroom Fitter'
];

const urgencyOptions = [
  { value: 'emergency', label: 'Emergency (Same day)', icon: '🚨' },
  { value: 'urgent', label: 'Urgent (Within 24 hours)', icon: '⚡' },
  { value: 'soon', label: 'Soon (Within a week)', icon: '📅' },
  { value: 'flexible', label: 'Flexible (No rush)', icon: '🕐' }
];

const availabilityOptions = [
  'Weekdays (9am-5pm)',
  'Evenings (5pm-8pm)',
  'Weekends',
  'Flexible',
  'Specific dates'
];

export default function InstantQuotePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<QuoteFormData>({
    trade: '',
    description: '',
    postcode: '',
    urgency: '',
    availability: '',
    images: []
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const updateFormData = (field: keyof QuoteFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-yellow-400 mb-6">
            <Zap className="w-4 h-4" />
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            Lightning Fast Quotes
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-yellow-200 bg-clip-text text-transparent">
            Get Instant Quotes
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Compare quotes from verified tradespeople in your area. Free, fast, and no obligation.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-blue-200 mb-8">
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

      {/* Quote Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Get Your Quote</h2>
                  <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Step 1: Trade Selection */}
              {currentStep === 1 && (
                <div className="space-y-6">
            <div className="text-center mb-8">
                    <Wrench className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">What service do you need?</h3>
                    <p className="text-gray-600">Select the type of tradesperson you're looking for</p>
            </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {trades.map((trade) => (
                    <button
                        key={trade}
                        onClick={() => updateFormData('trade', trade)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                          formData.trade === trade
                            ? 'border-blue-600 bg-blue-50 text-blue-900'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="font-medium">{trade}</div>
                    </button>
                  ))}
                </div>
                </div>
              )}

              {/* Step 2: Job Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Tell us about your job</h3>
                    <p className="text-gray-600">The more details you provide, the better quotes you'll receive</p>
              </div>

                  <div className="space-y-4">
              <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
                      <Textarea
                        placeholder="Describe what needs to be done..."
                        value={formData.description}
                        onChange={(e) => updateFormData('description', e.target.value)}
                        className="min-h-[120px]"
                />
              </div>

              <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Postcode</label>
                      <Input
                        placeholder="e.g. SW1A 1AA"
                        value={formData.postcode}
                        onChange={(e) => updateFormData('postcode', e.target.value)}
                        className="max-w-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Urgency & Availability */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">When do you need the work done?</h3>
                    <p className="text-gray-600">This helps us match you with available tradespeople</p>
              </div>

                  <div className="space-y-6">
              <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">How urgent is this job?</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {urgencyOptions.map((option) => (
                    <button
                            key={option.value}
                            onClick={() => updateFormData('urgency', option.value)}
                            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                              formData.urgency === option.value
                                ? 'border-blue-600 bg-blue-50 text-blue-900'
                                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{option.icon}</span>
                              <span className="font-medium">{option.label}</span>
                            </div>
                    </button>
                  ))}
                </div>
              </div>

                <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">When are you available?</label>
                      <Select value={formData.availability} onValueChange={(value) => updateFormData('availability', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your availability" />
                        </SelectTrigger>
                        <SelectContent>
                          {availabilityOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                </div>
                </div>
              </div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Calculator className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Review your quote request</h3>
                    <p className="text-gray-600">Make sure everything looks correct before submitting</p>
              </div>

                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Service needed:</span>
                      <p className="text-lg font-semibold text-gray-900">{formData.trade}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Job description:</span>
                      <p className="text-gray-900">{formData.description || 'No description provided'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Location:</span>
                      <p className="text-gray-900">{formData.postcode}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Urgency:</span>
                      <p className="text-gray-900">
                        {urgencyOptions.find(opt => opt.value === formData.urgency)?.label || 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Availability:</span>
                      <p className="text-gray-900">{formData.availability || 'Not specified'}</p>
                    </div>
          </div>
        </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalSteps }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i + 1 <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
          </div>

                {currentStep < totalSteps ? (
                  <Button onClick={handleNext} className="flex items-center gap-2">
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button 
                    asChild
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                  >
                    <Link href="/find-tradespeople">
                      <ArrowRight className="w-4 h-4" />
                      Get Quotes from Tradespeople
                    </Link>
                  </Button>
                )}
                </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
