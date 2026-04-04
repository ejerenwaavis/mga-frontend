import FadeIn from "@/components/FadeIn";
import { useSEO } from "@/hooks/useSEO";

export default function About() {
  useSEO({
    title: "About Mead Green Autos | Premium Car Rental in  Atlanta",
    description: "Learn about Mead Green Autos — professional premium car rentals in , Atlanta. Licensed, insured, 5-star rated on Turo. Open 24/7.",
    canonical: "https://green-fleet-concierge.lovable.app/about",
  });
  return (
    <>
      <section className="bg-stone py-16 md:py-20">
        <div className="container text-center">
          <FadeIn>
            <h1 className="font-serif text-3xl font-semibold md:text-4xl">
              About Mead Green Autos
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              Premium car rentals in Atlanta, built on professionalism,
              reliability, and a commitment to an exceptional experience.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container max-w-3xl">
          <FadeIn>
            <div className="prose-sm prose-stone max-w-none">
              <h2 className="font-serif text-2xl font-semibold text-gold">Our Story</h2>
              <p className="mt-4 text-sm leading-relaxed text-white">
                Mead Green Autos was founded with a clear purpose: to provide
                Atlanta travelers and residents with access to premium,
                well-maintained vehicles backed by professional service. We
                understand that renting a car is about more than transportation —
                it is about trust, reliability, and the confidence that comes
                with knowing every detail has been handled.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white">
                Based near Hartsfield-Jackson Atlanta International Airport, we
                serve a discerning clientele that includes airport arrivals,
                corporate professionals, and individuals seeking a premium
                rental experience without unnecessary complexity. Every vehicle
                in Our inventory is carefully selected, meticulously maintained, and
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
            <div className="mt-16">
              <h2 className="font-serif text-2xl font-semibold text-gold">
                Operations & Credibility
              </h2>
              <div className="mt-6 aspect-[16/9] rounded border border-border bg-stone flex items-center justify-center">
                <span className="font-serif text-lg text-white">
                  Behind the Scenes
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white">
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
      </section>
    </>
  );
}
