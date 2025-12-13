"use client";

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/lib/supabase-client';
import { User, Mail, Lock, Shield, Star, CheckCircle, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function TradespersonLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Client-style remember me (optional)
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [onlineCount, setOnlineCount] = useState(180); // Fixed initial value to prevent hydration mismatch

  // Handle marker click to redirect to find tradespeople page
  const handleMarkerClick = (trade: string, city: string) => {
    // Navigate to find-tradespeople page with pre-filled search
    router.push(`/find-tradespeople?search=${encodeURIComponent(trade)}&location=${encodeURIComponent(city)}`);
  };

  // Generate realistic markers for UK cities
  const tradeCategories = useMemo(
    () => [
      { name: "Plumber", color: "#2563eb", initial: "P" },
      { name: "Electrician", color: "#facc15", initial: "E" },
      { name: "Builder", color: "#16a34a", initial: "B" },
      { name: "Cleaner", color: "#9333ea", initial: "C" },
      { name: "Roofer", color: "#ea580c", initial: "R" },
      { name: "Carpenter", color: "#0ea5e9", initial: "Ca" },
    ],
    []
  );

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
      { name: "Brighton", lat: 50.8225, lon: -0.1372 },
      { name: "Southampton", lat: 50.9097, lon: -1.4043 },
      { name: "Portsmouth", lat: 50.8198, lon: -1.0880 },
    ],
    []
  );

  // Generate realistic markers positioned on actual UK cities
  const markers = useMemo(() => {
    const markerList: Array<{
      id: string;
      city: string;
      trade: string;
      color: string;
      initial: string;
      isActive: boolean;
      lat: number;
      lon: number;
    }> = [];

    ukCities.forEach((city) => {
      // Add 1-3 random trades per city
      const numTrades = Math.floor(Math.random() * 3) + 1;
      const shuffledTrades = [...tradeCategories].sort(() => Math.random() - 0.5);
      
      for (let i = 0; i < numTrades; i++) {
        const trade = shuffledTrades[i];
        markerList.push({
          id: `${city.name}-${trade.name}-${i}`,
          city: city.name,
          trade: trade.name,
          color: trade.color,
          initial: trade.initial,
          isActive: Math.random() < 0.3, // 30% chance of being "active"
          lat: city.lat + (Math.random() - 0.5) * 0.02, // Small jitter
          lon: city.lon + (Math.random() - 0.5) * 0.02,
        });
      }
    });

    return markerList;
  }, [ukCities, tradeCategories]);

  useEffect(() => {
    // Update online count after hydration to avoid mismatch
    setOnlineCount(Math.floor(Math.random() * 40) + 160);
  }, []);

  // Function to convert lat/lon to percentage for positioning on map
  const projectToPercent = (lat: number, lon: number) => {
    // UK bounds for accurate positioning
    const UK_BOUNDS = {
      north: 58.8,
      south: 49.8,
      east: 1.8,
      west: -10.5
    };
    
    const latPercent = ((UK_BOUNDS.north - lat) / (UK_BOUNDS.north - UK_BOUNDS.south)) * 100;
    const lonPercent = ((lon - UK_BOUNDS.west) / (UK_BOUNDS.east - UK_BOUNDS.west)) * 100;
    
    return {
      top: Math.min(95, Math.max(5, latPercent)),
      left: Math.min(95, Math.max(5, lonPercent))
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Check if tradesperson exists and get approval status
      const { data: tradesperson, error: userError } = await supabase
        .from('tradespeople')
        .select('id, email, first_name, is_approved, is_verified')
        .eq('email', email)
        .eq('password_hash', password)
        .maybeSingle();

      if (userError || !tradesperson) {
        setError('Invalid email or password');
        return;
      }

      // Check if tradesperson is verified by admin
      if (!tradesperson.is_verified) {
        setError('Your profile has not been verified by our admin team yet. Please wait for verification before logging in.');
        return;
      }

      // Check if tradesperson is approved by admin
      if (!tradesperson.is_approved) {
        setError('Your profile is currently under review by our admin team. You will receive an email notification once your profile is approved.');
        return;
      }

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        id: tradesperson.id,
        email: tradesperson.email,
        firstName: tradesperson.first_name,
        type: 'tradesperson',
        isApproved: tradesperson.is_approved,
        isVerified: tradesperson.is_verified
      }));

      // Redirect to tradesperson dashboard
      router.push('/dashboard/tradesperson');

    } catch (err) {
      setError('An error occurred during login');
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
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-yellow-400/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-indigo-400/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start relative z-10">
        {/* Left: Login card */}
        <div className="order-1 md:order-1 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 rounded-3xl blur-xl" />
          <Card className="relative rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
            <CardHeader className="text-center pb-4 sm:pb-6">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-t-3xl" />
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
              {error && (
                <Alert className="mb-4" variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
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
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-12 text-base bg-white/10 border-2 border-white/20 hover:border-yellow-400/50 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 rounded-lg text-white placeholder:text-blue-200 backdrop-blur-sm pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember me + divider like client */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="remember" checked={rememberMe} onCheckedChange={(c)=> setRememberMe(c === true)} />
                    <Label htmlFor="remember" className="text-sm text-blue-100">Remember me</Label>
                  </div>
                  <Link
                    href="/forgot-password?type=tradesperson"
                    className="text-sm text-yellow-400 hover:text-yellow-300 hover:underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-yellow-400 text-xs font-semibold">Enter your details</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transition-all duration-200 shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>

                {/* Primary CTA for new tradespeople */}
                <Link
                  href="/register/tradesperson"
                  className="mt-3 inline-flex items-center justify-center w-full h-11 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-sm font-semibold shadow hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transition-all duration-200"
                >
                  Create a free account
                </Link>
              </form>

              <div className="text-center space-y-3 mt-6">
                <p className="text-sm text-blue-200">
                  Are you a client?{' '}
                  <Link href="/login/client" className="text-yellow-400 hover:text-yellow-300 hover:underline font-medium">Login here</Link>
                </p>
                <p className="text-sm text-blue-200">
                  Don't have an account?{' '}
                  <Link href="/register/tradesperson" className="text-yellow-400 hover:text-yellow-300 hover:underline font-medium">Register here</Link>
                </p>
                <div className="pt-1">
                  <Link href="/contact" className="text-xs text-blue-300 hover:text-white underline">Need help? Contact support</Link>
                </div>
              </div>

              {/* Benefits bullets */}
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
                <li className="flex items-center gap-2 text-xs text-blue-100 bg-white/10 border border-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <CheckCircle className="h-4 w-4 text-green-400" /> No hidden fees
                </li>
                <li className="flex items-center gap-2 text-xs text-blue-100 bg-white/10 border border-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <Shield className="h-4 w-4 text-blue-400" /> Secure login
                </li>
                <li className="flex items-center gap-2 text-xs text-blue-100 bg-white/10 border border-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <Star className="h-4 w-4 text-yellow-400" /> Top-rated pros
                </li>
              </ul>
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
                
                {/* Interactive markers overlay - positioned to match Google Maps */}
                <div className="absolute inset-0 pointer-events-none">
                  {markers.map((marker) => {
                    // More accurate bounds matching the Google Maps embed
                    const ACCURATE_UK_BOUNDS = {
                      north: 58.8,
                      south: 49.8,
                      east: 1.8,
                      west: -10.5
                    };
                    
                    const latPercent = ((ACCURATE_UK_BOUNDS.north - marker.lat) / (ACCURATE_UK_BOUNDS.north - ACCURATE_UK_BOUNDS.south)) * 100;
                    const lonPercent = ((marker.lon - ACCURATE_UK_BOUNDS.west) / (ACCURATE_UK_BOUNDS.east - ACCURATE_UK_BOUNDS.west)) * 100;
                    
                    return (
                      <div
                        key={marker.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group pointer-events-auto cursor-pointer"
                        style={{
                          top: `${Math.min(95, Math.max(5, latPercent))}%`,
                          left: `${Math.min(95, Math.max(5, lonPercent))}%`,
                        }}
                        title={`Click to find ${marker.trade} in ${marker.city}`}
                        onClick={() => handleMarkerClick(marker.trade, marker.city)}
                      >
                        {/* Pin-style marker */}
                        <div
                          className={`relative w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs font-bold text-white transition-all duration-200 hover:scale-110 ${
                            marker.isActive ? 'animate-bounce' : ''
                          }`}
                          style={{ backgroundColor: marker.color }}
                        >
                          {marker.initial}
                          {marker.isActive && (
                            <div className="absolute -inset-1 rounded-full border-2 border-white animate-pulse opacity-75" style={{ backgroundColor: marker.color }} />
                          )}
                        </div>
                        
                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          {marker.trade} • {marker.city} • Click to search
                          {marker.isActive && <span className="text-green-300"> • Online</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Live activity indicator */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg px-3 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-gray-700">
                      {onlineCount}+ tradespeople online
                    </span>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg">
                  <div className="text-xs font-medium text-gray-700 mb-2">Available Now</div>
                  <div className="grid grid-cols-2 gap-1">
                    {tradeCategories.map((category) => (
                      <div key={category.name} className="flex items-center gap-1">
                        <div
                          className="w-3 h-3 rounded-full border border-white shadow-sm flex items-center justify-center"
                          style={{ backgroundColor: category.color }}
                        >
                          <span className="text-[8px] font-bold text-white">{category.initial}</span>
                        </div>
                        <span className="text-[10px] text-gray-600">{category.name}</span>
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
 