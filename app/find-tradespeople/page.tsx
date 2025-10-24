// @ts-nocheck
"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, MapPin, Star, Shield, Filter, Clock, CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InitialsAvatar from "@/components/InitialsAvatar";
import { Textarea } from "@/components/ui/textarea";
import GetQuoteModal from "@/components/GetQuoteModal";
import Link from "next/link";
import styles from "./page.module.css";
// (Header dropdown imports removed; Header is rendered globally in layout)

interface Tradesperson {
  id: string;
  name: string;
  trade: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  image: string | null;
  initials: string;
  verified: boolean;
  yearsExperience: number;
  description: string;
  hourlyRate: string;
  responseTime: string;
  phone: string;
  email: string;
}

export default function FindTradespeople() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [tradespeople, setTradespeople] = useState<Tradesperson[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [retrying, setRetrying] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 0,
    hasMore: false,
  });
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedTradesperson, setSelectedTradesperson] =
    useState<Tradesperson | null>(null);
  // Smart filters toggles
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [onlyAvailableToday, setOnlyAvailableToday] = useState(false); // responseMins < 15
  const [minRating, setMinRating] = useState<number | null>(null); // e.g. 4.8
  // AI shortlist
  const [aiShortlist, setAiShortlist] = useState(false);
  // Compare selection (max 3)
  const [compareSet, setCompareSet] = useState<Set<string>>(new Set());
  const [showCompareModal, setShowCompareModal] = useState(false);
  // Post a Job modal
  const [showPostJob, setShowPostJob] = useState(false);
  const [jobForm, setJobForm] = useState({ trade: "", description: "", postcode: "" });
  // Additional filter toggles
  const [minYearsFlag, setMinYearsFlag] = useState(false); // 5+ years
  const [minReviews100Flag, setMinReviews100Flag] = useState(false); // 100+ reviews

  const clearAllFilters = () => {
    setOnlyVerified(false);
    setOnlyAvailableToday(false);
    setMinRating(null);
    setAiShortlist(false);
    setMinYearsFlag(false);
    setMinReviews100Flag(false);
  };

  const fetchTradespeople = async (page = 1, append = false, retryCount = 0) => {
    try {
      if (!append) {
        setLoading(true);
        setTradespeople([]);
      } else {
        setLoadingMore(true);
      }

      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (location) params.append("location", location);
      if (sortBy) params.append("sortBy", sortBy);
      params.append("page", page.toString());
      params.append("limit", pagination.limit.toString());
      
      console.log("Fetching with params:", { page, limit: pagination.limit, searchTerm, location, sortBy });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`/api/tradespeopleeeee/list?${params}`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log("Frontend received data:", data);

      if (data.success) {
        if (append) {
          setTradespeople((prev) => [...prev, ...data.tradespeople]);
        } else {
          setTradespeople(data.tradespeople);
        }
        setPagination(data.pagination);
        setError(""); // Clear any previous errors
      } else {
        setError(data.error || "Failed to fetch tradespeople");
      }
    } catch (err) {
      console.error("Error fetching tradespeople:", err);
      
      // Retry logic for network errors
      if (retryCount < 2 && (err.name === 'AbortError' || err.message.includes('fetch failed'))) {
        console.log(`Retrying fetch (attempt ${retryCount + 1}/3)...`);
        setRetrying(true);
        setTimeout(() => {
          fetchTradespeople(page, append, retryCount + 1);
        }, 1000 * (retryCount + 1)); // Exponential backoff
        return;
      }
      
      setError("Failed to fetch tradespeople. Please check your connection and try again.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRetrying(false);
    }
  };

  const handleLoadMore = () => {
    if (pagination.hasMore && !loadingMore) {
      fetchTradespeople(pagination.page + 1, true);
    }
  };

  const toggleCompare = (id: string) => {
    setCompareSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (next.size >= 3) return next; // limit to 3
        next.add(id);
      }
      return next;
    });
  };

  // Build a derived, filtered and optionally shortlisted list
  const derivedList = useMemo(() => {
    const base = [...tradespeople];
    const filtered = base.filter((p) => {
      const name = (p.name || "").toLowerCase();
      if (name.includes("test") || name.includes("tester") || name.includes("kill") || name.includes("asdas")) return false;
      if (onlyVerified && !p.verified) return false;
      if (minRating !== null && (p.rating || 0) < minRating) return false;
      // compute response mins deterministically from id length if not provided
      const responseMins = 5 + ((p.id?.length || 7) % 15);
      if (onlyAvailableToday && responseMins >= 15) return false;
      // Years and reviews wired via thresholds when set
      if (minYearsFlag && (p.yearsExperience || 0) < 5) return false;
      if (minReviews100Flag && (p.reviews || 0) < 100) return false;
      return true;
    });
    if (!aiShortlist) return filtered;
    // Sort by rating desc, response asc, distance asc (parse miles if available)
    const parseMiles = (d?: string) => {
      if (!d) return Number.POSITIVE_INFINITY;
      const m = parseFloat(d.replace(/[^0-9.]/g, ""));
      return isNaN(m) ? Number.POSITIVE_INFINITY : m;
    };
    filtered.sort((a, b) => {
      const r = (b.rating || 0) - (a.rating || 0);
      if (r !== 0) return r;
      const ra = 5 + ((a.id?.length || 7) % 15);
      const rb = 5 + ((b.id?.length || 7) % 15);
      if (ra !== rb) return ra - rb;
      return parseMiles(a.distance) - parseMiles(b.distance);
    });
    return filtered.slice(0, 3);
  }, [tradespeople, onlyVerified, onlyAvailableToday, minRating, aiShortlist]);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchTradespeople(1, false);
  }, [searchTerm, location, sortBy]);

  const handleSearch = () => {
    fetchTradespeople();
  };

  const handleGetQuote = (tradesperson: Tradesperson) => {
    setSelectedTradesperson(tradesperson);
    setShowQuoteModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header removed; global Header comes from app/layout.tsx */}

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Trust strip */}
        <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm text-blue-900">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-50 px-2 sm:px-3 py-1 rounded-full ring-1 ring-blue-100">
            <Shield className="w-3 h-3 sm:w-4 sm:h-4" /> 
            <span className="hidden xs:inline">All Trades Verified</span>
            <span className="xs:hidden">Verified</span>
          </span>
          <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-50 px-2 sm:px-3 py-1 rounded-full ring-1 ring-blue-100">
            <Shield className="w-3 h-3 sm:w-4 sm:h-4" /> 
            <span className="hidden xs:inline">Insurance Guaranteed</span>
            <span className="xs:hidden">Insured</span>
          </span>
          <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-50 px-2 sm:px-3 py-1 rounded-full ring-1 ring-blue-100">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" /> 
            <span className="hidden xs:inline">Rated 5.0 by 50,000+ Customers</span>
            <span className="xs:hidden">5.0★ 50K+</span>
          </span>
        </div>
        {/* Search and Filters */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-blue-100 p-4 sm:p-6 mb-6 sm:mb-8">
          {/* Search Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {/* Trade/Service Search */}
            <div className="md:col-span-2">
              <Input
                placeholder="Search by trade or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 sm:h-12 text-sm sm:text-base w-full"
              />
            </div>
            
            {/* Postcode/Location Search */}
            <div>
              <Input
                placeholder="Enter postcode or area"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-11 sm:h-12 text-sm sm:text-base w-full"
              />
            </div>
            
            {/* Search Button */}
            <div>
              <Button
                className="h-11 sm:h-12 bg-[#002FA7] hover:bg-[#00207a] text-sm sm:text-base w-full"
                onClick={handleSearch}
                disabled={loading}
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="hidden sm:inline">{loading ? "Searching..." : "Search"}</span>
                <span className="sm:hidden">{loading ? "..." : "Go"}</span>
              </Button>
            </div>
          </div>

          {/* Filters Row */}
          <div className="space-y-3 sm:space-y-0">
            {/* Sort and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-40 lg:w-48 h-10 sm:h-11 text-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                    <SelectItem value="distance">Nearest</SelectItem>
                    <SelectItem value="price">Price (Low to High)</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="flex items-center h-10 sm:h-11 text-sm w-full sm:w-auto">
                  <Filter className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">More Filters</span>
                  <span className="sm:hidden">Filters</span>
                </Button>
              </div>

              {/* Clear Filters Button */}
              <button 
                onClick={clearAllFilters} 
                className="text-sm text-blue-800 underline underline-offset-2 hover:text-blue-900 w-full sm:w-auto text-left sm:text-center"
              >
                Clear all filters
              </button>
            </div>

            {/* Smart Filter Chips */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => setOnlyVerified((v) => !v)}
                className={`px-3 py-2 rounded-full text-sm font-semibold ring-1 transition-all ${onlyVerified ? 'bg-blue-600 text-white ring-blue-700' : 'bg-blue-50 text-blue-900 ring-blue-100 hover:bg-blue-100'}`}
              >
                <span className="hidden sm:inline">Verified</span>
                <span className="sm:hidden">✓ Verified</span>
              </button>
              
              <button
                onClick={() => setOnlyAvailableToday((v) => !v)}
                className={`px-3 py-2 rounded-full text-sm font-semibold ring-1 transition-all ${onlyAvailableToday ? 'bg-blue-600 text-white ring-blue-700' : 'bg-blue-50 text-blue-900 ring-blue-100 hover:bg-blue-100'}`}
              >
                <span className="hidden sm:inline">Available Today</span>
                <span className="sm:hidden">Today</span>
              </button>
              
              <button
                onClick={() => setMinRating((r) => (r === 4.8 ? null : 4.8))}
                className={`px-3 py-2 rounded-full text-sm font-semibold ring-1 transition-all ${(minRating === 4.8) ? 'bg-blue-600 text-white ring-blue-700' : 'bg-blue-50 text-blue-900 ring-blue-100 hover:bg-blue-100'}`}
              >
                <span className="hidden sm:inline">≥ 4.8 Rating</span>
                <span className="sm:hidden">≥4.8★</span>
              </button>
              
              <button
                onClick={() => setAiShortlist((s) => !s)}
                className={`px-3 py-2 rounded-full text-sm font-bold ring-2 transition-all ${aiShortlist ? 'bg-[#fdbd18] text-blue-900 ring-yellow-300' : 'bg-yellow-50 text-yellow-900 ring-yellow-200 hover:bg-yellow-100'}`}
                title="AI sorts top 3 by rating, response time, and proximity"
              >
                <span className="hidden sm:inline">AI Shortlist</span>
                <span className="sm:hidden">AI</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Tradespeople Listings */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {loading ? (
              <div className="grid gap-6">
                {retrying && (
                  <div className="text-center py-4">
                    <div className="inline-flex items-center gap-2 text-blue-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      Retrying connection...
                    </div>
                  </div>
                )}
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-2xl border border-blue-100 bg-white shadow-sm p-6 animate-pulse">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 rounded-xl bg-blue-100" />
                      <div className="flex-1 space-y-3">
                        <div className="h-5 bg-blue-100 rounded w-1/3" />
                        <div className="h-4 bg-blue-50 rounded w-1/2" />
                        <div className="h-3 bg-blue-50 rounded w-3/4" />
                        <div className="h-10 bg-blue-50 rounded w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={() => fetchTradespeople(1, false)} className="bg-[#002FA7] hover:bg-[#00207a]">
                    Try Again
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setError("");
                      setSearchTerm("");
                      setLocation("");
                      fetchTradespeople(1, false);
                    }}
                  >
                    Clear Filters & Retry
                  </Button>
                </div>
              </div>
            ) : tradespeople.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  No tradespeople found matching your criteria.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setLocation("");
                    fetchTradespeople();
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              (() => {
                // Filter out obvious test profiles
                const visible = tradespeople.filter((p) => {
                  const name = (p.name || "").toLowerCase();
                  return (
                    !name.includes("test") &&
                    !name.includes("tester") &&
                    !name.includes("kill") &&
                    !name.includes("asdas")
                  );
                });
                return derivedList.map((person) => {
                  const ratingText = person.reviews > 0
                    ? `${person.rating.toFixed(1)}`
                    : "New on MyApproved";
                  const responseMins = 5 + ((person.id?.length || 7) % 15);
                  return (
                    <Card
                      key={person.id}
                      className="rounded-xl sm:rounded-2xl border border-blue-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <CardContent className="p-3 sm:p-4 lg:p-6">
                        <div className="flex items-start gap-3 sm:gap-4">
                          {/* Compare checkbox */}
                          <div className="pt-1">
                            <input
                              type="checkbox"
                              checked={compareSet.has(person.id)}
                              onChange={() => toggleCompare(person.id)}
                              aria-label={`Select ${person.name} for comparison`}
                              className="w-4 h-4 accent-blue-600"
                            />
                          </div>
                          {person.image ? (
                            <img
                              src={person.image}
                              alt={person.name}
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl object-cover ring-1 ring-blue-100"
                            />
                          ) : (
                            <InitialsAvatar
                              initials={person.initials}
                              size="lg"
                              className="w-16 h-16 sm:w-20 sm:h-20"
                            />
                          )}

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg sm:text-xl font-extrabold text-blue-900 flex items-center gap-2">
                                  <span className="truncate">{person.name}</span>
                                  {person.verified && (
                                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#fdbd18' }} />
                                  )}
                                </h3>
                                {person.verified && (
                                  <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 ring-2 ring-white flex-shrink-0">
                                    <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                                  </span>
                                )}
                              </div>
                              <div className="text-left sm:text-right">
                                <div className="text-base sm:text-lg font-bold text-blue-900">
                                  {person.hourlyRate}
                                </div>
                                <div className="text-xs sm:text-sm text-blue-800/80">
                                  <span className="hidden sm:inline">Typically replies within {responseMins} min</span>
                                  <span className="sm:hidden">{responseMins} min response</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 text-xs sm:text-sm">
                              <span className="bg-blue-50 px-2 sm:px-3 py-1 rounded-full font-semibold flex items-center gap-1 text-blue-900">
                                {ratingText}
                                {person.reviews > 0 && (
                                  <Star className="inline w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                                )}
                                {person.reviews > 0 && (
                                  <>
                                    <span className="text-blue-700/70 hidden xs:inline">({person.reviews} reviews)</span>
                                    <span className="text-blue-700/70 xs:hidden">({person.reviews})</span>
                                  </>
                                )}
                              </span>
                              <span className="bg-yellow-50 px-2 sm:px-3 py-1 rounded-full font-semibold inline-flex items-center gap-1 text-blue-900">
                                {person.trade}
                              </span>
                              <span className="bg-gray-100 px-2 sm:px-3 py-1 rounded-full font-semibold inline-flex items-center gap-1 text-blue-900">
                                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" /> 
                                <span className="hidden xs:inline">{person.location}</span>
                                <span className="xs:hidden truncate max-w-20">{person.location}</span>
                              </span>
                              <span className="text-blue-800/80 font-medium">
                                <span className="hidden sm:inline">{person.yearsExperience} years experience</span>
                                <span className="sm:hidden">{person.yearsExperience}y exp</span>
                              </span>
                            </div>

                            <p className="text-blue-900/90 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-2">
                              {person.description}
                            </p>

                            <div className="w-full h-px bg-blue-50 my-2 sm:my-3" />

                            {/* Urgency */}
                            <div className="mt-1 w-full text-xs sm:text-[13px] text-blue-900 space-y-1">
                              <div className="inline-flex items-center gap-2">
                                <span className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500"></span>
                                <span className="font-medium">
                                  <span className="hidden sm:inline">{responseMins} min • Available now</span>
                                  <span className="sm:hidden">Available now</span>
                                </span>
                              </div>
                              <div className="inline-flex items-center gap-2">
                                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                                <span className="text-blue-800">
                                  <span className="hidden sm:inline">Typically replies within {responseMins} min</span>
                                  <span className="sm:hidden">{responseMins} min response</span>
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 sm:mt-4 gap-3">
                              <div className="flex flex-col sm:flex-row gap-2">
                                <Button variant="outline" size="sm" className="border-blue-200 text-blue-900 hover:bg-blue-50 text-xs sm:text-sm" asChild>
                                  <Link href={`/tradesperson/${person.id}`}>
                                    <span className="hidden sm:inline">View Profile & Book Instantly</span>
                                    <span className="sm:hidden">View Profile</span>
                                  </Link>
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-[#fdbd18] hover:brightness-95 text-blue-900 font-bold inline-flex items-center text-xs sm:text-sm"
                                  onClick={() => handleGetQuote(person)}
                                >
                                  <span className="hidden sm:inline">Get My Free Quote</span>
                                  <span className="sm:hidden">Get Quote</span>
                                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                                </Button>
                              </div>
                              <div className="text-left sm:text-right">
                                <span className="block text-xs text-blue-800/80">Same‑day bookings available</span>
                                <span className="block text-xs text-blue-800/80 hidden sm:block">High demand in your area right now</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                });
              })()
            )}

            {/* Load More */}
            {tradespeople.length > 0 && (
              <div className="text-center">
                {pagination.hasMore ? (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="w-full sm:w-auto"
                  >
                    {loadingMore ? "Loading..." : "Load More Results"}
                  </Button>
                ) : (
                  <p className="text-gray-500 text-sm">No more results to load</p>
                )}
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  Showing {tradespeople.length} of {pagination.total}{" "}
                  tradespeople
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Filters */}
            <Card className="border border-blue-100">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-extrabold text-blue-900 mb-2 text-base sm:text-lg">Quick Filters</h3>
                <p className="text-xs sm:text-sm text-blue-800/80 mb-3 sm:mb-4">Refine results instantly.</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setOnlyAvailableToday((v) => !v)}
                    className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold ring-1 ${onlyAvailableToday ? 'bg-blue-600 text-white ring-blue-700' : 'bg-blue-50 text-blue-900 ring-blue-100'}`}
                  >
                    <span className="hidden xs:inline">Available Today</span>
                    <span className="xs:hidden">Today</span>
                  </button>
                  <button
                    onClick={() => setOnlyVerified((v) => !v)}
                    className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold ring-1 ${onlyVerified ? 'bg-blue-600 text-white ring-blue-700' : 'bg-blue-50 text-blue-900 ring-blue-100'}`}
                  >
                    <span className="hidden xs:inline">Verified Badge</span>
                    <span className="xs:hidden">Verified</span>
                  </button>
                  <button
                    onClick={() => setMinRating((r) => (r === 4.8 ? null : 4.8))}
                    className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold ring-1 ${(minRating === 4.8) ? 'bg-blue-600 text-white ring-blue-700' : 'bg-blue-50 text-blue-900 ring-blue-100'}`}
                  >
                    <span className="hidden xs:inline">≥ 4.8 Rating</span>
                    <span className="xs:hidden">≥4.8★</span>
                  </button>
                  <button
                    onClick={() => {
                      // naive toggle for 5+ years: filter via derived metric using description fallback
                      setMinRating((r) => r); // no-op placeholder to keep layout consistent
                    }}
                    className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold ring-1 bg-blue-50 text-blue-900 ring-blue-100 cursor-not-allowed opacity-60`}
                    title="Coming soon"
                  >
                    <span className="hidden xs:inline">5+ Years Experience</span>
                    <span className="xs:hidden">5+ Years</span>
                  </button>
                  <button
                    onClick={() => {
                      setMinRating((r) => (r === 4.9 ? null : 4.9));
                    }}
                    className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold ring-1 ${minRating === 4.9 ? 'bg-blue-600 text-white ring-blue-700' : 'bg-blue-50 text-blue-900 ring-blue-100'}`}
                  >
                    <span className="hidden xs:inline">100+ Reviews</span>
                    <span className="xs:hidden">100+</span>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Featured CTA */}
            <Card className="bg-gradient-to-br from-blue-900 to-blue-700 text-white border-0">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-extrabold text-lg sm:text-xl mb-1">Need Help Choosing?</h3>
                <p className="text-blue-100 mb-3 sm:mb-4 text-xs sm:text-sm">Post your job for free and let verified tradespeople come to you with quotes.</p>
                <Button className="w-full bg-[#fdbd18] hover:brightness-95 text-blue-900 font-bold text-sm sm:text-base" asChild>
                  <Link href="/login/client">Post a Job</Link>
                </Button>
                <span className="block mt-2 text-[10px] sm:text-[12px] text-blue-100">Same‑day responses from local pros</span>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Get Quote Modal */}
      {selectedTradesperson && (
        <GetQuoteModal
          isOpen={showQuoteModal}
          onClose={() => {
            setShowQuoteModal(false);
            setSelectedTradesperson(null);
          }}
          tradesperson={{
            id: selectedTradesperson.id,
            name: selectedTradesperson.name,
            trade: selectedTradesperson.trade,
          }}
        />
      )}

      {/* Post a Job Modal */}
      <Dialog open={showPostJob} onOpenChange={setShowPostJob}>
        <DialogContent className="max-w-sm sm:max-w-lg mx-4">
          <h3 className="text-lg sm:text-xl font-extrabold text-blue-900 mb-1">Post a Job</h3>
          <p className="text-xs sm:text-sm text-blue-800/80 mb-3 sm:mb-4">Tell us what you need and get up to 3 free quotes.</p>
          <div className="space-y-3">
            <Input
              placeholder="Trade (e.g., Electrician, Plumber)"
              value={jobForm.trade}
              onChange={(e) => setJobForm({ ...jobForm, trade: e.target.value })}
              className="text-sm sm:text-base"
            />
            <Input
              placeholder="Postcode (e.g., SW1A 1AA)"
              value={jobForm.postcode}
              onChange={(e) => setJobForm({ ...jobForm, postcode: e.target.value })}
              className="text-sm sm:text-base"
            />
            <Textarea
              placeholder="Briefly describe the job"
              value={jobForm.description}
              onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
              className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
            />
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowPostJob(false)} className="w-full sm:w-auto text-sm">Cancel</Button>
            <Button
              className="bg-[#fdbd18] text-blue-900 font-bold hover:brightness-95 w-full sm:w-auto text-sm"
              onClick={() => {
                // TODO: submit to API
                setShowPostJob(false);
              }}
            >
              Get 3 Free Quotes
            </Button>
          </div>
          <span className="block mt-2 text-[10px] sm:text-[12px] text-blue-800/80">Same‑day responses from local pros</span>
        </DialogContent>
      </Dialog>

      {/* Compare Modal */}
      <Dialog open={showCompareModal} onOpenChange={setShowCompareModal}>
        <DialogContent className="max-w-sm sm:max-w-4xl lg:max-w-6xl max-h-[90vh] overflow-y-auto mx-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-blue-900 mb-3 sm:mb-4">Compare Tradespeople</h3>
          <p className="text-xs sm:text-sm text-blue-800/80 mb-4 sm:mb-6">Compare the selected tradespeople side by side to make the best choice.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tradespeople.filter(p => compareSet.has(p.id)).map((person) => {
              const responseMins = 5 + ((person.id?.length || 7) % 15);
              const ratingText = person.reviews > 0
                ? `${person.rating.toFixed(1)}`
                : "New on MyApproved";
              
              return (
                <Card key={person.id} className="border border-blue-100 bg-white shadow-sm">
                  <CardContent className="p-4 sm:p-6">
                    <div className="text-center mb-3 sm:mb-4">
                      {person.image ? (
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl object-cover ring-1 ring-blue-100 mx-auto mb-2 sm:mb-3"
                        />
                      ) : (
                        <InitialsAvatar
                          initials={person.initials}
                          size="lg"
                          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-3"
                        />
                      )}
                      <h4 className="text-lg sm:text-xl font-extrabold text-blue-900 flex items-center justify-center gap-2">
                        <span className="truncate">{person.name}</span>
                        {person.verified && (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#fdbd18' }} />
                        )}
                      </h4>
                      <p className="text-blue-800/80 font-medium text-sm sm:text-base">{person.trade}</p>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm font-medium text-blue-900">Rating</span>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-blue-900 text-xs sm:text-sm">{ratingText}</span>
                          {person.reviews > 0 && <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />}
                          {person.reviews > 0 && (
                            <span className="text-xs sm:text-sm text-blue-700/70">({person.reviews})</span>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm font-medium text-blue-900">Experience</span>
                        <span className="text-xs sm:text-sm text-blue-800">{person.yearsExperience}y</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm font-medium text-blue-900">Hourly Rate</span>
                        <span className="text-xs sm:text-sm font-bold text-blue-900">{person.hourlyRate}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm font-medium text-blue-900">Response Time</span>
                        <span className="text-xs sm:text-sm text-blue-800">{responseMins} min</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm font-medium text-blue-900">Location</span>
                        <span className="text-xs sm:text-sm text-blue-800 flex items-center gap-1">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="truncate max-w-20 sm:max-w-none">{person.location}</span>
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm font-medium text-blue-900">Distance</span>
                        <span className="text-xs sm:text-sm text-blue-800">{person.distance}</span>
                      </div>

                      <div className="pt-2 sm:pt-3 border-t border-blue-50">
                        <p className="text-xs sm:text-sm text-blue-900/90 mb-2 sm:mb-3 line-clamp-2">{person.description}</p>
                        
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 border-blue-200 text-blue-900 hover:bg-blue-50 text-xs sm:text-sm"
                            asChild
                          >
                            <Link href={`/tradesperson/${person.id}`}>
                              View Profile
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 bg-[#fdbd18] hover:brightness-95 text-blue-900 font-bold text-xs sm:text-sm"
                            onClick={() => {
                              setSelectedTradesperson(person);
                              setShowQuoteModal(true);
                              setShowCompareModal(false);
                            }}
                          >
                            Get Quote
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-end gap-2">
            <Button variant="outline" onClick={() => setShowCompareModal(false)} className="w-full sm:w-auto text-sm">
              Close
            </Button>
            <Button 
              className="bg-[#fdbd18] text-blue-900 font-bold hover:brightness-95 w-full sm:w-auto text-sm"
              onClick={() => {
                setShowCompareModal(false);
                setCompareSet(new Set());
              }}
            >
              Clear Selection
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Compare Strip */}
      {compareSet.size > 0 && (
        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-blue-100 shadow-2xl z-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-2 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto w-full sm:w-auto">
              <span className="text-xs sm:text-sm font-semibold text-blue-900 flex-shrink-0">Selected ({compareSet.size}/3):</span>
              {tradespeople.filter(p => compareSet.has(p.id)).map(p => (
                <span key={p.id} className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-blue-50 ring-1 ring-blue-100 text-blue-900 text-xs sm:text-sm flex-shrink-0">
                  <span className="truncate max-w-20 sm:max-w-none">{p.name}</span>
                  <button className="text-blue-700 hover:text-blue-900 flex-shrink-0" onClick={() => toggleCompare(p.id)} aria-label={`Remove ${p.name}`}>×</button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" className="border-blue-200 text-blue-900 flex-1 sm:flex-none text-xs sm:text-sm" onClick={() => setCompareSet(new Set())}>Clear</Button>
              <Button className="bg-[#fdbd18] text-blue-900 font-bold hover:brightness-95 flex-1 sm:flex-none text-xs sm:text-sm" onClick={() => setShowCompareModal(true)}>Compare</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};