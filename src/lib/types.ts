



export type TUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  password: string;
  role: string;
  status: string;
  updatedAt: string;
  createdAt: string;
};

export type LoginDetails = { email: string; password: string };

export type ForgotDetails = { email: string; };
export type RecoverDetails = { token: string, password: string };



export type RegisterDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender?: string;
  password: string;
  role?: string;
};

export type SearchTripDetails = {
  travelingFrom: string;
  destination: string;
  travelDate: string;
  returnDate: string;
  tripType: string;
  seatQuantity: number;
};

export type SearchTripByDateDetails = {
  travelDate: string;
  seatQuantity: number | undefined;
};

export type createBookingPayload = {
  passengerName: string | undefined;
  nextOfKin: string;
  email: string | undefined;
  phoneNumber: string | undefined;
  nextOfKinPhone: string;
  travelingFrom: string;
  destination: string;
  travelDate: string;
  returnDate?: string;
  tripId: string;
  vehicleId: string;
  seatNumbers: number[];
  additionalPassengerNames: string[];
  amountPaid: number;
  reference?: string;
  tripType?: string,
  outbound: any,
  returnData?: any
  no_of_adults: number;
};

export type AdminCreateBookingPayload = {
  email: string | undefined;
  seatNumbers: number[];
  tripId: string;
}

export type RescheduleBooking = {
  bookingId: string;
  newTripId: string;
  newSeatNumbers: number[];
};

export type TDriver = {
  _id: string;
  name: string;
  age: number;
  state: string;
  address: string;
  phoneNumber: string;
  licenseNumber: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  __v: number;
};

export type TSeat = {
  _id: string;
  seatNumber: number;
  isAvailable: boolean;
  color: string;
  createdAt: string;
  updatedAt: string;
};

export type TSeatVehivle = {
  seatNumber: number;
  position: string;

};

export type TVehicle = {
  _id: string;
  name: string;
  chassisNumber: string;
  plateNumber: string;
  engineNumber: string;
  color: string;
  hexColor?: string;
  driver: TDriver;
  seats: TSeatVehivle[];
  status: string;
};

export interface TTrip {
  _id: string;
  tripTime: string;
  tripDate: string;
  vehicle?: TVehicle;
  vehicleId: string;
  from: string;
  to: string;
  price: number;
  seats: TSeat[];
  status: string;
  createdAt: string;
  updatedAt: string;
  driverId?: string;
  __v: number;
}

export interface TBooking {
  _id: string;
  passengerName: string;
  nextOfKin: string;
  email: string;
  phoneNumber: string;
  travelingFrom: string;
  destination: string;
  travelDate: string;
  returnDate: string;
  travelTime: string;
  trip?: TTrip;
  vehicle: TVehicle;
  seatNumbers: number[];
  additionalPassengerNames: string[];
  bookingCode: string;
  amountPaid: number;
  isConfirmed: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}



export interface TTripWithCount extends TTrip {
  bookingCount: number;
}

export interface TTripStats {
  todaysTrips: TTripWithCount[];
  activeTrips: TTrip[];
}

export type FetchBookingByStatusPayload = {
  bookingCode: string;
  status: "completed" | "fulfilled" | "cancelled";
};

export type PaymentVerificationResponse = {
  success: boolean;
  data: {
    reference: string;
    amount: number;
    currency: string;
    status: string;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
    };
    customer: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      customer_code: string;
    };
  };
  amount: number;
  status: string;
};

export type FetchBookingByEmailPayload = {
  email: string | undefined;
};

export type updateUserPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};



export type acceptPaymentPayload = {
  email: string | undefined;
  no_of_adults: number;
  tripType: string;
  outbound: any,
  returnData?: any
};


export type acceptPaymentResponse = {
  success: boolean;
  message: string;
  amount: number;
  original: number;
};




export interface BookingRequest {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  vehicleId?: string; // Optional: "Any/No preference"
  startDate: string;   // HTML date inputs return strings
  endDate: string;
  time: string;
  licenseId?: any;
  insuranceId?: any;
  notes?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export type CreateRequestPayload = {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  vehicleId?: string; // Optional: "Any/No preference"
  startDate: string;   // HTML date inputs return strings
  endDate: string;
  time?: string;
  notes?: string;
  license?: any;
  insurance?: any;
}

export interface TBookingStats {
  recentBookings: BookingRequest[];
  todaysCount: number;
}

export interface TBookings {
  request: BookingRequest[];
  total: number
  currentPage: number,
  totalPages: number
}