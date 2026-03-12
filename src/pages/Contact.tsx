import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import FadeIn from "@/components/FadeIn";
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const PHONE = "(470) 817-6427";
const EMAIL = "info@meadgreenautos.com";
const ADDRESS = "3535 Peachtree Rd Space 520 Ste 234, Buckhead, Atlanta, GA 30326";
// const YELP_URL = "https://www.yelp.com/biz/mead-green-autos-atlanta";
const MAPS_URL = "https://www.google.com/maps/dir/?api=1&destination=3535+Peachtree+Rd+Space+520+Ste+234+Atlanta+GA+30326";

export default function Contact() {
  useSEO({
    title: "Contact Mead Green Autos | 24/7 Buckhead Atlanta Car Rental",
    description: "Contact Mead Green Autos for premium car rental in Buckhead, Atlanta. Open 24 hours. Call (470) 817-6427 or send a message. Airport & corporate service available.",
    canonical: "https://green-fleet-concierge.lovable.app/contact",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="bg-stone py-16 md:py-20">
        <div className="container text-center">
          <FadeIn>
            <h1 className="font-serif text-3xl font-semibold md:text-4xl">
              Contact Us
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message"
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" variant="premium" size="lg">
                    Send Message
                  </Button>
                </form>
              )}
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="space-y-8">
                <div>
                  <h2 className="font-serif text-xl font-semibold">
                    Direct Contact
                  </h2>
                  <div className="mt-4 space-y-3">
                    <a
                      href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Phone className="h-4 w-4 text-primary" />
                      {PHONE}
                    </a>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail className="h-4 w-4 text-primary" />
                      {EMAIL}
                    </a>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      {ADDRESS}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      Open 24 hours — Monday through Sunday
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                      <Button variant="premiumOutline" size="sm">
                        Get Directions
                      </Button>
                    </a>
                    {/* <a href={YELP_URL} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                        View on Yelp
                      </Button>
                    </a> */}
                  </div>
                </div>

                {/* Compact Trust Module */}
                <div className="rounded border border-border bg-card p-6">
                  <h3 className="font-serif text-base font-semibold">
                    Trusted in Buckhead, Atlanta
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    We provide flexible, all-day rentals with a selection of
                    well-maintained vehicles tailored to drivers in Buckhead,
                    Atlanta. We take pride in top-notch service and consistently
                    earn 5-star ratings on Turo.
                  </p>
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
                    title="Mead Green Autos — Buckhead, Atlanta"
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
