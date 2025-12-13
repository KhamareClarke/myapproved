"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { LogOut, CheckCircle, XCircle, Eye, Star, Clock, Users, Briefcase, ListChecks, RefreshCw, Download } from "lucide-react";
import SimpleQuoteRequests from "@/components/SimpleQuoteRequests";

interface Tradesperson {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  postcode: string;
  city: string;
  address: string;
  trade: string;
  years_experience: number;
  hourly_rate: number;
  id_document_url: string;
  insurance_document_url: string;
  qualifications_document_url: string;
  trade_card_url: string;
  is_verified: boolean;
  is_approved: boolean;
  is_active: boolean;
  created_at: string;
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
  clients: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  assigned_tradesperson_id?: string;
  quotation_amount?: number;
  assigned_by?: "client" | "admin";
  is_completed?: boolean;
  completed_at?: string;
  completed_by?: string;
  client_rating?: number;
  client_review?: string;
  tradespeople?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    trade: string;
    years_experience: number;
    hourly_rate: number;
    phone: string;
  };
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

interface JobApplication {
  id: string;
  quotation_amount: number;
  quotation_notes: string;
  status: string;
  applied_at: string;
  jobs: {
    id: string;
    trade: string;
    job_description: string;
    postcode: string;
    budget: number;
    budget_type: string;
    clients: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
    };
  };
  tradespeople: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    trade: string;
    years_experience: number;
    hourly_rate: number;
    phone: string;
  };
}

export default function AdminDashboardPage() {
  const [tradespeople, setTradespeople] = useState<Tradesperson[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("tradespeople");
  const [searchQuery, setSearchQuery] = useState("");
  const [tpPage, setTpPage] = useState(1);
  const [jobsPage, setJobsPage] = useState(1);
  const pageSize = 10;
  const [showAssignmentDialog, setShowAssignmentDialog] = useState(false);
  const [selectedJobForAssignment, setSelectedJobForAssignment] =
    useState<any>(null);
  const [assignmentQuotation, setAssignmentQuotation] = useState("");
  const [assignmentNotes, setAssignmentNotes] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [availableTradespeople, setAvailableTradespeople] = useState<any[]>([]);
  const [jobApplications, setJobApplications] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!adminLoggedIn) {
      router.push("/admin/login");
      return;
    }

    loadData();
  }, [router]);

  // Monitor jobs state changes
  useEffect(() => {
    console.log("Admin dashboard - Jobs state changed:", {
      jobsLength: jobs.length,
      jobs: jobs,
    });
  }, [jobs]);

  const loadData = async () => {
    try {
      console.log("Admin dashboard - Loading data...");

      // Load tradespeople
      const tradespeopleResponse = await fetch(
        "/api/client/admin-secret/tradespeople"
      );
      if (tradespeopleResponse.ok) {
        const tradespeopleData = await tradespeopleResponse.json();
        console.log(
          "Admin dashboard - Tradespeople loaded:",
          tradespeopleData.tradespeople?.length || 0
        );
        setTradespeople(tradespeopleData.tradespeople);
      }

      // Load jobs
      const jobsResponse = await fetch("/api/client/jobs");
      if (jobsResponse.ok) {
        const jobsData = await jobsResponse.json();
        console.log("Admin dashboard - Full jobs response:", jobsData);
        console.log(
          "Admin dashboard - Jobs loaded:",
          jobsData.jobs?.length || 0
        );
        console.log("Admin dashboard - Jobs data:", jobsData.jobs);

        // Handle both possible response structures
        const jobsArray = jobsData.jobs || jobsData || [];
        console.log("Admin dashboard - Final jobs array:", jobsArray);
        setJobs(jobsArray);
      } else {
        console.error(
          "Admin dashboard - Failed to load jobs:",
          jobsResponse.status
        );
        const errorText = await jobsResponse.text();
        console.error("Admin dashboard - Error response:", errorText);
      }

      // Load job applications
      const applicationsResponse = await fetch(
        "/api/client/admin-secret/job-applications"
      );
      if (applicationsResponse.ok) {
        const applicationsData = await applicationsResponse.json();
        console.log(
          "Admin dashboard - Applications loaded:",
          applicationsData.applications?.length || 0
        );
        setApplications(applicationsData.applications);
      }
    } catch (err) {
      console.error("Admin dashboard - Error loading data:", err);
      setError("Error loading data");
    } finally {
      setLoading(false);
    }
  };

  // Refresh dashboard data
  const handleRefresh = () => {
    setLoading(true);
    loadData();
  };

  // Export current tradespeople list to CSV
  const exportTradespeopleCSV = () => {
    const headers = [
      "First Name",
      "Last Name",
      "Email",
      "Trade",
      "Years Exp",
      "Hourly Rate",
      "Phone",
      "City",
      "Postcode",
      "Verified",
      "Approved",
    ];
    const rows = tradespeople.map((t) => [
      t.first_name,
      t.last_name,
      t.email,
      t.trade,
      String(t.years_experience ?? ""),
      String(t.hourly_rate ?? ""),
      t.phone,
      t.city,
      t.postcode,
      t.is_verified ? "Yes" : "No",
      t.is_approved ? "Yes" : "No",
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${(c ?? "").toString().replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tradespeople-export-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleVerifyTradesperson = async (tradespersonId: string) => {
    try {
      const response = await fetch(
        "/api/client/admin-secret/verify-tradesperson",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tradespersonId }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Tradesperson verified successfully!");
        loadData(); // Reload data
      } else {
        setError(data.error || "Failed to verify tradesperson");
      }
    } catch (err) {
      setError("Error verifying tradesperson");
    }
  };

  const handleApproveJob = async (jobId: string) => {
    try {
      const response = await fetch("/api/client/admin-secret/approve-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobId }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Job approved successfully!");
        loadData(); // Reload data
      } else {
        setError(data.error || "Failed to approve job");
      }
    } catch (err) {
      setError("Error approving job");
    }
  };

  const handleApproveQuotation = async (
    applicationId: string,
    action: "approve" | "reject"
  ) => {
    try {
      const response = await fetch(
        "/api/client/admin-secret/approve-quotation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ applicationId, action }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(`Quotation ${action}d successfully!`);
        loadData(); // Reload data
      } else {
        setError(data.error || `Failed to ${action} quotation`);
      }
    } catch (err) {
      setError(`Error ${action}ing quotation`);
    }
  };

  const loadAvailableTradespeople = async (
    jobTrade: string,
    jobPostcode: string
  ) => {
    try {
      const { data: tradespeople, error } = await fetch(
        "/api/client/admin-secret/tradespeople"
      ).then((res) => res.json());

      if (error) {
        console.error("Error loading tradespeople:", error);
        return;
      }

      // Filter by trade and location
      const filteredTradespeople =
        tradespeople?.filter((tp: any) => {
          return tp.trade === jobTrade && tp.is_approved && tp.is_verified;
        }) || [];

      setAvailableTradespeople(filteredTradespeople);
    } catch (err) {
      console.error("Error in loadAvailableTradespeople:", err);
    }
  };

  const loadJobApplications = async (jobId: string) => {
    try {
      const { data, error } = await fetch(
        "/api/client/admin-secret/job-applications"
      ).then((res) => res.json());
      if (!error) setJobApplications(data || []);
      else setJobApplications([]);
    } catch (err) {
      setJobApplications([]);
    }
  };

  const handleAssignJob = (job: any) => {
    if (job.assigned_by === "client") {
      setError(
        "This job is already assigned by client. Admin cannot reassign."
      );
      return;
    }
    setSelectedJobForAssignment(job);
    setJobApplications([]);
    loadJobApplications(job.id);
    setShowAssignmentDialog(true);
  };

  const submitAssignment = async (application: any) => {
    if (!selectedJobForAssignment) {
      setError("Please select an application");
      return;
    }
    setAssigning(true);
    setError("");
    try {
      const response = await fetch("/api/client/admin-secret/assign-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: selectedJobForAssignment.id,
          tradespersonId: application.tradespeople.id,
          quotationAmount: application.quotation_amount,
          quotationNotes: application.quotation_notes,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Job assigned successfully!");
        setShowAssignmentDialog(false);
        loadData();
      } else {
        setError(data.error || "Failed to assign job");
      }
    } catch (err) {
      setError("Error assigning job");
    } finally {
      setAssigning(false);
    }
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

  const handleViewApplication = (application: JobApplication) => {
    // TODO: Implement view application details
    console.log("View application:", application);
  };

  const handleApproveApplication = async (applicationId: string) => {
    try {
      const response = await fetch("/api/client/admin-secret/approve-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ applicationId }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Application approved successfully!");
        loadData();
      } else {
        setError(data.error || "Failed to approve application");
      }
    } catch (err) {
      setError("Error approving application");
    }
  };

  const handleRejectApplication = async (applicationId: string) => {
    try {
      const response = await fetch("/api/client/admin-secret/reject-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ applicationId }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Application rejected successfully!");
        loadData();
      } else {
        setError(data.error || "Failed to reject application");
      }
    } catch (err) {
      setError("Error rejecting application");
    }
  };

  const handleViewCompletedJob = (job: Job) => {
    // TODO: Implement view completed job details
    console.log("View completed job:", job);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div>Loading admin dashboard...</div>
        </div>
      </div>
    );
  }

  // Filter jobs by status
  const pendingJobs = jobs.filter((job) => !job.is_approved);
  const availableJobs = jobs.filter(
    (job) =>
      job.is_approved && !job.assigned_tradesperson_id && !job.is_completed
  );
  const inProgressJobs = jobs.filter(
    (job) => job.assigned_tradesperson_id && !job.is_completed
  );
  const completedJobs = jobs.filter((job) => job.is_completed);

  // Filters
  const sq = searchQuery.trim().toLowerCase();
  const filteredTradespeople = tradespeople.filter((t) =>
    [t.first_name, t.last_name, t.email, t.trade, t.city, t.postcode].some((v) => (v || "").toString().toLowerCase().includes(sq))
  );
  const filteredJobs = jobs.filter((j) =>
    [j.trade, j.postcode, j.clients?.first_name, j.clients?.last_name, j.job_description].some((v:any) => (v || "").toString().toLowerCase().includes(sq))
  );
  const totalTpPages = Math.max(1, Math.ceil(filteredTradespeople.length / pageSize));
  const totalJobsPages = Math.max(1, Math.ceil(filteredJobs.length / pageSize));
  const pagedTradespeople = filteredTradespeople.slice((tpPage-1)*pageSize, tpPage*pageSize);
  const pagedJobs = filteredJobs.slice((jobsPage-1)*pageSize, jobsPage*pageSize);

  // Debug logging
  console.log("Admin dashboard - Jobs state:", {
    totalJobs: jobs.length,
    pendingJobs: pendingJobs.length,
    availableJobs: availableJobs.length,
    inProgressJobs: inProgressJobs.length,
    completedJobs: completedJobs.length,
    jobsData: jobs,
  });
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage tradespeople, jobs, and applications</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative hidden sm:block">
                <Input
                  placeholder="Search tradespeople or jobs..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setTpPage(1);
                    setJobsPage(1);
                  }}
                  className="w-64 pr-10"
                />
                <span className="absolute right-3 top-2.5 text-gray-400 text-xs">Search</span>
              </div>
              <Button onClick={handleRefresh} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={exportTradespeopleCSV} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="hover:shadow-md transition">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center"><Users className="w-5 h-5"/></div>
          <div>
            <div className="text-2xl font-bold">{tradespeople.length}</div>
            <div className="text-sm text-gray-600">Total Tradespeople</div>
          </div>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center"><ListChecks className="w-5 h-5"/></div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">{pendingJobs.length}</div>
            <div className="text-sm text-gray-600">Pending Jobs</div>
          </div>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center"><Clock className="w-5 h-5"/></div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{inProgressJobs.length}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center"><CheckCircle className="w-5 h-5"/></div>
          <div>
            <div className="text-2xl font-bold text-green-600">{completedJobs.length}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </CardContent>
      </Card>
    </div>

    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="space-y-6"
    >
      <div className="sticky top-16 z-30">
        <TabsList className="bg-white/90 backdrop-blur p-1 rounded-xl shadow border">
          <TabsTrigger value="tradespeople">Tradespeople</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="quotations">Quotations</TabsTrigger>
          <TabsTrigger value="quote-requests">Quote Requests</TabsTrigger>
          <TabsTrigger value="completed">Completed Jobs</TabsTrigger>
        </TabsList>
      </div>

      {/* Tradespeople Tab */}
      <TabsContent value="tradespeople">
        <Card className="shadow-lg rounded-xl border">
          <CardHeader>
            <CardTitle>Registered Tradespeople</CardTitle>
            <CardDescription>
              Review and verify tradesperson registrations
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[26%]">Name</TableHead>
                  <TableHead className="w-[14%]">Trade</TableHead>
                  <TableHead className="w-[22%]">Contact</TableHead>
                  <TableHead className="w-[16%]">Location</TableHead>
                  <TableHead className="w-[14%]">Status</TableHead>
                  <TableHead className="w-[8%] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagedTradespeople.map((tradesperson) => (
                  <TableRow key={tradesperson.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{tradesperson?.first_name} {tradesperson?.last_name}</div>
                          <div className="text-xs text-gray-500">{tradesperson?.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded-full px-3 py-1 text-sm">{tradesperson?.trade}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{tradesperson?.phone}</div>
                        <div className="text-xs text-gray-500">{tradesperson?.years_experience} yrs â€¢ Â£{tradesperson?.hourly_rate}/hr</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{tradesperson?.postcode}</div>
                        <div className="text-xs text-gray-500">{tradesperson?.city}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge className="rounded-full px-3 py-1" variant={tradesperson?.is_verified ? "default" : "secondary"}>
                          {tradesperson?.is_verified ? "Verified" : "Unverified"}
                        </Badge>
                        <Badge className="rounded-full px-3 py-1" variant={tradesperson?.is_approved ? "default" : "secondary"}>
                          {tradesperson?.is_approved ? "Approved" : "Pending"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      {!tradesperson?.is_verified && (
                        <Button
                          onClick={() =>
                            handleVerifyTradesperson(tradesperson.id)
                          }
                          size="sm"
                          className="mr-2 rounded-full"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Verify
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="rounded-full">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">{filteredTradespeople.length} total â€¢ Page {tpPage} of {totalTpPages}</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={tpPage<=1} onClick={() => setTpPage((p)=>Math.max(1,p-1))}>Prev</Button>
                <Button variant="outline" size="sm" disabled={tpPage>=totalTpPages} onClick={() => setTpPage((p)=>Math.min(totalTpPages,p+1))}>Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Jobs Tab */}
      <TabsContent value="jobs">
        <Card>
          <CardHeader>
            <CardTitle>Posted Jobs</CardTitle>
            <CardDescription>
              Review and approve job postings from clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pagedJobs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No jobs found</p>
                <p className="text-sm text-gray-400">Jobs loaded: {filteredJobs.length}</p>
                <p className="text-sm text-gray-400">Loading: {loading ? "Yes" : "No"}</p>
                <Button onClick={handleRefresh} variant="outline" className="mt-2">Refresh Data</Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Trade</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagedJobs.map((job) => job && (
                    <TableRow key={job.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{job?.clients?.first_name} {job?.clients?.last_name}</div>
                          <div className="text-sm text-gray-500">{job?.clients?.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{job?.trade}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate" title={job?.job_description}>{job?.job_description}</div>
                      </TableCell>
                      <TableCell>{job?.postcode}</TableCell>
                      <TableCell>Â£{job?.budget || "Not specified"} ({job?.budget_type})</TableCell>
                      <TableCell>
                        {job?.assigned_tradesperson_id ? (
                          <div className="text-sm">
                            <div className="font-medium">Assigned</div>
                            <div className="text-gray-500">ID: {job?.assigned_tradesperson_id}</div>
                            {job?.quotation_amount && (
                              <div className="text-green-600">Â£{job?.quotation_amount}</div>
                            )}
                            {job?.assigned_by && (
                              <div className="text-xs text-gray-400">By: {job?.assigned_by === "client" ? "Client" : "Admin"}</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">None</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {!job.is_approved && (
                          <Button onClick={() => handleApproveJob(job.id)} size="sm" className="mr-2">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            {/* Pagination */}
            {filteredJobs.length > 0 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600">{filteredJobs.length} total â€¢ Page {jobsPage} of {totalJobsPages}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" disabled={jobsPage<=1} onClick={() => setJobsPage((p)=>Math.max(1,p-1))}>Prev</Button>
                      <Button variant="outline" size="sm" disabled={jobsPage>=totalJobsPages} onClick={() => setJobsPage((p)=>Math.min(totalJobsPages,p+1))}>Next</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quotations Tab */}
          <TabsContent value="quotations">
            <Card>
              <CardHeader>
                <CardTitle>Job Quotations</CardTitle>
                <CardDescription>
                  Review and approve/reject tradesperson quotations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Details</TableHead>
                      <TableHead>Tradesperson</TableHead>
                      <TableHead>Quotation</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {application.jobs.trade}
                            </div>
                            <div
                              className="text-sm text-gray-600 max-w-xs truncate"
                              title={application.jobs.job_description}
                            >
                              {application.jobs.job_description}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.jobs.postcode}
                            </div>
                            <div className="text-xs text-gray-400">
                              Client: {application.jobs.clients.first_name}{" "}
                              {application.jobs.clients.last_name}
                            </div>
                          </div>
                        </TableCell>
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
                              {application.tradespeople.years_experience} years
                              exp.
                            </div>
                            <div className="text-xs text-gray-400">
                              Â£{application.tradespeople.hourly_rate}/hr
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-bold text-lg">
                              Â£{application.quotation_amount}
                            </div>
                            {application.quotation_notes && (
                              <div className="text-sm text-gray-600 mt-1">
                                {application.quotation_notes}
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
                            {application.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-500">
                            {new Date(application.applied_at).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                    <Button
                              size="sm"
                      variant="outline"
                              onClick={() => handleViewApplication(application)}
                    >
                              <Eye className="w-4 h-4" />
                    </Button>
                          {application.status === "pending" && (
                              <>
                              <Button
                                size="sm"
                                  onClick={() => handleApproveApplication(application.id)}
                                  className="bg-green-600 hover:bg-green-700"
                              >
                                  <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                  onClick={() => handleRejectApplication(application.id)}
                                  className="bg-red-600 hover:bg-red-700"
                              >
                                  <XCircle className="w-4 h-4" />
                              </Button>
                              </>
                          )}
                  </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quote Requests Tab */}
          <TabsContent value="quote-requests">
            <SimpleQuoteRequests />
          </TabsContent>

          {/* Completed Jobs Tab */}
          <TabsContent value="completed-jobs">
            <Card>
              <CardHeader>
                <CardTitle>Completed Jobs</CardTitle>
                <CardDescription>
                  Review completed jobs and ratings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Details</TableHead>
                      <TableHead>Tradesperson</TableHead>
                      <TableHead>Client Rating</TableHead>
                      <TableHead>Review</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{job.trade}</div>
                            <div className="text-sm text-gray-600 max-w-xs truncate">
                              {job.job_description}
                            </div>
                            <div className="text-sm text-gray-500">
                              {job.postcode}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                            <div>
                              <div className="font-medium">
                              {job.tradespeople?.first_name}{" "}
                              {job.tradespeople?.last_name}
                              </div>
                              <div className="text-sm text-gray-500">
                              {job.tradespeople?.trade}
                              </div>
                            </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-medium">
                              {job.job_reviews?.[0]?.rating || "N/A"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-600 max-w-xs truncate">
                            {job.job_reviews?.[0]?.review_text || "No review"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-500">
                            {job.completed_at
                              ? new Date(job.completed_at).toLocaleDateString()
                              : "N/A"}
                                  </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewCompletedJob(job)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
         </Tabs>


         {/* Assignment Dialog */}
         <Dialog
           open={showAssignmentDialog}
           onOpenChange={setShowAssignmentDialog}
         >
           <DialogContent className="sm:max-w-md">
             <DialogHeader>
               <DialogTitle>Assign Job to Tradesperson</DialogTitle>
               <DialogDescription>
                 Select a tradesperson who has applied to this job. Their
                 quotation and notes are shown below.
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
                   <p className="text-sm text-gray-600">
                     Client: {selectedJobForAssignment.clients.first_name}{" "}
                     {selectedJobForAssignment.clients.last_name}
                   </p>
                 </div>
                 <div>
                   <Label>Applicants:</Label>
                   <div className="space-y-2 max-h-60 overflow-y-auto">
                     {jobApplications.length === 0 ? (
                       <p className="text-sm text-gray-500">
                         No tradespeople have applied for this job yet.
                       </p>
                     ) : (
                       jobApplications.map((app) => (
                         <div key={app.id} className="border p-2 rounded">
                           <div className="font-medium">
                             {app.tradespeople.first_name}{" "}
                             {app.tradespeople.last_name}
                           </div>
                           <div className="text-sm text-gray-600">
                             Experience: {app.tradespeople.years_experience}{" "}
                             years | Rate: £{app.tradespeople.hourly_rate}/hr
                           </div>
                           <div className="text-sm text-gray-600 mt-1">
                             <strong>Quotation:</strong> £{app.quotation_amount}
                           </div>
                           {app.quotation_notes && (
                             <div className="text-sm text-gray-600 mt-1">
                               <strong>Notes:</strong> {app.quotation_notes}
                             </div>
                           )}
                           <Button
                             onClick={() => submitAssignment(app)}
                             disabled={assigning}
                             size="sm"
                             className="mt-2"
                           >
                             {assigning
                               ? "Assigning..."
                               : "Assign to This Tradesperson"}
                           </Button>
                         </div>
                       ))
                     )}
                   </div>
                 </div>
                 <div className="flex gap-2">
                   <Button
                     variant="outline"
                     onClick={() => setShowAssignmentDialog(false)}
                     disabled={assigning}
                     className="flex-1"
                   >
                     Cancel
                   </Button>
                 </div>
               </div>
             )}
           </DialogContent>
         </Dialog>
       </div>
     </div>
   );
 }
