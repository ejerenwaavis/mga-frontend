import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { useQuery } from "react-query";
import { getAllUsers, getAllAdmins } from "../../services/queries";
import { TUser } from "../../lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { registerAdmin } from "@/services/mutations";
import { useMutation } from "react-query";
import { toast } from "sonner";


import UserProfileModal from "./components/UserProfileModal";

const AdminUsers = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedUser, setSelectedUser] = useState<TUser | null>(null);

    interface FormData {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;

    }

    interface FormErrors {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;
    }

    const initialFormState: FormData = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: ""
    };


    const [formData, setFormData] = useState<FormData>(initialFormState);
    const [errors, setErrors] = useState<FormErrors>(initialFormState);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
    });

    const admins: TUser[] = data?.users ?? [];


    const filteredAdmins = useMemo(() => {
        return admins.filter((user) => {
            const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

            const matchesSearch =
                fullName.includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());



            const matchesStatus =
                statusFilter === "all" || user.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [admins, searchTerm, statusFilter]);

    const formatDateTime = (date: string | null | undefined) =>
        date
            ? new Date(date).toLocaleString("en-NG", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })
            : "Never";



    const handleInputChange = (field: keyof FormData, value: string) => {

        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: ""
            }));
        }
    };

    const handleSubmit = () => {
        setIsSubmitting(true);

        try {
            createAdminMutation({
                ...formData
            });
        } catch (error: any) {
            console.error("Error creating admin:", error);
            toast.error(
                error?.response?.data?.message || "An unexpected error occurred"
            );
        }


    };


    const { mutate: createAdminMutation } = useMutation({
        mutationFn: (requestData: {
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            password: string;
        }) => registerAdmin(requestData),
        onSuccess: () => {
            toast.success("Admin created successfully!");
            setFormData(initialFormState);
            setIsSubmitting(false);
            // setIsCreateAdminModalOpen(false);
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "An unexpected error occurred"
            );
            setIsSubmitting(false);
        },
    });



    if (isLoading) {
        return <p className="text-center py-10">Loading users…</p>;
    }




    return (
        <div>


            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex flex-wrap gap-4">

                <div className="space-y-2">
                    <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                    {/* <Label htmlFor="svc-phone">Password</Label> */}
                    <Input id="svc-search" type="text" placeholder="Search name or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        required className="focus-visible:ring-primary" />
                </div>



                <div className="space-y-2">
                    {/* <Label htmlFor="svc-type">Admin Status</Label> */}
                    <select
                        id="svc-type"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="flex h-10 w-full mt-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        required
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                </div>
                <Button type="submit" variant="premium" size="sm"
                    className="w-auto mt-2" onClick={() => setIsCreateAdminModalOpen(true)}>

                    Create Admin

                </Button>

            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-semibold text-gray-900">User Details</th>
                            <th scope="col" className="px-6 py-4 font-semibold text-gray-900">Mobile</th>
                            <th scope="col" className="px-6 py-4 font-semibold text-gray-900">Status</th>
                            <th scope="col" className="px-6 py-4 font-semibold text-gray-900">Date Created</th>
                            <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {filteredAdmins.map((user) => (
                            <tr key={user._id} className={`transition-colors ${user.isDeleted ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}`}>
                                {/* 1. Name & Email */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-900">
                                            {user.firstName} {user.lastName}
                                        </span>
                                        <span className="text-xs text-gray-500">{user.email}</span>
                                    </div>
                                </td>

                                {/* 2. Role */}
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        {user.phone}
                                    </span>
                                </td>

                                {/* 3. Status */}
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${user.status === "active"
                                            ? "bg-green-50 text-green-700 ring-green-600/20"
                                            : "bg-red-50 text-red-700 ring-red-600/20"
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>

                                {/* 4. Date */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {formatDateTime(user.createdAt)}
                                </td>

                                {/* 5. Actions */}
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => setSelectedUser(user)}
                                        className="text-primary hover:text-primary-dark font-medium text-sm"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {filteredAdmins.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="mt-2 text-sm">No users found</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Trip Modal */}
            {isCreateAdminModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Create Admin</h2>
                            <button
                                className="text-gray-400 hover:text-gray-600"
                                onClick={() => setIsCreateAdminModalOpen(false)}
                                disabled={isSubmitting}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }} className="space-y-5">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="svc-first">First Name</Label>
                                    <Input id="svc-first" value={formData.firstName}
                                        onChange={(e) =>
                                            handleInputChange("firstName", e.target.value)
                                        } disabled={isSubmitting} placeholder="first name" required className="focus-visible:ring-primary" />

                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="svc-last">Last Name</Label>
                                    <Input id="svc-last" value={formData.lastName}
                                        onChange={(e) =>
                                            handleInputChange("lastName", e.target.value)
                                        } disabled={isSubmitting} placeholder="last name" required className="focus-visible:ring-primary" />

                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="svc-email">Email</Label>
                                    <Input id="svc-email" value={formData.email}
                                        onChange={(e) =>
                                            handleInputChange("email", e.target.value)
                                        } type="email" disabled={isSubmitting} placeholder="you@example.com" required className="focus-visible:ring-primary" />


                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="svc-password">Password</Label>
                                    <Input id="svc-password" value={formData.password}
                                        onChange={(e) =>
                                            handleInputChange("password", e.target.value)
                                        } type="text" disabled={isSubmitting} placeholder="password" required className="focus-visible:ring-primary" />


                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="svc-phone">Phone</Label>
                                    <Input id="svc-phone" value={formData.phone}
                                        onChange={(e) =>
                                            handleInputChange("phone", e.target.value)
                                        } disabled={isSubmitting} type="tel" placeholder="(404) 555-0000" required className="focus-visible:ring-primary" />

                                </div>

                            </div>

                            <Button type="submit" disabled={isSubmitting} variant="premium" size="lg" className="w-full">
                                {isSubmitting ? "Processing" : "Create Admin"}
                            </Button>
                        </form>
                    </div>
                </div>
            )}
            
            {selectedUser && (
                <UserProfileModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}


        </div>
    );
};

export default AdminUsers;
