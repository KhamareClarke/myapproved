"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle,
  XCircle,
  Star,
  Plus,
  LogOut,
  Clock,
  MessageCircle,
  ChevronDown,
  Wrench,
  Phone,
  Mail,
  User,
  Bell,
  ShieldCheck,
  Flag,
  AlertTriangle,
} from "lucide-react";
import JobPostForm from "@/components/JobPostForm";
import JobCompletionDialog from "@/components/JobCompletionDialog";
import { supabase } from "@/lib/supabase-client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SimpleChatSystem from "@/components/SimpleChatSystem";
import DatabaseChatSystem from "@/components/DatabaseChatSystem";
import AISupportChat from "@/components/AISupportChat";
import PostJobDialog from "@/components/PostJobDialog";
import ClientQuoteRequests from "@/components/ClientQuoteRequests";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: string;
  email: string;
  firstName: string;
  type: string;
}

interface Job {
  id: string;
  trade: string;
  job_description: string;
  postcode: string;
  budget: number;
  budget_type: string;
  preferred_date: string;
  status: string;
  is_approved: boolean;
  created_at: string;
  application_status?: string;
  tradespeople?: {
    id: string;
    first_name: string;
    last_name: string;
    trade: string;
    years_experience: number;
    hourly_rate: number;
    phone: string;
  };
  quotation_amount?: number;
  quotation_notes?: string;
  assigned_by?: string;
  is_completed?: boolean;
  completed_at?: string;
  completed_by?: string;
  client_rating?: number;
  client_review?: string;
  assigned_tradesperson_id?: string; // Added for assignment status
  job_reviews?: {
    id: string;
    tradesperson_id: string;
    reviewer_type: "client" | "tradesperson";
    reviewer_id: string;
    rating: number;
    review_text: string;
    reviewed_at: string;
  }[];
}

export default function ClientDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [chatUnreadCount, setChatUnreadCount] = useState(0);
  const [showJobForm, setShowJobForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showAssignmentDialog, setShowAssignmentDialog] = useState(false);
  const [selectedJobForAssignment, setSelectedJobForAssignment] =
    useState<any>(null);
  const [assignmentQuotation, setAssignmentQuotation] = useState("");
  const [assignmentNotes, setAssignmentNotes] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [availableTradespeople, setAvailableTradespeople] = useState<any[]>([]);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [selectedJobForCompletion, setSelectedJobForCompletion] =
    useState<any>(null);
  const [completing, setCompleting] = useState(false);
  const [jobApplications, setJobApplications] = useState<any[]>([]);
  const [allApplications, setAllApplications] = useState<any[]>([]); // New state for all applications
  const [activeTab, setActiveTab] = useState("jobs"); // New state for active tab
  const [tableDensity, setTableDensity] = useState<'comfortable' | 'compact'>("comfortable");
  const [qrRefreshKey, setQrRefreshKey] = useState(0);
  const [showFlagDialog, setShowFlagDialog] = useState(false);
  const [selectedJobForFlag, setSelectedJobForFlag] = useState<Job | null>(null);
  const [flagReason, setFlagReason] = useState("");
  const [flagging, setFlagging] = useState(false);
  const router = useRouter();

  // Avatar (client profile image) — stored locally to avoid logic changes
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | null>(null);
  const avatarKey = user?.id ? `client_avatar_${user.id}` : null;
  useEffect(() => {
    if (!avatarKey) return;
    try {
      const saved = localStorage.getItem(avatarKey);
      if (saved) setAvatarDataUrl(saved);
    } catch {}
  }, [avatarKey]);
  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setAvatarDataUrl(dataUrl);
      try {
        if (avatarKey) localStorage.setItem(avatarKey, dataUrl);
      } catch {}
    };
    reader.readAsDataURL(file);
  };
  const initials = (first?: string, last?: string) => {
    const a = (first || '').trim()[0] || '';
    const b = (last || '').trim()[0] || '';
    return (a + b).toUpperCase() || 'U';
  };

  // Greeting helper (visual only)
  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  // Formatting helpers (UI polish only)
  const formatDate = (iso?: string) => {
    if (!iso) return "-";
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    } catch { return "-"; }
  };
  const formatCurrency = (value: number | null | undefined) => {
    if (value === null || value === undefined || isNaN(Number(value))) return "Not specified";
    try {
      return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(Number(value));
    } catch { return `£${value}`; }
  };

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login/client");
      return;
    }

    try {
      const userObj = JSON.parse(userData);
      if (userObj.type !== "client") {
        router.push("/login/client");
        return;
      }

      setUser(userObj);
      // Load jobs after user is set
      loadJobs(userObj.id);
      loadAllApplications(userObj.id); // Load all applications for quotations tab
    } catch (err) {
      console.error("Error parsing user data:", err);
      router.push("/login/client");
    }
  }, [router]);

  // Auto-refresh chat unread count every 10 seconds
  useEffect(() => {
    if (user?.id) {
      const interval = setInterval(() => {
        loadChatUnreadCount(user.id);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [user?.id]);

  // Load chat unread count
  const loadChatUnreadCount = async (userId: string) => {
    try {
      const response = await fetch(
        `/api/chat/unread-count?userId=${userId}&userType=client`
      );
      const data = await response.json();

      if (response.ok) {
        setChatUnreadCount(data.unreadCount || 0);
      } else {
        console.error("Failed to load chat unread count:", data.error);
      }
    } catch (error) {
      console.error("Error loading chat unread count:", error);
    }
  };

  const loadJobs = async (userId: string) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`/api/client/jobs?userId=${userId}`);
      const data = await response.json();

      if (response.ok) {
        setJobs(data.jobs || []);
        await loadAllApplications(userId);
        await loadChatUnreadCount(userId);
      } else {
        setError(data.error || "Failed to load jobs");
      }
    } catch (error) {
      console.error("Error loading jobs:", error);
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const loadJobApplications = async (jobId: string) => {
    try {
      const { data, error } = await supabase
        .from("job_applications")
        .select(
          `*, tradespeople (id, first_name, last_name, trade, years_experience, hourly_rate, phone, email)`
        )
        .eq("job_id", jobId)
        .order("applied_at", { ascending: false });
      if (!error) setJobApplications(data || []);
      else setJobApplications([]);
    } catch (err) {
      setJobApplications([]);
    }
  };

  const loadAllApplications = async (userId: string) => {
    try {
      console.log("Loading all applications for user:", userId);

      const { data: applications, error } = await supabase
        .from("job_applications")
        .select(
          `
          *,
          jobs (
            id,
            trade,
            job_description,
            postcode,
            budget,
            budget_type,
            client_id,
            clients (
              first_name,
              last_name,
              email
            )
          ),
          tradespeople (
            id,
            first_name,
            last_name,
            email,
            trade,
            years_experience,
            hourly_rate,
            phone
          )
        `
        )
        .eq("jobs.client_id", userId)
        .order("applied_at", { ascending: false });

      if (error) {
        console.error("Error loading all applications:", error);
        setError("Failed to load applications: " + error.message);
        return;
      }

      console.log("All applications loaded:", applications);
      setAllApplications(applications || []);
    } catch (err) {
      console.error("Error in loadAllApplications:", err);
      setError(
        "Error loading applications: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login/client");
  };

  const handleJobPosted = () => {
    setShowJobForm(false);
    if (user) {
      loadJobs(user.id); // Reload jobs after posting
    }
  };

  const loadAvailableTradespeople = async (
    jobTrade: string,
    jobPostcode: string
  ) => {
    try {
      const { data: tradespeople, error } = await supabase
        .from("tradespeople")
        .select("*")
        .eq("trade", jobTrade)
        .eq("is_approved", true)
        .eq("is_verified", true);

      if (error) {
        console.error("Error loading tradespeople:", error);
        return;
      }

      // Filter by location (simple postcode matching)
      const filteredTradespeople =
        tradespeople?.filter((tp) => {
          // Simple distance calculation (same postcode area)
          const tpArea = tp.postcode.split(" ")[0];
          const jobArea = jobPostcode.split(" ")[0];
          return tpArea === jobArea;
        }) || [];

      setAvailableTradespeople(filteredTradespeople);
    } catch (err) {
      console.error("Error in loadAvailableTradespeople:", err);
    }
  };

  const handleAssignJob = (job: any) => {
    if (job.assigned_by === "admin") {
      setError(
        "This job has already been assigned by admin. You cannot reassign it."
      );
      return;
    }
    setSelectedJobForAssignment(job);
    setJobApplications([]);
    loadJobApplications(job.id);
    setShowAssignmentDialog(true);
  };

  const submitAssignment = async (application: any) => {
    if (!selectedJobForAssignment || !user) {
      setError("Missing job or user information");
      return;
    }

    setAssigning(true);
    setError("");

    try {
      // Directly assign to the specific tradesperson
      const response = await fetch("/api/jobs/client-assign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: selectedJobForAssignment.id,
          tradespersonId: application.tradesperson_id,
          quotationAmount: application.quotation_amount,
          quotationNotes: application.quotation_notes,
          assignedBy: "client",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Job assigned successfully!");
        setShowAssignmentDialog(false);
        loadJobs(user.id); // Reload jobs to update the UI
      } else {
        setError(data.error || "Failed to assign job");
      }
    } catch (err) {
      setError("Error assigning job");
    } finally {
      setAssigning(false);
    }
  };

  const handleCompleteJob = async (job: any) => {
    setSelectedJobForCompletion(job);

    // Load all accepted applications for this job
    try {
      const { data: acceptedApplications, error } = await supabase
        .from("job_applications")
        .select(
          `
          *,
          tradespeople (
            id,
            first_name,
            last_name,
            email,
            trade,
            years_experience,
            hourly_rate,
            phone
          )
        `
        )
        .eq("job_id", job.id)
        .eq("status", "accepted")
        .order("accepted_at", { ascending: false });

      if (error) {
        console.error("Error loading accepted applications:", error);
        setError("Failed to load tradespeople for rating");
        return;
      }

      setSelectedJobForCompletion({
        ...job,
        acceptedApplications: acceptedApplications || [],
      });
    } catch (err) {
      console.error("Error in handleCompleteJob:", err);
      setError("Error loading tradespeople for rating");
      return;
    }

    setShowCompletionDialog(true);
  };

  const handleFlagJob = (job: Job) => {
    setSelectedJobForFlag(job);
    setFlagReason("");
    setShowFlagDialog(true);
  };

  const submitFlagJob = async () => {
    if (!selectedJobForFlag || !user?.id) {
      setError("Unable to flag job. Please log in and try again.");
      return;
    }

    if (flagReason.trim().length < 10) {
      setError("Please provide a detailed reason (at least 10 characters)");
      return;
    }

    setFlagging(true);
    setError("");

    try {
      console.log("Flagging job with data:", {
        jobId: selectedJobForFlag.id,
        userId: user.id,
        userType: 'client'
      });

      const response = await fetch("/api/jobs/flag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: selectedJobForFlag.id,
          flagReason: flagReason.trim(),
          userId: user.id,
          userType: 'client',
        }),
      });

      const result = await response.json();
      console.log("Flag job response:", result);

      if (result.success) {
        setSuccess("Job flagged successfully. Admin will review your concern.");
        setShowFlagDialog(false);
        setFlagReason("");
        setSelectedJobForFlag(null);
        
        // Only refresh if we have a valid user ID
        if (user.id) {
          await loadJobs(user.id); // Refresh jobs list with user ID
        }
      } else {
        setError(result.message || "Failed to flag job");
      }
    } catch (err) {
      console.error("Error flagging job:", err);
      setError("Failed to flag job. Please try again.");
    } finally {
      setFlagging(false);
    }
  };

  const submitJobCompletion = async (ratings: {
    [tradespersonId: string]: { rating: number; review: string };
  }) => {
    if (!selectedJobForCompletion || !user) {
      setError("Missing job or user information");
      return;
    }

    setCompleting(true);
    setError("");

    try {
      // First complete the job
      const response = await fetch("/api/jobs/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: selectedJobForCompletion.id,
          completedBy: "client",
          reviewerType: "client",
          reviewerId: user.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Now submit ratings for each tradesperson
        const ratingPromises = Object.entries(ratings).map(
          ([tradespersonId, ratingData]) =>
            fetch("/api/jobs/rate-tradesperson", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                jobId: selectedJobForCompletion.id,
                tradespersonId: tradespersonId,
                rating: ratingData.rating,
                review: ratingData.review,
                reviewerType: "client",
                reviewerId: user.id,
              }),
            })
        );

        await Promise.all(ratingPromises);

        setSuccess("Job completed successfully with ratings!");
        setShowCompletionDialog(false);
        await refreshAllData(); // Refresh all data
      } else {
        setError(data.error || "Failed to complete job");
      }
    } catch (err) {
      setError("Error completing job");
    } finally {
      setCompleting(false);
    }
  };

  const handleApproveQuotation = async (
    applicationId: string,
    action: "approve" | "reject"
  ) => {
    setAssigning(true);
    setError("");
    try {
      const response = await fetch(
        "/api/client/admin-secret/approve-quotation",
        {
          // Reusing admin API
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ applicationId, action }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Quotation ${action}d successfully!`);
        await refreshAllData(); // Refresh all data after action
      } else {
        setError(data.error || `Failed to ${action} quotation`);
      }
    } catch (err) {
      setError(`Error ${action}ing quotation`);
    } finally {
      setAssigning(false);
    }
  };

  const refreshAllData = async () => {
    if (!user) return;

    console.log("Refreshing all data for user:", user.id);
    await loadJobs(user.id);
    await loadAllApplications(user.id);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div>Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div>No user data found. Redirecting to login...</div>
        </div>
      </div>
    );
  }

  // Filter jobs by status
  const pendingJobs = jobs.filter((job) => !job.is_approved);
  const availableJobs = jobs.filter(
    (job) =>
      job.is_approved && job.application_status === "open" && !job.is_completed
  );
  const inProgressJobs = jobs.filter(
    (job) => job.application_status === "in_progress" && !job.is_completed
  );
  const completedJobs = jobs.filter((job) => job.is_completed);

  // Get accepted jobs for chat rooms
  const acceptedJobs = jobs.filter(
    (job) =>
      job.assigned_tradesperson_id &&
      job.application_status === "in_progress" &&
      !job.is_completed
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Page-level header removed to avoid duplication with global header */}

      {/* Dashboard Header removed to avoid duplicate headers */}

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading removed; merged into Summary Banner for a single source of truth */}
          {/* Summary Banner (redesigned) */}
          <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white p-5 md:p-6 shadow-xl">
            {/* subtle decorative */}
            <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left: Greeting + Profile + Quick stats */}
              <div className="max-w-xl">
                <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">Your Dashboard Overview</h2>
                <p className="text-white/80 text-sm">Stay on top of jobs, quotes and progress</p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-sm">{getGreeting()}, <span className="font-semibold">{user?.firstName || 'there'}</span> 👋</span>
                  {/* Inline profile */}
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      {avatarDataUrl ? (
                        <img src={avatarDataUrl} alt="Profile" className="h-9 w-9 rounded-full object-cover border border-white/30" />
                      ) : (
                        <div className="h-9 w-9 rounded-full bg-white/20 text-white flex items-center justify-center text-xs font-bold border border-white/30">
                          {initials(user?.firstName, '')}
                        </div>
                      )}
                      <label className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#fdbd18] text-blue-900 text-[10px] font-bold shadow cursor-pointer" aria-label="Upload avatar">
                        +
                        <input type="file" accept="image/*" className="hidden" onChange={onAvatarChange} />
                      </label>
                    </div>
                    <span className="text-[12px] text-white/85">Keep your info up to date for faster bookings</span>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 border border-white/15"><CheckCircle className="w-3.5 h-3.5 text-white" /> {completedJobs.length} jobs completed</div>
                  <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 border border-white/15"><Star className="w-3.5 h-3.5 text-yellow-300" /> Avg spend {formatCurrency(Math.round((jobs.reduce((s,j)=>s+(j.budget||0),0) || 0) / Math.max(1, jobs.length)) as any)}</div>
                  <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 border border-white/15"><Wrench className="w-3.5 h-3.5 text-white" /> {new Set(jobs.map(j=>j.tradespeople?.id).filter(Boolean)).size} trades hired</div>
                  <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 border border-white/15"><MessageCircle className="w-3.5 h-3.5 text-white" /> Response rate ~{Math.min(100, (inProgressJobs.length+completedJobs.length)*10)}%</div>
                </div>
              </div>

              {/* Right: KPI tiles and logout */}
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 lg:min-w-[420px]">
                  <div className="rounded-xl bg-white/10 border border-white/15 p-3 text-center">
                    <div className="text-2xl font-extrabold tracking-tight">{jobs.length}</div>
                    <div className="text-xs opacity-80">Total Jobs</div>
                  </div>
                  <div className="rounded-xl bg-white/10 border border-white/15 p-3 text-center">
                    <div className="text-2xl font-extrabold tracking-tight">{pendingJobs.length}</div>
                    <div className="text-xs opacity-80">Pending</div>
                  </div>
                  <div className="rounded-xl bg-white/10 border border-white/15 p-3 text-center">
                    <div className="text-2xl font-extrabold tracking-tight">{inProgressJobs.length}</div>
                    <div className="text-xs opacity-80">In Progress</div>
                  </div>
                  <div className="rounded-xl bg-white/10 border border-white/15 p-3 text-center">
                    <div className="text-2xl font-extrabold tracking-tight">{completedJobs.length}</div>
                    <div className="text-xs opacity-80">Completed</div>
                  </div>
                </div>
                
                {/* Logout Button */}
                <div className="flex justify-end">
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>

            {/* Smart Insights */}
            <div className="mt-4 rounded-xl bg-white/10 border border-white/15 p-3">
              <div className="text-xs font-semibold">Smart Insights</div>
              <div className="text-[12px] opacity-90 mt-1">
                {inProgressJobs.length} job{inProgressJobs.length===1?'':'s'} in progress. {pendingJobs.length>0?`You have ${pendingJobs.length} job${pendingJobs.length===1?'':'s'} pending approval.`:'All jobs approved.'}
              </div>
              <div className="text-[11px] opacity-80">Suggested action: review any new quotations and open chat to confirm timelines.</div>
            </div>

            {/* Trust chips */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-2.5 py-1"><CheckCircle className="w-3.5 h-3.5" /> Verified pros</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-2.5 py-1"><Star className="w-3.5 h-3.5" /> Top rated</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-2.5 py-1">Fully insured</span>
            </div>
          </div>
          {/* Success/Error Messages */}
          {success && (
            <Alert className="mb-6">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert className="mb-6" variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Job Posting Form */}
          {showJobForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Post a New Job</CardTitle>
                <CardDescription>
                  Fill in the details below to post a new job for tradespeople
                </CardDescription>
              </CardHeader>
              <CardContent>
                <JobPostForm onJobPosted={handleJobPosted} />
              </CardContent>
            </Card>
          )}

          {/* Legacy Stats grid removed; KPIs live in Summary Banner */}

          {/* Quick Actions (deduplicated, homepage-consistent) */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <PostJobDialog onJobPosted={handleJobPosted} />
            <Button
              onClick={() => {
                setShowChat(true);
                setChatUnreadCount(0);
              }}
              className="flex items-center gap-2 h-11 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold shadow"
            >
              <MessageCircle className="w-4 h-4" /> Open Chat ({acceptedJobs.length})
            </Button>
          </div>

          {/* Fixed Quick Actions Strip */}
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-2 rounded-full bg-white/95 backdrop-blur border border-gray-200 shadow-lg px-3 py-2">
            <Button className="h-9 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold px-3"><Plus className="w-4 h-4 mr-1" /> Post Job</Button>
            <Button className="h-9 rounded-full" variant="outline" onClick={()=>{setShowChat(true); setChatUnreadCount(0);}}><MessageCircle className="w-4 h-4 mr-1" /> Open Chat</Button>
            <Button className="h-9 rounded-full" variant="outline" onClick={()=>setActiveTab('quote-requests')}>Request Quote</Button>
            <Button className="h-9 rounded-full" variant="outline" asChild><a href="/find-tradespeople">Find Tradesperson</a></Button>
          </div>

          {/* Insights grid removed to avoid multiple insight cards; Smart Insights remains in Summary Banner */}

        {/* Duplicate Quick Actions removed; primary Quick Actions kept above */}

        {/* Extra Insights card removed; Smart Insights lives in Summary Banner */}

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <div className="flex items-center justify-between gap-3">
            <TabsList className="bg-gray-100 rounded-full p-1 shadow-inner">
              <TabsTrigger value="jobs" className="rounded-full px-4 data-[state=active]:bg-white data-[state=active]:shadow text-sm">Jobs</TabsTrigger>
              <TabsTrigger value="quotations" className="rounded-full px-4 data-[state=active]:bg-white data-[state=active]:shadow text-sm">Quotations</TabsTrigger>
              <TabsTrigger value="quote-requests" className="rounded-full px-4 data-[state=active]:bg-white data-[state=active]:shadow text-sm">Quote Requests</TabsTrigger>
              <TabsTrigger value="completed" className="rounded-full px-4 data-[state=active]:bg-white data-[state=active]:shadow text-sm">Completed Jobs</TabsTrigger>
            </TabsList>
            {/* Density toggle */}
            <div className="hidden sm:flex items-center gap-1 rounded-full border border-gray-200 bg-white px-1 py-1">
              <Button
                variant={tableDensity === 'comfortable' ? 'default' : 'ghost'}
                size="sm"
                className="h-8 rounded-full"
                onClick={() => setTableDensity('comfortable')}
              >Comfortable</Button>
              <Button
                variant={tableDensity === 'compact' ? 'default' : 'ghost'}
                size="sm"
                className="h-8 rounded-full"
                onClick={() => setTableDensity('compact')}
              >Compact</Button>
            </div>
          </div>

          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <Card className="rounded-2xl border border-white/60 bg-white/95 backdrop-blur shadow-sm hover:shadow">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-lg font-bold">My Jobs</CardTitle>
                  <CardDescription className="text-gray-600">
                    Manage your posted jobs and their status
                  </CardDescription>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                    AI helps surface key details for faster actions
                  </div>
                  <div className="mt-3 flex items-center justify-end">
                    <Button onClick={refreshAllData} variant="outline" size="sm">🔄 Refresh</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Filters (visual only) */}
                  <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Select>
                      <SelectTrigger className="h-10 rounded-xl border-blue-200 bg-white">
                        <SelectValue placeholder="Status (All)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="assigned">Assigned</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="h-10 rounded-xl border-blue-200 bg-white">
                        <SelectValue placeholder="Trade (All)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="plumber">Plumber</SelectItem>
                        <SelectItem value="electrician">Electrician</SelectItem>
                        <SelectItem value="builder">Builder</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search jobs..."
                          className="w-full h-10 rounded-xl border border-blue-200 bg-white px-3 pr-10 text-sm"
                        />
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                  </div>

                  {jobs.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
                      <div className="text-2xl mb-2">🧰</div>
                      <div className="font-semibold text-gray-800 mb-1">No jobs yet</div>
                      <div className="text-sm text-gray-500 mb-4">Post your first job to get quotations from verified tradespeople.</div>
                      <PostJobDialog onJobPosted={handleJobPosted} />
                    </div>
                  ) : (
                    <div className="rounded-xl border border-gray-200 overflow-hidden">
                      <div className="overflow-x-auto">
                        <Table className="table-auto">
                          <TableHeader>
                            <TableRow className="bg-gray-50">
                              <TableHead className="uppercase tracking-wide text-xs text-gray-500">Job Details</TableHead>
                              <TableHead className="uppercase tracking-wide text-xs text-gray-500">Status</TableHead>
                              <TableHead className="uppercase tracking-wide text-xs text-gray-500">Budget</TableHead>
                              <TableHead className="uppercase tracking-wide text-xs text-gray-500">Posted</TableHead>
                              <TableHead className="uppercase tracking-wide text-xs text-gray-500">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {jobs.map((job) => (
                              <TableRow key={job.id} className={`hover:bg-gray-50/80 transition-colors ${tableDensity==='compact' ? 'text-sm' : ''}`}>
                                <TableCell>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <Wrench className="w-4 h-4 text-blue-700" />
                                      <div className="font-medium">{job.trade}</div>
                                    </div>
                                    <div
                                      className="text-sm text-gray-600 max-w-xs truncate"
                                      title={job.job_description}
                                    >
                                      {job.job_description}
                                    </div>
                                    <div className="text-sm text-gray-500">{job.postcode}</div>
                                    {/* Job Timeline */}
                                    <div className="mt-2">
                                      <div className="flex items-center gap-1 text-[10px] text-gray-600">
                                        <span className={`px-2 py-0.5 rounded-full border ${job ? 'bg-blue-50 border-blue-200 text-blue-700' : ''}`}>Posted</span>
                                        <span className={`px-2 py-0.5 rounded-full border ${job.is_approved ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-200'}`}>Approved</span>
                                        <span className={`px-2 py-0.5 rounded-full border ${job.assigned_tradesperson_id ? 'bg-amber-50 border-amber-200 text-amber-800' : 'border-gray-200'}`}>Assigned</span>
                                        <span className={`px-2 py-0.5 rounded-full border ${job.application_status==='in_progress' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 'border-gray-200'}`}>In Progress</span>
                                        <span className={`px-2 py-0.5 rounded-full border ${job.is_completed ? 'bg-green-50 border-green-200 text-green-800' : 'border-gray-200'}`}>Completed</span>
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="space-y-1">
                                    <Badge className={`${job.is_approved ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
                                      {job.is_approved ? "Approved" : "Pending"}
                                    </Badge>
                                    {job.assigned_tradesperson_id && (
                                      <Badge className="bg-amber-50 text-amber-800 border border-amber-200">Assigned</Badge>
                                    )}
                                    {job.is_completed && (
                                      <Badge className="bg-green-100 text-green-800 border border-green-200">Completed</Badge>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div>
                                    <div className="font-medium">{formatCurrency(job.budget as any)}</div>
                                    <div className="text-sm text-gray-500">{job.budget_type}</div>
                                  </div>
                                </TableCell>
                                <TableCell>{formatDate(job.created_at)}</TableCell>
                                <TableCell>
                                  <div className="space-y-1">
                                    {job.assigned_tradesperson_id && !job.is_completed && (
                                      <Button onClick={() => handleCompleteJob(job)} size="sm" className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold">
                                        <Clock className="w-4 h-4 mr-1" />
                                        Complete Job
                                      </Button>
                                    )}
                                    {!job.is_completed && (
                                      <Button onClick={() => handleFlagJob(job)} size="sm" variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
                                        <Flag className="w-4 h-4 mr-1" />
                                        Flag Issue
                                      </Button>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

          {/* Quotations Tab */}
          <TabsContent value="quotations">
            <Card className="rounded-2xl border border-white/60 bg-white/95 backdrop-blur shadow-sm hover:shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-bold">Job Quotations</CardTitle>
                    <CardDescription className="text-gray-600">Review and approve/reject tradesperson quotations</CardDescription>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                      AI highlights quotation details for faster approvals
                    </div>
                  </div>
                  <Button
                    onClick={() => user && loadAllApplications(user.id)}
                    variant="outline"
                    size="sm"
                  >
                    🔄 Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {allApplications.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">📝 No quotations yet</div>
                    <p className="text-gray-600 mb-4">
                      When tradespeople apply for your jobs, their quotations will appear here.
                    </p>
                    <Button onClick={() => user && loadAllApplications(user.id)} variant="outline">
                      🔄 Refresh Quotations
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <Table className="table-auto">
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="uppercase tracking-wide text-xs text-gray-500">Job Details</TableHead>
                            <TableHead className="uppercase tracking-wide text-xs text-gray-500">Tradesperson</TableHead>
                            <TableHead className="uppercase tracking-wide text-xs text-gray-500">Quotation</TableHead>
                            <TableHead className="uppercase tracking-wide text-xs text-gray-500">Status</TableHead>
                            <TableHead className="uppercase tracking-wide text-xs text-gray-500">Applied</TableHead>
                            <TableHead className="uppercase tracking-wide text-xs text-gray-500">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {allApplications.map((application) => (
                            <TableRow key={application.id} className={`hover:bg-gray-50/80 transition-colors ${tableDensity==='compact' ? 'text-sm' : ''}`}>
                              <TableCell>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <Wrench className="w-4 h-4 text-blue-700" />
                                    <div className="font-medium">{application?.jobs?.trade}</div>
                                  </div>
                                  <div className="text-sm text-gray-600 max-w-xs truncate" title={application?.jobs?.job_description}>
                                    {application?.jobs?.job_description}
                                  </div>
                                  <div className="text-sm text-gray-500">{application?.jobs?.postcode}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium">
                                    {application?.tradespeople?.first_name} {application?.tradespeople?.last_name}
                                  </div>
                                  <div className="text-sm text-gray-500">{application?.tradespeople?.trade}</div>
                                  <div className="text-sm text-gray-500">{application?.tradespeople?.years_experience} years exp.</div>
                                  <div className="text-xs text-gray-400">
                                    {application?.tradespeople?.hourly_rate != null && application?.tradespeople?.hourly_rate !== ''
                                      ? `${formatCurrency(application?.tradespeople?.hourly_rate as any)}/hr`
                                      : '£—/hr'}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-bold text-lg">{formatCurrency(application.quotation_amount as any)}</div>
                                  {application.quotation_notes && (
                                    <div className="text-sm text-gray-600 mt-1">"{application.quotation_notes}"</div>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold border ${
                                  application.status === 'accepted'
                                    ? 'bg-green-100 text-green-800 border-green-200'
                                    : application.status === 'pending'
                                    ? 'bg-gray-100 text-gray-800 border-gray-200'
                                    : 'bg-rose-100 text-rose-800 border-rose-200'
                                }`}>
                                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                </span>
                              </TableCell>
                              <TableCell>
                                {formatDate(application.applied_at)}
                              </TableCell>
                              <TableCell>
                                {application.status === "pending" && (
                                  <div className="space-y-1">
                                    <Button
                                      onClick={() => handleApproveQuotation(application.id, "approve")}
                                      size="sm"
                                      className="w-full"
                                    >
                                      <CheckCircle className="w-4 h-4 mr-1" /> Approve
                                    </Button>
                                    <Button
                                      onClick={() => handleApproveQuotation(application.id, "reject")}
                                      variant="destructive"
                                      size="sm"
                                      className="w-full"
                                    >
                                      <XCircle className="w-4 h-4 mr-1" /> Reject
                                    </Button>
                                  </div>
                                )}
                                {application.status === "accepted" && (
                                  <Button
                                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold"
                                    disabled
                                  >
                                    ✓ Approved
                                  </Button>
                                )}
                                {application.status === "rejected" && (
                                  <Badge variant="destructive" className="w-full justify-center">✗ Rejected</Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

            {/* Quote Requests Tab */}
          <TabsContent value="quote-requests">
            <Card className="rounded-2xl border border-white/60 bg-white/95 backdrop-blur shadow-sm hover:shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold">Quote Requests</CardTitle>
                    <CardDescription className="text-gray-600">Your submitted quote requests</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setQrRefreshKey((k)=>k+1)}>🔄 Refresh</Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* The component renders its own list and empty state internally */}
                <ClientQuoteRequests key={qrRefreshKey} clientEmail={user.email} clientId={user.id} />
              </CardContent>
            </Card>
          </TabsContent>

            {/* Completed Jobs Tab */}
          <TabsContent value="completed">
            <Card className="rounded-2xl border border-white/60 bg-white/95 backdrop-blur shadow-sm hover:shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-bold">Completed Jobs</CardTitle>
                    <CardDescription className="text-gray-600">
                      View completed jobs with ratings and reviews
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="hidden md:inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                      AI keeps your history tidy and easy to browse
                    </div>
                    <Button onClick={refreshAllData} variant="outline" size="sm">🔄 Refresh</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table className="table-auto">
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="uppercase tracking-wide text-xs text-gray-500">Job Details</TableHead>
                      <TableHead className="uppercase tracking-wide text-xs text-gray-500">Tradesperson</TableHead>
                      <TableHead className="uppercase tracking-wide text-xs text-gray-500">Completed</TableHead>
                      <TableHead className="uppercase tracking-wide text-xs text-gray-500">Rating</TableHead>
                      <TableHead className="uppercase tracking-wide text-xs text-gray-500">Review</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedJobs.map((job) => (
                      <TableRow key={job.id} className={`${tableDensity==='compact' ? 'text-sm' : ''}`}>
                          <TableCell>
                            <div>
                              <div className="font-medium flex items-center gap-2"><Wrench className="w-4 h-4 text-blue-700" /> {job.trade}</div>
                              <div
                                className="text-sm text-gray-600 max-w-xs truncate"
                                title={job.job_description}
                              >
                                {job.job_description}
                              </div>
                              <div className="text-sm text-gray-500">
                                {job.postcode}
                              </div>
                              <div className="text-xs text-gray-500">
                                Completed by: <span className="font-medium text-gray-700">{job.completed_by}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {job.tradespeople ? (
                              <div>
                                <div className="font-medium">
                                  {job.tradespeople.first_name}{" "}
                                  {job.tradespeople.last_name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {job.tradespeople.trade}
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {formatDate(job.completed_at!)}
                          </TableCell>
                          <TableCell>
                            {job.job_reviews && job.job_reviews.length > 0 ? (
                              <div className="space-y-2">
                                {job.job_reviews.map((review: any) => (
                                  <div
                                    key={review.id}
                                    className="border-l-2 border-blue-200 pl-2"
                                  >
                                    <div className="flex items-center gap-2">
                                      {renderStars(review.rating)}
                                      <span className="text-sm text-gray-600">
                                        ({review.rating}/5)
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="text-gray-400">No ratings</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {job.job_reviews && job.job_reviews.length > 0 ? (
                              <div className="space-y-1">
                                {job.job_reviews.map((review: any) => (
                                  <div
                                    key={review.id}
                                    className="text-sm text-gray-600 max-w-xs truncate"
                                    title={review.review_text}
                                  >
                                    {review.review_text || "No review text"}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="text-gray-400">No reviews</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Job Quotations Dialog */}
          <Dialog
            open={showAssignmentDialog}
            onOpenChange={setShowAssignmentDialog}
          >
            <DialogContent className="sm:max-w-6xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Job Quotations</DialogTitle>
                <DialogDescription>
                  Review and approve/reject tradesperson quotations for this job
                </DialogDescription>
              </DialogHeader>
              {selectedJobForAssignment && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <h4 className="font-semibold mb-2">Job Details:</h4>
                    <p className="text-sm text-gray-600">
                      {selectedJobForAssignment.job_description}
                    </p>
                    <p className="text-sm text-gray-600">
                      Trade: {selectedJobForAssignment.trade}
                    </p>
                    <p className="text-sm text-gray-600">
                      Location: {selectedJobForAssignment.postcode}
                    </p>
                  </div>

                  <div>
                    {jobApplications.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p>No tradespeople have applied for this job yet.</p>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Tradesperson</TableHead>
                            <TableHead>Quotation</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Applied</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {jobApplications.map((application) => (
                            <TableRow key={application.id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium">
                                    {application.tradespeople.first_name}{" "}
                                    {application.tradespeople.last_name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {application.tradespeople.trade}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {application.tradespeople.years_experience}{" "}
                                    years exp.
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    £{application.tradespeople.hourly_rate}/hr
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {application.tradespeople.phone}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-bold text-lg">
                                    £{application.quotation_amount}
                                  </div>
                                  {application.quotation_notes && (
                                    <div className="text-sm text-gray-600 mt-1">
                                      "{application.quotation_notes}"
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    application.status === "pending"
                                      ? "secondary"
                                      : application.status === "accepted"
                                      ? "default"
                                      : "destructive"
                                  }
                                >
                                  {application.status.charAt(0).toUpperCase() +
                                    application.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {new Date(
                                  application.applied_at
                                ).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                {application.status === "pending" &&
                                  !selectedJobForAssignment.assigned_tradesperson_id &&
                                  selectedJobForAssignment.application_status ===
                                    "open" && (
                                    <div className="space-y-1">
                                      <Button
                                        onClick={() =>
                                          handleApproveQuotation(
                                            application.id,
                                            "approve"
                                          )
                                        }
                                        disabled={assigning}
                                        size="sm"
                                        className="w-full"
                                      >
                                        <CheckCircle className="w-4 h-4 mr-1" />
                                        {assigning ? "Approving..." : "Approve"}
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          handleApproveQuotation(
                                            application.id,
                                            "reject"
                                          )
                                        }
                                        variant="destructive"
                                        disabled={assigning}
                                        size="sm"
                                        className="w-full"
                                      >
                                        <XCircle className="w-4 h-4 mr-1" />
                                        {assigning ? "Rejecting..." : "Reject"}
                                      </Button>
                                    </div>
                                  )}
                                {selectedJobForAssignment.assigned_tradesperson_id ===
                                  application.tradesperson_id && (
                                  <Badge
                                    variant="default"
                                    className="w-full justify-center"
                                  >
                                    ✓ Assigned
                                  </Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>

                  {/* Clear message if job is already assigned */}
                  {selectedJobForAssignment.assigned_tradesperson_id && (
                    <div className="bg-green-50 border-2 border-green-200 text-green-800 p-3 rounded-lg text-center">
                      <div className="font-bold text-lg">✓ Job Assigned!</div>
                      <div className="text-sm">
                        This job has been assigned to{" "}
                        {
                          jobApplications.find(
                            (app) =>
                              app.tradesperson_id ===
                              selectedJobForAssignment.assigned_tradesperson_id
                          )?.tradespeople.first_name
                        }{" "}
                        {
                          jobApplications.find(
                            (app) =>
                              app.tradesperson_id ===
                              selectedJobForAssignment.assigned_tradesperson_id
                          )?.tradespeople.last_name
                        }
                      </div>
                      <div className="text-xs mt-1">
                        No further assignments are allowed.
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowAssignmentDialog(false)}
                      disabled={assigning}
                      className="flex-1"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Job Completion Dialog */}
          <JobCompletionDialog
            open={showCompletionDialog}
            onOpenChange={setShowCompletionDialog}
            job={selectedJobForCompletion}
            onComplete={submitJobCompletion}
            loading={completing}
          />

          {/* Flag Job Dialog */}
          <Dialog open={showFlagDialog} onOpenChange={setShowFlagDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Flag Job Issue
                </DialogTitle>
                <DialogDescription>
                  Report an issue with this job. Our admin team will review your concern and take appropriate action.
                </DialogDescription>
              </DialogHeader>
              {selectedJobForFlag && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm">Job Details:</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Trade:</strong> {selectedJobForFlag.trade}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Description:</strong> {selectedJobForFlag.job_description}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Location:</strong> {selectedJobForFlag.postcode}
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="flagReason" className="text-sm font-medium">
                      Reason for flagging *
                    </Label>
                    <Textarea
                      id="flagReason"
                      placeholder="Please describe the issue in detail (e.g., poor communication, quality issues, pricing disputes, no-show, safety concerns, unprofessional behavior, etc.)"
                      value={flagReason}
                      onChange={(e) => setFlagReason(e.target.value)}
                      rows={4}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum 10 characters required. Be specific to help us resolve the issue.
                    </p>
                  </div>

                  <div className="flex gap-3 pt-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowFlagDialog(false);
                        setFlagReason("");
                        setSelectedJobForFlag(null);
                      }}
                      disabled={flagging}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={submitFlagJob}
                      disabled={flagging || flagReason.trim().length < 10}
                      className="flex-1 bg-red-600 hover:bg-red-700"
                    >
                      {flagging ? "Flagging..." : "Flag Job"}
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Database Chat System for Client-Tradesperson conversations */}
          {user && showChat && (
          <DatabaseChatSystem
              userId={user.id}
            userType="client"
            isOpen={showChat}
            onClose={() => setShowChat(false)}
          />
          )}

          {/* AI Support Chat */}
          {user && (
            <AISupportChat
              userId={user.id}
              userType="client"
              userName={user.email || 'Client'}
            />
          )}
        </div>
      </main>


      {/* Footer removed as requested */}
    </div>
  );
}
