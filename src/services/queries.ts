import {
  TTrip,
  TBooking,
  BookingRequest,
  FetchBookingByStatusPayload,
  FetchBookingByEmailPayload,
  TUser,
  TVehicle,
  TDriver,
  TBookingStats,
  TTripStats,
  TTripWithCount,
  TBookings
} from "../lib/types";
import { Vehicle } from "../data/vehicles";
import { apiInstance } from "./apiInstance";

export const getActiveTrips = async () => {
  const { data } = await apiInstance.get(`/getActiveTrips`);
  return {
    trips: data.data as TTrip[],
  };
};

export const getAllTrips = async () => {
  const { data } = await apiInstance.get(`/getAllTrips`);
  return {
    trips: data.data as TTrip[],
  };
};



export const getTripStats = async (): Promise<TTripStats> => {
  const { data } = await apiInstance.get(`/getTripStats`);
  return {
    todaysTrips: data.todaysTrips as TTripWithCount[],
    activeTrips: data.activeTrips as TTrip[]
  };
};

export const getAllBookings = async () => {
  const { data } = await apiInstance.get(`/getAllBookings`);
  return {
    bookings: data.data as TBooking[],
  };
};

export const getRequestStats = async (): Promise<TBookingStats> => {
  const { data } = await apiInstance.get(`/getRequestStats`);
  return {
    recentBookings: data.recentBookings as BookingRequest[],
    todaysCount: data.todaysCount as number,
  };
};


export const getAllRequests = async (): Promise<TBookings> => {
  const { data } = await apiInstance.get(`/admin/requests/all`);
  return {
    request: data.data.requests as BookingRequest[],
    total: data.data.total,
    currentPage: data.data.currentPage,
    totalPages: data.data.totalPages
  };
};

export const getMyRequests = async (): Promise<{ requests: BookingRequest[] }> => {
  const { data } = await apiInstance.get(`/my-requests`);
  return {
    requests: data.requests as BookingRequest[]
  };
};

export const fetchBookingByStatus = async (
  payload: FetchBookingByStatusPayload
) => {
  console.log(payload);
  const { data } = await apiInstance.post(`/fetchBookingByStatus`, payload);
  console.log(data);
  return {
    bookings: data.bookings as TBooking[],
  };
};

export const getCurrentUser = async () => {
  const { data } = await apiInstance.get(`/me`);
  return {
    // The backend returns { success: true, data: { user: ..., paymentDetails: ... } }
    user: data?.data?.user as TUser,
  };
};

export const fetchBookingByEmail = async (
  payload: FetchBookingByEmailPayload
) => {
  const { data } = await apiInstance.post(`/fetchBookingByEmail`, payload);

  return {
    bookings: data.bookings as TBooking[],
  };
};



export const getAllDrivers = async () => {
  const { data } = await apiInstance.get(`/getDrivers`);
  return {
    drivers: data.data as TDriver[],
  };
};

export const getAllUsers = async () => {
  const { data } = await apiInstance.get(`/admin/users`);
  return {
    users: data.users as TUser[],
  };
};

export const getAllAdmins = async () => {
  const { data } = await apiInstance.get(`/admin/admins`);
  return {
    users: data.users as TUser[],
  };
};

export const getAllCarsQuery = async () => {
  const { data } = await apiInstance.get(`/cars`);
  return {
    cars: data.cars as Vehicle[],
  };
};

export const getCarByIdQuery = async (id: string) => {
  const { data } = await apiInstance.get(`/car/${id}`);
  return {
    car: data.car as Vehicle,
  };
};
