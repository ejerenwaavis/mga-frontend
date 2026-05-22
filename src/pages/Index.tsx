import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import VehicleCard from "@/components/VehicleCard";
import FadeIn from "@/components/FadeIn";
import CTAGroup from "@/components/CTAGroup";
import { vehicles } from "@/data/vehicles";
import { Shield, MapPin, FileCheck, Car, Phone, Clock, CreditCard, ShieldCheck, Gauge, UserCheck, Star, ExternalLink } from "lucide-react";
import heroVideo from "@/assets/hero-video-1.mp4";
// import FAQSection from "@/components/Faq";
const PHONE = "(470) 817-6427";
const ADDRESS = "4814 Old National Hwy, Atlanta, GA 30337";
// const YELP_URL = "https://www.yelp.com/biz/mead-green-autos-atlanta";
const MAPS_URL = "https://www.google.com/maps/dir/?api=1&destination=4814+Old+National+Hwy,+Atlanta,+GA+30337";

const featuredVehicles = vehicles.slice(0, 6);


const trustSignals = [
  { 
    icon: MapPin, 
    title: "Airport-first convenience", 
    description: "Built around Hartsfield–Jackson Atlanta International Airport with seamless pickup, drop-off, and terminal coordination." 
  },
  { 
    icon: Shield, 
    title: "Premium fleet, carefully selected", 
    description: "Luxury and premium vehicles chosen for comfort, style, and reliability." 
  },
  { 
    icon: FileCheck, 
    title: "Professionally managed", 
    description: "Clear policies, structured operations, and a consistent rental experience from booking to return." 
  },
  { 
    icon: Car, 
    title: "Cleaned and properly prepared", 
    description: "Every vehicle is cleaned, inspected, and prepared before every trip." 
  },
  { 
    icon: Phone, 
    title: "Direct, responsive support", 
    description: "Fast communication and reliable support throughout your rental." 
  },
  { 
    icon: Clock, 
    title: "Flexible rental options", 
    description: "Airport pickup, local delivery, and rental terms built around your schedule." 
  },
];

const steps = [
  { 
    number: "01", 
    title: "Choose your service", 
    description: "Select airport pickup, local delivery, or a custom rental tailored to your needs." 
  },
  { 
    number: "02", 
    title: "Submit your request", 
    description: "Share your dates, vehicle preference, and any additional details through our booking form." 
  },
  { 
    number: "03", 
    title: "Confirm and drive", 
    description: "We finalize the details, coordinate your pickup, and have your vehicle ready when and where you need it." 
  },
];

const rentalRequirements = [
  { 
    icon: UserCheck, 
    title: "Driver eligibility", 
    description: "Valid driver’s license, identity verification, and approval required before pickup." 
  },
  { 
    icon: ShieldCheck, 
    title: "Coverage requirements", 
    description: "Valid full-coverage insurance in the renter’s name is required for every rental." 
  },
  { 
    icon: CreditCard, 
    title: "Payment and deposit", 
    description: "Matching payment method and a refundable security deposit may be required based on the vehicle." 
  },
];

const testimonials = [
  { name: "John", text: "I travel for work and exclusively rely on MGA. It’s by far the best operator I’ve found in Atlanta. Anyone I recommend ends up becoming a loyal customer too.", rating: 5 },
  { name: "Kevin", text: "Pickup and drop-off at Hartsfield-Jackson Atlanta International Airport was smooth and easy. The car was super clean, well maintained, and exactly as described. Will definitely rent again.", rating: 5 },
  { name: "Nadine", text: "This was the best car rental experience I’ve ever had. Pickup and drop-off were flawless, communication was great, and everything was incredibly convenient. Will absolutely rent again.", rating: 5 },
  { name: "Chener", text: "The car was spotless and drove like a dream. Pickup and drop-off were seamless, and communication was flawless. A truly stress-free, luxury experience.", rating: 5 },
  { name: "GradyEve", text: "Spotless car, great service, and attention to every detail. One of the most pleasant rental experiences I’ve had.", rating: 5 },
  { name: "Taisha", text: "My first time using Turo and I’ll definitely be using it again with Mead Green Autos. Everything was smooth, detailed, and easy. Customer service is top tier.", rating: 5 },
  { name: "Kory", text: "Some people just rent cars, others do this professionally. This was clearly the latter. Vehicle was in perfect condition and the experience was seamless.", rating: 5 },
  { name: "Jane", text: "Excellent communication, clean car, and clear instructions made pickup and drop-off seamless. I’ll definitely use them again when visiting Atlanta.", rating: 5 },
  { name: "Gera", text: "Clear instructions, fast response time, and seamless pickup right from baggage claim. Easily one of the most convenient rental experiences I’ve had.", rating: 5 },
  { name: "William", text: "Exceptional experience from start to finish. The car was spotless, communication was professional, and everything was smooth and stress-free. Highly recommend.", rating: 5 },
  { name: "Diamond", text: "Last-minute trip accommodated with smooth check-in and a clean, great-driving car. Host was on time, flexible, and very helpful. Would definitely rent again.", rating: 5 },
  { name: "Kathlyn", text: "Second time renting with MGA. Always easy to communicate with and very accommodating. The car was beautiful and drove smoothly. Can’t wait to book again.", rating: 5 },
  { name: "Christian", text: "Beautiful car and one of the smoothest rides I’ve had. Pickup was easy and service was excellent from start to finish. Definitely making this my regular.", rating: 5 },
  { name: "Jennifer", text: "Amazing host and car. Very professional, great communication, and a smooth, quiet ride. Will definitely be renting again.", rating: 5 },
  { name: "Shivom", text: "Extremely clean and well-maintained car. Host was helpful, responsive, and easy to coordinate with. Would definitely recommend and rent again.", rating: 5 },
  { name: "Jasmine", text: "5-star experience. The car was clean, ran smoothly, and was delivered ahead of time. Host was very communicative and accommodating. Will definitely book again.", rating: 5 },
];

function TestimonialMarquee() {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;
    const speed = 0.5;
    const animate = () => {
      if (!pausedRef.current) {
        posRef.current += speed;
        if (posRef.current >= half) posRef.current = 0;
        if (track) track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  const allCards = [...testimonials, ...testimonials];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div ref={trackRef} className="flex gap-5" style={{ width: "max-content" }}>
        {allCards.map((t, i) => (
          <div key={i} className="w-72 shrink-0 rounded border border-border bg-card p-5 transition-shadow duration-200 hover:shadow-md">
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="h-3.5 w-3.5 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground italic">"{t.text}"</p>
            <div className="mt-4 border-t border-border pt-3">
              <p className="text-xs font-sans font-semibold uppercase tracking-widest text-foreground">{t.name}</p>
              <p className="text-[10px] text-muted-foreground/60 mt-0.5">Verified Guest</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-secondary">
        <img
          src="/vehicles/MGA_HERO.jpg"
          alt="Mead Green Autos hero background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-secondary/55" />
        <div className="relative z-10 container text-center">
          <FadeIn>
            <h1 className="mx-auto w-full text-center font-serif text-[clamp(1.5rem,8vw,3.1rem)] font-semibold leading-tight text-primary-foreground">
              Premium Car Rentals in Atlanta
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mx-auto mt-5 max-w-md text-white leading-relaxed text-primary-foreground/75 font-sans">
              Luxury vehicles across Atlanta — and the most convenient way to
              rent at Atlanta Airport.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Trust strip */}
      <div className="border-b border-border bg-card">
        <div className="container px-4 md:px-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3 text-[13.5px] font-sans tracking-wide text-muted-foreground">
          <span>Trusted by hundreds of 5-star trips</span>
          <span className="hidden sm:inline text-border">|</span>

          <span>Seamless airport pickup</span>
          <span className="hidden sm:inline text-border">|</span>

          <span>Flexible delivery across Atlanta</span>
          <span className="hidden sm:inline text-border">|</span>

          <a
            href="tel:+14708176427"
            className="hover:text-primary transition-colors duration-150"
          >
            (470) 817-6427
          </a>
          <span className="hidden sm:inline text-border">|</span>

          <span>4814 Old National Hwy</span>
        </div>
      </div>

      {/* Welcome Section - Fixed to match Inventory boundaries */}
      <section className="py-8 md:py-16">
        <div className="container px-4 md:px-6">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Left Side: Text Content */}
              <div className="w-full md:w-1/2">
                <h2 className="font-serif text-3xl text-gold font-semibold md:text-4xl">
                  Welcome to Mead Green Autos
                </h2>

                <div className="mt-6 space-y-4 text-sm leading-relaxed text-white">
                  <p>
                    At Mead Green Autos, we believe renting a premium vehicle
                    should be as effortless as it is exceptional.
                  </p>
                  <p>
                    Our carefully curated fleet of luxury vehicles is available
                    throughout Atlanta, with seamless pickup and return options
                    at Hartsfield-Jackson Atlanta International Airport for
                    those flying into the city. We also offer convenient vehicle
                    delivery across the Atlanta area, ensuring your car is ready
                    wherever you need it.
                  </p>
                  <p>
                    Each vehicle is meticulously maintained and presented in
                    impeccable condition - because convenience, peace of mind,
                    and the thrill of driving something remarkable should always
                    come standard.
                  </p>
                  <p>
                    Our team is happy to accommodate special requests and
                    provide concierge-style support, making your experience as
                    smooth and personalized as possible.
                  </p>
                  <p>
                    Whether you're visiting Atlanta, traveling for business, or
                    simply indulging in a memorable weekend drive, Mead Green
                    Autos delivers a refined rental experience from start to
                    finish.
                  </p>
                </div>
              </div>

              {/* Right Side: Image */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                <div className="w-full h-full aspect-[16/9] rounded-lg shadow-2xl overflow-hidden">
                  <img
                    src="/vehicles/WELCOME_TO_MGA.jpg"
                    alt="Welcome to Mead Green Autos"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10 md:py-14 overflow-hidden">
        <div className="container px-4 md:px-6 mb-10">
          <FadeIn>
            <div className="text-center">
              <h2 className="font-serif text-3xl font-semibold text-gold md:text-4xl">
                Trusted by Hundreds of Five-Star Trips
              </h2>
              <p className="mx-auto mt-3 text-white max-w-md text-sm text-muted-foreground">
                What Our Clients Say
              </p>
            </div>
          </FadeIn>
        </div>
        <TestimonialMarquee />
      </section>

      {/* Featured Fleet */}
      <section className="py-10 md:py-14">
        <div className="container px-4 md:px-6">
          <FadeIn>
            <div className="text-center">
              <h2 className="font-serif text-gold text-3xl font-semibold md:text-4xl">
                Our Inventory
              </h2>
            </div>
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredVehicles.map((vehicle, i) => (
              <FadeIn key={vehicle.id} delay={i * 0.05}>
                <VehicleCard vehicle={vehicle} />
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="mt-12 text-center">
              <Link to="/fleet">
                <Button variant="gold" size="lg">
                  View Full Inventory
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-stone py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <FadeIn>
            <div className="text-center">
              <h2 className="font-serif text-gold text-3xl font-semibold md:text-4xl">
                How It Works
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
                Simple, refined, and built for convenience.
              </p>
            </div>
          </FadeIn>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <FadeIn key={step.number} delay={i * 0.1}>
                <div className="text-center">
                  <span className="font-serif text-3xl font-semibold text-gold">
                    {step.number}
                  </span>
                  <h3 className="mt-3 font-serif text-xl font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Rental Requirements */}
      <section className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <FadeIn>
            <div className="text-center">
              <h2 className="font-serif text-3xl text-gold font-semibold md:text-4xl">
                Rental Requirements
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-white">
                Clear guidelines to ensure a smooth and seamless experience.
              </p>
            </div>
          </FadeIn>

          <div className="mt-14 grid gap-8 sm:grid-cols-1 md:grid-cols-3 justify-center">
            {rentalRequirements.map((req, i) => (
              <FadeIn key={req.title} delay={i * 0.05}>
                <div className="rounded border border-border bg-card p-6 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-sm bg-primary/10">
                    <req.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 font-serif text-base font-semibold">
                    {req.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {req.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Mead Green Autos */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80')",
            filter: "brightness(0.25) saturate(0.7) hue-rotate(-10deg)",
          }}
        />
        <div className="absolute inset-0 bg-secondary/80" />
        <div className="container px-4 md:px-6 relative z-10">
          <FadeIn>
            <div className="text-center">
              <h2 className="font-serif text-3xl font-semibold md:text-4xl text-gold">
                Why MGA
              </h2>
            </div>
          </FadeIn>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {trustSignals.map((signal, i) => (
              <FadeIn key={signal.title} delay={i * 0.05}>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary-foreground/10">
                    <signal.icon className="h-5 w-5 text-primary-foreground/80" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-primary-foreground">
                      {signal.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-primary-foreground/60">
                      {signal.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-stone py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <FadeIn>
            <div className="grid gap-12 md:grid-cols-2 items-stretch">
              {/* Trusted in Atlanta Card */}
              <div className="rounded border border-border bg-card p-6 md:p-8 flex flex-col justify-center">
                <div className="text-center">
                  <h2 className="font-serif text-gold text-3xl font-semibold md:text-4xl">
                    Trusted Across Atlanta
                  </h2>
                  <p className="mx-auto mt-4 text-sm leading-relaxed text-muted-foreground">
                    A better way to rent in Atlanta With airport-first
                    operations, a premium fleet, and a hands-on approach to
                    service, MGA delivers a smoother, more reliable rental
                    experience.
                  </p>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-xs leading-relaxed">{ADDRESS}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary shrink-0" />
                    Open daily by reservation
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 text-primary shrink-0" />
                    <a
                      href="tel:+14708176427"
                      className="hover:text-primary transition-colors"
                    >
                      {PHONE}
                    </a>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                    <Button variant="premiumOutline" size="sm">
                      Get Directions
                    </Button>
                  </a>
                </div>
              </div>

              {/* Map Card */}
              <div className="relative flex flex-col justify-center">
                <div
                  className="aspect-[4/3] overflow-hidden w-full"
                  style={{
                    borderRadius: "1.25rem 0.5rem 1.25rem 0.5rem",
                    border: "1.5px solid hsl(var(--primary) / 0.25)",
                    boxShadow:
                      "0 4px 32px hsl(var(--primary) / 0.08), inset 0 0 0 1px hsl(var(--gold) / 0.10)",
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.2711608896607!2d-84.4736799!3d33.6242105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f4e30394d673e3%3A0xa2f5da71d3f0eff1!2s4814%20Old%20National%20Hwy%2C%20Atlanta%2C%20GA%2030337%2C%20USA!5e0!3m2!1sen!2sng!4v1776526361183!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mead Green Autos — Atlanta"
                  />
                </div>
                <div className="absolute -top-px -left-px h-5 w-5 rounded-tl-xl border-t-2 border-l-2 border-primary/40 pointer-events-none" />
                <div className="absolute -bottom-px -right-px h-5 w-5 rounded-br-xl border-b-2 border-r-2 border-gold/30 pointer-events-none" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Floating Call Button */}
      <a
        href="tel:+14708176427"
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-200 hover:shadow-xl hover:shadow-primary/40 hover:scale-105"
        aria-label="Call Mead Green Autos"
        style={{ boxShadow: "0 4px 20px hsl(var(--primary) / 0.35)" }}
      >
        <Phone className="h-6 w-6" />
      </a>
    </>
  );
}
