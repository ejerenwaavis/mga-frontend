import { useState } from "react";
import { TUser } from "@/lib/types";
import { X, AlertTriangle, UserCheck, Shield, Trash2, Ban } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import { apiInstance } from "@/services/apiInstance";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface UserProfileModalProps {
    user: TUser;
    onClose: () => void;
}

export default function UserProfileModal({ user, onClose }: UserProfileModalProps) {
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState<"details" | "history">("details");
    const [isBanModalOpen, setIsBanModalOpen] = useState(false);
    const [banReason, setBanReason] = useState("");

    const toggleRoleMutation = useMutation({
        mutationFn: async (newRole: string) => {
            const { data } = await apiInstance.put(`/admin/user/${user._id}/role`, { role: newRole });
            return data;
        },
        onSuccess: () => {
            toast.success("User role updated successfully");
            queryClient.invalidateQueries(["users"]);
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to update role");
        }
    });

    const toggleBanMutation = useMutation({
        mutationFn: async ({ isBanned, reason }: { isBanned: boolean; reason?: string }) => {
            const { data } = await apiInstance.put(`/admin/user/${user._id}/ban`, { isBanned, reason });
            return data;
        },
        onSuccess: () => {
            toast.success("User ban status updated successfully");
            setIsBanModalOpen(false);
            setBanReason("");
            queryClient.invalidateQueries(["users"]);
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to update ban status");
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async () => {
            const { data } = await apiInstance.delete(`/admin/user/${user._id}/permanent`);
            return data;
        },
        onSuccess: () => {
            toast.success("User permanently deleted");
            onClose();
            queryClient.invalidateQueries(["users"]);
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to delete user");
        }
    });

    const handleRoleToggle = () => {
        const newRole = user.role === "admin" ? "user" : "admin";
        if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
            toggleRoleMutation.mutate(newRole);
        }
    };

    const handleBanToggle = () => {
        if (user.isBanned) {
            if (window.confirm("Are you sure you want to unban this user?")) {
                toggleBanMutation.mutate({ isBanned: false });
            }
        } else {
            setIsBanModalOpen(true);
        }
    };

    const handlePermanentDelete = () => {
        if (window.confirm("Are you sure you want to PERMANENTLY delete this user? This cannot be undone.")) {
            deleteMutation.mutate();
        }
    };

    const canPermanentDelete = () => {
        if (!user.deletedAt) return false;
        const deleteDate = new Date(user.deletedAt);
        const diffTime = Math.abs(new Date().getTime() - deleteDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= 60;
    };

    const { data: historyData, isLoading: isLoadingHistory } = useQuery({
        queryKey: ["user-history", user._id],
        queryFn: async () => {
            const { data } = await apiInstance.get(`/admin/requests/user/${user._id}`);
            return data.requests;
        },
        enabled: activeTab === "history"
    });

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-border bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{user.firstName} {user.lastName}</h2>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <div className="flex border-b border-border px-6">
                    <button
                        className={`px-4 py-3 font-medium text-sm border-b-2 ${activeTab === "details" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                        onClick={() => setActiveTab("details")}
                    >
                        User Details & Actions
                    </button>
                    <button
                        className={`px-4 py-3 font-medium text-sm border-b-2 ${activeTab === "history" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                        onClick={() => setActiveTab("history")}
                    >
                        Usage History & Notes
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    {activeTab === "details" && (
                        <div className="space-y-8">
                            {user.isDeleted && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                                    <AlertTriangle className="text-red-600 mt-0.5" size={20} />
                                    <div>
                                        <h4 className="font-semibold text-red-900 text-sm">Account Deleted</h4>
                                        <p className="text-sm text-red-700 mt-1">
                                            This user deleted their account on {new Date(user.deletedAt!).toLocaleDateString()}.
                                            {canPermanentDelete() ? " They can now be permanently deleted." : " They can be permanently deleted 60 days after the deletion date."}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {user.isBanned && (
                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
                                    <Ban className="text-orange-600 mt-0.5" size={20} />
                                    <div>
                                        <h4 className="font-semibold text-orange-900 text-sm">Account Banned</h4>
                                        <p className="text-sm text-orange-700 mt-1">
                                            Reason: {user.banReason} (Since {new Date(user.bannedAt!).toLocaleDateString()})
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Role Management</h3>
                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {user.role === "admin" ? <Shield className="text-blue-600" /> : <UserCheck className="text-gray-600" />}
                                            <div>
                                                <p className="font-medium text-gray-900">Current Role: <span className="capitalize">{user.role}</span></p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleRoleToggle}
                                            disabled={toggleRoleMutation.isPending}
                                        >
                                            {user.role === "admin" ? "Downgrade to User" : "Upgrade to Admin"}
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Account Restrictions</h3>
                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Ban className={user.isBanned ? "text-orange-600" : "text-gray-600"} />
                                            <div>
                                                <p className="font-medium text-gray-900">Ban Status</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant={user.isBanned ? "outline" : "destructive"}
                                            size="sm"
                                            onClick={handleBanToggle}
                                            disabled={toggleBanMutation.isPending}
                                        >
                                            {user.isBanned ? "Unban User" : "Ban User"}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Danger Zone</h3>
                                <div className="bg-red-50 rounded-lg p-4 border border-red-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Trash2 className="text-red-600" />
                                        <div>
                                            <p className="font-medium text-red-900">Permanent Deletion</p>
                                            <p className="text-xs text-red-700">Only available 60 days after account deletion.</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={handlePermanentDelete}
                                        disabled={!canPermanentDelete() || deleteMutation.isPending}
                                    >
                                        Permanent Delete
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">KYC Documents</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="border border-border rounded-lg p-3 bg-gray-50">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Driver's License</p>
                                        {user.kycDocument?.url ? (
                                            <a href={user.kycDocument.url} target="_blank" rel="noreferrer" className="block text-primary hover:underline text-sm truncate">
                                                View Document
                                            </a>
                                        ) : (
                                            <span className="text-sm text-gray-400">Not uploaded</span>
                                        )}
                                    </div>
                                    <div className="border border-border rounded-lg p-3 bg-gray-50">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Insurance</p>
                                        {user.insuranceDocument?.url ? (
                                            <a href={user.insuranceDocument.url} target="_blank" rel="noreferrer" className="block text-primary hover:underline text-sm truncate">
                                                View Document
                                            </a>
                                        ) : (
                                            <span className="text-sm text-gray-400">Not uploaded</span>
                                        )}
                                    </div>
                                    <div className="border border-border rounded-lg p-3 bg-gray-50">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Video KYC</p>
                                        {user.videoKyc?.url ? (
                                            <a href={user.videoKyc.url} target="_blank" rel="noreferrer" className="block text-primary hover:underline text-sm truncate">
                                                Watch Video
                                            </a>
                                        ) : (
                                            <span className="text-sm text-gray-400">Not uploaded</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "history" && (
                        <div className="space-y-6">
                            {isLoadingHistory ? (
                                <p className="text-center py-10 text-gray-500">Loading history...</p>
                            ) : historyData && historyData.length > 0 ? (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-bold text-gray-900">User Requests ({historyData.length})</h3>
                                    {historyData.map((req: any) => (
                                        <div key={req._id} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                                            <div className="p-4 bg-gray-50 flex items-center justify-between border-b border-gray-200">
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-semibold text-gray-900">{req.serviceType}</span>
                                                    <span className="text-xs text-gray-500">
                                                        Requested on {new Date(req.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                    req.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    req.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                    req.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {req.status.toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="p-4">
                                                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                                    <div>
                                                        <p className="text-gray-500">Location</p>
                                                        <p className="font-medium">{req.location}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500">Duration</p>
                                                        <p className="font-medium">{req.duration}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500">Start Date</p>
                                                        <p className="font-medium">{new Date(req.startDate).toLocaleDateString()}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500">Time</p>
                                                        <p className="font-medium">{req.time}</p>
                                                    </div>
                                                </div>
                                                
                                                {/* Notes Timeline for this request */}
                                                {req.notesTimeline && req.notesTimeline.length > 0 && (
                                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Activity Timeline</h4>
                                                        <div className="space-y-3 pl-2 border-l-2 border-gray-200">
                                                            {req.notesTimeline.map((note: any, idx: number) => (
                                                                <div key={idx} className="relative pl-4">
                                                                    <div className="absolute -left-[13px] top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                                                                    <div className="flex flex-col gap-1">
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-xs font-semibold text-gray-800">{note.author}</span>
                                                                            <span className="text-[10px] text-gray-500">
                                                                                changed status to <span className="font-medium">{note.statusChangedTo}</span>
                                                                            </span>
                                                                            <span className="text-[10px] text-gray-400 ml-auto">
                                                                                {new Date(note.timestamp).toLocaleString()}
                                                                            </span>
                                                                        </div>
                                                                        {note.adminNote && (
                                                                            <div className="mt-1 rounded-md bg-gray-100 p-2 text-xs text-gray-700">
                                                                                <p className="font-semibold text-[10px] text-gray-500 mb-0.5">Admin Note</p>
                                                                                {note.adminNote}
                                                                            </div>
                                                                        )}
                                                                        {note.userMessage && (
                                                                            <div className="mt-1 rounded-md bg-blue-50 p-2 text-xs text-blue-900 border border-blue-100">
                                                                                <p className="font-semibold text-[10px] text-blue-700 mb-0.5">User Message</p>
                                                                                {note.userMessage}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center py-10 text-gray-500">No requests found for this user.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {isBanModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Ban User</h3>
                        <p className="text-sm text-gray-600 mb-4">Please provide a reason for banning this user. They will receive an email notification.</p>
                        <textarea
                            className="w-full rounded-md border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none mb-4 min-h-[100px]"
                            placeholder="Reason for ban..."
                            value={banReason}
                            onChange={(e) => setBanReason(e.target.value)}
                        />
                        <div className="flex justify-end gap-3">
                            <Button variant="ghost" onClick={() => setIsBanModalOpen(false)}>Cancel</Button>
                            <Button
                                variant="destructive"
                                disabled={!banReason.trim() || toggleBanMutation.isPending}
                                onClick={() => toggleBanMutation.mutate({ isBanned: true, reason: banReason })}
                            >
                                Confirm Ban
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
