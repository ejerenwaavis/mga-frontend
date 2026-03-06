import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
    Bell,
    ChevronRight,
    // CreditCard,
    RedoDot,
    LogOut,
    // MapPin,
    Shield,
    User,
} from "lucide-react";
import { getCurrentUser } from "../../services/queries";
import { updateUser } from "../../services/mutations";
import useUserStore from "../../hooks/store/userStore";
import { updateUserPayload } from "../../lib/types";

const AdminProfile = () => {
    const { user: storeUser, clearAuth } = useUserStore();
    const navigate = useNavigate();

    // Fetch current user data
    const {
        data: userData,
        isLoading: isLoadingUser,
        refetch,
    } = useQuery("currentUser", getCurrentUser, {
        enabled: !!storeUser,
        retry: 1,
        onError: (error: any) => {
            console.error("Error fetching user:", error);
            toast.error("Failed to load user data");
        },
    });

    // Update user mutation
    const { mutate: handleUpdateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            toast.success("Profile updated successfully");
            setEditMode(false);
            refetch();
        },
        onError: (error: any) => {
            console.error("Error updating user:", error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        },
    });

    // Transform user data to match component state
    const transformedUser = userData?.user
        ? {
            name: `${userData.user.firstName} ${userData.user.lastName}`,
            email: userData.user.email || "",
            phone: userData.user.phone || "",
            address: "", // This field doesn't exist in TUser, keeping as empty or you can add it
            profileImage: null,
        }
        : {
            name: "",
            email: "",
            phone: "",
            address: "",
            profileImage: null,
        };

    const [activeTab, setActiveTab] = useState<
        "profile" | "security" | "payments" | "notifications"
    >("profile");

    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        profileImage: null,
    });

    // Update formData when user data changes
    useEffect(() => {
        if (userData?.user) {
            const newFormData = {
                name: `${userData.user.firstName || ""} ${userData.user.lastName || ""
                    }`.trim(),
                email: userData.user.email || "",
                phone: userData.user.phone || "",
                address: "",
                profileImage: null,
            };
            setFormData(newFormData);
        }
    }, [userData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !String(formData.name || "").trim() ||
            !String(formData.email || "").trim() ||
            !String(formData.phone || "").trim()
        ) {
            toast.error("Please fill in all required fields");
            return;
        }

        // Split name into firstName and lastName
        const nameParts = String(formData.name || "")
            .trim()
            .split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        const updatePayload: updateUserPayload = {
            firstName,
            lastName,
            email: String(formData.email || ""),
            phone: String(formData.phone || ""),
        };

        handleUpdateUser(updatePayload);
    };

    const handleLogout = () => {
        clearAuth();
        toast.success("Logged out successfully");
        navigate('/');
    };






    // Show loading state while fetching user data
    // if (isLoadingUser) {
    //     return (
    //         <div className="bg-bg-light">
    //             <div className="container mx-auto py-8 px-4">
    //                 <h1 className="text-3xl font-bold mb-8 text-primary">My Profile</h1>
    //                 <div className="flex items-center justify-center py-20">
    //                     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="bg-bg-light">
            <div className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-8 text-primary">My Profile</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                    <User size={40} className="text-primary" />
                                </div>
                                <h2 className="text-xl font-semibold">
                                    {userData?.user?.firstName} {userData?.user?.lastName}
                                </h2>
                                <p className="text-gray-600">{userData?.user?.email}</p>
                            </div>

                            <nav>
                                <ul className="space-y-2">
                                    <li>
                                        <button
                                            className={`flex items-center w-full p-3 rounded-md transition-colors ${activeTab === "profile"
                                                ? "bg-primary/10 text-primary"
                                                : "hover:bg-gray-100"
                                                }`}
                                            onClick={() => setActiveTab("profile")}
                                        >
                                            <User size={18} className="mr-3" />
                                            <span>Personal Information</span>
                                            <ChevronRight size={16} className="ml-auto" />
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className={`flex items-center w-full p-3 rounded-md transition-colors ${activeTab === "security"
                                                ? "bg-primary/10 text-primary"
                                                : "hover:bg-gray-100"
                                                }`}
                                            onClick={() => setActiveTab("security")}
                                        >
                                            <Shield size={18} className="mr-3" />
                                            <span>Security</span>
                                            <ChevronRight size={16} className="ml-auto" />
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                            className={`flex items-center w-full p-3 rounded-md transition-colors ${activeTab === "notifications"
                                                ? "bg-primary/10 text-primary"
                                                : "hover:bg-gray-100"
                                                }`}
                                            onClick={() => setActiveTab("notifications")}
                                        >
                                            <Bell size={18} className="mr-3" />
                                            <span>Notifications</span>
                                            <ChevronRight size={16} className="ml-auto" />
                                        </button>
                                    </li>
                                </ul>
                            </nav>

                            <div className="pt-6 mt-6 border-t border-gray-200">
                                <button
                                    className="flex items-center w-full p-3 text-red-600 rounded-md hover:bg-red-50 transition-colors"
                                    onClick={handleLogout}
                                >
                                    <LogOut size={18} className="mr-3" />
                                    <span>Log Out</span>
                                </button>
                            </div>
                        </div>


                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Personal Information Tab */}
                        {activeTab === "profile" && (
                            <div>
                                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-semibold">
                                            Personal Information
                                        </h2>
                                        {!editMode && (
                                            <button
                                                className="flex items-center text-primary"
                                                onClick={() => setEditMode(true)}
                                            >
                                                <RedoDot size={16} className="mr-1" />
                                                Edit
                                            </button>
                                        )}
                                    </div>

                                    {editMode ? (
                                        <form onSubmit={handleSaveProfile}>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                                <div>
                                                    <label
                                                        htmlFor="name"
                                                        className="block mb-2 font-medium"
                                                    >
                                                        Full Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        className="form-input"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="email"
                                                        className="block mb-2 font-medium"
                                                    >
                                                        Email Address
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        className="form-input"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="phone"
                                                        className="block mb-2 font-medium"
                                                    >
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        name="phone"
                                                        className="form-input"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>

                                            </div>

                                            <div className="flex gap-3">
                                                <button
                                                    type="submit"
                                                    className="btn-primary"
                                                    disabled={isUpdating}
                                                >
                                                    {isUpdating ? "Saving..." : "Save Changes"}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn-outline"
                                                    onClick={() => {
                                                        setEditMode(false);
                                                        setFormData(transformedUser);
                                                    }}
                                                    disabled={isUpdating}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <p className="text-gray-500 text-sm mb-1">Full Name</p>
                                                <p className="font-medium">
                                                    {userData?.user?.firstName} {userData?.user?.lastName}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-sm mb-1">
                                                    Email Address
                                                </p>
                                                <p className="font-medium">{userData?.user?.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-sm mb-1">
                                                    Phone Number
                                                </p>
                                                <p className="font-medium">{userData?.user?.phone}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-sm mb-1">Address</p>
                                                <p className="font-medium">N/A</p>
                                            </div>
                                        </div>
                                    )}
                                </div>


                            </div>
                        )}

                        {/* Security Tab */}
                        {activeTab === "security" && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-6">
                                    Security Settings
                                </h2>

                                <div className="mb-8">
                                    <h3 className="text-lg font-medium mb-4">Change Password</h3>
                                    <form>
                                        <div className="space-y-4 mb-6">
                                            <div>
                                                <label
                                                    htmlFor="currentPassword"
                                                    className="block mb-2 font-medium"
                                                >
                                                    Current Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="currentPassword"
                                                    className="form-input"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="newPassword"
                                                    className="block mb-2 font-medium"
                                                >
                                                    New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="newPassword"
                                                    className="form-input"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="confirmPassword"
                                                    className="block mb-2 font-medium"
                                                >
                                                    Confirm New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="confirmPassword"
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>

                                        <button type="submit" className="btn-primary">
                                            Update Password
                                        </button>
                                    </form>
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-medium mb-4">
                                        Two-Factor Authentication
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Add an extra layer of security to your account by enabling
                                        two-factor authentication.
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">
                                                Status: <span className="text-red-600">Disabled</span>
                                            </p>
                                        </div>
                                        <button className="btn-outline">Enable 2FA</button>
                                    </div>
                                </div>
                            </div>
                        )}



                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;