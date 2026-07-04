import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import FadeIn from "@/components/FadeIn";
import { vehicles } from "@/data/vehicles";
import { Phone, Mail, MapPin, Plane, Car, Clock, Building2, Sparkles, X } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { submitRequest } from "@/services/mutations";
import { CreateRequestPayload } from "@/lib/types";
import heic2any from "heic2any";
import Swal from "sweetalert2";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_ADDRESS } from "@/data/contact";

const serviceTypes = [
  {
    id: "airport",
    icon: Plane,
    title: "Airport Service",
    description:
      "Convenient vehicle pickup and drop-off at Hartsfield–Jackson Atlanta International Airport, designed for a fast and seamless arrival or departure.",
    image: "/vehicles/areoplane.webp",
    imagePosition: "right"
  },
  {
    id: "rentals",
    icon: Car,
    title: "Standard Rental",
    description:
      "Premium vehicles with transparent pricing, flexible rental terms, and professionally maintained standards for everyday rental needs.",
    image: "/vehicles/standard-rental-cover-image.webp",
    imagePosition: "left"
  },
  {
    id: "custom-delivery",
    icon: Building2,
    title: "Custom Delivery",
    description:
      "Vehicle delivery and pickup tailored to your location and schedule throughout Atlanta for added convenience.",
    image: "/vehicles/custom-delivery-cover-image.webp",
    imagePosition: "right"
  },
  {
    id: "cooperate-service",
    icon: Sparkles,
    title: "Corporate Services",
    description:
      "Professional rental solutions for employee travel, client transportation, and short-term business vehicle needs.",
    image: "/vehicles/corporate-services-cover-image.webp",
    imagePosition: "left"
  },
];

export default function Contact() {
  useSEO({
    title: "Contact Mead Green Autos | Atlanta Car Rental",
    description: "Contact Mead Green Autos for premium car rental in Atlanta. Open 7 days a week. Call (470) 817-6427 or send a message.",
    canonical: "https://meadgreenautos.com/contact",
  });
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    notes?: string;
  }

  interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    notes?: string;
  }

  const initialFormState: FormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: ""
  };


  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});


  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const phoneRegex = /^\+?[0-9\s\-\(\)]{7,20}$/;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Invalid email address";
    }

    if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number (including country code if outside US)";
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





  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (validateForm()) {
        const requestDetails: CreateRequestPayload = {
          ...formData,
          serviceType: "support",
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
          phone: formData.phone.replace(/[^\d+]/g, "")
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
        if (requestDetails.notes) data.append("notes", requestDetails.notes);

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
    <>
      <section className="relative overflow-hidden bg-stone py-24 md:py-32">
        <div className="absolute inset-0 z-0">
          <img
            src="/vehicles/Services-Hero.webp"
            alt="Luxury Fleet"
            className="h-full w-full object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="container relative z-10 text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Contact Us
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
              Get in touch with us for premium vehicle rentals, airport delivery, and
              corporate transportation in Atlanta.
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
              <div
                className={`grid gap-12 items-center md:grid-cols-2 ${service.imagePosition === "left" ? "md:grid-flow-col" : ""}`}
              >
                {/* Image */}
                <div
                  className={`rounded-lg overflow-hidden shadow-xl ${service.imagePosition === "right" ? "md:order-1" : "md:order-0"}`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-80 md:h-96 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Text Content */}
                <div
                  className={`space-y-4 ${service.imagePosition === "right" ? "md:order-0" : "md:order-1"}`}
                >
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
                        document
                          .getElementById("service-form")
                          ?.scrollIntoView({ behavior: "smooth" });
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
        <div className="container max-w-6xl">
          <FadeIn>
            <div className="grid lg:grid-cols-5 gap-12 items-start">
              <div className="lg:col-span-3">
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
                      CONTACT US
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Complete the form below and we'll review your request, confirm availability, and contact you shortly.
                    </p>
                    <p className="mt-2 text-sm font-medium text-white/80">
                      Questions before booking? Call (470) 817-6427 or email us—we're happy to help.
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
                      <Label htmlFor="svc-firstname">First Name</Label>
                      <Input
                        id="svc-firstname"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        disabled={isLoading}
                        placeholder="First Name"
                        className={`focus-visible:ring-primary text-white placeholder:text-white/40 ${errors.firstName ? 'border-red-500' : ''}`}
                      />
                      {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="svc-lastname">Last Name</Label>
                      <Input
                        id="svc-lastname"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        disabled={isLoading}
                        placeholder="Last Name"
                        className={`focus-visible:ring-primary text-white placeholder:text-white/40 ${errors.lastName ? 'border-red-500' : ''}`}
                      />
                      {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
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
                        className={`focus-visible:ring-primary text-white placeholder:text-white/40 ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Input
                        id="svc-phone"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        disabled={isLoading}
                        type="tel"
                        placeholder="(404) 555-0000 or +44 20 7123 4567"
                        className={`focus-visible:ring-primary text-white placeholder:text-white/40 ${errors.phone ? 'border-red-500' : ''}`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
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
              </div>
              <div className="lg:col-span-2 space-y-8">
                <div className="rounded border border-border bg-card p-8">
                  <h3 className="font-serif text-xl font-semibold mb-4 text-white">Contact Information</h3>
                  <div className="space-y-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider font-semibold text-white/50 mb-1">Phone</p>
                        <a href={`tel:${CONTACT_PHONE.replace(/[^\d+]/g, "")}`} className="text-white hover:text-primary transition-colors text-base">{CONTACT_PHONE}</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider font-semibold text-white/50 mb-1">Email</p>
                        <a href={`mailto:${CONTACT_EMAIL}`} className="text-white hover:text-primary transition-colors text-base">{CONTACT_EMAIL}</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider font-semibold text-white/50 mb-1">Address</p>
                        <span className="text-white text-base">{CONTACT_ADDRESS}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded border border-border bg-card overflow-hidden h-72 relative">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.7225132515053!2d-84.47565702353381!3d33.63842103947492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f4fd8000000001%3A0x6e9f2d5e2272e276!2s4814%20Old%20National%20Hwy%2C%20Atlanta%2C%20GA%2030337!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                    className="absolute inset-0 w-full h-full border-0 grayscale invert opacity-80" 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
