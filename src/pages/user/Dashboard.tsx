import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { getMyRequests, getCurrentUser } from "../../services/queries";
import { updateKYC } from "../../services/mutations";
import { BookingRequest } from "../../lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import useUserStore from "../../hooks/store/userStore";
import { useNavigate } from "react-router-dom";
import { LogOut, User as UserIcon, Clock, Mail, Shield, AlertCircle, Upload } from "lucide-react";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [supportMessage, setSupportMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: userResponse, isLoading: loadingUser, refetch: refetchUser } = useQuery("currentUser", getCurrentUser);
  const { data: requestsResponse, isLoading: loadingRequests } = useQuery("myRequests", getMyRequests);

  const { isAuthenticated, logout } = useUserStore();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const { mutate: handleKycUpload, isLoading: isUploadingKyc } = useMutation({
    mutationFn: updateKYC,
    onSuccess: () => {
      toast.success("Driver's license uploaded successfully!");
      setSelectedFile(null);
      refetchUser();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to upload document");
    },
  });

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const submitKyc = () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("kycDocument", selectedFile);
    handleKycUpload(formData);
  };

  const user = userResponse?.user;
  const requests = requestsResponse?.requests || [];

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    
    // Simulate sending email to admin
    toast.success("Your message has been sent to our support team. We will email you back shortly!");
    setSupportMessage("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "completed": return "bg-gray-100 text-gray-800 border-gray-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      case "pending": default: return "bg-amber-100 text-amber-800 border-amber-200";
    }
  };

  if (loadingUser || loadingRequests) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-gray-50/50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 bg-white/70 p-6 md:p-8 rounded-2xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-white backdrop-blur-xl">
          <div>
            <h1 className="text-4xl font-serif font-bold text-primary tracking-tight">Welcome, {user?.firstName || "Customer"}</h1>
            <p className="text-gray-500 font-sans mt-2 text-lg">Manage your rentals, profile, and support requests.</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 w-full md:w-auto hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-300 rounded-xl px-6 h-12 shadow-sm">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="rentals" className="space-y-8">
          <div className="flex justify-center md:justify-start">
            <TabsList className="grid grid-cols-3 w-full md:w-[480px] rounded-full bg-gray-200/50 p-1.5 shadow-inner backdrop-blur-md">
              <TabsTrigger 
                value="rentals" 
                className="rounded-full text-gray-600 transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg hover:text-primary data-[state=active]:hover:text-white py-2.5 font-medium"
              >
                My Rentals
              </TabsTrigger>
              <TabsTrigger 
                value="profile"
                className="rounded-full text-gray-600 transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg hover:text-primary data-[state=active]:hover:text-white py-2.5 font-medium"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger 
                value="support"
                className="rounded-full text-gray-600 transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg hover:text-primary data-[state=active]:hover:text-white py-2.5 font-medium"
              >
                Support
              </TabsTrigger>
            </TabsList>
          </div>

          {/* RENTALS TAB */}
          <TabsContent value="rentals" className="space-y-6 fade-in-up">
            {requests.length === 0 ? (
              <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden">
                <CardContent className="flex flex-col items-center justify-center h-72 text-center p-8">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <Clock className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-serif text-gray-900 mb-2">No rentals yet</h3>
                  <p className="text-gray-500 mb-8 max-w-sm text-lg">You haven't made any booking requests. Start your journey with us today.</p>
                  <Button onClick={() => navigate('/fleet')} variant="premium" className="rounded-full px-8 py-6 text-md shadow-lg shadow-primary/25">Browse Fleet</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {requests.map((req: BookingRequest) => (
                  <Card key={req._id} className="hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-400 bg-white/80 backdrop-blur-md border border-white/50 hover:-translate-y-1.5 rounded-2xl overflow-hidden group">
                    <CardHeader className="pb-3 bg-gray-50/50 border-b border-gray-100 group-hover:bg-primary/5 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <Badge variant="outline" className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(req.status)}`}>
                          {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                        </Badge>
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                          {new Date(req.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <CardTitle className="text-xl font-serif mt-3 truncate text-gray-900">
                        {req.serviceType}
                      </CardTitle>
                      <CardDescription className="text-sm font-medium text-primary/70 mt-1">
                        {new Date(req.startDate).toLocaleDateString()} &mdash; {new Date(req.endDate).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-5">
                      <div className="text-sm space-y-3">
                        <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50/50">
                          <span className="text-gray-500 font-medium">Vehicle</span>
                          <span className="font-semibold text-gray-900 truncate ml-2">
                            {req.desiredVehicleId === "any" ? "Not Specified" : req.desiredVehicleId}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50/50">
                          <span className="text-gray-500 font-medium">Pickup Time</span>
                          <span className="font-semibold text-gray-900 truncate ml-2">{req.time || "N/A"}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* PROFILE TAB */}
          <TabsContent value="profile" className="fade-in-up">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden">
                <CardHeader className="border-b border-gray-100 bg-gray-50/30 pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl font-serif text-gray-900">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <UserIcon className="h-5 w-5 text-primary" />
                    </div>
                    Personal Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    <div className="space-y-1.5 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <Label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">First Name</Label>
                      <p className="font-medium text-gray-900 text-lg">{user?.firstName}</p>
                    </div>
                    <div className="space-y-1.5 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <Label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Last Name</Label>
                      <p className="font-medium text-gray-900 text-lg">{user?.lastName}</p>
                    </div>
                    <div className="space-y-1.5 p-3 rounded-xl hover:bg-gray-50 transition-colors col-span-2 sm:col-span-1">
                      <Label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Email Address</Label>
                      <p className="font-medium text-gray-900 truncate">{user?.email}</p>
                    </div>
                    <div className="space-y-1.5 p-3 rounded-xl hover:bg-gray-50 transition-colors col-span-2 sm:col-span-1">
                      <Label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Phone Number</Label>
                      <p className="font-medium text-gray-900">{user?.phone || "Not provided"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden">
                <CardHeader className="border-b border-gray-100 bg-gray-50/30 pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl font-serif text-gray-900">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    Verification Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {!user?.kycDocument?.url ? (
                    <div className="flex flex-col gap-5 p-6 bg-amber-50/80 rounded-2xl border border-amber-200/60 shadow-sm transition-all">
                      <div className="flex items-start gap-4">
                        <div className="mt-0.5 p-1.5 bg-amber-100 rounded-full shrink-0">
                          <AlertCircle className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-amber-900 text-lg">Driver's License Needed</p>
                          <p className="text-sm text-amber-700 mt-1 leading-relaxed">Your driver's license has not been uploaded. Upload it now to speed up your booking process.</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <div className="relative flex-1">
                          <Input 
                            type="file" 
                            accept="image/*,.pdf" 
                            onChange={onFileChange}
                            className="bg-white border-amber-300/50 focus-visible:ring-amber-500 h-11 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer text-sm transition-colors"
                          />
                        </div>
                        <Button 
                          onClick={submitKyc} 
                          disabled={!selectedFile || isUploadingKyc}
                          className="bg-amber-600 hover:bg-amber-700 text-white shrink-0 h-11 rounded-xl shadow-md shadow-amber-600/20 px-6 font-medium transition-all"
                        >
                          {isUploadingKyc ? (
                            <span className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                              Uploading...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Upload className="h-4 w-4" />
                              Upload
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6 p-2">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <Label className="text-gray-600 font-medium text-sm">Document Status</Label>
                        <Badge variant="outline" className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                          user.kycDocument.status === "Verified" ? "bg-emerald-100 text-emerald-800 border-emerald-200" :
                          user.kycDocument.status === "Rejected" ? "bg-red-100 text-red-800 border-red-200" :
                          "bg-amber-100 text-amber-800 border-amber-200"
                        }`}>
                          {user.kycDocument.status?.replace("_", " ")}
                        </Badge>
                      </div>
                      
                      {user.kycDocument.status === "Rejected" && user.kycDocument.rejectedReason && (
                        <div className="p-4 bg-red-50 rounded-xl border border-red-100 text-sm text-red-800">
                          <p className="font-semibold mb-1">Reason for Rejection:</p>
                          <p>{user.kycDocument.rejectedReason}</p>
                          <div className="mt-4 flex flex-col sm:flex-row gap-3">
                            <Input 
                              type="file" 
                              accept="image/*,.pdf" 
                              onChange={onFileChange}
                              className="bg-white border-red-200 h-10 text-sm"
                            />
                            <Button 
                              onClick={submitKyc} 
                              disabled={!selectedFile || isUploadingKyc}
                              size="sm"
                              className="shrink-0"
                            >
                              {isUploadingKyc ? "Uploading..." : "Re-upload"}
                            </Button>
                          </div>
                        </div>
                      )}

                      <a href={user.kycDocument.url} target="_blank" rel="noreferrer" className="group flex items-center justify-center gap-2 w-full py-4 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-xl text-primary font-medium transition-all duration-300">
                        <Shield className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        View Uploaded Document
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* SUPPORT TAB */}
          <TabsContent value="support" className="fade-in-up">
            <Card className="max-w-2xl border-0 shadow-sm bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-gray-100 bg-gray-50/30 pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl font-serif text-gray-900">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  Contact Support
                </CardTitle>
                <CardDescription className="text-gray-500 text-base mt-2">
                  Have a question about your rental or need to make changes? Send us a message and we'll reply to your email.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSupportSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-gray-700 font-medium">How can we help you?</Label>
                    <Textarea 
                      id="message" 
                      rows={6} 
                      className="resize-none rounded-xl bg-gray-50/50 border-gray-200 focus-visible:ring-primary/50 text-base p-4"
                      placeholder="Please include your request details, preferred vehicle, or dates..."
                      value={supportMessage}
                      onChange={(e) => setSupportMessage(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" variant="premium" className="rounded-full px-8 py-6 text-md w-full sm:w-auto shadow-lg shadow-primary/20">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
