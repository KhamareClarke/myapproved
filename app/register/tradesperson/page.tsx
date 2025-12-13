"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  Wrench,
  Star,
  Briefcase,
  Upload,
  File,
  X,
} from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface FormData {
  fullName: string;
  trade: string;
  email: string;
  phone: string;
  city: string;
  postcode: string;
  password: string;
  confirmPassword: string;
  yearsExperience: string;
  terms: boolean;
}

interface FormErrors {
  fullName?: string;
  trade?: string;
  email?: string;
  phone?: string;
  city?: string;
  postcode?: string;
  password?: string;
  confirmPassword?: string;
  yearsExperience?: string;
  terms?: string;
}

const trades = [
  "Plumber",
  "Electrician",
  "Builder",
  "Painter",
  "Roofer",
  "Gardener",
  "Tiler",
  "Carpenter",
  "Locksmith",
  "Cleaner",
  "Handyman",
  "Plasterer",
  "Flooring",
  "Kitchen Fitter",
  "Bathroom Fitter",
  "Window Cleaner",
  "Pest Control",
  "Appliance Repair",
  "HVAC",
  "Decorator",
  "Driveway",
  "Fencing",
  "Guttering",
  "Insulation",
  "Aircon Engineer",
  "Other",
];

export default function TradespersonRegistration() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    trade: "",
    email: "",
    phone: "",
    city: "",
    postcode: "",
    password: "",
    confirmPassword: "",
    yearsExperience: "",
    terms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Document upload states
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [insuranceDocument, setInsuranceDocument] = useState<File | null>(null);
  const [qualificationDocument, setQualificationDocument] = useState<File | null>(null);
  const [tradeCardDocument, setTradeCardDocument] = useState<File | null>(null);
  const [insuranceExpiry, setInsuranceExpiry] = useState("");
  const [qualificationNumber, setQualificationNumber] = useState("");
  const [tradeCardNumber, setTradeCardNumber] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!formData.trade.trim()) {
      newErrors.trade = "Trade/profession is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.postcode.trim()) {
      newErrors.postcode = "Postcode is required";
    } else if (formData.postcode.length < 5) {
      newErrors.postcode = "Please enter a valid postcode";
    }

    if (!formData.yearsExperience) {
      newErrors.yearsExperience = "Years of experience is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.terms) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileChange = (file: File | null, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
    setter(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) {
      return;
    }

    // Check if this trade requires additional trade card
    const needsTradeCard = ["Plumber", "Electrician", "Aircon Engineer"].includes(formData.trade);

    // Validate required documents
    if (!idDocument || !insuranceDocument || !qualificationDocument) {
      setErrorMessage("ID document, insurance document, and proof of qualifications are required for all tradespeople.");
      return;
    }

    if (needsTradeCard && !tradeCardDocument) {
      setErrorMessage("Trade card is required for Plumbers, Electricians, and Aircon Engineers.");
      return;
    }

    if (!insuranceExpiry || !qualificationNumber) {
      setErrorMessage("Insurance expiry date and qualification number are required.");
      return;
    }

    if (needsTradeCard && !tradeCardNumber) {
      setErrorMessage("Trade card number is required for this trade.");
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("trade", formData.trade);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("postcode", formData.postcode);
      formDataToSend.append("yearsExperience", formData.yearsExperience);

      // Add documents
      if (idDocument) formDataToSend.append("idDocument", idDocument);
      if (insuranceDocument) formDataToSend.append("insuranceDocument", insuranceDocument);
      if (qualificationDocument) formDataToSend.append("qualificationDocument", qualificationDocument);
      if (tradeCardDocument) formDataToSend.append("tradeCardDocument", tradeCardDocument);
      
      // Add additional fields
      formDataToSend.append("insuranceExpiry", insuranceExpiry);
      formDataToSend.append("qualificationNumber", qualificationNumber);
      if (tradeCardNumber) formDataToSend.append("tradeCardNumber", tradeCardNumber);

      const response = await fetch("/api/trades/register", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Registration failed. Please try again.");
      } else {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const needsTradeCard = ["Plumber", "Electrician", "Aircon Engineer"].includes(formData.trade);

  if (isSuccess) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900 flex items-center justify-center p-6 overflow-hidden" style={{ paddingTop: '100px' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-yellow-400/15 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        </div>
        
        <div className="relative z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 rounded-3xl blur-xl" />
          <Card className="relative w-full max-w-2xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-t-3xl" />
              <div className="mb-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/30 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-2">
                  Registration Successful!
                </h2>
                <p className="text-blue-100 mb-4">
                  Thank you for registering with MyApproved!
                </p>
                <p className="text-blue-200 text-sm mb-6">
                  Our admin team will verify your profile and documents. Once verified, you'll be able to login and start receiving job opportunities.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transition-all duration-200 text-black text-base font-semibold rounded-lg shadow-lg"
                >
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

    return (
      <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900 flex items-center justify-center p-6 sm:p-8 overflow-hidden" style={{ paddingTop: '100px' }}>
        {/* Hero-style background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900" />
        <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-yellow-400/15 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-indigo-400/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}} />
        </div>
        
        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8 items-start relative z-10">
          {/* Left: Registration form */}
          <div className="order-1 md:order-1 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 rounded-3xl blur-xl" />
          <Card className="relative rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="text-center pb-6">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-t-3xl" />
                <div className="flex items-center justify-center mb-4">
                  <Link
                    href="/"
                    className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Home
                  </Link>
                </div>
                <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-300/70 bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-800">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-500" />
                  Join 10,000+ Trusted Tradespeople
                </div>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-md">
                    <User className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-[26px] sm:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent mb-1">
                  Create Tradesperson Account
                </CardTitle>
                <p className="text-blue-100 text-sm sm:text-base">
                  Connect with customers and grow your business on our platform
                </p>
              </CardHeader>

              <CardContent className="p-6">
            {errorMessage && (
              <Alert className="mb-6 border-red-400/30 bg-red-500/20 backdrop-blur-sm">
                <AlertDescription className="text-red-200">
                  {errorMessage}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-yellow-400 border-b border-white/20 pb-2">Personal Information</h3>
              
                <div>
                <Label htmlFor="fullName" className="flex items-center mb-2 text-sm font-semibold text-blue-100">
                    <User className="w-4 h-4 mr-2" />
                    Full Name *
                  </Label>
                  <Input
                  id="fullName"
                    type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className={`h-12 text-base bg-white/10 border-2 ${
                    errors.fullName ? "border-red-400/50" : "border-white/20 hover:border-yellow-400/50 focus:border-yellow-400"
                    } focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 rounded-lg text-white placeholder:text-blue-200 backdrop-blur-sm`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-300 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                <Label htmlFor="trade" className="flex items-center mb-2 text-sm font-semibold text-blue-100">
                  <Wrench className="w-4 h-4 mr-2" />
                    Trade/Profession *
                  </Label>
                <Select value={formData.trade} onValueChange={(value) => handleInputChange("trade", value)}>
                  <SelectTrigger className={`h-12 bg-white/10 border-2 ${errors.trade ? "border-red-400/50" : "border-white/20 hover:border-yellow-400/50"} text-white`}>
                    <SelectValue placeholder="Select your trade" />
                  </SelectTrigger>
                  <SelectContent>
                    {trades.map((trade) => (
                      <SelectItem key={trade} value={trade}>{trade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                  {errors.trade && (
                  <p className="text-red-300 text-sm mt-1">{errors.trade}</p>
                  )}
                </div>

              <div>
                <Label htmlFor="yearsExperience" className="flex items-center mb-2 text-sm font-semibold text-blue-100">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Years of Experience *
                </Label>
                <Select value={formData.yearsExperience} onValueChange={(value) => handleInputChange("yearsExperience", value)}>
                  <SelectTrigger className={`h-12 bg-white/10 border-2 ${errors.yearsExperience ? "border-red-400/50" : "border-white/20 hover:border-yellow-400/50"} text-white`}>
                    <SelectValue placeholder="Select years of experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, "20+"].map((years) => (
                      <SelectItem key={years} value={String(years)}>
                        {years} {years === 1 ? "year" : "years"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.yearsExperience && (
                  <p className="text-red-300 text-sm mt-1">{errors.yearsExperience}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center mb-2 text-sm font-semibold text-blue-100">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`h-12 text-base bg-white/10 border-2 ${
                    errors.email ? "border-red-400/50" : "border-white/20 hover:border-yellow-400/50 focus:border-yellow-400"
                  } focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 rounded-lg text-white placeholder:text-blue-200 backdrop-blur-sm`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-300 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center mb-2 text-sm font-semibold text-blue-100">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`h-12 text-base bg-white/10 border-2 ${
                    errors.phone ? "border-red-400/50" : "border-white/20 hover:border-yellow-400/50 focus:border-yellow-400"
                  } focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 rounded-lg text-white placeholder:text-blue-200 backdrop-blur-sm`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-300 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Business Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-yellow-400 border-b border-white/20 pb-2">Business Information</h3>
              
              <div>
                <Label htmlFor="city" className="flex items-center mb-2 text-sm font-semibold text-blue-100">
                  <MapPin className="w-4 h-4 mr-2" />
                  City *
                </Label>
                <Input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={`h-12 text-base bg-white/10 border-2 ${
                    errors.city ? "border-red-400/50" : "border-white/20 hover:border-yellow-400/50 focus:border-yellow-400"
                  } focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 rounded-lg text-white placeholder:text-blue-200 backdrop-blur-sm`}
                  placeholder="Enter your city"
                />
                {errors.city && (
                  <p className="text-red-300 text-sm mt-1">{errors.city}</p>
                )}
              </div>

                <div>
                <Label htmlFor="postcode" className="flex items-center mb-2 text-sm font-semibold text-blue-100">
                    <MapPin className="w-4 h-4 mr-2" />
                    Postcode *
                  </Label>
                  <Input
                    id="postcode"
                    type="text"
                    value={formData.postcode}
                  onChange={(e) => handleInputChange("postcode", e.target.value.toUpperCase())}
                    className={`h-12 text-base bg-white/10 border-2 ${
                    errors.postcode ? "border-red-400/50" : "border-white/20 hover:border-yellow-400/50 focus:border-yellow-400"
                    } focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 rounded-lg text-white placeholder:text-blue-200 backdrop-blur-sm`}
                    placeholder="Enter your postcode"
                  />
                  {errors.postcode && (
                  <p className="text-red-300 text-sm mt-1">{errors.postcode}</p>
                )}
              </div>
            </div>

            {/* Required Documents */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-yellow-400 border-b border-white/20 pb-2">Required Documents</h3>
              <p className="text-sm text-blue-200">All tradespeople must upload the following documents for verification:</p>
              
              {/* ID Document */}
              <div>
                <Label className="text-sm font-semibold text-blue-100 mb-2 block">
                  ID Documents (Passport/Driving License) *
                </Label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e.target.files?.[0] || null, setIdDocument)}
                    className="hidden"
                    id="idDocument"
                  />
                  <label
                    htmlFor="idDocument"
                    className="flex items-center justify-center h-12 px-4 bg-white/10 border-2 border-white/20 hover:border-yellow-400/50 rounded-lg cursor-pointer transition-all text-blue-100 hover:text-white"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {idDocument ? idDocument.name : "Choose file"}
                  </label>
                  {idDocument && (
                    <button
                      type="button"
                      onClick={() => setIdDocument(null)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-red-300 hover:text-red-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Insurance Document */}
              <div>
                <Label className="text-sm font-semibold text-blue-100 mb-2 block">
                  Insurance Document *
                </Label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e.target.files?.[0] || null, setInsuranceDocument)}
                    className="hidden"
                    id="insuranceDocument"
                  />
                  <label
                    htmlFor="insuranceDocument"
                    className="flex items-center justify-center h-12 px-4 bg-white/10 border-2 border-white/20 hover:border-yellow-400/50 rounded-lg cursor-pointer transition-all text-blue-100 hover:text-white"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {insuranceDocument ? insuranceDocument.name : "Choose file"}
                  </label>
                  {insuranceDocument && (
                    <button
                      type="button"
                      onClick={() => setInsuranceDocument(null)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-red-300 hover:text-red-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                </div>

                <div>
                <Label htmlFor="insuranceExpiry" className="text-sm font-semibold text-blue-100 mb-2 block">
                  Insurance Expiry Date *
                </Label>
                <Input
                  id="insuranceExpiry"
                  type="date"
                  value={insuranceExpiry}
                  onChange={(e) => setInsuranceExpiry(e.target.value)}
                  className="h-12 text-base bg-white/10 border-2 border-white/20 hover:border-yellow-400/50 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 rounded-lg text-white backdrop-blur-sm"
                />
              </div>

              {/* Qualification Document */}
              <div>
                <Label className="text-sm font-semibold text-blue-100 mb-2 block">
                  Proof of Qualifications *
                </Label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e.target.files?.[0] || null, setQualificationDocument)}
                    className="hidden"
                    id="qualificationDocument"
                  />
                  <label
                    htmlFor="qualificationDocument"
                    className="flex items-center justify-center h-12 px-4 bg-white/10 border-2 border-white/20 hover:border-yellow-400/50 rounded-lg cursor-pointer transition-all text-blue-100 hover:text-white"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {qualificationDocument ? qualificationDocument.name : "Choose file"}
                  </label>
                  {qualificationDocument && (
                    <button
                      type="button"
                      onClick={() => setQualificationDocument(null)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-red-300 hover:text-red-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="qualificationNumber" className="text-sm font-semibold text-blue-100 mb-2 block">
                  Qualification Number *
                  </Label>
                  <Input
                  id="qualificationNumber"
                    type="text"
                  value={qualificationNumber}
                  onChange={(e) => setQualificationNumber(e.target.value)}
                  className="h-12 text-base bg-white/10 border-2 border-white/20 hover:border-yellow-400/50 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 rounded-lg text-white placeholder:text-blue-200 backdrop-blur-sm"
                  placeholder="Enter your qualification/certification number"
                />
              </div>

              {/* Trade Card for specific trades */}
              {needsTradeCard && (
                <>
                  <div>
                    <Label className="text-sm font-semibold text-blue-100 mb-2 block">
                      Trade Card (Required for Plumbers, Electricians, Aircon Engineers) *
                    </Label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e.target.files?.[0] || null, setTradeCardDocument)}
                        className="hidden"
                        id="tradeCardDocument"
                      />
                      <label
                        htmlFor="tradeCardDocument"
                        className="flex items-center justify-center h-12 px-4 bg-white/10 border-2 border-white/20 hover:border-yellow-400/50 rounded-lg cursor-pointer transition-all text-blue-100 hover:text-white"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {tradeCardDocument ? tradeCardDocument.name : "Choose file"}
                      </label>
                      {tradeCardDocument && (
                        <button
                          type="button"
                          onClick={() => setTradeCardDocument(null)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-red-300 hover:text-red-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                  )}
                </div>
              </div>

                  <div>
                    <Label htmlFor="tradeCardNumber" className="text-sm font-semibold text-blue-100 mb-2 block">
                      Trade Card Number *
                    </Label>
                    <Input
                      id="tradeCardNumber"
                      type="text"
                      value={tradeCardNumber}
                      onChange={(e) => setTradeCardNumber(e.target.value)}
                      className="h-12 text-base bg-white/10 border-2 border-white/20 hover:border-yellow-400/50 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 rounded-lg text-white placeholder:text-blue-200 backdrop-blur-sm"
                      placeholder="Enter your trade card number"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Account Setup */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-yellow-400 border-b border-white/20 pb-2">Account Setup</h3>
              
                <div>
                <Label htmlFor="password" className="flex items-center mb-2 text-sm font-semibold text-blue-100">
                    <Lock className="w-4 h-4 mr-2" />
                    Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                      className={`h-12 text-base bg-white/10 border-2 ${
                      errors.password ? "border-red-400/50" : "border-white/20 hover:border-yellow-400/50 focus:border-yellow-400"
                      } focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 rounded-lg text-white placeholder:text-blue-200 backdrop-blur-sm pr-10`}
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white transition-colors"
                    >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                  <p className="text-red-300 text-sm mt-1">{errors.password}</p>
                  )}
                <p className="text-xs text-blue-300 mt-1">Must be at least 8 characters with uppercase, lowercase, and number</p>
                </div>

                <div>
                <Label htmlFor="confirmPassword" className="flex items-center mb-2 text-sm font-semibold text-blue-100">
                    <Lock className="w-4 h-4 mr-2" />
                    Confirm Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className={`h-12 text-base bg-white/10 border-2 ${
                      errors.confirmPassword ? "border-red-400/50" : "border-white/20 hover:border-yellow-400/50 focus:border-yellow-400"
                      } focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 rounded-lg text-white placeholder:text-blue-200 backdrop-blur-sm pr-10`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white transition-colors"
                    >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                  <p className="text-red-300 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

              <div className="flex items-start gap-2 pt-2">
                <Checkbox
                  id="terms"
                  checked={formData.terms}
                  onCheckedChange={(checked) => handleInputChange("terms", checked === true)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-blue-100">
                  I agree to the{" "}
                  <Link href="/terms" className="text-yellow-400 hover:text-yellow-300 underline">
                    Terms and Conditions
                  </Link>
                </label>
              </div>
              {errors.terms && (
                <p className="text-red-300 text-sm mt-1">{errors.terms}</p>
              )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transition-all duration-200 text-black text-base font-semibold rounded-lg shadow-lg"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-blue-100">
                  Already have an account?{" "}
                  <Link
                    href="/login/trade"
                    className="text-yellow-400 hover:text-yellow-300 font-medium hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right: Hero-style feature cards */}
        <div className="order-2 md:order-2 flex flex-col gap-6 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl blur-xl" />
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6 shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-t-3xl" />
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-4">Why Choose MyApproved</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">Verified Platform</p>
                    <p className="text-sm text-blue-200">Join a trusted network of professionals with verified customers.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/20 border border-yellow-400/30 backdrop-blur-sm">
                    <Star className="h-5 w-5 text-yellow-400" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-yellow-400">Grow Your Business</p>
                    <p className="text-sm text-blue-200">Connect with customers and expand your client base.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 border border-green-400/30 backdrop-blur-sm">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">Easy Management</p>
                    <p className="text-sm text-blue-200">Manage quotes, bookings, and customer communications in one place.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 rounded-3xl blur-xl" />
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6 shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-t-3xl" />
              <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-3">Everything you need</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-blue-400" /> <span className="text-blue-100">Secure messaging</span></li>
                <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-green-400" /> <span className="text-blue-100">Quotes & bookings in one place</span></li>
                <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-yellow-400" /> <span className="text-blue-100">UK‑wide coverage</span></li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-3xl blur-xl" />
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6 shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-t-3xl" />
              <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-3">Peace of mind</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-green-400" /> <span className="text-blue-100">Vetted & insured pros</span></li>
                <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-blue-400" /> <span className="text-blue-100">Clear pricing</span></li>
                <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-yellow-400" /> <span className="text-blue-100">Dedicated support</span></li>
              </ul>
            </div>
          </div>

          {/* Ratings strip */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 rounded-2xl blur-xl" />
            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 shadow-xl">
              <div className="flex items-center justify-center gap-2 text-center">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="text-lg font-bold text-white">4.9/5</span>
                <span className="text-blue-200">from 12,000+ verified reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
