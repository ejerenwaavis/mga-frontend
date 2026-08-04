import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import FadeIn from "@/components/FadeIn";
import { serviceTypes } from "@/data/services";
import { X } from "lucide-react";
import { submitRequest } from "@/services/mutations";
import { CreateRequestPayload } from "@/lib/types";
import heic2any from "heic2any";
import Swal from "sweetalert2";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { CONTACT_EMAIL } from "@/data/contact";

interface ServiceRequestFormProps {
  initialServiceId?: string;
}

export default function ServiceRequestForm({ initialServiceId }: ServiceRequestFormProps) {
  const [selectedService, setSelectedService] = useState<string | null>(initialServiceId || null);
  const [submitted, setSubmitted] = useState(false);

  interface FormData {
    fullName: string;
    email: string;
    phone: string;
    serviceType: string;
    vehicleId: string;
    startDate: string;
    endDate: string;
    time?: string;
    endTime?: string;
    notes?: string;
    license?: any;
    insurance?: any;
  }

  interface FormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    serviceType?: string;
    vehicleId?: string;
    startDate?: string;
    endDate?: string;
    time?: string;
    endTime?: string;
    notes?: string;
    license?: any;
    insurance?: any;
  }

  const initialFormState: FormData = {
    fullName: "",
    email: "",
    phone: "",
    serviceType: initialServiceId || "",
    vehicleId: "",
    startDate: "",
    endDate: "",
    time: "",
    endTime: "",
    notes: "",
    license: "",
    insurance: ""
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>(initialFormState);
  
  const today = new Date().toISOString().split("T")[0];
  const licenseInputRef = useRef<HTMLInputElement>(null);
  const insuranceInputRef = useRef<HTMLInputElement>(null);
  const [licenseFilePreview, setLicenseFilePreview] = useState<{ file: File; url: string } | null>(null);
  const [insuranceFilePreview, setInsuranceFilePreview] = useState<{ file: File; url: string } | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const usPhoneRegex = /^(?:\+1\s?)?(?:\(\d{3}\)|\d{3})(?:[\s.-]?)\d{3}(?:[\s.-]?)\d{4}$/;
    const titles = /^(mr|mrs|ms|miss|dr|prof|engr|sir|chief)\.?\s+/i;

    if (formData.fullName.trim()) {
      const fullName = formData.fullName.trim();
      const finalName = fullName.replace(titles, "");
      const nameParts = finalName.trim().split(/\s+/);

      if (nameParts.length !== 2) {
        errors['fullName'] = 'Please enter actual (First and Last name)';
        return false;
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Invalid email address";
      return false;
    }

    if (!usPhoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid US phone number (e.g., (404) 555-0100)";
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

    if (!licenseFilePreview) {
      Swal.fire({
        icon: 'error',
        title: 'Missing License',
        text: 'Please upload a valid driver\'s license.',
        confirmButtonColor: "hsl(var(--primary))",
      });
      return false;
    }

    if (!insuranceFilePreview) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Insurance',
        text: 'Please upload valid insurance documentation.',
        confirmButtonColor: "hsl(var(--primary))",
      });
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setSubmitted(false);
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
      if (licenseFilePreview) {
        URL.revokeObjectURL(licenseFilePreview.url);
      }
      setLicenseFilePreview({ file: processedFile, url });
    } else {
      if (insuranceFilePreview) {
        URL.revokeObjectURL(insuranceFilePreview.url);
      }
      setInsuranceFilePreview({ file: processedFile, url });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (validateForm()) {
        if (licenseFilePreview) {
          formData.license = licenseFilePreview.file
        }
        if (insuranceFilePreview) {
          formData.insurance = insuranceFilePreview.file;
        }

        const requestDetails: CreateRequestPayload = {
          ...formData,
          phone: formData.phone.replace(/[^\d+]/g, "")
        };

        const data = new FormData();

        data.append("fullName", requestDetails.fullName);
        data.append("email", requestDetails.email);
        data.append("phone", requestDetails.phone);
        data.append("recipientEmail", CONTACT_EMAIL);
        data.append("serviceType", requestDetails.serviceType);
        data.append("startDate", requestDetails.startDate);
        data.append("endDate", requestDetails.endDate);

        if (requestDetails.vehicleId) data.append("vehicleId", requestDetails.vehicleId);
        if (requestDetails.time) data.append("time", requestDetails.time);
        if (formData.endTime) data.append("endTime", formData.endTime);
        if (requestDetails.notes) data.append("notes", requestDetails.notes);

        if (requestDetails.license) {
          data.append("license", requestDetails.license);
        }
        if (requestDetails.insurance) {
          data.append("insurance", requestDetails.insurance);
        }

        handleCreateRequest(data);
      } else {
        const errorMessages = Object.values(errors).filter(Boolean).join("\n");

        Swal.fire({
          icon: "warning",
          title: "Please check the following:",
          text: errorMessages,
          confirmButtonColor: "hsl(var(--primary))",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate: handleCreateRequest, isLoading } =
    useMutation({
      mutationFn: submitRequest,
      onSuccess: () => {
        toast.success("Request sent");

        Swal.fire({
          icon: "success",
          title: "Request successful",
          text: "Our team will review your request and get in touch.",
        });
        setSubmitted(true);
        setFormData(initialFormState);
        setLicenseFilePreview(null);
        setInsuranceFilePreview(null);
      },
      onError: (error: any) => {
        const msg: string = error?.message || "We couldn't send your request right now.";
        const isNetworkError = msg.toLowerCase().includes("unable to reach");
        Swal.fire({
          icon: "error",
          title: isNetworkError ? "Unable to Reach Server" : "Submission Failed",
          text: msg,
          footer: isNetworkError
            ? 'Please try again later or call us at <a href="tel:4708176427">(470) 817-6427</a>'
            : undefined,
          confirmButtonColor: "hsl(var(--primary))",
        });
      },
    });

  return (
    <div id="service-form" className="container max-w-2xl py-12">
      <FadeIn>
        {submitted ? (
          <div className="rounded border border-border bg-card p-8 text-center">
            <h2 className="font-serif text-2xl font-semibold">
              Request Received
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Thank you for your request. We review all submissions within 4
              hours during business hours and will contact you to confirm
              details and next steps.
            </p>
            <Button
              variant="premiumOutline"
              size="sm"
              className="mt-6"
              onClick={() => setSubmitted(false)}
            >
              Submit Another Request
            </Button>
          </div>
        ) : (
          <div className="rounded border border-border bg-card p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-serif text-xl font-semibold">
                  BOOK DIRECT
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Complete the form below to receive pricing, availability, and delivery options.
                </p>
              </div>
              {selectedService && (
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear selection"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="svc-name">Full Name</Label>
                  <Input
                    id="svc-name"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    disabled={isLoading}
                    placeholder="Your full name"
                    required
                    className="focus-visible:ring-primary text-white placeholder:text-white/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="svc-email">Email</Label>
                  <Input
                    id="svc-email"
                    value={formData.email}
                    onChange={(e) =>
                      handleInputChange("email", e.target.value)
                    }
                    type="email"
                    disabled={isLoading}
                    placeholder="you@example.com"
                    required
                    className="focus-visible:ring-primary text-white placeholder:text-white/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="svc-phone">Phone</Label>
                  <Input
                    id="svc-phone"
                    value={formData.phone}
                    onChange={(e) =>
                      handleInputChange("phone", e.target.value)
                    }
                    disabled={isLoading}
                    type="tel"
                    placeholder="(404) 555-0000"
                    required
                    className="focus-visible:ring-primary text-white placeholder:text-white/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="svc-type">Service Type</Label>
                  <select
                    id="svc-type"
                    disabled={isLoading}
                    value={formData.serviceType}
                    onChange={(e) => {
                      setSelectedService(e.target.value);
                      handleInputChange("serviceType", e.target.value);
                    }}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-white"
                    required
                  >
                    <option value="">Select a service</option>
                    {serviceTypes.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.shortName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="svc-time">Start Time</Label>
                  <Input
                    id="svc-time"
                    value={formData.time}
                    onChange={(e) =>
                      handleInputChange("time", e.target.value)
                    }
                    disabled={isLoading}
                    type="time"
                    required
                    className="focus-visible:ring-primary text-white/60 placeholder:text-white/40 [color-scheme:dark]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="svc-endtime">End Time</Label>
                  <Input
                    id="svc-endtime"
                    value={formData.endTime}
                    onChange={(e) =>
                      handleInputChange("endTime", e.target.value)
                    }
                    disabled={isLoading}
                    type="time"
                    required
                    className="focus-visible:ring-primary text-white/60 placeholder:text-white/40 [color-scheme:dark]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="svc-start">Start Date</Label>
                  <Input
                    id="svc-start"
                    value={formData.startDate}
                    min={today}
                    onChange={(e) =>
                      handleInputChange("startDate", e.target.value)
                    }
                    type="date"
                    disabled={isLoading}
                    required
                    className="h-10 w-full appearance-none focus-visible:ring-primary text-white/60 placeholder:text-white/40 [color-scheme:dark]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="svc-end">End Date</Label>
                  <Input
                    id="svc-end"
                    value={formData.endDate}
                    min={today}
                    onChange={(e) =>
                      handleInputChange("endDate", e.target.value)
                    }
                    type="date"
                    disabled={isLoading}
                    required
                    className="h-10 w-full appearance-none focus-visible:ring-primary text-white/60 placeholder:text-white/40 [color-scheme:dark]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="svc-license">License</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => licenseInputRef.current?.click()}
                      disabled={isLoading}
                      className="bg-white text-gray-900 hover:bg-gray-100 border-gray-300"
                    >
                      Choose File
                    </Button>
                    <span className="text-sm text-gray-700 flex-1 truncate">
                      {licenseFilePreview
                        ? licenseFilePreview.file.name
                        : "No file selected"}
                    </span>
                    <Input
                      id="svc-license"
                      ref={licenseInputRef}
                      accept="image/jpeg,image/png,image/heic,image/heif,application/pdf"
                      type="file"
                      disabled={isLoading}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect(file, "license");
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="svc-insurance">Insurance</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => insuranceInputRef.current?.click()}
                      disabled={isLoading}
                      className="bg-white text-gray-900 hover:bg-gray-100 border-gray-300"
                    >
                      Choose File
                    </Button>
                    <span className="text-sm text-gray-700 flex-1 truncate">
                      {insuranceFilePreview
                        ? insuranceFilePreview.file.name
                        : "No file selected"}
                    </span>
                    <Input
                      ref={insuranceInputRef}
                      id="svc-insurance"
                      type="file"
                      disabled={isLoading}
                      className="hidden"
                      accept="image/jpeg,image/png,image/heic,image/heif,application/pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect(file, "insurance");
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="svc-notes">Message</Label>
                <Textarea
                  id="svc-notes"
                  value={formData.notes}
                  onChange={(e) =>
                    handleInputChange("notes", e.target.value)
                  }
                  disabled={isLoading}
                  placeholder="Make and model of the car and any additional details or requests"
                  rows={3}
                  className="focus-visible:ring-primary text-white placeholder:text-white/40"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                variant="premium"
                size="lg"
                className="w-full"
              >
                {isLoading ? "Processing" : "Submit Request"}
              </Button>
            </form>
          </div>
        )}
      </FadeIn>
    </div>
  );
}
