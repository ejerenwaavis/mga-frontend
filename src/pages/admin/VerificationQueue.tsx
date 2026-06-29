import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAllUsers } from "../../services/queries";
import { verifyKYCAdmin } from "../../services/mutations";
import { TUser } from "../../lib/types";
import { LogOut, CheckCircle, XCircle, Search, Shield, Eye, FileText, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import useUserStore from "../../hooks/store/userStore";
import { useNavigate } from "react-router-dom";

type DocType = "kyc" | "insurance" | "videoKyc";
const isVideoUrl = (url?: string) => !!url && /\.(webm|mp4|mov|m4v|ogg|ogv)(\?|#|$)/i.test(url);

const VerificationQueue = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { clearAuth } = useUserStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [selectedDocType, setSelectedDocType] = useState<DocType>("kyc");
  const [rejectionReason, setRejectionReason] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const users: TUser[] = data?.users || [];
  
  // Filter out admins and deleted users
  const customers = users.filter((u) => u.role !== "admin" && !u.isDeleted);

  // Computed lists for each tab
  const licensePending = customers.filter(
    (u) =>
      u.pendingKycDocument?.status === "Pending_Review" ||
      (u.kycDocument?.status === "Pending_Review" && !u.pendingKycDocument)
  );

  const insurancePending = customers.filter(
    (u) =>
      u.pendingInsuranceDocument?.status === "Pending_Review" ||
      (u.insuranceDocument?.status === "Pending_Review" && !u.pendingInsuranceDocument)
  );

  const videoPending = customers.filter((u) => u.videoKyc?.status === "Pending_Review");

  // Mutation for admin verify
  const { mutate: handleVerify, isLoading: isVerifying } = useMutation(verifyKYCAdmin, {
    onSuccess: () => {
      toast.success("Document verification updated successfully.");
      setSelectedUser(null);
      setRejectionReason("");
      queryClient.invalidateQueries("users");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update verification.");
    },
  });

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  const getDocUrl = (user: TUser, type: DocType) => {
    if (type === "kyc") {
      return user.pendingKycDocument?.url || user.kycDocument?.url;
    }
    if (type === "insurance") {
      return user.pendingInsuranceDocument?.url || user.insuranceDocument?.url;
    }
    if (type === "videoKyc") {
      return user.videoKyc?.url;
    }
    return undefined;
  };

  const openModal = (user: TUser, type: DocType) => {
    setSelectedUser(user);
    setSelectedDocType(type);
    setRejectionReason("");
  };

  const onApprove = () => {
    if (!selectedUser) return;
    handleVerify({ userId: selectedUser._id, status: "Verified", docType: selectedDocType });
  };

  const onReject = () => {
    if (!selectedUser) return;
    if (!rejectionReason.trim()) {
      toast.error("Please provide a reason for rejection.");
      return;
    }
    handleVerify({ userId: selectedUser._id, status: "Rejected", reason: rejectionReason, docType: selectedDocType });
  };

  const renderTable = (list: TUser[], type: DocType) => {
    const filtered = list.filter((u) => {
      const name = `${u.firstName} ${u.lastName}`.toLowerCase();
      return name.includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (filtered.length === 0) {
      return (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <Shield className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No pending verifications</h3>
          <p className="text-gray-500">Queue is clear for this category.</p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted</th>
                <th className="py-4 px-6 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[#C69C45]/10 flex items-center justify-center text-[#C69C45] font-bold">
                        {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-gray-500">ID: {user._id.slice(-6)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <p className="text-sm text-gray-900">{user.email}</p>
                    <p className="text-xs text-gray-500">{user.phone}</p>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      Pending Review
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-right">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-[#C69C45] text-[#C69C45] hover:bg-[#C69C45] hover:text-white"
                      onClick={() => openModal(user, type)}
                    >
                      <Eye className="w-4 h-4 mr-2" /> Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-[#143D2A] font-serif">Verification Queue</h1>
            <p className="text-sm text-gray-500 mt-1">Review and manage customer KYC documents.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search customers..."
                className="pl-9 w-64 rounded-full bg-gray-50 border-gray-200 focus-visible:ring-[#C69C45]/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-full"
            >
              <LogOut size={16} className="mr-2" /> Logout
            </Button>
          </div>
        </div>

        {/* Tabs */}
        {isLoading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C69C45]"></div></div>
        ) : (
          <Tabs defaultValue="license" className="space-y-6">
            <TabsList className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 inline-flex">
              <TabsTrigger value="license" className="rounded-lg data-[state=active]:bg-[#143D2A] data-[state=active]:text-white px-6">
                <FileText className="w-4 h-4 mr-2" /> Licenses ({licensePending.length})
              </TabsTrigger>
              <TabsTrigger value="insurance" className="rounded-lg data-[state=active]:bg-[#143D2A] data-[state=active]:text-white px-6">
                <Shield className="w-4 h-4 mr-2" /> Insurance ({insurancePending.length})
              </TabsTrigger>
              <TabsTrigger value="video" className="rounded-lg data-[state=active]:bg-[#143D2A] data-[state=active]:text-white px-6">
                <Video className="w-4 h-4 mr-2" /> Video KYC ({videoPending.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="license" className="animate-in fade-in duration-300">
              {renderTable(licensePending, "kyc")}
            </TabsContent>
            
            <TabsContent value="insurance" className="animate-in fade-in duration-300">
              {renderTable(insurancePending, "insurance")}
            </TabsContent>

            <TabsContent value="video" className="animate-in fade-in duration-300">
              {renderTable(videoPending, "videoKyc")}
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Verification Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
              <div>
                <h2 className="text-xl font-bold text-[#143D2A]">
                  Review {selectedDocType === "insurance" ? "Insurance" : selectedDocType === "videoKyc" ? "Video KYC" : "License"}
                </h2>
                <p className="text-sm text-gray-500">Customer: {selectedUser.firstName} {selectedUser.lastName}</p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                disabled={isVerifying}
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
              {/* Document Preview */}
              <div className="flex-1 bg-gray-900 flex items-center justify-center p-4 relative overflow-y-auto">
                {selectedDocType === "videoKyc" ? (
                  isVideoUrl(getDocUrl(selectedUser, selectedDocType)) ? (
                    <video src={getDocUrl(selectedUser, selectedDocType)} className="max-w-full max-h-full object-contain rounded-lg" controls autoPlay />
                  ) : (
                    <img src={getDocUrl(selectedUser, selectedDocType)} alt="Selfie KYC" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
                  )
                ) : (
                  getDocUrl(selectedUser, selectedDocType)?.includes(".pdf") ? (
                    <iframe src={getDocUrl(selectedUser, selectedDocType)} className="w-full h-full min-h-[500px] rounded-lg bg-white" title="Document" />
                  ) : (
                    <img src={getDocUrl(selectedUser, selectedDocType)} alt="Document" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
                  )
                )}
              </div>

              {/* Action Sidebar */}
              <div className="w-full lg:w-80 bg-white border-l border-gray-100 p-6 flex flex-col space-y-6 overflow-y-auto">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Verification Actions</h3>
                  <Button 
                    onClick={onApprove} 
                    disabled={isVerifying}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-6 mb-4"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" /> Approve Document
                  </Button>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                    <XCircle className="w-4 h-4" /> Reject Document
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">Please provide a reason for rejection so the customer can correct the issue.</p>
                  <Textarea
                    placeholder="E.g. Document is blurry, expired, or name does not match."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="resize-none mb-4"
                    rows={4}
                  />
                  <Button 
                    onClick={onReject} 
                    disabled={isVerifying || !rejectionReason.trim()}
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl py-6"
                  >
                    Reject & Notify
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationQueue;
