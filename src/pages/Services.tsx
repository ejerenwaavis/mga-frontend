import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import FadeIn from "@/components/FadeIn";
import { vehicles } from "@/data/vehicles";
import { Plane, Car, Clock, Building2, Sparkles, X } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { submitRequest } from "@/services/mutations";
import { CreateRequestPayload, } from "@/lib/types";
import heic2any from "heic2any";
import Swal from "sweetalert2";
import { useMutation } from "react-query";
import { toast } from "sonner";

const serviceTypes = [
  {
    id: "airport",
    icon: Plane,
    title: "Airport Service",
    description:
      "Convenient vehicle pickup and drop-off near Hartsfield-Jackson Atlanta International Airport. Arrive and get on your way with minimal delay.",
    image: "/vehicles/areoplane.jpg",
    imagePosition: "right"
  },
  {
    id: "rentals",
    icon: Car,
    title: "Standard Rental",
    description:
      "Premium vehicles available with transparent pricing, maintained to the highest standard for business or personal use.",
    image: "/vehicles/COVER-IMAGE-Porsche-Cayenne-2023.png",
    imagePosition: "left"
  },
  {
    id: "custom-delivery",
    icon: Building2,
    title: "Custom Delivery",
    description:
      "Professional rental solutions for businesses — employee travel, client transportation, or fleet supplementation with reliable, premium vehicles.",
    image: "/vehicles/COVER-IMAGE-TURO-2022-KIA-TELLURIDE.png",
    imagePosition: "right"
  },
  {
    id: "cooperate-service",
    icon: Sparkles,
    title: "Co-operate Services",
    description:
      "Need a specific vehicle or arrangement? Our team accommodates special requests and ensures a seamless, white-glove rental experience.",
    image: "/vehicles/COVER-IMAGE-TURO-2024-FORD-BRONCO-SPORT.png",
    imagePosition: "left"
  },
];

export default function Services() {
  useSEO({
    title: "Airport & Corporate Car Rental Services in Atlanta | Mead Green Autos",
    description: "Airport service, daily rental, long-term rental, corporate & concierge car rental in Atlanta, GA. Open 24/7. Book now or call (470) 817-6427.",
    canonical: "https://meadgreenautos.com/services",
  });
  const [selectedService, setSelectedService] = useState<string | null>(null);
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
    serviceType: "",
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
        data.append("serviceType", requestDetails.serviceType);
        data.append("startDate", requestDetails.startDate);
        data.append("endDate", requestDetails.endDate);

        if (requestDetails.vehicleId) data.append("vehicleId", requestDetails.vehicleId);
        if (requestDetails.time) data.append("time", requestDetails.time);
        if (requestDetails.endTime) data.append("endTime", requestDetails.endTime);
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
        console.log(error);
        toast.error(
          error.response
            ? error.response?.data?.message
            : error.message
        );
      },
    });

  return (
    <>

      <section className="relative overflow-hidden bg-stone py-24 md:py-32">
        <div className="absolute inset-0 z-0">
          <img
            src="/vehicles/BMW-X6-2022-side-exterior.jpg"
            alt="Luxury Fleet"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="container relative z-10 text-center">
          <FadeIn>
            <h1 className="font-serif text-white text-3xl font-semibold md:text-4xl">
              Our Services
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm text-white">
              From airport arrivals to long-term corporate needs, we offer rental
              solutions designed around professionalism, reliability, and
              convenience.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Service Sections with Images */}
      <section className="py-16 md:py-20">
        <div className="container max-w-6xl">
          {serviceTypes.map((service, index) => (
            <div 
              key={service.id} 
              id={service.id}
              className="scroll-mt-24 mb-20 last:mb-0"
            >
              <div className={`grid gap-12 items-center md:grid-cols-2 ${service.imagePosition === 'left' ? 'md:grid-flow-col' : ''}`}>
                {/* Image */}
                <div className={`rounded-lg overflow-hidden shadow-xl ${service.imagePosition === 'right' ? 'md:order-1' : 'md:order-0'}`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-80 md:h-96 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Text Content */}
                <div className={`space-y-4 ${service.imagePosition === 'right' ? 'md:order-0' : 'md:order-1'}`}>
                  <h2 className="font-serif text-3xl md:text-4xl font-semibold text-gold">
                    {service.title}
                  </h2>
                  <p className="text-base leading-relaxed text-white">
                    {service.description}
                  </p>
                  <Button
                    variant="premium"
                    size="lg"
                    onClick={() => {
                      setSelectedService(service.id);
                      setSubmitted(false);
                      setTimeout(() => {
                        document.getElementById("service-form")?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                  >
                    Request This Service
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Request Form */}
      <section id="service-form" className="bg-stone py-16 md:py-20">
        <div className="container max-w-2xl">
          <FadeIn>
            {submitted ? (
              <div className="rounded border border-border bg-card p-8 text-center">
                <h2 className="font-serif text-2xl font-semibold">Request Received</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Thank you for your request. We review all submissions within 4 hours during
                  business hours and will contact you to confirm details and next steps.
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
                      Complete the form below and we will respond within 4 hours.
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
                          setSelectedService(e.target.value)
                          handleInputChange("serviceType", e.target.value)
                        }}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-white"
                        required
                      >
                        <option value="">Select a service</option>
                        {serviceTypes.map((s) => (
                          <option key={s.id} value={s.id}>{s.title}</option>
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
                        type="text" 
                        placeholder="04:30 PM" 
                        required 
                        className="focus-visible:ring-primary text-white placeholder:text-white/40" 
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
                        type="text" 
                        placeholder="06:30 PM" 
                        required 
                        className="focus-visible:ring-primary text-white placeholder:text-white/40" 
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
                        className="focus-visible:ring-primary text-white/60 placeholder:text-white/40 [color-scheme:dark]"
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
                        className="focus-visible:ring-primary text-white/60 placeholder:text-white/40 [color-scheme:dark]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="svc-license">License ID</Label>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="premiumOutline"
                          size="sm"
                          onClick={() => licenseInputRef.current?.click()}
                          disabled={isLoading}
                          className="text-white"
                        >
                          Choose File
                        </Button>
                        <span className="text-sm text-white/60 flex-1 truncate">
                          {licenseFilePreview ? licenseFilePreview.file.name : "No file selected"}
                        </span>
                        <Input 
                          id="svc-license"
                          ref={licenseInputRef}
                          accept="image/jpeg,image/png,image/heic,image/heif,application/pdf"
                          type="file" 
                          disabled={isLoading} 
                          required 
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileSelect(file, 'license');
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="svc-insurance">Insurance ID</Label>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="premiumOutline"
                          size="sm"
                          onClick={() => insuranceInputRef.current?.click()}
                          disabled={isLoading}
                          className="text-white"
                        >
                          Choose File
                        </Button>
                        <span className="text-sm text-white/60 flex-1 truncate">
                          {insuranceFilePreview ? insuranceFilePreview.file.name : "No file selected"}
                        </span>
                        <Input
                          ref={insuranceInputRef}
                          id="svc-insurance"
                          type="file" 
                          disabled={isLoading} 
                          required 
                          className="hidden"
                          accept="image/jpeg,image/png,image/heic,image/heif,application/pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileSelect(file, 'insurance');
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="svc-notes">Messages</Label>
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

                  <Button type="submit" disabled={isLoading} variant="premium" size="lg" className="w-full">
                    {isLoading ? "Processing" : "Submit Request"}
                  </Button>
                </form>
              </div>
            )}
          </FadeIn>
        </div>
      </section>
    </>
  );
}
