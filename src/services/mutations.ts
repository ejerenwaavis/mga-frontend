import { apiInstance } from "./apiInstance";
import { addUserToLocalStorage } from "../lib/helpers";
import {
  LoginDetails,
  RegisterDetails,
  SearchTripDetails,
  TUser,
  updateUserPayload,
  PaymentVerificationResponse,
  acceptPaymentPayload,
  acceptPaymentResponse,
  ForgotDetails,
  RecoverDetails,
  SearchTripByDateDetails,
  RescheduleBooking,
  AdminCreateBookingPayload,
  CreateRequestPayload
} from "../lib/types";

import useUserStore from "../hooks/store/userStore";

export const recordTuroClick = async (payload: { vehicleId?: string; source?: string }) => {
  const userId = useUserStore.getState().user?._id;
  const enhancedPayload = { ...payload, userId };
  const { data } = await apiInstance.post("/metrics/turo-click", enhancedPayload);
  return data;
};
export const loginUser = async (loginDetails: LoginDetails) => {
  const { data } = await apiInstance.post("/auth/login", loginDetails);

  if (!data.status) {
    throw new Error(data.error || "Login failed");
  }

  addUserToLocalStorage(data.token);
  apiInstance.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

  return {
    user: data.user as TUser,
    token: data.token
  };
};

export const loginAdmin = async (loginDetails: LoginDetails) => {
  const { data } = await apiInstance.post("/auth/loginAdmin", loginDetails);


  if (!data.status) {
    throw new Error(data.error || "Login failed");
  }

  addUserToLocalStorage(data.token);
  apiInstance.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

  return {
    user: data.data.user as TUser,
    token: data.data.token
  };
};


export const registerUser = async (registerDetails: RegisterDetails) => {
  const { data } = await apiInstance.post(
    "/auth/register",
    registerDetails
  );

  if (!data.status) {
    throw new Error(data.error || "Registration failed");
  }

  return { user: data.user as TUser, token: data.token }
};

export const registerAdmin = async (registerDetails: RegisterDetails) => {
  const { data } = await apiInstance.post(
    "/auth/registerAdmin",
    registerDetails
  );

  if (!data.status) {
    throw new Error(data.error || "Registration failed");
  }

  return { user: data.data.user as TUser, token: data.data.token }
};




export const forgotPassword = async (loginDetails: ForgotDetails) => {
  const { data } = await apiInstance.post("/auth/password/forgot-password", loginDetails);

  if (!data.status) {
    throw new Error(data.error || "failed");
  }

  return {
    data
  };
};

export const recoverPassword = async (loginDetails: RecoverDetails) => {
  const { data } = await apiInstance.put("/auth/password/reset-password", loginDetails);
  if (!data.status) {
    throw new Error(data.error || "failed");
  }

  return {
    data
  };
};

export const searchTrip = async (details: SearchTripDetails) => {
  const { data } = await apiInstance.post("/searchTrip", details);
  return { data };
};

export const searchTripByDate = async (details: SearchTripByDateDetails) => {
  const { data } = await apiInstance.post("/searchTripsByDate", details);
  return { data };
};

const normalizeFormData = (details: any) => {
  if (details instanceof FormData) {
    const normalized: Record<string, string> = {};
    for (const [key, value] of details.entries()) {
      if (value instanceof File) {
        normalized[key] = value.name;
      } else {
        normalized[key] = String(value);
      }
    }
    return normalized;
  }

  if (typeof details === "object" && details !== null) {
    return Object.fromEntries(
      Object.entries(details).map(([key, value]) => [key, String(value ?? "")])
    );
  }

  return { payload: String(details) };
};

export const submitRequest = async (details: any) => {
  let caughtError: any = null;

  try {
    const { data } = await apiInstance.post("/submit-request", details);
    // Backend responded — check it actually succeeded
    if (data.success === false) {
      caughtError = new Error(data.message || data.error || "Your request could not be processed.");
    } else {
      return { data };
    }
  } catch (error: any) {
    caughtError = error;
  }

  // Backend failed — attempt silent fallback purely as a data safety net
  try {
    const fallbackEndpoint =
      import.meta.env.VITE_FORM_ENDPOINT ||
      import.meta.env.VITE_FORMSUBMIT_ENDPOINT ||
      "https://formsubmit.co/ajax/ceo@meadgreenautos.com";
    const payload = normalizeFormData(details);
    await fetch(fallbackEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        _subject: "New request from Mead Green Autos website",
        _captcha: "false",
      }),
    });
  } catch (_) {
    // Fallback failed too — swallow silently, the right error is thrown below
  }

  // Always surface the original failure to the UI
  const isNetworkError = !caughtError?.response;
  if (isNetworkError) {
    throw new Error("Unable to reach our server at the moment. Please try again or call us at (470) 817-6427.");
  }
  const serverMsg =
    caughtError?.response?.data?.message ||
    caughtError?.response?.data?.error ||
    caughtError?.message;
  throw new Error(serverMsg || "Your request could not be processed. Please try again later.");
};

export const rescheduleBooking = async (details: RescheduleBooking) => {
  const { data } = await apiInstance.post("/reschedule", details);

  return { data };
};

export const adminCreateBooking = async (details: AdminCreateBookingPayload) => {
  const { data } = await apiInstance.post("/adminCreateBooking", details);

  return { data };
};

export const updateRequest = async (details: {
  requestId: string;
  status: string;
}) => {
  const { data } = await apiInstance.post("/process-request", details);

  return { data };
};

export const assignDriverToVehicle = async (details: {
  vehicleId: string;
  driverId: string;
}) => {
  console.log(details);

  const { data } = await apiInstance.put("/assignDriverToVehicle", details);
  return { data };
};

export const createTrip = async (details: {
  tripTime: string;
  tripDate: string;
  vehicleId: string;
  from: string;
  to: string;
  price: number;
}) => {
  const { data } = await apiInstance.post("/createTrip", details);
  return { data };
};

export const createVehicle = async (details: {
  name: string;
  chassisNumber: string;
  plateNumber: string;
  engineNumber: string;
  color: string;
  hexColor: string;
  seats: [
    { seatNumber: number; position: string },
    { seatNumber: number; position: string },
    { seatNumber: number; position: string },
    { seatNumber: number; position: string },
    { seatNumber: number; position: string },
  ];
}) => {
  const { data } = await apiInstance.post("/createVehicle", details);
  console.log(data);
  return { data };
};

export const updateTrip = async (details: {
  tripTime: string;
  tripDate: string;
  vehicleId: string;
  price: number;
  tripId: string;
  status: string;
}) => {
  const { data } = await apiInstance.post("/updateTrip", details);
  return { data };
};

export const updateTripStatusApi = async (tripId: string, status: string) => {
  const { data } = await apiInstance.post(`/updateTripStatus`, { status, tripId });
  return data;
};

export const cancelBooking = async (details: { bookingId: string; status: "cancelled" }) => {
  const { data } = await apiInstance.post("/cancelBooking", details);
  return { data };
};

export const updateBooking = async (details: {
  bookingId: string;
  passengerName?: string;
  nextOfKin?: string;
  email?: string;
  phoneNumber?: string;
  seatNumbers?: number[];
  additionalPassengerNames?: string[];
  amountPaid?: number;
}) => {
  const { data } = await apiInstance.post("/updateBooking", details);
  return { data };
};

export const updateUser = async (details: updateUserPayload) => {
  const { data } = await apiInstance.put("/me/update", details);
  return { data };
};

export const updateKYC = async (formData: FormData) => {
  const { data } = await apiInstance.put("/me/kyc", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return { data };
};

export const verifyPayment = async (reference: string): Promise<PaymentVerificationResponse> => {
  try {
    const { data } = await apiInstance.post("/verifyPayment", { reference });
    console.log(data);
    return {
      success: true,
      data: data.data,
      amount: data.data.amount,
      status: data.data.status,
    };
  } catch (error: any) {
    console.error("Payment verification failed:", error);
    throw new Error(error.response?.data?.message || "Payment verification failed");
  }
};

export const acceptPayment = async (details: acceptPaymentPayload): Promise<acceptPaymentResponse> => {
  const { data } = await apiInstance.post("/acceptPayment", details);
  if (!data.success) {
    throw new Error(data.error || "payment processing failed");
  }
  return data;
};

// Account Deletion
export const requestDeletionOtp = async () => {
  const { data } = await apiInstance.post("/me/delete/request-otp");
  if (!data.success) {
    throw new Error(data.message || "Failed to request OTP");
  }
  return data;
};

export const deleteAccount = async (payload: { otp: string; deletionReason: string }) => {
  const { data } = await apiInstance.post("/me/delete", payload);
  if (!data.success) {
    throw new Error(data.message || "Failed to delete account");
  }
  return data;
};

// Admin KYC Verification
export const verifyKYCAdmin = async (payload: { userId: string; status: "Verified" | "Rejected"; reason?: string; docType?: string }) => {
  const { data } = await apiInstance.post("/admin/verifyUser", payload);
  if (!data.success) {
    throw new Error(data.error || "Failed to verify KYC");
  }
  return data;
};

