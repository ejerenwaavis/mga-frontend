import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { vehicles, TURO_URL } from "@/data/vehicles";
// import { vehicleImages } from "@/data/vehicleImages";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/FadeIn";
import CTAGroup from "@/components/CTAGroup";
import { Tag, ArrowLeft, ShieldCheck, Gauge, CreditCard, UserCheck } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { vehicleImages, getOptimizedImageUrl } from "@/data/vehicleImages";

export default function VehicleDetails() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const vehicle = vehicles.find((v) => v.id === vehicleId);
  // const [selectedImage, setSelectedImage] = useState(0);

  useSEO({
    title: vehicle
      ? `${vehicle.year} ${vehicle.name} Rental in Atlanta | Mead Green Autos`
      : "Vehicle Details | Mead Green Autos",
    description: vehicle
      ? `Rent the ${vehicle.year} ${vehicle.name} in , Atlanta. ${vehicle.highlight}. From $${vehicle.pricePerDay}/day. Airport-ready, insured, 24/7 availability.`
      : "Premium vehicle rental in Atlanta, GA.",
    canonical: vehicle
      ? `https://green-fleet-concierge.lovable.app/fleet/${vehicle.id}`
      : undefined,
  });

  if (!vehicle) {
    return (
      <section className="py-20">
        <div className="container text-center">
          <h1 className="font-serif text-2xl font-semibold">Vehicle Not Found</h1>
          <Link to="/fleet" className="mt-4 inline-block text-sm text-primary underline">
            Return to Fleet
          </Link>
        </div>
      </section>
    );
  }

  // const carImages = vehicleImages[vehicle.id];

  const carImages = vehicleImages[vehicle.id];



  const policies = [
    { icon: CreditCard, label: "Deposit", value: vehicle.deposit },
    { icon: Gauge, label: "Mileage Allowance", value: vehicle.mileageAllowance },
    { icon: Gauge, label: "Overage Rate", value: vehicle.mileageOverage },
    { icon: ShieldCheck, label: "Insurance", value: vehicle.insuranceRequirement },
    { icon: UserCheck, label: "ID Verification", value: "Valid driver's license and identity verification required prior to pickup." },
  ];

  const gallerySlots = [
    { label: "Exterior — Front", type: "exterior" },
    { label: "Exterior — Side", type: "exterior" },
    { label: "Exterior — Rear", type: "exterior" },
    { label: "Interior — Dashboard", type: "interior" },
    { label: "Interior — Cabin", type: "interior" },
    { label: "Interior — Rear Seats", type: "interior" },
  ];

  const [selectedSlot, setSelectedSlot] = useState(gallerySlots[0]);
  // const displayImage = carImages[selectedSlot.label];
  const rawDisplay = carImages[selectedSlot.label];


  const displayImage = rawDisplay
    ? getOptimizedImageUrl(rawDisplay, "display")
    : undefined;

  return (
    <>
      <section className="bg-stone py-8">
        <div className="container">
          <Link to="/fleet" className="inline-flex items-center gap-1 text-xs font-sans uppercase tracking-widest text-white hover:text-foreground transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Fleet
          </Link>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Gallery */}
            <FadeIn>
              <div className="space-y-3">

                {/* Main display image */}
                <div className="aspect-[4/3] rounded border border-border bg-stone overflow-hidden group cursor-pointer">
                  {displayImage ? (
                    <img
                      src={displayImage}
                      alt={`${vehicle.year} ${vehicle.name} exterior — luxury rental in Atlanta, GA`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="font-serif text-xl text-white">
                        {vehicle.year} {vehicle.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Thumbnail grid */}
                <div className="grid grid-cols-3 gap-3">
                  {gallerySlots.map((slot) => {
                    const rawSlot = carImages[slot.label];
                    // Use the "thumbnail" size (320px WebP) for grid slots
                    const slotImage = rawSlot
                      ? getOptimizedImageUrl(rawSlot, "thumbnail")
                      : undefined;
                    const isActive = selectedSlot.label === slot.label;

                    return (
                      <div
                        key={slot.label}
                        onClick={() => setSelectedSlot(slot)}
                        className={`aspect-[4/3] rounded border bg-stone flex items-center justify-center overflow-hidden group cursor-pointer transition-all
              ${isActive
                            ? "border-primary ring-1 ring-primary"
                            : "border-border hover:border-primary/50"
                          }`}
                      >
                        {slotImage ? (
                          <img
                            src={slotImage}
                            alt={slot.label}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <span className="text-[10px] font-sans text-muted-foreground/30 text-center px-1">
                            {slot.label}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            </FadeIn>

            {/* Details */}
            <FadeIn delay={0.1}>
              <div>
                <span className="text-xs font-sans uppercase tracking-widest text-gold">
                  {vehicle.category}
                </span>
                <h1 className="mt-1 text-white font-serif text-3xl font-semibold md:text-4xl">
                  {vehicle.year} {vehicle.name}
                </h1>

                {/* Quick Facts strip */}
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 rounded-sm border border-border bg-stone px-4 py-3 text-xs font-sans text-muted-foreground">
                  <span><span className="font-semibold text-foreground">{vehicle.seats}</span> Seats</span>
                  <span className="text-border">·</span>
                  <span><span className="font-semibold text-">{vehicle.luggage}</span> Bags</span>
                  <span className="text-border">·</span>
                  <span>Automatic</span>
                  <span className="text-border">·</span>
                  <span>Gasoline</span>
                  <span className="text-border">·</span>
                  <span>{vehicle.category}</span>
                </div>

                <div className="mt-5 flex flex-wrap gap-6 border-b border-border pb-5">
                  <div className="flex items-center gap-2 text-sm">
                    <Tag className="h-4 w-4 text-gold" />
                    <span className="font-semibold text-white">${vehicle.pricePerDay}</span>
                    <span className="text-white">/day</span>
                  </div>
                </div>

                {/* CTAs - only 2 */}
                <div className="mt-6 flex flex-col gap-2">
                  <Link to="/services">
                    <Button variant="premium" size="lg" className="w-full text-xs text-white hover:text-foreground">
                      BOOK DIRECT
                    </Button>
                  </Link>
                  <a href={TURO_URL} target="_blank" rel="noopener noreferrer">
                    <Button variant="gold" size="sm" className="w-full text-xs text-white hover:text-foreground">
                      BOOK ON TURO (Daily rentals only)
                    </Button>
                  </a>
                  <p className="text-[10px] text-white text-center">
                    BOOK DIRECT: rentals, airport services, custom delivery & corporate services
                  </p>
                </div>

                <div className="mt-8">
                  <h2 className="font-serif text-lg font-semibold text-white">Overview</h2>
                  <p className="mt-2 text-sm leading-relaxed text-white">
                    {vehicle.overview}
                  </p>
                </div>

                {/* Why choose this vehicle */}
                <div className="mt-6 rounded-sm border border-border/60 bg-stone p-4">
                  <h2 className="text-xs font-sans font-semibold uppercase tracking-widest text-muted-foreground mb-3">Why this vehicle</h2>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      Airport-ready with meet-and-greet service available
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      Inspected and detailed before every rental
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      Flexible terms — daily, long-term, and corporate options
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <h2 className="font-serif text-lg font-semibold text-white">Features</h2>
                  <ul className="mt-3 grid grid-cols-2 gap-2">
                    {vehicle.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-white">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Policies */}
          <FadeIn>
            <div className="mt-16 rounded border border-border bg-card p-8">
              <h2 className="font-serif text-xl font-semibold">
                Policies for This Vehicle
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {policies.map((p) => (
                  <div key={p.label} className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-primary/10">
                      <p.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">{p.label}</h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {p.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Bottom CTAs */}
          <FadeIn>
            <CTAGroup className="mt-12" />
          </FadeIn>
        </div>
      </section >
    </>
  );
}
