import { useState, useEffect } from "react";

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
  },
  {
    id: "rentals",
    icon: Car,
    title: "Rental",
    description:
      "Premium vehicles available with transparent pricing, maintained to the highest standard for business or personal use.",
  },
  // {
  //   id: "long-term",
  //   icon: Clock,
  //   title: "Long-Term Rental",
  //   description:
  //     "Extended rental arrangements for weeks or months at a time, with favorable pricing and flexible terms tailored to your schedule.",
  // },
  {
    id: "corporate",
    icon: Building2,
    title: "Corporate Rental",
    description:
      "Professional rental solutions for businesses — employee travel, client transportation, or fleet supplementation with reliable, premium vehicles.",
  },
  {
    id: "concierge",
    icon: Sparkles,
    title: "Concierge",
    description:
      "Need a specific vehicle or arrangement? Our team accommodates special requests and ensures a seamless, white-glove rental experience.",
  },
];

export default function Services() {
  useSEO({
    title: "Airport & Corporate Car Rental Services in Atlanta | Mead Green Autos",
    description: "Airport service, daily rental, long-term rental, corporate & concierge car rental in Atlanta, GA. Open 24/7. Book now or call (470) 817-6427.",
    canonical: "https://green-fleet-concierge.lovable.app/services",
  });
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  // const [pickupValue, setPickupValue] = useState("");
  // const [customLocation, setCustomLocation] = useState("");
  // const [debouncedLocation, setDebouncedLocation] = useState("");

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
    notes: ""
  };


  const [formData, setFormData] = useState<FormData>(initialFormState);

  const [errors, setErrors] = useState<FormErrors>(initialFormState);

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedLocation(customLocation);
  //   }, 500);

  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [customLocation]);


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



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {

      if (validateForm()) {
        const requestDetails: CreateRequestPayload = {
          ...formData,
          phone: formData.phone.replace(/[^\d+]/g, "")
          // pickupLocation: formData.pickupLocation === "other"
          //   ? debouncedLocation
          //   : formData.pickupLocation
        };

        handleCreateRequest(requestDetails);
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
      <section className="bg-stone py-16 md:py-20">
        <div className="container text-center">
          <FadeIn>
            <h1 className="font-serif text-3xl font-semibold md:text-4xl">
              Our Services
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              From airport arrivals to long-term corporate needs, we offer rental
              solutions designed around professionalism, reliability, and
              convenience.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" id="service-cards">
            {serviceTypes.map((service, i) => (
              <FadeIn key={service.id} delay={i * 0.06}>
                <div id={service.id} className="flex flex-col rounded border border-border bg-card p-6 transition-all duration-200 ease-out hover:bg-white hover:shadow-lg hover:-translate-y-0.5 h-full">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-primary/10 mb-4">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-lg font-semibold">
                    {service.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <Button
                    variant="premium"
                    size="sm"
                    className="mt-5 w-full"
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
              </FadeIn>
            ))}
          </div>
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
                      <Input id="svc-name" value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        } disabled={isLoading} placeholder="Your full name" required className="focus-visible:ring-primary" />

                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="svc-email">Email</Label>
                      <Input id="svc-email" value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        } type="email" disabled={isLoading} placeholder="you@example.com" required className="focus-visible:ring-primary" />


                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="svc-phone">Phone</Label>
                      <Input id="svc-phone" value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        } disabled={isLoading} type="tel" placeholder="(404) 555-0000" required className="focus-visible:ring-primary" />

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
                        className="flex h-10 w-full text-white rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        required
                      >
                        <option value="">Select a service</option>
                        {serviceTypes.map((s) => (
                          <option key={s.id} value={s.id}>{s.title}</option>
                        ))}
                      </select>

                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="svc-time">Time</Label>
                      <Input id="svc-time" value={formData.time}
                        onChange={(e) =>
                          handleInputChange("time", e.target.value)
                        } disabled={isLoading} type="text" placeholder="04:30 PM" required className="focus-visible:ring-primary" />

                    </div>
                    {/* <div className="space-y-2">
                      <Label htmlFor="svc-pickup">Pickup Location</Label>
                      <select
                        id="svc-pickup"
                        disabled={isLoading}
                        value={formData.pickupLocation}
                        onChange={(e) => {
                          handleInputChange("pickupLocation", e.target.value)
                        }}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        required
                      >
                        <option value="">Select location</option>
                        <option value="atl-airport">ATL Airport</option>
                        <option value="other">Other Location</option>
                      </select>
                      {errors.pickupLocation && (
                        <p className="text-red-500 text-sm flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {errors.pickupLocation}
                        </p>
                      )}
                    </div> */}

                    {/* <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="svc-pickup">Pickup Location</Label>
                        <select
                          id="svc-pickup"
                          value={pickupValue}
                          onChange={(e) => {
                            handleInputChange("pickupLocation", e.target.value)
                            setPickupValue(e.target.value)
                          }
                          }
                          className="flex h-10 text-white w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          required
                        >
                          <option value="">Select location</option>
                          <option value="atl-airport">ATL Airport</option>
                          <option value="other">Other Location</option>
                        </select>
                      </div>

                      {pickupValue === "other" && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                          <Label htmlFor="svc-custom-location">Please specify location</Label>
                          <Input
                            id="svc-custom-location"
                            placeholder="Enter address or landmark"
                            value={customLocation}
                            onChange={(e) => {
                              setCustomLocation(e.target.value)
                            }}
                            required={pickupValue === "other"}
                            className="focus-visible:ring-primary"
                          />
                        </div>
                      )}

                    </div> */}
                    <div className="space-y-2">
                      <Label htmlFor="svc-vehicle">Desired Vehicle</Label>
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
                      <Label htmlFor="svc-start">Start Date</Label>
                      <Input id="svc-start" value={formData.startDate}
                        onChange={(e) =>
                          handleInputChange("startDate", e.target.value)
                        } type="date" disabled={isLoading} required className="focus-visible:ring-primary" />

                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="svc-end">End Date</Label>
                      <Input id="svc-end" value={formData.endDate}
                        onChange={(e) =>
                          handleInputChange("endDate", e.target.value)
                        } type="date" disabled={isLoading} required className="focus-visible:ring-primary" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="svc-end">License ID</Label>
                      <Input id="svc-end" value={formData.endDate}
                        onChange={(e) =>
                          handleInputChange("endDate", e.target.value)
                        } type="file" disabled={isLoading} required className="focus-visible:ring-primary" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="svc-end">Insurance ID</Label>
                      <Input id="svc-end" value={formData.endDate}
                        onChange={(e) =>
                          handleInputChange("endDate", e.target.value)
                        } type="file" disabled={isLoading} required className="focus-visible:ring-primary" />
                    </div>

                  </div>

                  {/* <div className="space-y-2">
                    <Label htmlFor="svc-purpose">Purpose</Label>
                    <select
                      id="svc-purpose"
                      disabled={isLoading}
                      value={formData.purpose}
                      onChange={(e) =>
                        handleInputChange("purpose", e.target.value)
                      }
                      className="flex text-white h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      required
                    >
                      <option value="">Select purpose</option>
                      <option value="personal">Personal</option>
                      <option value="corporate">Corporate</option>
                    </select>

                  </div> */}

                  <div className="space-y-2">
                    <Label htmlFor="svc-notes">Notes</Label>
                    <Textarea id="svc-notes" value={formData.notes}
                      onChange={(e) =>
                        handleInputChange("notes", e.target.value)
                      } disabled={isLoading} placeholder="Any additional details or requests" rows={3} className="focus-visible:ring-primary" />
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