import { Link } from "react-router-dom";
import { Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Vehicle } from "@/data/vehicles";
import { TURO_URL } from "@/data/vehicles";
import { vehicleImages, getOptimizedImageUrl } from "@/data/vehicleImages";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const image = vehicleImages[vehicle.id]?.["Cover Image"];

  const displayImage = image
    ? getOptimizedImageUrl(image, "display")
    : undefined;


  return (
    <div className="group flex flex-col overflow-hidden rounded border border-border bg-card transition-all duration-200 hover:shadow-xl hover:shadow-foreground/5 hover:-translate-y-1.5 hover:border-border/80">
      <Link to={`/fleet/${vehicle.id}`} className="relative aspect-[16/10] overflow-hidden bg-muted">
        {displayImage ? (
          <img
            src={displayImage}
            alt={`${vehicle.year} ${vehicle.name} rental in Atlanta, GA`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-stone transition-transform duration-500 group-hover:scale-[1.02]">
            <span className="font-serif text-lg text-muted-foreground/40">
              {vehicle.name}
            </span>
          </div>
        )}
        {vehicle.airportReady && (
          <span className="absolute right-3 top-3 rounded-sm bg-primary px-2 py-0.5 text-[10px] font-sans font-semibold uppercase tracking-wider text-primary-foreground">

          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-start justify-between">
          <div>
            <h3 className="font-serif text-base font-semibold text-foreground">
              {vehicle.name}
            </h3>
            {/* <span className="text-xs font-sans uppercase tracking-wider text-muted-foreground">
              {vehicle.category}
            </span> */}
          </div>
          <span className="font-serif text-lg font-semibold text-primary transition-colors duration-200 group-hover:text-gold">
            ${vehicle.pricePerDay}
            <span className="text-xs font-sans font-normal text-muted-foreground">
              /day
            </span>
          </span>
        </div>

        <div className="mt-4 flex flex-row gap-3 items-center">
          <Link to="/services" className="flex-1">
            <Button variant="premium" size="sm" className="w-full">
              BOOK DIRECT
            </Button>
          </Link>

          <a href={vehicle.turoURL} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="gold" size="sm" className="w-full text-xs text-white hover:text-foreground">
              BOOK ON TURO
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
