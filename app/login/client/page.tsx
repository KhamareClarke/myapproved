// @ts-nocheck
"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, User, Shield, Star, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabase-client";

export default function ClientLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [onlineCount, setOnlineCount] = useState(175); // Fixed initial value to prevent hydration mismatch
  const router = useRouter();

  // Generate dense placeholder markers across the UK using real city lat/lon projected to iframe bbox
  const tradeCategories = useMemo(
    () => [
      { name: "Plumber", color: "#2563eb" },
      { name: "Electrician", color: "#facc15" },
      { name: "Builder", color: "#16a34a" },
      { name: "Cleaner", color: "#9333ea" },
      { name: "Roofer", color: "#ea580c" },
      { name: "Carpenter", color: "#0ea5e9" },
    ],
    []
  );

  const UK_BBOX = { minLon: -11.0, maxLon: 2.1, minLat: 49.5, maxLat: 59.0 };

  const ukCities = useMemo(
    () => [
      { name: "London", lat: 51.5074, lon: -0.1278 },
      { name: "Manchester", lat: 53.4808, lon: -2.2426 },
      { name: "Birmingham", lat: 52.4862, lon: -1.8904 },
      { name: "Leeds", lat: 53.8008, lon: -1.5491 },
      { name: "Glasgow", lat: 55.8642, lon: -4.2518 },
      { name: "Edinburgh", lat: 55.9533, lon: -3.1883 },
      { name: "Cardiff", lat: 51.4816, lon: -3.1791 },
      { name: "Belfast", lat: 54.5973, lon: -5.9301 },
      { name: "Bristol", lat: 51.4545, lon: -2.5879 },
      { name: "Liverpool", lat: 53.4084, lon: -2.9916 },
      { name: "Newcastle", lat: 54.9783, lon: -1.6178 },
      { name: "Sheffield", lat: 53.3811, lon: -1.4701 },
      { name: "Nottingham", lat: 52.9548, lon: -1.1581 },
      { name: "Leicester", lat: 52.6369, lon: -1.1398 },
      { name: "Cambridge", lat: 52.2053, lon: 0.1218 },
      { name: "Oxford", lat: 51.7520, lon: -1.2577 },
      { name: "Brighton", lat: 50.8225, lon: -0.1372 },
      { name: "Southampton", lat: 50.9097, lon: -1.4043 },
      { name: "Portsmouth", lat: 50.8198, lon: -1.0880 },
      { name: "Plymouth", lat: 50.3755, lon: -4.1427 },
      { name: "Exeter", lat: 50.7184, lon: -3.5339 },
      { name: "Norwich", lat: 52.6309, lon: 1.2974 },
      { name: "York", lat: 53.9590, lon: -1.0815 },
      { name: "Dundee", lat: 56.4620, lon: -2.9707 },
      { name: "Aberdeen", lat: 57.1497, lon: -2.0943 },
      { name: "Inverness", lat: 57.4778, lon: -4.2247 },
      { name: "Swansea", lat: 51.6214, lon: -3.9436 },
      { name: "Newport", lat: 51.5842, lon: -2.9977 },
      { name: "Reading", lat: 51.4543, lon: -0.9781 },
      { name: "Milton Keynes", lat: 52.0406, lon: -0.7594 },
      { name: "Coventry", lat: 52.4068, lon: -1.5197 },
      { name: "Hull", lat: 53.7457, lon: -0.3367 },
      { name: "Stoke-on-Trent", lat: 53.0027, lon: -2.1794 },
      { name: "Derby", lat: 52.9225, lon: -1.4746 },
      { name: "Wolverhampton", lat: 52.5862, lon: -2.1288 },
      { name: "Bath", lat: 51.3758, lon: -2.3599 },
      { name: "Bournemouth", lat: 50.7192, lon: -1.8808 },
      { name: "Ipswich", lat: 52.0567, lon: 1.1482 },
      { name: "Chelmsford", lat: 51.7356, lon: 0.4685 },
      { name: "Luton", lat: 51.8787, lon: -0.4200 },
    ],
    []
  );

  const projectToPercent = (lat: number, lon: number) => {
    // More accurate bounds matching the Google Maps embed
    const ACCURATE_UK_BOUNDS = {
      north: 58.8,
      south: 49.8,
      east: 1.8,
      west: -10.5
    };
    
    const x = ((lon - ACCURATE_UK_BOUNDS.west) / (ACCURATE_UK_BOUNDS.east - ACCURATE_UK_BOUNDS.west)) * 100;
    const y = ((ACCURATE_UK_BOUNDS.north - lat) / (ACCURATE_UK_BOUNDS.north - ACCURATE_UK_BOUNDS.south)) * 100;
    
    return {
      left: Math.min(95, Math.max(5, x)),
      top: Math.min(95, Math.max(5, y)),
    };
  };

  // Removed old fake markers - now using real city-based markers

  // Handle marker click to redirect to find tradespeople page
  const handleMarkerClick = (trade: string, city: string) => {
    // Navigate to find-tradespeople page with pre-filled search
    router.push(`/find-tradespeople?search=${encodeURIComponent(trade)}&location=${encodeURIComponent(city)}`);
  };

  useEffect(() => {
    // Prefill email if remembered
    const savedEmail = localStorage.getItem("clientRememberEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
    
    // Update online count after hydration to avoid mismatch
    setOnlineCount(Math.floor(Math.random() * 50) + 150);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Check email and password directly in database
      const { data: userData, error: userError } = await supabase
        .from("clients")
        .select("id, email, first_name, is_verified")
        .eq("email", email)
        .eq("password_hash", password)
        .maybeSingle();

      if (userError || !userData) {
        setError("Invalid email or password. Please try again.");
        setIsLoading(false);
        return;
      }

      if (!userData.is_verified) {
        setError(
          "Please verify your email address before logging in. Check your inbox for the verification email."
        );
        setIsLoading(false);
        return;
      }

      setSuccess("Login successful! Redirecting...");

      // Store user info and token in localStorage
      const clientToken = `client_${userData.id}_${Date.now()}`;
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: userData.id,
          email: userData.email,
          firstName: userData.first_name,
          isVerified: userData.is_verified,
          type: "client",
        })
      );
      localStorage.setItem("clientToken", clientToken);

      // Remember email if opted in
      if (rememberMe) {
        localStorage.setItem("clientRememberEmail", email);
      } else {
        localStorage.removeItem("clientRememberEmail");
      }

      // Check if there's a redirect URL stored
      const redirectUrl = localStorage.getItem("redirectAfterLogin");

      // Redirect to stored URL or default dashboard
      setTimeout(() => {
        if (redirectUrl) {
          localStorage.removeItem("redirectAfterLogin"); // Clean up
          window.location.href = redirectUrl;
        } else {
          window.location.href = "/dashboard/client";
        }
      }, 1500);
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900 flex flex-col items-center justify-center p-6 sm:p-8 gap-6 overflow-hidden" style={{ paddingTop: '100px' }}>
      {/* Hero-style background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-indigo-400/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-radial from-purple-400/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-400/60 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
      <div className="absolute top-40 right-32 w-3 h-3 bg-blue-300/60 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
      <div className="absolute bottom-32 left-32 w-5 h-5 bg-indigo-300/60 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }} />
      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8 items-start">
        {/* Left: Login card (moved left) */}
        <div className="order-1 md:order-1 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl blur-xl" />
          <Card className="relative w-full rounded-3xl shadow-2xl border border-white/20 bg-white/10 backdrop-blur-md">
          <CardHeader className="text-center pb-4 sm:pb-6">
            {/* Brand text removed as requested */}
            {/* Trust badge */}
            <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-300/70 bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-800">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-500" />
              Trusted by 50,000+ UK customers
            </div>
            <div className="flex items-center justify-center mb-3">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-md">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-[26px] sm:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent mb-1">
              Sign in to your account
            </CardTitle>
            <p className="text-blue-100 text-sm sm:text-base">Manage bookings, messages, and saved pros.</p>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label
                  htmlFor="email"
                  className="flex items-center mb-2 text-sm font-semibold text-blue-100"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-12 text-base bg-white/10 border-2 border-white/20 hover:border-yellow-400/50 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 rounded-lg text-white placeholder:text-blue-200 backdrop-blur-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="flex items-center mb-2 text-sm font-semibold text-blue-100"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-12 text-base bg-white/10 border-2 border-white/20 hover:border-yellow-400/50 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 rounded-lg pr-10 text-white placeholder:text-blue-200 backdrop-blur-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" checked={rememberMe} onCheckedChange={(c) => setRememberMe(c === true)} />
                  <Label htmlFor="remember" className="text-sm text-blue-100">Remember me</Label>
                </div>
                <Link
                  href="/forgot-password?type=client"
                  className="text-sm text-yellow-400 hover:text-yellow-300 hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <Alert
                  variant="destructive"
                  className="border-red-200 bg-red-50"
                >
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-blue-900/80 px-2 text-yellow-400">Enter your details</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-blue-100">
                  Do not have a client account?{" "}
                  <Link
                    href="/register/client"
                    className="text-yellow-400 hover:text-yellow-300 hover:underline font-medium"
                  >
                    Register here
                  </Link>
                </p>
                <p className="text-sm text-blue-100">
                  Are you a tradesperson?{" "}
                  <Link
                    href="/login/trade"
                    className="text-yellow-400 hover:text-yellow-300 hover:underline font-medium"
                  >
                    Login here
                  </Link>
                </p>
                <div className="pt-1">
                  <Link href="/contact" className="text-xs text-blue-200 hover:text-white underline">Need help? Contact support</Link>
                </div>
              </div>

              {/* Benefits bullets */}
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
                <li className="flex items-center gap-2 text-xs text-blue-100 bg-white/10 border border-white/20 rounded-md px-2 py-1 backdrop-blur-sm">
                  <CheckCircle className="h-4 w-4 text-green-400" /> No hidden fees
                </li>
                <li className="flex items-center gap-2 text-xs text-blue-100 bg-white/10 border border-white/20 rounded-md px-2 py-1 backdrop-blur-sm">
                  <Shield className="h-4 w-4 text-blue-400" /> Secure login
                </li>
                <li className="flex items-center gap-2 text-xs text-blue-100 bg-white/10 border border-white/20 rounded-md px-2 py-1 backdrop-blur-sm">
                  <Star className="h-4 w-4 text-yellow-400" /> Top-rated pros
                </li>
              </ul>

              {/* Primary CTA under login for better focus */}
              <div className="mt-5">
                <Link
                  href="/register/client"
                  className="inline-flex items-center justify-center w-full h-11 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 text-sm font-semibold shadow hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transition-all duration-200"
                >
                  Create a free account
                </Link>
              </div>

            </form>
          </CardContent>
          </Card>
        </div>

        {/* Right: Hero-style feature section */}
        <div className="order-2 md:order-2 flex flex-col gap-6 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 rounded-3xl blur-xl" />
            <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
              {/* Combined Hero Content + Interactive Map */}
              <div className="relative w-full h-[360px] md:h-[440px] bg-gradient-to-br from-blue-100 to-green-100">
                {/* Base map using Google Maps embed */}
                <iframe
                  title="UK coverage map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9933496.689157944!2d-8.644409999999999!3d54.2361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x25a3b1142c791a9%3A0xc4f8a0433288257a!2sUnited%20Kingdom!5e0!3m2!1sen!2suk!4v1699999999999!5m2!1sen!2suk&iwloc=&output=embed"
                  className="w-full h-full rounded-3xl pointer-events-none"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                
                {/* Hero badge at top of map */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/50 bg-yellow-400/20 px-4 py-2 text-sm font-semibold text-yellow-400 backdrop-blur-md">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    Join 50,000+ Happy Customers
                  </div>
                </div>
                
                {/* Statistics at bottom of map */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="bg-gradient-to-r from-blue-900/90 to-indigo-900/90 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg">
                    <div className="flex items-center justify-center gap-6">
                      <div className="text-center">
                        <div className="text-xl font-bold text-yellow-400">{onlineCount}+</div>
                        <div className="text-xs text-blue-200">Online Now</div>
                      </div>
                      <div className="h-8 w-px bg-white/20"></div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-yellow-400">4.9★</div>
                        <div className="text-xs text-blue-200">Average Rating</div>
                      </div>
                      <div className="h-8 w-px bg-white/20"></div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-yellow-400">24/7</div>
                        <div className="text-xs text-blue-200">Support</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Interactive tradesperson markers */}
                <div className="absolute inset-0 pointer-events-none">
                  {ukCities.slice(0, 25).map((city, idx) => {
                    const pos = projectToPercent(city.lat, city.lon);
                    const tradeType = tradeCategories[idx % tradeCategories.length];
                    const isActive = idx % 3 === 0; // Make some markers "active"
                    
                    return (
                      <div
                        key={city.name}
                        className="absolute group pointer-events-auto cursor-pointer"
                        style={{ 
                          top: `${pos.top}%`, 
                          left: `${pos.left}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        onClick={() => handleMarkerClick(tradeType.name, city.name)}
                        title={`Click to find ${tradeType.name} in ${city.name}`}
                      >
                        {/* Marker pin */}
                        <div className={`relative ${isActive ? 'animate-bounce' : ''}`}>
                          <div 
                            className="w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-125 backdrop-blur-sm"
                            style={{ backgroundColor: tradeType.color }}
                          >
                            {tradeType.name.charAt(0)}
                          </div>
                          
                          {/* Tooltip on hover */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 backdrop-blur-sm">
                            {city.name} - {tradeType.name} • Click to search
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black/80"></div>
                          </div>
                          
                          {/* Pulse effect for active markers */}
                          {isActive && (
                            <div 
                              className="absolute inset-0 rounded-full animate-ping opacity-30"
                              style={{ backgroundColor: tradeType.color }}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Live activity indicator */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-lg px-3 py-2 shadow-lg border border-white/20">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-gray-700">
                      Live Coverage
                    </span>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-lg p-3 shadow-lg border border-white/20">
                  <div className="text-xs font-medium text-gray-700 mb-2">Available Trades</div>
                  <div className="grid grid-cols-2 gap-1">
                    {tradeCategories.slice(0, 4).map((trade) => (
                      <div key={trade.name} className="flex items-center gap-1">
                        <div 
                          className="w-3 h-3 rounded-full border border-white shadow-sm"
                          style={{ backgroundColor: trade.color }}
                        />
                        <span className="text-xs text-gray-600">{trade.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Hero-style feature cards */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl blur-xl" />
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6 shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-t-3xl" />
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-4">Why Choose MyApproved</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm">
                    <Shield className="h-5 w-5 text-blue-400" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">Verified Professionals</p>
                    <p className="text-sm text-blue-200">ID, insurance, and background checks for complete peace of mind.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/20 border border-yellow-400/30 backdrop-blur-sm">
                    <Star className="h-5 w-5 text-yellow-400" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-yellow-400">Top-Rated Pros</p>
                    <p className="text-sm text-blue-200">5★ reviews from thousands of satisfied UK customers.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 border border-green-400/30 backdrop-blur-sm">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">Instant Booking</p>
                    <p className="text-sm text-blue-200">Connect and book trusted local specialists in minutes.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
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
