import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useBookingModal } from "@/hooks/store/useBookingModal";
import useUserStore from "@/hooks/store/userStore";
import { submitRequest } from "@/services/mutations";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { CONTACT_EMAIL } from "@/data/contact";
import { countryCodes } from "@/data/countryCodes";
import { CreateRequestPayload } from "@/lib/types";
import heic2any from "heic2any";
import Swal from "sweetalert2";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  serviceType: string;
  startDate: string;
  endDate: string;
  time: string;
  endTime: string;
  notes: string;
  license?: any;
  insurance?: any;
}

const initialFormState: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  countryCode: "+1",
  serviceType: "",
  startDate: "",
  endDate: "",
  time: "",
  endTime: "",
  notes: "",
  license: null,
  insurance: null,
};

export default function BookingModal() {
  const { isOpen, selectedVehicle, closeModal } = useBookingModal();
  const { user } = useUserStore();
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [licenseFilePreview, setLicenseFilePreview] = useState<{ file: File; url: string } | null>(null);
  const [insuranceFilePreview, setInsuranceFilePreview] = useState<{ file: File; url: string } | null>(null);
  const licenseInputRef = useRef<HTMLInputElement>(null);
  const insuranceInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormState);
      setSubmitted(false);
      setLicenseFilePreview(null);
      setInsuranceFilePreview(null);
    }
  }, [isOpen]);

  const { mutate: handleRequest, isLoading } = useMutation({
    mutationFn: submitRequest,
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Booking request submitted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to submit request");
    },
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = async (file: File, type: 'license' | 'insurance') => {
    let processedFile = file;

    const isHeic = file.type === "image/heic" ||
      file.type === "image/heif" ||
      file.name.toLowerCase().endsWith(".heic") ||
      file.name.toLowerCase().endsWith(".heif");

    if (isHeic) {
      try {
        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.8
        });

        const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
        processedFile = new File([blob], file.name.replace(/\.(heic|heif)$/i, ".jpg"), {
          type: "image/jpeg",
          lastModified: Date.now()
        });
      } catch (error) {
        console.error("HEIC conversion failed:", error);
      }
    }

    const url = URL.createObjectURL(processedFile);

    if (type === 'license') {
      if (licenseFilePreview) URL.revokeObjectURL(licenseFilePreview.url);
      setLicenseFilePreview({ file: processedFile, url });
    } else {
      if (insuranceFilePreview) URL.revokeObjectURL(insuranceFilePreview.url);
      setInsuranceFilePreview({ file: processedFile, url });
    }
  };

  const validateForm = () => {
    const phoneRegex = /^[0-9\s\-()]{7,20}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Phone',
        text: 'Please enter a valid phone number (e.g., 404 555 0100).',
        confirmButtonColor: "hsl(var(--primary))",
      });
      return false;
    }

    if (formData.startDate && formData.endDate && formData.startDate === formData.endDate) {
      if (formData.time && formData.endTime && formData.time >= formData.endTime) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Time',
          text: 'End time must be after the start time for same-day bookings.',
          confirmButtonColor: "hsl(var(--primary))",
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const requestDetails: CreateRequestPayload = {
      ...formData,
      vehicleId: selectedVehicle ? `${selectedVehicle.year} ${selectedVehicle.name}` : undefined,
      phone: `${formData.countryCode} ${formData.phone}`.replace(/[^\d+]/g, ""),
    };

    const data = new FormData();
    data.append("firstName", requestDetails.firstName || "");
    data.append("lastName", requestDetails.lastName || "");
    data.append("email", requestDetails.email);
    data.append("phone", requestDetails.phone);
    data.append("recipientEmail", CONTACT_EMAIL);
    data.append("serviceType", requestDetails.serviceType);
    data.append("startDate", requestDetails.startDate);
    data.append("endDate", requestDetails.endDate);

    if (requestDetails.vehicleId) data.append("vehicleId", requestDetails.vehicleId);
    if (selectedVehicle?.name) data.append("vehicleName", selectedVehicle.name);
    if (requestDetails.time) data.append("time", requestDetails.time);
    if (requestDetails.endTime) data.append("endTime", requestDetails.endTime);
    if (requestDetails.notes) data.append("notes", requestDetails.notes);

    if (licenseFilePreview) data.append("license", licenseFilePreview.file);
    if (insuranceFilePreview) data.append("insurance", insuranceFilePreview.file);

    handleRequest(data);
  };

  const today = new Date().toISOString().split("T")[0];
  const hasUploadedLicense = user?.kycDocument?.url ? true : false;
  // Make documents optional for this form as requested
  const isLicenseRequired = false;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-xl bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-primary text-center">
            Book {selectedVehicle?.name}
          </DialogTitle>
          {selectedVehicle && (
            <p className="text-center text-muted-foreground mt-1">
              ${selectedVehicle.pricePerDay}/day
            </p>
          )}
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center">
            <h2 className="font-serif text-xl font-semibold text-green-700">Booking Request Received</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you for your request. We will review your reservation for the {selectedVehicle?.name} and contact you shortly.
            </p>
            <Button onClick={closeModal} className="mt-6" variant="premium">Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="modal-firstname">First Name *</Label>
                <Input
                  id="modal-firstname"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="John"
                  required
                  className="text-white placeholder:text-white/40 focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-lastname">Last Name *</Label>
                <Input
                  id="modal-lastname"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Doe"
                  required
                  className="text-white placeholder:text-white/40 focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-email">Email *</Label>
              <Input
                id="modal-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john@example.com"
                required
                className="text-white placeholder:text-white/40 focus-visible:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="modal-phone">Phone Number *</Label>
                <div className="flex gap-2">
                  <select
                    id="modal-country-code"
                    value={formData.countryCode}
                    onChange={(e) => handleInputChange("countryCode", e.target.value)}
                    disabled={isLoading}
                    className="flex h-10 w-[110px] rounded-md border border-input bg-background px-2 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-white"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code} className="text-white">
                        {c.code} {c.flag}
                      </option>
                    ))}
                  </select>
                  <Input
                    id="modal-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="555-0000"
                    required
                    className="flex-1 text-white placeholder:text-white/40 focus-visible:ring-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-serviceType">Service Type *</Label>
                <select
                  id="modal-serviceType"
                  value={formData.serviceType}
                  onChange={(e) => handleInputChange("serviceType", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-white"
                  required
                >
                  <option value="">Select a service</option>
                  <option value="airport">Airport Service</option>
                  <option value="rentals">Standard Rental</option>
                  <option value="custom-delivery">Custom Delivery</option>
                  <option value="cooperate-service">Corporate Services</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="modal-startDate">Start Date *</Label>
                <Input
                  id="modal-startDate"
                  type="date"
                  min={today}
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  required
                  className="text-white/60 placeholder:text-white/40 [color-scheme:dark] focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-endDate">End Date *</Label>
                <Input
                  id="modal-endDate"
                  type="date"
                  min={today}
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  required
                  className="text-white/60 placeholder:text-white/40 [color-scheme:dark] focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="modal-time">Start Time *</Label>
                <Input
                  id="modal-time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  required
                  className="text-white/60 placeholder:text-white/40 [color-scheme:dark] focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-endTime">End Time *</Label>
                <Input
                  id="modal-endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                  required
                  className="text-white/60 placeholder:text-white/40 [color-scheme:dark] focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="modal-license">Driver's License (Optional)</Label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => licenseInputRef.current?.click()}
                    disabled={isLoading || (!isLicenseRequired && !licenseFilePreview)}
                    className="bg-white text-gray-900 border-gray-300 w-full font-normal justify-start px-3"
                  >
                    {!isLicenseRequired ? "Uploaded (Verified)" : "Choose File"}
                  </Button>
                  <Input 
                    id="modal-license"
                    ref={licenseInputRef}
                    accept="image/jpeg,image/png,image/heic,image/heif,application/pdf"
                    type="file" 
                    required={isLicenseRequired && !licenseFilePreview}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file, 'license');
                    }}
                  />
                </div>
                {licenseFilePreview && <span className="text-xs text-gray-500 truncate mt-1 block">{licenseFilePreview.file.name}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="modal-insurance">Insurance Card (Optional)</Label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => insuranceInputRef.current?.click()}
                    disabled={isLoading}
                    className="bg-white text-gray-900 border-gray-300 w-full font-normal justify-start px-3"
                  >
                    Choose File
                  </Button>
                  <Input 
                    id="modal-insurance"
                    ref={insuranceInputRef}
                    accept="image/jpeg,image/png,image/heic,image/heif,application/pdf"
                    type="file" 
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file, 'insurance');
                    }}
                  />
                </div>
                {insuranceFilePreview && <span className="text-xs text-gray-500 truncate mt-1 block">{insuranceFilePreview.file.name}</span>}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-white/70 bg-white/5 p-2 rounded border border-white/10 mb-2">
                Optional document uploads may help expedite your booking. All submitted documents are handled securely and used solely to verify your rental eligibility.
              </p>
              <Label htmlFor="modal-notes">Additional Notes</Label>
              <Textarea
                id="modal-notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Make and model of the vehicle and any additional details and requests"
                rows={3}
                className="text-white placeholder:text-white/40 focus-visible:ring-primary"
              />
            </div>

            <Button
              type="submit"
              variant="premium"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Booking Request"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
