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
const ADDRESS = "4814 Old National Hwy , Atlanta, GA 30337";
// const YELP_URL = "https://www.yelp.com/biz/mead-green-autos-atlanta";
const MAPS_URL = "https://www.google.com/maps/dir/?api=1&destination=3535+Peachtree+Rd+Space+520+Ste+234+Atlanta+GA+30326";

const featuredVehicles = vehicles.slice(0, 6);


const trustSignals = [
  { icon: MapPin, title: "ATL Airport Focus", description: "Convenient pickup and drop-off near Hartsfield-Jackson International Airport." },
  { icon: Shield, title: "Professional Operations", description: "Licensed, insured, and operated to the highest standards of professionalism." },
  { icon: FileCheck, title: "Clear Policies", description: "Transparent pricing, deposits, and terms — no hidden fees, no surprises." },
  { icon: Car, title: "Reliable Vehicles", description: "Every vehicle is meticulously maintained and inspected before each rental." },
  { icon: Phone, title: "Responsive Support", description: "Timely communication and dedicated assistance throughout your rental." },
  { icon: Clock, title: "Flexible Rentals", description: "Short-term, long-term, and corporate options tailored to your schedule." },
];

const steps = [
  { number: "01", title: "Choose Your Service", description: "Select from airport service, daily rental, long-term, corporate, or concierge arrangements." },
  { number: "02", title: "Submit a Request", description: "Complete our service request form with your details, preferences, and dates." },
  { number: "03", title: "Confirm & Pickup", description: "We confirm availability, finalize details, and schedule your pickup." },
];

const rentalRequirements = [
  { icon: CreditCard, title: "Deposit", description: "$300–$750 refundable deposit depending on vehicle class." },
  { icon: ShieldCheck, title: "Insurance", description: "Full coverage auto insurance required for all rentals." },
  { icon: UserCheck, title: "ID Verification", description: "Valid driver's license and identity verification required." },
];

const testimonials = [
  { name: "Michael T.", text: "Exceptional service from start to finish. The vehicle was immaculate and the airport pickup was seamless.", rating: 5 },
  { name: "Sarah K.", text: "Professional, reliable, and premium quality. Exactly what you want when traveling for business in Atlanta.", rating: 5 },
  { name: "David R.", text: "The long-term rental arrangement was perfect for my corporate relocation. Outstanding communication throughout.", rating: 5 },
  { name: "James L.", text: "Best rental experience I've had. The car was spotless and they were flexible with my schedule. Highly recommend.", rating: 5 },
  { name: "Priya M.", text: "Smooth booking process and the vehicle exceeded expectations. A true concierge-level experience.", rating: 5 },
  { name: "Marcus W.", text: "Used them for airport service three times this year. Consistent, punctual, and always professional.", rating: 5 },
  { name: "Angela B.", text: "The Genesis G80 was pristine. Interior was immaculate. Will absolutely be using Mead Green again.", rating: 5 },
  { name: "Thomas H.", text: "Corporate rental for a two-week engagement in Atlanta — flawless. Vehicle ready exactly when needed.", rating: 5 },
  { name: "Keisha J.", text: "Exceeded every expectation. The communication was prompt and the car was in showroom condition.", rating: 5 },
  { name: "Raj P.", text: "Picked up a BMW 7 Series for client meetings. The car made the right impression. Great experience.", rating: 5 },
  { name: "Lauren C.", text: "The concierge arrangement was handled with zero friction. They thought of everything. Five stars.", rating: 5 },
  { name: "Derek A.", text: "Quick response, no hidden fees, and a luxury vehicle waiting for me at the airport. Perfect.", rating: 5 },
  { name: "Nicole F.", text: "Incredibly smooth process. The Range Rover was stunning and the service matched it perfectly.", rating: 5 },
  { name: "Ethan G.", text: "Long-term rental for a relocation project. Pricing was fair and communication was always fast.", rating: 5 },
  { name: "Simone V.", text: "I rely on Mead Green Autos for every Atlanta visit. The consistency of service is unmatched.", rating: 5 },
  { name: "Christopher D.", text: "The Mercedes S-Class was exactly as described — immaculate and refined. Could not ask for more.", rating: 5 },
];

function TestimonialMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
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
              <p className="text-[10px] text-muted-foreground/60 mt-0.5">Verified Turo Guest</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 0.5) {
        setFading(true);
      }
    };
    const handleLoop = () => {
      setFading(false);
    };
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("seeked", handleLoop);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("seeked", handleLoop);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "brightness(0.70) saturate(0.90) hue-rotate(-5deg)" }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      {/* Crossfade overlay to hide loop reset */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: "hsl(var(--secondary))",
          opacity: fading ? 1 : 0,
          transition: fading ? "opacity 0.4s ease-in" : "opacity 0.4s ease-out",
        }}
      />
    </>
  );
}

export default function Index() {
  return (
    <>
      {/* Hero — VIDEO ONLY, no poster, no background image */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-secondary">
        <HeroVideo />
        <div className="absolute inset-0 bg-secondary/55" />
        <div className="relative z-10 container text-center">
          <FadeIn>
            <h1 className="mx-auto w-full text-center font-serif text-[clamp(1.5rem,8vw,3.1rem)] font-semibold leading-tight text-primary-foreground">
              Premium Car Rentals in Atlanta
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mx-auto mt-5 max-w-md text-white leading-relaxed text-primary-foreground/75 font-sans">
              Luxury vehicles across Atlanta — and the most convenient way to rent at Atlanta Airport.
            </p>
          </FadeIn>


        </div>
      </section>


      {/* Trust strip */}
      <div className="border-b border-border bg-card">
        <div className="container flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3 text-[13.5px] font-sans tracking-wide text-muted-foreground">
          <span>Open 24/7</span>
          <span className="hidden sm:inline text-border">|</span>
          <span>Atlanta, GA 30337</span>
          <span className="hidden sm:inline text-border">|</span>
          <span>4814 Old National Hwy</span>
          <span className="hidden sm:inline text-border">|</span>
          <a href="tel:+14708176427" className="hover:text-primary transition-colors duration-150">(470) 817-6427</a>
        </div>
      </div>

      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <FadeIn>
            {/* Flex container: Stacks on mobile, side-by-side on medium screens and up */}
            <div className="flex flex-col md:flex-row items-center gap-10">

              {/* Left Side: Text Content */}
              <div className="w-full md:w-1/2 text-left">
                <h2 className="font-serif text-3xl text-gold font-semibold md:text-4xl">
                  WELCOME TO MEAD GREEN AUTOS
                </h2>

                <div className="mt-6 space-y-4 text-sm leading-relaxed text-white max-w-prose">
                  <p className="font-medium">
                    At Mead Green Autos, we believe renting a premium vehicle should be as effortless as it is exceptional.
                  </p>
                  <p>
                    Our carefully curated fleet of luxury vehicles is available throughout Atlanta, with seamless pickup and return options at Hartsfield-Jackson Atlanta International Airport for those flying into the city. We also offer convenient vehicle delivery across the Atlanta area, ensuring your car is ready wherever you need it.
                  </p>
                  <p>
                    Each vehicle is meticulously maintained and presented in impeccable condition - because convenience, peace of mind, and the thrill of driving something remarkable should always come standard.
                  </p>
                  <p>
                    Our team is happy to accommodate special requests and provide concierge-style support, making your experience as smooth and personalized as possible.
                  </p>
                  <p>
                    Whether you’re visiting Atlanta, traveling for business, or simply indulging in a memorable weekend drive, Mead Green Autos delivers a refined rental experience from start to finish.
                  </p>
                </div>
              </div>

          
       {/* Right Side: Image */}
<div className="w-full md:w-1/2 flex justify-center">
  <div className="aspect-square w-full max-w-md overflow-hidden rounded-lg shadow-2xl">
    <img
      src="/vehicles/COVER-IMAGE-TURO-2022-BMW-X6.png"
      alt="BMW"
      className="h-full w-full object-cover"
    />
  </div>
</div>

            </div>
          </FadeIn>
        </div>
      </section>
      {/* Testimonials — auto-scroll marquee */}
      <section className="py-10 md:py-14 overflow-hidden">
        <div className="container mb-10">
          <FadeIn>
            <div className="text-center">
              <h2 className="font-serif text-3xl font-semibold text-gold md:text-4xl">PROVEN BY HUNDREDS OF FIVE-STAR TRIPS</h2>
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
        <div className="container">
          <FadeIn>
            <div className="text-center">
              <h2 className="font-serif text-gold text-3xl font-semibold md:text-4xl">Our Inventory</h2>
              {/* <p className="mx-auto mt-3 max-w-lg text-sm text-white">
                Explore our selection of premium vehicles, each maintained to the highest
              </p> */}
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
                <Button variant="gold" size="lg">View Full Inventory</Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-stone py-20 md:py-28">
        <div className="container">
          <FadeIn>
            <div className="text-center">
              <h2 className="font-serif text-gold text-3xl font-semibold md:text-4xl">How It Works</h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">A straightforward process designed for your convenience.</p>
            </div>
          </FadeIn>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <FadeIn key={step.number} delay={i * 0.1}>
                <div className="text-center">
                  <span className="font-serif text-3xl font-semibold text-gold">{step.number}</span>
                  <h3 className="mt-3 font-serif text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

     {/* Rental Requirements */}
<section className="py-20 md:py-28">
  <div className="container">
    <FadeIn>
      <div className="text-center">
        <h2 className="font-serif text-3xl text-gold font-semibold md:text-4xl">Rental Requirements</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-white">Everything you need to know before booking.</p>
      </div>
    </FadeIn>
    
    {/* FIX: Changed grid-cols to match exactly 3 cards, added justify-center */}
    <div className="mt-14 grid gap-8 sm:grid-cols-1 md:grid-cols-3 justify-center">
      {rentalRequirements.map((req, i) => (
        <FadeIn key={req.title} delay={i * 0.05}>
          <div className="rounded border border-border bg-card p-6 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-sm bg-primary/10">
              <req.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mt-4 font-serif text-base font-semibold">{req.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{req.description}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  </div>
</section>

      
      {/* Why Mead Green Autos — with cinematic car background */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Cinematic background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80')",
            filter: "brightness(0.25) saturate(0.7) hue-rotate(-10deg)",
          }}
        />
        <div className="absolute inset-0 bg-secondary/80" />
        <div className="container relative z-10">
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
                    <h3 className="font-serif text-base font-semibold text-primary-foreground">{signal.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-primary-foreground/60">{signal.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — auto-scroll marquee */}
      {/* <section className="py-20 md:py-28 overflow-hidden">
        <div className="container mb-10">
          <FadeIn>
            <div className="text-center">
              <h2 className="font-serif text-3xl font-semibold text-white md:text-4xl">What Our Clients Say</h2>
              <p className="mx-auto mt-3 text-white max-w-md text-sm text-muted-foreground">
                Consistently rated 5 stars by verified Turo guests.
              </p>
            </div>
          </FadeIn>
        </div>
        <TestimonialMarquee />
      </section> */}


      {/* Location */}
      <section className="bg-stone py-20 md:py-28">
        <div className="container py-7 md:py-10">
          <FadeIn>
            <div className="mx-auto max-w-3xl rounded border border-border bg-card p-6 md:p-8">
              <div className="text-center">
                <h2 className="font-serif text-gold text-3xl font-semibold md:text-4xl">Trusted in Atlanta</h2>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  We provide flexible, all-day rentals with a selection of well-maintained
                  vehicles tailored to drivers in Atlanta. We take pride in
                  top-notch service and consistently earn 5-star ratings on Turo. Let us
                  get you on the road with confidence.
                </p>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-xs leading-relaxed">{ADDRESS}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary shrink-0" />
                  Open 24 hours, 7 days
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <a href="tel:+14708176427" className="hover:text-primary transition-colors">{PHONE}</a>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="premiumOutline" size="sm">Get Directions</Button>
                </a>

              </div>
            </div>
          </FadeIn>
        </div>

        <div className="container">
          <FadeIn>
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <h2 className="font-serif text-3xl font-semibold md:text-4xl text-gold">Service Area</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Based in Atlanta, with a focus on Hartsfield-Jackson Atlanta
                  International Airport (ATL). We provide convenient pickup and drop-off
                  for travelers arriving or departing through the world's busiest airport.
                </p>
                <ul className="mt-6 space-y-3">
                  {/* <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    {ADDRESS}
                  </li> */}
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    Hartsfield-Jackson Atlanta International Airport (ATL)
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Car className="h-4 w-4 text-primary shrink-0" />
                    Complimentary airport meet and greet available
                  </li>
                </ul>
              </div>
              {/* Premium framed map container */}
              <div className="relative">
                <div
                  className="aspect-[4/3] overflow-hidden"
                  style={{
                    borderRadius: "1.25rem 0.5rem 1.25rem 0.5rem",
                    border: "1.5px solid hsl(var(--primary) / 0.25)",
                    boxShadow: "0 4px 32px hsl(var(--primary) / 0.08), inset 0 0 0 1px hsl(var(--gold) / 0.10)",
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.5!2d-84.3622!3d33.8467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s3535+Peachtree+Rd+Atlanta+GA+30326!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
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



      {/* <section id="faqs" className="scroll-mt-20">
        <FAQSection />
      </section> */}




      {/* Floating Call Button */}
      <a
        href="tel:+14708176427"
        className="fixed bottom-6 right-6 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-200 hover:shadow-xl hover:shadow-primary/40 hover:scale-105"
        aria-label="Call Mead Green Autos"
        style={{ boxShadow: "0 4px 20px hsl(var(--primary) / 0.35)" }}
      >
        <Phone className="h-5 w-5" />
      </a>
    </>
  );
}
