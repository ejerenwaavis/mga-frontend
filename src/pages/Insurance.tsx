import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/FadeIn";
import { useSEO } from "@/hooks/useSEO";

export default function Insurance() {
  useSEO({
    title: "Insurance Information | Mead Green Autos — Atlanta Car Rental Insurance",
    description: "Understanding insurance requirements for car rentals in Atlanta. Full coverage requirements, accepted policies, and important disclaimers for Mead Green Autos rentals.",
    canonical: "https://meadgreenautos.com/insurance",
  });

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="container text-center">
          <FadeIn>
            <h1 className="font-serif text-3xl font-semibold text-white md:text-4xl">
              Insurance Information
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm text-gray-300">
              Understanding insurance requirements before your rental ensures a
              smooth, worry-free experience.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content Section with White Container */}
      <section className="pb-20 md:pb-28">
        <div className="container max-w-3xl">
          <FadeIn>
            <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
              <div className="space-y-8">
                {/* Insurance Requirements */}
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="font-serif text-xl font-semibold text-gray-900">
                    Insurance Requirements
                  </h2>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900" />
                      Full coverage auto insurance (liability, collision, and
                      comprehensive) is required for all private rentals.
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900" />
                      Proof of valid insurance must be provided before vehicle
                      pickup. Digital copies are accepted.
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900" />
                      Insurance must be active for the entire duration of the
                      rental period.
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900" />
                      The rental vehicle must be listed as a covered vehicle on
                      your policy, or your policy must cover rental vehicles.
                    </li>
                  </ul>
                </div>

                {/* Accepted Coverage */}
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="font-serif text-xl font-semibold text-gray-900">
                    Accepted Coverage
                  </h2>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900" />
                      Personal auto insurance policies with full coverage
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900" />
                      Commercial auto insurance policies
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900" />
                      Non-owner auto insurance with rental coverage endorsement
                    </li>
                  </ul>
                </div>

                {/* Important Disclaimers */}
                <div className="border-b border-gray-200 pb-6">
                  <div className="rounded-lg bg-gray-50 p-6">
                    <h3 className="font-serif text-base font-semibold text-gray-900">
                      Important Disclaimers
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      Mead Green Autos does not provide insurance coverage for
                      private rentals. Renters are solely responsible for
                      maintaining adequate insurance coverage throughout the rental
                      period. In the event of an accident or damage, the renter's
                      insurance is the primary coverage. Turo bookings include
                      Turo's insurance options — please refer to Turo for details.
                    </p>
                  </div>
                </div>

                {/* Questions About Insurance */}
                <div className="pb-0">
                  <div className="rounded-lg bg-gray-50 p-6">
                    <h3 className="font-serif text-base font-semibold text-gray-900">
                      Questions About Insurance?
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      If you have questions about insurance requirements or need
                      guidance on what coverage to obtain, please reach out to our
                      team. We are happy to help clarify before your rental.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link to="/contact">
                        <Button 
                          variant="outline"
                          size="sm" 
                          className="bg-gray-900 text-white hover:bg-gray-800"
                        
                        >
                          Contact Us
                        </Button>
                      </Link>
                      <Link to="/private-inquiry">
                       <Button variant="hero" size="sm" className="neon-btn min-w-[200px]">
                          Submit Inquiry
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
