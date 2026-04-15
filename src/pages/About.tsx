import FadeIn from "@/components/FadeIn";
import { useSEO } from "@/hooks/useSEO";

export default function About() {
  useSEO({
    title: "About Mead Green Autos | Premium Car Rental in Atlanta",
    description: "Learn about Mead Green Autos — professional premium car rentals in Atlanta. Licensed, insured, 5-star rated on Turo. Open 24/7.",
    canonical: "https://meadgreenautos.com/about",
  });
  return (
    <>
      <section className="relative overflow-hidden bg-stone py-24 md:py-32">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/vehicles/Porsche-Cayenne-2023-Side-Ext.png"
            alt="Luxury Fleet"
            className="h-full w-full object-cover"
          />
          {/* Dark Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="container relative z-10 text-center">
          <FadeIn>
            <h1 className="font-serif text-3xl text-white font-semibold md:text-4xl">
              About Mead Green Autos
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm text-white">
              Premium car rentals in Atlanta, built on professionalism,
              reliability, and a commitment to an exceptional experience.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-20">
        {/* Increased max-w for better side-by-side spacing */}
        <div className="container max-w-6xl flex flex-col md:flex-row items-center gap-12">
          {/* Left Side: Text Content */}
          <div className="w-full md:w-1/2 text-left">
            <FadeIn>
              <div className="prose-sm prose-stone max-w-none">
                <h2 className="font-serif text-3xl font-semibold text-gold">Our Story</h2>
                <p className="mt-4 text-sm leading-relaxed text-white">
                  Mead Green Autos was founded with a clear purpose: to provide
                  Atlanta travelers and residents with access to premium,
                  well-maintained vehicles backed by professional service. We
                  understand that renting a car is about more than transportation -
                  it is about trust, reliability, and the confidence that comes
                  with knowing every detail has been handled.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white">
                  Based near Hartsfield-Jackson Atlanta International Airport, we
                  serve a discerning clientele that includes airport arrivals,
                  corporate professionals, and individuals seeking a premium
                  rental experience without unnecessary complexity. Every vehicle
                  in Our Inventory is carefully selected, meticulously maintained, and
                  prepared to the highest standard before each rental.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white">
                  Our approach is straightforward: clear policies, transparent
                  pricing, responsive communication, and vehicles you can depend
                  on. Whether you are booking through Turo for immediate
                  convenience or inquiring about our private rental program for a
                  more tailored arrangement, the standard of care remains the
                  same.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              {/* Reduced margin from mt-16 to mt-6 */}
              <div className="mt-6">
                <p className="text-sm leading-relaxed text-white">
                  Our operations are built on consistency and accountability.
                  Each vehicle undergoes thorough inspection and cleaning between
                  rentals. We maintain full insurance coverage and comply with all
                  applicable regulations. Our team is available to assist with
                  questions, scheduling, and any needs that arise during your
                  rental period.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right Side: Image */}
          <div className="w-full md:w-1/2">
            <FadeIn delay={0.2}>
              <img
                src="/vehicles/COVER-IMAGE-Chevrolet-Corvette.jpeg"
                alt="Chevrolet Corvette"
                className="rounded-lg shadow-2xl w-full object-cover aspect-[4/3]"
              />
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
