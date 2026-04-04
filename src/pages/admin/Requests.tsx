import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Filter,
  Search,
  X,
  LogOut
} from "lucide-react";
import { useQuery } from "react-query";
import { useMutation } from "react-query";
import { toast } from "sonner";

import useUserStore from "../../hooks/store/userStore";
import { getAllRequests } from "../../services/queries";
import { BookingRequest } from "../../lib/types";
import { updateRequest } from "@/services/mutations";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useNavigate } from "react-router-dom";

const Requests = () => {


  const { data: requests } = useQuery({
    queryKey: ["bookingStats"],
    queryFn: () => getAllRequests(),
  });


  const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null);
  const [isEditRequestModalOpen, setEditRequestModalOpen] = useState(false);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "in_progress" | "completed" | "cancelled" | "scheduled"
  >("all");
  const [dateFilter, setDateFilter] = useState("");
  const [filteredRequests, setFilteredRequests] = useState<BookingRequest[] | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusPick, setStatusPick] = useState("");

  const { user: storeUser, clearAuth } = useUserStore();


  const formatTripDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };



  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatStatusLabel = (status: string) => {
    return status.replace("_", " ");
  };


  useEffect(() => {
    if (!requests) return;
    const filtered = requests?.request.filter((req) => {
      const matchesSearch =
        req._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.serviceType.toLowerCase().includes(searchTerm.toLowerCase());


      return matchesSearch;
    });

    setFilteredRequests(filtered);

  }, [searchTerm, requests])

  useEffect(() => {
    if (!requests?.request) return;
    const filteredTrips = requests?.request.filter((trip) => {

      const matchesStatus =
        statusFilter === "all" || trip.status === statusFilter;

      const matchesDate =
        !dateFilter ||
        new Date(trip.startDate).toISOString().split("T")[0] === dateFilter;

      return matchesStatus && matchesDate;
    });

    setFilteredRequests(filteredTrips);

  }, [statusFilter, requests])

  useEffect(() => {
    if (!requests?.request) return;
    const filteredTrips = requests?.request.filter((trip) => {

      const matchesDate =
        !dateFilter ||
        new Date(trip.startDate).toISOString().split("T")[0] === dateFilter;

      return matchesDate;
    });

    setFilteredRequests(filteredTrips);

  }, [dateFilter, requests])




  const { mutate: updateRequestMutation } = useMutation({
    mutationFn: (requestData: {
      requestId: string;
      status: string;
      admin: string;
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
        admin: storeUser.email
      });
    } catch (error: any) {
      console.error("Error updating request:", error);
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setSelectedRequest(null);
      setIsSubmitting(false);
    }


  };


  // const handleDeleteTrip = (tripId: string) => {
  //   if (window.confirm("Are you sure you want to delete this trip?")) {
  //     setTrips(trips.filter((trip) => trip.id !== tripId));
  //   }
  // };

  const handleLogout = () => {
    clearAuth();
    navigate('/');
  };





  return (
    <div>
      <div className="mb-6 flex flex-row items-center justify-between p-16 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">All Requests</h1>

        <Button
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-2 border border-red-400 text-red-400 rounded-md font-semibold hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row justif
        y-between gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="form-input pl-10 py-2 w-full md:w-64 text-sm"
              placeholder="Search requests"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center">
              <Calendar size={16} className="text-gray-500 mr-2" />
              <input
                type="date"
                className="form-input py-2 text-sm"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>

            <div className="flex items-center">
              <Filter size={16} className="text-gray-500 mr-2" />
              <select
                className="form-select py-2 text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancel</option>

              </select>
            </div>

          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">

                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start/End Date
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documents
                </th>
                <th className="py-3 px-4 text-xs text-left font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests?.map((trip) => {
                return (
                  <tr key={trip._id} className="hover:bg-gray-50">

                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {trip.fullName}
                        </span>
                        <span className="text-sm text-gray-500">
                          {trip.phone}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <Calendar size={14} className="text-gray-400 mr-1" />
                          <span>{formatTripDate(trip.startDate)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Clock size={14} className="text-gray-400 mr-1" />
                          <span>{formatTripDate(trip.endDate)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <span>{trip.serviceType}</span>
                        </div>
                        <span className="text-sm text-gray-500 mt-1">
                          {trip.time}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <a href={trip.licenseId.url}>License Id</a>
                        </div>
                        <span className="text-sm text-gray-500 mt-1">
                          <a href={trip.insuranceId.url}>Insurance Id</a>
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-left">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadgeClass(
                          trip.status
                        )}`}
                      >
                        {formatStatusLabel(trip.status)}
                      </span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          className="text-primary hover:text-primary-dark"
                          onClick={() => {
                            setEditRequestModalOpen(true);
                            setSelectedRequest(trip);

                          }}
                        >
                          Process
                        </button>

                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredRequests?.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    No request found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
                  className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  required
                >
                  <option value="">Select response</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirm</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancel</option>
                </select>

              </div>





              <div className="flex justify-end space-x-3 mt-6">

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

export default Requests;
