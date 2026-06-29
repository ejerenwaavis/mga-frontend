import { Link } from "react-router-dom";
import { Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/hooks/store/useBookingModal";
import type { Vehicle } from "@/data/vehicles";
import { TURO_URL, vehicles } from "@/data/vehicles";
import { vehicleImages, getOptimizedImageUrl } from "@/data/vehicleImages";
import { recordTuroClick } from "@/services/mutations";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  // Check for database images first
  const dbImage = vehicle.images && vehicle.images.length > 0 ? vehicle.images[0].url : undefined;
  // Try to find matching local vehicle to get fallback images if DB has none
  const matchingLocalVehicle = vehicle.id ? vehicle : vehicles.find(v => v.name === vehicle.name && v.year === vehicle.year);
  const image = matchingLocalVehicle ? vehicleImages[matchingLocalVehicle.id]?.[`Cover Image`] : undefined;

  const displayImage = dbImage 
    ? dbImage 
    : image
      ? getOptimizedImageUrl(image, "display")
      : undefined;


  return (
    <div className="group flex flex-col overflow-hidden rounded border border-border bg-card transition-all duration-200 hover:shadow-xl hover:shadow-foreground/5 hover:-translate-y-1.5 hover:border-border/80">
      <Link to={`/fleet/${vehicle._id || vehicle.id}`} className="relative aspect-[16/10] overflow-hidden bg-muted">
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
          <Button 
            variant="premium" 
            size="sm" 
            className="flex-1"
            onClick={() => useBookingModal.getState().openModal(vehicle)}
          >
            BOOK DIRECT
          </Button>

          <a 
            href={vehicle.turoURL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-1"
            onClick={() => recordTuroClick({ vehicleId: vehicle._id, source: "VehicleCard" })}
          >
            <Button variant="gold" size="sm" className="w-full text-xs text-white hover:text-foreground">
              BOOK ON TURO
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
