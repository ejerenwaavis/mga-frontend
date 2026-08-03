import { Button } from "@/components/ui/button";
import FadeIn from "@/components/FadeIn";
import { serviceTypes } from "@/data/services";
import { useSEO } from "@/hooks/useSEO";
import ServiceRequestForm from "@/components/ServiceRequestForm";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Services() {
  useSEO({
    title: "Airport & Corporate Car Rental Services in Atlanta | Mead Green Autos",
    description: "Airport service, daily rental, long-term rental, corporate & concierge car rental in Atlanta, GA. Open 24/7. Book now or call (470) 817-6427.",
    canonical: "https://meadgreenautos.com/services",
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialServiceId = queryParams.get("service") || undefined;

  useEffect(() => {
    if (location.hash === '#service-form') {
      setTimeout(() => {
        document.getElementById("service-form")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  return (
    <>
      <section className="relative overflow-hidden bg-stone py-24 md:py-32">
        <div className="absolute inset-0 z-0">
          <img
            src="/vehicles/Services-Hero.webp"
            alt="Luxury Fleet"
            className="h-full w-full object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="container relative z-10 text-center">
          <FadeIn>
            <h1 className="font-serif text-white text-3xl font-semibold md:text-4xl">
              Our Services
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm text-white">
              From airport arrivals to business travel and custom delivery, our
              rental services are designed to make every trip simple, reliable,
              and efficient.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Service Sections with Images */}
      <section className="py-16 md:py-20">
        <div className="container max-w-6xl">
          {serviceTypes.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-24 mb-20 last:mb-0"
            >
              <div
                className={`grid gap-12 items-center md:grid-cols-2 ${service.imagePosition === "left" ? "md:grid-flow-col" : ""}`}
              >
                {/* Image */}
                <div
                  className={`rounded-lg overflow-hidden shadow-xl ${service.imagePosition === "right" ? "md:order-1" : "md:order-0"}`}
                >
                  <img
                    src={service.heroImage}
                    alt={service.title}
                    className="w-full h-80 md:h-96 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Text Content */}
                <div
                  className={`space-y-4 ${service.imagePosition === "right" ? "md:order-0" : "md:order-1"}`}
                >
                  <h2 className="font-serif text-3xl md:text-4xl font-semibold text-gold">
                    {service.shortName}
                  </h2>
                  <p className="text-base leading-relaxed text-white">
                    {service.description}
                  </p>
                  <div className="flex gap-4">
                    <Button
                      variant="premium"
                      size="lg"
                      asChild
                    >
                      <Link to={`/services/${service.slug}`}>
                        Learn More
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      asChild
                      className="bg-transparent text-white border-white hover:bg-white hover:text-black"
                    >
                      <Link to={`/services?service=${service.id}#service-form`}>
                        Book Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Request Form */}
      <section className="bg-stone py-16 md:py-20">
        <ServiceRequestForm initialServiceId={initialServiceId} />
      </section>
    </>
  );
}
