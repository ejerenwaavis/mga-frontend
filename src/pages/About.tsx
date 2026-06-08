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
            src="/vehicles/about-hero-image.jpeg"
            alt="Luxury Fleet"
            className="h-full w-full object-cover object-bottom"
          />
          {/* Dark Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="container relative z-10 text-center">
          <FadeIn>
            <h1 className="font-serif text-3xl text-white font-semibold md:text-4xl">
              About Mead Green Autos
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm text-white">
              Premium car rentals in Atlanta, built around convenience,
              reliability, and a better rental experience.
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
                <h2 className="font-serif text-3xl font-semibold text-gold">
                  Our Story
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white">
                  Mead Green Autos was founded with a simple goal: to create a
                  better rental experience. After seeing the condition,
                  inconsistency, and inconvenience often associated with
                  traditional rental companies, we built a service centered
                  around what renters actually value: clean vehicles, clear
                  communication, and a seamless pickup and return process.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white">
                  We believe renting a vehicle should be straightforward,
                  dependable, and built around your schedule, not complicated by
                  long lines, unclear policies, or unnecessary delays. Located
                  near Hartsfield–Jackson Atlanta International Airport, we
                  provide airport rentals, custom delivery, corporate rentals,
                  and flexible private rental options throughout Atlanta. Every
                  vehicle in our fleet is carefully selected, professionally
                  maintained, and thoroughly prepared before each rental to
                  deliver the level of quality and consistency we believe should
                  be standard.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white">
                  At Mead Green Autos, our focus is simple: premium vehicles,
                  reliable service, and a rental experience designed to be
                  better from start to finish. That tells the real story and
                  positions MGA directly against the weak points of legacy
                  rental companies.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              {/* Reduced margin from mt-16 to mt-6 */}
              <div className="mt-6">
                {/* <p className="text-sm leading-relaxed text-white">
                  Our operations are built on consistency and accountability.
                  Each vehicle undergoes thorough inspection and cleaning
                  between rentals. We maintain full insurance coverage and
                  comply with all applicable regulations. Our team is available
                  to assist with questions, scheduling, and any needs that arise
                  during your rental period.
                </p> */}
              </div>
            </FadeIn>
          </div>

          {/* Right Side: Image */}
          <div className="w-full md:w-1/2">
            <FadeIn delay={0.2}>
              <img
                src="/vehicles/our-story-cover-image.jpeg"
                alt="Porsche Macan"
                className="rounded-lg shadow-2xl w-full object-cover aspect-[4/3]"
              />
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
