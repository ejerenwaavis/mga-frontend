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
              Understanding coverage requirements before your rental helps ensure a smooth and seamless experience with Mead Green Autos.
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
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">
                    For all private rentals, renters are generally required to maintain active full coverage auto insurance that extends to rental vehicles. This typically includes:
                  </p>
                  <ul className="mt-4 space-y-3 pl-4 text-sm text-gray-600 list-disc">
                    <li>Liability coverage</li>
                    <li>Collision coverage</li>
                    <li>Comprehensive coverage</li>
                  </ul>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">
                    Proof of insurance and a valid driver’s license must be provided prior to pickup.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    Coverage must remain active for the full duration of the rental period.
                  </p>
                </div>

                {/* Accepted Coverage Types */}
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="font-serif text-xl font-semibold text-gray-900">
                    Accepted Coverage Types
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">
                    We may accept the following forms of qualifying coverage:
                  </p>
                  <ul className="mt-4 space-y-3 pl-4 text-sm text-gray-600 list-disc">
                    <li>Personal auto insurance policies with full coverage</li>
                    <li>Commercial auto insurance policies</li>
                    <li>Non-owner policies with qualifying rental coverage</li>
                    <li>Select premium credit card rental protection programs, subject to verification and approval</li>
                  </ul>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">
                    Additional verification may be required prior to reservation approval.
                  </p>
                </div>

                {/* Security Deposit */}
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="font-serif text-xl font-semibold text-gray-900">
                    Security Deposit
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">
                    All private rentals require a refundable security deposit. Deposit amounts vary depending on the vehicle and renter profile.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">
                    Security deposits are temporary authorization holds and are typically released within 24 hours after the vehicle is returned in the same condition.
                  </p>
                </div>

                {/* Important Information */}
                <div className="border-b border-gray-200 pb-6">
                  <div className="rounded-lg bg-gray-50 p-6">
                    <h3 className="font-serif text-base font-semibold text-gray-900">
                      Important Information
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      Renters are financially responsible for the vehicle during the rental period pursuant to the rental agreement.
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      If using personal insurance or third-party rental protection, renters are responsible for confirming that their policy or protection plan applies to the rental arrangement with Mead Green Autos prior to the trip.
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      In certain situations, alternative coverage solutions may be available subject to approval and verification.
                    </p>
                  </div>
                </div>

                {/* Questions About Coverage */}
                <div className="pb-0">
                  <div className="rounded-lg bg-gray-50 p-6">
                    <h3 className="font-serif text-base font-semibold text-gray-900">
                      Questions About Coverage?
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      If you have any questions regarding insurance requirements, verification, or coverage eligibility, our team is happy to assist prior to your rental.
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
