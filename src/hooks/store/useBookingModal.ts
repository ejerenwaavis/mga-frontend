import { create } from 'zustand';
import { Vehicle } from '../../lib/types';

interface BookingModalStore {
  isOpen: boolean;
  selectedVehicle: Vehicle | null;
  openModal: (vehicle: Vehicle) => void;
  closeModal: () => void;
}

export const useBookingModal = create<BookingModalStore>((set) => ({
  isOpen: false,
  selectedVehicle: null,
  openModal: (vehicle) => set({ isOpen: true, selectedVehicle: vehicle }),
  closeModal: () => set({ isOpen: false, selectedVehicle: null }),
}));
