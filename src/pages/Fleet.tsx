import { useState, useMemo } from "react";
import VehicleCard from "@/components/VehicleCard";
import FadeIn from "@/components/FadeIn";
import { vehicles } from "@/data/vehicles";
import { useSEO } from "@/hooks/useSEO";

const categories = ["All", "SUV", "Sedan", "Luxury"] as const;

export default function Fleet() {
  useSEO({
    title: "Premium Rental Fleet in Atlanta | SUVs, Sedans & Luxury Vehicles",
    description: "Browse our curated Atlanta rental fleet — luxury SUVs, executive sedans, and premium vehicles. Airport-ready, insured, available 24/7 in Atlanta.",
    canonical: "https://green-fleet-concierge.lovable.app/fleet",
  });
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(
    () =>
      category === "All"
        ? vehicles
        : vehicles.filter((v) => v.category === category),
    [category]
  );

  return (
    <>
      <section className="bg-stone py-16 md:py-20">
        <div className="container text-center">
          <FadeIn>
            <h1 className="font-serif text-3xl font-semibold md:text-4xl">
              Our Fleet
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              A curated selection of {vehicles.length} premium vehicles, maintained to the highest
              standard and available for short-term, long-term, and corporate
              rentals.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <FadeIn>
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-sm px-4 py-2 text-xs font-sans font-medium uppercase tracking-widest transition-colors ${category === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((vehicle, i) => (
              <FadeIn key={vehicle.id} delay={i * 0.04}>
                <VehicleCard vehicle={vehicle} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
