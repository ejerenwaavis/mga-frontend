import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { serviceTypes } from "@/data/services";
import { useSEO } from "@/hooks/useSEO";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/FadeIn";

export default function ServiceLandingPage() {
  const { slug } = useParams();
  const service = serviceTypes.find((s) => s.slug === slug);
  const otherServices = serviceTypes.filter((s) => s.slug !== slug).slice(0, 3);

  // Set SEO
  useSEO({
    title: service ? `${service.title} | Mead Green Autos` : "Service Not Found",
    description: service?.metaDescription || "Service not found",
    canonical: `https://meadgreenautos.com/services/${slug}`,
  });

  // Inject JSON-LD
  useEffect(() => {
    if (!service) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "AutoRental",
      "name": "Mead Green Autos",
      "description": service.metaDescription,
      "url": `https://meadgreenautos.com/services/${slug}`,
      "areaServed": service.location || "Atlanta, GA",
      "image": `https://meadgreenautos.com${service.heroImage}`,
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [service, slug]);

  if (!service) {
    return (
      <div className="container py-32 text-center">
        <h1 className="text-3xl font-serif mb-4 text-white">Service Not Found</h1>
        <p className="text-white/60 mb-8">The service you are looking for does not exist.</p>
        <Button asChild variant="premium">
          <Link to="/services">View All Services</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#143D2A] pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="container max-w-6xl flex flex-col lg:flex-row gap-12 xl:gap-16 items-stretch">
        {/* Left Content Column */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <FadeIn>
            <h1 className="font-serif text-white text-4xl md:text-5xl lg:text-5xl font-semibold leading-tight mb-6">
              {service.title}
            </h1>
            <p className="text-white/80 text-base leading-relaxed mb-12 max-w-xl">
              {service.description}
            </p>

            <div className="space-y-8 max-w-xl">
              {/* Top Sidebar Section: Book This Service */}
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-8">
                <h3 className="font-serif text-2xl font-semibold mb-3 text-gold">
                  Book This Service
                </h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  Experience exceptional customer service, professionally prepared vehicles, and a seamless rental process. Contact our team today to reserve your luxury rental.
                </p>
                <Button asChild variant="premium" size="lg" className="w-full sm:w-auto">
                  <Link to={`/services?service=${service.id}#service-form`}>
                    Book Now
                  </Link>
                </Button>
              </div>

              {/* Bottom Sidebar Section: Other Services */}
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-8">
                <h3 className="font-serif text-xl font-semibold mb-6 text-white">
                  Other Services
                </h3>
                <ul className="space-y-4">
                  {otherServices.map((s) => (
                    <li key={s.slug}>
                      <Link
                        to={`/services/${s.slug}`}
                        className="group flex items-center justify-between text-white/80 hover:text-gold transition-colors p-2 -mx-2 rounded-lg hover:bg-white/5"
                      >
                        <span className="font-medium">{s.shortName}</span>
                        <ChevronRight className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right Image Column */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          <FadeIn delay={0.2} className="h-full w-full">
            <div className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={service.heroImage}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

