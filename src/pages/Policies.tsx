import FadeIn from "@/components/FadeIn";
import { useSEO } from "@/hooks/useSEO";

const sections = [
  {
    title: "Deposits",
    content:
      "A refundable security deposit is required for all rentals and must be received prior to vehicle pickup. Deposit amounts vary by vehicle and are specified at the time of booking or approval. Deposits are refunded in full upon satisfactory return of the vehicle, subject to inspection for damage, excessive wear, or policy violations.",
  },
  {
    title: "Fuel Policy",
    content:
      "Vehicles are provided with a full tank of fuel and must be returned with a full tank. If the vehicle is returned with less than a full tank, a refueling fee will be applied at a rate above the prevailing market price to cover the cost of refueling.",
  },
  {
    title: "Prohibited Use",
    content:
      "Vehicles may not be used for any illegal activity, off-road driving, racing, towing, or any purpose not consistent with normal personal or business transportation. Subletting or allowing unauthorized drivers to operate the vehicle is strictly prohibited. Violations may result in forfeiture of the security deposit and additional liability.",
  },
  {
    title: "Late Returns",
    content:
      "Vehicles must be returned at the agreed-upon date and time. Late returns are subject to additional daily charges at the standard daily rate. If a vehicle is not returned within 24 hours of the agreed return time without prior arrangement, additional actions may be taken in accordance with applicable law.",
  },
  {
    title: "Cancellations",
    content:
      "Cancellations made at least 48 hours prior to the scheduled pickup time are eligible for a full deposit refund. Cancellations made within 48 hours of pickup may be subject to a cancellation fee. Turo bookings follow Turo's cancellation policy. We encourage renters to communicate schedule changes as early as possible.",
  },
  {
    title: "Damages",
    content:
      "Renters are responsible for any damage to the vehicle that occurs during the rental period, regardless of fault. Damage is assessed upon vehicle return and repair costs will be deducted from the security deposit. If repair costs exceed the deposit amount, the renter is responsible for the remaining balance. We recommend documenting the vehicle condition at pickup and return.",
  },
];

export default function Policies() {
  useSEO({
    title: "Policies & Terms | Mead Green Autos — Atlanta Car Rental Policies",
    description: "Review Mead Green Autos rental policies including deposits, fuel policy, prohibited use, late returns, cancellations, and damages.",
    canonical: "https://meadgreenautos.com/policies",
  });

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="container text-center">
          <FadeIn>
            <h1 className="font-serif text-3xl font-semibold text-white md:text-4xl">
              Policies & Terms
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm text-gray-300">
              Clear, fair policies that protect both our guests and our
              vehicles. Please review these terms before your rental.
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
                {sections.map((section, i) => (
                  <FadeIn key={section.title} delay={i * 0.05}>
                    <div className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                      <h2 className="font-serif text-xl font-semibold text-gray-900">
                        {section.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-gray-600">
                        {section.content}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
