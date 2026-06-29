import React, { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Ticket,
  Users,
  X,
  LogOut,
  Shield
} from "lucide-react";
import { getRequestStats, getAllAdmins } from "../../services/queries";
import { useQuery } from "react-query";
import { BookingRequest } from "@/lib/types";
import { toast } from "sonner";
import { useMutation } from "react-query";
import { updateRequest } from "@/services/mutations";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useUserStore from "../../hooks/store/userStore";
import { useNavigate } from "react-router-dom";



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

const StatCard = ({
  icon,
  title,
  value,
  trend,
  trendValue,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: "up" | "down" | "neutral";
  trendValue: string;
}) => {



  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
      <div className="mt-4">
        {trend === "up" && (
          <div className="flex items-center text-green-600 text-sm">
            <ArrowUp size={16} className="mr-1" />
            <span>{trendValue} increase</span>
          </div>
        )}
        {trend === "down" && (
          <div className="flex items-center text-red-600 text-sm">
            <ArrowDown size={16} className="mr-1" />
            <span>{trendValue} decrease</span>
          </div>
        )}
        {/* {trend === "neutral" && (
          <div className="flex items-center text-gray-600 text-sm">
            <span>No change ({trendValue})</span>
          </div>
        )} */}
      </div>
    </div>
  );
};


const Dashboard = () => {

  const [isEditRequestModalOpen, setEditRequestModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusPick, setStatusPick] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null);
  const { isAuthenticated, user, clearAuth } = useUserStore();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/");
  }

  const { data: bookingStats } = useQuery({
    queryKey: ["bookingStats"],
    queryFn: () => getRequestStats(),
  });


  const { data: admins } = useQuery({
    queryKey: ["admins"],
    queryFn: () => getAllAdmins(),
  });

  const recentBookings = bookingStats?.recentBookings;
  const todaysBookings = bookingStats?.todaysCount;
  const allAdmins = admins?.users;




  const { mutate: updateRequestMutation } = useMutation({
    mutationFn: (requestData: {
      requestId: string;
      status: string;
      admin: string
    }) => updateRequest(requestData),
    onSuccess: () => {
      toast.success("Request updated successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred"
      );
    },
  });

  const handleUpdateStatus = () => {
    if (!selectedRequest) return;
    setIsSubmitting(true);

    try {
      updateRequestMutation({
        requestId: selectedRequest._id,
        status: statusPick,
        admin: user.email
      });
    } catch (error: any) {
      console.error("Error updating request:", error);
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setSelectedRequest(null);
      setIsSubmitting(false);
      // setEditRequestModalOpen(false);
    }


  };

  const handleLogout = () => {
    clearAuth();
    navigate('/');
  };

  return (
    <div>

      <div className="mb-6 flex flex-row items-center justify-between p-16 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>





        {/* <Link
          to="/admin/profile"
          className="nav-hover-link flex items-center gap-1 text-xs font-sans font-medium uppercase tracking-widest transition-colors duration-150 hover:text-primary  text-muted-foreground"
        >

          Profile
        </Link> */}

        <Button
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-2 border border-red-400 text-red-400 rounded-md font-semibold hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {
          todaysBookings != null && (
            <StatCard
              icon={<Ticket size={20} />}
              title="Today's Requests"
              value={todaysBookings?.toString()}
              trend="up"
              trendValue="12%"
            />
          )
        }
        {
          allAdmins && (
            <StatCard
              icon={<Users size={20} />}
              title="Available Admin(s)"
              value={allAdmins.length.toString()}
              trend="down"
              trendValue="2%"
            />
          )
        }

        <div className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-[#C69C45] flex flex-col justify-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/admin/verifications")}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#C69C45]/10 rounded-full">
              <Shield className="w-6 h-6 text-[#C69C45]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Verification Queue</h3>
              <p className="text-sm text-gray-500">Review pending KYC & docs</p>
            </div>
          </div>
        </div>
      </div>



      <div className="bg-white rounded-lg shadow-sm p-6 w-full">
        <h2 className="text-lg font-semibold mb-4">Recent requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">

                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service Type
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pickup
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start/End Dates
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>

              </tr>
            </thead>
            <tbody>
              {recentBookings?.map((booking, index) => (
                <tr
                  key={booking._id}
                  className={
                    index !== recentBookings.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }
                >
                  <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-primary">
                    {booking.fullName}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-primary">
                    {booking.phone}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm">
                    {booking.serviceType}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm">
                    {booking.pickupLocation}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm">
                    {formatDateTime(booking.startDate)}{'=>' + formatDateTime(booking.endDate)}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                        ${booking.status === "completed" || booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "pending"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        className="text-primary hover:text-primary-dark"
                        onClick={() => {
                          setSelectedRequest(booking);
                          setEditRequestModalOpen(true);
                        }}
                      >
                        Process
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right">
          <a
            href="/admin/requests"
            className="text-primary text-sm hover:underline"
          >
            View all requests →
          </a>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Admin(s)</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>

                </tr>
              </thead>
              <tbody>
                {allAdmins?.map((admin, index) => (
                  <tr
                    key={admin._id}
                    className={
                      index !== allAdmins.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }
                  >
                    <td className="py-3 px-4 whitespace-nowrap text-sm">
                      {admin.firstName + ''}{admin.lastName}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm">
                      {admin.email}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm">
                      {admin.phone}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm">
                      {admin.status}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <a
              href="/admin/users"
              className="text-primary text-sm hover:underline"
            >
              View all admins →
            </a>
          </div>
        </div>
      </div>

      {/* Add Trip Modal */}
      {isEditRequestModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Request</h2>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setEditRequestModalOpen(false)}
                disabled={isSubmitting}
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateStatus();
              }}
            >


              <div className="space-y-2">
                <Label htmlFor="svc-type">Status Response</Label>
                <select
                  id="svc-type"
                  disabled={isSubmitting}
                  value={statusPick}
                  onChange={(e) => setStatusPick(e.target.value as any)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  required
                >
                  <option value="">Select response</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancel</option>
                </select>

              </div>





              <div className="flex justify-end space-x-3 mt-6">
                {/* <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setEditRequestModalOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button> */}

                {/* <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Submit"}
                </button> */}

                <Button type="button" variant="ghost" size="lg"
                  onClick={() => setEditRequestModalOpen(false)}
                  disabled={isSubmitting}
                  className="w-full">
                  Cancel
                </Button>

                <Button type="submit" variant="premium" size="lg"
                  disabled={isSubmitting}
                  className="w-full">
                  {isSubmitting ? "Processing..." : "Submit"}

                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
