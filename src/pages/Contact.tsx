import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import FadeIn from "@/components/FadeIn";
import { Phone, Mail, MapPin, Clock, Building2, Car, Sparkles, Plane } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { submitRequest } from "@/services/mutations";
import { CreateRequestPayload, } from "@/lib/types";
import heic2any from "heic2any";
import Swal from "sweetalert2";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { vehicles } from "@/data/vehicles";



const PHONE = "(470) 817-6427";
const EMAIL = "ceo@meadgreenautos.com";
const ADDRESS = "4814 Old National Hwy , Atlanta, GA 30337";
// const YELP_URL = "https://www.yelp.com/biz/mead-green-autos-atlanta";
const MAPS_URL = "https://www.google.com/maps/dir/?api=1&destination=3535+Peachtree+Rd+Space+520+Ste+234+Atlanta+GA+30326";

const serviceTypes = [
  {
    id: "airport",
    icon: Plane,
    title: "Airport Service",
    description:
      "Convenient vehicle pickup and drop-off near Hartsfield-Jackson Atlanta International Airport. Arrive and get on your way with minimal delay.",
  },
  {
    id: "rentals",
    icon: Car,
    title: "Standard Rental",
    description:
      "Premium vehicles available with transparent pricing, maintained to the highest standard for business or personal use.",
  },

  {
    id: "custom-delivery",
    icon: Building2,
    title: "Custom Delivery",
    description:
      "Professional rental solutions for businesses — employee travel, client transportation, or fleet supplementation with reliable, premium vehicles.",
  },
  {
    id: "cooperate-service",
    icon: Sparkles,
    title: "Co-operate Services",
    description:
      "Need a specific vehicle or arrangement? Our team accommodates special requests and ensures a seamless, white-glove rental experience.",
  },
];

export default function Contact() {
  useSEO({
    title: "Contact Mead Green Autos | 24/7  Atlanta Car Rental",
    description: "Contact Mead Green Autos for premium car rental in , Atlanta. Open 24 hours. Call (470) 817-6427 or send a message. Airport & corporate service available.",
    canonical: "https://meadgreenautos.com/contact",
  });
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);


  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setSubmitted(true);
  // };

  interface FormData {
    fullName: string;
    email: string;
    phone: string;
    serviceType: string;
    vehicleId: string;
    startDate: string;
    endDate: string;
    time?: string;
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

    // First name validation
    // 1. Basic empty check
    if (formData.fullName.trim()) {

      const fullName = formData.fullName.trim();
      const finalName = fullName.replace(titles, "");

      // 2. Logic for "Two Names" requirement
      const nameParts = finalName.trim().split(/\s+/);

      if (nameParts.length !== 2) {
        errors['fullName'] = 'Please enter actual (First and Last name)';

        return false;
      }
    }

    // Email validation
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

    // 1. Detect HEIC/HEIF files (Common on iOS)
    const isHeic = file.type === "image/heic" ||
      file.type === "image/heif" ||
      file.name.toLowerCase().endsWith(".heic") ||
      file.name.toLowerCase().endsWith(".heif");

    if (isHeic) {
      try {
        // 2. Convert HEIC to JPEG
        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.8 // Adjust quality as needed
        });

        // Handle the result (heic2any can return an array if the HEIC has multiple frames)
        const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;

        // 3. Create a new File object from the Blob
        processedFile = new File([blob], file.name.replace(/\.(heic|heif)$/i, ".jpg"), {
          type: "image/jpeg",
          lastModified: Date.now()
        });
      } catch (error) {
        console.error("HEIC conversion failed:", error);
        // Fallback: Continue with original file if conversion fails
      }
    }

    // 4. Create Preview URL for the (potentially converted) file
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
        if (requestDetails.notes) data.append("notes", requestDetails.notes);

        // 2. Append the binary files
        // IMPORTANT: The key names must match your Multer .fields() names
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
      // Handle error
      console.log(error);
    }
  };

  const { mutate: handleCreateRequest, isLoading } =
    useMutation({
      mutationFn: submitRequest,
      onSuccess: () => {
        toast.success(
          "Request sent"
        );

        Swal.fire({
          icon: "success",
          title: "Request successful",
          text: "Our team will review your request and get in touch.",
        });
        setSubmitted(true);
        setFormData(initialFormState);


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
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/vehicles/benz-glc-2022-side-exterior.jpg"
            alt="Luxury Fleet"
            className="h-full w-full object-cover"
          />
          {/* Dark Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="container relative z-10 text-center">
          <FadeIn>
            <h1 className="font-serif text-3xl text-white font-semibold md:text-4xl">
              Contact Us
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm text-white">
              We are available to assist with inquiries, reservations, and any
              questions about our services. We aim to respond within a few
              hours during business hours.
            </p>
          </FadeIn>


        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn>
              {submitted ? (
                <div className="flex items-center justify-center rounded border border-border bg-card p-12">
                  <div className="text-center">
                    <h2 className="font-serif text-2xl font-semibold">
                      Message Sent
                    </h2>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Thank you for reaching out. We will respond as soon as
                      possible.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="svc-name" className="text-white">Full Name</Label>
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
                      <Label htmlFor="svc-email" className="text-white">Email</Label>
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
                      <Label htmlFor="svc-phone" className="text-white">Phone</Label>
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
                      <Label htmlFor="svc-type" className="text-white">Service</Label>
                      <select
                        id="svc-type"
                        disabled={isLoading}
                        value={formData.serviceType}
                        onChange={(e) => {
                          setSelectedService(e.target.value)
                          handleInputChange("serviceType", e.target.value)
                        }}
                        className="flex h-10 w-full text-white rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        required
                      >
                        <option value=""></option>
                        {serviceTypes.map((s) => (
                          <option key={s.id} value={s.id}>{s.title}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="svc-time" className="text-white">Time</Label>
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
                      <Label htmlFor="svc-vehicle" className="text-white">Vehicle</Label>
                      <select
                        id="svc-vehicle"
                        disabled={isLoading}
                        value={formData.vehicleId}
                        onChange={(e) =>
                          handleInputChange("vehicleId", e.target.value)
                        }
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-white text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        required
                      >
                        <option value="">Any / No preference</option>
                        {vehicles.map((v) => (
                          <option key={v.id} value={v.id}>{v.year} {v.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="svc-start" className="text-white">Start Date</Label>
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
                        className="focus-visible:ring-primary text-white placeholder:text-white/40"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="svc-end" className="text-white">End Date</Label>
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
                        className="focus-visible:ring-primary text-white placeholder:text-white/40"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="svc-license" className="text-white">License Id</Label>
                      <Input 
                        id="svc-license"
                        ref={licenseInputRef}
                        accept="image/jpeg,image/png,image/heic,image/heif,application/pdf"
                        type="file" 
                        disabled={isLoading} 
                        required 
                        className="focus-visible:ring-primary text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileSelect(file, 'license');
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="svc-insurance" className="text-white">Insurance Id</Label>
                      <Input
                        ref={insuranceInputRef}
                        id="svc-insurance"
                        type="file" 
                        disabled={isLoading} 
                        required 
                        className="focus-visible:ring-primary text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                        accept="image/jpeg,image/png,image/heic,image/heif,application/pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileSelect(file, 'insurance');
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="svc-notes" className="text-white">Notes?</Label>
                    <Textarea 
                      id="svc-notes" 
                      value={formData.notes}
                      onChange={(e) =>
                        handleInputChange("notes", e.target.value)
                      } 
                      disabled={isLoading} 
                      placeholder="Any additional details or requests" 
                      rows={3} 
                      className="focus-visible:ring-primary text-white placeholder:text-white/40"
                    />
                  </div>

                  <Button type="submit" disabled={isLoading} variant="premium" size="lg" className="w-full">
                    {isLoading ? "Processing" : "Submit Request"}
                  </Button>
                </form>
              )}
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="space-y-8">
                <div>
                  <h2 className="font-serif text-xl text-white font-semibold">
                    Direct Contact
                  </h2>
                  <div className="mt-4 space-y-3">
                    <a
                      href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}
                      className="flex items-center gap-3 text-sm text-white hover:text-foreground transition-colors"
                    >
                      <Phone className="h-4 w-4 text-primary" />
                      {PHONE}
                    </a>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="flex items-center gap-3 text-sm text-white hover:text-foreground transition-colors"
                    >
                      <Mail className="h-4 w-4 text-primary" />
                      {EMAIL}
                    </a>
                    <div className="flex items-center gap-3 text-sm text-white">
                      <MapPin className="h-4 w-4 text-primary" />
                      {ADDRESS}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white">
                      <Clock className="h-4 w-4 text-primary" />
                      Open 24 hours — Monday through Sunday
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3 text-white">
                    <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                      <Button variant="premiumOutline" size="sm" className="text-white">
                        Get Directions
                      </Button>
                    </a>
                  </div>
                </div>

                <div className="rounded border border-border bg-card p-6">
                  <h3 className="font-serif text-base font-semibold">
                    Service Area
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    We primarily serve the greater Atlanta area with convenient
                    pickup and drop-off near Hartsfield-Jackson Atlanta
                    International Airport. Alternative arrangements may be
                    available upon request.
                  </p>
                </div>

                {/* Map */}
                <div className="aspect-[4/3] rounded border border-border overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.5!2d-84.3622!3d33.8467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s3535+Peachtree+Rd+Atlanta+GA+30326!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mead Green Autos — , Atlanta"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
