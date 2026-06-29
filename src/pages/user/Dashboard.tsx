import React, { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getMyRequests, getCurrentUser } from "../../services/queries";
import { updateKYC, submitRequest, updateUser, requestDeletionOtp, deleteAccount, userReplyRequest, userModifyRequest } from "../../services/mutations";
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
import {
  LogOut, User as UserIcon, Clock, Mail, Shield, AlertCircle,
  Pencil, X, Check, FileImage, RefreshCw, Video
} from "lucide-react";
import VideoKYCModal from "./VideoKYCModal";

/* ─── small helper ─── */
const isPdf = (url?: string) => url?.toLowerCase().includes(".pdf") || url?.toLowerCase().includes("application/pdf");

/* ─────────────────────────────────────────────────────── */
/*  Document upload card (license or insurance)            */
/* ─────────────────────────────────────────────────────── */
interface DocCardProps {
  label: string;
  doc: { url?: string; status?: string; rejectedReason?: string } | undefined;
  pendingDoc?: { url?: string; status?: string; rejectedReason?: string } | undefined;
  isUploading: boolean;
  onUpload: (file: File) => void;
  /** true when this doc already existed before and is being replaced */
  isReplace?: boolean;
}

const DocCard: React.FC<DocCardProps> = ({ label, doc, pendingDoc, isUploading, onUpload, isReplace }) => {
  const [editMode, setEditMode] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingFile(file);
    if (file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null); // PDF – no inline preview
    }
  };

  const handleConfirm = () => {
    if (!pendingFile) return;
    onUpload(pendingFile);
    setEditMode(false);
    setPendingFile(null);
  };

  const handleCancel = () => {
    setEditMode(false);
    setPendingFile(null);
    setPreview(null);
  };

  const statusBadge = (status?: string) => {
    if (!status) return null;
    const cls =
      status === "Verified" ? "bg-emerald-100 text-emerald-800" :
      status === "Rejected" ? "bg-red-100 text-red-800" :
      "bg-amber-100 text-amber-800";
    return (
      <Badge variant="outline" className={`px-3 py-1 rounded-full text-xs font-semibold border-0 ${cls}`}>
        {status.replace("_", " ")}
      </Badge>
    );
  };

  /* ── No document uploaded yet ── */
  if (!doc?.url && !editMode) {
    return (
      <div className="flex flex-col gap-4 p-5 bg-amber-50 rounded-2xl border border-amber-200 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 p-1.5 bg-amber-100 rounded-full shrink-0">
            <AlertCircle className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <p className="font-semibold text-amber-900">{label} Needed</p>
            <p className="text-sm text-amber-800/80 mt-0.5">Upload now to speed up your booking process.</p>
          </div>
        </div>
        <Button
          size="sm"
          className="bg-[#C69C45] hover:bg-[#C69C45]/90 text-white self-start rounded-xl px-5"
          onClick={() => { setEditMode(true); setTimeout(() => inputRef.current?.click(), 50); }}
        >
          Choose & Upload
        </Button>
      </div>
    );
  }

  /* ── Edit / upload mode ── */
  if (editMode || (!doc?.url && editMode)) {
    return (
      <div className="p-5 border border-[#C69C45]/40 rounded-2xl bg-[#C69C45]/5 space-y-4">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-[#143D2A]">{isReplace ? `Replace ${label}` : `Upload ${label}`}</p>
          <button onClick={handleCancel} className="text-gray-400 hover:text-gray-700 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        {isReplace && (
          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            ⚠️ Replacing an existing license will require admin re-verification and may temporarily lock name edits.
          </p>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/heic,image/heif,application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />
        {preview && (
          <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-xl border border-gray-200" />
        )}
        {pendingFile && !preview && (
          <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-200 text-sm text-gray-700">
            <FileImage className="h-4 w-4 text-[#C69C45]" />
            {pendingFile.name}
          </div>
        )}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => inputRef.current?.click()}
            className="flex-1 bg-white border-[#C69C45] text-[#C69C45] hover:bg-[#C69C45] hover:text-white transition-colors"
          >
            {pendingFile ? "Change File" : "Choose File"}
          </Button>
          <Button
            size="sm"
            disabled={!pendingFile || isUploading}
            className="flex-1 bg-[#143D2A] hover:bg-[#143D2A]/90 text-white"
            onClick={handleConfirm}
          >
            {isUploading ? (
              <span className="flex items-center gap-1.5">
                <div className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Uploading…
              </span>
            ) : (
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> Confirm Upload</span>
            )}
          </Button>
        </div>
      </div>
    );
  }

  /* ── Document exists — show preview + status ── */
  return (
    <div className="p-4 border border-gray-100 rounded-2xl bg-gray-50 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-[#C69C45]" />
          <h3 className="font-semibold text-gray-900">{label}</h3>
        </div>
        <div className="flex items-center gap-2">
          {statusBadge(doc?.status)}
          <button
            onClick={() => setEditMode(true)}
            title={`Replace ${label}`}
            className="p-1.5 rounded-lg text-gray-400 hover:text-[#143D2A] hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className={`grid gap-4 ${pendingDoc?.url ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {/* Main Document */}
        <div className="relative">
          {doc?.url && !isPdf(doc.url) ? (
            <a href={doc.url} target="_blank" rel="noreferrer">
              <img
                src={doc.url}
                alt={label}
                className="w-full h-36 object-cover rounded-xl border border-gray-200 hover:opacity-90 transition-opacity cursor-pointer"
              />
            </a>
          ) : doc?.url ? (
            <a
              href={doc.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-200 text-sm text-[#143D2A] font-medium hover:bg-gray-50 transition-colors h-36"
            >
              <FileImage className="h-4 w-4 text-[#C69C45]" /> View {label} (PDF)
            </a>
          ) : null}
        </div>

        {/* Pending Document (if exists) */}
        {pendingDoc?.url && (
          <div className="relative opacity-60 hover:opacity-90 transition-opacity">
            <div className="absolute top-2 right-2 z-10">
               {statusBadge(pendingDoc.status)}
            </div>
            {!isPdf(pendingDoc.url) ? (
              <a href={pendingDoc.url} target="_blank" rel="noreferrer">
                <img
                  src={pendingDoc.url}
                  alt={`Pending ${label}`}
                  className="w-full h-36 object-cover rounded-xl border-2 border-dashed border-amber-300 cursor-pointer"
                />
              </a>
            ) : (
              <a
                href={pendingDoc.url}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col justify-center items-center gap-2 p-3 bg-white rounded-xl border-2 border-dashed border-amber-300 text-sm text-[#143D2A] font-medium h-36"
              >
                <FileImage className="h-6 w-6 text-amber-500" /> Pending (PDF)
              </a>
            )}
            <div className="text-xs text-center mt-1 text-gray-500 font-medium">Pending Update</div>
          </div>
        )}
      </div>

      {/* Rejection reason */}
      {doc?.status === "Rejected" && doc?.rejectedReason && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-800">
          <p className="font-semibold mb-0.5">Reason for Rejection:</p>
          <p>{doc.rejectedReason}</p>
          <Button
            size="sm"
            className="mt-3 bg-[#C69C45] hover:bg-[#C69C45]/90 text-white"
            onClick={() => setEditMode(true)}
          >
            Re-upload
          </Button>
        </div>
      )}
      {pendingDoc?.status === "Rejected" && pendingDoc?.rejectedReason && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-800">
          <p className="font-semibold mb-0.5">Pending Upload Rejected:</p>
          <p>{pendingDoc.rejectedReason}</p>
          <Button
            size="sm"
            className="mt-3 bg-[#C69C45] hover:bg-[#C69C45]/90 text-white"
            onClick={() => setEditMode(true)}
          >
            Re-upload
          </Button>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────── */
/*  Main Dashboard                                         */
/* ─────────────────────────────────────────────────────── */
const UserDashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [supportMessage, setSupportMessage] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ firstName: "", lastName: "", phone: "" });

  // Account Deletion State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteStep, setDeleteStep] = useState<1 | 2>(1);
  const [deletionReason, setDeletionReason] = useState("");
  const [deletionOtp, setDeletionOtp] = useState("");
  const [isVideoKycModalOpen, setIsVideoKycModalOpen] = useState(false);

  const { data: userResponse, isLoading: loadingUser, refetch: refetchUser } = useQuery("currentUser", getCurrentUser);
  const { data: requestsResponse, isLoading: loadingRequests, refetch: refetchRequests, isFetching: isFetchingRequests } = useQuery("myRequests", getMyRequests, {
    refetchInterval: 10000 // Poll every 10 seconds
  });

  const requests = requestsResponse?.requests || [];
  const rentalRequests = requests.filter((r: BookingRequest) => r.serviceType !== "support");
  const supportRequests = requests.filter((r: BookingRequest) => r.serviceType === "support");

  // Support Timeline State
  const [selectedSupportTicket, setSelectedSupportTicket] = useState<BookingRequest | null>(null);

  // Sync selected ticket when requests update in the background
  React.useEffect(() => {
    if (selectedSupportTicket && requests.length > 0) {
      const updatedTicket = requests.find((r: BookingRequest) => r._id === selectedSupportTicket._id);
      if (updatedTicket) {
        setSelectedSupportTicket(updatedTicket);
      }
    }
  }, [requests]);
  const [replyMessage, setReplyMessage] = useState("");

  // Modification State
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [modifyingRequest, setModifyingRequest] = useState<BookingRequest | null>(null);
  const [modEndDate, setModEndDate] = useState("");
  const [modNotes, setModNotes] = useState("");

  const { mutate: reqDeleteOtp, isLoading: isRequestingDeleteOtp } = useMutation(requestDeletionOtp, {
    onSuccess: () => {
      toast.success("OTP sent to your email!");
      setDeleteStep(2);
    },
    onError: (error: any) => toast.error(error.message || "Failed to send OTP"),
  });

  const { mutate: confirmDeleteAccount, isLoading: isDeletingAccount } = useMutation(deleteAccount, {
    onSuccess: () => {
      toast.success("Account deleted successfully.");
      clearAuth();
      navigate("/");
    },
    onError: (error: any) => toast.error(error.message || "Failed to delete account"),
  });

  const { isAuthenticated, clearAuth, setUser } = useUserStore();

  React.useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  const user = userResponse?.user;
  const isKycVerified = user?.kycDocument?.status === "Verified";

  // Pre-fill form when user data loads
  React.useEffect(() => {
    if (user && !isEditingProfile) {
      setProfileForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  /* ── Mutations ── */
  const { mutate: handleKycUpload, isLoading: isUploadingKyc } = useMutation({
    mutationFn: updateKYC,
    onSuccess: (_, variables) => {
      if (variables.has("videoKyc")) {
        toast.success("Video KYC uploaded — pending admin review.");
        setIsVideoKycModalOpen(false);
      } else {
        const isInsurance = variables.get("docType") === "insurance";
        toast.success(`${isInsurance ? "Insurance" : "Driver's license"} uploaded — pending admin review.`);
      }
      refetchUser();
    },
    onError: (error: any) => toast.error(error.message || "Upload failed"),
  });

  const { mutate: handleProfileUpdate, isLoading: isUpdatingProfile } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data: any) => {
      const responseData = data?.data;
      if (responseData?.nameChanged) {
        toast.success("Update request submitted! Name verification in progress.");
      } else {
        toast.success("Profile updated successfully!");
      }
      setIsEditingProfile(false);
      // mutationFn returns { data }, where data is { success: true, data: user }
      const updatedUser = responseData?.data;
      if (updatedUser) setUser(updatedUser);
      refetchUser();
    },
    onError: (error: any) => toast.error(error.message || "Failed to update profile"),
  });

  const { mutate: handleSupportSubmit, isLoading: isSendingSupport } = useMutation({
    mutationFn: submitRequest,
    onSuccess: () => {
      toast.success("Message sent! We'll reply to your email shortly.");
      setSupportMessage("");
      refetchRequests();
    },
    onError: (error: any) => toast.error(error.message || "Failed to send message."),
  });

  const { mutate: handleSupportReply, isLoading: isSendingReply } = useMutation({
    mutationFn: userReplyRequest,
    onSuccess: (res: any) => {
      toast.success("Reply sent!");
      setReplyMessage("");
      if (res?.data?.request) {
        setSelectedSupportTicket(res.data.request);
      }
      refetchRequests();
    },
    onError: (error: any) => toast.error(error.message || "Failed to send reply."),
  });

  const { mutate: handleModification, isLoading: isSendingModification } = useMutation({
    mutationFn: userModifyRequest,
    onSuccess: () => {
      toast.success("Modification request submitted for approval.");
      setIsModifyModalOpen(false);
      refetchRequests();
    },
    onError: (error: any) => toast.error(error.message || "Failed to submit modification request."),
  });

  /* ── Handlers ── */
  const handleLogout = () => { clearAuth(); toast.success("Logged out"); navigate("/"); };

  const onSubmitSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim() || !user) return;
    const formData = new FormData();
    formData.append("fullName", `${user.firstName} ${user.lastName}`);
    formData.append("email", user.email);
    formData.append("phone", user.phone || "");
    formData.append("serviceType", "support");
    formData.append("notes", supportMessage);
    const today = new Date().toISOString().split("T")[0];
    formData.append("startDate", today);
    formData.append("endDate", today);
    handleSupportSubmit(formData);
  };

  const doUpload = (file: File, docType: "license" | "insurance") => {
    const formData = new FormData();
    formData.append("kycDocument", file);
    formData.append("docType", docType);
    handleKycUpload(formData);
  };

  const doVideoUpload = (file: File) => {
    const formData = new FormData();
    formData.append("videoKyc", file);
    formData.append("docType", "videoKyc");
    handleKycUpload(formData);
  };

  const saveProfile = () => {
    handleProfileUpdate({
      firstName: profileForm.firstName,
      lastName: profileForm.lastName,
      email: user?.email || "",
      phone: profileForm.phone,
    });
  };

  /* ── Loading ── */
  if (loadingUser || loadingRequests) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-gray-50/50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-[#C69C45] border-t-transparent animate-spin" />
          <p className="text-gray-500 font-medium">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-24 pb-12 relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#C69C45] opacity-[0.08] blur-[120px]" />
        <div className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#143D2A] opacity-[0.05] blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 bg-white/80 p-6 md:p-8 rounded-2xl shadow-xl border border-white backdrop-blur-xl">
          <div>
            <h1 className="text-4xl font-serif font-bold text-[#143D2A] tracking-tight">
              Welcome, <span className="text-[#C69C45]">{user?.firstName || "Customer"}</span>
            </h1>
            <p className="text-gray-500 mt-2 text-base">{user?.email}</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2 w-full md:w-auto bg-transparent text-[#143D2A] border-[#143D2A]/20 hover:bg-[#143D2A]/5 hover:border-[#143D2A]/30 transition-all duration-300 rounded-xl px-6 h-12 shadow-sm"
          >
            <LogOut className="h-4 w-4 text-[#C69C45]" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="rentals" className="space-y-8">
          <div className="flex justify-center md:justify-start">
            <TabsList className="inline-flex items-center justify-center w-full md:w-auto h-auto rounded-full bg-white/60 p-1.5 shadow-inner backdrop-blur-md border border-gray-100">
              {["rentals", "profile", "support"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-full px-6 py-2.5 text-gray-600 transition-all duration-300 data-[state=active]:bg-[#C69C45] data-[state=active]:text-white data-[state=active]:shadow-lg hover:text-[#143D2A] data-[state=active]:hover:text-white font-medium capitalize"
                >
                  {tab === "rentals" ? "My Rentals" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* ──────────── RENTALS TAB ──────────── */}
          <TabsContent value="rentals" className="space-y-6">
            {rentalRequests.length === 0 ? (
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-xl rounded-2xl border border-white">
                <CardContent className="flex flex-col items-center justify-center h-72 text-center p-8">
                  <div className="w-20 h-20 bg-[#C69C45]/10 rounded-full flex items-center justify-center mb-6 border border-[#C69C45]/20">
                    <Clock className="h-10 w-10 text-[#C69C45]" />
                  </div>
                  <h3 className="text-2xl font-serif text-[#143D2A] mb-2">No rentals yet</h3>
                  <p className="text-gray-500 mb-8 max-w-sm">You haven't made any booking requests. Start your journey with us today.</p>
                  <Button onClick={() => navigate("/fleet")} variant="gold" className="rounded-full px-8 py-6 shadow-lg">Browse Fleet</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rentalRequests.map((req: BookingRequest) => (
                  <Card key={req._id} className="shadow-lg bg-white/80 backdrop-blur-xl border border-white hover:-translate-y-1.5 transition-all duration-300 rounded-2xl overflow-hidden group">
                    <CardHeader className="pb-3 bg-white/50 border-b border-gray-100 group-hover:bg-[#C69C45]/5 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <Badge variant="outline" className={`px-3 py-1 text-xs font-semibold rounded-full border-0 ${
                          req.status === "confirmed" ? "bg-emerald-100 text-emerald-700" :
                          req.status === "completed" ? "bg-gray-100 text-gray-700" :
                          req.status === "cancelled" ? "bg-red-100 text-red-700" :
                          "bg-amber-100 text-amber-700"
                        }`}>
                          {req.status.replace("_", " ").charAt(0).toUpperCase() + req.status.replace("_", " ").slice(1)}
                        </Badge>
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                          {new Date(req.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <CardTitle className="text-xl font-serif mt-3 truncate text-[#143D2A]">{req.serviceType}</CardTitle>
                      <CardDescription className="text-sm font-medium text-[#C69C45] mt-1">
                        {new Date(req.startDate).toLocaleDateString()} &mdash; {new Date(req.endDate).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-5 flex flex-col justify-between h-[120px]">
                      <div className="text-sm space-y-3">
                        <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50 border border-gray-100">
                          <span className="text-gray-500 font-medium">Vehicle</span>
                          <span className="font-semibold text-gray-900 truncate ml-2">
                            {req.desiredVehicleId === "any" ? "Not Specified" : req.desiredVehicleId}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50 border border-gray-100">
                          <span className="text-gray-500 font-medium">Pickup Time</span>
                          <span className="font-semibold text-gray-900">{req.time || "N/A"}</span>
                        </div>
                      </div>
                      
                      {["pending", "confirmed", "in_progress"].includes(req.status) && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-4 w-full border-[#C69C45]/40 text-[#C69C45] hover:bg-[#C69C45] hover:text-white"
                          onClick={() => {
                            setModifyingRequest(req);
                            setIsModifyModalOpen(true);
                          }}
                        >
                          Modify / Extend Rental
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ──────────── PROFILE TAB ──────────── */}
          <TabsContent value="profile" className="fade-in-up">
            {user?.pendingNameChange && user.pendingNameChange.firstName && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-6 flex items-start gap-3">
                 <AlertTriangle className="text-blue-600 mt-0.5" size={20} />
                 <p className="text-sm text-blue-800">
                   Your requested name change to <strong>{user.pendingNameChange.firstName} {user.pendingNameChange.lastName}</strong> is pending review. It will be applied once your KYC document is verified.
                 </p>
              </div>
            )}
            <div className="grid lg:grid-cols-2 gap-8">

              {/* Personal Details */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-xl rounded-2xl border border-white">
                <CardHeader className="border-b border-gray-100 bg-white/50 pb-5">
                  <CardTitle className="flex items-center justify-between text-xl font-serif text-[#143D2A]">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#C69C45]/10 rounded-xl border border-[#C69C45]/20">
                        <UserIcon className="h-5 w-5 text-[#C69C45]" />
                      </div>
                      Personal Details
                    </div>
                    <div className="flex items-center gap-3">
                      {isKycVerified && (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                          <Shield className="h-3.5 w-3.5" /> Verified
                        </div>
                      )}
                      <button
                        onClick={() => {
                          if (isEditingProfile) {
                            // cancel — revert
                            setProfileForm({ firstName: user?.firstName || "", lastName: user?.lastName || "", phone: user?.phone || "" });
                          }
                          setIsEditingProfile(!isEditingProfile);
                        }}
                        className="p-2 rounded-xl text-gray-400 hover:text-[#143D2A] hover:bg-gray-100 transition-colors"
                        title={isEditingProfile ? "Cancel editing" : "Edit profile"}
                      >
                        {isEditingProfile ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                      </button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                  {isKycVerified && isEditingProfile && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <p>Names must match the name on your license. Updates to your name are subject to verification.</p>
                    </div>
                  )}
                  {/* First + Last name row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">First Name</Label>
                      {isEditingProfile ? (
                        <Input
                          value={profileForm.firstName}
                          onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                          className="bg-white text-gray-900 border-[#C69C45]/40 focus-visible:ring-[#C69C45]/50"
                        />
                      ) : (
                        <p className="font-medium text-gray-900 text-base px-1">{user?.firstName || "—"}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Last Name</Label>
                      {isEditingProfile ? (
                        <Input
                          value={profileForm.lastName}
                          onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                          className="bg-white text-gray-900 border-[#C69C45]/40 focus-visible:ring-[#C69C45]/50"
                        />
                      ) : (
                        <p className="font-medium text-gray-900 text-base px-1">{user?.lastName || "—"}</p>
                      )}
                    </div>
                  </div>

                  {/* Email — always read-only */}
                  <div className="space-y-1.5">
                    <Label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Email Address</Label>
                    <p className="font-medium text-gray-900 text-base px-1 truncate">{user?.email || "—"}</p>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <Label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Phone Number</Label>
                    {isEditingProfile ? (
                      <Input
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        placeholder="(404) 555-0000"
                        className="bg-white text-gray-900 border-[#C69C45]/40 focus-visible:ring-[#C69C45]/50"
                      />
                    ) : (
                      <p className="font-medium text-gray-900 text-base px-1">{user?.phone || "Not provided"}</p>
                    )}
                  </div>

                  {/* Save button only in edit mode */}
                  {isEditingProfile && (
                    <div className="flex justify-end pt-1">
                      <Button
                        onClick={saveProfile}
                        disabled={isUpdatingProfile}
                        variant="gold"
                        className="px-8 rounded-xl"
                      >
                        {isUpdatingProfile ? "Saving…" : "Save Changes"}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Verification Status */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-xl rounded-2xl border border-white">
                <CardHeader className="border-b border-gray-100 bg-white/50 pb-5">
                  <CardTitle className="flex items-center gap-3 text-xl font-serif text-[#143D2A]">
                    <div className="p-2 bg-[#C69C45]/10 rounded-xl border border-[#C69C45]/20">
                      <Shield className="h-5 w-5 text-[#C69C45]" />
                    </div>
                    Verification Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                  {/* Selfie Video KYC */}
                  <div className="p-4 border border-gray-100 rounded-2xl bg-gray-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Video className="h-4 w-4 text-[#C69C45]" />
                        <h3 className="font-semibold text-gray-900">Selfie Video KYC</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {user?.videoKyc?.status ? (
                          <Badge variant="outline" className={`px-3 py-1 rounded-full text-xs font-semibold border-0 ${
                            user.videoKyc.status === "Verified" ? "bg-emerald-100 text-emerald-800" :
                            user.videoKyc.status === "Rejected" ? "bg-red-100 text-red-800" :
                            "bg-amber-100 text-amber-800"
                          }`}>
                            {user.videoKyc.status.replace("_", " ")}
                          </Badge>
                        ) : null}
                        {user?.videoKyc?.url && (
                          <button
                            onClick={() => setIsVideoKycModalOpen(true)}
                            title="Retake Video"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-[#143D2A] hover:bg-gray-200 transition-colors"
                          >
                            <RefreshCw className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                    {user?.videoKyc?.url ? (
                      <div className="relative w-full h-36 bg-black rounded-xl overflow-hidden border border-gray-200">
                        <video src={user.videoKyc.url} className="w-full h-full object-cover" controls playsInline />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4 p-5 bg-amber-50 rounded-2xl border border-amber-200 shadow-sm">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 p-1.5 bg-amber-100 rounded-full shrink-0">
                            <AlertCircle className="h-4 w-4 text-amber-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-amber-900">Video Needed</p>
                            <p className="text-sm text-amber-800/80 mt-0.5">Please record a short selfie video to verify your identity.</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-[#C69C45] hover:bg-[#C69C45]/90 text-white self-start rounded-xl px-5"
                          onClick={() => setIsVideoKycModalOpen(true)}
                        >
                          Record Video
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Driver's License */}
                  <DocCard
                    label="Driver's License"
                    doc={user?.kycDocument}
                    pendingDoc={user?.pendingKycDocument}
                    isUploading={isUploadingKyc}
                    isReplace={!!user?.kycDocument?.url}
                    onUpload={(file) => doUpload(file, "license")}
                  />

                  {/* Insurance */}
                  <DocCard
                    label="Insurance"
                    doc={user?.insuranceDocument}
                    pendingDoc={user?.pendingInsuranceDocument}
                    isUploading={isUploadingKyc}
                    isReplace={!!user?.insuranceDocument?.url}
                    onUpload={(file) => doUpload(file, "insurance")}
                  />
                </CardContent>
              </Card>

              {/* Account Deletion */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-xl rounded-2xl border border-red-100 mt-6">
                <CardHeader className="border-b border-red-50 bg-red-50/50 pb-5">
                  <CardTitle className="flex items-center gap-3 text-xl font-serif text-red-900">
                    <div className="p-2 bg-red-100 rounded-xl border border-red-200">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Delete Account</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 w-full sm:w-auto shrink-0"
                      onClick={() => {
                        setDeleteStep(1);
                        setDeletionReason("");
                        setDeletionOtp("");
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      Delete My Account
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </div>
          </TabsContent>

          {/* ──────────── SUPPORT TAB ──────────── */}
          <TabsContent value="support" className="fade-in-up">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column: Tickets List */}
              <div className="lg:col-span-1 space-y-4">
                <Button 
                  onClick={() => setSelectedSupportTicket(null)} 
                  variant="gold" 
                  className="w-full justify-center gap-2 rounded-xl h-12 shadow-md font-semibold text-[#143D2A]"
                >
                  <Pencil className="w-4 h-4" /> New Ticket
                </Button>
                
                <div className="space-y-3">
                  {supportRequests.map(ticket => (
                    <Card 
                      key={ticket._id} 
                      className={`cursor-pointer transition-all duration-200 border-l-4 ${selectedSupportTicket?._id === ticket._id ? 'border-l-[#C69C45] bg-[#C69C45]/5 shadow-md' : 'border-l-transparent hover:bg-gray-50'}`}
                      onClick={() => setSelectedSupportTicket(ticket)}
                    >
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                          <Badge variant="outline" className={`px-2 py-0.5 text-[10px] uppercase font-bold border-0 ${
                            ticket.status === 'completed' ? 'bg-gray-100 text-gray-600' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {ticket.status}
                          </Badge>
                          <span className="text-xs text-gray-400 font-medium">
                            {new Date(ticket.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <CardTitle className="text-sm font-semibold mt-2 text-[#143D2A] truncate">
                          {ticket.notes || "Support Request"}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                  {supportRequests.length === 0 && (
                     <div className="text-center p-6 bg-white/50 rounded-xl border border-dashed border-gray-200 text-gray-500 text-sm">
                       No past tickets.
                     </div>
                  )}
                </div>
              </div>

              {/* Right Column: Detail / Timeline */}
              <div className="lg:col-span-2">
                {!selectedSupportTicket ? (
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-xl rounded-2xl border border-white h-full">
                    <CardHeader className="border-b border-gray-100 bg-white/50 pb-5">
                      <CardTitle className="flex items-center gap-3 text-xl font-serif text-[#143D2A]">
                        <div className="p-2 bg-[#C69C45]/10 rounded-xl border border-[#C69C45]/20">
                          <Mail className="h-5 w-5 text-[#C69C45]" />
                        </div>
                        Contact Support
                      </CardTitle>
                      <CardDescription className="text-gray-500 mt-2">
                        Have a question about your rental or need to make changes? Send us a message and we'll reply to your email.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <form onSubmit={onSubmitSupport} className="space-y-5">
                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-gray-700 font-medium">How can we help you?</Label>
                          <Textarea
                            id="message"
                            rows={6}
                            className="resize-none rounded-xl bg-gray-50 border-gray-200 text-gray-900 focus-visible:ring-[#C69C45]/50 text-base p-4 placeholder:text-gray-400"
                            placeholder="Please include your request details, preferred vehicle, or dates…"
                            value={supportMessage}
                            onChange={(e) => setSupportMessage(e.target.value)}
                            required
                          />
                        </div>
                        <Button type="submit" disabled={isSendingSupport} variant="gold" className="rounded-full px-8 py-6 w-full sm:w-auto shadow-lg text-[#143D2A] font-semibold">
                          {isSendingSupport ? "Sending…" : "Send Message"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-xl rounded-2xl border border-white h-[600px] flex flex-col">
                    <CardHeader className="border-b border-gray-100 bg-white/50 py-4 shrink-0">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg font-serif text-[#143D2A]">Ticket Details</CardTitle>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => refetchRequests()} 
                            disabled={isFetchingRequests}
                            className={`p-1.5 rounded-full transition-colors text-gray-500 ${isFetchingRequests ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                            title="Refresh Chat"
                          >
                            <RefreshCw className={`w-4 h-4 ${isFetchingRequests ? 'animate-spin text-[#C69C45]' : ''}`} />
                          </button>
                          <Badge variant="outline" className="bg-gray-100 border-0">{selectedSupportTicket.status}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 flex-1 flex flex-col overflow-hidden bg-gray-50/50">
                      <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {/* Initial Message */}
                        <div className="flex flex-col items-end">
                          <div className="bg-[#143D2A] text-white p-4 rounded-2xl rounded-tr-sm max-w-[85%] shadow-sm">
                            <p className="text-sm">{selectedSupportTicket.notes}</p>
                          </div>
                          <span className="text-[10px] text-gray-400 mt-1 font-medium">{new Date(selectedSupportTicket.createdAt).toLocaleString()}</span>
                        </div>

                        {/* Timeline Notes */}
                        {selectedSupportTicket.notesTimeline?.map((note, idx) => {
                          const isUser = !!note.userMessage;
                          return (
                            <div key={idx} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                              <span className="text-xs text-gray-500 mb-1 font-medium px-1">{note.author || (isUser ? 'You' : 'Support Team')}</span>
                              <div className={`p-4 rounded-2xl max-w-[85%] shadow-sm ${
                                isUser ? 'bg-[#143D2A] text-white rounded-tr-sm' : 'bg-white text-gray-800 rounded-tl-sm border border-gray-100'
                              }`}>
                                <p className="text-sm whitespace-pre-wrap">{isUser ? note.userMessage : note.adminNote}</p>
                                {note.statusChangedTo && (
                                  <div className={`mt-2 text-xs font-semibold px-2 py-1 inline-block rounded border ${isUser ? 'bg-black/20 border-black/10' : 'bg-gray-100 border-gray-200'}`}>
                                    Status changed to: {note.statusChangedTo}
                                  </div>
                                )}
                              </div>
                              <span className="text-[10px] text-gray-400 mt-1 font-medium">
                                {new Date(note.timestamp || "").toLocaleString()}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Reply Box */}
                      {selectedSupportTicket.status !== 'completed' && selectedSupportTicket.status !== 'cancelled' && (
                        <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                          <form 
                            onSubmit={(e) => {
                              e.preventDefault();
                              if (!replyMessage.trim()) return;
                              handleSupportReply({ requestId: selectedSupportTicket._id!, message: replyMessage });
                            }}
                            className="flex gap-2"
                          >
                            <Input 
                              placeholder="Type your reply..." 
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                              className="bg-gray-50 border-gray-200 focus-visible:ring-[#C69C45]/50 rounded-full px-4"
                            />
                            <Button 
                              type="submit" 
                              disabled={isSendingReply || !replyMessage.trim()}
                              className="bg-[#143D2A] hover:bg-[#143D2A]/90 text-white rounded-full px-6 shrink-0"
                            >
                              {isSendingReply ? "..." : "Send"}
                            </Button>
                          </form>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modification Modal */}
      {isModifyModalOpen && modifyingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md bg-white rounded-2xl shadow-2xl border-0 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3 text-[#143D2A]">
                <div className="p-2 bg-[#C69C45]/10 rounded-full">
                  <Pencil className="w-5 h-5 text-[#C69C45]" />
                </div>
                <h2 className="text-lg font-bold">Modify / Extend Rental</h2>
              </div>
              <button
                onClick={() => {
                  setIsModifyModalOpen(false);
                  setModifyingRequest(null);
                  setModEndDate("");
                  setModNotes("");
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleModification({
                  requestId: modifyingRequest._id!,
                  newEndDate: modEndDate,
                  notes: modNotes
                });
              }} className="space-y-5">
                <div className="space-y-2">
                  <Label>Current End Date</Label>
                  <p className="font-medium">{new Date(modifyingRequest.endDate).toLocaleDateString()}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newEndDate">New End Date (Optional)</Label>
                  <Input 
                    id="newEndDate" 
                    type="date" 
                    value={modEndDate}
                    onChange={(e) => setModEndDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modNotes">Reason / Notes (Required)</Label>
                  <Textarea
                    id="modNotes"
                    value={modNotes}
                    onChange={(e) => setModNotes(e.target.value)}
                    placeholder="Why are you modifying this booking?"
                    required
                    rows={3}
                    className="resize-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSendingModification}
                  className="w-full bg-[#143D2A] hover:bg-[#143D2A]/90 text-white rounded-xl py-6"
                >
                  {isSendingModification ? "Submitting..." : "Submit Modification Request"}
                </Button>
              </form>
            </div>
          </Card>
        </div>
      )}

      {/* Account Deletion Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md bg-white rounded-2xl shadow-2xl border-0 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3 text-red-600">
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold">Delete Account</h2>
              </div>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {deleteStep === 1 ? (
                <div className="space-y-4">
                  <p className="text-gray-600 text-sm">
                    Are you sure you want to delete your account? This action is permanent and will remove all your data, bookings, and uploaded documents.
                  </p>
                  <Button
                    onClick={() => reqDeleteOtp()}
                    disabled={isRequestingDeleteOtp}
                    className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-6"
                  >
                    {isRequestingDeleteOtp ? "Sending OTP..." : "Yes, Send OTP"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-5">
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-200">
                    An OTP has been sent to your email. Please enter it below to confirm deletion.
                  </p>
                  <div className="space-y-2">
                    <Label>OTP Code</Label>
                    <Input
                      value={deletionOtp}
                      onChange={(e) => setDeletionOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="text-center tracking-widest text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Reason for Deletion</Label>
                    <Textarea
                      value={deletionReason}
                      onChange={(e) => setDeletionReason(e.target.value)}
                      placeholder="Please tell us why you are leaving (Optional)"
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                  <Button
                    onClick={() => confirmDeleteAccount({ otp: deletionOtp, deletionReason })}
                    disabled={!deletionOtp || isDeletingAccount}
                    className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-6"
                  >
                    {isDeletingAccount ? "Deleting Account..." : "Confirm Deletion"}
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Video KYC Modal */}
      {isVideoKycModalOpen && (
        <VideoKYCModal
          onClose={() => setIsVideoKycModalOpen(false)}
          onConfirm={(file) => doVideoUpload(file)}
          isUploading={isUploadingKyc}
        />
      )}
    </div>
  );
};

export default UserDashboard;
