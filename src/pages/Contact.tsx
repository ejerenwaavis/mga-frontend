import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import FadeIn from "@/components/FadeIn";
import { vehicles } from "@/data/vehicles";
import { Plane, Car, Clock, Building2, Sparkles, X, Phone, Mail, MapPin } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { submitRequest } from "@/services/mutations";
import { CreateRequestPayload } from "@/lib/types";
import heic2any from "heic2any";
import Swal from "sweetalert2";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_ADDRESS, MAPS_URL } from "@/data/contact";
import { countryCodes } from "@/lib/countryCodes";

export default function Contact() {
  useSEO({
    title: "Contact Mead Green Autos | Atlanta Car Rental",
    description: "Contact Mead Green Autos for premium car rental in Atlanta. Open 7 days a week. Call (470) 817-6427 or send a message.",
    canonical: "https://meadgreenautos.com/contact",
  });
  const [submitted, setSubmitted] = useState(false);

  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    countryCode: string;
    notes?: string;
  }

  const initialFormState: FormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+1",
    notes: ""
  };


  const [formData, setFormData] = useState<FormData>(initialFormState);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setSubmitted(false);
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };





  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const fullPhone = `${formData.countryCode} ${formData.phone}`;
      const requestDetails: CreateRequestPayload = {
        ...formData,
        serviceType: "support",
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        phone: fullPhone.replace(/[^\d+]/g, "")
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
            src="https://res.cloudinary.com/di1mj1zqc/image/upload/v1783287256/mga/vehicles/contact-hero-image.webp"
            alt="Contact Us"
            className="h-full w-full object-cover object-center"
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

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-stretch">
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
                        CONTACT US
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Complete the form below and we'll review your request, confirm availability, and contact you shortly.
                      </p>
                      <p className="mt-2 text-sm font-medium text-primary">
                        Questions before booking? Call (470) 817-6427 or email us—we're happy to help.
                      </p>
                    </div>
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
                          required
                          className="text-white placeholder:text-white/40 focus-visible:ring-primary"
                        />
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
                          required
                          className="text-white placeholder:text-white/40 focus-visible:ring-primary"
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
                          className="text-white placeholder:text-white/40 focus-visible:ring-primary"
                        />
                      </div>

                      <div className="space-y-2">
                      <Label htmlFor="svc-phone">Phone</Label>
                      <div className="flex gap-2">
                        <select
                          value={formData.countryCode}
                          onChange={(e) => handleInputChange("countryCode", e.target.value)}
                          disabled={isLoading}
                          className="flex h-10 w-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-white"
                        >
                          {countryCodes.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.code} {country.label}
                            </option>
                          ))}
                        </select>
                        <Input
                          id="svc-phone"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          disabled={isLoading}
                          type="tel"
                          placeholder="555-0000"
                          required
                          minLength={5}
                          pattern="^[0-9\-\s\(\)]+$"
                          title="Please enter a valid phone number with at least 5 digits"
                          className="flex-1 text-white placeholder:text-white/40 focus-visible:ring-primary"
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
                        className="text-white placeholder:text-white/40 focus-visible:ring-primary"
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

            <FadeIn delay={0.15}>
              <div className="space-y-8 h-full flex flex-col">
                <div>
                  <h2 className="font-serif text-xl text-white font-semibold">
                    Direct Contact
                  </h2>
                  <div className="mt-4 space-y-3">
                    <a
                      href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`}
                      className="flex items-center gap-3 text-sm text-white hover:text-gold transition-colors"
                    >
                      <Phone className="h-4 w-4 text-primary" />
                      {CONTACT_PHONE}
                    </a>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="flex items-center gap-3 text-sm text-white hover:text-gold transition-colors"
                    >
                      <Mail className="h-4 w-4 text-primary" />
                      {CONTACT_EMAIL}
                    </a>
                    <div className="flex items-center gap-3 text-sm text-white">
                      <MapPin className="h-4 w-4 text-primary" />
                      {CONTACT_ADDRESS}
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

                <div className="flex-1 min-h-64 w-full overflow-hidden rounded border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.2711608896607!2d-84.4736799!3d33.6242105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f4e30394d673e3%3A0xa2f5da71d3f0eff1!2s4814%20Old%20National%20Hwy%2C%20Atlanta%2C%20GA%3030337%2C%20USA!5e0!3m2!1sen!2sng!4v1776526361183!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mead Green Autos — Atlanta"
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
