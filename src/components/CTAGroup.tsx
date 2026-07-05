import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TURO_URL } from "@/data/vehicles";
import { recordTuroClick } from "@/services/mutations";

interface CTAGroupProps {
  variant?: "hero" | "default" | "dark";
  showHelper?: boolean;
  className?: string;
}

export default function CTAGroup({ variant = "default", showHelper = true, className = "" }: CTAGroupProps) {
  if (variant === "hero") {
    return (
      <div className={className}>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link to="/services">
            <Button variant="hero" size="lg" className="neon-btn min-w-[200px]">
              BOOK DIRECT
            </Button>
          </Link>
          <a 
            href={TURO_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => recordTuroClick({ source: "CTAGroup-Hero" })}
          >
            <Button variant="gold" size="lg" className="neon-btn min-w-[200px]">
              BOOK ON TURO
            </Button>
          </a>
        </div>
        {showHelper && (
          <p className="mt-4 text-xs text-white text-center max-w-xl mx-auto leading-relaxed">
            BOOK DIRECT: Standard Rentals, Airport Service, Custom Delivery & Corporate Rentals
          </p>
        )}
      </div>
    );
  }

  if (variant === "dark") {
    return (
      <div className={className}>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link to="/services">
            <Button variant="hero" size="lg" className="min-w-[200px] bg-primary-foreground text-white hover:bg-primary-foreground/90">
              BOOK DIRECT
            </Button>
          </Link>
          <a 
            href={TURO_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => recordTuroClick({ source: "CTAGroup-Dark" })}
          >
            <Button variant="gold" size="lg" className="min-w-[200px] border-primary-foreground/20 text-white hover:text-primary-foreground hover:bg-primary-foreground/10">
              BOOK ON TURO
            </Button>
          </a>
        </div>
        {showHelper && (
          <p className="mt-4 text-xs text-white text-center max-w-xl mx-auto leading-relaxed">
            BOOK DIRECT: Standard Rentals, Airport Service, Custom Delivery & Corporate Rentals
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link to="/services">
          <Button variant="premium" size="lg" className="min-w-[200px]">
            BOOK DIRECT
          </Button>
        </Link>
        <a 
          href={TURO_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => recordTuroClick({ source: "CTAGroup-Default" })}
        >
          <Button variant="gold" size="lg" className="min-w-[200px] text-white hover:text-foreground">
            BOOK ON TURO
          </Button>
        </a>
      </div>
      {showHelper && (
        <p className="mt-3 text-xs text-white text-center max-w-xl mx-auto leading-relaxed">
          BOOK DIRECT: Standard Rentals, Airport Service, Custom Delivery & Corporate Rentals
        </p>
      )}
    </div>
  );
}
