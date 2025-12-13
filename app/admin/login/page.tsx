'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, Star, Zap, CheckCircle, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Hardcoded admin credentials
    const ADMIN_EMAIL = 'fizasaif0233@gmail.com';
    const ADMIN_PASSWORD = '1234';

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Store admin session
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminEmail', email);
      router.push('/admin/dashboard');
    } else {
      setError('Invalid admin credentials');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 p-4">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Sign in card */}
        <Card className="shadow-xl">
          <CardHeader className="space-y-3">
            <div className="flex justify-center">
              <Badge className="bg-yellow-100 text-yellow-900 border border-yellow-300 rounded-full px-3 py-1 text-xs">
                ⭐ Trusted by 50,000+ UK customers
              </Badge>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <LogIn className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl md:text-3xl font-extrabold text-yellow-500">
                Sign in to your account
              </CardTitle>
              <CardDescription className="text-gray-600">
                Manage bookings, messages, and saved pros.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" checked={remember} onCheckedChange={(v) => setRemember(!!v)} />
                  <Label htmlFor="remember" className="text-sm text-gray-700">Remember me</Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                  Forgot your password?
                </Link>
              </div>

              <div className="text-center text-xs text-blue-600">Enter your details</div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Do not have an account?{' '}
                <Link href="/register/client" className="text-blue-600 hover:text-blue-800 hover:underline">Register here</Link>
                <br />
                Are you a tradesperson?{' '}
                <Link href="/login/trade" className="text-blue-600 hover:text-blue-800 hover:underline">Login here</Link>
              </div>

              <div className="text-center text-xs text-gray-500">
                Need help? <Link href="/contact" className="text-blue-600 hover:underline">Contact support</Link>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="flex items-center gap-2 rounded-full border bg-white px-3 py-2 text-xs text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-600" /> No hidden fees
                </div>
                <div className="flex items-center gap-2 rounded-full border bg-white px-3 py-2 text-xs text-gray-700">
                  <ShieldCheck className="h-4 w-4 text-blue-600" /> Secure login
                </div>
                <div className="flex items-center gap-2 rounded-full border bg-white px-3 py-2 text-xs text-gray-700">
                  <Star className="h-4 w-4 text-yellow-500" /> Top-rated pros
                </div>
              </div>

              <Button type="button" className="w-full mt-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                Create a free account
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right: Map and features */}
        <div className="space-y-4">
          <Card className="overflow-hidden shadow-xl">
            <CardContent className="p-0">
              {/* Use a public map screenshot asset if available */}
              <img src="/Screenshot 2025-06-11 000521.png" alt="UK map coverage" className="w-full h-[280px] object-cover" />
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Why MyApproved</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium">Verified pros</div>
                  <div className="text-gray-600">ID, insurance, and checks for peace of mind.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <div className="font-medium">Top-rated pros</div>
                  <div className="text-gray-600">5★ reviews from thousands of UK customers.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium">Fast booking</div>
                  <div className="text-gray-600">Match quickly with trusted local specialists.</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-4 text-sm text-gray-700 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>
                <strong>4.9/5</strong> from 12k+ verified reviews
              </span>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
 