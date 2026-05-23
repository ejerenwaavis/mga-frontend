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
  const vehicleTitle = vehicle
    ? vehicle.name.includes(vehicle.year.toString())
      ? vehicle.name
      : `${vehicle.year} ${vehicle.name}`
    : "Vehicle Details";
  // const [selectedImage, setSelectedImage] = useState(0);

  useSEO({
    title: vehicle
      ? `${vehicleTitle} Rental in Atlanta | Mead Green Autos`
      : "Vehicle Details | Mead Green Autos",
    description: vehicle
      ? `Rent the ${vehicleTitle} in Atlanta. ${vehicle.highlight}. From $${vehicle.pricePerDay}/day. Airport-ready, insured, 24/7 availability.`
      : "Premium vehicle rental in Atlanta, GA.",
    canonical: vehicle
      ? `https://meadgreenautos.com/fleet/${vehicle.id}`
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



  const gallerySlots = [
    { label: "Cover Image", key: "Cover Image", fallback: "Cover Image" },
    { label: "Front 3/4", key: "Front 3/4", fallback: "Exterior — Front" },
    { label: "Rear 3/4", key: "Rear 3/4", fallback: "Exterior — Rear" },
    { label: "Wheels", key: "Wheels", fallback: "Exterior — Wheel" },
    { label: "Dashboard", key: "Dashboard", fallback: "Interior — Dashboard" },
    { label: "Front Seats", key: "Front Seats", fallback: "Interior — Rear-Seats" },
  ];

  const [selectedSlot, setSelectedSlot] = useState(gallerySlots[0]);
  const rawDisplay = carImages[selectedSlot.key] ?? carImages[selectedSlot.fallback];


  const displayImage = rawDisplay
    ? getOptimizedImageUrl(rawDisplay, "display")
    : undefined;

  return (
    <>
      {/* Back to Fleet button - reduced padding */}
      <section className="pt-20 md:pt-24 pb-2">
        <div className="container">
          <Link to="/fleet" className="inline-flex items-center gap-1 text-xs font-sans uppercase tracking-widest text-white hover:text-gray-300 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Fleet
          </Link>
        </div>
      </section>

      {/* Main content - reduced top padding */}
      <section className="py-6 md:py-8">
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
                    const rawSlot = carImages[slot.key] ?? carImages[slot.fallback];
                    // Use the "thumbnail" size (320px WebP) for grid slots
                    const slotImage = rawSlot
                      ? getOptimizedImageUrl(rawSlot, "thumbnail")
                      : undefined;
                    const isActive = selectedSlot.key === slot.key;

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
                {/* <h1 className="mt-1 text-white font-serif text-3xl font-semibold md:text-4xl">
                  {vehicle.year} {vehicle.name}
                </h1> */}
                <h1 className="mt-1 text-white font-serif text-3xl font-semibold md:text-4xl">
                  {vehicleTitle}
                </h1>

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
                      BOOK ON TURO
                    </Button>
                  </a>
                  <p className="text-[10px] text-white text-center">
                    BOOK DIRECT: rentals, airport services, custom delivery & corporate services
                  </p>
                </div>

                <div className="mt-6 rounded-sm border border-border/60 bg-stone p-4">
                  <h2 className="font-serif text-lg font-semibold text-[#005D36]">Overview</h2>
                  <p className="mt-3 text-sm leading-relaxed text-black">
                    {vehicle.overview}
                  </p>
                </div>

                <div className="mt-8">
                  <h2 className="font-serif text-lg font-semibold text-white">Features</h2>
                  <ul className="mt-3 grid grid-cols-2 gap-2">
                    <li key="seats" className="flex items-start gap-2 text-sm text-white">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {vehicle.seats} Seats
                    </li>
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
        </div>
      </section >
    </>
  );
}
