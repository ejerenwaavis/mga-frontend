import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import FadeIn from "@/components/FadeIn";
import { CreditCard, ShieldCheck, Gauge, UserCheck } from "lucide-react";

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

  if (submitted) {
    return (
      <section className="py-20 md:py-28">
        <div className="container max-w-lg text-center">
          <FadeIn>
            <h1 className="font-serif text-3xl font-semibold">Inquiry Received</h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Thank you for your interest. We review all inquiries within 24 hours and
              will contact you to finalize approval, deposit, and verification details.
            </p>
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-stone py-16 md:py-20">
        <div className="container text-center">
          <FadeIn>
            <h1 className="font-serif text-3xl font-semibold md:text-4xl">
              Private Rental Inquiry
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              Submit your inquiry below. Our team will review your request and
              respond within 24 hours to finalize your rental.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <FadeIn>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Your full name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="(404) 555-0000" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pickup">Pickup Location</Label>
                      <select
                        id="pickup"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        required
                      >
                        <option value="">Select location</option>
                        <option value="atl-airport">ATL Airport</option>
                        <option value="other">Other Location</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pickup-date">Pickup Date</Label>
                      <Input id="pickup-date" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="return-date">Return Date</Label>
                      <Input id="return-date" type="date" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicle">Desired Vehicle</Label>
                    <Input id="vehicle" placeholder="e.g., Cadillac Escalade, Any SUV" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose</Label>
                    <select
                      id="purpose"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="personal">Personal</option>
                      <option value="corporate">Corporate</option>
                      <option value="long-term">Long-Term</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea id="notes" placeholder="Any additional details or requests" rows={4} />
                  </div>

                  <p className="text-xs text-muted-foreground">
                    After submission, we will send a secure upload link for your
                    driver's license and proof of insurance.
                  </p>

                  <Button type="submit" variant="premium" size="lg">
                    Submit Inquiry
                  </Button>
                </form>
              </FadeIn>
            </div>

            {/* Requirements */}
            <div>
              <FadeIn delay={0.15}>
                <div className="rounded border border-border bg-card p-6">
                  <h2 className="font-serif text-lg font-semibold">
                    Requirements Summary
                  </h2>
                  <div className="mt-5 space-y-5">
                    {requirements.map((r) => (
                      <div key={r.title} className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-primary/10">
                          <r.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold">{r.title}</h3>
                          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                            {r.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
