import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import FadeIn from "@/components/FadeIn";
import { CreditCard, ShieldCheck, UserCheck } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

export default function PrivateInquiry() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const requirements = [
    { icon: CreditCard, title: "Deposit", text: "A refundable security deposit is required prior to pickup. Amount varies by vehicle." },
    { icon: UserCheck, title: "ID Verification", text: "A valid driver's license and identity verification are required for all renters." },
    { icon: ShieldCheck, title: "Insurance", text: "Full coverage auto insurance is required. Proof of insurance must be provided before pickup." },
  ];

  useSEO({
    title: "Private Rental Inquiry | Mead Green Autos — Atlanta Car Rental",
    description: "Submit a private rental inquiry for premium vehicles in Atlanta. Get personalized rates, flexible terms, and direct approval.",
    canonical: "https://meadgreenautos.com/private-inquiry",
  });

  if (submitted) {
    return (
      <>
        {/* Hero Section */}
        <section className="pt-24 pb-8 md:pt-32 md:pb-12">
          <div className="container text-center">
            <FadeIn>
              <h1 className="font-serif text-3xl font-semibold text-white md:text-4xl">
                Inquiry Received
              </h1>
              <p className="mx-auto mt-3 max-w-lg text-sm text-gray-300">
                Thank you for your interest. We review all inquiries within 24 hours and
                will contact you to finalize approval, deposit, and verification details.
              </p>
            </FadeIn>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="container text-center">
          <FadeIn>
            <h1 className="font-serif text-3xl font-semibold text-white md:text-4xl">
              Private Rental Inquiry
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm text-gray-300">
              Submit your inquiry below. Our team will review your request and
              respond within 24 hours to finalize your rental.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content Section with White Container */}
      <section className="pb-20 md:pb-28">
        <div className="container">
          <FadeIn>
            <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Form */}
                <div className="lg:col-span-2">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                        <Input 
                          id="name" 
                          placeholder="Your full name" 
                          required 
                          className="border-gray-200 focus:border-gray-400 placeholder:text-gray-400" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="you@example.com" 
                          required 
                          className="border-gray-200 focus:border-gray-400 placeholder:text-gray-400" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700">Phone</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          placeholder="(404) 555-0000" 
                          required 
                          className="border-gray-200 focus:border-gray-400 placeholder:text-gray-400" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pickup" className="text-gray-700">Pickup Location</Label>
                        <select
                          id="pickup"
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                          required
                        >
                          <option value="" className="text-gray-400">Select location</option>
                          <option value="atl-airport">ATL Airport</option>
                          <option value="other">Other Location</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pickup-date" className="text-gray-700">Pickup Date</Label>
                        <Input 
                          id="pickup-date" 
                          type="date" 
                          required 
                          className="border-gray-200 focus:border-gray-400 text-gray-900 [&::-webkit-calendar-picker-indicator]:opacity-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="return-date" className="text-gray-700">Return Date</Label>
                        <Input 
                          id="return-date" 
                          type="date" 
                          required 
                          className="border-gray-200 focus:border-gray-400 text-gray-900 [&::-webkit-calendar-picker-indicator]:opacity-50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vehicle" className="text-gray-700">Desired Vehicle</Label>
                      <Input 
                        id="vehicle" 
                        placeholder="e.g., Cadillac Escalade, Any SUV" 
                        className="border-gray-200 focus:border-gray-400 placeholder:text-gray-400" 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="purpose" className="text-gray-700">Purpose</Label>
                      <select
                        id="purpose"
                        className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                      >
                        <option value="personal">Personal</option>
                        <option value="corporate">Corporate</option>
                        <option value="long-term">Long-Term</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-gray-700">Additional Notes</Label>
                      <Textarea 
                        id="notes" 
                        placeholder="Any additional details or requests" 
                        rows={4} 
                        className="border-gray-200 focus:border-gray-400 placeholder:text-gray-400 resize-none" 
                      />
                    </div>

                    <p className="text-xs text-gray-500">
                      After submission, we will send a secure upload link for your
                      driver's license and proof of insurance.
                    </p>

                    <Button type="submit" className="bg-gray-900 text-white hover:bg-gray-800">
                      Submit Inquiry
                    </Button>
                  </form>
                </div>

                {/* Requirements */}
                <div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                    <h2 className="font-serif text-lg font-semibold text-gray-900">
                      Requirements Summary
                    </h2>
                    <div className="mt-5 space-y-5">
                      {requirements.map((r) => (
                        <div key={r.title} className="flex gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-gray-200">
                            <r.icon className="h-4 w-4 text-gray-700" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">{r.title}</h3>
                            <p className="mt-0.5 text-xs leading-relaxed text-gray-600">
                              {r.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
